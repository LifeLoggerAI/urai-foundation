# Versioning and Change Policy

This repository contains public Foundation standards, governance materials, process templates, and the static public website. Changes should be traceable, reviewable, and understandable to future maintainers and public readers.

## Versioning model

Use date-based standards versions for material Foundation changes:

```text
YYYY.MM
```

Examples:

- `2026.05`
- `2026.06`

Patch-level labels may be used for corrections that need explicit traceability without changing the meaning of a standard:

```text
YYYY.MM.patchN
```

Example:

- `2026.05.patch1`

## Change categories

| Category | Examples | Version impact | Record requirement |
| --- | --- | --- | --- |
| Editorial | Typos, formatting, broken links, small wording clarity | No new standards version required | PR description is enough |
| Website | Static site copy, layout, metadata, crawl files | No new standards version required unless commitments change | PR description and launch checklist if public-facing |
| Process | Contribution flow, issue templates, validation tooling | No new standards version required unless governance obligations change | PR description and affected docs |
| Standards | Ethical principles, governance requirements, transparency expectations, risk-review requirements | New `YYYY.MM` standards version | Changelog entry and, when substantial, decision record |
| Exception | Time-limited deviation from a published standard | No new standards version unless it changes policy | Decision record or issue with owner, scope, expiry, and mitigation |
| Emergency | Safety, security, privacy, conduct, or abuse response | Version impact depends on follow-up policy change | Immediate maintainer action plus post-incident review note when safe |

## When to update the changelog

Update `CHANGELOG.md` when a change:

- Adds, removes, or materially changes a Foundation standard.
- Changes governance authority, escalation, review, or independence requirements.
- Changes risk-review requirements or approval criteria.
- Changes public transparency or accountability expectations.
- Introduces a new public template or process that materially affects contributors or reviewers.
- Launches or substantially changes the public website message.

Editorial-only changes do not need a changelog entry unless maintainers want a visible trace.

## Required PR information for material changes

For standards or high-impact process changes, PRs should include:

- Affected documents.
- Change category.
- Proposed standards version, if applicable.
- Rationale and expected impact.
- Reviewers or subject-matter perspectives requested.
- Open questions or unresolved tradeoffs.
- Whether a decision record or risk-review record is needed.

## Release notes

For each new standards version, add a changelog section with:

- Version identifier.
- Date accepted.
- Summary of changes.
- Affected documents.
- Compatibility or migration notes for URAI ecosystem teams.
- Links to decision records, risk reviews, issues, or pull requests when available.

## Backward compatibility

Foundation standards are living documents. When possible, avoid breaking changes without transition guidance.

A breaking standards change is one that materially changes expectations for teams, contributors, reviewers, or public commitments. Breaking changes should include:

- Clear rationale.
- Effective date.
- Affected parties.
- Transition or reassessment guidance.
- Owner for follow-up questions.

## Tags and releases

Git tags are optional for now. If maintainers choose to publish GitHub Releases later, use the standards version as the tag name for material standards releases, such as `standards-2026.05`.
