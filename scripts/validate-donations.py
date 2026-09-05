#!/usr/bin/env python3
"""Validate the Foundation donation backend remains gated and processor records stay server-owned."""

from __future__ import annotations

import sys
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def main() -> int:
    errors: list[str] = []
    donations = (ROOT / "functions/src/donations.ts").read_text(encoding="utf-8")
    index = (ROOT / "functions/src/index.ts").read_text(encoding="utf-8")
    rules = (ROOT / "firestore.rules").read_text(encoding="utf-8")

    required_donation_controls = [
        "FOUNDATION_DONATIONS_ENABLED",
        "default: 'false'",
        "FOUNDATION_DONATION_RECEIVING_ENTITY",
        "FOUNDATION_DONATION_DISCLOSURE_VERSION",
        "DONATION_STRIPE_SECRET_KEY",
        "DONATION_STRIPE_WEBHOOK_SECRET",
        "secrets: [stripeSecretKey, stripeWebhookSecret]",
        "Donation webhook authentication is not configured.",
        "async function recordDonationTransaction",
        "if (typeof donationIntentId !== 'string' || !donationIntentId) return false",
        "if (!intent.exists) return false",
        "if (!current.exists) return false",
        "enforceAppCheck: true",
        "submit_type: 'donate'",
        "mode: recurring ? 'subscription' : 'payment'",
        "request.rawBody",
        "webhooks.constructEvent",
        "stripe-signature",
        "const webhookSecret = stripeWebhookSecret.value().trim()",
        "if (!webhookSecret)",
        "webhooks.constructEvent(request.rawBody, signature, webhookSecret)",
        "TERMINAL_DISPUTE_STATUSES",
        "if (TERMINAL_DISPUTE_STATUSES.has(status)) return 8",
        "stripeWebhookEvents",
        "checkout.session.async_payment_succeeded",
        "checkout.session.async_payment_failed",
        "payment_intent.payment_failed",
        "invoice.parent?.subscription_details?.subscription",
        "stripe.invoicePayments.list",
        "lastProcessorEventCreated",
        "STATUS_PRECEDENCE",
        "RETRY_SUCCESS_STATUSES",
        "staleFailureAfterSameTimeSuccess",
        "const recurringDonationIntentId = await donationIntentFromInvoicePayment",
        "kind: recurring ? 'recurring_payment_failed' : 'one_time_payment_failed'",
        "status: subscription.status === 'canceled'",
        "? 'recurring_cancelled'",
        ": subscription.status === 'active'",
        "invoice.payment_failed",
        "charge.refunded",
        "charge.dispute.created",
        "charge.dispute.updated",
        "charge.dispute.closed",
        "payout.paid",
        "payout.failed",
        "payout.canceled",
        "donationReconciliationEvents",
        "https://uraifoundation.org/",
    ]
    for snippet in required_donation_controls:
        if snippet not in donations:
            errors.append(f"donations backend missing activation/security control: {snippet}")

    if r"\n" in donations:
        errors.append("donations backend contains literal escaped newline markers")

    required_exports = ["createDonationCheckout", "stripeDonationWebhook", "./donations"]
    for snippet in required_exports:
        if snippet not in index:
            errors.append(f"functions entrypoint missing donation export: {snippet}")

    for collection in (
        "donationIntents",
        "donationTransactions",
        "stripeWebhookEvents",
        "donationReconciliationEvents",
    ):
        block = re.search(
            rf"match /{re.escape(collection)}/\{{[^}}]+\}} \{{(?P<body>.*?)\n    \}}",
            rules,
            re.DOTALL,
        )
        if block is None:
            errors.append(f"firestore.rules missing server-owned donation collection: {collection}")
        else:
            mutation_allows = []
            for operations, condition in re.findall(r"allow\s+([^:]+):\s*if\s+([^;]+);", block.group("body")):
                operation_set = {item.strip() for item in operations.split(",")}
                if operation_set.intersection({"write", "create", "update", "delete"}):
                    mutation_allows.append((operation_set, condition.strip()))
            if mutation_allows != [({"create", "update", "delete"}, "false")]:
                errors.append(
                    f"firestore.rules donation collection has a non-canonical or permissive client mutation allow: {collection}"
                )

    forbidden = [
        "sk_live_",
        "whsec_",
        "tax deductible",
        "tax-deductible",
        "501(c)(3)",
        "FOUNDATION_DONATIONS_ENABLED', { default: 'true'",
    ]
    combined = donations + index
    for snippet in forbidden:
        if snippet in combined:
            errors.append(f"donation source contains forbidden activation/claim/secret marker: {snippet}")

    if errors:
        print("Foundation donation validation failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    print("Foundation donation validation passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
