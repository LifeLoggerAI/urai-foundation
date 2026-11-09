# ONE URAI GENESIS — Foundation A13: differential handler-level provenance admission in an isolated runtime

**Observed:** 2026-11-08 America/Chicago (GitHub UTC timestamps may read Nov 9). **Repository:** `LifeLoggerAI/urai-foundation`. **Audit lane:** existing draft PR #65 `docs/foundation-genesis-forensic-20261107`. Canonical main/source is `8ee8036b649ae9c9e73ae374a7247f0bb34c4c03`; separately owned, unmerged PR #60 security candidate is `aa7bff55f9a88656a7eb067e74c2ae5de879447c`.

**Result class:** local **compiled-JavaScript-derived diagnostic specimen**, running original archived handler behavior in a Node VM with a synthetic Firestore transaction stub. **NOT** source-integrated TypeScript, Firebase Admin SDK, Firestore Emulator, Rules SDK, App Check, Cloud IAM, live deployment, clinical/financial/legal approval or release authorization. **No canonical code, legal filing, finance, provider state or other worker branch changed.**

Continue in order from [A6 original-ref Git inventory](13_FULL_REACHABLE_GIT_HISTORY_COMPLETION_20261107.md) through [A12 documentary binding & review replay](19_R_GENESIS_A12_EVIDENCE_BINDING_REPLAY_AND_PROVENANCE_ACCEPTANCE_20261108.md). The reachable original-history source inventory remains 53 original surviving branch heads, 481 reachable commit trees, 483 distinct hashed Git blobs and 3,080,302 unique original Git bytes. It should not be repeated.

## 1. Exactly what was run and how source was isolated

The following source inputs were independently preserved as actual original compiled bytes extracted from the immutable GitHub Actions Check archives:

| Test specimen | Input source/lineage | Raw compiled JS SHA-256 | Bytes |
| --- | --- | --- | ---: |
| `main/index.js` | Main `8ee8036...`; GitHub Actions artifact `11510931447` | `c362b0ca80db42b2438d5f1ce8a2bba818fcd34b8aca8ca59a8cf6e545afc9e1` | 25,880 |
| `pr60/index.js` | Unmerged #60 `aa7bff55...`; Actions artifact `11652932822` | `bdeb3a0f44c57ca1fb3120de51f40d3d7cd8b36fce36c2f1afea904cd9300b6f` | 26,019 |
| `r13_main/index.js` | Locally derived **experimental** transformation of original main compiled JS | `ee799bcb2d93186058154687852f158bc0fed4c5d5ca24269c3a21fc1d7699e9` | 32,844 |
| `r13_pr60/index.js` | Locally derived **experimental** transformation of original PR60 compiled JS | `dc89ae2498693a6cda6678723a588990461b7b78f802eae1542af007f5761e79` | 32,983 |

`r13_compile_hardened.cjs` uses exact-string/unique-occurrence transformations against the two original compiled bytes. It errors if expected source locations change. The derived code is **not** an artifact from any official Firebase/TypeScript build, and the experimental names must never be mistaken for GitHub commits or deployable release identities. The Node VM intercepts Firebase SDK module imports and supplies deterministic in-memory snapshots, `tx.get/set/update/create`, identity claims, App-Check-option metadata, and atomic synthetic staged writes.

- Actually ran `node --check` on **both** derived modules and all three R13 test/builder scripts, with no JavaScript syntax failures.
- `r13_handler_admission.cjs`: **156/156 expected observations matched**, 39 per each of the four original/derived specimens, **zero unexpected**. These include intentionally unsafe `ok` results on original code; the number does **NOT** mean 156 security protections passed.
- `r13_limits_and_residuals.cjs`: **26/26 expected observations matched**, 13 per derived specimen, including explicit expected acceptance of **fabricated but well-formed synthetic** records that the proposed design cannot authenticate. Not an all-green security score.
- Re-ran unmodified R12 archived baseline harness: **36/36** matched prior observations, including **14 intentionally unsafe-success classifications** reported by that original suite.
- Extracted the **new R13 ZIP into a separate fresh directory**, regenerated derived specimen files, reran the baseline and both R13 suites and confirmed exact derived SHA-256 equality. That demonstrates local handoff reproducibility, not production parity.

**Portable R13 test artifact:** conversation file `ONE_URAI_Foundation_R13_Provenance_Handler_Admission.zip`, **51,241 bytes**, SHA-256 `875488d0d6a8cc7f988cf3dab2015dda9976d40e29e5a66318aa6096bf347919`, **18 ZIP members**, `R13_MEMBER_SHA256.json` individually verifies the 17 other members by exact byte length/SHA-256. CRC test passed, no errors. The ZIP contains original and derived modules, builder script, actual runnable test harnesses, baseline execution log, machine JSON results and an independently readable `README.md`. It is a **conversation artifact, not a GitHub-source-file release or signed software artifact**. Next worker should use its SHA-256 receipt or download original GitHub Check archives and verify old compiled hashes.

Local reproduction commands (Node 22, no network required, from extracted ZIP directory):

```sh
node r13_compile_hardened.cjs
node --check r13_main/index.js
node --check r13_pr60/index.js
node r12_evidence_binding_and_replay.cjs
node r13_handler_admission.cjs
node r13_limits_and_residuals.cjs
```

## 2. Differential function-level findings: intended P0 controls

These experiments run the **same actual archived handler logic** plus experimental guard calls on disposable compiled-source descendants; they are stronger than a standalone `Map` policy sketch but **still not** actual deployed SDK, compiled TypeScript, Rules or Firebase Emulator proof.

| Grant integration observation | Both immutable original builds | Both local R13 derived builds |
| --- | --- | --- |
| Valid documentary `foundationDocuments` source → privileged verified profile → independent review → independent approval | Allowed | **Allowed** |
| Profile sourceRef names missing, wrong-collection, revoked, wrong-binding, malformed-digest or invalid-date documentary source | Allowed by privileged `upsertFoundationProfileField` | **Refused before profile/audit writes in in-memory transaction** |
| Cited documentary SHA-256 or verification time changed after review but binding unchanged | Approval allowed | **Approval refused by review-time fingerprint mismatch** |
| Verified profile sourceRef switched after review to a **different valid** document with identical text | Approval allowed | **Approval refused by source-identity fingerprint mismatch** |
| Verified profile sourceRef rebound to missing source | Approval allowed | **Refused** |
| Previously valid root document revoked before final approval | Approval allowed | **Refused** |
| New grant attempts to reuse approved answer whose root documentary source was later revoked | Allowed | **Refused at new child review** |
| Noncanonical prior approval receipt ID with plausible metadata | Allowed | **Refused** |
| Synthetic self-referencing approval ancestry created by trusted test fixture | Allowed | **Refused** |
| Valid prior-approved answer: origin → child → grandchild, root active | Allowed | **Allowed** |
| Two authentic documentary references for same fact | Allowed | **Allowed** |
| Human-authored `employee_entered` unsourced narrative | Allowed | **Allowed pending separate owner policy** |

The experimental guard uses a SHA-256 reviewer-visible `reviewEvidenceFingerprint` written at review and compared against a re-evaluated source graph at approval, reads current profile/document roots, checks canonical approval IDs, rejects revoked documents/receipt states, revalidates prior-approved ancestry, and limits recursion (8 depth units; 400 synthetic read nodes). It preserves already existing independent reviewer/approver, valid grant review and audit transitions in these synthetic cases. The R13 pressure suite also saved/reviewed/approved **100 direct-document** and **100 profile-backed** answers (the source's configured maximum) in both derived specimens, refused 101 answers, and refused a changed Firestore-style timestamp nanosecond component.

**Important:** from the immutable main branch the proposed derived source still permits a future-dated `auth_time`; the **PR #60-derived** version inherits #60's candidate rejection. The future-time check is separately owned by #60 and **not silently fixed on main**.

## 3. Residual fail-closed gaps — R13 is NOT safe to merge

**R13 is an admission experiment with material open issues, not a complete remediation.**

1. **Trusted ingestion and issuer authenticity:** The candidate checks a claimed SHA-256 **format and metadata binding**, not the actual documentary bytes, record issuer signature, external receipt, authorized writer, or source ingestion chain. In explicit tests a synthetic trusted writer inserted a fictitious-but-well-formed `foundationDocuments` record with `sha256:'ffffffff...'` and valid-looking verification time; **both derived variants still admitted its factual grant review and approval**. This is the highest-priority missing source-of-truth gate.
2. **Full source integration:** The derived specimen was edited at archived **compiled JS** call points; no `functions/src/index.ts` source file was changed, no TypeScript compiler/SDK build was run for the candidate, and no official Firebase Emulator, real App Check enforcement, Firestore Security Rules, IAM, real concurrency, Storage or Hosting integration was performed.
3. **Source and attestation policy:** Existing `employee_entered` narrative is still eligible without a documentary source, but what may constitute a legal, financial, regulatory, clinical or current-organization fact remains undetermined. Approval receipt `approvedBy` metadata is checked structurally, not against an independently authenticated signed issuer registry. A malicious trusted writer can potentially rewrite source receipts/fingerprints unless their own write and audit boundaries are secured.
4. **Backward compatibility and bounds:** Earlier approved applications lack `reviewEvidenceFingerprint` and will fail strict new-reuse validation until authorized migration, re-review, or a specific grandfathering policy. The proposed 8-depth and 400-node caps, multiple sources, and Firestore transaction/billing limits need SDK/emulator testing and owner policy. No 4+-generation lineage or real wide-question transaction stress was attempted.
5. **Privileges and privacy:** Current `firestore.rules` original blob `061723cfb6edc4931624152103a35cda6283b722` still permits any active Foundation staff role to read several sensitive document/application collections. No real tenant/org/record-purpose authorization, consumer UrAi memory access or professional RuAi clinical-data isolation was verified. The proposed guard **never authorizes** cross-system private memory or patient record reads.
6. **Main future-auth bug, provider and legal:** Main's `auth_time` source gap remains; PR #60 is separate/draft/unmerged. Nonprofit status, Form 811, adopted board, IRS exemption, fundraising, bank signers, IP title/licenses and 15/15/15 transfers remain independent legal/financial authority gates.

**Do not claim current production is vulnerable or protected solely from these stubs.** These tests prove deterministic source behavior under an intentionally simplified security model and are not evidence of unprivileged exploitation or an operational grant approval.

## 4. Current CI and external runtime boundary

At R13 start, Foundation PR #65 was **open, draft and unmerged** at `b2ba91688e0447204c2319ff23e1fcd9b8a84a30`; PR #60 and Labs master PR #262 remained independently open/draft/unmerged. Its exact [Check run 42546259126](https://github.com/LifeLoggerAI/urai-foundation/actions/runs/42546259126) completed **failure**; job ID `128931815392` exposed **no assigned runner / no execution steps**, with one inaccessible diagnostic annotation in GitHub check metadata. That supports a pre-execution CI blocker and does not show code tests failing or passing. The exact reason remains unverified. A13 documentation commits trigger a **new** Git head and require an independent check result readback.

No available Firebase admin/CLI/Emulator JAR or cached Firestore SDK was present; available Node 22 and Java 21 are not sufficient. GitHub/npm DNS resolution was unavailable to the local container. No verified live Firebase mapping, Firestore rules deployment, exact Functions revision, App Check, production DNS/TLS, Host rollback, real-browser or device accessibility proof was obtained in this pass. Do not equate this with a website outage.

## 5. Handoff and P0–P3 completion contract

- **P0:** Implement a real **trusted document-ingestion/issuer/byte-hash validation and revocation** flow. Port proposed proof generation + immutable review-time source fingerprint + bounded transitive lineage and canonical receipt checks to a *separately owned, reviewed TypeScript branch*; admit the PR #60 future-auth-time correction only through independent review; diagnose exact GitHub Actions runner/check annotation. Maintain production and legal HOLD.
- **P1:** On an authorized test environment with official SDK/Emulator: execute source-specific Callable/App Check/Auth, actual Firestore Rules and least-privilege role/tenant, verified documentary admission, concurrency/races, source fingerprint/revision, revoked-ancestor propagation, cyclic/fanout/depth limits, 100-answer pressure and invalid legacy approvals. Read-only audit of real Firebase projects, IAM and provider/hosting deployment SHA; then staging and physical/browser accessibility acceptance.
- **P2:** Current Texas SOS/IRS legal authority, board/bylaws/independent conflict processes, itemized signed Labs–IP Holdings–Foundation agreements, donor/grant financial authority and beneficiary-data custody. Historical proposals are not execution.
- **P3:** External independent accessibility/clinical/research/standards review, community-led public-interest governance, reliable impact/financial accounting and privacy/continuity records.

**Next Chalk:** Review A6–A13 and the exact R13 ZIP hash. Reproduce R13 in a clean Node 22 environment. Treat the **remaining forged-trusted-source acceptance** as the explicit reason not to merge the experimental patch. Complete true source-native SDK/emulator acceptance before any release. Preserve main and worker PRs #60/#28 and Labs #262. No deployment, filing, payments, secrets, accounts or production data touched. **PRODUCTION / LEGAL HOLD.**
