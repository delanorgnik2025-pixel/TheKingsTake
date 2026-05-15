import { Routes, Route, useLocation } from 'react-router'
import { useEffect, useRef, useCallback, useState } from 'react'
import Lenis from 'lenis'
import Navigation from './components/Navigation'
import MenuOverlay from './components/MenuOverlay'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import HomePage from './pages/Home'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import ServiceDetailPage from './pages/ServiceDetailPage'
import WorkWithMe from './pages/WorkWithMe'
import LegalHubPage from './pages/LegalHubPage'
import LegalFormPage from './pages/LegalFormPage'
import AdminDashboard from './pages/AdminDashboard'
import AdminBlog from './pages/AdminBlog'
import AdminServices from './pages/AdminServices'
import AdminLegal from './pages/AdminLegal'
import Login from './pages/Login'
import AdminSetup from './pages/AdminSetup'
import AdminLogin from './pages/AdminLogin'
import ProtectedAdminRoute from './components/ProtectedAdminRoute'
import NotFound from './pages/NotFound'

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
      <Navigation onMenuToggle={() => setMenuOpen(true)} onNavClick={scrollToSection} />
      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} onNavClick={scrollToSection} />
      {children}
      <Footer onNavClick={scrollToSection} />
    </>
  )
}

function AppRoutes() {
  const location = useLocation()
  const isLoginPage = location.pathname === '/login'

  if (isLoginPage) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    )
  }

  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/services/:slug" element={<ServiceDetailPage />} />
        <Route path="/work-with-me" element={<WorkWithMe />} />
        <Route path="/legal" element={<LegalHubPage />} />
        <Route path="/legal/:slug" element={<LegalFormPage />} />
        <Route path="/admin" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
        <Route path="/admin/blog" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
        <Route path="/admin/services" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
        <Route path="/admin/legal" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
        <Route path="/admin/setup" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppLayout>
  )
}

function App() {
  return <AppRoutes />
}

export default App
