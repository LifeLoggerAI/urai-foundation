# URAI Foundation Donation Backend Contract

Status: implementation contract. Online donations remain disabled until activation evidence is complete.

## Purpose

The public `/donate/` page is the supporter-facing surface. The payment backend uses hosted Stripe Checkout so payment-card entry remains on the payment processor's hosted experience rather than in URAI Foundation application code.

The system supports two intended cadences:

- one-time contribution (`payment` Checkout mode)
- monthly recurring contribution (`subscription` Checkout mode)

## Hard activation gate

`createDonationCheckout` refuses checkout unless all required runtime configuration is present and `FOUNDATION_DONATIONS_ENABLED` is exactly `true`.

Required activation configuration:

- `FOUNDATION_DONATIONS_ENABLED=true`
- `FOUNDATION_DONATION_RECEIVING_ENTITY=<verified exact legal receiving entity>`
- `FOUNDATION_DONATION_DISCLOSURE_VERSION=<reviewed disclosure version>`
- `DONATION_STRIPE_SECRET_KEY` in Cloud Secret Manager
- `DONATION_STRIPE_WEBHOOK_SECRET` in Cloud Secret Manager
- approved same-origin success/cancel URLs under `https://uraifoundation.org/`

The default state is disabled.

Do not set the activation flag until the receiving entity, processor account ownership, bank settlement destination, fundraising language, receipt language, tax treatment, refund policy, privacy policy, accounting treatment, and required registrations/reporting have been independently verified for the applicable jurisdiction.

The Foundation name, `.org` domain, repository language, or payment processor approval are not evidence that a contribution is tax deductible.

## Checkout flow

1. Public client requests a checkout session with amount, cadence, and optional receipt email.
2. Firebase App Check must pass.
3. Server validates amount and cadence.
4. Server verifies the activation gate.
5. Server creates `donationIntents/{id}` with `creating_checkout` state.
6. Server creates Stripe hosted Checkout Session.
7. Server stores the Stripe Checkout Session ID and marks the intent `checkout_created`.
8. Browser redirects to Stripe-hosted Checkout using the returned URL.
9. Browser may return to `/donate/thanks/`, but browser return is not payment authority.
10. Stripe's signed webhook event is the transaction-state authority.

Initial accepted amount range is $1 through $10,000 USD. Raising or broadening those limits is a policy/accounting decision, not a UI-only change.

## Webhook integrity

`stripeDonationWebhook`:

- reads the `stripe-signature` request header;
- verifies the signature using Stripe's webhook secret and the raw request body;
- rejects unverifiable events;
- records processed event IDs in `stripeWebhookEvents/{eventId}`;
- treats duplicate event IDs idempotently;
- updates server-owned donation records only after verification.

Do not place middleware in front of the webhook that mutates the raw body before Stripe signature verification.

## Processor chronology

Accounting and receipt chronology must use processor-owned event time rather than webhook execution time. For `invoice.paid`, the authoritative recurring-payment timestamp is Stripe's `invoice.status_transitions.paid_at` when present. If Stripe omits that field, the signed Stripe event's `event.created` timestamp is the bounded fallback. Both are processor-supplied Unix timestamps and are converted to Firestore `Timestamp` values.

The ledger records the selected source alongside the timestamp so a reviewer can distinguish `invoice.status_transitions.paid_at` from the `stripe_event.created` fallback. Server processing time remains separate in `updatedAt`, transaction `processedAt`, and webhook-event `processedAt`; delayed or retried webhook execution must never rewrite the accounting payment period merely because processing occurred later.

## Server-owned collections

### `donationIntents/{intentId}`

Lifecycle record created before Checkout Session creation.

Fields include:

- `amountCents`
- `currency`
- `cadence`
- `receiptEmail`
- `receivingEntity`
- `disclosureVersion`
- `processor`
- `status`
- Stripe Checkout/customer/subscription identifiers where applicable
- processor-authoritative recurring-payment timestamp/source where applicable
- server processing timestamps

### `donationTransactions/{processorEventId}`

Idempotent processor-event ledger. Initial event kinds include one-time payment, recurring subscription start, and recurring invoice payment. Recurring-payment entries retain processor payment time/source separately from server `processedAt`.

### `stripeWebhookEvents/{eventId}`

Webhook-processing marker for idempotency and operational audit.

### `donationReconciliationEvents/{processorEventId}`

Server-owned records for signed Stripe payout lifecycle events. These records support reconciliation but do not by themselves prove that a payout belongs entirely to Foundation donations or that the settlement bank/accounting entry is correct.

All four collections are client-write-denied in Firestore rules. Only Foundation owner/admin roles may read them through Firestore client access.

## Privacy

Only collect transaction data required to process, reconcile, support, refund, and meet applicable record-retention/accounting duties.

Donation consent and marketing/newsletter consent must remain separate. A donation must not silently subscribe a donor to unrelated communications.

No donor record or payment secret belongs in this public GitHub repository.

## Receipts

This slice does not independently issue a legal/tax receipt. Receipt wording must be activated only after the Foundation's authoritative entity/tax treatment and accounting requirements are established.

Processor payment confirmation and a legal charitable/tax receipt are not assumed to be the same thing.

## Refunds, disputes, cancellations

Production activation must include tested lifecycle handling for:

- refund requested
- partial/full refund completed
- payment failure
- dispute opened/updated/closed
- recurring payment failure
- subscription cancellation
- corrected receipt/acknowledgement where applicable
- reconciliation adjustment

The backend records completed and partial refunds, one-time and recurring payment failures, dispute creation/update/closure, subscription cancellation, successful recurring invoices, and payout paid/failed/canceled events. These handlers remain source-level controls until Stripe test-mode replay proves the exact deployed revision, duplicate delivery, out-of-order delivery, recovery, alerting, and accounting read-back behavior.

## Reconciliation

Before activation, establish:

- verified processor account owner;
- verified settlement bank account;
- daily/periodic processor settlement reconciliation;
- accounting export/import path;
- transaction/refund/dispute matching;
- restricted/designated fund treatment if designations are ever enabled;
- year-end reporting workflow where legally applicable.

## Return page

`/donate/thanks/` is a `noindex` transactional return page. It explicitly states that reaching the page is not proof that payment settled and does not establish tax deductibility.

The server webhook record remains authoritative for payment state.

## Deployment checklist

- [ ] Exact legal receiving entity verified.
- [ ] Authoritative tax/fundraising treatment reviewed.
- [ ] Stripe account verified as owned by the receiving entity.
- [ ] Settlement bank verified.
- [ ] Secret Manager values configured.
- [ ] App Check configured/enforced for callable checkout creation.
- [ ] Stripe webhook endpoint registered and signature test passes.
- [ ] `FOUNDATION_DONATIONS_ENABLED` remains false during staging/configuration.
- [ ] One-time test-mode journey succeeds.
- [ ] Monthly test-mode journey succeeds with recurring accounting time matched to Stripe processor time.
- [ ] Duplicate webhook test is idempotent.
- [ ] Delayed/retried recurring webhook preserves original processor payment period.
- [ ] Failed/expired checkout behavior verified.
- [ ] Refund/dispute/cancellation lifecycle tests pass.
- [ ] Donor privacy/retention language reviewed.
- [ ] Receipt/acknowledgement wording reviewed.
- [ ] Reconciliation process exercised.
- [ ] Monitoring and alerting enabled for webhook/function/payment failures.
- [ ] Only after all above: enable production checkout.
