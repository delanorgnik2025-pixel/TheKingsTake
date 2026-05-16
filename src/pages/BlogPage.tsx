import { useState, useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router'

const WORDPRESS_URL = 'https://delanorgnik2025-asupk.wordpress.com'

export default function BlogPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-[#0C1520] flex flex-col">
      {/* Header bar */}
      <div className="bg-[#0C1520] border-b border-white/[0.06] px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-[#C9B99A] hover:text-[#FF9500] transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <span className="text-xs tracking-[0.2em] text-[#FF9500] uppercase">#TheKingsTake Blog</span>
        </div>
        <a 
          href={WORDPRESS_URL} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs text-[#C9B99A]/60 hover:text-[#FF9500] transition-colors"
        >
          Open in new tab
        </a>
      </div>

      {/* WordPress iframe */}
      <div className="flex-1 relative">
        {loading && (
          <div className="absolute inset-0 bg-[#0C1520] flex flex-col items-center justify-center z-10">
            <div className="w-8 h-8 border-2 border-[#FF9500] border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-[#C9B99A] text-sm">Loading blog...</p>
          </div>
        )}
        <iframe
          src={WORDPRESS_URL}
          className="w-full h-full border-0"
          style={{ minHeight: 'calc(100vh - 50px)' }}
          title="TheKingsTake Blog"
          onLoad={() => setLoading(false)}
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      </div>
    </div>
  )
}
