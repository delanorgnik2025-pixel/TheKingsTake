import { useMemo } from 'react'
import * as THREE from 'three'

export default function SunlightShafts() {
  const shafts = useMemo(() => Array.from({ length: 6 }, (_, i) => {
    const angle = (i / 6) * Math.PI * 2
    return {
      pos: [Math.cos(angle) * 8, 12, Math.sin(angle) * 8] as [number, number, number],
      rot: [0.3, angle, 0] as [number, number, number],
      scale: [2, 20, 2] as [number, number, number],
      key: `shaft-${i}`,
    }
  }), [])

  return (
    <group>
      {shafts.map(s => (
        <mesh key={s.key} position={s.pos} rotation={s.rot} scale={s.scale}>
          <cylinderGeometry args={[0.5, 2, 1, 6, 1, true]} />
          <meshBasicMaterial color="#FFD4A0" transparent opacity={0.06} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      ))}
    </group>
  )
}
