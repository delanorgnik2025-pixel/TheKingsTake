import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { Home, ArrowLeft, Search } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#05080e] flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-md">
        <div className="text-8xl font-bold text-[#FF9500]/20 mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
          404
        </div>
        <h1 className="text-2xl text-[#F0EBE1] font-medium mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
          Page Not Found
        </h1>
        <p className="text-sm text-[#C9B99A]/60 mb-8 leading-relaxed">
          The page you are looking for does not exist or has been moved. 
          Try navigating back or exploring one of the sections below.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button onClick={() => window.history.back()}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#15202B] border border-white/10 rounded-xl text-sm text-[#F0EBE1] hover:border-[#FF9500]/30 hover:text-[#FF9500] transition-all">
            <ArrowLeft size={16} />
            Go Back
          </button>
          <Link to="/"
            className="flex items-center gap-2 px-5 py-2.5 bg-[#FF9500] rounded-xl text-sm text-[#1B2838] font-medium hover:bg-[#CC6A00] transition-all">
            <Home size={16} />
            Return Home
          </Link>
        </div>
        <div className="mt-8 pt-6 border-t border-white/5">
          <p className="text-[10px] text-[#C9B99A]/30 uppercase tracking-wider mb-3">Quick Links</p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { label: 'Heritage Map', href: '/#heritage' },
              { label: 'Blog', href: '/blog' },
              { label: 'Pre-Order', href: '/pre-order' },
              { label: 'AASOTU', href: '/aasotu' },
              { label: 'About', href: '/about-author' },
            ].map((link) => (
              <Link key={link.href} to={link.href}
                className="text-xs text-[#C9B99A]/40 hover:text-[#FF9500] transition-colors px-2 py-1">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
