import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface CTAButtonProps {
  children: ReactNode
  onClick?: () => void
  href?: string
  className?: string
  size?: 'default' | 'large'
}

export default function CTAButton({
  children,
  onClick,
  href,
  className = '',
  size = 'default',
}: CTAButtonProps) {
  const baseClasses = `inline-flex items-center justify-center rounded-full font-['Newsreader'] text-sm tracking-[0.02em] transition-colors duration-300 ${
    size === 'large' ? 'h-14 px-12 text-base' : 'h-12 px-8'
  } bg-[#FF9500] text-[#1B2838] hover:bg-[#CC6A00] ${className}`

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className={baseClasses}
        style={{ boxShadow: '0 4px 16px rgba(255,149,0,0.25)' }}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={baseClasses}
      style={{ boxShadow: '0 4px 16px rgba(255,149,0,0.25)' }}
    >
      {children}
    </motion.button>
  )
}
