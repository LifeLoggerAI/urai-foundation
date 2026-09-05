#!/usr/bin/env python3

from __future__ import annotations

import importlib.util
import unittest
from pathlib import Path

SCRIPT = Path(__file__).resolve().parents[1] / "scripts" / "validate-donations.py"
SPEC = importlib.util.spec_from_file_location("validate_donations", SCRIPT)
assert SPEC is not None and SPEC.loader is not None
validate_donations = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(validate_donations)


class DonationBackendContractTests(unittest.TestCase):
    def test_donation_backend_contract_passes(self) -> None:
        self.assertEqual(validate_donations.main(), 0)

    def test_retry_ties_and_recurring_failure_attribution_are_locked(self) -> None:
        donations = (validate_donations.ROOT / "functions/src/donations.ts").read_text(encoding="utf-8")
        self.assertIn("successfulRetryAtSameTime", donations)
        self.assertIn("staleFailureAfterSameTimeSuccess", donations)
        self.assertIn("donationIntentFromInvoicePayment(stripe, paymentIntent.id)", donations)
        self.assertIn("kind: recurring ? 'recurring_payment_failed' : 'one_time_payment_failed'", donations)
        self.assertIn("secrets: [stripeSecretKey, stripeWebhookSecret]", donations)
        self.assertIn("Donation webhook authentication is not configured.", donations)
        self.assertIn("const webhookSecret = stripeWebhookSecret.value().trim()", donations)
        self.assertIn("webhooks.constructEvent(request.rawBody, signature, webhookSecret)", donations)
        self.assertIn("TERMINAL_DISPUTE_STATUSES", donations)
        self.assertIn("if (TERMINAL_DISPUTE_STATUSES.has(status)) return 8", donations)
        self.assertIn("stripe.subscriptions.retrieve(subscriptionId)", donations)
        self.assertIn("status: subscription.status === 'canceled'", donations)
        self.assertIn("? 'recurring_cancelled'", donations)
        self.assertIn(": subscription.status === 'active'", donations)
        self.assertIn("requestedStatus === 'recurring_payment_failed'", donations)
        self.assertIn("decreasesRefundTotal", donations)
        self.assertIn("nextAmountRefunded < priorAmountRefunded", donations)
        self.assertIn("if (typeof donationIntentId !== 'string' || !donationIntentId) return false", donations)
        self.assertIn("if (!intent.exists) return false", donations)
        self.assertNotIn(r"\\n", donations)

    def test_recurring_payment_chronology_uses_processor_authority(self) -> None:
        donations = (validate_donations.ROOT / "functions/src/donations.ts").read_text(encoding="utf-8")
        self.assertIn("invoice.status_transitions?.paid_at", donations)
        self.assertIn("source: hasInvoicePaidAt ? 'invoice.status_transitions.paid_at' : 'stripe_event.created'", donations)
        self.assertIn("Timestamp.fromMillis(unixSeconds * 1000)", donations)
        self.assertIn("lastRecurringPaymentAt: paidAuthority.timestamp", donations)
        self.assertIn("lastRecurringPaymentUnixSeconds: paidAuthority.unixSeconds", donations)
        self.assertIn("lastRecurringPaymentAuthority: paidAuthority.source", donations)
        self.assertIn("processorPaidAt: paidAuthority.timestamp", donations)
        self.assertIn("processorPaidAtAuthority: paidAuthority.source", donations)
        self.assertIn("processedAt: FieldValue.serverTimestamp()", donations)
        invoice_paid_block = donations.split("if (event.type === 'invoice.paid')", 1)[1].split("if (event.type === 'payment_intent.payment_failed')", 1)[0]
        self.assertNotIn("lastRecurringPaymentAt: FieldValue.serverTimestamp()", invoice_paid_block)

    def test_every_donation_collection_is_checked_independently(self) -> None:
        source = SCRIPT.read_text(encoding="utf-8")
        self.assertIn("block.group(\"body\")", source)
        self.assertIn("non-canonical or permissive client mutation allow", source)


if __name__ == "__main__":
    unittest.main()
