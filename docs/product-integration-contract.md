# URAI Foundation Product Integration Contract

Status: formation-draft
Registry ID: `URAI-INT-001`
Version: `2026.07-draft`

## Purpose

This contract defines the evidence that URAI ecosystem products should publish or retain when claiming alignment with Foundation standards. It does not make the Foundation a commercial application repository, product operator, certification authority, regulator, or guarantor.

No product is “Foundation certified,” “approved,” or “compliant” merely because it links to this repository.

## Required integration package

Every user-facing or high-impact URAI product should maintain a versioned package containing:

1. **System card** — purpose, intended users, owners, capabilities, limitations, inappropriate uses, and release SHA.
2. **Provider register** — models, APIs, hosting, analytics, media-generation, and other material third parties.
3. **Data-flow record** — data categories, sources, destinations, processing locations, retention, deletion, export, and propagation.
4. **Consent map** — user choices, legal/operational basis, withdrawal, defaults, and sensitive-data gates.
5. **Risk review** — risk tier, evidence, mitigations, residual risk, approval, expiry, and reassessment triggers.
6. **Accessibility record** — target, tests, known gaps, exceptions, remediation owner, and affected-user review.
7. **Automation boundary** — what the system may do automatically, what requires confirmation, and how actions are reversed.
8. **Transparency notice** — AI involvement, limitations, human review, contestability, contact paths, and material changes.
9. **Incident and exception log** — material incidents, temporary deviations, owners, expiry, and corrective action.
10. **Release evidence** — source SHA, build/test results, deployed SHA, rollback SHA, environment, and public route proof.

## Evidence states

Use only these states:

- `NOT ASSESSED`
- `SELF-ATTESTED`
- `REVIEW PENDING`
- `REVIEWED WITH OPEN GAPS`
- `TIME-LIMITED EXCEPTION`
- `BLOCKED`
- `SUPERSEDED`

Do not use `CERTIFIED`, `APPROVED`, or `COMPLIANT` until a separately governed and legally reviewed assurance program exists.

## Product-specific requirements

| Product/system | Minimum additional evidence |
| --- | --- |
| URAI Spatial | Spatial/XR safety, bystander privacy, camera/microphone/location use, motion sensitivity, physical-environment assumptions, fallback mode, and device capability matrix. |
| URAI Studio | Administrative authority, configuration provenance, environment separation, provider controls, secret handling, audit log, and release approvals. |
| URAI Privacy | Consent schema, purpose limitation, retention, deletion/export propagation, policy versioning, data-subject request evidence, and fail-closed behavior. |
| URAI Analytics | Event catalog, metric definitions, aggregation/privacy thresholds, consent enforcement, retention, deletion, re-identification risk, and dashboard limitation notices. |
| URAI Jobs | Agent authority, authentication, idempotency, approval gates, retries, dead-letter handling, provider cost controls, and action receipts. |
| Asset Factory | Generation provider, prompt/source provenance, rights/license status, cost cap, moderation, output checksum, quality gate, and promotion receipt. |
| URAI Marketing | Claim substantiation, source citations, consent for testimonials/media, tracking disclosure, accessibility, localization review, and legal approval for regulated claims. |
| URAI Content | Canonical schemas, creator/rights records, publication status, moderation, provenance, export jobs, retention, and marketplace/public-access boundaries. |
| Storytime | Audience and minor-safety controls, public-share authorization, media provenance, deletion, moderation, and emotional/sensitive-content controls. |
| URAI Investors | Access control, confidentiality, claim/evidence register, financial disclaimer, versioned materials, data-room audit trail, and revocation. |
| B2B systems | Organization/tenant boundaries, roles, invitation lifecycle, contract/consent records, partner due diligence, data isolation, and service-level limitations. |
| Mobile applications | App-store disclosures, permissions, background processing, offline/on-device behavior, accessibility, deletion/export, crash/telemetry privacy, and release identity. |
| AR/VR/XR products | Physical safety, motion/cognitive load, device permissions, environmental mapping, bystander/third-party data, emergency exit, and non-immersive alternative. |
| Autonomous agents | Scoped authority, confirmation thresholds, prohibited actions, tool/provider permissions, budget limits, logging, rollback, user interruption, and incident kill switch. |
| AI provider integrations | Provider terms, model/version, region, data use/training policy, retention, outage behavior, substitution policy, safety filters, cost limits, and exit plan. |

## Change control

A product must reassess its package when any of these change materially:

- model or provider;
- data category or source;
- user population;
- autonomy or tool authority;
- public claim;
- retention/deletion behavior;
- accessibility behavior;
- environment or hosting;
- security boundary;
- major user flow;
- legal or policy requirement;
- incident or credible external concern.

## Exceptions

A time-limited exception must include:

- requirement being waived;
- reason and evidence;
- scope and affected users;
- risk and mitigation;
- owner;
- start and expiry date;
- monitoring;
- rollback or disablement trigger;
- approval role;
- public summary or reason for confidentiality.

Open-ended exceptions are not valid.

## Incident reporting contract

Products should notify the Foundation standards process of material incidents involving:

- unauthorized access or sharing;
- consent failure;
- deletion/export failure;
- hallucinated or altered memory presented as fact;
- harmful identity or relationship inference;
- vulnerable-user harm;
- accessibility barrier in a critical flow;
- autonomous action outside authorization;
- provider data-use or model-substitution surprise;
- spatial/physical safety event;
- misleading public claims;
- loss of release or audit integrity.

The Foundation record should contain a safe public summary when disclosure does not increase harm. Sensitive technical details belong in a controlled appendix.

## Standards-change response

When a Foundation standard changes, each product owner should:

1. identify affected controls;
2. record applicability;
3. open an implementation or exception record;
4. assign an owner and target review point;
5. update public disclosures when material;
6. link the change to an exact product release;
7. preserve the prior record for auditability.

## Minimum acceptance criteria

A product may claim **self-attested alignment** only when:

- the integration package exists and names an exact release;
- required fields are complete;
- open gaps and exceptions are visible;
- no certification or independent-review claim is made;
- evidence can be inspected by an authorized reviewer;
- the product has a path for user concerns and correction;
- the package is reassessed after material change.

Independent assessment is a future capability and requires separate governance, assessor independence, methods, appeals, funding disclosure, and legal review.
