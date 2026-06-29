import { useMemo } from 'react'
import * as THREE from 'three'

export default function StonePathway() {
  const stones = useMemo(() => {
    const points = []
    const steps = 20
    for (let i = 0; i < steps; i++) {
      const t = i / steps
      points.push({
        pos: [Math.sin(t * Math.PI * 0.5) * 2, 0.05 + Math.random() * 0.05, 8 + t * 15] as [number, number, number],
        scale: [0.4 + Math.random() * 0.4, 0.1, 0.5 + Math.random() * 0.3] as [number, number, number],
        rot: [0, Math.random() * 0.3, 0] as [number, number, number],
        key: `stone-${i}`,
      })
    }
    return points
  }, [])

  return (
    <group>
      {stones.map(s => (
        <mesh key={s.key} position={s.pos} scale={s.scale} rotation={s.rot} receiveShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#8A8A7A" roughness={0.95} />
        </mesh>
      ))}
    </group>
  )
}
