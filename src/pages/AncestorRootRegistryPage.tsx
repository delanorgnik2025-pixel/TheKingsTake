import { useNavigate } from 'react-router'
import { ArrowLeft } from 'lucide-react'

export default function AncestorRootRegistryPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#05080e] flex items-center justify-center px-6">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(255,149,0,0.04) 0%, transparent 60%)' }} />
      <div className="relative z-10 text-center max-w-sm">
        <h1
          className="text-2xl sm:text-3xl text-[#F0EBE1] mb-4"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Ancestor Root Registry
        </h1>
        <p className="text-sm text-[#C9B99A]/60 mb-8">
          The registry is being prepared.
        </p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-[#FF9500] border border-[rgba(255,149,0,0.3)] rounded-lg px-5 py-2.5 text-sm hover:bg-[rgba(255,149,0,0.12)] transition-all cursor-pointer"
        >
          <ArrowLeft size={14} /> Return Home
        </button>
      </div>
    </div>
  )
}
