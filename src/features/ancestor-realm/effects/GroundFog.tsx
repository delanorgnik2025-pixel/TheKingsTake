import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function GroundFog() {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ref.current) {
      const mat = ref.current.material as THREE.MeshBasicMaterial
      mat.opacity = 0.15 + Math.sin(state.clock.elapsedTime * 0.2) * 0.05
    }
  })

  return (
    <mesh ref={ref} position={[0, 0.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[100, 100]} />
      <meshBasicMaterial color="#A0C4FF" transparent opacity={0.15} blending={THREE.AdditiveBlending} depthWrite={false} />
    </mesh>
  )
}
