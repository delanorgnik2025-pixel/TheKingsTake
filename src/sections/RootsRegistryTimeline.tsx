import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Sprout, Users, GitBranch, Feather } from 'lucide-react'

const STEPS = [
  {
    id: 1,
    label: 'Start Your Tree',
    description: 'Plant your name as the first root in your family\'s living legacy.',
    icon: Sprout,
  },
  {
    id: 2,
    label: 'Add Ancestors',
    description: 'Honor parents, grandparents, and beyond — one branch at a time.',
    icon: Users,
  },
  {
    id: 3,
    label: 'Connect Generations',
    description: 'Watch your constellation illuminate as each generation finds its place.',
    icon: GitBranch,
  },
  {
    id: 4,
    label: 'Leave a Legacy',
    description: 'Preserve stories, records, and memories for the generations to come.',
    icon: Feather,
  },
]

function StepCard({ step, index }: { step: typeof STEPS[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const Icon = step.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.55, delay: index * 0.12, ease: 'easeOut' }}
      className="group flex items-start gap-5"
    >
      {/* Icon */}
      <div className="shrink-0 w-12 h-12 rounded-xl bg-[rgba(255,149,0,0.08)] border border-[rgba(255,149,0,0.18)] flex items-center justify-center group-hover:bg-[rgba(255,149,0,0.14)] group-hover:border-[rgba(255,149,0,0.3)] transition-all duration-300">
        <Icon size={20} className="text-[#FF9500]" />
      </div>

      {/* Text */}
      <div className="pt-1">
        <h3 className="text-base font-medium text-[#F0EBE1] mb-1.5 tracking-wide">
          {step.label}
        </h3>
        <p className="text-sm text-[#C9B99A]/60 leading-relaxed max-w-sm">
          {step.description}
        </p>
      </div>
    </motion.div>
  )
}

export default function RootsRegistryTimeline() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#0A0F1A]"
    >
      {/* Top gradient — seamless blend from hero */}
      <div
        className="absolute inset-x-0 top-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(5,8,14,0.6) 0%, transparent 100%)' }}
      />

      {/* Content */}
      <div className="relative z-10 px-8 md:px-14 lg:px-20 py-28 lg:py-36">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 lg:gap-24">

          {/* Left — Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#FF9500] mb-5">
              How It Works
            </p>
            <h2
              className="text-3xl sm:text-4xl lg:text-[48px] text-[#F0EBE1] tracking-[-0.01em] leading-[1.1] mb-5"
              style={{ fontFamily: "'Playfair Display', 'Georgia', 'Times New Roman', serif" }}
            >
              Four Steps to<br />Your Legacy
            </h2>
            <p className="text-sm text-[#C9B99A]/55 leading-relaxed max-w-sm">
              Building your family tree is a sacred journey. Each step brings you closer to the ancestors who came before.
            </p>
          </motion.div>

          {/* Right — Step Cards */}
          <div className="space-y-10">
            {STEPS.map((step, i) => (
              <StepCard key={step.id} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
