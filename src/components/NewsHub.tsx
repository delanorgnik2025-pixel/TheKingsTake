import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import {
  ArrowRight, Play, TrendingUp, Clock, User, ChevronRight,
  Newspaper, Zap, Hash, Radio, Star, Video, ExternalLink,
  Eye, Rss, Search
} from 'lucide-react'
import { ARTICLES, type Article } from '../data/newsData'
import ScrollReveal from './ScrollReveal'

// ============================================
// CATEGORY STYLING
// ============================================
const CAT_STYLE: Record<string, { bg: string; text: string }> = {
  BREAKING:   { bg: '#DC143C', text: '#FFFFFF' },
  ADVOCACY:   { bg: '#FF9500', text: '#1B2838' },
  LEGAL:      { bg: '#4169E1', text: '#FFFFFF' },
  COMMUNITY:  { bg: '#228B22', text: '#FFFFFF' },
  VOICE:      { bg: '#FF69B4', text: '#FFFFFF' },
  HISTORY:    { bg: '#DAA520', text: '#1B2838' },
  AASOTU:     { bg: '#FF9500', text: '#1B2838' },
  POLITICS:   { bg: '#8B4513', text: '#FFFFFF' },
  HERITAGE:   { bg: '#9932CC', text: '#FFFFFF' },
}

function catStyle(cat: string) { return CAT_STYLE[cat] ?? { bg: '#FF9500', text: '#1B2838' } }

// ============================================
// MARQUEE TICKER
// ============================================
function Ticker() {
  const items = [
    "BREAKING: Supreme Court Affirms Tribal Jurisdiction in 5-4 Ruling",
    "H.R. 40 Reparations Bill Advances Through House Judiciary",
    "$15M in Federal Grants for Indigenous Language Preservation",
    "EEOC Reports 23% Surge in Discrimination Complaints by Black Workers",
    "National Archives Completes Dawes Rolls Digitization — 250K Records",
    "Pre-Order: The African American State of the Union — $19.99",
  ]
  return (
    <div className="w-full bg-[#0A0F1A] overflow-hidden py-2 border-b border-[rgba(255,149,0,0.15)]">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...items, ...items, ...items].map((item, i) => (
          <span key={i} className="text-[10px] md:text-xs font-bold text-[#FF9500] uppercase tracking-wider mx-5 flex items-center gap-2 shrink-0">
            <Zap size={9} /> {item}
          </span>
        ))}
      </div>
    </div>
  )
}

// ============================================
// ARTICLE CARD COMPONENTS
// ============================================

// Large hero card
function HeroCard({ article }: { article: Article }) {
  const style = catStyle(article.category)
  return (
    <Link to={`/article/${article.slug}`} className="group block relative rounded-2xl overflow-hidden border border-[rgba(0,0,0,0.08)] hover:border-[rgba(255,149,0,0.4)] transition-all shadow-sm hover:shadow-xl bg-white">
      <div className="relative h-[280px] md:h-[380px]">
        <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1A] via-[#0A0F1A]/30 to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-white rounded-full px-3 py-1.5" style={{ backgroundColor: style.bg }}>
            {article.category === 'BREAKING' && <Radio size={10} className="animate-pulse" />}
            {article.category}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
          <h3 className="text-xl md:text-2xl lg:text-3xl text-white font-semibold leading-tight mb-3 group-hover:text-[#FFB840] transition-colors">
            {article.title}
          </h3>
          <p className="text-sm text-white/60 line-clamp-2 max-w-2xl mb-3 hidden md:block">
            {article.excerpt}
          </p>
          <div className="flex items-center gap-4 text-[10px] text-white/30">
            <span className="flex items-center gap-1"><User size={9} /> {article.author}</span>
            <span className="flex items-center gap-1"><Clock size={9} /> {article.readTime}</span>
            <span className="flex items-center gap-1"><Eye size={9} /> {Math.floor(Math.random() * 8000 + 2000).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

// Compact side card
function SideCard({ article }: { article: Article }) {
  const style = catStyle(article.category)
  return (
    <Link to={`/article/${article.slug}`} className="group flex gap-3 p-3 rounded-xl border border-[rgba(0,0,0,0.06)] hover:border-[rgba(255,149,0,0.3)] bg-white hover:shadow-md transition-all">
      <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-[#F0F0F0]">
        <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-[9px] uppercase tracking-wider font-bold rounded px-1.5 py-0.5 mb-1 inline-block" style={{ backgroundColor: `${style.bg}15`, color: style.bg }}>
          {article.category}
        </span>
        <h4 className="text-xs text-[#1B2838] leading-snug line-clamp-2 group-hover:text-[#FF9500] transition-colors font-medium">
          {article.title}
        </h4>
        <div className="flex items-center gap-2 mt-1 text-[9px] text-[#1B2838]/25">
          <Clock size={7} /> {article.readTime}
        </div>
      </div>
    </Link>
  )
}

// Grid card
function GridCard({ article }: { article: Article }) {
  const style = catStyle(article.category)
  return (
    <Link to={`/article/${article.slug}`} className="group block rounded-xl overflow-hidden border border-[rgba(0,0,0,0.06)] hover:border-[rgba(255,149,0,0.3)] bg-white hover:shadow-lg transition-all">
      <div className="h-36 overflow-hidden bg-[#F0F0F0]">
        <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-4">
        <span className="text-[9px] uppercase tracking-wider font-bold rounded px-2 py-0.5 mb-2 inline-block" style={{ backgroundColor: `${style.bg}15`, color: style.bg }}>
          {article.category}
        </span>
        <h4 className="text-sm text-[#1B2838] leading-snug mb-2 line-clamp-2 group-hover:text-[#FF9500] transition-colors font-medium">
          {article.title}
        </h4>
        <p className="text-[11px] text-[#1B2838]/35 line-clamp-2 leading-relaxed">{article.excerpt}</p>
        <div className="flex items-center gap-2 mt-3 text-[9px] text-[#1B2838]/20">
          <Clock size={7} /> {article.readTime}
          <span className="text-[#1B2838]/10">|</span>
          <Eye size={7} /> {Math.floor(Math.random() * 5000 + 500).toLocaleString()}
        </div>
      </div>
    </Link>
  )
}

// Mini list item
function MiniItem({ article }: { article: Article }) {
  return (
    <Link to={`/article/${article.slug}`} className="group flex items-start gap-3 py-3 border-b border-[rgba(0,0,0,0.04)] last:border-b-0 hover:bg-[rgba(255,149,0,0.02)] px-2 -mx-2 rounded-lg transition-colors">
      <span className="text-[10px] text-[#FF9500]/40 font-bold mt-0.5 shrink-0 w-5">{article.readTime}</span>
      <p className="text-xs text-[#1B2838]/70 leading-snug group-hover:text-[#FF9500] transition-colors line-clamp-2">
        {article.title}
      </p>
    </Link>
  )
}

// ============================================
// VIDEO SECTION
// ============================================
function VideoSection() {
  const [activeId, setActiveId] = useState<string | null>(null)

  const videos = [
    { id: 'v1', title: 'The State of Our Union: Talk 1', desc: 'Ronald Lee King breaks down what "From the Loins of the Beast" means for our community.', thumb: '/images/book-cover.jpg', duration: '12:34', youtubeId: '' },
    { id: 'v2', title: 'Know Your Rights: Police Encounters', desc: 'What to say, what not to say, and how to protect yourself.', thumb: '/images/blog-post-2.jpg', duration: '18:45', youtubeId: '' },
    { id: 'v3', title: 'Building the AASOTU Movement', desc: 'How we turn knowledge into power and community into protection.', thumb: '/images/blog-post-3.jpg', duration: '24:12', youtubeId: '' },
  ]

  const featured = videos[0]
  const playlist = videos.slice(1)

  return (
    <div className="bg-[#0A0F1A] rounded-2xl overflow-hidden border border-[rgba(255,149,0,0.1)]">
      <div className="p-3 border-b border-[rgba(255,149,0,0.08)] flex items-center gap-2">
        <Video size={12} className="text-[#FF9500]" />
        <span className="text-[10px] uppercase tracking-[0.12em] text-[#FF9500] font-semibold">AASOTU Broadcast</span>
        <span className="ml-auto text-[9px] text-[#C9B99A]/20">Coming Soon</span>
      </div>
      <div className="relative aspect-video bg-[#05080e]">
        {activeId && videos.find(v => v.id === activeId)?.youtubeId ? (
          <iframe
            src={`https://www.youtube.com/embed/${videos.find(v => v.id === activeId)?.youtubeId}?autoplay=1`}
            title="Video" className="w-full h-full" allow="autoplay; encrypted-media" allowFullScreen
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center relative">
            <img src={featured.thumb} alt={featured.title} className="absolute inset-0 w-full h-full object-cover opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1A] via-transparent to-[#0A0F1A]/40" />
            <div className="relative z-10 text-center p-4">
              <button className="w-14 h-14 rounded-full bg-[#FF9500] hover:bg-[#FFB840] flex items-center justify-center mx-auto mb-3 transition-all hover:scale-110" style={{ boxShadow: '0 0 30px rgba(255,149,0,0.4)' }}>
                <Play size={24} className="text-[#1B2838] ml-1" />
              </button>
              <p className="text-xs text-[#F0EBE1] font-medium">{featured.title}</p>
              <p className="text-[10px] text-[#C9B99A]/40 mt-1">{featured.desc}</p>
            </div>
          </div>
        )}
      </div>
      <div className="p-2">
        {playlist.map(v => (
          <button key={v.id} onClick={() => setActiveId(v.id)} className="w-full flex items-center gap-2.5 p-2 text-left rounded-lg hover:bg-[rgba(255,149,0,0.05)] transition-colors">
            <div className="w-14 h-9 rounded overflow-hidden shrink-0 bg-[#05080e] relative">
              <img src={v.thumb} alt={v.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40"><Play size={8} className="text-white/60" /></div>
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-[#F0EBE1] leading-snug line-clamp-1">{v.title}</p>
              <p className="text-[9px] text-[#C9B99A]/20 mt-0.5">{v.duration}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

// ============================================
// MAIN NEWS HUB
// ============================================
export default function NewsHub() {
  const [activeCategory, setActiveCategory] = useState<string>('ALL')

  const allArticles = ARTICLES
  const trending = allArticles.slice(0, 5)
  const hero = allArticles[0]
  const sideStories = allArticles.slice(1, 4)
  const authorPosts = allArticles.filter(a => a.author === 'Ronald Lee King')
  const wirePosts = allArticles.filter(a => a.author === 'AASOTU Wire')

  const categories = ['ALL', 'BREAKING', 'ADVOCACY', 'LEGAL', 'HERITAGE', 'POLITICS', 'VOICE', 'AASOTU']
  const filtered = activeCategory === 'ALL' ? allArticles : allArticles.filter(a => a.category === activeCategory)

  return (
    <section id="news" className="relative bg-[#FAFAFA]">
      {/* Background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <img src="/images/news-bg.jpg" alt="" className="w-full h-full object-cover" />
      </div>

      {/* Ticker */}
      <Ticker />

      {/* Content */}
      <div className="relative z-10 py-12 md:py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">

          {/* ===== HEADER ===== */}
          <ScrollReveal>
            <div className="flex items-end justify-between mb-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] text-white font-bold bg-[#DC143C] rounded-full px-3 py-1">
                    <Radio size={10} className="animate-pulse" /> LIVE FEED
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.1em] text-[#1B2838]/20">AASOTU Media Group LLC</span>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#1B2838] font-semibold tracking-[-0.02em] leading-[1.05]">
                  The People's Voice
                </h2>
                <p className="text-sm text-[#1B2838]/35 mt-2 max-w-lg">
                  Real news. Real facts. Zero dead ends. Every story leads somewhere.
                </p>
              </div>
              <Link to="/blog" className="hidden md:flex items-center gap-2 text-xs text-[#FF9500] bg-[rgba(255,149,0,0.06)] border border-[rgba(255,149,0,0.15)] rounded-lg px-4 py-2 hover:bg-[rgba(255,149,0,0.12)] transition-all font-medium">
                <Newspaper size={14} /> View All <ArrowRight size={12} />
              </Link>
            </div>
          </ScrollReveal>

          {/* ===== CATEGORY FILTER ===== */}
          <ScrollReveal delay={0.05}>
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map(cat => {
                const active = activeCategory === cat
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-[10px] uppercase tracking-wider font-bold rounded-full px-3 py-1.5 transition-all border ${
                      active
                        ? 'bg-[#0A0F1A] text-white border-[#0A0F1A]'
                        : 'bg-white text-[#1B2838]/40 border-[rgba(0,0,0,0.08)] hover:border-[rgba(255,149,0,0.3)] hover:text-[#FF9500]'
                    }`}
                  >
                    {cat}
                  </button>
                )
              })}
            </div>
          </ScrollReveal>

          {/* ===== MAIN GRID ===== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* ===== LEFT: Main Content (8 cols) ===== */}
            <div className="lg:col-span-8 space-y-8">

              {/* HERO */}
              <ScrollReveal delay={0.05}>
                <HeroCard article={hero} />
              </ScrollReveal>

              {/* SIDE STORIES */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {sideStories.map((a, i) => (
                  <ScrollReveal key={a.slug} delay={0.1 + i * 0.05}>
                    <GridCard article={a} />
                  </ScrollReveal>
                ))}
              </div>

              {/* DIVIDER */}
              <div className="border-t border-[rgba(0,0,0,0.06)] pt-6">
                <div className="flex items-center gap-3 mb-5">
                  <Zap size={16} className="text-[#FF9500]" />
                  <h3 className="text-xs uppercase tracking-[0.15em] text-[#1B2838]/40 font-semibold">Latest Stories</h3>
                  <div className="flex-1 h-px bg-[rgba(0,0,0,0.06)]" />
                  <span className="text-[10px] text-[#1B2838]/20">{filtered.length} stories</span>
                </div>

                {/* Filtered article grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filtered.slice(0, 6).map((a, i) => (
                    <ScrollReveal key={a.slug} delay={i * 0.04}>
                      <SideCard article={a} />
                    </ScrollReveal>
                  ))}
                </div>
              </div>

              {/* AASOTU WIRE */}
              <div className="border-t border-[rgba(0,0,0,0.06)] pt-6">
                <div className="flex items-center gap-3 mb-5">
                  <Rss size={16} className="text-[#00CED1]" />
                  <h3 className="text-xs uppercase tracking-[0.15em] text-[#00CED1] font-semibold">AASOTU Wire</h3>
                  <div className="flex-1 h-px bg-[rgba(0,0,0,0.06)]" />
                  <span className="text-[9px] text-[#00CED1]/40">Auto-curated • All sources verified</span>
                </div>
                <div className="bg-white rounded-xl border border-[rgba(0,206,209,0.12)] p-4">
                  {wirePosts.map((post, i) => (
                    <Link key={post.slug} to={`/article/${post.slug}`} className="group flex items-start gap-3 py-3 border-b border-[rgba(0,0,0,0.03)] last:border-b-0">
                      <div className="w-2 h-2 rounded-full bg-[#00CED1] shrink-0 mt-1.5 animate-pulse" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[9px] uppercase tracking-wider font-bold rounded px-1.5 py-0.5" style={{
                            backgroundColor: `${catStyle(post.category).bg}12`,
                            color: catStyle(post.category).bg,
                          }}>
                            {post.category}
                          </span>
                          {post.source && <span className="text-[9px] text-[#1B2838]/20">{post.source}</span>}
                        </div>
                        <p className="text-xs text-[#1B2838] leading-snug group-hover:text-[#00CED1] transition-colors font-medium line-clamp-1">
                          {post.title}
                        </p>
                      </div>
                      <span className="text-[9px] text-[#1B2838]/15 shrink-0">{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* ===== RIGHT SIDEBAR (4 cols) ===== */}
            <div className="lg:col-span-4 space-y-6">

              {/* VIDEO */}
              <ScrollReveal delay={0.15}>
                <VideoSection />
              </ScrollReveal>

              {/* TRENDING */}
              <ScrollReveal delay={0.2}>
                <div className="bg-white rounded-xl border border-[rgba(0,0,0,0.06)] p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp size={14} className="text-[#FF9500]" />
                    <h3 className="text-xs uppercase tracking-[0.12em] text-[#1B2838]/40 font-semibold">Trending</h3>
                  </div>
                  {[
                    { t: 'Reparations', v: '2.4K' },
                    { t: 'Tribal Sovereignty', v: '1.8K' },
                    { t: 'Civil Rights 1983', v: '1.5K' },
                    { t: 'Indigenous Identity', v: '1.2K' },
                    { t: 'EEOC Claims', v: '980' },
                    { t: 'Dawes Rolls', v: '850' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-2.5 border-b border-[rgba(0,0,0,0.03)] last:border-b-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-[#FF9500]/30 font-bold w-4">{i + 1}</span>
                        <Hash size={9} className="text-[#1B2838]/10" />
                        <span className="text-xs text-[#1B2838]/70 hover:text-[#FF9500] transition-colors cursor-pointer">{item.t}</span>
                      </div>
                      <span className="text-[9px] text-[#1B2838]/15">{item.v}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              {/* FROM THE AUTHOR */}
              <ScrollReveal delay={0.25}>
                <div className="bg-white rounded-xl border border-[rgba(0,0,0,0.06)] p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <User size={14} className="text-[#FF9500]" />
                    <h3 className="text-xs uppercase tracking-[0.12em] text-[#1B2838]/40 font-semibold">From the Author</h3>
                  </div>
                  <div className="space-y-0">
                    {authorPosts.slice(0, 5).map(a => <MiniItem key={a.slug} article={a} />)}
                  </div>
                </div>
              </ScrollReveal>

              {/* QUICK LINKS */}
              <ScrollReveal delay={0.3}>
                <div className="bg-gradient-to-br from-[#0A0F1A] to-[#15202B] rounded-xl border border-[rgba(255,149,0,0.1)] p-5 text-center">
                  <Star size={18} className="text-[#FF9500] mx-auto mb-2" />
                  <p className="text-sm text-[#F0EBE1] font-medium mb-1">Support Independent Media</p>
                  <p className="text-[10px] text-[#C9B99A]/40 mb-3 leading-relaxed">
                    Every pre-order funds the expansion of truth-telling platforms for our community.
                  </p>
                  <Link to="/pre-order" className="inline-flex items-center gap-1.5 text-[10px] text-[#FF9500] bg-[rgba(255,149,0,0.1)] border border-[rgba(255,149,0,0.25)] rounded-full px-4 py-2 hover:bg-[rgba(255,149,0,0.2)] transition-all font-medium">
                    Pre-Order $19.99 <ChevronRight size={10} />
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Mobile View All */}
          <div className="md:hidden mt-8 text-center">
            <Link to="/blog" className="inline-flex items-center gap-2 text-xs text-[#FF9500] bg-[rgba(255,149,0,0.06)] border border-[rgba(255,149,0,0.15)] rounded-lg px-5 py-2.5 font-medium">
              View All Stories <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
