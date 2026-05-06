import { motion } from 'framer-motion'
import { Lock, Zap, Shield, Gavel, Users, FileText, ArrowRight, Check } from 'lucide-react'
import { Link } from 'react-router'
import ScrollReveal from '../components/ScrollReveal'

const simulatorFeatures = [
  { icon: Gavel, title: "AI Judge", desc: "Real-time rulings on motions, evidence, and objections" },
  { icon: Shield, title: "AI Prosecutor", desc: "Arguments against you using real case law" },
  { icon: Users, title: "AI Jury", desc: "12 diverse personas deliberate and deliver a verdict" },
  { icon: FileText, title: "Full Transcript", desc: "Every word saved — review, learn, prepare" },
  { icon: Zap, title: "Live Motions", desc: "File motions in real-time, get instant rulings" },
  { icon: Check, title: "Real Law", desc: "Powered by CourtListener — actual case citations" },
]

const tiers = [
  {
    name: "Single Case",
    price: "$5",
    period: "per simulation",
    features: ["1 full courtroom simulation", "Saved transcript", "Basic verdict analysis", "24-hour access"],
    cta: "Unlock One Case",
    highlight: false
  },
  {
    name: "Advocate",
    price: "$15",
    period: "/month",
    features: ["10 simulations/month", "Priority queue", "Export transcripts", "Motion library access", "Community forums"],
    cta: "Become an Advocate",
    highlight: true
  },
  {
    name: "Freedom Fighter",
    price: "$49",
    period: "/month",
    features: ["Unlimited simulations", "Jury analysis breakdown", "Custom case scenarios", "Early access to new features", "Direct support"],
    cta: "Join the Fight",
    highlight: false
  }
]

export default function SimulatorPreviewSection() {
  return (
    <section id="simulator" className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/bg-legal.jpg)' }} />
      <div className="absolute inset-0 bg-[#1B2838]/90" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Header */}
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-4">
            <Lock size={20} className="text-[#FFB840]" />
            <p className="text-xs uppercase tracking-[0.08em] text-[#FFB840]">Premium Tool — Coming Soon</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <h2 className="text-4xl md:text-5xl lg:text-[56px] text-[#F0EBE1] tracking-[-0.02em] leading-[1.08] mb-4 text-shadow-hero">
            The People's Court Simulator
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <p className="text-lg text-[#C9B99A] max-w-3xl mb-4 leading-relaxed">
            Walk into a virtual courtroom. Face an AI Judge, an AI Prosecutor, a full AI Jury, and witnesses. 
            File motions. Present evidence. Cross-examine. Get a verdict. All powered by real case law.
          </p>
          <p className="text-sm text-[rgba(201,185,154,0.5)] italic mb-12">
            *Disclaimer: This is a simulation of real-life events for educational purposes only. 
            Not legal advice. Consult a licensed attorney.
          </p>
        </ScrollReveal>

        {/* Feature Grid */}
        <ScrollReveal delay={0.3}>
          <h3 className="text-lg text-[#F0EBE1] uppercase tracking-[0.04em] mb-6">How It Works</h3>
        </ScrollReveal>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
          {simulatorFeatures.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35 + i * 0.08, duration: 0.5 }}
                className="bg-[rgba(27,40,56,0.7)] backdrop-blur-lg rounded border border-[rgba(255,149,0,0.15)] p-5 hover:border-[rgba(255,149,0,0.4)] transition-all group"
              >
                <Icon size={24} className="text-[#FF9500] mb-3 group-hover:text-[#FFB840] transition-colors" strokeWidth={1.5} />
                <h4 className="text-sm text-[#F0EBE1] uppercase tracking-[0.03em] mb-1">{feature.title}</h4>
                <p className="text-xs text-[#C9B99A] leading-relaxed">{feature.desc}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Pricing Tiers */}
        <ScrollReveal delay={0.4}>
          <h3 className="text-lg text-[#F0EBE1] uppercase tracking-[0.04em] mb-8 text-center">Unlock the Simulator</h3>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={`relative rounded border p-8 transition-all hover:-translate-y-1 ${
                tier.highlight 
                  ? 'bg-[rgba(255,149,0,0.1)] border-[rgba(255,149,0,0.4)]' 
                  : 'bg-[rgba(27,40,56,0.8)] border-[rgba(255,149,0,0.2)] hover:border-[rgba(255,149,0,0.4)]'
              }`}
              style={{ boxShadow: tier.highlight ? '0 8px 32px rgba(255,149,0,0.15)' : '0 8px 32px rgba(0,0,0,0.3)' }}
            >
              {tier.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FF9500] text-[#1B2838] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              
              <Lock size={16} className="text-[#FFB840] mb-4" />
              <h4 className="text-xl text-[#F0EBE1] uppercase tracking-[0.04em] mb-1">{tier.name}</h4>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl text-[#FF9500] font-medium">{tier.price}</span>
                <span className="text-sm text-[#C9B99A]">{tier.period}</span>
              </div>
              
              <ul className="space-y-3 mb-8">
                {tier.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-[#C9B99A]">
                    <Check size={14} className="text-[#FF9500] shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={() => alert('Simulator coming soon! Subscribe to get notified when it launches.')}
                className={`w-full flex items-center justify-center gap-2 rounded-full h-12 text-sm font-['Newsreader'] tracking-[0.02em] transition-colors ${
                  tier.highlight
                    ? 'bg-[#FF9500] text-[#1B2838] hover:bg-[#CC6A00]'
                    : 'border border-[#FF9500] text-[#FF9500] hover:bg-[rgba(255,149,0,0.1)]'
                }`}
              >
                {tier.cta}
                <ArrowRight size={14} />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <ScrollReveal delay={0.6}>
          <div className="mt-12 text-center">
            <p className="text-sm text-[#C9B99A] mb-4">
              Want early access? <span className="text-[#FF9500]">Subscribe to The Movement ($299/mo)</span> and get 
              unlimited simulator access included.
            </p>
            <Link 
              to="/services/movement" 
              className="inline-flex items-center gap-2 text-sm text-[#FF9500] hover:underline"
            >
              Learn about The Movement <ArrowRight size={14} />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
