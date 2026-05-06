import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { Link } from 'react-router'
import { trpc } from '@/providers/trpc'
import { Monitor, PenTool, Eye, Edit3, Feather, FileText, ScrollText, Share2, ArrowRight } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'

const iconMap: Record<string, React.ElementType> = {
  Mic: PenTool, Monitor, PenTool, Eye, Edit3, Feather, FileText, ScrollText, Share2,
  Zap: Monitor, Crown: ScrollText,
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
}

export default function ServicesSection() {
  const { data: services } = trpc.service.list.useQuery();

  return (
    <section id="services" className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/bg-services.jpg)' }} />
      <div className="absolute inset-0 bg-[#1B2838]/80" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.08em] text-[#C9B99A] mb-12">WHAT I DO</p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <h2 className="text-4xl md:text-5xl lg:text-[56px] text-[#F0EBE1] tracking-[-0.02em] leading-[1.08] mb-4 text-shadow-hero">
            Your Vision. My Words.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <p className="text-base text-[#C9B99A] max-w-[600px] mb-16">
            From websites to legal documents, I bring your ideas to life with precision and power. Every word is a weapon for your cause.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services?.map((service, i) => {
            const Icon = iconMap[service.icon ?? "FileText"] ?? FileText;
            return (
              <motion.div
                key={service.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={cardVariants}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="group bg-[rgba(27,40,56,0.85)] backdrop-blur-lg rounded border border-[rgba(255,149,0,0.25)] p-8 transition-all duration-400 hover:border-[rgba(255,149,0,0.5)] hover:-translate-y-1"
                style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
              >
                <h3 className="text-lg text-[#F0EBE1] uppercase tracking-[0.04em]">{service.name}</h3>
                <div className="w-8 h-[2px] bg-[#FF9500] my-4" />
                <div className="mb-4"><Icon size={32} className="text-[#FF9500]" strokeWidth={1.5} /></div>
                <p className="text-sm text-[#C9B99A] leading-relaxed mb-4">{service.shortDescription}</p>
                <p className="text-lg text-[#FF9500] font-medium mb-4">{service.priceDisplay}</p>
                <Link to={`/services/${service.slug}`} className="inline-flex items-center gap-1 text-xs text-[#FF9500] uppercase tracking-[0.04em] cursor-pointer hover:underline transition-all">
                  Learn More <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  )
}
