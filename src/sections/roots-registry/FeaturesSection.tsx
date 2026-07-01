import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Shield, Brain, Globe, Dna, BookOpen, Heart, ArrowRight } from 'lucide-react'

const FEATURES = [
  {
    id: 1,
    title: 'Sacred & Secure',
    description: 'Your data is encrypted and protected for generations.',
    icon: Shield,
    route: '/registry/security',
  },
  {
    id: 2,
    title: 'AI Heritage Assistant',
    description: 'Advanced AI helps you find records and uncover hidden connections.',
    icon: Brain,
    route: '/registry/ai',
  },
  {
    id: 3,
    title: 'Global Record Access',
    description: 'Search billions of historical records from around the world.',
    icon: Globe,
    route: '/registry/records',
  },
  {
    id: 4,
    title: 'DNA Integration',
    description: '(Coming Soon) Connect DNA matches to your family tree.',
    icon: Dna,
    route: '/registry/dna',
  },
  {
    id: 5,
    title: 'Storytelling Engine',
    description: 'Preserve stories, audio, videos, and oral histories in one place.',
    icon: BookOpen,
    route: '/registry/stories',
  },
  {
    id: 6,
    title: 'Legacy For Future',
    description: 'Your legacy will live on forever for your children and beyond.',
    icon: Heart,
    route: '/registry/legacy',
  },
]

function FeatureCard({ feature, index }: { feature: typeof FEATURES[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const Icon = feature.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      className="group flex items-start gap-4"
    >
      {/* Icon */}
      <div className="shrink-0 w-10 h-10 rounded-lg bg-[rgba(255,149,0,0.06)] border border-[rgba(255,149,0,0.12)] flex items-center justify-center group-hover:bg-[rgba(255,149,0,0.12)] group-hover:border-[rgba(255,149,0,0.25)] transition-all duration-300">
        <Icon size={18} className="text-[#FF9500]" />
      </div>

      {/* Text */}
      <div>
        <h3 className="text-xs uppercase tracking-[0.1em] text-[#F0EBE1] font-medium mb-1.5">
          {feature.title}
        </h3>
        <p className="text-[11px] text-[#C9B99A]/50 leading-relaxed mb-2 max-w-[200px]">
          {feature.description}
        </p>
        <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.1em] text-[#FF9500]/70 group-hover:text-[#FF9500] transition-colors cursor-pointer">
          Learn More
          <ArrowRight size={9} className="group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>
    </motion.div>
  )
}

export default function FeaturesSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' })

  return (
    <section ref={sectionRef} className="relative w-full bg-[#0A0F1A] py-16 lg:py-20">
      {/* Top border line */}
      <div className="absolute inset-x-0 top-0 h-px bg-[rgba(255,149,0,0.08)]" />

      <div className="px-6 md:px-12 lg:px-16 max-w-[1400px] mx-auto">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.5 }}
          className="text-[10px] uppercase tracking-[0.25em] text-[#FF9500] text-center mb-10"
        >
          What Makes Our Registry Unique
        </motion.p>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.id} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
