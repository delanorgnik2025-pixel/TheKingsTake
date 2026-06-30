import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  TreePine,
  MessageCircle,
  Upload,
  Crown,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { useNavigate } from 'react-router'
import { WorldProvider } from '../features/ancestor-realm/scene/WorldManager'
import LoadingScreen from '../features/ancestor-realm/scene/LoadingScreen'
import GardenScene from '../features/ancestor-realm/scene/GardenScene'
import GardenOverlay from '../features/ancestor-realm/scene/GardenOverlay'

/* ──────────────────────────────────────────────
   PHASE 1  —  Cinematic Landing (image hero)
   PHASE 2  —  3D Garden (on "Enter")
   ────────────────────────────────────────────── */

/* ═══ Feature cards data ═══ */
const FEATURES = [
  {
    icon: MessageCircle,
    title: 'Ancestor Chat',
    desc: 'Speak with the elders',
  },
  {
    icon: Upload,
    title: 'Sacred Gallery',
    desc: 'Share memories',
  },
  {
    icon: Sparkles,
    title: 'Story Keeper',
    desc: 'Oral tradition keeper',
  },
  {
    icon: Crown,
    title: 'Ancestor Pass',
    desc: 'Unlock all realms',
  },
]

/* ═══ Sacred Geometry Portal Icon (SVG) ═══ */
function PortalIcon() {
  return (
    <div className="relative w-16 h-16 md:w-20 md:h-20 mx-auto mb-4">
      {/* Rotating outer ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0"
      >
        <svg viewBox="0 0 80 80" className="w-full h-full">
          <polygon
            points="40,4 76,22 76,58 40,76 4,58 4,22"
            fill="none"
            stroke="rgba(255,149,0,0.35)"
            strokeWidth="0.8"
          />
        </svg>
      </motion.div>
      {/* Static inner ring */}
      <svg viewBox="0 0 80 80" className="absolute inset-0 w-full h-full">
        <polygon
          points="40,12 68,26 68,54 40,68 12,54 12,26"
          fill="none"
          stroke="rgba(255,149,0,0.25)"
          strokeWidth="0.6"
        />
        {/* Tree glyph */}
        <path
          d="M40 24 L40 52 M32 36 L40 28 L48 36 M36 44 L40 40 L44 44"
          stroke="#FF9500"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  )
}

/* ═══ Feature Card (mobile carousel / desktop grid) ═══ */
function FeatureCard({
  feat,
  index,
}: {
  feat: (typeof FEATURES)[number]
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
      className="group relative bg-[rgba(10,15,26,0.55)] backdrop-blur-md border border-[rgba(255,149,0,0.15)] rounded-xl p-4 md:p-5 hover:border-[rgba(255,149,0,0.35)] hover:bg-[rgba(10,15,26,0.7)] transition-all duration-300 cursor-default"
    >
      <feat.icon
        size={20}
        className="text-[#FF9500] mb-2.5 group-hover:scale-110 transition-transform"
      />
      <p className="text-sm md:text-base text-[#F0EBE1] font-medium mb-1">
        {feat.title}
      </p>
      <p className="text-[11px] md:text-xs text-[#C9B99A]/70">{feat.desc}</p>
    </motion.div>
  )
}

/* ═══ Mobile Feature Carousel ═══ */
function MobileCarousel({
  onEnter,
}: {
  onEnter: () => void
}) {
  const [idx, setIdx] = useState(0)
  const prev = useCallback(
    () => setIdx((i) => (i === 0 ? FEATURES.length - 1 : i - 1)),
    []
  )
  const next = useCallback(
    () => setIdx((i) => (i === FEATURES.length - 1 ? 0 : i + 1)),
    []
  )

  return (
    <div className="md:hidden w-full max-w-xs mx-auto">
      <div className="relative overflow-hidden rounded-xl border border-[rgba(255,149,0,0.15)] bg-[rgba(10,15,26,0.55)] backdrop-blur-md p-5 min-h-[140px] flex flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col items-center"
          >
            {(() => {
              const FeatIcon = FEATURES[idx].icon
              return (
                <>
                  <FeatIcon size={22} className="text-[#FF9500] mb-2" />
                  <p className="text-sm text-[#F0EBE1] font-medium mb-1">
                    {FEATURES[idx].title}
                  </p>
                  <p className="text-[11px] text-[#C9B99A]/70">
                    {FEATURES[idx].desc}
                  </p>
                </>
              )
            })()}
          </motion.div>
        </AnimatePresence>

        {/* Arrows */}
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-[rgba(10,15,26,0.6)] border border-[rgba(255,149,0,0.15)] text-[#C9B99A] active:text-[#FF9500]"
          aria-label="Previous"
        >
          <ChevronLeft size={14} />
        </button>
        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-[rgba(10,15,26,0.6)] border border-[rgba(255,149,0,0.15)] text-[#C9B99A] active:text-[#FF9500]"
          aria-label="Next"
        >
          <ChevronRight size={14} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
          {FEATURES.map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                i === idx ? 'bg-[#FF9500]' : 'bg-[rgba(201,185,154,0.3)]'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ═══ PHASE 1  —  Cinematic Landing ═══ */
function CinematicLanding({ onEnter }: { onEnter: () => void }) {
  const navigate = useNavigate()
  const [pressed, setPressed] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) setImgLoaded(true)
  }, [])

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#060a12]">
      {/* ═══════ Background Image ═══════ */}
      <div className="absolute inset-0">
        <img
          ref={imgRef}
          src="/images/ancestor-realm-bg.jpg"
          alt="Sacred ancestral garden with ancient baobab tree, waterfalls, and golden sunset"
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImgLoaded(true)}
        />
        {/* Placeholder while loading */}
        {!imgLoaded && (
          <div className="absolute inset-0 bg-[#0a0f1a]" />
        )}
      </div>

      {/* ═══════ Overlay Gradients ═══════ */}
      {/* Top gradient — ensures navbar readability */}
      <div
        className="absolute inset-x-0 top-0 h-40 md:h-48 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(6,10,18,0.85) 0%, rgba(6,10,18,0.5) 50%, transparent 100%)',
        }}
      />

      {/* Bottom gradient — ensures CTA readability */}
      <div
        className="absolute inset-x-0 bottom-0 h-56 md:h-72 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(6,10,18,0.9) 0%, rgba(6,10,18,0.6) 40%, transparent 100%)',
        }}
      />

      {/* Vignette — edges darker */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 150px 60px rgba(6,10,18,0.5)',
        }}
      />

      {/* Center subtle darkening for card readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 55%, rgba(6,10,18,0.25) 0%, transparent 60%)',
        }}
      />

      {/* ═══════ Content Layer ═══════ */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-5 pt-20 pb-8">
        {/* Portal icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <PortalIcon />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#F0EBE1] font-medium tracking-[0.08em] text-center mb-3"
          style={{ textShadow: '0 2px 30px rgba(0,0,0,0.6)' }}
        >
          The Ancestor Realm
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xs sm:text-sm text-[#C9B99A]/80 tracking-[0.1em] text-center max-w-md mb-8 md:mb-10 px-4"
          style={{ textShadow: '0 1px 10px rgba(0,0,0,0.5)' }}
        >
          Walk among those who came before. Their wisdom lives in the roots of
          this sacred ground.
        </motion.p>

        {/* ═══ Desktop: 2x2 grid ═══ */}
        <div className="hidden md:grid grid-cols-2 gap-3 md:gap-4 w-full max-w-lg mb-8 md:mb-10">
          {FEATURES.map((feat, i) => (
            <FeatureCard key={feat.title} feat={feat} index={i} />
          ))}
        </div>

        {/* ═══ Mobile: carousel ═══ */}
        <div className="md:hidden mb-8 w-full">
          <MobileCarousel onEnter={onEnter} />
        </div>

        {/* ═══ Enter button ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex flex-col items-center gap-3"
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              setPressed(true)
              setTimeout(onEnter, 500)
            }}
            className="relative group"
          >
            {/* Glow */}
            <div
              className={`absolute inset-0 rounded-lg blur-xl transition-opacity duration-500 ${
                pressed ? 'opacity-60' : 'opacity-30 group-hover:opacity-50'
              }`}
              style={{ background: 'rgba(255,149,0,0.4)' }}
            />
            <div
              className="relative flex items-center gap-2.5 px-10 py-3.5 rounded-lg border transition-all duration-300"
              style={{
                borderColor: pressed
                  ? 'rgba(255,149,0,0.7)'
                  : 'rgba(255,149,0,0.35)',
                background: pressed
                  ? 'rgba(255,149,0,0.22)'
                  : 'rgba(255,149,0,0.08)',
                boxShadow: pressed
                  ? '0 0 30px rgba(255,149,0,0.35)'
                  : '0 0 12px rgba(255,149,0,0.1)',
              }}
            >
              <span className="text-sm md:text-base text-[#FF9500] tracking-[0.2em] uppercase font-medium">
                {pressed ? 'Entering...' : 'Enter the Garden'}
              </span>
              <ArrowRight size={16} className="text-[#FF9500]" />
            </div>
          </motion.button>

          {/* Bottom tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="text-[10px] text-[#C9B99A]/40 tracking-[0.15em] mt-2"
          >
            A sacred space for those who came before
          </motion.p>
        </motion.div>

        {/* ═══ Bottom branding ═══ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="absolute bottom-5 left-0 right-0 flex flex-col items-center gap-0.5"
        >
          <p className="text-[9px] text-[#C9B99A]/25 tracking-[0.2em] uppercase">
            #TheKingsTake
          </p>
          <p className="text-[8px] text-[#C9B99A]/15 tracking-[0.15em]">
            AASOTU Media Group LLC
          </p>
        </motion.div>
      </div>

      {/* ═══ Back button (mobile) ═══ */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={() => navigate('/')}
        className="absolute top-20 left-4 z-20 md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-[rgba(10,15,26,0.5)] backdrop-blur-sm border border-[rgba(255,149,0,0.15)] text-[#C9B99A]"
        aria-label="Back to home"
      >
        <ChevronLeft size={18} />
      </motion.button>
    </div>
  )
}

/* ═══ PHASE 2  —  3D Garden ═══ */
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
        <motion.div
          key="landing"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <CinematicLanding onEnter={() => setEntered(true)} />
        </motion.div>
      ) : (
        <motion.div
          key="garden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <GardenExperience />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
