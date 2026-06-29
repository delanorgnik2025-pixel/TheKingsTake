import { useState } from 'react'
import { useWorld } from './WorldManager'

export default function GardenOverlay() {
  const { loaded, quality } = useWorld()
  const [showControls, setShowControls] = useState(true)

  if (!loaded) return null

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      {/* Top info bar */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-auto">
        <div className="bg-[rgba(10,15,26,0.7)] backdrop-blur-sm border border-[rgba(255,149,0,0.15)] rounded-lg px-4 py-2">
          <p className="text-[10px] text-[#FF9500] uppercase tracking-wider">The Ancestor Realm</p>
          <p className="text-xs text-[#C9B99A]">{quality.tier} quality — tap and drag to look around</p>
        </div>
        <button
          onClick={() => setShowControls(!showControls)}
          className="bg-[rgba(10,15,26,0.7)] backdrop-blur-sm border border-[rgba(255,149,0,0.15)] rounded-lg px-3 py-2 text-[10px] text-[#C9B99A] hover:text-[#FF9500] transition-colors"
        >
          {showControls ? 'Hide' : 'Show'}
        </button>
      </div>

      {/* Bottom hint */}
      {showControls && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-auto">
          <p className="text-[10px] text-[#C9B99A]/50 bg-[rgba(10,15,26,0.5)] rounded-full px-4 py-1.5 backdrop-blur-sm">
            The camera moves on its own — relax and watch
          </p>
        </div>
      )}

      {/* Title */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
        <h1 className="text-2xl md:text-4xl text-[#F0EBE1] font-medium tracking-wider opacity-0 animate-[fadeIn_3s_ease-in_forwards]"
            style={{ animationDelay: '1s' }}>
          The Sacred Garden
        </h1>
        <p className="text-xs text-[#C9B99A] mt-2 opacity-0 animate-[fadeIn_3s_ease-in_forwards]"
           style={{ animationDelay: '2s' }}>
          Your ancestors walk here
        </p>
      </div>
    </div>
  )
}
