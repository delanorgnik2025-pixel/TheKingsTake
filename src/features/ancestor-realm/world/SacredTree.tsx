import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useWorld } from '../scene/WorldManager'

export default function SacredTree() {
  const groupRef = useRef<THREE.Group>(null)
  const { quality } = useWorld()

  const trunkGeo = useMemo(() => {
    const geo = new THREE.CylinderGeometry(0.3, 1.2, 6, 8)
    geo.translate(0, 3, 0)
    return geo
  }, [])

  const canopyGeo = useMemo(() => {
    const geo = new THREE.SphereGeometry(3.5, 8, 6)
    geo.translate(0, 7, 0)
    return geo
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.02
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Trunk */}
      <mesh geometry={trunkGeo} castShadow receiveShadow>
        <meshStandardMaterial color="#5C3A1E" roughness={0.9} />
      </mesh>
      {/* Canopy */}
      <mesh geometry={canopyGeo} castShadow>
        <meshStandardMaterial color="#2D5016" roughness={0.8} />
      </mesh>
      {/* Glowing core */}
      <mesh position={[0, 3, 0]}>
        <sphereGeometry args={[0.4, 8, 8]} />
        <meshStandardMaterial color="#FF9500" emissive="#FF9500" emissiveIntensity={2} transparent opacity={0.8} />
      </mesh>
      {/* Roots */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i / 4) * Math.PI * 2
        return (
          <mesh key={i} position={[Math.cos(angle) * 1.5, 0.2, Math.sin(angle) * 1.5]} rotation={[0, 0, Math.cos(angle) * 0.3]}>
            <cylinderGeometry args={[0.15, 0.05, 2, 4]} />
            <meshStandardMaterial color="#5C3A1E" roughness={0.9} />
          </mesh>
        )
      })}
    </group>
  )
}
