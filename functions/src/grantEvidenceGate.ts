/**
 * Foundation R19: experimental, fail-closed read-side evidence-status gate.
 * This checks source/case/ledger consistency in the SAME transaction as review/approval.
 * It does not authenticate a signed issuer, rehash source bytes, authorize the caller,
 * replace original grant validation, or validate human-entered factual narratives.
 * Do not deploy without Firebase SDK/emulator + policy and independent review.
 */
export interface EvidenceSnapshot { readonly exists: boolean; data(): Record<string, unknown> | undefined; }
export type EvidenceReader<TRef> = { doc(path: string): TRef };
export type EvidenceReadTransaction<TRef> = { get(ref: TRef): Promise<EvidenceSnapshot> };
export class EvidenceGateError extends Error {
  readonly code = 'failed-precondition';
  constructor(message: string) { super(message); this.name = 'EvidenceGateError'; }
}
function FAIL(reason: string): never { throw new EvidenceGateError(reason); }
const ID = /^[a-zA-Z0-9_-]{2,120}$/;
const DIGEST = /^[a-f0-9]{64}$/i;
const MAX_DEPTH = 8;
const MAX_READS = 400;
const obj = (x: unknown): Record<string, unknown> | null => x && typeof x === 'object' && !Array.isArray(x) ? x as Record<string, unknown> : null;
const str = (x: unknown): x is string => typeof x === 'string' && x.length > 0 && x.trim() === x;
const integer = (x: unknown): x is number => typeof x === 'number' && Number.isSafeInteger(x) && x >= 0;
const pathIn = (collection: string, path: unknown): string => {
  if (!str(path) || !path.startsWith(`${collection}/`) || !ID.test(path.slice(collection.length + 1))) FAIL('Noncanonical Foundation evidence path.');
  return path;
};
const sameStorage = (actual: unknown, signed: unknown): boolean => {
  const a = obj(actual), b = obj(signed);
  if (!a || !b) return false;
  return ['project','bucket','key'].every(k=>str(a[k]) && a[k]===b[k]) && integer(a.generation) && a.generation>0 && a.generation===b.generation;
};

/** Candidate read-side gate; call from within a review or approval Firestore transaction. */
export async function assertCurrentGrantEvidence<TRef>(
  db: EvidenceReader<TRef>, tx: EvidenceReadTransaction<TRef>, answers: unknown[],
): Promise<void> {
  if (!Array.isArray(answers) || answers.length === 0 || answers.length > 100) FAIL('Invalid grant answers.');
  const cache = new Map<string, Record<string,unknown>>();
  const get = async (p: string): Promise<Record<string,unknown>> => {
    if (cache.has(p)) return cache.get(p)!;
    if (cache.size >= MAX_READS) FAIL('Evidence graph exceeds read budget.');
    const s = await tx.get(db.doc(p));
    const d = s.exists ? obj(s.data()) : null;
    if (!d) FAIL('Missing or malformed evidence.');
    cache.set(p,d);
    return d;
  };
  const document = async (p: string, question: string, value: string): Promise<void> => {
    pathIn('foundationDocuments',p);
    const id = p.split('/')[1];
    const [d,ledger,c] = await Promise.all([
      get(p),get(`foundationEvidenceRevocations/${id}`),get(`foundationIntakeCases/${id}`),
    ]);
    const sig = obj(d.attestation), csig = obj(c.signed);
    if (d.state !== 'verified' || ledger.revoked !== false || c.state !== 'published' ||
        c.ref !== p || !integer(ledger.epoch) || !sig || !csig ||
        sig.schema !== 'urai-foundation-document-attestation.v2' || csig.schema !== sig.schema ||
        sig.documentRef !== p || csig.documentRef !== p ||
        sig.revocationEpoch !== ledger.epoch || csig.revocationEpoch !== ledger.epoch ||
        !str(d.sha256) || !DIGEST.test(d.sha256) ||
        d.sha256 !== sig.blobSha256 || d.sha256 !== csig.blobSha256 || d.sha256 !== c.sha256 ||
        !str(sig.signature) || sig.signature !== csig.signature ||
        !str(sig.issuerId) || sig.issuerId !== csig.issuerId ||
        !str(sig.keyId) || sig.keyId !== csig.keyId ||
        !str(sig.reviewDigest) || sig.reviewDigest !== csig.reviewDigest || sig.reviewDigest !== c.reviewDigest ||
        !str(sig.verifiedAt) || sig.verifiedAt !== d.verifiedAt ||
        !sameStorage(d.storage,sig.storage) || !sameStorage(c.storage,sig.storage)) {
      FAIL('Document or revocation epoch is no longer valid.');
    }
    const direct = obj(d.answerBindings), signed = obj(sig.answerBindings), caseBindings = obj(c.bindings);
    if (!direct || !signed || !caseBindings || !str(direct[question]) ||
        direct[question] !== value || signed[question] !== value || caseBindings[question] !== value) {
      FAIL('Claim not bound to current signed document.');
    }
  };
  const traverse = async (answer: Record<string,unknown>, depth: number, ancestors: Set<string>): Promise<void> => {
    if (depth > MAX_DEPTH) FAIL('Prior approval lineage too deep.');
    const q = answer.questionId, v = answer.value, typ = answer.provenanceType;
    if (!str(q) || !str(v)) FAIL('Empty grant evidence answer.');
    if (typ === 'generated' || (str(answer.generatedByModel))) FAIL('Generated facts have no authoritative source.');
    if (typ === 'employee_entered') return; // Not a documentary guarantee; independent policy required.
    const refs = answer.sourceRefs;
    if (!Array.isArray(refs) || refs.length === 0 || refs.length > 25) FAIL('Missing or excessive source references.');
    for (const rawRef of refs) {
      if (typ === 'document') {
        await document(pathIn('foundationDocuments',rawRef),q,v);
      } else if (typ === 'profile') {
        const p = pathIn('foundationProfile',rawRef);
        if (p.split('/')[1] !== q) FAIL('Unrelated profile field.');
        const fact = await get(p);
        if (!['verified','confirmed'].includes(String(fact.state)) || fact.value !== v) FAIL('Profile fact changed.');
        await document(pathIn('foundationDocuments',fact.sourceRef),q,v);
      } else if (typ === 'prior_approved_answer') {
        const p = pathIn('grantApprovals',rawRef);
        if (ancestors.has(p)) FAIL('Cycle detected in prior-approval lineage.');
        const suffix = /^([A-Za-z0-9_-]{2,120})_v([1-9][0-9]*)$/.exec(p.split('/')[1]);
        if (!suffix) FAIL('Noncanonical approval receipt.');
        const [applicationId, verS] = [suffix[1], suffix[2]];
        const version = Number(verS);
        if (!Number.isSafeInteger(version)) FAIL('Invalid approval version.');
        const approval = await get(p), prior = await get(`grantApplications/${applicationId}`);
        if (approval.applicationId !== applicationId || approval.applicationVersion !== version ||
            !str(approval.approvedBy) || prior.status !== 'approved' || prior.approvedVersion !== version ||
            !Array.isArray(prior.answers)) FAIL('Prior approval identity is not authoritative.');
        const match = (prior.answers as unknown[]).filter(a=>{
          const x=obj(a);return x && x.questionId===q && x.value===v && x.state==='verified';
        });
        if (match.length !== 1) FAIL('No unique prior answer matches claim.');
        const next = new Set(ancestors);next.add(p);
        await traverse(match[0] as Record<string,unknown>,depth+1,next);
      } else FAIL('Unknown provenance type.');
    }
  };
  for (const rawAnswer of answers) {
    const a = obj(rawAnswer);if (!a) FAIL('Malformed answer.');
    await traverse(a,0,new Set());
  }
}
