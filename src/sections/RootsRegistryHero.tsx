import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface Props {
  onBegin: () => void
}

export default function RootsRegistryHero({ onBegin }: Props) {
  const [loaded, setLoaded] = useState(false)

  return (
    <section
      className="relative min-h-[100dvh] lg:min-h-[850px] w-full overflow-hidden grid grid-cols-1 lg:grid-cols-[45%_55%]"
      style={{ background: '#05080e' }}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/roots-registry-bg.jpg"
          alt=""
          className={`w-full h-full object-cover object-center transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setLoaded(true)}
        />
        {!loaded && <div className="absolute inset-0 bg-[#05080e]" />}
      </div>

      {/* Dark Gradient Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, rgba(5,8,14,0.72) 0%, rgba(5,8,14,0.35) 50%, rgba(5,8,14,0.18) 100%)',
        }}
      />

      {/* LEFT COLUMN — Text Content */}
      <div className="relative z-10 flex items-center px-8 md:px-14 lg:px-20 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-[540px]"
        >
          {/* Eyebrow */}
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#FF9500] mb-5">
            Trace Your Roots
          </p>

          {/* Heading */}
          <h1
            className="text-4xl sm:text-5xl lg:text-[64px] text-[#F0EBE1] tracking-[-0.01em] leading-[1.05] mb-6"
            style={{ fontFamily: "'Playfair Display', 'Georgia', 'Times New Roman', serif" }}
          >
            Roots Registry
          </h1>

          {/* Description */}
          <p className="text-[15px] lg:text-base text-[#C9B99A] leading-[1.75] mb-10 max-w-md">
            Record your lineage. Preserve your family history. Build a living legacy for future generations.
          </p>

          {/* CTA */}
          <button
            onClick={onBegin}
            className="inline-flex items-center gap-2.5 bg-[rgba(255,149,0,0.15)] backdrop-blur-sm border border-[rgba(255,149,0,0.35)] text-[#FF9500] rounded-lg px-6 py-3 text-sm font-medium tracking-wide hover:bg-[rgba(255,149,0,0.28)] hover:border-[rgba(255,149,0,0.5)] transition-all duration-300 cursor-pointer"
          >
            Begin Your Roots Registry
            <ArrowRight size={14} />
          </button>
        </motion.div>
      </div>

      {/* RIGHT COLUMN — Reserved for 3D Canvas */}
      <div className="relative z-10 hidden lg:block">
        {/* Empty — future Spline/Three.js Sacred Baobab tree mounts here */}
      </div>
    </section>
  )
}
