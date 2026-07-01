import HeroSection from './roots-registry/HeroSection'
import GatewaySection from './roots-registry/GatewaySection'
import FeaturesSection from './roots-registry/FeaturesSection'

/**
 * Roots Registry — Sacred Archive Experience
 *
 * Desktop: Cinematic hero with artwork background, six gateways in horizontal
 * row, feature grid below. All UI floats above the artwork.
 *
 * Mobile: Scrollable journey through the Sacred Registry. Hero shows the tree.
 * Gateways stack vertically as stone arch cards. Features stack vertically.
 * Footer with "Your Story. Your Roots. Your Kingdom." and login CTA.
 *
 * Visual continuity maintained across both experiences through consistent
 * color palette (#FF9500 gold, #C9B99A beige, #05080e dark), glass panels,
 * amber glow effects, and the same sacred environment.
 */
export default function RootsRegistryLanding() {
  return (
    <>
      {/* Hero — full-viewport artwork background with floating UI */}
      <HeroSection />

      {/* Six Sacred Gateways — stone arch cards */}
      <GatewaySection />

      {/* What Makes Our Registry Unique — features + footer */}
      <FeaturesSection />
    </>
  )
}
