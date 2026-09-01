import { useRef, useEffect } from 'react'

interface MatrixRainProps {
  opacity?: number
  speed?: number
  className?: string
}

export default function MatrixRain({ opacity = 0.08, speed = 0.5, className = '' }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let last = 0
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const drops: number[] = []
    let w = 0
    let h = 0
    let columns = 0
    const fontSize = 14

    function resize() {
      w = canvas!.width = window.innerWidth
      h = canvas!.height = window.innerHeight
      columns = Math.floor(w / fontSize)
      drops.length = 0
      for (let i = 0; i < columns; i++) drops[i] = Math.random() * -100
    }

    resize()
    window.addEventListener('resize', resize)

    function draw(ts: number) {
      animId = requestAnimationFrame(draw)
      if (ts - last < 1000 / (20 * speed)) return
      last = ts

      ctx!.fillStyle = `rgba(5, 5, 8, ${opacity})`
      ctx!.fillRect(0, 0, w, h)

      ctx!.font = `${fontSize}px "JetBrains Mono", monospace`

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize

        const headGlow = Math.random() > 0.95
        if (headGlow) {
          ctx!.fillStyle = '#d4a843'
          ctx!.shadowColor = '#d4a843'
          ctx!.shadowBlur = 8
        } else {
          const brightness = Math.random() * 0.4 + 0.6
          ctx!.fillStyle = `rgba(0, 255, 65, ${brightness})`
          ctx!.shadowColor = 'transparent'
          ctx!.shadowBlur = 0
        }

        ctx!.fillText(char, x, y)

        if (y > h && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i] += 0.5
      }
    }

    animId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [opacity, speed])

  return <canvas ref={canvasRef} className={`fixed inset-0 pointer-events-none z-0 ${className}`} />
}
