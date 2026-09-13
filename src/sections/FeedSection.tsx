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
    <section className="relative py-20 px-6 md:px-12 overflow-hidden" id="feed">
      {/* Rich layered background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F17] via-[#0F1725] to-[#0B0F17]" />
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF9500' fill-opacity='0.5'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21-1.79 4-4 4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6-2.686 6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6 0-2.21 1.79-4 4-4 3.314 0 6 2.686 6 6 0 2.21-1.79 4-4 4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4v2c0 2.21-1.79 4-4 4-3.314 0-6-2.686-6-6 0-2.21 1.79-4 4-4 3.314 0 6 2.686 6 6 0 2.21-1.79 4-4 4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21-1.79 4-4 4v2c0 2.21-1.79 4-4 4-3.314 0-6-2.686-6-6 0-2.21 1.79-4 4-4 3.314 0 6 2.686 6 6 0 2.21-1.79 4-4 4-3.314 0-6-2.686-6-6h2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'radial-gradient(ellipse at 20% 30%, rgba(255,149,0,0.12) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(255,149,0,0.08) 0%, transparent 50%)'
      }} />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF9500]/15 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF9500]/15 to-transparent" />
      <div className="max-w-[1200px] mx-auto relative">
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
