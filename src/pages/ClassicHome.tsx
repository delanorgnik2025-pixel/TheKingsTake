import MarqueeDivider from '../components/MarqueeDivider'
import NewsTicker from '../components/NewsTicker'
import ResearchPreview from '../components/ResearchPreview'
import AboutSection from '../sections/AboutSection'
import AncestryResearchSection from '../sections/AncestryResearchSection'
import FeedSection from '../sections/FeedSection'
import HeritageSection from '../sections/HeritageSection'
import HeroPortraitSection from '../sections/HeroPortraitSection'
import HeroSection from '../sections/HeroSection'
import ServicesSection from '../sections/ServicesSection'
import WritingMarketSection from '../sections/WritingMarketSection'

import ActionCTASection from '../sections/ActionCTASection'
import ContactSection from '../sections/ContactSection'

export default function ClassicHomePage() {
  return (
    <main>
      {/* 0. Live news ticker — feed headlines */}
      <NewsTicker />

      {/* 1. Ronald's Cosmic Portrait — Indigenous Aboriginal Royal American */}
      <HeroPortraitSection />

      {/* 1.5 Action CTAs — Petition + Consultation (elevated importance) */}
      <ActionCTASection />

      {/* 2. Book Promo + Blog Feed + Video Box */}
      <MarqueeDivider text="#TheKingsTake — From the Loins of the Beast — The African American State of the Union — Pre-Order Now" />
      <HeroSection />

      {/* 2.5 The Feed — news, posts & live broadcasts */}
      <MarqueeDivider text="#TheKingsTake — The Feed — News. Commentary. Live Broadcasts. — Straight From the Source" />
      <FeedSection />

      {/* 3. Indigenous Soul Tribe Map — Cosmic aesthetic continues */}
      <MarqueeDivider text="#TheKingsTake — We Were Here Before Anybody — Discover Your Roots — 225+ Nations Documented — The Land Remembers" />
      <ResearchPreview tool="globe"><HeritageSection /></ResearchPreview>

      {/* 4. Ancestry Research & Dawes Rolls — Reclaim Your Heritage */}
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
