import { useState } from 'react'
import { useWorld } from './WorldManager'
import { useEnvironment } from '../environment/EnvironmentManager'

export default function GardenOverlay() {
  const { loaded, quality } = useWorld()
  const { timeOfDay, cycleTime } = useEnvironment()
  const [showControls, setShowControls] = useState(true)

  if (!loaded) return null

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      {/* Top info bar */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-auto">
        <div className="bg-[rgba(10,15,26,0.7)] backdrop-blur-sm border border-[rgba(255,149,0,0.15)] rounded-lg px-4 py-2">
          <p className="text-[10px] text-[#FF9500] uppercase tracking-wider">The Ancestor Realm</p>
          <p className="text-xs text-[#C9B99A]">{timeOfDay.name} — {quality.tier} quality</p>
        </div>
        <button
          onClick={() => setShowControls(!showControls)}
          className="bg-[rgba(10,15,26,0.7)] backdrop-blur-sm border border-[rgba(255,149,0,0.15)] rounded-lg px-3 py-2 text-[10px] text-[#C9B99A] hover:text-[#FF9500] transition-colors"
        >
          {showControls ? 'Hide' : 'Show'} Controls
        </button>
      </div>

      {/* Bottom controls */}
      {showControls && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 pointer-events-auto">
          <button
            onClick={cycleTime}
            className="bg-[rgba(10,15,26,0.7)] backdrop-blur-sm border border-[rgba(255,149,0,0.2)] rounded-lg px-4 py-2 text-xs text-[#FF9500] hover:bg-[rgba(255,149,0,0.1)] transition-colors"
          >
            Cycle Time: {timeOfDay.name}
          </button>
        </div>
      )}

      {/* Welcome text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
        <h1 className="text-3xl md:text-5xl text-[#F0EBE1] font-medium tracking-wider text-shadow-hero opacity-80">
          The Ancestor Realm
        </h1>
        <p className="text-sm text-[#C9B99A] mt-2 opacity-60">
          Walk among those who came before
        </p>
      </div>
    </div>
  )
}
