import { useRef, useMemo } from 'react'
import * as THREE from 'three'

export default function AfricanGround() {
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(200, 200, 64, 64)
    const pos = g.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const y = pos.getY(i)
      const z = Math.sin(x * 0.1) * Math.cos(y * 0.1) * 1.5 + Math.sin(x * 0.3 + y * 0.2) * 0.5
      pos.setZ(i, z)
    }
    g.computeVertexNormals()
    return g
  }, [])

  return (
    <mesh geometry={geo} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <meshStandardMaterial color="#3D5A1E" roughness={0.95} />
    </mesh>
  )
}
