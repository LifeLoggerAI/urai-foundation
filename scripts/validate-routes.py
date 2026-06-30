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
    "/accessibility/",
    "/deaf-community/",
    "/emotional-wellness/",
    "/responsible-ai/",
    "/research/",
    "/partners/",
    "/contact/",
    "/privacy/",
    "/terms/",
]
REQUIRED_TEXT = "formation"
FORBIDDEN_SNIPPETS = [
    "donate now",
    "make a donation",
    "501(c)(3)",
    "tax exempt",
    "tax-exempt organization",
    "apply for a grant",
    "grant application",
    "official partner",
    "certified partner",
    "therapy service",
    "medical service",
    "clinical service",
    "diagnostic service",
]


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


def main() -> int:
    errors: list[str] = []
    urls = sitemap_urls()

    for route in REQUIRED_ROUTES:
        path = route_file(route)
        if not path.exists():
            errors.append(f"missing route file: {path.relative_to(ROOT)}")
            continue

        body = text(path).lower()
        if REQUIRED_TEXT not in body:
            errors.append(f"route does not include formation-era boundary language: {path.relative_to(ROOT)}")

        for snippet in FORBIDDEN_SNIPPETS:
            if snippet in body:
                errors.append(f"forbidden unsupported claim snippet in {path.relative_to(ROOT)}: {snippet}")

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
