# Release and Versioning Guidance

URAI Foundation standards are living documents, but material changes should still be traceable. Use this guide when publishing or revising governance, ethics, transparency, risk-review, or public website materials.

## Change classes

| Class | Examples | Expected handling |
| --- | --- | --- |
| Editorial | Typo fixes, formatting, small clarity edits | Pull request with normal review |
| Minor standard update | Additional examples, non-breaking clarifications, template improvements | Pull request, affected-doc review, changelog note when useful |
| Major standard update | New requirements, changed review thresholds, independence rules, risk classifications | Issue or decision record, subject-matter review, explicit rationale |
| Emergency update | Security, privacy, safety, abuse, or legal urgency | Expedited maintainer action with follow-up review record |

## Versioning approach

The repository does not currently use formal numbered releases. Until that changes, use Git history, pull requests, and decision records as the source of truth.

For major changes, include:

- Date accepted.
- Documents affected.
- Decision owner or accountable maintainer.
- Summary of what changed.
- Rationale and alternatives considered.
- Risks, mitigations, and reassessment date.
- Related issue, pull request, decision record, or risk review.

## Website updates

For visible website updates, also complete the [Accessibility and Site Quality Checklist](accessibility-and-site-quality-checklist.md).

## Public communication

When a change materially affects public commitments, publish the change in a way that a reviewer can trace. Acceptable options include:

- Pull request summary.
- Decision record.
- Release note or changelog entry if a changelog is later added.
- Public issue comment linking to the merged change.

## Reassessment cadence

Review major standards at least annually or when any of the following occurs:

- Material product, model, or data changes.
- New user populations or deployment contexts.
- Safety, privacy, security, fairness, or accessibility incidents.
- Relevant legal or regulatory changes.
- Credible external concerns from researchers, partners, or affected communities.
