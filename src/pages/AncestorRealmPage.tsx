import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router'
import {
  Crown, Lock,
  MessageCircle, Upload, TreePine, Sparkles,
  ArrowLeft,
} from 'lucide-react'
import SacredRealmBackground from '../features/ancestor-realm/components/SacredRealmBackground'

/**
 * ANCESTOR REALM — LOCKED COMING SOON
 *
 * The public-facing Realm page. Nothing here is functional yet.
 * This is a guarded, mysterious, premium Coming Soon banner.
 *
 * Visual source of truth: /public/images/ancestor-realm-locked-bg.jpg
 *
 * NO clickable features.
 * NO AI / backend / technical details.
 * Feature icons are HINTS ONLY.
 */

const FEATURE_HINTS = [
  { icon: MessageCircle, label: 'Ancestor Chat' },
  { icon: Upload,        label: 'Sacred Gallery' },
  { icon: Crown,         label: 'Ancestor Pass' },
  { icon: Sparkles,      label: 'Story Keeper' },
  { icon: TreePine,      label: 'Living Tree' },
]

export default function AncestorRealmPage() {
  return (
    <SacredRealmBackground centerContent>
      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center relative">

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute top-6 left-6 z-20"
        >
          <Link
            to="/"
            className="flex items-center gap-1.5 text-[#C9B99A]/40 hover:text-[#FF9500] transition-colors text-[10px] tracking-wider uppercase"
          >
            <ArrowLeft size={12} />
            Home
          </Link>
        </motion.div>

        {/* Top branding */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="absolute top-6 left-0 right-0 flex flex-col items-center gap-1"
        >
          <Crown size={14} className="text-[#FF9500]/40" />
          <p className="text-[8px] text-[#C9B99A]/30 tracking-[0.2em] uppercase">#TheKingsTake</p>
          <p className="text-[7px] text-[#C9B99A]/20 tracking-[0.15em]">AASOTU Media Group LLC</p>
        </motion.div>

        {/* ═══ Title ═══ */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-[120px] text-[#F0EBE1] font-medium tracking-[0.06em] uppercase mb-5"
          style={{ textShadow: '0 4px 60px rgba(0,0,0,0.95), 0 0 120px rgba(6,10,18,0.8), 0 2px 8px rgba(0,0,0,0.9)' }}
        >
          The Ancestor Realm
        </motion.h1>

        {/* ═══ Coming Soon ═══ */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl lg:text-2xl text-[#FF9500] tracking-[0.4em] uppercase mb-6 font-medium"
          style={{ textShadow: '0 3px 30px rgba(0,0,0,0.9), 0 2px 10px rgba(0,0,0,0.8)' }}
        >
          Coming Soon
        </motion.p>

        {/* ═══ Divider ═══ */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="w-20 h-px bg-[rgba(255,149,0,0.4)] mb-6"
        />

        {/* ═══ Small copy ═══ */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-sm md:text-base lg:text-lg text-[#C9B99A]/70 tracking-wider mb-12 max-w-md leading-relaxed"
          style={{ textShadow: '0 3px 25px rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.8)' }}
        >
          The realm is being prepared.
          <br />
          The ancestors are waiting.
        </motion.p>

        {/* ═══ Feature Hints — NON-CLICKABLE ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-5 md:gap-7 mb-12"
        >
          {FEATURE_HINTS.map((feat, i) => (
            <motion.div
              key={feat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.9 + i * 0.07 }}
              className="flex flex-col items-center gap-1.5"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[rgba(255,149,0,0.15)] bg-[rgba(10,15,26,0.3)] backdrop-blur-sm flex items-center justify-center shadow-[0_0_10px_rgba(255,149,0,0.04)]">
                <feat.icon size={16} className="text-[#FF9500]/60 md:text-[#FF9500]/70" />
              </div>
              <p className="text-[11px] md:text-xs text-[#C9B99A]/50 tracking-wider" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
                {feat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* ═══ Locked CTA ═══ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="flex flex-col items-center gap-2"
        >
          <div className="flex items-center gap-2 text-[#C9B99A]/30">
            <Lock size={12} />
            <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase">
              Access Will Open In Due Time
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-1 h-1 rounded-full bg-[#FF9500] animate-pulse" />
            <span className="text-[9px] text-[#FF9500]/35 tracking-[0.15em] uppercase">
              The elders have not yet called your name
            </span>
            <div className="w-1 h-1 rounded-full bg-[#FF9500] animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
        </motion.div>

        {/* Bottom branding */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-5 left-0 right-0 flex flex-col items-center gap-0.5"
        >
          <p className="text-[7px] text-[#C9B99A]/20 tracking-[0.2em] uppercase">#TheKingsTake</p>
          <p className="text-[6px] text-[#C9B99A]/12 tracking-[0.15em]">AASOTU Media Group LLC</p>
        </motion.div>
      </div>
    </SacredRealmBackground>
  )
}
