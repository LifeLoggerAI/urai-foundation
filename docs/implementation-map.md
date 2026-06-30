# Implementation Map

This map describes the current production surface of the URAI Foundation repository and the boundaries that should guide future work.

## Current repository role

URAI Foundation is a documentation-first public-interest repository with a lightweight static website. It is not currently a service runtime, SDK package, database-backed application, backend form processor, donation platform, grant system, or API server.

The repository's production surface is:

- Public static homepage for `uraifoundation.org`.
- Separate static route pages for accessibility, Deaf community considerations, emotional wellness standards, responsible AI, research intent, partner-interest boundaries, contact, privacy, and terms.
- Public governance, ethics, transparency, and risk-review standards.
- Contribution, conduct, security, release, changelog, accessibility, and quality process documentation.
- Structured issue and pull-request templates for documentation, policy, risk review, and site-quality work.
- Local validation tooling for Markdown links, anchors, text hygiene, static-site links, and unsafe URI schemes.
- CI validation for pull requests and pushes to `main`.

## Existing implemented components

| Area | Current implementation | Status |
| --- | --- | --- |
| Public website | `index.html`, route folders, `styles.css`, `favicon.svg`, `robots.txt`, `sitemap.xml`, `site.webmanifest`, `CNAME` | Implemented |
| Public routes | `/accessibility/`, `/deaf-community/`, `/emotional-wellness/`, `/responsible-ai/`, `/research/`, `/partners/`, `/contact/`, `/privacy/`, `/terms/` | Implemented as static HTML |
| Governance standards | `docs/governance-charter.md` | Implemented |
| Ethical standards | `docs/ethical-ai-principles.md` | Implemented |
| Transparency standards | `docs/transparency-framework.md` | Implemented |
| Risk review process | `docs/risk-review-process.md` and `docs/templates/risk-review-record.md` | Implemented |
| Decision records | `docs/templates/decision-record.md` | Implemented |
| Website quality | `docs/accessibility-and-site-quality-checklist.md` | Implemented |
| Release traceability | `VERSIONING.md`, `CHANGELOG.md` | Implemented |
| Contribution process | `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `.github/pull_request_template.md` | Implemented |
| Issue intake | `.github/ISSUE_TEMPLATE/documentation-gap.md`, `.github/ISSUE_TEMPLATE/policy-proposal.md`, `.github/ISSUE_TEMPLATE/risk-review-request.md`, `.github/ISSUE_TEMPLATE/site-quality.md` | Implemented |
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

## Public action boundaries

- Contact is mailto and public GitHub Issues only.
- No backend contact form, ticketing system, CRM, database, or message persistence exists in this repository.
- No donation flow, grant intake, partner database, research intake backend, user account system, analytics script, or payment workflow exists in this repository.
- Public route pages must keep formation-era language and must not imply live services, official partnerships, formal programs, or certification claims unless future evidence is added.

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

- This repository does not include visual regression testing for the static site.
- External links are allowed by scheme but are not currently checked for remote availability.
- Governance documents are living standards and still require human review for substantive policy quality.
- No automated deployment verification is included beyond static file/document validation.
- `uraifoundation.org` must not be marked live until DNS and HTTPS verification pass.

## Future hardening candidates

Consider these only if the repository's maintenance burden justifies them:

- Add a link checker for external URLs with safe retry and allowlist behavior.
- Add automated accessibility checks for the static homepage and route pages.
- Add visual regression or screenshot smoke tests for route pages.
- Add GitHub Releases or signed release tags for major standards versions.
- Add a private published security contact if the Foundation establishes a dedicated reporting address.
