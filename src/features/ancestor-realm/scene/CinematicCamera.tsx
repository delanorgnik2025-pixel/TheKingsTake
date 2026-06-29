import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function CinematicCamera() {
  const timeRef = useRef(0)
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 15, 40),
      new THREE.Vector3(-15, 10, 25),
      new THREE.Vector3(-10, 6, 10),
      new THREE.Vector3(0, 4, 5),
      new THREE.Vector3(5, 3, 2),
      new THREE.Vector3(2, 2.5, 0),
      new THREE.Vector3(0, 2, -2),
      new THREE.Vector3(-3, 2.5, 0),
      new THREE.Vector3(0, 3, 3),
      new THREE.Vector3(8, 5, 8),
      new THREE.Vector3(12, 8, 15),
      new THREE.Vector3(0, 12, 30),
    ], false, 'catmullrom', 0.5)
  }, [])

  useFrame((state, delta) => {
    timeRef.current += delta * 0.04
    const t = Math.min(timeRef.current, 1)
    const pos = curve.getPoint(t)
    const lookAt = curve.getPoint(Math.min(t + 0.05, 1))
    state.camera.position.copy(pos)
    state.camera.lookAt(lookAt)
  })

  return null
}
