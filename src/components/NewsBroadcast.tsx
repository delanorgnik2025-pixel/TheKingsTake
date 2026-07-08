import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import {
  ArrowRight, Calendar, Play, ExternalLink, Rss, Video,
  Radio, TrendingUp, Clock, User, ChevronRight, Mic,
  Newspaper, Zap
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
// CATEGORY COLORS
// ============================================
const CATEGORY_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  ADVOCACY:   { bg: 'rgba(255,149,0,0.12)',  text: '#FF9500', border: 'rgba(255,149,0,0.25)' },
  LEGAL:      { bg: 'rgba(100,149,237,0.12)', text: '#6495ED', border: 'rgba(100,149,237,0.25)' },
  COMMUNITY:  { bg: 'rgba(50,205,50,0.12)',   text: '#32CD32', border: 'rgba(50,205,50,0.25)' },
  VOICE:      { bg: 'rgba(255,105,180,0.12)', text: '#FF69B4', border: 'rgba(255,105,180,0.25)' },
  HISTORY:    { bg: 'rgba(218,165,32,0.12)',  text: '#DAA520', border: 'rgba(218,165,32,0.25)' },
  AASOTU:     { bg: 'rgba(220,20,60,0.12)',   text: '#DC143C', border: 'rgba(220,20,60,0.25)' },
  BLOG:       { bg: 'rgba(201,185,154,0.1)',  text: '#C9B99A', border: 'rgba(201,185,154,0.2)' },
  AI_WIRE:    { bg: 'rgba(0,255,255,0.08)',   text: '#00CED1', border: 'rgba(0,255,255,0.2)' },
}

function getCategoryStyle(cat: string) {
  return CATEGORY_STYLES[cat] ?? CATEGORY_STYLES.BLOG
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
    fetch(`${wpUrl}/wp-json/wp/v2/posts?per_page=6&_embed=true`)
      .then(r => r.json())
      .then((data) => {
        if (!Array.isArray(data)) { setPosts([]); return }
        setPosts(data.map((p: any) => ({
          id: p.id,
          slug: p.slug,
          title: p.title.rendered.replace(/<[^>]+>/g, ''),
          excerpt: p.excerpt.rendered.replace(/<[^>]+>/g, '').slice(0, 140) + '...',
          category: (p.categories?.[0] ? String(p.categories[0]).toUpperCase() : 'BLOG'),
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
// DEFAULT CONTENT (shown when WordPress not configured)
// ============================================
const DEFAULT_POSTS: NewsPost[] = [
  {
    id: 1, slug: "upl-law-traps-black-families",
    title: "The UPL Law: How It Traps Black Families in the Justice System",
    excerpt: "The Unauthorized Practice of Law was designed to protect, but it's become a weapon against our communities. Here's what you need to know.",
    category: "ADVOCACY", coverImage: "/images/blog-post-1.jpg",
    createdAt: "2025-01-15", author: "Ronald Lee King",
  },
  {
    id: 2, slug: "5-criminal-motions-to-know",
    title: "5 Criminal Motions Every Defendant Should Know About",
    excerpt: "Knowledge is power in the courtroom. These five motions can be the difference between conviction and dismissal. Share with your people.",
    category: "LEGAL", coverImage: "/images/blog-post-2.jpg",
    createdAt: "2025-02-01", author: "Ronald Lee King",
  },
  {
    id: 3, slug: "building-networks-protect-our-own",
    title: "Building Networks: Why We Must Connect to Protect Our Own",
    excerpt: "The system works against us when we're divided. Here's why community networks are our strongest defense against erasure.",
    category: "COMMUNITY", coverImage: "/images/blog-post-3.jpg",
    createdAt: "2025-02-20", author: "Ronald Lee King",
  },
  {
    id: 4, slug: "from-the-loins-of-the-beast",
    title: "From the Loins of the Beast: My Journey to #TheKingsTake",
    excerpt: "How writing 'The African American State of the Union' transformed my understanding of our struggle — and my purpose.",
    category: "VOICE", coverImage: "/images/blog-post-4.jpg",
    createdAt: "2025-03-01", author: "Ronald Lee King",
  },
  {
    id: 5, slug: "indigenous-identity-hidden-classification",
    title: "How Reclassification Laws Erased Indigenous Identity in America",
    excerpt: "The systematic reclassification of Indigenous peoples as 'Negro,' 'Colored,' and 'African American' was not accidental. It was policy.",
    category: "HISTORY", coverImage: "/images/book-cover.jpg",
    createdAt: "2025-03-15", author: "Ronald Lee King",
  },
  {
    id: 6, slug: "aasotu-media-group-launch",
    title: "AASOTU Media Group LLC: The People's Voice Is Here",
    excerpt: "Independent media, built from the ground up. No corporate backing. No filtered message. Just truth, delivered directly to our community.",
    category: "AASOTU", coverImage: "/images/author-1.jpg",
    createdAt: "2025-04-01", author: "Ronald Lee King",
  },
]

const AI_WIRE_POSTS: NewsPost[] = [
  {
    id: 'ai-1', slug: "ai-wire-tribal-sovereignty-update",
    title: "Tribal Sovereignty Wins: Supreme Court Rules in Favor of Native Jurisdiction",
    excerpt: "In a landmark 5-4 decision, the Supreme Court affirmed tribal authority over non-Native offenders on reservation land...",
    category: "AI_WIRE", coverImage: "/images/blog-post-2.jpg",
    createdAt: "2025-07-09", isAIGenerated: true,
  },
  {
    id: 'ai-2', slug: "ai-wire-reparations-hearing",
    title: "House Committee Holds Historic Hearing on Federal Reparations Bill H.R. 40",
    excerpt: "The House Judiciary Subcommittee heard testimony from economists, historians, and community leaders on the path forward...",
    category: "AI_WIRE", coverImage: "/images/blog-post-1.jpg",
    createdAt: "2025-07-08", isAIGenerated: true,
  },
  {
    id: 'ai-3', slug: "ai-wire-indigenous-heritage-preservation",
    title: "New Federal Grants Aim to Preserve Indigenous Languages and Heritage Sites",
    excerpt: "The Department of the Interior announced $15 million in grants for language revitalization and sacred site protection...",
    category: "AI_WIRE", coverImage: "/images/blog-post-3.jpg",
    createdAt: "2025-07-07", isAIGenerated: true,
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
    <div className="w-full bg-[#FF9500] overflow-hidden py-1.5">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...items, ...items, ...items].map((item, i) => (
          <span key={i} className="text-[10px] md:text-xs font-semibold text-[#1B2838] uppercase tracking-wider mx-4 flex items-center gap-2 shrink-0">
            <Zap size={10} /> {item}
          </span>
        ))}
      </div>
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
  const { posts: wpPosts, loading: wpLoading } = useWordPressPosts(wordPressUrl)
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null)

  // Use WordPress posts if available, otherwise defaults
  const allPosts = wordPressUrl && !wpLoading && wpPosts.length > 0
    ? wpPosts
    : DEFAULT_POSTS

  const featured = allPosts[0]
  const mainPosts = allPosts.slice(1, 4)
  const videos = DEFAULT_VIDEOS
  const featuredVideo = videos[0]
  const playlist = videos.slice(1)

  const tickerItems = [
    "Breaking: AASOTU Media Group Launches Independent News Platform",
    "Featured: The African American State of the Union — Pre-Order Now",
    "Advocacy: Know Your Rights Series — New Content Weekly",
    "Heritage: 275+ Indigenous Nations Documented Across the Americas",
    "Community: Building Networks to Protect Our Own",
  ]

  return (
    <section id="news" className="relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/news-broadcast-bg.jpg"
          alt=""
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a] via-transparent to-[#0a0f1a]" />
        <div className="absolute inset-0 bg-[#0a0f1a]/60" />
      </div>

      {/* News Ticker */}
      <NewsTicker items={tickerItems} />

      {/* Main Content */}
      <div className="relative z-10 py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">

          {/* Section Header */}
          <ScrollReveal>
            <div className="flex items-center justify-between mb-10">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] text-red-400 font-semibold bg-red-400/10 border border-red-400/20 rounded-full px-3 py-1">
                    <Radio size={10} className="animate-pulse" /> Live Feed
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.1em] text-[#C9B99A]/40">|</span>
                  <span className="text-[10px] uppercase tracking-[0.1em] text-[#C9B99A]/40">AASOTU Media Group</span>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#F0EBE1] font-medium tracking-[-0.02em] leading-[1.05] text-shadow-hero">
                  The People's Voice
                </h2>
                <p className="text-sm md:text-base text-[#C9B99A]/60 mt-2 max-w-lg">
                  Investigative journalism, legal education, community advocacy — unfiltered and unapologetic.
                </p>
              </div>
              <Link to="/blog" className="hidden md:flex items-center gap-2 text-xs text-[#FF9500] bg-[rgba(255,149,0,0.08)] border border-[rgba(255,149,0,0.2)] rounded-lg px-4 py-2 hover:bg-[rgba(255,149,0,0.15)] transition-all">
                <Newspaper size={14} /> View All <ArrowRight size={12} />
              </Link>
            </div>
          </ScrollReveal>

          {/* ======== MAIN LAYOUT: Featured + Sidebar ======== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* ===== LEFT COLUMN: Featured Story + Post List (8 cols) ===== */}
            <div className="lg:col-span-8 space-y-6">

              {/* FEATURED STORY (Hero Card) */}
              <ScrollReveal delay={0.1}>
                <Link to={`/blog/${featured.slug}`} className="group block relative rounded-xl overflow-hidden border border-[rgba(255,149,0,0.15)] hover:border-[rgba(255,149,0,0.4)] transition-all bg-[#0A0F1A]">
                  {/* Image */}
                  <div className="relative h-[250px] md:h-[320px]">
                    <img src={featured.coverImage} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1A] via-[#0A0F1A]/40 to-transparent" />
                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                      <span
                        className="text-[10px] uppercase tracking-wider font-semibold rounded-full px-3 py-1 border"
                        style={{
                          backgroundColor: getCategoryStyle(featured.category).bg,
                          color: getCategoryStyle(featured.category).text,
                          borderColor: getCategoryStyle(featured.category).border,
                        }}
                      >
                        {featured.category}
                      </span>
                    </div>
                    {/* Content overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                      <h3 className="text-xl md:text-2xl lg:text-3xl text-[#F0EBE1] font-medium leading-tight mb-2 group-hover:text-[#FFB840] transition-colors">
                        {featured.title}
                      </h3>
                      <p className="text-sm text-[#C9B99A]/70 mb-3 line-clamp-2 max-w-2xl">
                        {featured.excerpt}
                      </p>
                      <div className="flex items-center gap-3 text-[10px] text-[#C9B99A]/40">
                        <span className="flex items-center gap-1"><User size={9} /> {featured.author ?? 'Ronald Lee King'}</span>
                        <span className="flex items-center gap-1"><Calendar size={9} /> {new Date(featured.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>

              {/* Sub-Featured Posts (3 cards in a row) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {mainPosts.map((post, i) => {
                  const style = getCategoryStyle(post.category)
                  return (
                    <ScrollReveal key={post.id} delay={0.15 + i * 0.08}>
                      <Link to={`/blog/${post.slug}`} className="group block bg-[rgba(27,40,56,0.5)] border border-[rgba(255,149,0,0.08)] hover:border-[rgba(255,149,0,0.25)] rounded-xl overflow-hidden transition-all h-full">
                        <div className="h-28 overflow-hidden">
                          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="p-3">
                          <span
                            className="text-[9px] uppercase tracking-wider font-medium rounded-full px-2 py-0.5 border mb-2 inline-block"
                            style={{ backgroundColor: style.bg, color: style.text, borderColor: style.border }}
                          >
                            {post.category}
                          </span>
                          <h4 className="text-xs text-[#F0EBE1] leading-snug mb-1.5 line-clamp-2 group-hover:text-[#FFB840] transition-colors">
                            {post.title}
                          </h4>
                          <p className="text-[10px] text-[#C9B99A]/40 line-clamp-2">{post.excerpt}</p>
                        </div>
                      </Link>
                    </ScrollReveal>
                  )
                })}
              </div>

              {/* AASOTU AI Wire Section */}
              <ScrollReveal delay={0.3}>
                <div className="bg-[rgba(0,255,255,0.03)] border border-[rgba(0,255,255,0.1)] rounded-xl p-4 md:p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Zap size={14} className="text-[#00CED1]" />
                    <h3 className="text-xs uppercase tracking-[0.12em] text-[#00CED1] font-semibold">AASOTU Wire — AI-Curated</h3>
                    <span className="text-[9px] text-[#00CED1]/40 ml-auto">Auto-generated • Verified sources</span>
                  </div>
                  <div className="space-y-3">
                    {AI_WIRE_POSTS.map((post) => (
                      <Link key={post.id} to={`/blog/${post.slug}`} className="group flex items-start gap-3 p-2.5 rounded-lg hover:bg-[rgba(0,255,255,0.05)] transition-colors">
                        <div className="w-2 h-2 rounded-full bg-[#00CED1] shrink-0 mt-1.5 animate-pulse" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-[#F0EBE1] leading-snug group-hover:text-[#00CED1] transition-colors line-clamp-1">
                            {post.title}
                          </p>
                          <p className="text-[10px] text-[#C9B99A]/30 mt-0.5 line-clamp-1">{post.excerpt}</p>
                        </div>
                        <span className="text-[9px] text-[#C9B99A]/20 shrink-0">{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* ===== RIGHT COLUMN: Video + Trending (4 cols) ===== */}
            <div className="lg:col-span-4 space-y-6">

              {/* Video Player */}
              <ScrollReveal delay={0.2}>
                <div className="bg-[rgba(27,40,56,0.5)] border border-[rgba(255,149,0,0.12)] rounded-xl overflow-hidden">
                  <div className="p-3 border-b border-[rgba(255,149,0,0.08)] flex items-center gap-2">
                    <Video size={12} className="text-[#FF9500]" />
                    <span className="text-[10px] uppercase tracking-[0.1em] text-[#FF9500] font-medium">Broadcast</span>
                    {featuredVideo.isLive && (
                      <span className="ml-auto flex items-center gap-1 text-[9px] text-red-400 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> LIVE
                      </span>
                    )}
                  </div>

                  {/* Player */}
                  <div className="relative aspect-video bg-[#0A0F1A]">
                    {activeVideo?.youtubeId ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1`}
                        title={activeVideo.title}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center relative">
                        <img
                          src={activeVideo?.thumbnail ?? featuredVideo.thumbnail}
                          alt={activeVideo?.title ?? featuredVideo.title}
                          className="absolute inset-0 w-full h-full object-cover opacity-50"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1A] via-transparent to-[#0A0F1A]/50" />
                        <button
                          onClick={() => { if (featuredVideo.youtubeId) setActiveVideo(featuredVideo) }}
                          className="relative z-10 w-14 h-14 rounded-full bg-[#FF9500] hover:bg-[#FFB840] flex items-center justify-center transition-all hover:scale-110"
                          style={{ boxShadow: '0 0 30px rgba(255,149,0,0.4)' }}
                        >
                          <Play size={24} className="text-[#1B2838] ml-1" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Video info */}
                  <div className="p-3">
                    <h4 className="text-sm text-[#F0EBE1] font-medium mb-1">{activeVideo?.title ?? featuredVideo.title}</h4>
                    <p className="text-[10px] text-[#C9B99A]/40 line-clamp-1">{activeVideo?.description ?? featuredVideo.description}</p>
                    <div className="flex items-center gap-3 mt-2 text-[9px] text-[#C9B99A]/30">
                      <span className="flex items-center gap-1"><Clock size={8} /> {featuredVideo.duration}</span>
                      <span className="flex items-center gap-1"><Calendar size={8} /> {featuredVideo.date}</span>
                    </div>
                  </div>

                  {/* Playlist */}
                  <div className="border-t border-[rgba(255,149,0,0.06)]">
                    {playlist.map((video) => (
                      <button
                        key={video.id}
                        onClick={() => setActiveVideo(video)}
                        className={`w-full flex items-start gap-2.5 p-2.5 text-left border-b border-[rgba(255,149,0,0.04)] last:border-b-0 hover:bg-[rgba(255,149,0,0.05)] transition-colors ${activeVideo?.id === video.id ? 'bg-[rgba(255,149,0,0.08)]' : ''}`}
                      >
                        <div className="w-14 h-9 rounded overflow-hidden shrink-0 relative bg-[#0A0F1A]">
                          <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                            <Play size={8} className="text-white/70" />
                          </div>
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

              {/* Trending Topics */}
              <ScrollReveal delay={0.3}>
                <div className="bg-[rgba(27,40,56,0.4)] border border-[rgba(255,149,0,0.08)] rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp size={14} className="text-[#FF9500]" />
                    <h3 className="text-xs uppercase tracking-[0.1em] text-[#FF9500] font-medium">Trending</h3>
                  </div>
                  <div className="space-y-2.5">
                    {[
                      { topic: 'Reparations', count: '2.4K reads' },
                      { topic: 'Tribal Sovereignty', count: '1.8K reads' },
                      { topic: 'Civil Rights 1983', count: '1.5K reads' },
                      { topic: 'Indigenous Identity', count: '1.2K reads' },
                      { topic: 'EEOC Claims', count: '980 reads' },
                    ].map((t, i) => (
                      <div key={i} className="flex items-center justify-between py-1.5 border-b border-[rgba(255,149,0,0.04)] last:border-b-0">
                        <span className="text-xs text-[#F0EBE1]">{t.topic}</span>
                        <span className="text-[9px] text-[#C9B99A]/30">{t.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Social Share CTA */}
              <ScrollReveal delay={0.4}>
                <div className="bg-gradient-to-br from-[rgba(255,149,0,0.1)] to-[rgba(255,149,0,0.02)] border border-[rgba(255,149,0,0.2)] rounded-xl p-4 text-center">
                  <Mic size={20} className="text-[#FF9500] mx-auto mb-2" />
                  <h4 className="text-sm text-[#F0EBE1] font-medium mb-1">Share Your Voice</h4>
                  <p className="text-[10px] text-[#C9B99A]/50 mb-3 leading-relaxed">
                    Got a story? A legal tip? Community news? Submit it and we'll amplify it.
                  </p>
                  <a href="/#contact" className="inline-flex items-center gap-1.5 text-[10px] text-[#FF9500] border border-[rgba(255,149,0,0.3)] rounded-full px-3 py-1.5 hover:bg-[rgba(255,149,0,0.1)] transition-all">
                    Submit a Story <ChevronRight size={10} />
                  </a>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Mobile View All */}
          <div className="md:hidden mt-8 text-center">
            <Link to="/blog" className="inline-flex items-center gap-2 text-xs text-[#FF9500] bg-[rgba(255,149,0,0.08)] border border-[rgba(255,149,0,0.2)] rounded-lg px-4 py-2">
              <Newspaper size={14} /> View All Stories <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
