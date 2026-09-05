import assert from 'node:assert/strict';
import { resolveDonationStatusTransition } from '../lib/donation-status.js';

function decide(overrides) {
  return resolveDonationStatusTransition({
    currentStatus: 'recurring_active',
    priorEventCreated: 100,
    priorEventId: 'evt_prior',
    requestedStatus: 'recurring_payment_failed',
    eventCreated: 110,
    eventId: 'evt_next',
    priorAmountRefunded: -1,
    nextAmountRefunded: null,
    ...overrides,
  });
}

// Order 1: cancellation is stored first; a later recurring failure cannot reopen it.
const cancellationFirst = decide({
  currentStatus: 'recurring_cancelled',
  priorEventCreated: 100,
  priorEventId: 'evt_cancel',
  requestedStatus: 'recurring_payment_failed',
  eventCreated: 110,
  eventId: 'evt_failure',
});
assert.equal(cancellationFirst.apply, true);
assert.equal(cancellationFirst.status, 'recurring_cancelled');
assert.equal(cancellationFirst.preserveRecurringCancellation, true);
assert.equal(cancellationFirst.watermarkCreated, 110);
assert.equal(cancellationFirst.watermarkEventId, 'evt_failure');

// Order 2: a newer failure arrives first; an older delayed cancellation still wins.
const failureFirst = decide({
  currentStatus: 'recurring_payment_failed',
  priorEventCreated: 110,
  priorEventId: 'evt_failure',
  requestedStatus: 'recurring_cancelled',
  eventCreated: 100,
  eventId: 'evt_cancel',
});
assert.equal(failureFirst.apply, true);
assert.equal(failureFirst.status, 'recurring_cancelled');
assert.equal(failureFirst.staleRecurringCancellationOverride, true);
assert.equal(failureFirst.watermarkCreated, 110);
assert.equal(failureFirst.watermarkEventId, 'evt_failure');

// The stale cancellation exception is narrow: it cannot displace refund authority.
const staleCancellationAfterRefund = decide({
  currentStatus: 'refunded',
  priorEventCreated: 110,
  priorEventId: 'evt_refund',
  requestedStatus: 'recurring_cancelled',
  eventCreated: 100,
  eventId: 'evt_cancel',
});
assert.equal(staleCancellationAfterRefund.apply, false);

// Nor can it displace dispute authority.
const staleCancellationAfterDispute = decide({
  currentStatus: 'dispute_lost',
  priorEventCreated: 110,
  priorEventId: 'evt_dispute',
  requestedStatus: 'recurring_cancelled',
  eventCreated: 100,
  eventId: 'evt_cancel',
});
assert.equal(staleCancellationAfterDispute.apply, false);

// Existing stale-event protection remains for unrelated transitions.
const ordinaryStaleEvent = decide({
  currentStatus: 'recurring_active',
  priorEventCreated: 110,
  priorEventId: 'evt_active',
  requestedStatus: 'recurring_payment_failed',
  eventCreated: 100,
  eventId: 'evt_failure',
});
assert.equal(ordinaryStaleEvent.apply, false);

console.log('Donation status ordering behavior passed.');
