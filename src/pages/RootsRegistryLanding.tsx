import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router'
import { ArrowRight, Shield, TreePine, Lock, Users, Crown } from 'lucide-react'

const FEATURES = [
  { icon: Shield, title: 'SACRED & SECURE', desc: 'Your data is encrypted and protected for generations.' },
  { icon: TreePine, title: 'BUILT FOR GENERATIONS', desc: 'Preserve your legacy for your children and beyond.' },
  { icon: Users, title: 'BEAUTIFUL FAMILY TREE', desc: 'Watch your lineage grow with every entry.' },
  { icon: Lock, title: 'PRIVATE & LEGACY MODE', desc: 'Keep certain information private or visible to future generations.' },
]

export default function RootsRegistryLanding() {
  const navigate = useNavigate()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="w-full bg-[#05080e]">
      {/* HERO */}
      <section className="relative min-h-[100dvh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/roots-registry-hero.jpg"
            alt="Sacred ancestral tree"
            className={`w-full h-full object-cover object-top lg:object-center transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setLoaded(true)}
          />
          {!loaded && <div className="absolute inset-0 bg-[#05080e]" />}
        </div>

        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(5,8,14,0.1) 0%, rgba(5,8,14,0.55) 40%, rgba(5,8,14,0.92) 75%, #05080e 100%)' }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ boxShadow: 'inset 0 0 150px 60px rgba(5,8,14,0.3)' }} />

        <div className="relative z-10 min-h-[100dvh] flex flex-col justify-end pb-10 lg:pb-16 px-6 md:px-12 lg:px-16 pt-32">
          <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-end">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#FF9500] mb-4">
                The Sacred Registry
              </p>

              <h1 className="text-3xl sm:text-4xl lg:text-[56px] text-[#F0EBE1] tracking-[-0.01em] leading-[1.05] mb-2"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                PLANT YOUR ROOTS
              </h1>
              <h2 className="text-lg sm:text-xl lg:text-2xl text-[#C9B99A] tracking-[0.08em] mb-5"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                REGISTER YOUR BLOODLINE
              </h2>

              <p className="text-[13px] lg:text-[15px] text-[#C9B99A]/80 leading-[1.7] mb-6 max-w-lg">
                EVERY GREAT LEGACY BEGINS WITH A SINGLE NAME.<br />
                The Roots Registry is your sacred space to honor your ancestors, build your lineage, and preserve your heritage for generations to come.
              </p>

              <div className="flex flex-wrap gap-x-6 gap-y-2 mb-8">
                {['Build Your Family Tree', 'Connect Generations', 'Preserve Your Heritage', 'Leave a Lasting Legacy'].map((f) => (
                  <span key={f} className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.1em] text-[#C9B99A]/50">
                    <Crown size={10} className="text-[#FF9500]/60" /> {f}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => navigate('/roots-registry/register')}
                  className="inline-flex items-center justify-center sm:justify-start gap-2.5 bg-[rgba(255,149,0,0.2)] backdrop-blur-sm border border-[rgba(255,149,0,0.45)] text-[#FF9500] rounded-lg px-7 py-3.5 text-sm font-medium tracking-wide hover:bg-[rgba(255,149,0,0.32)] hover:border-[rgba(255,149,0,0.6)] transition-all duration-300 cursor-pointer"
                >
                  REGISTER YOUR BLOODLINE NOW
                  <ArrowRight size={14} />
                </button>
              </div>

              <p className="text-[10px] text-[#C9B99A]/30 mt-5 tracking-wide">
                YOUR LEGACY. YOUR STORY. YOUR KINGDOM.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block max-w-[280px]"
            >
              <div className="bg-[rgba(5,8,14,0.5)] backdrop-blur-md border border-[rgba(255,149,0,0.12)] rounded-xl p-5">
                <div className="flex justify-center mb-3">
                  <TreePine size={28} className="text-[#FF9500]" />
                </div>
                <p className="text-[12px] text-[#C9B99A]/70 text-center leading-relaxed italic">
                  "A people without the knowledge of their past history, origin and culture is like a tree without roots."
                </p>
                <p className="text-[10px] text-[#FF9500]/60 text-center mt-2">— Marcus Garvey</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative w-full bg-[#05080e] py-14 lg:py-20 border-t border-[rgba(255,149,0,0.06)]">
        <div className="px-6 md:px-12 lg:px-16 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-full bg-[rgba(255,149,0,0.06)] border border-[rgba(255,149,0,0.15)] flex items-center justify-center mx-auto mb-3">
                  <f.icon size={20} className="text-[#FF9500]" />
                </div>
                <h3 className="text-[10px] uppercase tracking-[0.12em] text-[#F0EBE1] font-medium mb-1.5">{f.title}</h3>
                <p className="text-[11px] text-[#C9B99A]/40 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER QUOTE */}
      <section className="relative w-full bg-[#05080e] py-10 border-t border-[rgba(255,149,0,0.06)]">
        <div className="px-6 md:px-12 lg:px-16 max-w-[1400px] mx-auto text-center">
          <p className="text-lg lg:text-xl text-[#F0EBE1]/90 italic tracking-wide"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Know your roots. Own your legacy. Build your kingdom.
          </p>
          <p className="text-[10px] text-[#C9B99A]/30 mt-3 tracking-wide">
            #TheKingsTake | AASOTU Media Group LLC
          </p>
        </div>
      </section>
    </div>
  )
}
