#!/usr/bin/env python3
"""Smoke-test required URAI Foundation routes over HTTPS."""

from __future__ import annotations

import argparse
import os
import sys
import urllib.error
import urllib.request
from dataclasses import dataclass
from urllib.parse import urlparse

DEFAULT_BASE_URL = os.environ.get("URAI_FOUNDATION_BASE_URL", "https://uraifoundation.org").rstrip("/")
DOMAIN = DEFAULT_BASE_URL  # Backward-compatible alias for existing tests and scripts.
REQUIRED_PATHS = [
    "/",
    "/status/",
    "/accessibility/",
    "/deaf-community/",
    "/emotional-wellness/",
    "/responsible-ai/",
    "/research/",
    "/partners/",
    "/contact/",
    "/privacy/",
    "/terms/",
    "/community/",
    "/donate/",
    "/staff/",
    "/grants/",
    "/grants/grants.js",
    "/robots.txt",
    "/sitemap.xml",
    "/site.webmanifest",
    "/public-build-manifest.json",
    "/standards/registry.json",
]
TIMEOUT_SECONDS = 15
FORBIDDEN_SERVER_MARKERS = ("squarespace",)
EXPECTED_HOME_MARKER = "URAI Foundation"
EXPECTED_ROUTE_MARKERS = {
    "/": EXPECTED_HOME_MARKER,
    "/community/": "Community outreach",
    "/donate/": "Online payment processing is not activated",
    "/staff/": "Authentication is not connected",
    "/grants/": (
        "This public branch contains a demonstration workflow only.",
        '<meta name="robots" content="noindex, nofollow">',
    ),
    "/grants/grants.js": "foundation-staff-grant-desk-demo-v1",
}


@dataclass(frozen=True)
class SmokeResult:
    url: str
    ok: bool
    status: int | None
    detail: str


def validate_base_url(base_url: str) -> str:
    parsed = urlparse(base_url)
    if parsed.scheme != "https" or not parsed.netloc or parsed.path not in {"", "/"}:
        raise ValueError("base URL must be an HTTPS origin without a path")
    return base_url.rstrip("/")


def request_url(url: str, expected_marker: str | tuple[str, ...] | None = None) -> SmokeResult:
    request = urllib.request.Request(url, method="GET", headers={"User-Agent": "urai-foundation-smoke/2.0"})
    try:
        with urllib.request.urlopen(request, timeout=TIMEOUT_SECONDS) as response:
            status = response.getcode()
            content_type = response.headers.get("content-type", "")
            server = response.headers.get("server", "")
            lower_server = server.lower()
            wrong_host = any(marker in lower_server for marker in FORBIDDEN_SERVER_MARKERS)
            markers = (expected_marker,) if isinstance(expected_marker, str) else tuple(expected_marker or ())
            body = response.read(512_000) if markers else b""
            missing_markers = [marker for marker in markers if marker.encode("utf-8") not in body]
            marker_ok = not missing_markers
            ok = 200 <= status < 400 and not wrong_host and marker_ok
            detail = f"status={status} content-type={content_type!r} server={server!r}"
            if wrong_host:
                detail = f"{detail} wrong-host=true"
            if not marker_ok:
                detail = f"{detail} expected-marker-missing={missing_markers!r}"
            return SmokeResult(url=url, ok=ok, status=status, detail=detail)
    except urllib.error.HTTPError as exc:
        return SmokeResult(url=url, ok=False, status=exc.code, detail=f"http error: {exc}")
    except urllib.error.URLError as exc:
        return SmokeResult(url=url, ok=False, status=None, detail=f"url error: {exc.reason}")
    except TimeoutError as exc:
        return SmokeResult(url=url, ok=False, status=None, detail=f"timeout: {exc}")


def main(base_url: str = DEFAULT_BASE_URL) -> int:
    try:
        origin = validate_base_url(base_url)
    except ValueError as exc:
        print(f"Live route smoke test configuration failed: {exc}")
        return 2

    results = [
        request_url(f"{origin}{path}", expected_marker=EXPECTED_ROUTE_MARKERS.get(path))
        for path in REQUIRED_PATHS
    ]
    failures = [result for result in results if not result.ok]

    for result in results:
        prefix = "PASS" if result.ok else "FAIL"
        print(f"{prefix} {result.url} {result.detail}")

    if failures:
        print(f"Live route smoke test failed for {len(failures)} route(s).")
        return 1

    print(f"Live route smoke test passed for {len(results)} route(s) at {origin}.")
    return 0


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--base-url", default=DEFAULT_BASE_URL)
    arguments = parser.parse_args()
    sys.exit(main(arguments.base_url))
