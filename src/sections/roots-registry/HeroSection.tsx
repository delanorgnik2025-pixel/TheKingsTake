import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, ArrowRight } from 'lucide-react'

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false)

  return (
    <section className="relative min-h-[100dvh] lg:min-h-[850px] w-full overflow-hidden flex flex-col">
      {/* Background artwork — fills entire section on mobile, desktop shows more */}
      <div className="absolute inset-0">
        <img
          src="/images/roots-registry-bg.jpg"
          alt="Sacred ancestral tree"
          className={`w-full h-full object-cover object-top lg:object-center transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setLoaded(true)}
        />
        {!loaded && <div className="absolute inset-0 bg-[#05080e]" />}
      </div>

      {/* Cinematic gradient overlay — darker at bottom for text, lighter at top to show tree */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(5,8,14,0.15) 0%, rgba(5,8,14,0.55) 35%, rgba(5,8,14,0.82) 60%, rgba(5,8,14,0.95) 100%)',
        }}
      />

      {/* Bottom fade for seamless blend into gateways */}
      <div
        className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #05080e 0%, transparent 100%)' }}
      />

      {/* Ambient vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 120px 50px rgba(5,8,14,0.35)' }}
      />

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-end pb-10 lg:pb-20 px-5 sm:px-8 lg:px-16 pt-40">
        <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-end">

          {/* LEFT — Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Eyebrow */}
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#FF9500] mb-4 lg:mb-5">
              The Sacred Registry
            </p>

            {/* Heading — smaller on mobile per blueprint */}
            <h1
              className="text-2xl sm:text-3xl lg:text-[52px] text-[#F0EBE1] tracking-[-0.01em] leading-[1.08] mb-4 lg:mb-5"
              style={{ fontFamily: "'Playfair Display', 'Georgia', 'Times New Roman', serif" }}
            >
              Plant Your Roots.<br className="hidden sm:block" />
              Preserve Your Legacy.
            </h1>

            {/* Description */}
            <p className="text-[13px] lg:text-[15px] text-[#C9B99A]/80 leading-[1.7] mb-6 lg:mb-8 max-w-md">
              The Roots Registry is your sacred archive.
              Build your lineage. Preserve your heritage.
              Pass your legacy to the generations to come.
            </p>

            {/* CTAs — stacked full-width on mobile, inline on desktop */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button className="inline-flex items-center justify-center sm:justify-start gap-2.5 bg-[rgba(255,149,0,0.18)] backdrop-blur-sm border border-[rgba(255,149,0,0.4)] text-[#FF9500] rounded-lg px-6 py-3 text-sm font-medium tracking-wide hover:bg-[rgba(255,149,0,0.28)] hover:border-[rgba(255,149,0,0.55)] transition-all duration-300 cursor-pointer">
                Begin Your Journey
                <ArrowRight size={14} />
              </button>

              <button className="inline-flex items-center justify-center sm:justify-start gap-2.5 text-[#C9B99A] hover:text-[#F0EBE1] transition-colors text-sm tracking-wide cursor-pointer group">
                <span className="w-8 h-8 rounded-full border border-[rgba(201,185,154,0.25)] flex items-center justify-center group-hover:border-[rgba(255,149,0,0.45)] transition-colors">
                  <Play size={12} className="ml-0.5" />
                </span>
                Watch Overview
              </button>
            </div>
          </motion.div>

          {/* RIGHT — Legacy panel (desktop only) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="hidden lg:block"
          >
            <div className="bg-[rgba(5,8,14,0.5)] backdrop-blur-md border border-[rgba(255,149,0,0.12)] rounded-xl p-6 max-w-[240px]">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#FF9500] mb-3 text-center">
                Every Legacy Begins With a Single Name.
              </p>
              <div className="flex justify-center mb-3">
                <svg width="36" height="44" viewBox="0 0 40 48" fill="none" className="text-[#FF9500]">
                  <path d="M20 4C20 4 8 16 8 26C8 32.6 13.4 38 20 38C26.6 38 32 32.6 32 26C32 16 20 4 20 4Z" stroke="currentColor" strokeWidth="1.5" fill="rgba(255,149,0,0.08)" />
                  <circle cx="20" cy="26" r="3" fill="currentColor" opacity="0.6" />
                  <path d="M20 38V46" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M14 42H26" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
              <p className="text-[11px] text-[#C9B99A]/60 text-center leading-relaxed">
                You are the beginning of a story that will never end.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile legacy quote (below CTAs, above gateway fold) */}
      <div className="relative z-10 lg:hidden px-5 pb-6">
        <div className="flex items-center gap-3">
          <svg width="24" height="28" viewBox="0 0 40 48" fill="none" className="text-[#FF9500] shrink-0">
            <path d="M20 4C20 4 8 16 8 26C8 32.6 13.4 38 20 38C26.6 38 32 32.6 32 26C32 16 20 4 20 4Z" stroke="currentColor" strokeWidth="1.5" fill="rgba(255,149,0,0.08)" />
            <circle cx="20" cy="26" r="3" fill="currentColor" opacity="0.6" />
            <path d="M20 38V46M14 42H26" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <p className="text-[10px] text-[#C9B99A]/50 leading-relaxed">
            Every legacy begins with a single name.
          </p>
        </div>
      </div>
    </section>
  )
}
