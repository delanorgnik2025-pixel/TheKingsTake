// PAGE 2 — WHY PRESERVE YOUR BLOODLINE?
// Route: /ancestor-root-registry/why

import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import { ArrowLeft, Heart, BookOpen, MapPin, Scroll, Shield, Users, FileText, Flame, Globe, TreePine, Landmark } from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'

export default function RegistryWhyPage() {
  const navigate = useNavigate()

  const losses = [
    { icon: Users, text: 'Names of ancestors and their correct spellings' },
    { icon: Heart, text: 'Photographs and visual records of family members' },
    { icon: MapPin, text: 'Birth locations and migration paths' },
    { icon: Scroll, text: 'Military service records and stories' },
    { icon: Landmark, text: 'Religious and community history' },
    { icon: Flame, text: 'Family traditions, recipes, and cultural practices' },
    { icon: BookOpen, text: 'Oral histories passed between generations' },
    { icon: FileText, text: 'Records of enslaved or displaced ancestors' },
    { icon: Globe, text: 'Indigenous and tribal connections' },
    { icon: Shield, text: 'Family land and immigration information' },
  ]

  const recordTypes = [
    {
      label: 'Family Testimony',
      desc: 'Stories, memories, and knowledge shared by relatives. Valuable even without documentation.',
      color: 'rgba(255,149,0,0.15)',
      border: 'rgba(255,149,0,0.3)',
    },
    {
      label: 'Documented Record',
      desc: 'Information supported by official documents, certificates, or verified sources.',
      color: 'rgba(76,175,80,0.1)',
      border: 'rgba(76,175,80,0.3)',
    },
    {
      label: 'Research Lead',
      desc: 'Clues, hints, or unverified information worth investigating further.',
      color: 'rgba(33,150,243,0.1)',
      border: 'rgba(33,150,243,0.3)',
    },
    {
      label: 'Artistic Reconstruction',
      desc: 'Creative interpretations, imagined scenes, or commemorative works based on family memory.',
      color: 'rgba(156,39,176,0.1)',
      border: 'rgba(156,39,176,0.3)',
    },
  ]

  return (
    <div className="min-h-screen bg-[#05080e]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0A0F1A]/95 backdrop-blur-md border-b border-[rgba(201,185,154,0.08)]">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => navigate('/ancestor-root-registry')}
            className="flex items-center gap-2 text-xs text-[#C9B99A] hover:text-[#FF9500] transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} /> Back
          </button>
          <span className="text-[9px] uppercase tracking-[0.2em] text-[#C9B99A]/30">Ancestor Root Registry</span>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">
        {/* Hero */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#FF9500]/60 mb-4">Why This Matters</p>
            <h1
              className="text-3xl md:text-4xl lg:text-5xl text-[#F0EBE1] font-medium leading-[1.15] mb-6"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Why Preserve Your Bloodline?
            </h1>
            <p className="text-base text-[#C9B99A]/60 italic max-w-xl mx-auto leading-relaxed">
              Families lose more than they realize. Stories fade. Names are forgotten.
              Records disappear. But it does not have to be this way.
            </p>
          </div>
        </ScrollReveal>

        {/* What Families Lose */}
        <ScrollReveal>
          <div className="mb-16">
            <h2 className="text-xl text-[#F0EBE1] font-medium mb-8 text-center" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              What Families Can Lose
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {losses.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-start gap-3 p-4 rounded-lg bg-[rgba(27,40,56,0.4)] border border-[rgba(201,185,154,0.06)]"
                >
                  <item.icon size={18} className="text-[#FF9500]/70 shrink-0 mt-0.5" strokeWidth={1.5} />
                  <p className="text-sm text-[#F0EBE1]/80">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Record Type Distinctions */}
        <ScrollReveal>
          <div className="mb-16">
            <h2 className="text-xl text-[#F0EBE1] font-medium mb-6 text-center" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Understanding Your Records
            </h2>
            <p className="text-sm text-[#C9B99A]/50 text-center max-w-lg mx-auto mb-8">
              Every entry in your Registry has a status. These distinctions help maintain both
              honesty and hope in your family research.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recordTypes.map((rt, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -2 }}
                  className="p-5 rounded-xl border"
                  style={{
                    background: rt.color,
                    borderColor: rt.border,
                  }}
                >
                  <p className="text-sm text-[#F0EBE1] font-medium mb-2">{rt.label}</p>
                  <p className="text-xs text-[#C9B99A]/60 leading-relaxed">{rt.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Important disclaimer */}
        <ScrollReveal>
          <div className="mb-16 p-6 rounded-xl border border-[rgba(255,149,0,0.15)] bg-[rgba(255,149,0,0.03)]">
            <Shield size={18} className="text-[#FF9500] mb-3" />
            <p className="text-sm text-[#F0EBE1]/80 font-medium mb-2">Important Clarifications</p>
            <ul className="space-y-2 text-xs text-[#C9B99A]/50 leading-relaxed">
              <li className="flex gap-2">
                <span className="text-[#FF9500]/50 shrink-0">&bull;</span>
                The Registry does not prove tribal citizenship, nationality, inheritance, legal identity, or DNA ancestry.
              </li>
              <li className="flex gap-2">
                <span className="text-[#FF9500]/50 shrink-0">&bull;</span>
                Tribal enrollment and citizenship are determined by the relevant nation or tribe, not by this Registry.
              </li>
              <li className="flex gap-2">
                <span className="text-[#FF9500]/50 shrink-0">&bull;</span>
                DNA ethnicity estimates are not the same as legal, political, or cultural citizenship.
              </li>
              <li className="flex gap-2">
                <span className="text-[#FF9500]/50 shrink-0">&bull;</span>
                The Registry is a preservation and research tool. Users remain responsible for the information they enter.
              </li>
            </ul>
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal>
          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/ancestor-root-registry/access')}
              className="inline-flex items-center gap-2 px-10 py-4 rounded-xl text-sm font-medium tracking-wide cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, rgba(255,149,0,0.9), rgba(255,149,0,0.7))',
                color: '#0A0F1A',
                boxShadow: '0 4px 24px rgba(255,149,0,0.25)',
              }}
            >
              <TreePine size={16} />
              Preserve My Bloodline
            </motion.button>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}
