export type DonationStatusTransitionInput = {
  currentStatus: unknown;
  priorEventCreated: number;
  priorEventId?: string | null;
  requestedStatus: unknown;
  eventCreated: number;
  eventId: string;
  priorAmountRefunded: number;
  nextAmountRefunded: number | null;
};

export type DonationStatusTransitionDecision = {
  apply: boolean;
  status: unknown;
  preserveRecurringCancellation: boolean;
  staleRecurringCancellationOverride: boolean;
  watermarkCreated: number;
  watermarkEventId: string;
};

const STATUS_PRECEDENCE: Record<string, number> = {
  creating_checkout: 0,
  checkout_created: 1,
  payment_pending: 2,
  recurring_active: 3,
  recurring_trialing: 3,
  recurring_incomplete: 2,
  recurring_incomplete_expired: 4,
  recurring_past_due: 4,
  recurring_unpaid: 4,
  recurring_paused: 4,
  completed: 3,
  expired: 4,
  payment_failed: 4,
  recurring_payment_failed: 4,
  partially_refunded: 5,
  refunded: 6,
  recurring_cancelled: 6,
};

const TERMINAL_DISPUTE_STATUSES = new Set([
  'dispute_won',
  'dispute_lost',
  'dispute_warning_closed',
]);

const RETRY_SUCCESS_STATUSES = new Set(['completed', 'recurring_active']);
const RETRY_FAILURE_STATUSES = new Set(['payment_failed', 'recurring_payment_failed']);

const RECURRING_CANCELLATION_OVERRIDABLE_STATUSES = new Set([
  'recurring_active',
  'recurring_trialing',
  'recurring_incomplete',
  'recurring_incomplete_expired',
  'recurring_past_due',
  'recurring_unpaid',
  'recurring_paused',
  'recurring_payment_failed',
]);

function statusPrecedence(status: unknown): number {
  if (typeof status !== 'string') return -1;
  if (TERMINAL_DISPUTE_STATUSES.has(status)) return 8;
  if (status.startsWith('dispute_')) return 7;
  return STATUS_PRECEDENCE[status] ?? -1;
}

/**
 * Resolve a donation-intent state transition without touching Firestore.
 *
 * Stripe can deliver subscription lifecycle events out of order. A terminal
 * customer.subscription.deleted event is authoritative for recurring
 * lifecycle state even when its signed event timestamp is older than a
 * recurring failure that happened to arrive first. That exception is narrowly
 * scoped to recurring lifecycle states; refund/dispute/one-time authority is
 * never displaced by a stale cancellation.
 *
 * The processor-event watermark is monotonic. When a stale cancellation wins,
 * the state advances to recurring_cancelled while the newer event watermark
 * remains intact. The caller can retain the cancellation event id/timestamp in
 * dedicated provenance fields.
 */
export function resolveDonationStatusTransition(
  input: DonationStatusTransitionInput,
): DonationStatusTransitionDecision {
  const currentStatus = typeof input.currentStatus === 'string' ? input.currentStatus : '';
  const requestedStatus = typeof input.requestedStatus === 'string' ? input.requestedStatus : '';

  const preserveRecurringCancellation = currentStatus === 'recurring_cancelled'
    && requestedStatus.startsWith('recurring_')
    && requestedStatus !== 'recurring_cancelled';
  const nextStatus = preserveRecurringCancellation ? 'recurring_cancelled' : requestedStatus;

  const decreasesRefundTotal = (nextStatus === 'partially_refunded' || nextStatus === 'refunded')
    && input.nextAmountRefunded !== null
    && input.nextAmountRefunded < input.priorAmountRefunded;

  const staleByTime = input.eventCreated < input.priorEventCreated;
  const staleRecurringCancellationOverride = staleByTime
    && requestedStatus === 'recurring_cancelled'
    && RECURRING_CANCELLATION_OVERRIDABLE_STATUSES.has(currentStatus);
  const sameTime = input.eventCreated === input.priorEventCreated;
  const successfulRetryAtSameTime = sameTime
    && RETRY_SUCCESS_STATUSES.has(nextStatus)
    && RETRY_FAILURE_STATUSES.has(currentStatus);
  const staleFailureAfterSameTimeSuccess = sameTime
    && RETRY_FAILURE_STATUSES.has(nextStatus)
    && RETRY_SUCCESS_STATUSES.has(currentStatus);
  const lowerPriorityAtSameTime = sameTime
    && statusPrecedence(nextStatus) < statusPrecedence(currentStatus)
    && !successfulRetryAtSameTime;

  const apply = (!staleByTime || staleRecurringCancellationOverride)
    && !staleFailureAfterSameTimeSuccess
    && !lowerPriorityAtSameTime
    && !decreasesRefundTotal;

  return {
    apply,
    status: nextStatus,
    preserveRecurringCancellation,
    staleRecurringCancellationOverride,
    watermarkCreated: staleRecurringCancellationOverride
      ? input.priorEventCreated
      : input.eventCreated,
    watermarkEventId: staleRecurringCancellationOverride
      ? (input.priorEventId || input.eventId)
      : input.eventId,
  };
}
