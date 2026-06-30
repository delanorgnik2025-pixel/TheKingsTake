import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  User, TreePine, Users, ChevronRight, ChevronLeft, Sparkles,
  Check, Crown, Scroll, Heart
} from 'lucide-react'
import { TREE_TEMPLATES } from '../data/familyTreeTemplates'

// ─── Types ───────────────────────────────────────────
export interface GenealogyProfile {
  rootPerson: {
    firstName: string
    lastName: string
    birthDate: string
    birthPlace: string
    birthState: string
    tribalAffiliation: string
  }
  selectedTreeId: number
  coreFamily: {
    fatherFirstName: string
    fatherLastName: string
    motherFirstName: string
    motherMaidenName: string
    patGrandfatherFirst: string
    patGrandmotherFirst: string
    patGrandmotherMaiden: string
    matGrandfatherFirst: string
    matGrandfatherLast: string
    matGrandmotherFirst: string
    matGrandmotherMaiden: string
  }
}

interface Props {
  onComplete: (profile: GenealogyProfile) => void
}

const STEPS = [
  { id: 1, label: 'Your Roots', icon: User },
  { id: 2, label: 'Choose Tree', icon: TreePine },
  { id: 3, label: 'Core Seven', icon: Users },
]

// ─── Reusable Input ──────────────────────────────────
function Input({ label, value, onChange, placeholder, type = 'text' }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string
}) {
  return (
    <div>
      <label className="text-[10px] text-[#C9B99A]/60 uppercase tracking-wider">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[rgba(6,10,18,0.5)] backdrop-blur-sm border border-[rgba(255,149,0,0.15)] rounded-lg px-3 py-2.5 text-sm text-[#F0EBE1] placeholder-[#C9B99A]/40 focus:outline-none focus:border-[rgba(255,149,0,0.5)] focus:bg-[rgba(6,10,18,0.65)] mt-1 transition-colors"
      />
    </div>
  )
}

// ─── Step 1: Profile Form ────────────────────────────
function StepProfile({ data, onChange }: { data: GenealogyProfile['rootPerson']; onChange: (d: GenealogyProfile['rootPerson']) => void }) {
  const set = (field: string, val: string) => onChange({ ...data, [field]: val })
  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="w-14 h-14 rounded-full bg-[rgba(255,149,0,0.1)] border border-[rgba(255,149,0,0.2)] flex items-center justify-center mx-auto mb-3">
          <Heart size={22} className="text-[#FF9500]" />
        </div>
        <h3 className="text-xl text-[#F0EBE1] font-medium mb-1">Plant Your Roots</h3>
        <p className="text-xs text-[#C9B99A]">Start with yourself — you are the trunk of this tree.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input label="First Name *" value={data.firstName} onChange={(v) => set('firstName', v)} placeholder="Your first name" />
        <Input label="Last Name *" value={data.lastName} onChange={(v) => set('lastName', v)} placeholder="Your family name" />
      </div>
      <Input label="Birth Date" value={data.birthDate} onChange={(v) => set('birthDate', v)} placeholder="e.g. March 15, 1985" type="date" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input label="Birth Place" value={data.birthPlace} onChange={(v) => set('birthPlace', v)} placeholder="City / Town" />
        <Input label="Birth State" value={data.birthState} onChange={(v) => set('birthState', v)} placeholder="e.g. North Carolina" />
      </div>
      <Input label="Tribal Affiliation" value={data.tribalAffiliation} onChange={(v) => set('tribalAffiliation', v)} placeholder="e.g. Lumbee, Waccamaw Siouan, Cherokee" />

      {data.tribalAffiliation && (
        <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="bg-[rgba(255,149,0,0.05)] rounded-lg p-3 border border-[rgba(255,149,0,0.1)]">
          <p className="text-[10px] text-[#FF9500] uppercase tracking-wider mb-1">Identity Recorded</p>
          <p className="text-xs text-[#C9B99A]">Your tribal affiliation will be etched into your tree trunk, honoring the lineage they tried to erase.</p>
        </motion.div>
      )}
    </div>
  )
}

// ─── Step 2: Tree Gallery ────────────────────────────
function StepTreeGallery({ selectedId, onSelect }: { selectedId: number; onSelect: (id: number) => void }) {
  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <div className="w-14 h-14 rounded-full bg-[rgba(255,149,0,0.1)] border border-[rgba(255,149,0,0.2)] flex items-center justify-center mx-auto mb-3">
          <TreePine size={22} className="text-[#FF9500]" />
        </div>
        <h3 className="text-xl text-[#F0EBE1] font-medium mb-1">Choose Your Tree</h3>
        <p className="text-xs text-[#C9B99A]">Select the aesthetic that resonates with your ancestral spirit.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {TREE_TEMPLATES.map((tree) => (
          <motion.button
            key={tree.id}
            onClick={() => onSelect(tree.id)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`relative rounded-xl overflow-hidden border-2 transition-all ${
              selectedId === tree.id
                ? 'border-[#FF9500] shadow-[0_0_15px_rgba(255,149,0,0.3)]'
                : 'border-transparent hover:border-[rgba(255,149,0,0.3)]'
            }`}
          >
            <img src={tree.image} alt={tree.name} className="w-full aspect-[2/3] object-cover" loading="lazy" />
            {selectedId === tree.id && (
              <div className="absolute inset-0 bg-[rgba(255,149,0,0.15)] flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-[#FF9500] flex items-center justify-center">
                  <Check size={16} className="text-black" />
                </div>
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-2 pt-8">
              <p className="text-[10px] text-[#F0EBE1] font-medium leading-tight">{tree.name}</p>
              <p className="text-[8px] text-[#C9B99A]/70 mt-0.5">{tree.mood}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

// ─── Step 3: Core 7 Family ───────────────────────────
function StepCoreFamily({ data, onChange }: { data: GenealogyProfile['coreFamily']; onChange: (d: GenealogyProfile['coreFamily']) => void }) {
  const set = (field: string, val: string) => onChange({ ...data, [field]: val })
  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <div className="w-14 h-14 rounded-full bg-[rgba(255,149,0,0.1)] border border-[rgba(255,149,0,0.2)] flex items-center justify-center mx-auto mb-3">
          <Users size={22} className="text-[#FF9500]" />
        </div>
        <h3 className="text-xl text-[#F0EBE1] font-medium mb-1">Your First Seven</h3>
        <p className="text-xs text-[#C9B99A]">Enter your parents and four grandparents to activate your tree.</p>
      </div>

      {/* Father */}
      <div className="bg-[rgba(6,10,18,0.4)] backdrop-blur-md rounded-xl border border-[rgba(255,149,0,0.12)] p-4">
        <p className="text-[10px] text-[#FF9500] uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Crown size={11} /> Father's Branch
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Input label="Father's First Name" value={data.fatherFirstName} onChange={(v) => set('fatherFirstName', v)} placeholder="e.g. James" />
          <Input label="Father's Last Name" value={data.fatherLastName} onChange={(v) => set('fatherLastName', v)} placeholder="Usually your family name" />
        </div>
      </div>

      {/* Mother */}
      <div className="bg-[rgba(6,10,18,0.4)] backdrop-blur-md rounded-xl border border-[rgba(255,149,0,0.12)] p-4">
        <p className="text-[10px] text-[#FF9500] uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Heart size={11} /> Mother's Branch
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Input label="Mother's First Name" value={data.motherFirstName} onChange={(v) => set('motherFirstName', v)} placeholder="e.g. Sarah" />
          <Input label="Mother's Maiden Name" value={data.motherMaidenName} onChange={(v) => set('motherMaidenName', v)} placeholder="Her birth family name" />
        </div>
      </div>

      {/* Paternal Grandparents */}
      <div className="bg-[rgba(255,149,0,0.06)] backdrop-blur-md rounded-xl border border-[rgba(255,149,0,0.18)] p-4">
        <p className="text-[10px] text-[#FF9500] uppercase tracking-wider mb-2">Paternal Grandparents (Father's Side)</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Input label="Grandfather's First Name" value={data.patGrandfatherFirst} onChange={(v) => set('patGrandfatherFirst', v)} placeholder="e.g. William" />
          <Input label="Grandmother's First Name" value={data.patGrandmotherFirst} onChange={(v) => set('patGrandmotherFirst', v)} placeholder="e.g. Annie" />
          <Input label="Grandmother's Maiden Name" value={data.patGrandmotherMaiden} onChange={(v) => set('patGrandmotherMaiden', v)} placeholder="Her birth family name" className="sm:col-span-2" />
        </div>
      </div>

      {/* Maternal Grandparents */}
      <div className="bg-[rgba(255,149,0,0.06)] backdrop-blur-md rounded-xl border border-[rgba(255,149,0,0.18)] p-4">
        <p className="text-[10px] text-[#FF9500] uppercase tracking-wider mb-2">Maternal Grandparents (Mother's Side)</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Input label="Grandfather's First Name" value={data.matGrandfatherFirst} onChange={(v) => set('matGrandfatherFirst', v)} placeholder="e.g. Robert" />
          <Input label="Grandfather's Last Name" value={data.matGrandfatherLast} onChange={(v) => set('matGrandfatherLast', v)} placeholder="His family name" />
          <Input label="Grandmother's First Name" value={data.matGrandmotherFirst} onChange={(v) => set('matGrandmotherFirst', v)} placeholder="e.g. Mary" />
          <Input label="Grandmother's Maiden Name" value={data.matGrandmotherMaiden} onChange={(v) => set('matGrandmotherMaiden', v)} placeholder="Her birth family name" />
        </div>
      </div>
    </div>
  )
}

// ─── Main Onboarding Wizard ──────────────────────────
export default function GenealogyOnboarding({ onComplete }: Props) {
  const [step, setStep] = useState(1)
  const [profile, setProfile] = useState<GenealogyProfile['rootPerson']>({
    firstName: '', lastName: '', birthDate: '', birthPlace: '', birthState: '', tribalAffiliation: '',
  })
  const [selectedTree, setSelectedTree] = useState(1)
  const [coreFamily, setCoreFamily] = useState<GenealogyProfile['coreFamily']>({
    fatherFirstName: '', fatherLastName: '',
    motherFirstName: '', motherMaidenName: '',
    patGrandfatherFirst: '', patGrandmotherFirst: '', patGrandmotherMaiden: '',
    matGrandfatherFirst: '', matGrandfatherLast: '', matGrandmotherFirst: '', matGrandmotherMaiden: '',
  })

  const canProceed = () => {
    if (step === 1) return profile.firstName.trim() && profile.lastName.trim()
    if (step === 2) return selectedTree > 0
    return true // step 3
  }

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
    else {
      onComplete({ rootPerson: profile, selectedTreeId: selectedTree, coreFamily })
    }
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {STEPS.map((s, i) => {
          const Icon = s.icon
          const isActive = step === s.id
          const isDone = step > s.id
          return (
            <div key={s.id} className="flex items-center gap-2">
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-medium transition-all ${
                isActive ? 'bg-[rgba(255,149,0,0.15)] text-[#FF9500] border border-[rgba(255,149,0,0.3)]' :
                isDone ? 'bg-[rgba(72,187,120,0.1)] text-green-400 border border-[rgba(72,187,120,0.2)]' :
                'bg-[rgba(27,40,56,0.4)] text-[#C9B99A]/50 border border-[rgba(255,149,0,0.05)]'
              }`}>
                <Icon size={11} />
                <span className="hidden sm:inline">{s.label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <ChevronRight size={12} className={`${step > s.id ? 'text-green-400' : 'text-[#C9B99A]/20'}`} />
              )}
            </div>
          )
        })}
      </div>

      {/* Step Content */}
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="bg-[rgba(6,10,18,0.55)] backdrop-blur-xl rounded-xl border border-[rgba(255,149,0,0.2)] p-5 md:p-6 shadow-2xl"
      >
        {step === 1 && <StepProfile data={profile} onChange={setProfile} />}
        {step === 2 && <StepTreeGallery selectedId={selectedTree} onSelect={setSelectedTree} />}
        {step === 3 && <StepCoreFamily data={coreFamily} onChange={setCoreFamily} />}
      </motion.div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={handleBack}
          disabled={step === 1}
          className={`flex items-center gap-1.5 text-xs px-4 py-2.5 rounded-lg border transition-all ${
            step === 1
              ? 'text-[#C9B99A]/20 border-[rgba(255,149,0,0.05)] cursor-not-allowed'
              : 'text-[#C9B99A] border-[rgba(255,149,0,0.15)] hover:border-[rgba(255,149,0,0.3)] hover:text-[#F0EBE1]'
          }`}
        >
          <ChevronLeft size={14} /> Back
        </button>

        <div className="text-[10px] text-[#C9B99A]/40">
          Step {step} of {STEPS.length}
        </div>

        <button
          onClick={handleNext}
          disabled={!canProceed()}
          className={`flex items-center gap-1.5 text-xs px-5 py-2.5 rounded-lg border transition-all font-medium ${
            canProceed()
              ? 'bg-[rgba(255,149,0,0.15)] text-[#FF9500] border-[rgba(255,149,0,0.3)] hover:bg-[rgba(255,149,0,0.25)]'
              : 'text-[#C9B99A]/20 border-[rgba(255,149,0,0.05)] cursor-not-allowed'
          }`}
        >
          {step === 3 ? (
            <><Scroll size={13} /> Grow My Tree</>
          ) : (
            <>Next <ChevronRight size={14} /></>
          )}
        </button>
      </div>
    </div>
  )
}
