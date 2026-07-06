# Transparency Framework

Status: formation-draft
Registry ID: `URAI-TRN-001`

This framework defines formation-stage disclosure and accountability expectations. It does not prove that a system, provider, product, or organization satisfies them.

## Principles

Transparency should be:

- truthful and tied to inspectable evidence;
- understandable to affected users;
- specific about scope, version, and date;
- clear about what is unknown or unverified;
- safe for privacy and security;
- updated after material change;
- connected to correction, contestability, and recourse.

More disclosure is not always safer. Secrets, personal data, active abuse paths, confidential reports, and information that materially increases risk may be withheld, but the reason and review authority should be recorded.

## Required record set

A user-facing or high-impact AI system should maintain:

1. **System card** — purpose, intended users, capabilities, limitations, inappropriate uses, owner roles, and release identity.
2. **Model/provider register** — provider, model/version, role, region, data-use/training policy, retention, substitution policy, outage behavior, and exit plan.
3. **Data-flow disclosure** — data categories, sources, destinations, processing locations, retention, deletion/export propagation, and third parties.
4. **Consent and automation map** — user choices, defaults, withdrawal, sensitive-data gates, autonomous authority, confirmation, and rollback.
5. **Risk-review summary** — tier, material risks, mitigations, residual risks, approval, exceptions, expiry, and reassessment.
6. **Accessibility statement** — target, methods, evidence, known barriers, exceptions, remediation, and feedback path.
7. **Human-oversight and contestability notice** — where people review, correct, appeal, interrupt, or reverse outputs/actions.
8. **Known-limitation notice** — hallucinations, uncertainty, coverage gaps, inappropriate uses, and affected-user consequences.
9. **Release/change record** — source/deployed/rollback SHAs, provider/model changes, data changes, claim changes, and migration guidance.
10. **Incident and corrective-action record** — safe summary, affected scope, containment, user action, corrections, and next review.
11. **Funding/commercial influence/conflict disclosure** — sponsorship, donated services, provider credits, product ownership, and reviewer conflicts.
12. **Implementation report** — product evidence against a named standard version, with open gaps and exceptions.

## Documentation levels

| Level | Use when | Minimum evidence |
| --- | --- | --- |
| Basic | Low-risk documentation or internal tooling | README, owner role, purpose, data boundary, change history |
| Standard | User-facing AI functionality | System card, provider/data flow, consent, limitations, risk review, accessibility statement |
| Enhanced | Sensitive data, vulnerable users, memory/identity, relationship/location, autonomy, or public-interest impact | Independent or affected-community review where feasible, evaluation summary, incident/exception process, periodic reassessment |
| Critical | Irreversible/high-impact action, clinical/legal/financial decision, minor/dependent user, large-scale surveillance, or physical/spatial risk | Qualified external review, explicit approval authority, deployment gate, rollback/kill control, ongoing monitoring, public accountability plan |

A product owner must not self-select a lower level to avoid disclosure. Uncertainty should be resolved toward the more protective level until reviewed.

## User-facing AI disclosure

People should be told, at the point it matters:

- that AI materially generated, transformed, inferred, ranked, or acted;
- whether content is fact, user record, source-backed reconstruction, or inference;
- material uncertainty and limitations;
- whether a provider or cloud service receives data;
- whether an action is automatic or requires confirmation;
- how to correct, delete, export, appeal, interrupt, or contact a human path.

Generic footer language is not sufficient for a material high-impact interaction.

## Provider and model changes

A material provider or model substitution should disclose:

- old and new provider/model role;
- effective release/date;
- capability and limitation changes;
- privacy/data-use/retention differences;
- location/region changes;
- safety/evaluation changes;
- cost or availability impact;
- reassessment and rollback decision.

Silent substitution is not acceptable when it changes user risk or public claims.

## Data-flow disclosure

Human-readable and machine-readable records should identify:

- source and user relationship to the data;
- sensitive categories;
- purpose;
- collection and inference;
- local/on-device versus cloud processing;
- processors/subprocessors;
- sharing and publication;
- retention and backup expiry;
- correction, deletion, export, portability, and propagation;
- unresolved limitations.

## Accessibility transparency

Accessibility statements should identify target standards, methods, assistive technologies, viewports, user/community review, known barriers, critical-flow impact, workarounds, remediation ownership, and review date.

`Accessible`, `WCAG conformant`, or similar claims require evidence. A checklist or automated scan alone is not conformance.

## Incident transparency

A material incident record should address:

1. What happened and when.
2. Systems/releases/providers involved.
3. Who or what data may be affected.
4. What is known, unknown, and inferred.
5. Immediate containment.
6. User actions and contact path.
7. Consent, deletion, export, accessibility, or autonomy impact.
8. Corrective and preventive actions.
9. Legal/regulatory review status where relevant.
10. Next update or closure criteria.

Sensitive details belong in a controlled appendix. A safe public summary should remain when possible.

## Change and deployment notices

Material notices should tie claims to exact source and deployed SHAs and disclose:

- changed user behavior;
- new provider/model/data source;
- changed automation authority;
- new public claim or user population;
- known risk/accessibility regression;
- migration or consent impact;
- rollback availability;
- unresolved exceptions.

## Funding, sponsorship, and commercial influence

Disclose material funding, sponsorship, provider credits, donated services, research support, and commercial ownership relevant to a standard, review, or publication.

Funding does not imply endorsement and must not purchase favorable findings, standards votes, certification language, or suppression of incidents/minority opinions.

## Evidence and citation

Material public claims should identify evidence grade, source/version/date, limitations, and whether the conclusion is direct evidence or inference. Private planning documents may support internal sequencing but do not prove implementation, legal status, public deployment, partnership, research outcome, or impact.

## Machine-readable roadmap

Future records should use stable IDs and JSON schemas for:

- standards registry;
- system cards;
- providers;
- data flows;
- risk reviews and exceptions;
- incidents;
- accessibility statements;
- implementation reports;
- releases and changes.

Schemas should be versioned, privacy-safe, and linked to human-readable records.

## Corrections and history

Material errors should be corrected visibly. Superseded disclosures should remain linked to replacements. Retractions/withdrawals should state reason and impact when safe.

## Minimum acceptance gate

A transparency record is complete only when it:

- names system/version/release and owner role;
- separates verified, inferred, unknown, and planned information;
- covers required disclosures for its risk level;
- exposes material gaps and exceptions;
- has correction and concern paths;
- protects private/security-sensitive information;
- records review date and reassessment trigger;
- avoids unsupported approval, certification, partnership, research, legal-status, or impact claims.
