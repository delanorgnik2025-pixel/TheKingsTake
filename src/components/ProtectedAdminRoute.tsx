import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import { trpc } from '@/providers/trpc'

export default function ProtectedAdminRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  
  // Check localStorage once on mount — stable across renders
  const [hasToken] = useState(() => {
    return typeof window !== 'undefined' && !!localStorage.getItem('adminToken')
  })

  // Only query OAuth if NO password token (saves API call for password users)
  const { data: user, isLoading } = trpc.auth.me.useQuery(undefined, {
    staleTime: 1000 * 60 * 5,
    retry: false,
    enabled: !hasToken,
  })

  const isAdmin = hasToken || user?.role === 'admin'

  useEffect(() => {
    if (!isAdmin && !isLoading) {
      navigate('/admin/login', { replace: true })
    }
  }, [isAdmin, isLoading, navigate])

  // Password users: render immediately, NO SPINNER
  if (hasToken) {
    return <>{children}</>
  }

  // OAuth-only users: show spinner while checking
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0C1520] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#FF9500] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!isAdmin) return null

  return <>{children}</>
}
