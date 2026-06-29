import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useWorld } from '../scene/WorldManager'

export default function Fireflies() {
  const ref = useRef<THREE.Points>(null)
  const { quality } = useWorld()
  const count = quality.particleCount

  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const spd = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40
      pos[i * 3 + 1] = 0.5 + Math.random() * 8
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40
      spd[i] = 0.2 + Math.random() * 0.5
    }
    return { positions: pos, speeds: spd }
  }, [count])

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    const posArr = ref.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      posArr[i * 3] += Math.sin(t * speeds[i] + i) * 0.01
      posArr[i * 3 + 1] += Math.cos(t * speeds[i] * 0.7 + i) * 0.005
      posArr[i * 3 + 2] += Math.sin(t * speeds[i] * 0.5 + i * 2) * 0.008
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#FFE66D" size={0.15} transparent opacity={0.8} blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  )
}
