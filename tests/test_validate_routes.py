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


if __name__ == "__main__":
    unittest.main()
