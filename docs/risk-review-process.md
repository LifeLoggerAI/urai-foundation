# Risk Review Process

Status: formation-draft
Registry ID: `URAI-RSK-001`

Use this process for proposed AI systems, material changes, standards, public claims, or deployments that may affect safety, rights, privacy, accessibility, autonomy, identity, memory, relationships, or public trust.

A completed template is not an approval by itself. Approval authority and reviewer roles must be valid and documented.

## 1. Intake

Assign a stable review ID and record:

- proposal/system and exact source/release version;
- owner role;
- intended users and affected non-users;
- problem, expected benefit, alternatives, and non-goals;
- deployment context and scale;
- AI models/providers and automation authority;
- data categories, sources, destinations, retention, deletion/export, and processing locations;
- vulnerable populations;
- public claims;
- known constraints and open questions;
- related incidents, exceptions, prior reviews, and standards.

## 2. Risk taxonomy

Assess at minimum:

- safety and physical/spatial harm;
- privacy, consent, surveillance, and security;
- identity, memory, relationship, grief, and legacy harm;
- emotional manipulation, dependency, and vulnerable-user harm;
- discrimination, exclusion, and cultural/language mismatch;
- accessibility barriers;
- autonomy, agentic action, and reversibility;
- hallucination, reliability, provenance, and model uncertainty;
- minors, dependents, guardianship, and capacity;
- health-adjacent/clinical boundary;
- legal, regulatory, contractual, and IP risk;
- provider, outage, substitution, and supply-chain risk;
- financial/cost/resource risk;
- public claim, reputation, and institutional-trust risk;
- environmental/resource impact.

## 3. Scoring

Score each material risk from 1 to 5 for:

- **Severity:** magnitude of plausible harm.
- **Likelihood:** probability under expected and reasonably foreseeable misuse.
- **Exposure:** number, frequency, duration, and sensitivity of affected people/data.
- **Detectability:** how likely the failure is to be noticed before harm; reverse the score so 5 means difficult to detect.
- **Reversibility:** how difficult it is to correct, delete, compensate, or roll back; 5 means difficult or impossible.

Record rationale, evidence, uncertainty, and affected populations. Do not use the numeric product as a substitute for judgment.

Suggested initial tier:

| Tier | Typical profile | Minimum response |
| --- | --- | --- |
| Low | Limited data, low autonomy, reversible, low exposure | Owner review and documented controls |
| Medium | User-facing AI, sensitive context, moderate scale or uncertainty | Cross-functional review and release conditions |
| High | Sensitive data, vulnerable users, memory/identity/relationship/location, autonomous action, significant public impact | Formal review, qualified expertise, deployment gate, expiry, monitoring, rollback |
| Critical | Irreversible/high-impact action, clinical/legal/financial decision, minors/dependents, large-scale surveillance, serious physical/spatial risk | Block by default pending qualified external/legal review and explicit authority |

Any single critical factor may raise the tier regardless of aggregate score.

## 4. Affected-population and vulnerable-user analysis

Identify:

- direct users and bystanders;
- people whose data appears in another user’s account;
- children/dependents;
- older adults;
- people in distress, grief, trauma-sensitive contexts, or cognitive impairment;
- disabled and access-dependent users;
- people subject to coercive control, stalking, employment, insurance, government, or family pressure;
- language/cultural groups;
- people excluded by device, connectivity, literacy, or cost.

Describe benefits, burdens, failure modes, ability to understand/contest, and participation in review.

## 5. Evidence gathering

Gather evidence proportionate to risk:

- system/provider/data-flow/consent records;
- threat model and security review;
- privacy analysis;
- accessibility tests and affected-user review;
- model evaluation and red-team results;
- hallucination/provenance tests;
- automation authorization and rollback tests;
- reliability, outage, and substitution behavior;
- legal and public-claim review;
- incident history;
- usability and comprehension evidence;
- alternative designs and data-minimization analysis.

Separate source evidence, test results, assumptions, and recommendations.

## 6. Mitigation plan

For every material risk record:

- control;
- prevention/detection/recovery type;
- owner;
- due date or release gate;
- test method;
- monitoring signal and threshold;
- user notice/consent effect;
- rollback, kill switch, or disablement trigger;
- remaining uncertainty;
- residual risk after mitigation.

Mitigations that are merely planned do not reduce the current risk score until implemented and verified.

## 7. Review and approval requirements

| Tier | Required roles |
| --- | --- |
| Low | Product/document owner |
| Medium | Owner plus relevant privacy/security/accessibility/technical reviewer |
| High | Risk Review Chair role, relevant qualified reviewers, affected-community perspective where feasible, named deployment approval |
| Critical | Qualified external/legal/domain review and explicit authorized governing decision; block if authority is absent |

Conflicts and recusals must be recorded. Vacant roles remain blockers where required.

## 8. Decision states

Use:

- `APPROVED WITHIN SCOPE`
- `APPROVED WITH CONDITIONS`
- `TIME-LIMITED EXCEPTION`
- `RETURNED FOR EVIDENCE`
- `BLOCKED`
- `REJECTED`
- `WITHDRAWN`
- `SUPERSEDED`

The decision must state scope, release/version, conditions, unresolved risks, residual-risk owner, expiry/reassessment date, monitoring, and appeal path.

## 9. Residual-risk acceptance

Residual risk may be accepted only by a role with documented authority and no disqualifying conflict. Acceptance must state why benefit is proportionate, what alternatives were considered, who may be affected, what remains uncertain, and what triggers rollback or reassessment.

A product owner cannot call risk independently accepted on behalf of users, communities, the Foundation, or a nonexistent board.

## 10. Exceptions

A time-limited exception must identify the waived requirement, reason, evidence, scope, risk, mitigation, owner, approval, start, expiry, monitoring, user/public disclosure, and rollback trigger.

Open-ended exceptions are invalid. Expired exceptions automatically return the affected capability to `BLOCKED` or require a new review.

## 11. Deployment gate

A high or critical-risk release must not be promoted until:

- required evidence and reviewers are present;
- release SHA and artifact are exact;
- conditions are implemented and tested;
- public disclosures are ready;
- monitoring and incident paths are active;
- rollback/disablement is proven;
- residual risk and expiry are approved;
- no critical unresolved legal, security, consent, deletion, accessibility, or truthfulness blocker remains.

## 12. Post-deployment monitoring

Monitor relevant signals without creating unnecessary surveillance. Possible signals include:

- incidents and complaints;
- incorrect/harmful outputs;
- user corrections and appeals;
- consent withdrawal/deletion/export failures;
- provider/model drift or outages;
- accessibility failures;
- unauthorized autonomous actions;
- account/share abuse;
- cost/resource anomalies;
- changed public claims or user populations.

Monitoring itself requires privacy, purpose, retention, and access controls.

## 13. Incident escalation

Link material incidents to the risk review. Define severity, containment, notification, user action, provider coordination, public-safe disclosure, legal review, corrective action, and reassessment.

Critical incidents may trigger immediate disablement under emergency governance rules.

## 14. Reassessment triggers

Reassess after:

- major model/provider/version change;
- new data category/source/destination;
- changed automation authority;
- new population, market, language, or region;
- new public claim;
- accessibility redesign or regression;
- incident or credible external concern;
- legal/policy change;
- exception expiry;
- scale increase;
- material evidence contradicting prior assumptions.

## 15. Public and confidential records

The public record should include scope, tier, material risks, mitigations, decision, exceptions, expiry, and safe evidence summary.

A confidential appendix may contain exploit details, private data, security architecture, contracts, or sensitive reporter/participant information. It must have controlled access, retention, and a public explanation of why details are withheld.

## 16. Appeals

Appeals may raise missed evidence, process failure, conflict, disproportionate impact, or materially changed facts. A reviewer who did not control the original decision should assess the appeal when feasible.

## Required scenario exercises

Before calling the framework operational, apply it as clearly labeled hypothetical exercises to:

1. hallucinated or merged memory in Replay;
2. emotional inference stated as fact;
3. third-party relationship exposure;
4. location/emotional-weather reuse beyond consent;
5. health-adjacent signal interpreted clinically;
6. critical-flow accessibility failure;
7. companion dependency/manipulation;
8. autonomous action without confirmation;
9. unexpected grief/legacy content;
10. minor/dependent user;
11. provider outage or silent substitution;
12. account compromise/unauthorized share;
13. deletion/export propagation failure;
14. AR/VR/XR physical, motion, or bystander event.

Hypothetical exercises are not completed product audits.

## Completion rule

A review is complete only when it has a stable ID, exact scope/version, evidence, scoring rationale, affected-population analysis, mitigations, owner roles, conflict handling, decision authority, residual-risk statement, expiry/reassessment, deployment/rollback gate, and public/confidential record handling.
