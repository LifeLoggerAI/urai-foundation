# URAI Foundation Staff Backend Contract

Status: implementation contract for the protected employee grant system.

## Boundary

The public Foundation site remains a public artifact. Employee credentials, legal/tax records, banking details, grant drafts, funder credentials, supporting documents, approvals, submission receipts, and audit history belong only in authenticated private services.

No Firebase project ID, service-account key, private credential, employee email, real grant record, or donor record is committed to this repository.

## Identity and roles

Firebase Authentication is the identity authority for this slice. A user is Foundation staff only when all of the following are true:

1. Firebase Authentication is present.
2. `email_verified == true` in the ID token.
3. Custom claim `foundation_staff == true` is present.
4. Custom claim `foundation_role` is one of the supported roles.
5. `/foundationStaff/{uid}` exists.
6. The staff document has `isActive == true`.
7. The staff-document role matches the token role.

Roles:

- `owner`: bootstrap/governance authority.
- `admin`: staff/profile administration and privileged grant operations.
- `reviewer`: independent application review and approval.
- `grant_writer`: draft and review-preparation access without approval authority.
- `staff`: authenticated read-oriented employee access; future module permissions may narrow this further.

Staff records and custom claims are server/admin provisioned. Clients cannot create or elevate their own staff membership.

## Privileged-action requirements

Approval and canonical-profile verification use callable Cloud Functions with App Check enabled.

Privileged actions require:

- active staff identity;
- an allowed privileged role;
- an ID token whose `auth_time` is no more than five minutes old; and
- a Firebase token indicating a second sign-in factor.

Direct client writes cannot create approvals, submission receipts, awards, reporting obligations, staff records, canonical Foundation profile records, or audit logs.

## Collections

### `foundationStaff/{uid}`

Server-provisioned employee authorization record.

Minimum fields:

- `email`
- `role`
- `isActive`
- `createdAt`
- `updatedAt`
- `provisionedBy`

### `foundationProfile/{fieldId}`

Canonical reusable Foundation fact. One field/document keeps provenance granular.

Recommended fields:

- `value`
- `state`: `verified | confirmed | draft | missing | conflict`
- `sourceRef`
- `confirmedAt`
- `confirmedBy`
- `updatedAt`
- optional `effectiveAt`
- optional `expiresAt`
- optional `notes`

Legal status, tax status, registrations, banking, insurance, financial figures, leadership, program metrics, demographics, and partnership claims must be sourced from an authoritative Foundation record. They are never inferred from a name, domain, prior narrative, or model output.

### `foundationDocuments/{documentId}`

Metadata for a private object in the Foundation document vault. Do not store binary files directly in Firestore.

Recommended fields:

- `storagePath`
- `documentType`
- `displayName`
- `contentType`
- `sha256`
- `source`
- `verifiedAt`
- `verifiedBy`
- `createdAt`
- `retentionClass`
- optional `expiresAt`

The production Storage bucket must have deny-by-default rules matching Foundation staff authorization. Malware scanning and retention/lifecycle policies are required before arbitrary uploads are enabled.

### `grantOpportunities/{opportunityId}`

Curated record for an outside funding program.

Recommended fields:

- `funderName`
- `programName`
- `officialSourceUrl`
- `retrievedAt`
- `deadline`
- `deadlineTimeZone`
- `awardMin`
- `awardMax`
- `eligibility`
- `questions`
- `requiredDocuments`
- `submissionMethod`
- `status`
- `ownerUid`
- `nextAction`

Only authoritative program sources should determine eligibility, deadlines, award amounts, questions, or submission requirements.

### `grantApplications/{applicationId}`

Versioned Foundation application working record.

Required client-create fields enforced by rules:

- `opportunityId`
- `status`
- `version`
- `answers`
- `unresolvedCount`
- `createdBy`
- `createdAt`
- `updatedAt`

Client-created applications begin at `status = draft`, `version = 1`, with `createdBy` equal to the authenticated employee UID.

Allowed client editing states are `draft` and `ready_for_review`. Each edit increments the version by exactly one. An approved/submitted/awarded/closed application cannot be rewritten by a client.

Each answer should include:

- `questionId`
- `value`
- `state`
- `provenanceType`: `profile | document | prior_approved_answer | generated | employee_entered`
- `sourceRefs`
- `generatedByModel` when applicable
- `lastEditedBy`
- `lastEditedAt`

Generated language is always a draft. It never upgrades a factual field to verified status.

### `grantApprovals/{applicationId}_v{version}`

Immutable server-written approval for an exact application version.

Fields written by `approveGrantApplication`:

- `applicationId`
- `applicationVersion`
- `approvedBy`
- `approvedByEmail`
- `approvedByRole`
- `attestation`
- `createdAt`

Approval requires `ready_for_review`, a matching expected version, a different
application author and approver, and a non-empty `answers` array whose every
answer has a non-empty value and `state == verified`. `unresolvedCount` is a
client-facing summary only and is never approval authority.

### `grantSubmissions/{submissionId}`

Server-only evidence of an authorized external handoff/submission. A future adapter must write this only after the employee has reviewed the exact approved version and the funder's terms permit the mechanism used.

Recommended fields:

- `applicationId`
- `applicationVersion`
- `approvalId`
- `funder`
- `method`
- `submittedAt`
- `submittedBy`
- `externalConfirmationId`
- `externalStatus`
- `receiptRef`

Never store a third-party funder password in this collection.

### `grantAwards/{awardId}` and `grantReportingObligations/{obligationId}`

Track post-submission decisions, award agreements, reporting dates, deliverables, renewals, reimbursements, and closeout.

### `foundationAuditLogs/{eventId}`

Append-only server-written security and workflow history. Clients cannot update or delete these records.

## Current callable functions

### `approveGrantApplication`

- App Check required.
- Roles: `owner | admin | reviewer`.
- MFA required.
- Authentication must be at most five minutes old.
- Requires exact application version.
- Blocks unresolved facts.
- Creates immutable approval record and audit event transactionally.

### `upsertFoundationProfileField`

- App Check required.
- Roles: `owner | admin`.
- MFA required.
- Authentication must be at most five minutes old.
- Requires a `sourceRef` before a field is stored as verified.
- Writes an audit event.

## Owner bootstrap

The one-time/bootstrap command is:

```bash
URAI_FOUNDATION_FIREBASE_PROJECT_ID="<verified-project-id>" \
URAI_FOUNDATION_OWNER_EMAIL="<verified-owner-email>" \
npm --prefix functions run bootstrap:owner
```

It uses Application Default Credentials. It refuses to guess a project ID, refuses placeholder identities, requires an existing Firebase Auth user, and requires that user's email to already be verified.

After custom claims change, the employee must refresh their Firebase ID token.

## Activation checklist

Do not treat the staff backend as production-active until all of these are proven:

- [ ] Canonical Foundation Firebase/GCP project is independently identified.
- [ ] Production Authentication providers are configured.
- [ ] Employee domain/identity enrollment policy is approved.
- [ ] Initial owner identity is verified and bootstrapped.
- [ ] MFA enrollment is required for owner/admin/reviewer roles.
- [ ] App Check provider is configured and enforcement tested.
- [ ] Firestore rules are deployed and emulator denial tests pass.
- [ ] Private Storage bucket/rules exist for Foundation documents.
- [ ] Malware scanning and file-retention controls are operational.
- [ ] Cloud Functions build/typecheck succeeds.
- [ ] No raw service-account key is used for CI/CD; use federated/short-lived deployment identity.
- [ ] Staging and production are separated or otherwise demonstrably isolated.
- [ ] Monitoring and security alerts exist for auth failures, permission denials, function errors, and privileged operations.
- [ ] Backup/restore procedure is exercised.
- [ ] Staff deactivation revokes access and active sessions according to policy.
- [ ] Golden journey is proven: sign in → create draft → resolve facts → request review → MFA/re-auth → approve exact version.

## Not implemented by this slice

- Real grant-source ingestion.
- AI narrative generation/RAG.
- External funder submission adapters.
- Donation payment processing.
- Production Storage document vault.
- Automated award/reporting reminders.

Those layers must build on this authorization and provenance contract rather than bypass it.
