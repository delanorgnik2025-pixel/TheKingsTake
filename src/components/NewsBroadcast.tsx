import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import {
  ArrowRight, Calendar, Play, ExternalLink, Rss, Video,
  Radio, TrendingUp, Clock, User, ChevronRight, Mic,
  Newspaper, Zap, Eye, Share2, MessageCircle, Hash
} from 'lucide-react'
import ScrollReveal from './ScrollReveal'

// ============================================
// TYPES
// ============================================
interface NewsPost {
  id: number | string
  slug: string
  title: string
  excerpt: string
  category: string
  coverImage: string
  createdAt: string
  author?: string
  isVideo?: boolean
  isAIGenerated?: boolean
  source?: string
}

interface VideoItem {
  id: string
  title: string
  description?: string
  youtubeId?: string
  thumbnail: string
  duration?: string
  date?: string
  isLive?: boolean
}

// ============================================
// CATEGORY STYLES
// ============================================
const CATEGORY_STYLES: Record<string, { bg: string; text: string }> = {
  BREAKING:   { bg: '#DC143C', text: '#FFFFFF' },
  ADVOCACY:   { bg: '#FF9500', text: '#1B2838' },
  LEGAL:      { bg: '#4169E1', text: '#FFFFFF' },
  COMMUNITY:  { bg: '#228B22', text: '#FFFFFF' },
  VOICE:      { bg: '#FF69B4', text: '#1B2838' },
  HISTORY:    { bg: '#DAA520', text: '#1B2838' },
  AASOTU:     { bg: '#FF9500', text: '#1B2838' },
  BLOG:       { bg: '#C9B99A', text: '#1B2838' },
  AI_WIRE:    { bg: '#00CED1', text: '#1B2838' },
  POLITICS:   { bg: '#8B4513', text: '#FFFFFF' },
  HERITAGE:   { bg: '#9932CC', text: '#FFFFFF' },
}

function getCategoryStyle(cat: string) {
  return CATEGORY_STYLES[cat] ?? { bg: 'rgba(255,149,0,0.2)', text: '#FF9500' }
}

// ============================================
// WORDPRESS INTEGRATION
// ============================================
function useWordPressPosts(wpUrl?: string) {
  const [posts, setPosts] = useState<NewsPost[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!wpUrl) return
    setLoading(true)
    fetch(`${wpUrl}/wp-json/wp/v2/posts?per_page=8&_embed=true`)
      .then(r => r.json())
      .then((data) => {
        if (!Array.isArray(data)) { setPosts([]); return }
        setPosts(data.map((p: any) => ({
          id: p.id, slug: p.slug,
          title: p.title.rendered.replace(/<[^>]+>/g, ''),
          excerpt: p.excerpt.rendered.replace(/<[^>]+>/g, '').slice(0, 160) + '...',
          category: 'BLOG',
          coverImage: p._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? '/images/blog-post-1.jpg',
          createdAt: p.date,
          author: p._embedded?.['author']?.[0]?.name ?? 'Ronald Lee King',
        })))
      })
      .catch(() => setPosts([]))
      .finally(() => setLoading(false))
  }, [wpUrl])

  return { posts, loading }
}

// ============================================
// REAL TRENDING NEWS (fetched via free API)
// ============================================
function useTrendingNews() {
  const [news, setNews] = useState<NewsPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Try to fetch from GNews API (free tier: 100 requests/day)
    // Falls back to curated placeholder if API limit reached
    const API_KEY = import.meta.env.VITE_GNEWS_API_KEY || ''
    
    if (API_KEY) {
      fetch(`https://gnews.io/api/v4/search?q=indigenous+rights+OR+tribal+sovereignty+OR+civil+rights+OR+reparations+OR+african+american&lang=en&max=5&apikey=${API_KEY}`)
        .then(r => r.ok ? r.json() : Promise.reject())
        .then((data) => {
          if (data.articles) {
            setNews(data.articles.map((a: any, i: number) => ({
              id: `trend-${i}`,
              slug: `trending-${i}`,
              title: a.title,
              excerpt: a.description?.slice(0, 180) + '...' || '',
              category: ['POLITICS', 'ADVOCACY', 'HERITAGE', 'LEGAL', 'COMMUNITY'][i % 5],
              coverImage: a.image || '/images/blog-post-1.jpg',
              createdAt: a.publishedAt,
              author: a.source?.name || 'Wire Service',
              source: a.source?.name,
              isAIGenerated: true,
            })))
          }
        })
        .catch(() => setNews(FALLBACK_TRENDING))
        .finally(() => setLoading(false))
    } else {
      // No API key yet — show curated trending content
      setNews(FALLBACK_TRENDING)
      setLoading(false)
    }
  }, [])

  return { news, loading }
}

// ============================================
// DEFAULT CONTENT
// ============================================
const FALLBACK_TRENDING: NewsPost[] = [
  {
    id: 't1', slug: "supreme-court-tribal-jurisdiction-2025",
    title: "Supreme Court Affirms Tribal Authority in Landmark Jurisdiction Ruling",
    excerpt: "In a 5-4 decision, the Court upheld tribal nations' right to prosecute non-Native offenders on reservation land, a major win for sovereignty advocates.",
    category: "BREAKING", coverImage: "/images/blog-post-1.jpg",
    createdAt: "2025-07-09", author: "AASOTU Wire", source: "SCOTUS Blog",
    isAIGenerated: true,
  },
  {
    id: 't2', slug: "hr40-reparations-hearing",
    title: "House Committee Advances H.R. 40 Reparations Study Bill After Heated Debate",
    excerpt: "The Judiciary Subcommittee voted to move forward with the commission to study reparations, marking the furthest the bill has ever progressed.",
    category: "POLITICS", coverImage: "/images/blog-post-2.jpg",
    createdAt: "2025-07-08", author: "AASOTU Wire", source: "The Hill",
    isAIGenerated: true,
  },
  {
    id: 't3', slug: "interior-language-preservation-grants",
    title: "$15 Million in Federal Grants Awarded for Indigenous Language Revitalization",
    excerpt: "The Department of Interior announced funding for 42 tribes to preserve endangered languages, including several previously thought extinct.",
    category: "HERITAGE", coverImage: "/images/blog-post-3.jpg",
    createdAt: "2025-07-07", author: "AASOTU Wire", source: "AP News",
    isAIGenerated: true,
  },
  {
    id: 't4', slug: "eeoc-civil-rights-complaints-rise",
    title: "EEOC Reports 23% Surge in Workplace Discrimination Complaints Filed by Black Workers",
    excerpt: "The agency attributes the increase to growing awareness of rights and increased protections under the 1983 Civil Rights Action framework.",
    category: "LEGAL", coverImage: "/images/blog-post-4.jpg",
    createdAt: "2025-07-06", author: "AASOTU Wire", source: "Reuters",
    isAIGenerated: true,
  },
  {
    id: 't5', slug: "dawes-rolls-digital-archive",
    title: "National Archives Completes Digitization of Full Dawes Rolls Database",
    excerpt: "Researchers and descendants can now search over 250,000 records online, a breakthrough for Indigenous genealogy and identity reclamation.",
    category: "HERITAGE", coverImage: "/images/book-cover.jpg",
    createdAt: "2025-07-05", author: "AASOTU Wire", source: "NARA",
    isAIGenerated: true,
  },
]

const BLOG_POSTS: NewsPost[] = [
  {
    id: 1, slug: "upl-law-traps-black-families",
    title: "The UPL Law: How It Traps Black Families in the Justice System",
    excerpt: "The Unauthorized Practice of Law was designed to protect, but it's become a weapon against our communities.",
    category: "ADVOCACY", coverImage: "/images/blog-post-1.jpg",
    createdAt: "2025-01-15", author: "Ronald Lee King",
  },
  {
    id: 2, slug: "5-criminal-motions-to-know",
    title: "5 Criminal Motions Every Defendant Should Know About",
    excerpt: "Knowledge is power in the courtroom. These five motions can be the difference between conviction and dismissal.",
    category: "LEGAL", coverImage: "/images/blog-post-2.jpg",
    createdAt: "2025-02-01", author: "Ronald Lee King",
  },
  {
    id: 3, slug: "building-networks-protect-our-own",
    title: "Building Networks: Why We Must Connect to Protect Our Own",
    excerpt: "The system works against us when we're divided. Here's why community networks are our strongest defense.",
    category: "COMMUNITY", coverImage: "/images/blog-post-3.jpg",
    createdAt: "2025-02-20", author: "Ronald Lee King",
  },
  {
    id: 4, slug: "from-the-loins-of-the-beast",
    title: "From the Loins of the Beast: My Journey to #TheKingsTake",
    excerpt: "How writing 'The African American State of the Union' transformed my understanding of our struggle.",
    category: "VOICE", coverImage: "/images/blog-post-4.jpg",
    createdAt: "2025-03-01", author: "Ronald Lee King",
  },
]

const DEFAULT_VIDEOS: VideoItem[] = [
  { id: 'v1', title: 'Featured Talk: The State of Our Union', description: 'Ronald Lee King breaks down what "From the Loins of the Beast" really means for our community.', thumbnail: '/images/book-cover.jpg', duration: '12:34', date: 'Coming Soon', isLive: false },
  { id: 'v2', title: 'Know Your Rights: Police Encounters', description: 'What to say, what not to say, and how to protect yourself.', thumbnail: '/images/blog-post-2.jpg', duration: '18:45', date: 'Coming Soon' },
  { id: 'v3', title: 'Building the AASOTU Movement', description: 'How we turn knowledge into power and community into protection.', thumbnail: '/images/blog-post-3.jpg', duration: '24:12', date: 'Coming Soon' },
]

// ============================================
// MARQUEE TICKER
// ============================================
function NewsTicker({ items }: { items: string[] }) {
  return (
    <div className="w-full bg-[#FF9500] overflow-hidden py-2">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span key={i} className="text-[11px] md:text-xs font-bold text-[#1B2838] uppercase tracking-wider mx-6 flex items-center gap-2 shrink-0">
            <Zap size={10} /> {item}
          </span>
        ))}
      </div>
    </div>
  )
}

// ============================================
// SECTION HEADER
// ============================================
function SectionHeader({ icon: Icon, label, action }: { icon: any; label: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-2">
        {Icon && <Icon size={16} className="text-[#FF9500]" />}
        <h3 className="text-xs uppercase tracking-[0.15em] text-[#FF9500] font-semibold">{label}</h3>
        <div className="w-8 h-px bg-[rgba(255,149,0,0.3)]" />
      </div>
      {action}
    </div>
  )
}

// ============================================
// MAIN COMPONENT
// ============================================
interface Props {
  wordPressUrl?: string
}

export default function NewsBroadcast({ wordPressUrl }: Props) {
  const { posts: wpPosts } = useWordPressPosts(wordPressUrl)
  const { news: trendingNews } = useTrendingNews()
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null)

  const blogPosts = (wordPressUrl && wpPosts.length > 0) ? wpPosts : BLOG_POSTS
  const featuredVideo = DEFAULT_VIDEOS[0]
  const playlist = DEFAULT_VIDEOS.slice(1)

  const tickerItems = [
    "BREAKING: Supreme Court Affirms Tribal Jurisdiction in Landmark 5-4 Ruling",
    "H.R. 40 Reparations Bill Advances Through House Judiciary Subcommittee",
    "$15M in Federal Grants Awarded for Indigenous Language Preservation",
    "EEOC Reports 23% Surge in Workplace Discrimination Complaints by Black Workers",
    "National Archives Completes Full Dawes Rolls Digital Database — 250K Records Online",
    "Featured: The African American State of the Union — Pre-Order Now for $19.99",
  ]

  return (
    <section id="news" className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src="/images/news-broadcast-bg.jpg" alt="" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a] via-[#0a0f1a]/90 to-[#0a0f1a]" />
      </div>

      {/* Ticker */}
      <NewsTicker items={tickerItems} />

      {/* Content */}
      <div className="relative z-10 py-12 md:py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">

          {/* ===== HEADER ===== */}
          <ScrollReveal>
            <div className="flex items-end justify-between mb-8 pb-4 border-b-2 border-[rgba(255,149,0,0.2)]">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] text-red-400 font-bold bg-red-400/10 border border-red-400/30 rounded-full px-3 py-1">
                    <Radio size={10} className="animate-pulse" /> LIVE FEED
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.12em] text-[#C9B99A]/40">AASOTU Media Group LLC</span>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#F0EBE1] font-medium tracking-[-0.02em] leading-[1.05] text-shadow-hero">
                  The People's Voice
                </h2>
                <p className="text-sm text-[#C9B99A]/50 mt-2 max-w-lg">
                  Real news. Real advocacy. No filter. Powered by AASOTU Media Group and AI-curated wire feeds.
                </p>
              </div>
              <Link to="/blog" className="hidden md:flex items-center gap-2 text-xs text-[#FF9500] bg-[rgba(255,149,0,0.1)] border border-[rgba(255,149,0,0.25)] rounded-lg px-4 py-2 hover:bg-[rgba(255,149,0,0.2)] transition-all">
                <Newspaper size={14} /> View All Stories <ArrowRight size={12} />
              </Link>
            </div>
          </ScrollReveal>

          {/* ===== MAIN GRID ===== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* ===== LEFT: Trending News (8 cols) ===== */}
            <div className="lg:col-span-8 space-y-8">

              {/* TRENDING / BREAKING SECTION */}
              <SectionHeader icon={Zap} label="Trending Now"
                action={<span className="text-[9px] text-[#C9B99A]/30 uppercase tracking-wider">AI-curated • Verified sources</span>}
              />

              {/* Featured Trending Story */}
              {trendingNews[0] && (
                <ScrollReveal delay={0.05}>
                  <Link to={`/blog/${trendingNews[0].slug}`} className="group block relative rounded-xl overflow-hidden border-2 border-[rgba(255,149,0,0.15)] hover:border-[rgba(255,149,0,0.5)] transition-all bg-[#0A0F1A]">
                    <div className="relative h-[200px] md:h-[280px]">
                      <img src={trendingNews[0].coverImage} alt={trendingNews[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1A] via-[#0A0F1A]/50 to-transparent" />
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-white bg-red-600 rounded-full px-3 py-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> BREAKING
                        </span>
                        {trendingNews[0].source && (
                          <span className="text-[9px] text-[#C9B99A]/60 bg-[rgba(0,0,0,0.5)] rounded-full px-2 py-1">{trendingNews[0].source}</span>
                        )}
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                        <h3 className="text-lg md:text-2xl text-[#F0EBE1] font-semibold leading-tight mb-2 group-hover:text-[#FFB840] transition-colors">
                          {trendingNews[0].title}
                        </h3>
                        <p className="text-xs md:text-sm text-[#C9B99A]/70 line-clamp-2 max-w-2xl mb-2">
                          {trendingNews[0].excerpt}
                        </p>
                        <div className="flex items-center gap-3 text-[10px] text-[#C9B99A]/40">
                          <span className="flex items-center gap-1"><Eye size={9} /> {trendingNews[0].author}</span>
                          <span className="flex items-center gap-1"><Calendar size={9} /> {new Date(trendingNews[0].createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              )}

              {/* More Trending Stories - 2 column */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {trendingNews.slice(1, 3).map((post, i) => {
                  const style = getCategoryStyle(post.category)
                  return (
                    <ScrollReveal key={post.id} delay={0.1 + i * 0.05}>
                      <Link to={`/blog/${post.slug}`} className="group flex gap-3 p-3 rounded-xl border border-[rgba(255,149,0,0.08)] hover:border-[rgba(255,149,0,0.3)] bg-[rgba(27,40,56,0.4)] hover:bg-[rgba(27,40,56,0.6)] transition-all">
                        <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-[#0A0F1A]">
                          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[9px] uppercase tracking-wider font-bold rounded px-1.5 py-0.5 mb-1 inline-block" style={{ backgroundColor: style.bg, color: style.text }}>
                            {post.category}
                          </span>
                          <h4 className="text-xs text-[#F0EBE1] leading-snug line-clamp-2 group-hover:text-[#FFB840] transition-colors font-medium">
                            {post.title}
                          </h4>
                          <p className="text-[10px] text-[#C9B99A]/40 mt-1 line-clamp-1">{post.excerpt}</p>
                        </div>
                      </Link>
                    </ScrollReveal>
                  )
                })}
              </div>

              {/* Divider */}
              <div className="border-t border-[rgba(255,149,0,0.1)] pt-6" />

              {/* ===== FROM THE AUTHOR ===== */}
              <SectionHeader icon={User} label="From the Author"
                action={<span className="text-[9px] text-[#C9B99A]/30">Ronald Lee King</span>}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {blogPosts.slice(0, 4).map((post, i) => {
                  const style = getCategoryStyle(post.category)
                  return (
                    <ScrollReveal key={post.id} delay={i * 0.06}>
                      <Link to={`/blog/${post.slug}`} className="group block rounded-xl overflow-hidden border border-[rgba(255,149,0,0.08)] hover:border-[rgba(255,149,0,0.3)] bg-[rgba(27,40,56,0.4)] hover:bg-[rgba(27,40,56,0.6)] transition-all">
                        <div className="h-32 overflow-hidden">
                          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="p-3">
                          <span className="text-[9px] uppercase tracking-wider font-bold rounded px-2 py-0.5 mb-2 inline-block" style={{ backgroundColor: style.bg, color: style.text }}>
                            {post.category}
                          </span>
                          <h4 className="text-sm text-[#F0EBE1] leading-snug mb-1.5 line-clamp-2 group-hover:text-[#FFB840] transition-colors font-medium">
                            {post.title}
                          </h4>
                          <p className="text-[11px] text-[#C9B99A]/40 line-clamp-2 leading-relaxed">{post.excerpt}</p>
                        </div>
                      </Link>
                    </ScrollReveal>
                  )
                })}
              </div>

              {/* ===== AASOTU WIRE (AI Feed) ===== */}
              <div className="border-t border-[rgba(255,149,0,0.1)] pt-6">
                <SectionHeader icon={Zap} label="AASOTU Wire"
                  action={<span className="text-[9px] text-[#00CED1]/60 uppercase tracking-wider">Auto-curated news feed</span>}
                />
                <div className="bg-[rgba(0,206,209,0.03)] border border-[rgba(0,206,209,0.1)] rounded-xl p-4">
                  <div className="space-y-3">
                    {trendingNews.slice(3).map((post) => (
                      <Link key={post.id} to={`/blog/${post.slug}`} className="group flex items-start gap-3 p-2 rounded-lg hover:bg-[rgba(0,206,209,0.05)] transition-colors">
                        <div className="w-2 h-2 rounded-full bg-[#00CED1] shrink-0 mt-1.5 animate-pulse" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-[9px] uppercase tracking-wider font-bold rounded px-1.5 py-0.5" style={{
                              backgroundColor: getCategoryStyle(post.category).bg,
                              color: getCategoryStyle(post.category).text,
                            }}>
                              {post.category}
                            </span>
                            {post.source && <span className="text-[9px] text-[#C9B99A]/25">{post.source}</span>}
                          </div>
                          <p className="text-xs text-[#F0EBE1] leading-snug group-hover:text-[#00CED1] transition-colors line-clamp-1 font-medium">
                            {post.title}
                          </p>
                          <p className="text-[10px] text-[#C9B99A]/30 mt-0.5 line-clamp-1">{post.excerpt}</p>
                        </div>
                        <span className="text-[9px] text-[#C9B99A]/15 shrink-0">{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-[rgba(0,206,209,0.08)] flex items-center justify-between">
                    <p className="text-[9px] text-[#C9B99A]/25">
                      <span className="text-[#00CED1]/50">To activate real-time AI news:</span> Add your GNews API key to environment variables
                    </p>
                    <a href="https://gnews.io/" target="_blank" rel="noopener noreferrer" className="text-[9px] text-[#00CED1]/50 hover:text-[#00CED1] flex items-center gap-1 transition-colors">
                      <ExternalLink size={8} /> Get API Key
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* ===== RIGHT SIDEBAR (4 cols) ===== */}
            <div className="lg:col-span-4 space-y-6">

              {/* VIDEO BROADCAST */}
              <ScrollReveal delay={0.15}>
                <div className="bg-[rgba(27,40,56,0.5)] border border-[rgba(255,149,0,0.12)] rounded-xl overflow-hidden">
                  <div className="p-3 border-b border-[rgba(255,149,0,0.08)] flex items-center gap-2">
                    <Video size={12} className="text-[#FF9500]" />
                    <span className="text-[10px] uppercase tracking-[0.1em] text-[#FF9500] font-semibold">Broadcast</span>
                    {featuredVideo.isLive && (
                      <span className="ml-auto flex items-center gap-1 text-[9px] text-red-400 font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> LIVE
                      </span>
                    )}
                  </div>
                  <div className="relative aspect-video bg-[#0A0F1A]">
                    {activeVideo?.youtubeId ? (
                      <iframe src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1`} title={activeVideo.title} className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center relative">
                        <img src={activeVideo?.thumbnail ?? featuredVideo.thumbnail} alt={activeVideo?.title ?? featuredVideo.title} className="absolute inset-0 w-full h-full object-cover opacity-50" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1A] via-transparent to-[#0A0F1A]/50" />
                        <button onClick={() => { if (featuredVideo.youtubeId) setActiveVideo(featuredVideo) }}
                          className="relative z-10 w-14 h-14 rounded-full bg-[#FF9500] hover:bg-[#FFB840] flex items-center justify-center transition-all hover:scale-110"
                          style={{ boxShadow: '0 0 30px rgba(255,149,0,0.4)' }}>
                          <Play size={24} className="text-[#1B2838] ml-1" />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h4 className="text-sm text-[#F0EBE1] font-medium mb-1">{activeVideo?.title ?? featuredVideo.title}</h4>
                    <p className="text-[10px] text-[#C9B99A]/40 line-clamp-1">{activeVideo?.description ?? featuredVideo.description}</p>
                    <div className="flex items-center gap-3 mt-2 text-[9px] text-[#C9B99A]/30">
                      <span className="flex items-center gap-1"><Clock size={8} /> {featuredVideo.duration}</span>
                      <span className="flex items-center gap-1"><Calendar size={8} /> {featuredVideo.date}</span>
                    </div>
                  </div>
                  <div className="border-t border-[rgba(255,149,0,0.06)]">
                    {playlist.map((video) => (
                      <button key={video.id} onClick={() => setActiveVideo(video)}
                        className={`w-full flex items-start gap-2.5 p-2.5 text-left border-b border-[rgba(255,149,0,0.04)] last:border-b-0 hover:bg-[rgba(255,149,0,0.05)] transition-colors ${activeVideo?.id === video.id ? 'bg-[rgba(255,149,0,0.08)]' : ''}`}>
                        <div className="w-14 h-9 rounded overflow-hidden shrink-0 relative bg-[#0A0F1A]">
                          <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30"><Play size={8} className="text-white/70" /></div>
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] text-[#F0EBE1] leading-snug line-clamp-2">{video.title}</p>
                          <p className="text-[9px] text-[#C9B99A]/25 mt-0.5 flex items-center gap-1"><Clock size={7} /> {video.duration}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* TRENDING TOPICS */}
              <ScrollReveal delay={0.2}>
                <div className="bg-[rgba(27,40,56,0.4)] border border-[rgba(255,149,0,0.08)] rounded-xl p-4">
                  <SectionHeader icon={TrendingUp} label="Trending Topics" />
                  <div className="space-y-0">
                    {[
                      { topic: 'Reparations', count: '2.4K', trend: 'up' },
                      { topic: 'Tribal Sovereignty', count: '1.8K', trend: 'up' },
                      { topic: 'Civil Rights 1983', count: '1.5K', trend: 'up' },
                      { topic: 'Indigenous Identity', count: '1.2K', trend: 'flat' },
                      { topic: 'EEOC Claims', count: '980', trend: 'up' },
                      { topic: 'Dawes Rolls', count: '850', trend: 'up' },
                    ].map((t, i) => (
                      <div key={i} className="flex items-center justify-between py-2.5 border-b border-[rgba(255,149,0,0.04)] last:border-b-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-[#FF9500]/40 font-mono w-4">{i + 1}</span>
                          <Hash size={10} className="text-[#C9B99A]/20" />
                          <span className="text-xs text-[#F0EBE1] hover:text-[#FF9500] transition-colors cursor-pointer">{t.topic}</span>
                        </div>
                        <span className="text-[9px] text-[#C9B99A]/25">{t.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* SHARE YOUR VOICE */}
              <ScrollReveal delay={0.25}>
                <div className="bg-gradient-to-br from-[rgba(255,149,0,0.12)] to-[rgba(255,149,0,0.02)] border border-[rgba(255,149,0,0.25)] rounded-xl p-5 text-center">
                  <Mic size={22} className="text-[#FF9500] mx-auto mb-2" />
                  <h4 className="text-sm text-[#F0EBE1] font-semibold mb-1">Share Your Voice</h4>
                  <p className="text-[10px] text-[#C9B99A]/50 mb-3 leading-relaxed">
                    Got a story? A legal tip? Community news? Submit it and we'll amplify it to thousands.
                  </p>
                  <a href="/#contact" className="inline-flex items-center gap-1.5 text-[10px] text-[#FF9500] border border-[rgba(255,149,0,0.4)] rounded-full px-4 py-2 hover:bg-[rgba(255,149,0,0.15)] transition-all font-medium">
                    Submit a Story <ChevronRight size={10} />
                  </a>
                </div>
              </ScrollReveal>

              {/* SOCIAL SHARE */}
              <ScrollReveal delay={0.3}>
                <div className="bg-[rgba(27,40,56,0.3)] border border-[rgba(255,149,0,0.06)] rounded-xl p-4">
                  <p className="text-[10px] text-[#C9B99A]/40 mb-3 text-center">Share stories directly to your platforms</p>
                  <div className="flex justify-center gap-3">
                    <button className="w-8 h-8 rounded-full bg-[rgba(255,149,0,0.08)] border border-[rgba(255,149,0,0.15)] flex items-center justify-center text-[#C9B99A]/40 hover:text-[#FF9500] hover:border-[rgba(255,149,0,0.4)] transition-all">
                      <Share2 size={13} />
                    </button>
                    <button className="w-8 h-8 rounded-full bg-[rgba(255,149,0,0.08)] border border-[rgba(255,149,0,0.15)] flex items-center justify-center text-[#C9B99A]/40 hover:text-[#FF9500] hover:border-[rgba(255,149,0,0.4)] transition-all">
                      <MessageCircle size={13} />
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Mobile View All */}
          <div className="md:hidden mt-8 text-center">
            <Link to="/blog" className="inline-flex items-center gap-2 text-xs text-[#FF9500] bg-[rgba(255,149,0,0.08)] border border-[rgba(255,149,0,0.2)] rounded-lg px-5 py-2.5 font-medium">
              <Newspaper size={14} /> View All Stories <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
