import { useState } from 'react'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import {
  Microscope, Sparkles, ShieldAlert, ChevronRight, Clock, FileText,
  Search, MessageSquare, ArrowRight, Trash2
} from 'lucide-react'

export default function ForensicsLabPage() {
  const [savedCases, setSavedCases] = useState<any[]>(() => {
    const saved = localStorage.getItem('forensics-cases')
    return saved ? JSON.parse(saved) : []
  })

  const deleteCase = (id: string) => {
    const updated = savedCases.filter(c => c.id !== id)
    setSavedCases(updated)
    localStorage.setItem('forensics-cases', JSON.stringify(updated))
  }

  return (
    <div className="min-h-screen bg-[#05080e]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0A0F1A]/95 backdrop-blur-md border-b border-[rgba(255,149,0,0.1)]">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-xs text-[#C9B99A] hover:text-[#FF9500] transition-colors flex items-center gap-1">
            ← Home
          </Link>
          <div className="flex items-center gap-2">
            <Microscope size={14} className="text-[#FF9500]" />
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#FF9500]/40">AI Forensics Lab</span>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Hero */}
        <ScrollReveal>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-[rgba(255,149,0,0.1)] border border-[rgba(255,149,0,0.2)] rounded-full px-4 py-1.5 mb-4">
              <Sparkles size={14} className="text-[#FF9500]" />
              <span className="text-[10px] uppercase tracking-[0.15em] text-[#FF9500] font-medium">New — AI-Powered</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl text-[#F0EBE1] font-medium leading-[1.1] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Replay Life Events.<br />Get Forensic Answers.
            </h1>
            <p className="text-base text-[#C9B99A]/70 max-w-xl mx-auto">
              Describe what happened to you. The AI analyzes your situation, identifies the evidence you need, 
              guides your investigation, and helps you build a supported conclusion.
            </p>
          </div>
        </ScrollReveal>

        {/* Disclaimer */}
        <ScrollReveal delay={0.1}>
          <div className="bg-[rgba(255,149,0,0.05)] border border-[rgba(255,149,0,0.15)] rounded-lg p-4 mb-10 max-w-2xl mx-auto">
            <div className="flex items-start gap-3">
              <ShieldAlert size={18} className="text-[#FF9500] shrink-0 mt-0.5" />
              <div>
                <p className="text-[11px] text-[#C9B99A]/70 leading-relaxed">
                  <strong className="text-[#F0EBE1]">Educational Tool:</strong> This is not legal advice or a substitute for certified forensic investigation. 
                  It helps you think systematically about evidence and organize your thoughts. 
                  <strong className="text-[#F0EBE1]"> Always consult an attorney for legal matters.</strong>
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* How It Works */}
        <ScrollReveal delay={0.15}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {[
              { icon: FileText, step: '1', title: 'Describe Your Situation', desc: 'Type or paste what happened in your own words. Include who, what, when, where.' },
              { icon: Sparkles, step: '2', title: 'AI Analyzes Your Case', desc: 'The AI identifies evidence types, key people, timeline events, and your rights.' },
              { icon: MessageSquare, step: '3', title: 'Ask Questions. Get Answers.', desc: 'Chat with the AI advisor about evidence, timelines, rights, and next steps.' },
            ].map(({ icon: Icon, step, title, desc }) => (
              <div key={step} className="bg-[rgba(27,40,56,0.4)] border border-[rgba(255,149,0,0.1)] rounded-xl p-5 text-center">
                <div className="w-10 h-10 rounded-full bg-[rgba(255,149,0,0.1)] border border-[rgba(255,149,0,0.2)] flex items-center justify-center mx-auto mb-3">
                  <Icon size={18} className="text-[#FF9500]" />
                </div>
                <p className="text-[10px] text-[#FF9500]/60 mb-1">Step {step}</p>
                <p className="text-sm text-[#F0EBE1] font-medium mb-1">{title}</p>
                <p className="text-[11px] text-[#C9B99A]/50">{desc}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal delay={0.2}>
          <div className="text-center mb-12">
            <Link
              to="/forensics-lab/create"
              className="inline-flex items-center gap-2 rounded-full h-14 px-10 bg-[#FF9500] text-[#1B2838] hover:bg-[#CC6A00] transition-colors font-medium text-lg"
              style={{ boxShadow: '0 4px 20px rgba(255,149,0,0.3)' }}
            >
              <Microscope size={20} /> Start an Investigation <ArrowRight size={18} />
            </Link>
            <p className="text-[11px] text-[#C9B99A]/40 mt-3">
              Free. No account required. Your data stays on your device.
            </p>
          </div>
        </ScrollReveal>

        {/* Previous Cases */}
        {savedCases.length > 0 && (
          <ScrollReveal delay={0.25}>
            <div className="border-t border-[rgba(255,149,0,0.08)] pt-8">
              <h3 className="text-base text-[#F0EBE1] font-medium mb-4 flex items-center gap-2">
                <Clock size={16} className="text-[#FF9500]" /> Your Investigations
              </h3>
              <div className="space-y-2">
                {savedCases.map((c, i) => (
                  <motion.div
                    key={c.id || i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3 bg-[rgba(27,40,56,0.4)] border border-[rgba(255,149,0,0.08)] rounded-lg p-4 hover:border-[rgba(255,149,0,0.2)] transition-all group"
                  >
                    <Link
                      to={`/forensics-lab/investigate/${c.id}`}
                      className="flex-1 min-w-0"
                    >
                      <p className="text-sm text-[#F0EBE1] truncate group-hover:text-[#FF9500] transition-colors">{c.title}</p>
                      <div className="flex items-center gap-2 text-[10px] text-[#C9B99A]/40 mt-0.5">
                        <span>{c.location}</span>
                        <span>•</span>
                        <span>{c.evidence?.length || 0} evidence items</span>
                        <span>•</span>
                        <span>{c.people?.length || 0} people</span>
                      </div>
                    </Link>
                    <Link
                      to={`/forensics-lab/investigate/${c.id}`}
                      className="text-[#FF9500] hover:text-[#CC6A00] transition-colors"
                    >
                      <ChevronRight size={18} />
                    </Link>
                    <button
                      onClick={() => deleteCase(c.id)}
                      className="text-[#C9B99A]/20 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Features */}
        <ScrollReveal delay={0.3}>
          <div className="border-t border-[rgba(255,149,0,0.08)] pt-8 mt-8">
            <h3 className="text-sm text-[#F0EBE1] font-medium mb-4 text-center">What the AI Forensics Lab Can Help With</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { icon: Search, title: 'Identify Critical Evidence', desc: 'The AI analyzes your situation and tells you what evidence to pursue first.' },
                { icon: MessageSquare, title: 'Ask Anything', desc: 'Chat with the AI advisor about your rights, evidence, or what to do next.' },
                { icon: Clock, title: 'Build a Timeline', desc: 'Organize events chronologically to spot gaps and contradictions.' },
                { icon: FileText, title: 'Know Your Rights', desc: 'Get context-specific guidance on your legal rights and protections.' },
                { icon: ShieldAlert, title: 'Preserve Evidence', desc: 'Learn how to save evidence before it disappears or gets overwritten.' },
                { icon: Microscope, title: 'Build a Conclusion', desc: 'Synthesize your findings into a supported, credible account.' },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-3 bg-[rgba(27,40,56,0.3)] rounded-lg p-3">
                  <Icon size={16} className="text-[#FF9500] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-[#F0EBE1] font-medium">{title}</p>
                    <p className="text-[10px] text-[#C9B99A]/50">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}

// Simple scroll reveal component
function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
    >
      {children}
    </motion.div>
  )
}
