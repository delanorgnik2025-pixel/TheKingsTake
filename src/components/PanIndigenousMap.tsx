import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, MapPin, Users, BookOpen, Globe, ChevronRight, Shield } from 'lucide-react'
import { allRegions, allNations, type IndigenousNation } from '../data/panIndigenousData'

export default function PanIndigenousMap() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [selectedNation, setSelectedNation] = useState<IndigenousNation | null>(null)
  const [search, setSearch] = useState('')

  const filteredNations = useMemo(() => {
    if (!search.trim()) return []
    const q = search.toLowerCase()
    return allNations.filter(n =>
      n.name.toLowerCase().includes(q) ||
      n.indigenousName.toLowerCase().includes(q) ||
      n.country.toLowerCase().includes(q) ||
      n.category.toLowerCase().includes(q)
    )
  }, [search])

  const regionNations = useMemo(() => {
    if (!selectedRegion) return []
    return allRegions.find(r => r.id === selectedRegion)?.nations || []
  }, [selectedRegion])

  return (
    <div className="relative w-full bg-[#0A0F1A] min-h-[600px]">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,149,0,0.04) 0%, transparent 50%)' }} />

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-8 max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#FF9500] mb-2">Explore by Region</p>
          <h3 className="text-xl sm:text-2xl text-[#F0EBE1]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            The Indigenous Americas
          </h3>
        </div>

        {/* Search */}
        <div className="relative max-w-md mx-auto mb-8">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C9B99A]/30" />
          <input
            type="text"
            value={search}
            onChange={e => { setSearch(e.target.value); setSelectedRegion(null); setSelectedNation(null) }}
            placeholder="Search nations, peoples, or countries..."
            className="w-full bg-[rgba(27,40,56,0.4)] border border-[rgba(255,149,0,0.12)] rounded-lg pl-9 pr-4 py-2.5 text-sm text-[#F0EBE1] placeholder-[#C9B99A]/30 focus:outline-none focus:border-[rgba(255,149,0,0.4)] transition-colors"
          />
          {search && (
            <button onClick={() => { setSearch(''); setSelectedRegion(null) }} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#C9B99A]/40 hover:text-[#FF9500]">
              <X size={14} />
            </button>
          )}
        </div>

        {/* Search Results */}
        <AnimatePresence>
          {search.trim() && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="mb-8">
              <p className="text-[10px] uppercase tracking-[0.15em] text-[#C9B99A]/40 mb-3">
                {filteredNations.length} result{filteredNations.length !== 1 ? 's' : ''}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredNations.map(nation => (
                  <NationCard key={nation.id} nation={nation} onClick={() => setSelectedNation(nation)} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Region Selector — show only when not searching */}
        {!search.trim() && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {allRegions.map(region => (
                <button
                  key={region.id}
                  onClick={() => { setSelectedRegion(region.id); setSelectedNation(null) }}
                  className={`relative p-4 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                    selectedRegion === region.id
                      ? 'bg-[rgba(255,149,0,0.12)] border-[rgba(255,149,0,0.4)]'
                      : 'bg-[rgba(27,40,56,0.3)] border-[rgba(255,149,0,0.08)] hover:border-[rgba(255,149,0,0.2)]'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {region.id === 'jamaica' && <MapPin size={12} className="text-[#FF9500]" />}
                    {region.id === 'haiti' && <MapPin size={12} className="text-[#FF9500]" />}
                    {region.id === 'caribbean' && <Globe size={12} className="text-[#FF9500]" />}
                    {region.id === 'suriname' && <Users size={12} className="text-[#FF9500]" />}
                    {region.id === 'mexico' && <Shield size={12} className="text-[#FF9500]" />}
                    {region.id === 'canada' && <Shield size={12} className="text-[#FF9500]" />}
                    {region.id === 'central-america' && <Globe size={12} className="text-[#FF9500]" />}
                    {region.id === 'south-america' && <Globe size={12} className="text-[#FF9500]" />}
                    <span className="text-xs font-medium text-[#F0EBE1]">{region.name}</span>
                  </div>
                  <p className="text-[10px] text-[#C9B99A]/40">{region.nations.length} nations</p>
                </button>
              ))}
            </div>

            {/* Nation List for Selected Region */}
            <AnimatePresence mode="wait">
              {selectedRegion && (
                <motion.div
                  key={selectedRegion}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-[10px] uppercase tracking-[0.15em] text-[#FF9500]/70">
                      {allRegions.find(r => r.id === selectedRegion)?.name} — {regionNations.length} Nations
                    </p>
                    <button onClick={() => setSelectedRegion(null)} className="text-[10px] text-[#C9B99A]/40 hover:text-[#FF9500] transition-colors cursor-pointer">
                      Close
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {regionNations.map(nation => (
                      <NationCard key={nation.id} nation={nation} onClick={() => setSelectedNation(nation)} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}

        {/* Nation Detail Panel */}
        <AnimatePresence>
          {selectedNation && (
            <NationDetail nation={selectedNation} onClose={() => setSelectedNation(null)} />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function NationCard({ nation, onClick }: { nation: IndigenousNation; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group text-left bg-[rgba(27,40,56,0.4)] border border-[rgba(255,149,0,0.08)] rounded-xl p-4 hover:border-[rgba(255,149,0,0.3)] hover:bg-[rgba(27,40,56,0.6)] transition-all duration-300 cursor-pointer"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h4 className="text-sm font-medium text-[#F0EBE1] group-hover:text-[#FF9500] transition-colors leading-tight">
            {nation.name}
          </h4>
          {nation.indigenousName && (
            <p className="text-[10px] text-[#C9B99A]/50 mt-0.5">{nation.indigenousName}</p>
          )}
        </div>
        <ChevronRight size={14} className="text-[#C9B99A]/20 group-hover:text-[#FF9500] group-hover:translate-x-0.5 transition-all shrink-0 mt-0.5" />
      </div>
      <div className="flex items-center gap-2 mt-2">
        <span className="text-[9px] uppercase tracking-wider text-[#C9B99A]/30 bg-[rgba(255,149,0,0.06)] rounded px-1.5 py-0.5">{nation.country}</span>
        <span className="text-[9px] text-[#C9B99A]/25">{nation.languageFamily}</span>
      </div>
    </button>
  )
}

function NationDetail({ nation, onClose }: { nation: IndigenousNation; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-[rgba(5,8,14,0.92)] backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25 }}
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto bg-[#0A0F1A] border border-[rgba(255,149,0,0.2)] rounded-2xl p-6 shadow-[0_0_60px_rgba(255,149,0,0.08)]"
        style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,149,0,0.2) transparent' }}
      >
        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[rgba(255,149,0,0.08)] border border-[rgba(255,149,0,0.15)] flex items-center justify-center text-[#C9B99A] hover:text-[#FF9500] transition-colors cursor-pointer z-10">
          <X size={14} />
        </button>

        {/* Header */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[9px] uppercase tracking-wider text-[#FF9500] bg-[rgba(255,149,0,0.08)] rounded-full px-2.5 py-1">{nation.country}</span>
            <span className="text-[9px] uppercase tracking-wider text-[#C9B99A]/40">{nation.category}</span>
          </div>
          <h2 className="text-xl text-[#F0EBE1] font-medium" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            {nation.name}
          </h2>
          {nation.indigenousName && (
            <p className="text-sm text-[#FF9500]/70 mt-0.5">{nation.indigenousName}</p>
          )}
          {nation.alternateNames.length > 0 && (
            <p className="text-[11px] text-[#C9B99A]/40 mt-1">
              Also known as: {nation.alternateNames.join(', ')}
            </p>
          )}
        </div>

        {/* Key Facts */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <Fact label="Location" value={nation.location} />
          <Fact label="Population" value={nation.population} />
          <Fact label="Language" value={nation.language} />
          <Fact label="Language Family" value={nation.languageFamily} />
          <Fact label="Status" value={nation.status} />
        </div>

        {/* History */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen size={12} className="text-[#FF9500]" />
            <h3 className="text-[10px] uppercase tracking-[0.15em] text-[#FF9500]">History</h3>
          </div>
          <p className="text-[13px] text-[#C9B99A]/80 leading-relaxed">{nation.history}</p>
        </div>

        {/* Current Issues */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <Shield size={12} className="text-[#FF9500]" />
            <h3 className="text-[10px] uppercase tracking-[0.15em] text-[#FF9500]">Current Issues</h3>
          </div>
          <p className="text-[13px] text-[#C9B99A]/80 leading-relaxed">{nation.currentIssues}</p>
        </div>

        {/* Resources */}
        {nation.resources.length > 0 && (
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.15em] text-[#FF9500]/70 mb-2">Learn More</h3>
            <div className="flex flex-wrap gap-2">
              {nation.resources.map(url => (
                <a key={url} href={url} target="_blank" rel="noopener noreferrer"
                  className="text-[11px] text-[#FF9500]/60 hover:text-[#FF9500] border border-[rgba(255,149,0,0.15)] rounded-md px-3 py-1.5 hover:border-[rgba(255,149,0,0.4)] transition-all">
                  {new URL(url).hostname.replace('www.', '')}
                </a>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[rgba(255,149,0,0.04)] border border-[rgba(255,149,0,0.08)] rounded-lg p-2.5">
      <p className="text-[9px] uppercase tracking-wider text-[#FF9500]/50 mb-0.5">{label}</p>
      <p className="text-[11px] text-[#F0EBE1]/80 leading-snug">{value}</p>
    </div>
  )
}
