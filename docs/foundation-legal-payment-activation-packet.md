# URAI Foundation Legal and Payment Activation Packet

Status: operator/reviewer packet. This document records decisions and evidence; it does not establish any legal, tax, charitable, banking, or payment fact.

## Release boundary

Keep `FOUNDATION_DONATIONS_ENABLED=false` until every required decision below is completed by the named authority and linked to authoritative evidence. A repository, domain, Foundation name, Stripe account, or successful test transaction is not evidence of formation, good standing, exemption, donation deductibility, or fundraising authorization.

URAI Labs LLC, URAI IP Holdings LLC, and any formation-stage URAI Foundation organization must remain separate. Do not use one entity's bank, processor account, tax language, assets, staff authority, or contracts for another without signed legal/accounting authorization.

## Authority decisions

| Decision | Required authority | Evidence to attach | Recorded outcome |
| --- | --- | --- | --- |
| Exact legal name, jurisdiction, formation date, and status | Counsel or authorized entity officer using filing authority | Filed certificate and current official registry/good-standing record | Pending |
| Authorized officers/directors and approval thresholds | Board/authorized organizer and counsel | Executed resolutions, bylaws/operating records, conflict disclosures | Pending |
| Federal/state tax treatment | Qualified tax counsel or accountant | Determination/filing records and written treatment memo | Pending |
| Whether contributions may be described as deductible | Qualified tax counsel | Approved exact public and receipt wording | Pending |
| Fundraising registrations/reporting | Counsel familiar with every solicitation jurisdiction | Registration records or written exemption/filing analysis | Pending |
| Payment-receiving entity | Authorized governing body plus accountant | Resolution naming entity; EIN/account evidence | Pending |
| Stripe account owner and administrators | Authorized entity officer | Stripe account read-back showing legal owner and approved admins | Pending |
| Settlement bank | Authorized entity officer plus accountant | Bank ownership read-back and approved payout destination | Pending |
| Refund/dispute policy | Governing body, counsel, and accountant | Approved policy and accounting treatment | Pending |
| Donor privacy/retention | Privacy/legal reviewer | Approved notice, retention schedule, deletion/hold boundaries | Pending |
| Acknowledgement/receipt language | Counsel and accountant | Versioned approved templates | Pending |

## Technical activation evidence

Record every result against one exact Git commit, protected environment, Firebase/GCP project number, Cloud Functions revision, Stripe test account, and redacted timestamped evidence bundle.

| Control | Required proof | Result |
| --- | --- | --- |
| Default deny | Checkout refuses while activation flag is false or entity/disclosure config is missing | Pending |
| Runtime identity | Protected WIF/ADC principal and least-privilege IAM read-back; no long-lived deploy key | Pending |
| Secret handling | Secret Manager bindings and access audit without printing secret values | Pending |
| App Check | Valid client allowed; missing/invalid token denied | Pending |
| Webhook signature | Valid signed event accepted; missing/invalid signature denied | Pending |
| Idempotency | Same Stripe event delivered repeatedly produces one effective ledger result | Pending |
| One-time lifecycle | checkout → settlement; failure; partial/full refund | Pending |
| Recurring lifecycle | start → paid invoice; failed invoice; cancellation | Pending |
| Disputes | opened → updated → won/lost/closed with audit-visible state | Pending |
| Payout reconciliation | payout event matched to Stripe balance transaction, bank settlement, and accounting entry | Pending |
| Out-of-order/retry recovery | delayed and reordered test events converge without corrupting intent/ledger state | Pending |
| Monitoring | alert fires for function/webhook/payment/payout failure and links to runbook | Pending |
| Backup/restore | Firestore backup and isolated restore verified | Pending |
| Rollback | distinct prior revision restored and activation remains fail-closed | Pending |
| Cleanup | synthetic donors, exports, receipts, and test records removed under retention policy | Pending |

## Approval record

The following approvals must identify the reviewer, role, date, exact document version, scope, and exceptions. Repository authorship or automated review is not independent approval.

- Entity/governance authority: Pending
- Tax/fundraising language: Pending
- Accounting/settlement design: Pending
- Privacy/data retention: Pending
- Independent security review: Pending
- Production activation authority: Pending

## Final operator command boundary

Only after all rows are evidenced and approvals are recorded may an authorized operator configure the verified receiving entity, approved disclosure version, protected Stripe secrets, registered webhook, and finally set `FOUNDATION_DONATIONS_ENABLED=true` through the protected deployment path. Preserve provider read-back and rollback receipts. If any evidence expires, conflicts, or cannot be reproduced, leave donations disabled.

## Source-integrity repair — 2026-09-03

The staff-backend source inherited by this branch contained an accidental duplicated source fragment inside the grant-provenance reference validator. The malformed successor failed Cloud Functions TypeScript compilation and was not treated as valid evidence. The duplicate fragment was removed without weakening the provenance rule; the validator still requires each authoritative reference to match its allowed collection path. This donations branch also records the repaired staff-backend commit as a merge parent so the stack remains auditable. Fresh exact-head CI is required; prior failed or predecessor runs are not transferable.
