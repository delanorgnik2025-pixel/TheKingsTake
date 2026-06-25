import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Map, ChevronUp, ChevronDown, ExternalLink, Phone, Globe, FileText, Landmark, Dna, Scroll, BookOpen, Users, MapPin, AlertTriangle } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'
import { STATE_DATA, POPULAR_STATES, STATE_COORDS, TRIBE_DB, TREATY_DB } from '../data/heritageData'
import type { TribeDetail } from '../data/heritageData'

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || ''

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
// MAP + STATE SELECTOR
// ============================================
function HeritageMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const [selectedState, setSelectedState] = useState<string | null>(null)
  const [selectedTribe, setSelectedTribe] = useState<string | null>(null)
  const [mapError, setMapError] = useState<string | null>(null)

  useEffect(() => {
    const token = MAPBOX_TOKEN
    if (!token) {
      setMapError('Add your Mapbox token (VITE_MAPBOX_TOKEN) to your Railway environment variables to see the satellite map.')
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
                if (stateMatch) { setSelectedState(stateMatch); setSelectedTribe(null) }
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

  useEffect(() => {
    if (selectedState && mapRef.current && STATE_COORDS[selectedState]) {
      const [lng, lat, zoom] = STATE_COORDS[selectedState]
      mapRef.current.flyTo({ center: [lng, lat], zoom, duration: 2000 })
      setTimeout(() => {
        document.getElementById('heritage-info')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 600)
    }
  }, [selectedState])

  const stateData = selectedState ? STATE_DATA[selectedState] : null
  const allStates = Object.keys(STATE_DATA).sort()

  return (
    <div className="space-y-6">
      {/* Map */}
      <div className="relative rounded border border-[rgba(255,149,0,0.2)] overflow-hidden" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
        {mapError ? (
          <div className="bg-[#1B2838] h-[300px] md:h-[400px] flex items-center justify-center p-6 text-center rounded">
            <div>
              <Map size={48} className="text-[#FF9500] mx-auto mb-4" />
              <p className="text-lg text-[#F0EBE1] mb-2">Tribal Land Map</p>
              <p className="text-sm text-[#C9B99A] max-w-md">{mapError}</p>
              <p className="text-xs text-[#C9B99A]/50 mt-4">Select a state below to explore tribal nations.</p>
            </div>
          </div>
        ) : (
          <div ref={mapContainerRef} className="h-[300px] md:h-[400px] w-full" />
        )}
      </div>

      {/* Popular States */}
      <div>
        <p className="text-xs uppercase tracking-[0.08em] text-[#FF9500] mb-3">Most Searched States</p>
        <div className="flex flex-wrap gap-2">
          {POPULAR_STATES.filter(s => STATE_DATA[s]).map((state) => (
            <button key={state} onClick={() => { setSelectedState(state); setSelectedTribe(null) }}
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
            <button key={state} onClick={() => { setSelectedState(state); setSelectedTribe(null) }}
              className={`text-xs py-2 px-3 rounded border transition-all text-left ${selectedState === state ? 'bg-[rgba(255,149,0,0.2)] border-[rgba(255,149,0,0.5)] text-[#FF9500]' : 'bg-[rgba(27,40,56,0.5)] border-[rgba(255,149,0,0.1)] text-[#C9B99A] hover:border-[rgba(255,149,0,0.3)]'}`}>
              {state}
            </button>
          ))}
        </div>
      </div>

      {/* State Detail Panel */}
      <AnimatePresence>
        {stateData && selectedState && (
          <motion.div id="heritage-info"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }} className="space-y-4">

            {/* Header */}
            <div className="bg-[rgba(27,40,56,0.85)] backdrop-blur-lg rounded border border-[rgba(255,149,0,0.3)] p-5" style={{ borderLeft: '3px solid #FF9500' }}>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-xl md:text-2xl text-[#F0EBE1]">{selectedState}</h3>
                <button onClick={() => { setSelectedState(null); setSelectedTribe(null) }} className="text-[#C9B99A] hover:text-[#FF9500]"><ChevronUp size={20} /></button>
              </div>
              <p className="text-sm text-[#C9B99A]">{stateData.tribes.length} Indigenous Nations Documented</p>
            </div>

            {/* Clickable Tribes */}
            <div className="bg-[rgba(27,40,56,0.7)] rounded border border-[rgba(255,149,0,0.15)] p-4">
              <h4 className="text-xs text-[#FF9500] uppercase tracking-[0.04em] mb-3 flex items-center gap-2">
                <Dna size={14} /> Indigenous Nations — Click to Explore
              </h4>
              <div className="flex flex-wrap gap-2">
                {stateData.tribes.map((tribe) => (
                  <button key={tribe} onClick={() => setSelectedTribe(selectedTribe === tribe ? null : tribe)}
                    className={`text-xs rounded px-3 py-1.5 border transition-all ${selectedTribe === tribe ? 'bg-[rgba(255,149,0,0.25)] border-[rgba(255,149,0,0.5)] text-[#FF9500]' : 'bg-[rgba(255,149,0,0.08)] border-[rgba(255,149,0,0.2)] text-[#F0EBE1] hover:bg-[rgba(255,149,0,0.15)]'}`}>
                    {tribe}
                  </button>
                ))}
              </div>
              <AnimatePresence>
                {selectedTribe && (
                  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="mt-4">
                    <TribeDetailPanel tribeName={selectedTribe} onClose={() => setSelectedTribe(null)} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Laws */}
            {stateData.laws.length > 0 && (
              <div className="bg-[rgba(27,40,56,0.7)] rounded border border-[rgba(255,149,0,0.15)] p-4">
                <h4 className="text-xs text-[#FF9500] uppercase tracking-[0.04em] mb-3 flex items-center gap-2">
                  <Landmark size={14} /> Laws & Policies
                </h4>
                <div className="space-y-3">
                  {stateData.laws.map((law, i) => (
                    <div key={i} className="border-l-2 border-[rgba(255,149,0,0.3)] pl-3">
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

            {/* Treaties — Expandable */}
            {stateData.treaties.length > 0 && (
              <div className="bg-[rgba(27,40,56,0.7)] rounded border border-[rgba(255,149,0,0.15)] p-4">
                <h4 className="text-xs text-[#FF9500] uppercase tracking-[0.04em] mb-3 flex items-center gap-2">
                  <Scroll size={14} /> Treaties & Agreements — Click to Read Full Text
                </h4>
                <div className="space-y-3">
                  {stateData.treaties.map((_, i) => (
                    <TreatyExpand key={i} stateKey={selectedState} treatyIndex={i} />
                  ))}
                </div>
              </div>
            )}

            {/* Vital Records */}
            <div className="bg-[rgba(27,40,56,0.7)] rounded border border-[rgba(255,149,0,0.15)] p-4">
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
          </motion.div>
        )}
      </AnimatePresence>

      {/* No state selected */}
      {!selectedState && (
        <div id="heritage-info" className="bg-[rgba(27,40,56,0.5)] rounded border border-[rgba(255,149,0,0.15)] border-dashed p-6 text-center">
          <Dna size={32} className="text-[#FF9500] mx-auto mb-3" />
          <p className="text-sm text-[#F0EBE1] mb-1">Select a State Above</p>
          <p className="text-xs text-[#C9B99A]">Click any state button or click directly on the map to see Indigenous nations, laws, treaties with full text, and vital records.</p>
        </div>
      )}
    </div>
  )
}

// ============================================
// MAIN EXPORT
// ============================================
export default function HeritageSection() {
  return (
    <section id="heritage" className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/bg-services.jpg)' }} />
      <div className="absolute inset-0 bg-[#1B2838]/90" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex gap-1">
              {[0, 1, 2].map(i => <div key={i} className="w-[3px] h-[3px] rounded-full bg-[#FF9500]" />)}
            </div>
            <p className="text-xs uppercase tracking-[0.08em] text-[#FF9500]">AASOTU Media Group Presents</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <h2 className="text-4xl md:text-5xl lg:text-[56px] text-[#F0EBE1] tracking-[-0.02em] leading-[1.08] mb-4 text-shadow-hero">
            Who Was Here Before You
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <p className="text-lg text-[#C9B99A] max-w-3xl mb-4 leading-relaxed">
            Click any of the 51 states and territories to discover the Indigenous nations who called that land home. Then click each nation to explore their full history. Expand treaties to read the complete text.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="flex flex-wrap gap-4 mb-12">
            <button onClick={() => document.getElementById('heritage-info')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center gap-2 text-xs text-[#FF9500] bg-[rgba(255,149,0,0.08)] border border-[rgba(255,149,0,0.2)] rounded px-3 py-1.5 hover:bg-[rgba(255,149,0,0.15)] transition-colors cursor-pointer">
              <Dna size={12} /> 574 Sovereign Nations
            </button>
            <button onClick={() => document.getElementById('heritage-info')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center gap-2 text-xs text-[#C9B99A] bg-[rgba(27,40,56,0.6)] border border-[rgba(201,185,154,0.15)] rounded px-3 py-1.5 hover:bg-[rgba(201,185,154,0.1)] transition-colors cursor-pointer">
              <FileText size={12} /> Vital Records Access
            </button>
            <button onClick={() => document.getElementById('heritage-info')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center gap-2 text-xs text-[#C9B99A] bg-[rgba(27,40,56,0.6)] border border-[rgba(201,185,154,0.15)] rounded px-3 py-1.5 hover:bg-[rgba(201,185,154,0.1)] transition-colors cursor-pointer">
              <Landmark size={12} /> Laws & Treaties
            </button>
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
