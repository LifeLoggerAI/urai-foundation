# ONE URAI GENESIS — Foundation R-GENESIS-A9 isolated backend and local HTTP integration

**Date:** 2026-11-08 America/Chicago / Nov 9 UTC provider time. **Audit lane:** draft PR #65 `docs/foundation-genesis-forensic-20261107`; main `8ee8036b649ae9c9e73ae374a7247f0bb34c4c03` unchanged. **Classification:** actual offline execution against immutable historical GitHub Actions compiled modules and static-site archives using **synthetic** Firebase mocks and loopback HTTP; **NOT Firebase Emulator, deployed Functions, actual Firestore Rules, live App Check, real user identities, current provider IAM, or production acceptance.**

Read [A6 history](13_FULL_REACHABLE_GIT_HISTORY_COMPLETION_20261107.md), [A7 current source/legal](14_R_GENESIS_A7_FRESH_SOURCE_LEGAL_CI_READBACK_20261108.md), and [A8 original CI archives](15_R_GENESIS_A8_ORIGINAL_ACTIONS_ARCHIVE_AND_ASSET_CLOSURE_20261108.md). All original reachable Git-tree/byte coverage from A6 remains complete within its declared surviving-reference scope. Do not restart it.

## 1. Source identity and test transport

The existing downloaded **original GitHub Check ZIPs** (IDs `11510931447` on [main run 37683147407](https://github.com/LifeLoggerAI/urai-foundation/actions/runs/37683147407) and `11652932822` on [PR #60 run 38009775773](https://github.com/LifeLoggerAI/urai-foundation/actions/runs/38009775773)) contain source-pinned compiled `functions/lib/index.js`:

| Compiled unchanged module read from ZIP | Raw bytes | Raw SHA-256 | Code lineage |
| --- | ---: | --- | --- |
| main `functions/lib/index.js` | 25,880 | `c362b0ca80db42b2438d5f1ce8a2bba818fcd34b8aca8ca59a8cf6e545afc9e1` | `8ee8036b649ae9c9e73ae374a7247f0bb34c4c03` |
| PR #60 `functions/lib/index.js` | 26,019 | `bdeb3a0f44c57ca1fb3120de51f40d3d7cd8b36fce36c2f1afea904cd9300b6f` | `aa7bff55f9a88656a7eb067e74c2ae5de879447c` |

The artifacts and their ZIP raw SHA-256 values are in A8. A locally assembled offline handoff ZIP **`ONE_URAI_Foundation_R9_Isolated_Integration_Evidence.zip`** includes those two compiled modules, extracted static site fixtures, executable `integration_harness.cjs`, `http_integration.py`, logs, JSON results, and the blocked browser attempt. ZIP archive: **214,887 bytes, SHA-256 `97a822fc4356c627c45364ecbf0b4f4e6db3a9afdc6e615cb0e4a8b2a8073484`, 97 entries, CRC test passed**. The ZIP is a conversation artifact, not a Git-tracked Foundation source artifact; future workers should fetch the original GitHub Actions artifacts and verify compiled byte hashes before repeating.

Rerun harness on these exact extracted compiled modules with `node integration_harness.cjs`, and local site HTTP with `python3 http_integration.py`. Harness SHA-256 `494bf5ce82278524959cbb28e1d2e5ced911f76c1e8ad02b3d3b6fa73e792356`. Machine JSON results SHA-256 `74dc56a89aa0c187be4b6272ca7b513c96c80566588eb598ab270b8779a30334`; HTTP harness and JSON SHA-256 `8da615d4a89089d7ae8ea51a47e2aa9845712f7ae0af89904c52dd4514c16428` and `8d95be056bcd741aae43e8fc64a3ce644119269244c31007ae677a7fefeeaec6`. No production records, credentials, legal identifiers, donor or beneficiary data are included in synthetic tests.

## 2. Actual offline compiled-backend behavioral run — 92/92 expected observations

**46 synthetic checks against each historical compiled module**, 92 observations in all, **92 matched expected**. This score is NOT "92 security protections passed": it includes deliberately observed **undesirable successful operations** (see below). Functions are the actual archived compiled code, executed in an isolated Node VM with dependencies intercepted: `initializeApp`, `getFirestore`, `Timestamp`, `FieldValue`, `HttpsError`, `onCall`. An in-memory transactional stub stages writes and discards them on handler error, but is **not** Firestore's production concurrency or Rules engine. The `onCall` stub **records** `enforceAppCheck: true` options but **does not enforce real App Check tokens**.

Observed expected controls in the isolated model: missing identity, unverified email, token/active staff mismatch, disabled staff, disallowed grant-writer approval, MFA omission, stale privileged-auth timestamp, wrong grant question, absent opportunity, stale draft version, missing profile reference, generated answer review, self-review, self-approval, terminal edit, changed opportunity definition, transaction-time staff revocation, and no partial state writes in the mock's transaction. These results **cannot** be promoted to Firebase SDK, deployed IAM, App Check, Rules emulator or physical-device proof.

### Differential authorization result

On the same synthetic privileged owner identity and a token `auth_time` **one day in the future**:

- **Canonical main accepts** `upsertFoundationProfileField`; its prior check only rejects too-old auth time.
- **Unmerged PR #60 rejects** it with `failed-precondition`, and also rejects a fractional `auth_time`.

This confirms the security source-candidate change in actual historical **compiled** behavior, not a production release. Main remains exposed to the source-level future-time validation weakness until an approved repair is merged and separately deployed/tested.

### Reproduced canonical fact/provenance integrity gap on BOTH versions

In the in-memory transaction model, a synthetic authorized, active, MFA-bearing `owner` can call `upsertFoundationProfileField` with **arbitrary nonexistent `sourceRef='missing/evidence'`** and a supplied fact; the function writes `state:'verified'` without dereferencing that authority. Later, a different grant writer saves a draft using `foundationProfile/mission`; another independent reviewer verifies it; and a separate independent owner approves the application. All steps succeed in the synthetic test even though the underlying `missing/evidence` document never existed. The downstream `validateAnswerProvenance` comparison trusts the unverified upstream profile's `state` and `value`.

**P0 architecture/security integrity gate:** before any operational use as evidence, the privileged profile admission path must validate real authoritative documentary origin, source existence/type, exact value-to-field binding, material/cryptographic provenance, current authority, and independent review appropriate to the claim. The issue is **trusted privileged staff creation of an unsupported verified claim**, **NOT evidence of an unauthenticated exploitation path** or of a deployed vulnerability. Do not turn the current result into a live breach claim.

A second narrower test constructed a trusted-in-memory `foundationDocuments` record with `sha256:'x'` and truthy `verifiedAt`: both compiled modules accepted it as a document-backed source after exact answer binding. The validator checks presence of the hash string and timestamp-like value, **not digest-format validity or signed issuer provenance at this read point**. An unseen trusted ingestion path may impose tighter checks; source/ingest authority remains unverified, so this is a **verification boundary**, not an assertion that a live attacker can write arbitrary document records.

### Test reproducibility refinements

The first local suite was extended from 80 to **92** expectations to exercise *actual* same-author `reviewer` refusal (rather than only a grant-writer role refusal), failed transaction write isolation, and writer approval refusal. The unchanged compiled modules, not rewritten source implementations, were executed. Node JS syntax parse checks for both modules and harness passed. No paid cloud compute, live Firebase data, or provider changes.

## 3. Actual loopback HTTP against historical site artifacts — 59/59 expected results

A Python `ThreadingHTTPServer` served the downloaded `_site` bytes on `127.0.0.1` for each exact dated source. A real `urllib` HTTP client verified:

| Local HTTP check category | Count | Outcome |
| --- | ---: | --- |
| Public HTML route responses, main 17 + candidate 18 | 35 | 200 and HTML in each, local host only |
| Selected assets and expected main CSS 404 | 10 | Expected responses observed |
| Requests for protected backend/estate paths | 6 | 404 from both packaged sites |
| Selected server-response-to-archived-file byte equality | 6 | Byte-for-byte matches |
| Archived publication manifest source SHA | 2 | Matches exact declared commit |
| **Total** | **59** | **59 expected outcomes matched** |

The known main bug is **confirmed again over real loopback HTTP**: `/foundation-home.css` returns **404** from main's archived public site. The PR #60 archived site responds **200** and has the missing CSS. This is a preserved, source-specific negative finding, not a green main deployment. A first local test mistakenly required uppercase `<!DOCTYPE html>` instead of archived lowercase `<!doctype html>`, generating false failures despite HTTP 200; the fixture was corrected to case-insensitive DOCTYPE and rerun, 59/59. Do not erase the test-harness correction or claim an application regression.

## 4. Explicitly BLOCKED browser and live service test gates

Chromium/Playwright was attempted against local `http://127.0.0.1:port/`, `file:///...`, and a standalone `data:text/html` page. **All navigation** was rejected by the available environment with `net::ERR_BLOCKED_BY_ADMINISTRATOR` before page execution. Consequently, **no browser JavaScript journey, rendered visual comparison, keyboard/touch, assistive-tech or app UX pass was obtained**. The browser script is included as a *blocked attempt*, not counted as a passing test.

The public `https://uraifoundation.org/`, `https://www.uraifoundation.org/` and historical `https://urai-foundation.web.app/` could not be fetched by the available external web reader. This is a tooling access limitation; it **cannot be taken as proof a site is offline**, nor prove live DNS/TLS, hosted release SHA, active staff functions or access safety.

The connection exposed no usable live Firebase/GCP project administration APIs. Project names `urai-foundation-38828874-c42a1`, `urai-foundation`, and the historical `urai-4dc1d` hosting fallback remain **leads, not inspected current resources**. No current IAM, Firebase Auth/App Check/Firestore Rules/Storage/Functions/Hosting deploy revision or billing status has been verified. Full, authenticated integration is **HOLD**.

## 5. Current CI branch readback and organizational/legal guardrails

Foundation audit #65 was read **open, draft, unmerged** at `84ac14cfa5f2110f1d25f2b3a57ec6cf416064f1` before this receipt. The fresh Check [run 42539335688](https://github.com/LifeLoggerAI/urai-foundation/actions/runs/42539335688) completed **failure**, and prior audit failures exposed no executable steps; exact current job cause/annotation still unresolved. This historical result does not certify this new documentation commit.

Master Labs registry [#262](https://github.com/LifeLoggerAI/urai-labs-llc/pull/262) remains open/draft; Foundation security/stewardship [#60](https://github.com/LifeLoggerAI/urai-foundation/pull/60) remains open/draft, and donation #28 remains closed/unmerged. Neither the test transport nor this documentation changes other worker branches. Foundation historical Texas involuntary termination, unsigned/unfiled Form811 preparation, unadopted governance, unverified 501(c)(3), banking/fundraising and intercompany licenses are unchanged; separate lawful authority is required for all external acts.

Functional institutional boundary is also unchanged: **URAI Foundation** is the intended separately governed public-interest institution, **URAI Labs LLC** the commercial UrAi/RuAi operator, and **URAI IP Holdings LLC** the intended asset-scoped rights custodian. Source standards do not constitute a signed license, constituted Foundation board, certification, delegated consumer/RuAi private-data access or promised 15/15/15 profit transfers. Public program and research plans are intentions, not independently verified operations.

## 6. Actionable P0–P3 handoff (source-pinned)

**P0 — security and CI, no release:** Create a separately reviewed engineering repair for `upsertFoundationProfileField` trusted evidence admission and its downstream provenance, with negative emulator tests for nonexistent, mismatched, unsigned, stale, duplicate/revoked documentary sources; preserve PR #60 and port its safe future-time guard only through reviewed integration. Obtain owner-side GitHub check annotation, billable-runner/provisioning diagnostics, and exact source CI rerun. Do not put sensitive legal material in public fixtures.

**P1 — genuine integration:** With authorized read-only Firebase/GCP access, identify real project, Functions SHA, Auth roles, custom claims, App Check, Firestore and Storage Rules, IAM, hosting, billing and rollback; run official Firestore/Firebase emulator against exact reviewed candidate using real SDK, cross-role revocation/positive-negative grant tests, and then actual authenticated staging. Independently obtain browser/physical accessibility receipts and exact served CSS/deployed SHA for selected canonical host.

**P2 — executed institutional governance:** obtain current accepted Texas state status and authorized reinstatement/cure sequence, constituted board/officers/adopted bylaws, independent conflict rules, signed itemized Labs/Holdings/Foundation services/IP licenses, charity/tax authority, accounting/signers/donation restrictions and consent-safe beneficiary data custody. Never claim adoption from draft.

**P3 — independently reviewed public impact:** review accessibility, clinical/research limitations and affected-community participation, funder restrictions and transparent outcomes, noncommercial guardrails and continuity/retention.

**RELEASE STATUS: HOLD.** These results strengthen **isolated compiled-source and archived website verification**; they do **not** close legal, external provider, real authenticated integration, independent reviewer or production gates. No legal filing, payment, provider mutation, branch merge, account creation, DNS change, customer-data read, deployment, owner bootstrap or live notification performed.
