# URAI Foundation

URAI Foundation is the official public-interest standards and governance organization within the URAI ecosystem. This repository and website do not claim federal tax-exempt recognition, tax-deductible donations, public programs, services, grants, clinical support, or official partnerships unless separately verified and documented.

The Foundation exists to ensure that powerful technology supports real human life: dignity, consent, memory, relationships, community, and public trust. Its focus is cohesion, not generic claims about more intelligence.

Website: [uraifoundation.org](https://uraifoundation.org/)

---

## Mission

Advance responsible AI through open research, ethical frameworks, governance standards, transparency practices, and public accountability.

---

## Website

This repository includes a lightweight static public website:

- `index.html` — production homepage for `uraifoundation.org`.
- `status/index.html` — public organizational, legal-status, and ecosystem relationship disclosure.
- `accessibility/index.html` — accessibility standards page.
- `deaf-community/index.html` — Deaf community considerations page.
- `emotional-wellness/index.html` — emotional wellness standards/safety page.
- `responsible-ai/index.html` — responsible AI standards page.
- `research/index.html` — research intent and open standards page.
- `partners/index.html` — partner-interest boundary page.
- `contact/index.html` — mailto and GitHub issue contact page.
- `privacy/index.html` — static-site privacy notice.
- `terms/index.html` — conservative terms and usage notice.
- `styles.css` — responsive visual system and layout styling.
- `favicon.svg` — site icon and compact brand mark.
- `CNAME` — GitHub Pages custom domain configuration.
- `robots.txt` and `sitemap.xml` — crawl and indexing support.
- `site.webmanifest` — site metadata for installable browser contexts.

The website should communicate the Foundation as professional, warm, grounded, and human. Avoid generic AI hype. The preferred framing is cohesion, real-life human experience, community benefit, consent, accountability, and trustworthy public standards.

---

## Repository status

This repository is a documentation-first public-interest organization surface with a static website layer. It contains governance, ethics, transparency, security, contribution materials, public route pages, and the public-facing site for the Foundation.

Use the documents here as living standards. Changes should be reviewed, versioned, and traceable through pull requests.

See the [Implementation Map](docs/implementation-map.md) for the current repository surface, integration boundaries, validation requirements, known limitations, and future hardening candidates.

---

## Public route map

| Route | Purpose | Runtime status |
| --- | --- | --- |
| `/` | Homepage and route map | Static HTML |
| `/status/` | Organizational status, legal boundaries, and ecosystem relationship | Static HTML |
| `/accessibility/` | Accessibility standards | Static HTML |
| `/deaf-community/` | Deaf community considerations | Static HTML |
| `/emotional-wellness/` | Emotional wellness standards/safety | Static HTML |
| `/responsible-ai/` | Responsible AI standards | Static HTML |
| `/research/` | Research intent and open standards | Static HTML |
| `/partners/` | Partner-interest boundaries | Static HTML |
| `/contact/` | Mailto and public GitHub issue paths | Static HTML, no backend form |
| `/privacy/` | Static-site privacy notice | Static HTML |
| `/terms/` | Usage notice for public docs | Static HTML |

The site has no backend forms, accounts, donation flow, grant intake, partner database, analytics script, CRM, or persistent contact workflow in this repository.

---

## Scope of work

The URAI Foundation supports and maintains:

- Ethical principles and guidelines for AI systems.
- Public-interest research framing and publications when evidence exists.
- Governance and transparency standards.
- Open documentation and explainability practices.
- Standards review paths for researchers, nonprofits, builders, and institutions.
- Oversight frameworks that prioritize human well-being.
- Public-facing communication for the Foundation and its standards.

---

## Core documents

- [Governance Charter](docs/governance-charter.md): decision-making structure, review standards, and escalation paths.
- [Ethical AI Principles](docs/ethical-ai-principles.md): required principles for human-centered AI work.
- [Transparency Framework](docs/transparency-framework.md): disclosure, reporting, and accountability expectations.
- [Risk Review Process](docs/risk-review-process.md): intake, classification, mitigation, and approval workflow for AI risks.
- [Implementation Map](docs/implementation-map.md): repository role, implemented components, integration boundaries, validation requirements, and limitations.
- [System-of-Systems Integration Contract](docs/system-of-systems-integration.md): canonical integration status, DNS blocker, and cross-URAI handoff contract.
- [Live Deployment Runbook](docs/live-deployment-runbook.md): DNS cutover, GitHub Pages settings, live-domain verification, and rollback process.
- [Versioning and Change Policy](VERSIONING.md): standards versioning, change categories, changelog rules, and release-note expectations.
- [Changelog](CHANGELOG.md): public trace of material standards, governance, process, and website changes.
- [Accessibility and Site Quality Checklist](docs/accessibility-and-site-quality-checklist.md): responsive, accessibility, metadata, and release-verification checklist for public website work.
- [Decision Record Template](docs/templates/decision-record.md): reusable template for significant governance decisions.
- [Risk Review Record Template](docs/templates/risk-review-record.md): reusable template for documenting AI, privacy, safety, or public-interest risk reviews.
- [Security Policy](SECURITY.md): how to report security, privacy, or safety issues.
- [Contributing Guide](CONTRIBUTING.md): how to propose changes and participate constructively.
- [Code of Conduct](CODE_OF_CONDUCT.md): behavior expectations for project spaces.

---

## Independence

The URAI Foundation publishes independent standards for the URAI ecosystem.

While URAI Labs and affiliated organizations may build products and services, the Foundation standards surface:

- Maintains independent governance expectations.
- Publishes openly and transparently.
- Advocates for user rights and autonomy.
- Prioritizes societal benefit over commercial outcomes.

No commercial entity may override the ethical standards defined by the Foundation unless the Foundation's governing documents are formally amended through its authorized process.

---

## Relationship to the URAI ecosystem

- **URAI Labs LLC** — operating and technology-development company.
- **URAI IP Holdings LLC** — designated intellectual-property stewardship and licensing.
- **URAI Privacy** — data protection and consent constraints.
- **URAI Foundation** — ethics, research, public-interest, and accountability standards.

The Foundation serves as the ethical and governance standards anchor for the ecosystem while remaining organizationally distinct from commercial product operations.

---

## Local validation

No package installation is required for the current static/documentation repository.

Run all local checks before opening a pull request:

```bash
make check
```

If `make` is unavailable, run the commands directly:

```bash
python3 -m unittest discover -s tests
python3 scripts/validate-docs.py
```

The script checks Markdown and repository text files for:

- Missing final newlines.
- Trailing whitespace.
- Broken relative Markdown links, image links, reference-style links, and Markdown heading anchors.
- Broken root-relative static-site links and HTML anchors.
- Empty text files.
- Invalid UTF-8 in text files.
- Unsupported or unsafe URI schemes in Markdown and HTML links.

Pull requests and pushes to `main` also run these checks through GitHub Actions.

---

## Live deployment verification

Run:

```bash
python3 scripts/verify-live-domain.py
```

Or through Make:

```bash
make verify-live
```

This check fails intentionally while `uraifoundation.org` resolves to Squarespace. The site is live on GitHub Pages only after the live-domain verifier passes.

---

## Website launch checklist

Before launch or major website changes:

1. Confirm GitHub Pages is enabled for the repository and points to the branch/folder that contains `index.html`.
2. Confirm DNS for `uraifoundation.org` points to GitHub Pages.
3. Verify the homepage loads over HTTPS.
4. Complete the [Accessibility and Site Quality Checklist](docs/accessibility-and-site-quality-checklist.md).
5. Test navigation, document links, GitHub links, issue link, email link, and all static route pages.
6. Confirm the page title, meta description, canonical URL, Open Graph tags, favicon, `robots.txt`, `site.webmanifest`, and `sitemap.xml` are correct.
7. Run `make check`.
8. Run `make verify-live` after DNS cutover.

---

## Change process

1. Open an issue or discussion for substantial policy changes.
2. Draft edits in a focused branch.
3. Run `make check`.
4. Open a pull request using the PR template.
5. Request review from Foundation maintainers and relevant subject-matter reviewers.
6. Update `CHANGELOG.md` for material standards, governance, process, or website changes.
7. Record accepted changes in public version history.
8. Use the decision or risk-review templates for significant governance changes or high-impact AI reviews.

---

## Transparency and accountability

All materials in this repository are intended to be:

- Publicly accessible.
- Versioned.
- Open to review and discussion.
- Clear about scope, assumptions, risks, and limitations.

Changes to ethical standards or governance documents should be documented and traceable.

---

## Public legal and tax-status boundary

URAI Foundation has been established as an official organization within the URAI ecosystem. This repository does not by itself establish federal tax-exempt recognition, charitable-registration status, or donation deductibility. Those claims require separate authoritative documentation.

Formation jurisdiction, filing identifiers, governing officers or directors, and any applicable tax-exemption status will be published on the public status page only after final verification against governing records. Until then, no visitor should infer 501(c)(3) recognition or tax-deductible contribution eligibility from the Foundation name or `.org` domain.
