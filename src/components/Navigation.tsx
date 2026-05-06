import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

interface NavigationProps {
  onMenuToggle: () => void
  onNavClick: (id: string) => void
}

const navLinks = [
  { label: 'About', id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Legal Hub', id: 'legal-hub' },
  { label: 'Blog', id: 'blog' },
  { label: 'Contact', id: 'contact' },
]

export default function Navigation({ onMenuToggle, onNavClick }: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleNav = (id: string) => {
    onNavClick(id)
    setMobileOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] h-16 flex items-center justify-between px-6 md:px-12"
      style={{ background: 'rgba(27,40,56,0.85)', backdropFilter: 'blur(12px)' }}>
      {/* Left: decorative dots + brand */}
      <div className="flex items-center gap-3">
        <div className="hidden md:flex gap-1">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className="w-[2px] h-[2px] rounded-full bg-[#C9B99A]" />
          ))}
        </div>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-[#F0EBE1] text-sm uppercase tracking-[0.08em] hover:text-[#FF9500] transition-colors duration-300 cursor-pointer"
        >
          #TheKingsTake
        </button>
      </div>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map(link => (
          <button
            key={link.id}
            onClick={() => handleNav(link.id)}
            className="text-[#C9B99A] text-sm hover:text-[#F0EBE1] transition-colors duration-200 cursor-pointer"
          >
            {link.label}
          </button>
        ))}
        <button
          onClick={onMenuToggle}
          className="text-[#F0EBE1] text-sm uppercase tracking-[0.04em] hover:text-[#FF9500] transition-colors duration-200 cursor-pointer"
        >
          MENU
        </button>
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden text-[#F0EBE1] cursor-pointer"
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 left-0 right-0 bg-[#1B2838]/95 backdrop-blur-xl p-6 md:hidden"
            style={{ borderTop: '1px solid rgba(255,149,0,0.15)' }}
          >
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className="block w-full text-left text-[#F0EBE1] text-xl py-3 border-b border-[rgba(240,235,225,0.08)] hover:text-[#FF9500] transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => { setMobileOpen(false); onMenuToggle() }}
              className="block w-full text-left text-[#FF9500] text-xl py-3 hover:text-[#FFB840] transition-colors cursor-pointer"
            >
              MENU
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
