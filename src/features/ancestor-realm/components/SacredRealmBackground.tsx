import { useState, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  /** When true, adds an extra left-side dark gradient for text readability */
  leftGradient?: boolean
  /** When true, center content both axes. When false, content flows naturally */
  centerContent?: boolean
}

/**
 * Shared sacred garden background used across ALL Ancestor Realm pages.
 * Ensures one continuous visual world — landing, constellation, registry,
 * experience pages, and future features all share the same sacred ground.
 */
export default function SacredRealmBackground({
  children,
  className = '',
  leftGradient = true,
  centerContent = true,
}: Props) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={`relative min-h-screen w-full overflow-hidden bg-[#060a12] ${className}`}>
      {/* ═══════ Sacred Garden Background ═══════ */}
      <div className="absolute inset-0">
        <img
          src="/images/ancestor-realm-bg.jpg"
          alt=""
          className={`w-full h-full object-cover transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setLoaded(true)}
        />
        {!loaded && <div className="absolute inset-0 bg-[#0a0f1a]" />}
      </div>

      {/* ═══════ Atmospheric Overlays ═══════ */}

      {/* Top — ensures nav readability */}
      <div
        className="absolute inset-x-0 top-0 h-40 md:h-56 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(6,10,18,0.85) 0%, rgba(6,10,18,0.45) 55%, transparent 100%)',
        }}
      />

      {/* Bottom — ensures CTA readability */}
      <div
        className="absolute inset-x-0 bottom-0 h-52 md:h-72 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(6,10,18,0.92) 0%, rgba(6,10,18,0.55) 45%, transparent 100%)',
        }}
      />

      {/* Left — darkens tree trunk for left-aligned text */}
      {leftGradient && (
        <div
          className="absolute inset-y-0 left-0 w-[65%] md:w-[55%] pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, rgba(6,10,18,0.72) 0%, rgba(6,10,18,0.35) 60%, transparent 100%)',
          }}
        />
      )}

      {/* Right edge softening */}
      <div
        className="absolute inset-y-0 right-0 w-[20%] pointer-events-none"
        style={{
          background:
            'linear-gradient(to left, rgba(6,10,18,0.45) 0%, transparent 100%)',
        }}
      />

      {/* Vignette — cinematic edge darkening */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 150px 60px rgba(6,10,18,0.42)',
        }}
      />

      {/* Center soft haze for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 40%, rgba(6,10,18,0.15) 0%, transparent 55%)',
        }}
      />

      {/* ═══════ Content Layer ═══════ */}
      <div
        className={`relative z-10 min-h-screen ${
          centerContent ? 'flex flex-col items-center justify-center' : ''
        }`}
      >
        {children}
      </div>
    </div>
  )
}
