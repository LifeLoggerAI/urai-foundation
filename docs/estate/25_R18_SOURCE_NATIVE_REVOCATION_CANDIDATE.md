# ONE URAI GENESIS — Foundation R18 isolated source-native revocation candidate

**Review only; no production authorization.** Started from main `8ee8036b649ae9c9e73ae374a7247f0bb34c4c03`, without rebasing or modifying independent security PR #60 (`aa7bff55f9a88656a7eb067e74c2ae5de879447c`) or forensic audit PR #65. This branch does not modify `functions/src/index.ts`, create a callable endpoint, alter Security Rules or deployment settings. New module exists as an unconnected implementation candidate.

## Source and tests

- `functions/src/evidenceRevocation.ts` (12,118 bytes, local SHA-256 `4cbca94136be1ec0b72bd8851bc4fdd74e3369acbafbeda7c65e9a4dc0a86298`, Git blob `38084f8431fd6cef5fca00221dc538efc901c39e`).
- `functions/test/evidence-revocation.test.cjs` includes 35 deterministic fake-Firestore transaction contract tests. Original local unit suite **35/35 PASS**; published test source is source-equivalent with minor comment/text formatting differences, so a native exact-PR CI rerun is still required. The test path was added to `functions/package.json` via `node --test test/*.test.cjs`; production SDK tests remain included in that glob.
- Standalone strict TypeScript compiler (`tsc 5.8.3`) **PASS** for the disconnected new module. This is **not** the full pinned Foundation Functions build (`firebase-admin`, `firebase-functions`, and emulator unavailable locally).
- Re-ran existing R17 local regression suites: **2/2** intentional original-failure observations, **11/11** R17 atomic-revocation tests, **47/47** R16 candidate regression, and **13/13** Firestore-shaped adapter expectations. Counts overlap previous evidence and **do not add to a production acceptance score**.

## Proposed transaction boundary

`revokeEvidenceTransaction(db, input)` reads **four records before any writes**, then proposes **four writes in one Firestore transaction**: intake case, verified document, revocation ledger and a deterministic append-only audit receipt. It rejects case/document/ledger drift, wrong source reference, stale case revisions, v1/mismatched v2 receipt identity, changed Storage generation or document bindings, missing audit and mixed already-revoked state. It retries idempotently **only** if the original actor, request ID, time, revision, epoch, document and audit are coherent. It performs no remote signer or Storage side effects in the retryable transaction callback.

The source checks structural consistency of signed receipt metadata. **It does NOT authenticate the issuer, verify Ed25519 signatures, rehash Storage bytes or prove documentary truth.** Those require a separately approved trusted intake service, independent issuer public-key registry, KMS/IAM and immutable generation-bound Storage access. The `actorUid` and `observedAt` arguments are **not authenticated** in this disconnected module; a real callable must derive them from verified server-side identity and clock after Foundation role, token, reauthentication, MFA and App Check validation. Firebase Admin bypasses client Security Rules. The proposed four collections (`foundationIntakeCases`, `foundationDocuments`, `foundationEvidenceRevocations`, `foundationAuditLogs`) are **not yet proven deployed** or owned by an operational Foundation source-ingestion system.

## Remaining hard gates

**P0:** independently review the v2 authoritative source schema, signed issuer and document-byte admission; make revocation provenance trustworthy; integrate PR #60's future-auth guard through separate review; resolve GitHub Actions pre-run failure annotation. Current Foundation CI fails without exposed executed steps.

**P1:** with real Firebase Admin/Functions SDK and Emulator, verify exact source build, 35 source tests, authentication/App Check/Roles/Firestore Security Rules/IAM, concurrent approval-vs-revocation, issuer and evidence-source revocation, legitimate idempotency, Storage generation and key compromise. No official emulator or live Firebase project was available for R18.

**P2–P3:** preserve unexecuted nonprofit governance, Texas legal status, IRS/donations/financial authority, signed enterprise rights agreements, accessibility and public benefit assurance as separate human/independent acceptance gates.

**Review state:** R18 is an isolated unmerged engineering candidate. **No production deployment, grant submission, legal filing, payment, ownership transfer, or account changes. Production/legal/fundraising HOLD.**

Portable offline evidence ZIP: `ONE_URAI_Foundation_R18_Source_Native_Revocation_Candidate.zip` (12,153 bytes, SHA-256 `4eb62dbf124065946d5e57dddb9b881f67793e19f238b9472d29b26298feb12a`) with local test logs and input hashes.
