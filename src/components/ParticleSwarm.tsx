import { useRef, useEffect } from 'react'

interface ParticleSwarmProps {
  count?: number
  className?: string
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  type: 'drone' | 'satellite' | 'camera'
  opacity: number
}

export default function ParticleSwarm({ count = 50, className = '' }: ParticleSwarmProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let w = 0
    let h = 0
    const particles: Particle[] = []

    function resize() {
      w = canvas!.width = window.innerWidth
      h = canvas!.height = window.innerHeight
    }

    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < count; i++) {
      const types: Array<'drone' | 'satellite' | 'camera'> = ['drone', 'satellite', 'camera']
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        type: types[Math.floor(Math.random() * types.length)],
        opacity: Math.random() * 0.4 + 0.1,
      })
    }

    function drawParticle(p: Particle) {
      ctx!.save()
      ctx!.globalAlpha = p.opacity

      if (p.type === 'drone') {
        ctx!.fillStyle = '#00c4fa'
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx!.fill()
        ctx!.strokeStyle = 'rgba(0,196,250,0.3)'
        ctx!.lineWidth = 0.5
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2)
        ctx!.stroke()
      } else if (p.type === 'satellite') {
        ctx!.fillStyle = '#00ff41'
        ctx!.fillRect(p.x - p.size, p.y - p.size / 2, p.size * 2, p.size)
        ctx!.fillRect(p.x - p.size / 2, p.y - p.size, p.size, p.size * 2)
      } else {
        ctx!.fillStyle = '#d4a843'
        ctx!.beginPath()
        ctx!.moveTo(p.x, p.y - p.size)
        ctx!.lineTo(p.x + p.size, p.y + p.size)
        ctx!.lineTo(p.x - p.size, p.y + p.size)
        ctx!.closePath()
        ctx!.fill()
      }

      ctx!.restore()
    }

    function draw() {
      animId = requestAnimationFrame(draw)
      ctx!.clearRect(0, 0, w, h)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0

        drawParticle(p)
      }

      // Connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 120) {
            ctx!.save()
            ctx!.globalAlpha = (1 - dist / 120) * 0.08
            ctx!.strokeStyle = '#00ff41'
            ctx!.lineWidth = 0.3
            ctx!.beginPath()
            ctx!.moveTo(particles[i].x, particles[i].y)
            ctx!.lineTo(particles[j].x, particles[j].y)
            ctx!.stroke()
            ctx!.restore()
          }
        }
      }
    }

    animId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [count])

  return <canvas ref={canvasRef} className={`fixed inset-0 pointer-events-none z-0 ${className}`} />
}
