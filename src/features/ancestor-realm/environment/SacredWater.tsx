import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function SacredWater() {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ref.current) {
      const mat = ref.current.material as THREE.MeshStandardMaterial
      mat.opacity = 0.6 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <mesh ref={ref} position={[8, -0.3, 5]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[15, 20, 32, 32]} />
      <meshStandardMaterial color="#1A5F7A" transparent opacity={0.65} roughness={0.1} metalness={0.3} />
    </mesh>
  )
}
