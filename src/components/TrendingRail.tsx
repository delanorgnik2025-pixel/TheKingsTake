import { Link } from 'react-router'
import { Flame, Heart, ChevronRight } from 'lucide-react'
import { trpc } from '@/providers/trpc'

type FeedPost = {
  id: number
  body: string
  linkUrl: string | null
  linkTitle: string | null
  likesCount: number
}

/**
 * "Trending Now" rail — ranks your own feed posts by likes and shows the
 * top five as a horizontal scroll of branded cards.
 */
export default function TrendingRail() {
  const { data } = trpc.feed.list.useQuery({ limit: 25, offset: 0 }, { staleTime: 30000 })

  const trending: FeedPost[] = [...(((data?.posts as unknown as FeedPost[]) ?? []))]
    .sort((a, b) => (b.likesCount ?? 0) - (a.likesCount ?? 0))
    .slice(0, 5)

  if (trending.length === 0) return null

  return (
    <section className="max-w-5xl mx-auto px-4 mb-10">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Flame size={16} className="text-[#FF9500]" />
          <h2 className="text-[#F0EBE1] text-sm font-bold uppercase tracking-[0.25em]" style={{ fontFamily: 'Newsreader, serif' }}>
            Trending Now
          </h2>
        </div>
        <span className="text-[#C9B99A] text-[10px] uppercase tracking-[0.2em] hidden sm:block">Ranked by the people's likes</span>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 feed-trend-scroll" style={{ scrollbarWidth: 'thin' }}>
        {trending.map((post, i) => (
          <article
            key={post.id}
            className="relative shrink-0 w-64 rounded-lg border border-[rgba(255,149,0,0.22)] p-4 overflow-hidden group hover:border-[rgba(255,149,0,0.55)] transition-colors"
            style={{
              background: 'linear-gradient(160deg, rgba(37,54,75,0.92), rgba(24,38,53,0.95))',
              backdropFilter: 'blur(4px)',
            }}
          >
            {/* rank watermark */}
            <span
              className="absolute -top-3 -right-1 text-[88px] font-black leading-none select-none"
              style={{ fontFamily: 'Newsreader, serif', color: 'rgba(255,149,0,0.10)' }}
            >
              {i + 1}
            </span>
            <div className="flex items-center gap-2 mb-2">
              <span className="flex items-center justify-center w-6 h-6 rounded bg-[#FF9500] text-[#182635] text-xs font-black">
                {i + 1}
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#FF9500] font-bold">Trending</span>
            </div>
            <p className="text-[#F0EBE1] text-sm leading-snug line-clamp-3 min-h-[3.4rem]">
              {post.linkTitle || post.body.slice(0, 110)}
            </p>
            <div className="mt-3 flex items-center justify-between">
              <span className="flex items-center gap-1 text-[#C9B99A] text-xs">
                <Heart size={12} className="text-[#FF9500]" fill="#FF9500" /> {post.likesCount}
              </span>
              {post.linkUrl ? (
                <a href={post.linkUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-0.5 text-[#FFB840] text-[11px] uppercase tracking-[0.12em] group-hover:text-[#FF9500] transition-colors">
                  Read <ChevronRight size={12} />
                </a>
              ) : (
                <Link to="/feed" className="flex items-center gap-0.5 text-[#FFB840] text-[11px] uppercase tracking-[0.12em] group-hover:text-[#FF9500] transition-colors">
                  View <ChevronRight size={12} />
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
