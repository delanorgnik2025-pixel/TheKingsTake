import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { Microscope, Lock, Clock, ShieldAlert, AlertTriangle, FileSearch, ChevronRight, BookOpen } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'
import { CASES } from '../data/forensics-cases'

export default function ForensicsLabPage() {
  return (
    <div className="min-h-screen bg-[#05080e]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0A0F1A]/95 backdrop-blur-md border-b border-[rgba(255,149,0,0.1)]">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-xs text-[#C9B99A] hover:text-[#FF9500] transition-colors flex items-center gap-2">
            ← Back to Home
          </Link>
          <div className="flex items-center gap-2">
            <Microscope size={14} className="text-[#FF9500]" />
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#FF9500]/40">Forensics Lab</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(255,149,0,0.03)] to-transparent" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-8 relative">
          <ScrollReveal>
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-[rgba(255,149,0,0.1)] border border-[rgba(255,149,0,0.2)] rounded-full px-4 py-1.5 mb-4">
                <Microscope size={14} className="text-[#FF9500]" />
                <span className="text-[10px] uppercase tracking-[0.15em] text-[#FF9500] font-medium">Virtual Forensics Lab</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl text-[#F0EBE1] font-medium leading-[1.1] mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                #TheKingsTake<br />Forensics Lab
              </h1>
              <p className="text-base text-[#C9B99A]/70 max-w-xl mx-auto">
                Learn forensic science by doing it. Investigate fictional cases, analyze evidence, and understand the difference between evidence and narrative.
              </p>
            </div>
          </ScrollReveal>

          {/* Disclaimer */}
          <ScrollReveal delay={0.1}>
            <div className="bg-[rgba(255,149,0,0.05)] border border-[rgba(255,149,0,0.15)] rounded-lg p-4 mb-8 max-w-3xl mx-auto">
              <div className="flex items-start gap-3">
                <ShieldAlert size={18} className="text-[#FF9500] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[11px] text-[#C9B99A]/70 leading-relaxed">
                    <strong className="text-[#F0EBE1]">Educational Disclaimer:</strong> All cases are fictional and designed for educational purposes only. 
                    This is not legal advice, not medical advice, and not a substitute for certified forensic training. 
                    Real forensic analysis must be conducted by qualified professionals in accredited laboratories.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Case Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {CASES.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                {c.locked ? (
                  <div className="bg-[rgba(27,40,56,0.3)] border border-[rgba(255,149,0,0.08)] rounded-xl p-6 opacity-50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[rgba(255,149,0,0.05)] border border-[rgba(255,149,0,0.1)] flex items-center justify-center">
                          <Lock size={18} className="text-[#C9B99A]/40" />
                        </div>
                        <div>
                          <h3 className="text-base text-[#C9B99A]/50 font-medium">{c.title}</h3>
                          <p className="text-[10px] text-[#C9B99A]/30">{c.tagline}</p>
                        </div>
                      </div>
                      <span className="text-[9px] text-[#C9B99A]/30 border border-[#C9B99A]/10 rounded-full px-2 py-0.5">{c.difficulty}</span>
                    </div>
                    <p className="text-xs text-[#C9B99A]/30">Coming Soon</p>
                  </div>
                ) : (
                  <Link
                    to={`/forensics-lab/case/${c.id}`}
                    className="block bg-[rgba(27,40,56,0.6)] border border-[rgba(255,149,0,0.2)] rounded-xl p-6 hover:border-[rgba(255,149,0,0.5)] transition-all group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[rgba(255,149,0,0.1)] border border-[rgba(255,149,0,0.2)] flex items-center justify-center">
                          <FileSearch size={18} className="text-[#FF9500]" />
                        </div>
                        <div>
                          <h3 className="text-base text-[#F0EBE1] font-medium group-hover:text-[#FF9500] transition-colors">{c.title}</h3>
                          <p className="text-[10px] text-[#C9B99A]/50">{c.tagline}</p>
                        </div>
                      </div>
                      <span className="text-[9px] text-[#FF9500] bg-[rgba(255,149,0,0.1)] border border-[rgba(255,149,0,0.15)] rounded-full px-2 py-0.5">{c.difficulty}</span>
                    </div>

                    <p className="text-sm text-[#C9B99A]/70 mb-4 line-clamp-2">{c.summary}</p>

                    <div className="flex items-center gap-4 text-[10px] text-[#C9B99A]/50 mb-4">
                      <span className="flex items-center gap-1"><Clock size={10} /> {c.estimatedTime}</span>
                      <span className="flex items-center gap-1"><AlertTriangle size={10} /> {c.evidenceCount} Evidence Items</span>
                      <span className="flex items-center gap-1"><Microscope size={10} /> {c.labStations.length} Lab Stations</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {c.learningObjectives.slice(0, 3).map((obj, idx) => (
                        <span key={idx} className="text-[9px] text-[#C9B99A]/40 bg-[rgba(27,40,56,0.6)] rounded-full px-2 py-0.5">{obj}</span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#FF9500] flex items-center gap-1">
                        Begin Investigation <ChevronRight size={14} />
                      </span>
                    </div>
                  </Link>
                )}
              </motion.div>
            ))}
          </div>

          {/* Learning Note */}
          <ScrollReveal delay={0.1}>
            <div className="text-center border-t border-[rgba(255,149,0,0.08)] pt-8">
              <BookOpen size={24} className="text-[#FF9500]/30 mx-auto mb-3" />
              <p className="text-sm text-[#C9B99A]/50 max-w-lg mx-auto">
                Each case teaches real forensic principles: evidence collection, chain of custody, 
                distinguishing fact from assumption, and understanding why wrongful convictions happen 
                when evidence is ignored or misinterpreted.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  )
}
