import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useWorld } from '../scene/WorldManager'

export default function FloatingPollen() {
  const ref = useRef<THREE.Points>(null)
  const { quality } = useWorld()
  const count = Math.floor(quality.particleCount * 1.5)

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 60
      pos[i * 3 + 1] = Math.random() * 15
      pos[i * 3 + 2] = (Math.random() - 0.5) * 60
    }
    return pos
  }, [count])

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    const posArr = ref.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      posArr[i * 3 + 1] -= 0.002
      posArr[i * 3] += Math.sin(t * 0.3 + i) * 0.003
      if (posArr[i * 3 + 1] < 0) posArr[i * 3 + 1] = 15
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#D4A843" size={0.08} transparent opacity={0.4} blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  )
}
