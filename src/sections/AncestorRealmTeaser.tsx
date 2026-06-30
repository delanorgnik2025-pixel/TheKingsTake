import { useNavigate, Link } from 'react-router'
import { motion } from 'framer-motion'
import {
  TreePine, Sparkles, ArrowRight, Lock,
  MessageCircle, Upload, Crown,
} from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'

const FEATURES = [
  { icon: MessageCircle, title: 'Ancestor Chat',   desc: 'Speak with the elders',     path: '/ancestor-chat' },
  { icon: Upload,        title: 'Sacred Gallery',  desc: 'Share memories',            path: '/sacred-gallery' },
  { icon: TreePine,      title: 'Family Trees',    desc: 'Grow your lineage digitally', path: '/ancestor-realm' },
  { icon: Sparkles,      title: 'Story Keeper',    desc: 'Oral tradition keeper',     path: '/story-keeper' },
]

/* ═══ Lock Icon with Sacred Geometry ═══ */
function LockIcon() {
  return (
    <div className="relative w-10 h-10 mx-auto mb-3">
      <svg viewBox="0 0 40 40" className="w-full h-full">
        {/* Outer hexagon */}
        <polygon
          points="20,2 36,11 36,29 20,38 4,29 4,11"
          fill="none"
          stroke="rgba(255,149,0,0.3)"
          strokeWidth="0.8"
        />
        {/* Lock body */}
        <rect x="12" y="18" width="16" height="14" rx="2" fill="none" stroke="#C9B99A" strokeWidth="1.2" opacity="0.7" />
        {/* Lock shackle */}
        <path d="M14 18 V14 A6 6 0 0 1 26 14 V18" fill="none" stroke="#C9B99A" strokeWidth="1.2" opacity="0.7" strokeLinecap="round" />
        {/* Keyhole */}
        <circle cx="20" cy="24" r="2" fill="#C9B99A" opacity="0.5" />
        <path d="M20 26 L19 29 L21 29 Z" fill="#C9B99A" opacity="0.5" />
      </svg>
    </div>
  )
}

export default function AncestorRealmTeaser() {
  const navigate = useNavigate()

  return (
    <section id="ancestor-realm" className="relative py-20 md:py-28 px-6 md:px-12 overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0f1a]" />
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(255,149,0,0.15) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(78,205,196,0.1) 0%, transparent 50%)',
      }} />

      <div className="relative z-10 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex gap-1">{[0,1,2].map(i => <div key={i} className="w-[3px] h-[3px] rounded-full bg-[#FF9500]" />)}</div>
            <p className="text-xs uppercase tracking-[0.08em] text-[#FF9500]">New Experience</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="text-4xl md:text-5xl lg:text-[64px] text-[#F0EBE1] tracking-[-0.02em] leading-[1.08] mb-4 text-shadow-hero">
            Enter The Ancestor Realm
          </h2>
          <p className="text-lg md:text-xl text-[#C9B99A] max-w-3xl leading-relaxed mb-8">
            Walk among those who came before in a sacred 3D garden. Their wisdom lives in the roots of this ground. Speak with the elders, preserve their memories, and trace the lineage they tried to erase.
          </p>
        </ScrollReveal>

        {/* ═══ Feature Items — CLICKABLE ═══ */}
        <ScrollReveal delay={0.2}>
          {/* Desktop */}
          <div className="hidden md:flex items-center justify-start gap-8 lg:gap-10 mb-10">
            {FEATURES.map((feat) => (
              <Link
                key={feat.title}
                to={feat.path}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-9 h-9 rounded-full border border-[rgba(255,149,0,0.2)] bg-[rgba(10,15,26,0.3)] flex items-center justify-center mb-2 group-hover:border-[rgba(255,149,0,0.55)] group-hover:bg-[rgba(255,149,0,0.1)] transition-all duration-300">
                  <feat.icon size={15} className="text-[#FF9500]" />
                </div>
                <p className="text-[11px] text-[#F0EBE1] font-medium tracking-wide group-hover:text-[#FF9500] transition-colors">{feat.title}</p>
                <p className="text-[9px] text-[#C9B99A]/50 mt-0.5">{feat.desc}</p>
              </Link>
            ))}
          </div>

          {/* Mobile */}
          <div className="md:hidden w-full max-w-[280px] mb-8">
            {FEATURES.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  to={feat.path}
                  className="flex items-center gap-3 py-2.5 border-b border-[rgba(255,149,0,0.06)] last:border-b-0 group"
                >
                  <div className="w-7 h-7 rounded-full border border-[rgba(255,149,0,0.2)] flex items-center justify-center shrink-0 group-hover:border-[rgba(255,149,0,0.5)] transition-colors">
                    <feat.icon size={12} className="text-[#FF9500]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] text-[#F0EBE1] font-medium group-hover:text-[#FF9500] transition-colors">{feat.title}</p>
                    <p className="text-[9px] text-[#C9B99A]/50">{feat.desc}</p>
                  </div>
                  <ArrowRight size={11} className="text-[#C9B99A]/25 group-hover:text-[#FF9500] group-hover:translate-x-1 transition-all shrink-0" />
                </Link>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        {/* ═══ LOCKED — Coming Soon ═══ */}
        <ScrollReveal delay={0.3}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="relative inline-flex flex-col items-center"
          >
            {/* Button — visually locked */}
            <div className="relative flex items-center gap-2.5 px-8 py-3 rounded-lg border border-[rgba(201,185,154,0.2)] bg-[rgba(10,15,26,0.5)] text-[#C9B99A]/50 cursor-not-allowed">
              <Lock size={13} />
              <span className="text-sm tracking-[0.15em] uppercase font-medium">
                Enter the Garden
              </span>
            </div>

            {/* Coming Soon badge */}
            <div className="mt-2.5 flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-[#FF9500] animate-pulse" />
              <span className="text-[10px] text-[#FF9500]/70 tracking-[0.15em] uppercase">
                Coming Soon
              </span>
              <div className="w-1 h-1 rounded-full bg-[#FF9500] animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>

            {/* Subtle hint */}
            <p className="text-[9px] text-[#C9B99A]/30 tracking-wider mt-1.5 max-w-[200px] text-center">
              The sacred garden is being prepared for your arrival
            </p>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  )
}
