import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, ArrowRight } from 'lucide-react'

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false)

  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden">
      {/* Background artwork — the ONLY background layer */}
      <div className="absolute inset-0">
        <img
          src="/images/roots-registry-bg.jpg"
          alt="Sacred ancestral tree"
          className={`w-full h-full object-cover object-center transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setLoaded(true)}
        />
        {!loaded && <div className="absolute inset-0 bg-[#05080e]" />}
      </div>

      {/* Cinematic gradient overlay — left side darker for text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, rgba(5,8,14,0.78) 0%, rgba(5,8,14,0.45) 45%, rgba(5,8,14,0.2) 70%, rgba(5,8,14,0.35) 100%)',
        }}
      />

      {/* Bottom gradient for seamless blend into gateways */}
      <div
        className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(5,8,14,0.95) 0%, rgba(5,8,14,0.5) 50%, transparent 100%)' }}
      />

      {/* Ambient vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 150px 60px rgba(5,8,14,0.4)' }}
      />

      {/* Content — two-column layout */}
      <div className="relative z-10 min-h-[100dvh] flex items-end pb-20 lg:pb-28 px-6 md:px-12 lg:px-16 pt-32">
        <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-end">

          {/* LEFT — Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-xl"
          >
            {/* Eyebrow */}
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#FF9500] mb-4">
              The Sacred Registry
            </p>

            {/* Heading */}
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] text-[#F0EBE1] tracking-[-0.01em] leading-[1.05] mb-5"
              style={{ fontFamily: "'Playfair Display', 'Georgia', 'Times New Roman', serif" }}
            >
              Plant Your Roots.<br />
              Preserve Your Legacy.
            </h1>

            {/* Description */}
            <p className="text-sm md:text-[15px] text-[#C9B99A] leading-[1.7] mb-8 max-w-md">
              The Roots Registry is your sacred archive.
              Build your lineage. Preserve your heritage.
              Pass your legacy to the generations to come.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <button className="inline-flex items-center gap-2.5 bg-[rgba(255,149,0,0.18)] backdrop-blur-sm border border-[rgba(255,149,0,0.4)] text-[#FF9500] rounded-lg px-6 py-3 text-sm font-medium tracking-wide hover:bg-[rgba(255,149,0,0.28)] hover:border-[rgba(255,149,0,0.55)] transition-all duration-300 cursor-pointer">
                Begin Your Journey
                <ArrowRight size={14} />
              </button>

              <button className="inline-flex items-center gap-2 text-[#C9B99A] hover:text-[#F0EBE1] transition-colors text-sm tracking-wide cursor-pointer group">
                <span className="w-8 h-8 rounded-full border border-[rgba(201,185,154,0.3)] flex items-center justify-center group-hover:border-[rgba(255,149,0,0.5)] transition-colors">
                  <Play size={12} className="ml-0.5" />
                </span>
                Watch Overview
              </button>
            </div>
          </motion.div>

          {/* RIGHT — Floating legacy panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="hidden lg:block"
          >
            <div className="bg-[rgba(5,8,14,0.55)] backdrop-blur-md border border-[rgba(255,149,0,0.15)] rounded-xl p-6 max-w-[260px]">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#FF9500] mb-3">
                Every Legacy Begins With a Single Name.
              </p>
              <div className="flex justify-center mb-3">
                <svg width="40" height="48" viewBox="0 0 40 48" fill="none" className="text-[#FF9500]">
                  <path d="M20 4C20 4 8 16 8 26C8 32.6 13.4 38 20 38C26.6 38 32 32.6 32 26C32 16 20 4 20 4Z" stroke="currentColor" strokeWidth="1.5" fill="rgba(255,149,0,0.08)" />
                  <circle cx="20" cy="26" r="3" fill="currentColor" opacity="0.6" />
                  <path d="M20 38V46" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M14 42H26" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
              <p className="text-xs text-[#C9B99A]/70 text-center leading-relaxed">
                You are the beginning of a story that will never end.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
