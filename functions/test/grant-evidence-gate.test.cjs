'use strict';
// R19 source-native unconnected gate contract tests. Requires TypeScript build first.
// These fixtures are synthetic; no Firebase Admin SDK, Rules or callable authentication.
const test = require('node:test');
const assert = require('node:assert/strict');
const {assertCurrentGrantEvidence,EvidenceGateError}=require('../lib/grantEvidenceGate.js');
const DOC='foundationDocuments/docA';
function fixture(){
  const storage={project:'foundation-demo',bucket:'private-evidence',key:'foundation/docA',generation:41};
  const signed={schema:'urai-foundation-document-attestation.v2',documentRef:DOC,blobSha256:'a'.repeat(64),
    verifiedAt:'2026-11-08T23:00:00.000Z',signature:'synthetic_signature',issuerId:'issuer1',
    keyId:'key001',reviewDigest:'review_digest',revocationEpoch:3,
    storage:structuredClone(storage),answerBindings:{mission:'Approved fact'}};
  const docs=new Map([
    [DOC,{state:'verified',sha256:'a'.repeat(64),verifiedAt:signed.verifiedAt,attestation:structuredClone(signed),
      storage:structuredClone(storage),answerBindings:{mission:'Approved fact'}}],
    ['foundationEvidenceRevocations/docA',{revoked:false,epoch:3}],
    ['foundationIntakeCases/docA',{ref:DOC,state:'published',signed:structuredClone(signed),sha256:'a'.repeat(64),
      reviewDigest:'review_digest',storage:structuredClone(storage),bindings:{mission:'Approved fact'}}],
    ['foundationProfile/mission',{state:'verified',value:'Approved fact',sourceRef:DOC}]
  ]);
  const db={doc:path=>({path})};
  const tx={get:async ref=>({exists:docs.has(ref.path),data:()=>structuredClone(docs.get(ref.path))})};
  const answer=(provenanceType='document',sourceRefs=[DOC])=>({questionId:'mission',value:'Approved fact',provenanceType,sourceRefs});
  const check=(answers=[answer()])=>assertCurrentGrantEvidence(db,tx,answers);
  const mutate=(path,fn)=>{let d=docs.get(path);fn(d);docs.set(path,d)};
  return {docs,check,answer,mutate};
}
async function refused(f,a){
  await assert.rejects(f.check(a),e=>e instanceof EvidenceGateError && e.code==='failed-precondition');
}
test('valid v2 document status/epoch passes synthetic read gate',async()=>fixture().check());
test('document revocation state refuses future review',async()=>{const f=fixture();f.mutate(DOC,d=>d.state='revoked');await refused(f)});
test('revocation ledger blocks evidence despite retained timestamp',async()=>{const f=fixture();f.mutate('foundationEvidenceRevocations/docA',d=>d.revoked=true);await refused(f)});
test('absent ledger fails closed',async()=>{const f=fixture();f.docs.delete('foundationEvidenceRevocations/docA');await refused(f)});
test('changed storage generation with same hash refuses',async()=>{const f=fixture();f.mutate(DOC,d=>d.storage.generation=42);await refused(f)});
test('v1 attestation cannot silently migrate',async()=>{const f=fixture();f.mutate(DOC,d=>d.attestation.schema='legacy.v1');await refused(f)});
test('document binding changed after review refuses',async()=>{const f=fixture();f.mutate(DOC,d=>d.answerBindings.mission='Wrong fact');await refused(f)});
test('verified profile with documented root passes',async()=>{const f=fixture();await f.check([f.answer('profile',['foundationProfile/mission'])])});
test('verified profile missing original source fails closed',async()=>{const f=fixture();f.mutate('foundationProfile/mission',d=>d.sourceRef='foundationDocuments/missing');await refused(f,[f.answer('profile',['foundationProfile/mission'])])});
test('other system paths cannot be promoted as Foundation evidence',async()=>{const f=fixture();await refused(f,[f.answer('document',['ruaiPatients/private'])])});
test('legitimate historical approval chain with active root passes',async()=>{
 const f=fixture();
 f.docs.set('grantApprovals/source_v1',{applicationId:'source',applicationVersion:1,approvedBy:'owner'});
 f.docs.set('grantApplications/source',{status:'approved',approvedVersion:1,answers:[{...f.answer(),state:'verified'}]});
 await f.check([f.answer('prior_approved_answer',['grantApprovals/source_v1'])]);
});
test('revoked root blocks transitive reapproval',async()=>{
 const f=fixture();
 f.docs.set('grantApprovals/source_v1',{applicationId:'source',applicationVersion:1,approvedBy:'owner'});
 f.docs.set('grantApplications/source',{status:'approved',approvedVersion:1,answers:[{...f.answer(),state:'verified'}]});
 f.mutate('foundationEvidenceRevocations/docA',d=>d.revoked=true);
 await refused(f,[f.answer('prior_approved_answer',['grantApprovals/source_v1'])]);
});
test('synthetic approval lineage cycles are refused',async()=>{
 const f=fixture();
 f.docs.set('grantApprovals/loop_v1',{applicationId:'loop',applicationVersion:1,approvedBy:'owner'});
 f.docs.set('grantApplications/loop',{status:'approved',approvedVersion:1,
   answers:[{...f.answer('prior_approved_answer',['grantApprovals/loop_v1']),state:'verified'}]});
 await refused(f,[f.answer('prior_approved_answer',['grantApprovals/loop_v1'])]);
});
test('employee-entered text remains policy undecided and is not documentary proof',async()=>{
 const f=fixture();await f.check([f.answer('employee_entered',[])]);
});
