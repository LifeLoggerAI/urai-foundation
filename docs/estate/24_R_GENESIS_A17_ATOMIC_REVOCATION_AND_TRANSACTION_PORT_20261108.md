# ONE URAI GENESIS — Foundation A17: atomic document revocation and retry-boundary integration

**Observed:** November 8, 2026 Central (GitHub timestamps may fall on Nov 9 UTC). **Repository:** `LifeLoggerAI/urai-foundation`, documentation-only audit PR [#65](https://github.com/LifeLoggerAI/urai-foundation/pull/65), `docs/foundation-genesis-forensic-20261107`. **Canonical main:** `8ee8036b649ae9c9e73ae374a7247f0bb34c4c03`; **independently owned engineering PR #60:** `aa7bff55f9a88656a7eb067e74c2ae5de879447c`, draft/unmerged. **Scope:** exact archived **R16 experimental TypeScript** failure reproduction, disposable source-level repair, and a separate **Firestore-shaped** transaction adapter, not provider/emulator/deployed code. **Legal, production and fundraising HOLD.**

Read A6 (completed original surviving-ref Git audit), then A7–A16 in numbered order. The original tracked historical source scope remains **53 surviving branch heads, 481 reachable commits, 483 SHA-256-verified Git blobs, 3,080,302 unique original Git bytes**. The work below is **new synthetic source experiment coverage**, not a repetition or expansion of original Git byte inventory. No claim over unreachable refs, real Firebase assets, private Drive, legal status, executed governance or live deployed code.

## 1. Original R16 source failure reproduced

The earlier R16 standalone `intake_v2.ts` is pinned by original raw SHA-256 `8063c2deb28fad03be778a3b3d4301863a1b069a95507b57d33fb98b75c5226b`, originally within `ONE_URAI_Foundation_R16_Storage_Generation_and_Recovery_Evidence.zip` (ZIP SHA-256 `5f9a92a21a093168f70882af08e973b5f70009b1dd44bce30b5abd5cab110809`). Original R16 source was NOT changed. Exact original compiled `dist/intake_v2.js` was also retained separately to avoid accidentally testing the candidate against itself.

**Reproduced negative observation #1:** R16 `IntakeV2.revoke()` calls a revocation-ledger/document mutator `markRevoked(ref)`, **then** updates the case with an independent optimistic CAS `commit(c, 'revoked')`. Injecting a case-CAS refusal after the ledger mutation produced a mismatched outcome: `revoked=true` in the source ledger, `foundationDocuments/{id}.state='revoked'`, but the intake case still `state='published'` without a `revoked` event. Repeating `revoke()` then failed at the already-revoked ledger, leaving the case/audit incomplete. The R16 `commit` also deliberately mapped `changed='revoked'` back to `state='published'`, masking the terminal status even on a no-fault path. This violates the intended idempotent, auditable revocation protocol **in the experimental code**.

**Reproduced negative observation #2:** The R16 `issue()` function's already-published branch returned a document after checking signature string identity, without requiring current nonrevoked status. After a successful revocation, it returned a `state='revoked'` document as a successful issuer response rather than refusing. Any consumer that independently verifies the full receipt could still refuse later; this observation is **not a demonstrated unauthorized live grant approval**.

Both original negative expectations were actually tested with **2/2 matching observations** on the **original R16 compiled module**, not on an inferred rewrite. These are defects in the **offline R16 proof-of-concept**, NOT proof of a deployed Foundation service issue: the checked-in `functions/src/index.ts` has no R16 intake module.

## 2. Source-derived repair and a separate Firestore-shaped adapter

A disposable R17 copy of `intake_v2.ts` (SHA-256 `3cc3b6bab37709f22b74d565e80c63e86c1681495e83f047928e04116efad717`) adds a terminal `revoked` case state, replaces multi-stage revocation with one `CaseStore.revokeAtomically` operation, requires coherent case/ledger/document state on duplicate retry, and makes the previously successful `issue()` refuse already revoked or inconsistent sources. **This port remains synchronous and is validated with an in-memory atomic fake.** It does not support actual Firestore SDK async transactions without further refactoring.

A separate **async** `firestore_revoke_adapter.ts`, source SHA-256 `7854bcc73979bd130a6866b96d59cbbea867c6ebe98b1fd995e994417563b4c6`, models an SDK-compatible structural interface for `db.doc`, `db.runTransaction`, `tx.get/update/create`. All reads occur before writes; the single four-document transaction updates:

- `foundationIntakeCases/{id}` — terminal revoked case, incremented revision, one audit-event flag and actor;
- `foundationDocuments/{id}` — revoked document state;
- `foundationEvidenceRevocations/{id}` — incremented revocation epoch and terminal revoked flag;
- `foundationAuditLogs/foundation_doc_revoked_{id}` — deterministic, append-only audit record with actor, source and epoch.

The **four collection document paths above are a proposed future integration schema**, not existing source-native Foundation schema or verified deployed collections. The callable/authorization boundary must authenticate actor role and current session before invoking this adapter. There are no KMS/signature/Cloud Storage/network side effects inside `runTransaction`. A callback rerun from a Firestore concurrency conflict therefore cannot duplicate an external side effect. A lost post-commit acknowledgement is represented by the next call observing already-revoked case+ledger+document and returning idempotently.

**Critical code-integration boundary:** the standalone sync `IntakeV2.revokeAtomically` port and the async Firestore-shaped adapter are **not wired together**. A reviewed production implementation must convert the service to an async promise API, use the real `firebase-admin/firestore` SDK types and real `runTransaction`, and test source/firewall/permissions with the emulator. Do not label this a native Firebase Functions integration or copy it to production unrevised.

## 3. Local execution, exact counts, original-byte handoff

| Executed check | Result | Scope |
| --- | --- | --- |
| Original R16 compiled fault reproduction | **2/2 expected negative observations matched** | Original compiler output, real local Node, mocked ledger/CAS |
| R17 source-derived atomic revocation tests | **11/11 PASS** | In-memory atomic adapter; source identity and issuer response; includes pre/post-commit simulated failure |
| R16 source-derived candidate regression suite | **47/47 PASS** | Prior full R16 focused tests, with R17 adapter fake; zero unexpected |
| Async Firestore-shaped transaction adapter | **13/13 PASS** | Deterministic transaction callback rerun, read-before-write, four-document atomic commit fake, postcommit ACK loss, conflict/absence/stale version, duplicate audit and overflow refusal |
| Strict standalone `tsc 5.8.3 --noEmit` and `tsc -p`, JS syntax check | **PASS** | Standalone modules only; `firebase-admin`, `firebase-functions`, `firebase-tools`, `@firebase/rules-unit-testing` were NOT installed |
| Clean extraction with independent per-file SHA-256, new compiler run, all four suites | **PASS** | Reproducible offline without network, no cloud/project access |

Test suites are **not statistically independent** and must not be added together as a security score. The two original R16 observations are deliberately expected misbehavior; their "PASS" means successful fault reproduction, not security acceptance. The 13 adapter tests model Firestore transaction semantics but do not run the real SDK or emulator.

**Portable R17 evidence artifact:** `ONE_URAI_Foundation_R17_Atomic_Revocation_Integration.zip`, **41,882 bytes**, archive SHA-256 `8bdb26b83cd1d696a2af7d6bce21a12fa23b4685c11679fb7913f6dd70c85c5b`, **21 ZIP entries**; `R17_MEMBER_SHA256.json` verifies all 20 other member byte counts and SHA-256 receipts. Clean extraction, TypeScript rebuild and all four test groups reran PASS. Contains original R16 compiled files, R17 source/diff/compiled JS, structural Firestore adapter, tests, TAP logs, manifest and README. The ZIP is a **conversation attachment, not stored in public GitHub** and not a signed release.

Read [official Firestore transaction rules](https://firebase.google.com/docs/firestore/manage-data/transactions): reads before writes, callbacks may retry on conflict, committed writes are atomic. Read [official Cloud Storage object preconditions](https://docs.cloud.google.com/storage/docs/request-preconditions): generation and metageneration preconditions apply to object operations, but **do not create a distributed Firestore/Storage transaction**. The R17 adapter deliberately contains no Storage side effects.

## 4. Repo-native responsibilities and limitations

The actual main source `functions/src/index.ts` Git blob `fe13ea200a9dd117ed57f1a8d1a2dec7fc127727` exports exactly four callable functions: `saveGrantApplicationDraft`, `reviewGrantApplicationVersion`, `approveGrantApplication`, `upsertFoundationProfileField`. There is currently **no source-native v2 documentary intake or revocation callable** in that file. Actual repo `functions/package.json` pins Node22, Firebase Admin `^13.10.0`, Functions `^6.6.0`, TypeScript `5.5.4`, which are **not installed in this local environment**. CI also builds Functions through its own locked dependencies. R17 standalone TS5.8.3 acceptance is not that build.

The previously verified **main-side privileged sourceRef trust gap**, **unmerged PR #60 nonfuture auth timestamp candidate**, **transitive lineage and historical approval risk**, and sensitive Firestore read-role rules remain open. No current Foundation provider project/Hosting authority, true IAM, App Check, official Firestore/Storage Security Rules runtime, real Auth claims or cross-product consent/delete chain has been verified. No UrAi private memory, RuAi clinical record, user donor data or banking material were accessed.

## 5. GitHub CI, governance and P0–P3 continuation

At start of A17, audit PR #65 remained open/draft/unmerged at `6e58b31c4201d447fd38c0aca60b2aecbe0e83ad`. Exact [Check run 42549278026](https://github.com/LifeLoggerAI/urai-foundation/actions/runs/42549278026) completed FAILURE, with job `128940994177` exposing `steps:null` and check-run metadata reporting one inaccessible annotation. It did **not demonstrate any test execution**, and the cause is not verified; do not diagnose billing/permissions or application-test failure from that metadata. This documentation commit has its **own** SHA/CI result.

- **P0 — independently reviewed source and evidence authority:** native verified document-ingestion and revocation architecture; atomic same-Firestore-database revocation case/receipt/epoch/audit transition; corrected issuer responses after revocation; authenticated signer/issuer/role and source-of-truth verification; preserve historical receipts; independent PR #60 auth-time fix review; recover runner annotation. Keep legal/fundraising/release HOLD.
- **P1 — genuine SDK/emulator integration:** refactor experimental intake to async SDK, implement real Firestore transaction and abort-on-conflict semantics; official Admin/Functions/Rules SDK tests, roles/App Check/MFA/revoked sessions, cross-transaction grant approval vs revocation races (ensure epoch reads are in *the same transaction* as approval), key compromise, Storage generation/metageneration, durable orphan recovery, 100-answer pressure and tenant/purpose isolation. Then authorized read-only provider project/IAM/hosting SHA/rollback and browser/device accessibility proof.
- **P2 — lawful organization:** current Texas SOS standing/reinstatement, constituted board and bylaws, IRS/fundraising authority, legally executed Labs/Holdings/Foundation IP/services/data agreements and money custody. Historic 15/15/15 profit allocation is not proof of payment or tax obligations.
- **P3 — public-interest assurance:** independent accessibility, responsible-AI/research/clinical review, community outcomes, consent/privacy/deletion and transparent program funding.

**Next Chalk:** read A6–A17 and the R17 ZIP `README.md`, verify its archive/member hashes, reproduce the four suites, then implement **an independently reviewed asynchronous real-SDK source branch**, not another unbounded synthetic test campaign. Do not overwrite #65 audit history, #60 engineering work, closed donation #28, Labs registry #262 or canonical main. **NO deploy, filing, payment, ownership changes, external claims or user-data access. PRODUCTION/LEGAL/FUNDRAISING HOLD.**
