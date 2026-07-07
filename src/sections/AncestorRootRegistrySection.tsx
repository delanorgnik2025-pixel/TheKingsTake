import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router'
import { Lock, ArrowRight } from 'lucide-react'

export default function AncestorRootRegistrySection() {
  const navigate = useNavigate()
  const [loaded, setLoaded] = useState(false)

  return (
    <section
      id="ancestor-root-registry"
      className="relative w-full overflow-hidden"
      style={{ minHeight: 'clamp(500px, 70vh, 800px)' }}
    >
      {/* Background image — desktop vs mobile */}
      <div className="absolute inset-0">
        {/* Desktop image (hidden on mobile) */}
        <img
          src="/images/ancestor-root-registry-hero.jpg"
          alt="Ancestor Root Registry"
          className={`hidden md:block w-full h-full object-cover object-center transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setLoaded(true)}
        />
        {/* Mobile image (hidden on desktop) — THE LAW 9:16 */}
        <img
          src="/images/ancestor-root-registry-mobile.jpg"
          alt="Ancestor Root Registry"
          className={`block md:hidden w-full h-full object-cover object-top transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setLoaded(true)}
        />
        {!loaded && <div className="absolute inset-0 bg-[#05080e]" />}
      </div>

      {/* Dark gradient overlay — bottom-heavy for text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(5,8,14,0.25) 0%, rgba(5,8,14,0.55) 50%, rgba(5,8,14,0.88) 85%, rgba(5,8,14,0.97) 100%)',
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 120px 50px rgba(5,8,14,0.35)' }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-end text-center px-6 py-16 sm:py-20 lg:py-24 h-full min-h-[500px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-2xl"
        >
          {/* Label */}
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#FF9500] mb-4">
            The Sacred Archive
          </p>

          {/* Title */}
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] text-[#F0EBE1] tracking-[-0.01em] leading-[1.05] mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Ancestor Root Registry
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-[#C9B99A]/80 leading-relaxed mb-8 max-w-md mx-auto">
            Plant your roots. Preserve your legacy. Pass it on.
          </p>

          {/* CTA */}
          <button
            onClick={() => navigate('/ancestor-root-registry')}
            className="inline-flex items-center gap-2.5 bg-[rgba(255,149,0,0.18)] backdrop-blur-sm border border-[rgba(255,149,0,0.4)] text-[#FF9500] rounded-lg px-7 py-3.5 text-sm font-medium tracking-wide hover:bg-[rgba(255,149,0,0.28)] hover:border-[rgba(255,149,0,0.55)] transition-all duration-300 cursor-pointer"
          >
            Enter the Registry
            <ArrowRight size={14} />
          </button>

          {/* Protected message */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <Lock size={11} className="text-[#C9B99A]/35" />
            <p className="text-[10px] tracking-[0.15em] text-[#C9B99A]/35 uppercase">
              Your legacy. Your story. Your bloodline.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
