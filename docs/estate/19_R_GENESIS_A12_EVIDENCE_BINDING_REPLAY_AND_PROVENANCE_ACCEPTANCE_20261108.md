# ONE URAI GENESIS — Foundation A12: evidence-identity replay, receipt provenance, and a bounded reference admission contract

**Observed:** 2026-11-08 America/Chicago (GitHub UTC time falls on Nov 9). **Repository:** `LifeLoggerAI/urai-foundation`. **Lane:** pre-existing draft/unmerged Foundation forensic PR #65 at `docs/foundation-genesis-forensic-20261107`; reviewed original main `8ee8036b649ae9c9e73ae374a7247f0bb34c4c03`; separately owned, unmerged security/stewardship PR #60 `aa7bff55f9a88656a7eb067e74c2ae5de879447c`. **Scope:** offline source-artifact integration and a separate proposed policy model. **Release/legal/financial status: HOLD.**

Continue from [A6 complete original-surviving-ref Git history](13_FULL_REACHABLE_GIT_HISTORY_COMPLETION_20261107.md), [A7 legal/CI/source](14_R_GENESIS_A7_FRESH_SOURCE_LEGAL_CI_READBACK_20261108.md), [A8 original CI artifacts](15_R_GENESIS_A8_ORIGINAL_ACTIONS_ARCHIVE_AND_ASSET_CLOSURE_20261108.md), [A9 initial compiled/HTTP integration](16_R_GENESIS_A9_ISOLATED_BACKEND_AND_LOCAL_HTTP_INTEGRATION_20261108.md), [A10 source authorization/role checks](17_R_GENESIS_A10_DEEP_PROVENANCE_AND_RELEASE_GATE_20261108.md) and [A11 transitive lineage/authority](18_R_GENESIS_A11_TRANSITIVE_EVIDENCE_AND_GRANT_SCOPE_INTEGRATION_20261108.md). **Do not restart** the original 53 heads, 481 commits, 483 SHA-256-verified blobs, 3,080,302 unique original bytes. Those narrow figures do not count deleted/unreachable Git, ignored/LFS, actual Firebase or confidential Drive assets.

## 1. Exact compiled source and new executable artifact

**Unmodified original compiled GitHub Actions bytes** were reused, not translated into a hand-written copy:

| Artifact | Git exact source | `functions/lib/index.js` raw size | Raw SHA-256 |
| --- | --- | ---: | --- |
| GitHub Actions `11510931447`, [Oct 7 main Check](https://github.com/LifeLoggerAI/urai-foundation/actions/runs/37683147407) | `8ee8036b649ae9c9e73ae374a7247f0bb34c4c03` | 25,880 | `c362b0ca80db42b2438d5f1ce8a2bba818fcd34b8aca8ca59a8cf6e545afc9e1` |
| GitHub Actions `11652932822`, [Oct 10 PR #60 Check](https://github.com/LifeLoggerAI/urai-foundation/actions/runs/38009775773) | `aa7bff55f9a88656a7eb067e74c2ae5de879447c` | 26,019 | `bdeb3a0f44c57ca1fb3120de51f40d3d7cd8b36fce36c2f1afea904cd9300b6f` |

Actually executed **`r12_evidence_binding_and_replay.cjs`** against each original compiled version using the R9 Node VM + in-memory Firestore stub. The new suite is **36/36 expected observations** (18 per compiled version), including **14 deliberately expected unsafe-success observations**, 12 positive protections, 6 state-of-evidence assertions and 4 undecided-policy observations. These counts are test expectations, **not security acceptance percentages** or 14 unique live vulnerabilities.

New independent **`r12_reference_provenance_guard.cjs`** plus **`r12_reference_provenance_tests.cjs`** ran **22/22 design-unit expectations**, using a synthetic `Map`, **not** the compiled Functions; this code is an explicitly **unadopted design prototype** rather than a source-integrated repair. It is useful as a reference for future reviewed implementation, not evidence that main or PR #60 passes these stricter checks.

Earlier exact fixtures were actually rerun as controls: R9 92/92 expected synthetic results, R10 74/74, R11 64/64, proposed R11 strict admission 5/18 conforming and 13/18 divergent, local historical HTTP 59/59 expected status responses (including old main CSS 404). The baseline suites are **not statistically independent** and should not be summed into a system-wide approval score.

**Portable complete R12 conversation artifact**: `ONE_URAI_Foundation_R12_Integrity_and_Provenance_Evidence.zip`, **266,867 bytes**, ZIP SHA-256 `096bb2f88c0c8cbcadc1c288cafe5c63e4faa07b1e4e04c9431fa1fcfc8b5fae`, **131 members** with CRC verification and `R12_MEMBER_SHA256.json` independently checking SHA-256/byte length for the other 130 members. It includes both original compiled modules, R9–R11 harnesses, R12 actual-compiled tests, R12 proposed guard and design tests, original website fixtures, logs/JSON results, and `R12_README.md`. **The ZIP is a conversation attachment, not a public GitHub source repository artifact.** Redownload GitHub Actions archives by documented IDs to reproduce if the conversation ZIP becomes inaccessible.

New exact local source/result hashes:
- `r12_evidence_binding_and_replay.cjs`: `f3d3c2c9f4df4c7f3727a8d858d9413157e98ee99d9eda841447615298e33c57`.
- `r12_evidence_binding_result.json`: `91727b601cb3a7ce6e3dc39fadb00ea63dd160063bef6c87a616ba63c7bd759a`.
- `r12_reference_provenance_guard.cjs`: `21b1b6688df18d00bdcaa0a122a973ad44919c7fac823a4309bb0e0f22b6508c`.
- `r12_reference_provenance_tests.cjs`: `7663077013ef769dc75b88a6d637f20c6ca6c43af56b80adc2c9fa176dcd402b`.
- `r12_reference_provenance_result.json`: `aa6d5fb5123efb2e83b6df82421812d7309ca073d1714e1572816e7c69dc32d5`.

## 2. Reproduced post-review evidence-substitution gaps (both compiled versions)

**New A12 fact-identity TOCTOU**:

1. Seed a synthetic verified `foundationProfile/mission` with `value='Source claim'`, linked to `foundationDocuments/docA` (present, status verified, digest and exact answer binding).
2. Grant author saves application; different reviewer reviews using existing `reviewGrantApplicationVersion`; review succeeds.
3. Without altering the *text* or `state:'verified'`, a synthetic trusted document writer changes the profile's `sourceRef` to **nonexistent** `foundationDocuments/nonexistent`, and modifies the confirming reviewer identifier.
4. A distinct privileged actor calls the original compiled `approveGrantApplication`: **approval succeeds**, and a new grant approval receipt is created in the in-memory mock despite the now-unresolvable profile-source reference.

The existing downstream validator does compare `questionId`/text and verified profile state, but **does not read `profile.sourceRef` as a documentary authority or pin the original source identity observed at review**. This is not demonstrated to be a nonstaff attack: `foundationProfile` is server-write-only under checked-in client Rules. It is a **privileged/trusted-source integrity gap** that could affect internal grant claims if such a backend is deployed and operated.

**New A12 document revision replay**: a synthetic `foundationDocuments/docA` with real-format 64-character SHA-256 and `verifiedAt` is used for review, then both the SHA-256 field and verification instant are changed while the text binding stays constant. The original compiled approval still succeeds; the application stores **no reviewed root digest/revision fingerprint**. This is separate from source revocation or changed answer text (which prior workers correctly showed can be refused). The evidence needs a source-identity/freshness snapshot, not just repeated text-value equality.

**Existing positive controls** in new R12 cases: deleting an immediately referenced document after review causes `failed-precondition` on approval, no synthetic approval receipt is written; wholly missing prior approval receipt refuses review; multiple source references are checked (one missing second reference rejects); explicitly generated facts reject review. Preserve these controls in any remediation.

## 3. Noncanonical receipts and artificial cycles (trusted-record boundary)

A synthetic trusted writer can insert `grantApprovals/fabricated_v1` with **`applicationId:'origin'`** and **string `applicationVersion:'1'`**, without canonical `approvedBy` provenance, pointing to a legitimately approved source application. A new grant citing that *noncanonical receipt path* was reviewed and approved successfully in both compiled versions because the source code converts `applicationVersion` through `Number(...)` and relies on payload metadata plus the prior approved application's answer. **Client Firestore Rules disallow writes to this collection**, so this does **not** demonstrate an unprivileged forgery path. It establishes an expected trusted writer/receipt-invariant requirement: record key, application ID/version, issuer/role and creation timestamp should agree, and the source must come through the approved signer path.

A separately synthesized approved application and approval receipt that refer to **themselves** were also accepted as a `prior_approved_answer` source for newly reviewed/approved grants. This is possible in the synthetic state because the current read validator does not recurse. It does **not** demonstrate that ordinary supported callable flows could have created the cyclic ancestor—those synthetic trusted records were injected as test fixtures. Define bounded graph traversal and cycle refusal to prevent malformed historical/ingested records from acquiring new authority.

**Open policy question rather than automatic P0 finding**: `employee_entered` content with unrelated string `sourceRefs` passed review. Distinguish free-form human narratives from legal/entity-status, funding, tax, performance and research claims before imposing blanket documentary requirements. Approval after prior reviewer's staff access is later revoked also succeeded. Decide whether the *historic review* remains valid or needs withdrawal, without deleting the historical audit trail.

## 4. A runnable proposed fail-closed reference guard — NOT integrated

The 22/22 independent design-unit tests exercise a deliberately stricter **proof-of-concept**, not Foundation shipping code. It models:

- Canonical `foundationProfile/{questionId}` binding and **existing** `foundationDocuments/{id}` source; exact normalized value/question mapping, verified/active status, 64-hex-character digest, `verifiedAt` and document provenance.
- A deterministic SHA-256 proof fingerprint over typed source IDs, bindings, status, digests and verification revision. At approval, an unchanged value with a **changed source identity or digest** produces a changed fingerprint and can be refused against the reviewer-recorded fingerprint.
- Canonical `grantApprovals/{applicationId}_v{version}` ID that must match the signed issuer metadata and approved source application/version; no free-form alias IDs or stringified versions.
- Transitive evidence traversal from prior approval through the original source, honoring current revocation state, **prior reviewer source fingerprint**, cycle detection and bounded maximum depth/node-read limits. Historical approvals remain evidentiary records, but invalid roots cannot silently authorize **new** reuse.
- Explicit refusals for unknown/ambiguous sources and unsupported `employee_entered` types under the prototype's narrow factual-evidence contract.

**Critical design limitations:** the current Foundation schema does not define signed source receipts, source-revision fingerprints, case-classification rules, or a universal `state:'revoked'` contract for all collections. Multiple-source documentary claims and employee-authored narrative drafts may be legitimate in the actual product. The prototype's single-reference requirement and staff-entered refusal are **not approved existing policy**. The model uses a simple `Map`, not official Firestore SDK/transactions; node and depth caps need genuine Rules/transaction cost testing; do not copy prototype into production unreviewed. Implement proper versioned ingestion and review-signature/issuer authority before relying on hashes as proof.

## 5. What integration did NOT cover

No `firebase` CLI, Firestore emulator JAR, installed SDK/Admin runtime, or user-connected callable GCP admin action was available. The container lacks DNS access to `github.com` and `registry.npmjs.org`, so the official suite could not be fetched. **No Firebase Auth token generation, Rules `get/exists` evaluation, official Cloud Functions App Check enforcement, IAM review, deployed Functions, real Firestore transactions, current hosting/SSL, networked browser, physical-device accessibility, or actual grant/funder submission was executed.**

Current `firebase.json` source includes Node 22 codebase `foundation-staff`, Firestore rules/indexes, **no validated deployed Firebase project ID and no Hosting deployment target**. Project name leads `urai-foundation-38828874-c42a1`, `urai-foundation` and historical `urai-4dc1d` are not verified live runtime bindings. No code returned in this pass reads or shares protected UrAi consumer memories or RuAi clinician/patient records; a functional organization diagram is **not** executed intercompany data access or signed rights authority.

## 6. GitHub CI and owner governance

At A12 start, existing Foundation PR #65 was open/draft/unmerged at `2d8e0e3bdcf02c981a6552e8cbf60aab51fe8ef8`. Latest exact Check [42542997584](https://github.com/LifeLoggerAI/urai-foundation/actions/runs/42542997584) completed **failure**; job `128921859116` returned `steps:null`, `runner_id:0/null`. GitHub's check-run metadata reported **one annotation**, but direct annotation retrieval was unavailable; exact root cause remains unresolved. No step-level test failure, runner quota/billing diagnosis, green release check, or current PR merge is established. This document's new SHA must be read again rather than inheriting a dated status.

Foundation's last retained private Form 811 packet remained **prepared, unsigned and unfiled**; the 2026 historical Texas SOS involuntary-termination record does not establish November 2026 current standing. Governing board, bylaws, 501(c)(3), deductibility, fundraising, bank signers, Foundation/Labs/IP Holdings agreements, and 15/15/15 cash allocation are **unproven executed facts** or explicitly historical proposals, not created by backend test results. No legal filing, payment, external entity contact or live donor intake performed.

## 7. Completion sequence, acceptance and handoff

**P0 — immediate engineering candidate / CI:** Write a separate reviewed source change introducing **trusted verified-fact documentary admission**, verified source state and digest/issuer at rest, reviewed immutable evidence-identity fingerprint (not just text equality), transitive prior-approval source validation and cycle refusal. Audit receipt canonical identity and invalidate **new** usage on source revocation while preserving historic audit. Port PR #60 future-auth-time guard through independent review; inspect missing CI annotation/runner steps. **No release** from synthetic green expected-result counts.

**P1 — real integration:** In a machine with official Firebase Emulator Suite, bring up actual Firestore Rules and Functions SDK; run positive/negative role and authority matrix, source-ingestion, read/write tenant isolation, replay/revocation, cyclic and depth-limit proofs, concurrent transaction behavior, and real App Check semantics. Confirm exact active project/IAM, Auth custom claims, deployed Functions sha, Firestore/Storage Rules, hosting, DNS/TLS/rollback and accessibility/physical-device tests before staging signoff. Audit broad `activeStaff()` read permissions for sensitive Foundation docs and grant applications.

**P2 — lawful organization:** Authorized confirmation of Texas reinstatement/current status, constituted directors/officers, adopted rules/conflicts, signed entity-specific Labs/Holdings/Foundation IP/services agreements, lawful finance and tax/fundraising authority, privacy/data-controller agreements before real participant/donor records.

**P3 — independent assurance:** Outside specialist accessibility/standards review, truthful research/clinical claims, community-benefit verification, funding and impact disclosures and sustainable incident/deletion/continuity.

**NEXT CHALK HANDOFF:** Read A6–A12, verify the original compiled bytes and R12 ZIP digest, run `R12_README.md` commands, and do not confuse a reference-model green result with the compiled-source fail-closed compliance test. The current required milestone is **reviewed remediation + official SDK/emulator evidence**, not a repeat of the original Git tree inventory. Keep main, #60, closed donation #28 and Labs #262 independent. **PRODUCTION AND LEGAL RELEASE HOLD.**
