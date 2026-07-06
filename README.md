# URAI Foundation

URAI Foundation is a formation-stage public-interest standards project for ethical, transparent, accessible, and accountable technology across the URAI ecosystem.

This repository and website do **not** claim formal nonprofit or tax-exempt status, charity registration, public programs, services, donations, grants, clinical support, certification, official partnerships, active research studies, or institutional authority unless separate authoritative evidence is published.

Intended public domain: `uraifoundation.org`

## Mission

Advance responsible AI through open standards, evidence-based review, governance, transparency, accessibility, and public accountability while protecting dignity, consent, memory, identity, relationships, and community.

## Repository role

This is a documentation-first public-interest repository with a lightweight static website. It is not a product runtime, backend API, database, CRM, donation system, grant intake, certification service, clinical resource, or research-participant platform.

The repository contains:

- static public website source;
- governance, ethical AI, transparency, and risk-review drafts;
- a formation-stage machine-readable standards registry;
- public-accountability templates;
- product integration guidance;
- contribution, security, versioning, and release materials;
- validation and curated publication tooling.

## Production truth

Canonical source:

- repository: `LifeLoggerAI/urai-foundation`
- branch: `main`
- website source: repository root and required route directories

Production hosting is **not yet canonically verified**.

- GitHub Pages configuration and a `CNAME` exist in this repository.
- Issue #10 reports a Firebase Hosting fallback under project `urai-4dc1d`, site ID `urai-foundation`.
- Firebase configuration is not present in this repository.
- The exact current deployed SHA, rollback SHA, custom-domain DNS destination, and HTTPS/route proof are not recorded for the current head.

See [Canonical Production Truth](docs/canonical-production-truth.md). Do not describe the custom-domain site as verified until one host is selected and the release evidence gate passes.

## Public routes

| Route | Purpose | Source status |
| --- | --- | --- |
| `/` | Homepage and public route map | Static HTML present |
| `/accessibility/` | Accessibility standards framing | Static HTML present |
| `/deaf-community/` | Deaf-community considerations and non-representation boundary | Static HTML present |
| `/emotional-wellness/` | Non-clinical emotional-safety framing | Static HTML present |
| `/responsible-ai/` | Responsible AI standards entry | Static HTML present |
| `/research/` | Research intent and boundaries | Static HTML present |
| `/partners/` | Partner-interest boundaries | Static HTML present |
| `/contact/` | Mailto and public issue paths | Static HTML present; no backend form |
| `/privacy/` | Static-site privacy notice | Static HTML present |
| `/terms/` | Conservative informational usage notice | Static HTML present; legal review required |

Source presence is not live-domain verification.

## Core standards and operating documents

- [Governance Charter](docs/governance-charter.md)
- [Ethical AI Principles](docs/ethical-ai-principles.md)
- [Transparency Framework](docs/transparency-framework.md)
- [Risk Review Process](docs/risk-review-process.md)
- [Product Integration Contract](docs/product-integration-contract.md)
- [Publication, Evidence, Corrections, and External Review Policy](docs/publication-and-review-policy.md)
- [Public Accountability Template Suite](docs/templates/public-accountability-templates.md)
- [Standards Registry](standards/registry.json)
- [Implementation Map](docs/implementation-map.md)
- [Foundation v1 Audit and Roadmap](docs/audits/foundation-v1-audit-2026-07-06.md)

All registry entries remain `formation-draft`. No conformance or certification program exists.

## Relationship to the URAI ecosystem

- **URAI Labs** — commercial product development.
- **URAI IP Holdings LLC** — intended intellectual-property stewardship.
- **URAI Privacy** — privacy and consent enforcement systems.
- **URAI Foundation** — formation-stage public-interest ethics, governance, accessibility, research, and accountability standards.

The Foundation repository should remain standards-based. Commercial applications belong in their own repositories and should publish evidence against named standards through the [Product Integration Contract](docs/product-integration-contract.md).

No commercial entity may claim Foundation approval or certification without a separately authorized process. The current Foundation has no certification program.

## Public action boundaries

The current source has:

- no backend form;
- no user account;
- no CRM or ticket database;
- no donation or grant flow;
- no analytics script;
- no public-program enrollment;
- no partner database;
- no research-participant intake;
- no clinical or crisis service.

Public GitHub issues are inappropriate for secrets, personal data, vulnerabilities, active abuse paths, or sensitive complaints. A verified private security-reporting channel is still required.

## Local validation

No package installation is required.

Run:

```bash
make check
```

This runs:

```bash
python3 -m unittest discover -s tests
python3 scripts/validate-docs.py
python3 scripts/validate-routes.py
python3 scripts/validate-standards-registry.py
```

Build the curated public artifact:

```bash
make build-site
```

The publication script creates `_site` from an explicit allowlist and writes `public-build-manifest.json`. It intentionally excludes operational proof folders, tests, scripts, internal/advisor planning files, and other non-publication content from the hosting artifact. The repository itself remains public.

## Deployment verification

After the owner selects a canonical host and configures the custom domain, run the provider-appropriate checks and record:

- exact source and deployed SHA;
- prior rollback SHA;
- provider project/site;
- artifact digest/manifest;
- workflow run;
- apex and `www` DNS;
- HTTPS/TLS;
- required route and metadata smoke results;
- accessibility smoke results;
- operator approval and known exceptions.

The existing live-domain scripts were originally written around GitHub Pages and must not be treated as provider-neutral proof if Firebase is selected.

## Governance and change process

1. Open an issue or proposal for material policy/standards changes.
2. Identify decision category, owner role, affected populations, required reviewers, and conflicts.
3. Draft on a focused branch.
4. Run `make check` and build the public artifact.
5. Use public comment for material standards when safe and feasible.
6. Record comment dispositions and decision authority.
7. Update the registry, changelog, and version when applicable.
8. Link affected product implementation, exception, incident, and release records.
9. Preserve corrections, superseded versions, and minority opinions.

Roles that are not appointed must be marked vacant. Missing authority or expert review is a blocker, not permission to invent approval.

## Legal and institutional boundary

The following require qualified legal, tax, accounting, research, accessibility, security, or other external review as applicable:

- entity and nonprofit/tax status;
- bylaws and governing authority;
- conflict policy and board/steward operations;
- IP, trademark, copyright, standards, and contributor licensing;
- privacy/terms obligations;
- human-subject research and ethics review;
- donations, grants, fundraising, and fiscal sponsorship;
- insurance, financial controls, record retention, and annual reporting;
- formal conformance, assessment, or certification.

Do not activate these capabilities from planning documents alone.

## Current status

- Source repository and required route files: **VERIFIED COMPLETE**.
- Formation-era claim boundaries: **VERIFIED IN SOURCE**.
- Core standards: **PARTIAL / FORMATION-DRAFT**.
- Standards registry and publication boundary: **IMPLEMENTED ON AUDIT BRANCH, REQUIRES REVIEW**.
- Current `main` checks: **IMPLEMENTED, NOT VERIFIED AT AUDIT-START HEAD**.
- Canonical hosting, deployed SHA, rollback SHA, DNS, and HTTPS: **BLOCKED / REQUIRES USER ACTION**.
- Legal/institutional status: **REQUIRES LEGAL REVIEW**.

See [Production Status](PRODUCTION_STATUS.md) for the release gate.
