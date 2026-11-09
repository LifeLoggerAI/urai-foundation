# ONE URAI GENESIS — R19 cross-handler revocation read-side integration

**Date:** November 8, 2026 America/Chicago (GitHub timestamps may be Nov 9 UTC). **Disposition:** independently reproduced local synthetic integration defect, unconnected read-side candidate, **NOT a Firebase emulator or production repair**.

**Source identities:** canonical Foundation main `8ee8036b649ae9c9e73ae374a7247f0bb34c4c03`; existing independent security PR #60 head `aa7bff55f9a88656a7eb067e74c2ae5de879447c`. R18 revocation draft PR #66 was opened on `worker/foundation-r18-revocation-contract-20261108`. Forensic audit PR #65 remains separate. Existing shipping `functions/src/index.ts` and canonical main are **unchanged**.

## New verified bug — R18 revocation is not enforced by the original grant handlers

Executed original compiled main and #60 grant functions (historical GitHub Actions archives) and compiled R18 revocation code against the **same in-memory transactional document map**. The original grant handler's `validateAnswerProvenance` only checks the documented source SHA field, `verifiedAt`, and exact value binding; it does **not** check `foundationDocuments.state`, the revocation epoch, or the `foundationEvidenceRevocations` ledger. This is a source-level integration omission, not evidence of a deployed exploit.

**Original-handlers differential suite:** `r19_cross_handler_integration.cjs`, **8/8 expected observations matched** across both compiled versions. Six intentionally reproduced unsafe **ALLOW** cases: (1) a grant reviewed before R18 revocation can still be approved after revocation; (2) a new grant reviewed after R18 revocation can still be approved; (3) storage generation changed with same content refuses R18's revocation but grant review/approval remains open. Two positive existing controls: removing the `verifiedAt` field refuses review. An expected unsafe success counts as **defect reproduction**, not secure PASS.

## New review-only read-side candidate

Added `functions/src/grantEvidenceGate.ts` to draft PR #66, not imported from any callable or deployed entrypoint. It introduces a **structural** fail-closed, bounded, same-transaction evidence read guard for future source integration, including document/case/ledger epoch and state coherence, v2 receipt metadata and storage generation, profile root documentary origin, canonical prior-approval records, transitive revocation, ancestor-cycle refusal, max traversal depth eight and max unique reads 400. It is a structural authorization dependency, not cryptographic signature verification or document truth.

- Standalone `tsc 5.8.3 --strict --noEmit` on the candidate **PASS**.
- `r19_guard_diff.cjs` applied a transient in-memory call to the new compiled guard to *disposable copies* of both archived compiled grant handlers at the exact `validateAnswerProvenance` entrypoint. **26/26 expected differential observations matched**, including valid review/approval and correct refusal of revoked roots, changed storage generation, missing profile documents, fabricated approval cycles and revoked ancestors. This is **not a native Foundation compiled Functions artifact**.
- `grantEvidenceGate.test.cjs` in the local evidence bundle: **22/22 standalone unit tests passed**. A smaller 14-test, source-equivalent contract subset was added to `functions/test/grant-evidence-gate.test.cjs` in the review PR for the future locked-dependency build; **the exact published file's CI execution has not been verified**.
- Historical R18 source tests were also rerun locally **35/35 passed**. These tests are not independent aggregate production scores.

## Reproducible evidence

Conversation attachment `ONE_URAI_Foundation_R19_Cross_Handler_Integration.zip`, **30,870 bytes**, SHA-256 `29ecfc82d40ca1d445399564a84ff9ca4983c8a1a827e8dcca7d87b98fd003ea`; **13 ZIP entries**, of which 12 have per-file SHA-256 and byte-size receipts in `R19_SHA256_MANIFEST.json`. ZIP CRC PASS, source, original compiled handler fixtures, executable tests, logs and `R19_README.md` provided. This file is in the conversation, **not a GitHub release artifact**. Re-run with Node22 and standalone TypeScript.

## Remaining P0/P1 blockers

1. **P0 — source integration:** The main grant handlers must invoke a trusted evidence validator **inside both review and final-approval transactions**, with versioned snapshots and true revocation epoch checks that race safely against R18's four-document transaction. This new guard is intentionally **not wired**. Failure to invoke it means revocation will not prevent approval. Preserve historic approved records; block new reuse when source loses authority.
2. **P0 — authoritative trust:** Neither R18 nor R19 verifies real Ed25519 signatures with trusted issuer keys, original bytes against immutable Storage versions, competent evidence review, legal organizational truth, or authenticated signer/actor identity. Both compare stored fields only. `employee_entered` remains permitted as human narrative; high-stakes legal/financial claims need classification and approved evidence policy.
3. **P1 — native SDK and tests:** Integrate only after independent source/authorization review and Firebase Admin/Functions TypeScript exact-head build, authenticated callable role/MFA/App Check, Firestore Security Rules/Emulator, approval-vs-revocation contention, transaction read budgets, data-purpose isolation, signed v2 Storage generation and trusted ingestion. Current environment has no installed Firebase packages or official emulator, and GitHub Actions repeatedly fails **without exposed runner steps**; do not claim production CI is green.
4. **P2/P3:** Texas Foundation legal standing, constituted board, adopted governance, IRS/fundraising/financial authority and executed Labs/IP Holdings/Foundation agreements remain unverified. Independent accessibility and public-interest assurance remain open.

**Status:** PR #66 is draft, review-only and unmerged; PR #65 and PR #60 are separate. No production deployment, grant submission, legal filing, payment, data access or merge occurred. **ONE URAI GENESIS RELEASE HOLD.**
