# ONE URAI GENESIS — Foundation A11: transitive evidence lineage and cross-grant authority continuation

**Observed:** November 8, 2026 America/Chicago (Actions timestamps roll into November 9 UTC). **Repo:** `LifeLoggerAI/urai-foundation`. **Work lane:** existing draft/unmerged forensic PR #65, `docs/foundation-genesis-forensic-20261107`. **Canonical main remains** `8ee8036b649ae9c9e73ae374a7247f0bb34c4c03`; **engineering PR #60** `aa7bff55f9a88656a7eb067e74c2ae5de879447c` remains separately open/draft/unmerged. This is source-pinned **documentation and synthetic integration testing**, not production source modification, legal authority or deployed proof.

Read [A6 complete original-ref Git inventory](13_FULL_REACHABLE_GIT_HISTORY_COMPLETION_20261107.md), [A7 legal/CI readback](14_R_GENESIS_A7_FRESH_SOURCE_LEGAL_CI_READBACK_20261108.md), [A8 original GitHub Actions ZIP validation](15_R_GENESIS_A8_ORIGINAL_ACTIONS_ARCHIVE_AND_ASSET_CLOSURE_20261108.md), [A9 initial isolated compiled+HTTP integration](16_R_GENESIS_A9_ISOLATED_BACKEND_AND_LOCAL_HTTP_INTEGRATION_20261108.md), and [A10 adversarial provenance](17_R_GENESIS_A10_DEEP_PROVENANCE_AND_RELEASE_GATE_20261108.md). **Do not repeat** already-complete original-surviving-ref scope: 53 branch heads, 481 reachable commits, 483 distinct hashed original Git blobs, 3,080,302 unique original Git bytes. Unreachable refs/cloud/Drive/legal records remain separate exclusions.

## 1. Actual reproducible execution; source identity and scope

The existing original October 2026 GitHub Check artifacts contain **unchanged compiled** `functions/lib/index.js` used in this continuation:

| Exact archived version | Compiled bytes | SHA-256 of compiled JS | GitHub Actions artifact |
| --- | ---: | --- | --- |
| main `8ee8036b...` | 25,880 | `c362b0ca80db42b2438d5f1ce8a2bba818fcd34b8aca8ca59a8cf6e545afc9e1` | `11510931447`, [run 37683147407](https://github.com/LifeLoggerAI/urai-foundation/actions/runs/37683147407) |
| unmerged #60 `aa7bff55...` | 26,019 | `bdeb3a0f44c57ca1fb3120de51f40d3d7cd8b36fce36c2f1afea904cd9300b6f` | `11652932822`, [run 38009775773](https://github.com/LifeLoggerAI/urai-foundation/actions/runs/38009775773) |

**R11 executable result:** `r11_lineage_and_scope.cjs` matched **64/64 recorded expectations**, 32 on each compiled source. Tests deliberately include unsafe-ALLOW observations and therefore do **not** mean 64 security conditions passed. A distinct `r11_policy_admission.cjs` compared **18 simulated controls** against a *proposed stronger fail-closed policy*: **5 conformed, 13 diverged** across the two builds. P0 engineering candidates and P1 undecided collaboration/program policies are separately labeled; **13 mismatches are not 13 proved vulnerabilities**.

In the same working environment, unchanged earlier suites were re-executed successfully within their prior scope: R9 synthetic backend **92/92** expected observations, R10 adversarial synthetic backend **74/74**, local archived-site HTTP **59/59** expected responses. These are non-independent suite counts and should **not** be summed into a system acceptance number. Historical site asset defect on main (`foundation-home.css` absent in packaged artifact, fixed in #60 candidate artifact) remains unchanged; no live deployment conclusion.

**Complete local test transport** (conversation file, not Git repo): `ONE_URAI_Foundation_R11_Lineage_Integration_Evidence.zip` — **251,036 original ZIP bytes**, SHA-256 `a233a8efc8d49026fd7250613ea6a4891990ec52a84ee34a063595b03cc89856`, **117 ZIP entries**, zero CRC faults. Each of the 116 other ZIP members is recorded in `R11_MEMBER_SHA256.json` with byte length and SHA-256. The included `R11_README.md` records exact rerun commands. The bundle inherits R10 original fixtures and supplies new executable `r11_lineage_and_scope.cjs` (SHA-256 `aa3a80ca22054528c9aca74a671cdf1818e1dd354b1ea13bc5bdcd74f547c822`) and JSON results (SHA-256 `920220f510f8ab2775dea22a1b629ad2dfe849c0676e0fef4bc078b946639ee9`), plus a strict-policy comparison script and JSON results. **No credentials, user records, bank/tax/legal originals, or production project data.**

**Evidence-grade boundary:** original compiled JavaScript executed through a deterministic Node VM with synthetic `onCall` and Firestore transaction/map interfaces. No Firebase Admin SDK runtime, official Firestore Emulator, deployed callable endpoint, real Firebase Auth/App Check token, Cloud IAM, actual client Rules evaluation, or browser acceptance was exercised. The simulation stages writes atomically on rejection but cannot prove real transaction scheduling, actual SDK method validation or concurrency safety.

## 2. New finding: transitive evidence revocation does not propagate to copied grant answers

Actual check on **both compiled versions**:

1. Seed a synthetic `foundationProfile/mission` with `state:'verified'`, value and sourceRef.
2. Writer creates grant application `source`, independent reviewer verifies, independent owner approves. Original callable creates `grantApprovals/source_v1` and approved application record.
3. Change root `foundationProfile/mission.state` to `revoked` **after** first approval.
4. Writer creates `downstream` using `provenanceType:'prior_approved_answer'` and `sourceRefs:['grantApprovals/source_v1']`; independent reviewer verifies and owner approves **successfully**.
5. A third `grandchild` application can similarly reference `grantApprovals/downstream_v1` and be approved while the original profile remains `revoked`.

This is **the primary new R11 provenance finding**: the implemented `validateAnswerProvenance` read-side guard for `prior_approved_answer` checks the immediate approval receipt metadata and referenced prior application's approved status/version/answer; it **does not traverse the underlying original profile/document source chain**. A previously approved statement is therefore eligible for new approval even when its originating evidence is invalidated by the synthetic state change.

**Positive control:** when the immediate prior `grantApplications/source.status` itself is set to `revoked`, the child review is **refused** with `failed-precondition`, leaving the new draft unchanged. Thus there is immediate prior-application status checking, not origin-level revocation propagation. Existing approvals are historical records; policy must decide what to retain, withdraw, relabel or forbid for **new reuse** after source revocation. Do not delete historical approval evidence.

## 3. Additional source-boundary findings and policy decisions

| R11 test | Observed on both compiled versions | Interpretation and action |
| --- | --- | --- |
| `foundationDocuments/record.state='revoked'` but prior `verifiedAt` remains truthy, digest string and exact `answerBindings` remain | New review and approval **allowed** | The read validator checks `sha256` nonempty, `verifiedAt` truthiness and answer binding, not a revocation state. A synthetic `state` property is **not proof of the real ingestion/revocation schema**. Define and enforce a trusted status contract first. |
| Same record with `verifiedAt=null` | New review **refused** | Confirms available immediate invalidation signal; still not a signed authenticity/digest check. |
| `grantApprovals/source_v1.state='revoked'` with unchanged approval metadata and prior application approved | New derived review and approval **allowed** | Current receipt contract does not define `state` revocation; this is a schema/policy gate, not demonstrated unauthorized write. |
| Grant writer #2 knows writer #1's application ID and expectedVersion | Writer #2 rewrites draft; `createdBy` remains #1 and `lastEditedBy` becomes #2 | There is **no per-application assignment/ownership check** in `saveGrantApplicationDraft`. Shared editing could be intentional; define assignment, role and team purpose boundaries before treating it as unauthorized. |
| Draft changes from `demo` to different `another-program`, marked `status:'closed'` and past deadline | Changed `opportunityId` recorded, version incremented; review and internal approval allowed | Question-definition binding is checked, but not opportunity status/deadline or per-program writer authority. A source-internal approval is **not funder submission**, and closure semantics require an owner policy decision. |
| Inactive reviewer, inactive approver, grant writer claiming reviewer role | Refused; rejected operations did not create approval receipts in synthetic model | Useful *positive* security controls, not full Firebase Auth/Rules acceptance. |

**Existing A9/A10 P0 still open:** `upsertFoundationProfileField` can mark a fact `state:'verified'` using a caller-provided, nonexistent `sourceRef`, and a profile used as downstream evidence is not cryptographically/documentarily anchored. Main also accepts future/non-finite privileged `auth_time` in synthetic form while #60 candidate rejects it; only independently approved integration can transfer the fix. R11's new transitive-lineage issue is **additional**, not a replacement for these defects.

The correct repair must not infer cross-product document rights: a Foundation sourceRef resembling `ruai-patients/...` does not authorize retrieval of RuAi records or UrAi memories. Protected private user data belongs behind the source service's consent and tenant boundary, and the test never contacted those systems.

## 4. Proposed integration contract (candidate, NOT adopted governance)

**P0 / evidence authenticity:** on source admission, verify the referenced authoritative record exists, matches scope, field and exact normalized value, is current/nonrevoked, has valid digest/evidence receipts and authorized human attestation. Preserve independent approval and immutable audit. For reused answers, record an immutable bounded provenance dependency graph/root document references and **revalidate a current revocation epoch** before each new grant review/approval. Detect loops/unknown roots; fail closed on missing/ambiguous sources. Do not implement unbounded recursive Firestore transaction reads or silently rewrite historical approvals. Define the policy for employee-entered narrative separately from high-stakes legal, financial or entity-status statements.

**P1 / grants and privacy:** decide whether grants are jointly editable or bound to assigned staff/organizations. Scope Firestore reads for `foundationDocuments`, `grantApplications`, `grantSubmissions`, `grantAwards`, `grantReportingObligations`, etc., according to approved purpose and record classification; current source permits any active staff role to read many collections. Decide whether closed/deadline-passed opportunities forbid *new internal drafts*, internal approval or only external submission; check read-side and write-side time semantics accordingly.

**P1 / official verification:** run source-specific official Firebase Emulator Suite with Firestore Rules SDK plus real callable SDK/App Check emulation, staff claims, revocation, role and assignment matrices, concurrent transaction tests and provenance generation+reuse+revocation scenarios. Then authorized staging with exact project ID, IAM, Functions SHA, Hosting release, Storage, Rules, rollback and device/accessibility verification. The current container has Node 22/Java 21 but no Firebase CLI or emulator JAR, and npm/GitHub DNS resolution failed; no official emulator result was fabricated.

**P2 / human legal authority:** Texas nonprofit historical involuntary termination, unsigned Form 811 packet, unadopted board/bylaws, undefined bank/IRS/deductibility/fundraising authority and unsigned Labs/Holdings/Foundation rights relationships remain separate human/agency gates. The historical 15/15/15 profit allocation remains a proposal, not actual disbursements. No legal/financial mutations performed.

**P3 / independent assurance:** external specialist and affected-community accessibility/standards review, lawful research/clinical boundaries, accountable public outcomes and donor/participant privacy before active programs/certification statements.

## 5. Exact current GitHub CI and handoff

Pre-A11 GitHub readback: Foundation draft audit [#65](https://github.com/LifeLoggerAI/urai-foundation/pull/65) still open/draft/unmerged at `9d22dfea1d5b287ae0a4cb61fcec59337df8416d`. Exact [Check run 42542481800](https://github.com/LifeLoggerAI/urai-foundation/actions/runs/42542481800) completed **failure**, with one failing job `128920277435` reporting `steps:null`, `runner_id:null`; no demonstrated source test execution or confirmed billing/permissions cause. A11 documentation commits generate new heads and require fresh separate CI readback. PR #60 remains open/draft/unmerged, so candidate improvements have **not** entered canonical main. Labs master registry [#262](https://github.com/LifeLoggerAI/urai-labs-llc/pull/262) remains a separately governed draft.

**Next Chalk:** Use A6→A11 sequentially, do not redo historical Git-byte coverage. Download original historical Actions archives by artifact IDs and verify compiled SHA-256. Run the R11 ZIP test commands, assess proposed policy violations separately from the 64 expected observations, and hand off a narrowly scoped remediation candidate through **independent review**. Get the actual check annotation/emulator/provider resource authority instead of guessing from missing runner steps. Do not merge other workers' PRs or change protected production, DNS, funds, identity, legal filing, certification or customer data.

**RELEASE DECISION: HOLD.** R11 materially strengthens isolated integrated grant provenance evidence and records explicit policy/engineering gates; it does not establish real Firebase, browser/device, legal or production GO.
