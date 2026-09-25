# URAI Accessibility Standards Authority

Status: current standards authority candidate  
Date: 2026-09-25  
Owner: URAI Foundation standards/governance layer  
Implementation evidence owners: each product repository, with `urai-spatial` owning the canonical consumer spatial evidence program

## Purpose

This record separates the URAI engineering accessibility target from jurisdiction-specific legal requirements and from any claim of conformance or certification.

It is not legal advice and it does not declare that URAI, any URAI product, or any customer deployment complies with a law or accessibility standard.

## Authority hierarchy

1. Product repositories own implementation and exact-head evidence.
2. URAI Foundation owns the cross-ecosystem public standards framework and accessibility transparency requirements.
3. Legal applicability is determined for the actual entity, service, jurisdiction, user population, and deployment arrangement.
4. No checklist, automated scan, source review, design document, or isolated passing test is by itself a conformance certification.

## Current engineering target

URAI's current web accessibility engineering target is **WCAG 2.2 Level AA** for applicable web and web-based product surfaces, while retaining product-specific cognitive, sensory, motor, speech, motion, spatial/XR, and low-stimulation requirements that may go beyond WCAG.

W3C published WCAG 2.2 as a Recommendation and advises use of WCAG 2.2 when developing or updating accessibility policies. WCAG 2.2 extends WCAG 2.1; content conforming to WCAG 2.2 also conforms to WCAG 2.1.

Official source:
- W3C, Web Content Accessibility Guidelines (WCAG) 2.2: https://www.w3.org/TR/WCAG22/

The engineering target is not a legal conclusion. A jurisdiction or contract may name a different version or additional requirements.

## United States public-sector deployments — ADA Title II

The U.S. Department of Justice Title II web/mobile rule applies to state and local government entities and uses **WCAG 2.1 Level AA** as its technical standard for covered web content and mobile apps.

This becomes directly relevant when URAI provides or operates covered web content or a mobile app for a state/local government under an arrangement where the public entity provides or makes that surface available. Private URAI products must not be labeled Title II-covered merely because this rule exists.

The Department's April 2026 Interim Final Rule extended the compliance dates to:
- April 26, 2027 for state/local government entities with populations of 50,000 or more;
- April 26, 2028 for entities below 50,000 and special district governments.

Official source:
- U.S. Department of Justice, ADA.gov Title II web/mobile rule fact sheet: https://www.ada.gov/resources/2024-03-08-web-rule/

URAI's WCAG 2.2 AA engineering target is intended to be at least as current as the WCAG family used for the Title II technical baseline, but legal applicability and equivalent-facilitation analysis remain deployment-specific.

## European Union — European Accessibility Act

Directive (EU) 2019/882, commonly referred to as the European Accessibility Act, has applied to covered products and services from **28 June 2025**.

Potentially relevant covered categories include certain consumer-facing services such as e-commerce and electronic communications. Applicability depends on the actual product/service, provider role, market, user relationship, and any applicable exemption or transition rule.

URAI must not assume that every digital surface is covered or exempt. Before launching a covered service into an EU market, retain a jurisdiction/service applicability review.

Where an operator relies on a fundamental-alteration or disproportionate-burden basis, the Directive requires an assessment and associated documentation; this must not be treated as a casual product exception.

Official sources:
- EUR-Lex summary of Directive (EU) 2019/882: https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=legissum:4403933
- Directive (EU) 2019/882: https://eur-lex.europa.eu/eli/dir/2019/882/oj

## Standards-versus-law rule

The following labels must remain distinct:

| Classification | Meaning |
| --- | --- |
| Engineering target | URAI's chosen build/test objective, currently WCAG 2.2 AA for applicable web surfaces plus URAI-specific accessibility requirements. |
| Technical standard named by law | A standard incorporated into a specific legal rule, such as WCAG 2.1 AA under the DOJ Title II web/mobile rule. |
| Legal applicability | Whether a particular law applies to a particular URAI entity, customer, service, jurisdiction, contract, or deployment. |
| Conformance | Evidence that a defined scope satisfies the named technical standard under an appropriate evaluation method. |
| Certification / legal compliance | A stronger claim that requires an appropriate evidentiary and, where necessary, qualified external-review basis. |

Do not convert one classification into another.

## Required URAI evidence packet

A product or release claiming an accessibility state must identify:

- repository and exact source SHA;
- deployed version/SHA where applicable;
- named standard and version;
- Level A/AA/AAA scope where relevant;
- routes/features/user journeys evaluated;
- browser and device matrix;
- assistive technologies evaluated;
- keyboard-only results;
- screen-reader/semantic results;
- text resize/zoom/reflow results;
- contrast and non-color-only results;
- reduced-motion and animation results;
- captions/transcripts/audio-alternative results where media exists;
- form/error/authentication results;
- touch/target-size and alternative-input results;
- spatial/XR alternative or fallback results where relevant;
- automated scan results;
- manual test results;
- known barriers;
- workaround, remediation owner, and target;
- user/community review where performed;
- reviewer/date;
- legal applicability review where a law or public-sector contract is implicated.

## Minimum launch rule

For URAI-controlled launch web surfaces:

- build toward WCAG 2.2 AA rather than an unspecified "WCAG-aligned" target;
- do not regress below any stricter contractually or legally applicable baseline;
- preserve conventional accessible equivalents for spatial or unconventional interactions;
- do not require audio, color, precise pointer action, camera motion, WebGL, or one input modality when a reasonable alternative is required;
- maintain visible focus, keyboard paths, reduced motion, text scaling/reflow, semantic structure, status/error announcements, and accessible authentication;
- document exceptions and blockers rather than hiding them.

## Institutional / customer deployment gate

Before an institutional launch, pilot, or customer deployment, classify the counterparty and deployment:

- private commercial entity;
- nonprofit;
- education institution;
- state/local government entity;
- federal entity;
- EU-covered provider/service;
- other regulated/public service.

Then identify the actual standard or legal rule applicable to that deployment. The general URAI target does not replace this analysis.

## Public claims

Allowed with evidence:
- "Targets WCAG 2.2 AA."
- "Accessibility testing completed for the listed release and scope."
- "Known barriers are documented."

Not allowed without sufficient evidence:
- "WCAG 2.2 AA conformant."
- "ADA compliant."
- "European Accessibility Act compliant."
- "Fully accessible."
- "Certified accessible."

## Relationship to existing URAI authority

- `docs/foundation/URAI_ACCESSIBILITY_CHECKLIST.md` is the human-centered implementation checklist.
- `docs/transparency-framework.md` defines evidence and public-disclosure expectations.
- Product repositories own implementation, automated/manual tests, and exact-head release receipts.
- `urai-spatial` owns the most mature canonical consumer accessibility/performance evidence program and must not be used as proof for unrelated repositories.
- Each standalone system must produce its own evidence for its own UI, UX, devices, workflows, and runtime.

## Review triggers

Review this authority when:
- W3C publishes a materially newer Recommendation;
- a relevant U.S., EU, state, or other jurisdictional rule changes;
- URAI enters a new regulated market or public-sector deployment;
- a platform/app-store accessibility requirement changes;
- a material new device class, XR surface, voice-only surface, or autonomous interaction launches.

Last reviewed: 2026-09-25.
