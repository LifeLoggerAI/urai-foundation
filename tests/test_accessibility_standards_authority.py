#!/usr/bin/env python3
"""Contract tests for the current URAI accessibility standards authority."""

from __future__ import annotations

import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
AUTHORITY = ROOT / "docs" / "foundation" / "URAI_ACCESSIBILITY_STANDARDS_AUTHORITY.md"
CHECKLIST = ROOT / "docs" / "foundation" / "URAI_ACCESSIBILITY_CHECKLIST.md"
TRANSPARENCY = ROOT / "docs" / "transparency-framework.md"


class AccessibilityStandardsAuthorityTests(unittest.TestCase):
    def test_authority_separates_engineering_target_from_legal_applicability(self) -> None:
        content = AUTHORITY.read_text(encoding="utf-8")
        self.assertIn("WCAG 2.2 Level AA", content)
        self.assertIn("WCAG 2.1 Level AA", content)
        self.assertIn("ADA Title II", content)
        self.assertIn("European Accessibility Act", content)
        self.assertIn("28 June 2025", content)
        self.assertIn("April 26, 2027", content)
        self.assertIn("April 26, 2028", content)
        self.assertIn("Engineering target", content)
        self.assertIn("Legal applicability", content)
        self.assertIn("Conformance", content)
        self.assertIn("Certification / legal compliance", content)

    def test_authority_retains_no_false_certification_boundary(self) -> None:
        content = AUTHORITY.read_text(encoding="utf-8")
        self.assertIn("It is not legal advice", content)
        self.assertIn("does not declare", content)
        self.assertIn('"ADA compliant."', content)
        self.assertIn('"European Accessibility Act compliant."', content)
        self.assertIn('"Fully accessible."', content)
        self.assertIn("No checklist, automated scan", content)

    def test_authority_requires_release_bound_evidence(self) -> None:
        content = AUTHORITY.read_text(encoding="utf-8")
        for required in (
            "exact source SHA",
            "deployed version/SHA",
            "assistive technologies evaluated",
            "keyboard-only results",
            "screen-reader/semantic results",
            "text resize/zoom/reflow results",
            "known barriers",
            "remediation owner",
            "legal applicability review",
        ):
            with self.subTest(required=required):
                self.assertIn(required, content)

    def test_existing_accessibility_and_transparency_docs_point_to_authority(self) -> None:
        checklist = CHECKLIST.read_text(encoding="utf-8")
        transparency = TRANSPARENCY.read_text(encoding="utf-8")
        self.assertIn("WCAG 2.2 Level AA", checklist)
        self.assertIn("URAI_ACCESSIBILITY_STANDARDS_AUTHORITY.md", checklist)
        self.assertIn("URAI_ACCESSIBILITY_STANDARDS_AUTHORITY.md", transparency)


if __name__ == "__main__":
    unittest.main()
