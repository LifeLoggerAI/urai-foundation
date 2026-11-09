# ONE URAI GENESIS — Foundation original-head forensic receipt
**As-of:** November 7, 2026 (America/Chicago); artifact writes can appear November 8 UTC. **Status:** EXACT ORIGINAL BRANCH-HEAD BYTE COVERAGE COMPLETE / ORIGINAL-REF REACHABLE COMMIT METADATA COMPLETE / INTERMEDIATE TREE-BYTE + EXTERNAL LEGAL/PROVIDER/RUNTIME HOLD.
**Canonical unchanged main:** `8ee8036b649ae9c9e73ae374a7247f0bb34c4c03`. **This documentation-only PR:** #65 on `docs/foundation-genesis-forensic-20261107`. Do not merge without review and do not replace other workers.

## A. Coverage receipt — do not understate or overstate
| Evidence class | Actual result | Boundary |
| --- | --- | --- |
| Canonical-main recursive tree | 157 entries; 37 directory trees; 120 blob files; untruncated | Git-tracked, one immutable SHA |
| Main original bytes | **120/120 files**, independently SHA256 verified; **641,869 bytes** | excludes provider/artifacts/ignored |
| Original repository branch heads | **53/53 heads** (51 distinct SHA tips), recursive tree untruncated on each | excludes this newly-created audit branch |
| Original branch-head union | 4,882 file references; 153 distinct paths; 33 historical-only paths; 320 distinct Git blob IDs | no claim all intermediate versions |
| Historical branch-head-only original bytes | **200/200 unique blobs**, independently SHA256 verified; **1,269,251 bytes** | distinct from main 120 |
| All head-visible unique original bytes | **320/320 SHA256-verified Git blobs**, **1,911,120 total bytes**; 0 mismatches | one instance per Git blob SHA, reused by many refs |
| Main-reachable commit graph | **380** GitHub paged commit records; page 4 has 80; page 5+ empty | metadata, not every intermediate file |
| Non-main exclusive commit graph | **101** unique commit SHAs from 52 main...branch compares; 139 branch membership references; 0 incomplete compares | excludes audit-branch-only new documentation commits |
| Original-refs total commit union | **481 unique reachable commits** (380 main +101 branch-only) | unreachable/deleted refs not proved; commit trees not all SHA256 hashed |
| Original downloaded cloud/CI archives, LFS, Drive, provider secrets/data | Not fully audited | explicitly excluded |

## B. Machine-readable evidence
- [Complete original-branch-head byte union, 320 SHA256 records](manifests/FOUNDATION_UNION_320_SHA256_COMPLETE.json).
- [Main 120 hashes](manifests/FOUNDATION_MAIN_120_SHA256_COMPLETE.json).
- [Historical 200 hashes](manifests/FOUNDATION_HISTORY_200_UNIQUE_SHA256_COMPLETE.json).
- [Seven original-head recursive tree manifests](manifests/FOUNDATION_HISTORY_BRANCH_TREES_01.json), numbered 01 through 07.
- [Cross-branch path union and 33 historical-only paths](manifests/FOUNDATION_BRANCH_UNION_AND_HISTORICAL_ONLY_20261107.json).
- [Original-ref 481 commit metadata union](manifests/FOUNDATION_ALL_ORIGINAL_REFS_481_COMMIT_UNION.json).
- [52 branch-vs-main compare details](manifests/FOUNDATION_COMPARE_MAIN_BRANCH_01.json), numbered 01 through 06.
- [Exact main 380 commits](manifests/FOUNDATION_MAIN_REACHABLE_COMMITS_PAGED_20261107.json).
GitHub file content fetched as base64 from immutable refs; decoded original bytes matched Git blob object ID and Git tree length, SHA-256 calculated with NIST-tested implementation. A Git blob SHA is Git's content identifier; the separately recorded SHA-256 reflects actual byte reads. Original intermediate reachable commits may contain blobs absent from every surviving branch tip; these are not captured in the 320 hash union.

## C. Historical differences that must stay distinct
- Public early Foundation web and governance routes, separate former `public/` site, `foundation-webapp-preview-v1` and June 2026 Firebase Hosting fallback are historical systems. They do not prove today's custom-domain deployment.
- Grant concierge UI #23 and protected staff-backend #27 are distinct; #27 is **merged source**, but Firestore/Auth/AppCheck/IAM/deployed staff runtime remain unverified.
- Foundation Stripe donations #28 is **closed unmerged**; historical `functions/src/donations.ts`, `functions/src/donation-status.ts`, `docs/donation-backend-contract.md`, `donate/thanks/index.html` exist on that branch but are not main/runtime.
- Stewardship/auth timestamp/capture repair #60 remains **open/draft/unmerged**, head `aa7bff55f9a88656a7eb067e74c2ae5de879447c`. Source-level green checks do not transfer to main. Main's privileged authentication timestamp validator does not reject numeric future timestamps.
- At least one outreach correspondence document remains in historical public Git object/source paths after subsequent public source privacy cleanup; old Git objects require separate disclosure/privacy review. Do not propagate personal contact text or present prospective persons as appointed council members.
- Main `PRODUCTION_STATUS.md` retains a September-era audit-start baseline, whereas October main Check success, Pages failure and newer branch checks must be considered separately; retain dates rather than edit history into a false latest-success narrative.

## D. Website, privacy, backend and payment truth
Main static pages exist for public status, standards, governance, community, accessibility, Deaf inclusion, wellness, research, partners, privacy, terms, contact, staff and grants. `privacy/index.html` states no public forms, analytics, cookies or payments **in the static source** and properly warns host/email/GitHub technical processing remains separately unverified. `staff/index.html` has disabled login; `grants/grants.js` uses browser-memory demonstration, local draft approval wording and export disclaimers, not a secure signature or funder submission. `donate/index.html` is information/mailto, not active checkout.
Firebase `firebase.json` contains Node22 Functions codebase `foundation-staff` and Firestore rules/indexes; no project/Hosting target. Discovery candidates `urai-foundation-38828874-c42a1` and historical `urai-4dc1d`/site `urai-foundation` remain distinct unverified leads, not an authorized repository binding. Main source Firestore disallows client writes to staff/grant authority; elevated Functions calls depend on verified staff claims, exact role/doc, App Check and transaction rechecks. No live employee IDs, current IAM, Storage rules/vault, revocation, real consent or external grant submission verified.
Noteworthy code-review gate: `upsertFoundationProfileField` accepts privileged `sourceRef` and caller-provided value as verified, without a separate authoritative source read in the shown callable; evaluate provenance integrity in isolated tests before creating approved canonical Foundation claims. Do not infer an exploitable deployed vulnerability from undeployed source.

## E. Legal and finance evidence classification
**Dated source assertions, not fresh state registry readback:** Texas URAI Foundation filed February 2, 2026, file 806421687, historical involuntary termination effective April 28, 2026. Form 811 packet is prepared/unsigned/not accepted. State-specific $25 refused-formation-charge cure and Form 811 fee and nonprofit tax-clearance instruction conflict require a current authorized Texas SOS response. EIN issuance is not federal 501(c)(3) recognition.
Board, bylaws, officers, independent review, adopting resolutions, donor tax deductibility, authorized fundraising, bank settlement, signed IP/trademark licenses, grant program operation, clinical or academic affiliation and standards certification remain **NOT PROVEN**. Texas and Wyoming state-source dates must be preserved independently; state standing is not executed chain of title. Founder-to-Holdings-to-Labs transfers and Foundation technology licenses need asset-scoped executed evidence. The Foundation is not a Labs product subdepartment and is not the UrAi in-app Council.
Historical 15% community /15% state /15% national profit-allocation ideas are **unexecuted proposals in this review**; not guaranteed payouts, Foundation grants or audited financial liabilities.

## F. CI and external proof
Canonical October main Check run `37683147407` SUCCESS; Pages `37683147388` FAILED. PR #60 exact-head Check `38009775773` and Visual Proof `38009775775` SUCCESS on its own unmerged candidate. New documentation PR #65 has multiple November 8 UTC Check **FAILURE** reports. Retrieved job metadata on run `42444260182` has zero accessible steps/log URL, and log download returned 404 BlobNotFound: **cause unknown**. Do not describe as a test regression, billing block or green native build without logs. Direct public web reads of canonical domain and historical Firebase fallback were unavailable in this audit; that is not proof either site is down. No live custom-domain SHA/canonical routing/TLS/application logs/rollback parity or Firebase resource permissions verified.

## G. P0–P3 next work
**P0:** privileged-auth future-time and canonical-profile provenance review/isolated refusal tests; obtain CI start/log failure evidence; keep Stripe/fundraising/employee/auth/data inactive; canonical hosting selection and authorized provider readbacks; Texas Form811 cure/status determination by legally authorized humans.
**P1:** inspect exact historical intermediate trees/blobs for all 481 retained commits, detect LFS/ignored/deleted assets; provider read-only inventory of both Foundation-named Firebase projects; verify DNS/TLS/deployed host artifact hashes, role revocation, App Check, Storage, deny-by-default grant flows, accessibility.
**P2:** independent constituted governance and conflict review, official tax and organizational records, legal rights chain and Foundation/Labs/Holdings contracts, research/beneficiary/partner acceptance evidence, accounting and grant award custody.
**P3:** independent external standards/accessibility/community program assurance, sustainable non-extractive financing, public impact reviews and long-term governance/continuity.

**No legal filing, account creation, cloud deployment, DNS edit, payment, fund transfer, ownership transfer, or public certification is authorized by or performed through this document.**
