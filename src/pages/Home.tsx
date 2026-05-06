import HeroSection from '../sections/HeroSection'
import BookPromoSection from '../sections/BookPromoSection'
import AboutSection from '../sections/AboutSection'
import ServicesSection from '../sections/ServicesSection'
import SimulatorPreviewSection from '../sections/SimulatorPreviewSection'
import MarqueeDivider from '../components/MarqueeDivider'
import LegalHubSection from '../sections/LegalHubSection'
import BlogPreviewSection from '../sections/BlogPreviewSection'
import ContactSection from '../sections/ContactSection'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <BookPromoSection />
      <AboutSection />
      <ServicesSection />
      <SimulatorPreviewSection />
      <MarqueeDivider text="#TheKingsTake — The People's Voice — AASOTU Media Group — Advocacy. Truth. Justice." />
      <LegalHubSection />
      <BlogPreviewSection />
      <MarqueeDivider text="#TheKingsTake — Justice. Truth. Power. — 12,000 Strong and Growing — The People's Voice" />
      <ContactSection />
    </main>
  )
}
