import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, Link } from 'react-router'
import {
  MessageCircle, Upload, Crown, Sparkles, ArrowRight, ChevronLeft,
  TreePine,
} from 'lucide-react'
import { WorldProvider } from '../features/ancestor-realm/scene/WorldManager'
import LoadingScreen from '../features/ancestor-realm/scene/LoadingScreen'
import GardenScene from '../features/ancestor-realm/scene/GardenScene'
import GardenOverlay from '../features/ancestor-realm/scene/GardenOverlay'

/* ═══ FEATURES ═══ */
const FEATURES = [
  { icon: MessageCircle, title: 'Ancestor Chat',   desc: 'Speak with the elders',     path: '/ancestor-chat' },
  { icon: Upload,        title: 'Sacred Gallery',  desc: 'Share memories',            path: '/sacred-gallery' },
  { icon: Sparkles,      title: 'Story Keeper',    desc: 'Oral tradition keeper',     path: '/story-keeper' },
  { icon: Crown,         title: 'Ancestor Pass',   desc: 'Unlock all realms',         path: '/ancestor-pass' },
]

/* ═══ Portal Icon ═══ */
function PortalIcon() {
  return (
    <div className="relative w-14 h-14 md:w-16 md:h-16 mb-5">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 24, repeat: Infinity, ease: 'linear' }} className="absolute inset-0">
        <svg viewBox="0 0 64 64" className="w-full h-full">
          <polygon points="32,4 58,17 58,47 32,60 6,47 6,17" fill="none" stroke="rgba(255,149,0,0.3)" strokeWidth="0.7" />
        </svg>
      </motion.div>
      <svg viewBox="0 0 64 64" className="absolute inset-0 w-full h-full">
        <polygon points="32,10 52,21 52,43 32,54 12,43 12,21" fill="none" stroke="rgba(255,149,0,0.2)" strokeWidth="0.5" />
        <path d="M32 18 L32 42 M26 30 L32 24 L38 30 M28 38 L32 34 L36 38" stroke="#FF9500" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    </div>
  )
}

/* ═══ Sacred Background ═══ */
function SacredBackground({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#060a12]">
      <div className="absolute inset-0">
        <img src="/images/ancestor-realm-bg.jpg" alt="" className={`w-full h-full object-cover transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`} onLoad={() => setLoaded(true)} />
        {!loaded && <div className="absolute inset-0 bg-[#0a0f1a]" />}
      </div>
      {/* Top gradient */}
      <div className="absolute inset-x-0 top-0 h-36 md:h-44 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(6,10,18,0.85) 0%, rgba(6,10,18,0.4) 50%, transparent 100%)' }} />
      {/* Bottom gradient */}
      <div className="absolute inset-x-0 bottom-0 h-52 md:h-64 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(6,10,18,0.9) 0%, rgba(6,10,18,0.5) 45%, transparent 100%)' }} />
      {/* LEFT gradient — darkens tree trunk for text readability */}
      <div className="absolute inset-y-0 left-0 w-[65%] md:w-[55%] pointer-events-none"
        style={{ background: 'linear-gradient(to right, rgba(6,10,18,0.7) 0%, rgba(6,10,18,0.35) 60%, transparent 100%)' }} />
      {/* RIGHT edge gradient */}
      <div className="absolute inset-y-0 right-0 w-[20%] pointer-events-none"
        style={{ background: 'linear-gradient(to left, rgba(6,10,18,0.5) 0%, transparent 100%)' }} />
      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 120px 50px rgba(6,10,18,0.4)' }} />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

/* ═══ PHASE 1 — Cinematic Landing ═══ */
function CinematicLanding({ onEnter }: { onEnter: () => void }) {
  const navigate = useNavigate()
  const [pressed, setPressed] = useState(false)

  return (
    <SacredBackground>
      <div className="flex flex-col justify-center min-h-screen px-6 md:px-12 lg:px-20 pt-20 pb-10">
        <div className="max-w-lg">
          {/* Portal icon */}
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <PortalIcon />
          </motion.div>

          {/* Title — left aligned, over dark trunk */}
          <motion.h1
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-3xl sm:text-4xl md:text-5xl text-[#F0EBE1] font-medium tracking-[0.04em] mb-3 text-left"
            style={{ textShadow: '0 2px 30px rgba(0,0,0,0.8), 0 0 50px rgba(6,10,18,0.6)' }}
          >
            The Ancestor Realm
          </motion.h1>

          {/* Subtitle — left aligned */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-sm md:text-base text-[#C9B99A]/80 tracking-wide text-left mb-8 max-w-xs leading-relaxed"
            style={{ textShadow: '0 1px 10px rgba(0,0,0,0.7)' }}
          >
            Walk among those who came before. Their wisdom lives in the roots of this sacred ground.
          </motion.p>

          {/* Feature Items — clickable links, left aligned */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="space-y-0 mb-8"
          >
            {FEATURES.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.8 + i * 0.08 }}
              >
                <Link
                  to={feat.path}
                  className="flex items-center gap-3 py-2.5 border-b border-[rgba(255,149,0,0.06)] last:border-b-0 group"
                >
                  <div className="w-9 h-9 rounded-full border border-[rgba(255,149,0,0.2)] bg-[rgba(10,15,26,0.35)] flex items-center justify-center shrink-0 group-hover:border-[rgba(255,149,0,0.6)] group-hover:bg-[rgba(255,149,0,0.1)] transition-all duration-300">
                    <feat.icon size={15} className="text-[#FF9500]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] text-[#F0EBE1] font-medium group-hover:text-[#FF9500] transition-colors">{feat.title}</p>
                    <p className="text-[10px] text-[#C9B99A]/50">{feat.desc}</p>
                  </div>
                  <ArrowRight size={12} className="text-[#C9B99A]/30 group-hover:text-[#FF9500] group-hover:translate-x-1 transition-all" />
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* ENTER button */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.2 }}>
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
          </motion.div>
        </div>

        {/* Bottom branding */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7 }}
          className="absolute bottom-5 left-0 right-0 flex flex-col items-center gap-0.5">
          <p className="text-[8px] text-[#C9B99A]/25 tracking-[0.2em] uppercase">#TheKingsTake</p>
          <p className="text-[7px] text-[#C9B99A]/15 tracking-[0.12em]">AASOTU Media Group LLC</p>
        </motion.div>
      </div>

      {/* Mobile back */}
      <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        onClick={() => navigate('/')} className="absolute top-20 left-4 z-20 md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-[rgba(10,15,26,0.45)] backdrop-blur-sm border border-[rgba(255,149,0,0.12)] text-[#C9B99A]">
        <ChevronLeft size={18} />
      </motion.button>
    </SacredBackground>
  )
}

/* ═══ PHASE 2 — 3D Garden ═══ */
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

/* ═══ Main Page ═══ */
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
