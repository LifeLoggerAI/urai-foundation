# Public Accountability Template Suite

Status: formation-draft

Use the smallest template that accurately fits the work. Remove instructional text before publication. Do not fill unknown fields with invented facts; use `unknown`, `not assessed`, `vacant`, or `not applicable` with an explanation.

## 1. System card

```markdown
# System Card: <system name>

- Record ID:
- Version:
- Status: draft / active / superseded / withdrawn
- Product owner role:
- Source repository and SHA:
- Deployment environment and SHA:
- Last reviewed:

## Purpose and intended users

## Capabilities

## Known limitations

## Inappropriate or prohibited uses

## AI models and providers

## Data categories and processing locations

## Human oversight and contestability

## Consent, deletion, export, and portability

## Accessibility target, evidence, and open gaps

## Safety/security controls

## Risk-review and exception links

## Incident/contact path

## Change history
```

## 2. Transparency report

```markdown
# Transparency Report: <scope and period>

- Report ID:
- Covered systems/releases:
- Reporting period:
- Prepared by role:
- Review status:

## Material changes

## Provider/model changes

## Data-flow and retention changes

## Automation and human-oversight changes

## Accessibility changes and known barriers

## Incidents and corrective actions

## Exceptions and expirations

## User complaints, appeals, and disposition summary

## Commercial influence, funding, and conflicts

## Evidence and limitations

## Next review
```

## 3. Accessibility conformance and gap statement

```markdown
# Accessibility Statement: <system/site>

- Version/release SHA:
- Target standard:
- Assessment date:
- Assessor role and independence:
- Methods and tools:
- User/community review performed:

## Supported access needs and modes

## Verified passes

## Known barriers

## Critical-flow impact

## Workarounds

## Remediation owner and target review

## Exceptions and rationale

## Feedback/contact path

## Evidence attachments

This statement is not a certification unless a separately authorized certification process is identified.
```

## 4. Conflict-of-interest disclosure

```markdown
# Conflict Disclosure

- Record ID:
- Person or role:
- Matter under review:
- Disclosure date:

## Relevant financial, employment, ownership, advisory, funding, personal, or product responsibility interest

## Assessment

## Recusal or mitigation

## Replacement reviewer, if needed

## Decision and approving role

## Review/expiry date
```

## 5. Public-comment record

```markdown
# Public Comment Record: <proposal>

- Proposal ID/version:
- Opened:
- Closed:
- Participation channels:
- Accessibility accommodations:
- Moderator role:

## Questions presented

## Participation summary

## Comment dispositions

| Comment/theme | Disposition | Rationale | Change/link |
| --- | --- | --- | --- |

## Minority or unresolved views

## Final decision link

## Privacy and moderation notes
```

## 6. Incident disclosure

```markdown
# Incident Disclosure: <safe title>

- Incident ID:
- Status: investigating / contained / remediated / closed
- Detected:
- Public notice date:
- Systems/releases affected:
- Incident owner role:

## Safe summary

## People or data potentially affected

## What is known and not known

## Immediate containment

## User action, if any

## Corrective actions

## Consent/deletion/export impact

## Accessibility impact

## Third-party/provider involvement

## Regulatory or legal review status

## Next update

## Confidential appendix location
```

Do not publish exploit details, secrets, private data, or information that materially increases risk.

## 7. Standards proposal

```markdown
# Standards Proposal: <title>

- Proposal ID:
- Proposed registry ID:
- Version:
- Status: formation-draft / public-review
- Proposer role:
- Owner role:
- Comment period:

## Problem and affected populations

## Scope and non-goals

## Normative requirements

Use `MUST`, `MUST NOT`, `SHOULD`, `SHOULD NOT`, and `MAY` only when their force is defined.

## Implementation guidance

## Evidence and rationale

## Privacy, safety, security, accessibility, and legal analysis

## Compatibility and transition

## Conformance or implementation evidence

## Open questions

## Required reviewers and conflicts

## Decision record
```

## 8. Implementation report / self-attestation

```markdown
# Implementation Report: <product and standard>

- Product/release SHA:
- Standard ID/version:
- Evidence state: NOT ASSESSED / SELF-ATTESTED / REVIEW PENDING / REVIEWED WITH OPEN GAPS / TIME-LIMITED EXCEPTION / BLOCKED
- Product owner role:
- Reviewer role:
- Date:

| Requirement | Status | Evidence | Gap/exception | Owner | Review date |
| --- | --- | --- | --- | --- | --- |

## System-card link

## Risk-review link

## Accessibility evidence

## Provider and data-flow evidence

## Incidents/open issues

## Limitations

This report is not certification or approval.
```

## 9. Corrections and retractions record

```markdown
# Correction / Withdrawal / Retraction

- Record ID:
- Affected publication and version:
- Action:
- Effective date:
- Authorized by role:

## Original material

## Corrected/retracted material

## Reason and evidence

## Impact on conclusions or downstream records

## Replacement or superseding record

## Notification and follow-up
```

## 10. Release evidence record

```markdown
# Release Evidence: <release ID>

- Repository:
- Branch:
- Source SHA:
- Prior rollback SHA:
- Provider/project/site:
- Artifact digest:
- Workflow run:
- Deployed at UTC:
- Deployed by role:
- Approval:

## Required checks

## Artifact contents and exclusions

## DNS and TLS evidence

## Route and metadata smoke results

## Accessibility smoke results

## Known exceptions

## Rollback procedure and drill result

## Final status
```
