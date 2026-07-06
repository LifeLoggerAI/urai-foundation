#!/usr/bin/env python3
"""Validate the formation-stage standards registry with the Python standard library."""

from __future__ import annotations

import json
import re
import sys
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REGISTRY_PATH = ROOT / "standards" / "registry.json"
ID_RE = re.compile(r"^URAI-[A-Z]{3}-[0-9]{3}$")
ALLOWED_STATUSES = {"formation-draft", "public-review", "adopted", "superseded", "withdrawn"}
ALLOWED_STRENGTHS = {"informational", "guidance", "normative"}
ALLOWED_COMMENT = {"not-open", "open", "closed", "not-required"}
ALLOWED_CONFORMANCE = {"not-available", "self-attestation", "reviewed-implementation"}


def load_registry(path: Path = REGISTRY_PATH) -> dict:
    with path.open(encoding="utf-8") as handle:
        value = json.load(handle)
    if not isinstance(value, dict):
        raise ValueError("registry root must be an object")
    return value


def validate_registry(registry: dict, root: Path = ROOT) -> list[str]:
    errors: list[str] = []
    required_root = {
        "schema_version",
        "registry_status",
        "last_reviewed",
        "controlling_language",
        "conformance_program",
        "certification_program",
        "standards",
    }
    missing = sorted(required_root - registry.keys())
    if missing:
        errors.append(f"registry missing root fields: {', '.join(missing)}")

    try:
        date.fromisoformat(str(registry.get("last_reviewed", "")))
    except ValueError:
        errors.append("last_reviewed must be an ISO date")

    if registry.get("certification_program") != "not-established":
        errors.append("certification_program must remain not-established until an approved process exists")

    standards = registry.get("standards")
    if not isinstance(standards, list) or not standards:
        errors.append("standards must be a non-empty array")
        return errors

    seen_ids: set[str] = set()
    seen_paths: set[str] = set()
    required_standard = {
        "id",
        "title",
        "version",
        "status",
        "normative_strength",
        "path",
        "owner_role",
        "review_required",
        "public_comment",
        "conformance",
    }

    for index, standard in enumerate(standards):
        prefix = f"standards[{index}]"
        if not isinstance(standard, dict):
            errors.append(f"{prefix} must be an object")
            continue
        missing_fields = sorted(required_standard - standard.keys())
        if missing_fields:
            errors.append(f"{prefix} missing fields: {', '.join(missing_fields)}")
            continue

        standard_id = standard["id"]
        if not isinstance(standard_id, str) or not ID_RE.fullmatch(standard_id):
            errors.append(f"{prefix}.id has invalid format: {standard_id!r}")
        elif standard_id in seen_ids:
            errors.append(f"duplicate standard id: {standard_id}")
        seen_ids.add(str(standard_id))

        path_value = standard["path"]
        if not isinstance(path_value, str) or not path_value.startswith("docs/") or not path_value.endswith(".md"):
            errors.append(f"{prefix}.path must point to a Markdown file under docs/")
        else:
            resolved = (root / path_value).resolve()
            try:
                resolved.relative_to(root.resolve())
            except ValueError:
                errors.append(f"{prefix}.path escapes repository: {path_value}")
            else:
                if not resolved.is_file():
                    errors.append(f"{prefix}.path does not exist: {path_value}")
        if path_value in seen_paths:
            errors.append(f"duplicate standard path: {path_value}")
        seen_paths.add(str(path_value))

        if standard["status"] not in ALLOWED_STATUSES:
            errors.append(f"{prefix}.status is invalid: {standard['status']!r}")
        if standard["normative_strength"] not in ALLOWED_STRENGTHS:
            errors.append(f"{prefix}.normative_strength is invalid: {standard['normative_strength']!r}")
        if standard["public_comment"] not in ALLOWED_COMMENT:
            errors.append(f"{prefix}.public_comment is invalid: {standard['public_comment']!r}")
        if standard["conformance"] not in ALLOWED_CONFORMANCE:
            errors.append(f"{prefix}.conformance is invalid: {standard['conformance']!r}")

        reviews = standard["review_required"]
        if not isinstance(reviews, list) or not reviews or not all(isinstance(item, str) and item.strip() for item in reviews):
            errors.append(f"{prefix}.review_required must be a non-empty string array")
        elif len(reviews) != len(set(reviews)):
            errors.append(f"{prefix}.review_required contains duplicates")

        if standard["status"] != "adopted" and standard["conformance"] != "not-available":
            errors.append(f"{prefix} cannot offer conformance before adoption")

    return errors


def main() -> int:
    try:
        registry = load_registry()
    except (OSError, json.JSONDecodeError, ValueError) as exc:
        print(f"Standards registry validation failed: {exc}")
        return 1

    errors = validate_registry(registry)
    if errors:
        print("Standards registry validation failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    print(f"Standards registry validation passed for {len(registry['standards'])} records.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
