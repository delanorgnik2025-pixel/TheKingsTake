import { Routes, Route, useLocation } from 'react-router'
import { useEffect, useRef, useCallback, useState } from 'react'
import Lenis from 'lenis'
import { trackConversion } from './lib/conversions'
import Navigation from './components/Navigation'
import MenuOverlay from './components/MenuOverlay'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import AudioExperience from './components/AudioExperience'
import HomePage from './pages/Home'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import ServiceDetailPage from './pages/ServiceDetailPage'
import WorkWithMe from './pages/WorkWithMe'
import CivicsPage from './pages/CivicsPage'
import WritingServicesPage from './pages/WritingServicesPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import IndigenousHeritagePage from './pages/IndigenousHeritagePage'
import AdminDashboard from './pages/AdminDashboard'
import AdminLogin from './pages/AdminLogin'
import ProtectedAdminRoute from './components/ProtectedAdminRoute'
import NotFound from './pages/NotFound'
import AncestorRealmPage from './pages/AncestorRealmPage'
import AncestorChatPage from './pages/AncestorChatPage'
import SacredGalleryPage from './pages/SacredGalleryPage'
import StoryKeeperPage from './pages/StoryKeeperPage'
import AncestorPassPage from './pages/AncestorPassPage'
import AncestorRootRegistryPage from './pages/AncestorRootRegistryPage'
import RootRegistryStep1 from './pages/RootRegistryStep1'

function AppLayout({ children }: { children: React.ReactNode }) {
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

function AppRoutes() {
  const location = useLocation()

  useEffect(() => {
    trackConversion('PageView')
  }, [location.pathname])

  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/services/:slug" element={<ServiceDetailPage />} />
        <Route path="/work-with-me" element={<WorkWithMe />} />
        <Route path="/civics" element={<CivicsPage />} />
        <Route path="/writing-services" element={<WritingServicesPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/indigenous-heritage" element={<IndigenousHeritagePage />} />
        <Route path="/admin" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
        <Route path="/admin/blog" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
        <Route path="/admin/services" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
        <Route path="/admin/legal" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
        <Route path="/admin/setup" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/ancestor-realm" element={<AncestorRealmPage />} />
        <Route path="/ancestor-chat" element={<AncestorChatPage />} />
        <Route path="/sacred-gallery" element={<SacredGalleryPage />} />
        <Route path="/story-keeper" element={<StoryKeeperPage />} />
        <Route path="/ancestor-pass" element={<AncestorPassPage />} />
        <Route path="/ancestor-root-registry" element={<AncestorRootRegistryPage />} />
        <Route path="/root-registry/step-1" element={<RootRegistryStep1 />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppLayout>
  )
}

function App() {
  return <AppRoutes />
}

export default App
