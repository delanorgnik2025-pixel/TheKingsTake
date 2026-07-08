import { Routes, Route, useLocation } from 'react-router'
import { useEffect, useRef, useCallback, useState, Suspense, lazy } from 'react'
import Lenis from 'lenis'
import Navigation from './components/Navigation'
import MenuOverlay from './components/MenuOverlay'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import AudioExperience from './components/AudioExperience'
import ScrollToTop from './components/ScrollToTop'

// ============================================
// LAZY-LOADED PAGES — Prevents eager import crashes
// ============================================
const HomePage = lazy(() => import('./pages/Home'))
const BlogPage = lazy(() => import('./pages/BlogPage'))
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'))
const WritingServicesPage = lazy(() => import('./pages/WritingServicesPage'))
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'))
const AncestorRealmPage = lazy(() => import('./pages/AncestorRealmPage'))
const AncestorRootRegistryPage = lazy(() => import('./pages/AncestorRootRegistryPage'))
const CivicsPage = lazy(() => import('./pages/CivicsPage'))
const AdminLoginPage = lazy(() => import('./pages/AdminLogin'))
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboard'))
const PreOrderPage = lazy(() => import('./pages/PreOrderPage'))
const PreOrderSuccessPage = lazy(() => import('./pages/PreOrderSuccessPage'))
const AboutAuthorPage = lazy(() => import('./pages/AboutAuthorPage'))
const AasotuBrandPage = lazy(() => import('./pages/AasotuBrandPage'))

function AppLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const lenisRef = useRef<Lenis | null>(null)
  const location = useLocation()
  const hideNav = location.pathname === '/ancestor-root-registry'

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
      {!hideNav && <Navigation onMenuToggle={() => setMenuOpen(true)} onNavClick={scrollToSection} />}
      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} onNavClick={scrollToSection} />
      {children}
      {!hideNav && <Footer onNavClick={scrollToSection} />}
    </>
  )
}

function AppRoutes() {
  const location = useLocation()

  return (
    <AppLayout>
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-screen bg-[#0a0f1a]" />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/writing-services" element={<WritingServicesPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          {/* Terms of Service page - add when file exists */}
          <Route path="/ancestor-realm" element={<AncestorRealmPage />} />
          <Route path="/ancestor-root-registry" element={<AncestorRootRegistryPage />} />
          <Route path="/civics" element={<CivicsPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/pre-order" element={<PreOrderPage />} />
          <Route path="/pre-order/success" element={<PreOrderSuccessPage />} />
          <Route path="/about-author" element={<AboutAuthorPage />} />
        <Route path="/aasotu" element={<AasotuBrandPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Suspense>
    </AppLayout>
  )
}

export default function App() {
  return <AppRoutes />
}
