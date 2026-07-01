import { useState, useCallback } from 'react'
import HeroSection from './roots-registry/HeroSection'
import FeaturesSection from './roots-registry/FeaturesSection'
import RootsRegistryWizard, { type RegistryProfile } from './roots-registry/RootsRegistryWizard'

/**
 * Roots Registry — Sacred Archive Experience
 *
 * Landing: Hero with artwork background + Features strip
 * Wizard: Triggered by "Begin Your Journey" — 5-step guided flow:
 *   1. Your Profile (name, birth, tribal affiliation)
 *   2. Build Your Lineage (parents, grandparents)
 *   3. Preserve Your Heritage (family stories)
 *   4. Discover Connections (AI research — coming soon info)
 *   5. Review & Plant Your Tree
 */
export default function RootsRegistryLanding() {
  const [showWizard, setShowWizard] = useState(false)
  const [completedProfile, setCompletedProfile] = useState<RegistryProfile | null>(null)

  const handleBegin = useCallback(() => {
    setShowWizard(true)
  }, [])

  const handleWizardComplete = useCallback((profile: RegistryProfile) => {
    setCompletedProfile(profile)
    setShowWizard(false)
    // Persist to localStorage
    localStorage.setItem('thekingstake-registry-profile', JSON.stringify(profile))
  }, [])

  const handleWizardCancel = useCallback(() => {
    setShowWizard(false)
  }, [])

  return (
    <>
      {/* Hero — artwork background with floating UI */}
      <HeroSection onBegin={handleBegin} />

      {/* Features — what makes the registry unique */}
      <FeaturesSection />

      {/* Full-screen guided wizard */}
      {showWizard && (
        <RootsRegistryWizard
          onComplete={handleWizardComplete}
          onCancel={handleWizardCancel}
        />
      )}

      {/* Completion toast (shown after wizard completes) */}
      {completedProfile && !showWizard && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[rgba(5,8,14,0.9)] backdrop-blur-md border border-[rgba(255,149,0,0.25)] rounded-lg px-5 py-3 flex items-center gap-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          <div className="w-8 h-8 rounded-full bg-[rgba(255,149,0,0.12)] flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF9500" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-[#F0EBE1] font-medium">Tree Planted Successfully</p>
            <p className="text-[10px] text-[#C9B99A]/50">Welcome, {completedProfile.firstName}</p>
          </div>
          <button
            onClick={() => setCompletedProfile(null)}
            className="ml-2 text-[10px] text-[#C9B99A]/40 hover:text-[#C9B99A] transition-colors"
          >
            Dismiss
          </button>
        </div>
      )}
    </>
  )
}
