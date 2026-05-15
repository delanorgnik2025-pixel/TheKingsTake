import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { trpc } from '@/providers/trpc'

export default function ProtectedAdminRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()

  // Check password admin token FIRST — instant, no API call needed
  const adminToken = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null

  // Only check OAuth if no password token (avoids spinner for password users)
  const { data: user, isLoading } = trpc.auth.me.useQuery(undefined, {
    staleTime: 1000 * 60 * 5,
    retry: false,
    enabled: !adminToken, // Skip OAuth check if password token exists
  })

  const isAdmin = !!adminToken || user?.role === 'admin'

  useEffect(() => {
    if (!isAdmin && !isLoading) {
      navigate('/admin/login')
    }
  }, [isAdmin, isLoading, navigate])

  // Password users: no spinner, render immediately
  if (adminToken) {
    return <>{children}</>
  }

  // OAuth users: show spinner while checking
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
