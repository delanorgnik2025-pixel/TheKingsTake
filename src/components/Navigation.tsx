import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, Shield, User, Zap, BookOpen } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

interface NavigationProps {
  onMenuToggle: () => void
  onNavClick: (id: string) => void
}

const BREAKING_NEWS = [
  'OPERATION LOINS: The African American State of the Union — ORDER NOW',
  'NAACP Launches $50M Black Tech Fund — Applications Open',
  'New Study: Black-Owned Tech Startups See 400% Growth in 2026',
  'Dawes Roll Digitization Reaches 75% — Genealogy Access Expanding',
  'SpaceX Partners with HBCUs for Satellite Engineering Program',
]

const AD_BANNER = {
  text: 'THE AFRICAN AMERICAN STATE OF THE UNION — FROM THE LOINS OF THE BEAST',
  cta: 'Order Now',
  href: '/pre-order',
}

export default function Navigation({ onMenuToggle, onNavClick }: NavigationProps) {
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [writingDropdownOpen, setWritingDropdownOpen] = useState(false)
  const [tickerPaused, setTickerPaused] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { isAdmin } = useAuth()

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setWritingDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const writingDropdownItems = [
    { label: 'Writing Services', href: '/writing-services' },
    { label: 'Speechwriting', href: '/writing-services#speechwriting' },
    { label: 'Book & Publishing', href: '/writing-services#book-publishing' },
    { label: 'Legacy Interview', href: '/writing-services#legacy-interview' },
    { label: 'Ghostwriting', href: '/writing-services#ghostwriting' },
    { label: 'Content Writing', href: '/writing-services#content-writing' },
    { label: 'AI-Assisted Creative', href: '/writing-services#ai-assisted' },
  ]

  return (
    <>
      {/* AD BANNER */}
      <div className="fixed top-0 left-0 right-0 z-[110] bg-[#0a0a12] border-b border-white/[0.06]">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-10 py-1.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-hidden">
            <Zap size={12} className="text-[#00ff41] shrink-0" />
            <span className="text-[10px] tracking-[0.15em] uppercase text-white/50 font-mono-tech whitespace-nowrap hidden sm:inline">Ad</span>
            <span className="text-[11px] text-white/70 truncate font-mono-tech">{AD_BANNER.text}</span>
          </div>
          <Link to={AD_BANNER.href} className="shrink-0 px-3 py-0.5 bg-[#00ff41] text-[#050508] text-[10px] font-bold tracking-[0.1em] uppercase rounded hover:brightness-110 transition-all">
            {AD_BANNER.cta}
          </Link>
        </div>
      </div>

      {/* BREAKING NEWS TICKER */}
      <div
        className="fixed top-[34px] left-0 right-0 z-[105] overflow-hidden border-b border-[#00ff41]/20"
        style={{ background: 'linear-gradient(90deg, rgba(0,255,65,0.08), rgba(0,196,250,0.08), rgba(0,255,65,0.08))' }}
        onMouseEnter={() => setTickerPaused(true)}
        onMouseLeave={() => setTickerPaused(false)}
      >
        <div className={`flex whitespace-nowrap py-1.5 ${tickerPaused ? '' : 'animate-ticker'}`}>
          {[...BREAKING_NEWS, ...BREAKING_NEWS].map((headline, i) => (
            <span key={i} className="text-[10px] font-mono-tech tracking-[0.08em] uppercase text-[#00ff41]/80 px-6 border-l border-[#00ff41]/10 first:border-0 flex items-center gap-2 shrink-0">
              {i === 0 && <span className="w-1.5 h-1.5 bg-[#ff3b30] rounded-full live-dot shrink-0" />}
              BREAKING — {headline}
            </span>
          ))}
        </div>
      </div>

      {/* MAIN NAV */}
      <nav
        className="fixed top-[60px] left-0 right-0 z-[100] h-14 border-b border-white/[0.06]"
        style={{ background: 'rgba(5,5,8,0.95)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 h-full flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded flex items-center justify-center border border-[#00ff41]/30 bg-[#00ff41]/5 group-hover:border-[#00ff41]/60 transition-all">
              <span className="text-[#00ff41] font-bold text-sm font-display">K</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-sm font-bold tracking-[0.12em] text-white font-display">THEKINGSTAKE</span>
              <span className="block text-[8px] tracking-[0.3em] uppercase font-mono-tech -mt-0.5" style={{ color: '#00ff41' }}>
                // NEWS & INTELLIGENCE
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-0.5">
            <Link to="/news" className="px-3.5 py-2 text-[12px] font-medium text-white/70 hover:text-[#00ff41] hover:bg-white/[0.03] rounded transition-all font-tech tracking-wide">
              NEWS
            </Link>
            <Link to="/heritage" className="px-3.5 py-2 text-[12px] font-medium text-white/70 hover:text-[#00ff41] hover:bg-white/[0.03] rounded transition-all font-tech tracking-wide">
              HERITAGE
            </Link>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setWritingDropdownOpen(!writingDropdownOpen)}
                className="flex items-center gap-1 px-3.5 py-2 text-[12px] font-medium text-white/70 hover:text-[#00ff41] hover:bg-white/[0.03] rounded transition-all font-tech tracking-wide"
              >
                WRITING <ChevronDown size={12} className={`transition-transform ${writingDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {writingDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute top-full left-0 mt-2 w-56 bg-[#0a0a12] border border-[#00ff41]/20 rounded-lg overflow-hidden"
                    style={{ boxShadow: '0 16px 48px rgba(0,0,0,0.8), 0 0 20px rgba(0,255,65,0.1)' }}
                  >
                    {writingDropdownItems.map((item, i) => (
                      <Link
                        key={i}
                        to={item.href}
                        onClick={() => setWritingDropdownOpen(false)}
                        className="block px-4 py-2.5 text-[12px] text-white/60 hover:text-[#00ff41] hover:bg-[#00ff41]/5 transition-colors border-b border-white/[0.04] last:border-0 font-mono-tech"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Link to="/work-with-me" className="px-3.5 py-2 text-[12px] font-medium text-white/70 hover:text-[#00ff41] hover:bg-white/[0.03] rounded transition-all font-tech tracking-wide">
              JUSTICE
            </Link>
            <Link to="/about-author" className="px-3.5 py-2 text-[12px] font-medium text-white/70 hover:text-[#00ff41] hover:bg-white/[0.03] rounded transition-all font-tech tracking-wide flex items-center gap-1.5">
              <User size={12} /> ABOUT
            </Link>
            <button
              onClick={() => navigate('/ancestor-root-registry')}
              className="px-3.5 py-2 text-[12px] font-medium text-white/70 hover:text-[#d4a843] hover:bg-white/[0.03] rounded transition-all font-tech tracking-wide flex items-center gap-1.5"
            >
              <Shield size={12} /> REGISTRY
            </button>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/pre-order"
              className="hidden md:inline-flex items-center gap-2 px-4 h-8 rounded text-[11px] font-bold tracking-[0.1em] uppercase text-[#050508] hover:brightness-110 transition-all font-tech"
              style={{ background: 'linear-gradient(135deg,#00ff41 0%,#00c4fa 50%,#00ff41 100%)' }}
            >
              <BookOpen size={13} /> Get the Book
            </Link>
            {isAdmin ? (
              <Link to="/admin/dashboard" className="hidden md:flex items-center gap-1 text-[11px] text-[#00ff41] hover:text-[#00c4fa] transition-colors font-mono-tech">
                [ADMIN]
              </Link>
            ) : (
              <Link to="/admin/login" className="hidden md:flex items-center gap-1 text-[11px] text-white/30 hover:text-white transition-colors font-mono-tech">
                [LOGIN]
              </Link>
            )}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-8 h-8 flex items-center justify-center text-white/70 hover:text-[#00ff41] transition-colors border border-white/[0.08] rounded"
            >
              <Menu size={16} />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-[200] bg-[#050508]"
          >
            <div className="flex items-center justify-between h-14 px-6 border-b border-white/[0.06]">
              <span className="text-sm font-bold tracking-[0.12em] text-white font-display">THEKINGSTAKE</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-white/70 hover:text-[#00ff41] border border-white/[0.08] rounded"
              >
                <X size={16} />
              </button>
            </div>
            <div className="p-6 space-y-0.5 overflow-y-auto" style={{ height: 'calc(100vh - 56px)' }}>
              <Link to="/" onClick={() => setMobileOpen(false)} className="block text-white text-base py-3 border-b border-white/[0.06] font-tech tracking-wide hover:text-[#00ff41] transition-colors">
                HOME
              </Link>
              <Link to="/news" onClick={() => setMobileOpen(false)} className="block text-white text-base py-3 border-b border-white/[0.06] font-tech tracking-wide hover:text-[#00ff41] transition-colors">
                NEWS HUB
              </Link>
              <Link to="/heritage" onClick={() => setMobileOpen(false)} className="block text-white text-base py-3 border-b border-white/[0.06] font-tech tracking-wide hover:text-[#00ff41] transition-colors">
                HERITAGE MAP
              </Link>
              <Link to="/writing-services" onClick={() => setMobileOpen(false)} className="block text-white text-base py-3 border-b border-white/[0.06] font-tech tracking-wide hover:text-[#00ff41] transition-colors">
                WRITING SERVICES
              </Link>
              <Link to="/work-with-me" onClick={() => setMobileOpen(false)} className="block text-white text-base py-3 border-b border-white/[0.06] font-tech tracking-wide hover:text-[#00ff41] transition-colors">
                JUSTICE & PETITION
              </Link>
              <Link to="/about-author" onClick={() => setMobileOpen(false)} className="block text-white text-base py-3 border-b border-white/[0.06] font-tech tracking-wide hover:text-[#00ff41] transition-colors">
                ABOUT THE AUTHOR
              </Link>
              <button
                onClick={() => {
                  navigate('/ancestor-root-registry')
                  setMobileOpen(false)
                }}
                className="block w-full text-left text-white text-base py-3 border-b border-white/[0.06] font-tech tracking-wide hover:text-[#d4a843] transition-colors"
              >
                ANCESTOR ROOT REGISTRY
              </button>
              <Link to="/pre-order" onClick={() => setMobileOpen(false)} className="block text-[#00ff41] text-base py-3 border-b border-white/[0.06] font-bold font-tech tracking-wide">
                PRE-ORDER THE BOOK
              </Link>
              {isAdmin ? (
                <Link to="/admin/dashboard" onClick={() => setMobileOpen(false)} className="block text-[#00ff41] text-base py-3 font-mono-tech">
                  [ADMIN DASHBOARD]
                </Link>
              ) : (
                <Link to="/admin/login" onClick={() => setMobileOpen(false)} className="block text-white/40 text-base py-3 font-mono-tech">
                  [ADMIN LOGIN]
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
