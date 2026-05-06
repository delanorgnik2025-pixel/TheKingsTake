import Marquee from 'react-fast-marquee'

interface MarqueeDividerProps {
  text: string
}

export default function MarqueeDivider({ text }: MarqueeDividerProps) {
  return (
    <div className="relative h-12 border-y border-[rgba(255,149,0,0.3)] flex items-center overflow-hidden">
      {/* Dark background for readability */}
      <div className="absolute inset-0 bg-[#1B2838]/90" />
      <Marquee speed={80} gradient={false} className="overflow-hidden relative z-10">
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i} className="flex items-center gap-20 mx-10">
            <span className="text-sm uppercase tracking-[0.08em] text-[#C9B99A] whitespace-nowrap">
              {text}
            </span>
            <span className="w-1 h-1 rounded-full bg-[#FF9500]" />
          </span>
        ))}
      </Marquee>
    </div>
  )
}
