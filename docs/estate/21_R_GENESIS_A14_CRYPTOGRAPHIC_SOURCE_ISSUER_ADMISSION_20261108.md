# ONE URAI GENESIS — Foundation R-GENESIS-A14: crypto-backed documentary admission (experimental, no production authority)

**Observed:** 2026-11-08 America/Chicago (GitHub activity may be 2026-11-09 UTC). **Repository:** `LifeLoggerAI/urai-foundation`; **audit lane:** existing draft PR #65, `docs/foundation-genesis-forensic-20261107`. **Source pin:** canonical main `8ee8036b649ae9c9e73ae374a7247f0bb34c4c03`; separate engineering PR #60 `aa7bff55f9a88656a7eb067e74c2ae5de879447c` **open/draft/unmerged**. **Disposition:** offline differential engineering experiment and documentation only. **Release and nonprofit/legal/fundraising authority remain HOLD.**

Continue from [A6 all reachable original Git tree inventory](13_FULL_REACHABLE_GIT_HISTORY_COMPLETION_20261107.md), [A7](14_R_GENESIS_A7_FRESH_SOURCE_LEGAL_CI_READBACK_20261108.md), [A8](15_R_GENESIS_A8_ORIGINAL_ACTIONS_ARCHIVE_AND_ASSET_CLOSURE_20261108.md), [A9](16_R_GENESIS_A9_ISOLATED_BACKEND_AND_LOCAL_HTTP_INTEGRATION_20261108.md), [A10](17_R_GENESIS_A10_DEEP_PROVENANCE_AND_RELEASE_GATE_20261108.md), [A11](18_R_GENESIS_A11_TRANSITIVE_EVIDENCE_AND_GRANT_SCOPE_INTEGRATION_20261108.md), [A12](19_R_GENESIS_A12_EVIDENCE_BINDING_REPLAY_AND_PROVENANCE_ACCEPTANCE_20261108.md) and [A13](20_R_GENESIS_A13_DISPOSABLE_HANDLER_REMEDIATION_ADMISSION_20261108.md). **Do not restart** the original surviving-reference Git source work: 53 original heads / 481 reachable commits / 483 original hashed Git blobs / **3,080,302** distinct original Git bytes. These are Git-reachable bytes only, not cloud assets or deleted refs.

## 1. Original compiled source and experimental TypeScript boundary

R13's two disposable compiled-JavaScript descendants were rebuilt from immutable historical original GitHub Actions archives, then augmented in *another disposable copy* with a TypeScript-compiled documentary verification function. There is **no change to shipping `functions/src/index.ts`**, no independent source PR and no official Firebase SDK/Emulator/Rules acceptance. The `functions/lib/index.js` source lineage is:

| Specimen | SHA-256 of exact compiled JavaScript | Source identity |
| --- | --- | --- |
| Original main | `c362b0ca80db42b2438d5f1ce8a2bba818fcd34b8aca8ca59a8cf6e545afc9e1` | archived `main@8ee8036...`, Actions artifact `11510931447` |
| Original #60 | `bdeb3a0f44c57ca1fb3120de51f40d3d7cd8b36fce36c2f1afea904cd9300b6f` | archived PR60 `aa7bff55...`, artifact `11652932822` |
| Disposable R13-main | `ee799bcb2d93186058154687852f158bc0fed4c5d5ca24269c3a21fc1d7699e9` | local R13 patch, **not a Git commit** |
| Disposable R13-#60 | `dc89ae2498693a6cda6678723a588990461b7b78f802eae1542af007f5761e79` | local R13 patch |
| Disposable R14-main | `cb1421dc9b94966bd1c28d76e52799e937c631a5ce02977e3d1709cb83b43d31` | local R13 plus R14 verifier hook |
| Disposable R14-#60 | `b0c4bc9413394b21cb6e7eb4e5b4f1b4ef5fc3bd0c5039daae7fc2402fb952d9` | local R13 plus R14 verifier hook |

New **`r14_document_attestation.ts`** was authored in TypeScript, typechecked with **TypeScript 5.8.3 strict/noEmit PASS** and transpiled to CommonJS using a locally available Node type declaration set. TypeScript file SHA-256 `a691510eea6207d1f1371f825894d70ab2a47f5102ffb96ad3f6e1616322841a`; transpiled JS SHA-256 `a41d4f6fb7e6e890d987c67473a26502989f5ca4b509a1f21f683130e2aa16b7`. **This is a standalone module typecheck, not the Foundation Functions TypeScript/npm build**. No Firebase libraries were installed; the existing in-memory SDK stubs provide `tx.get`, staged Firestore writes, roles and synthetic callable behavior.

## 2. What the crypto-backed experimental verifier checks

A synthetic `foundationDocuments/{id}` record must be marked verified, have a canonically encoded issuer receipt and answer binding, and point to an **actual byte sequence** in a test-only private evidence vault. The standalone TypeScript guard checks:

1. Exact canonical `foundationDocuments/{id}` identity, `verifiedAt` ISO instant, SHA-256 of retrieved documentary bytes, signed document path, signed field/value bindings, and equality of receipt versus Firestore-record fields.
2. An **Ed25519 signature** using the Node 22 built-in `crypto.verify` over a deterministic, domain-separated message. The public key must be resolved from an independent **test key registry** (not a key provided by the untrusted document), with exact issuer ID, key ID, document-attestation purpose, active status, allowed signing window and unexpired key.
3. No missing/empty/overlarge source bytes (experimental 8 MiB cap), no future-dated signed receipt, no unrecognized/invalid public-key/signature encoding, no inconsistent signed/record claims, no JavaScript prototype-key alias in canonical bindings.
4. Return a deterministic digest over the verified signed receipt, folded into R13's review-time evidence fingerprint. R13's bounded lineage evaluator then re-checks evidence at approval and when prior-approved answers are reused.

**Important distinction:** this is **real cryptographic computation on synthetic documents and ephemeral keys**, NOT a real document attested by the URAI Foundation, an agency, an approved signer or a KMS. The signing private keys are generated **only in test process memory**, not distributed. The test key registry and byte vault are synthetic. No real user, donor, employee, clinician, memory, financial account or legal paperwork was accessed or signed.

## 3. Executed and reproduced results

| Actual execution | Result | Evidence grade |
| --- | --- | --- |
| Four-way compiled-source differential: R13-main, R13-#60, R14-main, R14-#60 | **112/112 expected observations matched**, 28 per variant | Node VM compiled source-diagnostic behavior; **includes 30 deliberately unsafe R13 allows**, no production acceptance |
| Direct TypeScript-derived Ed25519/byte-identity unit tests | **25/25 passed** | Real crypto and SHA256 on ephemeral synthetic data; no authenticated Firebase |
| Standalone TypeScript strict compilation / `--noEmit` | **PASS** | Standalone verifier module only, not Foundation native build |
| R13 original differential regressions | **156/156 expected observations matched** | Previous derived-source baseline, not an independent release score |
| R13 limits/residual regressions | **26/26 expected observations matched** | Includes known unsafe/undecided cases |
| Clean extraction of R14 ZIP, rebuild both derived handlers, rerun new/old suites, verify per-file SHA-256 | **PASS** | Reproducible offline environment, no network or provider |

The R14 derived versions reject **unsigned well-formed but fabricated** `foundationDocuments` records that R13 accepted; wrong-issuer signatures; unknown/revoked/expired/wrong-purpose keys; actual-byte substitutions; missing bytes; mutated field/value bindings; mismatched document IDs; and signature/source changes after review. They retain valid signed profile/document grants, independent review/approval, legitimate prior-approved lineage, and save/review/approval of a **100-question, 100-signed-document** synthetic application. Revoking a previously trusted issuer or mutating underlying bytes also blocks **new** transitive use of approved roots in this model.

**No counts are a system security-pass metric**: the 112 includes expected insecure historical R13 behavior; all four specimens use synthetic `onCall`, Firestore, source byte vault and issuer registry; there is no live exploit or deployed enforcement claim.

**Fixture correction preserved:** the first standalone unit-test attempt returned 24/25 because its missing-bytes fixture supplied JavaScript `undefined`, triggering the fixture's default byte argument instead of truly absent bytes. Passing explicit `null` correctly represented missing bytes. The unchanged verifier then passed **25/25**; this is a test-fixture fix, not evidence of a production regression or source patch.

## 4. Portable original-byte evidence

**Conversation artifact**, not stored in Foundation Git: `ONE_URAI_Foundation_R14_Cryptographic_Provenance_Integration.zip` — **78,370 exact ZIP bytes**, SHA-256 `6a1c77c7b18169f587398a1e5ac621ae84ec45cb3c3cd77281da5becf89d3006`, **26 ZIP entries**. ZIP CRC passed and `R14_MEMBER_SHA256.json` matches every one of the other 25 member sizes/hashes. Includes original historical compiled inputs, R13/R14 derived specimens, standalone TypeScript source/transpilation, builder, differential harness, crypto tests, JSON test results, logs, and `README.md`. Fresh clean extraction re-generated R13/R14 derivatives and reran tests offline successfully.

File digests: `r14_build_candidate.cjs` `7aac968d66b21d8636c9c202df2956949f755a3aacfb59b0f818a72fcc61debb`, `r14_attestation_integration.cjs` `56aaac213326bef22c2849e5a7b3fbc33018945cfcf5c62d3470b0525995702f`, `r14_crypto_unit.cjs` `3227a85e8e697aa67f6faa3b6b8221d75bd8d2ed6e0dd3271e1202830cd17900`, `r14_integration_result.json` `8ebb2b9b590915382ca35aa02887515c19658f6873c2ea4c6f8214ce89d1f4aa`.

## 5. OPEN blockers: this cannot be merged or deployed

- **Real ingestion / actual title:** the test signer and vault are synthetic. No protected issuer enrollment, approved key custody/HSM/KMS, immutable Storage object version, content-byte collection, source ownership/consent, subject redaction, verified provenance, trust policy, revocation ledger, issuer compromise response or authoritative human review has been implemented in Foundation services. **A compromised authorized signer could still sign a false claim.** A matching SHA and signature does not prove the underlying claim is true or legally authoritative.
- **SDK/transaction feasibility:** R14's verifier synchronously retrieves private source bytes from a test `Map` during a simulated Firestore transaction. Real Firebase Storage, network bytes, Firestore transaction timing and retry rules cannot be treated as equivalent. The service needs a reviewed two-stage ingestion/immutable receipt and source-revocation architecture. 100-doc synthetic pressure is not real GCP latency, bandwidth or Firestore transaction budget evidence.
- **Source integration:** original `functions/src/index.ts` was **not modified**; the standalone TypeScript module has not been integrated into an independently reviewed native Functions source PR. App Check/Auth/IAM/Rules and official Firestore Emulator remain untested, and `firestore.rules` grants broad sensitive reads to active staff pending least-privilege policy.
- **Cross-service:** no permission to read protected UrAi consumer memories, RuAi clinical data, private Assets or donor information is conferred by signed Foundation receipts. The founder's historical 15/15/15 regional profit-allocation plan remains a proposal; no financial transfer is inferred from technical testing.
- **Historical source and CI:** main's future-dated privileged auth-time acceptance persists in R14-main as inherited; PR #60 remains unmerged and supplies its own correction. Foundation PR #65's previous Check `42547040642` failed with no demonstrated step execution; exact pre-step annotation/root cause remains unresolved.
- **Legal/institutional:** current Texas nonprofit standing, accepted Form 811, adopted board/bylaws, IRS exemption, charitable solicitation authority, banking, executive appointment and signed intercompany ownership/services/licensing remain **not proven**. No legal action performed.

## 6. P0–P3 next-worker gate

**P0 — verified issuer trust, authorizations and source integrity:** independently approve an ingestion protocol where authorized humans/services hash real source bytes, create scoped authenticated provenance receipts with restricted signing authority, atomically publish nonforgeable immutable source IDs and keep append-only revocation/compromise state. Preserve audit trail and stop silent rewrites. Admit R13 review fingerprint and transitive lineage only with this grounded trust root. Integrate #60's safe `auth_time` logic through independent source review. Diagnose GitHub runner annotation and failing check without guessing.

**P1 — native integration:** implement source-native `functions/src/index.ts`/document-ingest/Storage/Rules/KMS controls in an independently reviewed branch. Execute Node22 TypeScript build with true Firebase SDK, official Firestore/Functions emulator security tests, real callable App Check cases, role and revoked session tests, concurrent transactions, 100-answer pressure, issuer key rotation, missing/stale/forged receipt cases and beneficiary-purpose isolation. Read-only verify the actual Foundation project/IAM/Auth/Firestore/Functions/Hosting mapping before staging and web/device accessibility/rollback evidence.

**P2 — legal governance:** authorized state-status and filing/charge steps, constituted directors and adopted bylaws, actual evidence of tax and fundraising authority, independent conflict review and executed scoped Labs–Holdings–Foundation rights/data-service arrangements.

**P3 — independent public assurance:** affected-community/assistive-device testing, clinical/research claim review, public-benefit program verification, funding and privacy accountability.

**Next Chalk handoff:** use A6–A14 and the exact R14 ZIP hash; rerun `README.md` offline. **Never report a cryptographic synthetic experiment as Firebase/official agency proof or the source candidate as shipped.** Keep Foundation audit #65 in draft, original main, PR #60, closed donation PR #28 and Labs master registry #262 unchanged. No deployment, secret access, signing authority, legal filing, payment, domain, ownership, account or live data changes. **GENESIS RELEASE HOLD.**
