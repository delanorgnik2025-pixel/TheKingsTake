import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, Clock, Play, ExternalLink, Rss, Video, FileText } from 'lucide-react'
import { trpc } from '@/providers/trpc'
import ScrollReveal from './ScrollReveal'

// WordPress post type
interface WPPost {
  id: number
  title: { rendered: string }
  excerpt: { rendered: string }
  date: string
  slug: string
  featured_media?: number
  _embedded?: { 'wp:featuredmedia'?: [{ source_url: string }] }
  format?: 'standard' | 'video'
}

// Fetch WordPress posts
function useWordPressPosts(wpUrl?: string) {
  const [posts, setPosts] = useState<WPPost[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!wpUrl) return
    setLoading(true)
    fetch(`${wpUrl}/wp-json/wp/v2/posts?per_page=6&_embed=true`)
      .then(r => r.json())
      .then(data => { setPosts(Array.isArray(data) ? data : []) })
      .catch(() => setPosts([]))
      .finally(() => setLoading(false))
  }, [wpUrl])

  return { posts, loading }
}

// Static fallback posts
const FALLBACK_POSTS = [
  {
    id: 1, slug: "upl-law-traps-black-families",
    title: "The UPL Law: How It Traps Black Families in the Justice System",
    excerpt: "The Unauthorized Practice of Law was designed to protect, but it's become a weapon against our communities.",
    category: "ADVOCACY", coverImage: "/images/blog-post-1.jpg",
    createdAt: "2025-01-15", content: "",
    videoUrl: null
  },
  {
    id: 2, slug: "5-criminal-motions-to-know",
    title: "5 Criminal Motions Every Defendant Should Know About",
    excerpt: "Knowledge is power in the courtroom. These five motions can be the difference between conviction and dismissal.",
    category: "LEGAL", coverImage: "/images/blog-post-2.jpg",
    createdAt: "2025-02-01", content: "",
    videoUrl: null
  },
  {
    id: 3, slug: "building-networks-protect-our-own",
    title: "Building Networks: Why We Must Connect to Protect Our Own",
    excerpt: "The system works against us when we're divided. Here's why community networks are our strongest defense.",
    category: "COMMUNITY", coverImage: "/images/blog-post-3.jpg",
    createdAt: "2025-02-20", content: "",
    videoUrl: null
  },
  {
    id: 4, slug: "from-the-loins-of-the-beast",
    title: "From the Loins of the Beast: My Journey to #TheKingsTake",
    excerpt: "How writing 'The African American State of the Union' transformed my understanding of our struggle.",
    category: "VOICE", coverImage: "/images/blog-post-4.jpg",
    createdAt: "2025-03-01", content: "",
    videoUrl: null
  },
]

interface Props {
  wordPressUrl?: string
  title?: string
  subtitle?: string
}

export default function BlogFeed({ wordPressUrl, title, subtitle }: Props) {
  const { data: apiPosts } = trpc.blog.list.useQuery({ limit: 6 })
  const { posts: wpPosts, loading: wpLoading } = useWordPressPosts(wordPressUrl)

  // Prioritize WordPress posts if configured, then API, then fallback
  const posts = wordPressUrl
    ? wpPosts.map(p => ({
        id: p.id,
        slug: p.slug,
        title: p.title.rendered.replace(/<[^>]+>/g, ''),
        excerpt: p.excerpt.rendered.replace(/<[^>]+>/g, '').slice(0, 120) + '...',
        category: 'BLOG',
        coverImage: p._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? '/images/blog-post-1.jpg',
        createdAt: p.date,
        content: '',
        videoUrl: null,
      }))
    : (apiPosts && apiPosts.length > 0 ? apiPosts : FALLBACK_POSTS)

  const sectionTitle = title ?? "Fresh From #TheKingsTake"
  const sectionSubtitle = subtitle ?? "Real talk. Real history. Real advocacy. Updated regularly."

  return (
    <section id="blog-feed" className="relative py-16 md:py-24 px-6 md:px-12 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <ScrollReveal>
              <p className="text-[10px] uppercase tracking-[0.12em] text-[#FF9500] mb-2">
                <Rss size={10} className="inline mr-1.5" />
                Live Feed
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="text-2xl md:text-3xl text-[#F0EBE1] font-medium leading-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                {sectionTitle}
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <p className="text-sm text-[#C9B99A]/60 mt-1 max-w-md">{sectionSubtitle}</p>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={0.2} className="hidden md:block">
            <Link to="/blog" className="flex items-center gap-1.5 text-xs text-[#FF9500] hover:underline transition-all">
              View All <ArrowRight size={12} />
            </Link>
          </ScrollReveal>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts.slice(0, 4).map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <Link to={`/blog/${post.slug}`} className="group flex gap-4 bg-[rgba(27,40,56,0.4)] border border-[rgba(255,149,0,0.08)] hover:border-[rgba(255,149,0,0.25)] rounded-xl p-4 transition-all">
                {/* Thumbnail */}
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-lg overflow-hidden shrink-0 bg-[#0A0F1A]">
                  <img
                    src={post.coverImage ?? '/images/blog-post-1.jpg'}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[9px] uppercase tracking-wider text-[#FF9500] bg-[rgba(255,149,0,0.08)] rounded px-1.5 py-0.5">
                      {post.category ?? 'BLOG'}
                    </span>
                    <span className="text-[9px] text-[#C9B99A]/30 flex items-center gap-1">
                      <Calendar size={8} />
                      {post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''}
                    </span>
                  </div>
                  <h3 className="text-sm text-[#F0EBE1] leading-snug mb-1.5 line-clamp-2 group-hover:text-[#FFB840] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-[11px] text-[#C9B99A]/40 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* WordPress integration note */}
        {wordPressUrl && (
          <div className="mt-4 flex items-center gap-2 text-[10px] text-[#C9B99A]/30">
            <ExternalLink size={9} />
            <span>Synced from WordPress — updates automatically</span>
          </div>
        )}

        {/* Mobile View All */}
        <div className="md:hidden mt-6 text-center">
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-xs text-[#FF9500]">
            View All Posts <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </section>
  )
}
