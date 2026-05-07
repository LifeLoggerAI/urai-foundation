# URAI Foundation

The URAI Foundation is an independent public-interest organization dedicated to the ethical, transparent, and human-centered development of life-scale artificial intelligence systems.

The Foundation exists to ensure that technologies developed within the URAI ecosystem align with societal benefit, individual dignity, and long-term public trust.

---

## Mission

Advance responsible AI through open research, ethical frameworks, governance standards, and public accountability.

---

## Repository status

This repository is a documentation-first public-interest project. It currently contains governance, ethics, transparency, security, and contribution materials rather than application source code.

Use the documents here as living standards. Changes should be reviewed, versioned, and traceable through pull requests.

---

## Scope of work

The URAI Foundation supports and maintains:

- Ethical principles and guidelines for AI systems.
- Public-interest research and publications.
- Governance and transparency standards.
- Open documentation and explainability practices.
- Collaboration with researchers, nonprofits, and institutions.
- Oversight frameworks that prioritize human well-being.

---

## Core documents

- [Governance Charter](docs/governance-charter.md): decision-making structure, review standards, and escalation paths.
- [Ethical AI Principles](docs/ethical-ai-principles.md): required principles for human-centered AI work.
- [Transparency Framework](docs/transparency-framework.md): disclosure, reporting, and accountability expectations.
- [Risk Review Process](docs/risk-review-process.md): intake, classification, mitigation, and approval workflow for AI risks.
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

No package installation is required for the current documentation-only repository.

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
- Empty Markdown files.
- Invalid UTF-8 in text files.
- Unsupported or unsafe URI schemes in Markdown links.

---

## Change process

1. Open an issue or discussion for substantial policy changes.
2. Draft edits in a focused branch.
3. Run `python3 scripts/validate-docs.py`.
4. Open a pull request using the PR template.
5. Request review from Foundation maintainers and relevant subject-matter reviewers.
6. Record accepted changes in public version history.
7. Use the decision or risk-review templates for significant governance changes or high-impact AI reviews.

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
