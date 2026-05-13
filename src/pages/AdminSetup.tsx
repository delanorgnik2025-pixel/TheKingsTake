import { useState } from 'react'
import { Link } from 'react-router'
import { trpc } from '@/providers/trpc'
import { ArrowLeft, Crown, AlertTriangle, CheckCircle } from 'lucide-react'

export default function AdminSetup() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const makeAdmin = trpc.blog.makeMeAdmin.useMutation({
    onSuccess: (data) => {
      setStatus('success')
      setMessage(data.message)
    },
    onError: (err) => {
      setStatus('error')
      setMessage(err.message)
    },
  })

  const handleMakeAdmin = () => {
    setStatus('loading')
    makeAdmin.mutate()
  }

  return (
    <div className="min-h-screen bg-[#0C1520] relative">
      <div className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-[0.15]" style={{ backgroundImage: 'url(/images/bg-hero.jpg)' }} />
      <div className="fixed inset-0 bg-gradient-to-b from-[#0C1520]/95 via-[#0C1520]/90 to-[#0C1520]/95" />

      <div className="relative z-10">
        <div className="border-b border-white/[0.06]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-6 flex items-center gap-4">
            <Link to="/" className="text-[#C9B99A] hover:text-[#FF9500] transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <span className="text-xs tracking-[0.2em] text-[#FF9500] uppercase">#TheKingsTake</span>
          </div>
        </div>

        <div className="max-w-[640px] mx-auto px-6 py-16">
          <div className="text-center mb-10">
            <Crown className="w-12 h-12 text-[#FF9500] mx-auto mb-4" />
            <h1 className="text-3xl font-medium text-[#F0EBE1] mb-4" style={{ fontFamily: 'Newsreader, serif' }}>
              Admin Setup
            </h1>
            <p className="text-[#C9B99A]/70">
              This page grants you administrator access to your website. You must be logged in first.
            </p>
          </div>

          {status === 'success' && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 p-6 rounded mb-8 text-center">
              <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
              <p className="text-emerald-400 font-medium mb-2">{message}</p>
              <p className="text-sm text-[#C9B99A]/70">
                Refresh the page and the admin panel will now be accessible.
              </p>
              <Link
                to="/admin/blog"
                className="inline-flex items-center justify-center gap-2 h-12 px-8 bg-[#FF9500] text-[#0C1520] text-sm tracking-[0.05em] uppercase hover:bg-[#FF9500]/90 transition-colors mt-4"
              >
                Go to Blog Admin
              </Link>
            </div>
          )}

          {status === 'error' && (
            <div className="bg-red-500/10 border border-red-500/30 p-6 rounded mb-8">
              <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-3" />
              <p className="text-red-400 text-center">{message}</p>
              <p className="text-sm text-[#C9B99A]/70 text-center mt-2">
                Make sure you are logged in. Click "Sign in with Kimi" first.
              </p>
            </div>
          )}

          {status !== 'success' && (
            <div className="bg-white/[0.03] border border-white/[0.08] p-8">
              <h2 className="text-lg text-[#F0EBE1] mb-4" style={{ fontFamily: 'Newsreader, serif' }}>
                Steps to become admin:
              </h2>
              <ol className="space-y-3 mb-8">
                <li className="flex gap-3 text-sm text-[#C9B99A]">
                  <span className="text-[#FF9500] font-bold shrink-0">1.</span>
                  <span>Click "Sign in with Kimi" in the navigation bar and complete login.</span>
                </li>
                <li className="flex gap-3 text-sm text-[#C9B99A]">
                  <span className="text-[#FF9500] font-bold shrink-0">2.</span>
                  <span>Return to this page after logging in.</span>
                </li>
                <li className="flex gap-3 text-sm text-[#C9B99A]">
                  <span className="text-[#FF9500] font-bold shrink-0">3.</span>
                  <span>Click the button below to activate admin access.</span>
                </li>
                <li className="flex gap-3 text-sm text-[#C9B99A]">
                  <span className="text-[#FF9500] font-bold shrink-0">4.</span>
                  <span>Go to /admin/blog to start posting to your blog.</span>
                </li>
              </ol>

              <button
                onClick={handleMakeAdmin}
                disabled={status === 'loading'}
                className="w-full h-12 bg-[#FF9500] text-[#0C1520] font-medium text-sm tracking-[0.05em] uppercase hover:bg-[#FF9500]/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Crown size={16} />
                {status === 'loading' ? 'Activating...' : 'Make Me Admin'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
