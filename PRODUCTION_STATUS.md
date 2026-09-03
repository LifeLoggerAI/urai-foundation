# URAI Foundation Production Status

Last reviewed: 2026-07-06
Repository: `LifeLoggerAI/urai-foundation`
Audit-start `main` SHA: `a8fb209f02d81ad59e7ab9cac90ad503a0dcc0ea`
Status: **SOURCE IMPLEMENTED / CUSTOM-DOMAIN PRODUCTION NOT VERIFIED**

## Executive status

The repository is a documentation-first, static public website and formation-stage standards source. Required public route files exist and public copy is conservative about legal, program, research, partner, certification, donation, grant, and clinical status.

The custom-domain production state is not yet verified because:

- repository files configure GitHub Pages;
- issue #10 reports a separate Firebase Hosting fallback;
- Firebase deployment configuration is absent from this repository;
- exact current deployed and rollback SHAs are not recorded;
- exact-current custom-domain DNS/TLS/route proof is not tied to the current head;
- the audit-start head has no attached check status.

See `docs/canonical-production-truth.md`.

## Source-complete public routes

- `/`
- `/accessibility/`
- `/deaf-community/`
- `/emotional-wellness/`
- `/responsible-ai/`
- `/research/`
- `/partners/`
- `/contact/`
- `/privacy/`
- `/terms/`

Source presence is not live-domain verification.

## Feature truth table

| Feature | Status | Notes |
| --- | --- | --- |
| Static homepage and routes | VERIFIED COMPLETE IN SOURCE | Required HTML files exist. |
| Formation-era claim boundaries | VERIFIED COMPLETE IN SOURCE | Public pages avoid legal/program/clinical/partner/certification claims. |
| Sitemap/robots/manifest/favicon | VERIFIED COMPLETE IN SOURCE | Files exist; live delivery remains unverified. |
| Contact | PARTIAL | Mailto and public issues only; mailbox delivery and private sensitive-report path are unverified. |
| Privacy notice | PARTIAL | Accurate for repository code; host logging/retention requires provider-specific review. |
| Terms notice | REQUIRES LEGAL REVIEW | Conservative informational copy, not legal approval. |
| Core governance/ethics/transparency/risk docs | PARTIAL / FORMATION-DRAFT | Expanded on audit branch; external review and constituted authority remain absent. |
| Standards registry | IMPLEMENTED ON AUDIT BRANCH | Machine-readable draft; no conformance/certification program. |
| Unit and source validation | IMPLEMENTED, NOT YET VERIFIED ON AUDIT BRANCH | `make check` includes tests, docs, routes, and registry validation. |
| Curated public artifact | IMPLEMENTED ON AUDIT BRANCH | Explicit allowlist prevents whole-repository Pages publication. |
| GitHub Pages workflow | IMPLEMENTED, NOT VERIFIED | Requires Pages settings/environment and successful run proof. |
| Firebase staff backend | IMPLEMENTED IN SOURCE, NOT CONFIGURED | `firebase.json` defines Functions and Firestore only, without a project binding; authenticated live behavior remains unverified. |
| Firebase Hosting fallback | REPORTED, NOT REPRODUCIBLE HERE | Issue #10 reports `urai-4dc1d` / `urai-foundation`; the repository has no Hosting target or project mapping. |
| Canonical host | BLOCKED | Owner decision required. |
| Exact deployed SHA | MISSING | Must be recorded after canonical deployment. |
| Rollback SHA | MISSING | Must be recorded and tested. |
| DNS/HTTPS/custom-domain routes | BLOCKED / REQUIRES USER ACTION | Must be verified without disrupting unrelated DNS/email records. |
| Backend persistence | IMPLEMENTED IN SOURCE, NOT ACTIVE | Protected staff/grant Functions and Firestore rules are present; no project, Auth, IAM, data migration, or live deployment is verified. Payments and donations remain disabled. |
| Official programs/partners/studies | NOT PRESENT | Planning and concept documents are not operating evidence. |
| Certification/conformance | NOT ESTABLISHED | Do not use approval/certification claims. |
| Legal/nonprofit/tax status | REQUIRES LEGAL REVIEW | No authoritative proof established by this repository audit. |

## Validation commands

```bash
make check
make build-site
```

Underlying checks:

```bash
python3 -m unittest discover -s tests
python3 scripts/validate-docs.py
python3 scripts/validate-routes.py
python3 scripts/validate-standards-registry.py
python3 scripts/build-public-site.py
```

## Canonical deployment recommendation

For the current static standards site, the recommended architecture is:

- source: `main`;
- required check: `Check` workflow;
- artifact: allowlisted `_site` directory;
- production: GitHub Pages `github-pages` environment;
- preview/review: PR artifact, and a preview mechanism only if maintenance cost is justified;
- custom domain: `uraifoundation.org` plus `www`;
- fallback: Firebase site remains temporary until explicitly retained or decommissioned;
- evidence: release record with exact deployed and rollback SHAs.

This recommendation does not authorize DNS changes or deployment. Firebase may instead be selected only after its configuration and workflow become reproducible from this repository and competing Pages automation is disabled.

## P0 launch blockers

1. Select and record one canonical host.
2. Obtain a green required check for the release SHA.
3. Inspect the curated public artifact.
4. Record exact deployed SHA and prior rollback SHA.
5. Verify apex and `www` DNS, HTTPS, required routes, canonical metadata, and content marker.
6. Establish and test a private security/sensitive-report channel.
7. Preserve formation-stage legal and program boundaries.

## P1 credible-launch requirements

- consistent metadata on all routes;
- real Open Graph/social preview asset;
- branch protection and required-review evidence;
- explicit standards/content/code license after legal/IP review;
- formation-stage governance approvals, conflicts, recusals, appeals, and public-comment rules;
- accessibility automated/manual review and public known-gap statement;
- provider-specific privacy notice;
- release/tag/version process with rollback drill.

## Release evidence record

A release is verified only when a record under `launch-proof/urai-foundation-production-lock/<timestamp>/` includes:

- repository/branch/source SHA;
- green check/workflow;
- artifact manifest/digest;
- provider project/site and deployment receipt;
- deployed SHA;
- prior rollback SHA;
- DNS and TLS evidence;
- all required route results;
- metadata and accessibility smoke results;
- operator approval;
- known exceptions and expiry;
- rollback procedure and result.

## Final decision

**NOT VERIFIED COMPLETE FOR CUSTOM-DOMAIN LAUNCH.**

Safe current description: a substantial formation-stage public standards repository and static-site source with a reported fallback deployment, pending canonical hosting, exact release evidence, custom-domain verification, security intake, governance maturity, accessibility review, and legal/institutional verification.
