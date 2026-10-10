'use strict';

// Installed SDK and compiled handlers; no credentials or live database writes.
process.env.GCLOUD_PROJECT = 'urai-foundation-dependency-test';
const assert = require('node:assert/strict');
const { test, after, mock } = require('node:test');
const express = require('express');
const { getAuth } = require('firebase-admin/auth');
const { DocumentReference } = require('firebase-admin/firestore');
const functions = require('../lib/index.js');
const proxyaddr = require('proxy-addr');
const { v4: uuid } = require('uuid');

let staff = { exists: true, data: () => ({ isActive: true, role: 'owner' }) };
let reads = 0;
mock.method(DocumentReference.prototype, 'get', async function () {
  assert.equal(this.path, 'foundationStaff/sdk-test-user', 'No live database reads are allowed');
  reads += 1;
  return staff;
});
after(() => mock.restoreAll());
const names = [
  'saveGrantApplicationDraft', 'reviewGrantApplicationVersion',
  'approveGrantApplication', 'upsertFoundationProfileField',
];
const auth = (token = {}) => ({
  uid: 'sdk-test-user',
  token: {
    email_verified: true, foundation_staff: true, foundation_role: 'owner',
    email: 'sdk-test@urai.invalid', auth_time: Math.floor(Date.now() / 1000),
    firebase: { sign_in_second_factor: 'totp' }, ...token,
  },
});
// A benign verified-identity fixture isolates App Check from the separate auth gate.
mock.method(getAuth(), 'verifyIdToken', async () => ({ ...auth().token, uid: 'sdk-test-user' }));
test('compiled callable export contract survives the SDK update', () => {
  assert.deepEqual(Object.keys(functions).sort(), [...names].sort());
  for (const fn of Object.values(functions)) {
    assert.equal(fn.__endpoint.platform, 'gcfv2');
    assert.equal(typeof fn.__endpoint.callableTrigger, 'object');
    assert.equal(typeof fn.run, 'function');
  }
});
for (const name of names) {
  const fn = functions[name];
  for (const [label, requestAuth, code] of [
    ['missing authentication', undefined, 'unauthenticated'],
    ['unverified email', auth({ email_verified: false }), 'permission-denied'],
    ['missing staff claim', auth({ foundation_staff: false }), 'permission-denied'],
    ['role without permission', auth({ foundation_role: 'staff' }), 'permission-denied'],
  ]) {
    test(`${name} rejects ${label} before database access`, async () => {
      const before = reads;
      await assert.rejects(fn.run({ data: {}, auth: requestAuth }), { code });
      assert.equal(reads, before);
    });
  }
  for (const [label, record] of [
    ['revoked staff', { exists: true, data: () => ({ isActive: false, role: 'owner' }) }],
    ['stale staff role', { exists: true, data: () => ({ isActive: true, role: 'staff' }) }],
  ]) {
    test(`${name} rejects ${label} from the staff document`, async () => {
      staff = record;
      await assert.rejects(fn.run({ data: {}, auth: auth() }), { code: 'permission-denied' });
    });
  }
  test(`${name} validates payload after staff authorization`, async () => {
    staff = { exists: true, data: () => ({ isActive: true, role: 'owner' }) };
    await assert.rejects(fn.run({ data: {}, auth: auth() }), { code: 'invalid-argument' });
  });
  if (name !== 'saveGrantApplicationDraft') {
    for (const [label, token] of [
      ['expired recent authentication', { auth_time: 1 }],
      ['missing authentication time', { auth_time: undefined }],
      ['non-numeric authentication time', { auth_time: 'recent' }],
      ['non-finite authentication time', { auth_time: Number.NaN }],
      ['positive infinite authentication time', { auth_time: Number.POSITIVE_INFINITY }],
      ['negative infinite authentication time', { auth_time: Number.NEGATIVE_INFINITY }],
      ['future authentication time', { auth_time: Math.floor(Date.now() / 1000) + 60 }],
      ['fractional authentication time', { auth_time: Math.floor(Date.now() / 1000) - 0.5 }],
      ['missing multi-factor authentication', { firebase: {} }],
    ]) {
      test(`${name} rejects ${label}`, async () => {
        staff = { exists: true, data: () => ({ isActive: true, role: 'owner' }) };
        await assert.rejects(fn.run({ data: {}, auth: auth(token) }), { code: 'failed-precondition' });
      });
    }
  }
  test(`${name} HTTP wrapper rejects absent App Check`, async () => {
    const app = express();
    app.use(express.json());
    app.post('/call', fn);
    const server = app.listen(0, '127.0.0.1');
    await new Promise((resolve, reject) => server.once('listening', resolve).once('error', reject));
    try {
      const before = reads;
      const response = await fetch(`http://127.0.0.1:${server.address().port}/call`, {
        method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer sdk-test-identity' },
        body: JSON.stringify({ data: {} }), signal: AbortSignal.timeout(5000),
      });
      assert.equal(response.status, 401);
      assert.equal((await response.json()).error.status, 'UNAUTHENTICATED');
      assert.equal(reads, before, 'App Check must reject before the staff database or handler runs');
    } finally {
      await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
    }
  });
}
test('IPv4-mapped broad IPv6 trust rejects an unrelated caller', () => {
  assert.equal(proxyaddr.compile('::ffff:10.0.0.0/8')('203.0.113.17', 0), false);
  const ordinary = proxyaddr.compile('10.0.0.0/8');
  assert.equal(ordinary('10.1.2.3', 0), true);
  assert.equal(ordinary('203.0.113.17', 0), false);
});
test('patched UUID rejects undersized buffers and preserves ordinary identifiers', () => {
  assert.throws(() => uuid({}, new Uint8Array(15), 0), RangeError);
  assert.match(uuid(), /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
});
