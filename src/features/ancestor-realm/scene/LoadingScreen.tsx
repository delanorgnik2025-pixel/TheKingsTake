import { useWorld } from './WorldManager'

export default function LoadingScreen() {
  const { loaded } = useWorld()

  if (loaded) return null

  return (
    <div className="fixed inset-0 z-[200] bg-[#0a0f1a] flex flex-col items-center justify-center transition-opacity duration-1000">
      <div className="w-20 h-20 mx-auto mb-8 relative">
        <div className="absolute inset-0 border border-[rgba(255,149,0,0.2)] rotate-45" />
        <div className="absolute inset-2 border border-[rgba(255,149,0,0.3)] rotate-12" />
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-8 h-8 text-[#FF9500] animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2L12 12L20 16" />
          </svg>
        </div>
      </div>
      <p className="text-[#C9B99A] text-sm tracking-wider uppercase mb-4">The Ancestor Realm</p>
      <p className="text-[#C9B99A]/40 text-xs">The ancestors are preparing your path...</p>
    </div>
  )
}
