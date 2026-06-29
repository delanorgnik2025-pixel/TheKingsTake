import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useWorld } from '../scene/WorldManager'

export default function HeroBaobab() {
  const groupRef = useRef<THREE.Group>(null)
  const { quality } = useWorld()

  const leaves = useMemo(() => {
    const count = quality.treeDetail === 'high' ? 3000 : quality.treeDetail === 'medium' ? 1500 : 500
    return Array.from({ length: count }, () => ({
      pos: [(Math.random() - 0.5) * 6, 10 + Math.random() * 5, (Math.random() - 0.5) * 6],
      scale: 0.08 + Math.random() * 0.15,
      hue: 100 + Math.random() * 50,
    }))
  }, [quality.treeDetail])

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.elapsedTime
      groupRef.current.rotation.y = Math.sin(t * 0.02) * 0.005
    }
  })

  return (
    <group ref={groupRef} position={[-8, 0, -5]}>
      {/* Massive trunk with PBR */}
      <mesh position={[0, 5, 0]} castShadow>
        <cylinderGeometry args={[2.8, 4, 10, 16]} />
        <meshStandardMaterial color="#5C3A1E" roughness={0.98} metalness={0.02} />
      </mesh>
      {/* Bark texture bands */}
      {[0, 1, 2, 3].map(i => (
        <mesh key={`bark-${i}`} position={[0, 1 + i * 2.5, 0]}>
          <cylinderGeometry args={[3.2 - i * 0.2, 3.4 - i * 0.2, 0.3, 16]} />
          <meshStandardMaterial color="#4A2F18" roughness={1} />
        </mesh>
      ))}
      {/* Branches */}
      {[0, 1, 2, 3, 4, 5].map(i => {
        const angle = (i / 6) * Math.PI * 2 + 0.2
        return (
          <group key={`branch-${i}`}>
            <mesh position={[Math.cos(angle) * 2, 9 + Math.random(), Math.sin(angle) * 2]} rotation={[0, 0, Math.cos(angle) * 0.4]} castShadow>
              <cylinderGeometry args={[0.2, 0.5, 3, 6]} />
              <meshStandardMaterial color="#5C3A1E" roughness={0.95} />
            </mesh>
          </group>
        )
      })}
      {/* Canopy leaves */}
      {leaves.map((leaf, i) => (
        <mesh key={`leaf-${i}`} position={leaf.pos} scale={leaf.scale}>
          <sphereGeometry args={[1, 3, 3]} />
          <meshStandardMaterial color={`hsl(${leaf.hue}, 55%, ${22 + Math.random() * 15}%)`} roughness={0.85} />
        </mesh>
      ))}
      {/* Glowing heart */}
      <mesh position={[0, 5, 0]}>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshStandardMaterial color="#FF9500" emissive="#FF9500" emissiveIntensity={3} transparent opacity={0.7} />
      </mesh>
      {/* Ground roots */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map(i => {
        const angle = (i / 8) * Math.PI * 2
        return (
          <mesh key={`root-${i}`} position={[Math.cos(angle) * 3, 0.2, Math.sin(angle) * 3]} rotation={[0, 0, Math.cos(angle) * 0.5]} castShadow>
            <cylinderGeometry args={[0.2, 0.05, 3, 4]} />
            <meshStandardMaterial color="#6B4226" roughness={0.98} />
          </mesh>
        )
      })}
    </group>
  )
}
