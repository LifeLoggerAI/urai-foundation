# ONE URAI GENESIS — Foundation R22 complete source, release, legal and governance reconciliation

**Observed 2026-11-08 America/Chicago / 2026-11-09 UTC.** Documentation-only continuation of PR #65 and R21 on this child PR #67. **PRODUCTION, LEGAL, FUNDRAISING, STAFF/GRANT RUNTIME AND CERTIFICATION HOLD.** This document is a public-safe index; complete original-byte and private execution/agency records stay in their existing authenticated sources.

## 1. Authority and history coverage

- `main@8ee8036b649ae9c9e73ae374a7247f0bb34c4c03` — 120 main files / 641,869 bytes; source not proof of a deployed build.
- Parent [PR #65](https://github.com/LifeLoggerAI/urai-foundation/pull/65) already completed all **53 frozen original surviving refs**, **481 original reachable commits**, **483 SHA-256-verified deduplicated Git blobs**, **3,080,302 bytes**, 0 prior reported blob mismatches. See [complete original-byte history receipt](13_FULL_REACHABLE_GIT_HISTORY_COMPLETION_20261107.md) and [483-blob machine ledger](manifests/FOUNDATION_ALL_ORIGINAL_REFS_483_BLOBS_SHA256_COMPLETE.json). **Do not restart this completed narrow scope**; missing/deleted refs, LFS remotes, cloud/Drive data and downloaded CI remain excluded.
- [R22 51-PR exact census](manifests/FOUNDATION_R22_ALL_51_PRS_20261109.json): **23 merged to main, 5 merged only to non-main branches, 18 closed-unmerged, 5 open/draft/unmerged**. Open #60, #64, #65, #66, #67. Nonmain merged #36/#37/#61/#62/#63 are NOT deployed-main receipts. Critically [donation PR #28](https://github.com/LifeLoggerAI/urai-foundation/pull/28) was **closed unmerged**; no Stripe source activation/verified settlements.
- [R22 56-current-name branch census](manifests/FOUNDATION_R22_LIVE_BRANCH_NAMES_20261109.json) is a new snapshot including audit/worker refs. It does not retroactively redefine the frozen original 53 refs.

## 2. New observed deployed website drift — P0

Read-only public HTTPS fetches on Nov 8 Central / Nov 9 UTC:

| Surface | Observed |
|---|---|
| `https://uraifoundation.org/` and `https://www.uraifoundation.org/` | **Squarespace “Coming Soon”** (not canonical Foundation source) |
| Apex `/status/`, `/privacy/`, `/accessibility/`, `/docs/governance-charter.md` | Squarespace “Coming Soon” |
| Apex `/sitemap.xml` | HTTP 401 from public fetch |
| `https://urai-foundation.web.app/` | **Older** formation-era informational Foundation home; current release SHA unverified |
| Historical Firebase fallback other 17 source routes | 9 additional informational routes served, **8 newer source routes 404** |
| Legacy fallback `/sitemap.xml` | 16 declared URLs, many canonicals point to the apex placeholder |

The eight verified missing fallback routes: `/status/`, `/governance/`, `/community/`, `/donate/`, `/staff/`, `/grants/`, `/security/`, `/research/global-emotional-weather/`. See [machine-readable 18-route matrix](manifests/FOUNDATION_R22_LIVE_PUBLIC_ROUTE_18_MATRIX_20261109.json). The source `firebase.json` has Node22 Functions codebase `foundation-staff` and Firestore rules/indexes but **no root project alias, Hosting target or Storage rules**. Historical Firebase site `urai-foundation` was documented under `urai-4dc1d`; named `urai-foundation-38828874-c42a1` is a registry seed. Actual project ownership, Hosting release SHA, IAM and effective Rules are NOT verified. Site fetches may be cached upstream; preserve date. No DNS/Hosting changes authorized.

## 3. Source functionality, integration, and critical grant defect

- `functions/src/index.ts` main Git blob `fe13ea200a9dd117ed57f1a8d1a2dec7fc127727` exports `saveGrantApplicationDraft`, `reviewGrantApplicationVersion`, `approveGrantApplication`, `upsertFoundationProfileField`. Protected-callable **source** exists; staff login is disabled public placeholder, public grants JS is browser-memory demo and no authenticated production grant submission/approval evidence was obtained.
- Firestore Rules main `061723cfb6edc4931624152103a35cda6283b722` default denies client writes to sensitive collections, but various sensitive reads are allowed for any `activeStaff`. Check least privilege with real Rules/emulator, effective provider IAM, purpose/tenant boundaries and server Admin SDK bypasses.
- Main privileged numeric future-`auth_time` gap remains; [PR #60](https://github.com/LifeLoggerAI/urai-foundation/pull/60) has isolated unmerged correction, exact head `aa7bff55f9a88656a7eb067e74c2ae5de879447c`. `upsertFoundationProfileField` can set caller-supplied `value`/`sourceRef` as verified without independent source read shown in that callable.
- Main grant source checks document hash/verifiedAt/fact binding **without revocation status, epoch or root/ancestor checks**. [PR #66](https://github.com/LifeLoggerAI/urai-foundation/pull/66) separately contains `functions/src/evidenceRevocation.ts` and `functions/src/grantEvidenceGate.ts` but **neither is imported into the deployed entrypoint**; structural fields do not verify signatures against trusted issuer keys, original bytes or immutable Storage generation.
- Fresh R22 local Node v22.16.0, tsc 5.8.3 archival replay: original compiled main/PR60 **8/8 expected, including six deliberately UNSAFE ALLOW outcomes** (defect reproduced, NOT security PASS), synthetic temporary injected guard **26/26**, standalone gate units **22/22**, fake transaction revocation units **35/35**, both standalone strict TypeScript checks PASS. No official Firebase SDK build/emulator/Rules/App Check/concurrency or production runtime tests.
- Nine repos with exact main `docs/FOUNDATION_INTEGRATION.md` fetched: Privacy, Admin, Content, Marketing, Analytics, Communications, Spatial, Jobs, Studio. These link to Foundation governance at apex currently showing Squarespace placeholder; documentation ≠ Foundation approval/certification, operational integration, data-sharing authority or live policy access. Ten other repos lacked this exact file path on their observed main, not proof of no Foundation references.

## 4. Governance, Texas, IRS, intellectual property and finance: evidence states

- Historical September 2026 Texas SOS record: URAI Foundation domestic nonprofit file **806421687**, Feb 2 2026 original filing, **involuntary termination effective Apr 28 2026**. No fresh official accepted reinstatement/status from a provider agency register.
- Current retained Form 811 packet **PREPARED, UNSIGNED, NOT ACCEPTED**; Sept 14 agency email confirms separate **$25 refused formation charge** plus general nonprofit **$5 reinstatement fee**. Oct 6 correspondence asks for missing $25 cure pathway. A dated SOS case-specific tax-clearance condition conflicts with current general nonprofit Form811 instructions; authorized Texas SOS/Comptroller/human counsel must resolve **before any actual filing or payment**.
- Governance/action/bylaws/policies in private Drive are **NOT ADOPTED** and do not constitute a board/officers/signing authority. Holdings -> Foundation limited technology/brand license is **NOT EXECUTED**. EIN ≠ federal 501(c)(3) recognition or deductible donations. Separate Labs/Holdings Wyoming state-standing evidence ≠ executed IP chain of title. Historical regional **15% community / 15% state / 15% national** profit distributions are proposals, not adopted financial obligations or payments.
- Foundation's intended public-benefit responsibilities: privacy and consent standards, disability and Deaf inclusion, veterans/older adults/caregivers/cognitive accessibility, nonclinical wellbeing, responsible AI, research transparency, education and community benefits. Formation draft standards/committee roles **not** an actual operational Foundation certification board, active programs, formal partners, studies/IRB, financial distributions or clinical acceptance. Foundation is distinct from Labs/RuAi/UrAi and cannot access consumer memories/patient records by brand affiliation.

## 5. CI exact-head limits

- R21 PR #67 Check run `42557062501`: FAILURE, job `128965056814`, `steps:null`. #65 `42552577001`: FAILURE, `steps:null`. #66 `42551853210`: FAILURE, `steps:null`. Root cause unknown (do not assert billing, runner or source-test cause). New R22 docs commit heads require fresh check.
- Earlier PR #60 candidate `38009775773` Check and `38009775775` visual proof SUCCESS, **not main or new branch**. Historical main Oct Check `37683147407` SUCCESS; Pages `37683147388` FAILED.

## 6. P0–P3 and permanent cross-chat handoff

**P0:** Independently review real issuer/actor/Storage auth, repair revocation checks inside BOTH grant review and approval same-database transactions plus transitive ancestors; fix profile/future-time trust; recover no-step CI annotations; human legal officer resolves Form811/payment/tax/status; owner chooses canonical host before any DNS/deploy. **P1:** native locked Firebase Admin/Functions build, Emulator/Rules/tenant/refusal/concurrency; authorized **read-only** Cloud IAM/Functions/Hosting/Storage/Auth/App Check/logs/billing and exact deployed source proof; accessibility and rollback. **P2:** actual state-accepted reinstatement, lawful board/bylaws, IRS/charity/bank/signer/related-party contracts; private licensed-asset schedule. **P3:** independent community/disability/clinical-research/finance impact and disclosure assurance.

Private full R22 report, machine evidence checkpoint, route matrix, updated next worker read-order, isolated TAP/tsc logs with SHA256 member hashes, and R21 original copies live under **ChatGPT Library `/One UrAi Genesis/Chalk Handoffs/Foundation/`**. The Foundation continuity Space links them. Canonical original Git-byte full manifest remains in PR #65, not recopied or rewritten. Next worker must re-fetch PR heads before any work, read original R19 safety defect and never equate 8 expected unsafe results to a secure pass.

**No production/cloud/DNS mutation, merge, actual filing, financial transfer, employee bootstrap, private data access, appointment, IRS status claim or certification has occurred. KEEP HOLD.**
