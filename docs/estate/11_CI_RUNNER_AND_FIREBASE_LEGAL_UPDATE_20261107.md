# Foundation R-GENESIS-A4 — runner pre-execution and provider authority evidence

Scope: read-only GitHub Actions and previously connected source documents. No workflow edits, reruns or cloud changes.

## GitHub Actions CI — exact failed audit source
- Latest audited PR #65 exact head from source readback: `1b39610d52ab8e1ec5c99c08fe76de5c112f1866`, canonical main unchanged `8ee8036b649ae9c9e73ae374a7247f0bb34c4c03`.
- Run `42444539219`, `Check`, `pull_request`, Nov 8 2026 03:53:06Z, concluded **failure** by 03:53:10Z.
- Job `128620588641`, name `Validate documentation, standards, tests, static routes, and backend types`, started 03:53:07Z and completed 03:53:09Z; `steps: []`, `runner_id: 0`, `runner_name: ""`, `runner_group_name: ""`, labels `ubuntu-24.04`.
- Run timing endpoint reported `UBUNTU.total_ms=0`, `job_runs.duration_ms=0`, `run_duration_ms=4000`.
- Check run output exposed one annotation but the `check-runs/{id}/annotations` endpoint is not exposed by the connected GitHub fetch allowlist. Job logs were unavailable (previous fetch returned BlobNotFound). **Result: job failed without evidence of a runner executing any steps.** This supports **pre-step / runner provisioning failure** as a working classification, not confirmation of why GitHub refused to start it. Need billing/quota/permissions/UI annotation from authorized owner to determine cause. **Not evidence of failing source tests**. Do not assert CI green.
- Prior October main `Check` success and main `Deploy GitHub Pages` failure have different source/time and remain separate.

## Provider mapping evidence — read-only Google Drive, not cloud console
- `URAI Google Cloud Billing Reconciliation — 2026-09-25` (Drive doc id `1Edq25L3b_CIZo6nypO0XObqVV8lmZZQScUYSdjcAgFA`, modified 2026-09-25) lists `urai-foundation-38828874-c42a1` as a **billing-linked Google Cloud project** in a dated authenticated organizational inventory, but explicitly says its identity/authority is not established by repository evidence. Treat as documented provider lead, **not live mapped Foundation production**.
- Historical issue #10 refers to a Firebase Hosting fallback `urai-4dc1d` site ID `urai-foundation`, not repository-proven current production.
- This review has **no connected GCP/Firebase admin resource API** providing current project IAM, billing status, Hosting releases, Auth providers, Firestore/Storage Rules, Functions, App Check or runtime logs. Do not treat Drive billing list as live cloud authorization.

## Legal record confirmation — retained preparatory sources
- `URAI Foundation — Form 811 Reinstatement Packet — PREPARED UNSIGNED / AGENCY AND SIGNER GATES OPEN` (Drive id `1uRzEqGXLGwZe4CuxhwjkJqHMFDuFYTBulT8zAg_EUyQ`, modified 2026-10-08) expressly says no accepted filing receipt. It states a $5 form checkout and unresolved separate refused formation fee $25; documents competing agency-specific tax-clearance direction versus revised nonprofit Form 811 instructions. Only current official case-specific confirmation plus authorized signature/submission closes it.
- `URAI Foundation Governance Preparation Packet — NOT ADOPTED` (Drive id `1hov3WyZGmlkBPjLwwcwFHi-xaSKhS5wvkwRij8Ox7q0`, modified 2026-10-08) explicitly disclaims adoption, constituted board, officers, bank authority, federal exemption, fundraising eligibility and certification.
- A filename/packet or EIN notice is neither a received state reinstatement certificate nor a signed organizational instrument. Keep **LEGAL HOLD** and private identities/number material outside public GitHub.

## Next safe dependency
1. From GitHub authorized account, inspect exact job annotation and Actions billing/runner diagnostics without changing payment settings; retain redacted cause and run ID.
2. Read-only authenticated GCP console/API inventory of project `urai-foundation-38828874-c42a1`, historical `urai-4dc1d` hosting fallback and source-assigned functions project. Record project number, owner/IAM role (no personal identifiers), enabled resources, deployed SHAs, billing state and absent mappings. No launch, data copying or authorization changes.
3. Keep Form811 and governance actions human-authorized, not automation-driven.

Source evidence is dated and intentionally not represented as current agency/provider runtime proof.
