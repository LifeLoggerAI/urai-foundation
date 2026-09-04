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
        self.assertIn("contains generated factual language that must remain unresolved", functions)
        self.assertIn("typeof item.generatedByModel === 'string'", functions)
        self.assertIn("assertAnswersMatchOpportunity(answers, opportunity.data() ?? {})", functions)
        self.assertIn("definedQuestionIds.has(questionId)", functions)
        self.assertIn("submittedQuestionIds.has(questionId)", functions)
        self.assertIn("Every required grant opportunity question must have exactly one answer.", functions)
        self.assertGreaterEqual(functions.count("await validateCurrentApplicationOpportunity(tx, value)"), 2)
        self.assertIn("function stableDefinition(value: unknown): string", functions)
        self.assertIn("opportunityQuestionDefinition", functions)
        self.assertIn("application.opportunityQuestionDefinition !== currentDefinition", functions)
        self.assertIn("question definition changed after this application was saved.", functions)
        self.assertIn("Grant application is missing its opportunity binding.", functions)
        self.assertIn("await validateAnswerProvenance(tx, Array.isArray(value.answers) ? value.answers : [])", functions)
        self.assertIn("AUTHORITATIVE_PROVENANCE_COLLECTIONS", functions)
        self.assertIn("fieldId !== questionId", functions)
        # Profile provenance must reject both non-string stored values and values
        # that do not exactly match the reviewed application answer. This is
        # stricter than the superseded String(...).trim() coercion contract.
        self.assertIn("typeof sourceData.value !== 'string'", functions)
        self.assertIn("sourceData.value.trim() !== answerValue", functions)
        self.assertIn("priorData.approvedVersion !== applicationVersion", functions)
        self.assertIn("priorItem.questionId === questionId", functions)
        self.assertIn("priorItem.state === 'verified'", functions)
        self.assertIn("const opportunityRef = db.collection('grantOpportunities').doc(opportunityId)", functions)
        self.assertIn("if (!opportunity.exists)", functions)
        self.assertNotIn(r"\n", functions)


if __name__ == "__main__":
    unittest.main()
