import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, X } from 'lucide-react'

const MYSTERIOUS_MESSAGES = [
  'The Realm is being prepared.',
  'The Garden will open soon.',
  'The Ancestors are waiting.',
  'Access has not yet been granted.',
  'The path is not yet revealed.',
  'The elders have not yet called your name.',
]

interface Props {
  open: boolean
  onClose: () => void
}

export default function RealmLockModal({ open, onClose }: Props) {
  const [index, setIndex] = useState(0)

  // Cycle through messages for atmosphere
  useEffect(() => {
    if (!open) return
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % MYSTERIOUS_MESSAGES.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[300] flex items-center justify-center px-6"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-[rgba(6,10,18,0.85)] backdrop-blur-md" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm"
          >
            {/* Sacred geometry frame */}
            <div className="relative bg-[rgba(10,15,26,0.7)] backdrop-blur-xl border border-[rgba(255,149,0,0.2)] rounded-2xl p-8 md:p-10 overflow-hidden">
              {/* Inner glow */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  boxShadow: 'inset 0 0 60px rgba(255,149,0,0.04)',
                }}
              />

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full border border-[rgba(255,149,0,0.12)] text-[#C9B99A]/50 hover:text-[#FF9500] hover:border-[rgba(255,149,0,0.3)] transition-all"
              >
                <X size={14} />
              </button>

              {/* Lock icon */}
              <div className="flex justify-center mb-5">
                <div className="relative w-14 h-14">
                  <svg viewBox="0 0 56 56" className="w-full h-full">
                    <polygon
                      points="28,4 50,17 50,39 28,52 6,39 6,17"
                      fill="none"
                      stroke="rgba(255,149,0,0.25)"
                      strokeWidth="0.8"
                    />
                    {/* Lock body */}
                    <rect
                      x="18"
                      y="26"
                      width="20"
                      height="16"
                      rx="2"
                      fill="none"
                      stroke="#C9B99A"
                      strokeWidth="1"
                      opacity="0.6"
                    />
                    {/* Shackle */}
                    <path
                      d="M21 26 V20 A7 7 0 0 1 35 20 V26"
                      fill="none"
                      stroke="#C9B99A"
                      strokeWidth="1"
                      opacity="0.6"
                      strokeLinecap="round"
                    />
                    {/* Keyhole */}
                    <circle cx="28" cy="32" r="2" fill="#C9B99A" opacity="0.4" />
                    <path
                      d="M28 34 L27 37 L29 37 Z"
                      fill="#C9B99A"
                      opacity="0.4"
                    />
                  </svg>
                </div>
              </div>

              {/* Title */}
              <h3
                className="text-xl text-[#F0EBE1] font-medium tracking-wide text-center mb-5"
                style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
              >
                The Realm Awaits
              </h3>

              {/* Cycling mysterious message */}
              <div className="h-12 flex items-center justify-center mb-5">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.5 }}
                    className="text-sm text-[#C9B99A]/70 tracking-wider text-center"
                  >
                    {MYSTERIOUS_MESSAGES[index]}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Divider */}
              <div className="w-16 h-px bg-[rgba(255,149,0,0.15)] mx-auto mb-5" />

              {/* Subtle branding */}
              <p className="text-[9px] text-[#C9B99A]/25 tracking-[0.2em] uppercase text-center">
                #TheKingsTake
              </p>
            </div>

            {/* Outer glow */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none -z-10"
              style={{
                boxShadow: '0 0 40px rgba(255,149,0,0.08)',
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
