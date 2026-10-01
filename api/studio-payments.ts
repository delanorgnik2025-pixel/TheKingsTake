import Stripe from 'stripe';
import { randomUUID } from 'node:crypto';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { and, eq, desc } from 'drizzle-orm';
import { createRouter, publicQuery, adminQuery } from './middleware';
import { getDb } from './queries/connection';
import { studioOrders } from '../db/schema';
import { studioCheckoutSchema, studioCheckoutDetails, studioPaymentOffers } from '../contracts/studio-payments';

export function studioPaymentConfiguration() {
  const key = process.env.STRIPE_SECRET_KEY || '';
  const live = /^(sk|rk)_live_/.test(key);
  const test = /^(sk|rk)_test_/.test(key);
  return { ready: (live || test) && Boolean(process.env.STRIPE_WEBHOOK_SECRET) && (process.env.NODE_ENV !== 'production' || live), mode: live ? 'live' : test ? 'test' : 'unconfigured' };
}
function client() { return new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-08-26.dahlia' }); }
const attempts = new Map<string, { count: number; expires: number }>();
export const studioPaymentsRouter = createRouter({
  configuration: publicQuery.query(() => studioPaymentConfiguration()),
  checkout: publicQuery.input(studioCheckoutSchema).mutation(async ({ input, ctx }) => {
    if (input.companyWebsite) throw new TRPCError({ code: 'BAD_REQUEST', message: 'Please leave the verification field empty.' });
    if (!studioPaymentConfiguration().ready) throw new TRPCError({ code: 'PRECONDITION_FAILED', message: 'Online payment is not available yet. Please send a project inquiry.' });
    const ip = ctx.req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const now = Date.now();
    for (const [key, value] of attempts) if (value.expires <= now) attempts.delete(key);
    const attempt = attempts.get(ip) || { count: 0, expires: now + 15 * 60_000 };
    if (attempt.count >= 5) throw new TRPCError({ code: 'TOO_MANY_REQUESTS', message: 'Please wait 15 minutes before starting another checkout.' });
    attempt.count++; attempts.set(ip, attempt);
    const orderId = randomUUID(), stripe = client();
    let session: Stripe.Checkout.Session | undefined;
    try {
      session = await stripe.checkout.sessions.create(studioCheckoutDetails(input, orderId), { idempotencyKey: orderId });
      if (!session.url || session.livemode !== (studioPaymentConfiguration().mode === 'live')) throw new Error('Checkout mode mismatch');
      const offer = studioPaymentOffers.find(item => item.id === input.offerId)!;
      await getDb().insert(studioOrders).values({ id: orderId, sessionId: session.id, offerId: offer.id, packageName: offer.package,
        customerName: input.name, email: input.email.toLowerCase(), business: input.business, project: input.project,
        amountCents: offer.amount, totalCents: offer.total, liveMode: session.livemode, status: 'pending' });
      return { url: session.url };
    } catch {
      if (session) { try { await stripe.checkout.sessions.expire(session.id); } catch { console.warn('[studio-payment] Failed to expire an unconfirmed checkout.'); } }
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'We could not start a secure checkout. Please try again or send an inquiry.' });
    }
  }),
  status: publicQuery.input(z.object({ sessionId: z.string().regex(/^cs_(live|test)_[A-Za-z0-9]+$/).max(255) })).query(async ({ input }) => {
    try {
      const [order] = await getDb().select({ status: studioOrders.status, package: studioOrders.packageName, amount: studioOrders.amountCents, live: studioOrders.liveMode }).from(studioOrders).where(eq(studioOrders.sessionId, input.sessionId)).limit(1);
      return order || null;
    } catch { throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Payment confirmation is temporarily unavailable. Check your Stripe receipt or contact Ronald.' }); }
  }),
  orders: adminQuery.query(async () => {
    try { return await getDb().select().from(studioOrders).orderBy(desc(studioOrders.createdAt)).limit(100); }
    catch { throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Service orders could not be loaded. Please try again.' }); }
  }),
});

export function paidSessionMatchesOrder(session: Stripe.Checkout.Session, order: { id: string; offerId: string; amountCents: number; currency: string; liveMode: boolean }) {
  return session.payment_status === 'paid' && session.status === 'complete' && session.metadata?.studio_order_id === order.id && session.metadata?.studio_offer_id === order.offerId && session.amount_total === order.amountCents && session.currency === order.currency && session.livemode === order.liveMode;
}
export async function applyStudioPaymentEvent(event: Stripe.Event) {
  if (['checkout.session.completed', 'checkout.session.async_payment_succeeded', 'checkout.session.expired'].includes(event.type)) {
    const session = event.data.object as Stripe.Checkout.Session;
    if (!session.metadata?.studio_order_id) return; // Book and other unrelated payments have their own fulfillment.
    const db = getDb();
    const [order] = await db.select().from(studioOrders).where(eq(studioOrders.sessionId, session.id)).limit(1);
    if (!order) throw new Error('Studio order is not available yet'); // Return 500 so Stripe retries.
    if (event.type === 'checkout.session.expired') {
      await db.update(studioOrders).set({ status: 'expired' }).where(and(eq(studioOrders.id, order.id), eq(studioOrders.status, 'pending'))); return;
    }
    if (!paidSessionMatchesOrder(session, order)) throw new Error('Studio payment details do not match');
    const paymentIntentId = typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id;
    await db.update(studioOrders).set({ status: 'paid', paymentIntentId: paymentIntentId || null, paidAt: new Date(event.created * 1000) }).where(and(eq(studioOrders.id, order.id), eq(studioOrders.status, 'pending')));
  } else if (event.type === 'charge.refunded') {
    const charge = event.data.object as Stripe.Charge;
    const paymentIntentId = typeof charge.payment_intent === 'string' ? charge.payment_intent : charge.payment_intent?.id;
    if (paymentIntentId) await getDb().update(studioOrders).set({ status: charge.refunded ? 'refunded' : 'partially_refunded', refundedCents: charge.amount_refunded }).where(eq(studioOrders.paymentIntentId, paymentIntentId));
  }
}
export async function studioWebhook(request: Request): Promise<Response> {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) return Response.json({ error: 'Payment webhook is not configured.' }, { status: 503 });
  const signature = request.headers.get('stripe-signature');
  if (!signature) return Response.json({ error: 'Missing payment signature.' }, { status: 400 });
  let event: Stripe.Event;
  try { event = client().webhooks.constructEvent(await request.text(), signature, process.env.STRIPE_WEBHOOK_SECRET); }
  catch { return Response.json({ error: 'Invalid payment signature.' }, { status: 400 }); }
  if (event.livemode !== (studioPaymentConfiguration().mode === 'live')) return Response.json({ error: 'Payment mode mismatch.' }, { status: 400 });
  try { await applyStudioPaymentEvent(event); return Response.json({ received: true }); }
  catch { console.warn('[studio-payment] Event could not be applied; Stripe should retry.'); return Response.json({ error: 'Payment recording is temporarily unavailable.' }, { status: 500 }); }
}
