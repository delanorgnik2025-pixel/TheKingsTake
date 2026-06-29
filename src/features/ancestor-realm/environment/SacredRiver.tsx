import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function SacredRiver() {
  const ref = useRef<THREE.Mesh>(null)
  const matRef = useRef<THREE.ShaderMaterial>(null)

  const shader = {
    uniforms: {
      uTime: { value: 0 },
      uColorDeep: { value: new THREE.Color('#0B3D4C') },
      uColorShallow: { value: new THREE.Color('#2E8B9A') },
    },
    vertexShader: `
      varying vec2 vUv;
      uniform float uTime;
      void main() {
        vUv = uv;
        vec3 pos = position;
        float wave = sin(pos.x * 3.0 + uTime * 1.5) * 0.08;
        wave += sin(pos.y * 2.0 + uTime) * 0.05;
        pos.z += wave;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      uniform vec3 uColorDeep;
      uniform vec3 uColorShallow;
      uniform float uTime;
      void main() {
        float flow = sin(vUv.x * 8.0 + uTime * 2.0) * 0.5 + 0.5;
        vec3 color = mix(uColorDeep, uColorShallow, flow * 0.6 + 0.2);
        float sparkle = sin(vUv.x * 30.0 + uTime * 3.0) * sin(vUv.y * 20.0 + uTime * 2.0);
        color += sparkle * 0.08;
        gl_FragColor = vec4(color, 0.7);
      }
    `,
    transparent: true,
  }

  useFrame((state) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = state.clock.elapsedTime
    }
  })

  return (
    <group>
      {/* River bed */}
      <mesh ref={ref} position={[0, -0.5, 12]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6, 40, 32, 64]} />
        <shaderMaterial ref={matRef} {...shader} />
      </mesh>
      {/* River banks */}
      <mesh position={[-3.5, 0, 12]} rotation={[-Math.PI / 2, 0, 0.2]}>
        <planeGeometry args={[3, 40]} />
        <meshStandardMaterial color="#4A6741" roughness={0.95} />
      </mesh>
      <mesh position={[3.5, 0, 12]} rotation={[-Math.PI / 2, 0, -0.2]}>
        <planeGeometry args={[3, 40]} />
        <meshStandardMaterial color="#4A6741" roughness={0.95} />
      </mesh>
    </group>
  )
}
