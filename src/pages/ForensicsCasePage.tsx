import { useState, useCallback, useEffect } from 'react'
import { useParams, Link } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, Microscope, Search, ClipboardList, Fingerprint, HeartPulse,
  Smartphone, Clock, CheckCircle, AlertCircle, ChevronRight, RotateCcw,
  Home, Award, ShieldAlert, Lock, MapPin, Camera, Package, FileText,
  Eye, ChevronDown, ChevronUp, Info
} from 'lucide-react'
import InvestigationMap from '../components/InvestigationMap'
import ForensicsBoard from '../components/ForensicsBoard'
import {
  BEACH_HOMICIDE_EVIDENCE, BEACH_HOMICIDE_WITNESSES,
  BEACH_HOMICIDE_TIMELINE, BEACH_HOMICIDE_AUTOPSY,
  BEACH_HOMICIDE_FINGERPRINTS, BEACH_HOMICIDE_SOLUTION,
} from '../data/forensics-evidence'

// ============================================
// TYPES
// ============================================
type Environment = 'office' | 'beach' | 'inventory' | 'lab-hub' | 'fingerprint' | 'autopsy' | 'digital' | 'timeline' | 'report' | 'results'
type EvidencePhase = 'inspect' | 'photo' | 'document' | 'collect' | 'done'

interface CollectedEvidence {
  id: string
  collectedAt: string
  method: string
  phase: EvidencePhase
}

// ============================================
// INVESTIGATION MAP LOCATIONS
// ============================================
const getLocations = (collected: string[], analyzed: string[], env: Environment) => [
  { id: 'office', label: 'Detective Office', icon: ClipboardList, status: 'complete' as const },
  { id: 'beach', label: 'Beach Crime Scene', icon: Search, status: collected.length >= 8 ? 'complete' as const : collected.length > 0 ? 'in-progress' as const : 'available' as const, progress: collected.length > 0 ? `${collected.length}/8 evidence` : undefined },
  { id: 'inventory', label: 'Evidence Intake', icon: Package, status: collected.length >= 3 ? 'available' as const : 'locked' as const, progress: collected.length >= 3 ? `${collected.length} items` : undefined },
  { id: 'lab-hub', label: 'Forensics Lab Hub', icon: Microscope, status: analyzed.length >= 2 ? 'complete' as const : analyzed.length > 0 ? 'in-progress' as const : collected.length >= 5 ? 'available' as const : 'locked' as const },
  { id: 'fingerprint', label: 'Fingerprint Station', icon: Fingerprint, status: analyzed.includes('fingerprint') ? 'complete' as const : env === 'fingerprint' ? 'in-progress' as const : analyzed.length > 0 ? 'available' as const : 'locked' as const },
  { id: 'autopsy', label: 'Autopsy Station', icon: HeartPulse, status: analyzed.includes('autopsy') ? 'complete' as const : env === 'autopsy' ? 'in-progress' as const : analyzed.length > 0 ? 'available' as const : 'locked' as const },
  { id: 'digital', label: 'Digital Forensics', icon: Smartphone, status: analyzed.includes('digital') ? 'complete' as const : env === 'digital' ? 'in-progress' as const : analyzed.length > 0 ? 'available' as const : 'locked' as const },
  { id: 'timeline', label: 'Timeline Room', icon: Clock, status: env === 'timeline' ? 'in-progress' as const : analyzed.length >= 2 ? 'available' as const : 'locked' as const },
  { id: 'report', label: 'Case Report Desk', icon: FileText, status: env === 'report' ? 'in-progress' as const : env === 'results' ? 'complete' as const : 'locked' as const },
  { id: 'results', label: 'Results & Badge', icon: Award, status: env === 'results' ? 'complete' as const : 'locked' as const },
]

// ============================================
// EVIDENCE COLLECTION METHODS
// ============================================
const COLLECTION_METHODS: Record<string, { correct: string; incorrect: string; feedback: string }> = {
  footprints: { correct: 'Photograph with scale before casting', incorrect: 'Immediately remove surrounding sand', feedback: 'Photography must always precede any physical disturbance of impression evidence.' },
  phone: { correct: 'Photograph in situ, then seize for digital extraction', incorrect: 'Power on and check messages immediately', feedback: 'Powering on can alter timestamps and overwrite deleted data. Photograph first, then forensic extraction.' },
  watch: { correct: 'Photograph on wrist, then remove carefully', incorrect: 'Remove immediately to check the time', feedback: 'Always photograph evidence in its original position before moving it.' },
  beverage: { correct: 'Photograph, swab for DNA, bag without touching lip', incorrect: 'Pick up by the rim for better grip', feedback: 'The rim may contain DNA. Handle by the base to preserve biological evidence.' },
  fabric: { correct: 'Photograph in place, then collect with tweezers', incorrect: 'Pull it free from the bush', feedback: 'Pulling can damage fiber evidence. Use clean tools and preserve the original state.' },
  tire: { correct: 'Photograph with scale and lighting from side', incorrect: 'Clear debris from the impression first', feedback: 'Photograph the impression as-found. Debris may be evidence too.' },
  personal: { correct: 'Photograph in pocket, then seize as found', incorrect: 'Open and examine contents at scene', feedback: 'Contents may have evidential value. Inventory at the lab, not at the scene.' },
  drag: { correct: 'Photograph full length with scale, note endpoints', incorrect: 'Measure only at the body end', feedback: 'Document the full extent. The origin point may reveal where the drag started.' },
}

// ============================================
// MAIN COMPONENT
// ============================================
export default function ForensicsCasePage() {
  const { caseId } = useParams()
  const [environment, setEnvironment] = useState<Environment>('office')
  const [collected, setCollected] = useState<string[]>([])
  const [analyzed, setAnalyzed] = useState<string[]>([])
  const [timelineAnswer, setTimelineAnswer] = useState<Record<string, number>>({})
  const [reportAnswers, setReportAnswers] = useState<Record<string, string>>({})
  const [showDisclaimer, setShowDisclaimer] = useState(true)
  const [selectedEvidence, setSelectedEvidence] = useState<string | null>(null)
  const [collectionPhase, setCollectionPhase] = useState<EvidencePhase>('inspect')
  const [collectionFeedback, setCollectionFeedback] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [labTab, setLabTab] = useState<'fingerprint' | 'autopsy' | 'digital'>('fingerprint')

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`forensics-${caseId}`)
    if (saved) {
      try {
        const data = JSON.parse(saved)
        if (data.collected) setCollected(data.collected)
        if (data.analyzed) setAnalyzed(data.analyzed)
        if (data.timeline) setTimelineAnswer(data.timeline)
        if (data.report) setReportAnswers(data.report)
        if (data.environment) setEnvironment(data.environment)
      } catch { /* ignore */ }
    }
  }, [caseId])

  // Save progress
  useEffect(() => {
    localStorage.setItem(`forensics-${caseId}`, JSON.stringify({
      collected, analyzed, timeline: timelineAnswer, report: reportAnswers, environment
    }))
  }, [collected, analyzed, timelineAnswer, reportAnswers, environment, caseId])

  const collectEvidence = useCallback((id: string) => {
    setCollected(prev => prev.includes(id) ? prev : [...prev, id])
    setCollectionPhase('done')
  }, [])

  const analyzeEvidence = useCallback((id: string) => {
    setAnalyzed(prev => prev.includes(id) ? prev : [...prev, id])
  }, [])

  const evidence = BEACH_HOMICIDE_EVIDENCE
  const locations = getLocations(collected, analyzed, environment)

  const calculateScore = () => {
    let score = 0
    score += Math.round((collected.length / evidence.length) * 30)
    const correctTimeline = BEACH_HOMICIDE_TIMELINE.filter(t => timelineAnswer[t.id] === t.correctOrder).length
    score += Math.round((correctTimeline / BEACH_HOMICIDE_TIMELINE.length) * 25)
    if (reportAnswers.strongestEvidence) score += 15
    if (reportAnswers.weakestEvidence) score += 10
    if (reportAnswers.confidence) score += 10
    return Math.min(100, score)
  }

  const getRank = (score: number) => {
    if (score >= 90) return { label: 'Lead Investigator', color: 'text-[#FF9500]', bg: 'bg-[rgba(255,149,0,0.1)]' }
    if (score >= 75) return { label: 'Senior Detective', color: 'text-[#FFB840]', bg: 'bg-[rgba(255,184,64,0.1)]' }
    if (score >= 60) return { label: 'Detective', color: 'text-[#C9B99A]', bg: 'bg-[rgba(201,185,154,0.1)]' }
    return { label: 'Trainee Investigator', color: 'text-[#C9B99A]/60', bg: 'bg-[rgba(201,185,154,0.05)]' }
  }

  // Handle map navigation with environment unlocking
  const handleNavigate = (locId: string) => {
    const loc = locations.find(l => l.id === locId)
    if (!loc || loc.status === 'locked') return
    setEnvironment(locId as Environment)
  }

  return (
    <div className="min-h-screen bg-[#05080e] flex">
      {/* Disclaimer Modal */}
      <AnimatePresence>
        {showDisclaimer && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-[#0C1520] border border-[rgba(255,149,0,0.3)] rounded-xl p-6 max-w-lg w-full">
              <div className="flex items-center gap-3 mb-4">
                <ShieldAlert size={24} className="text-[#FF9500]" />
                <h2 className="text-lg text-[#F0EBE1] font-medium">Fictional Training Scenario</h2>
              </div>
              <div className="space-y-3 text-sm text-[#C9B99A]/70 mb-6">
                <p><strong className="text-[#F0EBE1]">The Beach Homicide</strong> is a fictional forensic training case designed for educational purposes only.</p>
                <p>All evidence, witnesses, and circumstances are entirely fabricated.</p>
                <p>This is <strong className="text-[#F0EBE1]">not</strong> legal advice, medical advice, or a substitute for certified forensic training.</p>
              </div>
              <button onClick={() => setShowDisclaimer(false)} className="w-full flex items-center justify-center gap-2 rounded-full h-12 bg-[#FF9500] text-[#1B2838] hover:bg-[#CC6A00] transition-colors font-medium">
                I Understand — Begin Investigation
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 260, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="shrink-0 h-screen overflow-y-auto"
          >
            <InvestigationMap locations={locations} currentLocation={environment} onNavigate={handleNavigate} />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="shrink-0 bg-[#0A0F1A]/95 backdrop-blur-md border-b border-[rgba(255,149,0,0.1)] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-[#C9B99A]/50 hover:text-[#FF9500] transition-colors">
              <MapPin size={18} />
            </button>
            <Link to="/forensics-lab" className="text-xs text-[#C9B99A] hover:text-[#FF9500] transition-colors">← Case Board</Link>
            <span className="text-[#C9B99A]/20">|</span>
            <span className="text-xs text-[#FF9500]">The Beach Homicide</span>
          </div>
          <div className="flex items-center gap-3 text-[10px] text-[#C9B99A]/40">
            <span>Evidence: {collected.length}/{evidence.length}</span>
            <span>Analyzed: {analyzed.length}</span>
          </div>
        </header>

        {/* Environment Viewport */}
        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            {/* ENVIRONMENT: DETECTIVE OFFICE */}
            {environment === 'office' && (
              <OfficeEnvironment onNavigate={setEnvironment} />
            )}

            {/* ENVIRONMENT: BEACH CRIME SCENE — Interactive Board Game */}
            {environment === 'beach' && (
              <BoardGameEnvironment
                collected={collected}
                onCollect={collectEvidence}
                onNavigate={setEnvironment}
              />
            )}

            {/* ENVIRONMENT: EVIDENCE INVENTORY */}
            {environment === 'inventory' && (
              <InventoryEnvironment
                evidence={evidence}
                collected={collected}
                analyzed={analyzed}
                onAnalyze={analyzeEvidence}
                onNavigate={setEnvironment}
              />
            )}

            {/* ENVIRONMENT: LAB HUB */}
            {environment === 'lab-hub' && (
              <LabHubEnvironment onNavigate={setEnvironment} analyzed={analyzed} />
            )}

            {/* ENVIRONMENT: FINGERPRINT STATION */}
            {environment === 'fingerprint' && (
              <FingerprintStation onComplete={() => { analyzeEvidence('fingerprint'); setEnvironment('lab-hub'); }} fingerprints={BEACH_HOMICIDE_FINGERPRINTS} />
            )}

            {/* ENVIRONMENT: AUTOPSY STATION */}
            {environment === 'autopsy' && (
              <AutopsyStation onComplete={() => { analyzeEvidence('autopsy'); setEnvironment('lab-hub'); }} findings={BEACH_HOMICIDE_AUTOPSY} />
            )}

            {/* ENVIRONMENT: DIGITAL STATION */}
            {environment === 'digital' && (
              <DigitalStation onComplete={() => { analyzeEvidence('digital'); setEnvironment('lab-hub'); }} />
            )}

            {/* ENVIRONMENT: TIMELINE */}
            {environment === 'timeline' && (
              <TimelineEnvironment
                timeline={BEACH_HOMICIDE_TIMELINE}
                answer={timelineAnswer}
                setAnswer={setTimelineAnswer}
                onComplete={() => setEnvironment('report')}
              />
            )}

            {/* ENVIRONMENT: REPORT */}
            {environment === 'report' && (
              <ReportEnvironment
                answers={reportAnswers}
                setAnswers={setReportAnswers}
                onSubmit={() => setEnvironment('results')}
              />
            )}

            {/* ENVIRONMENT: RESULTS */}
            {environment === 'results' && (
              <ResultsEnvironment
                score={calculateScore()}
                rank={getRank(calculateScore())}
                collected={collected.length}
                totalEvidence={evidence.length}
                solution={BEACH_HOMICIDE_SOLUTION}
                onRestart={() => {
                  setCollected([]); setAnalyzed([]); setTimelineAnswer({}); setReportAnswers({}); setEnvironment('office');
                  localStorage.removeItem(`forensics-${caseId}`)
                }}
              />
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

// ============================================
// ENVIRONMENT: DETECTIVE OFFICE
// ============================================
function OfficeEnvironment({ onNavigate }: { onNavigate: (env: Environment) => void }) {
  const [activeBoard, setActiveBoard] = useState<string | null>(null)

  const boardItems = [
    { id: 'brief', label: 'Case Brief', content: 'Adult male found deceased on beach shoreline. No witnesses to the event itself. Victim was last seen at a beach gathering. Time of death estimated between midnight and 1:30 AM.' },
    { id: 'persons', label: 'Persons Involved', content: 'Victim: Adult male, 30s. Attended beach gathering with friends. Witness A: Beachgoer, left around midnight. Witness B: Friend of victim. Witness C: Stranger walking dog, heard voices at 12:30 AM.' },
    { id: 'witness', label: 'Witness Statements', content: 'Three witness statements on file. Inconsistencies in departure times noted. Witness C reports hearing voices and seeing a vehicle leave quickly at 12:30 AM.' },
    { id: 'timeline', label: 'Known Timeline', content: '9:00 PM - Victim arrives. 11:30 PM - Last seen at fire pit. 11:47 PM - Last phone call. 11:52 PM - GPS stationary. 12:15 AM - Watch stops. 12:30 AM - Witness C hears voices. 6:45 AM - Body discovered.' },
    { id: 'evidence', label: 'Evidence Status', content: '8 evidence items cataloged at scene. Collection pending trainee investigation. Items include: footwear impressions, mobile phone, wristwatch, beverage container, fabric fragment, tire impression, personal effects, drag marks.' },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative min-h-full">
      {/* Background */}
      <div className="relative h-[60vh] min-h-[400px]">
        <img src="/images/forensics-detective-office.jpg" alt="Detective Office" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05080e] via-[#05080e]/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="inline-flex items-center gap-2 bg-[rgba(255,149,0,0.1)] border border-[rgba(255,149,0,0.2)] rounded-full px-4 py-1.5 mb-3">
            <ClipboardList size={12} className="text-[#FF9500]" />
            <span className="text-[10px] uppercase tracking-[0.15em] text-[#FF9500]">Detective Office</span>
          </div>
          <h2 className="text-2xl text-[#F0EBE1] font-medium mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Case #001 — The Beach Homicide
          </h2>
          <p className="text-sm text-[#C9B99A]/60 max-w-lg">
            Review the case file, examine the evidence board, then proceed to the crime scene.
          </p>
        </div>
      </div>

      {/* Evidence Board */}
      <div className="p-6 max-w-4xl mx-auto">
        <h3 className="text-sm text-[#F0EBE1] font-medium mb-4 flex items-center gap-2">
          <Eye size={16} className="text-[#FF9500]" /> Evidence Board — Select an item
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          {boardItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveBoard(activeBoard === item.id ? null : item.id)}
              className={`text-left rounded-lg border p-4 transition-all ${
                activeBoard === item.id
                  ? 'bg-[rgba(255,149,0,0.1)] border-[rgba(255,149,0,0.3)]'
                  : 'bg-[rgba(27,40,56,0.4)] border-[rgba(255,149,0,0.08)] hover:border-[rgba(255,149,0,0.2)]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#F0EBE1] font-medium">{item.label}</span>
                {activeBoard === item.id ? <ChevronUp size={14} className="text-[#FF9500]" /> : <ChevronDown size={14} className="text-[#C9B99A]/40" />}
              </div>
              <AnimatePresence>
                {activeBoard === item.id && (
                  <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="text-[11px] text-[#C9B99A]/70 mt-2 leading-relaxed overflow-hidden">
                    {item.content}
                  </motion.p>
                )}
              </AnimatePresence>
            </button>
          ))}
        </div>

        <div className="text-center">
          <button onClick={() => onNavigate('beach')} className="inline-flex items-center gap-2 rounded-full h-12 px-8 bg-[#FF9500] text-[#1B2838] hover:bg-[#CC6A00] transition-colors font-medium" style={{ boxShadow: '0 4px 16px rgba(255,149,0,0.25)' }}>
            <Search size={18} /> Proceed to Crime Scene <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// ============================================
// ENVIRONMENT: BEACH CRIME SCENE — BOARD GAME
// ============================================
function BoardGameEnvironment({
  collected, onCollect, onNavigate,
}: {
  collected: string[]
  onCollect: (id: string) => void
  onNavigate: (env: Environment) => void
}) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col">
      <div className="shrink-0 px-4 py-2 bg-[rgba(12,21,32,0.8)] border-b border-[rgba(255,149,0,0.08)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Search size={14} className="text-[#FF9500]" />
          <span className="text-xs text-[#F0EBE1]">Beach Crime Scene — Interactive Board</span>
        </div>
        <span className="text-[10px] text-[#C9B99A]/40">Drag pieces to build your theory</span>
      </div>
      <div className="flex-1 overflow-hidden">
        <ForensicsBoard onCollectEvidence={onCollect} />
      </div>
      {collected.length >= 3 && (
        <div className="shrink-0 text-center py-3 bg-[rgba(12,21,32,0.8)] border-t border-[rgba(255,149,0,0.08)]">
          <button onClick={() => onNavigate('inventory')} className="inline-flex items-center gap-2 rounded-full h-10 px-6 bg-[#FF9500] text-[#1B2838] hover:bg-[#CC6A00] transition-colors text-sm font-medium">
            <Package size={14} /> Proceed to Evidence Intake <ChevronRight size={14} />
          </button>
        </div>
      )}
    </motion.div>
  )
}

// ============================================
// ENVIRONMENT: BEACH CRIME SCENE (OLD — REPLACED)
// ============================================
function BeachEnvironment({
  evidence, collected, selectedEvidence, setSelectedEvidence,
  collectionPhase, setCollectionPhase, collectionFeedback, setCollectionFeedback,
  onCollect, onNavigate,
}: {
  evidence: typeof BEACH_HOMICIDE_EVIDENCE
  collected: string[]
  selectedEvidence: string | null
  setSelectedEvidence: (id: string | null) => void
  collectionPhase: EvidencePhase
  setCollectionPhase: (phase: EvidencePhase) => void
  collectionFeedback: string | null
  setCollectionFeedback: (f: string | null) => void
  onCollect: (id: string) => void
  onNavigate: (env: Environment) => void
}) {
  const selected = evidence.find(e => e.id === selectedEvidence)
  const methods = selected ? COLLECTION_METHODS[selected.id] : null

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative">
      {/* Background Image */}
      <div className="relative h-[70vh] min-h-[500px]">
        <img src="/images/forensics-beach-scene.jpg" alt="Beach Crime Scene" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05080e] via-transparent to-[#05080e]/30" />

        {/* Evidence Hotspots overlaid on image */}
        {evidence.map((ev) => {
          const isCollected = collected.includes(ev.id)
          const isSelected = selectedEvidence === ev.id
          return (
            <button
              key={ev.id}
              onClick={() => { setSelectedEvidence(ev.id); setCollectionPhase('inspect'); setCollectionFeedback(null); }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
              style={{ left: `${ev.x}%`, top: `${ev.y}%` }}
            >
              <div className={`relative transition-all duration-300 ${isSelected ? 'scale-125' : 'group-hover:scale-110'}`}>
                {isCollected ? (
                  <div className="w-8 h-8 rounded-full bg-[#FF9500]/20 border-2 border-[#FF9500] flex items-center justify-center">
                    <CheckCircle size={16} className="text-[#FF9500]" />
                  </div>
                ) : (
                  <>
                    <div className="w-10 h-10 rounded-full border-2 border-[#FF9500]/60 bg-[rgba(255,149,0,0.15)] flex items-center justify-center animate-pulse">
                      <Search size={16} className="text-[#FF9500]" />
                    </div>
                    <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-[#1B2838] border border-[rgba(255,149,0,0.3)] rounded px-2 py-0.5 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[9px] text-[#FF9500]">#{ev.number} {ev.name}</span>
                    </div>
                  </>
                )}
              </div>
            </button>
          )
        })}

        {/* Scene Label */}
        <div className="absolute top-4 left-4">
          <div className="inline-flex items-center gap-2 bg-[rgba(0,0,0,0.6)] backdrop-blur-sm rounded-full px-3 py-1.5">
            <Search size={12} className="text-[#FF9500]" />
            <span className="text-[10px] text-[#FF9500]">Beach Crime Scene</span>
          </div>
        </div>
      </div>

      {/* Evidence Detail Panel */}
      <div className="p-6 max-w-4xl mx-auto">
        {selected && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-[rgba(27,40,56,0.6)] border border-[rgba(255,149,0,0.2)] rounded-xl p-5 mb-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[rgba(255,149,0,0.1)] border border-[rgba(255,149,0,0.3)] flex items-center justify-center text-[#FF9500] text-xs font-bold">
                  {selected.number}
                </span>
                <div>
                  <h3 className="text-base text-[#F0EBE1] font-medium">{selected.name}</h3>
                  <p className="text-[10px] text-[#C9B99A]/50">{selected.category}</p>
                </div>
              </div>
              {collected.includes(selected.id) && <span className="text-[10px] text-[#FF9500] flex items-center gap-1"><CheckCircle size={14} /> Collected</span>}
            </div>

            {/* Collection Sequence */}
            {!collected.includes(selected.id) ? (
              <div>
                {/* Phase 1: Inspect */}
                {collectionPhase === 'inspect' && (
                  <div>
                    <p className="text-sm text-[#C9B99A]/80 mb-3">{selected.sceneDescription}</p>
                    <div className="bg-[rgba(21,32,43,0.6)] rounded-lg p-3 mb-3">
                      <p className="text-[11px] text-[#C9B99A]/60 mb-1 flex items-center gap-1"><Eye size={12} className="text-[#FF9500]" /> Initial Observation</p>
                      <p className="text-sm text-[#F0EBE1]">{selected.initialObservation}</p>
                    </div>
                    <p className="text-[10px] text-[#C9B99A]/40 italic mb-3">{selected.educationalNote}</p>
                    <button onClick={() => setCollectionPhase('photo')} className="inline-flex items-center gap-2 rounded-full h-10 px-6 bg-[#FF9500] text-[#1B2838] hover:bg-[#CC6A00] transition-colors text-sm font-medium">
                      <Camera size={14} /> Photograph Evidence
                    </button>
                  </div>
                )}

                {/* Phase 2: Photo */}
                {collectionPhase === 'photo' && (
                  <div>
                    <div className="bg-[rgba(255,149,0,0.05)] border border-[rgba(255,149,0,0.1)] rounded-lg p-3 mb-3 flex items-center gap-3">
                      <Camera size={20} className="text-[#FF9500]" />
                      <div>
                        <p className="text-xs text-[#F0EBE1]">Evidence photographed with scale</p>
                        <p className="text-[10px] text-[#C9B99A]/50">Location documented in case notes</p>
                      </div>
                    </div>
                    <button onClick={() => setCollectionPhase('document')} className="inline-flex items-center gap-2 rounded-full h-10 px-6 bg-[#FF9500] text-[#1B2838] hover:bg-[#CC6A00] transition-colors text-sm font-medium">
                      <FileText size={14} /> Record Location & Context
                    </button>
                  </div>
                )}

                {/* Phase 3: Document */}
                {collectionPhase === 'document' && (
                  <div>
                    <div className="bg-[rgba(255,149,0,0.05)] border border-[rgba(255,149,0,0.1)] rounded-lg p-3 mb-3">
                      <p className="text-xs text-[#F0EBE1] mb-1">Documenting location context...</p>
                      <p className="text-[10px] text-[#C9B99A]/50">Position: {selected.x}%, {selected.y}% from scene reference</p>
                    </div>
                    <button onClick={() => setCollectionPhase('collect')} className="inline-flex items-center gap-2 rounded-full h-10 px-6 bg-[#FF9500] text-[#1B2838] hover:bg-[#CC6A00] transition-colors text-sm font-medium">
                      <Package size={14} /> Select Collection Method
                    </button>
                  </div>
                )}

                {/* Phase 4: Collect */}
                {collectionPhase === 'collect' && methods && (
                  <div>
                    <p className="text-xs text-[#F0EBE1] font-medium mb-2">Select the correct collection method:</p>
                    <div className="space-y-2 mb-3">
                      <button
                        onClick={() => { onCollect(selected.id); setCollectionFeedback(methods.feedback); }}
                        className="w-full text-left bg-[rgba(21,32,43,0.6)] border border-[rgba(255,149,0,0.15)] rounded-lg p-3 hover:border-[rgba(255,149,0,0.4)] transition-colors"
                      >
                        <span className="text-sm text-[#F0EBE1]">{methods.correct}</span>
                      </button>
                      <button
                        onClick={() => setCollectionFeedback(`Incorrect: ${methods.feedback}`)}
                        className="w-full text-left bg-[rgba(21,32,43,0.6)] border border-red-500/10 rounded-lg p-3 hover:border-red-500/30 transition-colors"
                      >
                        <span className="text-sm text-[#C9B99A]/70">{methods.incorrect}</span>
                      </button>
                    </div>
                    {collectionFeedback && (
                      <div className={`p-3 rounded-lg text-xs mb-3 ${collectionFeedback.startsWith('Incorrect') ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'}`}>
                        {collectionFeedback}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-3 mb-3 flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-400" />
                  <span className="text-xs text-green-400">Evidence #{selected.number} collected and bagged</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div><span className="text-[#C9B99A]/40">Evidence ID:</span> <span className="text-[#F0EBE1]">TKT-001-{String(selected.number).padStart(3, '0')}</span></div>
                  <div><span className="text-[#C9B99A]/40">Status:</span> <span className="text-green-400">Collected</span></div>
                  <div><span className="text-[#C9B99A]/40">Collector:</span> <span className="text-[#F0EBE1]">Trainee Investigator</span></div>
                  <div><span className="text-[#C9B99A]/40">Test:</span> <span className="text-[#FF9500]">{selected.labTest}</span></div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {!selected && (
          <div className="text-center py-8">
            <Search size={32} className="text-[#FF9500]/20 mx-auto mb-3" />
            <p className="text-sm text-[#C9B99A]/50">Click on the pulsing evidence markers in the scene to examine and collect evidence.</p>
          </div>
        )}

        {collected.length >= 3 && (
          <div className="text-center mt-4">
            <button onClick={() => onNavigate('inventory')} className="inline-flex items-center gap-2 rounded-full h-12 px-8 bg-[#FF9500] text-[#1B2838] hover:bg-[#CC6A00] transition-colors font-medium">
              <Package size={16} /> Proceed to Evidence Intake <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  )
}

// ============================================
// ENVIRONMENT: EVIDENCE INVENTORY
// ============================================
function InventoryEnvironment({ evidence, collected, analyzed, onAnalyze, onNavigate }: {
  evidence: typeof BEACH_HOMICIDE_EVIDENCE
  collected: string[]
  analyzed: string[]
  onAnalyze: (id: string) => void
  onNavigate: (env: Environment) => void
}) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 bg-[rgba(255,149,0,0.1)] border border-[rgba(255,149,0,0.2)] rounded-full px-4 py-1.5 mb-3">
          <Package size={12} className="text-[#FF9500]" />
          <span className="text-[10px] uppercase tracking-[0.15em] text-[#FF9500]">Evidence Intake</span>
        </div>
        <h2 className="text-xl text-[#F0EBE1] font-medium" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
          Chain of Custody
        </h2>
        <p className="text-xs text-[#C9B99A]/60 mt-1">
          All collected evidence with tracking information. Training progress stored locally — not a secure forensic record.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        {evidence.map((ev) => {
          const isCollected = collected.includes(ev.id)
          const isAnalyzed = analyzed.includes(ev.id)
          return (
            <div key={ev.id} className={`rounded-xl border p-4 transition-all ${isCollected ? 'bg-[rgba(27,40,56,0.6)] border-[rgba(255,149,0,0.15)]' : 'bg-[rgba(27,40,56,0.15)] border-[rgba(255,149,0,0.05)] opacity-40'}`}>
              <div className="flex items-center gap-3 mb-2">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold ${isCollected ? 'bg-[#FF9500]/20 text-[#FF9500]' : 'bg-[#C9B99A]/10 text-[#C9B99A]/30'}`}>{ev.number}</span>
                <div>
                  <p className={`text-sm font-medium ${isCollected ? 'text-[#F0EBE1]' : 'text-[#C9B99A]/40'}`}>{ev.name}</p>
                  <p className="text-[9px] text-[#C9B99A]/40">TKT-001-{String(ev.number).padStart(3, '0')}</p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  {isCollected && <span className="text-[9px] text-green-400 flex items-center gap-0.5"><CheckCircle size={10} /> Collected</span>}
                  {isAnalyzed && <span className="text-[9px] text-[#FF9500] flex items-center gap-0.5"><Microscope size={10} /> Analyzed</span>}
                </div>
              </div>
              {isCollected && (
                <div className="mt-2 pt-2 border-t border-[rgba(255,149,0,0.08)] space-y-1">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px]">
                    <span className="text-[#C9B99A]/40">Location: <span className="text-[#F0EBE1]">Beach Scene</span></span>
                    <span className="text-[#C9B99A]/40">Collector: <span className="text-[#F0EBE1]">Trainee</span></span>
                    <span className="text-[#C9B99A]/40">Method: <span className="text-[#F0EBE1]">Photograph + Collect</span></span>
                    <span className="text-[#C9B99A]/40">Test: <span className="text-[#FF9500]">{ev.labTest}</span></span>
                  </div>
                  {isAnalyzed ? (
                    <p className="text-[11px] text-green-400/80 bg-green-500/5 rounded p-2 mt-2">{ev.labResult}</p>
                  ) : (
                    <button onClick={() => onAnalyze(ev.id)} className="text-[10px] text-[#FF9500] hover:underline mt-1">Request lab analysis: {ev.labTest} →</button>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {collected.length >= 5 && (
        <div className="text-center">
          <button onClick={() => onNavigate('lab-hub')} className="inline-flex items-center gap-2 rounded-full h-12 px-8 bg-[#FF9500] text-[#1B2838] hover:bg-[#CC6A00] transition-colors font-medium">
            <Microscope size={16} /> Enter Forensics Lab <ChevronRight size={16} />
          </button>
        </div>
      )}
    </motion.div>
  )
}

// ============================================
// ENVIRONMENT: LAB HUB
// ============================================
function LabHubEnvironment({ onNavigate, analyzed }: { onNavigate: (env: Environment) => void; analyzed: string[] }) {
  const stations = [
    { id: 'fingerprint' as Environment, label: 'Fingerprint / Impression', icon: Fingerprint, desc: 'Compare recovered prints against known samples', status: analyzed.includes('fingerprint') ? 'complete' : 'available' },
    { id: 'autopsy' as Environment, label: 'Autopsy / Postmortem', icon: HeartPulse, desc: 'Review medical examiner findings', status: analyzed.includes('autopsy') ? 'complete' : 'available' },
    { id: 'digital' as Environment, label: 'Digital Forensics', icon: Smartphone, desc: 'Analyze phone data and digital evidence', status: analyzed.includes('digital') ? 'complete' : 'available' },
  ]

  const comingSoon = [
    { label: 'DNA Analysis', icon: Microscope },
    { label: 'Ballistics', icon: Microscope },
    { label: 'Toxicology', icon: Microscope },
    { label: 'Trace Evidence', icon: Microscope },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative">
      <div className="relative h-[50vh] min-h-[350px]">
        <img src="/images/forensics-lab-hub.jpg" alt="Forensics Lab Hub" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05080e] via-[#05080e]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="inline-flex items-center gap-2 bg-[rgba(0,0,0,0.6)] backdrop-blur-sm rounded-full px-3 py-1.5 mb-3">
            <Microscope size={12} className="text-cyan-400" />
            <span className="text-[10px] text-cyan-400">Forensics Lab Hub</span>
          </div>
          <h2 className="text-2xl text-[#F0EBE1] font-medium" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Main Forensics Laboratory
          </h2>
          <p className="text-sm text-[#C9B99A]/60 max-w-lg mt-1">
            Select a laboratory station to analyze collected evidence.
          </p>
        </div>
      </div>

      <div className="p-6 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          {stations.map((s) => (
            <button
              key={s.id}
              onClick={() => onNavigate(s.id)}
              className={`text-left rounded-xl border p-5 transition-all ${
                s.status === 'complete'
                  ? 'bg-green-500/5 border-green-500/20 hover:border-green-500/40'
                  : 'bg-[rgba(27,40,56,0.6)] border-[rgba(255,149,0,0.15)] hover:border-[rgba(255,149,0,0.4)]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <s.icon size={24} className={s.status === 'complete' ? 'text-green-400' : 'text-[#FF9500]'} />
                {s.status === 'complete' && <CheckCircle size={16} className="text-green-400" />}
              </div>
              <p className="text-sm text-[#F0EBE1] font-medium mb-1">{s.label}</p>
              <p className="text-[11px] text-[#C9B99A]/50">{s.desc}</p>
            </button>
          ))}
        </div>

        <div className="border-t border-[rgba(255,149,0,0.08)] pt-4">
          <p className="text-[10px] uppercase tracking-wider text-[#C9B99A]/30 mb-3">Additional Stations — Coming Soon</p>
          <div className="flex flex-wrap gap-2">
            {comingSoon.map((cs) => (
              <span key={cs.label} className="inline-flex items-center gap-1 text-[10px] text-[#C9B99A]/30 bg-[#1B2838] rounded-full px-3 py-1">
                <Lock size={10} /> {cs.label}
              </span>
            ))}
          </div>
        </div>

        {analyzed.length >= 2 && (
          <div className="text-center mt-6">
            <button onClick={() => onNavigate('timeline')} className="inline-flex items-center gap-2 rounded-full h-12 px-8 bg-[#FF9500] text-[#1B2838] hover:bg-[#CC6A00] transition-colors font-medium">
              <Clock size={16} /> Build Timeline <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  )
}

// ============================================
// FINGERPRINT STATION
// ============================================
function FingerprintStation({ onComplete, fingerprints }: { onComplete: () => void; fingerprints: typeof BEACH_HOMICIDE_FINGERPRINTS }) {
  const [selected, setSelected] = useState<string | null>(null)
  const correct = fingerprints.find(f => f.isMatch)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 bg-[rgba(255,149,0,0.1)] border border-[rgba(255,149,0,0.2)] rounded-full px-4 py-1.5 mb-3">
          <Fingerprint size={12} className="text-[#FF9500]" />
          <span className="text-[10px] uppercase tracking-[0.15em] text-[#FF9500]">Fingerprint / Impression Analysis</span>
        </div>
        <h2 className="text-xl text-[#F0EBE1] font-medium">Comparison Workstation</h2>
        <p className="text-xs text-[#C9B99A]/60 mt-1">Compare the recovered impression against known samples. You may select "Inconclusive" if the evidence is insufficient.</p>
      </div>

      <div className="bg-[rgba(27,40,56,0.6)] border border-[rgba(255,149,0,0.15)] rounded-xl p-5 mb-4">
        <p className="text-xs text-[#FF9500]/70 font-medium mb-2">Recovered Evidence</p>
        <p className="text-sm text-[#F0EBE1]">{fingerprints[0].label}</p>
        <p className="text-xs text-[#C9B99A]/50">{fingerprints[0].pattern}</p>
        <div className="mt-2 flex flex-wrap gap-1">
          {fingerprints[0].characteristics.map((c, i) => (
            <span key={i} className="text-[9px] text-[#C9B99A]/50 bg-[#1B2838] rounded px-2 py-0.5">{c}</span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        {fingerprints.slice(1).map((f) => (
          <button
            key={f.id}
            onClick={() => setSelected(f.id)}
            className={`text-left rounded-xl border p-4 transition-all ${
              selected === f.id
                ? f.isMatch ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'
                : 'bg-[rgba(27,40,56,0.4)] border-[rgba(255,149,0,0.08)] hover:border-[rgba(255,149,0,0.2)]'
            }`}
          >
            <p className="text-sm text-[#F0EBE1] font-medium mb-1">{f.label}</p>
            <p className="text-[11px] text-[#C9B99A]/50 mb-2">{f.pattern}</p>
            <div className="flex flex-wrap gap-1">
              {f.characteristics.map((c, i) => (
                <span key={i} className="text-[9px] text-[#C9B99A]/40 bg-[#1B2838] rounded px-1.5 py-0.5">{c}</span>
              ))}
            </div>
          </button>
        ))}
      </div>

      <button onClick={() => setSelected('inconclusive')} className={`mb-4 text-xs px-4 py-2 rounded-lg border transition-colors ${selected === 'inconclusive' ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400' : 'border-[rgba(255,149,0,0.1)] text-[#C9B99A]/50 hover:border-[rgba(255,149,0,0.3)]'}`}>
        Inconclusive — Insufficient detail for identification
      </button>

      {selected && selected !== 'inconclusive' && correct && (
        <div className={`p-3 rounded-lg text-xs mb-4 ${selected === correct.id ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
          {selected === correct.id
            ? 'Correct. Pattern characteristics align with Sample B. However, real identification requires many more comparison points and expert verification in an accredited laboratory.'
            : `Not the best match. The strongest alignment is with ${correct.label}. Review ridge count and pattern type.`}
        </div>
      )}

      {selected === 'inconclusive' && (
        <div className="p-3 rounded-lg text-xs mb-4 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
          Valid choice. The recovered impression has limited ridge detail. A real examiner might also find this inconclusive and request better-quality evidence.
        </div>
      )}

      {selected && (
        <button onClick={onComplete} className="inline-flex items-center gap-2 rounded-full h-10 px-6 bg-[#FF9500] text-[#1B2838] hover:bg-[#CC6A00] transition-colors text-sm font-medium">
          <CheckCircle size={14} /> Complete Analysis
        </button>
      )}
    </motion.div>
  )
}

// ============================================
// AUTOPSY STATION
// ============================================
function AutopsyStation({ onComplete, findings }: { onComplete: () => void; findings: typeof BEACH_HOMICIDE_AUTOPSY }) {
  const [categorized, setCategorized] = useState<Record<string, string>>({})
  const allDone = findings.every(f => categorized[f.id])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 bg-[rgba(255,149,0,0.1)] border border-[rgba(255,149,0,0.2)] rounded-full px-4 py-1.5 mb-3">
          <HeartPulse size={12} className="text-[#FF9500]" />
          <span className="text-[10px] uppercase tracking-[0.15em] text-[#FF9500]">Autopsy / Postmortem Review</span>
        </div>
        <h2 className="text-xl text-[#F0EBE1] font-medium">Medical Examiner Review</h2>
        <p className="text-xs text-[#C9B99A]/60 mt-1">Classify each finding as: Observed Fact, Medical Interpretation, or Unresolved Question.</p>
      </div>

      <div className="space-y-3 mb-6">
        {findings.map((f) => {
          const cat = categorized[f.id]
          return (
            <div key={f.id} className="bg-[rgba(27,40,56,0.6)] border border-[rgba(255,149,0,0.1)] rounded-xl p-4">
              <p className="text-sm text-[#F0EBE1] mb-1">{f.finding}</p>
              <p className="text-xs text-[#C9B99A]/60 mb-3">{f.details}</p>
              <div className="flex gap-2 flex-wrap">
                {['Observed Fact', 'Medical Interpretation', 'Unresolved Question'].map((option) => (
                  <button
                    key={option}
                    onClick={() => setCategorized({ ...categorized, [f.id]: option })}
                    className={`px-3 py-1.5 rounded-full text-[10px] transition-colors ${
                      cat === option
                        ? option === f.category ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : cat ? 'opacity-30 text-[#C9B99A]/30 border border-[#C9B99A]/10'
                        : 'text-[#C9B99A]/60 border border-[rgba(255,149,0,0.1)] hover:border-[rgba(255,149,0,0.3)]'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {cat === f.category && <p className="text-[10px] text-green-400/70 mt-2">Correct! This is {f.category}.</p>}
              {cat && cat !== f.category && <p className="text-[10px] text-red-400/70 mt-2">This is actually {f.category}. {f.category === 'Observed Fact' ? 'Directly observable.' : f.category === 'Medical Interpretation' ? 'Requires expert judgment.' : 'Cannot be determined.'}</p>}
            </div>
          )
        })}
      </div>

      {allDone && (
        <button onClick={onComplete} className="inline-flex items-center gap-2 rounded-full h-10 px-6 bg-[#FF9500] text-[#1B2838] hover:bg-[#CC6A00] transition-colors text-sm font-medium">
          <CheckCircle size={14} /> Complete Analysis
        </button>
      )}
    </motion.div>
  )
}

// ============================================
// DIGITAL FORENSICS STATION
// ============================================
function DigitalStation({ onComplete }: { onComplete: () => void }) {
  const [distinguished, setDistinguished] = useState(false)

  const data = [
    { label: 'Last Outgoing Call', value: '11:47 PM', duration: '45 sec', type: 'proven', note: 'Call to known contact — verified' },
    { label: 'GPS Last Active', value: '11:52 PM', duration: null, type: 'proven', note: 'Stationary at scene coordinates' },
    { label: 'Unread Messages', value: '2 messages', duration: null, type: 'inference', note: 'Sender labeled "Unknown" — identity not confirmed' },
    { label: 'Battery Depleted', value: '~12:30 AM', duration: null, type: 'proven', note: 'Device log confirms shutdown' },
    { label: 'Screen Unlocked', value: 'Yes', duration: null, type: 'inference', note: 'Could indicate hurried departure OR intentional access' },
    { label: 'No Photos After 9PM', value: 'Confirmed', duration: null, type: 'proven', note: 'Last photo: group at fire pit' },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 bg-[rgba(255,149,0,0.1)] border border-[rgba(255,149,0,0.2)] rounded-full px-4 py-1.5 mb-3">
          <Smartphone size={12} className="text-[#FF9500]" />
          <span className="text-[10px] uppercase tracking-[0.15em] text-[#FF9500]">Digital Forensics</span>
        </div>
        <h2 className="text-xl text-[#F0EBE1] font-medium">Phone Data Analysis</h2>
        <p className="text-xs text-[#C9B99A]/60 mt-1">Distinguish between proven facts and possible inferences from device data.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        {data.map((item, i) => (
          <button
            key={i}
            onClick={() => setDistinguished(true)}
            className="text-left bg-[rgba(27,40,56,0.6)] border border-[rgba(255,149,0,0.1)] rounded-xl p-4 hover:border-[rgba(255,149,0,0.2)] transition-colors"
          >
            <div className="flex items-center justify-between mb-1">
              <p className="text-[10px] text-[#C9B99A]/50">{item.label}</p>
              <span className={`text-[9px] px-2 py-0.5 rounded-full ${item.type === 'proven' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                {item.type === 'proven' ? 'Proven Fact' : 'Inference'}
              </span>
            </div>
            <p className="text-sm text-[#F0EBE1] font-medium">{item.value}</p>
            <p className="text-[11px] text-[#C9B99A]/60 mt-1">{item.note}</p>
          </button>
        ))}
      </div>

      {distinguished && (
        <div className="bg-[rgba(255,149,0,0.05)] border border-[rgba(255,149,0,0.15)] rounded-lg p-4 mb-4">
          <p className="text-xs text-[#FF9500]/80 mb-2"><Info size={12} className="inline mr-1" /> Key Learning Point</p>
          <p className="text-xs text-[#C9B99A]/70">Device data shows activity, but cannot prove <em>who</em> was holding the phone or <em>why</em> they were there. GPS puts the device at the scene — not necessarily the victim by choice. Always correlate digital evidence with physical evidence and witness statements.</p>
        </div>
      )}

      <button onClick={onComplete} className="inline-flex items-center gap-2 rounded-full h-10 px-6 bg-[#FF9500] text-[#1B2838] hover:bg-[#CC6A00] transition-colors text-sm font-medium">
        <CheckCircle size={14} /> Complete Analysis
      </button>
    </motion.div>
  )
}

// ============================================
// TIMELINE ENVIRONMENT
// ============================================
function TimelineEnvironment({ timeline, answer, setAnswer, onComplete }: {
  timeline: typeof BEACH_HOMICIDE_TIMELINE
  answer: Record<string, number>
  setAnswer: React.Dispatch<React.SetStateAction<Record<string, number>>>
  onComplete: () => void
}) {
  const [order, setOrder] = useState<string[]>(() => [...timeline].sort(() => Math.random() - 0.5).map(t => t.id))
  const [submitted, setSubmitted] = useState(false)

  const moveItem = (index: number, dir: number) => {
    if (index + dir < 0 || index + dir >= order.length) return
    const newOrder = [...order]
    ;[newOrder[index], newOrder[index + dir]] = [newOrder[index + dir], newOrder[index]]
    setOrder(newOrder)
  }

  const submit = () => {
    const newAnswer: Record<string, number> = {}
    order.forEach((id, index) => { newAnswer[id] = index + 1 })
    setAnswer(newAnswer)
    setSubmitted(true)
  }

  const allCorrect = timeline.every(t => answer[t.id] === t.correctOrder)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 bg-[rgba(255,149,0,0.1)] border border-[rgba(255,149,0,0.2)] rounded-full px-4 py-1.5 mb-3">
          <Clock size={12} className="text-[#FF9500]" />
          <span className="text-[10px] uppercase tracking-[0.15em] text-[#FF9500]">Timeline Room</span>
        </div>
        <h2 className="text-xl text-[#F0EBE1] font-medium">Event Sequence Builder</h2>
        <p className="text-xs text-[#C9B99A]/60 mt-1">Arrange events in chronological order using the arrows.</p>
      </div>

      <div className="space-y-2 mb-6">
        {order.map((id, index) => {
          const event = timeline.find(t => t.id === id)
          if (!event) return null
          const isCorrect = submitted && answer[id] === event.correctOrder
          const isWrong = submitted && answer[id] !== event.correctOrder
          return (
            <div key={id} className={`flex items-center gap-3 rounded-lg border p-3 transition-colors ${
              isCorrect ? 'bg-green-500/5 border-green-500/20' : isWrong ? 'bg-red-500/5 border-red-500/20' : 'bg-[rgba(27,40,56,0.6)] border-[rgba(255,149,0,0.08)]'
            }`}>
              <span className="text-sm text-[#FF9500] font-mono w-6">{index + 1}</span>
              <div className="flex-1">
                <p className="text-sm text-[#F0EBE1]">{event.description}</p>
                <p className="text-[10px] text-[#C9B99A]/50">{event.time} — {event.source}</p>
              </div>
              {!submitted && (
                <div className="flex flex-col gap-0.5">
                  <button onClick={() => moveItem(index, -1)} disabled={index === 0} className="text-[#C9B99A]/40 hover:text-[#FF9500] disabled:opacity-20">▲</button>
                  <button onClick={() => moveItem(index, 1)} disabled={index === order.length - 1} className="text-[#C9B99A]/40 hover:text-[#FF9500] disabled:opacity-20">▼</button>
                </div>
              )}
              {submitted && (isCorrect ? <CheckCircle size={16} className="text-green-400" /> : <AlertCircle size={16} className="text-red-400" />)}
            </div>
          )
        })}
      </div>

      {!submitted ? (
        <button onClick={submit} className="inline-flex items-center gap-2 rounded-full h-10 px-6 bg-[#FF9500] text-[#1B2838] hover:bg-[#CC6A00] transition-colors text-sm font-medium">
          Check Order
        </button>
      ) : (
        <div className="flex items-center gap-3">
          <button onClick={() => { setSubmitted(false); setAnswer({}); }} className="text-xs text-[#C9B99A]/60 hover:text-[#FF9500]">Try Again</button>
          <button onClick={onComplete} className="inline-flex items-center gap-2 rounded-full h-10 px-6 bg-[#FF9500] text-[#1B2838] hover:bg-[#CC6A00] transition-colors text-sm font-medium">
            Continue to Report <ChevronRight size={14} />
          </button>
        </div>
      )}

      {submitted && allCorrect && <p className="mt-2 text-xs text-green-400">All events in correct chronological order!</p>}
    </motion.div>
  )
}

// ============================================
// REPORT ENVIRONMENT
// ============================================
function ReportEnvironment({ answers, setAnswers, onSubmit }: {
  answers: Record<string, string>
  setAnswers: React.Dispatch<React.SetStateAction<Record<string, string>>>
  onSubmit: () => void
}) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 bg-[rgba(255,149,0,0.1)] border border-[rgba(255,149,0,0.2)] rounded-full px-4 py-1.5 mb-3">
          <FileText size={12} className="text-[#FF9500]" />
          <span className="text-[10px] uppercase tracking-[0.15em] text-[#FF9500]">Case Report Desk</span>
        </div>
        <h2 className="text-xl text-[#F0EBE1] font-medium">Final Case Report</h2>
        <p className="text-xs text-[#C9B99A]/60 mt-1">Distinguish between fact, inference, and hypothesis.</p>
      </div>

      <div className="space-y-4 mb-6">
        {[
          { key: 'sequence', label: 'Probable Sequence of Events', placeholder: 'Describe what you believe happened based on the evidence...', rows: 3 },
          { key: 'strongestEvidence', label: 'Strongest Evidence', placeholder: 'What evidence most strongly supports your theory?', rows: 2 },
          { key: 'weakestEvidence', label: 'Weakest Evidence / Ambiguities', placeholder: 'What is ambiguous or could support an alternative theory?', rows: 2 },
          { key: 'unresolvedQuestions', label: 'Unresolved Questions', placeholder: 'What questions remain unanswered?', rows: 2 },
        ].map(({ key, label, placeholder, rows }) => (
          <div key={key}>
            <label className="text-sm text-[#F0EBE1] mb-1.5 block">{label}</label>
            <textarea
              value={answers[key] || ''}
              onChange={e => setAnswers({ ...answers, [key]: e.target.value })}
              placeholder={placeholder}
              rows={rows}
              className="w-full bg-[rgba(21,32,43,0.6)] border border-[rgba(255,149,0,0.15)] rounded-lg px-4 py-2.5 text-sm text-[#F0EBE1] placeholder:text-[#C9B99A]/25 focus:outline-none focus:border-[rgba(255,149,0,0.4)] resize-none"
            />
          </div>
        ))}

        <div>
          <label className="text-sm text-[#F0EBE1] mb-1.5 block">Confidence Level</label>
          <select
            value={answers.confidence || ''}
            onChange={e => setAnswers({ ...answers, confidence: e.target.value })}
            className="w-full bg-[rgba(21,32,43,0.6)] border border-[rgba(255,149,0,0.15)] rounded-lg px-4 py-2.5 text-sm text-[#F0EBE1] focus:outline-none focus:border-[rgba(255,149,0,0.4)]"
          >
            <option value="">Select...</option>
            <option value="high">High — Evidence strongly supports conclusion</option>
            <option value="moderate">Moderate — Evidence supports but gaps remain</option>
            <option value="low">Low — Significant uncertainty, more evidence needed</option>
          </select>
        </div>
      </div>

      <button onClick={onSubmit} className="inline-flex items-center gap-2 rounded-full h-12 px-8 bg-[#FF9500] text-[#1B2838] hover:bg-[#CC6A00] transition-colors font-medium">
        Submit Report <CheckCircle size={16} />
      </button>
    </motion.div>
  )
}

// ============================================
// RESULTS ENVIRONMENT
// ============================================
function ResultsEnvironment({ score, rank, collected, totalEvidence, solution, onRestart }: {
  score: number
  rank: { label: string; color: string; bg: string }
  collected: number
  totalEvidence: number
  solution: typeof BEACH_HOMICIDE_SOLUTION
  onRestart: () => void
}) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="p-6 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: 'spring' }} className="w-24 h-24 rounded-full bg-[rgba(255,149,0,0.1)] border-2 border-[#FF9500] flex items-center justify-center mx-auto mb-4">
          <Award size={40} className="text-[#FF9500]" />
        </motion.div>
        <h2 className="text-2xl text-[#F0EBE1] font-medium mb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Investigation Complete</h2>
        <p className={`text-lg font-medium ${rank.color} mb-2`}>{rank.label}</p>
        <div className="text-5xl text-[#FF9500] font-medium mb-2">{score}<span className="text-2xl text-[#C9B99A]/40">/100</span></div>
        <p className="text-xs text-[#C9B99A]/50">Evidence collected: {collected}/{totalEvidence}</p>
      </div>

      <div className="bg-[rgba(27,40,56,0.6)] border border-[rgba(255,149,0,0.15)] rounded-xl p-5 mb-6">
        <h3 className="text-sm text-[#F0EBE1] font-medium mb-3">Case Solution — Educational Review</h3>
        <div className="space-y-3 text-xs text-[#C9B99A]/70">
          <p>{solution.probableSequence}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <p className="text-[10px] text-green-400/70 uppercase tracking-wider mb-1">Strongest Evidence</p>
              {solution.strongestEvidence.map((e, i) => <p key={i} className="flex items-start gap-1"><CheckCircle size={10} className="text-green-400/50 shrink-0 mt-0.5" />{e}</p>)}
            </div>
            <div>
              <p className="text-[10px] text-yellow-400/70 uppercase tracking-wider mb-1">What Remains Uncertain</p>
              {solution.unresolvedQuestions.map((q, i) => <p key={i} className="flex items-start gap-1"><AlertCircle size={10} className="text-yellow-400/50 shrink-0 mt-0.5" />{q}</p>)}
            </div>
          </div>
          <div>
            <p className="text-[10px] text-[#FF9500] uppercase tracking-wider mb-1">Recommended Next Steps</p>
            {solution.nextSteps.map((s, i) => <p key={i} className="flex items-start gap-1"><span className="text-[#FF9500]/50">→</span>{s}</p>)}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-[rgba(255,149,0,0.1)] to-[rgba(27,40,56,0.4)] border border-[rgba(255,149,0,0.2)] rounded-xl p-6 text-center mb-6">
        <p className="text-[10px] uppercase tracking-[0.2em] text-[#FF9500]/60 mb-2">#TheKingsTake</p>
        <p className="text-lg text-[#F0EBE1] font-medium mb-1">Forensic Reasoning — Level 1</p>
        <p className="text-xs text-[#C9B99A]/50">The Beach Homicide — Training Case</p>
        <p className="text-xs text-[#C9B99A]/40 mt-1">Completed {new Date().toLocaleDateString()}</p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button onClick={onRestart} className="inline-flex items-center gap-2 rounded-full h-12 px-8 bg-[#FF9500] text-[#1B2838] hover:bg-[#CC6A00] transition-colors font-medium">
          <RotateCcw size={16} /> Restart Case
        </button>
        <Link to="/forensics-lab" className="inline-flex items-center gap-2 rounded-full h-12 px-8 border border-[rgba(255,149,0,0.4)] text-[#FF9500] hover:bg-[rgba(255,149,0,0.08)] transition-colors">
          <Home size={16} /> Case Board
        </Link>
      </div>
    </motion.div>
  )
}
