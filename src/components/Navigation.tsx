import { useState } from 'react'
import { Link } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, LayoutDashboard } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

interface NavigationProps {
  onMenuToggle: () => void
  onNavClick: (id: string) => void
}

export default function Navigation({ onMenuToggle, onNavClick }: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, isAdmin } = useAuth()

  const handleNav = (id: string) => {
    onNavClick(id)
    setMobileOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] h-16 flex items-center justify-between px-6 md:px-12" style={{ background: 'rgba(27,40,56,0.85)', backdropFilter: 'blur(12px)' }}>
      <div className="flex items-center gap-3">
        <div className="hidden md:flex gap-1">
          {[0, 1, 2, 3].map(i => <div key={i} className="w-[2px] h-[2px] rounded-full bg-[#C9B99A]" />)}
        </div>
        <Link to="/" className="text-[#F0EBE1] text-sm uppercase tracking-[0.08em] hover:text-[#FF9500] transition-colors duration-300">#TheKingsTake</Link>
      </div>

      <div className="hidden md:flex items-center gap-8">
        <Link to="/blog" className="text-[#C9B99A] text-sm hover:text-[#F0EBE1] transition-colors duration-200">Blog</Link>
        <Link to="/legal" className="text-[#C9B99A] text-sm hover:text-[#F0EBE1] transition-colors duration-200">Legal Hub</Link>
        <button onClick={() => handleNav('services')} className="text-[#C9B99A] text-sm hover:text-[#F0EBE1] transition-colors duration-200 cursor-pointer">Services</button>
        <button onClick={() => handleNav('contact')} className="text-[#C9B99A] text-sm hover:text-[#F0EBE1] transition-colors duration-200 cursor-pointer">Contact</button>
        {isAdmin && (
          <Link to="/admin" className="flex items-center gap-1 text-[#FF9500] text-sm hover:text-[#FFB840] transition-colors">
            <LayoutDashboard size={14} /> Admin
          </Link>
        )}
        <button onClick={onMenuToggle} className="text-[#F0EBE1] text-sm uppercase tracking-[0.04em] hover:text-[#FF9500] transition-colors duration-200 cursor-pointer">MENU</button>
      </div>

      <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-[#F0EBE1] cursor-pointer">
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 left-0 right-0 bg-[#1B2838]/95 backdrop-blur-xl p-6 md:hidden" style={{ borderTop: '1px solid rgba(255,149,0,0.15)' }}>
            <Link to="/blog" onClick={() => setMobileOpen(false)} className="block text-[#F0EBE1] text-xl py-3 border-b border-[rgba(240,235,225,0.08)] hover:text-[#FF9500]">Blog</Link>
            <Link to="/legal" onClick={() => setMobileOpen(false)} className="block text-[#F0EBE1] text-xl py-3 border-b border-[rgba(240,235,225,0.08)] hover:text-[#FF9500]">Legal Hub</Link>
            <button onClick={() => handleNav('services')} className="block w-full text-left text-[#F0EBE1] text-xl py-3 border-b border-[rgba(240,235,225,0.08)] hover:text-[#FF9500]">Services</button>
            <button onClick={() => handleNav('contact')} className="block w-full text-left text-[#F0EBE1] text-xl py-3 border-b border-[rgba(240,235,225,0.08)] hover:text-[#FF9500]">Contact</button>
            {isAdmin && (
              <Link to="/admin" onClick={() => setMobileOpen(false)} className="block text-[#FF9500] text-xl py-3 hover:text-[#FFB840]">Admin Dashboard</Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
