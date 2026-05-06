import { motion, AnimatePresence } from 'framer-motion'
import { X, Facebook, Instagram, Youtube, Twitter } from 'lucide-react'

interface MenuOverlayProps {
  isOpen: boolean
  onClose: () => void
  onNavClick: (id: string) => void
}

const menuLinks = [
  { label: 'ABOUT', id: 'about' },
  { label: 'SERVICES', id: 'services' },
  { label: 'LEGAL HUB', id: 'legal-hub' },
  { label: 'BLOG', id: 'blog' },
  { label: 'CONTACT', id: 'contact' },
]

const socialLinks = [
  { icon: Facebook, href: 'https://www.facebook.com/thekingstake', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Twitter, href: '#', label: 'Twitter/X' },
]

export default function MenuOverlay({ isOpen, onClose, onNavClick }: MenuOverlayProps) {
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
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 md:right-12 text-[#F0EBE1] text-xl hover:text-[#FF9500] transition-colors duration-200 cursor-pointer"
          >
            <X size={28} />
          </button>

          {/* Navigation links */}
          <div className="px-8 md:px-16 flex flex-col gap-4 md:gap-6">
            {menuLinks.map((link, i) => (
              <motion.button
                key={link.id}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => { onNavClick(link.id); onClose() }}
                className="text-left text-[#F0EBE1] text-4xl md:text-5xl tracking-[-0.02em] hover:text-[#FF9500] transition-colors duration-300 relative group cursor-pointer"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#FF9500] group-hover:w-full transition-all duration-300" />
              </motion.button>
            ))}
          </div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-16 left-8 md:left-16 flex gap-6 items-center"
          >
            {socialLinks.map(social => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C9B99A] hover:text-[#FF9500] transition-colors duration-200"
                aria-label={social.label}
              >
                <social.icon size={20} />
              </a>
            ))}
          </motion.div>

          {/* Company tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="absolute bottom-8 left-8 md:left-16 text-xs text-[#C9B99A] uppercase tracking-[0.08em]"
          >
            AASOTU Media Group LLC
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
