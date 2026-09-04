import { Link } from 'react-router'
import { Crown, ArrowRight, Radio } from 'lucide-react'
import MuxPlayer from '@mux/mux-player-react'
import { trpc } from '@/providers/trpc'
import ScrollReveal from '@/components/ScrollReveal'

function timeAgo(date: Date | string): string {
  const d = new Date(date)
  const s = Math.floor((Date.now() - d.getTime()) / 1000)
  if (s < 3600) return `${Math.max(1, Math.floor(s / 60))}m ago`
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

/**
 * Landing-page preview of The Feed — sits right after the book promo.
 * Shows the live broadcast when one is active, else the three latest posts.
 */
export default function FeedSection() {
  const { data } = trpc.feed.list.useQuery({ limit: 3, offset: 0 }, { staleTime: 60000 })
  const liveStatus = trpc.live.status.useQuery(undefined, { refetchInterval: 20000, staleTime: 15000 })

  const posts = (data?.posts ?? []) as any[]
  const isLive = liveStatus.data?.live && liveStatus.data.playbackId

  return (
    <section className="relative py-20 px-6 md:px-12" id="feed">
      <div className="max-w-[1200px] mx-auto">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[#FF9500] text-xs uppercase tracking-[0.25em] mb-3">#TheKingsTake</p>
              <h2 className="text-4xl md:text-5xl text-[#F0EBE1]" style={{ fontFamily: 'Newsreader, serif' }}>
                The Feed
              </h2>
              <p className="text-[#C9B99A] mt-3 max-w-xl">
                News, commentary, and live broadcasts — straight from the source, no algorithm in between.
              </p>
            </div>
            <Link to="/feed" className="hidden md:flex items-center gap-2 text-[#FFB840] text-sm uppercase tracking-[0.15em] hover:text-[#FF9500] transition-colors shrink-0">
              Open the feed <ArrowRight size={15} />
            </Link>
          </div>
        </ScrollReveal>

        {isLive && (
          <ScrollReveal>
            <div className="mb-8 rounded-lg overflow-hidden border border-[rgba(255,60,60,0.4)] bg-[#25364B]" style={{ boxShadow: '0 0 50px rgba(255,60,60,0.12)' }}>
              <div className="flex items-center gap-2 px-4 py-2.5 bg-[rgba(255,60,60,0.1)]">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                </span>
                <span className="text-red-400 text-xs font-bold uppercase tracking-[0.2em]">Live Now</span>
                <span className="text-[#F0EBE1] text-sm truncate">{liveStatus.data!.title}</span>
              </div>
              <MuxPlayer playbackId={liveStatus.data!.playbackId!} streamType="live" autoPlay="muted" accentColor="#FF9500" style={{ width: '100%', aspectRatio: '16/9' }} />
            </div>
          </ScrollReveal>
        )}

        <div className="grid md:grid-cols-3 gap-5">
          {posts.length === 0 && (
            <div className="md:col-span-3 text-center py-14 border border-dashed border-[rgba(255,149,0,0.25)] rounded-lg">
              <Crown className="mx-auto text-[#FF9500] mb-3" size={28} />
              <p className="text-[#F0EBE1]" style={{ fontFamily: 'Newsreader, serif' }}>The first dispatch is coming.</p>
              <p className="text-[#C9B99A] text-sm mt-1">Follow #TheKingsTake — the feed opens soon.</p>
            </div>
          )}
          {posts.map((post) => (
            <ScrollReveal key={post.id}>
              <Link to="/feed" className="block h-full rounded-lg border border-[rgba(255,149,0,0.18)] bg-[#25364B] p-5 hover:border-[rgba(255,149,0,0.5)] transition-colors group">
                <div className="flex items-center gap-2 mb-3">
                  <Crown size={14} className="text-[#FF9500]" />
                  <span className="text-[#C9B99A] text-[11px] uppercase tracking-[0.15em]">{timeAgo(post.createdAt)}</span>
                  {(post.videoUrl || post.muxPlaybackId) && <Radio size={12} className="text-[#FFB840] ml-auto" />}
                </div>
                <p className="text-[#F0EBE1] text-sm leading-relaxed line-clamp-4 group-hover:text-white transition-colors">{post.body}</p>
                {post.linkTitle && <p className="text-[#FFB840] text-xs mt-3 truncate">{post.linkTitle}</p>}
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <Link to="/feed" className="md:hidden mt-8 flex items-center justify-center gap-2 text-[#FFB840] text-sm uppercase tracking-[0.15em]">
          Open the feed <ArrowRight size={15} />
        </Link>
      </div>
    </section>
  )
}
