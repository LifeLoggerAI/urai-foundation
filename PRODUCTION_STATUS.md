# URAI Foundation Production Status

Last reviewed: 2026-10-07
Repository: `LifeLoggerAI/urai-foundation`
Observed canonical `main` SHA before this documentation change: `8ee8036b649ae9c9e73ae374a7247f0bb34c4c03`
Status: **SOURCE IMPLEMENTED / CUSTOM-DOMAIN PRODUCTION NOT VERIFIED**

## Executive status

The repository is a documentation-first, static public website and formation-stage standards source. Required public route files exist and public copy is conservative about legal, program, research, partner, certification, donation, grant, and clinical status.

The custom-domain production state is not yet verified because:

- repository files configure GitHub Pages;
- issue #10 reports a separate Firebase Hosting fallback;
- Functions/Firestore Firebase configuration is checked in, but project binding, Hosting target, provider environment, and deployment evidence are absent;
- exact current deployed and rollback SHAs are not recorded;
- exact-current custom-domain DNS/TLS/route proof is not tied to the current head;
- the observed canonical head's Check passed, but its Pages workflow failed at Configure Pages because site creation is not accessible by the integration; source-check success is not deployment proof, and this documentation successor requires its own verification.

See `docs/canonical-production-truth.md`.

## Source-complete public routes

- `/`
- `/status/`
- `/governance/` (including public stewardship principles)
- `/community/`
- `/security/`
- `/donate/` (payments disabled)
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
| Texas legal-status boundary | VERIFIED COMPLETE IN SOURCE | Public status records Texas domestic nonprofit formation and current involuntary termination; no active/good-standing, 501(c)(3), fundraising, or deductibility claim is made. |
| Sitemap/robots/manifest/favicon | VERIFIED COMPLETE IN SOURCE | Files exist; live delivery remains unverified. |
| Contact | PARTIAL | `security@urailabs.com` and `accessibility@urailabs.com` have controlled Google Workspace routing canaries present in the connected mailbox with SENT + INBOX evidence on October 4–5, 2026. This proves current internal Workspace role routing only; external-recipient deliverability, confidential case handling, and provider-independent monitoring remain separate gates. |
| Privacy notice | PARTIAL | Accurate for repository code; host logging/retention requires provider-specific review. |
| Terms notice | REQUIRES LEGAL REVIEW | Conservative informational copy, not legal approval. |
| Core governance/ethics/transparency/risk docs | PARTIAL / FORMATION-DRAFT | Public source includes governance and bounded stewardship principles; external review and constituted authority remain absent. |
| Standards registry | IMPLEMENTED IN CANONICAL SOURCE | Machine-readable draft; no conformance/certification program. |
| Unit and source validation | OBSERVED CANONICAL MAIN VERIFIED / SUCCESSOR PENDING | Canonical main `8ee8036b649ae9c9e73ae374a7247f0bb34c4c03` passed Check run `37683147407`: 58 repository tests and 41 installed-SDK/compiled-handler tests. This document change requires fresh exact-head verification. |
| Curated public artifact | OBSERVED CANONICAL MAIN INSPECTED / SUCCESSOR PENDING | Explicit allowlist prevents whole-repository Pages publication. Artifact `11510931447` names canonical main `8ee8036b649ae9c9e73ae374a7247f0bb34c4c03` and was independently downloaded, rehashed, and inspected; no deployment receipt follows from it. |
| GitHub Pages workflow | IMPLEMENTED, CURRENT ENABLEMENT FAILED | Canonical-main run `37683147388` passed static validation and the curated build but failed at Configure Pages with `Resource not accessible by integration`; upload and deployment were skipped. Owner/integration configuration and a successful actual deployment receipt remain required. |
| Firebase staff backend | IMPLEMENTED IN SOURCE, NOT CONFIGURED | `firebase.json` defines Functions and Firestore only, without a project binding; authenticated live behavior remains unverified. |
| Firebase Hosting fallback | REPORTED, NOT REPRODUCIBLE HERE | Issue #10 reports `urai-4dc1d` / `urai-foundation`; the repository has no Hosting target or project mapping. |
| Canonical host | BLOCKED | Owner decision required. |
| Exact deployed SHA | MISSING | Must be recorded after canonical deployment. |
| Rollback SHA | MISSING | Must be recorded and tested. |
| DNS/HTTPS/custom-domain routes | BLOCKED / REQUIRES USER ACTION | Must be verified without disrupting unrelated DNS/email records. |
| Backend persistence | IMPLEMENTED IN SOURCE, NOT ACTIVE | Protected staff/grant Functions and Firestore rules are present; no project, Auth, IAM, data migration, or live deployment is verified. Payments and donations remain disabled. |
| Official programs/partners/studies | NOT PRESENT | Planning and concept documents are not operating evidence. |
| Certification/conformance | NOT ESTABLISHED | Do not use approval/certification claims. |
| Legal/nonprofit/tax status | PARTIALLY COMPLETE | Texas formation and involuntary termination are authoritatively established. Reinstatement, federal tax exemption, fundraising authority, governing-body execution, and related legal/tax authority remain separately blocked/review-gated. |

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


## Retained exact-source observation — 2026-10-07

PR [#59](https://github.com/LifeLoggerAI/urai-foundation/pull/59) was deliberately admitted to canonical main as `8ee8036b649ae9c9e73ae374a7247f0bb34c4c03`. Its exact donor was `1192586bcef32bd68bd8e1d4223ee7248e217042`.

- Donor [Check run 37673909111](https://github.com/LifeLoggerAI/urai-foundation/actions/runs/37673909111) and [Visual Proof run 37673909104](https://github.com/LifeLoggerAI/urai-foundation/actions/runs/37673909104) completed successfully. The Check log records 58 repository tests and 41 installed-SDK/compiled-handler authorization and App Check tests. Full and production dependency audit JSONs both report zero vulnerabilities.
- Retained artifact `foundation-1192586-native-proof.zip`, artifact ID `11507234395`, was independently downloaded as 105091 bytes. SHA-256: `be237dc753d3d8b23224cc08f556c3b8cbbb00d1b3326c06d6b5e60f4a98f749`. Its 54 ZIP entries passed bounded path, size, and CRC inspection; the public-build manifest names the exact donor source above.
- Canonical-main [Check run 37683147407](https://github.com/LifeLoggerAI/urai-foundation/actions/runs/37683147407) completed successfully at 20:55 UTC. Its exact-source job `113004066061` records 58 repository tests, 41 installed-SDK/compiled-handler tests, zero full and production dependency vulnerabilities, and a clean 42-file curated public build. Artifact `11510931447` was independently downloaded as 105096 bytes with SHA-256 `c6b5832017f67a1e331d1aefc783c00dd97dbf41227f83ef3f15179894752683`. Its 54 entries passed bounded path, size, and CRC inspection; its public-build manifest names canonical source `8ee8036b649ae9c9e73ae374a7247f0bb34c4c03`.
- At the October 7, 2026 current observation, canonical-main [Pages run 37683147388](https://github.com/LifeLoggerAI/urai-foundation/actions/runs/37683147388) completed FAILURE. Validation job `113004066074` and the curated source build passed. Deploy job `113015341842` failed at Configure Pages: the site lookup was Not Found, and site creation returned `Resource not accessible by integration`. Upload and deployment were skipped. The repository reports `has_pages=false`; actual owner/integration configuration must establish Pages availability before a deployment can be proven.

These observations are bound to the named source identities. Canonical-main Check success establishes the stated machine-check scope for that exact source. It does not transfer PASS to this documentation change, publish the site, or prove legal review, reinstatement, tax recognition, or fundraising authority.

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

## Texas reinstatement-process evidence

PREPARED / EXTERNALLY BLOCKED — The retained Comptroller response now includes exemption-application guidance dated October 2, 2026, beyond the earlier September 20 acknowledgement. It does not determine current exemption status, issue tax clearance, accept reinstatement, or establish fundraising or federal tax-exemption authority.

Current legal truth remains unchanged: the Texas Secretary of State record is involuntarily terminated until authoritative state acceptance and current-status evidence prove otherwise. The unsigned Form 811 package is prepared, not filed. The [current Secretary of State instructions](https://www.sos.texas.gov/corp/instructions/811.shtml) (revision 09/26) exempt nonprofit corporations from the tax-clearance attachment requirement; the retained case-specific reply described a conditional clearance branch. The authorized representative must ask the Secretary of State to reconcile that instruction for this record and confirm the outstanding-charge cure/payment/submission order. Comptroller clearance is a dependency only if the agency confirms it is required. Current registered-agent eligibility, consent, office details and filing-signature authority also require confirmation. A prepared portal record or checkout screen proves none of payment, filing, acceptance, reinstatement, adopted governance, or tax status.

## P0 launch blockers

1. Select and record one canonical host.
2. Obtain a green required check for the release SHA.
3. Inspect the curated public artifact.
4. Record exact deployed SHA and prior rollback SHA.
5. Verify apex and `www` DNS, HTTPS, required routes, canonical metadata, and content marker.
6. Preserve the verified Workspace role-routing canaries for security/accessibility and establish a confidential sensitive-report handling path beyond ordinary mailbox routing.
7. Preserve the verified Texas involuntary-termination boundary and keep reinstatement/tax/fundraising claims fail-closed until authoritative receipts exist.

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
