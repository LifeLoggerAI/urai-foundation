# URAI Foundation

The URAI Foundation is an independent public-interest organization dedicated to ethical, transparent, and human-centered development across the URAI ecosystem.

The Foundation exists to ensure that powerful technology supports real human life: dignity, consent, memory, relationships, community, and public trust. Its focus is cohesion—not generic claims about more intelligence.

Website: [uraifoundation.org](https://uraifoundation.org/)

---

## Mission

Advance responsible AI through open research, ethical frameworks, governance standards, transparency practices, and public accountability.

---

## Website

This repository now includes a lightweight static public website:

- `index.html` — production homepage for `uraifoundation.org`.
- `styles.css` — responsive visual system and layout styling.
- `CNAME` — GitHub Pages custom domain configuration.
- `robots.txt` and `sitemap.xml` — crawl and indexing support.
- `site.webmanifest` — basic site metadata for installable browser contexts.

The website should communicate the Foundation as professional, warm, grounded, and human. Avoid generic AI hype. The preferred framing is cohesion, real-life human experience, community benefit, consent, accountability, and trustworthy public standards.

---

## Repository status

This repository is a documentation-first public-interest project with a static website layer. It contains governance, ethics, transparency, security, contribution materials, and the public-facing site for the Foundation.

Use the documents here as living standards. Changes should be reviewed, versioned, and traceable through pull requests.

See the [Implementation Map](docs/implementation-map.md) for the current repository surface, integration boundaries, validation requirements, known limitations, and future hardening candidates.

---

## Scope of work

The URAI Foundation supports and maintains:

- Ethical principles and guidelines for AI systems.
- Public-interest research and publications.
- Governance and transparency standards.
- Open documentation and explainability practices.
- Collaboration with researchers, nonprofits, and institutions.
- Oversight frameworks that prioritize human well-being.
- Public-facing communication for the Foundation and its standards.

---

## Core documents

- [Governance Charter](docs/governance-charter.md): decision-making structure, review standards, and escalation paths.
- [Ethical AI Principles](docs/ethical-ai-principles.md): required principles for human-centered AI work.
- [Transparency Framework](docs/transparency-framework.md): disclosure, reporting, and accountability expectations.
- [Risk Review Process](docs/risk-review-process.md): intake, classification, mitigation, and approval workflow for AI risks.
- [Implementation Map](docs/implementation-map.md): repository role, implemented components, integration boundaries, validation requirements, and limitations.
- [Versioning and Change Policy](VERSIONING.md): standards versioning, change categories, changelog rules, and release-note expectations.
- [Changelog](CHANGELOG.md): public trace of material standards, governance, process, and website changes.
- [Decision Record Template](docs/templates/decision-record.md): reusable template for significant governance decisions.
- [Risk Review Record Template](docs/templates/risk-review-record.md): reusable template for documenting AI, privacy, safety, or public-interest risk reviews.
- [Security Policy](SECURITY.md): how to report security, privacy, or safety issues.
- [Contributing Guide](CONTRIBUTING.md): how to propose changes and participate constructively.
- [Code of Conduct](CODE_OF_CONDUCT.md): behavior expectations for project spaces.

---

## Independence

The URAI Foundation operates independently from commercial entities within the URAI ecosystem.

While URAI Labs and affiliated organizations may build products and services, the Foundation:

- Maintains independent governance.
- Publishes openly and transparently.
- Advocates for user rights and autonomy.
- Prioritizes societal benefit over commercial outcomes.

No commercial entity may override the ethical standards defined by the Foundation.

---

## Relationship to the URAI ecosystem

- **URAI Labs** — commercial product development.
- **URAI IP Holdings** — intellectual property stewardship.
- **URAI Privacy** — data protection and consent constraints.
- **URAI Foundation** — ethics, research, and public accountability.

The Foundation serves as the ethical and governance anchor for the ecosystem.

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

The script checks Markdown, repository text files, and static-site files for:

- Missing final newlines.
- Trailing whitespace.
- Broken relative Markdown links, image links, reference-style links, and Markdown heading anchors.
- Broken root-relative HTML links and HTML anchors.
- Empty text files.
- Invalid UTF-8 in text files.
- Unsupported or unsafe URI schemes in Markdown and HTML links.

Pull requests and pushes to `main` also run these checks through GitHub Actions.

---

## Website launch checklist

Before launch or major website changes:

1. Confirm GitHub Pages is enabled for the repository and points to the branch/folder that contains `index.html`.
2. Confirm DNS for `uraifoundation.org` points to GitHub Pages.
3. Verify the homepage loads over HTTPS.
4. Check desktop and mobile layouts.
5. Test navigation, document links, GitHub links, issue link, and contact email.
6. Confirm the page title, meta description, canonical URL, Open Graph tags, `robots.txt`, and `sitemap.xml` are correct.
7. Run `make check`.

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

## Current formation status

The URAI Foundation is in active formation. Documents in this repository represent living standards and may evolve through research, review, and public dialogue.
