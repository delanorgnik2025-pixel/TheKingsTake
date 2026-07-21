import { useState, useCallback } from 'react'
import { useParams, Link } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, Microscope, Search, ClipboardList, Fingerprint, HeartPulse,
  Smartphone, Clock, CheckCircle, AlertCircle, ChevronRight, RotateCcw,
  Home, Award, Share2, Eye, EyeOff, BookOpen, ShieldAlert
} from 'lucide-react'
import {
  BEACH_HOMICIDE_EVIDENCE, BEACH_HOMICIDE_WITNESSES,
  BEACH_HOMICIDE_TIMELINE, BEACH_HOMICIDE_AUTOPSY,
  BEACH_HOMICIDE_FINGERPRINTS, BEACH_HOMICIDE_SOLUTION,
} from '../data/forensics-evidence'

// ============================================
// FORENSICS CASE PAGE — Full Investigation Flow
// Scene → Inventory → Lab Stations → Timeline → Report → Badge
// ============================================

type Phase = 'scene' | 'inventory' | 'lab' | 'timeline' | 'report' | 'results'
type LabTab = 'fingerprint' | 'autopsy' | 'digital'

export default function ForensicsCasePage() {
  const { caseId } = useParams()
  const [phase, setPhase] = useState<Phase>('scene')
  const [labTab, setLabTab] = useState<LabTab>('fingerprint')
  const [collected, setCollected] = useState<string[]>([])
  const [analyzed, setAnalyzed] = useState<string[]>([])
  const [timelineAnswer, setTimelineAnswer] = useState<Record<string, number>>({})
  const [reportAnswers, setReportAnswers] = useState<Record<string, string>>({})
  const [hoveredEvidence, setHoveredEvidence] = useState<string | null>(null)
  const [selectedEvidence, setSelectedEvidence] = useState<string | null>(null)
  const [showDisclaimer, setShowDisclaimer] = useState(true)

  const collectEvidence = useCallback((id: string) => {
    setCollected(prev => prev.includes(id) ? prev : [...prev, id])
  }, [])

  const analyzeEvidence = useCallback((id: string) => {
    setAnalyzed(prev => prev.includes(id) ? prev : [...prev, id])
  }, [])

  const evidence = BEACH_HOMICIDE_EVIDENCE
  const progress = {
    collected: collected.length,
    total: evidence.length,
    analyzed: analyzed.length,
  }

  // Score calculation
  const calculateScore = () => {
    let score = 0
    score += Math.round((collected.length / evidence.length) * 30)
    const correctTimeline = BEACH_HOMICIDE_TIMELINE.filter(t => timelineAnswer[t.id] === t.correctOrder).length
    score += Math.round((correctTimeline / BEACH_HOMICIDE_TIMELINE.length) * 25)
    if (reportAnswers.strongestEvidence) score += 15
    if (reportAnswers.weakestEvidence) score += 10
    if (reportAnswers.unresolvedQuestions) score += 10
    if (reportAnswers.confidence) score += 10
    return Math.min(100, score)
  }

  const getRank = (score: number) => {
    if (score >= 90) return { label: 'Lead Investigator', color: 'text-[#FF9500]' }
    if (score >= 75) return { label: 'Senior Detective', color: 'text-[#FFB840]' }
    if (score >= 60) return { label: 'Detective', color: 'text-[#C9B99A]' }
    return { label: 'Trainee Investigator', color: 'text-[#C9B99A]/60' }
  }

  return (
    <div className="min-h-screen bg-[#05080e]">
      {/* Disclaimer Modal */}
      <AnimatePresence>
        {showDisclaimer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#0C1520] border border-[rgba(255,149,0,0.3)] rounded-xl p-6 max-w-lg w-full"
            >
              <div className="flex items-center gap-3 mb-4">
                <ShieldAlert size={24} className="text-[#FF9500]" />
                <h2 className="text-lg text-[#F0EBE1] font-medium">Educational Disclaimer</h2>
              </div>
              <div className="space-y-3 text-sm text-[#C9B99A]/70 mb-6">
                <p>This is a <strong className="text-[#F0EBE1]">fictional educational case</strong> designed to teach forensic reasoning principles.</p>
                <p>All evidence, witnesses, and circumstances are entirely fabricated for training purposes.</p>
                <p>This is <strong className="text-[#F0EBE1]">not</strong> legal advice, medical advice, or a substitute for certified forensic training.</p>
                <p>Real forensic investigations must be conducted by qualified professionals in accredited laboratories.</p>
              </div>
              <button
                onClick={() => setShowDisclaimer(false)}
                className="w-full flex items-center justify-center gap-2 rounded-full h-12 bg-[#FF9500] text-[#1B2838] hover:bg-[#CC6A00] transition-colors font-medium"
              >
                I Understand — Begin Investigation
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0A0F1A]/95 backdrop-blur-md border-b border-[rgba(255,149,0,0.1)]">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/forensics-lab" className="text-xs text-[#C9B99A] hover:text-[#FF9500] transition-colors flex items-center gap-1">
              <ArrowLeft size={14} /> Case Board
            </Link>
            <span className="text-[#C9B99A]/20">|</span>
            <span className="text-xs text-[#FF9500]">The Beach Homicide</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] uppercase tracking-wider text-[#C9B99A]/40">Evidence: {progress.collected}/{progress.total}</span>
            <span className="text-[#C9B99A]/20">|</span>
            <span className="text-[9px] uppercase tracking-wider text-[#C9B99A]/40">Analyzed: {progress.analyzed}/{progress.total}</span>
          </div>
        </div>
      </header>

      {/* Phase Navigation */}
      <div className="bg-[#0C1520] border-b border-[rgba(255,149,0,0.08)]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-1 overflow-x-auto py-2">
            {[
              { key: 'scene' as Phase, label: 'Crime Scene', icon: Search },
              { key: 'inventory' as Phase, label: 'Evidence', icon: ClipboardList },
              { key: 'lab' as Phase, label: 'Lab Analysis', icon: Microscope },
              { key: 'timeline' as Phase, label: 'Timeline', icon: Clock },
              { key: 'report' as Phase, label: 'Case Report', icon: BookOpen },
              { key: 'results' as Phase, label: 'Results', icon: Award },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setPhase(key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] whitespace-nowrap transition-colors ${
                  phase === key
                    ? 'bg-[rgba(255,149,0,0.15)] text-[#FF9500]'
                    : 'text-[#C9B99A]/50 hover:text-[#C9B99A]'
                }`}
              >
                <Icon size={12} /> {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          {/* PHASE: CRIME SCENE */}
          {phase === 'scene' && (
            <motion.div key="scene" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl text-[#F0EBE1] font-medium" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  Crime Scene — Beach Shoreline
                </h2>
                <span className="text-[10px] text-[#C9B99A]/40">Click evidence markers to examine and collect</span>
              </div>

              {/* Scene Canvas */}
              <div className="relative bg-[#0C1520] rounded-xl border border-[rgba(255,149,0,0.15)] overflow-hidden mb-6" style={{ aspectRatio: '16/9' }}>
                {/* SVG Scene */}
                <svg viewBox="0 0 1000 562" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                  {/* Sky */}
                  <rect x="0" y="0" width="1000" height="250" fill="#0a0e1a" />
                  {/* Stars */}
                  <circle cx="100" cy="50" r="1" fill="#fff" opacity="0.5" />
                  <circle cx="250" cy="80" r="1.5" fill="#fff" opacity="0.3" />
                  <circle cx="400" cy="40" r="1" fill="#fff" opacity="0.6" />
                  <circle cx="600" cy="70" r="1" fill="#fff" opacity="0.4" />
                  <circle cx="750" cy="30" r="1.5" fill="#fff" opacity="0.5" />
                  <circle cx="900" cy="90" r="1" fill="#fff" opacity="0.3" />
                  {/* Moon */}
                  <circle cx="850" cy="60" r="30" fill="#f0e6d2" opacity="0.15" />
                  <circle cx="850" cy="60" r="25" fill="#f0e6d2" opacity="0.2" />
                  {/* Ocean */}
                  <rect x="0" y="250" width="1000" height="120" fill="#0d1a2d" />
                  <path d="M0,280 Q100,275 200,280 Q300,285 400,280 Q500,275 600,280 Q700,285 800,280 Q900,275 1000,280" stroke="#1a2d4a" fill="none" opacity="0.3" />
                  <path d="M0,300 Q100,295 200,300 Q300,305 400,300 Q500,295 600,300 Q700,305 800,300 Q900,295 1000,300" stroke="#1a2d4a" fill="none" opacity="0.2" />
                  {/* Beach/Sand */}
                  <rect x="0" y="370" width="1000" height="192" fill="#141820" />
                  {/* Sand texture lines */}
                  <path d="M0,400 Q200,395 400,400 Q600,405 800,400 Q900,398 1000,400" stroke="#1a2030" fill="none" opacity="0.3" />
                  <path d="M0,440 Q300,435 500,440 Q700,445 1000,440" stroke="#1a2030" fill="none" opacity="0.2" />
                  <path d="M0,480 Q150,475 300,480 Q500,485 700,480 Q850,475 1000,480" stroke="#1a2030" fill="none" opacity="0.2" />
                  {/* Waterline */}
                  <path d="M0,370 Q200,365 400,370 Q600,375 800,370 Q900,368 1000,370" stroke="#1a3a5a" fill="none" opacity="0.4" strokeWidth="2" />
                  {/* Body silhouette */}
                  <ellipse cx="500" cy="420" rx="35" ry="12" fill="#0d1117" opacity="0.8" />
                  <rect x="470" y="400" width="60" height="25" rx="10" fill="#0d1117" opacity="0.7" />
                  <rect x="475" y="390" width="25" height="15" rx="8" fill="#0d1117" opacity="0.6" />
                  {/* Bush */}
                  <circle cx="780" cy="350" r="25" fill="#0f1814" opacity="0.7" />
                  <circle cx="800" cy="340" r="20" fill="#0d1510" opacity="0.6" />
                  {/* Dock/pier posts */}
                  <rect x="150" y="300" width="6" height="70" fill="#1a1a12" opacity="0.5" />
                  <rect x="280" y="310" width="6" height="60" fill="#1a1a12" opacity="0.5" />
                  {/* Label */}
                  <text x="500" y="540" textAnchor="middle" fill="#C9B99A" opacity="0.3" fontSize="10" fontFamily="monospace">FIG. 1 — CRIME SCENE DIAGRAM (NOT TO SCALE)</text>
                </svg>

                {/* Evidence Hotspots */}
                {evidence.map((ev) => {
                  const isCollected = collected.includes(ev.id)
                  const isHovered = hoveredEvidence === ev.id
                  return (
                    <button
                      key={ev.id}
                      onClick={() => { collectEvidence(ev.id); setSelectedEvidence(ev.id) }}
                      onMouseEnter={() => setHoveredEvidence(ev.id)}
                      onMouseLeave={() => setHoveredEvidence(null)}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all"
                      style={{ left: `${ev.x}%`, top: `${ev.y}%` }}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                        isCollected
                          ? 'bg-[#FF9500]/20 border-[#FF9500] text-[#FF9500]'
                          : isHovered
                            ? 'bg-[#FF9500]/30 border-[#FF9500] scale-125'
                            : 'bg-[rgba(255,149,0,0.15)] border-[rgba(255,149,0,0.4)] text-[#FF9500] animate-pulse'
                      }`}>
                        {isCollected ? <CheckCircle size={16} /> : <span className="text-[10px] font-bold">{ev.number}</span>}
                      </div>
                      {isHovered && !isCollected && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#1B2838] border border-[rgba(255,149,0,0.3)] rounded-lg px-3 py-1.5 whitespace-nowrap z-10">
                          <p className="text-[10px] text-[#FF9500]">Evidence #{ev.number}: {ev.name}</p>
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Selected Evidence Detail */}
              <AnimatePresence>
                {selectedEvidence && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-[rgba(27,40,56,0.6)] border border-[rgba(255,149,0,0.2)] rounded-xl p-5 mb-4"
                  >
                    {(() => {
                      const ev = evidence.find(e => e.id === selectedEvidence)
                      if (!ev) return null
                      const isCollected = collected.includes(ev.id)
                      return (
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <span className="w-8 h-8 rounded-full bg-[rgba(255,149,0,0.1)] border border-[rgba(255,149,0,0.3)] flex items-center justify-center text-[#FF9500] text-xs font-bold">
                                {ev.number}
                              </span>
                              <div>
                                <h3 className="text-base text-[#F0EBE1] font-medium">{ev.name}</h3>
                                <p className="text-[10px] text-[#C9B99A]/50">{ev.category}</p>
                              </div>
                            </div>
                            {isCollected && <span className="text-[10px] text-[#FF9500] flex items-center gap-1"><CheckCircle size={12} /> Collected</span>}
                          </div>
                          <p className="text-sm text-[#C9B99A]/80 mb-2">{ev.sceneDescription}</p>
                          <p className="text-xs text-[#F0EBE1] bg-[rgba(21,32,43,0.6)] rounded-lg p-3 mb-3">{ev.initialObservation}</p>
                          <p className="text-[10px] text-[#C9B99A]/40 italic">{ev.educationalNote}</p>
                        </div>
                      )
                    })()}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Witness Statements */}
              <div className="bg-[rgba(27,40,56,0.4)] border border-[rgba(255,149,0,0.1)] rounded-xl p-5">
                <h3 className="text-sm text-[#F0EBE1] font-medium mb-4 flex items-center gap-2">
                  <Eye size={16} className="text-[#FF9500]" /> Witness Statements
                </h3>
                <div className="space-y-3">
                  {BEACH_HOMICIDE_WITNESSES.map((w) => (
                    <div key={w.id} className="bg-[rgba(21,32,43,0.5)] rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-[#F0EBE1] font-medium">{w.witnessName}</span>
                        <span className={`text-[9px] px-2 py-0.5 rounded-full ${
                          w.reliability === 'High' ? 'bg-green-500/10 text-green-400' :
                          w.reliability === 'Medium' ? 'bg-yellow-500/10 text-yellow-400' :
                          'bg-red-500/10 text-red-400'
                        }`}>{w.reliability} Reliability</span>
                      </div>
                      <p className="text-xs text-[#C9B99A]/70 mb-2">{w.relationship}</p>
                      <p className="text-sm text-[#C9B99A] italic mb-2">"{w.statement}"</p>
                      {w.inconsistencies.length > 0 && (
                        <div className="flex items-start gap-1.5">
                          <AlertCircle size={12} className="text-yellow-500/60 shrink-0 mt-0.5" />
                          <p className="text-[10px] text-yellow-400/60">{w.inconsistencies[0]}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {collected.length >= 3 && (
                <div className="mt-6 text-center">
                  <button onClick={() => setPhase('inventory')} className="inline-flex items-center gap-2 rounded-full h-12 px-8 bg-[#FF9500] text-[#1B2838] hover:bg-[#CC6A00] transition-colors font-medium">
                    Continue to Evidence Inventory <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* PHASE: EVIDENCE INVENTORY */}
          {phase === 'inventory' && (
            <motion.div key="inventory" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <h2 className="text-xl text-[#F0EBE1] font-medium mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Evidence Inventory
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                {evidence.map((ev) => {
                  const isCollected = collected.includes(ev.id)
                  const isAnalyzed = analyzed.includes(ev.id)
                  return (
                    <div
                      key={ev.id}
                      className={`rounded-xl border p-4 transition-all ${
                        isCollected
                          ? 'bg-[rgba(27,40,56,0.6)] border-[rgba(255,149,0,0.2)]'
                          : 'bg-[rgba(27,40,56,0.2)] border-[rgba(255,149,0,0.05)] opacity-50'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          isCollected ? 'bg-[#FF9500]/20 text-[#FF9500]' : 'bg-[#C9B99A]/10 text-[#C9B99A]/30'
                        }`}>{ev.number}</span>
                        <div>
                          <p className={`text-sm font-medium ${isCollected ? 'text-[#F0EBE1]' : 'text-[#C9B99A]/40'}`}>{ev.name}</p>
                          <p className="text-[9px] text-[#C9B99A]/40">{ev.category}</p>
                        </div>
                        <div className="ml-auto flex gap-1">
                          {isCollected && <span className="text-[9px] text-[#FF9500]"><CheckCircle size={12} /></span>}
                          {isAnalyzed && <span className="text-[9px] text-green-400"><Microscope size={12} /></span>}
                        </div>
                      </div>
                      {isCollected && (
                        <div className="mt-2 pt-2 border-t border-[rgba(255,149,0,0.08)]">
                          <p className="text-[11px] text-[#C9B99A]/70 mb-1">{ev.initialObservation}</p>
                          {isAnalyzed ? (
                            <p className="text-[11px] text-green-400/80 bg-green-500/5 rounded p-2">{ev.labResult}</p>
                          ) : (
                            <button
                              onClick={() => analyzeEvidence(ev.id)}
                              className="text-[10px] text-[#FF9500] hover:underline"
                            >
                              Available test: {ev.labTest} → Send to Lab
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {collected.length >= 5 && (
                <div className="text-center">
                  <button onClick={() => setPhase('lab')} className="inline-flex items-center gap-2 rounded-full h-12 px-8 bg-[#FF9500] text-[#1B2838] hover:bg-[#CC6A00] transition-colors font-medium">
                    Go to Lab Analysis <Microscope size={16} />
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* PHASE: LAB ANALYSIS */}
          {phase === 'lab' && (
            <motion.div key="lab" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <h2 className="text-xl text-[#F0EBE1] font-medium mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Lab Analysis Stations
              </h2>

              {/* Lab Tabs */}
              <div className="flex gap-2 mb-6">
                {[
                  { key: 'fingerprint' as LabTab, label: 'Fingerprint / Impression', icon: Fingerprint },
                  { key: 'autopsy' as LabTab, label: 'Autopsy / Postmortem', icon: HeartPulse },
                  { key: 'digital' as LabTab, label: 'Digital Forensics', icon: Smartphone },
                ].map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => setLabTab(key)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs transition-colors ${
                      labTab === key
                        ? 'bg-[rgba(255,149,0,0.15)] text-[#FF9500] border border-[rgba(255,149,0,0.2)]'
                        : 'text-[#C9B99A]/50 hover:text-[#C9B99A] border border-transparent'
                    }`}
                  >
                    <Icon size={14} /> {label}
                  </button>
                ))}
              </div>

              {/* Fingerprint Station */}
              {labTab === 'fingerprint' && (
                <div className="bg-[rgba(27,40,56,0.6)] border border-[rgba(255,149,0,0.15)] rounded-xl p-6">
                  <h3 className="text-lg text-[#F0EBE1] font-medium mb-2 flex items-center gap-2">
                    <Fingerprint size={18} className="text-[#FF9500]" /> Fingerprint / Impression Analysis
                  </h3>
                  <p className="text-xs text-[#C9B99A]/60 mb-4">
                    Compare the recovered impression with three known samples. Examine pattern characteristics and select the best-supported match.
                  </p>

                  <div className="mb-4 p-3 bg-[rgba(255,149,0,0.05)] border border-[rgba(255,149,0,0.1)] rounded-lg">
                    <p className="text-xs text-[#FF9500]/70 font-medium mb-1">Recovered Evidence</p>
                    <p className="text-sm text-[#F0EBE1]">{BEACH_HOMICIDE_FINGERPRINTS[0].label}</p>
                    <p className="text-xs text-[#C9B99A]/50">{BEACH_HOMICIDE_FINGERPRINTS[0].pattern}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                    {BEACH_HOMICIDE_FINGERPRINTS.slice(1).map((sample) => (
                      <div key={sample.id} className="bg-[rgba(21,32,43,0.6)] border border-[rgba(255,149,0,0.1)] rounded-lg p-4">
                        <p className="text-sm text-[#F0EBE1] font-medium mb-1">{sample.label}</p>
                        <p className="text-[11px] text-[#C9B99A]/50 mb-2">{sample.pattern}</p>
                        <ul className="space-y-1 mb-3">
                          {sample.characteristics.map((c, i) => (
                            <li key={i} className="text-[10px] text-[#C9B99A]/60 flex items-center gap-1">
                              <span className="w-1 h-1 rounded-full bg-[#FF9500]/40" /> {c}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <FingerprintQuiz fingerprints={BEACH_HOMICIDE_FINGERPRINTS} />

                  <p className="text-[10px] text-[#C9B99A]/40 mt-4 italic">
                    <ShieldAlert size={10} className="inline mr-1" />
                    This is an educational exercise. Real fingerprint identification requires expert examination in an accredited laboratory and is never based on a single visual comparison.
                  </p>
                </div>
              )}

              {/* Autopsy Station */}
              {labTab === 'autopsy' && (
                <div className="bg-[rgba(27,40,56,0.6)] border border-[rgba(255,149,0,0.15)] rounded-xl p-6">
                  <h3 className="text-lg text-[#F0EBE1] font-medium mb-2 flex items-center gap-2">
                    <HeartPulse size={18} className="text-[#FF9500]" /> Autopsy / Postmortem Review
                  </h3>
                  <p className="text-xs text-[#C9B99A]/60 mb-4">
                    Review the medical examiner's findings. Distinguish between observed facts, medical interpretations, and unresolved questions.
                  </p>

                  <AutopsyQuiz findings={BEACH_HOMICIDE_AUTOPSY} />

                  <p className="text-[10px] text-[#C9B99A]/40 mt-4 italic">
                    <ShieldAlert size={10} className="inline mr-1" />
                    Only qualified forensic pathologists conduct real autopsies. This is a simplified educational representation.
                  </p>
                </div>
              )}

              {/* Digital Forensics Station */}
              {labTab === 'digital' && (
                <div className="bg-[rgba(27,40,56,0.6)] border border-[rgba(255,149,0,0.15)] rounded-xl p-6">
                  <h3 className="text-lg text-[#F0EBE1] font-medium mb-2 flex items-center gap-2">
                    <Smartphone size={18} className="text-[#FF9500]" /> Digital Forensics
                  </h3>
                  <p className="text-xs text-[#C9B99A]/60 mb-4">
                    Analyze phone data to establish timeline and corroborate witness statements.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    {[
                      { label: 'Last Outgoing Call', value: '11:47 PM', source: 'Phone records', note: '45-second call to known contact' },
                      { label: 'GPS Last Active', value: '11:52 PM', source: 'Location services', note: 'Stationary at current scene coordinates' },
                      { label: 'Unread Messages', value: '2 messages', source: 'Messaging app', note: 'From sender "Unknown" — content not recovered' },
                      { label: 'Battery Status', value: 'Depleted', source: 'Device log', note: 'Phone died approximately 12:30 AM' },
                      { label: 'Screen Lock', value: 'Unlocked', source: 'Security log', note: 'Phone was unlocked when found' },
                      { label: 'Photos Taken', value: '0 after 9:00 PM', source: 'Camera roll', note: 'Last photo: group picture at fire pit' },
                    ].map((item, i) => (
                      <div key={i} className="bg-[rgba(21,32,43,0.6)] rounded-lg p-3">
                        <p className="text-[10px] text-[#FF9500]/60 uppercase tracking-wider">{item.label}</p>
                        <p className="text-sm text-[#F0EBE1] font-medium">{item.value}</p>
                        <p className="text-[10px] text-[#C9B99A]/40">{item.source}</p>
                        <p className="text-[11px] text-[#C9B99A]/60 mt-1">{item.note}</p>
                      </div>
                    ))}
                  </div>

                  <p className="text-[10px] text-[#C9B99A]/40 italic">
                    <ShieldAlert size={10} className="inline mr-1" />
                    Device data provides leads but cannot alone establish guilt. Always correlate with physical evidence and witness statements.
                  </p>
                </div>
              )}

              {analyzed.length >= 2 && (
                <div className="mt-6 text-center">
                  <button onClick={() => setPhase('timeline')} className="inline-flex items-center gap-2 rounded-full h-12 px-8 bg-[#FF9500] text-[#1B2838] hover:bg-[#CC6A00] transition-colors font-medium">
                    Build Timeline <Clock size={16} />
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* PHASE: TIMELINE */}
          {phase === 'timeline' && (
            <TimelinePhase
              timeline={BEACH_HOMICIDE_TIMELINE}
              answer={timelineAnswer}
              setAnswer={setTimelineAnswer}
              onComplete={() => setPhase('report')}
            />
          )}

          {/* PHASE: CASE REPORT */}
          {phase === 'report' && (
            <ReportPhase
              answers={reportAnswers}
              setAnswers={setReportAnswers}
              onSubmit={() => setPhase('results')}
            />
          )}

          {/* PHASE: RESULTS */}
          {phase === 'results' && (
            <ResultsPhase
              score={calculateScore()}
              rank={getRank(calculateScore())}
              collected={collected.length}
              totalEvidence={evidence.length}
              solution={BEACH_HOMICIDE_SOLUTION}
              onRestart={() => {
                setCollected([])
                setAnalyzed([])
                setTimelineAnswer({})
                setReportAnswers({})
                setPhase('scene')
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// ============================================
// SUB-COMPONENTS
// ============================================

function FingerprintQuiz({ fingerprints }: { fingerprints: typeof BEACH_HOMICIDE_FINGERPRINTS }) {
  const [selected, setSelected] = useState<string | null>(null)
  const correct = fingerprints.find(f => f.isMatch)

  return (
    <div>
      <p className="text-sm text-[#F0EBE1] mb-3">Which sample provides the best-supported match?</p>
      <div className="flex gap-3 mb-3">
        {fingerprints.slice(1).map((f) => (
          <button
            key={f.id}
            onClick={() => setSelected(f.id)}
            className={`px-4 py-2 rounded-lg text-xs transition-colors ${
              selected === f.id
                ? f.isMatch ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'
                : 'bg-[rgba(21,32,43,0.6)] text-[#C9B99A] border border-[rgba(255,149,0,0.1)] hover:border-[rgba(255,149,0,0.3)]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      {selected && correct && (
        <div className={`p-3 rounded-lg text-xs ${selected === correct.id ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
          {selected === correct.id
            ? 'Correct. Pattern characteristics and ridge count align with Sample B. However, a real identification would require many more comparison points and expert verification.'
            : `Incorrect. The best-supported match is ${correct.label}. Review the pattern type and ridge characteristics more carefully.`}
        </div>
      )}
    </div>
  )
}

function AutopsyQuiz({ findings }: { findings: typeof BEACH_HOMICIDE_AUTOPSY }) {
  const [categorized, setCategorized] = useState<Record<string, string>>({})

  return (
    <div className="space-y-3">
      {findings.map((f) => (
        <div key={f.id} className="bg-[rgba(21,32,43,0.6)] rounded-lg p-4">
          <p className="text-sm text-[#F0EBE1] mb-2">{f.finding}</p>
          <p className="text-xs text-[#C9B99A]/60 mb-3">{f.details}</p>
          <div className="flex gap-2">
            {['Observed Fact', 'Medical Interpretation', 'Unresolved Question'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategorized({ ...categorized, [f.id]: cat })}
                className={`px-3 py-1 rounded-full text-[10px] transition-colors ${
                  categorized[f.id] === cat
                    ? cat === f.category ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    : categorized[f.id] ? 'opacity-30 text-[#C9B99A]/40 border border-[#C9B99A]/10'
                    : 'text-[#C9B99A]/60 border border-[rgba(255,149,0,0.1)] hover:border-[rgba(255,149,0,0.3)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          {categorized[f.id] && categorized[f.id] === f.category && (
            <p className="text-[10px] text-green-400/70 mt-2">Correct! This is classified as: {f.category}</p>
          )}
          {categorized[f.id] && categorized[f.id] !== f.category && (
            <p className="text-[10px] text-red-400/70 mt-2">This is actually classified as: {f.category}. {f.category === 'Observed Fact' ? 'This is directly observable.' : f.category === 'Medical Interpretation' ? 'This requires expert medical judgment.' : 'This cannot be determined from available evidence.'}</p>
          )}
        </div>
      ))}
    </div>
  )
}

function TimelinePhase({ timeline, answer, setAnswer, onComplete }: {
  timeline: typeof BEACH_HOMICIDE_TIMELINE
  answer: Record<string, number>
  setAnswer: React.Dispatch<React.SetStateAction<Record<string, number>>>
  onComplete: () => void
}) {
  const [order, setOrder] = useState<string[]>(timeline.map(t => t.id).sort(() => Math.random() - 0.5))
  const moveItem = (index: number, direction: number) => {
    if (index + direction < 0 || index + direction >= order.length) return
    const newOrder = [...order]
    const temp = newOrder[index]
    newOrder[index] = newOrder[index + direction]
    newOrder[index + direction] = temp
    setOrder(newOrder)
  }

  const submit = () => {
    const newAnswer: Record<string, number> = {}
    order.forEach((id, index) => { newAnswer[id] = index + 1 })
    setAnswer(newAnswer)
  }

  const allCorrect = timeline.every(t => answer[t.id] === t.correctOrder)

  return (
    <motion.div key="timeline" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <h2 className="text-xl text-[#F0EBE1] font-medium mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
        Timeline Builder
      </h2>
      <p className="text-xs text-[#C9B99A]/60 mb-4">
        Arrange the events in the correct chronological order. Use the arrows to move events up or down.
      </p>

      <div className="space-y-2 mb-6">
        {order.map((id, index) => {
          const event = timeline.find(t => t.id === id)
          if (!event) return null
          const isCorrect = answer[id] === event.correctOrder
          const hasAnswer = answer[id] !== undefined
          return (
            <div
              key={id}
              className={`flex items-center gap-3 rounded-lg border p-3 transition-colors ${
                hasAnswer
                  ? isCorrect ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'
                  : 'bg-[rgba(27,40,56,0.6)] border-[rgba(255,149,0,0.1)]'
              }`}
            >
              <span className="text-sm text-[#FF9500] font-mono w-6">{index + 1}</span>
              <div className="flex-1">
                <p className="text-sm text-[#F0EBE1]">{event.description}</p>
                <p className="text-[10px] text-[#C9B99A]/50">{event.time} — {event.source}</p>
              </div>
              <div className="flex flex-col gap-1">
                <button onClick={() => moveItem(index, -1)} className="text-[#C9B99A]/40 hover:text-[#FF9500]" disabled={index === 0}>▲</button>
                <button onClick={() => moveItem(index, 1)} className="text-[#C9B99A]/40 hover:text-[#FF9500]" disabled={index === order.length - 1}>▼</button>
              </div>
            </div>
          )
        })}
      </div>

      {!answer[order[0]] ? (
        <button onClick={submit} className="inline-flex items-center gap-2 rounded-full h-12 px-8 bg-[#FF9500] text-[#1B2838] hover:bg-[#CC6A00] transition-colors font-medium">
          Check Timeline Order
        </button>
      ) : (
        <div className="flex items-center gap-4">
          <button onClick={() => setAnswer({})} className="text-xs text-[#C9B99A]/60 hover:text-[#FF9500]">Try Again</button>
          <button onClick={onComplete} className="inline-flex items-center gap-2 rounded-full h-12 px-8 bg-[#FF9500] text-[#1B2838] hover:bg-[#CC6A00] transition-colors font-medium">
            Continue to Case Report <ChevronRight size={16} />
          </button>
        </div>
      )}

      {allCorrect && answer[order[0]] && (
        <p className="mt-3 text-xs text-green-400">All events in correct order!</p>
      )}
    </motion.div>
  )
}

function ReportPhase({ answers, setAnswers, onSubmit }: {
  answers: Record<string, string>
  setAnswers: React.Dispatch<React.SetStateAction<Record<string, string>>>
  onSubmit: () => void
}) {
  return (
    <motion.div key="report" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <h2 className="text-xl text-[#F0EBE1] font-medium mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
        Case Report
      </h2>
      <p className="text-xs text-[#C9B99A]/60 mb-4">
        Complete your final report. Distinguish between fact, inference, and hypothesis.
      </p>

      <div className="space-y-4 mb-6">
        <div>
          <label className="text-sm text-[#F0EBE1] mb-1.5 block">Probable Sequence of Events</label>
          <textarea
            value={answers.sequence || ''}
            onChange={e => setAnswers({ ...answers, sequence: e.target.value })}
            placeholder="Describe what you believe happened, based on the evidence..."
            rows={3}
            className="w-full bg-[rgba(21,32,43,0.6)] border border-[rgba(255,149,0,0.15)] rounded-lg px-4 py-2.5 text-sm text-[#F0EBE1] placeholder:text-[#C9B99A]/25 focus:outline-none focus:border-[rgba(255,149,0,0.4)] resize-none"
          />
        </div>

        <div>
          <label className="text-sm text-[#F0EBE1] mb-1.5 block">Strongest Evidence</label>
          <textarea
            value={answers.strongestEvidence || ''}
            onChange={e => setAnswers({ ...answers, strongestEvidence: e.target.value })}
            placeholder="What evidence most strongly supports your theory?"
            rows={2}
            className="w-full bg-[rgba(21,32,43,0.6)] border border-[rgba(255,149,0,0.15)] rounded-lg px-4 py-2.5 text-sm text-[#F0EBE1] placeholder:text-[#C9B99A]/25 focus:outline-none focus:border-[rgba(255,149,0,0.4)] resize-none"
          />
        </div>

        <div>
          <label className="text-sm text-[#F0EBE1] mb-1.5 block">Weakest Evidence / Ambiguities</label>
          <textarea
            value={answers.weakestEvidence || ''}
            onChange={e => setAnswers({ ...answers, weakestEvidence: e.target.value })}
            placeholder="What evidence is ambiguous or could support an alternative theory?"
            rows={2}
            className="w-full bg-[rgba(21,32,43,0.6)] border border-[rgba(255,149,0,0.15)] rounded-lg px-4 py-2.5 text-sm text-[#F0EBE1] placeholder:text-[#C9B99A]/25 focus:outline-none focus:border-[rgba(255,149,0,0.4)] resize-none"
          />
        </div>

        <div>
          <label className="text-sm text-[#F0EBE1] mb-1.5 block">Unresolved Questions</label>
          <textarea
            value={answers.unresolvedQuestions || ''}
            onChange={e => setAnswers({ ...answers, unresolvedQuestions: e.target.value })}
            placeholder="What questions remain unanswered?"
            rows={2}
            className="w-full bg-[rgba(21,32,43,0.6)] border border-[rgba(255,149,0,0.15)] rounded-lg px-4 py-2.5 text-sm text-[#F0EBE1] placeholder:text-[#C9B99A]/25 focus:outline-none focus:border-[rgba(255,149,0,0.4)] resize-none"
          />
        </div>

        <div>
          <label className="text-sm text-[#F0EBE1] mb-1.5 block">Confidence Level</label>
          <select
            value={answers.confidence || ''}
            onChange={e => setAnswers({ ...answers, confidence: e.target.value })}
            className="w-full bg-[rgba(21,32,43,0.6)] border border-[rgba(255,149,0,0.15)] rounded-lg px-4 py-2.5 text-sm text-[#F0EBE1] focus:outline-none focus:border-[rgba(255,149,0,0.4)]"
          >
            <option value="">Select confidence level...</option>
            <option value="high">High — Evidence strongly supports my conclusion</option>
            <option value="moderate">Moderate — Evidence supports but gaps remain</option>
            <option value="low">Low — Significant uncertainty, more evidence needed</option>
          </select>
        </div>
      </div>

      <button
        onClick={onSubmit}
        className="inline-flex items-center gap-2 rounded-full h-12 px-8 bg-[#FF9500] text-[#1B2838] hover:bg-[#CC6A00] transition-colors font-medium"
      >
        Submit Case Report <CheckCircle size={16} />
      </button>
    </motion.div>
  )
}

function ResultsPhase({ score, rank, collected, totalEvidence, solution, onRestart }: {
  score: number
  rank: { label: string; color: string }
  collected: number
  totalEvidence: number
  solution: typeof BEACH_HOMICIDE_SOLUTION
  onRestart: () => void
}) {
  return (
    <motion.div key="results" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
          className="w-24 h-24 rounded-full bg-[rgba(255,149,0,0.1)] border-2 border-[#FF9500] flex items-center justify-center mx-auto mb-4"
        >
          <Award size={40} className="text-[#FF9500]" />
        </motion.div>

        <h2 className="text-2xl text-[#F0EBE1] font-medium mb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
          Investigation Complete
        </h2>
        <p className={`text-lg font-medium ${rank.color} mb-2`}>{rank.label}</p>
        <div className="text-5xl text-[#FF9500] font-medium mb-2">{score}<span className="text-2xl text-[#C9B99A]/40">/100</span></div>
        <p className="text-xs text-[#C9B99A]/50">Evidence collected: {collected}/{totalEvidence}</p>
      </div>

      {/* Learning Feedback */}
      <div className="bg-[rgba(27,40,56,0.6)] border border-[rgba(255,149,0,0.15)] rounded-xl p-5 mb-6">
        <h3 className="text-sm text-[#F0EBE1] font-medium mb-3">Case Solution — For Educational Review</h3>
        <div className="space-y-3 text-xs text-[#C9B99A]/70">
          <div>
            <p className="text-[10px] text-[#FF9500] uppercase tracking-wider mb-1">Probable Sequence</p>
            <p>{solution.probableSequence}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <p className="text-[10px] text-green-400/70 uppercase tracking-wider mb-1">Strongest Evidence</p>
              <ul className="space-y-1">
                {solution.strongestEvidence.map((e, i) => (
                  <li key={i} className="flex items-start gap-1.5"><CheckCircle size={10} className="text-green-400/50 shrink-0 mt-0.5" />{e}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[10px] text-yellow-400/70 uppercase tracking-wider mb-1">What Remains Uncertain</p>
              <ul className="space-y-1">
                {solution.unresolvedQuestions.map((q, i) => (
                  <li key={i} className="flex items-start gap-1.5"><AlertCircle size={10} className="text-yellow-400/50 shrink-0 mt-0.5" />{q}</li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <p className="text-[10px] text-[#FF9500] uppercase tracking-wider mb-1">Recommended Next Steps</p>
            <ul className="space-y-1">
              {solution.nextSteps.map((s, i) => (
                <li key={i} className="flex items-start gap-1.5"><span className="text-[#FF9500]/50">→</span>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Badge */}
      <div className="bg-gradient-to-br from-[rgba(255,149,0,0.1)] to-[rgba(27,40,56,0.4)] border border-[rgba(255,149,0,0.2)] rounded-xl p-6 text-center mb-6">
        <p className="text-[10px] uppercase tracking-[0.2em] text-[#FF9500]/60 mb-2">#TheKingsTake</p>
        <p className="text-lg text-[#F0EBE1] font-medium mb-1">Forensic Reasoning — Level 1</p>
        <p className="text-xs text-[#C9B99A]/50">Beach Homicide Training Case</p>
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
