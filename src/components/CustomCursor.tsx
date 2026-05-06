import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const targetRef = useRef({ x: -100, y: -100 })
  const currentRef = useRef({ x: -100, y: -100 })
  const scaleRef = useRef({ current: 1, target: 1 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    // Check for touch device or reduced motion
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isTouch || prefersReduced) return

    document.body.style.cursor = 'none'

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current.x = e.clientX
      targetRef.current.y = e.clientY
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.getAttribute('role') === 'button'
      ) {
        scaleRef.current.target = 1.8
      }
    }

    const handleMouseOut = () => {
      scaleRef.current.target = 1
    }

    const animate = () => {
      // Spring physics for position
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.15
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.15

      // Spring for scale
      scaleRef.current.current += (scaleRef.current.target - scaleRef.current.current) * 0.12

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentRef.current.x - 12}px, ${currentRef.current.y - 12}px, 0) scale(${scaleRef.current.current})`
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      cancelAnimationFrame(rafRef.current)
      document.body.style.cursor = ''
    }
  }, [])

  // Don't render on touch devices
  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null
  }

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[9999] hidden md:block"
      style={{
        backgroundColor: '#FF9500',
        opacity: 0.9,
        mixBlendMode: 'difference',
        willChange: 'transform',
      }}
    />
  )
}
