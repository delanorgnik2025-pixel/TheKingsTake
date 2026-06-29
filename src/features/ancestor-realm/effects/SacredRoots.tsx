import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function SacredRoots() {
  const groupRef = useRef<THREE.Group>(null)

  const roots = useMemo(() => Array.from({ length: 50 }, (_, i) => {
    const angle = (i / 50) * Math.PI * 2
    const radius = 2 + Math.random() * 4
    const points = []
    const segments = 8
    for (let j = 0; j <= segments; j++) {
      const t = j / segments
      points.push(new THREE.Vector3(
        Math.cos(angle + t * 0.5) * (radius + t * 2),
        -t * 1.5,
        Math.sin(angle + t * 0.5) * (radius + t * 2)
      ))
    }
    return {
      curve: new THREE.CatmullRomCurve3(points),
      phase: Math.random() * Math.PI * 2,
      key: `root-${i}`,
    }
  }), [])

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.children.forEach((mesh, i) => {
      const mat = (mesh as THREE.Mesh).material as THREE.MeshStandardMaterial
      if (mat && mat.emissive) {
        const intensity = 0.5 + Math.sin(t * 2 + roots[i].phase) * 0.3
        mat.emissiveIntensity = intensity
      }
    })
  })

  return (
    <group ref={groupRef} position={[0, 0.5, 0]}>
      {roots.map(r => (
        <mesh key={r.key}>
          <tubeGeometry args={[r.curve, 8, 0.04, 4, false]} />
          <meshStandardMaterial color="#4A2C17" emissive="#FF9500" emissiveIntensity={0.5} roughness={0.9} />
        </mesh>
      ))}
    </group>
  )
}
