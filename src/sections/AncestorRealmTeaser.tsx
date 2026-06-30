import { Link } from 'react-router'
import { motion } from 'framer-motion'
import {
  MessageCircle, Upload, Crown, Sparkles, ArrowRight, Lock,
} from 'lucide-react'
import SacredRealmBackground from '@/features/ancestor-realm/components/SacredRealmBackground'

const FEATURES = [
  { icon: MessageCircle, title: 'Ancestor Chat',   desc: 'Speak with the elders',     path: '/ancestor-chat' },
  { icon: Upload,        title: 'Sacred Gallery',  desc: 'Share memories',            path: '/sacred-gallery' },
  { icon: Crown,         title: 'Ancestor Pass',   desc: 'Unlock all realms',         path: '/ancestor-pass' },
  { icon: Sparkles,      title: 'Story Keeper',    desc: 'Oral tradition keeper',     path: '/story-keeper' },
]

/**
 * HOMEPAGE TEASER — "Enter The Ancestor Realm"
 *
 * Art direction from uploaded references:
 * - Full sacred garden background (NOT blank dark)
 * - Left-aligned content over dark tree trunk
 * - Vertical floating feature items (not horizontal boxes)
 * - Glassmorphism, not opaque rectangles
 * - Locked CTA with Coming Soon
 * - Scenery is the hero, UI quietly exists within it
 */
export default function AncestorRealmTeaser() {
  return (
    <SacredRealmBackground centerContent={false}>
      <div className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-20 pb-10">
        <div className="max-w-lg">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-5"
          >
            <div className="flex gap-0.5">
              {[0, 1, 2].map((i) => (
                <div key={i} className="w-[3px] h-[3px] rounded-full bg-[#FF9500]" />
              ))}
            </div>
            <span className="text-[10px] text-[#FF9500] uppercase tracking-[0.12em]">
              New Experience
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl text-[#F0EBE1] font-medium tracking-[0.02em] mb-3 text-left"
            style={{ textShadow: '0 2px 25px rgba(0,0,0,0.8)' }}
          >
            Enter The Ancestor Realm
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            viewport={{ once: true }}
            className="text-sm md:text-base text-[#C9B99A]/80 leading-relaxed mb-8 text-left max-w-sm"
            style={{ textShadow: '0 1px 10px rgba(0,0,0,0.7)' }}
          >
            Walk among those who came before. Their wisdom lives in the roots of this sacred ground.
          </motion.p>

          {/* ═══ Feature Items — vertical floating rail ═══ */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-0 mb-8"
          >
            {FEATURES.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
                viewport={{ once: true }}
              >
                <Link
                  to={feat.path}
                  className="flex items-center gap-3 py-2.5 border-b border-[rgba(255,149,0,0.06)] last:border-b-0 group"
                >
                  {/* Floating glass icon circle */}
                  <div className="w-9 h-9 rounded-full border border-[rgba(255,149,0,0.18)] bg-[rgba(10,15,26,0.35)] backdrop-blur-sm flex items-center justify-center shrink-0 group-hover:border-[rgba(255,149,0,0.55)] group-hover:bg-[rgba(255,149,0,0.1)] transition-all duration-300 shadow-[0_0_10px_rgba(255,149,0,0.05)]">
                    <feat.icon size={15} className="text-[#FF9500]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] text-[#F0EBE1] font-medium group-hover:text-[#FF9500] transition-colors">
                      {feat.title}
                    </p>
                    <p className="text-[10px] text-[#C9B99A]/50">{feat.desc}</p>
                  </div>
                  <ArrowRight size={12} className="text-[#C9B99A]/25 group-hover:text-[#FF9500] group-hover:translate-x-1 transition-all shrink-0" />
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* ═══ LOCKED CTA ═══ */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col items-start"
          >
            {/* Button — locked, muted */}
            <div className="flex items-center gap-2 px-8 py-3 rounded-lg border border-[rgba(201,185,154,0.18)] bg-[rgba(10,15,26,0.4)] backdrop-blur-sm text-[#C9B99A]/50 cursor-not-allowed">
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
            <p className="text-[9px] text-[#C9B99A]/30 tracking-wider mt-1.5 max-w-[200px]">
              The sacred garden is being prepared for your arrival
            </p>
          </motion.div>
        </div>

        {/* Bottom branding */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          viewport={{ once: true }}
          className="absolute bottom-5 left-0 right-0 flex flex-col items-center gap-0.5"
        >
          <p className="text-[8px] text-[#C9B99A]/25 tracking-[0.2em] uppercase">
            #TheKingsTake
          </p>
          <p className="text-[7px] text-[#C9B99A]/15 tracking-[0.12em]">
            AASOTU Media Group LLC
          </p>
        </motion.div>
      </div>
    </SacredRealmBackground>
  )
}
