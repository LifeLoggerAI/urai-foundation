# URAI Foundation

URAI Foundation is the official public-interest standards and governance initiative within the URAI ecosystem. This repository and website do not by themselves establish that URAI Foundation is a separately incorporated legal entity, federally tax-exempt organization, registered charity, or donation-eligible organization. Exact legal and tax status will be published only from authoritative records.

The Foundation initiative exists to ensure that powerful technology supports real human life: dignity, consent, memory, relationships, community, and public trust. Its focus is cohesion, not generic claims about more intelligence.

Website: [uraifoundation.org](https://uraifoundation.org/)

---

## Mission

Advance responsible AI through open research, ethical frameworks, governance standards, transparency practices, and public accountability.

---

## Website

This repository includes a lightweight static public website:

- `index.html` — production homepage candidate for `uraifoundation.org`.
- `status/index.html` — public status, legal-boundary, and ecosystem-relationship disclosure.
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

The website should communicate the Foundation initiative as professional, warm, grounded, and human. Avoid generic AI hype. The preferred framing is cohesion, real-life human experience, community benefit, consent, accountability, and trustworthy public standards.

---

## Repository status

This repository is a documentation-first public-interest initiative surface with a static website layer. It contains governance proposals, ethics standards, transparency materials, security and contribution guidance, public route pages, and the public-facing site for the Foundation initiative.

Use the documents here as living standards. Changes should be reviewed, versioned, and traceable through pull requests.

See the [Implementation Map](docs/implementation-map.md) for the current repository surface, integration boundaries, validation requirements, known limitations, and future hardening candidates.

---

## Public route map

| Route | Purpose | Runtime status |
| --- | --- | --- |
| `/` | Homepage and route map | Static HTML |
| `/status/` | Public status, legal boundaries, and ecosystem relationship | Static HTML |
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

The URAI Foundation initiative supports and maintains:

- Ethical principles and guidelines for AI systems.
- Public-interest research framing and publications when evidence exists.
- Governance and transparency standards.
- Open documentation and explainability practices.
- Standards review paths for researchers, nonprofits, builders, and institutions.
- Oversight frameworks that prioritize human well-being.
- Public-facing communication for the Foundation initiative and its standards.

---

## Core documents

- [Governance Charter](docs/governance-charter.md): proposed decision-making structure, review standards, and escalation paths.
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

## Governance and independence boundary

The URAI Foundation initiative is designed to publish standards that can be reviewed separately from commercial product claims.

While URAI Labs LLC and affiliated product teams may build products and services, the Foundation standards surface is intended to:

- Maintain independent review expectations.
- Publish openly and transparently.
- Advocate for user rights and autonomy.
- Prioritize societal benefit over commercial outcomes.

Commercial product teams should not describe deviations from these standards as Foundation-approved unless an authorized, documented review process says so. Final governance authority, legal independence, board authority, and amendment procedures are not claimed by this repository and require adopted governing documents.

---

## Relationship to the URAI ecosystem

- **URAI Labs LLC** — operating and technology-development company.
- **URAI IP Holdings LLC** — designated intellectual-property stewardship and licensing.
- **URAI Privacy** — data protection and consent constraints.
- **URAI Foundation** — public-interest standards and governance initiative.

The Foundation initiative serves as the ethical and governance standards anchor for the ecosystem and is functionally separate from commercial product operations. This repository does not claim that the initiative is legally independent from URAI Labs LLC or any other entity.

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

URAI Foundation currently operates publicly as the official public-interest standards and governance initiative within the URAI ecosystem. This repository does not establish separate legal entity status, incorporation, federal tax-exempt recognition, charitable-registration status, or donation deductibility.

Exact entity type, jurisdiction, formation date, filing identifiers, governing officers or directors, adopted bylaws, and any applicable tax-exemption status will be published only after verification against authoritative records. Until then, no visitor should infer separate incorporation, 501(c)(3) recognition, registered-charity status, or tax-deductible contribution eligibility from the Foundation name or `.org` domain.
