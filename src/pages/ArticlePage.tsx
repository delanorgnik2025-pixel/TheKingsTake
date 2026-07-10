import { useParams, Link, useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import {
  ArrowLeft, Calendar, User, Clock, Share2, Bookmark,
  ChevronRight, ExternalLink, Hash, Eye
} from 'lucide-react'
import { getArticleBySlug, getRelatedArticles, type Article } from '../data/newsData'

const CATEGORY_COLORS: Record<string, string> = {
  BREAKING: '#DC143C',
  ADVOCACY: '#FF9500',
  LEGAL: '#4169E1',
  COMMUNITY: '#228B22',
  VOICE: '#FF69B4',
  HISTORY: '#DAA520',
  AASOTU: '#FF9500',
  POLITICS: '#8B4513',
  HERITAGE: '#9932CC',
}

function ArticleNotFound() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h1 className="text-6xl text-[#1B2838]/10 font-bold mb-4">404</h1>
        <h2 className="text-xl text-[#1B2838] font-medium mb-2">Article Not Found</h2>
        <p className="text-sm text-[#1B2838]/50 mb-6">The story you're looking for may have moved or is still being researched.</p>
        <Link to="/#news" className="inline-flex items-center gap-2 text-sm text-[#FF9500] bg-[rgba(255,149,0,0.08)] border border-[rgba(255,149,0,0.2)] rounded-lg px-4 py-2 hover:bg-[rgba(255,149,0,0.15)] transition-all">
          <ArrowLeft size={14} /> Back to News
        </Link>
      </div>
    </div>
  )
}

function RelatedCard({ article }: { article: Article }) {
  const color = CATEGORY_COLORS[article.category] || '#FF9500'
  return (
    <Link to={`/article/${article.slug}`} className="group flex gap-3 p-3 rounded-xl border border-[rgba(0,0,0,0.06)] hover:border-[rgba(255,149,0,0.3)] bg-white hover:bg-[rgba(255,149,0,0.02)] transition-all">
      <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-[#F0F0F0]">
        <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-[9px] uppercase tracking-wider font-bold rounded px-1.5 py-0.5 mb-1 inline-block" style={{ backgroundColor: `${color}15`, color }}>
          {article.category}
        </span>
        <h4 className="text-xs text-[#1B2838] leading-snug line-clamp-2 group-hover:text-[#FF9500] transition-colors font-medium">
          {article.title}
        </h4>
        <div className="flex items-center gap-2 mt-1 text-[9px] text-[#1B2838]/30">
          <Clock size={7} /> {article.readTime}
        </div>
      </div>
    </Link>
  )
}

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const article = slug ? getArticleBySlug(slug) : undefined

  if (!article) return <ArticleNotFound />

  const related = getRelatedArticles(article, 3)
  const color = CATEGORY_COLORS[article.category] || '#FF9500'

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[rgba(0,0,0,0.06)]">
        <div className="max-w-5xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="text-[#1B2838]/40 hover:text-[#FF9500] transition-colors">
              <ArrowLeft size={18} />
            </button>
            <Link to="/" className="text-[10px] uppercase tracking-[0.15em] text-[#FF9500] font-bold">#TheKingsTake</Link>
            <ChevronRight size={10} className="text-[#1B2838]/15" />
            <Link to="/#news" className="text-[10px] uppercase tracking-wider text-[#1B2838]/40 hover:text-[#FF9500] transition-colors">News</Link>
            <ChevronRight size={10} className="text-[#1B2838]/15" />
            <span className="text-[10px] uppercase tracking-wider text-[#1B2838]/25 truncate max-w-[100px]">{article.category}</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => alert('Share functionality coming soon')} className="w-8 h-8 rounded-full border border-[rgba(0,0,0,0.08)] flex items-center justify-center text-[#1B2838]/30 hover:text-[#FF9500] hover:border-[rgba(255,149,0,0.3)] transition-all">
              <Share2 size={13} />
            </button>
            <button onClick={() => alert('Bookmarked')} className="w-8 h-8 rounded-full border border-[rgba(0,0,0,0.08)] flex items-center justify-center text-[#1B2838]/30 hover:text-[#FF9500] hover:border-[rgba(255,149,0,0.3)] transition-all">
              <Bookmark size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-[250px] md:h-[400px] bg-[#0A0F1A]">
        <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFA] via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1A]/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 -mt-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Category + Meta */}
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span
              className="text-[10px] uppercase tracking-wider font-bold rounded-full px-3 py-1"
              style={{ backgroundColor: color, color: '#FFFFFF' }}
            >
              {article.category}
            </span>
            {article.source && (
              <span className="text-[10px] text-[#1B2838]/30 flex items-center gap-1">
                <ExternalLink size={9} /> Source: {article.source}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-[#1B2838] font-semibold leading-[1.1] mb-4 tracking-tight">
            {article.title}
          </h1>

          {/* Byline */}
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-[rgba(0,0,0,0.08)] flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#FF9500]/10 border border-[#FF9500]/20 flex items-center justify-center">
                <User size={14} className="text-[#FF9500]" />
              </div>
              <div>
                <p className="text-xs text-[#1B2838] font-medium">{article.author}</p>
                <p className="text-[10px] text-[#1B2838]/30">AASOTU Media Group</p>
              </div>
            </div>
            <span className="text-[10px] text-[#1B2838]/25 hidden md:inline">|</span>
            <span className="flex items-center gap-1 text-[10px] text-[#1B2838]/30">
              <Calendar size={10} /> {new Date(article.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="text-[10px] text-[#1B2838]/25 hidden md:inline">|</span>
            <span className="flex items-center gap-1 text-[10px] text-[#1B2838]/30">
              <Clock size={10} /> {article.readTime} read
            </span>
            <span className="text-[10px] text-[#1B2838]/25 hidden md:inline">|</span>
            <span className="flex items-center gap-1 text-[10px] text-[#1B2838]/30">
              <Eye size={10} /> {Math.floor(Math.random() * 5000 + 1000).toLocaleString()} views
            </span>
          </div>

          {/* Article Body */}
          <div className="space-y-5 mb-10">
            <p className="text-base md:text-lg text-[#1B2838]/70 leading-relaxed font-serif italic border-l-3 border-[#FF9500] pl-4">
              {article.excerpt}
            </p>
            {article.body.map((paragraph, i) => (
              <p
                key={i}
                className="text-sm md:text-base text-[#1B2838]/80 leading-[1.7]"
                dangerouslySetInnerHTML={{
                  __html: paragraph
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#1B2838] font-semibold">$1</strong>')
                    .replace(/\n\n/g, '</p><p class="text-sm md:text-base text-[#1B2838]/80 leading-[1.7] mt-4">')
                }}
              />
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8 pb-6 border-b border-[rgba(0,0,0,0.08)]">
            {article.tags.map(tag => (
              <span key={tag} className="flex items-center gap-1 text-[10px] text-[#1B2838]/40 bg-[rgba(0,0,0,0.03)] border border-[rgba(0,0,0,0.06)] rounded-full px-3 py-1">
                <Hash size={8} /> {tag}
              </span>
            ))}
          </div>

          {/* Source */}
          {article.sourceUrl && (
            <div className="mb-8 p-4 bg-[rgba(255,149,0,0.03)] rounded-xl border border-[rgba(255,149,0,0.1)]">
              <p className="text-[10px] text-[#1B2838]/30 uppercase tracking-wider mb-1">Original Source</p>
              <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-[#FF9500] hover:underline flex items-center gap-1">
                {article.source} <ExternalLink size={10} />
              </a>
            </div>
          )}

          {/* Author Box */}
          <div className="flex items-start gap-4 p-5 bg-white rounded-xl border border-[rgba(0,0,0,0.06)] mb-10">
            <div className="w-12 h-12 rounded-full bg-[#FF9500]/10 border-2 border-[#FF9500]/20 flex items-center justify-center shrink-0">
              <User size={20} className="text-[#FF9500]" />
            </div>
            <div>
              <p className="text-sm text-[#1B2838] font-medium mb-1">{article.author}</p>
              <p className="text-xs text-[#1B2838]/40 leading-relaxed">
                {article.author === 'Ronald Lee King'
                  ? "Founder of AASOTU Media Group LLC. Author of 'The African American State of the Union: From the Loins of the Beast.' Building platforms for truth, heritage, and justice."
                  : "AASOTU Wire is the investigative news division of AASOTU Media Group LLC, delivering unfiltered coverage of Indigenous rights, civil rights, and community advocacy."
                }
              </p>
            </div>
          </div>

          {/* Related Articles */}
          {related.length > 0 && (
            <div className="mb-10">
              <h3 className="text-xs uppercase tracking-[0.12em] text-[#1B2838]/40 font-semibold mb-4 flex items-center gap-2">
                <ChevronRight size={14} className="text-[#FF9500]" /> Related Stories
              </h3>
              <div className="space-y-3">
                {related.map(r => <RelatedCard key={r.slug} article={r} />)}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Footer CTA */}
      <div className="bg-[#0A0F1A] py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.15em] text-[#FF9500] mb-3">AASOTU Media Group LLC</p>
          <h2 className="text-2xl md:text-3xl text-[#F0EBE1] font-medium mb-3 tracking-tight">
            The Truth Doesn't Stop Here
          </h2>
          <p className="text-sm text-[#C9B99A]/50 mb-6 max-w-lg mx-auto">
            Explore more stories, research your heritage, and join the movement.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/#news" className="inline-flex items-center gap-2 text-xs text-[#FF9500] bg-[rgba(255,149,0,0.1)] border border-[rgba(255,149,0,0.25)] rounded-lg px-5 py-2.5 hover:bg-[rgba(255,149,0,0.2)] transition-all">
              More Stories <ArrowLeft size={12} className="rotate-180" />
            </Link>
            <Link to="/pre-order" className="inline-flex items-center gap-2 text-xs text-[#C9B99A] border border-[rgba(201,185,154,0.15)] rounded-lg px-5 py-2.5 hover:border-[rgba(255,149,0,0.3)] hover:text-[#FF9500] transition-all">
              Pre-Order the Book
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
