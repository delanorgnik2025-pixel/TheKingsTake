import { useState } from 'react'
import type { FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router'
import { useNavigate } from 'react-router'
import { ChevronDown, Database, Flame, Map, Search } from 'lucide-react'

export default function HeroPortraitSection() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const searchArchives = (event: FormEvent) => {
    event.preventDefault()
    const cleaned = query.trim()
    navigate(cleaned.length >= 2 ? `/archives?q=${encodeURIComponent(cleaned)}` : '/archives')
  }
  return (
    <section className="relative w-full min-h-[80vh] md:min-h-[calc(100vh-64px)] flex items-end overflow-hidden mt-16">
      {/* Full-bleed cosmic portrait background — section is pushed down by mt-16 so image is fully visible */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat"
        style={{ backgroundImage: 'url(/images/ronald-cosmic-portrait.jpg)', backgroundPosition: 'center top' }}
      />
      {/* Bottom gradient fade into next section */}
      <div className="absolute inset-x-0 bottom-0 h-[200px] md:h-[300px] bg-gradient-to-t from-[#14202E] via-[#14202E]/80 to-transparent" />

      {/* Desktop archive search — a primary product, not a buried tab. */}
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.45, duration: 0.7 }}
        className="absolute left-8 top-[28%] z-10 hidden w-[min(390px,34vw)] rounded-2xl border border-[#FF9500]/30 bg-[#101b28]/90 p-5 shadow-2xl backdrop-blur-lg md:block lg:left-12 lg:p-6"
      >
        <p className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-[#FFB840]"><Database size={13}/> Public Archive Search</p>
        <h1 className="text-2xl leading-tight text-[#F0EBE1] lg:text-3xl" style={{ fontFamily: 'Newsreader, serif' }}>Search the records.<br/>Follow the evidence.</h1>
        <p className="mt-2 text-xs leading-relaxed text-[#C9B99A]">Search National Archives and Library of Congress records directly through The King&apos;s Take.</p>
        <form onSubmit={searchArchives} className="mt-4 flex overflow-hidden rounded-lg border border-white/10 bg-[#0b1420]">
          <input value={query} onChange={event => setQuery(event.target.value)} aria-label="Search public archives" placeholder="Name, place, Dawes roll…" className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-[#C9B99A]/45" />
          <button className="bg-[#FF9500] px-4 text-[#182635]" aria-label="Search archives"><Search size={17}/></button>
        </form>
        <div className="mt-3 flex flex-wrap gap-2">
          {['Dawes Rolls', "Freedmen's Bureau", 'Land records', 'Military service'].map(term => <button key={term} onClick={() => navigate(`/archives?q=${encodeURIComponent(term)}`)} className="rounded-full border border-[#FF9500]/20 px-2.5 py-1 text-[10px] text-[#C9B99A] hover:border-[#FF9500]/60 hover:text-[#FFB840]">{term}</button>)}
        </div>
      </motion.div>

      {/* Mobile: Archive Search appears immediately before Map, as requested. */}
      <div className="absolute bottom-20 left-1/2 z-10 flex -translate-x-1/2 gap-2 md:hidden">
        <Link to="/archives" className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-[#FF9500]/50 bg-[#101b28]/90 px-3 py-2 text-[11px] font-medium text-[#FFB840] backdrop-blur"><Search size={13}/> Search Archives</Link>
        <button onClick={() => document.getElementById('heritage')?.scrollIntoView({ behavior: 'smooth' })} className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/15 bg-[#101b28]/90 px-3 py-2 text-[11px] text-[#C9B99A] backdrop-blur"><Map size={13}/> Explore Map</button>
      </div>

      {/* Scroll to map button */}
      <motion.button
        onClick={() => document.getElementById('heritage')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 cursor-pointer bg-transparent border-none"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-[10px] uppercase tracking-[0.15em] text-[#C9B99A]/60 hover:text-[#FF9500] transition-colors">Explore the Map</span>
        <ChevronDown size={20} className="text-[#FF9500]/70 hover:text-[#FF9500] transition-colors" />
      </motion.button>

      {/* Petition CTA — floating badge */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-6 right-4 md:right-8 z-10"
      >
        <Link
          to="/petition"
          className="group flex items-center gap-2 px-4 py-2.5 bg-[#FF9500] text-[#182635] text-sm font-bold rounded-full shadow-lg shadow-[#FF9500]/20 hover:bg-[#CC6A00] hover:scale-105 transition-all"
        >
          <Flame size={16} className="group-hover:animate-pulse" />
          <span className="hidden sm:inline">Sign the Petition</span>
          <span className="sm:hidden">Sign</span>
        </Link>
      </motion.div>
    </section>
  )
}
