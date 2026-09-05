import { FieldValue, Timestamp, getFirestore } from 'firebase-admin/firestore';
import { defineSecret, defineString } from 'firebase-functions/params';
import { HttpsError, onCall, onRequest } from 'firebase-functions/v2/https';
import Stripe from 'stripe';

const db = getFirestore();

const stripeSecretKey = defineSecret('DONATION_STRIPE_SECRET_KEY');
const stripeWebhookSecret = defineSecret('DONATION_STRIPE_WEBHOOK_SECRET');

const donationsEnabled = defineString('FOUNDATION_DONATIONS_ENABLED', { default: 'false' });
const receivingEntity = defineString('FOUNDATION_DONATION_RECEIVING_ENTITY', { default: '' });
const disclosureVersion = defineString('FOUNDATION_DONATION_DISCLOSURE_VERSION', { default: '' });
const successUrl = defineString('FOUNDATION_DONATION_SUCCESS_URL', { default: 'https://uraifoundation.org/donate/thanks/' });
const cancelUrl = defineString('FOUNDATION_DONATION_CANCEL_URL', { default: 'https://uraifoundation.org/donate/' });

const MIN_DONATION_CENTS = 100;
const MAX_DONATION_CENTS = 1_000_000;
const SUPPORTED_CURRENCY = 'usd';

type DonationCadence = 'once' | 'monthly';

type DonationActivation = {
  receivingEntity: string;
  disclosureVersion: string;
  successUrl: string;
  cancelUrl: string;
};

type RecurringPaymentAuthority = {
  timestamp: Timestamp;
  unixSeconds: number;
  source: 'invoice.status_transitions.paid_at' | 'stripe_event.created';
};

function activation(): DonationActivation {
  if (donationsEnabled.value() !== 'true') {
    throw new HttpsError('failed-precondition', 'Online donations are not active yet.');
  }

  const webhookSecret = stripeWebhookSecret.value().trim();
  if (!webhookSecret) {
    throw new HttpsError('failed-precondition', 'Donation webhook authentication is not configured.');
  }

  const entity = receivingEntity.value().trim();
  const disclosure = disclosureVersion.value().trim();
  const success = successUrl.value().trim();
  const cancel = cancelUrl.value().trim();

  if (!entity || !disclosure) {
    throw new HttpsError('failed-precondition', 'Donation receiving-entity and disclosure configuration are incomplete.');
  }

  for (const url of [success, cancel]) {
    if (!url.startsWith('https://uraifoundation.org/')) {
      throw new HttpsError('failed-precondition', 'Donation return URLs must remain on uraifoundation.org.');
    }
  }

  return { receivingEntity: entity, disclosureVersion: disclosure, successUrl: success, cancelUrl: cancel };
}

function stripeClient() {
  return new Stripe(stripeSecretKey.value());
}

function parseCheckoutRequest(data: unknown): { amountCents: number; cadence: DonationCadence; receiptEmail?: string } {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new HttpsError('invalid-argument', 'Donation details are required.');
  }

  const value = data as Record<string, unknown>;
  const amountCents = Number(value.amountCents);
  const cadence = value.cadence;
  const receiptEmail = typeof value.receiptEmail === 'string' ? value.receiptEmail.trim().toLowerCase() : undefined;

  if (!Number.isInteger(amountCents) || amountCents < MIN_DONATION_CENTS || amountCents > MAX_DONATION_CENTS) {
    throw new HttpsError('invalid-argument', 'Donation amount must be between $1 and $10,000.');
  }

  if (cadence !== 'once' && cadence !== 'monthly') {
    throw new HttpsError('invalid-argument', 'Donation cadence must be once or monthly.');
  }

  if (receiptEmail && (!receiptEmail.includes('@') || receiptEmail.length > 254)) {
    throw new HttpsError('invalid-argument', 'Receipt email is invalid.');
  }

  return { amountCents, cadence, receiptEmail };
}

function checkoutSuccessUrl(base: string): string {
  if (base.includes('{CHECKOUT_SESSION_ID}')) return base;
  return `${base}${base.includes('?') ? '&' : '?'}session_id={CHECKOUT_SESSION_ID}`;
}

export const createDonationCheckout = onCall(
  { enforceAppCheck: true, secrets: [stripeSecretKey, stripeWebhookSecret] },
  async (request) => {
    const config = activation();
    const input = parseCheckoutRequest(request.data);
    const stripe = stripeClient();

    const intentRef = db.collection('donationIntents').doc();
    const metadata = {
      donationIntentId: intentRef.id,
      receivingEntity: config.receivingEntity,
      disclosureVersion: config.disclosureVersion,
      cadence: input.cadence,
    };

    await intentRef.create({
      amountCents: input.amountCents,
      currency: SUPPORTED_CURRENCY,
      cadence: input.cadence,
      receiptEmail: input.receiptEmail ?? null,
      receivingEntity: config.receivingEntity,
      disclosureVersion: config.disclosureVersion,
      processor: 'stripe',
      status: 'creating_checkout',
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });

    try {
      const recurring = input.cadence === 'monthly';
      const session = await stripe.checkout.sessions.create({
        mode: recurring ? 'subscription' : 'payment',
        submit_type: 'donate',
        success_url: checkoutSuccessUrl(config.successUrl),
        cancel_url: config.cancelUrl,
        customer_email: input.receiptEmail,
        billing_address_collection: 'auto',
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: SUPPORTED_CURRENCY,
              unit_amount: input.amountCents,
              product_data: { name: 'Support URAI Foundation' },
              ...(recurring ? { recurring: { interval: 'month' as const } } : {}),
            },
          },
        ],
        metadata,
        ...(recurring
          ? { subscription_data: { metadata } }
          : { payment_intent_data: { metadata } }),
      });

      if (!session.url) {
        throw new Error('Stripe Checkout Session did not return a redirect URL.');
      }

      await intentRef.update({
        stripeCheckoutSessionId: session.id,
        status: 'checkout_created',
        updatedAt: FieldValue.serverTimestamp(),
      });

      return {
        checkoutUrl: session.url,
        donationIntentId: intentRef.id,
      };
    } catch (error) {
      await intentRef.update({
        status: 'checkout_failed',
        updatedAt: FieldValue.serverTimestamp(),
      });
      console.error('Donation checkout creation failed', { donationIntentId: intentRef.id });
      throw new HttpsError('internal', 'Unable to start donation checkout.');
    }
  },
);

async function recordDonationTransaction(event: Stripe.Event, values: Record<string, unknown>) {
  const donationIntentId = values.donationIntentId;
  if (typeof donationIntentId !== 'string' || !donationIntentId) return false;
  const intent = await db.collection('donationIntents').doc(donationIntentId).get();
  if (!intent.exists) return false;
  await db.collection('donationTransactions').doc(event.id).set({
    processor: 'stripe',
    processorEventId: event.id,
    processorEventType: event.type,
    ...values,
    createdAt: FieldValue.serverTimestamp(),
    processedAt: FieldValue.serverTimestamp(),
  }, { merge: true });
  return true;
}

async function donationIntentFromSubscription(stripe: Stripe, subscriptionId: string): Promise<string | null> {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  return subscription.metadata?.donationIntentId || null;
}

function expandableId(value: unknown): string | null {
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object' && 'id' in value) {
    const id = (value as { id?: unknown }).id;
    return typeof id === 'string' ? id : null;
  }
  return null;
}

async function donationIntentFromPaymentIntent(stripe: Stripe, paymentIntentId: string): Promise<string | null> {
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
  return paymentIntent.metadata?.donationIntentId || null;
}

function subscriptionIdFromInvoice(invoice: Stripe.Invoice): string | null {
  return expandableId(invoice.parent?.subscription_details?.subscription);
}

function recurringPaymentAuthority(invoice: Stripe.Invoice, event: Stripe.Event): RecurringPaymentAuthority {
  const invoicePaidAt = invoice.status_transitions?.paid_at;
  const hasInvoicePaidAt = typeof invoicePaidAt === 'number' && Number.isFinite(invoicePaidAt) && invoicePaidAt > 0;
  const unixSeconds = hasInvoicePaidAt ? invoicePaidAt : event.created;
  return {
    timestamp: Timestamp.fromMillis(unixSeconds * 1000),
    unixSeconds,
    source: hasInvoicePaidAt ? 'invoice.status_transitions.paid_at' : 'stripe_event.created',
  };
}

async function donationIntentFromInvoicePayment(
  stripe: Stripe,
  paymentIntentId: string,
): Promise<string | null> {
  const payments = await stripe.invoicePayments.list({
    payment: { type: 'payment_intent', payment_intent: paymentIntentId },
    limit: 1,
  });
  const invoiceValue = payments.data[0]?.invoice;
  if (!invoiceValue) return null;
  const invoice = typeof invoiceValue === 'string'
    ? await stripe.invoices.retrieve(invoiceValue)
    : invoiceValue;
  if ('deleted' in invoice && invoice.deleted) return null;
  const subscriptionId = subscriptionIdFromInvoice(invoice as Stripe.Invoice);
  return subscriptionId ? donationIntentFromSubscription(stripe, subscriptionId) : null;
}

async function donationIntentFromCharge(stripe: Stripe, chargeValue: unknown): Promise<string | null> {
  const charge = typeof chargeValue === 'string'
    ? await stripe.charges.retrieve(chargeValue)
    : chargeValue as Stripe.Charge;
  const paymentIntentId = expandableId(charge?.payment_intent);
  if (!paymentIntentId) return null;
  return await donationIntentFromPaymentIntent(stripe, paymentIntentId)
    ?? donationIntentFromInvoicePayment(stripe, paymentIntentId);
}

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

const TERMINAL_DISPUTE_STATUSES = new Set(['dispute_won', 'dispute_lost', 'dispute_warning_closed']);

function statusPrecedence(status: unknown): number {
  if (typeof status !== 'string') return -1;
  if (TERMINAL_DISPUTE_STATUSES.has(status)) return 8;
  if (status.startsWith('dispute_')) return 7;
  return STATUS_PRECEDENCE[status] ?? -1;
}

const RETRY_SUCCESS_STATUSES = new Set(['completed', 'recurring_active']);
const RETRY_FAILURE_STATUSES = new Set(['payment_failed', 'recurring_payment_failed']);

async function setIntentStatus(
  donationIntentId: string | null,
  event: Stripe.Event,
  values: Record<string, unknown>,
) {
  if (!donationIntentId) return false;
  const ref = db.collection('donationIntents').doc(donationIntentId);
  return db.runTransaction(async (transaction) => {
    const current = await transaction.get(ref);
    if (!current.exists) return false;
    const data = current.data() ?? {};
    const priorCreated = typeof data.lastProcessorEventCreated === 'number'
      ? data.lastProcessorEventCreated
      : -1;
    const requestedStatus = values.status;
    const preserveRecurringCancellation = data.status === 'recurring_cancelled'
      && (requestedStatus === 'recurring_active' || requestedStatus === 'recurring_payment_failed');
    const nextStatus = preserveRecurringCancellation ? 'recurring_cancelled' : requestedStatus;
    const nextValues = preserveRecurringCancellation ? { ...values, status: nextStatus } : values;
    const priorAmountRefunded = typeof data.amountRefunded === 'number' ? data.amountRefunded : -1;
    const nextAmountRefunded = typeof values.amountRefunded === 'number' ? values.amountRefunded : null;
    const decreasesRefundTotal = (nextStatus === 'partially_refunded' || nextStatus === 'refunded')
      && nextAmountRefunded !== null
      && nextAmountRefunded < priorAmountRefunded;
    const staleByTime = event.created < priorCreated;
    const sameTime = event.created === priorCreated;
    const successfulRetryAtSameTime = sameTime
      && RETRY_SUCCESS_STATUSES.has(String(nextStatus))
      && RETRY_FAILURE_STATUSES.has(String(data.status));
    const staleFailureAfterSameTimeSuccess = sameTime
      && RETRY_FAILURE_STATUSES.has(String(nextStatus))
      && RETRY_SUCCESS_STATUSES.has(String(data.status));
    const lowerPriorityAtSameTime = sameTime
      && statusPrecedence(nextStatus) < statusPrecedence(data.status)
      && !successfulRetryAtSameTime;
    if (staleByTime || staleFailureAfterSameTimeSuccess || lowerPriorityAtSameTime || decreasesRefundTotal) return false;

    transaction.set(ref, {
      ...nextValues,
      lastProcessorEventCreated: event.created,
      lastProcessorEventId: event.id,
      updatedAt: FieldValue.serverTimestamp(),
    }, { merge: true });
    return true;
  });
}

async function recordReconciliationEvent(event: Stripe.Event, values: Record<string, unknown>) {
  await db.collection('donationReconciliationEvents').doc(event.id).set({
    processor: 'stripe',
    processorEventId: event.id,
    processorEventType: event.type,
    ...values,
    createdAt: FieldValue.serverTimestamp(),
  }, { merge: true });
}

async function processCheckoutSettlement(event: Stripe.Event, session: Stripe.Checkout.Session) {
  const donationIntentId = session.metadata?.donationIntentId;
  if (!donationIntentId) return;
  const settled = session.payment_status === 'paid' || session.payment_status === 'no_payment_required';
  const recurring = session.mode === 'subscription';

  await setIntentStatus(donationIntentId, event, {
    status: settled ? (recurring ? 'recurring_active' : 'completed') : 'payment_pending',
    stripeCheckoutSessionId: session.id,
    stripeCustomerId: expandableId(session.customer),
    stripeSubscriptionId: expandableId(session.subscription),
    paymentStatus: session.payment_status,
    ...(settled ? { completedAt: FieldValue.serverTimestamp() } : {}),
  });

  await recordDonationTransaction(event, {
    donationIntentId,
    kind: settled
      ? (recurring ? 'subscription_started' : 'one_time_payment')
      : 'checkout_payment_pending',
    amountTotal: session.amount_total,
    currency: session.currency,
    paymentStatus: session.payment_status,
    stripeCheckoutSessionId: session.id,
  });
}

async function processStripeEvent(stripe: Stripe, event: Stripe.Event) {
  if (event.type === 'checkout.session.completed' || event.type === 'checkout.session.async_payment_succeeded') {
    const session = event.data.object as Stripe.Checkout.Session;
    await processCheckoutSettlement(event, session);
    return;
  }

  if (event.type === 'checkout.session.async_payment_failed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const donationIntentId = session.metadata?.donationIntentId || null;
    await setIntentStatus(donationIntentId, event, {
      status: session.mode === 'subscription' ? 'recurring_payment_failed' : 'payment_failed',
      stripeCheckoutSessionId: session.id,
      paymentStatus: session.payment_status,
    });
    await recordDonationTransaction(event, {
      donationIntentId,
      kind: 'checkout_async_payment_failed',
      amountTotal: session.amount_total,
      currency: session.currency,
      paymentStatus: session.payment_status,
      stripeCheckoutSessionId: session.id,
    });
    return;
  }

  if (event.type === 'checkout.session.expired') {
    const session = event.data.object as Stripe.Checkout.Session;
    const donationIntentId = session.metadata?.donationIntentId;
    if (donationIntentId) {
      await setIntentStatus(donationIntentId, event, {
        status: 'expired',
      });
    }
    return;
  }

  if (event.type === 'invoice.paid') {
    const invoice = event.data.object as Stripe.Invoice;
    const subscriptionId = subscriptionIdFromInvoice(invoice);

    if (!subscriptionId) return;
    const donationIntentId = await donationIntentFromSubscription(stripe, subscriptionId);
    if (!donationIntentId) return;

    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const paidAuthority = recurringPaymentAuthority(invoice, event);
    await setIntentStatus(donationIntentId, event, {
      status: subscription.status === 'canceled'
        ? 'recurring_cancelled'
        : subscription.status === 'active'
          ? 'recurring_active'
          : `recurring_${subscription.status}`,
      stripeInvoiceId: invoice.id,
      stripeSubscriptionId: subscriptionId,
      lastRecurringPaymentAt: paidAuthority.timestamp,
      lastRecurringPaymentUnixSeconds: paidAuthority.unixSeconds,
      lastRecurringPaymentAuthority: paidAuthority.source,
    });

    await recordDonationTransaction(event, {
      donationIntentId,
      kind: 'recurring_payment',
      amountPaid: invoice.amount_paid,
      currency: invoice.currency,
      stripeInvoiceId: invoice.id,
      stripeSubscriptionId: subscriptionId,
      processorPaidAt: paidAuthority.timestamp,
      processorPaidUnixSeconds: paidAuthority.unixSeconds,
      processorPaidAtAuthority: paidAuthority.source,
    });
    return;
  }

  if (event.type === 'payment_intent.payment_failed') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const recurringDonationIntentId = await donationIntentFromInvoicePayment(stripe, paymentIntent.id);
    const donationIntentId = recurringDonationIntentId
      ?? paymentIntent.metadata?.donationIntentId
      ?? null;
    const recurring = Boolean(recurringDonationIntentId);
    await setIntentStatus(donationIntentId, event, {
      status: recurring ? 'recurring_payment_failed' : 'payment_failed',
      stripePaymentIntentId: paymentIntent.id,
      lastPaymentErrorCode: paymentIntent.last_payment_error?.code ?? null,
    });
    await recordDonationTransaction(event, {
      donationIntentId,
      kind: recurring ? 'recurring_payment_failed' : 'one_time_payment_failed',
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      stripePaymentIntentId: paymentIntent.id,
      failureCode: paymentIntent.last_payment_error?.code ?? null,
    });
    return;
  }

  if (event.type === 'invoice.payment_failed') {
    const invoice = event.data.object as Stripe.Invoice;
    const subscriptionId = subscriptionIdFromInvoice(invoice);
    const donationIntentId = subscriptionId
      ? await donationIntentFromSubscription(stripe, subscriptionId)
      : null;
    const subscription = subscriptionId
      ? await stripe.subscriptions.retrieve(subscriptionId)
      : null;
    await setIntentStatus(donationIntentId, event, {
      status: subscription?.status === 'canceled' ? 'recurring_cancelled' : 'recurring_payment_failed',
      stripeInvoiceId: invoice.id,
      stripeSubscriptionId: subscriptionId,
    });
    await recordDonationTransaction(event, {
      donationIntentId,
      kind: 'recurring_payment_failed',
      amountDue: invoice.amount_due,
      currency: invoice.currency,
      stripeInvoiceId: invoice.id,
      stripeSubscriptionId: subscriptionId,
    });
    return;
  }

  if (event.type === 'charge.refunded') {
    const charge = event.data.object as Stripe.Charge;
    const donationIntentId = await donationIntentFromCharge(stripe, charge);
    const fullRefund = charge.amount_refunded >= charge.amount;
    await setIntentStatus(donationIntentId, event, {
      status: fullRefund ? 'refunded' : 'partially_refunded',
      amountRefunded: charge.amount_refunded,
      stripeChargeId: charge.id,
    });
    await recordDonationTransaction(event, {
      donationIntentId,
      kind: fullRefund ? 'refund_full' : 'refund_partial',
      amount: charge.amount,
      amountRefunded: charge.amount_refunded,
      currency: charge.currency,
      stripeChargeId: charge.id,
    });
    return;
  }

  if (
    event.type === 'charge.dispute.created'
    || event.type === 'charge.dispute.updated'
    || event.type === 'charge.dispute.closed'
  ) {
    const dispute = event.data.object as Stripe.Dispute;
    const donationIntentId = await donationIntentFromCharge(stripe, dispute.charge);
    const kind = event.type === 'charge.dispute.created'
      ? 'dispute_opened'
      : event.type === 'charge.dispute.closed'
        ? 'dispute_closed'
        : 'dispute_updated';
    await setIntentStatus(donationIntentId, event, {
      status: `dispute_${dispute.status}`,
      stripeDisputeId: dispute.id,
      disputeStatus: dispute.status,
    });
    await recordDonationTransaction(event, {
      donationIntentId,
      kind,
      amount: dispute.amount,
      currency: dispute.currency,
      reason: dispute.reason,
      stripeDisputeId: dispute.id,
      disputeStatus: dispute.status,
    });
    return;
  }

  if (event.type === 'payout.paid' || event.type === 'payout.failed' || event.type === 'payout.canceled') {
    const payout = event.data.object as Stripe.Payout;
    await recordReconciliationEvent(event, {
      kind: event.type,
      amount: payout.amount,
      currency: payout.currency,
      arrivalDate: payout.arrival_date,
      stripePayoutId: payout.id,
      payoutStatus: payout.status,
    });
    return;
  }

  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object as Stripe.Subscription;
    const donationIntentId = subscription.metadata?.donationIntentId;
    if (donationIntentId) {
      await setIntentStatus(donationIntentId, event, {
        status: 'recurring_cancelled',
        stripeSubscriptionId: subscription.id,
      });
    }
  }
}

export const stripeDonationWebhook = onRequest(
  { secrets: [stripeSecretKey, stripeWebhookSecret] },
  async (request, response) => {
    const signature = request.header('stripe-signature');
    if (!signature) {
      response.status(400).send('Missing Stripe signature.');
      return;
    }

    const webhookSecret = stripeWebhookSecret.value().trim();
    if (!webhookSecret) {
      response.status(503).send('Donation webhook authentication is not configured.');
      return;
    }

    let event: Stripe.Event;
    try {
      event = stripeClient().webhooks.constructEvent(request.rawBody, signature, webhookSecret);
    } catch {
      response.status(400).send('Invalid webhook signature.');
      return;
    }

    const eventRef = db.collection('stripeWebhookEvents').doc(event.id);
    const existing = await eventRef.get();
    if (existing.exists) {
      response.status(200).json({ received: true, duplicate: true });
      return;
    }

    try {
      const stripe = stripeClient();
      await processStripeEvent(stripe, event);
      await eventRef.create({
        eventType: event.type,
        processedAt: FieldValue.serverTimestamp(),
      });
      response.status(200).json({ received: true });
    } catch (error) {
      console.error('Stripe donation webhook processing failed', { eventId: event.id, eventType: event.type });
      response.status(500).send('Webhook processing failed.');
    }
  },
);
