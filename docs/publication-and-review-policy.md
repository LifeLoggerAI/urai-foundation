# Publication, Evidence, Corrections, and External Review Policy

Status: formation-draft
Last reviewed: 2026-07-06

## Scope

This policy applies to Foundation standards, research-intent materials, evidence reports, implementation reports, public accountability records, and future research publications. It does not claim that the Foundation currently operates a research institution, ethics board, peer-review journal, or certification program.

## Publication classes

| Class | Purpose | Minimum review | Allowed claim |
| --- | --- | --- | --- |
| Working note | Early question, outline, or planning input | Author/editor check | Draft; not authoritative |
| Formation draft | Public proposal for a standard or policy | Governance and relevant subject-matter review | Formation-stage proposal |
| Evidence report | Describes inspected source, tests, or observations | Evidence reviewer and affected owner | Findings limited to inspected evidence |
| External-review draft | Material opened for qualified/public review | Named review plan and comment period | Under review |
| Adopted standard | Approved through the operating governance process | Required approvals and decision record | Adopted Foundation standard; not certification |
| Research preprint | Research manuscript before formal external review | Research editor, ethics/privacy screen | Preprint; not peer reviewed |
| Reviewed publication | Publication with documented external review | Qualified reviewers and conflict disclosure | Externally reviewed; scope stated |
| Withdrawal/retraction | Record removed from active reliance | Governance/research approval | Withdrawn or retracted with reason |

## Evidence grades

- **E0 — Assertion:** unsupported statement or planning assumption.
- **E1 — Internal record:** repository file, issue, Drive plan, screenshot, or operator note without independent verification.
- **E2 — Reproducible internal evidence:** exact source SHA plus repeatable test, build, or deployment receipt.
- **E3 — Independent technical review:** qualified reviewer reproduces or inspects evidence and discloses conflicts.
- **E4 — External empirical evidence:** appropriately designed study, dataset, or evaluation with methods and limitations.
- **E5 — Replicated/consensus evidence:** multiple credible independent sources or replications.

Every material factual claim should identify the strongest applicable grade. Marketing reach, health, accessibility, safety, legal status, partner, and impact claims require especially careful evidence.

## Citation rules

Publications should:

- cite primary and authoritative sources where available;
- distinguish direct evidence, interpretation, inference, and recommendation;
- include source date/version and stable locator;
- avoid citing private or sensitive material in a way that exposes it;
- disclose inaccessible or unavailable evidence;
- preserve quoted context;
- identify conflicts, funding, and relevant commercial interests;
- state known limitations and missing data.

Drive planning documents may support an internal roadmap but do not prove implementation, legal status, partnerships, studies, outcomes, or public deployment.

## Review requirements

Review plans should name roles rather than inventing people:

- standards editor;
- governance reviewer;
- privacy/security reviewer;
- accessibility reviewer;
- affected-community reviewer;
- legal reviewer when claims or obligations are sensitive;
- research-methods reviewer for empirical work.

Unfilled roles must be marked `vacant`, `not assigned`, or `review required`.

## Conflict disclosure and recusal

Authors and reviewers should disclose:

- employment or ownership interests;
- funding or sponsorship;
- close personal or advisory relationships;
- product responsibility;
- pending transactions or partnerships;
- public advocacy that could reasonably affect impartiality.

A reviewer should recuse when the conflict prevents credible independent judgment. A recusal and replacement should be recorded without exposing unnecessary personal information.

## Public comment

A public-comment record should include:

- proposal identifier and version;
- opening and closing date;
- scope and questions;
- safe participation channel;
- accessibility accommodations;
- comments received or a privacy-safe summary;
- disposition: accepted, accepted in part, rejected, deferred, or out of scope;
- rationale;
- final decision record.

Public GitHub issues are appropriate only for non-sensitive material. Sensitive comments require a verified private path.

## Research and human-subject boundary

No publication may imply active human-subject research, clinical validation, participant enrollment, institutional review, or academic partnership without authoritative evidence.

Before collecting research data from people, qualified reviewers should determine:

- whether the activity is research or product evaluation;
- consent and withdrawal requirements;
- privacy and data-minimization controls;
- vulnerable-population protections;
- compensation and non-coercion;
- ethics or institutional review requirements;
- safety escalation;
- data retention, sharing, and deletion;
- publication and re-identification risk.

The Foundation must not self-declare that formal ethics or institutional review is unnecessary for high-risk work.

## Corrections

A correction should be issued when a publication remains useful but contains a material error or ambiguity.

The record should contain:

- publication and version;
- correction date;
- original statement;
- corrected statement;
- impact on conclusions;
- reason;
- approving role;
- links to superseded and corrected versions.

Silent replacement is not appropriate for material corrections.

## Withdrawal and retraction

Withdrawal may be used for superseded drafts or incomplete work. Retraction should be considered for unreliable evidence, serious undisclosed conflict, fabricated or falsified material, unsafe publication, privacy breach, or conclusions no longer supportable.

A retraction notice should remain public when safe and state:

- what is retracted;
- why;
- who authorized the action;
- whether data or downstream records are affected;
- corrective actions;
- replacement publication, if any.

Retraction is not punishment and should not erase the audit trail.

## External review

External review must be described precisely. The Foundation should not call review `independent` when the reviewer is employed by, paid by without disclosure from, or materially affiliated with the product owner.

A review report should include:

- reviewer role and qualifications;
- scope and exclusions;
- evidence inspected;
- methods;
- conflicts and funding;
- findings by severity;
- unresolved questions;
- management response;
- follow-up date.

## Publication metadata

Future machine-readable records should include:

```json
{
  "id": "",
  "title": "",
  "publication_class": "formation-draft",
  "version": "",
  "status": "",
  "authors_or_roles": [],
  "reviewers_or_roles": [],
  "evidence_grade": "E1",
  "published_at": "",
  "updated_at": "",
  "supersedes": null,
  "superseded_by": null,
  "funding": [],
  "conflicts": [],
  "corrections": [],
  "license": "pending-legal-review",
  "canonical_url": ""
}
```

## Acceptance gate

A material Foundation publication is ready only when:

- class and status are visible;
- version and date are present;
- claims match evidence;
- required review is recorded;
- conflicts/funding are disclosed;
- privacy and safety review is complete;
- correction path exists;
- license status is clear;
- no unsupported legal, institutional, research, partner, certification, or impact claim is introduced.
