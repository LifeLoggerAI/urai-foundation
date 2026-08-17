import { initializeApp } from 'firebase-admin/app';
import { FieldValue, getFirestore } from 'firebase-admin/firestore';
import { HttpsError, onCall } from 'firebase-functions/v2/https';

initializeApp();
const db = getFirestore();

const RECENT_AUTH_SECONDS = 5 * 60;
const PRIVILEGED_ROLES = new Set(['owner', 'admin', 'reviewer']);

type StaffRole = 'owner' | 'admin' | 'reviewer' | 'grant_writer' | 'staff';

type AuthContext = {
  uid: string;
  email: string;
  role: StaffRole;
};

function tokenMfaFactor(token: Record<string, unknown>): string | null {
  const firebaseClaim = token.firebase;
  if (!firebaseClaim || typeof firebaseClaim !== 'object') return null;
  const factor = (firebaseClaim as Record<string, unknown>).sign_in_second_factor;
  return typeof factor === 'string' && factor.length > 0 ? factor : null;
}

async function requireStaff(
  request: Parameters<Parameters<typeof onCall>[1]>[0],
  allowedRoles: StaffRole[],
  privileged = false,
): Promise<AuthContext> {
  if (!request.auth) throw new HttpsError('unauthenticated', 'Employee sign-in is required.');

  const token = request.auth.token as Record<string, unknown>;
  if (token.email_verified !== true || token.foundation_staff !== true) {
    throw new HttpsError('permission-denied', 'This account is not an active Foundation employee account.');
  }

  const role = token.foundation_role;
  if (typeof role !== 'string' || !allowedRoles.includes(role as StaffRole)) {
    throw new HttpsError('permission-denied', 'Your Foundation role cannot perform this action.');
  }

  const staffRef = db.collection('foundationStaff').doc(request.auth.uid);
  const staffSnap = await staffRef.get();
  if (!staffSnap.exists || staffSnap.data()?.isActive !== true || staffSnap.data()?.role !== role) {
    throw new HttpsError('permission-denied', 'Foundation staff access is inactive or inconsistent.');
  }

  if (privileged) {
    const authTime = token.auth_time;
    if (typeof authTime !== 'number' || Math.floor(Date.now() / 1000) - authTime > RECENT_AUTH_SECONDS) {
      throw new HttpsError('failed-precondition', 'Re-authentication is required for this sensitive action.');
    }
    if (!tokenMfaFactor(token)) {
      throw new HttpsError('failed-precondition', 'Multi-factor authentication is required for this sensitive action.');
    }
  }

  const email = typeof token.email === 'string' ? token.email : '';
  return { uid: request.auth.uid, email, role: role as StaffRole };
}

function requireObject(data: unknown): Record<string, unknown> {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new HttpsError('invalid-argument', 'A request object is required.');
  }
  return data as Record<string, unknown>;
}

function requireString(data: Record<string, unknown>, key: string): string {
  const value = data[key];
  if (typeof value !== 'string' || !value.trim()) {
    throw new HttpsError('invalid-argument', `${key} is required.`);
  }
  return value.trim();
}

function requireInteger(data: Record<string, unknown>, key: string): number {
  const value = data[key];
  if (!Number.isInteger(value) || Number(value) < 1) {
    throw new HttpsError('invalid-argument', `${key} must be a positive integer.`);
  }
  return Number(value);
}

export const approveGrantApplication = onCall({ enforceAppCheck: true }, async (request) => {
  const actor = await requireStaff(request, ['owner', 'admin', 'reviewer'], true);
  if (!PRIVILEGED_ROLES.has(actor.role)) throw new HttpsError('permission-denied', 'Reviewer access is required.');

  const payload = requireObject(request.data);
  const applicationId = requireString(payload, 'applicationId');
  const expectedVersion = requireInteger(payload, 'expectedVersion');
  const attestation = requireString(payload, 'attestation');

  const applicationRef = db.collection('grantApplications').doc(applicationId);
  const approvalRef = db.collection('grantApprovals').doc(`${applicationId}_v${expectedVersion}`);
  const auditRef = db.collection('foundationAuditLogs').doc();

  await db.runTransaction(async (tx) => {
    const application = await tx.get(applicationRef);
    if (!application.exists) throw new HttpsError('not-found', 'Grant application was not found.');

    const value = application.data() ?? {};
    if (value.status !== 'ready_for_review') {
      throw new HttpsError('failed-precondition', 'Only applications ready for review can be approved.');
    }
    if (value.version !== expectedVersion) {
      throw new HttpsError('aborted', 'The application changed. Refresh and review the latest version.');
    }
    if (value.unresolvedCount !== 0) {
      throw new HttpsError('failed-precondition', 'Unresolved facts must be cleared before approval.');
    }

    const existingApproval = await tx.get(approvalRef);
    if (existingApproval.exists) {
      throw new HttpsError('already-exists', 'This exact application version is already approved.');
    }

    tx.create(approvalRef, {
      applicationId,
      applicationVersion: expectedVersion,
      approvedBy: actor.uid,
      approvedByEmail: actor.email,
      approvedByRole: actor.role,
      attestation,
      createdAt: FieldValue.serverTimestamp(),
    });

    tx.update(applicationRef, {
      status: 'approved',
      approvedVersion: expectedVersion,
      approvedAt: FieldValue.serverTimestamp(),
      approvedBy: actor.uid,
      updatedAt: FieldValue.serverTimestamp(),
    });

    tx.create(auditRef, {
      actorUid: actor.uid,
      actorEmail: actor.email,
      actorRole: actor.role,
      action: 'grant.application.approved',
      target: { type: 'grantApplication', id: applicationId, version: expectedVersion },
      metadata: { mfaRequired: true, recentAuthSeconds: RECENT_AUTH_SECONDS },
      createdAt: FieldValue.serverTimestamp(),
    });
  });

  return { ok: true, applicationId, approvedVersion: expectedVersion };
});

export const upsertFoundationProfileField = onCall({ enforceAppCheck: true }, async (request) => {
  const actor = await requireStaff(request, ['owner', 'admin'], true);
  const payload = requireObject(request.data);
  const fieldId = requireString(payload, 'fieldId');
  const sourceRef = requireString(payload, 'sourceRef');
  const value = payload.value;

  if (value === undefined || value === null) {
    throw new HttpsError('invalid-argument', 'value is required.');
  }

  const ref = db.collection('foundationProfile').doc(fieldId);
  await ref.set({
    value,
    state: 'verified',
    sourceRef,
    confirmedAt: FieldValue.serverTimestamp(),
    confirmedBy: actor.uid,
    updatedAt: FieldValue.serverTimestamp(),
  }, { merge: true });

  await db.collection('foundationAuditLogs').add({
    actorUid: actor.uid,
    actorEmail: actor.email,
    actorRole: actor.role,
    action: 'foundation.profile.verified',
    target: { type: 'foundationProfile', id: fieldId },
    metadata: { sourceRef },
    createdAt: FieldValue.serverTimestamp(),
  });

  return { ok: true, fieldId };
});
