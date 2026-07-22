import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, LayoutDashboard, LogIn, ChevronDown, TreePine, Shield, User, Microscope } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

interface NavigationProps {
  onMenuToggle: () => void
  onNavClick: (id: string) => void
}

export default function Navigation({ onMenuToggle, onNavClick }: NavigationProps) {
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [writingDropdownOpen, setWritingDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { user, isAdmin } = useAuth()

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setWritingDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleNav = (id: string) => {
    onNavClick(id)
    setMobileOpen(false)
  }

  const writingDropdownItems = [
    { label: 'Writing Services', href: '/writing-services', desc: 'All writing offerings' },
    { label: 'Speechwriting', href: '/services/speechwriting-narrative', desc: 'Speeches & narratives' },
    { label: 'Book & Publishing', href: '/services/book-publishing', desc: 'Manuscript to published' },
    { label: 'Legacy Interview', href: '/services/legacy-interview', desc: 'Preserve your story' },
    { label: 'Ghostwriting', href: '/services/ghostwriting', desc: 'Your voice, my craft' },
    { label: 'Content Writing', href: '/services/content-writing', desc: 'Copy that converts' },
    { label: 'AI-Assisted Creative', href: '/services/ai-assisted-creative', desc: 'Human + AI power' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] h-16 flex items-center justify-between px-6 md:px-12" style={{ background: 'rgba(27,40,56,0.85)', backdropFilter: 'blur(12px)' }}>
      <div className="flex items-center gap-3">
        <div className="hidden md:flex gap-1">
          {[0, 1, 2, 3].map(i => <div key={i} className="w-[2px] h-[2px] rounded-full bg-[#C9B99A]" />)}
        </div>
        <Link to="/" className="text-[#F0EBE1] text-sm uppercase tracking-[0.08em] hover:text-[#FF9500] transition-colors duration-300">#TheKingsTake</Link>
      </div>

      <div className="hidden md:flex items-center gap-6">
        <Link to="/blog" className="text-[#C9B99A] text-sm hover:text-[#F0EBE1] transition-colors duration-200">Blog</Link>

        {/* Writing Services Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setWritingDropdownOpen(!writingDropdownOpen)}
            className="flex items-center gap-1 text-[#C9B99A] text-sm hover:text-[#F0EBE1] transition-colors duration-200"
          >
            Writing Services <ChevronDown size={14} className={`transition-transform duration-200 ${writingDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {writingDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 mt-2 w-64 bg-[#1B2838]/95 backdrop-blur-xl rounded border border-[rgba(255,149,0,0.2)] overflow-hidden"
                style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
              >
                {writingDropdownItems.map((item, i) => (
                  <Link
                    key={i}
                    to={item.href}
                    onClick={() => setWritingDropdownOpen(false)}
                    className="block px-4 py-2.5 border-b border-[rgba(240,235,225,0.05)] hover:bg-[rgba(255,149,0,0.08)] transition-colors group"
                  >
                    <p className="text-sm text-[#F0EBE1] group-hover:text-[#FF9500] transition-colors">{item.label}</p>
                    <p className="text-[10px] text-[#C9B99A]/50">{item.desc}</p>
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Link to="/civics" className="text-[#C9B99A] text-sm hover:text-[#F0EBE1] transition-colors duration-200">Civics</Link>
        <Link to="/aasotu" className="text-[#C9B99A] text-sm hover:text-[#FF9500] transition-colors duration-200">AASOTU</Link>
        <Link to="/about-author" className="text-[#C9B99A] text-sm hover:text-[#FF9500] transition-colors duration-200 flex items-center gap-1">
          <User size={13} /> About
        </Link>
        <button onClick={() => navigate('/ancestor-root-registry')} className="text-[#FF9500] text-sm hover:text-[#FFB840] transition-colors duration-200 cursor-pointer flex items-center gap-1">
          <Shield size={13} /> Ancestor Root Registry
        </button>
        <Link to="/forensics-lab" className="text-[#C9B99A] text-sm hover:text-[#FF9500] transition-colors duration-200 flex items-center gap-1">
          <Microscope size={13} /> Forensics Lab
        </Link>
        <a href="/#heritage" className="text-[#C9B99A] text-sm hover:text-[#F0EBE1] transition-colors duration-200 cursor-pointer">Heritage</a>
        <a href="/#ancestry" className="text-[#C9B99A] text-sm hover:text-[#F0EBE1] transition-colors duration-200 cursor-pointer">Ancestry</a>
        <Link to="/ancestor-realm" className="text-[#C9B99A] text-sm hover:text-[#FF9500] transition-colors duration-200 flex items-center gap-1"><TreePine size={13} /> Realm</Link>
        <a href="/#services" className="text-[#C9B99A] text-sm hover:text-[#F0EBE1] transition-colors duration-200 cursor-pointer">Services</a>
        <Link to="/contact" className="text-[#C9B99A] text-sm hover:text-[#FF9500] transition-colors duration-200">Contact</Link>
        {isAdmin ? (
          <Link to="/admin" className="flex items-center gap-1 text-[#FF9500] text-sm hover:text-[#FFB840] transition-colors">
            <LayoutDashboard size={14} /> Admin
          </Link>
        ) : (
          <Link to="/admin/login" className="text-[#FF9500] text-sm hover:text-[#FFB840] transition-colors flex items-center gap-1">
            <LogIn size={14} /> Admin Log In
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

            {/* Writing Services Mobile */}
            <Link to="/writing-services" onClick={() => setMobileOpen(false)} className="block text-[#F0EBE1] text-xl py-3 border-b border-[rgba(240,235,225,0.08)] hover:text-[#FF9500]">Writing Services</Link>
            <div className="pl-4">
              <Link to="/services/speechwriting-narrative" onClick={() => setMobileOpen(false)} className="block text-[#C9B99A] text-base py-2 border-b border-[rgba(240,235,225,0.04)] hover:text-[#FF9500]">Speechwriting</Link>
              <Link to="/services/book-publishing" onClick={() => setMobileOpen(false)} className="block text-[#C9B99A] text-base py-2 border-b border-[rgba(240,235,225,0.04)] hover:text-[#FF9500]">Book & Publishing</Link>
              <Link to="/services/legacy-interview" onClick={() => setMobileOpen(false)} className="block text-[#C9B99A] text-base py-2 border-b border-[rgba(240,235,225,0.04)] hover:text-[#FF9500]">Legacy Interview</Link>
              <Link to="/services/ghostwriting" onClick={() => setMobileOpen(false)} className="block text-[#C9B99A] text-base py-2 border-b border-[rgba(240,235,225,0.04)] hover:text-[#FF9500]">Ghostwriting</Link>
              <Link to="/services/content-writing" onClick={() => setMobileOpen(false)} className="block text-[#C9B99A] text-base py-2 border-b border-[rgba(240,235,225,0.04)] hover:text-[#FF9500]">Content Writing</Link>
              <Link to="/services/ai-assisted-creative" onClick={() => setMobileOpen(false)} className="block text-[#C9B99A] text-base py-2 border-b border-[rgba(240,235,225,0.04)] hover:text-[#FF9500]">AI-Assisted Creative</Link>
            </div>

            <Link to="/civics" onClick={() => setMobileOpen(false)} className="block text-[#F0EBE1] text-xl py-3 border-b border-[rgba(240,235,225,0.08)] hover:text-[#FF9500]">Civics</Link>
            <Link to="/aasotu" onClick={() => setMobileOpen(false)} className="block text-[#F0EBE1] text-xl py-3 border-b border-[rgba(240,235,225,0.08)] hover:text-[#FF9500]">AASOTU Media</Link>
            <Link to="/about-author" onClick={() => setMobileOpen(false)} className="block text-[#F0EBE1] text-xl py-3 border-b border-[rgba(240,235,225,0.08)] hover:text-[#FF9500] flex items-center gap-2">
              <User size={16} /> About
            </Link>
            <button onClick={() => { navigate('/ancestor-root-registry'); setMobileOpen(false); }} className="block text-[#FF9500] text-xl py-3 border-b border-[rgba(240,235,225,0.08)] hover:text-[#FFB840] w-full text-left flex items-center gap-2">
              <Shield size={16} /> Ancestor Root Registry
            </button>
            <Link to="/forensics-lab" onClick={() => setMobileOpen(false)} className="block text-[#F0EBE1] text-xl py-3 border-b border-[rgba(240,235,225,0.08)] hover:text-[#FF9500] flex items-center gap-2">
              <Microscope size={16} /> Forensics Lab
            </Link>
            <a href="/#heritage" onClick={() => setMobileOpen(false)} className="block text-[#F0EBE1] text-xl py-3 border-b border-[rgba(240,235,225,0.08)] hover:text-[#FF9500]">Heritage</a>
            <a href="/#ancestry" onClick={() => setMobileOpen(false)} className="block text-[#F0EBE1] text-xl py-3 border-b border-[rgba(240,235,225,0.08)] hover:text-[#FF9500]">Ancestry</a>
            <Link to="/ancestor-realm" onClick={() => setMobileOpen(false)} className="block text-[#FF9500] text-xl py-3 border-b border-[rgba(240,235,225,0.08)] hover:text-[#FFB840]">The Ancestor Realm</Link>
            <a href="/#services" onClick={() => setMobileOpen(false)} className="block text-[#F0EBE1] text-xl py-3 border-b border-[rgba(240,235,225,0.08)] hover:text-[#FF9500]">Services</a>
            <Link to="/contact" onClick={() => setMobileOpen(false)} className="block text-[#F0EBE1] text-xl py-3 border-b border-[rgba(240,235,225,0.08)] hover:text-[#FF9500]">Contact</Link>
            {isAdmin ? (
              <Link to="/admin" onClick={() => setMobileOpen(false)} className="block text-[#FF9500] text-xl py-3 border-b border-[rgba(240,235,225,0.08)] hover:text-[#FFB840]">Admin Dashboard</Link>
            ) : (
              <Link to="/admin/login" onClick={() => setMobileOpen(false)} className="block text-[#FF9500] text-xl py-3 hover:text-[#FFB840]">Admin Log In</Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
