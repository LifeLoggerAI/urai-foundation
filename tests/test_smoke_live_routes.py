#!/usr/bin/env python3
"""Unit tests for live route smoke-check helpers."""

from __future__ import annotations

import importlib.util
import sys
import unittest
from pathlib import Path
from unittest.mock import MagicMock, patch

SCRIPT = Path(__file__).resolve().parents[1] / "scripts" / "smoke-live-routes.py"
SPEC = importlib.util.spec_from_file_location("smoke_live_routes", SCRIPT)
assert SPEC is not None and SPEC.loader is not None
smoke_live_routes = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = smoke_live_routes
SPEC.loader.exec_module(smoke_live_routes)


class SmokeLiveRoutesTests(unittest.TestCase):
    def test_required_paths_include_all_public_routes_and_sitemap(self) -> None:
        expected_paths = {
            "/",
            "/accessibility/",
            "/deaf-community/",
            "/emotional-wellness/",
            "/responsible-ai/",
            "/research/",
            "/partners/",
            "/contact/",
            "/privacy/",
            "/terms/",
            "/sitemap.xml",
        }
        self.assertTrue(expected_paths.issubset(set(smoke_live_routes.REQUIRED_PATHS)))

    def test_request_url_marks_2xx_response_ok(self) -> None:
        response = MagicMock()
        response.__enter__.return_value = response
        response.getcode.return_value = 200
        response.headers.get.side_effect = lambda key, default="": {"content-type": "text/html", "server": "GitHub.com"}.get(key, default)

        with patch.object(smoke_live_routes.urllib.request, "urlopen", return_value=response):
            result = smoke_live_routes.request_url(smoke_live_routes.DOMAIN + "/")

        self.assertTrue(result.ok)
        self.assertEqual(result.status, 200)
        self.assertIn("status=200", result.detail)

    def test_main_returns_failure_when_any_route_fails(self) -> None:
        with patch.object(
            smoke_live_routes,
            "request_url",
            side_effect=[
                smoke_live_routes.SmokeResult(smoke_live_routes.DOMAIN + "/", True, 200, "ok"),
                smoke_live_routes.SmokeResult(smoke_live_routes.DOMAIN + "/accessibility/", False, 404, "missing"),
            ],
        ), patch.object(smoke_live_routes, "REQUIRED_PATHS", ["/", "/accessibility/"]):
            self.assertEqual(smoke_live_routes.main(), 1)


if __name__ == "__main__":
    unittest.main()
