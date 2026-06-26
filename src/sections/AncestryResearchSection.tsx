import { useState, useMemo, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, BookOpen, Landmark, Scroll, X, ChevronDown, ChevronUp, ExternalLink, FileText, Users, ArrowRight, AlertTriangle, Database, Globe, Clock, Tag } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'
import { TRIBAL_ROLLS, ROLL_CATEGORIES } from '../data/tribalRolls'
import { RECONCILIATION_LAWS_V2, LAW_CATEGORIES } from '../data/reclassificationLaws'
import { ALTERNATIVE_TRIBAL_NAMES } from '../data/alternativeTribalNames'
import { STATE_RECORD_MAP, getStateRecord } from '../data/stateRecordMap'
import type { TribalRollRecord, LawPolicyRecord, AncestryFilterCategory } from '../types/ancestry'

// ============================================
// URL PARAMS HELPER
// ============================================
function getUrlParam(key: string): string | null {
  const hash = window.location.hash
  const paramMatch = hash.match(new RegExp(`[?&]${key}=([^&]+)`))
  return paramMatch ? decodeURIComponent(paramMatch[1]) : null
}

function setUrlParam(key: string, value: string | null) {
  const [baseHash, params = ''] = window.location.hash.split('?')
  const urlParams = new URLSearchParams(params)
  if (value) { urlParams.set(key, value) } else { urlParams.delete(key) }
  const newParams = urlParams.toString()
  window.location.hash = baseHash + (newParams ? `?${newParams}` : '')
}

// ============================================
// EXPANDABLE CARD
// ============================================
function ExpandableCard({ title, subtitle, children, icon: Icon, accent = false }: {
  title: string; subtitle?: string; children: React.ReactNode; icon: any; accent?: boolean
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`rounded-xl border transition-all ${accent ? 'border-[rgba(255,149,0,0.25)] bg-[rgba(255,149,0,0.05)]' : 'border-[rgba(255,149,0,0.12)] bg-[rgba(27,40,56,0.4)]'}`}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-4 md:p-5 text-left">
        <div className="flex items-center gap-3">
          <Icon size={18} className={accent ? 'text-[#FF9500]' : 'text-[#C9B99A]'} />
          <div>
            <h4 className="text-sm md:text-base text-[#F0EBE1] font-medium">{title}</h4>
            {subtitle && <p className="text-xs text-[#C9B99A]/60 mt-0.5">{subtitle}</p>}
          </div>
        </div>
        {open ? <ChevronUp size={16} className="text-[#FF9500]" /> : <ChevronDown size={16} className="text-[#C9B99A]" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
            <div className="px-4 md:px-5 pb-4 md:pb-5 border-t border-[rgba(255,149,0,0.1)] pt-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ============================================
// ROLL MODAL
// ============================================
function RollModal({ roll, onClose }: { roll: TribalRollRecord; onClose: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <motion.div initial={{ opacity: 0, scale: 0.92, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92, y: 20 }} transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()} className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-xl border border-[rgba(255,149,0,0.25)] bg-[#15202B] shadow-2xl"
        style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,149,0,0.3) transparent' }}>
        <div className="sticky top-0 z-10 bg-[#15202B]/95 backdrop-blur-md border-b border-[rgba(255,149,0,0.15)] p-4 md:p-5 flex items-center justify-between" style={{ borderLeft: '4px solid #FF9500' }}>
          <div>
            <h3 className="text-lg md:text-xl text-[#F0EBE1] font-medium">{roll.title}</h3>
            <p className="text-sm text-[#C9B99A] mt-0.5">{roll.yearStart}{roll.yearEnd ? `–${roll.yearEnd}` : ''}</p>
          </div>
          <button onClick={onClose} className="flex items-center justify-center w-9 h-9 rounded-full bg-[rgba(255,149,0,0.1)] border border-[rgba(255,149,0,0.2)] text-[#C9B99A] hover:text-[#FF9500] transition-all shrink-0 ml-3"><X size={18} /></button>
        </div>
        <div className="p-4 md:p-5 space-y-4">
          {roll.tribes.length > 0 && <div><p className="text-xs text-[#FF9500] uppercase mb-1">Tribes / Nations</p><div className="flex flex-wrap gap-1.5">{roll.tribes.map(t => <span key={t} className="text-xs bg-[rgba(255,149,0,0.08)] text-[#F0EBE1] rounded-full px-2.5 py-1">{t}</span>)}</div></div>}
          <div><p className="text-xs text-[#FF9500] uppercase mb-1">Purpose</p><p className="text-sm text-[#C9B99A] leading-relaxed">{roll.purpose}</p></div>
          <div><p className="text-xs text-[#FF9500] uppercase mb-1">Records Included</p><p className="text-sm text-[#C9B99A] leading-relaxed">{roll.recordsIncluded}</p></div>
          <div><p className="text-xs text-[#FF9500] uppercase mb-1">Who Should Search</p><p className="text-sm text-[#C9B99A] leading-relaxed">{roll.whoShouldSearch}</p></div>
          {roll.relatedStates.length > 0 && <div><p className="text-xs text-[#FF9500] uppercase mb-1">Related States</p><div className="flex flex-wrap gap-1.5">{roll.relatedStates.map(s => <span key={s} className="text-xs bg-[rgba(27,40,56,0.6)] text-[#C9B99A] rounded px-2 py-0.5">{s}</span>)}</div></div>}
          {roll.cautionNote && <div className="bg-[rgba(255,149,0,0.06)] rounded-lg p-3 border border-[rgba(255,149,0,0.12)]"><p className="text-xs text-[#FF9500] uppercase mb-1">Research Caution</p><p className="text-sm text-[#C9B99A]/80 leading-relaxed">{roll.cautionNote}</p></div>}
          <div><p className="text-xs text-[#FF9500] uppercase mb-2 flex items-center gap-1.5"><ExternalLink size={10} /> Receipts — Official Sources</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {roll.sourceLinks.map((link, i) => (
                <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs bg-[rgba(255,149,0,0.08)] text-[#FF9500] rounded-lg px-3 py-2 border border-[rgba(255,149,0,0.15)] hover:bg-[rgba(255,149,0,0.15)] transition-colors">
                  <Database size={11} /> {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ============================================
// LAW MODAL
// ============================================
function LawModal({ law, onClose }: { law: LawPolicyRecord; onClose: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <motion.div initial={{ opacity: 0, scale: 0.92, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92, y: 20 }} transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()} className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-xl border border-[rgba(255,149,0,0.25)] bg-[#15202B] shadow-2xl"
        style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,149,0,0.3) transparent' }}>
        <div className="sticky top-0 z-10 bg-[#15202B]/95 backdrop-blur-md border-b border-[rgba(255,149,0,0.15)] p-4 md:p-5 flex items-center justify-between" style={{ borderLeft: '4px solid #FF9500' }}>
          <div>
            <h3 className="text-lg md:text-xl text-[#F0EBE1] font-medium">{law.title}</h3>
            <p className="text-sm text-[#C9B99A] mt-0.5">{law.year}{law.yearEnd ? `–${law.yearEnd}` : ''}</p>
          </div>
          <button onClick={onClose} className="flex items-center justify-center w-9 h-9 rounded-full bg-[rgba(255,149,0,0.1)] border border-[rgba(255,149,0,0.2)] text-[#C9B99A] hover:text-[#FF9500] transition-all shrink-0 ml-3"><X size={18} /></button>
        </div>
        <div className="p-4 md:p-5 space-y-4">
          <div><p className="text-xs text-[#FF9500] uppercase mb-1">Summary</p><p className="text-sm text-[#C9B99A] leading-relaxed">{law.summary}</p></div>
          <div><p className="text-xs text-[#FF9500] uppercase mb-1">Historical Impact</p><p className="text-sm text-[#C9B99A] leading-relaxed">{law.historicalImpact}</p></div>
          <div className="bg-[rgba(255,149,0,0.06)] rounded-lg p-3 border border-[rgba(255,149,0,0.12)]"><p className="text-xs text-[#FF9500] uppercase mb-1">Impact on Identity & Records</p><p className="text-sm text-[#C9B99A]/80 leading-relaxed">{law.identityImpact}</p></div>
          {law.relatedTribes.length > 0 && <div><p className="text-xs text-[#FF9500] uppercase mb-1">Related Tribes / Nations</p><div className="flex flex-wrap gap-1.5">{law.relatedTribes.map(t => <span key={t} className="text-xs bg-[rgba(255,149,0,0.08)] text-[#F0EBE1] rounded-full px-2.5 py-1">{t}</span>)}</div></div>}
          {law.relatedStates.length > 0 && <div><p className="text-xs text-[#FF9500] uppercase mb-1">Related States</p><div className="flex flex-wrap gap-1.5">{law.relatedStates.map(s => <span key={s} className="text-xs bg-[rgba(27,40,56,0.6)] text-[#C9B99A] rounded px-2 py-0.5">{s}</span>)}</div></div>}
          {law.relatedRecords.length > 0 && <div><p className="text-xs text-[#FF9500] uppercase mb-1">Related Records</p><ul className="list-disc list-inside text-sm text-[#C9B99A]/70">{law.relatedRecords.map((r, i) => <li key={i}>{r}</li>)}</ul></div>}
          <div><p className="text-xs text-[#FF9500] uppercase mb-2 flex items-center gap-1.5"><ExternalLink size={10} /> Receipts — Sources</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {law.sourceLinks.map((link, i) => (
                <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs bg-[rgba(255,149,0,0.08)] text-[#FF9500] rounded-lg px-3 py-2 border border-[rgba(255,149,0,0.15)] hover:bg-[rgba(255,149,0,0.15)] transition-colors">
                  <Landmark size={11} /> {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ============================================
// MAIN SECTION
// ============================================
export default function AncestryResearchSection() {
  const [activeTab, setActiveTab] = useState<'rolls' | 'laws' | 'names' | 'guide'>('rolls')
  const [rollCategory, setRollCategory] = useState('all')
  const [lawCategory, setLawCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRoll, setSelectedRoll] = useState<TribalRollRecord | null>(null)
  const [selectedLaw, setSelectedLaw] = useState<LawPolicyRecord | null>(null)
  const [urlStateFilter, setUrlStateFilter] = useState<string | null>(null)

  // URL parameter handling
  useEffect(() => {
    const stateParam = getUrlParam('state')
    if (stateParam) {
      setUrlStateFilter(stateParam)
      const section = document.getElementById('ancestry')
      if (section) { setTimeout(() => section.scrollIntoView({ behavior: 'smooth' }), 300) }
    }

    const handleHashChange = () => {
      const newState = getUrlParam('state')
      setUrlStateFilter(newState)
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const clearStateFilter = useCallback(() => {
    setUrlStateFilter(null)
    setUrlParam('state', null)
  }, [])

  // Filtered rolls
  const filteredRolls = useMemo(() => {
    let results = TRIBAL_ROLLS
    if (rollCategory !== 'all') { results = results.filter(r => r.category === rollCategory) }
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      results = results.filter(r =>
        r.title.toLowerCase().includes(q) || r.tribes.some(t => t.toLowerCase().includes(q)) ||
        r.relatedStates.some(s => s.toLowerCase().includes(q)) || r.tags.some(t => t.toLowerCase().includes(q))
      )
    }
    if (urlStateFilter) {
      const sf = urlStateFilter.toLowerCase()
      results = results.filter(r => r.relatedStates.some(s => s.toLowerCase().includes(sf)))
    }
    return results
  }, [rollCategory, searchQuery, urlStateFilter])

  // Filtered laws
  const filteredLaws = useMemo(() => {
    let results = RECONCILIATION_LAWS_V2
    if (lawCategory !== 'all') { results = results.filter(l => l.category === lawCategory) }
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      results = results.filter(l =>
        l.title.toLowerCase().includes(q) || l.summary.toLowerCase().includes(q) ||
        l.relatedStates.some(s => s.toLowerCase().includes(q)) || l.tags.some(t => t.toLowerCase().includes(q))
      )
    }
    if (urlStateFilter) {
      const sf = urlStateFilter.toLowerCase()
      results = results.filter(l => l.relatedStates.some(s => s.toLowerCase().includes(sf)))
    }
    return results
  }, [lawCategory, searchQuery, urlStateFilter])

  const filteredNames = useMemo(() => {
    if (!searchQuery) return ALTERNATIVE_TRIBAL_NAMES
    const q = searchQuery.toLowerCase()
    return ALTERNATIVE_TRIBAL_NAMES.filter(n =>
      n.tribalName.toLowerCase().includes(q) || n.alternativeNames.some(a => a.toLowerCase().includes(q))
    )
  }, [searchQuery])

  // State info for URL filter
  const stateRecordInfo = urlStateFilter ? getStateRecord(urlStateFilter) : null

  return (
    <section id="ancestry" className="relative py-20 md:py-28 px-6 md:px-12 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15" style={{ backgroundImage: 'url(/images/cosmic-bg.jpg)' }} />
      <div className="absolute inset-0 bg-[#0a0f1a]/88" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-10 md:space-y-14">

        {/* Header */}
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex gap-1">{[0,1,2].map(i => <div key={i} className="w-[3px] h-[3px] rounded-full bg-[#FF9500]" />)}</div>
            <p className="text-xs uppercase tracking-[0.08em] text-[#FF9500]">Ancestry / Receipts — Tribal Rolls, Treaty Laws & Reclassification Records</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="text-4xl md:text-5xl lg:text-[64px] text-[#F0EBE1] tracking-[-0.02em] leading-[1.08] mb-4 text-shadow-hero">
            They Hid Our Identity<br className="hidden md:block" /> in the Records
          </h2>
          <p className="text-lg md:text-xl text-[#C9B99A] max-w-3xl leading-relaxed">
            Explore tribal rolls, treaty records, federal Indian policy, racial classification laws, Freedmen records, census records, land allotments, and genealogy databases that shaped how families were recorded, reclassified, erased, or preserved.
          </p>
        </ScrollReveal>

        {/* Research Disclaimer */}
        <ScrollReveal delay={0.12}>
          <div className="bg-[rgba(255,149,0,0.06)] rounded-xl border border-[rgba(255,149,0,0.15)] p-4 md:p-5 flex items-start gap-4">
            <AlertTriangle size={20} className="text-[#FF9500] shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-[#FF9500] font-medium mb-1">Research Disclaimer</p>
              <p className="text-sm text-[#C9B99A]/80 leading-relaxed">
                This section is for historical research, ancestry guidance, and public education. It separates verified records, legal history, and research interpretation. Users should confirm family claims through original documents, multiple records, and official archives.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Truth About Reclassification — Safe Language */}
        <ScrollReveal delay={0.14}>
          <div className="bg-[rgba(255,149,0,0.08)] rounded-xl border border-[rgba(255,149,0,0.2)] p-4 md:p-5 flex items-start gap-4">
            <BookOpen size={20} className="text-[#FF9500] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm text-[#FF9500] font-medium mb-2">Understanding Identity in Historical Records</h4>
              <p className="text-sm text-[#C9B99A] leading-relaxed">
                Across American history, race, tribal citizenship, land rights, and identity were shaped by law, policy, census categories, enrollment rules, court decisions, and local recordkeepers. Some families may find evidence of identity shifts across records such as Indian, free person of color, mulatto, colored, Negro, Black, or African American. No single record proves or disproves ancestry. The research process requires comparing names, locations, family clusters, neighbors, treaties, rolls, census entries, land records, and vital records over time.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* URL State Filter Chip */}
        {urlStateFilter && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-[rgba(255,149,0,0.15)] border border-[rgba(255,149,0,0.3)] rounded-full px-4 py-2">
              <Globe size={14} className="text-[#FF9500]" />
              <span className="text-sm text-[#FF9500]">Filtered by {urlStateFilter}</span>
              <button onClick={clearStateFilter} className="ml-1 text-[#C9B99A] hover:text-[#F0EBE1]"><X size={14} /></button>
            </div>
            {stateRecordInfo && (
              <span className="text-xs text-[#C9B99A]/60">{stateRecordInfo.nations.length} nations documented for this state</span>
            )}
          </motion.div>
        )}

        {/* Search + Tabs */}
        <ScrollReveal delay={0.15}>
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C9B99A]/50" />
              <input
                type="text"
                placeholder="Search rolls, laws, tribes, states, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[rgba(27,40,56,0.6)] border border-[rgba(255,149,0,0.15)] rounded-xl pl-11 pr-4 py-3 text-sm text-[#F0EBE1] placeholder-[#C9B99A]/40 focus:outline-none focus:border-[rgba(255,149,0,0.4)] transition-colors"
              />
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'rolls' as const, label: 'Tribal Rolls', icon: Scroll, count: filteredRolls.length },
                { id: 'laws' as const, label: 'Laws & Policies', icon: Landmark, count: filteredLaws.length },
                { id: 'names' as const, label: 'Tribal Names', icon: Users, count: filteredNames.length },
                { id: 'guide' as const, label: 'Research Guide', icon: BookOpen, count: null },
              ].map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 text-xs rounded-lg px-4 py-2.5 border transition-all ${activeTab === tab.id ? 'bg-[rgba(255,149,0,0.2)] border-[rgba(255,149,0,0.4)] text-[#FF9500]' : 'bg-[rgba(27,40,56,0.5)] border-[rgba(255,149,0,0.1)] text-[#C9B99A] hover:border-[rgba(255,149,0,0.25)]'}`}>
                  <tab.icon size={13} /> {tab.label}
                  {tab.count !== null && <span className="text-[10px] bg-[rgba(255,149,0,0.15)] rounded-full px-1.5 py-0.5">{tab.count}</span>}
                </button>
              ))}
            </div>

            {/* Category Filters */}
            {activeTab === 'rolls' && (
              <div className="flex flex-wrap gap-1.5">
                {ROLL_CATEGORIES.map(cat => (
                  <button key={cat.id} onClick={() => setRollCategory(cat.id)}
                    className={`text-[11px] rounded-full px-3 py-1.5 border transition-all ${rollCategory === cat.id ? 'bg-[rgba(255,149,0,0.2)] border-[rgba(255,149,0,0.4)] text-[#FF9500]' : 'bg-transparent border-[rgba(255,149,0,0.1)] text-[#C9B99A]/70 hover:border-[rgba(255,149,0,0.25)]'}`}>
                    {cat.label}
                  </button>
                ))}
              </div>
            )}
            {activeTab === 'laws' && (
              <div className="flex flex-wrap gap-1.5">
                {LAW_CATEGORIES.map(cat => (
                  <button key={cat.id} onClick={() => setLawCategory(cat.id)}
                    className={`text-[11px] rounded-full px-3 py-1.5 border transition-all ${lawCategory === cat.id ? 'bg-[rgba(255,149,0,0.2)] border-[rgba(255,149,0,0.4)] text-[#FF9500]' : 'bg-transparent border-[rgba(255,149,0,0.1)] text-[#C9B99A]/70 hover:border-[rgba(255,149,0,0.25)]'}`}>
                    {cat.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </ScrollReveal>

        {/* TAB CONTENT */}
        <AnimatePresence mode="wait">

          {/* ROLLS TAB */}
          {activeTab === 'rolls' && (
            <motion.div key="rolls" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3">
              {filteredRolls.length === 0 && (
                <div className="text-center py-10"><p className="text-sm text-[#C9B99A]/60">No rolls match your filters. Try adjusting your search.</p></div>
              )}
              {filteredRolls.map(roll => (
                <button key={roll.id} onClick={() => setSelectedRoll(roll)}
                  className="w-full text-left bg-[rgba(27,40,56,0.5)] rounded-xl border border-[rgba(255,149,0,0.1)] hover:border-[rgba(255,149,0,0.3)] p-4 md:p-5 transition-all group">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm md:text-base text-[#F0EBE1] font-medium group-hover:text-[#FF9500] transition-colors">{roll.title}</h4>
                        <span className="text-[10px] text-[#FF9500] bg-[rgba(255,149,0,0.1)] rounded-full px-2 py-0.5 shrink-0">{roll.yearStart}{roll.yearEnd ? `–${roll.yearEnd}` : ''}</span>
                      </div>
                      <p className="text-xs text-[#C9B99A]/70 mb-2 line-clamp-2">{roll.purpose}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {roll.tribes.slice(0, 5).map(t => <span key={t} className="text-[10px] bg-[rgba(27,40,56,0.6)] text-[#C9B99A]/60 rounded px-1.5 py-0.5">{t}</span>)}
                        {roll.tribes.length > 5 && <span className="text-[10px] text-[#C9B99A]/40">+{roll.tribes.length - 5} more</span>}
                      </div>
                    </div>
                    <ArrowRight size={16} className="text-[#C9B99A]/30 group-hover:text-[#FF9500] shrink-0 mt-1 transition-colors" />
                  </div>
                </button>
              ))}
            </motion.div>
          )}

          {/* LAWS TAB */}
          {activeTab === 'laws' && (
            <motion.div key="laws" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3">
              {filteredLaws.length === 0 && (
                <div className="text-center py-10"><p className="text-sm text-[#C9B99A]/60">No laws match your filters. Try adjusting your search.</p></div>
              )}
              {filteredLaws.map(law => (
                <button key={law.id} onClick={() => setSelectedLaw(law)}
                  className="w-full text-left bg-[rgba(27,40,56,0.5)] rounded-xl border border-[rgba(255,149,0,0.1)] hover:border-[rgba(255,149,0,0.3)] p-4 md:p-5 transition-all group">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm md:text-base text-[#F0EBE1] font-medium group-hover:text-[#FF9500] transition-colors">{law.title}</h4>
                        <span className="text-[10px] text-[#FF9500] bg-[rgba(255,149,0,0.1)] rounded-full px-2 py-0.5 shrink-0">{law.year}{law.yearEnd ? `–${law.yearEnd}` : ''}</span>
                      </div>
                      <p className="text-xs text-[#C9B99A]/70 mb-2 line-clamp-2">{law.summary}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {law.tags.slice(0, 6).map(t => <span key={t} className="text-[10px] bg-[rgba(27,40,56,0.6)] text-[#C9B99A]/60 rounded px-1.5 py-0.5">{t}</span>)}
                      </div>
                    </div>
                    <ArrowRight size={16} className="text-[#C9B99A]/30 group-hover:text-[#FF9500] shrink-0 mt-1 transition-colors" />
                  </div>
                </button>
              ))}
            </motion.div>
          )}

          {/* NAMES TAB */}
          {activeTab === 'names' && (
            <motion.div key="names" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {filteredNames.map((entry, i) => (
                  <div key={i} className="bg-[rgba(27,40,56,0.4)] rounded-lg border border-[rgba(255,149,0,0.08)] p-3">
                    <p className="text-sm text-[#F0EBE1] font-medium">{entry.tribalName}</p>
                    <p className="text-xs text-[#FF9500] mt-0.5">= {entry.alternativeNames.join(', ')}</p>
                    {(entry.languageFamily || entry.region) && (
                      <p className="text-[10px] text-[#C9B99A]/50 mt-1">
                        {entry.languageFamily}{entry.languageFamily && entry.region ? ' • ' : ''}{entry.region}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* GUIDE TAB */}
          {activeTab === 'guide' && (
            <motion.div key="guide" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
              {/* 10 Keys */}
              <ExpandableCard title="10 Keys to Recovering Your Indigenous Ancestry" subtitle="Research principles" icon={BookOpen} accent>
                <div className="space-y-3">
                  {[
                    { n: 1, t: 'Records are evidence, not truth.', d: 'A single document cannot prove or disprove your ancestry. Multiple records must be compared over time.' },
                    { n: 2, t: 'Family stories are clues, not proof.', d: 'Oral history is valuable but must be verified through documentation. Stories may contain kernels of truth mixed with changes over generations.' },
                    { n: 3, t: 'People moved frequently.', d: 'Your ancestors may have lived in multiple states. Migration paths, seasonal movement, and displacement all affected where records were created.' },
                    { n: 4, t: 'Counties and state boundaries changed.', d: 'A family in the same location might appear in different counties across census years due to boundary changes.' },
                    { n: 5, t: 'Tribal rolls are only one record type.', d: 'The Dawes Rolls are important but many Indigenous peoples were never enrolled. Search census, land, military, church, and vital records too.' },
                    { n: 6, t: 'Not all Indigenous people enrolled.', d: 'Many avoided enrollment due to distrust of the government, lived outside reservation areas, or belonged to unrecognized tribes.' },
                    { n: 7, t: 'Identity changed across records.', d: 'The same person might be recorded as "Indian" in 1870, "mulatto" in 1880, and "colored" in 1900. These shifts reflect classification systems, not identity changes.' },
                    { n: 8, t: 'Communities were sometimes reclassified.', d: 'Under laws like the Racial Integrity Act of 1924, entire Indigenous communities were reclassified as "colored" by government officials.' },
                    { n: 9, t: 'Follow locations, families, and neighbors.', d: 'Research the community around your ancestors. Neighbors, church members, and in-laws often had the same background and may appear in tribal records.' },
                    { n: 10, t: 'Absence of a record does not mean absence of ancestry.', d: 'Many records were destroyed, lost, or never created. Not finding your ancestor on one roll does not disprove Indigenous heritage.' },
                  ].map(point => (
                    <div key={point.n} className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[rgba(255,149,0,0.1)] border border-[rgba(255,149,0,0.2)] text-[10px] text-[#FF9500] font-bold shrink-0">{point.n}</span>
                      <div><p className="text-sm text-[#F0EBE1] font-medium">{point.t}</p><p className="text-xs text-[#C9B99A]/70 mt-0.5">{point.d}</p></div>
                    </div>
                  ))}
                </div>
              </ExpandableCard>

              {/* Start With What You Know */}
              <ExpandableCard title="Start With What You Know" subtitle="Gather your family information" icon={FileText}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {['Full name (including nicknames)', 'Surname variants', 'Birthplace', 'Death place', 'County', 'State', 'Parents\' names', 'Grandparents\' names', 'Neighbors', 'Church', 'Cemetery', 'Military service', 'Land ownership', 'Oral history', 'Migration path'].map(item => (
                    <div key={item} className="flex items-center gap-2 text-sm text-[#C9B99A]"><ArrowRight size={12} className="text-[#FF9500]/50 shrink-0" />{item}</div>
                  ))}
                </div>
                <p className="text-xs text-[#C9B99A]/60 mt-3 leading-relaxed">
                  Start with your known family line, then compare names, locations, dates, neighbors, and record categories over time. A family may appear under different racial or legal labels in different records.
                </p>
              </ExpandableCard>

              {/* How to Use Map */}
              <ExpandableCard title="Using the Soul Tribe Map for Research" subtitle="Connect map data with records" icon={Globe} accent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { t: 'Find Your State', d: 'Click your ancestors\' state. See which tribes were documented there.' },
                    { t: 'Study the Laws', d: 'Each state shows laws used to classify your people.' },
                    { t: 'Check Treaties', d: 'Expand treaties to see what agreements affected your ancestors.' },
                    { t: 'Get Vital Records', d: 'Each state provides birth/death cert contacts.' },
                    { t: 'Cross-Reference Dawes', d: 'If removal occurred, search Dawes Rolls for relocated members.' },
                    { t: 'Contact Tribal Offices', d: 'Each tribe profile has links to enrollment offices.' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 bg-[rgba(21,32,43,0.5)] rounded-lg p-3">
                      <ArrowRight size={14} className="text-[#FF9500] shrink-0 mt-0.5" />
                      <div><p className="text-sm text-[#F0EBE1] font-medium">{item.t}</p><p className="text-xs text-[#C9B99A]/60">{item.d}</p></div>
                    </div>
                  ))}
                </div>
              </ExpandableCard>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Disclaimer */}
        <ScrollReveal>
          <div className="bg-[rgba(255,149,0,0.04)] rounded-xl border border-[rgba(255,149,0,0.1)] p-4 flex items-start gap-3">
            <AlertTriangle size={16} className="text-[#FF9500]/60 shrink-0 mt-0.5" />
            <p className="text-xs text-[#C9B99A]/60 leading-relaxed">
              <strong className="text-[#C9B99A]">Historical Research Disclaimer:</strong> The information presented here is for educational and genealogical research purposes. We are not affiliated with any tribal enrollment office. Enrollment decisions are made by sovereign tribal governments. This site presents historical facts about racial reclassification laws and their documented impact on Indigenous peoples. Always verify records through official sources.
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {selectedRoll && <RollModal roll={selectedRoll} onClose={() => setSelectedRoll(null)} />}
        {selectedLaw && <LawModal law={selectedLaw} onClose={() => setSelectedLaw(null)} />}
      </AnimatePresence>
    </section>
  )
}
