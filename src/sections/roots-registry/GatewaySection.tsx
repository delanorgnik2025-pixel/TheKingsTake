import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Sprout, User, Users, FileText, Search, TreePine, ArrowRight } from 'lucide-react'

const GATEWAYS = [
  {
    id: 1,
    title: 'Begin Your Legacy',
    description: 'Open the first gate and begin your record.',
    icon: Sprout,
    route: '/roots-registry/begin',
  },
  {
    id: 2,
    title: 'Record Yourself',
    description: 'Place your name at the root of the tree.',
    icon: User,
    route: '/roots-registry/profile',
  },
  {
    id: 3,
    title: 'Build Your Lineage',
    description: 'Connect the branches that came before you.',
    icon: Users,
    route: '/roots-registry/lineage',
  },
  {
    id: 4,
    title: 'Preserve Your Heritage',
    description: 'Guard the records, stories, and memories.',
    icon: FileText,
    route: '/roots-registry/heritage',
  },
  {
    id: 5,
    title: 'Discover Connections',
    description: 'Follow the hidden lines between generations.',
    icon: Search,
    route: '/roots-registry/discover',
  },
  {
    id: 6,
    title: 'Enter the Ancestral Realm',
    description: 'The living realm opens when the roots are ready.',
    icon: TreePine,
    route: '/realm',
  },
]

function GatewayCard({ gateway, index }: { gateway: typeof GATEWAYS[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const Icon = gateway.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: 'easeOut' }}
      className="group"
    >
      {/* Stone Arch Card */}
      <div className="relative bg-[rgba(10,15,26,0.65)] backdrop-blur-sm border border-[rgba(255,149,0,0.1)] h-full flex flex-col items-center text-center px-5 pt-8 pb-6 transition-all duration-500 hover:border-[rgba(255,149,0,0.35)] hover:bg-[rgba(10,15,26,0.8)]"
        style={{
          borderRadius: '50% 50% 12px 12px / 24px 24px 12px 12px',
          boxShadow: 'inset 0 1px 0 rgba(255,149,0,0.05)',
        }}
      >
        {/* Number badge */}
        <span className="text-[10px] font-medium text-[#FF9500]/60 mb-3">
          {String(gateway.id).padStart(2, '0')}
        </span>

        {/* Icon */}
        <div className="w-12 h-12 rounded-full bg-[rgba(255,149,0,0.06)] border border-[rgba(255,149,0,0.15)] flex items-center justify-center mb-4 group-hover:bg-[rgba(255,149,0,0.12)] group-hover:border-[rgba(255,149,0,0.3)] transition-all duration-500">
          <Icon size={22} className="text-[#FF9500]" />
        </div>

        {/* Title */}
        <h3 className="text-xs uppercase tracking-[0.12em] text-[#F0EBE1] font-medium mb-2.5 leading-tight">
          {gateway.title}
        </h3>

        {/* Description */}
        <p className="text-[11px] text-[#C9B99A]/45 leading-relaxed mb-5 flex-1 max-w-[200px]">
          {gateway.description}
        </p>

        {/* CTA */}
        <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.1em] text-[#FF9500]/70 group-hover:text-[#FF9500] transition-colors">
          Enter Gateway
          <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>

      {/* Ambient glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          borderRadius: '50% 50% 12px 12px / 24px 24px 12px 12px',
          boxShadow: '0 8px 40px rgba(255,149,0,0.08), inset 0 1px 0 rgba(255,149,0,0.06)',
        }}
      />
    </motion.div>
  )
}

export default function GatewaySection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' })

  return (
    <section ref={sectionRef} className="relative w-full bg-[#05080e] py-14 lg:py-20">
      {/* Ambient stone texture overlay — subtle */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(ellipse at 30% 20%, rgba(255,149,0,0.3) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(255,149,0,0.15) 0%, transparent 40%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 px-5 sm:px-8 lg:px-16 max-w-[1400px] mx-auto">

        {/* Section label — decorative lines on mobile per blueprint */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-4 mb-10 lg:mb-12"
        >
          <div className="h-px flex-1 max-w-[60px] bg-[rgba(255,149,0,0.15)]" />
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#FF9500] whitespace-nowrap">
            The Six Gateways
          </p>
          <div className="h-px flex-1 max-w-[60px] bg-[rgba(255,149,0,0.15)]" />
        </motion.div>

        {/* Gateway grid — 1 col mobile, 2 col tablet, 3 col small desktop, 6 col large desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5 lg:gap-4">
          {GATEWAYS.map((gateway, i) => (
            <GatewayCard key={gateway.id} gateway={gateway} index={i} />
          ))}
        </div>

        {/* Mobile bottom quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="lg:hidden mt-10 flex flex-col items-center text-center"
        >
          <svg width="28" height="32" viewBox="0 0 40 48" fill="none" className="text-[#FF9500] mb-3">
            <path d="M20 4C20 4 8 16 8 26C8 32.6 13.4 38 20 38C26.6 38 32 32.6 32 26C32 16 20 4 20 4Z" stroke="currentColor" strokeWidth="1.5" fill="rgba(255,149,0,0.08)" />
            <circle cx="20" cy="26" r="3" fill="currentColor" opacity="0.6" />
            <path d="M20 38V46M14 42H26" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <p className="text-[10px] text-[#C9B99A]/40 tracking-wide">
            The ancestors are waiting.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
