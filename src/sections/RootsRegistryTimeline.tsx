import { motion } from 'framer-motion'
import { User, Lock, GitBranch, Feather } from 'lucide-react'

const STEPS = [
  {
    id: 1,
    label: 'Start Your Tree',
    desc: 'Add yourself as the beginning of your legacy.',
    icon: User,
    unlocked: true,
  },
  {
    id: 2,
    label: 'Add Ancestors',
    desc: 'Build upward. Add parents, grandparents, and beyond.',
    icon: Lock,
    unlocked: false,
  },
  {
    id: 3,
    label: 'Connect Generations',
    desc: 'Link family branches and preserve your heritage.',
    icon: Lock,
    unlocked: false,
  },
  {
    id: 4,
    label: 'Leave a Legacy',
    desc: 'Document stories, records, and memories for future generations.',
    icon: Lock,
    unlocked: false,
  },
]

export default function RootsRegistryTimeline() {
  return (
    <section className="relative w-full bg-[#0A0F1A] overflow-hidden">
      {/* Subtle top gradient blending into hero */}
      <div
        className="absolute inset-x-0 top-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(5,8,14,0.8) 0%, transparent 100%)' }}
      />

      {/* Content */}
      <div className="relative z-10 px-[8%] py-24 md:py-32">
        <div className="max-w-[620px]">
          {/* Section label */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[11px] uppercase tracking-[0.2em] text-[#FF9500] mb-12"
          >
            How It Works
          </motion.p>

          {/* Timeline steps */}
          <div className="space-y-10">
            {STEPS.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="flex items-start gap-4"
                >
                  {/* Icon */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      step.unlocked
                        ? 'bg-[rgba(255,149,0,0.12)] border border-[rgba(255,149,0,0.25)]'
                        : 'bg-[rgba(201,185,154,0.06)] border border-[rgba(201,185,154,0.12)]'
                    }`}
                  >
                    <Icon size={16} className={step.unlocked ? 'text-[#FF9500]' : 'text-[#C9B99A]/40'} />
                  </div>

                  {/* Text */}
                  <div>
                    <p className="text-[15px] text-[#F0EBE1] font-medium leading-tight mb-1">
                      {step.label}
                    </p>
                    <p className="text-[13px] text-[#C9B99A]/55 leading-relaxed max-w-sm">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
