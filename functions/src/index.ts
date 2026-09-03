import { initializeApp } from 'firebase-admin/app';
import { FieldValue, Timestamp, Transaction, getFirestore } from 'firebase-admin/firestore';
import { CallableRequest, HttpsError, onCall } from 'firebase-functions/v2/https';

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
  request: CallableRequest<unknown>,
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

async function assertStaffInTransaction(
  tx: Transaction,
  actor: AuthContext,
  allowedRoles: StaffRole[],
) {
  if (!allowedRoles.includes(actor.role)) {
    throw new HttpsError('permission-denied', 'Your Foundation role cannot perform this action.');
  }
  const staffSnap = await tx.get(db.collection('foundationStaff').doc(actor.uid));
  if (!staffSnap.exists || staffSnap.data()?.isActive !== true || staffSnap.data()?.role !== actor.role) {
    throw new HttpsError('permission-denied', 'Foundation staff access changed before the protected write.');
  }
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

function hasUnresolvedAnswers(value: Record<string, unknown>): boolean {
  const answers = value.answers;
  if (!Array.isArray(answers) || answers.length === 0) return true;

  return answers.some((answer) => {
    if (!answer || typeof answer !== 'object' || Array.isArray(answer)) return true;
    const item = answer as Record<string, unknown>;
    return item.state !== 'verified'
      || typeof item.value !== 'string'
      || item.value.trim().length === 0;
  });
}

const PROVENANCE_TYPES = new Set(['profile', 'document', 'prior_approved_answer', 'generated', 'employee_entered']);
const AUTHORITATIVE_PROVENANCE_COLLECTIONS: Record<string, string> = {
  profile: 'foundationProfile',
  document: 'foundationDocuments',
  prior_approved_answer: 'grantApprovals',
};

async function validateAnswerProvenance(tx: Transaction, answers: unknown[]) {
  for (const [index, answer] of answers.entries()) {
    const item = answer as Record<string, unknown>;
    const questionId = String(item.questionId ?? '').trim();
    const answerValue = String(item.value ?? '').trim();
    const provenanceType = String(item.provenanceType ?? '');
    if (provenanceType === 'generated'
      || (typeof item.generatedByModel === 'string' && item.generatedByModel.trim().length > 0)) {
      throw new HttpsError('failed-precondition', `answers[${index}] contains generated factual language that must remain unresolved or be rebound to authoritative provenance.`);
    }
    const collection = AUTHORITATIVE_PROVENANCE_COLLECTIONS[provenanceType];
    if (!collection) continue;
    const sourceRefs = Array.isArray(item.sourceRefs) ? item.sourceRefs : [];
    if (sourceRefs.length === 0) {
      throw new HttpsError('failed-precondition', `answers[${index}] requires an authoritative source reference.`);
    }
    for (const sourceRef of sourceRefs) {
      if (typeof sourceRef !== 'string' || !new RegExp(`^${collection}/[^/]+$`).test(sourceRef)) {
        throw new HttpsError('failed-precondition', `answers[${index}] has an unrelated authoritative source reference.`);
      }
      const source = await tx.get(db.doc(sourceRef));
      if (!source.exists) {
        throw new HttpsError('failed-precondition', `answers[${index}] references missing authoritative evidence.`);
      }
      const sourceData = source.data() ?? {};
      if (provenanceType === 'profile') {
        const fieldId = sourceRef.split('/')[1];
        if (!['verified', 'confirmed'].includes(String(sourceData.state))
          || fieldId !== questionId
          || String(sourceData.value ?? '').trim() !== answerValue) {
          throw new HttpsError('failed-precondition', `answers[${index}] is not bound to the exact verified Foundation profile fact.`);
        }
      }
      if (provenanceType === 'document') {
        const bindings = sourceData.answerBindings;
        const boundValue = bindings && typeof bindings === 'object' && !Array.isArray(bindings)
          ? (bindings as Record<string, unknown>)[questionId]
          : undefined;
        if (typeof sourceData.sha256 !== 'string' || !sourceData.sha256 || !sourceData.verifiedAt
          || String(boundValue ?? '').trim() !== answerValue) {
          throw new HttpsError('failed-precondition', `answers[${index}] is not bound to the exact verified Foundation document fact.`);
        }
      }
      if (provenanceType === 'prior_approved_answer') {
        const applicationId = String(sourceData.applicationId ?? '');
        const applicationVersion = Number(sourceData.applicationVersion);
        if (!applicationId || !Number.isInteger(applicationVersion)) {
          throw new HttpsError('failed-precondition', `answers[${index}] references an invalid prior approval.`);
        }
        const priorApplication = await tx.get(db.collection('grantApplications').doc(applicationId));
        const priorData = priorApplication.data() ?? {};
        const priorAnswers = Array.isArray(priorData.answers) ? priorData.answers : [];
        const exactPriorAnswer = priorAnswers.some((prior) => {
          if (!prior || typeof prior !== 'object' || Array.isArray(prior)) return false;
          const priorItem = prior as Record<string, unknown>;
          return priorItem.questionId === questionId
            && String(priorItem.value ?? '').trim() === answerValue
            && priorItem.state === 'verified';
        });
        if (!priorApplication.exists
          || priorData.status !== 'approved'
          || priorData.approvedVersion !== applicationVersion
          || !exactPriorAnswer) {
          throw new HttpsError('failed-precondition', `answers[${index}] does not match the cited approved answer.`);
        }
      }
    }
  }
}

function assertAnswersMatchOpportunity(
  answers: Record<string, unknown>[],
  opportunityData: Record<string, unknown>,
) {
  if (!Array.isArray(opportunityData.questions) || opportunityData.questions.length === 0) {
    throw new HttpsError('failed-precondition', 'The referenced grant opportunity has no validated questions.');
  }

  const definedQuestionIds = new Set<string>();
  const requiredQuestionIds = new Set<string>();
  for (const [index, question] of opportunityData.questions.entries()) {
    const questionId = typeof question === 'string'
      ? question.trim()
      : question && typeof question === 'object' && !Array.isArray(question)
        ? String((question as Record<string, unknown>).questionId ?? (question as Record<string, unknown>).id ?? '').trim()
        : '';
    if (!questionId || definedQuestionIds.has(questionId)) {
      throw new HttpsError('failed-precondition', `grant opportunity questions[${index}] has a missing or duplicate identifier.`);
    }
    definedQuestionIds.add(questionId);
    if (!(question && typeof question === 'object' && !Array.isArray(question)
      && (question as Record<string, unknown>).required === false)) {
      requiredQuestionIds.add(questionId);
    }
  }

  const submittedQuestionIds = new Set<string>();
  for (const [index, answer] of answers.entries()) {
    const questionId = String(answer.questionId ?? '').trim();
    if (!definedQuestionIds.has(questionId)) {
      throw new HttpsError('failed-precondition', `answers[${index}] does not belong to the referenced grant opportunity.`);
    }
    if (submittedQuestionIds.has(questionId)) {
      throw new HttpsError('failed-precondition', `answers[${index}] duplicates a grant opportunity question.`);
    }
    submittedQuestionIds.add(questionId);
  }
  const missing = [...requiredQuestionIds].filter((questionId) => !submittedQuestionIds.has(questionId));
  if (missing.length > 0) {
    throw new HttpsError('failed-precondition', 'Every required grant opportunity question must have exactly one answer.');
  }
}

async function validateCurrentApplicationOpportunity(
  tx: Transaction,
  application: Record<string, unknown>,
) {
  const opportunityId = String(application.opportunityId ?? '').trim();
  if (!opportunityId) {
    throw new HttpsError('failed-precondition', 'Grant application is missing its opportunity binding.');
  }
  const opportunity = await tx.get(db.collection('grantOpportunities').doc(opportunityId));
  if (!opportunity.exists) {
    throw new HttpsError('failed-precondition', 'The referenced grant opportunity no longer exists.');
  }
  const answers = Array.isArray(application.answers)
    ? application.answers as Record<string, unknown>[]
    : [];
  assertAnswersMatchOpportunity(answers, opportunity.data() ?? {});
}

function normalizedDraftAnswers(data: Record<string, unknown>, actor: AuthContext): Record<string, unknown>[] {
  const answers = data.answers;
  if (!Array.isArray(answers) || answers.length === 0 || answers.length > 100) {
    throw new HttpsError('invalid-argument', 'answers must contain between 1 and 100 items.');
  }

  const editedAt = Timestamp.now();
  return answers.map((answer, index) => {
    if (!answer || typeof answer !== 'object' || Array.isArray(answer)) {
      throw new HttpsError('invalid-argument', `answers[${index}] must be an object.`);
    }
    const item = answer as Record<string, unknown>;
    const questionId = requireString(item, 'questionId');
    const value = typeof item.value === 'string' ? item.value.trim() : '';
    const provenanceType = requireString(item, 'provenanceType');
    if (!PROVENANCE_TYPES.has(provenanceType)) {
      throw new HttpsError('invalid-argument', `answers[${index}].provenanceType is invalid.`);
    }
    const sourceRefs = item.sourceRefs;
    if (!Array.isArray(sourceRefs) || sourceRefs.some((entry) => typeof entry !== 'string')) {
      throw new HttpsError('invalid-argument', `answers[${index}].sourceRefs must be a string array.`);
    }
    return {
      questionId,
      value,
      state: 'unresolved',
      provenanceType,
      sourceRefs: sourceRefs.map((entry) => entry.trim()).filter(Boolean),
      ...(typeof item.generatedByModel === 'string' && item.generatedByModel.trim()
        ? { generatedByModel: item.generatedByModel.trim() }
        : {}),
      lastEditedBy: actor.uid,
      lastEditedAt: editedAt,
    };
  });
}

export const saveGrantApplicationDraft = onCall({ enforceAppCheck: true }, async (request) => {
  const actor = await requireStaff(request, ['owner', 'admin', 'reviewer', 'grant_writer']);
  const payload = requireObject(request.data);
  const applicationId = requireString(payload, 'applicationId');
  const opportunityId = requireString(payload, 'opportunityId');
  const expectedVersion = Number(payload.expectedVersion);
  if (!Number.isInteger(expectedVersion) || expectedVersion < 0) {
    throw new HttpsError('invalid-argument', 'expectedVersion must be a non-negative integer.');
  }
  const answers = normalizedDraftAnswers(payload, actor);
  const applicationRef = db.collection('grantApplications').doc(applicationId);
  const opportunityRef = db.collection('grantOpportunities').doc(opportunityId);
  const auditRef = db.collection('foundationAuditLogs').doc();

  await db.runTransaction(async (tx) => {
    await assertStaffInTransaction(tx, actor, ['owner', 'admin', 'reviewer', 'grant_writer']);
    const [application, opportunity] = await Promise.all([
      tx.get(applicationRef),
      tx.get(opportunityRef),
    ]);
    if (!opportunity.exists) {
      throw new HttpsError('failed-precondition', 'The referenced grant opportunity does not exist.');
    }
    assertAnswersMatchOpportunity(answers, opportunity.data() ?? {});
    const current = application.data() ?? {};
    if (!application.exists && expectedVersion !== 0) {
      throw new HttpsError('aborted', 'A new application must start at expectedVersion 0.');
    }
    if (application.exists) {
      if (current.version !== expectedVersion) throw new HttpsError('aborted', 'The application changed. Refresh before saving.');
      if (['approved', 'submitted', 'awarded', 'closed'].includes(String(current.status))) {
        throw new HttpsError('failed-precondition', 'A terminal application cannot be edited.');
      }
    }
    const nextVersion = expectedVersion + 1;
    tx.set(applicationRef, {
      opportunityId,
      status: 'draft',
      version: nextVersion,
      answers,
      unresolvedCount: answers.length,
      createdBy: application.exists ? current.createdBy : actor.uid,
      createdAt: application.exists ? current.createdAt : FieldValue.serverTimestamp(),
      lastEditedBy: actor.uid,
      lastEditedAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });
    tx.create(auditRef, {
      actorUid: actor.uid,
      actorEmail: actor.email,
      actorRole: actor.role,
      action: 'grant.application.draft_saved',
      target: { type: 'grantApplication', id: applicationId, version: nextVersion },
      metadata: { unresolvedCount: answers.length },
      createdAt: FieldValue.serverTimestamp(),
    });
  });

  return { ok: true, applicationId, version: expectedVersion + 1 };
});

export const reviewGrantApplicationVersion = onCall({ enforceAppCheck: true }, async (request) => {
  const actor = await requireStaff(request, ['owner', 'admin', 'reviewer'], true);
  const payload = requireObject(request.data);
  const applicationId = requireString(payload, 'applicationId');
  const expectedVersion = requireInteger(payload, 'expectedVersion');
  const attestation = requireString(payload, 'attestation');
  const applicationRef = db.collection('grantApplications').doc(applicationId);
  const auditRef = db.collection('foundationAuditLogs').doc();

  await db.runTransaction(async (tx) => {
    await assertStaffInTransaction(tx, actor, ['owner', 'admin', 'reviewer']);
    const application = await tx.get(applicationRef);
    if (!application.exists) throw new HttpsError('not-found', 'Grant application was not found.');
    const value = application.data() ?? {};
    if (value.version !== expectedVersion || value.status !== 'draft') {
      throw new HttpsError('aborted', 'Only the exact current draft version can be reviewed.');
    }
    if (value.createdBy === actor.uid || value.lastEditedBy === actor.uid) {
      throw new HttpsError('permission-denied', 'An application editor cannot verify their own work.');
    }
    const answers = value.answers;
    if (!Array.isArray(answers) || answers.length === 0 || answers.some((answer) => {
      if (!answer || typeof answer !== 'object' || Array.isArray(answer)) return true;
      const answerValue = (answer as Record<string, unknown>).value;
      return typeof answerValue !== 'string' || !answerValue.trim();
    })) {
      throw new HttpsError('failed-precondition', 'Every answer needs a non-empty value before verification.');
    }
    await validateCurrentApplicationOpportunity(tx, value);
    await validateAnswerProvenance(tx, answers);
    const verifiedAt = Timestamp.now();
    const verifiedAnswers = answers.map((answer) => ({
      ...(answer as Record<string, unknown>),
      state: 'verified',
      verifiedBy: actor.uid,
      verifiedAt,
    }));
    tx.update(applicationRef, {
      answers: verifiedAnswers,
      unresolvedCount: 0,
      status: 'ready_for_review',
      reviewedVersion: expectedVersion,
      reviewedBy: actor.uid,
      reviewedAt: FieldValue.serverTimestamp(),
      reviewAttestation: attestation,
      updatedAt: FieldValue.serverTimestamp(),
    });
    tx.create(auditRef, {
      actorUid: actor.uid,
      actorEmail: actor.email,
      actorRole: actor.role,
      action: 'grant.application.answers_verified',
      target: { type: 'grantApplication', id: applicationId, version: expectedVersion },
      metadata: { attestation },
      createdAt: FieldValue.serverTimestamp(),
    });
  });

  return { ok: true, applicationId, reviewedVersion: expectedVersion };
});

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
    await assertStaffInTransaction(tx, actor, ['owner', 'admin', 'reviewer']);
    const application = await tx.get(applicationRef);
    if (!application.exists) throw new HttpsError('not-found', 'Grant application was not found.');

    const value = application.data() ?? {};
    if (value.status !== 'ready_for_review') {
      throw new HttpsError('failed-precondition', 'Only applications ready for review can be approved.');
    }
    if (value.version !== expectedVersion) {
      throw new HttpsError('aborted', 'The application changed. Refresh and review the latest version.');
    }
    if (value.createdBy === actor.uid || value.lastEditedBy === actor.uid || value.reviewedBy === actor.uid) {
      throw new HttpsError('permission-denied', 'An application author, editor, or answer reviewer cannot approve their own work.');
    }
    if (value.reviewedVersion !== expectedVersion) {
      throw new HttpsError('failed-precondition', 'The exact application version has not completed protected answer review.');
    }
    await validateCurrentApplicationOpportunity(tx, value);
    await validateAnswerProvenance(tx, Array.isArray(value.answers) ? value.answers : []);
    if (hasUnresolvedAnswers(value)) {
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
  const auditRef = db.collection('foundationAuditLogs').doc();
  await db.runTransaction(async (tx) => {
    await assertStaffInTransaction(tx, actor, ['owner', 'admin']);
    tx.set(ref, {
      value,
      state: 'verified',
      sourceRef,
      confirmedAt: FieldValue.serverTimestamp(),
      confirmedBy: actor.uid,
      updatedAt: FieldValue.serverTimestamp(),
    }, { merge: true });

    tx.create(auditRef, {
      actorUid: actor.uid,
      actorEmail: actor.email,
      actorRole: actor.role,
      action: 'foundation.profile.verified',
      target: { type: 'foundationProfile', id: fieldId },
      metadata: { sourceRef },
      createdAt: FieldValue.serverTimestamp(),
    });
  });

  return { ok: true, fieldId };
});
