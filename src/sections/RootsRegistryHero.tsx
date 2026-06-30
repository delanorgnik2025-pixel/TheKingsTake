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
      id="genealogy"
      className="relative min-h-[100dvh] w-full overflow-hidden isolate"
      style={{ position: 'relative', zIndex: 1 }}
    >
      {/* Background — single image only */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/images/roots-registry-bg.jpg"
          alt=""
          className={`w-full h-full object-cover object-center transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setLoaded(true)}
        />
        {!loaded && <div className="absolute inset-0 bg-[#05080e]" />}
      </div>

      {/* Single cinematic overlay */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{ background: 'rgba(5,8,14,0.45)' }}
      />

      {/* Content — vertically centered, left aligned */}
      <div className="relative z-10 flex items-center min-h-[100dvh] px-[8%] py-[120px]">
        <div className="max-w-[620px] w-full">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[11px] uppercase tracking-[0.2em] text-[#FF9500] mb-5"
          >
            Trace Your Roots
          </motion.p>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-[56px] text-[#F0EBE1] tracking-[-0.01em] leading-[1.08] mb-6"
            style={{
              fontFamily: "'Playfair Display', 'Georgia', 'Times New Roman', serif",
            }}
          >
            Roots Registry
          </motion.h2>

          {/* Three-line description */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[15px] md:text-base text-[#C9B99A] leading-[1.7] mb-10"
          >
            Record your lineage.<br />
            Preserve your family history.<br />
            Build a living legacy for future generations.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <button
              onClick={onBegin}
              className="inline-flex items-center gap-2.5 bg-[rgba(255,149,0,0.15)] backdrop-blur-sm border border-[rgba(255,149,0,0.35)] text-[#FF9500] rounded-lg px-6 py-3 text-sm font-medium tracking-wide hover:bg-[rgba(255,149,0,0.25)] hover:border-[rgba(255,149,0,0.5)] transition-all duration-300"
            >
              Begin Your Roots Registry
              <ArrowRight size={14} />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
