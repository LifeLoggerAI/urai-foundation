# Canonical Implementation Map

Status: formation-stage source map
Last reviewed: 2026-09-04

## Repository role

`LifeLoggerAI/urai-foundation` is a public-interest standards repository with a lightweight static website plus protected, undeployed Firebase source for authenticated staff grant operations.

It is not a deployed product runtime, SDK, production donation system, certification service, research-participant system, clinical resource, or commercial product repository. The current candidate includes public information/demo surfaces for community outreach, support, a fail-closed staff gateway, and in-memory Grant Desk drafting, plus separately protected backend source. None of those surfaces activate payments, confidential staff operations, production identities, or external grant submission.

## Canonical source surfaces

| Surface | Paths | Status |
| --- | --- | --- |
| Public website | `index.html`, required route directories, `styles.css`, `favicon.svg`, `robots.txt`, `sitemap.xml`, `site.webmanifest`, `CNAME` | Implemented in source |
| Community/support portal information | `community/`, `donate/` | Implemented in source; payments/legal/tax authority inactive |
| Staff/Grant Desk demonstration | `staff/`, `grants/`, `grants/grants.js` | Publicly reachable noindex demonstration; authentication/external submission inactive |
| Protected staff backend | `functions/`, `firestore.rules`, `firestore.indexes.json`, `firebase.json`, `docs/staff-backend-contract.md` | Implemented in source; undeployed, project-unbound, protected activation required |
| Public artifact build | `scripts/build-public-site.py` | Implemented on candidate |
| Public artifact manifest | `_site/public-build-manifest.json` generated at build time | Implemented on candidate |
| Core standards | `docs/governance-charter.md`, `docs/ethical-ai-principles.md`, `docs/transparency-framework.md`, `docs/risk-review-process.md` | Formation-draft |
| Standards registry | `standards/registry.json`, `standards/registry.schema.json` | Formation-draft |
| Product integration | `docs/product-integration-contract.md` | Formation-draft |
| Publication/review | `docs/publication-and-review-policy.md` | Formation-draft |
| Accountability templates | `docs/templates/` | Implemented as drafts |
| Audit/roadmap | `docs/audits/foundation-v1-audit-2026-07-06.md` | Implemented |
| Production truth | `docs/canonical-production-truth.md`, `PRODUCTION_STATUS.md` | Implemented; external proof blocked |
| Deployment/rollback | `docs/live-deployment-runbook.md`, `docs/final-live-cutover-runbook.md` | Implemented; no cutover authorized |
| Validation | `Makefile`, `scripts/validate-*.py`, `tests/`, backend contract/type checks | Implemented; PR checks required |
| CI | `.github/workflows/check.yml`, `.github/workflows/pages.yml` | Implemented; provider/live runtime unverified |

## Public routes

- `/`
- `/community/`
- `/donate/`
- `/staff/` — publicly reachable, noindex, fail-closed gateway; production authentication is inactive
- `/grants/` — publicly reachable, noindex, in-memory Grant Desk demonstration; no external submission
- `/grants/grants.js` — required Grant Desk client asset covered by live smoke
- `/accessibility/`
- `/deaf-community/`
- `/emotional-wellness/`
- `/responsible-ai/`
- `/research/`
- `/partners/`
- `/contact/`
- `/privacy/`
- `/terms/`

All route source files exist. Source presence does not prove live custom-domain delivery, and `noindex` is crawler guidance rather than access control.

## Protected staff-backend source

The backend candidate defines:

- employee roles and deny-by-default Firestore access;
- grant opportunities, applications, exact-version approvals, submissions, awards, and reporting obligations;
- canonical Foundation profile provenance and staff/document/audit records;
- recent-auth, MFA, App Check, and server-side authorization requirements for protected approval operations;
- guarded initial-owner provisioning;
- deterministic validators, unit tests, Functions typecheck, and locked dependency installation.

The backend is intentionally project-unbound and undeployed. No real employee identity, confidential record, grant ingestion/submission, provider IAM, or production migration authority is established by source presence.

## Publication boundary

GitHub Pages must publish `_site`, not the repository root.

The allowlist includes:

- public website assets and routes, including the community/support and staff/Grant Desk demonstration surfaces;
- selected public standards and templates;
- the draft standards registry.

It excludes from the website artifact:

- protected Firebase backend source and operational configuration;
- audit working papers;
- launch proof;
- tests/scripts/workflows;
- repository administration;
- advisor/outreach/operational planning under `docs/foundation/`;
- other files not explicitly approved for publication.

The GitHub repository itself remains public. Sensitive or confidential material must not be committed merely because the website artifact excludes it. The Grant Desk demonstration must not be used for real confidential records while authenticated protection is inactive.

## Validation lifecycle

Run:

```bash
make check
make build-site
```

`make check` performs repository validation and the protected backend contract/type checks wired by this candidate. The `Check` workflow also builds and uploads the curated `_site` artifact for exact-head review. Live smoke includes the portal routes and required `/grants/grants.js` runtime asset.

## Deployment model

Current evidence remains deliberately fail-closed:

- GitHub Pages source configuration exists for the curated static artifact;
- issue #10 reports a Firebase Hosting fallback;
- `firebase.json`, Firestore rules/indexes, and a Functions codebase are present only for the protected staff backend and contain no Firebase project binding or Hosting target;
- exact deployed/rollback SHAs and custom-domain proof are missing.

The protected backend must not inherit or imply the reported Hosting fallback. Any backend activation requires an explicit approved project, WIF/ADC identity, least-privilege IAM, protected migration/authorization evidence, deployed exact-SHA readback, monitoring, recovery, and distinct rollback proof.

## Integration boundaries

Products reference Foundation standards through evidence contracts rather than importing commercial runtime code into this repository.

Product-side records should include system cards, providers, data flows, consent, risk, accessibility, automation, incidents/exceptions, and exact release evidence. See `docs/product-integration-contract.md`.

The portal demonstration adds no production payment, identity, confidential-data, or external-submission authority. The protected backend source likewise does not activate those capabilities without separate provider/legal/governance evidence.

## Out of scope without an approved architectural decision

- deployed backend APIs or long-running services beyond an independently reviewed protected activation;
- production databases, migrations, accounts, or private intake without protected provider evidence;
- product SDKs or commercial application code;
- activated payment, donation receipt/tax, or fundraising systems without verified receiving-entity/provider/legal authority;
- authenticated production grant submission or funder adapters without protected authorization and review;
- research participant enrollment;
- certification/assessment operations;
- confidential partner/advisor/legal/incident data in the public demonstration;
- mock integrations that appear live without real evidence.

## Current limitations

- Custom-domain DNS, TLS, provider, deployed SHA, and rollback SHA are not verified.
- No private security reporting path is proven.
- No root licensing model is approved.
- Public standards are linked as raw Markdown rather than accessible versioned HTML.
- Governance roles and external reviewers are not fully constituted.
- No conformance or certification program exists.
- Legal, tax, research, partner, funding, receiving-entity, and institutional status remain unverified.
- Staff authentication and protected confidential records are inactive on the public static candidate.
- Protected staff backend source is undeployed and lacks approved provider/runtime evidence.
- Donation processing, tax treatment, receipts, settlement/accounting, and refunds/disputes are not activated by these static routes.
- Grant Desk output is demonstration drafting/review only and cannot submit to funders.

## Future repository architecture

Keep the repository unified through Foundation v1 while content volume and maintenance remain manageable.

Consider a split only after evidence shows a need for separate release cycles or permissions, potentially into:

- public website/publication renderer;
- standards registry/specifications;
- research publications/archive;
- governance and decision records;
- accessibility standards/evidence;
- protected staff/grant operations;
- developer schemas/integration tooling.

A split requires a migration plan, canonical-link strategy, ownership, versioning, CI, archive, and rollback. Do not split solely to increase repository count.

## Portal routes in the integrated candidate

| Route | Audience / exposure | Current authority |
| --- | --- | --- |
| `/community/` | Public | Outreach and participation information |
| `/donate/` | Public | Support information only; payment, receipt, legal, accounting, and tax claims remain gated |
| `/staff/` | Publicly reachable; intended employee gateway; noindex | Fail-closed preview; production authentication is inactive |
| `/grants/` | Publicly reachable noindex demonstration | In-memory Grant Desk drafting/review only; no confidential production use or external submission |

These routes and the Grant Desk script asset are present in the curated artifact. Staff authentication, confidential records, processor activation, provider binding, and real grant submission remain unimplemented or separately gated production capabilities.
