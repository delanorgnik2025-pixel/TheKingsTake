import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function AnimatedClouds() {
  const groupRef = useRef<THREE.Group>(null)

  const clouds = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
    pos: [(Math.random() - 0.5) * 80, 25 + Math.random() * 10, (Math.random() - 0.5) * 80],
    scale: 3 + Math.random() * 5,
    speed: 0.3 + Math.random() * 0.5,
    key: `cloud-${i}`,
  })), [])

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.children.forEach((cloud, i) => {
      cloud.position.x += clouds[i].speed * 0.01
      if (cloud.position.x > 50) cloud.position.x = -50
      cloud.scale.setScalar(clouds[i].scale + Math.sin(t * 0.1 + i) * 0.3)
    })
  })

  return (
    <group ref={groupRef}>
      {clouds.map(c => (
        <mesh key={c.key} position={c.pos as [number, number, number]}>
          <sphereGeometry args={[1, 8, 6]} />
          <meshStandardMaterial color="#E8DCC8" transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  )
}
