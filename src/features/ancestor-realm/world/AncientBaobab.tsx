import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useWorld } from '../scene/WorldManager'

export default function AncientBaobab() {
  const groupRef = useRef<THREE.Group>(null)
  const { quality } = useWorld()

  const leaves = useMemo(() => {
    const positions: THREE.Vector3[] = []
    const count = quality.treeDetail === 'high' ? 2000 : quality.treeDetail === 'medium' ? 1000 : 300
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI * 0.5
      const r = 2.5 + Math.random() * 2
      positions.push(new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi) + 12,
        r * Math.sin(phi) * Math.sin(theta)
      ))
    }
    return positions
  }, [quality.treeDetail])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.01
    }
  })

  return (
    <group ref={groupRef} position={[-8, 0, -5]}>
      {/* Massive trunk */}
      <mesh position={[0, 5, 0]} castShadow>
        <cylinderGeometry args={[2.5, 3.5, 10, 12]} />
        <meshStandardMaterial color="#6B4226" roughness={0.95} />
      </mesh>
      {/* Upper branches */}
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i / 5) * Math.PI * 2 + 0.3
        return (
          <mesh key={i} position={[Math.cos(angle) * 1.5, 10, Math.sin(angle) * 1.5]} castShadow>
            <cylinderGeometry args={[0.3, 0.8, 3, 6]} />
            <meshStandardMaterial color="#5C3A1E" roughness={0.9} />
          </mesh>
        )
      })}
      {/* Canopy — instanced leaves */}
      <instancedMesh args={[undefined, undefined, leaves.length]} castShadow>
        <sphereGeometry args={[0.15, 4, 4]} />
        <meshStandardMaterial color="#1B5E20" roughness={0.8} />
        {leaves.map((pos, i) => (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.15, 3, 3]} />
            <meshStandardMaterial color={`hsl(${100 + Math.random() * 40}, ${60 + Math.random() * 30}%, ${20 + Math.random() * 20}%)`} />
          </mesh>
        ))}
      </instancedMesh>
      {/* Roots */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i / 6) * Math.PI * 2
        return (
          <mesh key={`root-${i}`} position={[Math.cos(angle) * 2.5, 0.3, Math.sin(angle) * 2.5]} rotation={[0, 0, Math.cos(angle) * 0.4]}>
            <cylinderGeometry args={[0.25, 0.05, 3, 4]} />
            <meshStandardMaterial color="#6B4226" roughness={0.95} />
          </mesh>
        )
      })}
    </group>
  )
}
