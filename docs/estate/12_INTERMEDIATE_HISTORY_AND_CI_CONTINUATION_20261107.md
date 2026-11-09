# Foundation R-GENESIS-A5 — intermediate history and CI/provider reconciliation

**Status:** FORENSIC PARTIAL / LEGAL + PRODUCTION HOLD. Documentation-only on existing draft PR #65, `docs/foundation-genesis-forensic-20261107`. Original canonical `main@8ee8036b649ae9c9e73ae374a7247f0bb34c4c03` unchanged.

## History verification advanced
- Previously established: **53 original surviving branch heads**, 481 reachable Git commit metadata entries, 320 SHA-256-hashed Git blobs across original branch-head trees (1,911,120 unique original bytes).
- The earlier 320-byte-object set is **not full reachable-history coverage**. Of the 481 original reachable commits, 51 are unique original head tips, leaving **430 non-head intermediate commits** to inspect for additional file versions.
- **24 intermediate commits inspected**: 16 recent chronological intermediate source trees plus 8 historical stratified commit-tree samples. All returned nontruncated recursive trees with matching commit SHAs. The 16 recent trees contributed zero new blob IDs; stratified samples yielded **29 intermediate-only unique Git blobs** not present at surviving branch heads.
- All **29/29 newly discovered blobs** have been fetched as immutable original bytes, checked against their Git object IDs/byte sizes, and separately SHA-256 hashed: **190,573 bytes**, zero failures.
- The verified union is now **349 unique Git blobs / 2,101,693 original bytes**. [Complete 349-object receipt](manifests/FOUNDATION_VERIFIED_349_BLOB_UNION.json); [intermediate-only queue](manifests/FOUNDATION_INTERMEDIATE_UNSEEN_BLOB_QUEUE_20261107.json); [three intermediate-tree manifests](manifests/FOUNDATION_INTERMEDIATE_COMMIT_TREES_01.json), [02](manifests/FOUNDATION_INTERMEDIATE_COMMIT_TREES_02.json), [03](manifests/FOUNDATION_INTERMEDIATE_COMMIT_TREES_03.json). Source hash receipts in [parts 01–03](manifests/FOUNDATION_INTERMEDIATE_SHA256_PART_01.json). Do not declare complete history: **406 intermediate commits remain uninspected at tree/byte level**, plus inaccessible deleted/unreachable references, any LFS data, provider objects and CI artifacts.
- Some newly recovered intermediate-only blobs are older versions of `functions/src/index.ts`, `grants/grants.js`, `tests/test_staff_backend_contract.py`, site styles, route tests and deploy scripts. The presence of a historical source file is not proof of production deployment or test acceptance. Separate model/fixture/draft from active behaviors.

## GitHub CI source-versus-runner evidence
- Audit-head run `42444539219` at SHA `1b39610d52ab8e1ec5c99c08fe76de5c112f1866` was **failure**. Exact job `128620588641`: `steps: []`, empty runner name, `runner_id:0`, started and completed in ~2 seconds, runner billing duration **0ms**; one inaccessible check annotation. This strongly supports **pre-step job or runner provisioning failure** instead of an observed source test regression; neither billing nor permissions root cause is proven. GitHub job log download was unavailable and annotation endpoint inaccessible to current connector. Do not infer source tests failed or passed. New documentation branch commits trigger more failing/pending checks; each result is exact-SHA-scoped.
- Native repo clone from container was blocked by DNS resolution of GitHub, so no independently run local build/emulator suite was produced here. Historical green CI remains source-dated only.

## Read-only Google Drive legal and provider reconciliation
- `URAI Google Cloud Billing Reconciliation — 2026-09-25` lists `urai-foundation-38828874-c42a1` as a billing-linked project, but explicitly states source identity/authority remains unestablished; this is NOT live IAM, deployment, API, Auth, billing health or resource parity proof.
- Earlier `urai-4dc1d` Firebase Hosting fallback `urai-foundation.web.app` derives from historical GitHub issue #10; no current source SHA, permission or hosting proof.
- The retained `Form 811 Reinstatement Packet` was modified October 8, 2026 and explicitly states prepared/unsigned/unfiled, outstanding file-specific $25 formation cure and $5 fee, with competing September agency tax-clearance instruction versus revised nonprofit Form 811 instructions. No agency acceptance or current state status has been independently read.
- The retained `Governance Preparation Packet — NOT ADOPTED` disclaims legally constituted directors/officers, adopted bylaws, tax exemption, bank authority, fundraising power, verified program operation and certification. EIN issuance does not grant 501(c)(3) recognition.

## Safe next actions and P0–P3
**P0:** obtain actual GitHub check annotation/billing/runner admin error read-only from authorized UI, reverify test start; remain fail-closed for private data, payment, fundraising, signers, legal filing and production.
**P1:** continue uninspected **406 intermediate Git commit trees**, deduplicate SHA-1 blobs, fetch and SHA-256 hash all newly found file versions without source overwrite. Inspect authorized project inventories for Foundation-named Firebase and historical fallback: project ID/number, IAM, actual Auth/AppCheck/Firestore/Storage/Functions/hosting revisions and billing, without copying user or staff data. Exact host DNS/TLS SHA parity and access-control negative tests remain required.
**P2:** obtain lawful external entity/board/IP/license/donation authority and documented adoption, verify privacy/research/community program claims and grant custody.
**P3:** independent accessibility/standards/community effectiveness evidence; durable transparent governance and continuity.

No legal filings, payments, operator account creation, cloud mutation, production deploy, DNS change, branch merge, donation activation, ownership claim or regulatory certification performed.
