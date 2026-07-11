import { useState } from 'react'
import { Link, useLocation } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowUpRight, TreePine, BookOpen, Users, Globe, Newspaper, PenTool, Settings, ScrollText, Shield, Sparkles } from 'lucide-react'

interface MenuOverlayProps {
  isOpen: boolean
  onClose: () => void
}

export default function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  const location = useLocation()
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  const menuItems = [
    { label: 'Home', href: '/', icon: null, desc: 'Main page' },
    { label: 'Blog', href: '/blog', icon: <Newspaper size={16} />, desc: 'Articles & updates' },
    { label: 'Writing Services', href: '/writing-services', icon: <PenTool size={16} />, desc: 'All writing offerings' },
    { label: 'Civics', href: '/civics', icon: <Shield size={16} />, desc: 'Know your rights' },
    { label: 'AASOTU Media', href: '/aasotu', icon: <Sparkles size={16} />, desc: 'Media group & brand' },
    { label: 'About', href: '/about-author', icon: <Users size={16} />, desc: 'Ronald Lee King' },
    { label: 'Root Registry', href: '/ancestor-root-registry', icon: <TreePine size={16} />, desc: 'Genealogy tools' },
    { label: 'Heritage Map', href: '/#heritage', icon: <Globe size={16} />, desc: 'Explore territories' },
    { label: 'Ancestry', href: '/ancestor-realm', icon: <BookOpen size={16} />, desc: 'Ancestral research' },
    { label: 'Pre-Order Book', href: '/pre-order', icon: <ScrollText size={16} />, desc: '$19.99 early access' },
  ]

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/'
    if (href.startsWith('/#')) return location.pathname === '/' && location.hash === href.slice(1)
    return location.pathname === href
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200]"
          style={{ background: 'rgba(5,8,14,0.97)', backdropFilter: 'blur(20px)' }}
        >
          {/* Close */}
          <button onClick={onClose} className="absolute top-6 right-6 text-[#F0EBE1] hover:text-[#FF9500] transition-colors p-2">
            <X size={28} />
          </button>

          <div className="h-full flex flex-col items-center justify-center px-6">
            <nav className="w-full max-w-md space-y-1">
              {menuItems.map((item, i) => (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={onClose}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={`group flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-[rgba(255,149,0,0.1)] border border-[rgba(255,149,0,0.2)]'
                      : 'hover:bg-[rgba(255,149,0,0.05)] border border-transparent'
                  }`}
                >
                  {item.icon && (
                    <span className="text-[#FF9500]/60 group-hover:text-[#FF9500] transition-colors">
                      {item.icon}
                    </span>
                  )}
                  <div className="flex-1 min-w-0">
                    <span className={`text-base font-medium tracking-wide transition-colors ${
                      isActive(item.href) ? 'text-[#FF9500]' : 'text-[#F0EBE1] group-hover:text-[#FF9500]'
                    }`}>
                      {item.label}
                    </span>
                    <span className="block text-[11px] text-[#C9B99A]/40 mt-0.5">{item.desc}</span>
                  </div>
                  <ArrowUpRight size={14} className={`text-[#C9B99A]/20 transition-all ${
                    hoveredIdx === i ? 'text-[#FF9500] translate-x-0.5 -translate-y-0.5' : ''
                  }`} />
                </Link>
              ))}
            </nav>

            {/* Footer */}
            <div className="absolute bottom-6 left-0 right-0 text-center">
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#C9B99A]/20">#TheKingsTake &middot; AASOTU Media Group LLC</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
