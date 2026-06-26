import HeroSection from '../sections/HeroSection'
import HeroPortraitSection from '../sections/HeroPortraitSection'
import BookPromoSection from '../sections/BookPromoSection'
import HeritageSection from '../sections/HeritageSection'
import AncestryResearchSection from '../sections/AncestryResearchSection'
import AboutSection from '../sections/AboutSection'
import ServicesSection from '../sections/ServicesSection'
import WritingMarketSection from '../sections/WritingMarketSection'
import MarqueeDivider from '../components/MarqueeDivider'
import BlogPreviewSection from '../sections/BlogPreviewSection'
import ContactSection from '../sections/ContactSection'

export default function HomePage() {
  return (
    <main>
      {/* 1. Ronald's Cosmic Portrait — Indigenous Aboriginal Royal American */}
      <HeroPortraitSection />

      {/* 2. Indigenous Soul Tribe Map — Cosmic aesthetic continues */}
      <HeritageSection />

      {/* 3. Ancestry Research & Dawes Rolls — Reclaim Your Heritage */}
      <MarqueeDivider text="#TheKingsTake — They Hid Our Identity in the Records — Search the Dawes Rolls — Reclaim What Was Taken — Your Ancestors Are Waiting" />
      <AncestryResearchSection />

      {/* 4. Book Upsell — The African American State of the Union */}
      <MarqueeDivider text="#TheKingsTake — We Were Here Before Anybody — Discover Your Roots — 225+ Nations Documented — The Land Remembers" />
      <HeroSection />
      <BookPromoSection />

      {/* 4. GTA-Style Platform Sections */}
      <AboutSection />
      <ServicesSection />
      <WritingMarketSection />
      <MarqueeDivider text="#TheKingsTake — The People's Voice — AASOTU Media Group — Advocacy. Truth. Justice." />
      <BlogPreviewSection />
      <MarqueeDivider text="#TheKingsTake — Justice. Truth. Power. — 12,000 Strong and Growing — The People's Voice" />
      <ContactSection />
    </main>
  )
}
