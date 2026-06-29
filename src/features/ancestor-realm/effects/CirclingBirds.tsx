import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function CirclingBirds() {
  const groupRef = useRef<THREE.Group>(null)

  const birds = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
    radius: 15 + Math.random() * 10,
    height: 15 + Math.random() * 8,
    speed: 0.1 + Math.random() * 0.2,
    offset: (i / 12) * Math.PI * 2,
    wingSpeed: 5 + Math.random() * 5,
    key: `bird-${i}`,
  })), [])

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.children.forEach((bird, i) => {
      const b = birds[i]
      const angle = t * b.speed + b.offset
      bird.position.x = Math.cos(angle) * b.radius
      bird.position.z = Math.sin(angle) * b.radius
      bird.position.y = b.height + Math.sin(t * 0.5 + i) * 1
      bird.rotation.y = -angle + Math.PI / 2
      const wing = bird.children[0] as THREE.Mesh
      if (wing) wing.rotation.z = Math.sin(t * b.wingSpeed) * 0.5
    })
  })

  return (
    <group ref={groupRef}>
      {birds.map(b => (
        <group key={b.key}>
          <mesh>
            <coneGeometry args={[0.1, 0.4, 3]} />
            <meshStandardMaterial color="#2C2C2C" />
          </mesh>
          <mesh position={[0, 0, 0.1]} rotation={[0, 0, 0.3]}>
            <planeGeometry args={[0.5, 0.15]} />
            <meshStandardMaterial color="#3D3D3D" side={THREE.DoubleSide} />
          </mesh>
        </group>
      ))}
    </group>
  )
}
