import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  TreePine, Plus, X, ChevronDown, ChevronUp, CheckCircle2, Circle, Search, Scroll,
  Users, Star, Crown, Sparkles, Share2, Zap, AlertTriangle, ArrowRight,
  UserPlus, Trash2, Save, BookOpen, RotateCcw
} from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'
import GenealogyOnboarding from '../components/GenealogyOnboarding'
import type { GenealogyProfile } from '../components/GenealogyOnboarding'
import TreeArtDisplay from '../components/TreeArtDisplay'
import SacredRealmBackground from '../features/ancestor-realm/components/SacredRealmBackground'

// ============================================
// TYPES
// ============================================
interface Ancestor {
  id: number
  firstName: string
  lastName: string
  middleName?: string
  nicknames?: string
  birthDate?: string
  birthPlace?: string
  birthCounty?: string
  birthState?: string
  deathDate?: string
  deathPlace?: string
  spouseName?: string
  marriageDate?: string
  marriagePlace?: string
  occupation?: string
  militaryService?: string
  church?: string
  cemetery?: string
  notes?: string
  oralHistory?: string
  tribalAffiliation?: string
  censusRace?: string
  enrollmentNumber?: string
  generation: number
  position: string
  status: 'unknown' | 'researching' | 'confirmed' | 'verified'
  recordsChecked: Record<string, boolean>
}

interface FamilyTree {
  id: number
  treeName: string
  people: Ancestor[]
  shareToken?: string
  isPublic?: boolean
  totalPeople: number
}

// ============================================
// CONSTANTS
// ============================================
const STATUS_COLORS = {
  unknown: '#4a5568',
  researching: '#d69e2e',
  confirmed: '#48bb78',
  verified: '#FF9500',
}

const STATUS_LABELS = {
  unknown: 'Unknown',
  researching: 'Researching',
  confirmed: 'Confirmed',
  verified: 'Verified',
}

const RECORD_TYPES = [
  { key: 'dawes_rolls', label: 'Search Dawes Rolls', icon: Scroll },
  { key: 'guion_miller', label: 'Guion Miller Roll', icon: Scroll },
  { key: 'baker_roll', label: 'Baker Roll (EBCI)', icon: Scroll },
  { key: 'federal_census', label: 'Federal Census Records', icon: Search },
  { key: 'state_census', label: 'State Census Records', icon: Search },
  { key: 'birth_record', label: 'Birth Certificate', icon: BookOpen },
  { key: 'death_record', label: 'Death Certificate', icon: BookOpen },
  { key: 'marriage_record', label: 'Marriage Records', icon: BookOpen },
  { key: 'military_record', label: 'Military Service Records', icon: Scroll },
  { key: 'land_record', label: 'Land Allotment Records', icon: Scroll },
  { key: 'freedmen_record', label: 'Freedmen Records', icon: Scroll },
  { key: 'church_record', label: 'Church Records', icon: BookOpen },
  { key: 'cemetery_record', label: 'Cemetery Records', icon: BookOpen },
  { key: 'probate_record', label: 'Probate Records', icon: Scroll },
  { key: 'newspaper_record', label: 'Newspaper Records', icon: Scroll },
]



// ============================================
// HELPERS: Build tree from profile
// ============================================
function buildTreeFromProfile(profile: GenealogyProfile): FamilyTree {
  const { rootPerson, coreFamily } = profile
  const rootLastName = rootPerson.lastName

  const root: Ancestor = {
    id: Date.now(),
    firstName: rootPerson.firstName,
    lastName: rootPerson.lastName,
    birthDate: rootPerson.birthDate,
    birthPlace: rootPerson.birthPlace,
    birthState: rootPerson.birthState,
    generation: 0,
    position: '0',
    status: 'confirmed',
    recordsChecked: {},
    tribalAffiliation: rootPerson.tribalAffiliation,
  }

  const people: Ancestor[] = [root]

  if (coreFamily.fatherFirstName) {
    people.push({
      id: Date.now() + 1,
      firstName: coreFamily.fatherFirstName,
      lastName: coreFamily.fatherLastName || rootLastName,
      generation: 1,
      position: '0-0',
      status: 'confirmed',
      recordsChecked: {},
    })
  }

  if (coreFamily.motherFirstName) {
    people.push({
      id: Date.now() + 2,
      firstName: coreFamily.motherFirstName,
      lastName: coreFamily.motherMaidenName || '',
      generation: 1,
      position: '0-1',
      status: 'confirmed',
      recordsChecked: {},
    })
  }

  if (coreFamily.patGrandfatherFirst) {
    people.push({
      id: Date.now() + 3,
      firstName: coreFamily.patGrandfatherFirst,
      lastName: coreFamily.fatherLastName || rootLastName,
      generation: 2,
      position: '0-0-0',
      status: 'confirmed',
      recordsChecked: {},
    })
  }

  if (coreFamily.patGrandmotherFirst) {
    people.push({
      id: Date.now() + 4,
      firstName: coreFamily.patGrandmotherFirst,
      lastName: coreFamily.patGrandmotherMaiden || '',
      generation: 2,
      position: '0-0-1',
      status: 'confirmed',
      recordsChecked: {},
    })
  }

  if (coreFamily.matGrandfatherFirst) {
    people.push({
      id: Date.now() + 5,
      firstName: coreFamily.matGrandfatherFirst,
      lastName: coreFamily.matGrandfatherLast || '',
      generation: 2,
      position: '0-1-0',
      status: 'confirmed',
      recordsChecked: {},
    })
  }

  if (coreFamily.matGrandmotherFirst) {
    people.push({
      id: Date.now() + 6,
      firstName: coreFamily.matGrandmotherFirst,
      lastName: coreFamily.matGrandmotherMaiden || '',
      generation: 2,
      position: '0-1-1',
      status: 'confirmed',
      recordsChecked: {},
    })
  }

  return {
    id: Date.now(),
    treeName: `${rootPerson.firstName} ${rootPerson.lastName} Family Tree`,
    people,
    totalPeople: people.length,
  }
}

// ============================================
// CONSTELLATION TREE SVG (Landing decoration)
// ============================================
function ConstellationTreeDecorative() {
  const nodes = [
    // Root
    { cx: 200, cy: 380, r: 6, delay: 0 },
    // Parents
    { cx: 120, cy: 280, r: 5, delay: 0.3 },
    { cx: 280, cy: 280, r: 5, delay: 0.4 },
    // Grandparents
    { cx: 70, cy: 170, r: 4, delay: 0.6 },
    { cx: 160, cy: 170, r: 4, delay: 0.7 },
    { cx: 240, cy: 170, r: 4, delay: 0.8 },
    { cx: 330, cy: 170, r: 4, delay: 0.9 },
    // Great-grandparents (smaller, more distant)
    { cx: 35, cy: 80, r: 3, delay: 1.1 },
    { cx: 95, cy: 80, r: 3, delay: 1.2 },
    { cx: 135, cy: 80, r: 3, delay: 1.25 },
    { cx: 195, cy: 80, r: 2.5, delay: 1.3 },
    { cx: 205, cy: 80, r: 2.5, delay: 1.3 },
    { cx: 265, cy: 80, r: 3, delay: 1.35 },
    { cx: 305, cy: 80, r: 3, delay: 1.4 },
    { cx: 365, cy: 80, r: 3, delay: 1.5 },
  ]

  const connections = [
    [200, 380, 120, 280], [200, 380, 280, 280],
    [120, 280, 70, 170], [120, 280, 160, 170],
    [280, 280, 240, 170], [280, 280, 330, 170],
    [70, 170, 35, 80], [70, 170, 95, 80],
    [160, 170, 135, 80], [160, 170, 195, 80],
    [240, 170, 205, 80], [240, 170, 265, 80],
    [330, 170, 305, 80], [330, 170, 365, 80],
  ]

  return (
    <svg viewBox="0 0 400 420" className="w-full h-full opacity-60" preserveAspectRatio="xMidYMid meet">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="nodeGlow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#FFD700" stopOpacity="1" />
          <stop offset="40%" stopColor="#FF9500" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FF9500" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Branch connections */}
      {connections.map(([x1, y1, x2, y2], i) => (
        <motion.line
          key={`conn-${i}`}
          x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="url(#nodeGlow)"
          strokeWidth="0.8"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.35 }}
          transition={{ duration: 1.5, delay: 0.2 + i * 0.08, ease: 'easeInOut' }}
        />
      ))}

      {/* Nodes */}
      {nodes.map((node, i) => (
        <motion.circle
          key={`node-${i}`}
          cx={node.cx} cy={node.cy} r={node.r}
          fill="#FFD700"
          filter="url(#glow)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: [0.4, 0.9, 0.6, 0.9, 0.5] }}
          transition={{
            duration: 3,
            delay: node.delay,
            repeat: Infinity,
            repeatDelay: Math.random() * 2 + 1,
          }}
        />
      ))}

      {/* Subtle pulse rings on root */}
      <motion.circle
        cx={200} cy={380} r={12}
        fill="none" stroke="#FF9500" strokeWidth="0.5"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 2, opacity: [0, 0.3, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeOut' }}
      />
    </svg>
  )
}

// ============================================
// ANCESTOR NODE (Tree visualization)
// ============================================
function AncestorNode({ ancestor, onClick, isRoot }: { ancestor: Ancestor; onClick: () => void; isRoot?: boolean }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative flex flex-col items-center group"
    >
      <div
        className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center border-2 transition-all group-hover:shadow-lg"
        style={{
          borderColor: STATUS_COLORS[ancestor.status],
          backgroundColor: `${STATUS_COLORS[ancestor.status]}15`,
          boxShadow: `0 0 12px ${STATUS_COLORS[ancestor.status]}30`,
        }}
      >
        {isRoot ? <Star size={18} style={{ color: STATUS_COLORS[ancestor.status] }} /> : <Users size={16} style={{ color: STATUS_COLORS[ancestor.status] }} />}
      </div>
      <div className="mt-1.5 text-center max-w-[80px]">
        <p className="text-[10px] md:text-xs text-[#F0EBE1] font-medium truncate leading-tight">{ancestor.firstName}</p>
        <p className="text-[10px] md:text-xs text-[#F0EBE1] font-medium truncate leading-tight">{ancestor.lastName}</p>
        <p className="text-[9px] text-[#C9B99A]/50 mt-0.5">{STATUS_LABELS[ancestor.status]}</p>
      </div>
      {ancestor.generation > 0 && (
        <span className="absolute -top-1 -right-1 text-[8px] bg-[rgba(255,149,0,0.2)] text-[#FF9500] rounded-full w-4 h-4 flex items-center justify-center border border-[rgba(255,149,0,0.3)]">
          G{ancestor.generation}
        </span>
      )}
    </motion.button>
  )
}

// ============================================
// FAMILY GROUP SHEET (Detail Modal)
// ============================================
function FamilyGroupSheet({ ancestor, onClose, onSave }: { ancestor: Ancestor; onClose: () => void; onSave: (updated: Ancestor) => void }) {
  const [form, setForm] = useState({ ...ancestor })
  const [activeTab, setActiveTab] = useState<'info' | 'records'>('info')

  const handleSave = () => { onSave(form); onClose() }

  const toggleRecord = (key: string) => {
    setForm(prev => ({
      ...prev,
      recordsChecked: { ...prev.recordsChecked, [key]: !prev.recordsChecked[key] },
    }))
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <motion.div initial={{ opacity: 0, scale: 0.92, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92, y: 20 }} transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()} className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-xl border border-[rgba(255,149,0,0.25)] bg-[#15202B] shadow-2xl"
        style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,149,0,0.3) transparent' }}>

        <div className="sticky top-0 z-10 bg-[#15202B]/95 backdrop-blur-md border-b border-[rgba(255,149,0,0.15)] p-4 md:p-5 flex items-center justify-between" style={{ borderLeft: '4px solid ' + STATUS_COLORS[ancestor.status] }}>
          <div>
            <h3 className="text-lg text-[#F0EBE1] font-medium">{form.firstName} {form.middleName} {form.lastName}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] bg-[rgba(255,149,0,0.1)] text-[#FF9500] rounded-full px-2 py-0.5">Generation {ancestor.generation}</span>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as any })}
                className="text-[10px] bg-[rgba(27,40,56,0.8)] border border-[rgba(255,149,0,0.15)] rounded px-2 py-0.5 text-[#C9B99A]"
              >
                <option value="unknown">Unknown</option>
                <option value="researching">Researching</option>
                <option value="confirmed">Confirmed</option>
                <option value="verified">Verified</option>
              </select>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-[rgba(255,149,0,0.1)] border border-[rgba(255,149,0,0.2)] text-[#C9B99A] hover:text-[#FF9500]"><X size={16} /></button>
        </div>

        <div className="flex border-b border-[rgba(255,149,0,0.1)] px-4">
          {[{ id: 'info', label: 'Family Group Sheet', icon: Users }, { id: 'records', label: `Record Checklist (${Object.values(form.recordsChecked).filter(Boolean).length}/${RECORD_TYPES.length})`, icon: CheckCircle2 }].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 text-xs transition-colors ${activeTab === tab.id ? 'text-[#FF9500] border-b-2 border-[#FF9500]' : 'text-[#C9B99A] hover:text-[#F0EBE1]'}`}>
              <tab.icon size={13} /> {tab.label}
            </button>
          ))}
        </div>

        <div className="p-4 md:p-5 space-y-4">
          {activeTab === 'info' ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="First Name" value={form.firstName} onChange={v => setForm({ ...form, firstName: v })} />
                <Field label="Last Name" value={form.lastName} onChange={v => setForm({ ...form, lastName: v })} />
                <Field label="Middle Name" value={form.middleName || ''} onChange={v => setForm({ ...form, middleName: v })} />
                <Field label="Nicknames / Variants" value={form.nicknames || ''} onChange={v => setForm({ ...form, nicknames: v })} />
              </div>

              <div className="bg-[rgba(27,40,56,0.4)] rounded-lg p-3 border border-[rgba(255,149,0,0.08)]">
                <p className="text-[10px] text-[#FF9500] uppercase tracking-wider mb-2">Birth</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <Field label="Date" value={form.birthDate || ''} onChange={v => setForm({ ...form, birthDate: v })} />
                  <Field label="Place" value={form.birthPlace || ''} onChange={v => setForm({ ...form, birthPlace: v })} />
                  <Field label="County" value={form.birthCounty || ''} onChange={v => setForm({ ...form, birthCounty: v })} />
                  <Field label="State" value={form.birthState || ''} onChange={v => setForm({ ...form, birthState: v })} />
                </div>
              </div>

              <div className="bg-[rgba(27,40,56,0.4)] rounded-lg p-3 border border-[rgba(255,149,0,0.08)]">
                <p className="text-[10px] text-[#FF9500] uppercase tracking-wider mb-2">Death</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <Field label="Date" value={form.deathDate || ''} onChange={v => setForm({ ...form, deathDate: v })} />
                  <Field label="Place" value={form.deathPlace || ''} onChange={v => setForm({ ...form, deathPlace: v })} />
                </div>
              </div>

              <div className="bg-[rgba(27,40,56,0.4)] rounded-lg p-3 border border-[rgba(255,149,0,0.08)]">
                <p className="text-[10px] text-[#FF9500] uppercase tracking-wider mb-2">Marriage</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <Field label="Spouse Name" value={form.spouseName || ''} onChange={v => setForm({ ...form, spouseName: v })} />
                  <Field label="Marriage Date" value={form.marriageDate || ''} onChange={v => setForm({ ...form, marriageDate: v })} />
                  <Field label="Marriage Place" value={form.marriagePlace || ''} onChange={v => setForm({ ...form, marriagePlace: v })} span2 />
                </div>
              </div>

              <div className="bg-[rgba(255,149,0,0.05)] rounded-lg p-3 border border-[rgba(255,149,0,0.12)]">
                <p className="text-[10px] text-[#FF9500] uppercase tracking-wider mb-2">Identity & Affiliation</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <Field label="Tribal Affiliation" value={form.tribalAffiliation || ''} onChange={v => setForm({ ...form, tribalAffiliation: v })} />
                  <Field label="Census Race Listed" value={form.censusRace || ''} onChange={v => setForm({ ...form, censusRace: v })} />
                  <Field label="Enrollment Number" value={form.enrollmentNumber || ''} onChange={v => setForm({ ...form, enrollmentNumber: v })} />
                </div>
              </div>

              <div className="bg-[rgba(27,40,56,0.4)] rounded-lg p-3 border border-[rgba(255,149,0,0.08)]">
                <p className="text-[10px] text-[#FF9500] uppercase tracking-wider mb-2">Other Details</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <Field label="Occupation" value={form.occupation || ''} onChange={v => setForm({ ...form, occupation: v })} />
                  <Field label="Military Service" value={form.militaryService || ''} onChange={v => setForm({ ...form, militaryService: v })} />
                  <Field label="Church" value={form.church || ''} onChange={v => setForm({ ...form, church: v })} />
                  <Field label="Cemetery" value={form.cemetery || ''} onChange={v => setForm({ ...form, cemetery: v })} />
                </div>
              </div>

              <div>
                <p className="text-[10px] text-[#FF9500] uppercase tracking-wider mb-1">Research Notes</p>
                <textarea
                  value={form.notes || ''}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Enter any research notes, clues, or observations..."
                  className="w-full bg-[rgba(27,40,56,0.6)] border border-[rgba(255,149,0,0.1)] rounded-lg px-3 py-2 text-sm text-[#F0EBE1] placeholder-[#C9B99A]/30 focus:outline-none focus:border-[rgba(255,149,0,0.3)] min-h-[60px] resize-none"
                />
              </div>

              <div>
                <p className="text-[10px] text-[#FF9500] uppercase tracking-wider mb-1">Oral History / Family Stories</p>
                <textarea
                  value={form.oralHistory || ''}
                  onChange={(e) => setForm({ ...form, oralHistory: e.target.value })}
                  placeholder="Record family stories passed down through generations..."
                  className="w-full bg-[rgba(27,40,56,0.6)] border border-[rgba(255,149,0,0.1)] rounded-lg px-3 py-2 text-sm text-[#F0EBE1] placeholder-[#C9B99A]/30 focus:outline-none focus:border-[rgba(255,149,0,0.3)] min-h-[60px] resize-none"
                />
              </div>
            </>
          ) : (
            <div className="space-y-2">
              <p className="text-xs text-[#C9B99A] mb-3">Check off each record type as you search. This tracks what you have found for this ancestor.</p>
              {RECORD_TYPES.map(record => (
                <button
                  key={record.key}
                  onClick={() => toggleRecord(record.key)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all text-left ${
                    form.recordsChecked[record.key]
                      ? 'bg-[rgba(72,187,120,0.08)] border-[rgba(72,187,120,0.2)]'
                      : 'bg-[rgba(27,40,56,0.4)] border-[rgba(255,149,0,0.08)] hover:border-[rgba(255,149,0,0.2)]'
                  }`}
                >
                  {form.recordsChecked[record.key]
                    ? <CheckCircle2 size={16} className="text-green-400 shrink-0" />
                    : <Circle size={16} className="text-[#C9B99A]/30 shrink-0" />
                  }
                  <record.icon size={14} className={form.recordsChecked[record.key] ? 'text-green-400/60' : 'text-[#C9B99A]/40'} />
                  <span className={`text-sm ${form.recordsChecked[record.key] ? 'text-green-300' : 'text-[#C9B99A]'}`}>{record.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="sticky bottom-0 bg-[#15202B]/95 backdrop-blur-md border-t border-[rgba(255,149,0,0.15)] p-4 flex justify-end">
          <button onClick={handleSave} className="flex items-center gap-2 bg-[rgba(255,149,0,0.15)] border border-[rgba(255,149,0,0.3)] text-[#FF9500] rounded-lg px-5 py-2.5 hover:bg-[rgba(255,149,0,0.25)] transition-all text-sm font-medium">
            <Save size={14} /> Save Ancestor
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

function Field({ label, value, onChange, span2 }: { label: string; value: string; onChange: (v: string) => void; span2?: boolean }) {
  return (
    <div className={span2 ? 'sm:col-span-2' : ''}>
      <label className="text-[10px] text-[#C9B99A]/60 uppercase tracking-wider">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[rgba(27,40,56,0.6)] border border-[rgba(255,149,0,0.1)] rounded-lg px-3 py-2 text-sm text-[#F0EBE1] focus:outline-none focus:border-[rgba(255,149,0,0.3)] mt-1 transition-colors"
      />
    </div>
  )
}

// ============================================
// MAIN GENEALOGY SECTION — ROOTS REGISTRY
// ============================================
type ViewState = 'landing' | 'onboarding' | 'active'

export default function GenealogySection() {
  const [viewState, setViewState] = useState<ViewState>('landing')
  const [profile, setProfile] = useState<GenealogyProfile | null>(null)
  const [tree, setTree] = useState<FamilyTree | null>(null)
  const [selectedPerson, setSelectedPerson] = useState<Ancestor | null>(null)
  const [showPremium, setShowPremium] = useState(false)
  const [bgLoaded, setBgLoaded] = useState(false)

  // Load profile from localStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('thekingstake-genealogy-profile')
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile) as GenealogyProfile
        setProfile(parsed)
        const builtTree = buildTreeFromProfile(parsed)
        setTree(builtTree)
        setViewState('active')
      } catch { /* ignore */ }
    }
  }, [])

  // Handle onboarding complete
  const handleOnboardingComplete = useCallback((newProfile: GenealogyProfile) => {
    setProfile(newProfile)
    localStorage.setItem('thekingstake-genealogy-profile', JSON.stringify(newProfile))
    const builtTree = buildTreeFromProfile(newProfile)
    setTree(builtTree)
    localStorage.setItem('thekingstake-genealogy-tree', JSON.stringify(builtTree))
    setViewState('active')
  }, [])

  // Reset everything
  const handleReset = useCallback(() => {
    setProfile(null)
    setTree(null)
    localStorage.removeItem('thekingstake-genealogy-profile')
    localStorage.removeItem('thekingstake-genealogy-tree')
    setViewState('landing')
  }, [])

  // Stats
  const stats = {
    total: tree?.people.length || 0,
    confirmed: tree?.people.filter(p => p.status === 'confirmed' || p.status === 'verified').length || 0,
    researching: tree?.people.filter(p => p.status === 'researching').length || 0,
    recordsFound: tree?.people.reduce((acc, p) => acc + Object.values(p.recordsChecked).filter(Boolean).length, 0) || 0,
  }

  // Save person
  const handleSavePerson = useCallback((updated: Ancestor) => {
    setTree(prev => {
      if (!prev) return prev
      const updatedPeople = prev.people.map(p => p.id === updated.id ? updated : p)
      const newTree = { ...prev, people: updatedPeople }
      localStorage.setItem('thekingstake-genealogy-tree', JSON.stringify(newTree))
      return newTree
    })
  }, [])

  // Add ancestor
  const addAncestor = useCallback((parentPosition: string, generation: number, side: 'father' | 'mother') => {
    if (!tree) return
    if (tree.people.length >= 15) { setShowPremium(true); return }

    const position = `${parentPosition}-${side === 'father' ? '0' : '1'}`
    const newPerson: Ancestor = {
      id: Date.now(),
      firstName: side === 'father' ? 'Father' : 'Mother',
      lastName: '',
      generation,
      position,
      status: 'unknown',
      recordsChecked: {},
    }

    const newTree = { ...tree, people: [...tree.people, newPerson] }
    setTree(newTree)
    localStorage.setItem('thekingstake-genealogy-tree', JSON.stringify(newTree))
  }, [tree])

  // Group people by generation
  const peopleByGen = tree ? tree.people.reduce((acc, p) => {
    if (!acc[p.generation]) acc[p.generation] = []
    acc[p.generation].push(p)
    return acc
  }, {} as Record<number, Ancestor[]>) : {}

  // ─── LANDING VIEW ───
  if (viewState === 'landing') {
    return (
      <section id="genealogy" className="relative min-h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/roots-registry-bg.jpg"
            alt=""
            className={`w-full h-full object-cover object-center transition-opacity duration-1000 ${bgLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setBgLoaded(true)}
          />
          {!bgLoaded && <div className="absolute inset-0 bg-[#060a12]" />}
        </div>

        {/* Vignette Overlay — subtle, for readability only */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ boxShadow: 'inset 0 0 200px 100px rgba(6,10,18,0.6)' }} />
        <div className="absolute inset-y-0 left-0 w-[50%] md:w-[35%] pointer-events-none"
          style={{ background: 'linear-gradient(to right, rgba(6,10,18,0.5) 0%, transparent 100%)' }} />

        {/* Content — Left zone only. Right zone is open for the artwork. */}
        <div className="relative z-10 min-h-screen flex items-center px-6 md:px-12 lg:px-20 py-24">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

            {/* LEFT — Text and CTA only */}
            <div className="max-w-md">
              {/* Eyebrow */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-[11px] uppercase tracking-[0.2em] text-[#FF9500] mb-5"
              >
                Trace Your Roots
              </motion.p>

              {/* Heading */}
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-[56px] lg:text-[64px] text-[#F0EBE1] tracking-[-0.01em] leading-[1.08] mb-6"
                style={{
                  fontFamily: "'Playfair Display', 'Georgia', 'Times New Roman', serif",
                  textShadow: '0 4px 30px rgba(0,0,0,0.85), 0 1px 4px rgba(0,0,0,0.6)',
                }}
              >
                Roots Registry
              </motion.h2>

              {/* Supporting Copy */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-[15px] md:text-base text-[#C9B99A] leading-[1.7] mb-10"
                style={{ textShadow: '0 2px 12px rgba(0,0,0,0.75)' }}
              >
                Record your lineage.<br />
                Preserve your family history.<br />
                Build a living legacy for future generations.
              </motion.p>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.35 }}
              >
                <motion.button
                  onClick={() => setViewState('onboarding')}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2.5 bg-[rgba(255,149,0,0.15)] backdrop-blur-sm border border-[rgba(255,149,0,0.35)] text-[#FF9500] rounded-lg px-6 py-3 text-sm font-medium tracking-wide hover:bg-[rgba(255,149,0,0.25)] hover:border-[rgba(255,149,0,0.5)] transition-all duration-300"
                >
                  Begin Your Roots Registry
                  <ArrowRight size={14} />
                </motion.button>
              </motion.div>
            </div>

            {/* RIGHT — Empty. The artwork stays visible. */}
            <div className="hidden md:block" />
          </div>
        </div>
      </section>
    )
  }

  // ─── ONBOARDING VIEW ───
  if (viewState === 'onboarding') {
    return (
      <GenealogyOnboarding
        onComplete={handleOnboardingComplete}
        onCancel={() => setViewState('landing')}
      />
    )
  }

  // ─── ACTIVE VIEW (Tree + Dashboard) ───
  return (
    <SacredRealmBackground centerContent={false}>
      <div className="py-20 md:py-28 px-6 md:px-12 min-h-screen">
        <div className="max-w-5xl mx-auto space-y-10 md:space-y-14">

          {/* Header */}
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex gap-1">{[0, 1, 2].map(i => <div key={i} className="w-[3px] h-[3px] rounded-full bg-[#FF9500]" />)}</div>
              <p className="text-xs uppercase tracking-[0.08em] text-[#FF9500]">Trace Your Roots</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl lg:text-[64px] text-[#F0EBE1] tracking-[-0.02em] leading-[1.08] mb-4"
              style={{
                fontFamily: "'Playfair Display', 'Georgia', 'Times New Roman', serif",
                textShadow: '0 3px 30px rgba(0,0,0,0.8), 0 1px 6px rgba(0,0,0,0.6)',
              }}>
              {profile ? `${profile.rootPerson.firstName}'s Ancestral` : 'Your Ancestral'}<br className="hidden md:block" /> Constellation
            </h2>
            <p className="text-lg md:text-xl text-[#C9B99A] max-w-3xl leading-relaxed">
              {profile
                ? 'Your family tree is growing. Add ancestors, track your research, check off records, and document the lineage they tried to erase.'
                : 'Plant your family tree and watch it grow. Add ancestors, track your research, check off records, and document the lineage they tried to erase.'}
            </p>
          </ScrollReveal>

          {/* Tree Art Display */}
          {profile && (
            <ScrollReveal delay={0.1}>
              <TreeArtDisplay profile={profile} onReset={handleReset} />
            </ScrollReveal>
          )}

          {/* Dashboard */}
          {tree && (
            <ScrollReveal delay={0.15}>
              <div className="bg-[rgba(6,10,18,0.45)] backdrop-blur-xl rounded-xl border border-[rgba(255,149,0,0.15)] p-4 md:p-5 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                <div className="flex flex-wrap items-center gap-4 md:gap-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[rgba(255,149,0,0.1)] border border-[rgba(255,149,0,0.2)] flex items-center justify-center">
                      <Users size={16} className="text-[#FF9500]" />
                    </div>
                    <div>
                      <p className="text-2xl text-[#F0EBE1] font-medium">{stats.total}</p>
                      <p className="text-[10px] text-[#C9B99A]/60 uppercase tracking-wider">Ancestors</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[rgba(72,187,120,0.1)] border border-[rgba(72,187,120,0.2)] flex items-center justify-center">
                      <CheckCircle2 size={16} className="text-green-400" />
                    </div>
                    <div>
                      <p className="text-2xl text-green-400 font-medium">{stats.confirmed}</p>
                      <p className="text-[10px] text-[#C9B99A]/60 uppercase tracking-wider">Confirmed</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[rgba(214,158,46,0.1)] border border-[rgba(214,158,46,0.2)] flex items-center justify-center">
                      <Search size={16} className="text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-2xl text-yellow-400 font-medium">{stats.researching}</p>
                      <p className="text-[10px] text-[#C9B99A]/60 uppercase tracking-wider">Researching</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[rgba(78,205,196,0.1)] border border-[rgba(78,205,196,0.2)] flex items-center justify-center">
                      <Scroll size={16} className="text-teal-400" />
                    </div>
                    <div>
                      <p className="text-2xl text-teal-400 font-medium">{stats.recordsFound}</p>
                      <p className="text-[10px] text-[#C9B99A]/60 uppercase tracking-wider">Records Found</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* Pedigree Constellation */}
          {tree && (
            <ScrollReveal delay={0.2}>
              <div className="bg-[rgba(6,10,18,0.4)] backdrop-blur-xl rounded-xl border border-[rgba(255,149,0,0.12)] p-4 md:p-6 overflow-x-auto shadow-[0_8px_32px_rgba(0,0,0,0.25)]">
                <div className="flex flex-col items-center gap-6 md:gap-8" style={{ minWidth: '600px' }}>

                  {/* Great-Grandparents (Gen 3) */}
                  {peopleByGen[3] && peopleByGen[3].length > 0 && (
                    <div className="flex items-center gap-4 md:gap-8">
                      {peopleByGen[3].map(p => (
                        <AncestorNode key={p.id} ancestor={p} onClick={() => setSelectedPerson(p)} />
                      ))}
                    </div>
                  )}
                  {peopleByGen[3] && peopleByGen[3].length > 0 && (
                    <div className="w-px h-4 bg-[rgba(255,149,0,0.2)]" />
                  )}

                  {/* Grandparents (Gen 2) */}
                  {peopleByGen[2] && peopleByGen[2].length > 0 && (
                    <div className="flex items-center gap-6 md:gap-16">
                      {peopleByGen[2].map(p => (
                        <div key={p.id} className="flex flex-col items-center">
                          <AncestorNode ancestor={p} onClick={() => setSelectedPerson(p)} />
                          <button onClick={() => addAncestor(p.position, 3, 'father')} className="mt-2 text-[9px] text-[#C9B99A]/30 hover:text-[#FF9500] transition-colors flex items-center gap-1">
                            <Plus size={9} /> Add Father
                          </button>
                          <button onClick={() => addAncestor(p.position, 3, 'mother')} className="mt-1 text-[9px] text-[#C9B99A]/30 hover:text-[#FF9500] transition-colors flex items-center gap-1">
                            <Plus size={9} /> Add Mother
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  {peopleByGen[2] && peopleByGen[2].length > 0 && (
                    <div className="w-px h-4 bg-[rgba(255,149,0,0.2)]" />
                  )}

                  {/* Parents (Gen 1) */}
                  {peopleByGen[1] && peopleByGen[1].length > 0 && (
                    <div className="flex items-center gap-8 md:gap-32">
                      {peopleByGen[1].map(p => (
                        <div key={p.id} className="flex flex-col items-center">
                          <AncestorNode ancestor={p} onClick={() => setSelectedPerson(p)} />
                          <button onClick={() => addAncestor(p.position, 2, 'father')} className="mt-2 text-[9px] text-[#C9B99A]/30 hover:text-[#FF9500] transition-colors flex items-center gap-1">
                            <Plus size={9} /> Add Father
                          </button>
                          <button onClick={() => addAncestor(p.position, 2, 'mother')} className="mt-1 text-[9px] text-[#C9B99A]/30 hover:text-[#FF9500] transition-colors flex items-center gap-1">
                            <Plus size={9} /> Add Mother
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  {peopleByGen[1] && peopleByGen[1].length > 0 && (
                    <div className="w-px h-4 bg-[rgba(255,149,0,0.2)]" />
                  )}

                  {/* Root (Gen 0) */}
                  {peopleByGen[0] && peopleByGen[0].length > 0 && (
                    <div className="flex flex-col items-center">
                      {peopleByGen[0].map(p => (
                        <div key={p.id} className="flex flex-col items-center">
                          <AncestorNode ancestor={p} onClick={() => setSelectedPerson(p)} isRoot />
                          <div className="flex gap-2 mt-2">
                            <button onClick={() => addAncestor(p.position, 1, 'father')}
                              className="flex items-center gap-1 text-[10px] bg-[rgba(255,149,0,0.08)] border border-[rgba(255,149,0,0.15)] text-[#FF9500] rounded-full px-3 py-1 hover:bg-[rgba(255,149,0,0.15)] transition-colors">
                              <UserPlus size={10} /> Add Father
                            </button>
                            <button onClick={() => addAncestor(p.position, 1, 'mother')}
                              className="flex items-center gap-1 text-[10px] bg-[rgba(255,149,0,0.08)] border border-[rgba(255,149,0,0.15)] text-[#FF9500] rounded-full px-3 py-1 hover:bg-[rgba(255,149,0,0.15)] transition-colors">
                              <UserPlus size={10} /> Add Mother
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* Legend */}
          {tree && (
            <div className="flex flex-wrap justify-center gap-4 text-[10px] text-[#C9B99A]/60">
              {Object.entries(STATUS_LABELS).map(([key, label]) => (
                <div key={key} className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: STATUS_COLORS[key as keyof typeof STATUS_COLORS] }} />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Family Group Sheet Modal */}
        <AnimatePresence>
          {selectedPerson && (
            <FamilyGroupSheet
              ancestor={selectedPerson}
              onClose={() => setSelectedPerson(null)}
              onSave={handleSavePerson}
            />
          )}
        </AnimatePresence>

        {/* Premium Upsell Modal */}
        <AnimatePresence>
          {showPremium && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowPremium(false)}>
              <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
              <motion.div initial={{ scale: 0.92, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 20 }} onClick={(e) => e.stopPropagation()}
                className="relative bg-[#15202B] rounded-xl border border-[rgba(255,149,0,0.25)] p-6 max-w-sm w-full shadow-2xl">
                <button onClick={() => setShowPremium(false)} className="absolute top-4 right-4 text-[#C9B99A] hover:text-[#F0EBE1]"><X size={18} /></button>
                <div className="flex items-center gap-2 mb-3">
                  <Crown size={20} className="text-[#FF9500]" />
                  <h3 className="text-lg text-[#F0EBE1] font-medium">Upgrade to Premium</h3>
                </div>
                <p className="text-sm text-[#C9B99A] mb-4 leading-relaxed">
                  You've reached the <strong className="text-[#FF9500]">15-person limit</strong> on the free plan. Upgrade to Premium for unlimited ancestors and up to 8 generations.
                </p>
                <div className="bg-[rgba(255,149,0,0.06)] rounded-lg p-3 mb-4 border border-[rgba(255,149,0,0.1)]">
                  <p className="text-xs text-[#FF9500] mb-1 font-medium">Premium includes:</p>
                  <ul className="text-xs text-[#C9B99A] space-y-1">
                    <li>• Unlimited ancestors</li>
                    <li>• 8 generations deep</li>
                    <li>• Shareable tree link</li>
                    <li>• Cloud sync & export</li>
                  </ul>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 bg-[rgba(255,149,0,0.15)] border border-[rgba(255,149,0,0.3)] text-[#FF9500] rounded-lg py-2.5 text-sm font-medium hover:bg-[rgba(255,149,0,0.25)] transition-colors">
                    Upgrade $9.99/mo
                  </button>
                  <button onClick={() => setShowPremium(false)} className="text-xs text-[#C9B99A]/60 hover:text-[#C9B99A] px-3 transition-colors">
                    Maybe Later
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SacredRealmBackground>
  )
}


