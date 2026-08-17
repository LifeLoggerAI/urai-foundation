#!/usr/bin/env python3
"""Static security contract for the Foundation staff backend."""

from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def main() -> int:
    errors: list[str] = []

    firebase = json.loads((ROOT / "firebase.json").read_text(encoding="utf-8"))
    if "project" in firebase:
        errors.append("firebase.json must not hard-code a Firebase project")

    rules = (ROOT / "firestore.rules").read_text(encoding="utf-8")
    functions = (ROOT / "functions/src/index.ts").read_text(encoding="utf-8")
    bootstrap = (ROOT / "functions/scripts/bootstrap-owner.mjs").read_text(encoding="utf-8")

    required_rules = [
        "allow read, write: if false;",
        "request.auth.token.foundation_staff == true",
        "request.auth.token.email_verified == true",
        "match /foundationStaff/{uid}",
        "match /grantApplications/{applicationId}",
        "match /grantApprovals/{approvalId}",
        "match /foundationAuditLogs/{eventId}",
        "allow create, update, delete: if false;",
    ]
    for snippet in required_rules:
        if snippet not in rules:
            errors.append(f"firestore.rules missing required security contract: {snippet}")

    required_functions = [
        "enforceAppCheck: true",
        "RECENT_AUTH_SECONDS = 5 * 60",
        "sign_in_second_factor",
        "foundation_staff",
        "foundation_role",
        "unresolvedCount !== 0",
        "grant.application.approved",
    ]
    for snippet in required_functions:
        if snippet not in functions:
            errors.append(f"functions/src/index.ts missing privileged-action control: {snippet}")

    forbidden_functions = [
        "serviceAccount",
        "private_key",
        "BEGIN PRIVATE KEY",
        "markSubmittedWithoutReview",
    ]
    for snippet in forbidden_functions:
        if snippet in functions or snippet in bootstrap:
            errors.append(f"backend contains forbidden credential/bypass marker: {snippet}")

    required_bootstrap = [
        "URAI_FOUNDATION_OWNER_EMAIL",
        "URAI_FOUNDATION_FIREBASE_PROJECT_ID",
        "Refusing to guess a Firebase project",
        "foundation_role: 'owner'",
    ]
    for snippet in required_bootstrap:
        if snippet not in bootstrap:
            errors.append(f"owner bootstrap missing guard: {snippet}")

    if errors:
        print("Foundation staff backend validation failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    print("Foundation staff backend validation passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
