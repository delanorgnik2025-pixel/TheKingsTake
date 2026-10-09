import VisitorJourney from "./components/VisitorJourney";
import { Routes, Route, useLocation, Navigate } from 'react-router'
import { useEffect, useRef, useCallback, useState, Suspense, lazy } from 'react'
import Lenis from 'lenis'
import Navigation from './components/Navigation'
import MenuOverlay from './components/MenuOverlay'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import AudioExperience from './components/AudioExperience'
import ScrollToTop from './components/ScrollToTop'
import VisitorAssistant from './components/VisitorAssistant'
import ResearchPreview from './components/ResearchPreview'
import MarketingAnalytics from './components/MarketingAnalytics'

// ============================================
// LAZY-LOADED PAGES — Prevents eager import crashes
// ============================================
const LandingPreview = lazy(() => import('./pages/LandingPreviewPage'))
const HomePage = lazy(() => import('./pages/Home'))
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'))
const FeedPage = lazy(() => import('./pages/FeedPage'))
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const BrandStudioPage = lazy(() => import('./pages/BrandStudioPage'))
const WritingServicesPage = lazy(() => import('./pages/WritingServicesPage'))
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))
const CivicsPage = lazy(() => import('./pages/CivicsPage'))
const AdminLoginPage = lazy(() => import('./pages/AdminLogin'))
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboard'))
const AdminVideosPage = lazy(() => import('./pages/AdminVideosPage'))
const PreOrderPage = lazy(() => import('./pages/PreOrderPage'))
const PreOrderSuccessPage = lazy(() => import('./pages/PreOrderSuccessPage'))
const AboutAuthorPage = lazy(() => import('./pages/AboutAuthorPage'))
const AasotuBrandPage = lazy(() => import('./pages/AasotuBrandPage'))
const ArticlePage = lazy(() => import('./pages/ArticlePage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const WorkWithUsPage = lazy(() => import('./pages/WorkWithUsPage'))
const DeepRootsPage = lazy(() => import('./pages/DeepRootsPage'))
const LandReportPage = lazy(() => import('./pages/LandReportPage'))
const PetitionPage = lazy(() => import('./pages/PetitionPage'))
const ConsultationPage = lazy(() => import('./pages/ConsultationPage'))
const FoundationalBlackAmericanPage = lazy(() => import('./pages/FoundationalBlackAmericanPage'))
const ArchivesPage = lazy(() => import('./pages/ArchivesPage'))
const NaraRecordPage = lazy(() => import('./pages/NaraRecordPage'))
const InvestigationsPage = lazy(() => import('./pages/InvestigationsPage'))
const NolanRecordsPage = lazy(() => import('./pages/NolanRecordsPage'))
const VideoNewsPage = lazy(() => import('./pages/VideoNewsPage'))
const AdminArticlesPage = lazy(() => import('./pages/AdminBlog'))
const NewsHubPage = lazy(() => import('./pages/NewsHubPage'))
const HipHopPage = lazy(() => import('./pages/HipHopPage'))
const NewsSectionPage = lazy(() => import('./pages/NewsSectionPage'))
const NewsletterUnsubscribePage = lazy(() => import('./pages/NewsletterUnsubscribePage'))
// Ancestor Root Registry & Ancestor Realm pages retained in repo for future development; routes currently offline.

function AppLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [visitorAdmitted, setVisitorAdmitted] = useState(false)
  const [ownerSession, setOwnerSession] = useState(false)
  const updateAdmission = useCallback((allowed: boolean, owner = false) => {
    setVisitorAdmitted(allowed)
    setOwnerSession(owner)
  }, [])
  const lenisRef = useRef<Lenis | null>(null)
  const location = useLocation()
  const publicSalesPage = location.pathname === '/brand-studio' || location.pathname === '/pre-order' || location.pathname === '/pre-order/success' || location.pathname === '/about-author'
  const publicUtilityPage = location.pathname === '/investigations/nolan-wells/captured-report-pages' || publicSalesPage || location.pathname.startsWith('/admin') || location.pathname === '/privacy-policy' || location.pathname === '/newsletter/unsubscribe'
  const hideNav = location.pathname === '/ancestor-root-registry' || location.pathname.startsWith('/ancestor-root-registry/')

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
      <MarketingAnalytics />
      {!publicUtilityPage && <AudioExperience onAccessChange={updateAdmission} />}
      {(publicUtilityPage || visitorAdmitted) && <>
        {!hideNav && <Navigation onMenuToggle={() => setMenuOpen(true)} />}
        <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        <VisitorJourney />
        {children}
        {!publicUtilityPage && !ownerSession && <VisitorAssistant />}
        {!hideNav && <Footer onNavClick={scrollToSection} hideNewsletter={location.pathname === '/brand-studio'} />}
      </>}
    </>
  )
}

function AppRoutes() {
  const location = useLocation()

  return (
    <AppLayout>
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-screen bg-[#14202E]" />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/feed/post/:postId/:authorSlug?" element={<FeedPage />} />
          <Route path="/blog" element={<Navigate to="/feed" replace />} />
          <Route path="/news" element={<Navigate to="/feed" replace />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/investigations/nolan-wells/captured-report-pages" element={<NolanRecordsPage />} />
          <Route path="/investigations" element={<InvestigationsPage />} />
          <Route path="/video-news" element={<VideoNewsPage />} />
          <Route path="/admin/articles" element={<AdminArticlesPage />} />
          <Route path="/hip-hop" element={<HipHopPage />} />
          <Route path="/news-hub" element={<NewsHubPage />} />
          <Route path="/news-hub/:sectionId" element={<NewsSectionPage />} />
          <Route path="/brand-studio" element={<BrandStudioPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/writing-services" element={<WritingServicesPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          {/* Terms of Service page - add when file exists */}
          {/* Ancestor Root Registry & Ancestor Realm — temporarily offline, in development */}
          <Route path="/civics" element={<CivicsPage />} />
          <Route path="/admin/design-preview" element={<LandingPreview />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<Navigate to="/admin/dashboard?section=newsletter" replace />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/videos" element={<AdminVideosPage />} />
          <Route path="/pre-order" element={<PreOrderPage />} />
          <Route path="/pre-order/success" element={<PreOrderSuccessPage />} />
          <Route path="/about-author" element={<AboutAuthorPage />} />
          <Route path="/aasotu" element={<AasotuBrandPage />} />
          <Route path="/article/:slug" element={<ArticlePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/work-with-us" element={<WorkWithUsPage />} />
          <Route path="/deep-roots" element={<DeepRootsPage />} />
          <Route path="/land-report" element={<LandReportPage />} />
          <Route path="/petition" element={<PetitionPage />} />
          <Route path="/consultation" element={<ConsultationPage />} />
          <Route path="/fba" element={<FoundationalBlackAmericanPage />} />
          <Route path="/archives" element={<ResearchPreview tool="archives"><ArchivesPage /></ResearchPreview>} />
          <Route path="/archives/nara/:naId" element={<ResearchPreview tool="archives"><NaraRecordPage /></ResearchPreview>} />
          <Route path="/newsletter/unsubscribe" element={<NewsletterUnsubscribePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </AppLayout>
  )
}

export default function App() {
  return <AppRoutes />
}
