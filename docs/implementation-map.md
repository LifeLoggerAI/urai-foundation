# Implementation Map

This map describes the current production surface of the URAI Foundation repository and the boundaries that should guide future work.

## Current repository role

URAI Foundation is a documentation-first public-interest repository with a lightweight static website. It is not currently a service runtime, SDK package, database-backed application, or API server.

The repository's production surface is:

- Public static homepage for `uraifoundation.org`.
- Public governance, ethics, transparency, and risk-review standards.
- Contribution, conduct, and security process documentation.
- Local validation tooling for Markdown links, anchors, text hygiene, and unsafe URI schemes.
- CI validation for pull requests and pushes to `main`.

## Existing implemented components

| Area | Current implementation | Status |
| --- | --- | --- |
| Public website | `index.html`, `styles.css`, `robots.txt`, `sitemap.xml`, `site.webmanifest`, `CNAME` | Implemented |
| Governance standards | `docs/governance-charter.md` | Implemented |
| Ethical standards | `docs/ethical-ai-principles.md` | Implemented |
| Transparency standards | `docs/transparency-framework.md` | Implemented |
| Risk review process | `docs/risk-review-process.md` and risk-review template | Implemented |
| Contribution process | `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, PR template | Implemented |
| Security process | `SECURITY.md` | Implemented |
| Local validation | `Makefile`, `scripts/validate-docs.py`, `tests/test_validate_docs.py` | Implemented |
| CI validation | `.github/workflows/check.yml` | Implemented |

## Integration boundaries

The Foundation anchors ethics, public accountability, and governance for the URAI ecosystem. Integration should remain standards-based unless a future proposal explicitly changes this repository into a software package or service.

Expected integration points are:

- Product teams reference Foundation standards during system design and review.
- High-impact AI changes use the risk-review process before deployment.
- Governance decisions use the decision-record template when they materially affect standards or exceptions.
- Security, privacy, safety, and conduct reports follow the documented reporting paths.
- Public website and documentation remain the source of truth for Foundation-facing commitments.

## Out of scope unless explicitly approved

The following should not be added casually because they would change the repository's role:

- Backend APIs or long-running services.
- Databases, migrations, or stateful infrastructure.
- Product SDKs or commercial application code.
- Private operational data, credentials, incident details, or confidential partner materials.
- Mock integrations that appear production-ready but do not connect to real systems.

If one of these becomes necessary, open an issue or decision record first and document the governance rationale.

## Validation requirements

Before merging material changes, run:

```bash
make check
```

This runs:

```bash
python3 -m unittest discover -s tests
python3 scripts/validate-docs.py
```

The CI workflow runs the same check on pull requests and pushes to `main`.

## Known limitations

- This repository does not include an HTML validator or visual regression testing for the static site.
- External links are allowed by scheme but are not currently checked for remote availability.
- Governance documents are living standards and still require human review for substantive policy quality.
- No automated deployment verification is included beyond static file/document validation.

## Future hardening candidates

Consider these only if the repository's maintenance burden justifies them:

- Add an HTML validation step.
- Add a link checker for external URLs with safe retry and allowlist behavior.
- Add accessibility checks for the static homepage.
- Add release notes or versioning for major standards updates.
- Add issue templates for policy proposals, risk reviews, security contact requests, and documentation bugs.
