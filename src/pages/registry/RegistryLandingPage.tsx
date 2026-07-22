// PAGE 1 — REGISTRY LANDING
// Route: /ancestor-root-registry
// Full cinematic background image from the old-world study

import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import { TreePine, Shield, BookOpen, Users, Sparkles, Scroll, MapPin, Clock } from 'lucide-react'
import RegistryBackground from '@/components/RegistryBackground'
import ScrollReveal from '@/components/ScrollReveal'

export default function RegistryLandingPage() {
  const navigate = useNavigate()

  const features = [
    { icon: Users, label: 'Family Trees', desc: 'Build interactive bloodline records generation by generation' },
    { icon: BookOpen, label: 'Stories & Histories', desc: 'Preserve oral histories, traditions, and narratives' },
    { icon: Scroll, label: 'Research Notes', desc: 'Track what you know, what you seek, and what you have found' },
    { icon: MapPin, label: 'Migration Paths', desc: 'Document where your family came from and where they went' },
    { icon: Clock, label: 'Timelines', desc: 'Chronicle events across generations in chronological order' },
    { icon: Sparkles, label: 'Ancestral Realm', desc: 'Where memory becomes a living, immersive experience' },
  ]

  return (
    <RegistryBackground variant="landing">
      {/* Hero Section — content floats over the background image */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center max-w-3xl mx-auto"
        >
          {/* Tree emblem */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <div className="w-16 h-16 mx-auto rounded-full border border-[rgba(201,185,154,0.25)] bg-[rgba(15,10,5,0.5)] backdrop-blur-sm flex items-center justify-center">
              <TreePine size={28} className="text-[#C9B99A]" strokeWidth={1.2} />
            </div>
          </motion.div>

          <p className="text-[10px] uppercase tracking-[0.3em] text-[#C9B99A]/60 mb-10">
            AASOTU Media Group LLC &middot; #TheKingsTake
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/ancestor-root-registry/why')}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-medium tracking-wide cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, rgba(180,140,60,0.95), rgba(140,100,30,0.9))',
                color: '#0d0805',
                boxShadow: '0 4px 24px rgba(180,140,60,0.3), inset 0 1px 0 rgba(255,255,255,0.15)',
              }}
            >
              <TreePine size={16} />
              Plant Your Roots
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/ancestor-root-registry/access')}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm tracking-wide border cursor-pointer backdrop-blur-sm"
              style={{
                borderColor: 'rgba(201,185,154,0.25)',
                color: '#C9B99A',
                background: 'rgba(15,10,5,0.4)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
              }}
            >
              <Shield size={16} />
              Open Existing Registry
            </motion.button>
          </div>
        </motion.div>

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

      {/* What You Can Preserve — cards over the image with glass effect */}
      <section className="relative py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-[10px] uppercase tracking-[0.25em] mb-2" style={{ color: 'rgba(180,140,60,0.7)' }}>
                What You Can Preserve
              </p>
              <h2
                className="text-2xl md:text-3xl font-medium"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: '#F0EBE1',
                  textShadow: '0 2px 12px rgba(0,0,0,0.5)',
                }}
              >
                Every Piece of Your Family History Matters
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="p-5 rounded-xl border backdrop-blur-sm transition-all duration-300"
                  style={{
                    background: 'rgba(15,10,5,0.55)',
                    borderColor: 'rgba(201,185,154,0.1)',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
                  }}
                >
                  <f.icon size={22} className="mb-3" style={{ color: 'rgba(180,140,60,0.8)' }} strokeWidth={1.5} />
                  <p className="text-sm font-medium mb-1" style={{ color: '#F0EBE1' }}>{f.label}</p>
                  <p className="text-xs leading-relaxed" style={{ color: 'rgba(201,185,154,0.45)' }}>{f.desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Future vision */}
      <section className="relative py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <p className="text-[10px] uppercase tracking-[0.2em] mb-4" style={{ color: 'rgba(201,185,154,0.35)' }}>
              The Future Vision
            </p>
            <p
              className="text-base italic leading-relaxed mb-4"
              style={{ color: 'rgba(240,235,225,0.75)', textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}
            >
              &ldquo;The family tree is alive, and each record feeds the Ancestral Realm.&rdquo;
            </p>
            <p className="text-xs leading-relaxed max-w-lg mx-auto" style={{ color: 'rgba(201,185,154,0.4)' }}>
              Your Registry records will eventually power 3D ancestor representations, family museums,
              interactive timelines, and immersive Ancestral Realm environments.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Privacy note */}
      <section className="relative py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal>
            <p className="text-[10px] uppercase tracking-[0.15em] mb-2" style={{ color: 'rgba(201,185,154,0.3)' }}>
              Privacy & Accuracy
            </p>
            <p className="text-xs leading-relaxed" style={{ color: 'rgba(201,185,154,0.3)' }}>
              The Ancestor Root Registry is a preservation and research tool. Family testimony may be meaningful
              without being independently verified. Users remain responsible for information they enter.
              Tribal enrollment and citizenship are determined by the relevant nation or tribe.
              DNA ethnicity estimates are not the same as legal, political, or cultural citizenship.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <div className="relative py-8 text-center">
        <p className="text-[9px] uppercase tracking-[0.2em]" style={{ color: 'rgba(201,185,154,0.2)' }}>
          AASOTU Media Group LLC &middot; #TheKingsTake &middot; thekingstake.com
        </p>
      </div>
    </RegistryBackground>
  )
}
