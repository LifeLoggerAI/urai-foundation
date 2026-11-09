# ONE URAI GENESIS — Foundation R23 trust-boundary, grant-pipeline, cloud and legal read-first handoff

**Observed:** 2026-11-08 America/Chicago / 2026-11-09 UTC. **PRODUCTION / LEGAL / FUNDRAISING / STAFF-BACKEND / CERTIFICATION HOLD.** Documentation-only continuation on existing draft PR #67, **based on forensic PR #65**, not a production source change.

## Canonical evidence precedence and preserved original history

- **Shipping source:** `main@8ee8036b649ae9c9e73ae374a7247f0bb34c4c03`. Main tracked 120 source blobs and 641,869 original bytes.
- Parent [forensic PR #65](https://github.com/LifeLoggerAI/urai-foundation/pull/65) already completed original-surviving-ref reachable history: **53 frozen original branch heads, 481 commits, 483 individually SHA-256 verified Git blobs, 3,080,302 distinct bytes**. Read [full source history receipt](13_FULL_REACHABLE_GIT_HISTORY_COMPLETION_20261107.md) and [original 483-blob manifest](manifests/FOUNDATION_ALL_ORIGINAL_REFS_483_BLOBS_SHA256_COMPLETE.json). Do not restart completed scoped byte forensics. Lost/deleted/unadvertised refs, LFS, private Drive, CI artifacts and cloud storage excluded.
- [Current 51-PR census](manifests/FOUNDATION_R22_ALL_51_PRS_20261109.json): **23 merged to main; 5 only merged to non-main (#36/#37/#61/#62/#63); 18 closed unmerged; 5 open/draft (#60/#64/#65/#66/#67)**. Closed-unmerged donation [PR #28](https://github.com/LifeLoggerAI/urai-foundation/pull/28) is NOT shipping Stripe. [56-branch-name snapshot](manifests/FOUNDATION_R22_LIVE_BRANCH_NAMES_20261109.json) includes newer worker refs, not a revision of the original 53-ref freeze.
- [PR #60](https://github.com/LifeLoggerAI/urai-foundation/pull/60) is separately owned security/stewardship candidate, observed SHA `aa7bff55f9a88656a7eb067e74c2ae5de879447c`; [PR #66](https://github.com/LifeLoggerAI/urai-foundation/pull/66) is separately owned **unconnected** evidence-revocation contract, observed `76be3180284138cd80af334e6ced3e373b8e493a`. Neither is merged to `main`. Refresh all exact heads before work.

## NEW R23: source-to-published-site complete route/asset comparison

Read-only original GitHub blob inspection of the static publication allowlist and all 18 HTML route files:

| Source | Published-file allowlist | HTML routes included | Root-relative refs scanned | Unresolved publication targets |
|---|---:|---:|---:|---:|
| **main** `8ee8036`, builder blob `285eeb9ea5e6a14e705338a2ef758b6913a1f843` | **42** | **17/18** | **298** | **3** |
| **PR60** `aa7bff5`, builder blob `39cbe32cbfcd1c30d031ac62aeff38a7f0fad834` | **44** | **18/18** | **300** | **0** |

Main missing targets: `/foundation-home.css` used on home and governance (two broken references), and missing `research/global-emotional-weather/index.html` linked from research. PR60 already has the two missing allowlist entries. **Do not duplicate the fix** or claim it has deployed: this is source graph consistency, not a built or hosted artifact.

R22 observed actual `uraifoundation.org` and `www` show **Squarespace Coming Soon**, and `urai-foundation.web.app` serves older content (ten of 18 main source route paths return historical informational content; eight newer source routes 404). Exact deployed host release SHA/IAM/project/rollback unknown. [Detailed 18-route ledger](manifests/FOUNDATION_R22_LIVE_PUBLIC_ROUTE_18_MATRIX_20261109.json).

## NEW R23: additional original-source synthetic trust-gap confirmation

Main `functions/src/index.ts` Git blob `fe13ea200a9dd117ed57f1a8d1a2dec7fc127727`; PR60 `index.ts` blob `e5d7af4bca2b605168b5961f9240cb3ca5d93b3f`. Fresh `node --test` synthetic replay on Node v22.16.0, 10/10 **expected observations** with archived hash-pinned compiled main/PR60 fixtures, 0 test harness failures:

- On **both main and PR60**, a non-document-backed `employee_entered` answer with no source references can be promoted to verified and ultimately approved; **policy/authority gap when the factual claim requires documentary evidence**, not proof all human-entered facts are prohibited.
- On **both main and PR60**, `upsertFoundationProfileField` can mark a privileged caller's `value` and nonexistent `sourceRef` verified, with no independent source read in the callable.
- **main** accepted a future-dated numeric `auth_time`; **PR60** correctly refused it (unmerged repair).
- Missing MFA and generated provenance were correctly denied on both branches (positive controls).
- Prior R19 revocation reproduction was 8/8 **including six deliberately unsafe ALLOW** outcomes; PR66's structural read-side guard remains **unconnected** to actual review/approve callables. PR66 guard also intentionally leaves `employee_entered` under separate human policy. Experimental 26/26, guard 22/22, revocation 35/35 are isolated synthetic results.

**Never call 10/10 or 8/8 a security certification**. No official Firebase Functions/Admin installed locked build, native emulator, Rules/IAM, cryptographic issuer verification, immutable Storage generation or production revocation-vs-approval race executed. P0 integration needs trusted source byte/issuer and actual user role/App Check/MFA, real profile authority, same transaction revocation epoch + ancestor validation for **both** review and final approval, and independent tests.

## NEW R23: real internal Foundation grant workflow and duplicate Drive ledgers

Two native private workbooks with identical title are **distinct versions**: updated working copy (last modified Aug17 02:35 UTC) has **62 opportunities: 58 identified + 4 packets in preparation**, older version (modified Aug17 02:05 UTC) has all 62 identified. Within six tabs A1:Z120 there are 59 Pipeline and 21 Packet Checklist differing cells. All 62 in the updated workbook say **Not Authorized** for submission. Advisor signoff log has zero entries; no submission dates, approval dates or award IDs. Separate Drive stage folders for Advisor Ready, Approved, Submitted and Awards returned zero direct files. Three working packets exist for NSF pitch and PCORI Capacity Building/Convening LOIs; their source docs explicitly mark **NOT SUBMITTED**. Applicant SAM/UEI/Research.gov and PI/authority remain unverified. The PCORI Fall2026 LOI deadline **Oct1 2026 passed**; future full application invitation-only. These are **internal grant/portal observations**, not an audit of external grants or funds. Private document IDs, applicant details and source narratives retained **only in private Library/Drive**, not in this public PR.

## NEW R23: Foundation institutional Drive and cloud authority

- Private Foundation Drive root has **13 documented subfolders**. Board, Minutes, Banking, Donations, IRS, Formation, Comptroller, Policies, Compliance and Evidence Receipts returned **zero direct listed files**; an empty folder is not proof no records anywhere. Governance contains one prepared **NOT ADOPTED** organizational action document; Reinstatement contains **PREPARED UNSIGNED NOT ACCEPTED** Form811 packet. Separate Mercury banking application is preparation-only, without proved Foundation bank/board signer authority. Human advisor council architecture/operations kit are templates; advisors are NOT elected Foundation directors.
- **Provider inventory remains NOT INSPECTED.** Firebase plugin reported installed, but no callable Firebase/GCP resource inventory tool exposed. Read-only saved browser profile attempted Google Firebase console but **run failed before starting** because its wallet was exhausted; this says nothing about project existence/permissions/billing/resources. No payment was made. Historical Sep25 Drive billing receipt lists `urai-foundation-38828874-c42a1` and `urai-foundation` as then billing-disabled; both distinct from historically documented Foundation Hosting site `urai-foundation` under `urai-4dc1d`. Do not conflate project ID, site ID, alias, dashboard name, historical billing or actual deployment.
- Latest observed Foundation R22 PR Check run `42558465642` FAILURE; parent PR65 `42552577001` FAILURE and PR66 `42551853210` FAILURE with no steps exposed. Root cause UNKNOWN. Earlier candidate PR60 green CI only proves its own historical SHA.

## Texas governance and legal HOLD

Texas domestic nonprofit original filed **February 2, 2026**, historical Texas SOS file **806421687** and last dated agency status involuntary termination effective **April 28, 2026**. Unaccepted Form 811 prepared; September 14 Foundation-specific SOS correspondence confirms separate **$25** refused original formation card charge plus **$5** standard nonprofit Form811 fee. October 6 outbound question asks how to settle the $25; no later definitive cure receipt. Current official Form811 general instruction exempts nonprofits from usual tax-clearance attachment, while earlier case-specific agency reply mentioned exemption-dependent clearance: **human SOS officer/counsel must resolve current case branch**; no filing/payment now. IRS EIN ≠ IRS 501(c)(3), current Texas active status or deductible donations. Board/bylaws/financial controls/license with IP Holdings are prepared but **not adopted or executed**; nonprofit bank, fundraising authority, certified impact and actual 15/15/15 regional payments NOT established. Foundation distinct from commercial Labs and Holdings and has no automatic rights to customer memories or professional records.

## P0–P3 next-worker owner gates

**P0** grant source/issuer/auth/provenance/revocation same-transaction integration, fix main time/profile/manual policy, recover Check null-step diagnostics, human SOS $25 and case clearance; decide one host but do not change DNS. **P1** native real Firebase SDK+Rules emulator/role/tenant/concurrency and provider **read-only** Hosting/Functions/Auth/App Check/Firestore/Storage/IAM/release/billing, public artifact SHA/rollback/device accessibility. **P2** official accepted Texas reinstatement, lawful constituted directors/board/bylaws, tax/charity, banking, related-party asset-scoped signed contracts. **P3** independent accessibility, disability/Deaf/elder/veteran/community, research, finance and public benefit review.

**Private full R23 report, machine JSON, exact test logs/fixtures and archived R22 package** are saved in ChatGPT Library `/One UrAi Genesis/Chalk Handoffs/Foundation/`, and indexed in the Foundation Continuity Space. Public PR contains only sanitized evidence pointers. **No branch merge, production code edit, provider/billing/DNS change, legal filing, grant submission, money movement, bank application, identity bootstrap or unsupported compliance claim performed. KEEP HOLD.**
