import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface HudPanelProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'top' | 'bottom' | 'left' | 'right'
  showDots?: boolean
}

export default function HudPanel({
  children,
  className = '',
  delay = 0,
  direction = 'top',
  showDots = true,
}: HudPanelProps) {
  const initialOffset = {
    top: { y: -20, x: 0 },
    bottom: { y: 20, x: 0 },
    left: { y: 0, x: -20 },
    right: { y: 0, x: 20 },
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...initialOffset[direction] }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`bg-[rgba(42,58,74,0.7)] backdrop-blur-lg rounded border border-[rgba(255,149,0,0.2)] p-5 ${className}`}
      style={{ boxShadow: '0 2px 12px rgba(255,149,0,0.08)' }}
    >
      {showDots && (
        <div className="flex gap-1 mb-3">
          {[0, 1, 2].map(i => (
            <div key={i} className="w-[3px] h-[3px] rounded-full bg-[#FFB840]" />
          ))}
        </div>
      )}
      {children}
    </motion.div>
  )
}
