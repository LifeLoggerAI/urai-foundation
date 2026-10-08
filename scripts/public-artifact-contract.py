#!/usr/bin/env python3
"""Exact manifest-bound upload paths and post-download verification; no network."""
from __future__ import annotations
import argparse
import hashlib
import importlib.util
import json
import os
from pathlib import Path, PurePosixPath
import re
import uuid

ROOT = Path(__file__).resolve().parents[1]
_spec = importlib.util.spec_from_file_location("foundation_public_builder", ROOT / "scripts/build-public-site.py")
_builder = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_builder)
PUBLIC_FILES = tuple(_builder.PUBLIC_FILES)
MANIFEST = "public-build-manifest.json"
MAX_BYTES = 128 * 1024 * 1024


def safe_relative(name: str) -> bool:
    if not isinstance(name, str) or not re.fullmatch(r"[A-Za-z0-9._/-]+", name):
        return False
    path = PurePosixPath(name)
    return not path.is_absolute() and ".." not in path.parts and str(path) == name and (name == ".nojekyll" or not any(part.startswith(".") for part in path.parts))


def verify_site(site: Path, source_sha: str, expected_manifest_sha256: str | None = None) -> list[Path]:
    if not re.fullmatch(r"[a-f0-9]{40}", source_sha):
        raise ValueError("exact source SHA required")
    if site.is_symlink() or any(parent.is_symlink() for parent in site.parents):
        raise ValueError("symbolic link in site boundary")
    manifest_path = site / MANIFEST
    if manifest_path.is_symlink() or manifest_path.stat().st_size > 1024 * 1024:
        raise ValueError("unsafe manifest")
    if expected_manifest_sha256 is not None and hashlib.sha256(manifest_path.read_bytes()).hexdigest() != expected_manifest_sha256:
        raise ValueError("downloaded manifest differs from uploaded manifest")
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    if manifest.get("source_sha") != source_sha or manifest.get("publication_boundary") != "explicit-allowlist":
        raise ValueError("manifest/source authority mismatch")
    entries = manifest.get("files", [])
    if not isinstance(entries, list) or any(not isinstance(entry, dict) for entry in entries):
        raise ValueError("invalid manifest entries")
    names = [entry.get("path") for entry in entries]
    if any(not safe_relative(name) for name in names) or len(names) != len(set(names)) or set(names) != set(PUBLIC_FILES):
        raise ValueError("manifest differs from source allowlist")
    expected = set(PUBLIC_FILES) | {MANIFEST}
    for item in site.rglob("*"):
        if item.is_symlink() or (item.is_file() and item.relative_to(site).as_posix() not in expected):
            raise ValueError("unexpected or linked site file")
    total = 0
    for entry in entries:
        item = site / entry["path"]
        size = item.stat().st_size
        total += size
        if not item.is_file() or size != entry.get("bytes") or total > MAX_BYTES:
            raise ValueError("missing, oversized or size-mismatched site member")
        if hashlib.sha256(item.read_bytes()).hexdigest() != entry.get("sha256"):
            raise ValueError("site member digest mismatch")
    return [site / name for name in sorted(expected)]


def upload_paths(site: Path, source_sha: str, extra_roots: list[Path]) -> list[Path]:
    result = verify_site(site, source_sha)
    for root in extra_roots:
        if root.is_symlink() or any(parent.is_symlink() for parent in root.parents):
            raise ValueError("linked diagnostic root")
        if not root.exists():
            continue
        for item in sorted(root.rglob("*")):
            if item.is_symlink():
                raise ValueError("linked diagnostic member")
            relative = item.relative_to(root).as_posix()
            if item.is_file() and safe_relative(relative) and not any(part.startswith(".") for part in PurePosixPath(relative).parts):
                result.append(item)
    if len(result) > 1000 or sum(item.stat().st_size for item in result) > MAX_BYTES:
        raise ValueError("artifact exceeds bounded upload size")
    # Explicit paths only; neither globs nor hidden directories can enter upload.
    for item in result:
        if not re.fullmatch(r"[A-Za-z0-9._/-]+", str(item.absolute())):
            raise ValueError("unsafe upload path")
    return result


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("mode", choices=["prepare", "verify-download"])
    parser.add_argument("--source-sha", required=True)
    parser.add_argument("--site", type=Path, default=ROOT / "_site")
    parser.add_argument("--download-root", type=Path)
    parser.add_argument("--manifest-sha256")
    parser.add_argument("--logs", type=Path, default=Path("/tmp/foundation-check"))
    args = parser.parse_args()
    try:
        if args.mode == "prepare":
            paths = upload_paths(args.site, args.source_sha, [ROOT / "functions/lib", args.logs])
            delimiter = "URAI_ARTIFACT_" + uuid.uuid4().hex
            with open(os.environ["GITHUB_OUTPUT"], "a", encoding="utf-8") as output:
                output.write("manifest_sha256=" + hashlib.sha256((args.site / MANIFEST).read_bytes()).hexdigest() + "\n")
                output.write("paths<<" + delimiter + "\n" + "\n".join(str(path.absolute()) for path in paths) + "\n" + delimiter + "\n")
            print(json.dumps({"source_sha": args.source_sha, "explicit_upload_files": len(paths), "hidden_allowlist": ["_site/.nojekyll"]}))
        else:
            if args.download_root is None:
                raise ValueError("download root required")
            manifests = list(args.download_root.rglob(MANIFEST))
            if len(manifests) != 1 or manifests[0].parent.name != "_site":
                raise ValueError("exactly one downloaded site manifest required")
            if not args.manifest_sha256 or not re.fullmatch(r"[a-f0-9]{64}", args.manifest_sha256):
                raise ValueError("original uploaded manifest SHA256 required")
            files = verify_site(manifests[0].parent, args.source_sha, args.manifest_sha256)
            print(json.dumps({"source_sha": args.source_sha, "downloaded_files_verified": len(files), "manifest_entries": len(PUBLIC_FILES), "scope": "downloaded artifact bytes only, not hosting"}))
    except (OSError, ValueError, KeyError, TypeError) as error:
        print("Artifact contract failed: " + str(error))
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
