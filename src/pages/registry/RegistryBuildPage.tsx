// PAGE 5 — GUIDED FAMILY BUILDER
// Route: /ancestor-root-registry/build
// Step-by-step family tree construction

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, SkipForward, UserPlus, TreePine, HelpCircle, Check } from 'lucide-react'
import { generateId, loadRegistryData, saveRegistryData, addPerson, addRelationship, updateBuilderProgress, loadBuilderProgress } from '@/lib/registry-storage'
import type { Person, Gender, RecordStatus, BuilderStep, RegistryData } from '@/types/registry'

interface BuildPhase {
  step: BuilderStep
  label: string
  relationshipType: string
  direction: 'add-parent' | 'add-child' | 'add-sibling' | 'add-partner' | 'self'
  hint?: string
}

const phases: BuildPhase[] = [
  { step: 'root-person', label: 'Your Information', relationshipType: 'self', direction: 'self', hint: 'You are the root of this tree.' },
  { step: 'mother', label: 'Your Mother', relationshipType: 'parent', direction: 'add-parent', hint: 'Add your mother or a maternal ancestor.' },
  { step: 'father', label: 'Your Father', relationshipType: 'parent', direction: 'add-parent', hint: 'Add your father or a paternal ancestor.' },
  { step: 'maternal-grandmother', label: 'Maternal Grandmother', relationshipType: 'grandparent', direction: 'add-parent', hint: "Your mother's mother." },
  { step: 'maternal-grandfather', label: 'Maternal Grandfather', relationshipType: 'grandparent', direction: 'add-parent', hint: "Your mother's father." },
  { step: 'paternal-grandmother', label: 'Paternal Grandmother', relationshipType: 'grandparent', direction: 'add-parent', hint: "Your father's mother." },
  { step: 'paternal-grandfather', label: 'Paternal Grandfather', relationshipType: 'grandparent', direction: 'add-parent', hint: "Your father's father." },
  { step: 'partner', label: 'Partner or Spouse', relationshipType: 'partner', direction: 'add-partner', hint: 'Your current or former partner.' },
  { step: 'children', label: 'Children', relationshipType: 'child', direction: 'add-child', hint: 'Add your children.' },
  { step: 'siblings', label: 'Siblings', relationshipType: 'sibling', direction: 'add-sibling', hint: 'Add your brothers and sisters.' },
  { step: 'additional', label: 'Additional Relatives', relationshipType: 'other', direction: 'add-child', hint: 'Add any other relatives to your tree.' },
]

const genderOptions: { value: Gender; label: string }[] = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'non-binary', label: 'Non-binary' },
  { value: 'unknown', label: 'Unknown / Not Sure' },
  { value: 'prefer-not-to-say', label: 'Prefer Not to Say' },
]

const statusOptions: { value: RecordStatus; label: string }[] = [
  { value: 'Family Testimony', label: 'Family Testimony' },
  { value: 'Documented', label: 'Documented Record' },
  { value: 'Research Lead', label: 'Research Lead' },
  { value: 'Unknown', label: 'Unknown' },
]

const emptyPerson = (): Omit<Person, 'id' | 'registryId' | 'createdAt' | 'updatedAt'> => ({
  fullName: '',
  preferredName: '',
  birthSurname: '',
  gender: 'unknown',
  isLiving: true,
  birthDate: '',
  deathDate: '',
  birthPlace: '',
  deathPlace: '',
  primaryLocation: '',
  biography: '',
  recordStatus: 'Family Testimony',
  relationshipToCreator: '',
})

export default function RegistryBuildPage() {
  const navigate = useNavigate()
  const [data, setData] = useState<RegistryData | null>(null)
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [person, setPerson] = useState(emptyPerson())
  const [skipped, setSkipped] = useState<Set<number>>(new Set())
  const [completed, setCompleted] = useState<Set<number>>(new Set())
  const [direction, setDirection] = useState(1)

  const phase = phases[phaseIndex]
  const isLast = phaseIndex === phases.length - 1
  const isFirst = phaseIndex === 0

  useEffect(() => {
    const existing = loadRegistryData()
    if (!existing) {
      navigate('/ancestor-root-registry/access')
      return
    }
    setData(existing)

    // Load progress
    const progress = loadBuilderProgress()
    if (progress) {
      const completedSet = new Set<number>()
      const skippedSet = new Set<number>()
      progress.completedSteps.forEach((s) => {
        const idx = phases.findIndex((p) => p.step === s)
        if (idx >= 0) completedSet.add(idx)
      })
      progress.skippedSteps.forEach((s) => {
        const idx = phases.findIndex((p) => p.step === s)
        if (idx >= 0) skippedSet.add(idx)
      })
      setCompleted(completedSet)
      setSkipped(skippedSet)

      // Resume at first incomplete
      const firstIncomplete = phases.findIndex((_, i) => !completedSet.has(i) && !skippedSet.has(i))
      if (firstIncomplete >= 0) setPhaseIndex(firstIncomplete)
    }
  }, [navigate])

  function persist(updated: RegistryData) {
    setData(updated)
    saveRegistryData(updated)
  }

  function getRootPersonId(d: RegistryData): string {
    return d.registry.creatorPersonId
  }

  function handleAddPerson() {
    if (!data || !person.fullName.trim()) return

    const newPerson: Person = {
      ...person,
      id: generateId(),
      registryId: data.registry.id,
      preferredName: person.preferredName || person.fullName,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    let updated = addPerson(data, newPerson)

    // Create relationships
    const rootId = getRootPersonId(updated)

    switch (phase.direction) {
      case 'add-parent':
        updated = addRelationship(updated, newPerson.id, rootId, 'parent')
        break
      case 'add-partner':
        updated = addRelationship(updated, rootId, newPerson.id, 'partner')
        break
      case 'add-child':
        updated = addRelationship(updated, rootId, newPerson.id, 'parent')
        break
      case 'add-sibling':
        updated = addRelationship(updated, newPerson.id, rootId, 'sibling')
        break
    }

    persist(updated)
    setCompleted((c) => new Set([...c, phaseIndex]))
    setPerson(emptyPerson())

    if (isLast) {
      navigate('/ancestor-root-registry/planted')
    } else {
      setDirection(1)
      setPhaseIndex((i) => i + 1)
    }
  }

  function handleSkip() {
    setSkipped((s) => new Set([...s, phaseIndex]))
    if (isLast) {
      navigate('/ancestor-root-registry/planted')
    } else {
      setDirection(1)
      setPhaseIndex((i) => i + 1)
    }
  }

  function handleBack() {
    if (isFirst) {
      navigate('/ancestor-root-registry/access')
      return
    }
    setDirection(-1)
    setPhaseIndex((i) => i - 1)
  }

  const canSave = person.fullName.trim().length > 0

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 50 : -50, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -50 : 50, opacity: 0 }),
  }

  if (!data) return null

  return (
    <RegistryBackground variant="subpage">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md border-b border-[rgba(201,185,154,0.08)]">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-xs text-[#C9B99A] hover:text-[#FF9500] transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} /> {isFirst ? 'Back' : 'Previous'}
          </button>
          <div className="flex items-center gap-1">
            {phases.map((_, i) => (
              <div
                key={i}
                className="w-4 h-1 rounded-full transition-all duration-300"
                style={{
                  background: completed.has(i)
                    ? 'rgba(76,175,80,0.7)'
                    : skipped.has(i)
                      ? 'rgba(201,185,154,0.2)'
                      : i === phaseIndex
                        ? 'rgba(255,149,0,0.7)'
                        : 'rgba(201,185,154,0.1)',
                }}
              />
            ))}
          </div>
          <TreePine size={14} className="text-[#C9B99A]/30" />
        </div>
      </header>

      {/* Main content */}
      <div className="max-w-2xl mx-auto px-4 py-10">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={phaseIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.2 }}
          >
            {/* Phase header */}
            <div className="mb-8">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#FF9500]/50 mb-2">
                {phaseIndex === 0 ? 'Root Person' : `Step ${phaseIndex} of ${phases.length - 1}`}
              </p>
              <h1
                className="text-2xl md:text-3xl text-[#F0EBE1] font-medium mb-2"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {phase.label}
              </h1>
              {phase.hint && <p className="text-sm text-[#C9B99A]/50">{phase.hint}</p>}
            </div>

            {/* Form */}
            <div className="space-y-4 mb-8">
              {/* Full Name */}
              <div>
                <label className="block text-xs text-[#C9B99A]/60 mb-1.5">Full Name {phase.step !== 'root-person' && <span className="text-[#C9B99A]/30">(required to add)</span>}</label>
                <input
                  type="text"
                  value={person.fullName}
                  onChange={(e) => setPerson((p) => ({ ...p, fullName: e.target.value }))}
                  placeholder="e.g., Mary Elizabeth King"
                  className="w-full px-4 py-3 rounded-lg bg-[rgba(40,25,12,0.5)] border border-[rgba(201,185,154,0.1)] text-[#F0EBE1] text-sm placeholder:text-[#C9B99A]/20 focus:outline-none focus:border-[rgba(255,149,0,0.3)] transition-colors"
                  autoFocus
                />
              </div>

              {/* Preferred name */}
              <div>
                <label className="block text-xs text-[#C9B99A]/60 mb-1.5">Preferred Display Name <span className="text-[#C9B99A]/30">(optional)</span></label>
                <input
                  type="text"
                  value={person.preferredName}
                  onChange={(e) => setPerson((p) => ({ ...p, preferredName: e.target.value }))}
                  placeholder="e.g., Grandma Mary"
                  className="w-full px-4 py-3 rounded-lg bg-[rgba(40,25,12,0.5)] border border-[rgba(201,185,154,0.1)] text-[#F0EBE1] text-sm placeholder:text-[#C9B99A]/20 focus:outline-none focus:border-[rgba(255,149,0,0.3)] transition-colors"
                />
              </div>

              {/* Birth surname */}
              <div>
                <label className="block text-xs text-[#C9B99A]/60 mb-1.5">Birth Surname / Maiden Name <span className="text-[#C9B99A]/30">(optional)</span></label>
                <input
                  type="text"
                  value={person.birthSurname}
                  onChange={(e) => setPerson((p) => ({ ...p, birthSurname: e.target.value }))}
                  placeholder="if different from current name"
                  className="w-full px-4 py-3 rounded-lg bg-[rgba(40,25,12,0.5)] border border-[rgba(201,185,154,0.1)] text-[#F0EBE1] text-sm placeholder:text-[#C9B99A]/20 focus:outline-none focus:border-[rgba(255,149,0,0.3)] transition-colors"
                />
              </div>

              {/* Gender row */}
              <div>
                <label className="block text-xs text-[#C9B99A]/60 mb-2">Gender</label>
                <div className="flex flex-wrap gap-2">
                  {genderOptions.map((g) => (
                    <button
                      key={g.value}
                      onClick={() => setPerson((p) => ({ ...p, gender: g.value }))}
                      className="px-3 py-2 rounded-lg text-xs border transition-all cursor-pointer"
                      style={{
                        borderColor: person.gender === g.value ? 'rgba(255,149,0,0.4)' : 'rgba(201,185,154,0.1)',
                        background: person.gender === g.value ? 'rgba(255,149,0,0.08)' : 'rgba(40,25,12,0.3)',
                        color: person.gender === g.value ? '#F0EBE1' : '#C9B99A/60',
                      }}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Living / Deceased */}
              <div>
                <label className="block text-xs text-[#C9B99A]/60 mb-2">Living Status</label>
                <div className="flex gap-3">
                  {[
                    { value: true, label: 'Living' },
                    { value: false, label: 'Deceased' },
                    { value: null, label: 'Unknown' },
                  ].map((opt) => (
                    <button
                      key={String(opt.value)}
                      onClick={() => setPerson((p) => ({ ...p, isLiving: opt.value as boolean | null }))}
                      className="px-4 py-2 rounded-lg text-xs border transition-all cursor-pointer"
                      style={{
                        borderColor: person.isLiving === opt.value ? 'rgba(255,149,0,0.4)' : 'rgba(201,185,154,0.1)',
                        background: person.isLiving === opt.value ? 'rgba(255,149,0,0.08)' : 'rgba(40,25,12,0.3)',
                        color: person.isLiving === opt.value ? '#F0EBE1' : '#C9B99A/60',
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dates row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#C9B99A]/60 mb-1.5">Date of Birth <span className="text-[#C9B99A]/30">(optional)</span></label>
                  <input
                    type="text"
                    value={person.birthDate}
                    onChange={(e) => setPerson((p) => ({ ...p, birthDate: e.target.value }))}
                    placeholder="e.g., 1950 or Mar 1950"
                    className="w-full px-4 py-3 rounded-lg bg-[rgba(40,25,12,0.5)] border border-[rgba(201,185,154,0.1)] text-[#F0EBE1] text-sm placeholder:text-[#C9B99A]/20 focus:outline-none focus:border-[rgba(255,149,0,0.3)] transition-colors"
                  />
                </div>
                {person.isLiving === false && (
                  <div>
                    <label className="block text-xs text-[#C9B99A]/60 mb-1.5">Date of Death <span className="text-[#C9B99A]/30">(optional)</span></label>
                    <input
                      type="text"
                      value={person.deathDate}
                      onChange={(e) => setPerson((p) => ({ ...p, deathDate: e.target.value }))}
                      placeholder="e.g., 2010"
                      className="w-full px-4 py-3 rounded-lg bg-[rgba(40,25,12,0.5)] border border-[rgba(201,185,154,0.1)] text-[#F0EBE1] text-sm placeholder:text-[#C9B99A]/20 focus:outline-none focus:border-[rgba(255,149,0,0.3)] transition-colors"
                    />
                  </div>
                )}
              </div>

              {/* Places row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#C9B99A]/60 mb-1.5">Place of Birth <span className="text-[#C9B99A]/30">(optional)</span></label>
                  <input
                    type="text"
                    value={person.birthPlace}
                    onChange={(e) => setPerson((p) => ({ ...p, birthPlace: e.target.value }))}
                    placeholder="City, State, Country"
                    className="w-full px-4 py-3 rounded-lg bg-[rgba(40,25,12,0.5)] border border-[rgba(201,185,154,0.1)] text-[#F0EBE1] text-sm placeholder:text-[#C9B99A]/20 focus:outline-none focus:border-[rgba(255,149,0,0.3)] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#C9B99A]/60 mb-1.5">Current Location <span className="text-[#C9B99A]/30">(optional)</span></label>
                  <input
                    type="text"
                    value={person.primaryLocation}
                    onChange={(e) => setPerson((p) => ({ ...p, primaryLocation: e.target.value }))}
                    placeholder="Where they live/lived"
                    className="w-full px-4 py-3 rounded-lg bg-[rgba(40,25,12,0.5)] border border-[rgba(201,185,154,0.1)] text-[#F0EBE1] text-sm placeholder:text-[#C9B99A]/20 focus:outline-none focus:border-[rgba(255,149,0,0.3)] transition-colors"
                  />
                </div>
              </div>

              {/* Biography */}
              <div>
                <label className="block text-xs text-[#C9B99A]/60 mb-1.5">Brief Biography <span className="text-[#C9B99A]/30">(optional)</span></label>
                <textarea
                  value={person.biography}
                  onChange={(e) => setPerson((p) => ({ ...p, biography: e.target.value }))}
                  placeholder="A few sentences about this person..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-[rgba(40,25,12,0.5)] border border-[rgba(201,185,154,0.1)] text-[#F0EBE1] text-sm placeholder:text-[#C9B99A]/20 focus:outline-none focus:border-[rgba(255,149,0,0.3)] transition-colors resize-none"
                />
              </div>

              {/* Record Status */}
              <div>
                <label className="block text-xs text-[#C9B99A]/60 mb-2">Record Status</label>
                <div className="flex flex-wrap gap-2">
                  {statusOptions.map((s) => (
                    <button
                      key={s.value}
                      onClick={() => setPerson((p) => ({ ...p, recordStatus: s.value }))}
                      className="px-3 py-2 rounded-lg text-xs border transition-all cursor-pointer"
                      style={{
                        borderColor: person.recordStatus === s.value ? 'rgba(255,149,0,0.4)' : 'rgba(201,185,154,0.1)',
                        background: person.recordStatus === s.value ? 'rgba(255,149,0,0.08)' : 'rgba(40,25,12,0.3)',
                        color: person.recordStatus === s.value ? '#F0EBE1' : '#C9B99A/60',
                      }}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-[rgba(201,185,154,0.06)]">
              <button
                onClick={handleSkip}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs text-[#C9B99A]/50 hover:text-[#C9B99A] transition-colors cursor-pointer"
              >
                <SkipForward size={13} /> {phase.step === 'root-person' ? 'Use Defaults' : 'Skip for Now'}
              </button>

              <motion.button
                whileHover={canSave ? { scale: 1.02 } : {}}
                whileTap={canSave ? { scale: 0.98 } : {}}
                onClick={handleAddPerson}
                disabled={!canSave}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                style={{
                  background: canSave ? 'linear-gradient(135deg, rgba(255,149,0,0.9), rgba(255,149,0,0.7))' : 'rgba(201,185,154,0.1)',
                  color: canSave ? '#0A0F1A' : '#C9B99A/50',
                }}
              >
                {isLast ? (
                  <>
                    <Check size={16} /> Finish
                  </>
                ) : (
                  <>
                    <UserPlus size={16} /> Add & Continue
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </RegistryBackground>
  )
}
