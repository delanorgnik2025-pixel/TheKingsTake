import { describe, it, expect, vi, afterEach } from 'vitest';
import Stripe from 'stripe';
import { studioCheckoutSchema, studioCheckoutDetails } from '../contracts/studio-payments';
const mocks = vi.hoisted(() => {
  const rows = vi.fn(), writes = vi.fn().mockResolvedValue(undefined), values = vi.fn().mockResolvedValue(undefined);
  return { rows, writes, values, db: { select: vi.fn(() => ({ from: () => ({ where: () => ({ limit: rows }) }) })), update: vi.fn(() => ({ set: (value: unknown) => ({ where: (condition: unknown) => writes(value, condition) }) })), insert: vi.fn(() => ({ values })) } };
});
vi.mock('./queries/connection', () => ({ getDb: () => mocks.db }));
import { studioPaymentsRouter, studioWebhook, paidSessionMatchesOrder, studioPaymentConfiguration, applyStudioPaymentEvent } from './studio-payments';
const input = { offerId: 'author-launch' as const, name: 'Example Buyer', email: 'BUYER@example.com', business: 'Example Author', project: 'An author website and book launch.', acknowledgeScope: true as const, companyWebsite: '' };
const order = { id: 'order-id', offerId: 'author-launch', amountCents: 124750, currency: 'usd', liveMode: false };
const session = { id: 'cs_test_123', payment_status: 'paid', status: 'complete', amount_total: 124750, currency: 'usd', livemode: false, metadata: { studio_order_id: 'order-id', studio_offer_id: 'author-launch' }, payment_intent: 'pi_test' } as unknown as Stripe.Checkout.Session;
afterEach(() => { vi.unstubAllEnvs(); vi.clearAllMocks(); });
describe('Brand Studio payment integrity', () => {
  it('uses server catalogue prices and fixed redirect URLs even if a browser submits overrides', () => {
    const parsed = studioCheckoutSchema.parse({ ...input, amount: 1, successUrl: 'https://evil.invalid' });
    const details = studioCheckoutDetails(parsed, 'order-id');
    expect(details.line_items[0].price_data.unit_amount).toBe(124750);
    expect(details.success_url).toBe('https://thekingstake.com/brand-studio?checkout=success&session_id={CHECKOUT_SESSION_ID}');
    expect(details.customer_email).toBe('buyer@example.com');
    expect(studioCheckoutDetails({...input,offerId:'brand-essentials'}, 'order-id').line_items[0].price_data.unit_amount).toBe(49500);
  });
  it('rejects missing acknowledgement and unknown packages', () => {
    expect(studioCheckoutSchema.safeParse({...input,acknowledgeScope:false}).success).toBe(false);
    expect(studioCheckoutSchema.safeParse({...input,offerId:'arbitrary'}).success).toBe(false);
  });
  it('keeps checkout unavailable without both secrets and forbids test payments in production', () => {
    vi.stubEnv('STRIPE_SECRET_KEY', ''); vi.stubEnv('STRIPE_WEBHOOK_SECRET', '');
    expect(studioPaymentConfiguration().ready).toBe(false);
    vi.stubEnv('STRIPE_SECRET_KEY','sk_test_example'); vi.stubEnv('STRIPE_WEBHOOK_SECRET','whsec_example'); vi.stubEnv('NODE_ENV','production');
    expect(studioPaymentConfiguration().ready).toBe(false);
    vi.stubEnv('STRIPE_SECRET_KEY','sk_live_example'); expect(studioPaymentConfiguration().ready).toBe(true);
  });
  it('never returns a fake payment success when credentials are missing', async () => {
    vi.stubEnv('STRIPE_SECRET_KEY','');
    const caller = studioPaymentsRouter.createCaller({req:new Request('https://thekingstake.com/api/trpc/studioPayments.checkout'),resHeaders:new Headers()});
    await expect(caller.checkout(input)).rejects.toMatchObject({code:'PRECONDITION_FAILED'});
    expect(mocks.db.insert).not.toHaveBeenCalled();
  });
  it('requires exact amount, currency, mode, order, offer and a complete paid session', () => {
    expect(paidSessionMatchesOrder(session,order)).toBe(true);
    for (const change of [{amount_total:1},{currency:'eur'},{livemode:true},{payment_status:'unpaid'},{status:'open'},{metadata:{studio_order_id:'other',studio_offer_id:'author-launch'}}]) expect(paidSessionMatchesOrder({...session,...change} as Stripe.Checkout.Session,order)).toBe(false);
  });
  it('rejects forged and missing webhook signatures before touching orders', async () => {
    vi.stubEnv('STRIPE_SECRET_KEY','sk_test_example'); vi.stubEnv('STRIPE_WEBHOOK_SECRET','whsec_example');
    expect((await studioWebhook(new Request('https://thekingstake.com/api/stripe/webhook',{method:'POST',body:'{}'}))).status).toBe(400);
    expect((await studioWebhook(new Request('https://thekingstake.com/api/stripe/webhook',{method:'POST',headers:{'stripe-signature':'forged'},body:'{}'}))).status).toBe(400);
    expect(mocks.db.update).not.toHaveBeenCalled();
  });
  it('records a correctly signed payment through the raw webhook', async () => {
    vi.stubEnv('STRIPE_SECRET_KEY','sk_test_example'); vi.stubEnv('STRIPE_WEBHOOK_SECRET','whsec_example');
    mocks.rows.mockResolvedValue([order]);
    const payload=JSON.stringify({id:'evt_test',type:'checkout.session.completed',created:Math.floor(Date.now()/1000),livemode:false,data:{object:session}});
    const signature=Stripe.webhooks.generateTestHeaderString({payload,secret:'whsec_example'});
    const response=await studioWebhook(new Request('https://thekingstake.com/api/stripe/webhook',{method:'POST',headers:{'stripe-signature':signature},body:payload}));
    expect(response.status).toBe(200); expect(mocks.writes).toHaveBeenCalledWith(expect.objectContaining({status:'paid',paymentIntentId:'pi_test'}),expect.anything());
  });
  it('asks Stripe to retry when the order is not yet persisted', async () => {
    mocks.rows.mockResolvedValue([]);
    await expect(applyStudioPaymentEvent({type:'checkout.session.completed',data:{object:session}} as Stripe.Event)).rejects.toThrow('not available');
    expect(mocks.db.update).not.toHaveBeenCalled();
  });
  it('does not mark cancelled or expired sessions paid or process unrelated book purchases', async () => {
    await applyStudioPaymentEvent({type:'checkout.session.completed',data:{object:{...session,metadata:{}}}} as Stripe.Event);
    expect(mocks.db.update).not.toHaveBeenCalled();
    mocks.rows.mockResolvedValue([order]);
    await applyStudioPaymentEvent({type:'checkout.session.expired',data:{object:session}} as Stripe.Event);
    expect(mocks.writes).toHaveBeenCalledWith({status:'expired'},expect.anything());
  });
  it('requires owner authorization to list customer orders', async () => {
    const caller=studioPaymentsRouter.createCaller({req:new Request('https://thekingstake.com/api/trpc/studioPayments.orders'),resHeaders:new Headers()});
    await expect(caller.orders()).rejects.toMatchObject({code:'FORBIDDEN'});
  });
});
