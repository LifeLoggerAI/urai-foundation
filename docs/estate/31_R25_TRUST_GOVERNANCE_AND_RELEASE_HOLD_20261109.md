# ONE URAI GENESIS - Foundation R25 source, governance and release HOLD receipt

**Checkpoint:** November 8, 2026 Central / November 9 UTC. **Scope:** documentation-only continuation on [audit PR #67](https://github.com/LifeLoggerAI/urai-foundation/pull/67) (child of [forensic PR #65](https://github.com/LifeLoggerAI/urai-foundation/pull/65)). **PRODUCTION, PRIVATE STAFF/GRANTS, LEGAL, FUNDRAISING AND FOUNDATION CERTIFICATION HOLD.**

## Preserved prior forensic authority (do not repeat)

- Original Foundation main **`8ee8036b649ae9c9e73ae374a7247f0bb34c4c03`**, 120 tracked files / 641,869 bytes in the original source inventory.
- Parent PR #65 contains exact source hashes and reachable object history for **53 original surviving branch-head refs, 481 reachable commits, 483 SHA-256-verified distinct Git blobs, 3,080,302 deduplicated source bytes**. This completion excludes lost/unadvertised refs, LFS, private provider objects/Drive, and deployed assets.
- Existing [PR #60](https://github.com/LifeLoggerAI/urai-foundation/pull/60) `aa7bff55f9a88656a7eb067e74c2ae5de879447c`: unmerged website/stewardship candidate, real historical CI artifact (44/44 source asset hashes, 18/18 offline HTTP routes, recorded 62 SDK/71 Python tests, 25 screenshots) independently recovered and verified in R24. This is **not production release evidence**.
- Existing [PR #66](https://github.com/LifeLoggerAI/urai-foundation/pull/66) `76be3180284138cd80af334e6ced3e373b8e493a`: isolated revocation and evidence-gate contract, not connected to the application callable handlers. No merge or conflicting implementation performed.
- The 51-PR census, 18-route public-domain matrix, current/candidate source comparison and R21-R24 reports are already under this documentation branch. Historical PR merges to non-main are not merges to production.

## NEW R25 source verification (non-production synthetic observations)

Using the **actual preserved compiled main and PR60 JavaScript**, R25 ran 12 synthetic source-handler assertions with an isolated Firestore-shaped transaction adapter. The script observed **12/12 expected outcomes with no harness failures**, including **eight intentionally unsafe acceptances** and four correctly enforced negative controls. **Never describe this test count as security acceptance.**

The following missing or incomplete authority boundaries were confirmed at source level and remain **P0 independent security review work**, not deployed-exploit findings:

1. Verified profile facts need issuer-backed source admission and independent original-evidence verification.
2. Documentary evidence must be verified against trusted bytes, issuer and current revocation status before both review and approval.
3. A downstream approval citing a prior approval must recheck transitive provenance and root revocation lineage.
4. Opportunity current status, eligibility and deadline must be enforced separately from its question schema.
5. Human-entered assertions must have explicit classification/authorization rules; they cannot silently become documentary fact.
6. The unmerged future authentication-time correction in PR60 and existing revocation helper in PR66 require normal source review, native emulator tests and protected CI; do not rebuild or bypass them.

The detailed synthetic fixtures, scenario-level evidence and test logs are intentionally retained **in the private Foundation ChatGPT Library handoff**, not in this public repository.

## Firestore client Rule read-access review

At main `firestore.rules` Git blob `061723cfb6edc4931624152103a35cda6283b722`, client writes to protected collections are source-denied. Several sensitive collections (profile/document/application/submission/award) nevertheless permit reads to **any active staff role** under the source rules. The definition of `activeStaff` includes a base `staff` role. No per-application assignment, tenant or purpose restriction is present in these specific client read conditions. This is an **explicit least-privilege design-review issue**, not evidence of unauthorized access. Current *effective deployed Rules* and server Admin SDK permissions are NOT INSPECTED. The private handoff includes the exact collection/role matrix.

## Organization, Foundation status, financing and public claims

URAI Labs LLC is the separate commercial UrAi/RuAi operating steward; URAI IP Holdings LLC is the separate intended intellectual-property custodian; URAI Foundation is the intended independently governed Texas public-interest corporation. Intent does not establish executed ownership, Foundation access to consumer memories/professional data, a charity board, adviser appointments or an actual license.

- Last dated retained Texas record for Foundation file 806421687 reported **involuntary termination effective April 28, 2026**. Current reinstatement has NOT been proved. The Form 811 packet remains **prepared unsigned/unaccepted**; bylaws, board action and intercompany license remain **unadopted/unexecuted** in inspected evidence. Current official [Texas SOS Form811 instructions](https://www.sos.texas.gov/corp/instructions/811.shtml) list the standard $5 nonprofit reinstatement fee and general nonprofit exception to tax-clearance attachment; a separate historically refused $25 formation fee and agency case-specific conditions must be reconciled by the actual authorized signer and SOS. Do not file or pay on the strength of this audit.
- IRS EIN is not proof of current federal tax exemption, donor deduction, board/banking authority, legal charitable fundraising, actual grants or completed program spending. The historic 15/15/15 regional profit distribution remains **proposal**, not adopted or paid.
- Two different Foundation internal grant workbooks tracked 62 opportunities, of which the updated copy had 58 identified and 4 preparing, all **Not Authorized** for submission in the inspected data. No internal approval/award receipts were found in scoped rows and direct stage-folder listing; external funder portals were not inspected.
- Source public demo, disabled staff sign-in and informational donation route cannot be described as a live applicant, donation or employee authentication service.
- Nine other URAI repos' `docs/FOUNDATION_INTEGRATION.md` documents describe standards alignment, not formally adopted Foundation certification or protected data-sharing rights.

## CI, Firebase, public deployment and release decision

- Current rechecked PR67 Check run for prior R24 head `a05b260a8bdbe5b4316b9bd214f2c8693d18850b`: run `42562988728`, job `128983272342`, **FAILURE, no exposed steps and no artifacts**. Root cause UNKNOWN; old successful PR60 candidate builds do not replace current independent protected CI.
- Source `firebase.json` declares Node22 `foundation-staff` Functions codebase and Firestore rules/indexes but no committed root Firebase project alias, Hosting target or Storage rules. The real Firebase/GCP project IDs, Hosting releases, Functions, Auth/App Check, Firestore/Storage Rules, IAM, billing, logs and rollback have **not been read from live provider-native APIs**. Historical billing/project/site names are not interchangeable.
- R22 public HTTP observed `uraifoundation.org`/www as a Squarespace placeholder and an older `urai-foundation.web.app` route subset, not a verified candidate deployment. R25 did not independently re-certify current host state.

### Owner-gated remaining actions

**P0:** independent security integration/issuer provenance/revocation and transitive lineage/opportunity validity, native Firebase emulator race/denial tests, CI diagnostics; authorized Texas current-status/fee/signatory resolution.
**P1:** read-only native Firebase/GCP full resource inventory and exact deployed SHA, source-pinned build, true browser/device/accessibility and rollback.
**P2:** official state/IRS/board, bank/fundraising, asset-specific signed licenses, real governance/advisor and grants authority.
**P3:** independent disability/Deaf/blind/cognitive/veteran/caregiver, research ethics and public-benefit financial assurance.

**Private full R25 machine ledger, 34-control matrix, Firestore read-role matrix, 12-test harness/logs and complete R24 original CI predecessor** are preserved under ChatGPT Library `/One UrAi Genesis/Chalk Handoffs/Foundation/`. Begin with `FOUNDATION_START_NEXT_CHALK_R26.md`, then R25 master and machine ledger. No live source, legal, financial, security or deployment mutation occurred. **KEEP HOLD.**
