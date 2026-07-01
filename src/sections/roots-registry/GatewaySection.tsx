import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Sprout, User, Users, FileText, Search, TreePine, ArrowRight } from 'lucide-react'

const GATEWAYS = [
  {
    id: 1,
    title: 'Begin Your Legacy',
    description: 'Create your registry and establish the foundation of your family tree.',
    icon: Sprout,
    route: '/roots-registry/begin',
  },
  {
    id: 2,
    title: 'Record Yourself',
    description: 'Add your name, birth details, and your place in the story.',
    icon: User,
    route: '/roots-registry/profile',
  },
  {
    id: 3,
    title: 'Build Your Lineage',
    description: 'Add parents, grandparents, and ancestors. Grow your family tree.',
    icon: Users,
    route: '/roots-registry/lineage',
  },
  {
    id: 4,
    title: 'Preserve Your Heritage',
    description: 'Upload documents, photos, records, and stories for future generations.',
    icon: FileText,
    route: '/roots-registry/heritage',
  },
  {
    id: 5,
    title: 'Discover Connections',
    description: 'AI-powered research finds records, DNA matches, and historic connections.',
    icon: Search,
    route: '/roots-registry/discover',
  },
  {
    id: 6,
    title: 'Enter the Ancestral Realm',
    description: 'Step into the living world of your ancestors. Experience your legacy.',
    icon: TreePine,
    route: '/realm',
  },
]

function GatewayCard({ gateway, index }: { gateway: typeof GATEWAYS[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const Icon = gateway.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      className="group relative"
    >
      <div className="relative bg-[rgba(10,15,26,0.7)] backdrop-blur-sm border border-[rgba(255,149,0,0.12)] rounded-xl p-5 h-full flex flex-col items-center text-center transition-all duration-500 hover:border-[rgba(255,149,0,0.4)] hover:bg-[rgba(10,15,26,0.85)] hover:-translate-y-2 hover:shadow-[0_8px_40px_rgba(255,149,0,0.12)]">

        {/* Number badge */}
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-medium text-[#FF9500] bg-[rgba(5,8,14,0.9)] border border-[rgba(255,149,0,0.2)] rounded-full w-6 h-6 flex items-center justify-center">
          {String(gateway.id).padStart(2, '0')}
        </span>

        {/* Icon */}
        <div className="w-14 h-14 rounded-full bg-[rgba(255,149,0,0.06)] border border-[rgba(255,149,0,0.15)] flex items-center justify-center mb-4 mt-2 group-hover:bg-[rgba(255,149,0,0.12)] group-hover:border-[rgba(255,149,0,0.3)] transition-all duration-500">
          <Icon size={22} className="text-[#FF9500]" />
        </div>

        {/* Title */}
        <h3 className="text-xs uppercase tracking-[0.12em] text-[#F0EBE1] font-medium mb-2 leading-tight">
          {gateway.title}
        </h3>

        {/* Description */}
        <p className="text-[11px] text-[#C9B99A]/50 leading-relaxed mb-5 flex-1">
          {gateway.description}
        </p>

        {/* CTA */}
        <button className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.1em] text-[#FF9500] border border-[rgba(255,149,0,0.25)] rounded-md px-4 py-2 hover:bg-[rgba(255,149,0,0.12)] hover:border-[rgba(255,149,0,0.45)] transition-all duration-300">
          Enter Gateway
          <ArrowRight size={10} />
        </button>
      </div>

      {/* Ambient glow on hover */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: '0 0 30px rgba(255,149,0,0.06), inset 0 0 30px rgba(255,149,0,0.03)' }}
      />
    </motion.div>
  )
}

export default function GatewaySection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section ref={sectionRef} className="relative w-full bg-[#05080e] py-16 lg:py-24">
      {/* Subtle top gradient blending from hero */}
      <div
        className="absolute inset-x-0 top-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(5,8,14,0.8) 0%, transparent 100%)' }}
      />

      {/* Center tree icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.6 }}
        className="flex justify-center mb-8"
      >
        <div className="w-12 h-12 rounded-full bg-[rgba(255,149,0,0.08)] border border-[rgba(255,149,0,0.2)] flex items-center justify-center">
          <TreePine size={20} className="text-[#FF9500]" />
        </div>
      </motion.div>

      {/* Section label */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-[10px] uppercase tracking-[0.25em] text-[#FF9500] text-center mb-12"
      >
        The Six Gateways
      </motion.p>

      {/* Gateway grid */}
      <div className="px-6 md:px-12 lg:px-16 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-5">
          {GATEWAYS.map((gateway, i) => (
            <GatewayCard key={gateway.id} gateway={gateway} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
