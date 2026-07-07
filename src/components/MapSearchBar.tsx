import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Mic, MicOff, X, MapPin } from 'lucide-react'
import { searchTerritories, ALL_TERRITORIES, type TerritoryMarker, REGION_LABELS } from '../data/territoryMarkers'

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

interface Props {
  onSelectTerritory: (territory: TerritoryMarker) => void
  /** When voice/auto search finds a match, this is called to fly + popup */
  onAutoSelect?: (territory: TerritoryMarker) => void
}

export default function MapSearchBar({ onSelectTerritory, onAutoSelect }: Props) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<ReturnType<typeof searchTerritories>>([])
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Voice result handler — auto-selects best match
  const handleVoiceResult = useCallback((text: string) => {
    const cleanText = text.trim().toLowerCase()
    setQuery(text)

    // Try exact match first
    const exactMatch = ALL_TERRITORIES.find(t =>
      t.name.toLowerCase() === cleanText ||
      t.nations.some(n => n.toLowerCase() === cleanText)
    )

    if (exactMatch && onAutoSelect) {
      setResults([])
      setIsOpen(false)
      onAutoSelect(exactMatch)
      return
    }

    // Fuzzy search
    const r = searchTerritories(text)

    // If only 1 result, auto-select it
    if (r.length === 1 && onAutoSelect) {
      setResults([])
      setIsOpen(false)
      onAutoSelect(r[0].territory)
      return
    }

    // Otherwise show dropdown
    setResults(r)
    setIsOpen(r.length > 0)
  }, [onAutoSelect])

  const { isListening, isSupported, toggle: toggleVoice } = useVoiceSearch(handleVoiceResult)

  useEffect(() => {
    if (!query.trim() || query.trim().length < 2) {
      setResults([])
      setIsOpen(false)
      return
    }
    const timer = setTimeout(() => {
      const r = searchTerritories(query)
      setResults(r)
      setIsOpen(r.length > 0)
    }, 200)
    return () => clearTimeout(timer)
  }, [query])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleSelect = (result: { territory: TerritoryMarker }) => {
    setQuery(result.territory.name)
    setIsOpen(false)
    onSelectTerritory(result.territory)
  }

  const regionInfo = (region: string) => REGION_LABELS[region] || { label: region, color: '#C9B99A' }

  return (
    <div ref={containerRef} className="relative w-full max-w-xl mx-auto">
      <div className="relative flex items-center">
        <div className="absolute left-3 text-[#FF9500]/50"><Search size={16} /></div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setIsOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && results.length > 0) {
              handleSelect(results[0])
            }
          }}
          placeholder="Search nations, tribes, or territories..."
          className="w-full bg-[rgba(27,40,56,0.7)] border border-[rgba(255,149,0,0.2)] rounded-xl pl-10 pr-20 py-3 text-sm text-[#F0EBE1] placeholder:text-[#C9B99A]/30 focus:outline-none focus:border-[rgba(255,149,0,0.5)] transition-colors"
        />
        <div className="absolute right-2 flex items-center gap-1">
          {query && (
            <button onClick={() => { setQuery(''); setResults([]); setIsOpen(false); inputRef.current?.focus() }}
              className="p-1.5 text-[#C9B99A]/30 hover:text-[#F0EBE1] transition-colors">
              <X size={14} />
            </button>
          )}
          {isSupported && (
            <button onClick={toggleVoice}
              className={`p-2 rounded-lg transition-all ${isListening ? 'bg-[rgba(255,149,0,0.2)] text-[#FF9500]' : 'text-[#C9B99A]/30 hover:text-[#FF9500]'}`}>
              {isListening ? <Mic size={16} /> : <MicOff size={16} />}
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isListening && (
          <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="absolute top-full left-0 right-0 mt-2 z-50">
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

      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 bg-[#15202B] border border-[rgba(255,149,0,0.2)] rounded-xl overflow-hidden z-50 shadow-2xl">
            <div className="max-h-72 overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,149,0,0.3) transparent' }}>
              {results.map((result, i) => {
                const ri = regionInfo(result.territory.region)
                return (
                  <button key={`${result.territory.id}-${i}`}
                    onClick={() => handleSelect(result)}
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
              <p className="text-[10px] text-[#C9B99A]/30">{results.length} result{results.length !== 1 ? 's' : ''} — Click to fly to location</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && query.length >= 2 && results.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute top-full left-0 right-0 mt-2 bg-[#15202B] border border-[rgba(255,149,0,0.2)] rounded-xl p-4 z-50">
            <p className="text-sm text-[#C9B99A]/50 text-center">No results for &quot;{query}&quot;</p>
            <p className="text-[10px] text-[#C9B99A]/30 text-center mt-1">Try: Taino, Maroon, Maya, Mapuche, Quechua, Jamaica, Canada...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
