import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import { TreePine, Sparkles, ArrowRight } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'

export default function AncestorRealmTeaser() {
  const navigate = useNavigate()

  return (
    <section id="ancestor-realm" className="relative py-20 md:py-28 px-6 md:px-12 overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0f1a]" />
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(255,149,0,0.15) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(78,205,196,0.1) 0%, transparent 50%)',
      }} />

      <div className="relative z-10 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex gap-1">{[0,1,2].map(i => <div key={i} className="w-[3px] h-[3px] rounded-full bg-[#FF9500]" />)}</div>
            <p className="text-xs uppercase tracking-[0.08em] text-[#FF9500]">New Experience</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="text-4xl md:text-5xl lg:text-[64px] text-[#F0EBE1] tracking-[-0.02em] leading-[1.08] mb-4 text-shadow-hero">
            Enter The Ancestor Realm
          </h2>
          <p className="text-lg md:text-xl text-[#C9B99A] max-w-3xl leading-relaxed mb-8">
            Walk among those who came before in a sacred 3D garden. Their wisdom lives in the roots of this ground. Chat with ancestral spirits, preserve their memories, and trace the lineage they tried to erase.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { icon: TreePine, title: 'Sacred Garden', desc: '3D cinematic African Eden' },
              { icon: Sparkles, title: 'Ancestor Chat', desc: 'Speak with elder spirits' },
              { icon: TreePine, title: 'Family Trees', desc: 'Grow your lineage digitally' },
              { icon: Sparkles, title: 'Story Weaver', desc: 'AI-powered narratives' },
            ].map((feat, i) => (
              <motion.div
                key={feat.title}
                whileHover={{ scale: 1.02 }}
                className="bg-[rgba(27,40,56,0.5)] border border-[rgba(255,149,0,0.1)] rounded-xl p-4"
              >
                <feat.icon size={18} className="text-[#FF9500] mb-2" />
                <p className="text-sm text-[#F0EBE1] font-medium">{feat.title}</p>
                <p className="text-[10px] text-[#C9B99A]/60 mt-1">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <motion.button
            onClick={() => navigate('/ancestor-realm')}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 bg-[rgba(255,149,0,0.15)] border border-[rgba(255,149,0,0.3)] text-[#FF9500] rounded-lg px-6 py-3 text-sm font-medium tracking-wider uppercase hover:bg-[rgba(255,149,0,0.25)] transition-all"
          >
            Enter the Garden <ArrowRight size={16} />
          </motion.button>
        </ScrollReveal>
      </div>
    </section>
  )
}
