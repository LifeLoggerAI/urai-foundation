# URAI Foundation Production Lock Audit

Date: 2026-06-30
Repo: LifeLoggerAI/urai-foundation
Default branch: main
Visibility: public
Auditor: ChatGPT URAI Foundation Full Due Diligence + Production Completion Agent

## Commit proof

- Baseline audited commit: c86846bcdaba001c66252d1adfecf3a3c33a3772 (`Add Wave 3 foundation launch lock evidence`).
- Safety fix commit 1: 4b6677078b91a2a97b3528370b8add536db06c73 (`Add Foundation legal status safety notice`).
- Safety fix commit 2: 1a74d9dff0b90b77038a4304f6e8c1ec614d216a (`Clarify Foundation formation status in README`).

## Purpose determination

URAI Foundation is a documentation-first public-interest standards repository with a lightweight static website. It is not currently a service runtime, SDK package, backend API, database-backed application, donation platform, grant system, or live nonprofit/charity operations portal.

Implemented scope observed:

- Static homepage: `index.html`.
- Static visual/site assets: `styles.css`, `favicon.svg`, `robots.txt`, `sitemap.xml`, `site.webmanifest`, `CNAME`.
- Governance and public accountability documents in `docs/`.
- Contribution, conduct, security, versioning, changelog, validation script, unit tests, and GitHub Actions workflow.

## Route and CTA audit

### Implemented static/public routes

- `/` via `index.html`.
- `/docs/governance-charter.md`.
- `/docs/ethical-ai-principles.md`.
- `/docs/transparency-framework.md`.
- `/docs/risk-review-process.md`.
- `/docs/templates/decision-record.md`.
- `/docs/templates/risk-review-record.md`.
- `/CONTRIBUTING.md`.
- `/SECURITY.md`.
- `/robots.txt`.
- `/sitemap.xml`.
- `/site.webmanifest`.
- `/favicon.svg`.

### CTAs

- `Explore the standards` anchors to `#standards` on the homepage.
- `View the public repository` links to `https://github.com/LifeLoggerAI/urai-foundation`.
- Standards cards link to repository Markdown docs.
- `Open an issue` links to `https://github.com/LifeLoggerAI/urai-foundation/issues`.
- `Contact the Foundation` is a `mailto:hello@uraifoundation.org` link.

### Not implemented as separate public routes

The Wave 3 launch evidence lists desired future public routes that are not present as separate route files in the current static-root implementation:

- `/accessibility`
- `/deaf-community`
- `/emotional-wellness`
- `/responsible-ai`
- `/research`
- `/partners`
- `/contact`
- `/privacy`
- `/terms`

Because the repository is a static documentation-first site, these should remain blockers unless separate static pages or redirects are intentionally created and validated.

## Legal and claim audit

### Safe/verified claims

- Public-interest standards and governance documentation exists.
- Ethical AI principles, transparency framework, risk-review process, decision templates, security policy, contribution process, changelog, and validation tooling exist.
- The repo is public and configured for `uraifoundation.org` through `CNAME`.

### Risky claims mitigated in this audit

The homepage and README could be interpreted as implying formal nonprofit/foundation/legal status. I added explicit formation-era and non-claim language to both:

- Homepage now states that URAI Foundation is an active formation-era public-interest standards project and does not claim nonprofit, charity, grantmaking, donation, tax-exempt, or legal foundation status.
- README now states the same boundary unless separately verified and documented.

### Claims not verified / not allowed yet

Do not claim any of the following as live or legally established without separate evidence:

- Nonprofit incorporation or tax-exempt status.
- Charity registration.
- Active grantmaking.
- Donation acceptance.
- Clinical, therapy, medical, diagnostic, crisis, deception-detection, certified-device, or trust-scoring outcomes.
- Public benefit programs beyond standards/docs/research intent.
- Partner/research form persistence or backend writes.

## Forms, actions, and persistence

No backend forms, API endpoints, database writes, grant intake, donation checkout, or partner/research submission flow were observed in the audited source. The only contact mechanism on the homepage is a `mailto:` link.

## Validation and deployment proof

### Local install/lint/typecheck/test/build

- No `package.json` was present, so there is no npm install/lint/typecheck/build lifecycle for this repo.
- The repository defines validation through `make check`, which runs Python unit tests and the documentation/static-site validator.
- I could not clone from the execution environment because the sandbox could not resolve `github.com`; therefore I did not truthfully record a fresh local `make check` pass from the sandbox.
- GitHub combined status for the audited and follow-up commits returned no statuses/checks at the time of audit.

### Deployment

- `CNAME` targets `uraifoundation.org`.
- The repository docs themselves record the live-domain status as `repo-live / domain-dns-blocked` and state that `uraifoundation.org` was still blocked by DNS routing while resolving to Squarespace.
- Production live readiness must not be approved until DNS resolves to GitHub Pages, HTTPS is verified, and `scripts/verify-live-domain.py` passes.

## Blockers

### P0

1. DNS/live deployment remains unverified and documented as blocked until `uraifoundation.org` resolves to GitHub Pages and no longer serves Squarespace.
2. Required Wave 3 route set is not implemented as separate public routes.
3. No verified backend exists for research/partner requests or UTM/source capture.
4. No passing current CI/check artifact was visible for the final audit commits.

### P1

1. Add `/privacy` and `/terms` or intentionally route to the URAI Privacy/legal surface.
2. Add `/contact` as a real static page or documented mailto-only contact page.
3. Add accessibility/deaf-community/responsible-AI/research/partners pages only if copy is reviewed for claim safety.
4. Add automated accessibility checks for the homepage.

### P2

1. Add external link checking with safe retry/allowlist behavior.
2. Add visual regression or screenshot smoke tests for the static homepage.
3. Add release tags or signed release process for material standards versions.

### P3

1. Improve styling for the new `.formation-note` class if desired.
2. Add a dedicated private security contact once available.

## Completion plan

1. Run `make check` locally or in CI against the latest commit after this proof file is added.
2. Implement or intentionally remove/gate the Wave 3 required public routes.
3. Decide whether partner/research/contact remain mailto-only or require backend persistence.
4. Add privacy/terms routing with URAI Privacy/legal alignment.
5. Cut DNS from Squarespace to GitHub Pages per the live deployment runbook.
6. Run `python3 scripts/verify-live-domain.py` and record output.
7. Capture GitHub Pages URL, custom-domain SSL status, latest deployed commit, and owner approval.
8. Re-open this production-lock folder with final logs once all P0 items are closed.

## Readiness score

72/100.

The repository is strong as a static standards/docs surface, but it is not production-ready as a fully live foundation/public-program surface because DNS, required route set, live verification, and any form/backend persistence remain unresolved.

## Final launch decision

PARTIAL / NOT READY for full public production launch. Repository content is substantially complete for a formation-era standards site, but final production approval is blocked by live-domain/DNS verification, missing required route set, missing backend form proof, and absent fresh CI proof for final commits.
