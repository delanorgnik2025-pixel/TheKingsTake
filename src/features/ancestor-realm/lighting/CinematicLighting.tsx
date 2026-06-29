import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function CinematicLighting() {
  const sunRef = useRef<THREE.DirectionalLight>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.02
    if (sunRef.current) {
      sunRef.current.position.set(Math.sin(t) * 20, 15, Math.cos(t) * 10)
    }
  })

  return (
    <>
      <ambientLight intensity={0.3} color="#8B7355" />
      <directionalLight
        ref={sunRef}
        position={[10, 15, 5]}
        intensity={2}
        color="#FFD4A0"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={100}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
      />
      <directionalLight position={[-5, 8, -5]} intensity={0.5} color="#A0C4FF" />
      <pointLight position={[0, 3, 0]} intensity={1} color="#FF9500" distance={15} />
      <pointLight position={[-5, 2, 3]} intensity={0.5} color="#4ECDC4" distance={10} />
      <pointLight position={[5, 2, -3]} intensity={0.5} color="#FFE66D" distance={10} />
    </>
  )
}
