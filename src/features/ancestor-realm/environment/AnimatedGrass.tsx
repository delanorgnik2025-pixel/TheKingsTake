import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useWorld } from '../scene/WorldManager'

export default function AnimatedGrass() {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const { quality } = useWorld()
  const count = quality.grassCount

  const { positions, phases } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const ph = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 80
      pos[i * 3 + 1] = 0
      pos[i * 3 + 2] = (Math.random() - 0.5) * 80
      ph[i] = Math.random() * Math.PI * 2
    }
    return { positions: pos, phases: ph }
  }, [count])

  const dummy = useMemo(() => new THREE.Object3D(), [])

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime
    for (let i = 0; i < count; i++) {
      dummy.position.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2])
      dummy.rotation.z = Math.sin(t * 0.8 + phases[i]) * 0.15
      dummy.rotation.x = Math.cos(t * 0.6 + phases[i]) * 0.05
      dummy.scale.setScalar(0.5 + Math.random() * 0.5)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <coneGeometry args={[0.03, 0.4, 3]} />
      <meshStandardMaterial color="#4A7C1F" roughness={0.8} />
    </instancedMesh>
  )
}
