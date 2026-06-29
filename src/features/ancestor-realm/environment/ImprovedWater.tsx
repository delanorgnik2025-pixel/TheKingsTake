import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function ImprovedWater() {
  const ref = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  const shader = {
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color('#1A5F7A') },
    },
    vertexShader: `
      varying vec2 vUv;
      uniform float uTime;
      void main() {
        vUv = uv;
        vec3 pos = position;
        pos.z += sin(pos.x * 2.0 + uTime) * 0.1;
        pos.z += cos(pos.y * 1.5 + uTime * 0.8) * 0.08;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      uniform vec3 uColor;
      uniform float uTime;
      void main() {
        float ripple = sin(vUv.x * 20.0 + uTime) * 0.05 + cos(vUv.y * 15.0 + uTime * 0.7) * 0.05;
        vec3 col = uColor + ripple;
        float alpha = 0.5 + ripple * 2.0;
        gl_FragColor = vec4(col, alpha);
      }
    `,
    transparent: true,
  }

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
    }
  })

  return (
    <mesh ref={ref} position={[8, -0.2, 5]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[15, 20, 64, 64]} />
      <shaderMaterial ref={materialRef} {...shader} />
    </mesh>
  )
}
