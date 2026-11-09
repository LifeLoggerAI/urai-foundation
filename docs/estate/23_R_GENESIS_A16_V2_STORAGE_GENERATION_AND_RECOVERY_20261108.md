# ONE URAI GENESIS — Foundation R-GENESIS-A16 v2 storage identity, receipt replay and interrupted-ingestion recovery

**Observed:** 2026-11-08 America/Chicago; some GitHub timestamps appear November 9 UTC. **Repository:** `LifeLoggerAI/urai-foundation`. **Current lane:** existing open/draft/unmerged audit PR #65 (`docs/foundation-genesis-forensic-20261107`). **Main pinned:** `8ee8036b649ae9c9e73ae374a7247f0bb34c4c03`. **Engineering PR #60 pinned:** `aa7bff55f9a88656a7eb067e74c2ae5de879447c`, still open/draft/unmerged. **Disposition:** reproducible offline TypeScript/Node evidence only, NO source-native Foundation patch or Firebase integration, and **production/legal/fundraising HOLD**.

Read [A6 complete original-surviving-ref history](13_FULL_REACHABLE_GIT_HISTORY_COMPLETION_20261107.md), [A7–A8 legal and CI ZIP proof](14_R_GENESIS_A7_FRESH_SOURCE_LEGAL_CI_READBACK_20261108.md), [A9](16_R_GENESIS_A9_ISOLATED_BACKEND_AND_LOCAL_HTTP_INTEGRATION_20261108.md), [A10](17_R_GENESIS_A10_DEEP_PROVENANCE_AND_RELEASE_GATE_20261108.md), [A11](18_R_GENESIS_A11_TRANSITIVE_EVIDENCE_AND_GRANT_SCOPE_INTEGRATION_20261108.md), [A12](19_R_GENESIS_A12_EVIDENCE_BINDING_REPLAY_AND_PROVENANCE_ACCEPTANCE_20261108.md), [A13](20_R_GENESIS_A13_DISPOSABLE_HANDLER_REMEDIATION_ADMISSION_20261108.md), [A14](21_R_GENESIS_A14_CRYPTOGRAPHIC_SOURCE_ISSUER_ADMISSION_20261108.md), and [A15](22_R_GENESIS_A15_TRUSTED_INTAKE_TO_GRANT_BRIDGE_20261108.md) for the exact progressive history. **Do not redo** the complete declared original Git scope: 53 surviving heads, 481 reachable commits, 483 SHA-256-verified original blobs, 3,080,302 unique original bytes. External provider assets, unreachable/deleted Git objects and private legal records remain excluded.

## 1. New actual execution — independently reproducible in a clean container folder

Created two new experimental **standalone TypeScript** files, `v2_document.ts` and `intake_v2.ts`, plus executable Node 22 tests and a grant integration bridge. `tsc 5.8.3 --strict --noEmit` **PASS** and full stand-alone `tsc -p tsconfig.json` **PASS**. No official Firebase SDK, Firestore Rules emulator, app code TypeScript build, cloud IAM, Cloud Storage or private real records were involved.

| Executed check | Result | Evidence meaning |
| --- | --- | --- |
| `node --test --test-reporter=tap v2_intake.test.cjs` | **47/47 PASS, zero failures** | Real Node SHA-256/Ed25519 on test-generated ephemeral keys and synthetic byte objects, pure TS state-store interface |
| `node v2_handler_bridge.cjs` | **38/38 expectations matched; zero unexpected (19 each variant)** | New v2 receipt verification injected into unchanged **R14 disposable locally derived compiled handlers** for synthetic Foundation grant draft→review→approval and denial |
| Regression `tsc -p`, `node --test trusted_intake.test.cjs`, `node r15_handler_bridge.cjs` on original R15 directory | **45/45 PASS**, **32/32 expected bridge observations matched** | Reproduces old v1's acceptance of same-byte replaced-generation source and other baseline behaviors |
| Re-extracted R16 ZIP into an unrelated clean directory; checked members; TypeScript compilation, 47 tests and 38 bridge observations reran | **PASS** | Current-turn repeatability, without network access or external provider changes |

The counts are **not independent security pass scores**. The bridge includes a deliberate known policy residual: a trusted signer can sign an unsupported factual claim and the signature then verifies. An expected denied transaction is a successful negative test, not a released safeguard. Earlier A9–A15 results and overlapping R15 fixtures are not additive.

### R16 source identity / original bytes

The bridge uses original byte copies of the historical **R14 derived** compiled modules, **NOT current repository-native functions**:

| Module | SHA-256 |
| --- | --- |
| `r14_main/index.js` | `cb1421dc9b94966bd1c28d76e52799e937c631a5ce02977e3d1709cb83b43d31` |
| `r14_pr60/index.js` | `b0c4bc9413394b21cb6e7eb4e5b4f1b4ef5fc3bd0c5039daae7fc2402fb952d9` |
| `v2_document.ts` | `98cea6f6ac4b6849c1e7e4dada2b80c12a94a75af7af5ce52187fc559dbf0cbf` |
| `intake_v2.ts` | `8063c2deb28fad03be778a3b3d4301863a1b069a95507b57d33fb98b75c5226b` |
| `v2_intake.test.cjs` | `a805b946d23d68b0d961e702dcdf9ec7de8455129fa5b14bd0040ca8fe07c901` |
| `v2_handler_bridge.cjs` | `eedd27eaa5e80967156e366d77b29b83c651d7bd1c2489aee10917b53f88da31` |

The portable evidence package `ONE_URAI_Foundation_R16_Storage_Generation_and_Recovery_Evidence.zip` is a **conversation artifact**, not in GitHub: **49,959 bytes**, ZIP SHA-256 `5f9a92a21a093168f70882af08e973b5f70009b1dd44bce30b5abd5cab110809`, **17 entries** and **16 member SHA-256/size receipts** in `R16_MEMBER_SHA256.json`. All member hashes, ZIP CRC, the fresh TypeScript build and both new suites were independently rerun in a clean extraction. It includes source, compiled JS, tests, archived R14-derived grant specimens, R9 transport and bounded README. **No persistent private signing keys or real donor/beneficiary/user records.**

## 2. Concrete new improvements in the v2 experimental protocol

- **Signed exact Storage identity:** canonical v2 includes source `documentRef`, expected `project`/`bucket`/`key`/**`generation`**, actual source byte SHA-256, signed question/value bindings, independent intake/reviewer identifiers, reviewer digest, issuer/key, verified time, and revocation epoch. Real Ed25519 verification uses a separately injected trusted issuer public-key registry, not document-provided public keys.
- **Source-substitution regression closed in isolated bridge:** R15 v1 accepted an object replaced with **a new generation but identical bytes**. The R16 v2 bridge now **rejects grant approval** when the old signed generation is unavailable and only the new one exists. Also refuses tampered signed project/bucket/key/generation, wrong binding, wrong issuer/key, revoked root or changed revocation epoch, and implicit v1 migration. Preserve older historic approvals as evidence without re-authorizing new uses of revoked sources.
- **Recoverable, idempotent research state machine:** `staged → reviewed → signed → sealed → published`. Different synthetic intake/reviewer/issuer actor identities required. The receipt is signed before sealing and stored persistently **inside the test case-store**; a recorded owner-seal identifier protects retry after a simulated crash before the sealed-state commit. Four forced interruption points passed recovery tests, and a simulated Firestore publication exception retried without generating another signed receipt. A changed or forged pending signature, unexpected issuer, stolen seal owner or changed version fails closed.
- **Revocation and replay:** separate synthetic revocation ledger, exact epoch check at verification and before publication, previously issued approval record retention, new prior-approved child review refusal after root revocation; no silent promotion of v1 source receipts.
- **Boundary checks:** strict canonical key/path/schema, 100 bounded answer bindings, role/MFA/fresh-auth synthetic actor assertions, no reads of UrAi consumer memories or RuAi professional records. Multiple current-source security/read-scope questions from A9–A15 remain open.

**Test correction:** the first bridge run produced **36/38** expected matches, solely because the artificial crash class had default JavaScript `Error.name='Error'` instead of `SimulatedCrash`. The actual intended crash and recovery occurred. Correcting the experimental class label and rerunning produced **38/38**; no Foundation shipping source defect was implied. A later source-review hardening added signature/identity validation when resuming an already signed pending case and four additional negative unit tests. The finalized unit suite is **47/47**, not the earlier 43/43 checkpoint.

## 3. What is NOT closed

**P0 trust and legal authority:** Cryptographic verification does not establish a statement's truth, enforce a state-law signer, prevent a privileged real issuer from signing false material, or establish IRS/state standing, fundraising authorization, beneficiary consent or current constituted nonprofit governance. A signed reviewDigest alone is not a separately authenticated external human finding. Main's privileged future-`auth_time` gap remains, with a candidate fix only on unmerged PR #60.

**P0 ingestion operations:** R16's `CaseStore`, `VersionVault`, `sealVersion`, `publishOnce` and owner labels are **in-memory fakes**. Source documentation from Google Cloud confirms `ifGenerationMatch` and `ifMetagenerationMatch` preconditions are available for real Storage operations and that versioned object references require explicit generations. Firestore transactions may retry their callback on concurrent changes, so real external signing or Storage network side effects **must not** be performed naïvely inside transaction callbacks. Official references: https://docs.cloud.google.com/storage/docs/request-preconditions and https://firebase.google.com/docs/firestore/manage-data/transactions. R16 does not test real durable process recovery, worker leases, retry storms, object-lock retention, metadata metageneration, failed KMS calls, partial provider commit ambiguity, or offline deletion/erasure. Prototype needs a durable idempotent outbox, immutable version pin and orphan reconciliation.

**P1 real runtime:** No `firebase` CLI, Firestore Emulator JAR or installed Firebase SDK was present. External package DNS remained unavailable. No true Firestore Security Rules evaluation, Auth/App Check, role-token issuance, IAM/Storage/KMS enforcement, real Functions deployment, authenticated cross-service grant workflow, browser/device accessibility or live hosting release SHA was verified. Public fetches of `https://uraifoundation.org/`, `https://www.uraifoundation.org/`, and `https://urai-foundation.web.app/` were inaccessible to the web reader, which does **not** prove those sites are offline. Provider project names remain leads, not verified current mappings.

**P2/P3 governance and assurance:** Form 811 last retained packet unsigned/unfiled; current Texas agency status and $25 cure path unverified. No adopted board/bylaws, IRS tax exemption, legally authorized banking, active donations, signed itemized Labs/IP Holdings/Foundation agreements, actual regional 15/15/15 transfers, verified accessibility certification, ongoing research authority or funded active community programs proven. Do not treat internal proposals as external acceptance.

## 4. Current CI evidence and next action

As of the pre-R16 publication readback PR #65 was open/draft/unmerged at `1bc247284f0a67b46159909658389d5390fa41ed`; main remained `8ee8036...`, PR #60 remained `aa7bff55...`, and Labs registry PR #262 remained separate/draft. Audit [Check run 42548413220](https://github.com/LifeLoggerAI/urai-foundation/actions/runs/42548413220) completed **failure**; job `128938352261` exposed `steps:null` and one inaccessible annotation. No assigned runner or executed tests were demonstrated. Exact root cause remains unknown; each new A16 commit requires a fresh check readback rather than inheriting an old run.

**P0:** independently approve v2 source/issuer truth, signed exact Storage generation and metageneration/retention, real IAM/KMS credential custody, trusted human review and revocation, recovery/outbox semantics, source-derived TypeScript integration, and the #60 nonfuture privileged-auth guard. Diagnose the CI runner annotation. Maintain release HOLD.

**P1:** real SDK Emulator Suite tests for client Rules/roles/tenant access, callable App Check and authentic Auth, actual Cloud Storage generation preconditions and KMS signing, concurrency/transaction retries/duplicate/partial failures, 100-answer pressure, source revocation and legacy v1 migration, then authorized read-only GCP provider/Hosting SHA/rollback and device/accessibility acceptance.

**P2/P3:** lawfully completed nonprofit and intercompany governance, financial privacy/fundraising authority and independently audited inclusive public-interest programs. No live legal/financial mutations.

**NEXT CHALK:** read A6 through A16, verify the R16 ZIP sha/member manifest and run the README on Node 22/tsc. **Next material engineering gate is native Firebase SDK/Emulator and trust-root integration, not another in-memory-only scoring pass.** Keep Foundation #65 draft, main, engineering #60, closed donation #28 and Labs #262 untouched. **ONE URAI GENESIS PRODUCTION/LEGAL/FUNDRAISING HOLD.**
