#!/usr/bin/env python3
"""Unit tests for required route validation."""

from __future__ import annotations

import importlib.util
import unittest
from pathlib import Path

SCRIPT = Path(__file__).resolve().parents[1] / "scripts" / "validate-routes.py"
SPEC = importlib.util.spec_from_file_location("validate_routes", SCRIPT)
assert SPEC is not None and SPEC.loader is not None
validate_routes = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(validate_routes)


class ValidateRoutesTests(unittest.TestCase):
    def test_required_route_files_exist(self) -> None:
        for route in validate_routes.REQUIRED_ROUTES:
            with self.subTest(route=route):
                self.assertTrue(validate_routes.route_file(route).exists())

    def test_public_routes_are_in_sitemap(self) -> None:
        urls = validate_routes.sitemap_urls()
        for route in validate_routes.REQUIRED_ROUTES:
            if route in validate_routes.PRIVATE_NOINDEX_ROUTES:
                continue
            with self.subTest(route=route):
                self.assertIn(f"{validate_routes.DOMAIN}{route}", urls)

    def test_private_noindex_routes_are_not_in_sitemap(self) -> None:
        urls = validate_routes.sitemap_urls()
        for route in validate_routes.PRIVATE_NOINDEX_ROUTES:
            with self.subTest(route=route):
                self.assertNotIn(f"{validate_routes.DOMAIN}{route}", urls)

    def test_route_validator_passes_current_repository(self) -> None:
        self.assertEqual(validate_routes.main(), 0)

    def test_unsupported_claims_keep_only_narrow_private_route_exception(self) -> None:
        self.assertIn("tax-exempt organization", validate_routes.FORBIDDEN_SNIPPETS)
        self.assertIn("apply for a grant", validate_routes.FORBIDDEN_SNIPPETS)
        self.assertIn("grant application", validate_routes.FORBIDDEN_SNIPPETS)
        self.assertIn("clinical service", validate_routes.FORBIDDEN_SNIPPETS)
        self.assertEqual(validate_routes.ROUTE_ALLOWED_SNIPPETS, {"/grants/": {"grant application"}})

    def test_grant_preview_is_nonpersistent_and_exports_only_approved_snapshot(self) -> None:
        script = (validate_routes.ROOT / "grants/grants.js").read_text(encoding="utf-8")
        self.assertNotIn("localStorage", script)
        self.assertNotIn("sessionStorage", script)
        self.assertIn("approvedPayload", script)
        self.assertIn("const payload = state.approvedPayload", script)
        self.assertIn("invalidateApproval()", script)

    def test_approved_versions_survive_receipt_invalidation(self) -> None:
        script = (validate_routes.ROOT / "grants/grants.js").read_text(encoding="utf-8")
        self.assertIn("approvedVersions: new Set()", script)
        self.assertIn("state.approvedVersions.has(state.version)", script)
        self.assertIn("state.approvedVersions.add(state.version)", script)
        self.assertNotIn("lastApprovedVersion", script)

    def test_grant_preview_requires_rebuild_and_explicit_answer_review(self) -> None:
        script = (validate_routes.ROOT / "grants/grants.js").read_text(encoding="utf-8")
        self.assertIn("builtForOpportunity", script)
        self.assertIn("draftStale", script)
        self.assertIn("data-confirm-review", script)
        self.assertIn("confirmReviewedAnswer", script)
        self.assertIn('answer.status !== "verified"', script)
        self.assertIn("Employee-modified draft; explicit employee review required", script)
        self.assertIn("updateCompletion(); markDraftStale();", script)
        self.assertIn('if (!/^\\$?\\s*\\d+(?:,\\d{3})*(?:\\.\\d{1,2})?$/.test(normalized)) return "";', script)
        self.assertIn('minimumFractionDigits: fractionDigits, maximumFractionDigits: 2', script)
        self.assertIn('status: verified ? "verified" : "missing"', script)
        self.assertIn('answer.value === answer.sourceValue ? "Foundation fact" : "Employee confirmed"', script)

    def test_operator_route_inventories_cover_new_surfaces(self) -> None:
        routes = ["/community/", "/donate/", "/staff/", "/grants/"]
        for filename in ("docs/final-live-cutover-runbook.md", "docs/live-deployment-runbook.md"):
            content = (validate_routes.ROOT / filename).read_text(encoding="utf-8")
            for route in routes:
                with self.subTest(filename=filename, route=route):
                    self.assertIn(route, content)


if __name__ == "__main__":
    unittest.main()
