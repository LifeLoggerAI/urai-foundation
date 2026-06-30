#!/usr/bin/env python3
"""Smoke-test required URAI Foundation routes over HTTPS."""

from __future__ import annotations

import sys
import urllib.error
import urllib.request
from dataclasses import dataclass

DOMAIN = "https://uraifoundation.org"
REQUIRED_PATHS = [
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
]
TIMEOUT_SECONDS = 15
FORBIDDEN_SERVER_MARKERS = ("squarespace",)


@dataclass(frozen=True)
class SmokeResult:
    url: str
    ok: bool
    status: int | None
    detail: str


def request_url(url: str) -> SmokeResult:
    request = urllib.request.Request(url, method="GET", headers={"User-Agent": "urai-foundation-smoke/1.0"})
    try:
        with urllib.request.urlopen(request, timeout=TIMEOUT_SECONDS) as response:
            status = response.getcode()
            content_type = response.headers.get("content-type", "")
            server = response.headers.get("server", "")
            lower_server = server.lower()
            wrong_host = any(marker in lower_server for marker in FORBIDDEN_SERVER_MARKERS)
            ok = 200 <= status < 400 and not wrong_host
            detail = f"status={status} content-type={content_type!r} server={server!r}"
            if wrong_host:
                detail = f"{detail} wrong-host=true"
            return SmokeResult(url=url, ok=ok, status=status, detail=detail)
    except urllib.error.HTTPError as exc:
        return SmokeResult(url=url, ok=False, status=exc.code, detail=f"http error: {exc}")
    except urllib.error.URLError as exc:
        return SmokeResult(url=url, ok=False, status=None, detail=f"url error: {exc.reason}")
    except TimeoutError as exc:
        return SmokeResult(url=url, ok=False, status=None, detail=f"timeout: {exc}")


def main() -> int:
    results = [request_url(f"{DOMAIN}{path}") for path in REQUIRED_PATHS]
    failures = [result for result in results if not result.ok]

    for result in results:
        prefix = "PASS" if result.ok else "FAIL"
        print(f"{prefix} {result.url} {result.detail}")

    if failures:
        print(f"Live route smoke test failed for {len(failures)} route(s).")
        return 1

    print(f"Live route smoke test passed for {len(results)} route(s).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
