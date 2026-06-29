import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Butterflies() {
  const groupRef = useRef<THREE.Group>(null)

  const butterflies = useMemo(() => Array.from({ length: 15 }, (_, i) => ({
    startPos: [(Math.random() - 0.5) * 20, 1 + Math.random() * 4, (Math.random() - 0.5) * 20],
    speed: 0.3 + Math.random() * 0.5,
    phase: (i / 15) * Math.PI * 2,
    color: ['#FF6B9D', '#A855F7', '#FF9500', '#4ECDC4', '#FFE66D'][Math.floor(Math.random() * 5)],
    key: `butterfly-${i}`,
  })), [])

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.children.forEach((b, i) => {
      const bf = butterflies[i]
      b.position.x = bf.startPos[0] + Math.sin(t * bf.speed + bf.phase) * 3
      b.position.y = bf.startPos[1] + Math.sin(t * bf.speed * 0.7 + bf.phase) * 0.8
      b.position.z = bf.startPos[2] + Math.cos(t * bf.speed + bf.phase) * 3
      const wing = b.children[0] as THREE.Mesh
      if (wing) wing.rotation.y = Math.sin(t * 8 + bf.phase) * 0.6
    })
  })

  return (
    <group ref={groupRef}>
      {butterflies.map(bf => (
        <group key={bf.key} position={bf.startPos as [number, number, number]}>
          <mesh>
            <planeGeometry args={[0.3, 0.2]} />
            <meshStandardMaterial color={bf.color} side={THREE.DoubleSide} transparent opacity={0.8} />
          </mesh>
        </group>
      ))}
    </group>
  )
}
