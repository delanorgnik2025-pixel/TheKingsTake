import { useMemo } from 'react'
import * as THREE from 'three'

export default function VolumetricGodRays() {
  const rays = useMemo(() => Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * Math.PI * 2
    return {
      pos: [Math.cos(angle) * 5, 10, Math.sin(angle) * 5] as [number, number, number],
      rot: [0.4, angle + 0.5, 0] as [number, number, number],
      scale: [1.5, 25, 1.5] as [number, number, number],
      opacity: 0.03 + Math.random() * 0.02,
      key: `ray-${i}`,
    }
  }), [])

  return (
    <group>
      {rays.map(r => (
        <mesh key={r.key} position={r.pos} rotation={r.rot} scale={r.scale}>
          <cylinderGeometry args={[0.3, 1.5, 1, 6, 1, true]} />
          <meshBasicMaterial color="#FFF3E0" transparent opacity={r.opacity} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      ))}
    </group>
  )
}
