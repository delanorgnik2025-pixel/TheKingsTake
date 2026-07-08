import { useEffect } from 'react'
import { useLocation } from 'react-router'

/**
 * ScrollToTop — Scrolls to top on every route change.
 * Fixes the bug where clicking nav links lands users in the
 * middle/bottom of the new page instead of the top.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Immediate scroll reset
    window.scrollTo(0, 0)
    // Also reset document scroll in case of nested scrollers
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [pathname])

  return null
}
