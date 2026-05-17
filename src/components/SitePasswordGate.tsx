import { useState, useEffect } from 'react'
import { Crown, Lock } from 'lucide-react'

const SITE_PASSWORD = 'THEKING2025!'

export default function SitePasswordGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const stored = sessionStorage.getItem('siteUnlocked')
    if (stored === 'true') {
      setUnlocked(true)
    }
    setChecking(false)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (password === SITE_PASSWORD) {
      sessionStorage.setItem('siteUnlocked', 'true')
      setUnlocked(true)
    } else {
      setError('Incorrect password. Access denied.')
    }
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-[#0C1520] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#FF9500] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (unlocked) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-[#0C1520] relative flex items-center justify-center px-6">
      {/* Background */}
      <div className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-[0.12]" style={{ backgroundImage: 'url(/images/bg-hero.jpg)' }} />
      <div className="fixed inset-0 bg-gradient-to-b from-[#0C1520]/95 via-[#0C1520]/90 to-[#0C1520]/95" />

      <div className="relative z-10 w-full max-w-[380px]">
        <div className="text-center mb-8">
          <Crown className="w-12 h-12 text-[#FF9500] mx-auto mb-4" />
          <h1 className="text-3xl text-[#F0EBE1] font-medium tracking-tight mb-2" style={{ fontFamily: 'Newsreader, serif' }}>
            #TheKingsTake
          </h1>
          <p className="text-sm text-[#C9B99A]/70">AASOTU Media Group LLC</p>
        </div>

        <div className="bg-white/[0.03] border border-white/[0.08] p-6 rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <Lock size={16} className="text-[#FF9500]" />
            <h2 className="text-sm text-[#F0EBE1] font-medium uppercase tracking-[0.1em]">Password Required</h2>
          </div>
          <p className="text-sm text-[#C9B99A]/70 mb-5">
            This site is password protected. Enter the password to continue.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full h-12 bg-white/[0.03] border border-white/[0.08] text-[#F0EBE1] px-4 text-sm rounded focus:border-[#FF9500]/50 focus:outline-none"
              placeholder="Enter password"
              autoFocus
            />
            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}
            <button
              type="submit"
              className="w-full h-12 bg-[#FF9500] text-[#0C1520] font-medium text-sm tracking-[0.05em] uppercase rounded hover:bg-[#CC6A00] transition-colors"
            >
              Enter
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-[#C9B99A]/40 mt-6">
          Contact Ronald Lee King for access.
        </p>
      </div>
    </div>
  )
}
