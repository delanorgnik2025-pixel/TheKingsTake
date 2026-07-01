import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Shield, Compass, Globe, Map, Feather, Clock, ArrowRight } from 'lucide-react'

const FEATURES = [
  {
    id: 1,
    title: 'Sacred & Secure',
    description: 'Your legacy is protected for you and future generations.',
    icon: Shield,
    route: '/registry/security',
  },
  {
    id: 2,
    title: 'Heritage Guidance',
    description: 'Navigate your lineage with intuitive tools and sacred guidance.',
    icon: Compass,
    route: '/registry/ai',
  },
  {
    id: 3,
    title: 'Record Access',
    description: 'Access historical records from around the world in one place.',
    icon: Globe,
    route: '/registry/records',
  },
  {
    id: 4,
    title: 'Lineage Mapping',
    description: 'Visualize your family tree across time and generations.',
    icon: Map,
    route: '/registry/dna',
  },
  {
    id: 5,
    title: 'Story Preservation',
    description: 'Preserve stories, photos, audio, and wisdom for those who come after.',
    icon: Feather,
    route: '/registry/stories',
  },
  {
    id: 6,
    title: 'Legacy Vault',
    description: 'Build a lasting legacy that will never be lost to time.',
    icon: Clock,
    route: '/registry/legacy',
  },
]

function FeatureCard({ feature, index }: { feature: typeof FEATURES[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-30px' })
  const Icon = feature.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: 'easeOut' }}
      className="group flex items-start gap-4"
    >
      {/* Icon */}
      <div className="shrink-0 w-11 h-11 rounded-lg bg-[rgba(255,149,0,0.05)] border border-[rgba(255,149,0,0.1)] flex items-center justify-center group-hover:bg-[rgba(255,149,0,0.1)] group-hover:border-[rgba(255,149,0,0.22)] transition-all duration-300">
        <Icon size={18} className="text-[#FF9500]" />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <h3 className="text-[13px] uppercase tracking-[0.08em] text-[#F0EBE1] font-medium mb-1">
          {feature.title}
        </h3>
        <p className="text-[12px] text-[#C9B99A]/45 leading-relaxed mb-1.5">
          {feature.description}
        </p>
        <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.1em] text-[#FF9500]/60 group-hover:text-[#FF9500] transition-colors cursor-pointer">
          Learn More
          <ArrowRight size={9} className="group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>
    </motion.div>
  )
}

export default function FeaturesSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' })

  return (
    <section ref={sectionRef} className="relative w-full bg-[#05080e] overflow-hidden">
      {/* Ambient glow — visual continuity */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 80% 30%, rgba(255,149,0,0.04) 0%, transparent 50%)',
        }}
      />

      {/* Top subtle divider */}
      <div className="absolute inset-x-0 top-0 h-px bg-[rgba(255,149,0,0.06)]" />

      <div className="relative z-10 px-5 sm:px-8 lg:px-16 py-14 lg:py-20 max-w-[1400px] mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 lg:mb-12"
        >
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#FF9500] mb-2">
            Unique by Design
          </p>
          <h2
            className="text-xl sm:text-2xl lg:text-3xl text-[#F0EBE1] tracking-wide"
            style={{ fontFamily: "'Playfair Display', 'Georgia', 'Times New Roman', serif" }}
          >
            Built For Generations
          </h2>
        </motion.div>

        {/* Feature grid — 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-7">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.id} feature={feature} index={i} />
          ))}
        </div>
      </div>

      {/* Footer Quote */}
      <div className="relative z-10 border-t border-[rgba(255,149,0,0.06)]">
        <div className="px-5 sm:px-8 lg:px-16 py-10 max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4"
          >
            {/* Small tree image */}
            <div className="w-16 h-16 rounded-lg overflow-hidden border border-[rgba(255,149,0,0.15)] shrink-0">
              <img
                src="/images/roots-registry-bg.jpg"
                alt=""
                className="w-full h-full object-cover object-center"
              />
            </div>
            <h3
              className="text-sm lg:text-base text-[#F0EBE1] tracking-wide leading-relaxed"
              style={{ fontFamily: "'Playfair Display', 'Georgia', 'Times New Roman', serif" }}
            >
              Your Story.<br className="sm:hidden" /> Your Roots.<br className="sm:hidden" /> Your Kingdom.
            </h3>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] text-[#FF9500] border border-[rgba(255,149,0,0.25)] rounded-md px-5 py-2.5 hover:bg-[rgba(255,149,0,0.1)] hover:border-[rgba(255,149,0,0.4)] transition-all duration-300 cursor-pointer shrink-0"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#FF9500]">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            My Registry Login
          </motion.button>
        </div>
      </div>
    </section>
  )
}
