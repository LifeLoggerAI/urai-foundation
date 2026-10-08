#!/usr/bin/env python3
"""Validate only the allowlisted public site before upload and after download.

This establishes byte/manifest consistency, not deployment or release approval.
No network access or extraction is performed.
"""
from __future__ import annotations

import argparse
import hashlib
import importlib.util
import json
from pathlib import Path
import re
import sys

MANIFEST = "public-build-manifest.json"
MAX_MANIFEST_BYTES = 1024 * 1024


def load_allowlist() -> set[str]:
    source = Path(__file__).with_name("build-public-site.py")
    spec = importlib.util.spec_from_file_location("foundation_public_build", source)
    assert spec is not None and spec.loader is not None
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    paths = module.PUBLIC_FILES
    if len(paths) != len(set(paths)) or MANIFEST in paths:
        raise ValueError("invalid publication allowlist")
    return set(paths)


def validate_artifact(site: Path, expected_source_sha: str) -> dict:
    if not re.fullmatch(r"[0-9a-f]{40}", expected_source_sha):
        raise ValueError("expected source must be an exact commit SHA")
    if site.is_symlink() or not site.is_dir():
        raise ValueError("artifact root must be an ordinary directory")
    allowed = load_allowlist()
    actual = set()
    for path in site.rglob("*"):
        if path.is_symlink():
            raise ValueError("symbolic links are not public artifact files")
        if path.is_file():
            actual.add(path.relative_to(site).as_posix())
        elif not path.is_dir():
            raise ValueError("special files are not public artifact files")
    if actual != allowed | {MANIFEST}:
        missing = sorted((allowed | {MANIFEST}) - actual)
        extra = sorted(actual - (allowed | {MANIFEST}))
        raise ValueError(f"artifact inventory mismatch; missing={missing}; unexpected={extra}")
    manifest_path = site / MANIFEST
    if manifest_path.stat().st_size > MAX_MANIFEST_BYTES:
        raise ValueError("manifest exceeds its bounded size")
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    if (not isinstance(manifest, dict) or manifest.get("schema_version") != "1"
            or manifest.get("publication_boundary") != "explicit-allowlist"
            or manifest.get("source_sha") != expected_source_sha):
        raise ValueError("manifest authority or schema mismatch")
    entries = manifest.get("files")
    if not isinstance(entries, list) or len(entries) != len(allowed):
        raise ValueError("manifest inventory count mismatch")
    seen = set()
    for entry in entries:
        if not isinstance(entry, dict):
            raise ValueError("invalid manifest entry")
        name = entry.get("path")
        if not isinstance(name, str) or name not in allowed or name in seen:
            raise ValueError("duplicate or non-allowlisted manifest path")
        seen.add(name)
        size = entry.get("bytes")
        digest = entry.get("sha256")
        if (type(size) is not int or size < 0 or not isinstance(digest, str)
                or not re.fullmatch(r"[0-9a-f]{64}", digest)):
            raise ValueError("invalid manifest size or digest")
        path = site / name
        if path.stat().st_size != size:
            raise ValueError(f"artifact size mismatch: {name}")
        with path.open("rb") as handle:
            actual_digest = hashlib.file_digest(handle, "sha256").hexdigest()
        if actual_digest != digest:
            raise ValueError(f"artifact digest mismatch: {name}")
    return {"source_sha": expected_source_sha, "files_verified": len(seen),
            "manifest_sha256": hashlib.sha256(manifest_path.read_bytes()).hexdigest(),
            "byte_consistency": True, "release_approval": False}


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--site", type=Path, required=True)
    parser.add_argument("--source-sha", required=True)
    args = parser.parse_args()
    try:
        result = validate_artifact(args.site, args.source_sha)
    except (OSError, ValueError, TypeError, KeyError) as exc:
        print(f"Public artifact validation failed: {exc}", file=sys.stderr)
        return 1
    print(json.dumps(result, sort_keys=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
