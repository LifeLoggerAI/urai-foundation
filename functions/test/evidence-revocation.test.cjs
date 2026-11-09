'use strict';
/** Contract tests for the disconnected R18 source-native candidate.
 * Run after npm run build or isolated TypeScript compilation.
 * This is a deterministic transactional fake, NOT the Firebase emulator.
 */
const test = require('node:test');
const assert = require('node:assert/strict');
const {revokeEvidenceTransaction, RevokeEvidenceError} = require('../lib/evidenceRevocation.js');
const DOC = 'foundationDocuments/docA';
const CASE = 'foundationIntakeCases/docA';
const LEDGER = 'foundationEvidenceRevocations/docA';
const AUDIT = 'foundationAuditLogs/foundation_document_revoked_docA';
const NOW = '2026-11-08T23:50:00.000Z';
const input = {documentId: 'docA', expectedRevision: 8, actorUid: 'owner01', requestId: 'revoke_req001', observedAt: NOW};
const clone = value => structuredClone(value);
function state() {
  const storage = {project:'foundation-demo',bucket:'private-evidence',key:'foundation/docA',generation:41};
  const receipt = {
    schema:'urai-foundation-document-attestation.v2', documentRef:DOC,
    blobSha256:'a'.repeat(64), verifiedAt:'2026-11-08T23:00:00.000Z',
    signature:'synthetic_signature_only', issuerId:'issuer-workload',keyId:'key0001',
    reviewDigest:'reviewdigest',intakeUid:'intaker1',reviewerUid:'reviewer2',
    revocationEpoch:3, storage,answerBindings:{mission:'Verified test statement'},
  };
  return new Map([
    [CASE,{ref:DOC,state:'published',revision:8,events:['staged','reviewed','signed','sealed','published'],
      signed:clone(receipt),receiptDigest:'synthetic_receipt_digest',sha256:'a'.repeat(64),
      reviewDigest:'reviewdigest',intakeUid:'intaker1',reviewerUid:'reviewer2',
      storage:clone(storage),bindings:{mission:'Verified test statement'}}],
    [DOC,{state:'verified',sha256:'a'.repeat(64),verifiedAt:'2026-11-08T23:00:00.000Z',
      storage:clone(storage),attestation:clone(receipt),answerBindings:{mission:'Verified test statement'}}],
    [LEDGER,{revoked:false,epoch:3}],
  ]);
}
function fixture() {
  const docs = state();
  const meter = {transactions:0,retries:0,commits:0,writes:0,readsAfterWrite:0,externalCalls:0};
  let failBeforeCommit=false,loseAcknowledgement=false,retryOne=false;
  let beforeCommit=null;
  const db={doc:path=>({path}),runTransaction:async fn=>{
    meter.transactions++;
    for(let attempt=0;attempt<4;attempt++){
      const visited=new Map(),staged=[];
      let sawWrite=false;
      const tx={
        get:async ref=>{
          if(sawWrite){meter.readsAfterWrite++;throw Error('read-after-write');}
          const value=docs.get(ref.path);
          visited.set(ref.path,JSON.stringify(value));
          return {exists:value!==undefined,data:()=>value===undefined?undefined:clone(value)};
        },
        update:(ref, fields)=>{sawWrite=true;staged.push({method:'update',path:ref.path,fields:clone(fields)});},
        create:(ref, fields)=>{sawWrite=true;staged.push({method:'create',path:ref.path,fields:clone(fields)});},
      };
      const result=await fn(tx);
      if(retryOne){retryOne=false;meter.retries++;continue;}
      if(beforeCommit){const job=beforeCommit;beforeCommit=null;job(docs);}
      if([...visited].some(([k,serial])=>JSON.stringify(docs.get(k))!==serial)){
        meter.retries++;continue;
      }
      if(failBeforeCommit){failBeforeCommit=false;throw Error('injected precommit failure');}
      for(const w of staged){
        if(w.method==='update'&&!docs.has(w.path))throw Error('missing update doc');
        if(w.method==='create'&&docs.has(w.path))throw Error('audit collision');
      }
      const changes=staged.map(w=>[w.path,w.method==='update'?{...clone(docs.get(w.path)),...w.fields}:w.fields]);
      for(const [path,value] of changes)docs.set(path,value);
      meter.writes+=changes.length;if(staged.length)meter.commits++;
      if(loseAcknowledgement){loseAcknowledgement=false;throw Error('injected ack loss after commit');}
      return result;
    }
    throw Error('retry limit');
  }};
  return {docs,db,meter,
    get:path=>docs.get(path),
    mutate:(path,fn)=>{const val=docs.get(path);fn(val);docs.set(path,val)},
    failBefore:()=>{failBeforeCommit=true},loseAck:()=>{loseAcknowledgement=true},
    retryCallback:()=>{retryOne=true},
    beforeCommit:fn=>{beforeCommit=fn},
  };
}
async function expectRefusal(f, request=input, code='failed-precondition') {
  const before=clone(f.get(DOC));
  await assert.rejects(revokeEvidenceTransaction(f.db,request),e=>e instanceof RevokeEvidenceError && e.code===code);
  assert.equal(f.meter.writes,0,'refusal must not mutate documents');
  assert.deepEqual(f.get(DOC),before,'refusal must not modify existing source');
}

test('01 successful v2 revocation atomically updates four documents',async()=>{
  const f=fixture();const out=await revokeEvidenceTransaction(f.db,input);
  assert.deepEqual(out,{status:'revoked',documentRef:DOC,revision:9,epoch:4});
  assert.equal(f.get(CASE).state,'revoked');assert.equal(f.get(DOC).revocationEpoch,4);
  assert.equal(f.get(LEDGER).epoch,4);assert.equal(f.get(AUDIT).actorUid,input.actorUid);
  assert.equal(f.meter.writes,4);assert.equal(f.meter.commits,1);
  assert.equal(f.meter.readsAfterWrite,0);
});
test('02 exact same request is idempotent and does not duplicate audit',async()=>{
  const f=fixture();await revokeEvidenceTransaction(f.db,input);
  const again=await revokeEvidenceTransaction(f.db,input);
  assert.equal(again.status,'already-revoked');assert.equal(f.meter.writes,4);
  assert.equal(f.meter.commits,1);
});
test('03 acknowledgement loss can be recovered with exact request',async()=>{
  const f=fixture();f.loseAck();await assert.rejects(revokeEvidenceTransaction(f.db,input),/ack loss/);
  assert.equal(f.get(DOC).state,'revoked');
  assert.equal((await revokeEvidenceTransaction(f.db,input)).status,'already-revoked');
  assert.equal(f.meter.writes,4);
});
test('04 failed commit preserves all documents and retry commits',async()=>{
  const f=fixture();f.failBefore();await assert.rejects(revokeEvidenceTransaction(f.db,input),/precommit/);
  assert.equal(f.get(DOC).state,'verified');assert.equal(f.get(CASE).state,'published');
  assert.equal(f.get(AUDIT),undefined);assert.equal(f.meter.writes,0);
  assert.equal((await revokeEvidenceTransaction(f.db,input)).status,'revoked');
});
test('05 simulated callback retry has one commit and no external calls',async()=>{
  const f=fixture();f.retryCallback();assert.equal((await revokeEvidenceTransaction(f.db,input)).status,'revoked');
  assert.equal(f.meter.retries,1);assert.equal(f.meter.commits,1);
  assert.equal(f.meter.externalCalls,0);assert.equal(f.meter.writes,4);
});
test('06 conflict between read and commit retries with changed evidence and refuses',async()=>{
  const f=fixture();f.beforeCommit(d=>{const doc=d.get(DOC);doc.sha256='b'.repeat(64)});
  await assert.rejects(revokeEvidenceTransaction(f.db,input),{code:'failed-precondition'});
  assert.equal(f.meter.retries,1);assert.equal(f.meter.writes,0);
  assert.equal(f.get(DOC).sha256,'b'.repeat(64)); // independent synthetic concurrent writer
});
test('07 missing case is refused',async()=>{const f=fixture();f.docs.delete(CASE);await expectRefusal(f,input,'not-found')});
test('08 missing source is refused',async()=>{const f=fixture();f.docs.delete(DOC);await assert.rejects(revokeEvidenceTransaction(f.db,input),{code:'not-found'});assert.equal(f.meter.writes,0)});
test('09 missing ledger is refused',async()=>{const f=fixture();f.docs.delete(LEDGER);await expectRefusal(f,input,'not-found')});
test('10 stale revision is refused',async()=>{const f=fixture();await expectRefusal(f,{...input,expectedRevision:7})});
test('11 premature revocation flag is refused',async()=>{const f=fixture();f.mutate(LEDGER,d=>{d.revoked=true});await expectRefusal(f)});
test('12 malformed ledger epoch is refused',async()=>{const f=fixture();f.mutate(LEDGER,d=>{d.epoch='3'});await expectRefusal(f)});
test('13 exhausted ledger epoch is refused',async()=>{
  const f=fixture();f.mutate(LEDGER,d=>{d.epoch=Number.MAX_SAFE_INTEGER});
  f.mutate(CASE,d=>{d.signed.revocationEpoch=Number.MAX_SAFE_INTEGER});
  f.mutate(DOC,d=>{d.attestation.revocationEpoch=Number.MAX_SAFE_INTEGER});
  await expectRefusal(f,input,'aborted');
});
test('14 revoked source before operation is refused',async()=>{const f=fixture();f.mutate(DOC,d=>{d.state='revoked'});await expectRefusal(f)});
test('15 source receipt must use v2 schema',async()=>{const f=fixture();f.mutate(DOC,d=>{d.attestation.schema='v1'});await expectRefusal(f)});
test('16 case and receipt must bind exact document ref',async()=>{const f=fixture();f.mutate(CASE,d=>{d.signed.documentRef='foundationDocuments/other'});await expectRefusal(f)});
test('17 changing generation with identical content refuses',async()=>{const f=fixture();f.mutate(DOC,d=>{d.storage.generation=42});await expectRefusal(f)});
test('18 changing storage bucket refuses',async()=>{const f=fixture();f.mutate(DOC,d=>{d.storage.bucket='wrong'});await expectRefusal(f)});
test('19 changing signed source digest refuses',async()=>{const f=fixture();f.mutate(DOC,d=>{d.attestation.blobSha256='b'.repeat(64)});await expectRefusal(f)});
test('20 changing question-value binding refuses',async()=>{const f=fixture();f.mutate(DOC,d=>{d.answerBindings.mission='Different claim'});await expectRefusal(f)});
test('21 changing signer identity refuses',async()=>{const f=fixture();f.mutate(DOC,d=>{d.attestation.issuerId='otherIssuer'});await expectRefusal(f)});
test('22 changing signed receipt signature refuses',async()=>{const f=fixture();f.mutate(CASE,d=>{d.signed.signature='different'});await expectRefusal(f)});
test('23 changed review digest refuses',async()=>{const f=fixture();f.mutate(CASE,d=>{d.reviewDigest='different'});await expectRefusal(f)});
test('24 changed reviewer identity refuses',async()=>{const f=fixture();f.mutate(CASE,d=>{d.reviewerUid='different'});await expectRefusal(f)});
test('25 existing unrelated audit record refuses',async()=>{const f=fixture();f.docs.set(AUDIT,{action:'forged'});await expectRefusal(f)});
test('26 incomplete revoked state cannot return idempotent success',async()=>{
  const f=fixture();await revokeEvidenceTransaction(f.db,input);f.docs.delete(AUDIT);
  await assert.rejects(revokeEvidenceTransaction(f.db,input),{code:'failed-precondition'});
  assert.equal(f.meter.writes,4);
});
test('27 different requester cannot claim idempotency',async()=>{
  const f=fixture();await revokeEvidenceTransaction(f.db,input);
  await assert.rejects(revokeEvidenceTransaction(f.db,{...input,actorUid:'owner02'}),{code:'failed-precondition'});
});
test('28 different request id cannot claim idempotency',async()=>{
  const f=fixture();await revokeEvidenceTransaction(f.db,input);
  await assert.rejects(revokeEvidenceTransaction(f.db,{...input,requestId:'revoke_req002'}),{code:'failed-precondition'});
});
test('29 different observed time cannot claim idempotency',async()=>{
  const f=fixture();await revokeEvidenceTransaction(f.db,input);
  await assert.rejects(revokeEvidenceTransaction(f.db,{...input,observedAt:'2026-11-08T23:55:00.000Z'}),{code:'failed-precondition'});
});
test('30 corrupted audit metadata cannot claim idempotency',async()=>{
  const f=fixture();await revokeEvidenceTransaction(f.db,input);
  f.mutate(AUDIT,d=>{d.requestId='wrong'});
  await assert.rejects(revokeEvidenceTransaction(f.db,input),{code:'failed-precondition'});
});
test('31 malformed request values are rejected before transaction',async()=>{
  for(const bad of [
    {...input,documentId:'../../ruaiPatients'}, {...input,documentId:''},
    {...input,actorUid:'x'}, {...input,requestId:'short'},
    {...input,expectedRevision:-1},{...input,expectedRevision:NaN},
    {...input,expectedRevision:Number.MAX_SAFE_INTEGER},
    {...input,observedAt:'tomorrow'},
  ]){
    const f=fixture();await assert.rejects(revokeEvidenceTransaction(f.db,bad),{code:'invalid-argument'});
    assert.equal(f.meter.transactions,0);
  }
});
test('32 invalid v1 and unsigned evidence never authorize revocation',async()=>{
  const f=fixture();f.mutate(CASE,d=>{delete d.signed});await expectRefusal(f);
});
test('33 source with malformed bindings never authorizes revocation',async()=>{
  const f=fixture();f.mutate(DOC,d=>{d.answerBindings={mission:123}});await expectRefusal(f);
});
test('34 source with missing signed review digest never authorizes revocation',async()=>{
  const f=fixture();f.mutate(DOC,d=>{delete d.attestation.reviewDigest});await expectRefusal(f);
});
test('35 transaction touches only the four Foundation document paths',async()=>{
  const f=fixture();f.docs.set('ruaiPatients/private',{secret:1});
  await revokeEvidenceTransaction(f.db,input);
  assert.deepEqual(f.get('ruaiPatients/private'),{secret:1});
  assert.equal(f.meter.writes,4);
});
