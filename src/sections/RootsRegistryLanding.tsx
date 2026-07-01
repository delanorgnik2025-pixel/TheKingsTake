import HeroSection from './roots-registry/HeroSection'
import GatewaySection from './roots-registry/GatewaySection'
import FeaturesSection from './roots-registry/FeaturesSection'
import { User } from 'lucide-react'

export default function RootsRegistryLanding() {
  return (
    <>
      {/* Hero — full-viewport artwork background with floating UI */}
      <HeroSection />

      {/* Six Sacred Gateways — stone pillar cards */}
      <GatewaySection />

      {/* What Makes Our Registry Unique — feature strip */}
      <FeaturesSection />

      {/* Bottom registry bar */}
      <div className="relative w-full bg-[#05080e] border-t border-[rgba(255,149,0,0.08)]">
        <div className="px-6 md:px-12 lg:px-16 py-5 max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#C9B99A]/50 text-center sm:text-left">
            Know Your Roots. Own Your Legacy. Build Your Kingdom.
          </p>
          <button className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] text-[#FF9500] border border-[rgba(255,149,0,0.25)] rounded-md px-4 py-2 hover:bg-[rgba(255,149,0,0.1)] hover:border-[rgba(255,149,0,0.4)] transition-all duration-300 cursor-pointer">
            <User size={12} />
            My Registry Login
          </button>
        </div>
      </div>
    </>
  )
}
