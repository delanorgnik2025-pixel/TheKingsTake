import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Props {
  onEnter: () => void
}

/* ─── Sacred Geometry Corner Ornament ─── */
function CornerOrnament({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) {
  const rotate = {
    tl: 0,
    tr: 90,
    bl: -90,
    br: 180,
  }[position]

  return (
    <div className="absolute w-24 h-24 md:w-32 md:h-32" style={{
      ...(position === 'tl' ? { top: 16, left: 16 } :
         position === 'tr' ? { top: 16, right: 16 } :
         position === 'bl' ? { bottom: 16, left: 16 } :
         { bottom: 16, right: 16 }),
      transform: `rotate(${rotate}deg)`,
    }}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Outer frame lines */}
        <path d="M5 5 L35 5 L35 15 L15 15 L15 35 L5 35 Z" fill="none" stroke="#FF9500" strokeWidth="0.8" opacity="0.6" />
        {/* Inner decorative */}
        <path d="M8 8 L30 8 L30 12 L12 12 L12 30 L8 30 Z" fill="none" stroke="#FF9500" strokeWidth="0.5" opacity="0.4" />
        {/* Dots */}
        <circle cx="5" cy="5" r="2" fill="#FF9500" opacity="0.8" />
        <circle cx="35" cy="5" r="1.5" fill="#FF9500" opacity="0.5" />
        <circle cx="5" cy="35" r="1.5" fill="#FF9500" opacity="0.5" />
        {/* Flourish lines */}
        <path d="M35 5 Q50 5 50 20" fill="none" stroke="#FF9500" strokeWidth="0.6" opacity="0.3" />
        <path d="M5 35 Q5 50 20 50" fill="none" stroke="#FF9500" strokeWidth="0.6" opacity="0.3" />
        {/* Diamond */}
        <polygon points="20,2 24,6 20,10 16,6" fill="none" stroke="#C9B99A" strokeWidth="0.4" opacity="0.5" />
      </svg>
    </div>
  )
}

/* ─── Central Portal / Keyhole ─── */
function CentralPortal() {
  return (
    <div className="relative w-48 h-72 md:w-56 md:h-80 mx-auto">
      {/* Outer glow */}
      <div className="absolute inset-0 rounded-t-full" style={{
        background: 'radial-gradient(ellipse at center, rgba(255,149,0,0.15) 0%, transparent 70%)',
        filter: 'blur(20px)',
      }} />

      <svg viewBox="0 0 200 300" className="w-full h-full relative z-10">
        {/* Main portal shape — ornate arch / keyhole */}
        <defs>
          <linearGradient id="portalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF9500" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#FFB840" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FF9500" stopOpacity="0.3" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer ornate frame */}
        <path
          d="M100 10 
             C140 10, 170 40, 170 80 
             L170 120
             C170 140, 180 160, 190 180
             L190 280
             C190 290, 180 295, 100 295
             C20 295, 10 290, 10 280
             L10 180
             C20 160, 30 140, 30 120
             L30 80
             C30 40, 60 10, 100 10 Z"
          fill="none"
          stroke="url(#portalGrad)"
          strokeWidth="1.5"
          filter="url(#glow)"
        />

        {/* Inner frame */}
        <path
          d="M100 20 
             C132 20, 158 45, 158 80 
             L158 120
             C158 138, 166 155, 178 175
             L178 270
             C178 278, 170 282, 100 282
             C30 282, 22 278, 22 270
             L22 175
             C34 155, 42 138, 42 120
             L42 80
             C42 45, 68 20, 100 20 Z"
          fill="none"
          stroke="#FF9500"
          strokeWidth="0.8"
          opacity="0.5"
        />

        {/* Top ornament — eye of providence style */}
        <ellipse cx="100" cy="55" rx="25" ry="18" fill="none" stroke="#FF9500" strokeWidth="0.8" opacity="0.6" />
        <circle cx="100" cy="55" r="8" fill="none" stroke="#FFB840" strokeWidth="1" opacity="0.8" />
        <circle cx="100" cy="55" r="3" fill="#FF9500" opacity="0.9">
          <animate attributeName="opacity" values="0.9;0.4;0.9" dur="3s" repeatCount="indefinite" />
        </circle>

        {/* Radiating lines from eye */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
          const rad = (angle * Math.PI) / 180
          const x1 = 100 + Math.cos(rad) * 12
          const y1 = 55 + Math.sin(rad) * 8
          const x2 = 100 + Math.cos(rad) * 22
          const y2 = 55 + Math.sin(rad) * 15
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#FF9500" strokeWidth="0.5" opacity="0.4" />
        })}

        {/* Vertical sacred lines */}
        <line x1="100" y1="75" x2="100" y2="270" stroke="#FF9500" strokeWidth="0.5" opacity="0.3" />
        <line x1="70" y1="120" x2="70" y2="270" stroke="#FF9500" strokeWidth="0.4" opacity="0.2" />
        <line x1="130" y1="120" x2="130" y2="270" stroke="#FF9500" strokeWidth="0.4" opacity="0.2" />

        {/* Decorative diamonds down center */}
        {[110, 140, 170, 200, 230].map((y, i) => (
          <polygon key={i} points={`100,${y - 4} 104,${y} 100,${y + 4} 96,${y}`} fill="none" stroke="#C9B99A" strokeWidth="0.5" opacity="0.5">
            <animate attributeName="opacity" values="0.5;0.8;0.5" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
          </polygon>
        ))}

        {/* Side ornamental spirals */}
        <path d="M45 150 Q55 160 45 170 Q35 180 45 190" fill="none" stroke="#FF9500" strokeWidth="0.5" opacity="0.3" />
        <path d="M155 150 Q145 160 155 170 Q165 180 155 190" fill="none" stroke="#FF9500" strokeWidth="0.5" opacity="0.3" />

        {/* Bottom crescent */}
        <path d="M70 275 Q100 285 130 275" fill="none" stroke="#FF9500" strokeWidth="0.8" opacity="0.5" />

        {/* Top crown / peak ornament */}
        <path d="M100 10 L95 2 L100 5 L105 2 Z" fill="#FF9500" opacity="0.7" />
      </svg>
    </div>
  )
}

/* ─── Floating Particles Background ─── */
function StarField() {
  const stars = Array.from({ length: 40 }, (_, i) => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: 1 + Math.random() * 2,
    delay: Math.random() * 5,
    duration: 2 + Math.random() * 4,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-[#FF9500]"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            opacity: 0.2,
            animation: `pulse ${star.duration}s ease-in-out ${star.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}

/* ─── Main Entry Portal ─── */
export default function RealmEntryPortal({ onEnter }: Props) {
  const [pressed, setPressed] = useState(false)

  // Auto-show after brief delay for dramatic effect
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="fixed inset-0 z-50 bg-[#060a12] flex flex-col items-center justify-center overflow-hidden">
      {/* Deep cosmic background layers */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 30%, rgba(27,40,56,0.8) 0%, rgba(6,10,18,1) 70%)',
      }} />
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 30% 70%, rgba(255,149,0,0.04) 0%, transparent 50%)',
      }} />
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 70% 60%, rgba(78,205,196,0.03) 0%, transparent 50%)',
      }} />

      <StarField />

      {/* Corner ornaments */}
      <CornerOrnament position="tl" />
      <CornerOrnament position="tr" />
      <CornerOrnament position="bl" />
      <CornerOrnament position="br" />

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 1.5 }}
        className="relative z-10 flex flex-col items-center px-6 max-w-md w-full"
      >
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-3xl md:text-4xl text-[#F0EBE1] font-medium tracking-[0.12em] uppercase mb-2 text-center"
          style={{ textShadow: '0 0 30px rgba(255,149,0,0.3)' }}
        >
          Enter The Realm
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-xs text-[#C9B99A]/70 tracking-[0.15em] uppercase mb-6 text-center"
        >
          The African American State of the Union
        </motion.p>

        {/* Central Portal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="mb-6"
        >
          <CentralPortal />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-xs text-[#C9B99A]/50 tracking-wider mb-8 text-center max-w-xs leading-relaxed"
        >
          Walk among those who came before.
          Their wisdom lives in the roots of this sacred ground.
        </motion.p>

        {/* ENTER Button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setPressed(true)
            setTimeout(onEnter, 600)
          }}
          className="relative group"
        >
          {/* Button glow */}
          <div className="absolute inset-0 rounded-lg bg-[#FF9500] opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500" />

          <div
            className="relative px-12 py-3 rounded-lg border transition-all duration-300"
            style={{
              borderColor: pressed ? '#FF9500' : 'rgba(255,149,0,0.4)',
              background: pressed
                ? 'rgba(255,149,0,0.25)'
                : 'rgba(255,149,0,0.08)',
              boxShadow: pressed
                ? '0 0 40px rgba(255,149,0,0.4)'
                : '0 0 15px rgba(255,149,0,0.1)',
            }}
          >
            <span className="text-sm text-[#FF9500] tracking-[0.2em] uppercase font-medium">
              {pressed ? 'Entering...' : 'Enter'}
            </span>
          </div>
        </motion.button>

        {/* Bottom branding */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-1"
        >
          <p className="text-[10px] text-[#C9B99A]/30 tracking-[0.2em] uppercase">
            #TheKingsTake
          </p>
          <p className="text-[9px] text-[#C9B99A]/20 tracking-[0.15em]">
            AASOTU Media Group LLC
          </p>
        </motion.div>
      </motion.div>

      {/* Edge frame lines */}
      <div className="absolute inset-x-4 top-4 h-px bg-[rgba(255,149,0,0.15)]" />
      <div className="absolute inset-x-4 bottom-4 h-px bg-[rgba(255,149,0,0.15)]" />
      <div className="absolute inset-y-4 left-4 w-px bg-[rgba(255,149,0,0.15)]" />
      <div className="absolute inset-y-4 right-4 w-px bg-[rgba(255,149,0,0.15)]" />
    </div>
  )
}
