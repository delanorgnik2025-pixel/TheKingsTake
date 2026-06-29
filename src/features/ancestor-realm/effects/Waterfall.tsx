import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Waterfall() {
  const ref = useRef<THREE.Points>(null)
  const count = 800

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 1.5
      const y = Math.random() * 6
      const z = 14 + (Math.random() - 0.5) * 0.5
      pos[i * 3] = x
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = z
    }
    return pos
  }, [])

  useFrame(() => {
    if (!ref.current) return
    const posArr = ref.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      posArr[i * 3 + 1] -= 0.08 + Math.random() * 0.04
      posArr[i * 3] += (Math.random() - 0.5) * 0.02
      if (posArr[i * 3 + 1] < 0) {
        posArr[i * 3 + 1] = 6
        posArr[i * 3] = (Math.random() - 0.5) * 1.5
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#B0E0FF" size={0.12} transparent opacity={0.5} blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  )
}
