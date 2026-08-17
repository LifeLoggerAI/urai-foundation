#!/usr/bin/env node

import process from 'node:process';
import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { FieldValue, getFirestore } from 'firebase-admin/firestore';

const email = process.env.URAI_FOUNDATION_OWNER_EMAIL;
const projectId = process.env.URAI_FOUNDATION_FIREBASE_PROJECT_ID;

if (!email) {
  console.error('Missing URAI_FOUNDATION_OWNER_EMAIL.');
  process.exit(1);
}

if (!projectId) {
  console.error('Missing URAI_FOUNDATION_FIREBASE_PROJECT_ID. Refusing to guess a Firebase project.');
  process.exit(1);
}

if (/placeholder|example|paste|changeme/i.test(projectId) || /example\.com$/i.test(email)) {
  console.error('Refusing placeholder project or owner identity.');
  process.exit(1);
}

initializeApp({ projectId });
const auth = getAuth();
const db = getFirestore();

let user;
try {
  user = await auth.getUserByEmail(email);
} catch (error) {
  if (error?.code === 'auth/user-not-found') {
    console.error(`No Firebase Auth user exists for ${email}. Sign in with the intended Foundation identity first.`);
    process.exit(1);
  }
  throw error;
}

if (!user.emailVerified) {
  console.error(`Refusing to bootstrap ${email}: Firebase email is not verified.`);
  process.exit(1);
}

await auth.setCustomUserClaims(user.uid, {
  foundation_staff: true,
  foundation_role: 'owner',
});

await db.collection('foundationStaff').doc(user.uid).set({
  email,
  role: 'owner',
  isActive: true,
  createdAt: FieldValue.serverTimestamp(),
  updatedAt: FieldValue.serverTimestamp(),
  provisionedBy: 'functions/scripts/bootstrap-owner.mjs',
}, { merge: true });

await db.collection('foundationAuditLogs').add({
  actorUid: user.uid,
  actorEmail: email,
  actorRole: 'owner',
  action: 'foundation.staff.owner_bootstrapped',
  target: { type: 'foundationStaff', id: user.uid },
  metadata: { projectId },
  createdAt: FieldValue.serverTimestamp(),
});

console.log(`Bootstrapped Foundation owner ${email} (${user.uid}) in ${projectId}.`);
console.log('The user must refresh their Firebase ID token before the new custom claims take effect.');
