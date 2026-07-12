# URAI Foundation public-authority release receipt

Date: 2026-07-10
Repository: `LifeLoggerAI/urai-foundation`
Branch: `main`
Authority correction merge: `20020a43c7584ecfd7123f81232872e0bc189669`
Canonical domain: `https://uraifoundation.org`

## Release scope

This release publishes the evidence-safe Foundation status language and the canonical status route introduced by the public-authority correction.

The public wording intentionally does not claim separate incorporation, federal tax exemption, 501(c)(3) recognition, donation deductibility, or charitable registration without authoritative records.

## Deployment mechanism

GitHub Pages deployment is defined in `.github/workflows/pages.yml` and is triggered by pushes to `main`. This receipt commit is intended to trigger that workflow after the authority correction merge.

## Verification required

The release is not considered verified until the following are captured:

- successful GitHub Pages workflow conclusion;
- public HTTPS response for `https://uraifoundation.org/`;
- public HTTPS response for `https://uraifoundation.org/status/`;
- reachable `robots.txt` and `sitemap.xml`;
- confirmation that the live pages contain the evidence-safe initiative language;
- DNS and certificate confirmation for the canonical domain.

## Security note

No credentials, tax identifiers, private addresses, signatures, or nonpublic formation records belong in this receipt.
