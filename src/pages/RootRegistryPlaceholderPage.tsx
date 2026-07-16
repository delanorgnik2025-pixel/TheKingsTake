import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, TreePine, Sparkles, Mail } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'

export default function RootRegistryPlaceholderPage() {
  return (
    <div className="min-h-screen bg-[#05080e]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0A0F1A]/95 backdrop-blur-md border-b border-[rgba(255,149,0,0.1)]">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/ancestor-root-registry" className="flex items-center gap-2 text-xs text-[#C9B99A] hover:text-[#FF9500] transition-colors">
            <ArrowLeft size={14} /> Back to Registry
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#FF9500]/40">#TheKingsTake</span>
            <span className="text-[#C9B99A]/20">|</span>
            <span className="text-[9px] uppercase tracking-wider text-[#C9B99A]/30">Ancestor Root Registry</span>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[rgba(255,149,0,0.1)] border border-[rgba(255,149,0,0.2)] rounded-full px-4 py-1.5 mb-6">
              <Clock size={12} className="text-[#FF9500]" />
              <span className="text-[10px] uppercase tracking-[0.15em] text-[#FF9500] font-medium">Coming Soon</span>
            </div>

            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-[rgba(255,149,0,0.1)] border border-[rgba(255,149,0,0.2)] flex items-center justify-center">
                <TreePine size={40} className="text-[#FF9500]" strokeWidth={1.5} />
              </div>
            </div>

            <h1
              className="text-3xl sm:text-4xl md:text-5xl text-[#F0EBE1] font-medium leading-[1.1] mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Ancestor Root Registry
            </h1>
            <p className="text-lg text-[#FF9500]/70 italic mb-4">
              Plant Your Roots. Preserve Your Legacy.
            </p>
            <p className="text-sm text-[#C9B99A]/60 max-w-xl mx-auto leading-relaxed">
              A sacred digital archive where families document their bloodline, store family trees, 
              and preserve their heritage for future generations. This feature is currently under development 
              and will launch soon.
            </p>
          </div>
        </ScrollReveal>

        {/* What to expect */}
        <ScrollReveal delay={0.1}>
          <div className="bg-[rgba(27,40,56,0.6)] border border-[rgba(255,149,0,0.15)] rounded-xl p-6 md:p-8 mb-8">
            <h2 className="text-lg text-[#F0EBE1] font-medium mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              What You'll Be Able To Do
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Create Family Trees', desc: 'Build interactive family trees with unlimited generations' },
                { title: 'Document Bloodlines', desc: 'Record ancestry, tribal affiliations, and heritage' },
                { title: 'Store Vital Records', desc: 'Securely archive birth, marriage, and death records' },
                { title: 'Share With Family', desc: 'Invite relatives to contribute and view your registry' },
                { title: 'Connect to the Map', desc: 'Link your ancestry to territories on the heritage map' },
                { title: 'Preserve Forever', desc: 'Permanent digital archive for future generations' },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <Sparkles size={16} className="text-[#FF9500] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-[#F0EBE1] font-medium">{feature.title}</p>
                    <p className="text-[11px] text-[#C9B99A]/50">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Notify me */}
        <ScrollReveal delay={0.1}>
          <div className="text-center bg-gradient-to-br from-[rgba(255,149,0,0.08)] to-[rgba(27,40,56,0.4)] border border-[rgba(255,149,0,0.2)] rounded-xl p-6 md:p-8">
            <h3 className="text-lg text-[#F0EBE1] font-medium mb-2">Be the First to Know</h3>
            <p className="text-sm text-[#C9B99A]/60 mb-6 max-w-md mx-auto">
              Want early access to the Ancestor Root Registry? Send me an email and I'll add you to the launch list.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="mailto:aasotumediagroup@gmail.com?subject=Ancestor Root Registry - Early Access Request"
                className="inline-flex items-center gap-2 rounded-full h-12 px-8 bg-[#FF9500] text-[#1B2838] hover:bg-[#CC6A00] transition-colors font-medium"
                style={{ boxShadow: '0 4px 16px rgba(255,149,0,0.25)' }}
              >
                <Mail size={16} /> Get Early Access
              </a>
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-full h-12 px-8 border border-[rgba(255,149,0,0.4)] text-[#FF9500] hover:bg-[rgba(255,149,0,0.08)] transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {/* Footer note */}
        <div className="text-center mt-12 pt-8 border-t border-[rgba(255,149,0,0.08)]">
          <p className="text-[11px] text-[#C9B99A]/40">
            The Ancestor Root Registry is a project of AASOTU Media Group LLC.
          </p>
        </div>
      </div>
    </div>
  )
}
