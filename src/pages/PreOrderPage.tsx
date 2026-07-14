import { useState } from 'react'
import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import { Shield, ArrowLeft, Sparkles, Mail, FileText, Star, Clock, CheckCircle, AlertTriangle } from 'lucide-react'
import { loadStripe } from '@stripe/stripe-js'
import { trpc } from '@/providers/trpc'
import ScrollReveal from '../components/ScrollReveal'

const BOOK_PRICE_ID = 'price_1TUuET5rzCiGdPFNiXG2ZEi6'

// Direct Stripe Payment Link (most reliable — no API keys required)
// Create one at: https://dashboard.stripe.com/payment-links
const PAYMENT_LINK = import.meta.env.VITE_STRIPE_PAYMENT_LINK || ''

// Client-side Stripe publishable key (fallback when backend session fails)
const STRIPE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || ''

const benefits = [
  { icon: <FileText size={16} />, title: 'Digital Edition', desc: 'PDF + ePub formats for all devices' },
  { icon: <Clock size={16} />, title: 'Early Access', desc: 'Receive the book 48 hours before public release' },
  { icon: <Mail size={16} />, title: 'Exclusive Updates', desc: 'Behind-the-scenes emails from Ronald Lee King during production' },
  { icon: <Star size={16} />, title: 'Founding Reader Status', desc: 'Your name listed in the book\'s acknowledgments section' },
  { icon: <Shield size={16} />, title: 'Full Refund Guarantee', desc: 'Cancel anytime before release for a complete refund' },
  { icon: <Sparkles size={16} />, title: 'Discount Locked In', desc: 'Pre-order price is the lowest the book will ever be' },
]

export default function PreOrderPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  // FALLBACK: Client-side Stripe.js redirect (requires VITE_STRIPE_PUBLISHABLE_KEY)
  const tryClientSideCheckout = async () => {
    if (!STRIPE_KEY) {
      setErrorMsg('Stripe checkout is temporarily unavailable. Please email us at support@thekingstake.com to complete your order.')
      setIsLoading(false)
      return
    }
    try {
      const stripe = await loadStripe(STRIPE_KEY)
      if (!stripe) {
        setErrorMsg('Failed to load Stripe. Please refresh the page and try again.')
        setIsLoading(false)
        return
      }
      const { error: redirectError } = await stripe.redirectToCheckout({
        lineItems: [{ price: BOOK_PRICE_ID, quantity: 1 }],
        mode: 'payment',
        successUrl: window.location.origin + '/pre-order/success',
        cancelUrl: window.location.origin + '/pre-order',
        customerEmail: email || undefined,
      })
      if (redirectError) {
        setErrorMsg(redirectError.message || 'Checkout failed. Please try again.')
        setIsLoading(false)
      }
    } catch (e: any) {
      setErrorMsg(e.message || 'Checkout failed. Please try again.')
      setIsLoading(false)
    }
  }

  // PRIMARY: Backend tRPC checkout session
  const checkout = trpc.stripe.createCheckoutByPriceId.useMutation({
    onSuccess: (data: any) => {
      if (data?.url && !data?.testMode) {
        // Real checkout session URL — redirect immediately
        window.location.href = data.url
      } else {
        // Backend is in test mode (no STRIPE_SECRET_KEY) — fall back
        tryClientSideCheckout()
      }
    },
    onError: () => {
      // Backend request failed — try client-side Stripe.js
      tryClientSideCheckout()
    },
  })

  const handleCheckout = () => {
    if (!agreed || isLoading) return
    setErrorMsg('')
    setIsLoading(true)

    // OPTION 1 (most reliable): Direct Stripe Payment Link
    if (PAYMENT_LINK) {
      window.location.href = PAYMENT_LINK
      return
    }

    // OPTION 2: Backend-created checkout session
    checkout.mutate({
      priceId: BOOK_PRICE_ID,
      successUrl: window.location.origin + '/pre-order/success',
      cancelUrl: window.location.origin + '/pre-order',
      customerEmail: email || undefined,
    })
  }

  const buttonLoading = isLoading || checkout.isPending

  return (
    <div className="min-h-screen bg-[#05080e]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0A0F1A]/95 backdrop-blur-md border-b border-[rgba(255,149,0,0.1)]">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-xs text-[#C9B99A] hover:text-[#FF9500] transition-colors">
            <ArrowLeft size={14} /> Back
          </button>
          <div className="flex items-center gap-2">
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#FF9500]/40">#TheKingsTake</span>
            <span className="text-[#C9B99A]/20">|</span>
            <span className="text-[9px] uppercase tracking-wider text-[#C9B99A]/30">Pre-Order</span>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Hero */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[rgba(255,149,0,0.1)] border border-[rgba(255,149,0,0.2)] rounded-full px-4 py-1.5 mb-6">
              <Clock size={12} className="text-[#FF9500]" />
              <span className="text-[10px] uppercase tracking-[0.15em] text-[#FF9500] font-medium">Pre-Order Now Open</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl text-[#F0EBE1] font-medium leading-[1.1] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              The African American State of the Union
            </h1>
            <p className="text-lg text-[#FF9500]/70 italic mb-2">From the Loins of the Beast</p>
            <p className="text-sm text-[#C9B99A]/60 max-w-xl mx-auto">by Ronald Lee King</p>
          </div>
        </ScrollReveal>

        {/* Error Banner */}
        {errorMsg && (
          <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle size={18} className="text-red-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-red-300">{errorMsg}</p>
              <p className="text-xs text-red-400/50 mt-1">Try refreshing the page or contact support.</p>
            </div>
          </div>
        )}

        {/* Fallback mode indicator */}
        {false && (
          <div className="mb-6 bg-[#FF9500]/5 border border-[#FF9500]/15 rounded-xl p-3 text-center">
            <p className="text-[11px] text-[#C9B99A]/50">Using direct Stripe checkout</p>
          </div>
        )}

        {/* Book Cover + Checkout Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <ScrollReveal delay={0.1}>
            <div style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(255,149,0,0.15)' }}>
              <img src="/images/book-cover.jpg" alt="Book Cover" className="w-full h-auto rounded-lg" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="bg-[rgba(27,40,56,0.6)] border border-[rgba(255,149,0,0.15)] rounded-xl p-6">
              <div className="flex items-baseline justify-between mb-4">
                <div>
                  <span className="text-4xl text-[#FF9500] font-medium">$19.99</span>
                  <span className="text-xs text-[#C9B99A]/50 ml-2 line-through">$24.99</span>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-[#FF9500] bg-[rgba(255,149,0,0.1)] border border-[rgba(255,149,0,0.2)] rounded-full px-3 py-1">Save 20%</span>
              </div>

              <p className="text-sm text-[#C9B99A] mb-4">Digital Edition (PDF + ePub). Pre-order customers receive the book 48 hours before public release.</p>

              {/* Email */}
              <div className="mb-4">
                <label className="text-[10px] uppercase tracking-wider text-[#C9B99A]/50 mb-1.5 block">Email Address (optional)</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="For order updates & early access"
                  className="w-full bg-[rgba(21,32,43,0.6)] border border-[rgba(255,149,0,0.15)] rounded-lg px-4 py-2.5 text-sm text-[#F0EBE1] placeholder:text-[#C9B99A]/25 focus:outline-none focus:border-[rgba(255,149,0,0.4)] transition-colors" />
              </div>

              {/* Agreement */}
              <label className="flex items-start gap-3 mb-6 cursor-pointer">
                <div className={`w-4 h-4 rounded border mt-0.5 shrink-0 flex items-center justify-center transition-colors ${agreed ? 'bg-[#FF9500] border-[#FF9500]' : 'border-[rgba(255,149,0,0.3)]'}`}>
                  {agreed && <CheckCircle size={12} className="text-[#1B2838]" />}
                </div>
                <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="sr-only" />
                <span className="text-[11px] text-[#C9B99A]/60 leading-relaxed">
                  I understand this is a pre-order. The book is still in final production. I will receive my digital copy upon release. I can request a full refund anytime before release.
                </span>
              </label>

              {/* CTA */}
              <button onClick={handleCheckout} disabled={!agreed || buttonLoading}
                className="w-full flex items-center justify-center gap-2 rounded-full h-12 bg-[#FF9500] text-[#1B2838] hover:bg-[#CC6A00] transition-colors font-medium disabled:opacity-30 disabled:cursor-not-allowed"
                style={{ boxShadow: '0 4px 16px rgba(255,149,0,0.25)' }}>
                <Sparkles size={18} />
                {buttonLoading ? 'Loading...' : 'Pre-Order — $19.99'}
              </button>

              <div className="flex items-center justify-center gap-1.5 mt-3">
                <Shield size={10} className="text-[#C9B99A]/30" />
                <span className="text-[9px] text-[#C9B99A]/30">Secure checkout via Stripe. Encrypted & protected.</span>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Benefits */}
        <ScrollReveal delay={0.1}>
          <h2 className="text-lg text-[#F0EBE1] font-medium mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            What You Get With Your Pre-Order
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-16">
            {benefits.map((b, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3 bg-[rgba(27,40,56,0.4)] border border-[rgba(255,149,0,0.08)] rounded-lg p-4">
                <div className="text-[#FF9500] shrink-0 mt-0.5">{b.icon}</div>
                <div>
                  <p className="text-sm text-[#F0EBE1] font-medium">{b.title}</p>
                  <p className="text-[11px] text-[#C9B99A]/50 mt-0.5">{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        {/* About the Author */}
        <ScrollReveal delay={0.1}>
          <div className="bg-[rgba(27,40,56,0.4)] border border-[rgba(255,149,0,0.1)] rounded-xl p-6 mb-12">
            <h2 className="text-lg text-[#F0EBE1] font-medium mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              About This Release
            </h2>
            <div className="space-y-3 text-sm text-[#C9B99A]/70 leading-relaxed">
              <p>
                <strong className="text-[#F0EBE1]">The African American State of the Union: From the Loins of the Beast</strong> is being released independently by Ronald Lee King through AASOTU Media Group LLC.
              </p>
              <p>
                This book was written during one of the most challenging periods of the author's life: navigating a filed 1983 Civil Rights Action, an open EEOC case, and the loss of employment — all while building this platform and preparing this historic digital release.
              </p>
              <p>
                Your pre-order directly supports an independent Black author, father, and entrepreneur who is doing this entirely on his own. Every dollar goes toward final production costs: ISBN registration, professional formatting, proofreading, and cover design.
              </p>
              <p className="text-[#FF9500]/70 italic">
                "I didn't set out to become the voice of a movement. I set out to write a book that confronted the stereotypes we've been force-fed and charted a path toward a new Industrial Revolution built by and for Black people in America."
              </p>
              <p className="text-xs text-[#FF9500]">— Ronald Lee King, Author & Founder, AASOTU Media Group LLC</p>
            </div>
          </div>
        </ScrollReveal>

        {/* FAQ */}
        <ScrollReveal delay={0.1}>
          <h2 className="text-lg text-[#F0EBE1] font-medium mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-3 mb-16">
            {[
              { q: 'When will I receive my digital copy?', a: 'Pre-order customers will receive their digital copy (PDF + ePub) 48 hours before the public release. Target release is 2026.' },
              { q: 'Can I get a refund?', a: 'Yes. You can request a full refund at any time before the book is released. After release, standard digital goods policies apply.' },
              { q: 'What formats will I receive?', a: 'You will receive both PDF (for computers and printing) and ePub (for e-readers like Kindle, Nook, and Apple Books).' },
              { q: 'Will there be a paperback version?', a: 'Yes. A paperback edition ($24.99) and a signed edition ($49.99) are planned for release after the digital edition. Pre-order customers will be notified first.' },
              { q: 'Is my payment secure?', a: 'All payments are processed through Stripe, the same payment platform used by major companies worldwide. Your card information is never stored on our servers.' },
              { q: 'Why pre-order instead of waiting?', a: 'Pre-order customers get the lowest price ($19.99 vs $24.99 at release), early access, exclusive updates from the author, and founding reader acknowledgment in the book.' },
            ].map((faq, i) => (
              <div key={i} className="bg-[rgba(27,40,56,0.3)] border border-[rgba(255,149,0,0.06)] rounded-lg p-4">
                <p className="text-sm text-[#F0EBE1] font-medium mb-1">{faq.q}</p>
                <p className="text-xs text-[#C9B99A]/50 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Bottom CTA */}
        <ScrollReveal delay={0.1}>
          <div className="text-center mb-12">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-2 rounded-full h-12 bg-[#FF9500] text-[#1B2838] hover:bg-[#CC6A00] transition-colors font-medium px-8"
              style={{ boxShadow: '0 4px 16px rgba(255,149,0,0.25)' }}>
              <Sparkles size={18} />
              Pre-Order Your Copy — $19.99
            </button>
            <p className="text-[10px] text-[#C9B99A]/30 mt-3">Secure checkout via Stripe. Full refund guarantee before release.</p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}
