import { useEffect, useRef, useCallback, useState } from 'react'
import Lenis from 'lenis'
import Navigation from './components/Navigation'
import MenuOverlay from './components/MenuOverlay'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import HeroSection from './sections/HeroSection'
import AboutSection from './sections/AboutSection'
import ServicesSection from './sections/ServicesSection'
import MarqueeDivider from './components/MarqueeDivider'
import LegalHubSection from './sections/LegalHubSection'
import BlogPreviewSection from './sections/BlogPreviewSection'
import ContactSection from './sections/ContactSection'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lerp: 0.1,
    })
    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  const scrollToSection = useCallback((id: string) => {
    setMenuOpen(false)
    setTimeout(() => {
      const el = document.getElementById(id)
      if (el) {
        lenisRef.current?.scrollTo(el, { offset: -64 })
      }
    }, menuOpen ? 400 : 0)
  }, [menuOpen])

  return (
    <div className="relative min-h-screen">
      <CustomCursor />
      <Navigation
        onMenuToggle={() => setMenuOpen(true)}
        onNavClick={scrollToSection}
      />
      <MenuOverlay
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onNavClick={scrollToSection}
      />
      <main>
        <HeroSection onExploreClick={() => scrollToSection('about')} />
        <AboutSection />
        <ServicesSection />
        <MarqueeDivider
          text="#TheKingsTake — The People's Voice — AASOTU Media Group — Advocacy. Truth. Justice."
        />
        <LegalHubSection />
        <BlogPreviewSection />
        <MarqueeDivider
          text="#TheKingsTake — Justice. Truth. Power. — 12,000 Strong and Growing — The People's Voice"
        />
        <ContactSection />
      </main>
      <Footer onNavClick={scrollToSection} />
    </div>
  )
}

export default App
