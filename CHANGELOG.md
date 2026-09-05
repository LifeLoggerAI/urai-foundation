# Changelog

All notable public standards, governance, process, and website changes should be recorded here when they materially affect Foundation commitments or contributor/reviewer workflow.

This repository uses date-based standards versions for material Foundation changes. See [Versioning and Change Policy](VERSIONING.md).

## Unreleased

### Added

- Evidence-backed Foundation v1 audit, P0–P5 gap matrix, and dependency-based capability roadmap.
- Canonical production-truth record separating source, GitHub Pages, Firebase fallback, DNS, deployed SHA, and legal status.
- Formation-stage machine-readable standards registry and schema.
- Dependency-free standards-registry validation and unit tests.
- Product integration contract for URAI ecosystem repositories.
- Publication, evidence, corrections, retractions, research-boundary, and external-review policy.
- Public-accountability template suite for system cards, transparency reports, accessibility statements, conflicts, public comments, incidents, standards proposals, implementation reports, corrections, and releases.
- Curated public-site build script, manifest, tests, and CI artifact.
- Formation-stage advisor governance and operations process covering restricted intake, credential and conflict verification, appointment authority, least-privilege access, review independence, and publication-permission gates.

### Changed

- Expanded the Governance Charter with formation-stage roles, vacancies, proposal lifecycle, conflicts, recusals, voting model, public comment, appeals, minority opinions, emergency limits, records, and legal transition gates.
- Expanded Ethical AI Principles for memory provenance, identity, relationships, grief/legacy, vulnerable users, health-adjacent boundaries, accessibility, agentic systems, multi-model councils, providers, location/biometrics, spatial systems, synthetic media, deletion/export, and recourse.
- Expanded the Transparency Framework with system/provider/data-flow/consent/accessibility/incident/change/funding records and machine-readable roadmap.
- Expanded the Risk Review Process with taxonomy, scoring, affected populations, residual risk, exceptions, deployment gates, confidential appendices, appeals, and URAI scenario exercises.
- Relabeled the Foundation program menu as unlaunched concepts with explicit activation gates.
- Replaced stale README and production status language with evidence-gated hosting and launch truth.
- Updated Pages deployment to publish only the allowlisted `_site` artifact rather than the repository root.
- Consolidated the required `Check` workflow and added a reviewable public-site artifact.

### Removed

- Misleading Node production-verification workflow that returned success when the repository had no package manifest and performed no verification.

### Review requirements

These are material formation-stage standards changes. They remain draft until reviewed through the Governance Charter, with relevant governance, legal, privacy, security, accessibility, research, technical, and affected-community perspectives.

No certification, legal status, active program, research, partner, grant, donation, or clinical claim is created by this change set.

## 2026.05

Initial formation-era standards baseline.

### Added

- Public static homepage for `uraifoundation.org`.
- Governance Charter.
- Ethical AI Principles.
- Transparency Framework.
- Risk Review Process.
- Decision Record Template.
- Risk Review Record Template.
- Security Policy.
- Contributing Guide.
- Code of Conduct.
- Documentation validation script and unit tests.
- GitHub Actions validation workflow.
- Implementation map defining repository scope and integration boundaries.
- Structured issue templates for policy proposals, risk reviews, documentation and website issues, and maintainer process questions.

### Compatibility notes

- The repository is a documentation-first Foundation standards and static website repository.
- It does not define backend APIs, SDK contracts, databases, or runtime services.
- URAI ecosystem teams should treat published standards and review processes as public accountability guidance rather than executable service interfaces.
