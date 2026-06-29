import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export default function HeroPortraitSection() {
  return (
    <section className="relative w-full min-h-[80vh] md:min-h-screen flex items-end overflow-hidden">
      {/* Background image offset below the 64px fixed navbar so hero text is fully visible */}
      <div
        className="absolute left-0 right-0 bottom-0 bg-cover bg-no-repeat"
        style={{ backgroundImage: 'url(/images/ronald-cosmic-portrait.jpg)', top: '64px', backgroundPosition: 'center top' }}
      />
      {/* Bottom gradient fade into next section */}
      <div className="absolute inset-x-0 bottom-0 h-[200px] md:h-[300px] bg-gradient-to-t from-[#0a0f1a] via-[#0a0f1a]/80 to-transparent" />

      {/* Scroll to map button */}
      <motion.button
        onClick={() => document.getElementById('heritage')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer bg-transparent border-none"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-[10px] uppercase tracking-[0.15em] text-[#C9B99A]/60 hover:text-[#FF9500] transition-colors">Explore the Map</span>
        <ChevronDown size={20} className="text-[#FF9500]/70 hover:text-[#FF9500] transition-colors" />
      </motion.button>
    </section>
  )
}
