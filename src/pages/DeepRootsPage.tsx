import { useState } from 'react'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import {
  Crown, Map, FileText, BookOpen, Landmark, Archive, Radio,
  Check, ChevronDown, ArrowLeft, Sparkles, Shield,
} from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'

// ─── payment links (v1 — simple checkout, manual fulfillment) ────────────────
const PAYMENT_LINKS = {
  monthly: 'https://buy.stripe.com/PLACEHOLDER_MONTHLY', // replace with live Stripe link
  yearly: 'https://buy.stripe.com/PLACEHOLDER_YEARLY',
}

const PERKS = [
  {
    icon: Map,
    title: 'Deep-Dive Nation Profiles',
    desc: 'Full treaty histories, land cessions, tribal rolls, and cited sources for all 225+ documented nations — far beyond the free overview.',
  },
  {
    icon: FileText,
    title: 'Downloadable PDF Reports',
    desc: 'State-by-state and nation-by-nation research reports, formatted for educators, homeschool families, and serious students of the record.',
  },
  {
    icon: Landmark,
    title: 'Treaty & Land-Cession Timeline Layer',
    desc: 'An interactive timeline overlaid on the map — watch the land change hands century by century, treaty by treaty.',
  },
  {
    icon: Archive,
    title: 'The Records Vault',
    desc: 'A growing library of primary-source documents — rolls, treaties, reclassification laws — scanned, sourced, and organized.',
  },
  {
    icon: Radio,
    title: 'Monthly Live Map Walkthrough + Q&A',
    desc: 'A private livestream where I walk the map, break down a featured nation, and answer member questions directly.',
  },
]

const FAQ = [
  {
    q: 'Is the free map going away?',
    a: 'Never. The interactive map and basic nation profiles stay free forever — that is the mission. Deep Roots Pass funds the deeper research and keeps the free layer alive.',
  },
  {
    q: 'How do I receive premium content?',
    a: 'After your payment is confirmed, reports and vault documents are delivered straight to your email. Live walkthrough invites go out monthly by email and WhatsApp.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. Monthly members can cancel anytime and keep access through the paid period. Yearly members can cancel within 30 days for a full refund.',
  },
  {
    q: 'Is this affiliated with any tribe?',
    a: 'AASOTU Media Group is an independent research and media company. We document public historical record — only the nations themselves speak for the nations.',
  },
]

export default function DeepRootsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-[#182635]">
      {/* ambient background */}
      <div className="fixed inset-0 pointer-events-none" style={{
        background:
          'radial-gradient(900px 500px at 80% -5%, rgba(255,149,0,0.09), transparent 60%),' +
          'radial-gradient(700px 500px at 10% 40%, rgba(60,110,180,0.08), transparent 60%)',
      }} />

      <div className="relative z-10 max-w-3xl mx-auto px-4 pt-24 pb-24">
        <Link to="/" className="inline-flex items-center gap-2 text-[#C9B99A] text-xs uppercase tracking-[0.2em] hover:text-[#FF9500] transition-colors mb-10">
          <ArrowLeft size={14} /> Home
        </Link>

        {/* Hero */}
        <ScrollReveal>
          <div className="text-center mb-14">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-[rgba(255,149,0,0.4)] bg-[rgba(255,149,0,0.1)] mb-5">
              <Crown size={28} className="text-[#FF9500]" />
            </div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#FF9500] mb-3">Premium Research Membership</p>
            <h1 className="text-4xl sm:text-5xl text-[#F0EBE1] mb-4" style={{ fontFamily: 'Newsreader, serif' }}>
              The Deep Roots Pass
            </h1>
            <p className="text-[#C9B99A] text-base max-w-xl mx-auto leading-relaxed">
              The free map shows you the land. The Pass opens the record — treaties, rolls, cessions, and primary sources, researched and organized for our people.
            </p>
          </div>
        </ScrollReveal>

        {/* Perks */}
        <div className="space-y-4 mb-14">
          {PERKS.map((p, i) => (
            <ScrollReveal key={p.title} delay={i * 0.06}>
              <div className="flex gap-4 rounded-lg border border-[rgba(255,149,0,0.18)] p-5" style={{ background: 'linear-gradient(165deg, rgba(37,54,75,0.9), rgba(24,38,53,0.95))' }}>
                <div className="w-11 h-11 shrink-0 rounded-lg bg-[rgba(255,149,0,0.12)] border border-[rgba(255,149,0,0.3)] flex items-center justify-center">
                  <p.icon size={19} className="text-[#FF9500]" />
                </div>
                <div>
                  <h3 className="text-[#F0EBE1] font-medium mb-1" style={{ fontFamily: 'Newsreader, serif' }}>{p.title}</h3>
                  <p className="text-[#C9B99A] text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Pricing */}
        <ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {/* monthly */}
            <div className="rounded-xl border border-[rgba(255,149,0,0.25)] p-6 text-center" style={{ background: 'linear-gradient(165deg, rgba(37,54,75,0.9), rgba(24,38,53,0.95))' }}>
              <p className="text-[11px] uppercase tracking-[0.25em] text-[#C9B99A] mb-3">Monthly</p>
              <p className="text-4xl text-[#FF9500] font-medium mb-1" style={{ fontFamily: 'Newsreader, serif' }}>$12</p>
              <p className="text-[#C9B99A] text-sm mb-5">per month · cancel anytime</p>
              <a href={PAYMENT_LINKS.monthly} target="_blank" rel="noopener noreferrer"
                className="block w-full py-3 rounded-full bg-[#FF9500] text-[#182635] font-semibold text-sm hover:bg-[#FFB840] transition-colors">
                Join Monthly
              </a>
            </div>
            {/* yearly */}
            <div className="relative rounded-xl border-2 border-[#FF9500] p-6 text-center" style={{ background: 'linear-gradient(165deg, rgba(37,54,75,0.95), rgba(24,38,53,1))', boxShadow: '0 0 40px rgba(255,149,0,0.12)' }}>
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FF9500] text-[#182635] text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1 rounded-full flex items-center gap-1">
                <Sparkles size={10} /> Best Value
              </span>
              <p className="text-[11px] uppercase tracking-[0.25em] text-[#C9B99A] mb-3">Yearly</p>
              <p className="text-4xl text-[#FF9500] font-medium mb-1" style={{ fontFamily: 'Newsreader, serif' }}>$99</p>
              <p className="text-[#C9B99A] text-sm mb-5">per year · <span className="text-[#FFB840]">save $45</span></p>
              <a href={PAYMENT_LINKS.yearly} target="_blank" rel="noopener noreferrer"
                className="block w-full py-3 rounded-full bg-[#FF9500] text-[#182635] font-semibold text-sm hover:bg-[#FFB840] transition-colors">
                Join Yearly
              </a>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="flex items-center justify-center gap-2 mb-14 text-[#C9B99A]/60 text-xs">
            <Shield size={12} className="text-[#FF9500]/60" />
            <span>Secure checkout via Stripe · Cash App & PayPal accepted — note your email in the payment memo</span>
          </div>
        </ScrollReveal>

        {/* Free stays free callout */}
        <ScrollReveal>
          <div className="rounded-lg border border-[rgba(255,149,0,0.15)] bg-[rgba(255,149,0,0.05)] p-5 mb-14 text-center">
            <p className="text-[#F0EBE1] text-sm" style={{ fontFamily: 'Newsreader, serif' }}>
              The map stays free. Always.
            </p>
            <p className="text-[#C9B99A] text-xs mt-1">
              225+ nations, tribal rolls, and treaties remain open to everyone. The Pass goes deeper — it doesn't close any doors.
            </p>
          </div>
        </ScrollReveal>

        {/* FAQ */}
        <ScrollReveal>
          <h2 className="text-xl text-[#F0EBE1] mb-5 text-center" style={{ fontFamily: 'Newsreader, serif' }}>Questions</h2>
          <div className="space-y-2">
            {FAQ.map((f, i) => (
              <div key={i} className="rounded-lg border border-[rgba(255,149,0,0.12)] overflow-hidden" style={{ background: 'rgba(37,54,75,0.6)' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-4 py-3.5 text-left">
                  <span className="text-[#F0EBE1] text-sm font-medium">{f.q}</span>
                  <ChevronDown size={16} className={`text-[#FF9500] transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && <p className="px-4 pb-4 text-[#C9B99A] text-sm leading-relaxed">{f.a}</p>}
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Book cross-sell */}
        <ScrollReveal>
          <div className="mt-14 rounded-xl border border-[rgba(255,149,0,0.25)] p-6 text-center" style={{ background: 'linear-gradient(165deg, rgba(37,54,75,0.9), rgba(24,38,53,0.95))' }}>
            <BookOpen size={22} className="text-[#FF9500] mx-auto mb-3" />
            <h3 className="text-[#F0EBE1] text-lg mb-2" style={{ fontFamily: 'Newsreader, serif' }}>The Companion Volume</h3>
            <p className="text-[#C9B99A] text-sm mb-4">
              The African American State of the Union — the economic blueprint behind the map. Hardcover, 362 pages, releasing September 11, 2026.
            </p>
            <Link to="/pre-order" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#FF9500] text-[#FFB840] text-sm hover:bg-[rgba(255,149,0,0.1)] transition-colors">
              Pre-Order the Hardcover — $39.99
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}
