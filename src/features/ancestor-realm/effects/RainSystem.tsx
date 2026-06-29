import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useWorld } from '../scene/WorldManager'

export default function RainSystem() {
  const ref = useRef<THREE.Points>(null)
  const { quality } = useWorld()
  const count = quality.particleCount > 100 ? 3000 : 800

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 80
      pos[i * 3 + 1] = Math.random() * 30
      pos[i * 3 + 2] = (Math.random() - 0.5) * 80
    }
    return pos
  }, [count])

  useFrame(() => {
    if (!ref.current) return
    const posArr = ref.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      posArr[i * 3 + 1] -= 0.3 + Math.random() * 0.2
      if (posArr[i * 3 + 1] < 0) {
        posArr[i * 3 + 1] = 25 + Math.random() * 5
        posArr[i * 3] = (Math.random() - 0.5) * 80
        posArr[i * 3 + 2] = (Math.random() - 0.5) * 80
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#A0C4FF" size={0.06} transparent opacity={0.4} blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  )
}
