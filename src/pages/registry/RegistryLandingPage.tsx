// PAGE 1 — REGISTRY LANDING
// Route: /ancestor-root-registry

import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import { TreePine, Shield, BookOpen, Users, Sparkles } from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'

export default function RegistryLandingPage() {
  const navigate = useNavigate()

  const features = [
    { icon: Users, label: 'Family Trees', desc: 'Build interactive bloodline records' },
    { icon: BookOpen, label: 'Stories & Oral Histories', desc: 'Preserve narratives for generations' },
    { icon: Shield, label: 'Research Notes', desc: 'Track what you know and what you seek' },
    { icon: Sparkles, label: 'Future Ancestral Realm', desc: 'Where memory becomes experience' },
  ]

  return (
    <div className="min-h-screen bg-[#05080e]">
      {/* Cinematic Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[rgba(201,185,154,0.03)] blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[rgba(255,149,0,0.02)] blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          {/* Subtle constellation dots */}
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-[2px] h-[2px] rounded-full bg-[rgba(201,185,154,0.4)]"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
          {/* Root lines SVG */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" viewBox="0 0 1200 800">
            <path d="M600 400 Q500 300 400 250 Q300 200 200 180" stroke="#C9B99A" fill="none" strokeWidth="1" />
            <path d="M600 400 Q700 300 800 250 Q900 200 1000 180" stroke="#C9B99A" fill="none" strokeWidth="1" />
            <path d="M600 400 Q550 500 500 600 Q450 700 400 750" stroke="#C9B99A" fill="none" strokeWidth="1" />
            <path d="M600 400 Q650 500 700 600 Q750 700 800 750" stroke="#C9B99A" fill="none" strokeWidth="1" />
            <path d="M600 400 Q600 250 600 150" stroke="#C9B99A" fill="none" strokeWidth="1" />
          </svg>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full border border-[rgba(201,185,154,0.2)] bg-[rgba(201,185,154,0.05)] flex items-center justify-center">
                <TreePine size={36} className="text-[#C9B99A]" strokeWidth={1.2} />
              </div>
            </div>

            <p className="text-[10px] uppercase tracking-[0.25em] text-[#C9B99A]/50 mb-4">
              AASOTU Media Group LLC &middot; #TheKingsTake
            </p>

            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#F0EBE1] font-medium leading-[1.1] mb-6"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Ancestor Root Registry
            </h1>

            <p className="text-lg md:text-xl text-[#C9B99A]/70 italic mb-3 max-w-2xl mx-auto">
              Preserve names. Honor bloodlines. Keep memory alive.
            </p>

            <p className="text-sm text-[#C9B99A]/50 max-w-xl mx-auto leading-relaxed mb-10">
              A sacred digital archive where families document their heritage, store family trees,
              record stories, and build a lasting legacy for generations to come.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/ancestor-root-registry/why')}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-medium tracking-wide cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,149,0,0.9), rgba(255,149,0,0.7))',
                  color: '#0A0F1A',
                  boxShadow: '0 4px 24px rgba(255,149,0,0.25)',
                }}
              >
                <TreePine size={16} />
                Plant Your Roots
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/ancestor-root-registry/access')}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm tracking-wide border cursor-pointer"
                style={{
                  borderColor: 'rgba(201,185,154,0.3)',
                  color: '#C9B99A',
                  background: 'rgba(201,185,154,0.05)',
                }}
              >
                <Shield size={16} />
                Open Existing Registry
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border border-[rgba(201,185,154,0.2)] flex items-start justify-center pt-2">
            <div className="w-1 h-2 rounded-full bg-[#C9B99A]/50" />
          </div>
        </motion.div>
      </section>

      {/* What You Can Preserve */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#FF9500]/60 mb-2">What You Can Preserve</p>
              <h2
                className="text-2xl md:text-3xl text-[#F0EBE1] font-medium"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Every Piece of Your Family History Matters
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="p-6 rounded-xl border border-[rgba(201,185,154,0.1)] bg-[rgba(27,40,56,0.3)] hover:border-[rgba(255,149,0,0.2)] transition-all duration-300"
                >
                  <f.icon size={24} className="text-[#FF9500] mb-3" strokeWidth={1.5} />
                  <p className="text-sm text-[#F0EBE1] font-medium mb-1">{f.label}</p>
                  <p className="text-xs text-[#C9B99A]/50">{f.desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Future vision teaser */}
      <section className="py-16 px-4 border-t border-[rgba(201,185,154,0.06)]">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#C9B99A]/40 mb-4">The Future Vision</p>
            <p className="text-base text-[#F0EBE1]/80 italic leading-relaxed mb-4">
              &ldquo;The family tree is alive, and each record feeds the Ancestral Realm.&rdquo;
            </p>
            <p className="text-xs text-[#C9B99A]/40 max-w-lg mx-auto leading-relaxed">
              Your Registry records will eventually power 3D ancestor representations, family museums,
              interactive timelines, and immersive Ancestral Realm environments.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Privacy note */}
      <section className="py-12 px-4 border-t border-[rgba(201,185,154,0.06)]">
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal>
            <p className="text-[10px] uppercase tracking-[0.15em] text-[#C9B99A]/40 mb-2">Privacy & Accuracy</p>
            <p className="text-xs text-[#C9B99A]/35 leading-relaxed">
              The Ancestor Root Registry is a preservation and research tool. Family testimony may be meaningful
              without being independently verified. Users remain responsible for information they enter.
              Tribal enrollment, citizenship, and legal identity are determined by the relevant nation or tribe —
              not by this Registry. DNA ethnicity estimates are not the same as legal, political, or cultural citizenship.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer branding */}
      <div className="py-8 text-center border-t border-[rgba(201,185,154,0.04)]">
        <p className="text-[9px] uppercase tracking-[0.2em] text-[#C9B99A]/25">
          AASOTU Media Group LLC &middot; #TheKingsTake &middot; thekingstake.com
        </p>
      </div>
    </div>
  )
}
