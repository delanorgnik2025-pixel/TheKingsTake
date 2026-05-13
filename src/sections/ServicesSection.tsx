import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { Link } from 'react-router'
import { trpc } from '@/providers/trpc'
import { PenTool, Globe, Gavel, BookOpen, Megaphone, Code, Crown, ArrowRight, FileText } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'
import { useMemo } from 'react'

const iconMap: Record<string, React.ElementType> = {
  PenTool, Globe, Gavel, BookOpen, Megaphone, Code, Crown,
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
}

// CHATGPT-UPDATED PRICING — Strategic boutique agency pricing
const FALLBACK_SERVICES = [
  {
    id: 1, name: "Speechwriting & Narrative Development", slug: "speechwriting-narrative",
    shortDescription: "Speeches, scripts, and narrative content that moves audiences to action. From community commentary to documentary narration.",
    fullDescription: "Professional speechwriting and narrative development for leaders, advocates, and creators who need words that command attention and inspire action.",
    price: 150, priceDisplay: "From $150", duration: "Per project",
    type: "one_time" as const, icon: "PenTool",
    features: JSON.stringify(["Basic speeches & narratives ($150+)", "Podcast & YouTube scripts ($200+)", "Political/community commentary ($350+)", "Documentary narration ($500+)", "Premium speech packages ($1,000+)"]),
    order: 1, isActive: true,
  },
  {
    id: 2, name: "Website Development & Digital Presence", slug: "website-development",
    shortDescription: "High-converting websites, digital branding, and online presence that commands attention. From starter sites to premium platforms.",
    fullDescription: "Full website development and digital branding — from landing pages to multi-platform ecosystems with AI integrations.",
    price: 300, priceDisplay: "From $300", duration: "Per project",
    type: "one_time" as const, icon: "Globe",
    features: JSON.stringify(["Starter presence website ($300-$600)", "Professional brand website ($800-$1,500)", "Premium platform builds ($2,000+)", "Domain & hosting setup ($100+)", "Maintenance plans ($50-$150/mo)"]),
    order: 2, isActive: true,
  },
  {
    id: 3, name: "Book & Publishing Support", slug: "book-publishing",
    shortDescription: "From manuscript to published author. Launch consultations, publishing guidance, formatting, and distribution strategy.",
    fullDescription: "Complete book publishing support — from manuscript development to launch strategy and distribution.",
    price: 499, priceDisplay: "From $499", duration: "Full package",
    type: "package" as const, icon: "BookOpen",
    features: JSON.stringify(["Author launch consultation ($499)", "Publishing support package ($750)", "Premium author development ($1,500+)", "Manuscript editing & formatting", "Launch strategy & distribution"]),
    order: 3, isActive: true,
  },
  {
    id: 4, name: "Legal Document Support", slug: "legal-document-support",
    shortDescription: "Educational document formatting and organizational support for pro se litigants. Informational purposes only — not legal advice.",
    fullDescription: "Legal document formatting, proofreading, and organizational support. Educational assistance only — not legal representation.",
    price: 150, priceDisplay: "From $150", duration: "Per document",
    type: "one_time" as const, icon: "Gavel",
    features: JSON.stringify(["Formatting & proofreading ($150+)", "Filing organization packages ($350+)", "Advanced procedural assistance (custom)", "Document literacy support", "Educational guidance only"]),
    order: 4, isActive: true,
  },
  {
    id: 5, name: "Consulting & Strategy", slug: "consulting-strategy",
    shortDescription: "1-on-1 strategy sessions for content, branding, advocacy, legal literacy, and platform growth. $150/hour.",
    fullDescription: "Strategic consulting for content creators, advocates, community builders, and entrepreneurs.",
    price: 150, priceDisplay: "$150/hour", duration: "Per hour",
    type: "one_time" as const, icon: "Megaphone",
    features: JSON.stringify(["Strategy sessions ($150/hr)", "Narrative strategy packages ($500+)", "Brand & platform development", "Advocacy planning", "Ongoing retainer options"]),
    order: 5, isActive: true,
  },
  {
    id: 6, name: "AI-Assisted Creative Services", slug: "ai-assisted-creative",
    shortDescription: "Human storytelling enhanced by modern AI tools. Research, drafting, optimization, and content strategy.",
    fullDescription: "AI-enhanced content creation that combines human storytelling craft with cutting-edge technology.",
    price: 75, priceDisplay: "From $75", duration: "Per project",
    type: "one_time" as const, icon: "Code",
    features: JSON.stringify(["AI-assisted content ($75+)", "AI + human enhanced packages ($250+)", "Research & optimization", "Draft generation & editing", "Content strategy integration"]),
    order: 6, isActive: true,
  },
];

export default function ServicesSection() {
  const { data: apiServices } = trpc.service.list.useQuery();
  const services = useMemo(() => (apiServices && apiServices.length > 0 ? apiServices : FALLBACK_SERVICES), [apiServices]);

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
            Boutique creative media services. From narrative development to digital presence, every project is built with precision, power, and purpose.
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
