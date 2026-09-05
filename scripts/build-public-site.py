#!/usr/bin/env python3
"""Build an explicit allowlisted public artifact for URAI Foundation hosting."""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_OUTPUT = ROOT / "_site"

PUBLIC_FILES = [
    ".nojekyll",
    "CNAME",
    "index.html",
    "styles.css",
    "favicon.svg",
    "robots.txt",
    "sitemap.xml",
    "site.webmanifest",
    "accessibility/index.html",
    "deaf-community/index.html",
    "emotional-wellness/index.html",
    "responsible-ai/index.html",
    "research/index.html",
    "partners/index.html",
    "contact/index.html",
    "privacy/index.html",
    "terms/index.html",
    "community/index.html",
    "donate/index.html",
    "donate/thanks/index.html",
    "staff/index.html",
    "grants/index.html",
    "grants/grants.css",
    "grants/grants.js",
    "docs/governance-charter.md",
    "docs/ethical-ai-principles.md",
    "docs/transparency-framework.md",
    "docs/risk-review-process.md",
    "docs/implementation-map.md",
    "docs/system-of-systems-integration.md",
    "docs/canonical-production-truth.md",
    "docs/product-integration-contract.md",
    "docs/publication-and-review-policy.md",
    "docs/templates/decision-record.md",
    "docs/templates/risk-review-record.md",
    "docs/templates/public-accountability-templates.md",
    "standards/registry.json",
    "standards/registry.schema.json",
]

PROTECTED_ROOT_NAMES = {"docs", "standards", "scripts", "tests", ".github"}


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def validate_output_boundary(root: Path, output: Path) -> None:
    root = root.resolve()
    requested = Path(os.path.abspath(output))
    current = requested
    while True:
        if current.exists() and current.is_symlink():
            raise ValueError("output directory path must not contain symbolic links")
        if current == current.parent:
            break
        current = current.parent

    resolved_output = requested.resolve(strict=False)
    protected = {root / name for name in PROTECTED_ROOT_NAMES}
    if resolved_output == root or resolved_output in root.parents:
        raise ValueError("output directory must not replace the repository or any repository parent")
    for protected_path in protected:
        if resolved_output == protected_path or protected_path in resolved_output.parents:
            raise ValueError("output directory must not replace or be inside a protected source directory")


def build_site(root: Path, output: Path, source_sha: str) -> dict:
    root = root.resolve()
    validate_output_boundary(root, output)
    output = Path(os.path.abspath(output)).resolve(strict=False)
    missing = [relative for relative in PUBLIC_FILES if not (root / relative).is_file()]
    if missing:
        raise FileNotFoundError(f"missing required public files: {', '.join(missing)}")

    if output.exists() or output.is_symlink():
        if output.is_symlink():
            raise ValueError("output path must not be a symbolic link")
        if output.is_dir():
            shutil.rmtree(output)
        else:
            output.unlink()
    output.mkdir(parents=True)

    entries: list[dict[str, str | int]] = []
    for relative in PUBLIC_FILES:
        source = root / relative
        destination = output / relative
        destination.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, destination)
        entries.append({"path": relative, "sha256": sha256(destination), "bytes": destination.stat().st_size})

    manifest = {"schema_version": "1", "source_sha": source_sha or "unknown", "publication_boundary": "explicit-allowlist", "files": entries}
    manifest_path = output / "public-build-manifest.json"
    manifest_path.write_text(json.dumps(manifest, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    return manifest


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", type=Path, default=ROOT)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    parser.add_argument("--source-sha", default=os.environ.get("GITHUB_SHA", "unknown"))
    args = parser.parse_args()
    try:
        manifest = build_site(args.root, args.output, args.source_sha)
    except (OSError, ValueError) as exc:
        print(f"Public site build failed: {exc}")
        return 1
    print(f"Public site build passed for {len(manifest['files'])} allowlisted files at {args.output}.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
