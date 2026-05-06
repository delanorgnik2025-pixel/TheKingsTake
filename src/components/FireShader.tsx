import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const vertexShader = `
  attribute vec2 a_pos;
  void main() {
    gl_Position = vec4(a_pos, 0.0, 1.0);
  }
`

const fragmentShader = `
  precision highp float;
  uniform float u_time;
  uniform vec2 u_res;
  uniform float u_intensity;
  uniform float u_speed;

  float hash(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = rot * p * 2.0 + shift;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 p = (gl_FragCoord.xy - u_res * 0.5) / min(u_res.x, u_res.y);
    float t = u_time * u_speed;
    float intensity = u_intensity;

    vec2 q = vec2(0.0);
    q.x = fbm(p + vec2(t * 0.12, 0.0));
    q.y = fbm(p + vec2(1.0));

    vec2 r = vec2(0.0);
    r.x = fbm(p + 1.0 * q + vec2(t * 0.15, t * 0.08));
    r.y = fbm(p + 1.0 * q + vec2(8.326, t * 0.2));

    float f = fbm(p + 2.0 * r);

    float fy = p.y + 0.5;
    f += (1.0 - fy) * 0.5 * intensity;
    f += sin(p.x * 3.0 + t * 0.5) * 0.08 * (1.0 - fy);
    f = smoothstep(0.2, 0.8, f);

    float hot = 1.0 - smoothstep(0.0, 0.5, fy);
    float embers = noise(p * 12.0 + vec2(t * 0.3, t * 0.5)) * noise(p * 20.0 - vec2(t * 0.2));

    vec3 color = vec3(0.05, 0.02, 0.01);
    if (f < 0.25) {
      color += vec3(0.91, 0.36, 0.02) * f * 4.0;
    } else if (f < 0.5) {
      color += vec3(0.91, 0.36, 0.02) + (vec3(1.0, 0.73, 0.04) - vec3(0.91, 0.36, 0.02)) * (f - 0.25) * 4.0;
    } else {
      color += vec3(1.0, 0.73, 0.04) + (vec3(1.0, 1.0, 0.6) - vec3(1.0, 0.73, 0.04)) * (f - 0.5) * 2.0;
    }

    color *= (0.6 + hot * 0.8) * intensity;

    if (embers > 0.72) {
      color += vec3(1.0, 0.5, 0.1) * (embers - 0.72) * 5.0 * (1.0 - fy) * intensity;
    }

    color += vec3(0.15, 0.03, 0.0) * exp(-fy * 4.0) * intensity;
    color *= 0.7 + 0.3 * (1.0 - dot(p, p) * 0.4);

    gl_FragColor = vec4(color, 1.0);
  }
`

export default function FireShader() {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)
  const animFrameRef = useRef<number>(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false })
    rendererRef.current = renderer
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute(
      'a_pos',
      new THREE.Float32BufferAttribute([-1, -1, 3, -1, -1, 3], 2)
    )

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        u_time: { value: 0.0 },
        u_res: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) },
        u_intensity: { value: 1.0 },
        u_speed: { value: 0.8 },
      },
    })
    materialRef.current = material

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const w = container.clientWidth
    const h = container.clientHeight
    renderer.setSize(w, h)
    material.uniforms.u_res.value.set(w, h)

    const animate = () => {
      material.uniforms.u_time.value = performance.now() * 0.001
      renderer.render(scene, camera)
      animFrameRef.current = requestAnimationFrame(animate)
    }
    animate()

    const handleResize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      renderer.setSize(w, h)
      material.uniforms.u_res.value.set(w, h)
    }

    const ro = new ResizeObserver(handleResize)
    ro.observe(container)

    return () => {
      cancelAnimationFrame(animFrameRef.current)
      ro.disconnect()
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      container.innerHTML = ''
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  )
}
