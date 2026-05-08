import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { trpc } from '@/providers/trpc'
import ScrollReveal from '../components/ScrollReveal'
import { useMemo } from 'react'

// Static fallback posts — render immediately even if database is empty
const FALLBACK_POSTS = [
  { id: 1, slug: "upl-law-traps-black-families", title: "The UPL Law: How It Traps Black Families in the Justice System", excerpt: "The Unauthorized Practice of Law was designed to protect, but it's become a weapon against our communities.", category: "ADVOCACY", coverImage: "/images/blog-post-1.jpg", published: true, featured: true, content: "", createdAt: new Date("2025-01-15") },
  { id: 2, slug: "5-criminal-motions-to-know", title: "5 Criminal Motions Every Defendant Should Know About", excerpt: "Knowledge is power in the courtroom. These five motions can be the difference between conviction and dismissal.", category: "LEGAL", coverImage: "/images/blog-post-2.jpg", published: true, featured: false, content: "", createdAt: new Date("2025-02-01") },
  { id: 3, slug: "building-networks-protect-our-own", title: "Building Networks: Why We Must Connect to Protect Our Own", excerpt: "The system works against us when we're divided. Here's why community networks are our strongest defense.", category: "COMMUNITY", coverImage: "/images/blog-post-3.jpg", published: true, featured: false, content: "", createdAt: new Date("2025-02-20") },
  { id: 4, slug: "from-the-loins-of-the-beast", title: "From the Loins of the Beast: My Journey to #TheKingsTake", excerpt: "How writing 'The African American State of the Union' transformed my understanding of our struggle.", category: "VOICE", coverImage: "/images/blog-post-4.jpg", published: true, featured: false, content: "", createdAt: new Date("2025-03-01") },
  { id: 5, slug: "know-your-rights-police-encounters", title: "Know Your Rights: What to Do During a Police Encounter", excerpt: "Your constitutional rights don't disappear when a police officer approaches you. Here's exactly what to say and what not to say.", category: "LEGAL", coverImage: "/images/blog-post-2.jpg", published: true, featured: true, content: "", createdAt: new Date("2025-03-15") },
];

export default function BlogPreviewSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showHint, setShowHint] = useState(true)
  const { data: apiPosts } = trpc.blog.list.useQuery({ limit: 10 })

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const handleScroll = () => { if (el.scrollLeft > 10) setShowHint(false) }
    el.addEventListener('scroll', handleScroll, { passive: true })
    return () => el.removeEventListener('scroll', handleScroll)
  }, [])

  // Use API data if available, otherwise show static fallback content
  const displayPosts = useMemo(() => {
    const posts = apiPosts && apiPosts.length > 0 ? apiPosts : FALLBACK_POSTS;
    return posts.slice(0, 6);
  }, [apiPosts]);

  return (
    <section id="blog" className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/bg-blog.jpg)' }} />
      <div className="absolute inset-0 bg-[#1B2838]/80" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.08em] text-[#C9B99A] mb-12">FROM THE BLOG</p>
        </ScrollReveal>

        <div className="flex items-end justify-between mb-12">
          <ScrollReveal delay={0.15}>
            <h2 className="text-4xl md:text-5xl lg:text-[56px] text-[#F0EBE1] tracking-[-0.02em] leading-[1.08] text-shadow-hero">
              Latest Takes & Insights
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.3} className="hidden md:block">
            <Link to="/blog" className="flex items-center gap-2 text-sm text-[#FF9500] hover:underline transition-all">
              View All Posts <ArrowRight size={16} />
            </Link>
          </ScrollReveal>
        </div>

        <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#FF9500 #2A3A4A', cursor: 'grab' }}>
          {displayPosts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex-shrink-0 w-[280px] md:w-[320px] snap-start group"
            >
              <Link to={`/blog/${post.slug}`} className="block">
                <div className="rounded-t-lg overflow-hidden">
                  <img src={post.coverImage ?? '/images/blog-post-1.jpg'} alt={post.title}
                    className="w-full h-[180px] md:h-[200px] object-cover group-hover:scale-105 transition-transform duration-600"
                    draggable={false} />
                </div>
                <div className="bg-[rgba(27,40,56,0.85)] backdrop-blur-lg rounded-b-lg p-6 border border-t-0 border-[rgba(255,149,0,0.15)]">
                  <p className="text-xs uppercase tracking-[0.08em] text-[#FF9500] mb-2">{post.category}</p>
                  <h3 className="text-lg text-[#F0EBE1] leading-snug mb-2 line-clamp-2 group-hover:text-[#FFB840] transition-colors">{post.title}</h3>
                  <p className="text-xs text-dimmed mb-3">
                    {post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : ''}
                  </p>
                  <span className="text-xs text-[#FF9500] flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read More <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-4">
          <motion.p initial={{ opacity: 1 }} animate={{ opacity: showHint ? 1 : 0 }} className="text-xs text-dimmed">
            Drag to explore &rarr;
          </motion.p>
          <Link to="/blog" className="md:hidden flex items-center gap-2 text-sm text-[#FF9500] hover:underline">
            View All Posts <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
