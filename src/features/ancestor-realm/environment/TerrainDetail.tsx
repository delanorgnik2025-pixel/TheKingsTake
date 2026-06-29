import { useMemo } from 'react'
import * as THREE from 'three'
import { useWorld } from '../scene/WorldManager'

export default function TerrainDetail() {
  const { quality } = useWorld()

  const rocks = useMemo(() => Array.from({ length: quality.particleCount > 100 ? 30 : 10 }, (_, i) => ({
    pos: [(Math.random() - 0.5) * 60, 0.3 + Math.random() * 0.3, (Math.random() - 0.5) * 60],
    scale: 0.3 + Math.random() * 0.8,
    rot: [Math.random() * 0.3, Math.random() * Math.PI, Math.random() * 0.3] as [number, number, number],
    key: `rock-${i}`,
  })), [quality.particleCount])

  const flowers = useMemo(() => Array.from({ length: quality.particleCount > 100 ? 200 : 50 }, (_, i) => ({
    pos: [(Math.random() - 0.5) * 50, 0.15, (Math.random() - 0.5) * 50],
    color: ['#FF6B9D', '#FFE66D', '#A855F7', '#FF9500', '#F0EBE1'][Math.floor(Math.random() * 5)],
    key: `flower-${i}`,
  })), [quality.particleCount])

  const ferns = useMemo(() => Array.from({ length: quality.particleCount > 100 ? 100 : 25 }, (_, i) => ({
    pos: [(Math.random() - 0.5) * 40, 0, (Math.random() - 0.5) * 40],
    rot: [0, Math.random() * Math.PI, 0] as [number, number, number],
    key: `fern-${i}`,
  })), [quality.particleCount])

  return (
    <group>
      {rocks.map(r => (
        <mesh key={r.key} position={r.pos as [number, number, number]} rotation={r.rot} castShadow>
          <dodecahedronGeometry args={[r.scale, 0]} />
          <meshStandardMaterial color="#5A5A5A" roughness={0.9} />
        </mesh>
      ))}
      {flowers.map(f => (
        <mesh key={f.key} position={f.pos as [number, number, number]}>
          <sphereGeometry args={[0.08, 4, 4]} />
          <meshStandardMaterial color={f.color} emissive={f.color} emissiveIntensity={0.3} />
        </mesh>
      ))}
      {ferns.map(f => (
        <mesh key={f.key} position={f.pos as [number, number, number]} rotation={f.rot}>
          <coneGeometry args={[0.3, 0.6, 5]} />
          <meshStandardMaterial color="#2D5A27" roughness={0.85} />
        </mesh>
      ))}
    </group>
  )
}
