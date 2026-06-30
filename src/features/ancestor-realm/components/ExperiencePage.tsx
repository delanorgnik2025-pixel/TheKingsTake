import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router'
import { ArrowLeft, type LucideIcon } from 'lucide-react'

interface ExperienceData {
  icon: LucideIcon
  title: string
  headline: string
  description: string
  features: string[]
  closing: string
  accentColor?: string
}

function SacredBackground({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#060a12]">
      <div className="absolute inset-0">
        <img src="/images/ancestor-realm-bg.jpg" alt="" className={`w-full h-full object-cover transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`} onLoad={() => setLoaded(true)} />
        {!loaded && <div className="absolute inset-0 bg-[#0a0f1a]" />}
      </div>
      {/* Top gradient */}
      <div className="absolute inset-x-0 top-0 h-40 md:h-52 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(6,10,18,0.88) 0%, rgba(6,10,18,0.5) 50%, transparent 100%)' }} />
      {/* Bottom gradient */}
      <div className="absolute inset-x-0 bottom-0 h-52 md:h-72 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(6,10,18,0.92) 0%, rgba(6,10,18,0.55) 45%, transparent 100%)' }} />
      {/* Left gradient for text */}
      <div className="absolute inset-y-0 left-0 w-[70%] md:w-[60%] pointer-events-none"
        style={{ background: 'linear-gradient(to right, rgba(6,10,18,0.75) 0%, rgba(6,10,18,0.4) 60%, transparent 100%)' }} />
      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 120px 50px rgba(6,10,18,0.5)' }} />
      {/* Center softening */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(6,10,18,0.2) 0%, transparent 50%)' }} />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export default function ExperiencePage({ data }: { data: ExperienceData }) {
  const navigate = useNavigate()
  const Icon = data.icon

  return (
    <SacredBackground>
      <div className="min-h-screen flex flex-col px-6 md:px-12 lg:px-20 pt-20 pb-10">
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => navigate('/ancestor-realm')}
          className="flex items-center gap-2 text-[#C9B99A]/60 hover:text-[#FF9500] transition-colors mb-8 md:mb-12 w-fit"
        >
          <ArrowLeft size={16} />
          <span className="text-xs tracking-wider uppercase">Back to the Realm</span>
        </motion.button>

        <div className="max-w-xl">
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-12 h-12 rounded-full border border-[rgba(255,149,0,0.25)] bg-[rgba(10,15,26,0.4)] flex items-center justify-center mb-5"
          >
            <Icon size={20} className="text-[#FF9500]" />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl text-[#F0EBE1] font-medium tracking-wide mb-3 text-left"
            style={{ textShadow: '0 2px 30px rgba(0,0,0,0.8)' }}
          >
            {data.title}
          </motion.h1>

          {/* Headline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-base md:text-lg text-[#FF9500] tracking-wide mb-6 text-left font-medium"
            style={{ textShadow: '0 1px 10px rgba(0,0,0,0.6)' }}
          >
            {data.headline}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="text-sm md:text-base text-[#C9B99A]/80 leading-relaxed mb-8 text-left"
            style={{ textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}
          >
            {data.description}
          </motion.p>

          {/* Feature list */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="space-y-3 mb-8"
          >
            {data.features.map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.08 }}
                className="flex items-start gap-3"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF9500] mt-2 shrink-0" />
                <p className="text-sm text-[#F0EBE1]/85 leading-relaxed">{feat}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Closing statement */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="text-xs text-[#C9B99A]/50 tracking-wider leading-relaxed mb-10 text-left italic"
          >
            {data.closing}
          </motion.p>

          {/* CTA back */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <button
              onClick={() => navigate('/ancestor-realm')}
              className="flex items-center gap-2 px-8 py-3 rounded-lg border border-[rgba(255,149,0,0.3)] bg-[rgba(255,149,0,0.08)] hover:bg-[rgba(255,149,0,0.18)] transition-all text-sm text-[#FF9500] tracking-wider uppercase font-medium"
            >
              <ArrowLeft size={14} />
              Return to the Realm
            </button>
          </motion.div>
        </div>

        {/* Bottom branding */}
        <div className="mt-auto pt-8 flex flex-col items-center gap-0.5">
          <p className="text-[8px] text-[#C9B99A]/20 tracking-[0.2em] uppercase">#TheKingsTake</p>
        </div>
      </div>
    </SacredBackground>
  )
}
