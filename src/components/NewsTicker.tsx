import Marquee from 'react-fast-marquee'
import { Zap } from 'lucide-react'
import { trpc } from '@/providers/trpc'

const FALLBACK_HEADLINES = [
  '#TheKingsTake — The African American State of the Union',
  'From the Loins of the Beast — Pre-order the book now',
  'Advocacy. Truth. Justice. — AASOTU Media Group',
  'We Were Here Before Anybody — 225+ Nations Documented',
  'The People\u2019s Voice — News and commentary from Ronald Lee King',
]

/**
 * Breaking-news ticker. Headlines come from the latest feed posts that carry
 * a link (your news shares) — fall back to brand lines until then.
 */
export default function NewsTicker() {
  const { data } = trpc.feed.list.useQuery({ limit: 15, offset: 0 }, { staleTime: 60000 })

  const headlines = (data?.posts ?? [])
    .filter((p: any) => p.linkUrl)
    .map((p: any) => ({ text: (p.linkTitle as string) || (p.body as string).slice(0, 90), url: p.linkUrl as string }))

  const items: Array<{ text: string; url: string | null }> =
    headlines.length > 0 ? headlines : FALLBACK_HEADLINES.map((t) => ({ text: t, url: null }))

  return (
    <div className="relative h-11 flex items-center overflow-hidden border-b border-[rgba(255,149,0,0.35)] bg-[#101C29]/85 backdrop-blur-sm">
      {/* BREAKING flag with pulse */}
      <div className="relative z-20 h-full flex items-center gap-2 px-4 shrink-0 bg-gradient-to-r from-red-600 to-red-500">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
        </span>
        <Zap size={13} className="text-white" fill="white" />
        <span className="text-[11px] font-black uppercase tracking-[0.25em] text-white">Breaking</span>
        {/* slanted edge */}
        <div className="absolute right-0 top-0 bottom-0 translate-x-full w-0 border-y-[22px] border-y-transparent border-l-[14px] border-l-red-500" />
      </div>

      <Marquee speed={60} gradient={false} pauseOnHover className="relative z-10">
        {items.map((item, i) => (
          <span key={i} className="flex items-center mx-8">
            {item.url ? (
              <a href={item.url} target="_blank" rel="noopener noreferrer"
                className="text-xs uppercase tracking-[0.1em] text-[#E8DCC4] hover:text-[#FFB840] whitespace-nowrap transition-colors">
                {item.text}
              </a>
            ) : (
              <span className="text-xs uppercase tracking-[0.1em] text-[#E8DCC4] whitespace-nowrap">{item.text}</span>
            )}
            <span className="ml-16 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rotate-45 bg-[#FF9500]" />
            </span>
          </span>
        ))}
      </Marquee>
    </div>
  )
}
