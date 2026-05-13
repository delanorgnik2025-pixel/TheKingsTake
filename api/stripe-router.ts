import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { bookings } from "@db/schema";

// Stripe integration - works in TEST mode without real keys
// When you add STRIPE_SECRET_KEY to .env, it switches to live mode
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

async function getStripe() {
  if (!stripeSecretKey) return null;
  const { default: Stripe } = await import("stripe");
  return new Stripe(stripeSecretKey, { apiVersion: "2024-12-18.acacia" });
}

export const stripeRouter = createRouter({
  // Create a checkout session for one-time purchases
  createCheckout: publicQuery
    .input(z.object({
      serviceSlug: z.string(),
      serviceName: z.string(),
      price: z.number(),
      successUrl: z.string(),
      cancelUrl: z.string(),
      customerEmail: z.string().email().optional(),
    }))
    .mutation(async ({ input }) => {
      const stripe = await getStripe();

      // If no Stripe key, return a test mode response
      if (!stripe) {
        return {
          testMode: true,
          url: input.successUrl + "?test_payment=success",
          message: "Test mode: No Stripe key configured. Add STRIPE_SECRET_KEY to .env for live payments.",
        };
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [{
          price_data: {
            currency: "usd",
            product_data: { name: input.serviceName },
            unit_amount: input.price,
          },
          quantity: 1,
        }],
        mode: "payment",
        success_url: input.successUrl,
        cancel_url: input.cancelUrl,
        customer_email: input.customerEmail,
      });

      return { testMode: false, url: session.url, sessionId: session.id };
    }),

  // Create checkout using existing Stripe Price ID (for book, products, etc.)
  createCheckoutByPriceId: publicQuery
    .input(z.object({
      priceId: z.string(),
      successUrl: z.string(),
      cancelUrl: z.string(),
      customerEmail: z.string().email().optional(),
    }))
    .mutation(async ({ input }) => {
      const stripe = await getStripe();

      if (!stripe) {
        return {
          testMode: true,
          url: input.successUrl + "?test_payment=success",
          message: "Test mode: No Stripe key configured. Add STRIPE_SECRET_KEY to .env for live payments.",
        };
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [{ price: input.priceId, quantity: 1 }],
        mode: "payment",
        success_url: input.successUrl,
        cancel_url: input.cancelUrl,
        customer_email: input.customerEmail,
      });

      return { testMode: false, url: session.url, sessionId: session.id };
    }),

  // Create a subscription checkout
  createSubscription: publicQuery
    .input(z.object({
      serviceSlug: z.string(),
      serviceName: z.string(),
      price: z.number(),
      successUrl: z.string(),
      cancelUrl: z.string(),
      customerEmail: z.string().email().optional(),
    }))
    .mutation(async ({ input }) => {
      const stripe = await getStripe();

      if (!stripe) {
        return {
          testMode: true,
          url: input.successUrl + "?test_payment=success",
          message: "Test mode: No Stripe key configured. Add STRIPE_SECRET_KEY to .env for live payments.",
        };
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [{
          price_data: {
            currency: "usd",
            product_data: { name: input.serviceName },
            unit_amount: input.price,
            recurring: { interval: "month" },
          },
          quantity: 1,
        }],
        mode: "subscription",
        success_url: input.successUrl,
        cancel_url: input.cancelUrl,
        customer_email: input.customerEmail,
      });

      return { testMode: false, url: session.url, sessionId: session.id };
    }),

  // Create a booking record after successful payment (called from frontend)
  confirmBooking: publicQuery
    .input(z.object({
      serviceId: z.number(),
      name: z.string(),
      email: z.string().email(),
      phone: z.string().optional(),
      message: z.string().optional(),
      amountPaid: z.number(),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(bookings).values({
        serviceId: input.serviceId,
        name: input.name,
        email: input.email,
        phone: input.phone ?? null,
        message: input.message ?? null,
        amountPaid: input.amountPaid,
        status: "pending",
      }).$returningId();
      return { id: result[0].id, success: true };
    }),
});
