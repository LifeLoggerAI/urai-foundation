# URAI Foundation v1 Evidence Audit and Capability Roadmap

Date: 2026-07-06
Audited repository: `LifeLoggerAI/urai-foundation`
Audited branch: `main`
Audited head at start: `a8fb209f02d81ad59e7ab9cac90ad503a0dcc0ea`
Audit status: formation-stage, evidence-based, not legal advice

## Executive verdict

URAI Foundation is a real public documentation and standards project with a functioning static-site source, conservative formation-era public copy, baseline governance materials, route validation, and CI configuration. It is not yet a mature standards institution, independent assessment body, research program, certification authority, public-benefit service, grant maker, or legally verified nonprofit.

The source repository is substantially stronger than a placeholder, but production truth is split between:

1. repository-native GitHub Pages configuration and runbooks;
2. a separately reported Firebase Hosting fallback under `urai-4dc1d` / `urai-foundation`; and
3. historical documentation that says the custom domain still routes to an older host.

Until one hosting path is selected, reproduced from source, tied to an exact SHA, and verified on the custom domain, the correct status is **IMPLEMENTED, NOT VERIFIED** rather than launched.

## Evidence hierarchy

Use evidence in this order:

1. Current repository source at an exact commit SHA.
2. Passing required checks attached to that SHA.
3. Deployment record that names provider, site/project, deployed SHA, timestamp, and operator.
4. Live custom-domain DNS, TLS, route, content-marker, and metadata proof.
5. Public release record and rollback SHA.
6. Authorized legal, tax, partnership, research, or accessibility evidence.
7. Planning documents and private packets, clearly labeled as planning rather than proof.

A statement in an issue, Drive document, screenshot, or prior audit is not enough by itself to prove current production or legal status.

## Canonical source truth

| Item | Finding | Status |
| --- | --- | --- |
| Repository | `LifeLoggerAI/urai-foundation` | VERIFIED COMPLETE |
| Default branch | `main` | VERIFIED COMPLETE |
| Audit-start head | `a8fb209f02d81ad59e7ab9cac90ad503a0dcc0ea` | VERIFIED COMPLETE |
| Repository role | Documentation-first public-interest standards repository with static website | VERIFIED COMPLETE |
| Required route source | Homepage plus nine route directories | VERIFIED COMPLETE |
| Current deployed SHA | No reproducible record found in repository | MISSING |
| Latest passing main SHA | No current check status attached to audit-start head | MISSING |
| Rollback SHA | Not recorded for the current public deployment | MISSING |
| Custom domain | `uraifoundation.org` in `CNAME` and metadata | IMPLEMENTED, NOT VERIFIED |
| GitHub Pages | Workflow and runbooks exist | IMPLEMENTED, NOT VERIFIED |
| Firebase Hosting | Issue #10 reports fallback site/project/site ID; config is absent from this repo | IMPLEMENTED, NOT VERIFIED |
| DNS destination | Historical files conflict with the Firebase fallback report; current DNS not proven in repo | BLOCKED |
| HTTPS/custom-domain routes | No exact-current receipt tied to the audit-start head | BLOCKED |

## Current maturity

### Overall

**Formation Launch Baseline: partial.**

The project is credible as an early public standards surface. It is not yet credible as an independent standards institution because authority, review membership, voting, recusals, appeals, public comment, research protections, conformance, incident operations, and external participation are not operationally established.

### Capability assessment

| Capability | Maturity | Evidence summary |
| --- | --- | --- |
| Static public website | 2 / 5 | Source routes and responsive CSS exist; live custom domain and exact deployed SHA are not proven. |
| Governance | 1 / 5 | Charter states principles but lacks an operational body, quorum, voting, recusal, appeal, and appointment rules. |
| Ethical AI standards | 2 / 5 | Strong baseline principles and claims policy; many high-risk URAI-specific domains need normative controls. |
| Transparency | 1 / 5 | Disclosure categories exist; no live system-card registry, provider register, incident register, or implementation reports. |
| Risk review | 1 / 5 | Process and template exist; no scoring rubric, review registry, approval authority, or completed product reviews. |
| Accessibility | 1 / 5 | Site has useful baseline techniques and a checklist; no conformance report or disabled-community review. |
| Research | 0 / 5 | Intent page and planning materials exist; no research governance, studies, ethics review, archive, or publication system. |
| Community participation | 1 / 5 | Public GitHub issue paths exist; no moderated public-comment process, working groups, appeals, or meeting records. |
| Security/privacy operations | 1 / 5 | Public warning and policy exist; no verified private reporting channel, response SLA, or incident handling record. |
| Open standards platform | 0 / 5 | Date versioning exists; no numbered registry, normative language rules, schemas, conformance tests, or adoption records. |
| Legal/organizational readiness | 0 / 5 | Formation language is cautious; authoritative formation, tax, board, insurance, finance, and authority evidence is absent. |
| Internationalization | 0 / 5 | English-only source; no translation governance, locale structure, hreflang, RTL proof, or controlling-language policy. |
| Ecosystem integration | 1 / 5 | A high-level integration document exists; product repositories are not required by executable gates to publish evidence. |

## What is genuinely complete

- Public repository, default branch, static-site source, route files, sitemap, robots file, manifest, favicon, and custom-domain file.
- Conservative formation-era disclaimers on the public homepage and required route pages.
- No backend forms, accounts, donations, grants, payments, CRM, or analytics code in this repository.
- Baseline Governance Charter, Ethical AI Principles, Transparency Framework, Risk Review Process, decision template, and risk-review template.
- Static internal-link, anchor, UTF-8, whitespace, and route-presence validation.
- Responsive layout, skip links, visible focus treatment, and reduced-motion CSS.
- Public issue templates and contribution materials.

## What is partial

- Deployment automation: configured, but conflicting with the reported Firebase fallback and not tied to current proof.
- Accessibility: useful implementation techniques and checklist, but no WCAG conformance assessment or community review.
- Governance: principles without a constituted decision-making body or enforceable operating rules.
- Ethical AI standards: broad principles without detailed controls for memory, identity, relationship, location, biometric, grief, minors, autonomous agents, or spatial systems.
- Transparency: disclosure expectations without a populated public registry.
- Risk review: workflow description without a complete scoring, authority, expiration, exception, and audit-trail system.
- Product integration: advisory language without repository gates, schemas, or adoption evidence.

## What is missing or risky

- Exact deployed SHA, deployment timestamp, deployment authority, and rollback SHA.
- A single canonical hosting decision.
- Current DNS/TLS/custom-domain proof.
- Branch protection and required-check evidence.
- Release tags or signed/versioned standards releases.
- Verified private vulnerability and sensitive-safety reporting channel.
- License for standards, code, website content, and contributions.
- Conflict-of-interest policy and disclosure register.
- Appointment, vacancy, removal, quorum, voting, recusal, minority-opinion, appeal, and emergency-authority rules.
- Public-comment periods and disposition records.
- Standards registry, conformance language, implementation reports, and deprecation policy.
- Research publication, citation, corrections, retractions, human-subject, consent, and ethics-review policies.
- Machine-readable system cards, provider disclosures, data-flow disclosures, and incident records.
- Independent accessibility review, testing evidence, and remediation process.
- Translation governance and authoritative-language rules.
- Legal formation, tax, board, insurance, financial-control, donation, grant, and fundraising evidence.

## Route audit

| Route | Source state | Content state | Accessibility/metadata state | Launch status |
| --- | --- | --- | --- | --- |
| `/` | Present | Clear formation boundary and route map | Strongest metadata; social image is only the SVG favicon | IMPLEMENTED, NOT VERIFIED |
| `/accessibility/` | Present | High-level inclusive-design commitments | No page-specific Open Graph/Twitter/manifest metadata; no conformance report | PARTIAL |
| `/deaf-community/` | Present | Respectful non-representation boundary | No evidence of Deaf-community review, captions/transcript standard, or sign-language governance | PARTIAL |
| `/emotional-wellness/` | Present | Appropriate non-clinical boundary | No crisis-boundary policy, vulnerable-user test evidence, or external review | PARTIAL |
| `/responsible-ai/` | Present | Links core standards | Too high-level for an operational standards portal | PARTIAL |
| `/research/` | Present | Truthful intent-only language | No agenda, publication archive, ethics process, citations, corrections, or metadata | DOCUMENTED ONLY |
| `/partners/` | Present | Correctly avoids partner claims | No due-diligence framework, sponsorship policy, conflict disclosures, or verified intake | DOCUMENTED ONLY |
| `/contact/` | Present | Mailto and public issues only | Email delivery is unverified; private sensitive-report path is absent | PARTIAL |
| `/privacy/` | Present | Accurate for repository code | Hosting-provider logging and retention are not specifically documented; requires review after host decision | PARTIAL |
| `/terms/` | Present | Conservative informational boundary | Requires qualified legal review before being treated as operative terms | REQUIRES LEGAL REVIEW |

### Cross-route findings

- Subpages need consistent `aria-label` values for primary and footer navigation.
- Subpages need consistent Open Graph, Twitter, theme, manifest, and canonical metadata.
- The site needs a real social-preview image with text-safe crops instead of using the SVG favicon as the only Open Graph image.
- Raw Markdown standards are linked as website documents. A future publication build should render accessible HTML with version, status, effective date, owners, and change history.
- Navigation is horizontally scrollable on smaller screens; this should be keyboard and screen-reader tested rather than assumed acceptable.
- A light color-scheme meta declaration conflicts with a CSS system that currently declares a dark scheme only.
- No automated axe/HTML validator/Lighthouse/visual-regression evidence is attached to current head.

## Governance audit

The current charter is a useful statement of intent, not a complete governance system.

Missing or weak controls:

- legal or delegated authority;
- steward appointment and removal;
- role vacancies and term limits;
- quorum and voting thresholds;
- subject-matter reviewer qualification;
- conflict disclosures and recusals;
- commercial influence firewall;
- public-comment minimums;
- proposal disposition and response duties;
- appeals and reconsideration;
- minority opinions;
- emergency authority limits and retrospective review;
- document retention;
- standards amendment and deprecation;
- independent review requirements;
- transition from formation-stage governance to a future legal entity.

No officeholder, board member, advisor, reviewer, or representative should be published as active without explicit permission and authoritative evidence.

## Ethical AI standards audit

The baseline principles cover autonomy, benefit, transparency, privacy, fairness, safety, accountability, contestability, environment, and continuous review. Required v1 expansion areas are:

- memory provenance and hallucinated-memory controls;
- identity inference and permanent-label prohibitions;
- relationship and third-party data;
- grief, legacy, and posthumous data;
- minors, dependents, and guardianship;
- location and emotional-weather mapping;
- biometric, voice, image, and body-signal data;
- health-adjacent signals and clinical boundaries;
- emotional persuasion, anthropomorphism, dependency, and dark patterns;
- agentic action, autonomous workflows, and human authorization;
- multi-model councils and disagreement disclosure;
- provider substitution, outages, and data transfer;
- on-device versus cloud processing;
- synthetic media and identity;
- AR, VR, XR, spatial safety, bystander privacy, and physical-world risks;
- deletion, export, portability, propagation, and backup expiry;
- incident reporting and user recourse.

## Transparency audit

A credible v1 transparency system needs public, versioned records for:

- system cards;
- model and provider register;
- data-flow and processing-location disclosures;
- training/evaluation data statements where applicable;
- known limitations and inappropriate uses;
- human oversight and automation boundaries;
- accessibility statements;
- privacy summaries;
- material changes and deployment notices;
- incidents and corrective actions;
- third-party dependencies;
- commercial influence, research funding, and conflicts;
- standards history and evidence grades.

No populated registry exists yet, so Foundation transparency is currently a framework rather than an operating accountability system.

## Risk-review audit

A complete review system must add:

- intake identifier and registry;
- risk taxonomy;
- severity and likelihood rubric;
- affected-population and vulnerable-user analysis;
- reversibility and detectability;
- mitigation owner and due date;
- approval authority by risk tier;
- deployment gate;
- exception and residual-risk acceptance;
- expiration and reassessment date;
- confidential appendix rules;
- incident linkage;
- public summary rules;
- evidence attachments;
- appeal and re-review.

### Required scenario tests

The framework should be exercised against hypothetical cases, clearly labeled as test cases rather than completed product audits:

1. Hallucinated or incorrectly merged memory in Replay.
2. Emotional pattern inference presented with false certainty.
3. Relationship mapping that exposes third-party information.
4. Location/emotional-weather data used beyond consented purpose.
5. Health-adjacent signals interpreted as diagnosis.
6. Accessibility mode that fails during a critical flow.
7. Companion behavior that encourages dependency.
8. Autonomous life-assistance action taken without confirmation.
9. Grief or legacy content shown unexpectedly.
10. Minor or dependent-user access.
11. Provider outage or unannounced model substitution.
12. Account compromise, unauthorized share, or deletion propagation failure.
13. Spatial/XR motion, bystander, or physical-safety incident.

## Accessibility and disability-inclusion audit

Verified source techniques:

- skip links;
- focus-visible styles;
- semantic headings and landmarks on core pages;
- reduced-motion CSS;
- responsive layout;
- no audio/video dependency in the current static site.

Not verified:

- WCAG 2.2 AA conformance;
- keyboard-only route-by-route completion;
- screen-reader output and landmarks;
- zoom/reflow at 200% and 400%;
- contrast measurements;
- high-contrast/forced-colors mode;
- cognitive usability;
- Deaf or hard-of-hearing community review;
- sign-language planning;
- blind/low-vision spatial standards;
- switch, voice, and motor-access testing;
- TBI, PTSD-sensitive, dementia, and memory-impairment review;
- multilingual accessibility;
- public remediation process and response targets.

The correct claim is that accessibility is an explicit formation-stage commitment, not that conformance has been achieved.

## Research audit

The Drive inventory contains product concepts, source inventories, funding opportunities, and advisor materials. Those are planning inputs, not evidence of active studies, approved protocols, participants, peer review, academic partnerships, or research outcomes.

Required research-platform components:

- research agenda and questions;
- evidence grading and citation policy;
- publication and preprint rules;
- peer/external/community review;
- correction, withdrawal, and retraction;
- replication expectations;
- data and code availability statements;
- privacy-preserving research methods;
- participant consent and withdrawal;
- human-subject protection and qualified ethics review;
- disability-community participation;
- funding and conflict disclosures;
- archive, identifiers, and machine-readable metadata.

Human-subject or clinical-adjacent work must remain disabled until qualified legal, ethical, clinical, and institutional review exists.

## Security and privacy audit

Strengths:

- The repository warns against posting secrets or sensitive details publicly.
- The static site has no account, form, analytics, payment, or database code.
- Public pages state those boundaries.

P0/P1 gaps:

- no verified private reporting address or GitHub private vulnerability-reporting evidence;
- no acknowledgement or remediation targets;
- no triage severity rubric;
- no incident coordination roles;
- no security advisory/release process;
- no branch-protection or required-review proof;
- no dependency review, secret scanning, CodeQL, signed tag, or release-integrity evidence;
- no DNS ownership, registrar lock, MFA, recovery, or DNSSEC evidence;
- no host-specific logging/retention statement;
- no verified mailbox ownership for public contact.

## Legal and organizational readiness

All items below require qualified legal or tax review:

- formation and jurisdiction;
- nonprofit/tax-exempt strategy;
- charitable purpose;
- bylaws and board/steward authority;
- conflict-of-interest policy;
- IP assignment and license from URAI IP Holdings LLC;
- trademark usage;
- standards copyright and open license;
- contributor license or developer certificate of origin;
- privacy and terms obligations;
- research participant protections;
- donations, grants, fundraising statements, and fiscal sponsorship;
- insurance;
- record retention;
- financial controls;
- annual reporting and registrations.

No donation, grant, tax, charity, certification, or institutional claim should be activated from planning documents alone.

## Community and partner readiness

Safe now:

- public documentation issues;
- policy proposals that contain no private information;
- public pull-request review;
- transparent change records.

Requires additional infrastructure or policy:

- sensitive complaints and safety reports;
- moderated discussions;
- public-comment periods and dispositions;
- appeals;
- reviewer onboarding;
- working groups;
- public meetings and minutes;
- mailing lists/newsletters;
- institutional partner due diligence;
- sponsorship and funding disclosure;
- community compensation and non-extractive participation.

No active partner should be listed without permission, scope, date, conflict review, and a precise statement of the relationship.

## International and multilingual readiness

Current state: English-only static source.

Required before authoritative translation:

- locale architecture;
- language selector and persistence rules;
- professional/community translation review;
- cultural and disability-access review;
- right-to-left layout tests;
- hreflang and multilingual sitemap;
- translated-document version linkage;
- controlling-language clause;
- regional privacy/legal review;
- process for correcting translated standards.

Machine-generated legal, policy, or standards translations must not be presented as authoritative without review.

## Technical and automation audit

| Area | Finding | Status |
| --- | --- | --- |
| `make check` | Defined as unit tests, docs validation, and route validation | IMPLEMENTED, NOT VERIFIED at audit-start head |
| Internal links/anchors | Checked by standard-library validator | VERIFIED IN SOURCE |
| Required routes/sitemap | Checked by route validator | VERIFIED IN SOURCE |
| External links | Not remotely checked | MISSING |
| HTML semantics | Not validated by an HTML parser/validator | MISSING |
| Automated accessibility | No axe/pa11y/Lighthouse gate | MISSING |
| Visual regression | None | MISSING |
| Current workflow proof | No status attached to audit-start head | MISSING |
| Pages deployment | Workflow exists and uploads repository root | PARTIAL / RISKY |
| Firebase deployment | Reported externally, not reproducible from this repo | PARTIAL |
| Deployment verification | Hard-coded to GitHub Pages IPs | PARTIAL / CONFLICTING |
| Release evidence | Prior proof directories exist; current deployed/rollback SHA absent | PARTIAL |
| Tags/releases | No operating standards-release process proven | MISSING |

## Comprehensive gap matrix

| Priority | System/area | Current state | Intended state | Missing work | Risk / legal sensitivity | Dependency | Relative effort | Recommended owner/role | Acceptance criteria | Verification | Execution status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| P0 | Production truth | GitHub Pages source and Firebase fallback claim conflict | One reproducible canonical host | Hosting ADR, exact deployed SHA, rollback SHA | Launch/truthfulness | Owner + DNS access | M | Release manager | One host named; other marked fallback/deprecated | Deployment receipt + live marker | In progress in audit branch |
| P0 | Custom domain | `CNAME` exists; live destination unproven | DNS/TLS/routes tied to exact SHA | DNS records, TLS, `www`, smoke proof | Domain/security | Registrar access | S | Domain owner | All required routes pass; host marker matches | DNS + TLS + HTTP receipt | REQUIRES USER ACTION |
| P0 | Public artifact | Pages uploads repository root | Curated public artifact only | Build allowlist and artifact manifest | Privacy/operational leakage | CI change | S | Web maintainer | Internal/operational files absent from artifact | Artifact inspection | In progress in audit branch |
| P0 | Security reporting | No verified private channel | Private, monitored, published channel | Address or GitHub private reporting; response rules | Security/privacy | Mail/GitHub admin | S | Security contact | Test report acknowledged privately | Controlled test | REQUIRES USER ACTION |
| P0 | Legal claims | Formation wording mostly safe | Evidence-gated claim register | Legal evidence map and approval rules | High legal sensitivity | Counsel | M | Legal reviewer | No unsupported status/program claims | Counsel review + content scan | PARTIAL |
| P0 | Current CI proof | Head has no attached status | Required checks on every protected change | PR checks, required status, branch protection | Release integrity | GitHub settings | S | Repo admin | Head/PR green; direct bypass controlled | GitHub settings + checks | In progress / user setting required |
| P1 | Governance authority | Principle-only charter | Formation-stage operating rules | Roles, quorum, voting, recusal, appeals, emergency limits | Organizational/legal | Steward review | M | Governance steward | Approved charter and vacancy register | Decision record | MISSING |
| P1 | Conflict of interest | One sentence | Policy + disclosure register | Definitions, annual/event disclosure, recusal | Legal/reputation | Governance body | S | Governance secretary | Public policy and reviewed disclosures | Register audit | MISSING |
| P1 | Standards lifecycle | Date versioning only | Numbered registry and proposal lifecycle | IDs, statuses, review periods, adoption/deprecation | Standards credibility | Governance | M | Standards editor | Registry validates; changes traceable | Registry validation | In progress in audit branch |
| P1 | Product integration | Advisory integration text | Required evidence contract per product | System card, risk review, provider/data flow, exception/incident hooks | Ecosystem safety | Product owners | L | Product governance lead | Each product publishes required records | Cross-repo audit | In progress in audit branch |
| P1 | Site metadata | Homepage strongest; subpages inconsistent | Complete route metadata and social preview | OG/Twitter/manifest/theme/social image | Credibility/discovery | Design asset | S | Web maintainer | Metadata test passes on all routes | Automated test + share preview | MISSING |
| P1 | Accessibility verification | Techniques/checklist only | WCAG 2.2 AA target with exceptions | Automated + manual + disabled-user review | Disability inclusion | External reviewers | L | Accessibility lead | Conformance report with known gaps | WCAG audit | REQUIRES EXTERNAL EXPERT |
| P1 | Sensitive content policy | Claims policy exists | Operational vulnerable-user controls | Crisis boundary, grief, minors, dependency, autoplay, exits | Safety/legal | Product evidence | M | Safety reviewer | Scenario tests and product gates | Risk-review records | PARTIAL |
| P1 | License | No clear root license | Explicit licenses by artifact type | Standards/content/code/contribution licensing | IP/legal | URAI IP Holdings LLC + counsel | S | IP counsel | LICENSE and contributor terms approved | Legal review | REQUIRES LEGAL REVIEW |
| P1 | Release integrity | No current deployed/rollback SHA | Release record per deployment | Release template, tag policy, checksums | Operational | Hosting decision | M | Release manager | Reproducible release and rollback | Restore drill | MISSING |
| P2 | Transparency registry | Framework only | Populated public accountability records | System cards, provider/data flow/incident/change registers | Public trust | Product owners | L | Transparency editor | Records exist and are current | Quarterly audit | DOCUMENTED ONLY |
| P2 | Risk review | Basic process | Scored, tiered, expiring, auditable reviews | Taxonomy, scoring, residual risk, registry | Safety | Governance authority | L | Risk chair | Sample cases pass; approvals named | Review audit | PARTIAL |
| P2 | Research policy | Intent page only | Credible publication/review system | Agenda, citations, corrections, retractions, ethics | Research/legal | Qualified experts | L | Research editor | Policy approved; no false study claims | External review | In progress in audit branch |
| P2 | Public participation | Issues only | Public comment and disposition | Comment windows, summaries, appeals, moderation | Community trust | Moderators | M | Community steward | Proposal completes full cycle | Process audit | MISSING |
| P2 | Partner due diligence | Boundary page only | Evaluation and disclosure model | Criteria, conflicts, sponsorship, permission | Legal/reputation | Counsel/governance | M | Partnerships reviewer | Every listing has evidence/scope/date | Annual review | MISSING |
| P2 | Contact operations | Mailto exists | Verified inbox and routing | Ownership, retention, response expectations | Privacy/operations | Mail admin | S | Operations contact | Delivery and escalation test | Test message | REQUIRES USER ACTION |
| P2 | External links | Not checked | Scheduled bounded link check | Retry/allowlist/reporting | Maintenance | CI | S | Web maintainer | Scheduled report; low false positives | Workflow artifact | MISSING |
| P2 | HTML/accessibility CI | None | Bounded automated checks | HTML validator + axe/pa11y on local server | Accessibility/maintenance | Tool selection | M | Web maintainer | PR fails on material violations | CI artifact | MISSING |
| P2 | Document publication | Raw Markdown served | Accessible versioned HTML standards | Renderer, status banners, TOC, print styles | Usability | Publication build | L | Standards publisher | Every public standard has HTML/PDF metadata | Route audit | MISSING |
| P3 | Research archive | None | Versioned publications and metadata | Archive, DOI option, datasets/code statements | Research | Policy + funding | L | Research editor | First externally reviewed publication | Archive audit | FUTURE |
| P3 | Working groups | None | Transparent scoped groups | Charters, membership, minutes, closure | Governance | Community capacity | M | Community steward | One pilot group completes charter | Public records | FUTURE |
| P3 | Multilingual | English only | Reviewed priority locales | Locale framework, translation memory, hreflang, RTL | Legal/accessibility | Translators/reviewers | XL | Localization lead | Reviewed translations linked to source version | Linguistic QA | FUTURE |
| P3 | Implementation reports | None | Product adoption records | Self-attestation plus evidence and exceptions | Standards credibility | Product teams | L | Assurance lead | First complete implementation report | Independent sample review | FUTURE |
| P4 | Institutional governance | Not legally verified | Formally authorized independent operations | Entity, bylaws, board/stewards, finance, insurance | High legal/tax | Counsel/funding | XL | Qualified counsel + governing body | Authoritative records and controls | Legal/accounting review | REQUIRES LEGAL REVIEW |
| P4 | Grants/donations | Planning documents only | Evidence-gated capability | Eligibility, fiscal sponsor/entity, controls, disclosures | High legal/tax | Institutional readiness | XL | Finance/legal | Written authority and audited process | Counsel/accountant | DISABLED |
| P4 | Independent assessment | None | Defensible assessment process | Assessor independence, methods, appeals, surveillance | Legal/reputation | Mature standards | XL | Assurance body | Pilot assessment with external review | Audit | FUTURE |
| P5 | Certification | No process | Only if defensible and funded | Accreditation model, marks, audits, enforcement | Very high legal/reputation | P4 maturity | XL | Independent body | Counsel-approved and independently governed | External accreditation | FUTURE / OPTIONAL |

## Capability roadmap

### 1. Foundation Launch Baseline

Deliverables:

- one canonical production architecture;
- curated public deployment artifact;
- exact deployed and rollback SHAs;
- custom-domain DNS/TLS/route proof;
- verified private security channel;
- consistent route metadata and social preview;
- expanded formation-stage governance controls;
- claims register and license decision;
- current green required checks and release record.

Prerequisites: owner hosting decision, DNS access, mail/security channel, legal review for license and claims.

Non-goals: donations, grants, certification, studies, official partners, clinical services.

Gate: no P0 truthfulness, domain, security, privacy, or legal-claim blocker remains.

### 2. Foundation Standards Platform

Deliverables:

- numbered draft standards registry;
- proposal, review, adoption, amendment, exception, and deprecation lifecycle;
- normative-language rules;
- machine-readable metadata;
- public-comment records;
- product integration contract;
- implementation-report template;
- versioned accessible HTML publication.

Prerequisites: governance authority and conflict policy.

Gate: one standard completes the full public lifecycle and one product publishes an evidence-backed implementation report.

### 3. Foundation Research and Community Platform

Deliverables:

- research agenda and publication policy;
- evidence grading, citations, corrections, retractions, and archive;
- community and disability-review process;
- reviewer and working-group onboarding;
- public meeting/minute rules;
- compensation/non-extraction principles;
- safe private intake where needed.

Prerequisites: qualified research, accessibility, ethics, privacy, and community experts.

Gate: first externally reviewed publication or standards evidence report with complete disclosures.

### 4. Foundation Accountability Infrastructure

Deliverables:

- public system cards and provider/data-flow registry;
- risk-review and exception registry;
- incident and corrective-action summaries;
- product implementation reports;
- accessibility conformance statements;
- standards adoption and change dashboard;
- periodic independent sample review.

Prerequisites: mature standards platform and product evidence contracts.

Gate: records are current, auditable, and linked to exact releases.

### 5. Foundation Institutional Readiness

Deliverables only after legal and operational verification:

- authorized governing body;
- bylaws/charter and conflict controls;
- IP/license agreements;
- financial controls, insurance, retention, and annual reporting;
- approved nonprofit/fiscal-sponsorship strategy;
- lawful donation/grant capability if authorized;
- institution and partner due diligence;
- independent oversight.

Gate: qualified legal, tax, accounting, insurance, and governance review.

### 6. Foundation Global Standards Network

Deliverables:

- multilingual registry and translation governance;
- regional accessibility and legal review;
- international contributors and community reviewers;
- external implementation reports;
- standards-body and public-interest collaboration;
- recognized adoption without unsupported endorsement claims.

Prerequisites: institutional readiness, funding, and sustained independent participation.

Gate: reviewed translations, regional reviewers, and independently evidenced external adoption.

## Immediate execution order

1. Merge a reviewed production-truth and publication-boundary patch.
2. Select GitHub Pages or Firebase Hosting as canonical and document the decision.
3. Run required checks on the exact release SHA.
4. Deploy only the curated public artifact.
5. Record deployed and rollback SHAs.
6. Cut over or verify DNS without disrupting unrelated email records.
7. Verify HTTPS, `www`, routes, metadata, and content marker.
8. Establish and test a private security-reporting channel.
9. Approve formation-stage governance and conflict rules.
10. Publish the draft standards registry and begin the first public proposal cycle.

## Completion labels

Use these labels in future audits and release records:

- VERIFIED COMPLETE
- IMPLEMENTED, NOT VERIFIED
- PARTIAL
- DOCUMENTED ONLY
- BLOCKED
- MISSING
- REQUIRES LEGAL REVIEW
- REQUIRES EXTERNAL EXPERT
- REQUIRES USER ACTION
- FUTURE / OPTIONAL

## Final launch decision

**NOT YET VERIFIED FOR CUSTOM-DOMAIN PUBLIC LAUNCH.**

The repository is credible and useful today as a formation-stage public standards source. A verified launch requires one canonical host, a curated deployment artifact, current checks, exact deployed and rollback SHAs, custom-domain DNS/TLS/route proof, and closure of the private security-reporting gap.
