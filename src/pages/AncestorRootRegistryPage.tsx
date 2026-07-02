import { useState } from 'react'
import { useNavigate } from 'react-router'
import { ArrowRight } from 'lucide-react'

export default function AncestorRootRegistryPage() {
  const navigate = useNavigate()
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative w-full" style={{ height: 'calc(100dvh - 64px)' }}>
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/ancestor-root-registry-entry.jpg"
          alt=""
          className={`w-full h-full object-cover object-center transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setLoaded(true)}
        />
        {!loaded && <div className="absolute inset-0 bg-[#05080e]" />}
      </div>

      {/* Left-side gradient for button readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, rgba(5,8,14,0.5) 0%, rgba(5,8,14,0.15) 45%, transparent 70%)',
        }}
      />

      {/* Button — left side */}
      <div className="relative z-10 flex items-center h-full px-8 sm:px-14 lg:px-24">
        <button
          onClick={() => navigate('/ancestor-root-registry/start')}
          className="inline-flex items-center gap-3 bg-[rgba(255,149,0,0.2)] backdrop-blur-sm border border-[rgba(255,149,0,0.45)] text-[#FF9500] rounded-lg px-8 py-4 text-sm font-medium tracking-wide hover:bg-[rgba(255,149,0,0.32)] hover:border-[rgba(255,149,0,0.6)] transition-all duration-300 cursor-pointer"
        >
          BEGIN YOUR JOURNEY
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}
