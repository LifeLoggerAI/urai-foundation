# Contributing

Thank you for helping improve the URAI Foundation materials.

## Ways to contribute

- Propose clarifications to governance and ethics documents.
- Report gaps, contradictions, or outdated language.
- Suggest new review criteria, templates, or accountability mechanisms.
- Improve accessibility, readability, and translation readiness.
- Report public website quality, metadata, responsive layout, or accessibility issues.

## Before you start

For substantial policy changes, open a policy proposal issue first so reviewers can discuss scope, evidence, affected documents, and review needs.

For AI, privacy, safety, or public-interest risks, use the risk-review request template unless the details are sensitive. Do not include secrets, private data, active vulnerabilities, or abuse paths in public issues.

## Pull request checklist

Before opening a pull request:

- Keep the change focused and explain the rationale.
- Link related issues, decision records, or risk reviews.
- Avoid committing secrets, private data, or confidential reports.
- Run `make check` or, if `make` is unavailable, `python3 -m unittest discover -s tests` and `python3 scripts/validate-docs.py`.
- Update related documents when a policy or process changes.
- Update `CHANGELOG.md` when the change materially affects public standards, governance, contributor workflow, or website commitments.
- Complete the accessibility and site-quality checklist for meaningful public website changes.

## Writing guidelines

- Prefer clear, direct language.
- Distinguish requirements from recommendations.
- State assumptions and limitations.
- Avoid unexplained jargon.
- Use inclusive language.
- Keep public commitments specific enough to review later.

## Review standards

Maintainers may request changes for clarity, evidence quality, ethical alignment, security, privacy, safety, accessibility, or governance consistency.

Substantive changes may require subject-matter review, a decision record, a risk-review record, or a documented reassessment date.
