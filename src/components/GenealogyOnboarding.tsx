import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  TreePine, Users, ChevronRight, ChevronLeft,
  Heart, Crown, Sparkles, Sprout, Feather, Flame,
  ArrowRight, ArrowLeft, User, X
} from 'lucide-react'

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
  onCancel: () => void
}

// ─── Question Definition ─────────────────────────────
interface Question {
  id: string
  field: string
  label: string
  placeholder: string
  type?: string
  required?: boolean
  section: 'root' | 'father' | 'mother' | 'patGrand' | 'matGrand'
  setValue: (profile: GenealogyProfile, val: string) => GenealogyProfile
}

const QUESTIONS: Question[] = [
  // Root person
  { id: 'rp-first', field: 'firstName', label: 'What is your first name?', placeholder: 'Your first name', required: true, section: 'root',
    setValue: (p, v) => ({ ...p, rootPerson: { ...p.rootPerson, firstName: v } }) },
  { id: 'rp-last', field: 'lastName', label: 'What is your last name?', placeholder: 'Your family name', required: true, section: 'root',
    setValue: (p, v) => ({ ...p, rootPerson: { ...p.rootPerson, lastName: v } }) },
  { id: 'rp-birth', field: 'birthDate', label: 'When were you born?', placeholder: '', type: 'date', section: 'root',
    setValue: (p, v) => ({ ...p, rootPerson: { ...p.rootPerson, birthDate: v } }) },
  { id: 'rp-place', field: 'birthPlace', label: 'Where were you born?', placeholder: 'City / Town', section: 'root',
    setValue: (p, v) => ({ ...p, rootPerson: { ...p.rootPerson, birthPlace: v } }) },
  { id: 'rp-state', field: 'birthState', label: 'What state were you born in?', placeholder: 'e.g. North Carolina', section: 'root',
    setValue: (p, v) => ({ ...p, rootPerson: { ...p.rootPerson, birthState: v } }) },
  { id: 'rp-tribal', field: 'tribalAffiliation', label: 'Any tribal affiliation?', placeholder: 'e.g. Lumbee, Waccamaw Siouan (optional)', section: 'root',
    setValue: (p, v) => ({ ...p, rootPerson: { ...p.rootPerson, tribalAffiliation: v } }) },

  // Father
  { id: 'cf-father-first', field: 'fatherFirstName', label: "What is your father's first name?", placeholder: "e.g. James", required: true, section: 'father',
    setValue: (p, v) => ({ ...p, coreFamily: { ...p.coreFamily, fatherFirstName: v } }) },
  { id: 'cf-father-last', field: 'fatherLastName', label: "What is your father's last name?", placeholder: "Family name", section: 'father',
    setValue: (p, v) => ({ ...p, coreFamily: { ...p.coreFamily, fatherLastName: v } }) },

  // Mother
  { id: 'cf-mother-first', field: 'motherFirstName', label: "What is your mother's first name?", placeholder: "e.g. Sarah", required: true, section: 'mother',
    setValue: (p, v) => ({ ...p, coreFamily: { ...p.coreFamily, motherFirstName: v } }) },
  { id: 'cf-mother-maiden', field: 'motherMaidenName', label: "What is your mother's maiden name?", placeholder: "Her birth family name", section: 'mother',
    setValue: (p, v) => ({ ...p, coreFamily: { ...p.coreFamily, motherMaidenName: v } }) },

  // Paternal Grandparents
  { id: 'cf-pgf', field: 'patGrandfatherFirst', label: "What is your paternal grandfather's name?", placeholder: "e.g. William", section: 'patGrand',
    setValue: (p, v) => ({ ...p, coreFamily: { ...p.coreFamily, patGrandfatherFirst: v } }) },
  { id: 'cf-pgm', field: 'patGrandmotherFirst', label: "What is your paternal grandmother's name?", placeholder: "e.g. Annie", section: 'patGrand',
    setValue: (p, v) => ({ ...p, coreFamily: { ...p.coreFamily, patGrandmotherFirst: v } }) },
  { id: 'cf-pgm-maiden', field: 'patGrandmotherMaiden', label: "What was her maiden name?", placeholder: "Her birth family name", section: 'patGrand',
    setValue: (p, v) => ({ ...p, coreFamily: { ...p.coreFamily, patGrandmotherMaiden: v } }) },

  // Maternal Grandparents
  { id: 'cf-mgf', field: 'matGrandfatherFirst', label: "What is your maternal grandfather's name?", placeholder: "e.g. Robert", section: 'matGrand',
    setValue: (p, v) => ({ ...p, coreFamily: { ...p.coreFamily, matGrandfatherFirst: v } }) },
  { id: 'cf-mgf-last', field: 'matGrandfatherLast', label: "What was his last name?", placeholder: "His family name", section: 'matGrand',
    setValue: (p, v) => ({ ...p, coreFamily: { ...p.coreFamily, matGrandfatherLast: v } }) },
  { id: 'cf-mgm', field: 'matGrandmotherFirst', label: "What is your maternal grandmother's name?", placeholder: "e.g. Mary", section: 'matGrand',
    setValue: (p, v) => ({ ...p, coreFamily: { ...p.coreFamily, matGrandmotherFirst: v } }) },
  { id: 'cf-mgm-maiden', field: 'matGrandmotherMaiden', label: "What was her maiden name?", placeholder: "Her birth family name", section: 'matGrand',
    setValue: (p, v) => ({ ...p, coreFamily: { ...p.coreFamily, matGrandmotherMaiden: v } }) },
]

// ─── Constellation Tree SVG (Interactive) ────────────
function ConstellationTreeSVG({ progress }: { progress: number }) {
  // progress: 0-1 based on how many questions answered
  const totalNodes = 7 // root + 2 parents + 4 grandparents
  const litNodes = Math.floor(progress * totalNodes) + 1

  const allNodes = [
    // Root (index 0)
    { cx: 150, cy: 340, r: 8, label: 'You', idx: 0 },
    // Parents
    { cx: 80, cy: 240, r: 6, label: 'Father', idx: 1 },
    { cx: 220, cy: 240, r: 6, label: 'Mother', idx: 2 },
    // Paternal Grandparents
    { cx: 40, cy: 140, r: 5, label: 'P. Grandpa', idx: 3 },
    { cx: 110, cy: 140, r: 5, label: 'P. Grandma', idx: 4 },
    // Maternal Grandparents
    { cx: 190, cy: 140, r: 5, label: 'M. Grandpa', idx: 5 },
    { cx: 260, cy: 140, r: 5, label: 'M. Grandma', idx: 6 },
  ]

  const connections = [
    [150, 340, 80, 240],   // root -> father
    [150, 340, 220, 240],  // root -> mother
    [80, 240, 40, 140],    // father -> pat grandpa
    [80, 240, 110, 140],   // father -> pat grandma
    [220, 240, 190, 140],  // mother -> mat grandpa
    [220, 240, 260, 140],  // mother -> mat grandma
  ]

  return (
    <svg viewBox="0 0 300 380" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <filter id="nodeGlowOn">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="goldGlow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#FFD700" stopOpacity="1" />
          <stop offset="50%" stopColor="#FF9500" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#FF9500" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="dimGlow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#C9B99A" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#C9B99A" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Connection lines */}
      {connections.map(([x1, y1, x2, y2], i) => {
        const isLit = litNodes > Math.floor(i / 2) + 1
        return (
          <motion.line
            key={`c-${i}`}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={isLit ? 'url(#goldGlow)' : 'rgba(201,185,154,0.12)'}
            strokeWidth={isLit ? 1.5 : 0.8}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            filter={isLit ? 'url(#nodeGlowOn)' : undefined}
          />
        )
      })}

      {/* Nodes */}
      {allNodes.map((node, i) => {
        const isLit = i < litNodes
        return (
          <g key={`n-${i}`}>
            {/* Glow ring */}
            {isLit && (
              <motion.circle
                cx={node.cx} cy={node.cy} r={node.r * 2}
                fill="none" stroke="#FF9500" strokeWidth="0.5"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.8, opacity: [0, 0.3, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
              />
            )}
            {/* Core node */}
            <motion.circle
              cx={node.cx} cy={node.cy} r={node.r}
              fill={isLit ? '#FFD700' : 'rgba(201,185,154,0.15)'}
              filter={isLit ? 'url(#nodeGlowOn)' : undefined}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20, delay: i * 0.15 }}
            />
            {/* Label */}
            <text
              x={node.cx} y={node.cy + node.r + 12}
              textAnchor="middle"
              fill={isLit ? '#F0EBE1' : 'rgba(201,185,154,0.3)'}
              fontSize="7"
              fontFamily="sans-serif"
            >
              {node.label}
            </text>
          </g>
        )
      })}

      {/* Ambient particles */}
      {[...Array(5)].map((_, i) => (
        <motion.circle
          key={`p-${i}`}
          cx={50 + i * 50} cy={100 + i * 40}
          r={1.5}
          fill="#FF9500"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.5, 0],
            cy: [100 + i * 40, 80 + i * 35],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            delay: i * 0.7,
          }}
        />
      ))}
    </svg>
  )
}

// ─── Section Icon Map ────────────────────────────────
const SECTION_META: Record<string, { icon: typeof Sprout; label: string; color: string }> = {
  root: { icon: User, label: 'Your Roots', color: '#FF9500' },
  father: { icon: Crown, label: "Father's Branch", color: '#4ECDC4' },
  mother: { icon: Heart, label: "Mother's Branch", color: '#FF6B9D' },
  patGrand: { icon: Feather, label: 'Paternal Grandparents', color: '#A78BFA' },
  matGrand: { icon: Sprout, label: 'Maternal Grandparents', color: '#48BB78' },
}

// ─── Main Guided Onboarding ──────────────────────────
export default function GenealogyOnboarding({ onComplete, onCancel }: Props) {
  const [stepIndex, setStepIndex] = useState(0)
  const [profile, setProfile] = useState<GenealogyProfile>({
    rootPerson: { firstName: '', lastName: '', birthDate: '', birthPlace: '', birthState: '', tribalAffiliation: '' },
    selectedTreeId: 1,
    coreFamily: {
      fatherFirstName: '', fatherLastName: '', motherFirstName: '', motherMaidenName: '',
      patGrandfatherFirst: '', patGrandmotherFirst: '', patGrandmotherMaiden: '',
      matGrandfatherFirst: '', matGrandfatherLast: '', matGrandmotherFirst: '', matGrandmotherMaiden: '',
    },
  })
  const [direction, setDirection] = useState(1)
  const [isComplete, setIsComplete] = useState(false)

  const currentQ = QUESTIONS[stepIndex]
  const progress = stepIndex / QUESTIONS.length
  const currentValue = getFieldValue(profile, currentQ)
  const SectionIcon = SECTION_META[currentQ.section].icon
  const sectionColor = SECTION_META[currentQ.section].color

  function getFieldValue(p: GenealogyProfile, q: Question): string {
    if (q.section === 'root') return p.rootPerson[q.field as keyof typeof p.rootPerson] || ''
    return p.coreFamily[q.field as keyof typeof p.coreFamily] || ''
  }

  function updateValue(val: string) {
    setProfile(prev => currentQ.setValue(prev, val))
  }

  function goNext() {
    if (stepIndex < QUESTIONS.length - 1) {
      setDirection(1)
      setStepIndex(stepIndex + 1)
    } else {
      setIsComplete(true)
      setTimeout(() => onComplete(profile), 1800)
    }
  }

  function goBack() {
    if (stepIndex > 0) {
      setDirection(-1)
      setStepIndex(stepIndex - 1)
    }
  }

  function canProceed() {
    if (currentQ.required) return currentValue.trim().length > 0
    return true
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && canProceed()) goNext()
  }

  const isLastStep = stepIndex === QUESTIONS.length - 1

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#060a12]">
      {/* Background */}
      <div className="absolute inset-0">
        <img src="/images/roots-registry-bg.jpg" alt="" className="w-full h-full object-cover opacity-40" />
      </div>
      <div className="absolute inset-0 bg-[rgba(6,10,18,0.7)] backdrop-blur-sm" />
      <div className="absolute inset-0"
        style={{ boxShadow: 'inset 0 0 200px 80px rgba(6,10,18,0.6)' }} />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">

          {/* Left: Constellation Tree */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="hidden md:flex items-center justify-center"
          >
            <div className="w-full max-w-[280px] aspect-[300/380]">
              <ConstellationTreeSVG progress={progress} />
            </div>
          </motion.div>

          {/* Right: Question Dialog */}
          <div className="flex flex-col">
            {/* Close button */}
            <div className="flex justify-end mb-4">
              <button
                onClick={onCancel}
                className="w-8 h-8 rounded-full bg-[rgba(255,149,0,0.08)] border border-[rgba(255,149,0,0.15)] flex items-center justify-center text-[#C9B99A]/60 hover:text-[#FF9500] hover:border-[rgba(255,149,0,0.3)] transition-all"
              >
                <X size={14} />
              </button>
            </div>

            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <SectionIcon size={13} style={{ color: sectionColor }} />
                  <span className="text-[10px] uppercase tracking-[0.12em]" style={{ color: sectionColor }}>
                    {SECTION_META[currentQ.section].label}
                  </span>
                </div>
                <span className="text-[10px] text-[#C9B99A]/40">
                  {stepIndex + 1} / {QUESTIONS.length}
                </span>
              </div>
              <div className="h-[2px] bg-[rgba(255,149,0,0.08)] rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: sectionColor }}
                  initial={{ width: `${(stepIndex / QUESTIONS.length) * 100}%` }}
                  animate={{ width: `${((stepIndex + 1) / QUESTIONS.length) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>

            {/* Question Card */}
            <AnimatePresence mode="wait" custom={direction}>
              {isComplete ? (
                <motion.div
                  key="complete"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-12"
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="w-16 h-16 rounded-full bg-[rgba(255,149,0,0.15)] border border-[rgba(255,149,0,0.3)] flex items-center justify-center mx-auto mb-4"
                  >
                    <Sparkles size={28} className="text-[#FF9500]" />
                  </motion.div>
                  <h3 className="text-2xl text-[#F0EBE1] font-medium mb-2">Your Tree is Growing</h3>
                  <p className="text-sm text-[#C9B99A]">The ancestors welcome you, {profile.rootPerson.firstName}.</p>
                  <motion.div
                    className="mt-4 flex justify-center gap-1"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    {[0, 1, 2].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#FF9500]" />)}
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key={currentQ.id}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -40 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="bg-[rgba(6,10,18,0.5)] backdrop-blur-xl rounded-2xl border border-[rgba(255,149,0,0.15)] p-6 md:p-8 shadow-[0_8px_40px_rgba(0,0,0,0.35)]"
                >
                  {/* Question */}
                  <h3 className="text-xl md:text-2xl text-[#F0EBE1] font-medium mb-6 leading-snug">
                    {currentQ.label}
                  </h3>

                  {/* Input */}
                  <div className="relative">
                    {currentQ.type === 'date' ? (
                      <input
                        type="date"
                        value={currentValue}
                        onChange={(e) => updateValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="w-full bg-[rgba(27,40,56,0.5)] border border-[rgba(255,149,0,0.15)] rounded-xl px-4 py-3.5 text-[#F0EBE1] focus:outline-none focus:border-[rgba(255,149,0,0.4)] transition-colors placeholder-[#C9B99A]/30"
                      />
                    ) : (
                      <input
                        type="text"
                        value={currentValue}
                        onChange={(e) => updateValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={currentQ.placeholder}
                        autoFocus
                        className="w-full bg-[rgba(27,40,56,0.5)] border border-[rgba(255,149,0,0.15)] rounded-xl px-4 py-3.5 text-[#F0EBE1] placeholder-[#C9B99A]/30 focus:outline-none focus:border-[rgba(255,149,0,0.4)] transition-colors text-base"
                      />
                    )}
                  </div>

                  {/* Hint text */}
                  {currentQ.required && (
                    <p className="text-[10px] text-[#FF9500]/50 mt-2 ml-1">Required to continue</p>
                  )}

                  {/* Navigation */}
                  <div className="flex items-center justify-between mt-8">
                    <button
                      onClick={goBack}
                      disabled={stepIndex === 0}
                      className={`flex items-center gap-1.5 text-xs px-4 py-2.5 rounded-lg border transition-all ${
                        stepIndex === 0
                          ? 'text-[#C9B99A]/15 border-[rgba(255,149,0,0.05)] cursor-not-allowed'
                          : 'text-[#C9B99A] border-[rgba(255,149,0,0.15)] hover:border-[rgba(255,149,0,0.3)] hover:text-[#F0EBE1]'
                      }`}
                    >
                      <ArrowLeft size={13} /> Back
                    </button>

                    <button
                      onClick={goNext}
                      disabled={!canProceed()}
                      className={`flex items-center gap-2 text-xs px-6 py-2.5 rounded-lg border transition-all font-medium ${
                        canProceed()
                          ? 'bg-[rgba(255,149,0,0.18)] text-[#FF9500] border-[rgba(255,149,0,0.35)] hover:bg-[rgba(255,149,0,0.28)] hover:shadow-[0_0_20px_rgba(255,149,0,0.15)]'
                          : 'text-[#C9B99A]/20 border-[rgba(255,149,0,0.05)] cursor-not-allowed'
                      }`}
                    >
                      {isLastStep ? (
                        <><Sparkles size={13} /> Grow My Tree</>
                      ) : (
                        <>Next <ArrowRight size={13} /></>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mobile tree hint */}
            <div className="md:hidden mt-6 flex justify-center">
              <div className="w-32 h-24 opacity-40">
                <ConstellationTreeSVG progress={progress} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
