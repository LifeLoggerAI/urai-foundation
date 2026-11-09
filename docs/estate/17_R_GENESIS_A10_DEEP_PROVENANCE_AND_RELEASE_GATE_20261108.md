# ONE URAI GENESIS — Foundation A10: adversarial provenance, revocation, and source-artifact reconciliation

**Observed:** Nov 8, 2026 America/Chicago (GitHub timestamps may read Nov 9 UTC). **Status:** DOCUMENTATION-ONLY; SOURCE AND SYNTHETIC INTEGRATION EVIDENCE; **PRODUCTION/LEGAL HOLD**. **Repo:** `LifeLoggerAI/urai-foundation`; **audit lane:** draft PR #65 `docs/foundation-genesis-forensic-20261107`. Canonical main `8ee8036b649ae9c9e73ae374a7247f0bb34c4c03`; pre-existing, unmerged engineering PR #60 `aa7bff55f9a88656a7eb067e74c2ae5de879447c`; central Labs draft #262 remains independent.

Continue from [A6 481-commit / 483-blob hash inventory](13_FULL_REACHABLE_GIT_HISTORY_COMPLETION_20261107.md), [A7 legal/source evidence](14_R_GENESIS_A7_FRESH_SOURCE_LEGAL_CI_READBACK_20261108.md), [A8 original Actions artifacts](15_R_GENESIS_A8_ORIGINAL_ACTIONS_ARCHIVE_AND_ASSET_CLOSURE_20261108.md), and [A9 compiled-mock + loopback HTTP tests](16_R_GENESIS_A9_ISOLATED_BACKEND_AND_LOCAL_HTTP_INTEGRATION_20261108.md). This A10 pass does **not** redo or enlarge that exact reachable-Git inventory; it does not touch code/PR #60, canonical main, legal documents, billing, IAM, hosting or user data.

## 1. Test sources, integrity, and execution

New actual offline execution using the original, unchanged **compiled JavaScript from archived GitHub Actions**:

| Version | Historical Actions artifact ID | Compiled `functions/lib/index.js` SHA-256 |
| --- | --- | --- |
| Canonical main `8ee8036...` | `11510931447` | `c362b0ca80db42b2438d5f1ce8a2bba818fcd34b8aca8ca59a8cf6e545afc9e1` |
| PR #60 `aa7bff55...` (unmerged) | `11652932822` | `bdeb3a0f44c57ca1fb3120de51f40d3d7cd8b36fce36c2f1afea904cd9300b6f` |

- Re-ran prior [A9] `integration_harness.cjs` **92/92 expected observed behaviors**, and `http_integration.py` **59/59 expected local HTTP responses**. Both suites use synthetic data; the main HTTP **404** for the missing `foundation-home.css` is **intentional negative evidence**, not a main-site release PASS.
- Authored and ran `r10_adversarial.cjs`: **74/74 expected observations matched**, **37 per actual compiled module**. Cases exercise non-finite/future auth timestamps, trusted-source claims, cross-question/field mismatches, source edits before review/approval, partial/missing documents, dual references, employee-entered attestations, prior-approval identity, opportunity definition changes, duplicate questions, and `expectedVersion` input coercion. **Matching expected unsafe behavior is not a security pass.**
- Authored and ran `r10_site_surface.py`: scanned **18 main + 19 PR60 = 37 archived HTML pages**, checking declared language, H1 count, duplicate IDs, alternate text, input label associations (including wrapping labels), presence of external script sources, and site forms. **Zero flags under these limited checks** and **zero externally sourced scripts** in the archived HTML. Demo `grants/index.html` contains one form, 11 labeled controls, and `noindex`; `staff/index.html` also carries `noindex`; `donate/index.html` has no form or externally loaded script. These are **static source facts, not browser or accessibility certification**.
- Retained complete reproducible conversation artifact `ONE_URAI_Foundation_R10_Integration_Evidence.zip`: **231,798 exact ZIP bytes**, SHA-256 `7e305dcd3945fdd8fd281544ebaa1d4bfdb1c9dc7570a6e05463460406870f0a`, **106 ZIP members**, no CRC error, including a per-member `ZIP_MEMBER_SHA256.json`. It includes the R9 original backend/web inputs, extended tests/results, source-byte receipts and a 13-item security admission contract. **It is not hosted in GitHub**, so use the preserved artifact or redownload original Actions archives by ID and independently verify hashes.
- New `r10_adversarial_result.json` SHA-256 `cd44af60adeb626876d4242a9c4e0e2c23dad396b60dfee58139cd5641917f14`. Inputs are all synthetic; no access to actual donors, staff credentials, patients, banking or cloud identities.

## 2. Adversarial behavioral findings by real compiled source

| Control | Canonical main original compiled module | PR #60 compiled candidate | Evidence limit / disposition |
| --- | --- | --- | --- |
| Privileged token `auth_time` | Synthetic `NaN`, `Infinity`, future seconds and fractional values **accepted** | All four **refused** (`failed-precondition`) | Real Firebase-minted tokens may never contain these values. This proves code validation behavior, **not production token forgery**. Adopt reviewed #60 repair only after independent integration |
| Profile fact source binding | Authorized owner may save `state:'verified'` with arbitrary nonexistent or unrelated-looking `sourceRef`; even an object-valued `value` is stamped verified | Same | **P0 provenance trust gap** on privileged path, not anonymous access. Does not read any external RuAi or UrAi data |
| Profile verification at review and approval | Exact answer-to-profile-field/value/state checks refuse mismatched value/field, missing profile, and revoked source before approval | Same | **Positive synthetic controls present**; upstream profile source remains unverified |
| Document provenance at review | A synthetic trusted document with `sha256:'not-hex'`, truthy `verifiedAt`, and exact `answerBindings` can be used; missing timestamp/wrong answer blocks; revocation before approval blocks | Same | Digest string presence **does not prove cryptographic integrity**. Trusted ingestion not tested |
| Human `employee_entered` answer | Independent reviewer and owner can approve without any `sourceRefs` | Same | **Policy decision required**: narrative/human attestation may be legitimate; exclude high-stakes legal/financial/current-organizational claims absent evidence |
| `prior_approved_answer` identity | Synthetic noncanonical approval document ID accepted when it contains matching application/version metadata and an approved source application | Same | Need a canonical approval-receipt and trusted writer/issuer contract; no proof attacker can write records |
| Opportunity mutation | Changes in question definition before review or after review/before approval are refused | Same | Positive source-integrity control in synthetic model |
| Duplicate question answers | Refused | Refused | Positive synthetic validation |
| `expectedVersion: null` | Coerced to numeric zero for new application and accepted | Same | Narrow schema-consistency concern; does **not** itself demonstrate a version-lock bypass |

**Important:** the synthetic `onCall` wrapper *records* `enforceAppCheck: true` but does not validate an App Check token. The in-memory transaction simulation is atomic on handler rejection but not Firestore's real rules/SDK/transaction scheduler. No emulator or live security claim transfers from these observations.

## 3. Exact Firestore Rules source read boundary

Re-read original `firestore.rules`, Git blob `061723cfb6edc4931624152103a35cda6283b722`. It declares default `allow read, write: if false` and client `create, update, delete: if false` on every named staff/grant collection. Its **read** rules, as source expressions rather than executed Rules SDK evidence, are:

| Collection | Client read requirement in checked-in source |
| --- | --- |
| `foundationStaff` | active staff and self or admin/owner |
| `foundationProfile`, `foundationDocuments`, `grantOpportunities`, `grantApplications`, `grantSubmissions`, `grantAwards`, `grantReportingObligations` | **any active staff role** (including staff/grant_writer) |
| `grantApprovals`, `foundationAuditLogs` | reviewer, admin or owner |

The proposed back end handles potentially private staff/legal/grant/beneficiary documents. **P1 privacy-policy gate:** classify each record and determine least-privilege/per-document need-to-know and tenant/purpose boundaries. No deployed Rules version or official Firestore emulator acceptance was obtained. Do not infer real production exposure from unbound source.

## 4. Real SDK/emulator, browser and website provider blockers

The available container has Node v22.16.0 and Java 21 but **no `firebase` CLI or Firestore emulator JAR**; npm cache had no Firebase tooling; direct `git ls-remote` failed `Could not resolve host: github.com`. No official emulator binary could be installed through the available package network. The installed Firebase app did not expose a callable project-admin action in this session. Therefore the **requested higher-trust authenticated Firestore Rules/App Check/provider integration was not executed**. Java existence alone does not constitute emulator proof.

Chromium browser navigation in the retained A9 evidence was blocked before page execution. New R10 HTML scanning cannot replace real keyboard, assistive, screen-reader, mobile, reduced-motion, visual or physical-device checks. Public fetches of `uraifoundation.org`, `www.uraifoundation.org`, and `urai-foundation.web.app` were again inaccessible via the available reader; this is **not proof of downtime**, nor proof of current deployed SHA/host ownership.

As of this pre-commit readback Foundation audit PR #65 at `54547f1e1ea4d1dbe8f9654c7ecad9eb3ccaf8ec` was **open, draft, unmerged**; Check [42539872419](https://github.com/LifeLoggerAI/urai-foundation/actions/runs/42539872419) completed **failure** (Nov 9 UTC), associated job `128912183410` exposing `steps:null`. Cause/annotation still unverified, and it does **not** demonstrate test execution. This document commit requires a **new** exact-head run; no stale green run can be transferred.

## 5. Institutional reconciliation and P0-P3 acceptance contract

Institutional relationships remain functional proposals, not signed custody: Labs is commercial operator of UrAi/RuAi; IP Holdings is intended asset-scoped custodian/licensor; Foundation is intended separate nonprofit governance/standards/community institution. No direct cross-entity right to personal memory, RuAi clinician records, donor money or certification is granted by repository naming. Texas reinstatement packet remains unsigned/unfiled in the latest retained private documentation; formal board/bylaws, IRS recognition, deductibility, financial custody and intercompany licenses are **not proven current executed facts**. The historic regional 15/15/15 profit allocation is **proposal**, not cash-flow proof.

The local R10 `r10_security_acceptance_contract.json` records 13 deterministic controls with `FAIL_SYNTHETIC`, `PASS_SYNTHETIC`, `NOT_PROVEN`, or `POLICY_UNDECIDED` states, and is included in the evidence ZIP. Do not classify all 74 expected observations as policy successes.

**P0 — before any source adoption, fundraising or grant operations:** Resolve privileged profile fact source-of-truth validation and verified status, adopt safe `auth_time` handling through a separately reviewed integration, establish grant-fact source-classification policy, obtain current CI runner failure annotation, and preserve current legal/certification/fundraising HOLD.

**P1 — true runtime integration:** Install official Firebase Emulator Suite on an authorized environment, execute SDK+Rules positive and negative tests across all staff roles and revocation scenarios, validate actual Functions App Check, provenance ingestion, document digest/attestation, actual identity/claim, purpose isolation and transaction races. With authorized read-only access, map `urai-foundation-38828874-c42a1`, `urai-foundation`, and historic `urai-4dc1d` Hosting reference to real IAM/billing/Rules/Functions/Hosting/deployed SHA. Verify canonical domain, rollback and device accessibility.

**P2 — governance execution:** Confirm live Texas SOS status and accepted reinstatement instruments; legally appoint/adopt board/bylaws and conflict protocols; complete independent Labs/Holdings/Foundation rights, data-controller and service agreements; establish qualified legal/tax review and actual financial controls before intake.

**P3 — public assurance:** Independent accessibility, affected-community, standards and research review; restrained public claims; documented beneficiaries, program outcomes, transparent funding, incident/deletion and continuity evidence.

**Owner handoff:** Open PR #65, read A6–A10 in order, preserve PR #60, donation PR #28 and master Labs #262. The next high-value action is **actual official emulator tests + a separate reviewed provenance remediation candidate**, not another 481-commit Git tree crawl. No legal filing, payment, secret access, production deployment, rollback, PR merge, board appointment, or provider configuration mutation occurred. **Release remains HOLD.**
