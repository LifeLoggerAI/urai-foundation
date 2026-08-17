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
    "/grants/",
]
REQUIRED_BOUNDARY_SNIPPETS = (
    "does not claim",
    "does not create",
    "does not represent",
    "should not infer",
    "unless separately verified",
    "unless those are separately verified",
)
FORBIDDEN_SNIPPETS = [
    "donate now",
    "make a donation",
    "tax exempt",
    "tax-exempt organization",
    "official partner",
    "certified partner",
    "therapy service",
    "medical service",
    "clinical service",
    "diagnostic service",
]

NEGATED_NONCLAIMS = {
    "clinical service": (
        "does not represent separate tax-exempt status, donation deductibility, grants, clinical services, or confirmed institutional partnerships",
    ),
}

GRANT_ROUTE_REQUIRED_SNIPPETS = (
    "does not transmit a real grant application",
    "human sign-off is required",
    "unknown facts stay unresolved",
)


def route_file(route: str) -> Path:
    if route == "/":
        return ROOT / "index.html"
    return ROOT / route.strip("/") / "index.html"


def text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def sitemap_urls() -> set[str]:
    tree = ElementTree.parse(ROOT / "sitemap.xml")
    namespace = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    urls: set[str] = set()
    for loc in tree.findall(".//sm:loc", namespace):
        if loc.text:
            urls.add(loc.text.strip())
    return urls


def has_allowed_negated_nonclaim(body: str, snippet: str) -> bool:
    return any(phrase in body for phrase in NEGATED_NONCLAIMS.get(snippet, ()))


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
            if snippet in body and not has_allowed_negated_nonclaim(body, snippet):
                errors.append(f"forbidden unsupported claim snippet in {path.relative_to(ROOT)}: {snippet}")

        if route == "/grants/":
            for snippet in GRANT_ROUTE_REQUIRED_SNIPPETS:
                if snippet not in body:
                    errors.append(f"grant route missing required assistance boundary: {snippet}")

        expected_url = f"{DOMAIN}{route}"
        if expected_url not in urls:
            errors.append(f"sitemap missing route URL: {expected_url}")

    if errors:
        print("Route validation failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    print(f"Route validation passed for {len(REQUIRED_ROUTES)} required routes.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
