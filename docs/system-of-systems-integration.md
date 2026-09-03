# URAI Foundation System-of-Systems Integration

Status: formation-draft / source implemented / production unverified
Last reviewed: 2026-07-06

## Canonical role

URAI Foundation is the formation-stage public-interest standards, governance, ethics, transparency, accessibility, research-boundary, and risk-review layer for the URAI ecosystem.

It is not a commercial product runtime, shared backend, certification authority, regulator, clinical service, legal entity proof source, grant maker, or partner database.

Canonical source:

- repository: `LifeLoggerAI/urai-foundation`
- branch: `main`
- production truth: `docs/canonical-production-truth.md`
- product evidence contract: `docs/product-integration-contract.md`
- draft standards registry: `standards/registry.json`

## Production status

The repository contains a static website, route pages, formation-stage standards, templates, validation, CI, and curated site publication tooling.

Production hosting is unresolved:

- GitHub Pages configuration exists in source;
- issue #10 reports a Firebase fallback under `urai-4dc1d` / `urai-foundation`;
- backend Firebase configuration is checked in for Functions and Firestore; the protected Storage vault and Storage rules/configuration remain absent; Firebase Hosting and environment-specific project/target mapping remain absent;
- custom-domain DNS/TLS and exact deployed/rollback SHAs are not verified at current head.

Do not describe the custom-domain integration as live/verified until the release gate in `PRODUCTION_STATUS.md` passes.

## Required ecosystem evidence contract

Each product should publish or retain, tied to an exact release:

- system card;
- model/provider register;
- data-flow and processing-location record;
- consent and deletion/export map;
- risk review and exceptions;
- accessibility statement and open gaps;
- automation authority and rollback;
- incident/contact path;
- transparency/change notice;
- deployed and rollback release evidence.

Allowed evidence states:

- `NOT ASSESSED`
- `SELF-ATTESTED`
- `REVIEW PENDING`
- `REVIEWED WITH OPEN GAPS`
- `TIME-LIMITED EXCEPTION`
- `BLOCKED`
- `SUPERSEDED`

No product may claim Foundation certification, approval, or compliance because no such program exists.

## Product integration matrix

| System | Required Foundation-facing evidence | Current Foundation-side status |
| --- | --- | --- |
| URAI Spatial | XR/spatial safety, permissions, bystander privacy, motion/accessibility, provider/data flow, release proof | Contract defined; product implementation not assessed here |
| URAI Studio | Admin authority, environment/provider/secret controls, audit and release approvals | Contract defined; not assessed here |
| URAI Privacy | Consent schema, purpose, retention, deletion/export propagation, fail-closed evidence | Contract defined; not assessed here |
| URAI Analytics | Event catalog, aggregation/privacy boundaries, retention, deletion, limitation notices | Contract defined; not assessed here |
| URAI Jobs | Agent authority, approvals, idempotency, retries, cost controls, action receipts | Contract defined; not assessed here |
| Asset Factory | Provider/provenance/license/cost/moderation/checksum/promotion evidence | Contract defined; not assessed here |
| URAI Marketing | Claim evidence, citations, consent, tracking, accessibility, localization, legal review | Contract defined; not assessed here |
| URAI Content | Schemas, rights/provenance, moderation, publication status, retention | Contract defined; not assessed here |
| Storytime | Minor/public-share/synthetic-media/sensitive-content controls | Contract defined; not assessed here |
| Investor materials | Access, confidentiality, claim register, versioning, audit trail | Contract defined; not assessed here |
| B2B systems | Tenant/role/contract/consent/partner due diligence/data isolation | Contract defined; not assessed here |
| Mobile applications | Permission, background/offline, telemetry/privacy, accessibility, store disclosures | Contract defined; not assessed here |
| Autonomous agents | Scoped authority, confirmation, prohibited actions, budgets, kill switch, rollback | Contract defined; not assessed here |
| AI providers | Model/version/region/data use/retention/substitution/outage/cost/exit | Contract defined; not assessed here |

## Integration lifecycle

1. Product identifies applicable registry standards and version.
2. Product creates required evidence package.
3. Product performs risk/accessibility/privacy/security review.
4. Product records gaps and time-limited exceptions.
5. Product links evidence to an exact release SHA.
6. Public claims are updated to match evidence.
7. Material standard/product/provider/data/autonomy changes trigger reassessment.
8. Incidents link back to the affected review and release.
9. Superseded records remain available for audit.

## Independence boundary

- Commercial product teams may contribute evidence and proposals.
- Commercial ownership and funding must be disclosed.
- Product owners should not claim independent review of their own systems.
- Foundation standards must not be silently changed to fit a product release.
- A product may decline guidance, but gaps/exceptions remain visible when alignment is claimed.
- No Foundation record may expose product secrets, personal data, active abuse vectors, or confidential reports merely for transparency.

## Completion definition

Ecosystem integration becomes operational only when:

1. the Foundation governance process is approved and roles/authority are documented;
2. at least one standard completes proposal, review, public comment, decision, and registry publication;
3. at least one product publishes an exact-release implementation report;
4. conflicts and funding are disclosed;
5. exceptions and incidents have operating paths;
6. no certification/approval claim is used;
7. the Foundation public site is tied to a verified release and custom domain.
