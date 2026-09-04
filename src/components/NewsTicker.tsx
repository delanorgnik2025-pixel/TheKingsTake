import Marquee from 'react-fast-marquee'
import { Radio } from 'lucide-react'
import { trpc } from '@/providers/trpc'

const FALLBACK_HEADLINES = [
  '#TheKingsTake — The African American State of the Union',
  'From the Loins of the Beast — Pre-order the book now',
  'Advocacy. Truth. Justice. — AASOTU Media Group',
  'We Were Here Before Anybody — 225+ Nations Documented',
  'The People\u2019s Voice — News and commentary from Ronald Lee King',
]

/**
 * Scrolling news ticker. Headlines come from the latest feed posts that carry
 * a link (your news shares) — fall back to brand lines until the feed is live.
 */
export default function NewsTicker() {
  const { data } = trpc.feed.list.useQuery({ limit: 15, offset: 0 }, { staleTime: 60000 })

  const headlines = (data?.posts ?? [])
    .filter((p: any) => p.linkUrl)
    .map((p: any) => ({ text: (p.linkTitle as string) || (p.body as string).slice(0, 90), url: p.linkUrl as string }))

  const items: Array<{ text: string; url: string | null }> =
    headlines.length > 0 ? headlines : FALLBACK_HEADLINES.map((t) => ({ text: t, url: null }))

  return (
    <div className="relative h-10 bg-[#101C29] border-b border-[rgba(255,149,0,0.35)] flex items-center overflow-hidden">
      <div className="relative z-20 h-full flex items-center gap-1.5 px-4 bg-[#FF9500] text-[#182635] shrink-0">
        <Radio size={13} />
        <span className="text-[11px] font-bold uppercase tracking-[0.2em]">News</span>
      </div>
      <div className="absolute left-0 top-0 bottom-0 w-0 z-30 border-y-[20px] border-y-transparent border-l-[12px] border-l-[#FF9500] translate-x-full hidden" />
      <Marquee speed={55} gradient={false} pauseOnHover className="relative z-10">
        {items.map((item, i) => (
          <span key={i} className="flex items-center mx-8">
            {item.url ? (
              <a href={item.url} target="_blank" rel="noopener noreferrer"
                className="text-xs uppercase tracking-[0.08em] text-[#C9B99A] hover:text-[#FFB840] whitespace-nowrap transition-colors">
                {item.text}
              </a>
            ) : (
              <span className="text-xs uppercase tracking-[0.08em] text-[#C9B99A] whitespace-nowrap">{item.text}</span>
            )}
            <span className="w-1 h-1 rounded-full bg-[#FF9500] ml-16" />
          </span>
        ))}
      </Marquee>
    </div>
  )
}
