import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { trpc } from '@/providers/trpc'

export default function ProtectedAdminRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  
  // Check localStorage once on mount — stable across renders
  const [hasToken] = useState(() => {
    return typeof window !== 'undefined' && !!localStorage.getItem('adminToken')
  })

  const { data: passwordSession, isLoading: passwordSessionLoading } = trpc.auth.adminSession.useQuery(undefined, {
    retry: false,
    enabled: hasToken,
  })

  // Only query OAuth if no password token is stored.
  const { data: user, isLoading } = trpc.auth.me.useQuery(undefined, {
    staleTime: 1000 * 60 * 5,
    retry: false,
    enabled: !hasToken,
  })

  const isLoadingAuth = hasToken ? passwordSessionLoading : isLoading
  const isAdmin = (hasToken && passwordSession?.valid === true) || user?.role === 'admin'

  useEffect(() => {
    if (hasToken && passwordSession?.valid === false) {
      localStorage.removeItem('adminToken')
    }
    if (!isAdmin && !isLoadingAuth) {
      navigate('/admin/login', { replace: true })
    }
  }, [hasToken, isAdmin, isLoadingAuth, navigate, passwordSession?.valid])

  // OAuth-only users: show spinner while checking
  if (isLoadingAuth) {
    return (
      <div className="min-h-screen bg-[#182635] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#FF9500] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!isAdmin) return null

  return <>{children}</>
}
