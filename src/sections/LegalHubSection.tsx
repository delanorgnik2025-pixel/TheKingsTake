import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { Link } from 'react-router'
import { trpc } from '@/providers/trpc'
import { FileText, Download, ArrowRight } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
}

export default function LegalHubSection() {
  const { data: legalFormsList } = trpc.legal.list.useQuery();

  return (
    <section id="legal-hub" className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/bg-legal.jpg)' }} />
      <div className="absolute inset-0 bg-[#1B2838]/80" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.08em] text-[#C9B99A] mb-12">THE LEGAL HUB</p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <h2 className="text-4xl md:text-5xl lg:text-[56px] text-[#F0EBE1] tracking-[-0.02em] leading-[1.08] mb-12 text-shadow-hero">
            Know Your Rights. Access the Tools.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <div className="bg-[rgba(27,40,56,0.85)] backdrop-blur-lg rounded border border-[rgba(255,149,0,0.3)] p-6 md:p-8 mb-16"
            style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.5)', borderLeft: '3px solid #FF9500' }}>
            <div className="flex gap-1 mb-3">
              {[0, 1, 2].map(i => <div key={i} className="w-[3px] h-[3px] rounded-full bg-[#FFB840]" />)}
            </div>
            <p className="text-xs uppercase tracking-[0.08em] text-[#FFB840] mb-4">UPL LAW — UNDERSTANDING THE BARRIER</p>
            <p className="text-base text-[#C9B99A] leading-relaxed max-w-3xl">
              The Unauthorized Practice of Law (UPL) law was designed to protect individuals from receiving legal counsel from unqualified sources. However, this well-intentioned law has created a devastating gap for Black families who cannot afford to pay thousands of dollars to a private attorney on short notice. Here, we provide the tools to help you understand and fight back.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="flex items-center justify-between mb-8">
            <p className="text-xs uppercase tracking-[0.08em] text-[#C9B99A]">FREE LEGAL FORMS & MOTIONS</p>
            <Link to="/legal" className="text-sm text-[#FF9500] hover:underline flex items-center gap-1">
              View All <ArrowRight size={14} />
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {legalFormsList?.map((form, i) => (
            <motion.div
              key={form.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              transition={{ delay: 0.3 + i * 0.12 }}
              className="group bg-[rgba(27,40,56,0.75)] rounded border border-[rgba(255,149,0,0.2)] p-6 transition-all duration-400 hover:border-[rgba(255,149,0,0.5)] hover:-translate-y-1"
              style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.4)' }}
            >
              <div className="flex items-center gap-2 mb-3">
                {[0, 1, 2].map(j => <div key={j} className="w-[3px] h-[3px] rounded-full bg-[#FF9500]" />)}
              </div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base text-[#F0EBE1] uppercase tracking-[0.03em]">{form.title}</h3>
                <FileText size={20} className="text-[#FF9500]" strokeWidth={1.5} />
              </div>
              <p className="text-xs text-[#C9B99A] mb-4 leading-relaxed">{form.description}</p>
              <Link to={`/legal/${form.slug}`} className="flex items-center gap-2 text-xs text-[#FF9500] uppercase tracking-[0.04em] hover:underline transition-all">
                <Download size={14} />
                <span>View & Download</span>
                <span className="group-hover:translate-x-1 transition-transform duration-200">&rarr;</span>
              </Link>
            </motion.div>
          ))}
        </div>

        <ScrollReveal delay={0.5}>
          <p className="text-[11px] text-[rgba(201,185,154,0.5)] italic text-center mt-12 max-w-[800px] mx-auto">
            *Disclaimer: These forms are provided for informational and educational purposes only. They do not constitute legal advice. Always consult with a licensed attorney regarding your specific legal situation. #TheKingsTake and AASOTU Media Group LLC are not law firms and do not provide legal representation.*
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
