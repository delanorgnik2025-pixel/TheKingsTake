import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Globe, Cpu, Sparkles } from 'lucide-react'
import CTAButton from '../components/CTAButton'

interface HeroSectionProps {
  onExploreClick: () => void
}

export default function HeroSection({ onExploreClick }: HeroSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -60])
  const hudOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
      id="hero"
    >
      {/* GTA-style background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/bg-hero.jpg)' }}
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-[#1B2838]/60" />

      {/* HUD Panel — Top Left: Situation Report */}
      <motion.div
        style={{ opacity: hudOpacity }}
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-20 md:top-24 left-4 md:left-12 z-[5] hidden sm:block"
      >
        <div className="bg-[rgba(27,40,56,0.85)] backdrop-blur-lg rounded border border-[rgba(255,149,0,0.3)] p-4 md:p-5"
          style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
          <div className="flex gap-1 mb-2">
            {[0, 1, 2].map(i => (
              <div key={i} className="w-[3px] h-[3px] rounded-full bg-[#FFB840]" />
            ))}
          </div>
          <p className="text-[10px] md:text-xs uppercase tracking-[0.08em] text-[#FFB840] font-['Newsreader'] mb-1">
            SITUATION REPORT
          </p>
          <p className="font-mono-hud text-[10px] md:text-[11px] text-[#F0EBE1]">
            AASOTU Media Group LLC
          </p>
          <p className="font-mono-hud text-[10px] md:text-[11px] text-[#C9B99A]">
            Ronald Lee King — Author
          </p>
          <div className="mt-2 font-mono-hud text-[10px]">
            <div className="flex justify-between text-[#C9B99A]">
              <span>Damage Assessment</span>
              <span className="text-[#FF9500]">100%</span>
            </div>
            <div className="flex justify-between text-[#C9B99A]">
              <span>Status</span>
              <span className="text-[#FF9500] font-bold">ACTIVE</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* HUD Panel — Top Right: Icons */}
      <motion.div
        style={{ opacity: hudOpacity }}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.75, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-20 md:top-24 right-4 md:right-12 z-[5] hidden md:flex flex-col gap-4"
      >
        <div className="bg-[rgba(27,40,56,0.85)] backdrop-blur-lg rounded border border-[rgba(255,149,0,0.3)] p-3 flex flex-col items-center gap-1"
          style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
          <Globe size={22} className="text-[#FFB840]" strokeWidth={1.5} />
          <span className="text-[9px] uppercase tracking-[0.06em] text-[#C9B99A]">GLOBAL</span>
        </div>
        <div className="bg-[rgba(27,40,56,0.85)] backdrop-blur-lg rounded border border-[rgba(255,149,0,0.3)] p-3 flex flex-col items-center gap-1"
          style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
          <Cpu size={22} className="text-[#FFB840]" strokeWidth={1.5} />
          <span className="text-[9px] uppercase tracking-[0.06em] text-[#C9B99A]">AI POWERED</span>
        </div>
      </motion.div>

      {/* HUD Panel — Bottom Left: Surviving Assets */}
      <motion.div
        style={{ opacity: hudOpacity }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-8 md:bottom-12 left-4 md:left-12 z-[5] hidden sm:block"
      >
        <div className="bg-[rgba(27,40,56,0.85)] backdrop-blur-lg rounded border border-[rgba(255,149,0,0.3)] p-4"
          style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
          <div className="flex items-center gap-2 mb-2">
            <Globe size={16} className="text-[#FFB840]" strokeWidth={1.5} />
            <span className="text-[10px] uppercase tracking-[0.08em] text-[#F0EBE1]">surviving assets</span>
          </div>
          <div className="font-mono-hud text-[10px] space-y-1">
            {[
              ['Community', '100%'],
              ['Voice', '100%'],
              ['Truth', '100%'],
              ['Justice', '100%'],
            ].map(([name, val]) => (
              <div key={name} className="flex justify-between gap-8 text-[#C9B99A]">
                <span>{name}</span>
                <span className="text-[#FF9500]">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* HUD Panel — Bottom Right: Casualty Assessment */}
      <motion.div
        style={{ opacity: hudOpacity }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-8 md:bottom-12 right-4 md:right-12 z-[5] hidden sm:block"
      >
        <div className="bg-[rgba(27,40,56,0.85)] backdrop-blur-lg rounded border border-[rgba(255,149,0,0.3)] p-4"
          style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
          <p className="text-[10px] uppercase tracking-[0.08em] text-[#FFB840] mb-2">
            CASUALTY ASSESSMENT
          </p>
          <div className="font-mono-hud text-[10px] space-y-1">
            <div className="flex justify-between gap-8 text-[#C9B99A]">
              <span>Individual Status:</span>
              <span className="text-[#FF9500] font-bold">FIGHTING</span>
            </div>
            <div className="flex justify-between gap-8 text-[#C9B99A]">
              <span>Community Impact:</span>
              <span className="text-[#E8503A] font-bold">CRITICAL</span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs tracking-[0.3em] text-[#C9B99A]">4ITU</span>
            <Sparkles size={14} className="text-[#FFB840]" />
          </div>
        </div>
      </motion.div>

      {/* Hero content */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-[1] px-6 md:px-12 max-w-4xl"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl lg:text-[96px] font-normal text-[#F0EBE1] tracking-[-0.03em] leading-[1.05] text-shadow-hero"
        >
          #TheKingsTake
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl md:text-2xl text-[#C9B99A] tracking-[0.04em] mt-4"
        >
          The People's Voice
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-base text-dimmed mt-3"
        >
          Advocacy. Truth. Justice.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8"
        >
          <CTAButton onClick={onExploreClick}>
            Explore the Platform
          </CTAButton>
        </motion.div>
      </motion.div>
    </section>
  )
}
