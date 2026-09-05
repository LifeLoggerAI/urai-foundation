# URAI Foundation

URAI Foundation is the official formation-stage public-interest standards and governance initiative within the URAI ecosystem. It exists to advance ethical, transparent, accessible, accountable technology that protects dignity, consent, memory, identity, relationships, community, and public trust.

This repository and website do **not** by themselves establish that URAI Foundation is a separately incorporated legal entity, federally tax-exempt organization, registered charity, donation-eligible organization, certification body, clinical service, active research institution, or provider of public programs. Exact legal, tax, governance, and institutional status will be published only from authoritative records.

Website candidate: [uraifoundation.org](https://uraifoundation.org/)

## Mission

Advance responsible AI through open standards, evidence-based review, ethical frameworks, governance, transparency, accessibility, and public accountability while keeping real human life—not generic claims about intelligence—at the center.

## Repository role

This is a public-interest Foundation repository with a lightweight static website plus protected, undeployed Firebase source for staff grant operations. It is not a deployed product runtime, CRM, production donation system, certification service, clinical resource, or research-participant platform. The backend source remains nonproduction until its protected provider, identity, governance, and runtime gates are proven.

The repository contains:

- static public website source;
- governance, ethical AI, transparency, and risk-review drafts;
- a formation-stage machine-readable standards registry;
- public-accountability templates;
- product integration guidance;
- contribution, security, versioning, and release materials;
- validation and curated-publication tooling;
- protected Firebase Functions, Firestore rules, and validation contracts for the undeployed staff grant backend, with `firestore.indexes.json` retained as part of that protected backend source.

## Production truth

Canonical source:

- repository: `LifeLoggerAI/urai-foundation`
- branch: `main`
- website source: repository root and required route directories

Production hosting is **not yet canonically verified**.

- GitHub Pages configuration and a `CNAME` exist in this repository.
- `firebase.json` defines the protected Foundation Functions codebase and Firestore rules/indexes but deliberately contains no Firebase project binding or Hosting target. The separately reported `urai-4dc1d` / `urai-foundation` Hosting fallback is therefore not reproducible from this backend configuration.
- The exact current deployed SHA, rollback SHA, selected canonical host, custom-domain DNS destination, HTTPS proof, and route proof are not recorded for the current candidate.
- Live-domain verification is expected to fail while `uraifoundation.org` resolves to Squarespace or another non-canonical host.

See [Canonical Production Truth](docs/canonical-production-truth.md). Do not describe the custom-domain site as verified until one host is selected and the release evidence gate passes.

## Public website surface

| Route | Purpose | Source status |
| --- | --- | --- |
| `/` | Homepage and public route map | Static HTML present |
| `/status/` | Public status, legal boundaries, and ecosystem relationship | Static HTML present |
| `/governance/` | Formation-stage governance, transparency, review, and corrections framework | Static HTML present; does not establish governing authority |
| `/community/` | Public community outreach and participation information | Static HTML present |
| `/donate/` | Public support information with payments/tax treatment explicitly inactive | Static HTML present; no active payment backend |
| `/staff/` | Publicly reachable, noindex staff gateway that fails closed until authentication is activated | Static HTML present; authentication inactive |
| `/grants/` | Publicly reachable, noindex Grant Desk demonstration for in-memory draft/review only | Static HTML/JS present; no external submission |
| `/accessibility/` | Accessibility standards framing | Static HTML present |
| `/deaf-community/` | Deaf-community considerations and non-representation boundary | Static HTML present |
| `/emotional-wellness/` | Non-clinical emotional-safety framing | Static HTML present |
| `/responsible-ai/` | Responsible AI standards entry | Static HTML present |
| `/research/` | Research intent and boundaries | Static HTML present |
| `/partners/` | Partner-interest boundaries | Static HTML present |
| `/contact/` | Mailto and public issue paths | Static HTML present; no backend form |
| `/privacy/` | Static-site privacy notice | Static HTML present |
| `/terms/` | Conservative informational usage notice | Static HTML present; legal review required |

Supporting publication files include `styles.css`, `favicon.svg`, `CNAME`, `robots.txt`, `sitemap.xml`, `site.webmanifest`, and the generated `public-build-manifest.json` in the curated artifact. The Grant Desk also publishes its required `/grants/grants.js` client asset.

Source presence is not live-domain verification.

## Public action boundaries

The current source has:

- no backend contact/intake form;
- no activated user account or employee authentication;
- no CRM or ticket database;
- a public donation-information route, but no activated payment processor, receipt/tax treatment, or settlement flow;
- a public noindex Grant Desk demonstration, but no authenticated production grant system or external funder-submission flow;
- protected staff-backend source that is not deployed, project-bound, or authorized for production data;
- no analytics script;
- no public-program enrollment;
- no partner database;
- no research-participant intake;
- no clinical or crisis service.

Public GitHub issues are inappropriate for secrets, personal data, vulnerabilities, active abuse paths, or sensitive complaints. A verified private security-reporting channel is still required.

## Protected staff-backend boundary

The staff-backend candidate adds source contracts for employee roles, grant opportunities, applications, exact-version approvals, submissions, awards, reporting obligations, Foundation profile provenance, staff records, documents, and audit records. It also includes deny-by-default Firestore rules, guarded initial-owner provisioning, recent-auth/MFA/App Check requirements for protected approval operations, and deterministic validation/tests.

That source does **not** activate employee identities, bind a production Firebase project, authorize confidential Foundation data, ingest real grant opportunities, submit to external funders, or establish legal/provider authority. Those remain separate protected activation gates.

## Scope of work

The Foundation initiative supports and maintains:

- ethical principles and guidelines for AI systems;
- public-interest research framing and publications when evidence exists;
- governance and transparency standards;
- open documentation and explainability practices;
- standards review paths for researchers, nonprofits, builders, and institutions;
- oversight frameworks that prioritize human well-being;
- public-facing communication for the Foundation initiative and its standards.

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
- [System-of-Systems Integration Contract](docs/system-of-systems-integration.md)
- [Staff Backend Contract](docs/staff-backend-contract.md)
- [Foundation v1 Audit and Roadmap](docs/audits/foundation-v1-audit-2026-07-06.md)
- [Live Deployment Runbook](docs/live-deployment-runbook.md)
- [Versioning and Change Policy](VERSIONING.md)
- [Changelog](CHANGELOG.md)
- [Security Policy](SECURITY.md)
- [Contributing Guide](CONTRIBUTING.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)

All registry entries remain `formation-draft`. No conformance or certification program exists.

## Governance and independence boundary

The Foundation initiative is designed to publish standards that can be reviewed separately from commercial product claims.

While URAI Labs LLC and affiliated teams may build products and services, the Foundation standards surface is intended to:

- maintain independent review expectations;
- publish openly and transparently;
- advocate for user rights and autonomy;
- prioritize societal benefit over commercial outcomes.

No commercial entity may claim Foundation approval or certification without a separately authorized, documented process. The current Foundation has no certification program. Final governance authority, legal independence, board authority, and amendment procedures require adopted governing documents and are not established by this repository.

## Relationship to the URAI ecosystem

- **URAI Labs LLC** — operating and technology-development company.
- **URAI IP Holdings LLC** — intended intellectual-property stewardship and licensing.
- **URAI Privacy** — privacy and consent enforcement systems.
- **URAI Foundation** — formation-stage public-interest ethics, governance, accessibility, research, and accountability standards initiative.

Commercial applications belong in their own repositories and should publish evidence against named standards through the [Product Integration Contract](docs/product-integration-contract.md). This repository does not claim that the initiative is legally independent from URAI Labs LLC or another entity.

## Local validation

Run:

```bash
make check
```

The complete source validation includes repository tests and validators plus the protected Functions typecheck when backend source is present.

Build the curated public artifact:

```bash
make build-site
```

The publication script creates `_site` from an explicit allowlist and writes `public-build-manifest.json`. It intentionally excludes operational proof folders, tests, scripts, internal/advisor planning files, Firebase backend source, and other non-publication content from the hosting artifact. The repository itself remains public.

Pull requests and pushes to `main` run repository checks through GitHub Actions. Workflow badges are not release evidence unless they bind the exact reviewed SHA and retained artifacts are inspected.

## Deployment verification

After the owner selects a canonical host and configures the custom domain, record:

- exact source and deployed SHA;
- distinct prior rollback SHA;
- provider project/site;
- artifact digest and public-build manifest;
- protected workflow run and operator approval;
- apex and `www` DNS;
- HTTPS/TLS;
- required route and metadata smoke results;
- accessibility smoke results;
- monitoring and rollback result;
- known exceptions.

The existing live-domain scripts were originally written around GitHub Pages and must not be treated as provider-neutral proof if Firebase is selected.

Run the current live-domain check with:

```bash
make verify-live
```

or:

```bash
python3 scripts/verify-live-domain.py
```

The enhanced route smoke accepts an explicit HTTPS origin through `--base-url` or `URAI_FOUNDATION_BASE_URL` and verifies the homepage marker, public artifact manifest, standards registry, metadata files, and required routes.

## Website launch checklist

Before launch or major website changes:

1. Select one canonical host and record its project/site authority.
2. Confirm the custom-domain DNS destination and HTTPS certificate.
3. Verify the homepage and every required route, including `/status/`, `/governance/`, `/community/`, `/donate/`, `/staff/`, and `/grants/` plus the Grant Desk script asset.
4. Complete the accessibility and site-quality checklist.
5. Test navigation, document links, issue/email paths, metadata, favicon, robots, sitemap, manifest, and standards registry.
6. Run `make check` and `make build-site` on the exact candidate.
7. Inspect the retained curated artifact and its manifest.
8. Deploy only the exact tested main SHA through the protected authority.
9. Run live smoke, monitoring, and rollback proof.
10. Publish legal/tax/entity language only from authoritative records.

## Governance and change process

1. Open an issue or proposal for material policy or standards changes.
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
- privacy and terms obligations;
- human-subject research and ethics review;
- donations, grants, fundraising, and fiscal sponsorship;
- insurance, financial controls, record retention, and annual reporting;
- formal conformance, assessment, or certification.

Do not activate these capabilities from planning documents alone. No visitor should infer separate incorporation, 501(c)(3) recognition, registered-charity status, or tax-deductible contribution eligibility from the Foundation name or `.org` domain.

## Current status

- Source repository and required route files: **VERIFIED COMPLETE IN SOURCE**.
- Formation-era claim boundaries: **VERIFIED IN SOURCE**.
- Core standards: **PARTIAL / FORMATION-DRAFT**.
- Standards registry and curated publication boundary: **IMPLEMENTED ON CANDIDATE, REQUIRES EXACT-HEAD REVIEW**.
- Public Status and Governance surfaces: **IMPLEMENTED IN SOURCE; FORMATION-STAGE AUTHORITY BOUNDARIES REQUIRED IN DEPLOYMENT SMOKE**.
- Portal information/demo surfaces (`/community/`, `/donate/`, `/staff/`, `/grants/`): **IMPLEMENTED IN SOURCE; PAYMENT, AUTH, AND EXTERNAL SUBMISSION REMAIN INACTIVE**.
- Protected staff backend: **IMPLEMENTED IN SOURCE; UNDEPLOYED / PROJECT-UNBOUND / REQUIRES PROTECTED RUNTIME AND INDEPENDENT REVIEW**.
- Canonical hosting, deployed SHA, rollback SHA, DNS, HTTPS, monitoring, and recovery: **BLOCKED / NOT VERIFIED**.
- Legal and institutional status: **REQUIRES QUALIFIED REVIEW AND AUTHORITATIVE RECORDS**.

See [Production Status](PRODUCTION_STATUS.md) for the release gate.

## Current portal route inventory

- `/status/` — public legal, ecosystem-role, and institutional authority boundary.
- `/governance/` — formation-stage governance/transparency framework; no constituted governing-body or legal-status claim.
- `/community/` — public community outreach and participation information.
- `/donate/` — public support information; payments, tax treatment, and donation receipts remain inactive pending verified legal and provider authority.
- `/staff/` — publicly reachable, noindex, fail-closed employee gateway; production authentication is not connected in this source candidate.
- `/grants/` — publicly reachable, noindex Grant Desk demonstration; data remains in-memory, it produces reviewable drafts only, and it cannot submit to funders.

The repository therefore contains public information/demonstration workflows for status, governance, community, support, staff gateway, and grant drafting plus separate protected staff-backend source, but no activated payment backend, authenticated production staff system, confidential production records, or external grant-submission flow.
