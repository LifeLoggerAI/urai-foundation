# Foundation verification ledger — distinct proof scopes
| Item | Exact evidence / revision | Observed result | What it DOES NOT prove |
| --- | --- | --- | --- |
| Git main tree | `8ee8036b649ae9c9e73ae374a7247f0bb34c4c03`, 157 untruncated entries | 120 blob paths, SHA-1 IDs, 641,869 Git blob-size bytes | exhaustive bytes of history/provider |
| Main source CI | https://github.com/LifeLoggerAI/urai-foundation/actions/runs/37683147407 | GitHub Check **SUCCESS**, exact main | public deployment or legal compliance |
| Main Pages run | https://github.com/LifeLoggerAI/urai-foundation/actions/runs/37683147388 | **FAILURE**, validation step passed, Configure Pages permission failure / deploy not done | no Pages production acceptance |
| PR #60 check | https://github.com/LifeLoggerAI/urai-foundation/actions/runs/38009775773 | **SUCCESS** at `aa7bff55f9a88656a7eb067e74c2ae5de879447c` | merge/production authorization |
| PR #60 visual | https://github.com/LifeLoggerAI/urai-foundation/actions/runs/38009775775 | **SUCCESS** at same candidate; PR text describes artifact pixel inspection | physical devices, deployed parity, artistic/AA acceptance |
| Staff backend PR #27 | https://github.com/LifeLoggerAI/urai-foundation/pull/27 | **MERGED** 2026-09-05, CI/review provenance reported | Firebase Auth/IAM, rules and private records actually active |
| Donation PR #28 | https://github.com/LifeLoggerAI/urai-foundation/pull/28 | **CLOSED UNMERGED**, candidate check green 33996678569 | active Stripe, donation settlement, registration, bank |
| Firebase fallback | https://github.com/LifeLoggerAI/urai-foundation/issues/10 | historical June report of site `urai-foundation.web.app` and Cloud Shell smoke | latest SHA, cloud ownership, current DNS, live function |
| Legal status | restricted Form811 preparation Drive doc; public `README.md` | historical Texas file 806421687; involuntary termination April 28, 2026 reported | a *fresh* Texas SOS lookup or accepted reinstatement |
| IRS EIN | restricted records summarizing retained IRS CP 575-E | EIN issuance reported | 501(c)(3), donations deductible, active state status |
| Governance | public charter and Drive preparation package | authored templates | adopted bylaws, seated board, authorized officers |
| Holdings/Labs | dated Oct 6 Wyoming certificate references in Drive | dated certificate evidence reported | signed IP assignment/license, Foundation control |

Main trust level: **source metadata inventoried + selected substantive files semantically reviewed; main CI reported success; deployment FAILED**. Nonproduction candidate proof must remain pinned to its own SHA. No local checkout/emulator/cloud console/device suite executed in this reconciliation. No production-site provider-parity or exact live privacy controls verified.

Source details: `functions/src/index.ts` main tests `auth_time` only numeric and no more than 5min old using `now - authTime > 300`: future-dated numeric timestamps are not rejected; documented repair in unmerged PR #60/#63. `upsertFoundationProfileField` writes `state:'verified'` from privileged request's `sourceRef` and value, but direct source authority validation is not shown in this callable; needs a scoped security review before trusted profile claims are admitted. Client write denial does not constrain elevated Admin SDK Functions. Do not infer exploitable production exposure from undeployed code.

Artifacts: historical launch-proof runbooks and audits are retained as dated reports, not re-run tests; no current downloadable archive bytes independently rehashed. Keep deployment and code acceptance separate.
