import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Map, ChevronUp, ChevronDown, ExternalLink, Phone, Globe, FileText,
  Landmark, Dna, Scroll, BookOpen, Users, MapPin, AlertTriangle, X,
  Plus, Minus, Maximize2, MousePointerClick, Database, ChevronRight,
  Search, Mic, MicOff, Info, Feather, Crown
} from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'
import { STATE_DATA, POPULAR_STATES, STATE_COORDS, TRIBE_DB, TREATY_DB } from '../data/heritageData'
import type { TribeDetail } from '../data/heritageData'
import { jamaicaNations, haitiNations, caribbeanNations, canadaNations, mexicoNations, centralAmericaNations, southAmericaNations } from '../data/panIndigenousData'
import CountryDetailModal from '../components/CountryDetailModal'
import { ALL_TERRITORIES, TERRITORY_BY_ID, searchTerritories, type TerritoryMarker, REGION_LABELS } from '../data/territoryMarkers'

// Public Mapbox token
const _t1 = 'pk.eyJ1IjoidGFzYXR1IiwiYSI6ImNtcXI4azdsYjBqMmYycXB5cjIzdDR5a24ifQ'
const _t2 = 'zySytuwfrnOm3SVHMLdglA'
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || (_t1 + '.' + _t2)

// ============================================
// VOICE SEARCH HOOK
// ============================================
function useVoiceSearch(onResult: (text: string) => void) {
  const [isListening, setIsListening] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    setIsSupported(!!SpeechRecognitionAPI)
    if (SpeechRecognitionAPI) {
      const rec = new SpeechRecognitionAPI()
      rec.continuous = false
      rec.interimResults = true
      rec.lang = 'en-US'
      rec.onstart = () => setIsListening(true)
      rec.onend = () => setIsListening(false)
      rec.onerror = () => setIsListening(false)
      rec.onresult = (event: any) => {
        const transcript = Array.from(event.results).map((r: any) => r[0].transcript).join('')
        if (event.results[0].isFinal) onResult(transcript)
      }
      recognitionRef.current = rec
    }
    return () => { recognitionRef.current?.abort() }
  }, [onResult])

  const toggle = useCallback(() => {
    if (!recognitionRef.current) return
    if (isListening) recognitionRef.current.stop()
    else recognitionRef.current.start()
  }, [isListening])

  return { isListening, isSupported, toggle }
}

// ============================================
// TERRITORY DETAIL PANEL (inline, below map)
// ============================================
function TerritoryDetailPanel({
  territory,
  onClose,
}: {
  territory: TerritoryMarker
  onClose: () => void
}) {
  // Get nations data based on territory
  const getNationData = () => {
    // Jamaica — full research
    if (territory.id === 'jm') {
      return { type: 'full' as const, nations: jamaicaNations }
    }
    // Haiti — full research
    if (territory.id === 'ht') {
      return { type: 'full' as const, nations: haitiNations }
    }
    // Caribbean nations
    if (territory.region === 'caribbean') {
      const countryMap: Record<string, string> = {
        cu: 'Cuba', pr: 'Puerto Rico', do: 'Dominican Republic',
        bs: 'Bahamas', tt: 'Trinidad & Tobago', ag: 'Antigua & Barbuda',
        dm: 'Dominica', gd: 'Grenada', kn: 'St. Kitts & Nevis',
        lc: 'St. Lucia', vc: 'St. Vincent', bb: 'Barbados',
        vi: 'US Virgin Islands', ky: 'Cayman Islands', tc: 'Turks & Caicos',
        gp: 'Guadeloupe', mq: 'Martinique', aw: 'Aruba', cw: 'Curacao', bo: 'Bonaire'
      }
      const countryName = countryMap[territory.id]
      if (countryName) {
        const filtered = caribbeanNations.filter(n => n.country === countryName)
        if (filtered.length > 0) return { type: 'partial' as const, nations: filtered }
      }
    }
    // Canada
    if (territory.region === 'canada') {
      const filtered = canadaNations.filter(n => n.country === territory.name)
      if (filtered.length > 0) return { type: 'partial' as const, nations: filtered }
    }
    // Mexico
    if (territory.region === 'mexico') {
      const filtered = mexicoNations.filter(n => n.country === territory.name)
      if (filtered.length > 0) return { type: 'partial' as const, nations: filtered }
    }
    // Central America
    if (territory.region === 'centralAmerica') {
      const filtered = centralAmericaNations.filter(n => n.country === territory.name)
      if (filtered.length > 0) return { type: 'partial' as const, nations: filtered }
    }
    // South America
    if (territory.region === 'southAmerica') {
      const filtered = southAmericaNations.filter(n => n.country === territory.name)
      if (filtered.length > 0) return { type: 'partial' as const, nations: filtered }
    }
    // Everything else — use territory.nations as the list
    return { type: 'territory' as const, nations: territory.nations }
  }

  const nationData = getNationData()
  const regionInfo = REGION_LABELS[territory.region] || { label: territory.region, color: '#C9B99A' }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="bg-[#15202B] rounded-xl border border-[rgba(255,149,0,0.25)] overflow-hidden shadow-2xl"
      style={{ borderLeft: '4px solid #FF9500' }}
    >
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#15202B]/95 backdrop-blur-md border-b border-[rgba(255,149,0,0.15)] p-4 md:p-5 flex items-center justify-between">
        <div className="flex items-center gap-3 flex-wrap">
          <div>
            <h3 className="text-xl md:text-2xl text-[#F0EBE1] font-medium">{territory.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span
                className="text-[10px] uppercase tracking-[0.1em] px-2 py-0.5 rounded-full"
                style={{ color: regionInfo.color, backgroundColor: `${regionInfo.color}15`, border: `1px solid ${regionInfo.color}30` }}
              >
                {regionInfo.label}
              </span>
              <span className="text-xs text-[#C9B99A]/50">
                {territory.nations.length} Indigenous Nations Documented
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="flex items-center justify-center w-9 h-9 rounded-full bg-[rgba(255,149,0,0.1)] border border-[rgba(255,149,0,0.2)] text-[#C9B99A] hover:text-[#FF9500] hover:bg-[rgba(255,149,0,0.2)] transition-all shrink-0"
        >
          <X size={18} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 md:p-5 space-y-5 max-h-[70vh] overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,149,0,0.3) transparent' }}>
        {/* Description */}
        <div className="bg-[rgba(27,40,56,0.5)] rounded-lg border border-[rgba(255,149,0,0.12)] p-4">
          <h4 className="text-xs text-[#FF9500] uppercase tracking-[0.04em] mb-2 flex items-center gap-2">
            <Info size={14} /> About {territory.name}
          </h4>
          <p className="text-sm text-[#C9B99A] leading-relaxed">{territory.description}</p>
        </div>

        {/* Indigenous Nations */}
        {'type' in nationData && nationData.type === 'territory' ? (
          // Territory-level data (no full nation objects)
          <div className="bg-[rgba(27,40,56,0.5)] rounded-lg border border-[rgba(255,149,0,0.12)] p-4">
            <h4 className="text-xs text-[#FF9500] uppercase tracking-[0.04em] mb-3 flex items-center gap-2">
              <Dna size={14} /> Indigenous Nations of {territory.name}
            </h4>
            <div className="flex flex-wrap gap-2">
              {(nationData.nations as string[]).map((nation) => (
                <span
                  key={nation}
                  className="text-xs bg-[rgba(255,149,0,0.08)] border border-[rgba(255,149,0,0.2)] text-[#F0EBE1] rounded-lg px-3 py-1.5"
                >
                  {nation}
                </span>
              ))}
            </div>
            <div className="mt-4 bg-[rgba(255,149,0,0.05)] rounded-lg border border-[rgba(255,149,0,0.1)] p-3">
              <p className="text-xs text-[#FF9500]/70 flex items-start gap-2">
                <Database size={12} className="shrink-0 mt-0.5" />
                Detailed research documents for each nation are being compiled. Check back soon for expanded tribal histories, population data, language families, and current status reports.
              </p>
            </div>
          </div>
        ) : (
          // Full or partial nation data
          <div className="space-y-3">
            <h4 className="text-xs text-[#FF9500] uppercase tracking-[0.04em] flex items-center gap-2">
              <Dna size={14} /> Indigenous Nations — {(nationData.nations as any[]).length} Documented
            </h4>
            {(nationData.nations as any[]).map((nation: any) => (
              <motion.div
                key={nation.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-[rgba(27,40,56,0.5)] rounded-lg border border-[rgba(255,149,0,0.12)] p-4"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h5 className="text-base text-[#F0EBE1] font-medium">{nation.name}</h5>
                    {nation.indigenousName && (
                      <p className="text-xs text-[#FF9500]/60 italic">{nation.indigenousName}</p>
                    )}
                  </div>
                  <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[rgba(255,149,0,0.1)] text-[#FF9500] border border-[rgba(255,149,0,0.15)] shrink-0">
                    {nation.category || 'Indigenous'}
                  </span>
                </div>

                {nation.alternateNames?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {nation.alternateNames.map((aka: string) => (
                      <span key={aka} className="text-[10px] bg-[rgba(255,149,0,0.08)] text-[#FFB840] rounded px-2 py-0.5">
                        Also: {aka}
                      </span>
                    ))}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3">
                  {nation.location && (
                    <div className="flex items-start gap-1.5">
                      <MapPin size={11} className="text-[#FF9500] shrink-0 mt-0.5" />
                      <span className="text-[#C9B99A]">{nation.location}</span>
                    </div>
                  )}
                  {nation.population && (
                    <div className="flex items-start gap-1.5">
                      <Users size={11} className="text-[#FF9500] shrink-0 mt-0.5" />
                      <span className="text-[#C9B99A]">{nation.population}</span>
                    </div>
                  )}
                  {nation.language && (
                    <div className="flex items-start gap-1.5">
                      <BookOpen size={11} className="text-[#FF9500] shrink-0 mt-0.5" />
                      <span className="text-[#C9B99A]">{nation.language}</span>
                    </div>
                  )}
                  {nation.status && (
                    <div className="flex items-start gap-1.5">
                      <FileText size={11} className="text-[#FF9500] shrink-0 mt-0.5" />
                      <span className="text-[#C9B99A]">{nation.status}</span>
                    </div>
                  )}
                </div>

                {nation.history && (
                  <div className="mb-2">
                    <p className="text-[10px] text-[#FF9500] uppercase mb-1">History</p>
                    <p className="text-xs text-[#C9B99A] leading-relaxed">{nation.history}</p>
                  </div>
                )}

                {nation.currentIssues && (
                  <div>
                    <p className="text-[10px] text-[#FF9500] uppercase mb-1">Current Status</p>
                    <p className="text-xs text-[#C9B99A] leading-relaxed">{nation.currentIssues}</p>
                  </div>
                )}

                {nation.researchDocument && (
                  <div className="mt-3 pt-3 border-t border-[rgba(255,149,0,0.1)]">
                    <p className="text-[10px] text-[#FF9500] uppercase mb-2 flex items-center gap-1">
                      <Scroll size={10} /> Research Document: {nation.researchDocument.title}
                    </p>
                    <div className="space-y-2">
                      {nation.researchDocument.sections?.slice(0, 3).map((section: any, i: number) => (
                        <div key={i} className="bg-[rgba(12,21,32,0.4)] rounded p-2.5 border border-[rgba(255,149,0,0.06)]">
                          <p className="text-[10px] text-[#FF9500] font-medium mb-1">{section.heading}</p>
                          <p className="text-[11px] text-[#C9B99A] leading-relaxed">{section.content}</p>
                        </div>
                      ))}
                      {nation.researchDocument.sections?.length > 3 && (
                        <p className="text-[10px] text-[#C9B99A]/40 italic">
                          +{nation.researchDocument.sections.length - 3} more sections
                        </p>
                      )}
                    </div>
                    {nation.researchDocument.sources?.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-[rgba(255,149,0,0.06)]">
                        <p className="text-[9px] text-[#C9B99A]/30">Sources: {nation.researchDocument.sources.join(', ')}</p>
                      </div>
                    )}
                  </div>
                )}

                {nation.resources?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3 pt-2 border-t border-[rgba(255,149,0,0.1)]">
                    {nation.resources.map((r: any) => (
                      <a key={r.label} href={r.url} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[10px] text-[#FF9500] border border-[rgba(255,149,0,0.3)] rounded px-2.5 py-1 hover:bg-[rgba(255,149,0,0.1)] transition-colors">
                        <ExternalLink size={9} /> {r.label}
                      </a>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Coordinates */}
        <div className="bg-[rgba(27,40,56,0.3)] rounded-lg border border-[rgba(255,149,0,0.08)] p-3">
          <p className="text-[10px] text-[#C9B99A]/40 flex items-center gap-2">
            <MapPin size={10} />
            Coordinates: {territory.coords[1].toFixed(4)}, {territory.coords[0].toFixed(4)} —
            Research by AASOTU Media Group LLC
          </p>
        </div>
      </div>
    </motion.div>
  )
}

// ============================================
// TRIBE DETAIL PANEL (for US states)
// ============================================
function TribeDetailPanel({ tribeName, onClose }: { tribeName: string; onClose: () => void }) {
  const tribe = TRIBE_DB[tribeName] as TribeDetail | undefined
  if (!tribe) return (
    <div className="bg-[rgba(27,40,56,0.7)] rounded border border-[rgba(255,149,0,0.15)] p-5">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-[#F0EBE1]">{tribeName}</p>
        <button onClick={onClose} className="text-[#C9B99A] hover:text-[#FF9500]"><ChevronUp size={18} /></button>
      </div>
      <p className="text-xs text-[#C9B99A]">Detailed information is being compiled for this nation. Check back soon.</p>
    </div>
  )
  // ... existing full tribe detail panel code
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="bg-[rgba(27,40,56,0.85)] backdrop-blur-lg rounded border border-[rgba(255,149,0,0.3)] p-5 md:p-6 space-y-4"
      style={{ borderLeft: '3px solid #FF9500' }}
    >
      <div className="flex items-center justify-between">
        <h4 className="text-lg text-[#F0EBE1]">{tribe.name}</h4>
        <button onClick={onClose} className="text-[#C9B99A] hover:text-[#FF9500] transition-colors"><ChevronUp size={18} /></button>
      </div>
      {tribe.alsoKnownAs.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tribe.alsoKnownAs.map((aka: string) => (
            <span key={aka} className="text-xs bg-[rgba(255,149,0,0.1)] text-[#FFB840] rounded px-2 py-0.5">Also: {aka}</span>
          ))}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
        <div className="flex items-start gap-2"><MapPin size={14} className="text-[#FF9500] shrink-0 mt-1" /><div><span className="text-[#C9B99A]">Location:</span> <span className="text-[#F0EBE1]">{tribe.location}</span></div></div>
        <div className="flex items-start gap-2"><FileText size={14} className="text-[#FF9500] shrink-0 mt-1" /><div><span className="text-[#C9B99A]">Status:</span> <span className="text-[#F0EBE1]">{tribe.status}</span></div></div>
        <div className="flex items-start gap-2"><Users size={14} className="text-[#FF9500] shrink-0 mt-1" /><div><span className="text-[#C9B99A]">Population:</span> <span className="text-[#F0EBE1]">{tribe.population}</span></div></div>
        <div className="flex items-start gap-2"><BookOpen size={14} className="text-[#FF9500] shrink-0 mt-1" /><div><span className="text-[#C9B99A]">Language:</span> <span className="text-[#F0EBE1]">{tribe.language}</span></div></div>
      </div>
      <div><h5 className="text-xs text-[#FF9500] uppercase tracking-[0.04em] mb-2">History</h5><p className="text-sm text-[#C9B99A] leading-relaxed">{tribe.history}</p></div>
      <div><h5 className="text-xs text-[#FF9500] uppercase tracking-[0.04em] mb-2">Current Status</h5><p className="text-sm text-[#C9B99A] leading-relaxed">{tribe.currentStatus}</p></div>
      {tribe.resources.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2 border-t border-[rgba(255,149,0,0.1)]">
          {tribe.resources.map((r: { label: string; url: string }) => (
            <a key={r.label} href={r.url} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-[#FF9500] border border-[rgba(255,149,0,0.3)] rounded px-3 py-1.5 hover:bg-[rgba(255,149,0,0.1)] transition-colors">
              <ExternalLink size={10} /> {r.label}
            </a>
          ))}
        </div>
      )}
    </motion.div>
  )
}

// ============================================
// EXPANDABLE TREATY
// ============================================
function TreatyExpand({ stateKey, treatyIndex }: { stateKey: string; treatyIndex: number }) {
  const [isOpen, setIsOpen] = useState(false)
  const treaties = TREATY_DB[stateKey]
  if (!treaties || !treaties[treatyIndex]) {
    const state = STATE_DATA[stateKey]
    if (!state || !state.treaties[treatyIndex]) return null
    const t = state.treaties[treatyIndex]
    return (
      <div className="border-l-2 border-[rgba(201,185,154,0.3)] pl-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#C9B99A]">{t.year}</span>
          <span className="text-sm text-[#F0EBE1]">{t.name}</span>
        </div>
        <p className="text-xs text-[#C9B99A] mt-1">{t.desc}</p>
      </div>
    )
  }
  const treaty = treaties[treatyIndex]
  return (
    <div className="border-l-2 border-[rgba(201,185,154,0.3)] pl-3">
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 text-left w-full group">
        <span className="text-xs text-[#C9B99A]">{treaty.year}</span>
        <span className="text-sm text-[#F0EBE1] group-hover:text-[#FF9500] transition-colors">{treaty.name}</span>
        {isOpen ? <ChevronUp size={14} className="text-[#FF9500]" /> : <ChevronDown size={14} className="text-[#C9B99A]" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="mt-2 space-y-2 overflow-hidden">
            <p className="text-xs text-[#FF9500] uppercase tracking-[0.04em]">Full Details</p>
            <div className="bg-[rgba(12,21,32,0.6)] rounded p-3 border border-[rgba(255,149,0,0.1)]">
              <p className="text-sm text-[#C9B99A] leading-relaxed whitespace-pre-line">{treaty.fullText}</p>
            </div>
            {treaty.signatories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <span className="text-xs text-[#C9B99A]">Signatories:</span>
                {treaty.signatories.map((s: string) => (
                  <span key={s} className="text-xs bg-[rgba(255,149,0,0.1)] text-[#F0EBE1] rounded px-2 py-0.5">{s}</span>
                ))}
              </div>
            )}
            <p className="text-xs text-[#FFB840] italic">{treaty.impact}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ============================================
// STATE DETAIL MODAL
// ============================================
function StateDetailModal({ stateKey, onClose }: { stateKey: string; onClose: () => void }) {
  const [selectedTribe, setSelectedTribe] = useState<string | null>(null)
  const stateData = STATE_DATA[stateKey]
  if (!stateData) return null

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <motion.div initial={{ opacity: 0, scale: 0.92, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-xl border border-[rgba(255,149,0,0.25)] bg-[#15202B] shadow-2xl"
        style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,149,0,0.3) transparent' }}>
        <div className="sticky top-0 z-10 bg-[#15202B]/95 backdrop-blur-md border-b border-[rgba(255,149,0,0.15)] p-4 md:p-5 flex items-center justify-between" style={{ borderLeft: '4px solid #FF9500' }}>
          <div>
            <h3 className="text-xl md:text-2xl text-[#F0EBE1] font-medium">{stateKey}</h3>
            <p className="text-sm text-[#C9B99A] mt-0.5">{stateData.tribes.length} Indigenous Nations Documented</p>
          </div>
          <button onClick={onClose}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-[rgba(255,149,0,0.1)] border border-[rgba(255,149,0,0.2)] text-[#C9B99A] hover:text-[#FF9500] hover:bg-[rgba(255,149,0,0.2)] transition-all shrink-0 ml-3">
            <X size={18} />
          </button>
        </div>
        <div className="p-4 md:p-5 space-y-4">
          <div className="bg-[rgba(27,40,56,0.5)] rounded-lg border border-[rgba(255,149,0,0.12)] p-4">
            <h4 className="text-xs text-[#FF9500] uppercase tracking-[0.04em] mb-3 flex items-center gap-2">
              <Dna size={14} /> Indigenous Nations — Tap to Explore
            </h4>
            <div className="flex flex-wrap gap-2">
              {stateData.tribes.map((tribe) => (
                <button key={tribe} onClick={() => setSelectedTribe(selectedTribe === tribe ? null : tribe)}
                  className={`text-xs rounded-lg px-3 py-1.5 border transition-all ${selectedTribe === tribe ? 'bg-[rgba(255,149,0,0.25)] border-[rgba(255,149,0,0.5)] text-[#FF9500]' : 'bg-[rgba(255,149,0,0.06)] border-[rgba(255,149,0,0.15)] text-[#F0EBE1] hover:bg-[rgba(255,149,0,0.12)]'}`}>
                  {tribe}
                </button>
              ))}
            </div>
            <AnimatePresence>
              {selectedTribe && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="mt-4 overflow-hidden">
                  <TribeDetailPanel tribeName={selectedTribe} onClose={() => setSelectedTribe(null)} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {stateData.laws.length > 0 && (
            <div className="bg-[rgba(27,40,56,0.5)] rounded-lg border border-[rgba(255,149,0,0.12)] p-4">
              <h4 className="text-xs text-[#FF9500] uppercase tracking-[0.04em] mb-3 flex items-center gap-2"><Landmark size={14} /> Laws & Policies</h4>
              <div className="space-y-3">
                {stateData.laws.map((law, i) => (
                  <div key={i} className="border-l-2 border-[rgba(255,149,0,0.25)] pl-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#FF9500] font-medium">{law.year}</span>
                      <span className="text-sm text-[#F0EBE1]">{law.name}</span>
                    </div>
                    <p className="text-xs text-[#C9B99A] mt-1 leading-relaxed">{law.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {stateData.treaties.length > 0 && (
            <div className="bg-[rgba(27,40,56,0.5)] rounded-lg border border-[rgba(255,149,0,0.12)] p-4">
              <h4 className="text-xs text-[#FF9500] uppercase tracking-[0.04em] mb-3 flex items-center gap-2"><Scroll size={14} /> Treaties & Agreements</h4>
              <div className="space-y-3">
                {stateData.treaties.map((_, i) => (<TreatyExpand key={i} stateKey={stateKey} treatyIndex={i} />))}
              </div>
            </div>
          )}
          <div className="bg-[rgba(27,40,56,0.5)] rounded-lg border border-[rgba(255,149,0,0.12)] p-4">
            <h4 className="text-xs text-[#FF9500] uppercase tracking-[0.04em] mb-3 flex items-center gap-2"><FileText size={14} /> Vital Records & Genealogy Resources</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2"><Landmark size={14} className="text-[#C9B99A] shrink-0 mt-0.5" /><div><p className="text-[#F0EBE1]">{stateData.vitalRecords.office}</p><p className="text-xs text-[#C9B99A]">{stateData.vitalRecords.address}</p></div></div>
              <div className="flex items-center gap-2"><Phone size={14} className="text-[#C9B99A] shrink-0" /><span className="text-[#C9B99A]">{stateData.vitalRecords.phone}</span></div>
              <div className="flex items-center gap-2"><Globe size={14} className="text-[#C9B99A] shrink-0" /><a href={stateData.vitalRecords.website} target="_blank" rel="noopener noreferrer" className="text-xs text-[#FF9500] hover:underline">Vital Records Website <ExternalLink size={10} className="inline" /></a></div>
              <div className="border-t border-[rgba(255,149,0,0.1)] pt-2 mt-2">
                <p className="text-xs text-[#FF9500] uppercase mb-1">Death Certificates</p>
                <p className="text-xs text-[#C9B99A]">{stateData.vitalRecords.deathCertProcess}</p>
              </div>
              <div>
                <p className="text-xs text-[#FF9500] uppercase mb-1">Birth Certificates</p>
                <p className="text-xs text-[#C9B99A]">{stateData.vitalRecords.birthCertProcess}</p>
              </div>
              {stateData.vitalRecords.indianAffairs && (
                <div className="border-t border-[rgba(255,149,0,0.1)] pt-2">
                  <p className="text-xs text-[#FF9500] uppercase mb-1">Indian Affairs Contact</p>
                  <p className="text-xs text-[#C9B99A]">{stateData.vitalRecords.indianAffairs}</p>
                </div>
              )}
            </div>
          </div>
          <div className="bg-[rgba(255,149,0,0.08)] rounded-lg border border-[rgba(255,149,0,0.2)] p-4">
            <h4 className="text-xs text-[#FF9500] uppercase tracking-[0.04em] mb-2 flex items-center gap-2"><Database size={14} /> Ancestry / Receipts</h4>
            <p className="text-xs text-[#C9B99A]/70 mb-3 leading-relaxed">Search tribal rolls, reclassification laws, treaties, and genealogy databases related to {stateKey}.</p>
            <a href={`/#ancestry?state=${encodeURIComponent(stateKey)}`} onClick={(e) => { e.preventDefault(); onClose(); window.location.hash = `/ancestry?state=${encodeURIComponent(stateKey)}` }}
              className="inline-flex items-center gap-2 text-xs bg-[rgba(255,149,0,0.15)] text-[#FF9500] rounded-lg px-4 py-2 border border-[rgba(255,149,0,0.3)] hover:bg-[rgba(255,149,0,0.25)] transition-colors font-medium">
              <Scroll size={12} /> View Related Rolls & Records
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ============================================
// IN-MAP POPUP
// ============================================
function createMapPopup(
  mapboxgl: any, map: any, territory: TerritoryMarker,
  onExplore: () => void, onClose: () => void
) {
  document.querySelectorAll('.mapboxgl-popup').forEach((el) => el.remove())
  const popupNode = document.createElement('div')
  popupNode.innerHTML = `
    <div style="background:rgba(21,32,43,0.95);backdrop-filter:blur(12px);border:1px solid rgba(255,149,0,0.3);border-radius:12px;padding:12px 16px;min-width:220px;max-width:280px;box-shadow:0 8px 32px rgba(0,0,0,0.5);font-family:'Newsreader',Georgia,serif;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
        <span style="font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#FF9500;font-weight:600;">${territory.region}</span>
        <button id="popup-close-btn" style="background:none;border:none;color:#C9B99A;cursor:pointer;padding:2px;line-height:1;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
      <h3 style="font-size:16px;color:#F0EBE1;margin:0 0 4px 0;font-weight:500;">${territory.name}</h3>
      <p style="font-size:12px;color:#C9B99A;margin:0 0 10px 0;line-height:1.4;">${territory.description}</p>
      <div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:10px;">
        ${territory.nations.slice(0, 4).map((n: string) => `<span style="font-size:10px;color:#FFB840;background:rgba(255,149,0,0.1);border-radius:4px;padding:2px 6px;">${n}</span>`).join('')}
        ${territory.nations.length > 4 ? `<span style="font-size:10px;color:#C9B99A60;">+${territory.nations.length - 4} more</span>` : ''}
      </div>
      <button id="popup-explore-btn" style="width:100%;display:flex;align-items:center;justify-content:center;gap:6px;background:rgba(255,149,0,0.12);border:1px solid rgba(255,149,0,0.35);border-radius:8px;padding:8px 12px;color:#FF9500;font-size:13px;font-weight:500;cursor:pointer;transition:all 0.2s;font-family:inherit;" onmouseover="this.style.background='rgba(255,149,0,0.2')" onmouseout="this.style.background='rgba(255,149,0,0.12)'">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
        Explore ${territory.name}
      </button>
    </div>`
  const popup = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, anchor: 'bottom', offset: [0, -8], className: 'territory-explore-popup' })
    .setLngLat(territory.coords).setDOMContent(popupNode).addTo(map)
  setTimeout(() => {
    const exploreBtn = popupNode.querySelector('#popup-explore-btn')
    const closeBtn = popupNode.querySelector('#popup-close-btn')
    if (exploreBtn) exploreBtn.addEventListener('click', (e) => { e.stopPropagation(); popup.remove(); onExplore() })
    if (closeBtn) closeBtn.addEventListener('click', (e) => { e.stopPropagation(); popup.remove(); onClose() })
  }, 10)
  return popup
}

// ============================================
// MAP + STATE SELECTOR
// ============================================
const COUNTRY_MARKERS: Record<string, { name: string; coords: [number, number]; nations: typeof jamaicaNations }> = {
  jamaica: { name: 'Jamaica', coords: [-77.2975, 18.1096], nations: jamaicaNations },
  haiti: { name: 'Haiti', coords: [-72.2852, 18.9712], nations: haitiNations },
  cuba: { name: 'Cuba', coords: [-77.7812, 21.5218], nations: caribbeanNations.filter(n => n.country === 'Cuba') },
  puertoRico: { name: 'Puerto Rico', coords: [-66.5901, 18.2208], nations: caribbeanNations.filter(n => n.country === 'Puerto Rico') },
  dominicanRepublic: { name: 'Dominican Republic', coords: [-70.1627, 18.7357], nations: caribbeanNations.filter(n => n.country === 'Dominican Republic') },
  bahamas: { name: 'Bahamas', coords: [-77.3963, 25.0343], nations: caribbeanNations.filter(n => n.country === 'Bahamas') },
  trinidadTobago: { name: 'Trinidad & Tobago', coords: [-61.2225, 10.6918], nations: caribbeanNations.filter(n => n.country === 'Trinidad & Tobago') },
}

function HeritageMap({
  onTerritorySelect,
  onStateSelect,
  mapRef: externalMapRef,
}: {
  onTerritorySelect: (t: TerritoryMarker) => void
  onStateSelect: (state: string) => void
  mapRef?: React.MutableRefObject<any>
}) {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const mapboxglRef = useRef<any>(null)
  const popupRef = useRef<any>(null)
  const [selectedState, setSelectedState] = useState<string | null>(null)
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [focusedTerritory, setFocusedTerritory] = useState<string | null>(null)
  const [mapError, setMapError] = useState<string | null>(null)

  // Expose map ref to parent
  useEffect(() => {
    if (externalMapRef) {
      (externalMapRef as any).current = { scrollIntoView: () => {
        mapContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }}
    }
  }, [externalMapRef])

  useEffect(() => {
    const token = MAPBOX_TOKEN
    if (!token) { setMapError('Loading satellite map...'); return }
    let cancelled = false
    import('mapbox-gl').then((mb) => {
      if (cancelled) return
      const mapboxgl = mb.default
      mapboxglRef.current = mapboxgl
      mapboxgl.accessToken = token
      const map = new mapboxgl.Map({
        container: mapContainerRef.current!,
        style: 'mapbox://styles/mapbox/satellite-streets-v12',
        center: [-95, 38], zoom: 3.5, interactive: true,
        attributionControl: false, cooperativeGestures: true,
      })
      mapRef.current = map
      if (externalMapRef) (externalMapRef as any).current = map

      map.on('load', () => {
        map.setFog({ color: 'rgb(12, 21, 32)', 'high-color': 'rgb(27, 40, 56)', 'horizon-blend': 0.4, 'space-color': 'rgb(12, 21, 32)', 'star-intensity': 0.3 })
        map.setPaintProperty('satellite', 'raster-opacity', 0.7)

        ALL_TERRITORIES.forEach((territory) => {
          const markerEl = document.createElement('div')
          markerEl.className = 'territory-marker'
          const sz = territory.region === 'southAmerica' ? 14 : 16
          markerEl.innerHTML = `
            <div style="width:${sz}px;height:${sz}px;border-radius:50%;background:rgba(255,149,0,0.75);border:2px solid #FF9500;box-shadow:0 0 8px rgba(255,149,0,0.5);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:transform 0.2s;">
              <div style="width:4px;height:4px;border-radius:50%;background:#F0EBE1;"></div>
            </div>
            <div style="position:absolute;top:${sz+4}px;left:50%;transform:translateX(-50%);white-space:nowrap;font-size:8px;font-weight:600;color:#FF9500;text-shadow:0 1px 2px rgba(0,0,0,0.9);pointer-events:none;">${territory.name}</div>
          `
          markerEl.style.position = 'relative'
          const dot = markerEl.querySelector('div')!
          markerEl.addEventListener('mouseenter', () => { dot.style.transform = 'scale(1.3)' })
          markerEl.addEventListener('mouseleave', () => { dot.style.transform = 'scale(1)' })
          markerEl.addEventListener('click', (e) => {
            e.stopPropagation()
            setFocusedTerritory(territory.id)
            map.flyTo({ center: territory.coords, zoom: territory.zoom, duration: 2000 })
          })
          new mapboxgl.Marker({ element: markerEl, anchor: 'center' })
            .setLngLat(territory.coords).addTo(map)
        })

        map.on('click', (e: any) => {
          if (popupRef.current) { popupRef.current.remove(); popupRef.current = null }
          const lng = e.lngLat.lng, lat = e.lngLat.lat
          for (const t of ALL_TERRITORIES) {
            const dist = Math.sqrt(Math.pow(lng - t.coords[0], 2) + Math.pow(lat - t.coords[1], 2))
            if (dist < 5.0) { setFocusedTerritory(t.id); map.flyTo({ center: t.coords, zoom: t.zoom, duration: 2000 }); return }
          }
          fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?types=region&access_token=${token}`)
            .then(r => r.json()).then(data => {
              if (data.features?.length > 0) {
                const placeName = data.features[0].place_name.toLowerCase()
                const stateMatch = Object.keys(STATE_DATA).find(s => placeName.includes(s.toLowerCase()))
                if (stateMatch) { setSelectedState(stateMatch) }
                else {
                  const t = ALL_TERRITORIES.find(x => placeName.includes(x.name.toLowerCase()))
                  if (t) { setFocusedTerritory(t.id); map.flyTo({ center: t.coords, zoom: t.zoom, duration: 2000 }) }
                }
              }
            }).catch(() => {})
        })

        map.on('mouseenter', () => { map.getCanvas().style.cursor = 'pointer' })
        map.on('mouseleave', () => { map.getCanvas().style.cursor = '' })
      })
    }).catch(() => setMapError('Failed to load Mapbox.'))
    return () => { cancelled = true }
  }, [])

  // Show in-map popup when focusedTerritory changes
  useEffect(() => {
    if (!focusedTerritory || !mapRef.current || !mapboxglRef.current) return
    const territory = TERRITORY_BY_ID.get(focusedTerritory)
    if (!territory) return
    if (popupRef.current) { popupRef.current.remove(); popupRef.current = null }
    const map = mapRef.current
    const onMoveEnd = () => {
      if (!TERRITORY_BY_ID.get(focusedTerritory)) return
      const t = TERRITORY_BY_ID.get(focusedTerritory)!
      popupRef.current = createMapPopup(
        mapboxglRef.current, map, t,
        () => { onTerritorySelect(t); setFocusedTerritory(null) },
        () => { setFocusedTerritory(null) }
      )
    }
    map.once('moveend', onMoveEnd)
    return () => { map.off('moveend', onMoveEnd) }
  }, [focusedTerritory, onTerritorySelect])

  // Clear popup when modal opens
  useEffect(() => {
    if (selectedCountry && popupRef.current) { popupRef.current.remove(); popupRef.current = null }
  }, [selectedCountry])

  const resetMapView = () => {
    if (mapRef.current) {
      if (popupRef.current) { popupRef.current.remove(); popupRef.current = null }
      setFocusedTerritory(null)
      mapRef.current.flyTo({ center: [-95, 38], zoom: 3.5, duration: 1500 })
    }
  }
  const zoomIn = () => { if (mapRef.current) mapRef.current.zoomIn({ duration: 300 }) }
  const zoomOut = () => { if (mapRef.current) mapRef.current.zoomOut({ duration: 300 }) }

  useEffect(() => {
    if (selectedState && mapRef.current && STATE_COORDS[selectedState]) {
      if (popupRef.current) { popupRef.current.remove(); popupRef.current = null }
      setFocusedTerritory(null)
      const [lng, lat, zoom] = STATE_COORDS[selectedState]
      mapRef.current.flyTo({ center: [lng, lat], zoom, duration: 2000 })
    }
  }, [selectedState])

  useEffect(() => {
    if (selectedCountry && mapRef.current) {
      const t = TERRITORY_BY_ID.get(selectedCountry)
      if (t) mapRef.current.flyTo({ center: t.coords, zoom: t.zoom, duration: 2000 })
      else if (COUNTRY_MARKERS[selectedCountry]) {
        const [lng, lat] = COUNTRY_MARKERS[selectedCountry].coords
        mapRef.current.flyTo({ center: [lng, lat], zoom: 8, duration: 2000 })
      }
    }
  }, [selectedCountry])

  const allStates = Object.keys(STATE_DATA).sort()

  return (
    <div className="space-y-6">
      <div className="relative -mx-6 md:-mx-12 rounded-none border-y border-[rgba(255,149,0,0.2)] overflow-hidden" style={{ boxShadow: '0 4px 30px rgba(0,0,0,0.6)' }}>
        {mapError ? (
          <div className="bg-[#1B2838] h-[300px] md:h-[450px] flex items-center justify-center p-6 text-center rounded-xl">
            <div><Map size={48} className="text-[#FF9500] mx-auto mb-4" /><p className="text-lg text-[#F0EBE1] mb-2">Tribal Land Map</p><p className="text-sm text-[#C9B99A] max-w-md">{mapError}</p></div>
          </div>
        ) : (
          <>
            <div ref={mapContainerRef} className="h-[350px] md:h-[450px] w-full" />
            <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
              <button onClick={zoomIn} className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#15202B]/90 backdrop-blur border border-[rgba(255,149,0,0.25)] text-[#C9B99A] hover:text-[#FF9500] transition-all"><Plus size={16} /></button>
              <button onClick={zoomOut} className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#15202B]/90 backdrop-blur border border-[rgba(255,149,0,0.25)] text-[#C9B99A] hover:text-[#FF9500] transition-all"><Minus size={16} /></button>
              <button onClick={resetMapView} className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#15202B]/90 backdrop-blur border border-[rgba(255,149,0,0.25)] text-[#C9B99A] hover:text-[#FF9500] transition-all"><Maximize2 size={14} /></button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-[#0a0f1a] via-[#0a0f1a]/90 to-transparent pt-8 pb-3 px-4">
              <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap">
                <div className="flex items-center gap-1.5 text-[10px] md:text-xs text-[#C9B99A]/70"><MousePointerClick size={12} className="text-[#FF9500]/60" /><span>Click a territory marker to explore</span></div>
                <span className="hidden md:inline text-[#C9B99A]/20">|</span>
                <div className="hidden md:flex items-center gap-1.5 text-[10px] md:text-xs text-[#C9B99A]/70"><span className="text-[#FF9500]/60">Tap the card</span><span>that appears to view details</span></div>
                <span className="hidden md:inline text-[#C9B99A]/20">|</span>
                <div className="hidden md:flex items-center gap-1.5 text-[10px] md:text-xs text-[#C9B99A]/70"><span className="text-[#FF9500]/60">Scroll</span><span>to zoom</span></div>
                <span className="hidden md:inline text-[#C9B99A]/20">|</span>
                <div className="hidden md:flex items-center gap-1.5 text-[10px] md:text-xs text-[#C9B99A]/70"><span className="text-[#FF9500]/60">Drag</span><span>to pan</span></div>
                <span className="flex md:hidden text-[#C9B99A]/20">|</span>
                <div className="flex md:hidden items-center gap-1.5 text-[10px] text-[#C9B99A]/70"><span className="text-[#FF9500]/60">Pinch</span><span>to zoom</span></div>
                <span className="flex md:hidden text-[#C9B99A]/20">|</span>
                <div className="flex md:hidden items-center gap-1.5 text-[10px] text-[#C9B99A]/70"><span className="text-[#FF9500]/60">Two fingers</span><span>to pan</span></div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Popular States */}
      <div>
        <p className="text-xs uppercase tracking-[0.08em] text-[#FF9500] mb-3">Most Searched States</p>
        <div className="flex flex-wrap gap-2">
          {POPULAR_STATES.filter(s => STATE_DATA[s]).map((state) => (
            <button key={state} onClick={() => { setSelectedState(state); onStateSelect(state) }}
              className={`text-xs py-2 px-4 rounded-full border transition-all ${selectedState === state ? 'bg-[rgba(255,149,0,0.2)] border-[rgba(255,149,0,0.5)] text-[#FF9500]' : 'bg-[rgba(27,40,56,0.6)] border-[rgba(255,149,0,0.15)] text-[#C9B99A] hover:border-[rgba(255,149,0,0.3)]'}`}>
              {state}
            </button>
          ))}
        </div>
      </div>

      {/* All States */}
      <div>
        <p className="text-xs uppercase tracking-[0.08em] text-[#C9B99A] mb-3">All {allStates.length} States</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {allStates.map((state) => (
            <button key={state} onClick={() => { setSelectedState(state); onStateSelect(state) }}
              className={`text-xs py-2 px-3 rounded-lg border transition-all text-left ${selectedState === state ? 'bg-[rgba(255,149,0,0.2)] border-[rgba(255,149,0,0.5)] text-[#FF9500]' : 'bg-[rgba(27,40,56,0.5)] border-[rgba(255,149,0,0.1)] text-[#C9B99A] hover:border-[rgba(255,149,0,0.3)]'}`}>
              {state}
            </button>
          ))}
        </div>
      </div>

      {/* State Detail Modal */}
      <AnimatePresence>
        {selectedState && (
          <StateDetailModal stateKey={selectedState} onClose={() => setSelectedState(null)} />
        )}
      </AnimatePresence>

      {/* Old CountryDetailModal fallback */}
      <AnimatePresence>
        {selectedCountry && (() => {
          const cm = COUNTRY_MARKERS[selectedCountry]
          if (!cm) return null
          return <CountryDetailModal country={cm.name} countryCode={selectedCountry} nations={cm.nations} onClose={() => setSelectedCountry(null)} />
        })()}
      </AnimatePresence>
    </div>
  )
}

// ============================================
// MAIN EXPORT
// ============================================
export default function HeritageSection() {
  const [selectedTerritory, setSelectedTerritory] = useState<TerritoryMarker | null>(null)
  const [selectedState, setSelectedState] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<ReturnType<typeof searchTerritories>>([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const mapScrollRef = useRef<{ scrollIntoView: () => void } | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const searchContainerRef = useRef<HTMLDivElement>(null)

  // Scroll to map helper
  const scrollToMap = useCallback(() => {
    if (mapScrollRef.current) {
      mapScrollRef.current.scrollIntoView()
    } else if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  // Handle territory selection from any source
  const handleTerritorySelect = useCallback((territory: TerritoryMarker) => {
    setSelectedState(null)
    setSelectedTerritory(territory)
    scrollToMap()
  }, [scrollToMap])

  // Handle state selection
  const handleStateSelect = useCallback((state: string) => {
    setSelectedTerritory(null)
    setSelectedState(state)
    scrollToMap()
  }, [scrollToMap])

  // Voice search result handler
  const handleVoiceResult = useCallback((text: string) => {
    setSearchQuery(text)
    const cleanText = text.trim().toLowerCase()

    // Try exact territory match
    const exactMatch = ALL_TERRITORIES.find(t =>
      t.name.toLowerCase() === cleanText ||
      t.nations.some(n => n.toLowerCase() === cleanText)
    )
    if (exactMatch) {
      handleTerritorySelect(exactMatch)
      setSearchResults([])
      setIsDropdownOpen(false)
      return
    }

    // Try US state match
    const stateMatch = Object.keys(STATE_DATA).find(s => s.toLowerCase() === cleanText)
    if (stateMatch) {
      handleStateSelect(stateMatch)
      setSearchResults([])
      setIsDropdownOpen(false)
      return
    }

    // Fuzzy search
    const r = searchTerritories(text)
    if (r.length === 1) {
      handleTerritorySelect(r[0].territory)
      setSearchResults([])
      setIsDropdownOpen(false)
    } else {
      setSearchResults(r)
      setIsDropdownOpen(r.length > 0)
    }
  }, [handleTerritorySelect, handleStateSelect])

  const { isListening, isSupported, toggle: toggleVoice } = useVoiceSearch(handleVoiceResult)

  // Text search handler
  useEffect(() => {
    if (!searchQuery.trim() || searchQuery.trim().length < 2) {
      setSearchResults([])
      setIsDropdownOpen(false)
      return
    }
    const timer = setTimeout(() => {
      const r = searchTerritories(searchQuery)
      setSearchResults(r)
      setIsDropdownOpen(r.length > 0)
    }, 200)
    return () => clearTimeout(timer)
  }, [searchQuery])

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleSearchSelect = (result: { territory: TerritoryMarker }) => {
    setSearchQuery(result.territory.name)
    setIsDropdownOpen(false)
    handleTerritorySelect(result.territory)
  }

  const regionInfo = (region: string) => REGION_LABELS[region] || { label: region, color: '#C9B99A' }

  return (
    <section id="heritage" ref={sectionRef} className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/cosmic-bg.jpg)' }} />
      <div className="absolute inset-0 bg-[#0a0f1a]/75" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[rgba(255,149,0,0.15)]">
            <div className="flex items-center gap-3">
              <span className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-[#FF9500] font-medium">#TheKingsTake</span>
              <span className="text-[10px] md:text-xs text-[#C9B99A]/40">|</span>
              <span className="text-[10px] md:text-xs uppercase tracking-[0.1em] text-[#C9B99A]/60">AASOTU Media Group LLC</span>
            </div>
            <div className="flex gap-1">{[0, 1, 2].map(i => <div key={i} className="w-[3px] h-[3px] rounded-full bg-[#FF9500]" />)}</div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mb-8 md:mb-12">
            <p className="text-xs uppercase tracking-[0.12em] text-[#FF9500] mb-3">Indigenous Aboriginal Royal Americans</p>
            <h2 className="text-5xl md:text-6xl lg:text-[72px] text-[#F0EBE1] tracking-[-0.03em] leading-[1.05] mb-5 text-shadow-hero">
              We Were Here<br className="hidden md:block" /> Before Anybody
            </h2>
            <p className="text-lg md:text-xl text-[#C9B99A] max-w-2xl leading-relaxed">
              Discover the truth they never taught you. Tap any territory on the map to explore Indigenous nations, treaties, laws, and vital records — or journey beyond to Jamaica and beyond. 275+ nations fully documented.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="flex items-center gap-2 text-xs text-[#FF9500] bg-[rgba(255,149,0,0.08)] border border-[rgba(255,149,0,0.2)] rounded-full px-4 py-2"><Dna size={12} /> 275+ Nations Documented</span>
            <span className="flex items-center gap-2 text-xs text-[#C9B99A] bg-[rgba(27,40,56,0.6)] border border-[rgba(201,185,154,0.15)] rounded-full px-4 py-2"><FileText size={12} /> Vital Records Access</span>
            <span className="flex items-center gap-2 text-xs text-[#C9B99A] bg-[rgba(27,40,56,0.6)] border border-[rgba(201,185,154,0.15)] rounded-full px-4 py-2"><Landmark size={12} /> Laws & Treaties</span>
            <span className="flex items-center gap-2 text-xs text-[#C9B99A] bg-[rgba(27,40,56,0.6)] border border-[rgba(201,185,154,0.15)] rounded-full px-4 py-2"><Globe size={12} /> 51 States + {ALL_TERRITORIES.length} Territories</span>
          </div>
        </ScrollReveal>

        {/* How It Works */}
        <ScrollReveal delay={0.25}>
          <div className="bg-[rgba(27,40,56,0.4)] rounded-xl border border-[rgba(255,149,0,0.12)] p-4 md:p-5 mb-10 md:mb-14">
            <p className="text-[10px] uppercase tracking-[0.12em] text-[#FF9500] mb-3">How It Works</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="flex items-start gap-3 bg-[rgba(21,32,43,0.5)] rounded-lg p-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[rgba(255,149,0,0.15)] border border-[rgba(255,149,0,0.25)] text-xs text-[#FF9500] font-bold shrink-0">1</span>
                <div><p className="text-sm text-[#F0EBE1] font-medium">Click or Search</p><p className="text-[11px] text-[#C9B99A]/70 mt-0.5">Tap any marker, search by name, or select from the lists below</p></div>
              </div>
              <div className="flex items-start gap-3 bg-[rgba(21,32,43,0.5)] rounded-lg p-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[rgba(255,149,0,0.15)] border border-[rgba(255,149,0,0.25)] text-xs text-[#FF9500] font-bold shrink-0">2</span>
                <div><p className="text-sm text-[#F0EBE1] font-medium">Map Flies to Location</p><p className="text-[11px] text-[#C9B99A]/70 mt-0.5">The map zooms to the territory and an info panel appears below</p></div>
              </div>
              <div className="flex items-start gap-3 bg-[rgba(21,32,43,0.5)] rounded-lg p-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[rgba(255,149,0,0.15)] border border-[rgba(255,149,0,0.25)] text-xs text-[#FF9500] font-bold shrink-0">3</span>
                <div><p className="text-sm text-[#F0EBE1] font-medium">Explore the Data</p><p className="text-[11px] text-[#C9B99A]/70 mt-0.5">Tribes, histories, research documents — everything we have is displayed</p></div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* MAP + Inline Panel */}
        <ScrollReveal delay={0.35}>
          <HeritageMap
            onTerritorySelect={handleTerritorySelect}
            onStateSelect={handleStateSelect}
            mapRef={mapScrollRef}
          />
        </ScrollReveal>

        {/* Inline Territory Detail Panel */}
        <AnimatePresence>
          {selectedTerritory && !selectedState && (
            <div className="mt-6">
              <TerritoryDetailPanel
                territory={selectedTerritory}
                onClose={() => setSelectedTerritory(null)}
              />
            </div>
          )}
        </AnimatePresence>

        {/* Inline State Detail */}
        <AnimatePresence>
          {selectedState && (
            <div className="mt-6">
              <StateDetailModal stateKey={selectedState} onClose={() => setSelectedState(null)} />
            </div>
          )}
        </AnimatePresence>

        {/* Search Bar */}
        <div className="mt-8 relative z-20" ref={searchContainerRef}>
          <div className="relative flex items-center max-w-xl mx-auto">
            <div className="absolute left-3 text-[#FF9500]/50"><Search size={16} /></div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchResults.length > 0 && setIsDropdownOpen(true)}
              onKeyDown={(e) => { if (e.key === 'Enter' && searchResults.length > 0) handleSearchSelect(searchResults[0]) }}
              placeholder="Search nations, tribes, territories, or US states..."
              className="w-full bg-[rgba(27,40,56,0.7)] border border-[rgba(255,149,0,0.2)] rounded-xl pl-10 pr-20 py-3 text-sm text-[#F0EBE1] placeholder:text-[#C9B99A]/30 focus:outline-none focus:border-[rgba(255,149,0,0.5)] transition-colors"
            />
            <div className="absolute right-2 flex items-center gap-1">
              {searchQuery && (
                <button onClick={() => { setSearchQuery(''); setSearchResults([]); setIsDropdownOpen(false) }}
                  className="p-1.5 text-[#C9B99A]/30 hover:text-[#F0EBE1] transition-colors"><X size={14} /></button>
              )}
              {isSupported && (
                <button onClick={toggleVoice}
                  className={`p-2 rounded-lg transition-all ${isListening ? 'bg-[rgba(255,149,0,0.2)] text-[#FF9500]' : 'text-[#C9B99A]/30 hover:text-[#FF9500]'}`}>
                  {isListening ? <Mic size={16} /> : <MicOff size={16} />}
                </button>
              )}
            </div>
          </div>

          {/* Voice listening indicator */}
          <AnimatePresence>
            {isListening && (
              <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="absolute top-full left-0 right-0 mt-2 z-50 max-w-xl mx-auto">
                <div className="bg-[#15202B] border border-[rgba(255,149,0,0.3)] rounded-xl p-3 flex items-center gap-3">
                  <div className="flex gap-0.5 items-end h-5">
                    {[0,1,2,3,4].map(i => (
                      <motion.div key={i} className="w-[3px] bg-[#FF9500] rounded-full"
                        animate={{ height: [4, 16, 8, 20, 4] }}
                        transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.1 }} />
                    ))}
                  </div>
                  <span className="text-xs text-[#FF9500]">Listening... Speak a nation or territory name</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Search Results Dropdown */}
          <AnimatePresence>
            {isDropdownOpen && searchResults.length > 0 && (
              <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.15 }}
                className="absolute top-full left-0 right-0 mt-2 bg-[#15202B] border border-[rgba(255,149,0,0.2)] rounded-xl overflow-hidden z-50 shadow-2xl max-w-xl mx-auto">
                <div className="max-h-72 overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,149,0,0.3) transparent' }}>
                  {searchResults.map((result, i) => {
                    const ri = regionInfo(result.territory.region)
                    return (
                      <button key={`${result.territory.id}-${i}`} onClick={() => handleSearchSelect(result)}
                        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[rgba(255,149,0,0.08)] transition-colors text-left border-b border-[rgba(255,149,0,0.06)] last:border-b-0">
                        <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: ri.color }} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-[#F0EBE1] font-medium">{result.territory.name}</span>
                            <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded" style={{ color: ri.color, backgroundColor: `${ri.color}15` }}>{ri.label}</span>
                          </div>
                          <p className="text-[11px] text-[#C9B99A]/50 truncate mt-0.5">{result.territory.description}</p>
                        </div>
                        <MapPin size={12} className="text-[#C9B99A]/20 shrink-0" />
                      </button>
                    )
                  })}
                </div>
                <div className="px-4 py-2 bg-[rgba(21,32,43,0.5)] border-t border-[rgba(255,149,0,0.06)]">
                  <p className="text-[10px] text-[#C9B99A]/30">{searchResults.length} result{searchResults.length !== 1 ? 's' : ''} — Click to fly to location</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isDropdownOpen && searchQuery.length >= 2 && searchResults.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute top-full left-0 right-0 mt-2 bg-[#15202B] border border-[rgba(255,149,0,0.2)] rounded-xl p-4 z-50 max-w-xl mx-auto">
                <p className="text-sm text-[#C9B99A]/50 text-center">No results for &quot;{searchQuery}&quot;</p>
                <p className="text-[10px] text-[#C9B99A]/30 text-center mt-1">Try: Taino, Maroon, Maya, Mapuche, Quechua, Jamaica, Canada, Oaxaca...</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Territory quick-access buttons */}
        <div className="mt-8 space-y-4">
          {/* Caribbean */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.15em] text-[#FF9500] mb-3 flex items-center gap-2"><Crown size={12} /> Caribbean — Click to Explore</p>
            <div className="flex flex-wrap gap-2">
              {ALL_TERRITORIES.filter(t => t.region === 'caribbean').map(t => (
                <button key={t.id} onClick={() => handleTerritorySelect(t)}
                  className={`flex items-center gap-1.5 text-xs rounded-full px-3 py-2 transition-all border ${selectedTerritory?.id === t.id ? 'bg-[rgba(255,149,0,0.2)] border-[rgba(255,149,0,0.5)] text-[#FF9500]' : 'bg-[rgba(255,149,0,0.05)] border-[rgba(255,149,0,0.12)] text-[#FF9500] hover:border-[rgba(255,149,0,0.4)]'}`}>
                  <MapPin size={10} /> {t.name}
                </button>
              ))}
            </div>
          </div>

          {/* Canada */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.15em] text-[#C9B99A]/50 mb-3 flex items-center gap-2"><MapPin size={12} /> Canada — Click to Explore</p>
            <div className="flex flex-wrap gap-2">
              {ALL_TERRITORIES.filter(t => t.region === 'canada').map(t => (
                <button key={t.id} onClick={() => handleTerritorySelect(t)}
                  className={`flex items-center gap-1.5 text-xs rounded-full px-3 py-2 transition-all border ${selectedTerritory?.id === t.id ? 'bg-[rgba(255,149,0,0.2)] border-[rgba(255,149,0,0.5)] text-[#FF9500]' : 'bg-[rgba(201,185,154,0.04)] border-[rgba(201,185,154,0.1)] text-[#C9B99A]/70 hover:border-[rgba(255,149,0,0.3)] hover:text-[#FF9500]'}`}>
                  <MapPin size={10} /> {t.name}
                </button>
              ))}
            </div>
          </div>

          {/* Mexico & Central America */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.15em] text-[#C9B99A]/50 mb-3 flex items-center gap-2"><MapPin size={12} /> Mexico & Central America — Click to Explore</p>
            <div className="flex flex-wrap gap-2">
              {ALL_TERRITORIES.filter(t => t.region === 'mexico' || t.region === 'centralAmerica').map(t => (
                <button key={t.id} onClick={() => handleTerritorySelect(t)}
                  className={`flex items-center gap-1.5 text-xs rounded-full px-3 py-2 transition-all border ${selectedTerritory?.id === t.id ? 'bg-[rgba(255,149,0,0.2)] border-[rgba(255,149,0,0.5)] text-[#FF9500]' : 'bg-[rgba(201,185,154,0.04)] border-[rgba(201,185,154,0.1)] text-[#C9B99A]/70 hover:border-[rgba(255,149,0,0.3)] hover:text-[#FF9500]'}`}>
                  <MapPin size={10} /> {t.name}
                </button>
              ))}
            </div>
          </div>

          {/* South America */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.15em] text-[#C9B99A]/50 mb-3 flex items-center gap-2"><MapPin size={12} /> South America — Click to Explore</p>
            <div className="flex flex-wrap gap-2">
              {ALL_TERRITORIES.filter(t => t.region === 'southAmerica').map(t => (
                <button key={t.id} onClick={() => handleTerritorySelect(t)}
                  className={`flex items-center gap-1.5 text-xs rounded-full px-3 py-2 transition-all border ${selectedTerritory?.id === t.id ? 'bg-[rgba(255,149,0,0.2)] border-[rgba(255,149,0,0.5)] text-[#FF9500]' : 'bg-[rgba(201,185,154,0.04)] border-[rgba(201,185,154,0.1)] text-[#C9B99A]/70 hover:border-[rgba(255,149,0,0.3)] hover:text-[#FF9500]'}`}>
                  <MapPin size={10} /> {t.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <ScrollReveal delay={0.5}>
          <div className="mt-8 p-4 bg-[rgba(220,38,38,0.05)] rounded border border-[rgba(220,38,38,0.15)]">
            <div className="flex items-start gap-3">
              <AlertTriangle size={16} className="text-red-400/60 shrink-0 mt-0.5" />
              <p className="text-xs text-[#C9B99A]/50 leading-relaxed">
                Tribal territories overlapped and shifted over time. The nations listed are based on historical research and should be used as a starting point. Always verify using original records and multiple sources.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
