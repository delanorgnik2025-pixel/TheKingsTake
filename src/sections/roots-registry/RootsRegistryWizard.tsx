import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, Sprout, User, Users, FileText, Search, TreePine, Check, Sparkles } from 'lucide-react'

// ─── Types ───────────────────────────────────────────
export interface RegistryProfile {
  firstName: string
  lastName: string
  birthDate: string
  birthPlace: string
  tribalAffiliation: string
  fatherFirstName: string
  fatherLastName: string
  motherFirstName: string
  motherMaidenName: string
  patGrandfatherFirst: string
  patGrandmotherFirst: string
  matGrandfatherFirst: string
  matGrandfatherLast: string
  matGrandmotherFirst: string
  storyNotes: string
  documentCount: number
}

interface Props {
  onComplete: (profile: RegistryProfile) => void
  onCancel: () => void
}

// ─── Wizard Step Definitions ─────────────────────────
interface WizardStep {
  id: string
  phase: string
  phaseLabel: string
  questions: { id: string; label: string; placeholder: string; field: keyof RegistryProfile; type?: string }[]
}

const WIZARD_STEPS: WizardStep[] = [
  {
    id: 'profile',
    phase: '1',
    phaseLabel: 'Your Profile',
    questions: [
      { id: 'rp1', label: 'What is your first name?', placeholder: 'Your first name', field: 'firstName' },
      { id: 'rp2', label: 'What is your last name?', placeholder: 'Your family name', field: 'lastName' },
      { id: 'rp3', label: 'When were you born?', placeholder: '', field: 'birthDate', type: 'date' },
      { id: 'rp4', label: 'Where were you born?', placeholder: 'City, State', field: 'birthPlace' },
      { id: 'rp5', label: 'Any tribal affiliation?', placeholder: 'e.g. Lumbee, Cherokee (optional)', field: 'tribalAffiliation' },
    ],
  },
  {
    id: 'lineage',
    phase: '2',
    phaseLabel: 'Build Your Lineage',
    questions: [
      { id: 'ln1', label: "Your father's first name?", placeholder: 'e.g. James', field: 'fatherFirstName' },
      { id: 'ln2', label: "Your father's last name?", placeholder: 'Family name', field: 'fatherLastName' },
      { id: 'ln3', label: "Your mother's first name?", placeholder: 'e.g. Sarah', field: 'motherFirstName' },
      { id: 'ln4', label: "Your mother's maiden name?", placeholder: 'Her birth family name', field: 'motherMaidenName' },
      { id: 'ln5', label: "Paternal grandfather's name?", placeholder: 'e.g. William (optional)', field: 'patGrandfatherFirst' },
      { id: 'ln6', label: "Paternal grandmother's name?", placeholder: 'e.g. Annie (optional)', field: 'patGrandmotherFirst' },
      { id: 'ln7', label: "Maternal grandfather's name?", placeholder: 'e.g. Robert (optional)', field: 'matGrandfatherFirst' },
      { id: 'ln8', label: "Maternal grandfather's surname?", placeholder: 'His family name (optional)', field: 'matGrandfatherLast' },
      { id: 'ln9', label: "Maternal grandmother's name?", placeholder: 'e.g. Mary (optional)', field: 'matGrandmotherFirst' },
    ],
  },
  {
    id: 'heritage',
    phase: '3',
    phaseLabel: 'Preserve Your Heritage',
    questions: [
      { id: 'hs1', label: 'Any family stories to preserve?', placeholder: 'Share a story passed down through generations (optional)', field: 'storyNotes' },
    ],
  },
  {
    id: 'discover',
    phase: '4',
    phaseLabel: 'Discover Connections',
    questions: [],
  },
  {
    id: 'review',
    phase: '5',
    phaseLabel: 'Review & Grow',
    questions: [],
  },
]

const PHASE_ICONS: Record<string, typeof Sprout> = {
  '1': User,
  '2': Users,
  '3': FileText,
  '4': Search,
  '5': TreePine,
}

// ─── Main Wizard Component ───────────────────────────
export default function RootsRegistryWizard({ onComplete, onCancel }: Props) {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [profile, setProfile] = useState<RegistryProfile>({
    firstName: '', lastName: '', birthDate: '', birthPlace: '', tribalAffiliation: '',
    fatherFirstName: '', fatherLastName: '', motherFirstName: '', motherMaidenName: '',
    patGrandfatherFirst: '', patGrandmotherFirst: '', matGrandfatherFirst: '', matGrandfatherLast: '',
    matGrandmotherFirst: '', storyNotes: '', documentCount: 0,
  })
  const [isComplete, setIsComplete] = useState(false)

  const currentPhase = WIZARD_STEPS[phaseIndex]
  const currentQuestions = currentPhase.questions
  const hasQuestions = currentQuestions.length > 0
  const currentQuestion = hasQuestions ? currentQuestions[questionIndex] : null
  const totalPhases = WIZARD_STEPS.length

  // Progress calculation
  const questionsBeforeThisPhase = WIZARD_STEPS.slice(0, phaseIndex).reduce((acc, s) => acc + s.questions.length, 0)
  const totalQuestions = WIZARD_STEPS.reduce((acc, s) => acc + s.questions.length, 0)
  const currentProgress = totalQuestions > 0 ? (questionsBeforeThisPhase + questionIndex) / totalQuestions : phaseIndex / totalPhases

  function updateField(field: keyof RegistryProfile, value: string) {
    setProfile(prev => ({ ...prev, [field]: value }))
  }

  function getFieldValue(field: keyof RegistryProfile): string {
    return profile[field] as string
  }

  function goNext() {
    // If current phase has questions and we're not at the last question
    if (hasQuestions && questionIndex < currentQuestions.length - 1) {
      setDirection(1)
      setQuestionIndex(questionIndex + 1)
      return
    }
    // Move to next phase
    if (phaseIndex < totalPhases - 1) {
      setDirection(1)
      setPhaseIndex(phaseIndex + 1)
      setQuestionIndex(0)
    }
  }

  function goBack() {
    // If current phase has questions and we're not at the first question
    if (hasQuestions && questionIndex > 0) {
      setDirection(-1)
      setQuestionIndex(questionIndex - 1)
      return
    }
    // Move to previous phase (last question of that phase)
    if (phaseIndex > 0) {
      setDirection(-1)
      const prevPhase = WIZARD_STEPS[phaseIndex - 1]
      setPhaseIndex(phaseIndex - 1)
      setQuestionIndex(Math.max(0, prevPhase.questions.length - 1))
    }
  }

  function canProceed(): boolean {
    if (!currentQuestion) return true
    // Only first name, last name, and mother's first name are required
    if (currentQuestion.field === 'firstName' || currentQuestion.field === 'lastName' || currentQuestion.field === 'motherFirstName') {
      return getFieldValue(currentQuestion.field).trim().length > 0
    }
    return true
  }

  function handleComplete() {
    setIsComplete(true)
    setTimeout(() => onComplete(profile), 2000)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && canProceed()) goNext()
  }

  const PhaseIcon = PHASE_ICONS[currentPhase.phase] || User
  const isLastPhase = phaseIndex === totalPhases - 1
  const isFirstPhase = phaseIndex === 0
  const isFirstQuestion = questionIndex === 0 && isFirstPhase

  // ─── Render ────────────────────────────────────────
  if (isComplete) {
    return (
      <div className="fixed inset-0 z-50 bg-[#05080e] flex items-center justify-center p-6">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(255,149,0,0.06) 0%, transparent 60%)' }} />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative text-center"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="w-20 h-20 rounded-full bg-[rgba(255,149,0,0.12)] border border-[rgba(255,149,0,0.25)] flex items-center justify-center mx-auto mb-6"
          >
            <Sparkles size={32} className="text-[#FF9500]" />
          </motion.div>
          <h2
            className="text-2xl sm:text-3xl text-[#F0EBE1] mb-3"
            style={{ fontFamily: "'Playfair Display', 'Georgia', 'Times New Roman', serif" }}
          >
            Your Tree Is Planted
          </h2>
          <p className="text-sm text-[#C9B99A]/70 mb-6">
            Welcome to the Sacred Registry, {profile.firstName || 'Ancestor'}.
          </p>
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex justify-center gap-1.5"
          >
            {[0, 1, 2].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#FF9500]" />)}
          </motion.div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#05080e] flex flex-col">
      {/* Background ambient */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 30% 70%, rgba(255,149,0,0.04) 0%, transparent 50%)' }} />

      {/* Top bar — progress + close */}
      <div className="relative z-10 flex items-center justify-between px-5 sm:px-8 py-4 border-b border-[rgba(255,149,0,0.08)]">
        <div className="flex items-center gap-3">
          <PhaseIcon size={16} className="text-[#FF9500]" />
          <span className="text-[10px] uppercase tracking-[0.15em] text-[#C9B99A]/60">
            Step {currentPhase.phase} of {totalPhases} — {currentPhase.phaseLabel}
          </span>
        </div>
        <button onClick={onCancel} className="text-[10px] uppercase tracking-[0.1em] text-[#C9B99A]/40 hover:text-[#C9B99A] transition-colors cursor-pointer">
          Close
        </button>
      </div>

      {/* Progress bar */}
      <div className="relative z-10 h-[2px] bg-[rgba(255,149,0,0.06)]">
        <motion.div
          className="h-full bg-[#FF9500]"
          initial={{ width: 0 }}
          animate={{ width: `${Math.max(5, currentProgress * 100)}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Main content area */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-5 sm:px-8 py-8 overflow-y-auto">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait" custom={direction}>

            {/* ─── Phase 4: Discover ( Coming Soon info ) ─── */}
            {currentPhase.id === 'discover' && (
              <motion.div
                key="discover"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[rgba(255,149,0,0.08)] border border-[rgba(255,149,0,0.2)] flex items-center justify-center mx-auto mb-5">
                  <Search size={24} className="text-[#FF9500]" />
                </div>
                <h3 className="text-lg text-[#F0EBE1] font-medium mb-3">Discover Connections</h3>
                <p className="text-sm text-[#C9B99A]/60 leading-relaxed mb-2">
                  Our AI-powered research engine will search billions of historical records
                  to find documents, census entries, and connections to your ancestors.
                </p>
                <p className="text-xs text-[#FF9500]/50 mb-8">Coming in a future update</p>
                <button
                  onClick={goNext}
                  className="inline-flex items-center gap-2 bg-[rgba(255,149,0,0.15)] border border-[rgba(255,149,0,0.35)] text-[#FF9500] rounded-lg px-6 py-2.5 text-sm hover:bg-[rgba(255,149,0,0.25)] transition-all cursor-pointer"
                >
                  Continue <ArrowRight size={14} />
                </button>
              </motion.div>
            )}

            {/* ─── Phase 5: Review ─── */}
            {currentPhase.id === 'review' && (
              <motion.div
                key="review"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-[rgba(255,149,0,0.08)] border border-[rgba(255,149,0,0.2)] flex items-center justify-center mx-auto mb-4">
                    <TreePine size={24} className="text-[#FF9500]" />
                  </div>
                  <h3 className="text-lg text-[#F0EBE1] font-medium mb-2">Your Sacred Registry</h3>
                  <p className="text-sm text-[#C9B99A]/60">Review what you have planted.</p>
                </div>

                {/* Review cards */}
                <div className="space-y-3 mb-8">
                  {profile.firstName && (
                    <div className="bg-[rgba(255,149,0,0.05)] border border-[rgba(255,149,0,0.1)] rounded-lg p-4">
                      <p className="text-[10px] uppercase tracking-[0.15em] text-[#FF9500] mb-1">Root Person</p>
                      <p className="text-sm text-[#F0EBE1]">{profile.firstName} {profile.lastName}</p>
                      {profile.birthPlace && <p className="text-xs text-[#C9B99A]/50">Born: {profile.birthPlace}</p>}
                    </div>
                  )}
                  {(profile.fatherFirstName || profile.motherFirstName) && (
                    <div className="bg-[rgba(255,149,0,0.05)] border border-[rgba(255,149,0,0.1)] rounded-lg p-4">
                      <p className="text-[10px] uppercase tracking-[0.15em] text-[#FF9500] mb-1">Parents</p>
                      {profile.fatherFirstName && <p className="text-sm text-[#F0EBE1]">Father: {profile.fatherFirstName} {profile.fatherLastName}</p>}
                      {profile.motherFirstName && <p className="text-sm text-[#F0EBE1]">Mother: {profile.motherFirstName} {profile.motherMaidenName}</p>}
                    </div>
                  )}
                  {(profile.patGrandfatherFirst || profile.matGrandfatherFirst) && (
                    <div className="bg-[rgba(255,149,0,0.05)] border border-[rgba(255,149,0,0.1)] rounded-lg p-4">
                      <p className="text-[10px] uppercase tracking-[0.15em] text-[#FF9500] mb-1">Grandparents</p>
                      <div className="text-xs text-[#C9B99A]/60 space-y-0.5">
                        {profile.patGrandfatherFirst && <p>Paternal GF: {profile.patGrandfatherFirst}</p>}
                        {profile.patGrandmotherFirst && <p>Paternal GM: {profile.patGrandmotherFirst}</p>}
                        {profile.matGrandfatherFirst && <p>Maternal GF: {profile.matGrandfatherFirst} {profile.matGrandfatherLast}</p>}
                        {profile.matGrandmotherFirst && <p>Maternal GM: {profile.matGrandmotherFirst}</p>}
                      </div>
                    </div>
                  )}
                  {profile.storyNotes && (
                    <div className="bg-[rgba(255,149,0,0.05)] border border-[rgba(255,149,0,0.1)] rounded-lg p-4">
                      <p className="text-[10px] uppercase tracking-[0.15em] text-[#FF9500] mb-1">Story</p>
                      <p className="text-xs text-[#C9B99A]/60 line-clamp-3">{profile.storyNotes}</p>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleComplete}
                  className="w-full inline-flex items-center justify-center gap-2.5 bg-[rgba(255,149,0,0.2)] border border-[rgba(255,149,0,0.45)] text-[#FF9500] rounded-lg px-6 py-3.5 text-sm font-medium hover:bg-[rgba(255,149,0,0.3)] hover:shadow-[0_0_30px_rgba(255,149,0,0.15)] transition-all cursor-pointer"
                >
                  <Sprout size={16} />
                  Plant Your Tree
                </button>
              </motion.div>
            )}

            {/* ─── Question phases (1-3) ─── */}
            {currentQuestion && (
              <motion.div
                key={`${currentPhase.id}-${currentQuestion.id}`}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                {/* Question label */}
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#FF9500]/70 mb-4">
                  {currentPhase.phaseLabel} — {questionIndex + 1} of {currentQuestions.length}
                </p>

                {/* Question */}
                <h3 className="text-lg sm:text-xl text-[#F0EBE1] font-medium mb-6 leading-snug">
                  {currentQuestion.label}
                </h3>

                {/* Input */}
                {currentQuestion.type === 'date' ? (
                  <input
                    type="date"
                    value={getFieldValue(currentQuestion.field)}
                    onChange={(e) => updateField(currentQuestion.field, e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-[rgba(27,40,56,0.4)] border border-[rgba(255,149,0,0.15)] rounded-xl px-4 py-3.5 text-[#F0EBE1] focus:outline-none focus:border-[rgba(255,149,0,0.4)] transition-colors mb-8"
                  />
                ) : (
                  <input
                    type="text"
                    value={getFieldValue(currentQuestion.field)}
                    onChange={(e) => updateField(currentQuestion.field, e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={currentQuestion.placeholder}
                    autoFocus
                    className="w-full bg-[rgba(27,40,56,0.4)] border border-[rgba(255,149,0,0.15)] rounded-xl px-4 py-3.5 text-[#F0EBE1] placeholder-[#C9B99A]/30 focus:outline-none focus:border-[rgba(255,149,0,0.4)] transition-colors mb-8 text-[15px]"
                  />
                )}

                {/* Required hint */}
                {(currentQuestion.field === 'firstName' || currentQuestion.field === 'lastName' || currentQuestion.field === 'motherFirstName') && !getFieldValue(currentQuestion.field) && (
                  <p className="text-[10px] text-[#FF9500]/40 -mt-6 mb-6">Required</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation buttons (for question phases) */}
          {currentQuestion && (
            <div className="flex items-center justify-between mt-2">
              <button
                onClick={goBack}
                disabled={isFirstQuestion}
                className={`inline-flex items-center gap-1.5 text-xs px-4 py-2.5 rounded-lg border transition-all ${
                  isFirstQuestion
                    ? 'text-[#C9B99A]/10 border-[rgba(255,149,0,0.03)] cursor-not-allowed'
                    : 'text-[#C9B99A] border-[rgba(255,149,0,0.12)] hover:border-[rgba(255,149,0,0.3)] hover:text-[#F0EBE1]'
                }`}
              >
                <ArrowLeft size={13} /> Back
              </button>

              <button
                onClick={goNext}
                disabled={!canProceed()}
                className={`inline-flex items-center gap-2 text-xs px-5 py-2.5 rounded-lg border transition-all font-medium ${
                  canProceed()
                    ? 'bg-[rgba(255,149,0,0.15)] text-[#FF9500] border-[rgba(255,149,0,0.3)] hover:bg-[rgba(255,149,0,0.25)]'
                    : 'text-[#C9B99A]/15 border-[rgba(255,149,0,0.05)] cursor-not-allowed'
                }`}
              >
                {phaseIndex === 0 && questionIndex === currentQuestions.length - 1 ? (
                  <>Next Step <ArrowRight size={13} /></>
                ) : (
                  <>Next <ArrowRight size={13} /></>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
