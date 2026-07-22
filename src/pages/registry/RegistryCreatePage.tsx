// PAGE 4 — REGISTRY CREATION RITUAL
// Route: /ancestor-root-registry/create
// Guided, one-step-at-a-time experience

import { useState } from 'react'
import { useNavigate } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, TreePine, ShieldCheck, AlertTriangle } from 'lucide-react'
import { generateId, createRegistryData } from '@/lib/registry-storage'
import type { PrivacyMode } from '@/types/registry'

interface FormStep {
  key: string
  question: string
  subtitle?: string
  type: 'text' | 'textarea' | 'select'
  placeholder?: string
  options?: { value: string; label: string }[]
  required: boolean
}

const steps: FormStep[] = [
  {
    key: 'registryName',
    question: 'What will your family Registry be called?',
    subtitle: 'Choose a meaningful name for your bloodline archive.',
    type: 'text',
    placeholder: 'e.g., The King Family Registry',
    required: true,
  },
  {
    key: 'primarySurname',
    question: 'Which family name will anchor this Registry?',
    subtitle: 'The primary surname or bloodline name.',
    type: 'text',
    placeholder: 'e.g., King',
    required: true,
  },
  {
    key: 'creatorName',
    question: 'Who is planting these roots?',
    subtitle: 'Your name as the creator of this Registry.',
    type: 'text',
    placeholder: 'Your full name',
    required: true,
  },
  {
    key: 'familyMotto',
    question: 'Does your family have a motto or guiding phrase?',
    subtitle: 'Optional — can be added or changed later.',
    type: 'text',
    placeholder: 'e.g., Strength Through Unity',
    required: false,
  },
  {
    key: 'originLocation',
    question: 'Where do your earliest known family stories begin?',
    subtitle: 'The place your family calls its roots. Optional.',
    type: 'text',
    placeholder: 'e.g., Mississippi Delta, Lagos, Kingston',
    required: false,
  },
  {
    key: 'description',
    question: 'Add a brief description for your Registry.',
    subtitle: 'What makes this bloodline worth preserving? Optional.',
    type: 'textarea',
    placeholder: 'A few sentences about your family heritage...',
    required: false,
  },
  {
    key: 'privacyMode',
    question: 'Who should be able to see this Registry?',
    subtitle: 'This can be changed later when accounts are available.',
    type: 'select',
    options: [
      { value: 'Private', label: 'Private — Only me for now' },
      { value: 'Family Only', label: 'Family Only — Invited relatives (future feature)' },
      { value: 'Public Preview', label: 'Public Preview — Shareable milestone cards only' },
    ],
    required: true,
  },
]

export default function RegistryCreatePage() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<Record<string, string>>({ privacyMode: 'Private' })
  const [direction, setDirection] = useState(1)

  const step = steps[currentStep]
  const isLast = currentStep === steps.length - 1
  const canProceed = !step.required || (formData[step.key]?.trim() || '').length > 0

  function handleNext() {
    if (!canProceed) return
    if (isLast) {
      handleComplete()
      return
    }
    setDirection(1)
    setCurrentStep((s) => s + 1)
  }

  function handleBack() {
    if (currentStep === 0) {
      navigate('/ancestor-root-registry/access')
      return
    }
    setDirection(-1)
    setCurrentStep((s) => s - 1)
  }

  function handleComplete() {
    const registryId = generateId()
    const rootPersonId = generateId()
    const now = new Date().toISOString()

    const privacyMode = (formData.privacyMode || 'Private') as PrivacyMode

    const registry = {
      id: registryId,
      name: formData.registryName.trim(),
      primarySurname: formData.primarySurname.trim(),
      creatorPersonId: rootPersonId,
      familyMotto: formData.familyMotto?.trim() || undefined,
      originLocation: formData.originLocation?.trim() || undefined,
      description: formData.description?.trim() || undefined,
      privacyMode,
      createdAt: now,
      updatedAt: now,
      version: 1,
    }

    const rootPerson = {
      id: rootPersonId,
      registryId,
      fullName: formData.creatorName.trim(),
      preferredName: formData.creatorName.trim(),
      gender: 'unknown' as const,
      isLiving: true,
      recordStatus: 'Family Testimony' as const,
      relationshipToCreator: 'Self',
      createdAt: now,
      updatedAt: now,
    }

    createRegistryData(registry, rootPerson)
    navigate('/ancestor-root-registry/build')
  }

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
  }

  return (
    <div className="min-h-screen bg-[#05080e] flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0A0F1A]/95 backdrop-blur-md border-b border-[rgba(201,185,154,0.08)]">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-xs text-[#C9B99A] hover:text-[#FF9500] transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} /> {currentStep === 0 ? 'Back' : 'Previous'}
          </button>
          <div className="flex items-center gap-1.5">
            {steps.map((_, i) => (
              <div
                key={i}
                className="w-6 h-1 rounded-full transition-all duration-300"
                style={{
                  background: i <= currentStep ? 'rgba(255,149,0,0.7)' : 'rgba(201,185,154,0.15)',
                }}
              />
            ))}
          </div>
          <span className="text-[9px] uppercase tracking-[0.2em] text-[#C9B99A]/30">
            {currentStep + 1} / {steps.length}
          </span>
        </div>
      </header>

      {/* Progress bar */}
      <div className="w-full h-0.5 bg-[rgba(201,185,154,0.06)]">
        <motion.div
          className="h-full bg-[rgba(255,149,0,0.6)]"
          initial={{ width: 0 }}
          animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25 }}
            >
              {/* Step number */}
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#FF9500]/50 mb-4">
                Step {currentStep + 1}
              </p>

              {/* Question */}
              <h1
                className="text-2xl md:text-3xl text-[#F0EBE1] font-medium leading-[1.2] mb-2"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {step.question}
              </h1>
              {step.subtitle && (
                <p className="text-sm text-[#C9B99A]/50 mb-8">{step.subtitle}</p>
              )}

              {/* Input */}
              <div className="mb-8">
                {step.type === 'text' && (
                  <input
                    type="text"
                    value={formData[step.key] || ''}
                    onChange={(e) => setFormData((d) => ({ ...d, [step.key]: e.target.value }))}
                    onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                    placeholder={step.placeholder}
                    className="w-full px-5 py-4 rounded-xl bg-[rgba(27,40,56,0.6)] border border-[rgba(201,185,154,0.12)] text-[#F0EBE1] text-base placeholder:text-[#C9B99A]/25 focus:outline-none focus:border-[rgba(255,149,0,0.4)] transition-colors"
                    autoFocus
                  />
                )}
                {step.type === 'textarea' && (
                  <textarea
                    value={formData[step.key] || ''}
                    onChange={(e) => setFormData((d) => ({ ...d, [step.key]: e.target.value }))}
                    placeholder={step.placeholder}
                    rows={4}
                    className="w-full px-5 py-4 rounded-xl bg-[rgba(27,40,56,0.6)] border border-[rgba(201,185,154,0.12)] text-[#F0EBE1] text-base placeholder:text-[#C9B99A]/25 focus:outline-none focus:border-[rgba(255,149,0,0.4)] transition-colors resize-none"
                    autoFocus
                  />
                )}
                {step.type === 'select' && (
                  <div className="space-y-3">
                    {step.options?.map((opt) => (
                      <motion.button
                        key={opt.value}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => setFormData((d) => ({ ...d, [step.key]: opt.value }))}
                        className="w-full p-4 rounded-xl border text-left transition-all cursor-pointer"
                        style={{
                          borderColor: formData[step.key] === opt.value ? 'rgba(255,149,0,0.5)' : 'rgba(201,185,154,0.1)',
                          background: formData[step.key] === opt.value ? 'rgba(255,149,0,0.08)' : 'rgba(27,40,56,0.3)',
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-4 h-4 rounded-full border-2 shrink-0"
                            style={{
                              borderColor: formData[step.key] === opt.value ? '#FF9500' : 'rgba(201,185,154,0.3)',
                              background: formData[step.key] === opt.value ? '#FF9500' : 'transparent',
                            }}
                          />
                          <p className="text-sm text-[#F0EBE1]">{opt.label}</p>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between">
                <button
                  onClick={handleBack}
                  className="px-5 py-3 rounded-lg text-sm text-[#C9B99A]/60 hover:text-[#F0EBE1] transition-colors cursor-pointer"
                >
                  Back
                </button>
                <motion.button
                  whileHover={canProceed ? { scale: 1.02 } : {}}
                  whileTap={canProceed ? { scale: 0.98 } : {}}
                  onClick={handleNext}
                  disabled={!canProceed}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{
                    background: canProceed ? 'linear-gradient(135deg, rgba(255,149,0,0.9), rgba(255,149,0,0.7))' : 'rgba(201,185,154,0.1)',
                    color: canProceed ? '#0A0F1A' : '#C9B99A/50',
                  }}
                >
                  {isLast ? (
                    <>
                      <ShieldCheck size={16} /> Create Registry
                    </>
                  ) : (
                    <>
                      Continue <ArrowRight size={16} />
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer notice */}
      <div className="px-4 py-6 border-t border-[rgba(201,185,154,0.06)]">
        <div className="max-w-lg mx-auto flex items-start gap-2">
          <AlertTriangle size={12} className="text-[#C9B99A]/30 shrink-0 mt-0.5" />
          <p className="text-[10px] text-[#C9B99A]/30 leading-relaxed">
            Your Registry will be stored temporarily in this browser. This is not secure cloud storage.
            A temporary local Registry code will be shown for demonstration purposes only.
          </p>
        </div>
      </div>
    </div>
  )
}
