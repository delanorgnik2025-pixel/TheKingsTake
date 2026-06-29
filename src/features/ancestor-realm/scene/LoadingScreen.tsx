import { useWorld } from './WorldManager'
import { useProgress } from '@react-three/drei'

export default function LoadingScreen() {
  const { loaded, setLoaded } = useWorld()
  const { progress } = useProgress()

  if (loaded) return null

  return (
    <div className="fixed inset-0 z-[200] bg-[#0a0f1a] flex flex-col items-center justify-center">
      <div className="w-20 h-20 mb-8 relative">
        <div className="absolute inset-0 border-2 border-[rgba(255,149,0,0.15)] rounded-full" />
        <div className="absolute inset-0 border-2 border-transparent border-t-[#FF9500] rounded-full animate-spin" />
        <svg className="absolute inset-3 text-[#FF9500]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2L12 12L20 16" />
        </svg>
      </div>
      <p className="text-[#C9B99A] text-sm tracking-wider uppercase mb-4">The Ancestor Realm</p>
      <div className="w-64 h-1 bg-[rgba(255,149,0,0.1)] rounded-full overflow-hidden">
        <div className="h-full bg-[#FF9500] rounded-full transition-all duration-300" style={{ width: `${Math.min(progress, 100)}%` }} />
      </div>
      <p className="text-[#C9B99A]/50 text-xs mt-3">{Math.round(progress)}%</p>
    </div>
  )
}
