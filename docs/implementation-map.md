# Canonical Implementation Map

Status: formation-stage source map
Last reviewed: 2026-07-06

## Repository role

`LifeLoggerAI/urai-foundation` is a documentation-first public-interest standards repository with a lightweight static website.

It contains a static public site plus protected, undeployed Firebase source for authenticated staff grant operations. It is not a deployed service runtime, SDK, donation platform, certification service, research-participant system, clinical resource, or commercial product repository.

## Canonical source surfaces

| Surface | Paths | Status |
| --- | --- | --- |
| Public website | `index.html`, required route directories, `styles.css`, `favicon.svg`, `robots.txt`, `sitemap.xml`, `site.webmanifest`, `CNAME` | Implemented in source |
| Public artifact build | `scripts/build-public-site.py` | Implemented on audit branch |
| Public artifact manifest | `_site/public-build-manifest.json` generated at build time | Implemented on audit branch |
| Core standards | `docs/governance-charter.md`, `docs/ethical-ai-principles.md`, `docs/transparency-framework.md`, `docs/risk-review-process.md` | Formation-draft |
| Standards registry | `standards/registry.json`, `standards/registry.schema.json` | Formation-draft |
| Product integration | `docs/product-integration-contract.md` | Formation-draft |
| Publication/review | `docs/publication-and-review-policy.md` | Formation-draft |
| Accountability templates | `docs/templates/` | Implemented as drafts |
| Audit/roadmap | `docs/audits/foundation-v1-audit-2026-07-06.md` | Implemented |
| Production truth | `docs/canonical-production-truth.md`, `PRODUCTION_STATUS.md` | Implemented; external proof blocked |
| Deployment/rollback | `docs/live-deployment-runbook.md`, `docs/final-live-cutover-runbook.md` | Implemented; no cutover authorized |
| Validation | `Makefile`, `scripts/validate-*.py`, `tests/` | Implemented; PR checks required |
| CI | `.github/workflows/check.yml`, `.github/workflows/pages.yml` | Implemented; Pages settings/live run unverified |

## Public routes

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

All route source files exist. Live custom-domain delivery remains unverified.

## Publication boundary

GitHub Pages must publish `_site`, not the repository root.

The allowlist includes:

- public website assets and routes;
- selected public standards and templates;
- the draft standards registry.

It excludes from the website artifact:

- audit working papers;
- launch proof;
- tests/scripts/workflows;
- repository administration;
- advisor/outreach/operational planning under `docs/foundation/`;
- other files not explicitly approved for publication.

The GitHub repository itself remains public. Sensitive or confidential material must not be committed merely because the website artifact excludes it.

## Validation lifecycle

Run:

```bash
make check
make build-site
```

`make check` performs:

- Python unit tests;
- Markdown/HTML internal link and anchor validation;
- UTF-8/newline/whitespace validation;
- required route and sitemap validation;
- standards registry validation.

The `Check` workflow also builds and uploads the curated `_site` artifact for PR review.

## Deployment model

Current evidence is conflicting:

- GitHub Pages source configuration exists;
- issue #10 reports a Firebase fallback;
- `firebase.json`, Firestore rules/indexes, and a Functions codebase are present for the protected staff grant backend, without a project binding or Hosting target;
- exact deployed/rollback SHAs and custom-domain proof are missing.

The recommended architecture is repository-native GitHub Pages using the curated artifact, but owner approval and external verification are required. See `docs/canonical-production-truth.md`.

## Integration boundaries

Products reference Foundation standards through evidence contracts rather than importing commercial runtime code into this repository.

Product-side records should include system cards, providers, data flows, consent, risk, accessibility, automation, incidents/exceptions, and exact release evidence. See `docs/product-integration-contract.md`.

## Out of scope without an approved architectural decision

- deployed backend APIs or long-running services;
- deployed staff accounts, database migrations, or public/private intake;
- product SDKs or commercial application code;
- deployed payment, donation, grant, or fundraising systems;
- research participant enrollment;
- certification/assessment operations;
- confidential partner/advisor/legal/incident data;
- mock integrations that appear live without real evidence.

## Current limitations

- Current `main` head at audit start had no attached check status.
- Custom-domain DNS, TLS, provider, deployed SHA, and rollback SHA are not verified.
- No private security reporting path is proven.
- No branch protection/required review evidence is recorded.
- No root licensing model is approved.
- No automated HTML/accessibility/visual regression or external-link gate exists.
- Public standards are linked as raw Markdown rather than accessible versioned HTML.
- Governance roles and external reviewers are not constituted.
- No conformance or certification program exists.
- Legal, tax, research, partner, funding, and institutional status remain unverified.

## Future repository architecture

Keep the repository unified through Foundation v1 while content volume and maintenance remain manageable.

Consider a split only after evidence shows a need for separate release cycles or permissions, potentially into:

- public website/publication renderer;
- standards registry/specifications;
- research publications/archive;
- governance and decision records;
- accessibility standards/evidence;
- developer schemas/integration tooling.

A split requires a migration plan, canonical-link strategy, ownership, versioning, CI, archive, and rollback. Do not split solely to increase repository count.
