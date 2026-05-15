import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { trpc } from '@/providers/trpc'

export default function ProtectedAdminRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()

  // Check OAuth admin
  const { data: user, isLoading: oauthLoading } = trpc.auth.me.useQuery(undefined, {
    staleTime: 1000 * 60 * 5,
    retry: false,
  })

  // Check password admin token
  const adminToken = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null

  const isAdmin = user?.role === 'admin' || !!adminToken
  const isLoading = oauthLoading

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      navigate('/admin/login')
    }
  }, [isLoading, isAdmin, navigate])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0C1520] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#FF9500] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!isAdmin) {
    return null
  }

  return <>{children}</>
}
