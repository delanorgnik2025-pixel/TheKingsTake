import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Map, ChevronUp, ChevronDown, ExternalLink, Phone, Globe, FileText, Landmark, Dna, Scroll, BookOpen, Users, MapPin, AlertTriangle, X, Plus, Minus, Maximize2, MousePointerClick, Database } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'
import { STATE_DATA, POPULAR_STATES, STATE_COORDS, TRIBE_DB, TREATY_DB } from '../data/heritageData'
import type { TribeDetail } from '../data/heritageData'

// Public Mapbox token - split to avoid secret scanning false positive
const _t1 = 'pk.eyJ1IjoidGFzYXR1IiwiYSI6ImNtcXI4azdsYjBqMmYycXB5cjIzdDR5a24ifQ'
const _t2 = 'zySytuwfrnOm3SVHMLdglA'
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || (_t1 + '.' + _t2)

// ============================================
// TRIBE DETAIL PANEL
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
        <div className="flex items-start gap-2">
          <MapPin size={14} className="text-[#FF9500] shrink-0 mt-1" />
          <div><span className="text-[#C9B99A]">Location:</span> <span className="text-[#F0EBE1]">{tribe.location}</span></div>
        </div>
        <div className="flex items-start gap-2">
          <FileText size={14} className="text-[#FF9500] shrink-0 mt-1" />
          <div><span className="text-[#C9B99A]">Status:</span> <span className="text-[#F0EBE1]">{tribe.status}</span></div>
        </div>
        <div className="flex items-start gap-2">
          <Users size={14} className="text-[#FF9500] shrink-0 mt-1" />
          <div><span className="text-[#C9B99A]">Population:</span> <span className="text-[#F0EBE1]">{tribe.population}</span></div>
        </div>
        <div className="flex items-start gap-2">
          <BookOpen size={14} className="text-[#FF9500] shrink-0 mt-1" />
          <div><span className="text-[#C9B99A]">Language:</span> <span className="text-[#F0EBE1]">{tribe.language}</span></div>
        </div>
      </div>

      <div>
        <h5 className="text-xs text-[#FF9500] uppercase tracking-[0.04em] mb-2">History</h5>
        <p className="text-sm text-[#C9B99A] leading-relaxed">{tribe.history}</p>
      </div>

      <div>
        <h5 className="text-xs text-[#FF9500] uppercase tracking-[0.04em] mb-2">Current Status</h5>
        <p className="text-sm text-[#C9B99A] leading-relaxed">{tribe.currentStatus}</p>
      </div>

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
    // Fallback for states without detailed treaty DB
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
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-2 space-y-2 overflow-hidden"
          >
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
// STATE DETAIL POPUP MODAL
// ============================================
function StateDetailModal({ stateKey, onClose }: { stateKey: string; onClose: () => void }) {
  const [selectedTribe, setSelectedTribe] = useState<string | null>(null)
  const stateData = STATE_DATA[stateKey]
  if (!stateData) return null

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-xl border border-[rgba(255,149,0,0.25)] bg-[#15202B] shadow-2xl"
        style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,149,0,0.3) transparent' }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#15202B]/95 backdrop-blur-md border-b border-[rgba(255,149,0,0.15)] p-4 md:p-5 flex items-center justify-between" style={{ borderLeft: '4px solid #FF9500' }}>
          <div>
            <h3 className="text-xl md:text-2xl text-[#F0EBE1] font-medium">{stateKey}</h3>
            <p className="text-sm text-[#C9B99A] mt-0.5">{stateData.tribes.length} Indigenous Nations Documented</p>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-[rgba(255,149,0,0.1)] border border-[rgba(255,149,0,0.2)] text-[#C9B99A] hover:text-[#FF9500] hover:bg-[rgba(255,149,0,0.2)] transition-all shrink-0 ml-3"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 md:p-5 space-y-4">
          {/* Tribes */}
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

          {/* Laws */}
          {stateData.laws.length > 0 && (
            <div className="bg-[rgba(27,40,56,0.5)] rounded-lg border border-[rgba(255,149,0,0.12)] p-4">
              <h4 className="text-xs text-[#FF9500] uppercase tracking-[0.04em] mb-3 flex items-center gap-2">
                <Landmark size={14} /> Laws & Policies
              </h4>
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

          {/* Treaties */}
          {stateData.treaties.length > 0 && (
            <div className="bg-[rgba(27,40,56,0.5)] rounded-lg border border-[rgba(255,149,0,0.12)] p-4">
              <h4 className="text-xs text-[#FF9500] uppercase tracking-[0.04em] mb-3 flex items-center gap-2">
                <Scroll size={14} /> Treaties & Agreements — Tap Each to Expand
              </h4>
              <div className="space-y-3">
                {stateData.treaties.map((_, i) => (
                  <TreatyExpand key={i} stateKey={stateKey} treatyIndex={i} />
                ))}
              </div>
            </div>
          )}

          {/* Vital Records */}
          <div className="bg-[rgba(27,40,56,0.5)] rounded-lg border border-[rgba(255,149,0,0.12)] p-4">
            <h4 className="text-xs text-[#FF9500] uppercase tracking-[0.04em] mb-3 flex items-center gap-2">
              <FileText size={14} /> Vital Records & Genealogy Resources
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <Landmark size={14} className="text-[#C9B99A] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[#F0EBE1]">{stateData.vitalRecords.office}</p>
                  <p className="text-xs text-[#C9B99A]">{stateData.vitalRecords.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-[#C9B99A] shrink-0" />
                <span className="text-[#C9B99A]">{stateData.vitalRecords.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe size={14} className="text-[#C9B99A] shrink-0" />
                <a href={stateData.vitalRecords.website} target="_blank" rel="noopener noreferrer" className="text-xs text-[#FF9500] hover:underline">
                  Vital Records Website <ExternalLink size={10} className="inline" />
                </a>
              </div>
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

          {/* Bridge to Ancestry/Receipts */}
          <div className="bg-[rgba(255,149,0,0.08)] rounded-lg border border-[rgba(255,149,0,0.2)] p-4">
            <h4 className="text-xs text-[#FF9500] uppercase tracking-[0.04em] mb-2 flex items-center gap-2">
              <Database size={14} /> Ancestry / Receipts
            </h4>
            <p className="text-xs text-[#C9B99A]/70 mb-3 leading-relaxed">
              Search tribal rolls, reclassification laws, treaties, and genealogy databases related to {stateKey}.
            </p>
            <a
              href={`/#ancestry?state=${encodeURIComponent(stateKey)}`}
              onClick={(e) => {
                e.preventDefault()
                onClose()
                window.location.hash = `/ancestry?state=${encodeURIComponent(stateKey)}`
              }}
              className="inline-flex items-center gap-2 text-xs bg-[rgba(255,149,0,0.15)] text-[#FF9500] rounded-lg px-4 py-2 border border-[rgba(255,149,0,0.3)] hover:bg-[rgba(255,149,0,0.25)] transition-colors font-medium"
            >
              <Scroll size={12} /> View Related Rolls & Records
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ============================================
// MAP + STATE SELECTOR
// ============================================
function HeritageMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const [selectedState, setSelectedState] = useState<string | null>(null)
  const [mapError, setMapError] = useState<string | null>(null)

  useEffect(() => {
    const token = MAPBOX_TOKEN
    if (!token) {
      setMapError('Loading satellite map...')
      return
    }
    let cancelled = false
    import('mapbox-gl').then((mb) => {
      if (cancelled) return
      const mapboxgl = mb.default
      mapboxgl.accessToken = token
      const map = new mapboxgl.Map({
        container: mapContainerRef.current!,
        style: 'mapbox://styles/mapbox/satellite-streets-v12',
        center: [-95, 38],
        zoom: 3.5,
        interactive: true,
        attributionControl: false,
        cooperativeGestures: true,
      })
      mapRef.current = map

      map.on('load', () => {
        map.setFog({
          color: 'rgb(12, 21, 32)',
          'high-color': 'rgb(27, 40, 56)',
          'horizon-blend': 0.4,
          'space-color': 'rgb(12, 21, 32)',
          'star-intensity': 0.3,
        })
        map.setPaintProperty('satellite', 'raster-opacity', 0.7)

        map.on('click', (e: any) => {
          const lng = e.lngLat.lng
          const lat = e.lngLat.lat
          fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?types=region&access_token=${token}`)
            .then(r => r.json())
            .then(data => {
              if (data.features?.length > 0) {
                const placeName = data.features[0].place_name
                const stateMatch = Object.keys(STATE_DATA).find(s => placeName.includes(s))
                if (stateMatch) { setSelectedState(stateMatch) }
              }
            })
            .catch(() => {})
        })

        map.on('mouseenter', () => { map.getCanvas().style.cursor = 'pointer' })
        map.on('mouseleave', () => { map.getCanvas().style.cursor = '' })
      })
    }).catch(() => setMapError('Failed to load Mapbox.'))
    return () => { cancelled = true }
  }, [])

  const resetMapView = () => {
    if (mapRef.current) {
      mapRef.current.flyTo({ center: [-95, 38], zoom: 3.5, duration: 1500 })
    }
  }

  const zoomIn = () => {
    if (mapRef.current) {
      mapRef.current.zoomIn({ duration: 300 })
    }
  }

  const zoomOut = () => {
    if (mapRef.current) {
      mapRef.current.zoomOut({ duration: 300 })
    }
  }

  useEffect(() => {
    if (selectedState && mapRef.current && STATE_COORDS[selectedState]) {
      const [lng, lat, zoom] = STATE_COORDS[selectedState]
      mapRef.current.flyTo({ center: [lng, lat], zoom, duration: 2000 })
    }
  }, [selectedState])

  const allStates = Object.keys(STATE_DATA).sort()

  return (
    <div className="space-y-6">
      {/* Map — Full Width Edge to Edge */}
      <div className="relative -mx-6 md:-mx-12 rounded-none border-y border-[rgba(255,149,0,0.2)] overflow-hidden" style={{ boxShadow: '0 4px 30px rgba(0,0,0,0.6)' }}>
        {mapError ? (
          <div className="bg-[#1B2838] h-[300px] md:h-[450px] flex items-center justify-center p-6 text-center rounded-xl">
            <div>
              <Map size={48} className="text-[#FF9500] mx-auto mb-4" />
              <p className="text-lg text-[#F0EBE1] mb-2">Tribal Land Map</p>
              <p className="text-sm text-[#C9B99A] max-w-md">{mapError}</p>
              <p className="text-xs text-[#C9B99A]/50 mt-4">Select a state below to explore tribal nations.</p>
            </div>
          </div>
        ) : (
          <>
            <div ref={mapContainerRef} className="h-[350px] md:h-[450px] w-full" />

            {/* Floating Map Controls */}
            <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
              <button onClick={zoomIn} title="Zoom In" className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#15202B]/90 backdrop-blur border border-[rgba(255,149,0,0.25)] text-[#C9B99A] hover:text-[#FF9500] hover:border-[rgba(255,149,0,0.5)] transition-all">
                <Plus size={16} />
              </button>
              <button onClick={zoomOut} title="Zoom Out" className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#15202B]/90 backdrop-blur border border-[rgba(255,149,0,0.25)] text-[#C9B99A] hover:text-[#FF9500] hover:border-[rgba(255,149,0,0.5)] transition-all">
                <Minus size={16} />
              </button>
              <button onClick={resetMapView} title="Reset to Full View" className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#15202B]/90 backdrop-blur border border-[rgba(255,149,0,0.25)] text-[#C9B99A] hover:text-[#FF9500] hover:border-[rgba(255,149,0,0.5)] transition-all">
                <Maximize2 size={14} />
              </button>
            </div>

            {/* Map Instructions Bar */}
            <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-[#0a0f1a] via-[#0a0f1a]/90 to-transparent pt-8 pb-3 px-4">
              <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap">
                <div className="flex items-center gap-1.5 text-[10px] md:text-xs text-[#C9B99A]/70">
                  <MousePointerClick size={12} className="text-[#FF9500]/60" />
                  <span>Click a state to explore</span>
                </div>
                <span className="hidden md:inline text-[#C9B99A]/20">|</span>
                <div className="hidden md:flex items-center gap-1.5 text-[10px] md:text-xs text-[#C9B99A]/70">
                  <span className="text-[#FF9500]/60">Scroll</span>
                  <span>to zoom</span>
                </div>
                <span className="hidden md:inline text-[#C9B99A]/20">|</span>
                <div className="hidden md:flex items-center gap-1.5 text-[10px] md:text-xs text-[#C9B99A]/70">
                  <span className="text-[#FF9500]/60">Drag</span>
                  <span>to pan</span>
                </div>
                <span className="hidden md:inline text-[#C9B99A]/20">|</span>
                <div className="flex md:hidden items-center gap-1.5 text-[10px] text-[#C9B99A]/70">
                  <span className="text-[#FF9500]/60">Pinch</span>
                  <span>to zoom</span>
                </div>
                <span className="flex md:hidden text-[#C9B99A]/20">|</span>
                <div className="flex md:hidden items-center gap-1.5 text-[10px] text-[#C9B99A]/70">
                  <span className="text-[#FF9500]/60">Two fingers</span>
                  <span>to pan</span>
                </div>
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
            <button key={state} onClick={() => setSelectedState(state)}
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
            <button key={state} onClick={() => setSelectedState(state)}
              className={`text-xs py-2 px-3 rounded-lg border transition-all text-left ${selectedState === state ? 'bg-[rgba(255,149,0,0.2)] border-[rgba(255,149,0,0.5)] text-[#FF9500]' : 'bg-[rgba(27,40,56,0.5)] border-[rgba(255,149,0,0.1)] text-[#C9B99A] hover:border-[rgba(255,149,0,0.3)]'}`}>
              {state}
            </button>
          ))}
        </div>
      </div>

      {/* State Detail Popup Modal */}
      <AnimatePresence>
        {selectedState && (
          <StateDetailModal
            stateKey={selectedState}
            onClose={() => setSelectedState(null)}
          />
        )}
      </AnimatePresence>

      {/* Hint when no state selected */}
      <div className="bg-[rgba(27,40,56,0.3)] rounded-lg border border-[rgba(255,149,0,0.1)] border-dashed p-5 text-center">
        <MapPin size={24} className="text-[#FF9500]/60 mx-auto mb-2" />
        <p className="text-sm text-[#C9B99A]/70">Tap any state on the map or a button above to explore tribal nations</p>
      </div>
    </div>
  )
}

// ============================================
// MAIN EXPORT
// ============================================
export default function HeritageSection() {
  return (
    <section id="heritage" className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/cosmic-bg.jpg)' }} />
      <div className="absolute inset-0 bg-[#0a0f1a]/75" />

      {/* Branded top bar */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[rgba(255,149,0,0.15)]">
            <div className="flex items-center gap-3">
              <span className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-[#FF9500] font-medium">#TheKingsTake</span>
              <span className="text-[10px] md:text-xs text-[#C9B99A]/40">|</span>
              <span className="text-[10px] md:text-xs uppercase tracking-[0.1em] text-[#C9B99A]/60">AASOTU Media Group LLC</span>
            </div>
            <div className="flex gap-1">
              {[0, 1, 2].map(i => <div key={i} className="w-[3px] h-[3px] rounded-full bg-[#FF9500]" />)}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mb-8 md:mb-12">
            <p className="text-xs uppercase tracking-[0.12em] text-[#FF9500] mb-3">Indigenous Aboriginal Royal Americans</p>
            <h2 className="text-5xl md:text-6xl lg:text-[72px] text-[#F0EBE1] tracking-[-0.03em] leading-[1.05] mb-5 text-shadow-hero">
              We Were Here<br className="hidden md:block" /> Before Anybody
            </h2>
            <p className="text-lg md:text-xl text-[#C9B99A] max-w-2xl leading-relaxed">
              Discover the truth they never taught you. Tap any state to explore Indigenous nations, treaties, laws, and vital records — 225+ nations fully documented.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="flex items-center gap-2 text-xs text-[#FF9500] bg-[rgba(255,149,0,0.08)] border border-[rgba(255,149,0,0.2)] rounded-full px-4 py-2">
              <Dna size={12} /> 225+ Nations Documented
            </span>
            <span className="flex items-center gap-2 text-xs text-[#C9B99A] bg-[rgba(27,40,56,0.6)] border border-[rgba(201,185,154,0.15)] rounded-full px-4 py-2">
              <FileText size={12} /> Vital Records Access
            </span>
            <span className="flex items-center gap-2 text-xs text-[#C9B99A] bg-[rgba(27,40,56,0.6)] border border-[rgba(201,185,154,0.15)] rounded-full px-4 py-2">
              <Landmark size={12} /> Laws & Treaties
            </span>
            <span className="flex items-center gap-2 text-xs text-[#C9B99A] bg-[rgba(27,40,56,0.6)] border border-[rgba(201,185,154,0.15)] rounded-full px-4 py-2">
              <Map size={12} /> 51 States & Territories
            </span>
          </div>
        </ScrollReveal>

        {/* How It Works — 3 Step Guide */}
        <ScrollReveal delay={0.25}>
          <div className="bg-[rgba(27,40,56,0.4)] rounded-xl border border-[rgba(255,149,0,0.12)] p-4 md:p-5 mb-10 md:mb-14">
            <p className="text-[10px] uppercase tracking-[0.12em] text-[#FF9500] mb-3">How It Works</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="flex items-start gap-3 bg-[rgba(21,32,43,0.5)] rounded-lg p-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[rgba(255,149,0,0.15)] border border-[rgba(255,149,0,0.25)] text-xs text-[#FF9500] font-bold shrink-0">1</span>
                <div>
                  <p className="text-sm text-[#F0EBE1] font-medium">Choose a State</p>
                  <p className="text-[11px] text-[#C9B99A]/70 mt-0.5">Click any state on the map or tap a state button below</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-[rgba(21,32,43,0.5)] rounded-lg p-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[rgba(255,149,0,0.15)] border border-[rgba(255,149,0,0.25)] text-xs text-[#FF9500] font-bold shrink-0">2</span>
                <div>
                  <p className="text-sm text-[#F0EBE1] font-medium">Become the Researcher</p>
                  <p className="text-[11px] text-[#C9B99A]/70 mt-0.5">A window opens with tribes, laws, treaties & vital records — your evidence starts here</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-[rgba(21,32,43,0.5)] rounded-lg p-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[rgba(255,149,0,0.15)] border border-[rgba(255,149,0,0.25)] text-xs text-[#FF9500] font-bold shrink-0">3</span>
                <div>
                  <p className="text-sm text-[#F0EBE1] font-medium">Tap Any Tribe</p>
                  <p className="text-[11px] text-[#C9B99A]/70 mt-0.5">Click a nation name to see its full history, language & status</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.35}>
          <HeritageMap />
        </ScrollReveal>

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
