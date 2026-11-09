# ONE URAI GENESIS - Foundation R21 current source, synthetic replay and governance receipt

**Observed:** 2026-11-08 America/Chicago / 2026-11-09 UTC. **Release status:** PRODUCTION / LEGAL / FUNDRAISING HOLD. **Scope:** additive, documentation-only source verification. No main/security/donation/provider mutation.

## Current exact Git authority

- Original Foundation main: `8ee8036b649ae9c9e73ae374a7247f0bb34c4c03`.
- Forensic [PR #65](https://github.com/LifeLoggerAI/urai-foundation/pull/65): `76c3a9ccafe5ffc3da892f15179fa88f7fd70583` before this isolated successor branch; draft/unmerged.
- Stewardship [PR #60](https://github.com/LifeLoggerAI/urai-foundation/pull/60): `aa7bff55f9a88656a7eb067e74c2ae5de879447c`; draft/unmerged, source/auth-time repair not on main.
- Evidence revocation/read-gate [PR #66](https://github.com/LifeLoggerAI/urai-foundation/pull/66): `76be3180284138cd80af334e6ced3e373b8e493a`; draft/unmerged; both modules unconnected to shipping `functions/src/index.ts`.
- Cross-system [Labs PR #262](https://github.com/LifeLoggerAI/urai-labs-llc/pull/262) remains review-only. Re-fetch all heads before next work.

Do not repeat completed original-ref source inventory. Existing canonical [history receipt](13_FULL_REACHABLE_GIT_HISTORY_COMPLETION_20261107.md) and [full per-blob registry](manifests/FOUNDATION_ALL_ORIGINAL_REFS_483_BLOBS_SHA256_COMPLETE.json) prove within their scoped prior audit: 53 original surviving branch heads, 481 reachable distinct commits, 483 SHA-256-verified unique Git blobs, and 3,080,302 deduplicated original bytes. This continuation **read back and parsed** the 483-row manifest (GitHub blob `43db3771f50d7df0c74c2573a0daaf8e301fd7ec`); it did not rehash each underlying original object anew. Excludes lost refs, LFS remotes, CI bundles, cloud objects and private legal originals.

## Reproduced high-priority integration gap

Main `functions/src/index.ts` Git blob `fe13ea200a9dd117ed57f1a8d1a2dec7fc127727`: grant `reviewGrantApplicationVersion` and `approveGrantApplication` call `validateAnswerProvenance`; document validation checks source hash, verification time and fact binding, **not revocation state/epoch/current issuer lineage**. Unmerged PR #66 adds an independent structural revocation transaction and grant evidence gate; **neither is invoked by the callable entrypoint**.

From the original preserved R18/R19 private test archive (no customer or clinic data), fresh local replays on **Node v22.16.0 / TypeScript 5.8.3**:
- R19 original compiled main/PR60 grant handlers: **8/8 expected observations**, including **SIX deliberately unsafe ALLOW outcomes**. This is bug reproduction, **not eight secure passes**.
- R19 transient synthetic guard differential: **26/26 expected**; not shipping source.
- R19 separate structural guard units: **22/22 PASS**.
- R18 isolated revocation contract after standalone TS compilation: **35/35 PASS**.
- Two standalone strict TypeScript noEmit checks: PASS. No official Firebase Functions/Admin locked build, Auth/Rules/Firestore emulator, real issuer/KMS/Storage generation proof, or production exploitation/acceptance was performed. Do not aggregate overlapping synthetic counts into a security pass.

**P0 engineering:** Independently review issuer/root document byte trust, verify actor/role/App Check/MFA and source-ref authority, then integrate approved evidence epoch and transitive ancestor guards **inside both review and final approval transactions**, with concurrent revocation and true native Firebase emulator tests. Keep PR #60's future-`auth_time` fix separately reviewed. Main `upsertFoundationProfileField` also merits provenance review: privileged caller-supplied `value`/`sourceRef` is marked `verified` without an independent evidence-source read shown in that callable.

## Fresh CI limitation

- PR #65 head Check run `42552577001` -> FAILURE, job `128951201736` returned `steps:null`.
- PR #66 head Check run `42551853210` -> FAILURE, job `128948955429` returned `steps:null`.
- Failure origin **UNKNOWN**; no executed steps means neither app-test regression nor runner/billing theory is proved.
- Prior PR #60 Check `38009775773` and Visual `38009775775` succeeded on **that unmerged head only**. Main October Check `37683147407` succeeded; Pages run `37683147388` failed. No CI run supplies current production-host parity.

## Foundation identity, public website and Firebase boundary

- Texas Foundation: dated SOS evidence file `806421687`, originally formed 2026-02-02 and historical involuntary termination 2026-04-28. **Form 811 prepared/unsigned/unaccepted**; no fresh state readback. Current filing/fee/tax-clearance route must be resolved by authorized human and agency. Board, adopted bylaws/officers, IRS tax-exempt/deductibility, bank, fundraising, live grants, and executed Holdings/Foundation license remain UNVERIFIED.
- Labs LLC commercial steward of consumer UrAi / professional RuAi; Holdings LLC intended rights custodian; Foundation intended separately governed public-interest institution. Not a shared treasury, rights assignment, board, or permission to read private customer or clinical records. Historic 15% community/15% state/15% national profit shares remain **proposals**, not recorded payouts or adopted charity obligations.
- Source-only website has 18 listed informational routes, demo `/grants/`, disabled `/staff/`, informational `/donate/`; closed unmerged Stripe [PR #28](https://github.com/LifeLoggerAI/urai-foundation/pull/28) is NOT an active checkout.
- Main `firebase.json` has Node22 `foundation-staff` codebase/Firestore config, but no root project alias, Hosting target or Storage rules. `urai-foundation-38828874-c42a1`, historical `urai-4dc1d` Foundation site, and `uraifoundation.org` require authorized **read-only** live provider/DNS/TLS/Hosting/Rules/IAM verification. Static `firestore.rules` denies client writes but allows some sensitive reads to any active staff; verify least privilege with native tests and exact deployed Rules.

## R21 owner queue (P0-P3)

**P0:** atomic approval-versus-revocation integration/identity and actual issuer authority; real CI diagnostics; legally authorized Texas reinstatement/fee/tax instruction verification. Keep all live surfaces and financial functions OFF.

**P1:** exact-head native Firebase Admin/Functions build, emulators, role/MFA/App Check and revoked/tenant/source-generation negative tests; live read-only Firebase/GCP bindings, current Hosting SHA/DNS/TLS/rollback; accessible device tests.

**P2:** official active-state receipt and adopted independent governance, IRS/financial/fundraising conditions, signed asset-specific intercompany contracts and approved program controls.

**P3:** independent accessibility, affected-community/clinical/research claims and financial-impact assurance with periodic transparent review.

The full R21 cross-chat report, JSON ledger and fresh test log ZIP are stored in the **private** ChatGPT Library `/One UrAi Genesis/Chalk Handoffs/Foundation/` and indexed in the Foundation Chalk Continuity Space. Source reports and manifests on the underlying audit PR remain canonical for full file/byte inventory. This addendum is deliberately public-safe: no personal agent contacts, EINs, IDs, donor/grantee records, secrets, or private legal packet bytes included.

**No merge, deploy, DNS/IAM change, signing, state filing, banking, payment, fund movement or source role activation. HOLD.**
