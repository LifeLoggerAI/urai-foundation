/**
 * ONE URAI GENESIS R18 - proposed, unconnected Foundation document revocation service.
 *
 * This module is intentionally source-native and uses the subset of Firestore Admin
 * transaction methods required for an eventual SDK binding. There is NO callable
 * registration, deployed handler, key-management integration, or production authority.
 *
 * A caller must separately authorize a current, active privileged Foundation role,
 * verified email, recent reauthentication, MFA and App Check before calling this.
 * Firestore Admin SDK bypasses client Security Rules; actual IAM and admission
 * controls remain mandatory. See the R18 review note before attempting integration.
 */
export type EvidenceRef = { readonly path: string };
export type EvidenceSnapshot = {
  readonly exists: boolean;
  data(): Record<string, unknown> | undefined;
};
export interface EvidenceTransaction {
  get(ref: EvidenceRef): Promise<EvidenceSnapshot>;
  update(ref: EvidenceRef, fields: Record<string, unknown>): unknown;
  create(ref: EvidenceRef, fields: Record<string, unknown>): unknown;
}
export interface EvidenceFirestore {
  doc(path: string): EvidenceRef;
  runTransaction<T>(body: (tx: EvidenceTransaction) => Promise<T>): Promise<T>;
}

export type RevokeEvidenceRequest = Readonly<{
  documentId: string;
  expectedRevision: number;
  actorUid: string;
  requestId: string;
  observedAt: string;
}>;
export type RevokeEvidenceResult = Readonly<{
  status: 'revoked' | 'already-revoked';
  documentRef: string;
  revision: number;
  epoch: number;
}>;
export type RevokeEvidenceErrorCode = 'invalid-argument' | 'not-found' | 'failed-precondition' | 'aborted';
export class RevokeEvidenceError extends Error {
  constructor(readonly code: RevokeEvidenceErrorCode, message: string) {
    super(message);
    this.name = 'RevokeEvidenceError';
  }
}

const SAFE_ID = /^[A-Za-z0-9_-]{2,120}$/;
const SAFE_REQUEST_ID = /^[A-Za-z0-9_-]{8,80}$/;
const VALID_HEX_256 = /^[a-f0-9]{64}$/i;

function fail(code: RevokeEvidenceErrorCode, message: string): never {
  throw new RevokeEvidenceError(code, message);
}
function object(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
    ? value as Record<string, unknown> : null;
}
function nonempty(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0 && value.trim() === value;
}
function safeNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isSafeInteger(value) && value >= 0;
}
function validTimestamp(value: string): boolean {
  const date = new Date(value);
  return Number.isFinite(date.getTime()) && date.toISOString() === value;
}
function verifiedStorageMatches(caseStorage: unknown, documentStorage: unknown, signedStorage: unknown): boolean {
  const original = object(caseStorage), doc = object(documentStorage), signed = object(signedStorage);
  if (!original || !doc || !signed) return false;
  for (const key of ['project', 'bucket', 'key'] as const) {
    if (!nonempty(original[key]) || original[key] !== doc[key] || original[key] !== signed[key]) return false;
  }
  if (!safeNumber(original.generation) || original.generation < 1) return false;
  return original.generation === doc.generation && original.generation === signed.generation;
}
function signedBindingsMatch(caseBindings: unknown, documentBindings: unknown, signedBindings: unknown): boolean {
  const first = object(caseBindings), second = object(documentBindings), third = object(signedBindings);
  if (!first || !second || !third) return false;
  const keys = Object.keys(first).sort();
  if (keys.length < 1 || keys.length > 100 ||
      keys.join('\u0000') !== Object.keys(second).sort().join('\u0000') ||
      keys.join('\u0000') !== Object.keys(third).sort().join('\u0000')) return false;
  for (const key of keys) {
    if (!SAFE_ID.test(key) || ['__proto__', 'constructor', 'prototype'].includes(key) ||
        !nonempty(first[key]) || first[key] !== second[key] || first[key] !== third[key]) return false;
  }
  return true;
}
function currentV2Evidence(
  documentRef: string,
  caseData: Record<string, unknown>,
  document: Record<string, unknown>,
  ledger: Record<string, unknown>,
): boolean {
  const caseReceipt = object(caseData.signed);
  const documentReceipt = object(document.attestation);
  if (!caseReceipt || !documentReceipt) return false;
  if (caseData.ref !== documentRef || caseData.state !== 'published') return false;
  if (document.state !== 'verified' || !nonempty(caseData.receiptDigest)) return false;
  if (!nonempty(caseData.sha256) || !VALID_HEX_256.test(caseData.sha256)) return false;
  if (document.sha256 !== caseData.sha256 || document.verifiedAt !== documentReceipt.verifiedAt) return false;
  if (caseReceipt.schema !== 'urai-foundation-document-attestation.v2' ||
      documentReceipt.schema !== caseReceipt.schema) return false;
  if (caseReceipt.documentRef !== documentRef || documentReceipt.documentRef !== documentRef) return false;
  if (caseReceipt.blobSha256 !== caseData.sha256 || documentReceipt.blobSha256 !== caseData.sha256) return false;
  if (!nonempty(caseReceipt.signature) || caseReceipt.signature !== documentReceipt.signature) return false;
  if (!nonempty(caseReceipt.issuerId) || caseReceipt.issuerId !== documentReceipt.issuerId) return false;
  if (!nonempty(caseReceipt.keyId) || caseReceipt.keyId !== documentReceipt.keyId) return false;
  if (!nonempty(caseReceipt.verifiedAt) || !validTimestamp(caseReceipt.verifiedAt)) return false;
  if (caseReceipt.verifiedAt !== documentReceipt.verifiedAt) return false;
  if (!signedBindingsMatch(caseData.bindings, document.answerBindings, caseReceipt.answerBindings)) return false;
  if (!signedBindingsMatch(caseData.bindings, document.answerBindings, documentReceipt.answerBindings)) return false;
  if (!nonempty(caseData.reviewDigest) || caseData.reviewDigest !== caseReceipt.reviewDigest ||
      caseData.reviewDigest !== documentReceipt.reviewDigest) return false;
  if (caseData.intakeUid !== caseReceipt.intakeUid || caseData.intakeUid !== documentReceipt.intakeUid ||
      caseData.reviewerUid !== caseReceipt.reviewerUid || caseData.reviewerUid !== documentReceipt.reviewerUid) return false;
  if (!verifiedStorageMatches(caseData.storage, document.storage, caseReceipt.storage)) return false;
  if (!verifiedStorageMatches(caseData.storage, document.storage, documentReceipt.storage)) return false;
  if (!safeNumber(ledger.epoch) || ledger.revoked !== false) return false;
  if (caseReceipt.revocationEpoch !== ledger.epoch || documentReceipt.revocationEpoch !== ledger.epoch) return false;
  const events = caseData.events;
  return Array.isArray(events) && events.every(x => typeof x === 'string') && events.includes('published');
}
function revokedStateConsistent(
  caseData: Record<string, unknown>, document: Record<string, unknown>,
  ledger: Record<string, unknown>, audit: Record<string, unknown> | null,
  source: string, req: RevokeEvidenceRequest,
): boolean {
  if (!audit || !safeNumber(req.expectedRevision) ||
      caseData.state !== 'revoked' || document.state !== 'revoked' || ledger.revoked !== true) return false;
  if (!safeNumber(caseData.revision) || caseData.revision !== req.expectedRevision + 1) return false;
  if (!safeNumber(ledger.epoch) || ledger.epoch < 1) return false;
  if (caseData.ref !== source || audit.sourceRef !== source || audit.action !== 'foundation.document.revoked') return false;
  if (caseData.revokedBy !== req.actorUid || document.revokedBy !== req.actorUid ||
      audit.actorUid !== req.actorUid || ledger.revokedBy !== req.actorUid) return false;
  if (caseData.revocationRequestId !== req.requestId || document.revocationRequestId !== req.requestId ||
      audit.requestId !== req.requestId || ledger.requestId !== req.requestId) return false;
  if (caseData.revokedAt !== req.observedAt || document.revokedAt !== req.observedAt ||
      audit.observedAt !== req.observedAt || ledger.revokedAt !== req.observedAt) return false;
  if (document.revocationEpoch !== ledger.epoch || audit.epoch !== ledger.epoch) return false;
  const events = caseData.events;
  return Array.isArray(events) && events.includes('revoked') && events.every(x => typeof x === 'string');
}

/**
 * Research candidate for a single Firestore-transaction, idempotent revocation.
 * It has NO external side effects in a callback that Firestore may retry.
 * Not safe for deployment until source-native authorization, SDK, rules,
 * issuer custody, audit and approval-vs-revocation races receive formal review.
 */
export async function revokeEvidenceTransaction(
  db: EvidenceFirestore,
  input: RevokeEvidenceRequest,
): Promise<RevokeEvidenceResult> {
  if (!input || !SAFE_ID.test(input.documentId) || !SAFE_ID.test(input.actorUid) ||
      !SAFE_REQUEST_ID.test(input.requestId) || !safeNumber(input.expectedRevision) ||
      input.expectedRevision >= Number.MAX_SAFE_INTEGER ||
      typeof input.observedAt !== 'string' || !validTimestamp(input.observedAt)) {
    fail('invalid-argument', 'Malformed Foundation revocation request.');
  }
  const source = `foundationDocuments/${input.documentId}`;
  const caseRef = db.doc(`foundationIntakeCases/${input.documentId}`);
  const sourceRef = db.doc(source);
  const ledgerRef = db.doc(`foundationEvidenceRevocations/${input.documentId}`);
  const auditRef = db.doc(`foundationAuditLogs/foundation_document_revoked_${input.documentId}`);

  return db.runTransaction(async tx => {
    // All four reads, including the deterministic audit receipt, precede writes.
    const [caseSnap, sourceSnap, ledgerSnap, auditSnap] = await Promise.all([
      tx.get(caseRef), tx.get(sourceRef), tx.get(ledgerRef), tx.get(auditRef),
    ]);
    if (!caseSnap.exists || !sourceSnap.exists || !ledgerSnap.exists) {
      fail('not-found', 'Foundation source, intake case, or revocation record is missing.');
    }
    const caseData = object(caseSnap.data()), document = object(sourceSnap.data());
    const ledger = object(ledgerSnap.data());
    const audit = auditSnap.exists ? object(auditSnap.data()) : null;
    if (!caseData || !document || !ledger || (auditSnap.exists && !audit)) {
      fail('failed-precondition', 'Foundation evidence state is malformed.');
    }
    if (caseData.state === 'revoked') {
      if (!revokedStateConsistent(caseData, document, ledger, audit, source, input)) {
        fail('failed-precondition', 'Previous revocation is incomplete or belongs to another request.');
      }
      return {status: 'already-revoked', documentRef: source,
        revision: input.expectedRevision + 1, epoch: ledger.epoch as number};
    }
    if (auditSnap.exists || caseData.revision !== input.expectedRevision ||
        !currentV2Evidence(source, caseData, document, ledger)) {
      fail('failed-precondition', 'Evidence changed or is not an active v2 Foundation document.');
    }
    const nextEpoch = (ledger.epoch as number) + 1;
    if (!Number.isSafeInteger(nextEpoch)) fail('aborted', 'Revocation epoch exhausted.');
    const nextRevision = input.expectedRevision + 1;
    const oldEvents = caseData.events as string[];
    tx.update(caseRef, {
      state: 'revoked', revision: nextRevision, events: [...new Set([...oldEvents, 'revoked'])],
      revokedBy: input.actorUid, revokedAt: input.observedAt, revocationRequestId: input.requestId,
    });
    tx.update(sourceRef, {
      state: 'revoked', revocationEpoch: nextEpoch,
      revokedBy: input.actorUid, revokedAt: input.observedAt, revocationRequestId: input.requestId,
    });
    tx.update(ledgerRef, {
      revoked: true, epoch: nextEpoch,
      revokedBy: input.actorUid, revokedAt: input.observedAt, requestId: input.requestId,
    });
    tx.create(auditRef, {
      actorUid: input.actorUid, action: 'foundation.document.revoked', sourceRef: source,
      requestId: input.requestId, epoch: nextEpoch, observedAt: input.observedAt,
    });
    return {status: 'revoked', documentRef: source, revision: nextRevision, epoch: nextEpoch};
  });
}
