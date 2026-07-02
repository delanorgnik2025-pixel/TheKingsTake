import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router'
import {
  ArrowRight, ArrowLeft, User, TreePine, Globe, Users,
  Heart, GitBranch, BookOpen, Check, Sparkles, Plus, X, Edit3, Trash2
} from 'lucide-react'

// ─── Types ───────────────────────────────────────────
interface Person {
  id: string
  firstName: string
  lastName: string
  birthDate?: string
  deceased?: boolean
}

interface WizardData {
  firstName: string
  middleName: string
  lastName: string
  suffix: string
  branchName: string
  branchDescription: string
  familyMotto: string
  country: string
  state: string
  county: string
  city: string
  village: string
  tribalAffiliation: string
  ethnicity: string
  father: Person
  mother: Person
  fatherUnknown: boolean
  motherUnknown: boolean
  paternalGrandfather: Person
  paternalGrandmother: Person
  maternalGrandfather: Person
  maternalGrandmother: Person
  patGrandparentsUnknown: boolean
  matGrandparentsUnknown: boolean
  ancestors: { generation: number; people: Person[] }
  biography: string
  traditions: string
  languages: string
  oralHistory: string
}

const EMPTY_PERSON = (): Person => ({ id: crypto.randomUUID(), firstName: '', lastName: '', birthDate: '', deceased: false })

const INITIAL_DATA: WizardData = {
  firstName: '', middleName: '', lastName: '', suffix: '',
  branchName: '', branchDescription: '', familyMotto: '',
  country: '', state: '', county: '', city: '', village: '', tribalAffiliation: '', ethnicity: '',
  father: EMPTY_PERSON(), mother: EMPTY_PERSON(), fatherUnknown: false, motherUnknown: false,
  paternalGrandfather: EMPTY_PERSON(), paternalGrandmother: EMPTY_PERSON(),
  maternalGrandfather: EMPTY_PERSON(), maternalGrandmother: EMPTY_PERSON(),
  patGrandparentsUnknown: false, matGrandparentsUnknown: false,
  ancestors: { generation: 2, people: [] },
  biography: '', traditions: '', languages: '', oralHistory: '',
}

const STEP_LABELS = [
  'Your Name', 'Branch', 'Origins', 'Parents', 'Grandparents', 'Great-Grandparents', 'Your Story', 'Review & Save'
]

const STEP_ICONS = [User, TreePine, Globe, Users, Heart, GitBranch, BookOpen, Check]

// ─── Wizard Component ────────────────────────────────
export default function RootsRegistryWizard() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [data, setData] = useState<WizardData>(() => {
    const saved = localStorage.getItem('thekingstake-wizard-data')
    return saved ? JSON.parse(saved) : INITIAL_DATA
  })
  const [isComplete, setIsComplete] = useState(false)
  const [editingField, setEditingField] = useState<string | null>(null)

  // Autosave
  useEffect(() => {
    localStorage.setItem('thekingstake-wizard-data', JSON.stringify(data))
  }, [data])

  const update = useCallback((partial: Partial<WizardData>) => {
    setData(prev => ({ ...prev, ...partial }))
  }, [])

  const goNext = useCallback(() => {
    setDirection(1)
    setStep(s => Math.min(s + 1, 7))
  }, [])

  const goBack = useCallback(() => {
    setDirection(-1)
    setStep(s => Math.max(s - 1, 0))
  }, [])

  const handleSave = useCallback(() => {
    localStorage.setItem('thekingstake-registry-profile', JSON.stringify(data))
    setIsComplete(true)
  }, [data])

  const totalSteps = 8
  const progress = ((step + 1) / totalSteps) * 100
  const StepIcon = STEP_ICONS[step]

  // ─── Completion Screen ────────────────────────────
  if (isComplete) {
    return (
      <div className="fixed inset-0 z-50 bg-[#05080e] flex items-center justify-center p-6">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(255,149,0,0.06) 0%, transparent 60%)' }} />
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative text-center max-w-md">
          <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 1.5, delay: 0.3 }}
            className="w-20 h-20 rounded-full bg-[rgba(255,149,0,0.12)] border border-[rgba(255,149,0,0.25)] flex items-center justify-center mx-auto mb-6">
            <Sparkles size={32} className="text-[#FF9500]" />
          </motion.div>
          <h2 className="text-2xl sm:text-3xl text-[#F0EBE1] mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Your Roots Are Planted
          </h2>
          <p className="text-sm text-[#C9B99A]/70 mb-8">
            Welcome to the Sacred Registry, {data.firstName || 'Ancestor'}.<br />
            Your bloodline has been recorded for generations to come.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => navigate('/')} className="inline-flex items-center justify-center gap-2 bg-[rgba(255,149,0,0.15)] border border-[rgba(255,149,0,0.35)] text-[#FF9500] rounded-lg px-6 py-3 text-sm hover:bg-[rgba(255,149,0,0.25)] transition-all cursor-pointer">
              <TreePine size={14} /> Return Home
            </button>
            <button onClick={() => { setIsComplete(false); setStep(0); setData(INITIAL_DATA); localStorage.removeItem('thekingstake-wizard-data'); }} className="inline-flex items-center justify-center gap-2 text-[#C9B99A] border border-[rgba(255,149,0,0.15)] rounded-lg px-6 py-3 text-sm hover:border-[rgba(255,149,0,0.3)] transition-all cursor-pointer">
              <Plus size={14} /> Create New Entry
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#05080e] flex flex-col">
      {/* Ambient bg */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 30% 70%, rgba(255,149,0,0.04) 0%, transparent 50%)' }} />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-5 sm:px-8 py-3 border-b border-[rgba(255,149,0,0.08)]">
        <div className="flex items-center gap-3">
          <StepIcon size={15} className="text-[#FF9500]" />
          <span className="text-[10px] uppercase tracking-[0.15em] text-[#C9B99A]/60">
            Step {step + 1} of {totalSteps} — {STEP_LABELS[step]}
          </span>
        </div>
        <button onClick={() => navigate('/')} className="text-[10px] uppercase tracking-[0.1em] text-[#C9B99A]/40 hover:text-[#C9B99A] transition-colors cursor-pointer">
          Close
        </button>
      </div>

      {/* Progress bar */}
      <div className="relative z-10 h-[2px] bg-[rgba(255,149,0,0.06)]">
        <motion.div className="h-full bg-[#FF9500]" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} />
      </div>

      {/* Step indicators */}
      <div className="relative z-10 flex items-center justify-center gap-1.5 py-3 px-4">
        {STEP_LABELS.map((label, i) => (
          <div key={label} className="flex flex-col items-center gap-1">
            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${i === step ? 'bg-[#FF9500] scale-125' : i < step ? 'bg-[#FF9500]/40' : 'bg-[rgba(255,149,0,0.1)]'}`} />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-start justify-center px-5 sm:px-8 py-4 overflow-y-auto">
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait" custom={direction}>

            {/* STEP 1: YOUR NAME */}
            {step === 0 && (
              <StepPanel key="step1" direction={direction} title="YOUR NAME" subtitle="Every story begins with you. Let's start with your name.">
                <Input label="FIRST NAME" value={data.firstName} onChange={v => update({ firstName: v })} required />
                <Input label="MIDDLE NAME (OPTIONAL)" value={data.middleName} onChange={v => update({ middleName: v })} />
                <Input label="LAST NAME" value={data.lastName} onChange={v => update({ lastName: v })} required />
                <Select label="SUFFIX (OPTIONAL)" value={data.suffix} onChange={v => update({ suffix: v })} options={['', 'Jr.', 'Sr.', 'II', 'III', 'IV', 'Esq.']} />
              </StepPanel>
            )}

            {/* STEP 2: CREATE YOUR BRANCH */}
            {step === 1 && (
              <StepPanel key="step2" direction={direction} title="CREATE YOUR BRANCH" subtitle="What should we call your family branch?">
                <Input label="BRANCH NAME" value={data.branchName} onChange={v => update({ branchName: v })} placeholder="e.g. The King Lineage" required />
                <TextArea label="BRANCH DESCRIPTION (OPTIONAL)" value={data.branchDescription} onChange={v => update({ branchDescription: v })} placeholder="Tell us about your branch..." rows={3} />
                <Input label="FAMILY MOTTO (OPTIONAL)" value={data.familyMotto} onChange={v => update({ familyMotto: v })} placeholder="e.g. Through Unity, Strength" />
                <div className="mt-2">
                  <label className="text-[10px] uppercase tracking-[0.15em] text-[#FF9500]/70 mb-2 block">BRANCH CREST (OPTIONAL)</label>
                  <div className="border border-dashed border-[rgba(255,149,0,0.2)] rounded-lg p-6 text-center hover:border-[rgba(255,149,0,0.4)] transition-colors cursor-pointer">
                    <TreePine size={20} className="text-[#FF9500]/40 mx-auto mb-2" />
                    <p className="text-[11px] text-[#C9B99A]/40">Upload an image for your family crest</p>
                  </div>
                </div>
              </StepPanel>
            )}

            {/* STEP 3: WHERE ARE YOUR ROOTS? */}
            {step === 2 && (
              <StepPanel key="step3" direction={direction} title="WHERE ARE YOUR ROOTS?" subtitle="Where did your lineage originate?">
                <Input label="COUNTRY OF ORIGIN" value={data.country} onChange={v => update({ country: v })} required />
                <Input label="REGION / STATE / PROVINCE" value={data.state} onChange={v => update({ state: v })} required />
                <Input label="COUNTY" value={data.county} onChange={v => update({ county: v })} />
                <Input label="CITY / VILLAGE (OPTIONAL)" value={data.city} onChange={v => update({ city: v })} />
                <Input label="TRIBAL AFFILIATION" value={data.tribalAffiliation} onChange={v => update({ tribalAffiliation: v })} placeholder="e.g. Lumbee, Cherokee" />
                <Input label="ETHNICITY" value={data.ethnicity} onChange={v => update({ ethnicity: v })} placeholder="e.g. African American, Indigenous" />
              </StepPanel>
            )}

            {/* STEP 4: YOUR PARENTS */}
            {step === 3 && (
              <StepPanel key="step4" direction={direction} title="YOUR PARENTS" subtitle="Tell us about your parents.">
                {!data.fatherUnknown && (
                  <div className="bg-[rgba(255,149,0,0.04)] border border-[rgba(255,149,0,0.1)] rounded-lg p-4 mb-4">
                    <p className="text-[10px] uppercase tracking-[0.15em] text-[#FF9500]/70 mb-3">FATHER</p>
                    <div className="grid grid-cols-2 gap-3">
                      <Input label="FIRST NAME" value={data.father.firstName} onChange={v => update({ father: { ...data.father, firstName: v } })} compact />
                      <Input label="LAST NAME" value={data.father.lastName} onChange={v => update({ father: { ...data.father, lastName: v } })} compact />
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <input type="date" value={data.father.birthDate} onChange={e => update({ father: { ...data.father, birthDate: e.target.value } })}
                        className="flex-1 bg-[rgba(27,40,56,0.4)] border border-[rgba(255,149,0,0.1)] rounded-lg px-3 py-2 text-[11px] text-[#F0EBE1]" />
                      <label className="flex items-center gap-1.5 text-[10px] text-[#C9B99A]/50 cursor-pointer">
                        <input type="checkbox" checked={data.father.deceased} onChange={e => update({ father: { ...data.father, deceased: e.target.checked } })}
                          className="accent-[#FF9500]" /> Deceased
                      </label>
                    </div>
                  </div>
                )}
                <label className="flex items-center gap-2 mb-4 cursor-pointer">
                  <input type="checkbox" checked={data.fatherUnknown} onChange={e => update({ fatherUnknown: e.target.checked })} className="accent-[#FF9500]" />
                  <span className="text-[11px] text-[#C9B99A]/50">I don't have this information</span>
                </label>

                {!data.motherUnknown && (
                  <div className="bg-[rgba(255,149,0,0.04)] border border-[rgba(255,149,0,0.1)] rounded-lg p-4 mb-4">
                    <p className="text-[10px] uppercase tracking-[0.15em] text-[#FF9500]/70 mb-3">MOTHER</p>
                    <div className="grid grid-cols-2 gap-3">
                      <Input label="FIRST NAME" value={data.mother.firstName} onChange={v => update({ mother: { ...data.mother, firstName: v } })} compact />
                      <Input label="LAST NAME" value={data.mother.lastName} onChange={v => update({ mother: { ...data.mother, lastName: v } })} compact />
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <input type="date" value={data.mother.birthDate} onChange={e => update({ mother: { ...data.mother, birthDate: e.target.value } })}
                        className="flex-1 bg-[rgba(27,40,56,0.4)] border border-[rgba(255,149,0,0.1)] rounded-lg px-3 py-2 text-[11px] text-[#F0EBE1]" />
                      <label className="flex items-center gap-1.5 text-[10px] text-[#C9B99A]/50 cursor-pointer">
                        <input type="checkbox" checked={data.mother.deceased} onChange={e => update({ mother: { ...data.mother, deceased: e.target.checked } })}
                          className="accent-[#FF9500]" /> Deceased
                      </label>
                    </div>
                  </div>
                )}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={data.motherUnknown} onChange={e => update({ motherUnknown: e.target.checked })} className="accent-[#FF9500]" />
                  <span className="text-[11px] text-[#C9B99A]/50">I don't have this information</span>
                </label>
              </StepPanel>
            )}

            {/* STEP 5: GRANDPARENTS */}
            {step === 4 && (
              <StepPanel key="step5" direction={direction} title="ADD GRANDPARENTS" subtitle="Let's go one generation back.">
                {!data.patGrandparentsUnknown && (
                  <div className="bg-[rgba(255,149,0,0.04)] border border-[rgba(255,149,0,0.1)] rounded-lg p-4 mb-4">
                    <p className="text-[10px] uppercase tracking-[0.15em] text-[#FF9500]/70 mb-3">PATERNAL GRANDPARENTS</p>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <Input label="GRANDFATHER FIRST NAME" value={data.paternalGrandfather.firstName} onChange={v => update({ paternalGrandfather: { ...data.paternalGrandfather, firstName: v } })} compact />
                      <Input label="LAST NAME" value={data.paternalGrandfather.lastName} onChange={v => update({ paternalGrandfather: { ...data.paternalGrandfather, lastName: v } })} compact />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Input label="GRANDMOTHER FIRST NAME" value={data.paternalGrandmother.firstName} onChange={v => update({ paternalGrandmother: { ...data.paternalGrandmother, firstName: v } })} compact />
                      <Input label="LAST NAME" value={data.paternalGrandmother.lastName} onChange={v => update({ paternalGrandmother: { ...data.paternalGrandmother, lastName: v } })} compact />
                    </div>
                  </div>
                )}
                <label className="flex items-center gap-2 mb-6 cursor-pointer">
                  <input type="checkbox" checked={data.patGrandparentsUnknown} onChange={e => update({ patGrandparentsUnknown: e.target.checked })} className="accent-[#FF9500]" />
                  <span className="text-[11px] text-[#C9B99A]/50">I don't have this information</span>
                </label>

                {!data.matGrandparentsUnknown && (
                  <div className="bg-[rgba(255,149,0,0.04)] border border-[rgba(255,149,0,0.1)] rounded-lg p-4 mb-4">
                    <p className="text-[10px] uppercase tracking-[0.15em] text-[#FF9500]/70 mb-3">MATERNAL GRANDPARENTS</p>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <Input label="GRANDFATHER FIRST NAME" value={data.maternalGrandfather.firstName} onChange={v => update({ maternalGrandfather: { ...data.maternalGrandfather, firstName: v } })} compact />
                      <Input label="LAST NAME" value={data.maternalGrandfather.lastName} onChange={v => update({ maternalGrandfather: { ...data.maternalGrandfather, lastName: v } })} compact />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Input label="GRANDMOTHER FIRST NAME" value={data.maternalGrandmother.firstName} onChange={v => update({ maternalGrandmother: { ...data.maternalGrandmother, firstName: v } })} compact />
                      <Input label="LAST NAME" value={data.maternalGrandmother.lastName} onChange={v => update({ maternalGrandmother: { ...data.maternalGrandmother, lastName: v } })} compact />
                    </div>
                  </div>
                )}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={data.matGrandparentsUnknown} onChange={e => update({ matGrandparentsUnknown: e.target.checked })} className="accent-[#FF9500]" />
                  <span className="text-[11px] text-[#C9B99A]/50">I don't have this information</span>
                </label>
              </StepPanel>
            )}

            {/* STEP 6: EXPAND YOUR TREE */}
            {step === 5 && (
              <StepPanel key="step6" direction={direction} title="ADD GREAT-GRANDPARENTS" subtitle="The deeper the roots, the stronger the tree.">
                <div className="text-center py-6">
                  <div className="flex justify-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-[rgba(255,149,0,0.08)] border border-[rgba(255,149,0,0.2)] flex items-center justify-center">
                      <Users size={16} className="text-[#FF9500]" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[rgba(255,149,0,0.08)] border border-[rgba(255,149,0,0.2)] flex items-center justify-center">
                      <Users size={16} className="text-[#FF9500]" />
                    </div>
                    <button onClick={() => {
                      const newPerson = EMPTY_PERSON()
                      update({ ancestors: { ...data.ancestors, people: [...data.ancestors.people, newPerson] } })
                    }} className="w-10 h-10 rounded-full bg-[rgba(255,149,0,0.12)] border border-[rgba(255,149,0,0.3)] flex items-center justify-center hover:bg-[rgba(255,149,0,0.2)] transition-colors cursor-pointer">
                      <Plus size={16} className="text-[#FF9500]" />
                    </button>
                  </div>
                  <p className="text-sm text-[#F0EBE1] mb-2">Add Great-Grandparents</p>
                  <p className="text-[11px] text-[#C9B99A]/50 mb-6">Start adding as many as you know. Unlimited depth.</p>
                </div>

                {data.ancestors.people.map((person, i) => (
                  <div key={person.id} className="bg-[rgba(255,149,0,0.04)] border border-[rgba(255,149,0,0.1)] rounded-lg p-4 mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[10px] uppercase tracking-[0.15em] text-[#FF9500]/70">GREAT-GRANDPARENT {i + 1}</p>
                      <button onClick={() => {
                        const updated = data.ancestors.people.filter(p => p.id !== person.id)
                        update({ ancestors: { ...data.ancestors, people: updated } })
                      }} className="text-[#C9B99A]/30 hover:text-[#FF9500] transition-colors cursor-pointer">
                        <Trash2 size={12} />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input value={person.firstName} onChange={e => {
                        const updated = data.ancestors.people.map(p => p.id === person.id ? { ...p, firstName: e.target.value } : p)
                        update({ ancestors: { ...data.ancestors, people: updated } })
                      }} placeholder="First name" className="bg-[rgba(27,40,56,0.4)] border border-[rgba(255,149,0,0.1)] rounded-lg px-3 py-2 text-[11px] text-[#F0EBE1] placeholder-[#C9B99A]/30 focus:outline-none focus:border-[rgba(255,149,0,0.3)]" />
                      <input value={person.lastName} onChange={e => {
                        const updated = data.ancestors.people.map(p => p.id === person.id ? { ...p, lastName: e.target.value } : p)
                        update({ ancestors: { ...data.ancestors, people: updated } })
                      }} placeholder="Last name" className="bg-[rgba(27,40,56,0.4)] border border-[rgba(255,149,0,0.1)] rounded-lg px-3 py-2 text-[11px] text-[#F0EBE1] placeholder-[#C9B99A]/30 focus:outline-none focus:border-[rgba(255,149,0,0.3)]" />
                    </div>
                  </div>
                ))}

                <button onClick={() => {
                  const newPerson = EMPTY_PERSON()
                  update({ ancestors: { ...data.ancestors, people: [...data.ancestors.people, newPerson] } })
                }} className="w-full py-2.5 border border-dashed border-[rgba(255,149,0,0.2)] rounded-lg text-[11px] text-[#FF9500]/60 hover:border-[rgba(255,149,0,0.4)] hover:text-[#FF9500] transition-all cursor-pointer flex items-center justify-center gap-1.5">
                  <Plus size={12} /> Add Great-Grandparent
                </button>
              </StepPanel>
            )}

            {/* STEP 7: YOUR STORY */}
            {step === 6 && (
              <StepPanel key="step7" direction={direction} title="YOUR STORY" subtitle="Every family has a story. Share yours.">
                <TextArea label="FAMILY STORY (OPTIONAL)" value={data.biography} onChange={v => update({ biography: v })} placeholder="Share any history, memories, or stories passed down..." rows={3} />
                <TextArea label="TRADITIONS (OPTIONAL)" value={data.traditions} onChange={v => update({ traditions: v })} placeholder="List traditions, values, or cultural practices..." rows={2} />
                <Input label="LANGUAGES SPOKEN" value={data.languages} onChange={v => update({ languages: v })} placeholder="e.g. English, Cherokee, Gullah" />
                <TextArea label="ORAL HISTORY" value={data.oralHistory} onChange={v => update({ oralHistory: v })} placeholder="Record any oral histories or spoken traditions..." rows={3} />
                <div className="mt-2">
                  <label className="text-[10px] uppercase tracking-[0.15em] text-[#FF9500]/70 mb-2 block">HISTORICAL DOCUMENTS, PHOTOS, AUDIO, VIDEO</label>
                  <div className="border border-dashed border-[rgba(255,149,0,0.2)] rounded-lg p-6 text-center hover:border-[rgba(255,149,0,0.4)] transition-colors cursor-pointer">
                    <BookOpen size={20} className="text-[#FF9500]/40 mx-auto mb-2" />
                    <p className="text-[11px] text-[#C9B99A]/40">Upload documents, photos, audio, or video files</p>
                  </div>
                </div>
              </StepPanel>
            )}

            {/* STEP 8: REVIEW & SAVE */}
            {step === 7 && (
              <StepPanel key="step8" direction={direction} title="REVIEW & SAVE" subtitle="Review your information before saving." noNav>
                <div className="space-y-3 mb-8">
                  {data.firstName && (
                    <ReviewCard title="Your Name" fields={[
                      { label: 'Name', value: `${data.firstName} ${data.middleName} ${data.lastName} ${data.suffix}`.replace(/\s+/g, ' ').trim() },
                    ]} onEdit={() => setEditingField('name')} />
                  )}
                  {data.branchName && (
                    <ReviewCard title="Your Branch" fields={[
                      { label: 'Branch', value: data.branchName },
                      ...(data.familyMotto ? [{ label: 'Motto', value: data.familyMotto }] : []),
                    ]} onEdit={() => setEditingField('branch')} />
                  )}
                  {(data.country || data.tribalAffiliation) && (
                    <ReviewCard title="Origins" fields={[
                      ...(data.country ? [{ label: 'Country', value: data.country }] : []),
                      ...(data.state ? [{ label: 'State', value: data.state }] : []),
                      ...(data.tribalAffiliation ? [{ label: 'Tribal', value: data.tribalAffiliation }] : []),
                    ]} onEdit={() => setEditingField('origins')} />
                  )}
                  {(data.father.firstName || data.mother.firstName) && (
                    <ReviewCard title="Parents" fields={[
                      ...(data.father.firstName ? [{ label: 'Father', value: `${data.father.firstName} ${data.father.lastName}` }] : []),
                      ...(data.mother.firstName ? [{ label: 'Mother', value: `${data.mother.firstName} ${data.mother.lastName}` }] : []),
                    ]} onEdit={() => setEditingField('parents')} />
                  )}
                  {data.ancestors.people.length > 0 && (
                    <ReviewCard title="Great-Grandparents" fields={
                      data.ancestors.people.map((p, i) => ({ label: `GP ${i + 1}`, value: `${p.firstName} ${p.lastName}`.trim() || 'Unnamed' }))
                    } onEdit={() => setEditingField('ancestors')} />
                  )}
                  {(data.biography || data.traditions) && (
                    <ReviewCard title="Your Story" fields={[
                      ...(data.biography ? [{ label: 'Story', value: data.biography.substring(0, 60) + (data.biography.length > 60 ? '...' : '') }] : []),
                      ...(data.traditions ? [{ label: 'Traditions', value: data.traditions.substring(0, 60) + (data.traditions.length > 60 ? '...' : '') }] : []),
                    ]} onEdit={() => setEditingField('story')} />
                  )}
                </div>

                <div className="flex items-center gap-2 mb-6 text-[#C9B99A]/40">
                  <Shield size={12} className="text-[#FF9500]/40" />
                  <span className="text-[10px]">Your information is sacred and secure.</span>
                </div>

                <button onClick={handleSave}
                  className="w-full inline-flex items-center justify-center gap-2.5 bg-[rgba(255,149,0,0.2)] border border-[rgba(255,149,0,0.45)] text-[#FF9500] rounded-lg px-6 py-3.5 text-sm font-medium hover:bg-[rgba(255,149,0,0.3)] hover:shadow-[0_0_30px_rgba(255,149,0,0.15)] transition-all cursor-pointer">
                  <TreePine size={16} />
                  SAVE MY ROOTS
                </button>
              </StepPanel>
            )}
          </AnimatePresence>

          {/* Navigation buttons (for steps that use them) */}
          {step < 7 && (
            <div className="flex items-center justify-between mt-6 pb-6">
              <button onClick={goBack} disabled={step === 0}
                className={`inline-flex items-center gap-1.5 text-xs px-4 py-2.5 rounded-lg border transition-all ${
                  step === 0 ? 'text-[#C9B99A]/10 border-[rgba(255,149,0,0.03)] cursor-not-allowed' : 'text-[#C9B99A] border-[rgba(255,149,0,0.12)] hover:border-[rgba(255,149,0,0.3)]'
                }`}>
                <ArrowLeft size={13} /> Back
              </button>
              <button onClick={goNext}
                className="inline-flex items-center gap-2 text-xs px-5 py-2.5 rounded-lg border bg-[rgba(255,149,0,0.15)] text-[#FF9500] border-[rgba(255,149,0,0.3)] hover:bg-[rgba(255,149,0,0.25)] transition-all font-medium cursor-pointer">
                Continue <ArrowRight size={13} />
              </button>
            </div>
          )}

          {/* Review step back button */}
          {step === 7 && (
            <div className="flex items-center justify-start mt-6 pb-6">
              <button onClick={goBack}
                className="inline-flex items-center gap-1.5 text-xs px-4 py-2.5 rounded-lg border text-[#C9B99A] border-[rgba(255,149,0,0.12)] hover:border-[rgba(255,149,0,0.3)] transition-all cursor-pointer">
                <ArrowLeft size={13} /> Back
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Sub-components ──────────────────────────────────

function StepPanel({ children, title, subtitle, direction = 1, noNav = false }: {
  children: React.ReactNode; title: string; subtitle: string; direction?: number; noNav?: boolean
}) {
  return (
    <motion.div
      custom={direction}
      initial={{ opacity: 0, x: direction * 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: direction * -50 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="text-center mb-6">
        <h3 className="text-lg text-[#F0EBE1] font-medium tracking-wide mb-1.5">{title}</h3>
        <p className="text-[11px] text-[#C9B99A]/50">{subtitle}</p>
      </div>
      <div className="space-y-3.5">
        {children}
      </div>
    </motion.div>
  )
}

function Input({ label, value, onChange, placeholder = '', required = false, compact = false }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; required?: boolean; compact?: boolean
}) {
  return (
    <div>
      <label className={`text-[10px] uppercase tracking-[0.12em] text-[#FF9500]/60 mb-1.5 block ${required ? '' : ''}`}>
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[rgba(27,40,56,0.4)] border border-[rgba(255,149,0,0.12)] rounded-lg px-3.5 py-2.5 text-[13px] text-[#F0EBE1] placeholder-[#C9B99A]/25 focus:outline-none focus:border-[rgba(255,149,0,0.4)] transition-colors"
      />
    </div>
  )
}

function TextArea({ label, value, onChange, placeholder = '', rows = 3 }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; rows?: number
}) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-[0.12em] text-[#FF9500]/60 mb-1.5 block">{label}</label>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full bg-[rgba(27,40,56,0.4)] border border-[rgba(255,149,0,0.12)] rounded-lg px-3.5 py-2.5 text-[13px] text-[#F0EBE1] placeholder-[#C9B99A]/25 focus:outline-none focus:border-[rgba(255,149,0,0.4)] transition-colors resize-none"
      />
    </div>
  )
}

function Select({ label, value, onChange, options }: {
  label: string; value: string; onChange: (v: string) => void; options: string[]
}) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-[0.12em] text-[#FF9500]/60 mb-1.5 block">{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-[rgba(27,40,56,0.4)] border border-[rgba(255,149,0,0.12)] rounded-lg px-3.5 py-2.5 text-[13px] text-[#F0EBE1] focus:outline-none focus:border-[rgba(255,149,0,0.4)] transition-colors appearance-none"
      >
        {options.map(o => <option key={o} value={o}>{o || 'Select...'}</option>)}
      </select>
    </div>
  )
}

function ReviewCard({ title, fields, onEdit }: {
  title: string; fields: { label: string; value: string }[]; onEdit: () => void
}) {
  return (
    <div className="bg-[rgba(255,149,0,0.04)] border border-[rgba(255,149,0,0.1)] rounded-lg p-3.5">
      <div className="flex items-center justify-between mb-2">
        <p className="text-[10px] uppercase tracking-[0.15em] text-[#FF9500]/70">{title}</p>
        <button onClick={onEdit} className="text-[#C9B99A]/30 hover:text-[#FF9500] transition-colors cursor-pointer">
          <Edit3 size={11} />
        </button>
      </div>
      {fields.map(f => (
        <div key={f.label} className="flex items-start gap-2 text-[11px]">
          <span className="text-[#C9B99A]/40 shrink-0">{f.label}:</span>
          <span className="text-[#F0EBE1]/80">{f.value}</span>
        </div>
      ))}
    </div>
  )
}
