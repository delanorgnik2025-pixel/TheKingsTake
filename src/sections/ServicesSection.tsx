import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { Link } from 'react-router'
import { trpc } from '@/providers/trpc'
import { Monitor, PenTool, Eye, Edit3, Feather, FileText, ScrollText, Share2, ArrowRight, BookOpen, Globe, Gavel, Megaphone, Code } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'
import { useMemo } from 'react'

const iconMap: Record<string, React.ElementType> = {
  Mic: PenTool, Monitor, PenTool, Eye, Edit3, Feather, FileText, ScrollText, Share2,
  Zap: Monitor, Crown: ScrollText,
  BookOpen, Globe, Gavel, Megaphone, Code,
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
}

// Static fallback services — render immediately even if database is empty
const FALLBACK_SERVICES = [
  {
    id: 1, name: "Writing & Ghostwriting", slug: "writing-ghostwriting",
    shortDescription: "Books, articles, speeches, and social media content that moves people. I write your vision with precision and power.",
    fullDescription: "From book manuscripts to social media content, I craft words that move people to action. Ghostwriting services available.",
    price: 75, priceDisplay: "From $75", duration: "Per project",
    type: "one_time" as const, icon: "PenTool",
    features: JSON.stringify(["Books & manuscripts", "Articles & op-eds", "Speeches", "Social media content", "Ghostwriting"]),
    order: 1, isActive: true,
  },
  {
    id: 2, name: "Website Copy & Design", slug: "website-copy-design",
    shortDescription: "High-converting website copy and full web design consultation. Your online presence should command attention.",
    fullDescription: "Website copy that converts visitors into believers. Full design consultation included.",
    price: 150, priceDisplay: "From $150", duration: "Per project",
    type: "one_time" as const, icon: "Globe",
    features: JSON.stringify(["Homepage copy", "About page", "Service descriptions", "Sales pages", "Full design consult"]),
    order: 2, isActive: true,
  },
  {
    id: 3, name: "Legal Document Support", slug: "legal-document-support",
    shortDescription: "Proofreading, formatting, and strategic guidance for pro se litigants. Informational support only — not legal advice.",
    fullDescription: "Legal document formatting, proofreading, and strategic guidance for pro se litigants.",
    price: 100, priceDisplay: "From $100", duration: "Per document",
    type: "one_time" as const, icon: "Gavel",
    features: JSON.stringify(["Document formatting", "Proofreading", "Strategic guidance", "Motion templates", "Informational only"]),
    order: 3, isActive: true,
  },
  {
    id: 4, name: "Book & Publishing Support", slug: "book-publishing",
    shortDescription: "From manuscript to published author. Cover guidance, formatting, launch strategy, and distribution advice.",
    fullDescription: "Complete book publishing support — from manuscript editing to launch strategy.",
    price: 299, priceDisplay: "From $299", duration: "Full package",
    type: "package" as const, icon: "BookOpen",
    features: JSON.stringify(["Manuscript editing", "Cover guidance", "Formatting", "Launch strategy", "Distribution advice"]),
    order: 4, isActive: true,
  },
  {
    id: 5, name: "Consulting & Strategy", slug: "consulting-strategy",
    shortDescription: "1-on-1 sessions for content strategy, brand building, legal literacy advocacy, and platform growth.",
    fullDescription: "Strategic consulting for content creators, advocates, and community builders.",
    price: 75, priceDisplay: "$75/hour", duration: "Per hour",
    type: "one_time" as const, icon: "Megaphone",
    features: JSON.stringify(["Content strategy", "Brand building", "Platform growth", "Advocacy planning", "1-on-1 sessions"]),
    order: 5, isActive: true,
  },
  {
    id: 6, name: "AI-Assisted Content", slug: "ai-assisted-content",
    shortDescription: "Leverage AI tools for research, drafting, and content optimization. Stay ahead with cutting-edge content strategy.",
    fullDescription: "AI-powered content creation, research, and optimization for maximum impact.",
    price: 50, priceDisplay: "From $50", duration: "Per project",
    type: "one_time" as const, icon: "Code",
    features: JSON.stringify(["AI research", "Content optimization", "Draft generation", "SEO enhancement", "Strategy integration"]),
    order: 6, isActive: true,
  },
];

export default function ServicesSection() {
  const { data: apiServices } = trpc.service.list.useQuery();
  // Use API data if available, otherwise show static fallback content
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
