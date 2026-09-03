#!/usr/bin/env python3

from __future__ import annotations

import importlib.util
import unittest
from pathlib import Path

SCRIPT = Path(__file__).resolve().parents[1] / "scripts" / "validate-staff-backend.py"
SPEC = importlib.util.spec_from_file_location("validate_staff_backend", SCRIPT)
assert SPEC is not None and SPEC.loader is not None
validate_staff_backend = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(validate_staff_backend)


class StaffBackendContractTests(unittest.TestCase):
    def test_staff_backend_security_contract_passes(self) -> None:
        self.assertEqual(validate_staff_backend.main(), 0)

    def test_supported_roles_and_transactional_authority_rechecks_are_locked(self) -> None:
        rules = (validate_staff_backend.ROOT / "firestore.rules").read_text(encoding="utf-8")
        functions = (validate_staff_backend.ROOT / "functions/src/index.ts").read_text(encoding="utf-8")
        bootstrap = (validate_staff_backend.ROOT / "functions/scripts/bootstrap-owner.mjs").read_text(encoding="utf-8")
        self.assertIn("foundation_role in ['owner', 'admin', 'reviewer', 'grant_writer', 'staff']", rules)
        self.assertGreaterEqual(functions.count("await assertStaffInTransaction(tx, actor"), 4)
        self.assertIn("const existingStaff = await staffRef.get()", bootstrap)
        self.assertIn("claimsAlreadyOwner", bootstrap)
        self.assertIn("validateAnswerProvenance(tx, answers)", functions)
        self.assertIn("AUTHORITATIVE_PROVENANCE_COLLECTIONS", functions)


if __name__ == "__main__":
    unittest.main()
