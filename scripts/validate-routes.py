#!/usr/bin/env python3
"""Validate required URAI Foundation static routes and sitemap entries."""

from __future__ import annotations

import sys
from pathlib import Path
from xml.etree import ElementTree

ROOT = Path(__file__).resolve().parents[1]
DOMAIN = "https://uraifoundation.org"
REQUIRED_ROUTES = [
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
]
PRIVATE_NOINDEX_ROUTES = {"/staff/", "/grants/"}
REQUIRED_BOUNDARY_SNIPPETS = (
    "does not claim",
    "does not create",
    "does not represent",
    "should not infer",
    "unless separately verified",
    "unless those are separately verified",
    "only when separately verified",
)
FORBIDDEN_SNIPPETS = [
    "donate now",
    "make a donation",
    "tax exempt",
    "tax-exempt organization",
    "apply for a grant",
    "grant application",
    "clinical service",
    "official partner",
    "certified partner",
    "therapy service",
    "medical service",
    "diagnostic service",
]

ROUTE_ALLOWED_SNIPPETS = {
    "/grants/": {"grant application"},
}

GRANT_ROUTE_REQUIRED_SNIPPETS = (
    "does not accept employee credentials",
    "employee approval is required",
    "unknown facts stay unresolved",
    "production access must require authenticated employee identity",
)
STAFF_ROUTE_REQUIRED_SNIPPETS = (
    "authentication is not connected",
    "do not enter passwords",
    "must fail closed",
    "role-based authorization",
)
DONATE_ROUTE_REQUIRED_SNIPPETS = (
    "online payment processing is not activated",
    "does not represent that a contribution is tax deductible",
    "payment processor",
    "donor privacy",
)


def route_file(route: str) -> Path:
    return ROOT / "index.html" if route == "/" else ROOT / route.strip("/") / "index.html"


def text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def sitemap_urls() -> set[str]:
    tree = ElementTree.parse(ROOT / "sitemap.xml")
    namespace = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    return {loc.text.strip() for loc in tree.findall(".//sm:loc", namespace) if loc.text}


def main() -> int:
    errors: list[str] = []
    urls = sitemap_urls()

    for route in REQUIRED_ROUTES:
        path = route_file(route)
        if not path.exists():
            errors.append(f"missing route file: {path.relative_to(ROOT)}")
            continue

        body = text(path).lower()
        if not any(snippet in body for snippet in REQUIRED_BOUNDARY_SNIPPETS):
            errors.append(f"route does not include conservative legal/status boundary language: {path.relative_to(ROOT)}")

        for snippet in FORBIDDEN_SNIPPETS:
            if snippet in body and snippet not in ROUTE_ALLOWED_SNIPPETS.get(route, set()):
                errors.append(f"forbidden unsupported claim snippet in {path.relative_to(ROOT)}: {snippet}")

        if route in PRIVATE_NOINDEX_ROUTES:
            if 'name="robots" content="noindex, nofollow"' not in body:
                errors.append(f"private route must remain noindex until protected authentication is live: {route}")
            if f"{DOMAIN}{route}" in urls:
                errors.append(f"private noindex route must not be published in sitemap: {route}")
        else:
            expected_url = f"{DOMAIN}{route}"
            if expected_url not in urls:
                errors.append(f"sitemap missing route URL: {expected_url}")

        if route == "/grants/":
            for snippet in GRANT_ROUTE_REQUIRED_SNIPPETS:
                if snippet not in body:
                    errors.append(f"grant route missing required employee-workflow boundary: {snippet}")

        if route == "/staff/":
            for snippet in STAFF_ROUTE_REQUIRED_SNIPPETS:
                if snippet not in body:
                    errors.append(f"staff route missing required authentication boundary: {snippet}")

        if route == "/donate/":
            for snippet in DONATE_ROUTE_REQUIRED_SNIPPETS:
                if snippet not in body:
                    errors.append(f"donate route missing required activation boundary: {snippet}")

    if errors:
        print("Route validation failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    print(f"Route validation passed for {len(REQUIRED_ROUTES)} required routes.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
