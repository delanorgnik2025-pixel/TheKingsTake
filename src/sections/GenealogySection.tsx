import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TreePine, Plus, X, ChevronDown, ChevronUp, CheckCircle2, Circle, Search, Scroll, Users, Star, Crown, Sparkles, Share2, Lock, Zap, AlertTriangle, ArrowRight, UserPlus, Trash2, Save, BookOpen } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'

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
      {/* Glow ring for status */}
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
      {/* Name label */}
      <div className="mt-1.5 text-center max-w-[80px]">
        <p className="text-[10px] md:text-xs text-[#F0EBE1] font-medium truncate leading-tight">{ancestor.firstName}</p>
        <p className="text-[10px] md:text-xs text-[#F0EBE1] font-medium truncate leading-tight">{ancestor.lastName}</p>
        <p className="text-[9px] text-[#C9B99A]/50 mt-0.5">{STATUS_LABELS[ancestor.status]}</p>
      </div>
      {/* Generation badge */}
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

        {/* Header */}
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

        {/* Tabs */}
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
              {/* Personal Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="First Name" value={form.firstName} onChange={v => setForm({ ...form, firstName: v })} />
                <Field label="Last Name" value={form.lastName} onChange={v => setForm({ ...form, lastName: v })} />
                <Field label="Middle Name" value={form.middleName || ''} onChange={v => setForm({ ...form, middleName: v })} />
                <Field label="Nicknames / Variants" value={form.nicknames || ''} onChange={v => setForm({ ...form, nicknames: v })} />
              </div>

              {/* Birth */}
              <div className="bg-[rgba(27,40,56,0.4)] rounded-lg p-3 border border-[rgba(255,149,0,0.08)]">
                <p className="text-[10px] text-[#FF9500] uppercase tracking-wider mb-2">Birth</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <Field label="Date" value={form.birthDate || ''} onChange={v => setForm({ ...form, birthDate: v })} />
                  <Field label="Place" value={form.birthPlace || ''} onChange={v => setForm({ ...form, birthPlace: v })} />
                  <Field label="County" value={form.birthCounty || ''} onChange={v => setForm({ ...form, birthCounty: v })} />
                  <Field label="State" value={form.birthState || ''} onChange={v => setForm({ ...form, birthState: v })} />
                </div>
              </div>

              {/* Death */}
              <div className="bg-[rgba(27,40,56,0.4)] rounded-lg p-3 border border-[rgba(255,149,0,0.08)]">
                <p className="text-[10px] text-[#FF9500] uppercase tracking-wider mb-2">Death</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <Field label="Date" value={form.deathDate || ''} onChange={v => setForm({ ...form, deathDate: v })} />
                  <Field label="Place" value={form.deathPlace || ''} onChange={v => setForm({ ...form, deathPlace: v })} />
                </div>
              </div>

              {/* Marriage */}
              <div className="bg-[rgba(27,40,56,0.4)] rounded-lg p-3 border border-[rgba(255,149,0,0.08)]">
                <p className="text-[10px] text-[#FF9500] uppercase tracking-wider mb-2">Marriage</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <Field label="Spouse Name" value={form.spouseName || ''} onChange={v => setForm({ ...form, spouseName: v })} />
                  <Field label="Marriage Date" value={form.marriageDate || ''} onChange={v => setForm({ ...form, marriageDate: v })} />
                  <Field label="Marriage Place" value={form.marriagePlace || ''} onChange={v => setForm({ ...form, marriagePlace: v })} span2 />
                </div>
              </div>

              {/* Identity */}
              <div className="bg-[rgba(255,149,0,0.05)] rounded-lg p-3 border border-[rgba(255,149,0,0.12)]">
                <p className="text-[10px] text-[#FF9500] uppercase tracking-wider mb-2">Identity & Affiliation</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <Field label="Tribal Affiliation" value={form.tribalAffiliation || ''} onChange={v => setForm({ ...form, tribalAffiliation: v })} />
                  <Field label="Census Race Listed" value={form.censusRace || ''} onChange={v => setForm({ ...form, censusRace: v })} />
                  <Field label="Enrollment Number" value={form.enrollmentNumber || ''} onChange={v => setForm({ ...form, enrollmentNumber: v })} />
                </div>
              </div>

              {/* Other */}
              <div className="bg-[rgba(27,40,56,0.4)] rounded-lg p-3 border border-[rgba(255,149,0,0.08)]">
                <p className="text-[10px] text-[#FF9500] uppercase tracking-wider mb-2">Other Details</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <Field label="Occupation" value={form.occupation || ''} onChange={v => setForm({ ...form, occupation: v })} />
                  <Field label="Military Service" value={form.militaryService || ''} onChange={v => setForm({ ...form, militaryService: v })} />
                  <Field label="Church" value={form.church || ''} onChange={v => setForm({ ...form, church: v })} />
                  <Field label="Cemetery" value={form.cemetery || ''} onChange={v => setForm({ ...form, cemetery: v })} />
                </div>
              </div>

              {/* Notes */}
              <div>
                <p className="text-[10px] text-[#FF9500] uppercase tracking-wider mb-1">Research Notes</p>
                <textarea
                  value={form.notes || ''}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Enter any research notes, clues, or observations..."
                  className="w-full bg-[rgba(27,40,56,0.6)] border border-[rgba(255,149,0,0.1)] rounded-lg px-3 py-2 text-sm text-[#F0EBE1] placeholder-[#C9B99A]/30 focus:outline-none focus:border-[rgba(255,149,0,0.3)] min-h-[60px] resize-none"
                />
              </div>

              {/* Oral History */}
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
            /* RECORD CHECKLIST TAB */
            <div className="space-y-2">
              <p className="text-xs text-[#C9B99A] mb-3">Check off each record type as you search. Click a checked item to add source links.</p>
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

        {/* Footer Save */}
        <div className="sticky bottom-0 bg-[#15202B]/95 backdrop-blur-md border-t border-[rgba(255,149,0,0.15)] p-4 flex justify-end">
          <button onClick={handleSave} className="flex items-center gap-2 bg-[rgba(255,149,0,0.15)] border border-[rgba(255,149,0,0.3)] text-[#FF9500] rounded-lg px-5 py-2.5 hover:bg-[rgba(255,149,0,0.25)] transition-all text-sm font-medium">
            <Save size={14} /> Save Ancestor
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ============================================
// FIELD COMPONENT
// ============================================
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
// TREE CREATION FORM
// ============================================
function TreeCreationForm({ onCreate }: { onCreate: (tree: FamilyTree) => void }) {
  const [name, setName] = useState('')
  const [treeName, setTreeName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [birthPlace, setBirthPlace] = useState('')
  const [birthState, setBirthState] = useState('')

  const handleSubmit = () => {
    if (!name.trim() || !treeName.trim()) return
    const [firstName, ...rest] = name.trim().split(' ')
    const lastName = rest.pop() || ''
    const rootPerson: Ancestor = {
      id: Date.now(),
      firstName,
      lastName,
      birthDate,
      birthPlace,
      birthState,
      generation: 0,
      position: '0',
      status: 'confirmed',
      recordsChecked: {},
    }
    const tree: FamilyTree = {
      id: Date.now(),
      treeName,
      people: [rootPerson],
      totalPeople: 1,
    }
    onCreate(tree)
  }

  return (
    <div className="bg-[rgba(27,40,56,0.4)] rounded-xl border border-[rgba(255,149,0,0.15)] p-5 md:p-6 max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-5">
        <TreePine size={20} className="text-[#FF9500]" />
        <h3 className="text-lg text-[#F0EBE1] font-medium">Start Your Family Tree</h3>
      </div>
      <div className="space-y-3">
        <Field label="Tree Name" value={treeName} onChange={setTreeName} />
        <Field label="Your Full Name" value={name} onChange={setName} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Birth Date" value={birthDate} onChange={setBirthDate} />
          <Field label="Birth Place" value={birthPlace} onChange={setBirthPlace} />
        </div>
        <Field label="Birth State" value={birthState} onChange={setBirthState} />
        <button onClick={handleSubmit}
          className="w-full flex items-center justify-center gap-2 bg-[rgba(255,149,0,0.15)] border border-[rgba(255,149,0,0.3)] text-[#FF9500] rounded-lg px-5 py-3 hover:bg-[rgba(255,149,0,0.25)] transition-all text-sm font-medium mt-2">
          <TreePine size={14} /> Plant Your Tree
        </button>
      </div>
    </div>
  )
}

// ============================================
// MAIN GENEALOGY SECTION
// ============================================
export default function GenealogySection() {
  const [tree, setTree] = useState<FamilyTree | null>(null)
  const [selectedPerson, setSelectedPerson] = useState<Ancestor | null>(null)
  const [showPremium, setShowPremium] = useState(false)

  // Stats
  const stats = {
    total: tree?.people.length || 0,
    confirmed: tree?.people.filter(p => p.status === 'confirmed' || p.status === 'verified').length || 0,
    researching: tree?.people.filter(p => p.status === 'researching').length || 0,
    recordsFound: tree?.people.reduce((acc, p) => acc + Object.values(p.recordsChecked).filter(Boolean).length, 0) || 0,
  }

  // Create tree
  const handleCreateTree = useCallback((newTree: FamilyTree) => {
    setTree(newTree)
    // Save to localStorage for persistence
    localStorage.setItem('thekingstake-genealogy-tree', JSON.stringify(newTree))
  }, [])

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
      parentPosition: parentPosition,
      status: 'unknown',
      recordsChecked: {},
    }

    const newTree = { ...tree, people: [...tree.people, newPerson] }
    setTree(newTree)
    localStorage.setItem('thekingstake-genealogy-tree', JSON.stringify(newTree))
  }, [tree])

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('thekingstake-genealogy-tree')
    if (saved) {
      try { setTree(JSON.parse(saved)) } catch { /* ignore */ }
    }
  }, [])

  // Group people by generation
  const peopleByGen = tree ? tree.people.reduce((acc, p) => {
    if (!acc[p.generation]) acc[p.generation] = []
    acc[p.generation].push(p)
    return acc
  }, {} as Record<number, Ancestor[]>) : {}

  return (
    <section id="genealogy" className="relative py-20 md:py-28 px-6 md:px-12 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: 'url(/images/cosmic-bg.jpg)' }} />
      <div className="absolute inset-0 bg-[#0a0f1a]/90" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-10 md:space-y-14">

        {/* Header */}
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex gap-1">{[0,1,2].map(i => <div key={i} className="w-[3px] h-[3px] rounded-full bg-[#FF9500]" />)}</div>
            <p className="text-xs uppercase tracking-[0.08em] text-[#FF9500]">Trace Your Roots</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="text-4xl md:text-5xl lg:text-[64px] text-[#F0EBE1] tracking-[-0.02em] leading-[1.08] mb-4 text-shadow-hero">
            Build Your Ancestral<br className="hidden md:block" /> Constellation
          </h2>
          <p className="text-lg md:text-xl text-[#C9B99A] max-w-3xl leading-relaxed">
            Plant your family tree and watch it grow. Add ancestors, track your research, check off records, and document the lineage they tried to erase.
          </p>
        </ScrollReveal>

        {/* No Tree Yet — Show Creation Form */}
        {!tree && (
          <ScrollReveal delay={0.15}>
            <TreeCreationForm onCreate={handleCreateTree} />

            {/* Tier Info */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {/* Free */}
              <div className="bg-[rgba(27,40,56,0.4)] rounded-xl border border-[rgba(255,149,0,0.15)] p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles size={16} className="text-[#FF9500]" />
                  <h4 className="text-sm text-[#F0EBE1] font-medium">Free — Start Today</h4>
                </div>
                <ul className="space-y-2 text-xs text-[#C9B99A]">
                  <li className="flex items-center gap-2"><CheckCircle2 size={11} className="text-green-400" /> 4-generation pedigree tree</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={11} className="text-green-400" /> Family Group Sheet per ancestor</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={11} className="text-green-400" /> 15-record research checklist</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={11} className="text-green-400" /> Ancestry dashboard & stats</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={11} className="text-green-400" /> Saved locally on your device</li>
                </ul>
              </div>

              {/* Premium */}
              <div className="bg-[rgba(255,149,0,0.06)] rounded-xl border border-[rgba(255,149,0,0.2)] p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Crown size={16} className="text-[#FF9500]" />
                  <h4 className="text-sm text-[#F0EBE1] font-medium">Premium — $9.99/month</h4>
                </div>
                <ul className="space-y-2 text-xs text-[#C9B99A]">
                  <li className="flex items-center gap-2"><Zap size={11} className="text-[#FF9500]" /> 8-generation deep tree</li>
                  <li className="flex items-center gap-2"><Zap size={11} className="text-[#FF9500]" /> Unlimited ancestors</li>
                  <li className="flex items-center gap-2"><Zap size={11} className="text-[#FF9500]" /> Shareable tree link</li>
                  <li className="flex items-center gap-2"><Zap size={11} className="text-[#FF9500]" /> Cloud sync across devices</li>
                  <li className="flex items-center gap-2"><Zap size={11} className="text-[#FF9500]" /> AI research suggestions</li>
                  <li className="flex items-center gap-2"><Zap size={11} className="text-[#FF9500]" /> Export GEDCOM & PDF</li>
                  <li className="flex items-center gap-2"><Zap size={11} className="text-[#FF9500]" /> Priority support</li>
                </ul>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Tree Active — Show Dashboard + Pedigree */}
        {tree && (
          <>
            {/* Dashboard */}
            <ScrollReveal delay={0.1}>
              <div className="bg-[rgba(27,40,56,0.4)] rounded-xl border border-[rgba(255,149,0,0.15)] p-4 md:p-5">
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
                  <div className="ml-auto">
                    <button onClick={() => setTree(null)}
                      className="text-xs text-[#C9B99A]/40 hover:text-[#FF9500] transition-colors">
                      Start New Tree
                    </button>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Pedigree Constellation */}
            <ScrollReveal delay={0.15}>
              <div className="bg-[rgba(27,40,56,0.3)] rounded-xl border border-[rgba(255,149,0,0.1)] p-4 md:p-6 overflow-x-auto">
                <div className="flex flex-col items-center gap-6 md:gap-8" style={{ minWidth: '600px' }}>

                  {/* Great-Grandparents (Gen 3) */}
                  {peopleByGen[3] && peopleByGen[3].length > 0 && (
                    <div className="flex items-center gap-4 md:gap-8">
                      {peopleByGen[3].map(p => (
                        <AncestorNode key={p.id} ancestor={p} onClick={() => setSelectedPerson(p)} />
                      ))}
                    </div>
                  )}

                  {/* Connecting lines */}
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

                  {/* Connecting lines */}
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

                  {/* Connecting lines */}
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

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-4 text-[10px] text-[#C9B99A]/60">
              {Object.entries(STATUS_LABELS).map(([key, label]) => (
                <div key={key} className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: STATUS_COLORS[key as keyof typeof STATUS_COLORS] }} />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </>
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
    </section>
  )
}
