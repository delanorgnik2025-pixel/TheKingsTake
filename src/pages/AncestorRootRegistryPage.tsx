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
      transition={{ duration: 0.3 }}
      className="relative w-full bg-[#05080e] overflow-hidden"
    >
      {/* Desktop: img element with object-fit cover */}
      <div className="hidden sm:block relative w-full" style={{ height: 'calc(100dvh - 72px)' }}>
        <img
          src="/images/ancestor-root-registry-entry.jpg"
          alt="Ancestor Root Registry"
          className={`w-full h-full transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ objectFit: 'cover', objectPosition: 'center center' }}
          onLoad={() => setLoaded(true)}
        />
        {!loaded && <div className="absolute inset-0 bg-[#05080e]" />}

        {/* CTA overlay — positioned over the golden button in the artwork */}
        {loaded && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            onClick={handleClick}
            className="absolute z-10 cursor-pointer bg-transparent border-0 outline-none"
            style={{
              left: '52%',
              top: '72%',
              width: '38%',
              height: '10%',
            }}
            aria-label="Plant Your Roots"
          />
        )}
      </div>

      {/* Mobile: background-image with cover */}
      <div
        className="sm:hidden relative w-full"
        style={{
          minHeight: 'calc(100svh - 72px)',
          backgroundImage: 'url(/images/ancestor-root-registry-entry.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* CTA — visible gold button for mobile */}
        <div className="absolute inset-x-0 bottom-0 flex justify-center pb-8 pt-32"
          style={{ background: 'linear-gradient(to top, rgba(5,8,14,0.85) 0%, transparent 100%)' }}
        >
          <button
            onClick={handleClick}
            className="inline-flex items-center gap-3 px-10 py-4 rounded-xl border transition-all duration-300 cursor-pointer"
            style={{
              background: 'rgba(8, 8, 8, 0.9)',
              borderColor: 'rgba(200, 160, 70, 0.5)',
            }}
          >
            <span
              className="text-sm tracking-[0.12em] uppercase"
              style={{
                fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif",
                color: '#C9B99A',
              }}
            >
              Plant Your Roots
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  )
}
