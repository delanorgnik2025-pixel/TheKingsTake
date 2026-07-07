import { Routes, Route, useLocation } from 'react-router'
import { useEffect, useRef, useCallback, useState } from 'react'
import Lenis from 'lenis'
import Navigation from './components/Navigation'
import MenuOverlay from './components/MenuOverlay'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import AudioExperience from './components/AudioExperience'

function AppLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const lenisRef = useRef<Lenis | null>(null)
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), lerp: 0.1 })
    lenisRef.current = lenis
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    return () => { lenis.destroy() }
  }, [])
  const scrollToSection = useCallback((id: string) => {
    setMenuOpen(false)
    setTimeout(() => {
      const el = document.getElementById(id)
      if (el) lenisRef.current?.scrollTo(el, { offset: -64 })
    }, menuOpen ? 400 : 0)
  }, [menuOpen])
  return (
    <>
      <CustomCursor />
      <AudioExperience />
      <Navigation onMenuToggle={() => setMenuOpen(true)} onNavClick={scrollToSection} />
      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} onNavClick={scrollToSection} />
      {children}
      <Footer onNavClick={scrollToSection} />
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="*" element={
        <AppLayout>
          <div style={{ padding: '100px', color: 'red', fontSize: '40px' }}>FOOTER TEST</div>
        </AppLayout>
      } />
    </Routes>
  )
}
