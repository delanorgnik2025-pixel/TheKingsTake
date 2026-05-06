import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router'
import { X, Facebook, Instagram, Youtube, Twitter, LayoutDashboard } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

interface MenuOverlayProps {
  isOpen: boolean
  onClose: () => void
  onNavClick: (id: string) => void
}

export default function MenuOverlay({ isOpen, onClose, onNavClick }: MenuOverlayProps) {
  const { isAdmin } = useAuth()

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[1000] bg-[#1B2838] flex flex-col justify-center"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <button onClick={onClose} className="absolute top-6 right-6 md:right-12 text-[#F0EBE1] text-xl hover:text-[#FF9500] transition-colors duration-200 cursor-pointer">
            <X size={28} />
          </button>

          <div className="px-8 md:px-16 flex flex-col gap-4 md:gap-6">
            {[
              { label: 'HOME', action: () => { onNavClick('hero'); onClose(); } },
              { label: 'BLOG', action: () => { window.location.href = '/blog'; } },
              { label: 'LEGAL HUB', action: () => { window.location.href = '/legal'; } },
              { label: 'SERVICES', action: () => { onNavClick('services'); onClose(); } },
              { label: 'CONTACT', action: () => { onNavClick('contact'); onClose(); } },
            ].map((link, i) => (
              <motion.button
                key={link.label}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                onClick={link.action}
                className="text-left text-[#F0EBE1] text-4xl md:text-5xl tracking-[-0.02em] hover:text-[#FF9500] transition-colors duration-300 relative group cursor-pointer"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#FF9500] group-hover:w-full transition-all duration-300" />
              </motion.button>
            ))}

            {isAdmin && (
              <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.4 }}>
                <Link to="/admin" onClick={onClose} className="flex items-center gap-3 text-[#FF9500] text-2xl md:text-3xl hover:text-[#FFB840] transition-colors">
                  <LayoutDashboard size={24} /> Admin Dashboard
                </Link>
              </motion.div>
            )}
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="absolute bottom-16 left-8 md:left-16 flex gap-6 items-center">
            {[
              { icon: Facebook, href: 'https://www.facebook.com/thekingstake', label: 'Facebook' },
              { icon: Instagram, href: '#', label: 'Instagram' },
              { icon: Youtube, href: '#', label: 'YouTube' },
              { icon: Twitter, href: '#', label: 'Twitter/X' },
            ].map(social => (
              <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer"
                className="text-[#C9B99A] hover:text-[#FF9500] transition-colors duration-200" aria-label={social.label}>
                <social.icon size={20} />
              </a>
            ))}
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="absolute bottom-8 left-8 md:left-16 text-xs text-[#C9B99A] uppercase tracking-[0.08em]">
            AASOTU Media Group LLC
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
