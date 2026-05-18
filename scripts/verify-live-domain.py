#!/usr/bin/env python3
"""Verify whether uraifoundation.org is actually serving the GitHub Pages site."""

from __future__ import annotations

import socket
import ssl
import sys
from http.client import HTTPSConnection
from urllib.parse import urlparse

DOMAIN = "uraifoundation.org"
WWW_DOMAIN = "www.uraifoundation.org"
EXPECTED_APEX_IPS = {
    "185.199.108.153",
    "185.199.109.153",
    "185.199.110.153",
    "185.199.111.153",
}
BLOCKED_SQUARESPACE_IPS = {
    "198.49.23.144",
    "198.49.23.145",
    "198.185.159.144",
    "198.185.159.145",
}
URLS = [
    "https://uraifoundation.org/",
    "https://uraifoundation.org/favicon.svg",
    "https://uraifoundation.org/site.webmanifest",
    "https://uraifoundation.org/sitemap.xml",
]


def resolve_ips(hostname: str) -> set[str]:
    try:
        return {info[4][0] for info in socket.getaddrinfo(hostname, 443, type=socket.SOCK_STREAM)}
    except socket.gaierror as exc:
        raise RuntimeError(f"Could not resolve {hostname}: {exc}") from exc


def head(url: str) -> tuple[int, dict[str, str]]:
    parsed = urlparse(url)
    if parsed.scheme != "https" or not parsed.hostname:
        raise ValueError(f"Unsupported URL: {url}")

    context = ssl.create_default_context()
    connection = HTTPSConnection(parsed.hostname, 443, timeout=15, context=context)
    try:
        path = parsed.path or "/"
        if parsed.query:
            path += f"?{parsed.query}"
        connection.request("HEAD", path, headers={"User-Agent": "urai-foundation-live-domain-check/1.0"})
        response = connection.getresponse()
        headers = {key.lower(): value for key, value in response.getheaders()}
        response.read()
        return response.status, headers
    finally:
        connection.close()


def main() -> int:
    failures: list[str] = []

    apex_ips = resolve_ips(DOMAIN)
    www_ips = resolve_ips(WWW_DOMAIN)
    print(f"{DOMAIN}: {', '.join(sorted(apex_ips)) or 'no records'}")
    print(f"{WWW_DOMAIN}: {', '.join(sorted(www_ips)) or 'no records'}")

    if apex_ips & BLOCKED_SQUARESPACE_IPS:
        failures.append(f"{DOMAIN} still resolves to Squarespace IPs: {', '.join(sorted(apex_ips & BLOCKED_SQUARESPACE_IPS))}")

    if not (apex_ips & EXPECTED_APEX_IPS):
        failures.append(f"{DOMAIN} does not resolve to GitHub Pages apex IPs: {', '.join(sorted(EXPECTED_APEX_IPS))}")

    for url in URLS:
        status, headers = head(url)
        server = headers.get("server", "")
        content_type = headers.get("content-type", "")
        print(f"{url} -> {status} server={server or 'unknown'} content-type={content_type or 'unknown'}")

        if "squarespace" in server.lower():
            failures.append(f"{url} is still served by Squarespace")
        if url.endswith("/sitemap.xml") and status != 200:
            failures.append(f"{url} returned {status}, expected 200")
        if url == "https://uraifoundation.org/" and status != 200:
            failures.append(f"{url} returned {status}, expected 200")

    if failures:
        print("\nLive domain verification failed:")
        for failure in failures:
            print(f"- {failure}")
        print("\nRequired DNS records:")
        print("A     @     185.199.108.153")
        print("A     @     185.199.109.153")
        print("A     @     185.199.110.153")
        print("A     @     185.199.111.153")
        print("CNAME www   lifeloggerai.github.io")
        return 1

    print("\nLive domain verification passed. uraifoundation.org is no longer serving Squarespace.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
