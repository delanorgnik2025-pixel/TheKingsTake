import { z } from 'zod';
export const studioPaymentOffers = [
  { id: 'brand-essentials', package: 'Brand Essentials', amount: 49500, total: 49500, kind: 'full', label: 'Buy package · $495' },
  { id: 'author-launch', package: 'Author Launch', amount: 124750, total: 249500, kind: 'deposit', label: 'Start with 50% · $1,247.50' },
  { id: 'business-identity', package: 'Business Identity', amount: 124750, total: 249500, kind: 'deposit', label: 'Start with 50% · $1,247.50' },
] as const;
export const studioCheckoutSchema = z.object({
  offerId: z.enum(['brand-essentials', 'author-launch', 'business-identity']),
  name: z.string().trim().min(2).max(255), email: z.string().trim().email().max(320),
  business: z.string().trim().min(2).max(200), project: z.string().trim().min(20).max(1500),
  acknowledgeScope: z.literal(true), companyWebsite: z.string().max(500).default(''),
});
export type StudioCheckoutInput = z.infer<typeof studioCheckoutSchema>;
export function studioCheckoutDetails(input: StudioCheckoutInput, orderId: string) {
  const offer = studioPaymentOffers.find(item => item.id === input.offerId)!;
  return {
    mode: 'payment' as const, payment_method_types: ['card' as const],
    customer_email: input.email.toLowerCase(), client_reference_id: orderId,
    line_items: [{ quantity: 1, price_data: { currency: 'usd', unit_amount: offer.amount,
      product_data: { name: `${offer.package}${offer.kind === 'deposit' ? ' — 50% project deposit' : ''}`,
        description: offer.kind === 'deposit' ? `Base package $2,495. Remaining $1,247.50: 30% at design approval, 20% before launch. Extra scope agreed separately.` : 'Brand direction, primary logo concept, palette and typography guide, three promotional graphics, two consolidated revision rounds. Website sold separately.' } } }],
    metadata: { studio_order_id: orderId, studio_offer_id: offer.id },
    payment_intent_data: { metadata: { studio_order_id: orderId, studio_offer_id: offer.id } },
    success_url: 'https://thekingstake.com/brand-studio?checkout=success&session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'https://thekingstake.com/brand-studio?checkout=cancelled#studio-packages',
  };
}
