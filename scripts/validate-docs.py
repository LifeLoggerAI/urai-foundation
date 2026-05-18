#!/usr/bin/env python3
"""Validate repository documentation and static-site files without third-party dependencies."""

from __future__ import annotations

import re
import sys
from pathlib import Path
from urllib.parse import unquote, urlparse

ROOT = Path(__file__).resolve().parents[1]
SKIP_DIRS = {".git", "node_modules", "dist", "build", "coverage", "__pycache__"}
TEXT_EXTENSIONS = {".css", ".html", ".json", ".md", ".py", ".txt", ".webmanifest", ".xml", ".yaml", ".yml"}
TEXT_FILENAMES = {".editorconfig", ".gitignore", "CNAME", "Makefile"}
MARKDOWN_INLINE_LINK_RE = re.compile(r"!?\[[^\]]*\]\(([^)]+)\)")
MARKDOWN_REFERENCE_LINK_RE = re.compile(r"^\s{0,3}\[[^\]]+\]:\s+(\S+)")
MARKDOWN_HEADING_RE = re.compile(r"^(#{1,6})\s+(.+?)\s*#*\s*$")
HTML_LINK_RE = re.compile(r"\b(?:href|src|action)\s*=\s*([\"'])(.*?)\1", re.IGNORECASE)
HTML_ANCHOR_RE = re.compile(r"\b(?:id|name)\s*=\s*([\"'])(.*?)\1", re.IGNORECASE)
ALLOWED_EXTERNAL_SCHEMES = {"http", "https", "mailto", "tel"}
IGNORED_LINK_PREFIXES = {"data:", "#"}


def iter_files() -> list[Path]:
    files: list[Path] = []
    for path in ROOT.rglob("*"):
        if any(part in SKIP_DIRS for part in path.relative_to(ROOT).parts):
            continue
        if path.is_file() and (path.suffix.lower() in TEXT_EXTENSIONS or path.name in TEXT_FILENAMES):
            files.append(path)
    return sorted(files)


def link_scheme(target: str) -> str:
    return urlparse(normalize_link_target(target)).scheme.lower()


def is_external_link(target: str) -> bool:
    return link_scheme(target) in ALLOWED_EXTERNAL_SCHEMES


def has_unsupported_scheme(target: str) -> bool:
    scheme = link_scheme(target)
    return bool(scheme and scheme not in ALLOWED_EXTERNAL_SCHEMES)


def normalize_link_target(target: str) -> str:
    """Remove optional Markdown title text and angle brackets from a link target."""
    target = target.strip()
    if target.startswith("<"):
        closing_index = target.find(">")
        if closing_index != -1:
            return target[1:closing_index].strip()
    return target.split(maxsplit=1)[0] if target else ""


def split_link_target(target: str) -> tuple[str, str]:
    """Return the decoded path and anchor portions of a Markdown or HTML link target."""
    normalized_target = normalize_link_target(target)
    path, _, anchor = normalized_target.partition("#")
    path = unquote(path.split("?", 1)[0])
    anchor = unquote(anchor.split("?", 1)[0])
    return path, anchor


def slugify_heading(heading: str) -> str:
    """Approximate GitHub's generated Markdown heading anchors."""
    heading = re.sub(r"<[^>]+>", "", heading)
    heading = re.sub(r"[`*_~\[\]()]", "", heading)
    heading = heading.strip().lower()
    heading = re.sub(r"[^\w\s-]", "", heading, flags=re.UNICODE)
    heading = re.sub(r"\s+", "-", heading)
    heading = re.sub(r"-+", "-", heading)
    return heading.strip("-")


def iter_markdown_content_lines(text: str) -> list[tuple[int, str]]:
    """Return Markdown lines that are outside fenced code blocks."""
    lines: list[tuple[int, str]] = []
    in_fence = False
    fence_marker = ""

    for line_number, line in enumerate(text.splitlines(), start=1):
        stripped = line.lstrip()
        if stripped.startswith(("```", "~~~")):
            marker = stripped[:3]
            if not in_fence:
                in_fence = True
                fence_marker = marker
            elif marker == fence_marker:
                in_fence = False
                fence_marker = ""
            continue

        if not in_fence:
            lines.append((line_number, line))

    return lines


def markdown_anchors(path: Path) -> set[str]:
    anchors: set[str] = set()
    slug_counts: dict[str, int] = {}
    text = path.read_text(encoding="utf-8")

    for _, line in iter_markdown_content_lines(text):
        match = MARKDOWN_HEADING_RE.match(line)
        if not match:
            continue

        base_slug = slugify_heading(match.group(2))
        if not base_slug:
            continue

        duplicate_count = slug_counts.get(base_slug, 0)
        slug_counts[base_slug] = duplicate_count + 1
        anchors.add(base_slug if duplicate_count == 0 else f"{base_slug}-{duplicate_count}")

    return anchors


def html_anchors(path: Path) -> set[str]:
    text = path.read_text(encoding="utf-8")
    return {match.group(2).strip() for match in HTML_ANCHOR_RE.finditer(text) if match.group(2).strip()}


def markdown_link_targets(line: str) -> list[str]:
    """Return inline, image, and reference-style Markdown link targets from a line."""
    targets = [match.group(1).strip() for match in MARKDOWN_INLINE_LINK_RE.finditer(line)]
    reference_match = MARKDOWN_REFERENCE_LINK_RE.match(line)
    if reference_match:
        targets.append(reference_match.group(1).strip())
    return targets


def html_link_targets(line: str) -> list[str]:
    """Return href, src, and action link targets from one HTML line."""
    return [match.group(2).strip() for match in HTML_LINK_RE.finditer(line)]


def resolve_internal_link(source_path: Path, clean_target: str, *, root_relative: bool) -> Path:
    if not clean_target:
        return source_path
    if root_relative and clean_target == "/":
        return ROOT / "index.html"
    if root_relative and clean_target.startswith("/"):
        return (ROOT / clean_target.lstrip("/")).resolve()
    return (source_path.parent / clean_target).resolve()


def validate_internal_link(
    path: Path,
    line_number: int,
    target: str,
    *,
    root_relative: bool,
    anchor_cache: dict[Path, set[str]],
) -> str | None:
    rel = path.relative_to(ROOT)
    if not target or is_external_link(target):
        return None
    if any(target.startswith(prefix) for prefix in IGNORED_LINK_PREFIXES):
        return None
    if has_unsupported_scheme(target):
        return f"{rel}:{line_number}: unsupported link scheme: {target}"

    clean_target, anchor = split_link_target(target)
    linked_path = resolve_internal_link(path, clean_target, root_relative=root_relative)
    try:
        linked_path.relative_to(ROOT)
    except ValueError:
        return f"{rel}:{line_number}: link escapes repository: {target}"

    if clean_target and not linked_path.exists():
        return f"{rel}:{line_number}: broken relative link: {target}"

    if anchor and linked_path.suffix.lower() == ".md":
        anchors = anchor_cache.setdefault(linked_path, markdown_anchors(linked_path))
        if anchor.lower() not in anchors:
            return f"{rel}:{line_number}: broken Markdown anchor: {target}"

    if anchor and linked_path.suffix.lower() == ".html":
        anchors = anchor_cache.setdefault(linked_path, html_anchors(linked_path))
        if anchor not in anchors:
            return f"{rel}:{line_number}: broken HTML anchor: {target}"

    return None


def validate_markdown_link(path: Path, line_number: int, target: str, anchor_cache: dict[Path, set[str]]) -> str | None:
    return validate_internal_link(path, line_number, target, root_relative=False, anchor_cache=anchor_cache)


def validate_html_link(path: Path, line_number: int, target: str, anchor_cache: dict[Path, set[str]]) -> str | None:
    return validate_internal_link(path, line_number, target, root_relative=True, anchor_cache=anchor_cache)


def validate_file(path: Path) -> list[str]:
    rel = path.relative_to(ROOT)
    errors: list[str] = []
    raw = path.read_bytes()

    if not raw:
        errors.append(f"{rel}: file is empty")
        return errors

    if not raw.endswith(b"\n"):
        errors.append(f"{rel}: missing final newline")

    try:
        text = raw.decode("utf-8")
    except UnicodeDecodeError as exc:
        errors.append(f"{rel}: not valid UTF-8 text: {exc}")
        return errors

    for line_number, line in enumerate(text.splitlines(), start=1):
        if line.rstrip(" \t") != line:
            errors.append(f"{rel}:{line_number}: trailing whitespace")

    if path.suffix.lower() == ".md":
        anchor_cache: dict[Path, set[str]] = {}
        for line_number, line in iter_markdown_content_lines(text):
            for target in markdown_link_targets(line):
                error = validate_markdown_link(path, line_number, target, anchor_cache)
                if error:
                    errors.append(error)

    if path.suffix.lower() == ".html":
        anchor_cache = {}
        for line_number, line in enumerate(text.splitlines(), start=1):
            for target in html_link_targets(line):
                error = validate_html_link(path, line_number, target, anchor_cache)
                if error:
                    errors.append(error)

    return errors


def main() -> int:
    errors: list[str] = []
    files = iter_files()
    for path in files:
        errors.extend(validate_file(path))

    if errors:
        print("Documentation validation failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    print(f"Documentation validation passed for {len(files)} files.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
