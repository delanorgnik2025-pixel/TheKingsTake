import { useState } from 'react'
import { useNavigate } from 'react-router'
import { trpc } from '@/providers/trpc'
import { LogIn, Crown, AlertTriangle, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const login = trpc.auth.adminLogin.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        localStorage.setItem('adminToken', data.token)
        navigate('/admin/blog')
        window.location.reload()
      }
    },
    onError: (err) => {
      setError(err.message)
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    login.mutate({ password })
  }

  return (
    <div className="min-h-screen bg-[#0C1520]">
      <div className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-[0.15]" style={{ backgroundImage: 'url(/images/bg-hero.jpg)' }} />
      <div className="fixed inset-0 bg-gradient-to-b from-[#0C1520]/95 via-[#0C1520]/90 to-[#0C1520]/95" />

      <div className="relative z-10">
        <div className="border-b border-white/[0.06]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-6 flex items-center gap-4">
            <Link to="/" className="text-[#C9B99A] hover:text-[#FF9500] transition-colors"><ArrowLeft size={20} /></Link>
            <span className="text-xs tracking-[0.2em] text-[#FF9500] uppercase">#TheKingsTake</span>
          </div>
        </div>

        <div className="max-w-[400px] mx-auto px-6 py-16">
          <div className="text-center mb-10">
            <Crown className="w-12 h-12 text-[#FF9500] mx-auto mb-4" />
            <h1 className="text-2xl font-medium text-[#F0EBE1] mb-2" style={{ fontFamily: 'Newsreader, serif' }}>Admin Access</h1>
            <p className="text-sm text-[#C9B99A]/60">Enter your admin password to access the blog dashboard.</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 p-3 text-red-400 text-sm rounded mb-6 flex items-center gap-2">
              <AlertTriangle size={16} /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs tracking-[0.15em] text-[#C9B99A]/60 uppercase mb-2">Admin Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full h-12 bg-white/[0.03] border border-white/[0.08] text-[#F0EBE1] px-4 text-sm focus:border-[#FF9500]/50 focus:outline-none rounded"
                placeholder="Enter admin password"
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={login.isPending || !password}
              className="w-full h-12 bg-[#FF9500] text-[#0C1520] font-medium text-sm tracking-[0.05em] uppercase hover:bg-[#FF9500]/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 rounded"
            >
              <LogIn size={16} />
              {login.isPending ? 'Verifying...' : 'Access Admin Panel'}
            </button>
          </form>

          <p className="text-center text-xs text-[#C9B99A]/40 mt-6">
            Forgot password? Contact Ronald Lee King directly.
          </p>
        </div>
      </div>
    </div>
  )
}
