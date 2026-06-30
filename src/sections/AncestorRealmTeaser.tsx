import { motion } from 'framer-motion'
import {
  Crown, Lock,
  MessageCircle, Upload, TreePine, Sparkles,
} from 'lucide-react'
import SacredRealmBackground from '@/features/ancestor-realm/components/SacredRealmBackground'

/**
 * LOCKED HOMEPAGE REALM SECTION
 *
 * Visual source of truth: /public/images/ancestor-realm-locked-bg.jpg
 *
 * This is a COMING SOON banner. Nothing here is clickable.
 * Feature icons are HINTS ONLY — they do not link anywhere.
 * No AI, no backend, no technical details exposed.
 */

const FEATURE_HINTS = [
  { icon: MessageCircle, label: 'Ancestor Chat' },
  { icon: Upload,        label: 'Sacred Gallery' },
  { icon: Crown,         label: 'Ancestor Pass' },
  { icon: Sparkles,      label: 'Story Keeper' },
  { icon: TreePine,      label: 'Living Tree' },
]

export default function AncestorRealmTeaser() {
  return (
    <SacredRealmBackground centerContent>
      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">

        {/* ═══ Top branding ═══ */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="absolute top-6 left-0 right-0 flex flex-col items-center gap-1"
        >
          <Crown size={14} className="text-[#FF9500]/40" />
          <p className="text-[8px] text-[#C9B99A]/30 tracking-[0.2em] uppercase">
            #TheKingsTake
          </p>
          <p className="text-[7px] text-[#C9B99A]/20 tracking-[0.15em]">
            AASOTU Media Group LLC
          </p>
        </motion.div>

        {/* ═══ Main Title ═══ */}
        <motion.h2
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#F0EBE1] font-medium tracking-[0.06em] uppercase mb-4"
          style={{ textShadow: '0 2px 40px rgba(0,0,0,0.8), 0 0 80px rgba(6,10,18,0.5)' }}
        >
          The Ancestor Realm
        </motion.h2>

        {/* ═══ Coming Soon ═══ */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-sm md:text-base text-[#FF9500] tracking-[0.3em] uppercase mb-5 font-medium"
          style={{ textShadow: '0 1px 15px rgba(0,0,0,0.6)' }}
        >
          Coming Soon
        </motion.p>

        {/* ═══ Divider ═══ */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="w-16 h-px bg-[rgba(255,149,0,0.3)] mb-5"
        />

        {/* ═══ Small copy ═══ */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          viewport={{ once: true }}
          className="text-xs md:text-sm text-[#C9B99A]/60 tracking-wider mb-10 max-w-xs"
          style={{ textShadow: '0 1px 10px rgba(0,0,0,0.7)' }}
        >
          The realm is being prepared.
          <br />
          The ancestors are waiting.
        </motion.p>

        {/* ═══ Feature Hints — NON-CLICKABLE ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-12"
        >
          {FEATURE_HINTS.map((feat, i) => (
            <motion.div
              key={feat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.8 + i * 0.07 }}
              viewport={{ once: true }}
              className="flex flex-col items-center gap-1.5"
            >
              {/* Glass circle */}
              <div className="w-10 h-10 md:w-11 md:h-11 rounded-full border border-[rgba(255,149,0,0.15)] bg-[rgba(10,15,26,0.3)] backdrop-blur-sm flex items-center justify-center">
                <feat.icon size={15} className="text-[#FF9500]/70" />
              </div>
              <p className="text-[9px] md:text-[10px] text-[#C9B99A]/40 tracking-wider">
                {feat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* ═══ Bottom CTA — LOCKED ═══ */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-2"
        >
          <div className="flex items-center gap-2 text-[#C9B99A]/35">
            <Lock size={11} />
            <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase">
              Access Will Open In Due Time
            </span>
          </div>

          {/* Pulse dots */}
          <div className="flex items-center gap-2 mt-1">
            <div className="w-1 h-1 rounded-full bg-[#FF9500] animate-pulse" />
            <span className="text-[9px] text-[#FF9500]/40 tracking-[0.15em] uppercase">
              The elders have not yet called your name
            </span>
            <div className="w-1 h-1 rounded-full bg-[#FF9500] animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
        </motion.div>

        {/* ═══ Bottom branding ═══ */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          viewport={{ once: true }}
          className="absolute bottom-5 left-0 right-0 flex flex-col items-center gap-0.5"
        >
          <p className="text-[7px] text-[#C9B99A]/20 tracking-[0.2em] uppercase">
            #TheKingsTake
          </p>
        </motion.div>
      </div>
    </SacredRealmBackground>
  )
}
