import HeroSection from '../sections/HeroSection'
import BookPromoSection from '../sections/BookPromoSection'
import AboutSection from '../sections/AboutSection'
import ServicesSection from '../sections/ServicesSection'
import WritingMarketSection from '../sections/WritingMarketSection'
import MarqueeDivider from '../components/MarqueeDivider'
import BlogPreviewSection from '../sections/BlogPreviewSection'
import ContactSection from '../sections/ContactSection'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <BookPromoSection />
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
