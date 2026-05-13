import { useRef } from 'react'
import { Link } from 'react-router'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Globe, Cpu, Sparkles, BookOpen, ArrowRight, Lock } from 'lucide-react'

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -60])
  const hudOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])

  return (
    <section ref={sectionRef} className="relative min-h-[100dvh] flex items-center overflow-hidden" id="hero">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/bg-hero.jpg)' }} />
      <div className="absolute inset-0 bg-[#1B2838]/60" />

      {/* HUD Panels */}
      <motion.div style={{ opacity: hudOpacity }} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="absolute top-20 md:top-24 left-4 md:left-12 z-[5] hidden sm:block">
        <div className="bg-[rgba(27,40,56,0.85)] backdrop-blur-lg rounded border border-[rgba(255,149,0,0.3)] p-4 md:p-5" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
          <div className="flex gap-1 mb-2">
            {[0, 1, 2].map(i => <div key={i} className="w-[3px] h-[3px] rounded-full bg-[#FFB840]" />)}
          </div>
          <p className="text-[10px] md:text-xs uppercase tracking-[0.08em] text-[#FFB840] font-['Newsreader'] mb-1">SITUATION REPORT</p>
          <p className="font-mono-hud text-[10px] md:text-[11px] text-[#F0EBE1]">AASOTU Media Group LLC</p>
          <p className="font-mono-hud text-[10px] md:text-[11px] text-[#C9B99A]">Ronald Lee King — Author</p>
          <div className="mt-2 font-mono-hud text-[10px]">
            <div className="flex justify-between text-[#C9B99A]"><span>Book</span><span className="text-[#FF9500] font-bold">AVAILABLE</span></div>
            <div className="flex justify-between text-[#C9B99A]"><span>Community</span><span className="text-[#FF9500]">12,000+</span></div>
            <div className="flex justify-between text-[#C9B99A]"><span>Simulator</span><span className="text-[#FFB840]">COMING</span></div>
          </div>
        </div>
      </motion.div>

      <motion.div style={{ opacity: hudOpacity }} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.75, duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="absolute top-20 md:top-24 right-4 md:right-12 z-[5] hidden md:flex flex-col gap-4">
        <div className="bg-[rgba(27,40,56,0.85)] backdrop-blur-lg rounded border border-[rgba(255,149,0,0.3)] p-3 flex flex-col items-center gap-1" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
          <BookOpen size={22} className="text-[#FFB840]" strokeWidth={1.5} />
          <span className="text-[9px] uppercase tracking-[0.06em] text-[#C9B99A]">THE BOOK</span>
        </div>
        <div className="bg-[rgba(27,40,56,0.85)] backdrop-blur-lg rounded border border-[rgba(255,149,0,0.3)] p-3 flex flex-col items-center gap-1" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
          <Lock size={22} className="text-[#FFB840]" strokeWidth={1.5} />
          <span className="text-[9px] uppercase tracking-[0.06em] text-[#C9B99A]">SIMULATOR</span>
        </div>
      </motion.div>

      <motion.div style={{ opacity: hudOpacity }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="absolute bottom-8 md:bottom-12 left-4 md:left-12 z-[5] hidden sm:block">
        <div className="bg-[rgba(27,40,56,0.85)] backdrop-blur-lg rounded border border-[rgba(255,149,0,0.3)] p-4" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
          <div className="flex items-center gap-2 mb-2">
            <Globe size={16} className="text-[#FFB840]" strokeWidth={1.5} />
            <span className="text-[10px] uppercase tracking-[0.08em] text-[#F0EBE1]">platform assets</span>
          </div>
          <div className="font-mono-hud text-[10px] space-y-1">
            {['Book', 'Blog', 'Legal Hub', 'Simulator'].map(name => (
              <div key={name} className="flex justify-between gap-8 text-[#C9B99A]">
                <span>{name}</span>
                <span className={name === 'Simulator' ? 'text-[#FFB840]' : 'text-[#FF9500]'}>
                  {name === 'Simulator' ? 'LOCKED' : 'LIVE'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div style={{ opacity: hudOpacity }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="absolute bottom-8 md:bottom-12 right-4 md:right-12 z-[5] hidden sm:block">
        <div className="bg-[rgba(27,40,56,0.85)] backdrop-blur-lg rounded border border-[rgba(255,149,0,0.3)] p-4" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
          <p className="text-[10px] uppercase tracking-[0.08em] text-[#FFB840] mb-2">MISSION STATUS</p>
          <div className="font-mono-hud text-[10px] space-y-1">
            <div className="flex justify-between gap-8 text-[#C9B99A]"><span>Individual Status:</span><span className="text-[#FF9500] font-bold">FIGHTING</span></div>
            <div className="flex justify-between gap-8 text-[#C9B99A]"><span>Community Impact:</span><span className="text-[#E8503A] font-bold">CRITICAL</span></div>
          </div>
        </div>
      </motion.div>

      {/* Hero content — BOOK IS THE STAR */}
      <motion.div style={{ opacity: contentOpacity, y: contentY }} className="relative z-[1] px-6 md:px-12 w-full max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          
          {/* Book Cover */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="md:w-[40%] flex-shrink-0"
          >
            <div className="relative group">
              <div className="rounded-lg overflow-hidden" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(255,149,0,0.2)' }}>
                <img 
                  src="/images/book-cover.jpg" 
                  alt="The African American State of the Union: From the Loins of the Beast by Ronald Lee King"
                  className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -top-3 -right-3 bg-[#FF9500] text-[#1B2838] text-xs font-bold px-3 py-1 rounded uppercase tracking-wider">
                Pre-Order
              </div>
            </div>
          </motion.div>

          {/* Text Content */}
          <div className="md:w-[60%]">
            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }} 
              className="text-xs uppercase tracking-[0.12em] text-[#FF9500] mb-3 font-['Newsreader']"
            >
              From the Author of #TheKingsTake
            </motion.p>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.35, duration: 0.8, ease: [0.16, 1, 0.3, 1] }} 
              className="text-4xl md:text-5xl lg:text-6xl font-normal text-[#F0EBE1] tracking-[-0.02em] leading-[1.1] text-shadow-hero mb-4"
            >
              The African American<br />State of the Union
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.45, duration: 0.8, ease: [0.16, 1, 0.3, 1] }} 
              className="text-2xl md:text-3xl text-[#FF9500] tracking-[0.02em] mb-3"
            >
              From the Loins of the Beast
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.55, duration: 0.8, ease: [0.16, 1, 0.3, 1] }} 
              className="text-base text-[#C9B99A] leading-relaxed mb-6 max-w-lg"
            >
              A raw, unfiltered examination of the legal traps, systemic exploitation, and institutional barriers facing Black communities. The book that started the movement. The foundation of #TheKingsTake.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.65, duration: 0.8, ease: [0.16, 1, 0.3, 1] }} 
              className="flex flex-wrap gap-4"
            >
              {/* PRIMARY CTA — PRE-ORDER THE BOOK */}
              <button 
                onClick={() => alert('Pre-orders opening soon! Reserve your digital copy of The African American State of the Union for $19.99.')}
                className="inline-flex items-center justify-center gap-2 rounded-full h-14 px-10 text-base bg-[#FF9500] text-[#1B2838] hover:bg-[#CC6A00] transition-colors font-['Newsreader'] tracking-[0.02em] font-medium"
                style={{ boxShadow: '0 4px 20px rgba(255,149,0,0.35)' }}
              >
                <BookOpen size={20} />
                Order Now — $19.99
              </button>
              
              {/* SECONDARY — WORK WITH ME */}
              <Link
                to="/work-with-me"
                className="inline-flex items-center justify-center gap-2 rounded-full h-14 px-8 text-sm border border-[#FF9500] text-[#FF9500] hover:bg-[rgba(255,149,0,0.1)] transition-colors font-['Newsreader'] tracking-[0.02em]"
              >
                <Sparkles size={18} />
                Work With Me
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.9 }} 
              className="flex items-center gap-6 mt-6 text-xs text-[#C9B99A]"
            >
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#FF9500]"></span> 12,000+ Community Members</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#FF9500]"></span> Legal Resources Hub</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#FFB840]"></span> Court Simulator Coming</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
