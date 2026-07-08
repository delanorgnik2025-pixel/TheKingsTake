import HeroSection from '../sections/HeroSection'
import HeroPortraitSection from '../sections/HeroPortraitSection'
import NewsBroadcast from '../components/NewsBroadcast'
import HeritageSection from '../sections/HeritageSection'
import AncestryResearchSection from '../sections/AncestryResearchSection'
import AboutSection from '../sections/AboutSection'
import ServicesSection from '../sections/ServicesSection'
import WritingMarketSection from '../sections/WritingMarketSection'
import MarqueeDivider from '../components/MarqueeDivider'

import ContactSection from '../sections/ContactSection'
import AncestorRootRegistrySection from '../sections/AncestorRootRegistrySection'
import AncestorRealmTeaser from '../sections/AncestorRealmTeaser'

export default function HomePage() {
  return (
    <main>
      {/* 1. Ronald's Cosmic Portrait — Indigenous Aboriginal Royal American */}
      <HeroPortraitSection />

      {/* 2. Book Promo + Blog Feed + Video Box */}
      <MarqueeDivider text="#TheKingsTake — From the Loins of the Beast — The African American State of the Union — Pre-Order Now" />
      <HeroSection />
      <NewsBroadcast />

      {/* 3. Indigenous Soul Tribe Map — Cosmic aesthetic continues */}
      <MarqueeDivider text="#TheKingsTake — We Were Here Before Anybody — Discover Your Roots — 225+ Nations Documented — The Land Remembers" />
      <HeritageSection />

      {/* 4. Ancestor Root Registry — The Sacred Archive */}
      <MarqueeDivider text="#TheKingsTake — Plant Your Roots — Preserve Your Legacy — Ancestor Root Registry — Your Bloodline Awaits" />
      <AncestorRootRegistrySection />

      {/* 5. Ancestor Realm Teaser — Enter the Sacred Garden */}
      <MarqueeDivider text="#TheKingsTake — Walk Among the Ancestors — Enter the Sacred Garden — Their Wisdom Lives On" />
      <AncestorRealmTeaser />

      {/* 5. Ancestry Research & Dawes Rolls — Reclaim Your Heritage */}
      <MarqueeDivider text="#TheKingsTake — They Hid Our Identity in the Records — Search the Dawes Rolls — Reclaim What Was Taken — Your Ancestors Are Waiting" />
      <AncestryResearchSection />

      {/* 6. GTA-Style Platform Sections */}
      <AboutSection />
      <ServicesSection />
      <WritingMarketSection />
      <MarqueeDivider text="#TheKingsTake — The People's Voice — AASOTU Media Group — Advocacy. Truth. Justice." />
      {/* Blog content now featured prominently after hero section */}
      <ContactSection />
    </main>
  )
}
