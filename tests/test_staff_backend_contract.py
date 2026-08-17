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


if __name__ == "__main__":
    unittest.main()
