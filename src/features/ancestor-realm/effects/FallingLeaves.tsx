import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useWorld } from '../scene/WorldManager'

export default function FallingLeaves() {
  const ref = useRef<THREE.InstancedMesh>(null)
  const { quality } = useWorld()
  const count = Math.floor(quality.particleCount * 0.3)

  const data = useMemo(() => Array.from({ length: count }, (_, i) => ({
    pos: [(Math.random() - 0.5) * 30, 8 + Math.random() * 10, (Math.random() - 0.5) * 30],
    speed: 0.3 + Math.random() * 0.5,
    rotSpeed: 0.5 + Math.random() * 2,
    phase: (i / count) * Math.PI * 2,
    color: ['#8B4513', '#D2691E', '#CD853F', '#A0522D'][Math.floor(Math.random() * 4)],
  })), [count])

  const dummy = useMemo(() => new THREE.Object3D(), [])

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    for (let i = 0; i < count; i++) {
      const d = data[i]
      d.pos[1] -= d.speed * 0.01
      d.pos[0] += Math.sin(t * 0.5 + d.phase) * 0.01
      if (d.pos[1] < 0) d.pos[1] = 12
      dummy.position.set(d.pos[0], d.pos[1], d.pos[2])
      dummy.rotation.set(t * d.rotSpeed, t * d.rotSpeed * 0.7, 0)
      dummy.updateMatrix()
      ref.current.setMatrixAt(i, dummy.matrix)
    }
    ref.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <planeGeometry args={[0.15, 0.1]} />
      <meshStandardMaterial color="#8B4513" side={THREE.DoubleSide} />
    </instancedMesh>
  )
}
