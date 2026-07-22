// Shared background component for all Registry pages
// Uses the old-world study image for the landing, warm dark overlay for sub-pages

import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  variant?: 'landing' | 'subpage'
  className?: string
}

export default function RegistryBackground({ children, variant = 'subpage', className = '' }: Props) {
  if (variant === 'landing') {
    return (
      <div className={`relative min-h-screen overflow-x-hidden ${className}`}>
        {/* Full-bleed background image */}
        <div
          className="fixed inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/ancestor-root-registry-bg.jpg)' }}
        />
        {/* Subtle dark overlay for readability — warm tone matching the image */}
        <div
          className="fixed inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(15,10,5,0.35) 0%, rgba(15,10,5,0.55) 50%, rgba(15,10,5,0.75) 100%)' }}
        />
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    )
  }

  // Subpage variant — warm dark with subtle texture, no full image
  return (
    <div
      className={`relative min-h-screen overflow-x-hidden ${className}`}
      style={{ background: '#0d0805' }}
    >
      {/* Subtle warm vignette overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(60,40,15,0.25) 0%, transparent 60%)',
        }}
      />
      {/* Very subtle warm grain texture */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
        }}
      />
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
