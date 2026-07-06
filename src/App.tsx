import { Routes, Route, useLocation } from 'react-router'
import { useEffect, useRef, useCallback, useState } from 'react'
import Lenis from 'lenis'

function AppLayout({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), lerp: 0.1 })
    lenisRef.current = lenis
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    return () => { lenis.destroy() }
  }, [])
  return <>{children}</>
}

export default function App() {
  return (
    <Routes>
      <Route path="*" element={
        <AppLayout>
          <div style={{ padding: '100px', color: 'red', fontSize: '40px' }}>LENIS WORKS</div>
        </AppLayout>
      } />
    </Routes>
  )
}
