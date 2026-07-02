import { useState } from 'react'
import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'

export default function AncestorRootRegistryPage() {
  const navigate = useNavigate()
  const [loaded, setLoaded] = useState(false)
  const [exiting, setExiting] = useState(false)

  function handleClick() {
    setExiting(true)
    setTimeout(() => navigate('/root-registry/step-1'), 300)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: exiting ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="relative w-full bg-[#05080e] flex flex-col items-center justify-center"
      style={{ minHeight: 'calc(100dvh - 64px)' }}
    >
      {/* Artwork container — full composition visible via object-contain */}
      <div className="relative w-full max-w-[1920px] mx-auto flex items-center justify-center px-4 py-6 lg:px-8 lg:py-10">
        <div className="relative w-full" style={{ maxHeight: 'calc(100dvh - 180px)' }}>
          <img
            src="/images/ancestor-root-registry-journey.jpg"
            alt="Ancestor Root Registry"
            className={`w-full h-full object-contain transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
            style={{ maxHeight: 'calc(100dvh - 180px)' }}
            onLoad={() => setLoaded(true)}
            loading="eager"
          />

          {/* CTA — centered horizontally beneath the portal */}
          {loaded && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute left-1/2 -translate-x-1/2"
              style={{ bottom: '4%', width: 'auto' }}
            >
              <button
                onClick={handleClick}
                className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-xl border transition-all duration-500 cursor-pointer"
                style={{
                  background: 'rgba(8, 8, 8, 0.92)',
                  borderColor: 'rgba(180, 140, 60, 0.35)',
                }}
              >
                {/* Subtle ambient glow behind button */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    boxShadow: '0 0 40px rgba(255, 149, 0, 0.15), 0 0 80px rgba(255, 149, 0, 0.06)',
                  }}
                />

                {/* Button text */}
                <span
                  className="relative z-10 text-sm tracking-[0.12em] uppercase transition-colors duration-300"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif",
                    color: '#C9B99A',
                  }}
                >
                  Plant Your Roots
                </span>

                {/* Hover color shift on text */}
                <style>{`
                  button:hover span { color: #FF9500 !important; }
                  button:hover { border-color: rgba(255, 149, 0, 0.55) !important; background: rgba(10, 10, 10, 0.95) !important; }
                `}</style>
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
