# URAI Foundation System-of-Systems Integration Contract

This document defines how URAI Foundation is integrated across the URAI system of systems.

## Integration status

Status: `repo-live / domain-dns-blocked`

The Foundation repository contains the public static website, governance standards, ethical AI principles, transparency framework, risk-review process, decision templates, accessibility/site-quality checklist, versioning policy, changelog, issue templates, validation tooling, and CI workflow.

The public domain `uraifoundation.org` is still blocked by DNS routing while it resolves to Squarespace infrastructure. The repository is ready to serve the site once DNS points to GitHub Pages.

## Canonical repository

- Repository: `LifeLoggerAI/urai-foundation`
- Public site files: `index.html`, `styles.css`, `favicon.svg`, `site.webmanifest`, `robots.txt`, `sitemap.xml`, `CNAME`
- Validation command: `python3 -m unittest discover -s tests && python3 scripts/validate-docs.py`
- Domain target: `uraifoundation.org`

## Role in the URAI ecosystem

URAI Foundation is the public-interest governance, ethics, transparency, accessibility, and risk-review anchor for the ecosystem.

It should be referenced by:

- URAI B2B Portal for partner and reviewer governance posture.
- URAI Privacy for consent, data-rights, auditability, and public accountability alignment.
- URAI Admin for review queues, escalation posture, and decision records.
- URAI Analytics for privacy-safe reporting, transparency, and aggregation boundaries.
- URAI Studio and Marketing for public-copy safety, non-hype language, and accessibility review.
- URAI Spatial for high-risk spatial consent, room semantics, and environmental-intelligence review.
- URAI Investors for governance, transparency, release traceability, and public trust evidence.

## Required integration surfaces

| Surface | Integration requirement | Current status |
| --- | --- | --- |
| B2B Portal ecosystem map | Foundation module should point to `/governance` and describe standards, risk review, transparency, and DNS blocker | Ready |
| Governance route | Should reference Foundation as the public standards anchor for ethics, consent, auditability, and release review | Ready |
| Release audit | Should distinguish repository readiness from domain/DNS deployment readiness | Ready |
| Public homepage | Should surface the Foundation standards and participation paths | Ready |
| DNS/deployment | Domain must stop resolving to Squarespace and point to GitHub Pages | Blocked outside repo |

## DNS requirements for live domain

The apex domain should use GitHub Pages A records:

```text
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153
```

The `www` host should use:

```text
CNAME www   lifeloggerai.github.io
```

## Live verification

After DNS changes, verify:

```bash
dig uraifoundation.org +short
dig www.uraifoundation.org +short
curl -I https://uraifoundation.org/
curl -I https://uraifoundation.org/favicon.svg
curl -I https://uraifoundation.org/site.webmanifest
curl -I https://uraifoundation.org/sitemap.xml
```

Expected result:

- `dig uraifoundation.org +short` returns GitHub Pages IPs.
- `dig www.uraifoundation.org +short` resolves through `lifeloggerai.github.io` or GitHub Pages.
- HTTP responses no longer include `server: Squarespace`.
- `/sitemap.xml` returns `200`.

## Non-negotiable boundaries

- Do not claim the public domain is deployed until DNS no longer resolves to Squarespace.
- Do not present clinical, therapeutic, diagnostic, crisis-prediction, deception-detection, or trust-scoring claims as Foundation promises.
- Keep Foundation commitments reviewable through issues, pull requests, decision records, risk reviews, versioning, and changelog entries.
- Treat sensitive reports through private security channels, not public issues.

## Completion definition

Foundation is fully integrated when:

1. Repository checks pass.
2. B2B Portal ecosystem registry marks the Foundation as `live-foundation` with the DNS blocker explicit.
3. Foundation docs include this integration contract.
4. Public website links to standards, templates, participation, and system-of-systems role.
5. Domain DNS resolves to GitHub Pages and no longer serves Squarespace.
