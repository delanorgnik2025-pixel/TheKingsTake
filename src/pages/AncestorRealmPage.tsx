import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MessageCircle,
  Upload,
  Crown,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  TreePine,
} from 'lucide-react'
import { useNavigate } from 'react-router'
import { WorldProvider } from '../features/ancestor-realm/scene/WorldManager'
import LoadingScreen from '../features/ancestor-realm/scene/LoadingScreen'
import GardenScene from '../features/ancestor-realm/scene/GardenScene'
import GardenOverlay from '../features/ancestor-realm/scene/GardenOverlay'

/* ═══════════════════════════════════════════
   FEATURES DATA
   ═══════════════════════════════════════════ */
const FEATURES = [
  { icon: MessageCircle, title: 'Ancestor Chat',      desc: 'Speak with the elders' },
  { icon: Upload,        title: 'Sacred Gallery',     desc: 'Share memories' },
  { icon: Sparkles,      title: 'Story Keeper',       desc: 'Oral tradition keeper' },
  { icon: Crown,         title: 'Ancestor Pass',      desc: 'Unlock all realms' },
]

/* ═══════════════════════════════════════════
   SACRED PORTAL ICON (SVG)
   ═══════════════════════════════════════════ */
function PortalIcon() {
  return (
    <div className="relative w-14 h-14 md:w-16 md:h-16 mx-auto mb-5">
      {/* Outer rotating ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0"
      >
        <svg viewBox="0 0 64 64" className="w-full h-full">
          <polygon
            points="32,4 58,17 58,47 32,60 6,47 6,17"
            fill="none"
            stroke="rgba(255,149,0,0.3)"
            strokeWidth="0.7"
          />
        </svg>
      </motion.div>
      {/* Static inner + tree glyph */}
      <svg viewBox="0 0 64 64" className="absolute inset-0 w-full h-full">
        <polygon
          points="32,10 52,21 52,43 32,54 12,43 12,21"
          fill="none"
          stroke="rgba(255,149,0,0.2)"
          strokeWidth="0.5"
        />
        {/* Tree of life glyph */}
        <path
          d="M32 18 L32 42 M26 30 L32 24 L38 30 M28 38 L32 34 L36 38"
          stroke="#FF9500"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  )
}

/* ═══════════════════════════════════════════
   BACKGROUND LAYER (reusable)
   ═══════════════════════════════════════════ */
function SacredBackground({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#060a12]">
      {/* Image */}
      <div className="absolute inset-0">
        <img
          src="/images/ancestor-realm-bg.jpg"
          alt=""
          className={`w-full h-full object-cover transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setLoaded(true)}
        />
        {!loaded && <div className="absolute inset-0 bg-[#0a0f1a]" />}
      </div>

      {/* Overlays */}
      <div className="absolute inset-x-0 top-0 h-36 md:h-44 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(6,10,18,0.8) 0%, rgba(6,10,18,0.4) 50%, transparent 100%)' }} />
      <div className="absolute inset-x-0 bottom-0 h-52 md:h-64 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(6,10,18,0.88) 0%, rgba(6,10,18,0.5) 45%, transparent 100%)' }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 120px 50px rgba(6,10,18,0.45)' }} />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

/* ═══════════════════════════════════════════
   PHASE 1  —  CINEMATIC LANDING
   ═══════════════════════════════════════════ */
function CinematicLanding({ onEnter }: { onEnter: () => void }) {
  const navigate = useNavigate()
  const [pressed, setPressed] = useState(false)

  return (
    <SacredBackground>
      <div className="flex flex-col items-center justify-center min-h-screen px-5 pt-20 pb-10">
        {/* Portal icon */}
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
          <PortalIcon />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#F0EBE1] font-medium tracking-[0.06em] text-center mb-2.5"
          style={{ textShadow: '0 2px 25px rgba(0,0,0,0.7), 0 0 60px rgba(255,149,0,0.1)' }}
        >
          The Ancestor Realm
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-[11px] sm:text-xs md:text-sm text-[#C9B99A]/80 tracking-[0.06em] text-center max-w-xs mb-6 md:mb-8"
          style={{ textShadow: '0 1px 10px rgba(0,0,0,0.6)' }}
        >
          Walk among those who came before.
          <br className="hidden sm:block" />
          {' '}Their wisdom lives in the roots of this sacred ground.
        </motion.p>

        {/* ═══ Feature Items ═══ */}
        {/* Desktop: horizontal row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="hidden md:flex items-center justify-center gap-6 lg:gap-8 mb-8"
        >
          {FEATURES.map((feat, i) => (
            <div
              key={feat.title}
              className="flex flex-col items-center text-center group cursor-default"
            >
              <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-full border border-[rgba(255,149,0,0.25)] bg-[rgba(10,15,26,0.4)] backdrop-blur-sm flex items-center justify-center mb-2 group-hover:border-[rgba(255,149,0,0.55)] group-hover:bg-[rgba(255,149,0,0.1)] transition-all duration-300">
                <feat.icon size={16} className="text-[#FF9500]" />
              </div>
              <p className="text-[11px] lg:text-xs text-[#F0EBE1] font-medium tracking-wide">{feat.title}</p>
              <p className="text-[9px] lg:text-[10px] text-[#C9B99A]/50 mt-0.5">{feat.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* Mobile: vertical list */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="md:hidden w-full max-w-[260px] mb-6"
        >
          {FEATURES.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.8 + i * 0.08 }}
              className="flex items-center gap-3 py-2.5 border-b border-[rgba(255,149,0,0.08)] last:border-b-0"
            >
              <div className="w-8 h-8 rounded-full border border-[rgba(255,149,0,0.2)] bg-[rgba(10,15,26,0.3)] flex items-center justify-center shrink-0">
                <feat.icon size={13} className="text-[#FF9500]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] text-[#F0EBE1] font-medium">{feat.title}</p>
                <p className="text-[9px] text-[#C9B99A]/50">{feat.desc}</p>
              </div>
              <ArrowRight size={12} className="text-[#C9B99A]/30 shrink-0" />
            </motion.div>
          ))}
        </motion.div>

        {/* ═══ ENTER THE GARDEN button ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="flex flex-col items-center gap-2.5"
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => { setPressed(true); setTimeout(onEnter, 500) }}
            className="relative group"
          >
            <div className={`absolute inset-0 rounded-lg blur-xl transition-opacity duration-500 ${pressed ? 'opacity-60' : 'opacity-25 group-hover:opacity-45'}`}
              style={{ background: 'rgba(255,149,0,0.45)' }} />
            <div className="relative flex items-center gap-2 px-9 py-3 rounded-lg border transition-all duration-300"
              style={{
                borderColor: pressed ? 'rgba(255,149,0,0.7)' : 'rgba(255,149,0,0.3)',
                background: pressed ? 'rgba(255,149,0,0.22)' : 'rgba(255,149,0,0.07)',
                boxShadow: pressed ? '0 0 30px rgba(255,149,0,0.35)' : '0 0 10px rgba(255,149,0,0.08)',
              }}>
              <span className="text-sm text-[#FF9500] tracking-[0.18em] uppercase font-medium">
                {pressed ? 'Entering...' : 'Enter the Garden'}
              </span>
              <ArrowRight size={15} className="text-[#FF9500]" />
            </div>
          </motion.button>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.4 }}
            className="text-[10px] text-[#C9B99A]/40 tracking-[0.12em]">
            A sacred space for those who came before
          </motion.p>
        </motion.div>

        {/* Bottom branding */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7 }}
          className="absolute bottom-5 left-0 right-0 flex flex-col items-center gap-0.5">
          <p className="text-[8px] text-[#C9B99A]/25 tracking-[0.2em] uppercase">#TheKingsTake</p>
          <p className="text-[7px] text-[#C9B99A]/15 tracking-[0.12em]">AASOTU Media Group LLC</p>
        </motion.div>
      </div>

      {/* Mobile back button */}
      <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        onClick={() => navigate('/')}
        className="absolute top-20 left-4 z-20 md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-[rgba(10,15,26,0.45)] backdrop-blur-sm border border-[rgba(255,149,0,0.12)] text-[#C9B99A]">
        <ChevronLeft size={18} />
      </motion.button>
    </SacredBackground>
  )
}

/* ═══════════════════════════════════════════
   PHASE 2  —  3D Garden
   ═══════════════════════════════════════════ */
function GardenExperience() {
  return (
    <WorldProvider>
      <div className="fixed inset-0 bg-[#060a12]">
        <LoadingScreen />
        <GardenScene />
        <GardenOverlay />
      </div>
    </WorldProvider>
  )
}

/* ═══════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════ */
export default function AncestorRealmPage() {
  const [entered, setEntered] = useState(false)

  return (
    <AnimatePresence mode="wait">
      {!entered ? (
        <motion.div key="landing" exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
          <CinematicLanding onEnter={() => setEntered(true)} />
        </motion.div>
      ) : (
        <motion.div key="garden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <GardenExperience />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
