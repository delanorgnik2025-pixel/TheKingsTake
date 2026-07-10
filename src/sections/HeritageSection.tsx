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
      rec.continuous = false; rec.interimResults = true; rec.lang = 'en-US'
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
    if (isListening) { recognitionRef.current.stop(); setIsListening(false) }
    else { recognitionRef.current.start() }
  }, [isListening])

  return { isListening, isSupported, toggle }
}

// ============================================
// MAP CONTROLS
// ============================================
function MapControls({ mapRef }: { mapRef: React.MutableRefObject<any> }) {
  return (
    <div className="absolute top-3 right-3 z-20 flex flex-col gap-2">
      <button onClick={() => mapRef.current?.zoomIn()} className="w-9 h-9 rounded-lg bg-[#15202B]/90 backdrop-blur border border-white/10 text-[#FF9500] hover:bg-[#FF9500]/20 flex items-center justify-center transition-all shadow-lg">
        <Plus size={16} />
      </button>
      <button onClick={() => mapRef.current?.zoomOut()} className="w-9 h-9 rounded-lg bg-[#15202B]/90 backdrop-blur border border-white/10 text-[#FF9500] hover:bg-[#FF9500]/20 flex items-center justify-center transition-all shadow-lg">
        <Minus size={16} />
      </button>
      <button onClick={() => mapRef.current?.flyTo({ center: [-95, 38], zoom: 3.5 })} className="w-9 h-9 rounded-lg bg-[#15202B]/90 backdrop-blur border border-white/10 text-[#C9B99A] hover:bg-[#FF9500]/20 flex items-center justify-center transition-all shadow-lg" title="Reset View">
        <Maximize2 size={14} />
      </button>
    </div>
  )
}

// ============================================
// TERRITORY DETAIL PANEL
// ============================================
function TerritoryDetailPanel({ territory, onClose }: { territory: TerritoryMarker | null; onClose: () => void }) {
  if (!territory) return null

  const getNationData = () => {
    if (territory.id === 'jm') return { type: 'full' as const, nations: jamaicaNations }
    if (territory.id === 'ht') return { type: 'full' as const, nations: haitiNations }
    if (territory.region === 'caribbean') {
      const countryMap: Record<string, string> = {
        cu: 'Cuba', pr: 'Puerto Rico', do: 'Dominican Republic', bs: 'Bahamas', tt: 'Trinidad & Tobago',
        ag: 'Antigua & Barbuda', dm: 'Dominica', gd: 'Grenada', kn: 'St. Kitts & Nevis',
        lc: 'St. Lucia', vc: 'St. Vincent', bb: 'Barbados', vi: 'US Virgin Islands',
        ky: 'Cayman Islands', tc: 'Turks & Caicos', gp: 'Guadeloupe', mq: 'Martinique',
        aw: 'Aruba', cw: 'Curacao', bo: 'Bonaire'
      }
      const cn = countryMap[territory.id]
      if (cn) { const f = caribbeanNations.filter(n => n.country === cn); if (f.length) return { type: 'partial' as const, nations: f } }
    }
    if (territory.region === 'canada') { const f = canadaNations.filter(n => n.country === territory.name); if (f.length) return { type: 'partial' as const, nations: f } }
    if (territory.region === 'mexico') { const f = mexicoNations.filter(n => n.country === territory.name); if (f.length) return { type: 'partial' as const, nations: f } }
    if (territory.region === 'centralAmerica') { const f = centralAmericaNations.filter(n => n.country === territory.name); if (f.length) return { type: 'partial' as const, nations: f } }
    if (territory.region === 'southAmerica') { const f = southAmericaNations.filter(n => n.country === territory.name); if (f.length) return { type: 'partial' as const, nations: f } }
    return { type: 'territory' as const, nations: territory.nations }
  }

  const nationData = getNationData()
  const hasFullData = nationData.type === 'full' || nationData.type === 'partial'
  const nationList = hasFullData ? nationData.nations : territory.nations

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.3 }}
      className="mt-4 bg-[#15202B]/80 backdrop-blur-md rounded-2xl border border-[#FF9500]/20 p-5 shadow-xl">
      <div className="flex items-start justify-between mb-3">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-[#FF9500]/80 font-semibold">{territory.region}</span>
          <h4 className="text-xl font-semibold text-[#F0EBE1] font-serif">{territory.name}</h4>
        </div>
        <button onClick={onClose} className="text-[#C9B99A] hover:text-[#FF9500] p-1 rounded-lg hover:bg-white/5 transition-colors">
          <X size={18} />
        </button>
      </div>
      <p className="text-[#C9B99A] text-sm mb-4 leading-relaxed">{territory.description}</p>

      {hasFullData ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {nationList.map((nation: any) => (
            <a key={nation.id} href={`/research/${nation.id}`}
              className="group block bg-[#0a0f1a]/60 rounded-xl p-4 border border-white/5 hover:border-[#FF9500]/30 hover:bg-[#0a0f1a] transition-all">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#FF9500]/10 flex items-center justify-center flex-shrink-0">
                  <Feather size={14} className="text-[#FF9500]" />
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-[#F0EBE1] group-hover:text-[#FF9500] transition-colors leading-tight">{nation.name}</h5>
                  <span className="text-[10px] text-[#C9B99A]/60">{nation.indigenousName}</span>
                </div>
              </div>
              <p className="text-xs text-[#C9B99A]/70 line-clamp-2 leading-relaxed mb-2">{typeof nation === 'string' ? '' : nation.history?.substring(0, 120) + '...'}</p>
              <div className="flex items-center gap-1 text-[10px] text-[#FF9500]/80">
                <span>View Research</span>
                <ChevronRight size={10} />
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {territory.nations.map((n: string, i: number) => (
            <span key={i} className="text-xs bg-[#FF9500]/10 text-[#FFB840] rounded-full px-3 py-1">{n}</span>
          ))}
        </div>
      )}
    </motion.div>
  )
}

// ============================================
// REGION SIDEBAR
// ============================================
function RegionSidebar({ region, territories, onSelectTerritory, onClose, selectedTerritoryId }: {
  region: string | null; territories: TerritoryMarker[]; onSelectTerritory: (t: TerritoryMarker) => void;
  onClose: () => void; selectedTerritoryId: string | null;
}) {
  if (!region) return null
  const regionColor = REGION_LABELS[region as keyof typeof REGION_LABELS]?.color || '#FF9500'

  return (
    <motion.div initial={{ x: -320, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -320, opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="absolute top-0 left-0 bottom-0 w-[300px] sm:w-[320px] z-20 bg-[#0a0f1a]/95 backdrop-blur-xl border-r border-[#FF9500]/20 flex flex-col shadow-2xl"
      onClick={(e) => e.stopPropagation()}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 flex-shrink-0">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider" style={{ color: regionColor }}>{region}</h3>
          <span className="text-[10px] text-[#C9B99A]/50">{territories.length} territories</span>
        </div>
        <button onClick={onClose} className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#C9B99A] hover:text-[#F0EBE1] transition-all">
          <X size={16} />
        </button>
      </div>

      {/* Territory List */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2" style={{ overscrollBehavior: 'contain' }}>
        {territories.map((t) => (
          <button key={t.id} onClick={() => onSelectTerritory(t)}
            className={`w-full text-left rounded-xl p-3 transition-all border ${
              selectedTerritoryId === t.id
                ? 'bg-[#FF9500]/15 border-[#FF9500]/40'
                : 'bg-white/[0.03] border-white/5 hover:bg-white/[0.06] hover:border-white/10'
            }`}>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: regionColor }} />
              <span className="text-sm font-medium text-[#F0EBE1]">{t.name}</span>
            </div>
            <p className="text-[11px] text-[#C9B99A]/60 line-clamp-2 leading-relaxed pl-4">{t.description}</p>
            <div className="flex flex-wrap gap-1 mt-1.5 pl-4">
              {t.nations.slice(0, 3).map((n, i) => (
                <span key={i} className="text-[9px] bg-[#FF9500]/8 text-[#FFB840]/80 rounded px-1.5 py-0.5">{n}</span>
              ))}
              {t.nations.length > 3 && <span className="text-[9px] text-[#C9B99A]/30">+{t.nations.length - 3}</span>}
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  )
}

// ============================================
// MAIN HERITAGE SECTION
// ============================================
export default function HeritageSection() {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [selectedTerritory, setSelectedTerritory] = useState<TerritoryMarker | null>(null)
  const [activeRegion, setActiveRegion] = useState<string>('caribbean')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<TerritoryMarker[]>([])
  const [showCountryModal, setShowCountryModal] = useState(false)
  const [modalCountry, setModalCountry] = useState('')
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const [selectedState, setSelectedState] = useState<string | null>(null)
  const [showStateDetail, setShowStateDetail] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Region configuration
  const REGIONS = [
    { id: 'caribbean', label: 'Caribbean', color: '#FF9500' },
    { id: 'canada', label: 'Canada', color: '#C9B99A' },
    { id: 'mexico', label: 'Mexico', color: '#E8A87C' },
    { id: 'centralAmerica', label: 'Central America', color: '#85CDCA' },
    { id: 'southAmerica', label: 'South America', color: '#E27D60' },
  ]

  // Initialize map
  useEffect(() => {
    let mapInstance: any = null
    let cleanup: (() => void) | undefined

    const init = async () => {
      const mapboxgl = (await import('mapbox-gl')).default
      mapboxgl.accessToken = MAPBOX_TOKEN

      mapInstance = new mapboxgl.Map({
        container: mapContainerRef.current!,
        style: 'mapbox://styles/mapbox/satellite-v9',
        center: [-95, 38], zoom: 3.5, interactive: true,
        attributionControl: false,
      })

      mapRef.current = mapInstance

      mapInstance.on('load', () => {
        setIsMapLoaded(true)
        mapInstance.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'bottom-right')
      })

      cleanup = () => { markersRef.current.forEach(m => m.remove()); markersRef.current = []; mapInstance?.remove() }
    }
    init()
    return () => { cleanup?.() }
  }, [])

  // Update markers when region changes
  useEffect(() => {
    if (!mapRef.current || !isMapLoaded) return

    // Clear existing markers
    markersRef.current.forEach(m => m.remove())
    markersRef.current = []

    const regionTerritories = ALL_TERRITORIES.filter(t => t.region === activeRegion)

    regionTerritories.forEach(territory => {
      const markerEl = document.createElement('div')
      const regionColor = REGION_LABELS[territory.region as keyof typeof REGION_LABELS]?.color || '#FF9500'
      const sz = territory.region === 'southAmerica' ? 18 : 22

      markerEl.innerHTML = `
        <div style="width:${sz}px;height:${sz}px;border-radius:50%;background:${regionColor};box-shadow:0 0 8px ${regionColor}80,0 0 20px ${regionColor}40;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:transform 0.2s;">
          <div style="width:6px;height:6px;border-radius:50%;background:#F0EBE1;"></div>
        </div>
      `
      markerEl.style.cursor = 'pointer'

      const dot = markerEl.querySelector('div') as HTMLElement
      markerEl.addEventListener('mouseenter', () => { dot.style.transform = 'scale(1.5)'; dot.style.boxShadow = `0 0 16px ${regionColor}cc,0 0 30px ${regionColor}60`; })
      markerEl.addEventListener('mouseleave', () => { dot.style.transform = 'scale(1)'; dot.style.boxShadow = `0 0 8px ${regionColor}80,0 0 20px ${regionColor}40`; })
      markerEl.addEventListener('click', () => { handleSelectTerritory(territory) })

      const mapboxgl = require('mapbox-gl')
      const marker = new mapboxgl.Marker({ element: markerEl, anchor: 'center' })
        .setLngLat(territory.coordinates)
        .addTo(mapRef.current)
      markersRef.current.push(marker)
    })
  }, [activeRegion, isMapLoaded])

  // Handle region button click
  const handleRegionClick = useCallback((regionId: string) => {
    setActiveRegion(regionId)
    setSelectedRegion(regionId)
    setSelectedTerritory(null)

    // Pan map to region
    const regionConfig: Record<string, { center: [number, number]; zoom: number }> = {
      caribbean: { center: [-71.5, 18.0], zoom: 5 },
      canada: { center: [-100, 55], zoom: 3 },
      mexico: { center: [-102, 22], zoom: 4.5 },
      centralAmerica: { center: [-86, 14], zoom: 5.5 },
      southAmerica: { center: [-60, -15], zoom: 3 },
    }
    const cfg = regionConfig[regionId]
    if (cfg && mapRef.current) {
      mapRef.current.flyTo({ center: cfg.center, zoom: cfg.zoom, duration: 1500, essential: true })
    }
  }, [])

  // Handle territory selection (from sidebar or marker click)
  const handleSelectTerritory = useCallback((territory: TerritoryMarker) => {
    setSelectedTerritory(territory)
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: territory.coordinates,
        zoom: territory.zoom || 7,
        duration: 1200,
        essential: true
      })
    }
  }, [])

  // Close sidebar
  const handleCloseSidebar = useCallback(() => {
    setSelectedRegion(null)
  }, [])

  // Close detail panel
  const handleCloseDetail = useCallback(() => {
    setSelectedTerritory(null)
  }, [])

  // Voice search
  const { isListening, isSupported, toggle } = useVoiceSearch((text) => {
    setSearchQuery(text)
    const results = searchTerritories(text)
    setSearchResults(results)
    if (results.length === 1) handleSelectTerritory(results[0])
  })

  const regionTerritories = ALL_TERRITORIES.filter(t => t.region === activeRegion)

  return (
    <section id="heritage" className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0a0f1a]" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF9500' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />

      <div className="relative z-10 max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FF9500]/10 border border-[#FF9500]/30 rounded-full mb-4">
              <MapPin size={14} className="text-[#FF9500]" />
              <span className="text-[11px] font-medium tracking-wider text-[#FF9500] uppercase">Interactive Map</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-[#F0EBE1] mb-3 font-serif">Indigenous Heritage Map</h2>
            <p className="text-[#C9B99A] text-base md:text-lg max-w-2xl mx-auto">Explore sovereign lands, treaties, and Indigenous nations across the Americas.</p>
          </motion.div>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto mb-5">
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C9B99A]/40" />
            <input type="text" value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setSearchResults(searchTerritories(e.target.value)) }}
              placeholder="Search territories, tribes, nations..."
              className="w-full pl-10 pr-11 py-2.5 bg-[#15202B] border border-white/10 rounded-xl text-sm text-[#F0EBE1] placeholder-[#C9B99A]/40 focus:outline-none focus:border-[#FF9500]/40 focus:ring-1 focus:ring-[#FF9500]/20" />
            {isSupported && (
              <button onClick={toggle} className={`absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-all ${isListening ? 'bg-red-500/20 text-red-400' : 'text-[#C9B99A]/40 hover:text-[#FF9500]'}`}>
                {isListening ? <MicOff size={15} /> : <Mic size={15} />}
              </button>
            )}
          </div>
          <AnimatePresence>
            {searchResults.length > 0 && searchQuery && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="absolute z-30 w-full mt-2 bg-[#15202B] border border-white/10 rounded-xl shadow-2xl overflow-hidden max-h-64 overflow-y-auto">
                {searchResults.map(r => (
                  <button key={r.id} onClick={() => { setSearchQuery(''); setSearchResults([]); handleSelectTerritory(r); setActiveRegion(r.region); setSelectedRegion(r.region); }}
                    className="w-full text-left px-4 py-2.5 hover:bg-[#FF9500]/10 transition-colors flex items-center gap-3 border-b border-white/5 last:border-0">
                    <MapPin size={14} className="text-[#FF9500] flex-shrink-0" />
                    <div>
                      <div className="text-sm text-[#F0EBE1]">{r.name}</div>
                      <div className="text-[10px] text-[#C9B99A]/50">{r.region}</div>
                    </div>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Region Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
          {REGIONS.map(r => (
            <button key={r.id} onClick={() => handleRegionClick(r.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                activeRegion === r.id
                  ? 'bg-[#FF9500]/15 border-[#FF9500]/40 text-[#FF9500]'
                  : 'bg-[#15202B]/60 border-white/5 text-[#C9B99A] hover:bg-[#15202B] hover:text-[#F0EBE1]'
              }`}>
              {r.label}
            </button>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="flex items-center justify-center gap-6 mb-4 text-[10px] md:text-xs text-[#C9B99A]/50">
          <span>{ALL_TERRITORIES.length} Territories</span>
          <span className="w-1 h-1 rounded-full bg-[#C9B99A]/20" />
          <span>{jamaicaNations.length + haitiNations.length + caribbeanNations.length + canadaNations.length + mexicoNations.length + centralAmericaNations.length + southAmericaNations.length} Nations</span>
          <span className="w-1 h-1 rounded-full bg-[#C9B99A]/20" />
          <span>5 Regions</span>
          <span className="w-1 h-1 rounded-full bg-[#C9B99A]/20" />
          <span>22 Countries</span>
        </div>

        {/* Map Container */}
        <div className="relative rounded-2xl overflow-hidden border border-[#FF9500]/10 shadow-2xl" style={{ minHeight: 450 }}>
          <div ref={mapContainerRef} className="h-[450px] md:h-[550px] w-full" />

          {/* Loading State */}
          <AnimatePresence>
            {!isMapLoaded && (
              <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center bg-[#0a0f1a]">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-2 border-[#FF9500]/30 border-t-[#FF9500] rounded-full animate-spin" />
                  <span className="text-sm text-[#C9B99A]/60">Loading map...</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Map Controls */}
          <MapControls mapRef={mapRef} />

          {/* Region Sidebar */}
          <AnimatePresence>
            {selectedRegion && (
              <RegionSidebar
                region={selectedRegion}
                territories={regionTerritories}
                onSelectTerritory={handleSelectTerritory}
                onClose={handleCloseSidebar}
                selectedTerritoryId={selectedTerritory?.id || null}
              />
            )}
          </AnimatePresence>

          {/* Bottom hint */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
            <span className="text-[10px] text-[#C9B99A]/30 pointer-events-none bg-[#0a0f1a]/60 backdrop-blur-sm rounded-full px-3 py-1">
              Click region tabs to browse territories &middot; Scroll to zoom &middot; Drag to pan
            </span>
          </div>
        </div>

        {/* Territory Detail Panel */}
        <AnimatePresence>
          {selectedTerritory && (
            <TerritoryDetailPanel territory={selectedTerritory} onClose={handleCloseDetail} />
          )}
        </AnimatePresence>
      </div>

      {/* Country Detail Modal */}
      {showCountryModal && (
        <CountryDetailModal country={modalCountry} onClose={() => setShowCountryModal(false)} />
      )}
    </section>
  )
}
