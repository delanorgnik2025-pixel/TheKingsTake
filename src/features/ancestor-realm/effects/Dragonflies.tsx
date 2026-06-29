import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Dragonflies() {
  const groupRef = useRef<THREE.Group>(null)

  const dragonflies = useMemo(() => Array.from({ length: 8 }, (_, i) => ({
    basePos: [(Math.random() - 0.5) * 15, 1.5 + Math.random() * 2, 10 + (Math.random() - 0.5) * 8],
    speed: 1.5 + Math.random() * 2,
    phase: (i / 8) * Math.PI * 2,
    color: ['#00CED1', '#20B2AA', '#48D1CC', '#40E0D0'][Math.floor(Math.random() * 4)],
    key: `dragonfly-${i}`,
  })), [])

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.children.forEach((df, i) => {
      const d = dragonflies[i]
      df.position.x = d.basePos[0] + Math.sin(t * d.speed + d.phase) * 2
      df.position.y = d.basePos[1] + Math.sin(t * d.speed * 1.3 + d.phase) * 0.3
      df.position.z = d.basePos[2] + Math.cos(t * d.speed * 0.8 + d.phase) * 2
      df.lookAt(
        d.basePos[0] + Math.sin(t * d.speed + d.phase + 0.1) * 2,
        d.basePos[1],
        d.basePos[2] + Math.cos(t * d.speed * 0.8 + d.phase + 0.1) * 2
      )
    })
  })

  return (
    <group ref={groupRef}>
      {dragonflies.map(d => (
        <group key={d.key}>
          {/* Body */}
          <mesh>
            <cylinderGeometry args={[0.02, 0.02, 0.3, 4]} />
            <meshStandardMaterial color={d.color} emissive={d.color} emissiveIntensity={0.5} />
          </mesh>
          {/* Wings */}
          <mesh position={[0.08, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
            <planeGeometry args={[0.15, 0.06]} />
            <meshStandardMaterial color="#E0FFFF" transparent opacity={0.4} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[-0.08, 0, 0]} rotation={[0, 0, -Math.PI / 4]}>
            <planeGeometry args={[0.15, 0.06]} />
            <meshStandardMaterial color="#E0FFFF" transparent opacity={0.4} side={THREE.DoubleSide} />
          </mesh>
        </group>
      ))}
    </group>
  )
}
