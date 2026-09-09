// STRIPE PAYMENT LINKS — SINGLE SOURCE OF TRUTH
// Instructions: Create each link in Stripe Dashboard → Payment Links → Create
// Paste the live URL below, save, commit, push. Railway auto-deploys.

export const STRIPE_LINKS = {
  // BOOK PRE-ORDER (already live)
  bookPreOrder: 'https://buy.stripe.com/dRm6oA62Cc5M19q0srf7i02',

  // DEEP ROOTS PASS (premium membership)
  deepRootsMonthly: 'https://buy.stripe.com/PLACEHOLDER_MONTHLY',
  deepRootsYearly: 'https://buy.stripe.com/PLACEHOLDER_YEARLY',

  // ANCESTRAL LAND & HISTORY REPORT (custom research)
  landReportFoundation: 'https://buy.stripe.com/PLACEHOLDER_BASIC99',
  landReportDeepRoots: 'https://buy.stripe.com/PLACEHOLDER_DEEP250',

  // WRITING & CREATIVE SERVICES
  voiceSession: 'https://buy.stripe.com/PLACEHOLDER_VOICE100',
  legacyInterview: 'https://buy.stripe.com/PLACEHOLDER_LEGACY500',
  contentWritingBase: 'https://buy.stripe.com/PLACEHOLDER_CONTENT75',
  ghostwritingBase: 'https://buy.stripe.com/PLACEHOLDER_GHOST1500',
  consultingHourly: 'https://buy.stripe.com/PLACEHOLDER_CONSULT100',
  aiCreativeBase: 'https://buy.stripe.com/PLACEHOLDER_AICREATIVE75',
  speechwritingBase: 'https://buy.stripe.com/PLACEHOLDER_SPEECH150',
  bookPublishingBase: 'https://buy.stripe.com/PLACEHOLDER_BOOK499',
} as const

export function isPlaceholder(link: string): boolean {
  return link.includes('PLACEHOLDER')
}
