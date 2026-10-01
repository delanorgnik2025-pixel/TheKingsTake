# Brand Studio Stripe activation

The public Brand Studio checkout supports Brand Essentials ($495 in full), Author Launch ($1,247.50 deposit), and Business Identity ($1,247.50 deposit). Each website deposit is 50% of the $2,495 base package. The remaining stages are $748.50 at design approval and $499 before launch; this integration does not charge those automatically. Expanded scope and paid providers remain separate agreements.

## Activate live payments

1. Complete the business and payout setup in your Stripe account. In Stripe Dashboard > Developers > API keys, copy the live secret key directly into Railway > TheKingsTake > production > Variables as `STRIPE_SECRET_KEY`. Never paste a secret into chat, a screenshot, source code or a public client variable.
2. In Stripe Dashboard > Developers / Workbench > Webhooks, create a live destination for `https://thekingstake.com/api/stripe/webhook`. Select `checkout.session.completed`, `checkout.session.async_payment_succeeded`, `checkout.session.expired` and `charge.refunded`. Copy its signing secret directly into Railway as `STRIPE_WEBHOOK_SECRET`.
3. Apply the Railway changes and redeploy. Brand Studio's checkout buttons enable only when both credentials are present and the server has a live key. The admin Orders section also shows readiness.
4. In Stripe settings, confirm your business name, statement descriptor, customer support contact, receipt preferences, tax obligations and refund terms. Set any required tax treatment before offering taxed services. This checkout currently charges the displayed USD amount, without adding automated tax. No refund policy is invented by the integration.

## Confirmation and operations

Card details are collected only on Stripe-hosted Checkout. The server chooses the amount; clients cannot override it. A pending order is saved before the visitor receives a checkout URL. If persistence fails, the session is expired where possible and no checkout URL is given.

Only a signed Stripe webhook with the matching order, offer, amount, currency and mode changes an order from pending to paid. Repeated payment events do not create duplicate orders or charges. A return URL alone never marks payment received. Missing orders or transient recording failures return HTTP 500 so Stripe retries. Refund events update the Orders view. Payment emails depend on Stripe's receipt settings; the integration does not automatically enroll purchasers in the Dispatch.

Orders are visible only to the authenticated owner at Admin > Orders. Existing book Payment Link transactions remain in Stripe and are not automatically imported into this service-order view. Monthly Care and custom writing retain inquiry-based pricing and are not silently enrolled in recurring billing.

## Validation completed before deployment

Server compilation, production client build, payment catalogue/validation tests, missing-credential failure, exact payment matching, signed/forged webhook tests, expired-session handling, owner-only order access. Deployment migrations also verify order insertion and the pending-to-paid update within a rolled-back transaction.

Live payment and refund testing requires your active Stripe account. A test key is intentionally not accepted for customer checkout in production. Do not use a real customer payment as an integration test without their instruction.
