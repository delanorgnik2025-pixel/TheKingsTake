import { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { useWorld } from './WorldManager'

// Core scene components
import CinematicCamera from './CinematicCamera'
import PostProcessingStack from './PostProcessingStack'
import CinematicLighting from '../lighting/CinematicLighting'

// World
import SacredTree from '../world/SacredTree'
import HeroBaobab from '../world/HeroBaobab'

// Environment
import AfricanGround from '../environment/AfricanGround'
import AnimatedGrass from '../environment/AnimatedGrass'
import TerrainDetail from '../environment/TerrainDetail'
import SacredWater from '../environment/SacredWater'
import StonePathway from '../environment/StonePathway'

// Effects
import Fireflies from '../effects/Fireflies'
import GroundFog from '../effects/GroundFog'
import CirclingBirds from '../effects/CirclingBirds'
import Butterflies from '../effects/Butterflies'
import SacredRoots from '../effects/SacredRoots'

/* ─── Simple Sky (no drei dependency) ─── */
function SimpleSky() {
  return (
    <>
      <color attach="background" args={['#1a2744']} />
      <fog attach="fog" args={['#2a3a5c', 20, 90]} />
    </>
  )
}

/* ─── Fallback while 3D loads ─── */
function CanvasFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#FF9500" wireframe />
    </mesh>
  )
}

/* ─── All scene contents ─── */
function SceneContents() {
  const { quality } = useWorld()

  return (
    <>
      <SimpleSky />
      <CinematicCamera />
      <CinematicLighting />
      {quality.postProcessing && <PostProcessingStack />}

      {/* Ground */}
      <AfricanGround />
      <AnimatedGrass />
      <TerrainDetail />
      <StonePathway />

      {/* Water */}
      <SacredWater />

      {/* Trees */}
      <SacredTree />
      <HeroBaobab />

      {/* Effects */}
      <Fireflies />
      <SacredRoots />
      <GroundFog />
      {quality.tier !== 'low' && <Butterflies />}
      {quality.tier !== 'low' && <CirclingBirds />}
    </>
  )
}

/* ─── Main Garden Canvas ─── */
export default function GardenScene() {
  const { quality, setLoaded } = useWorld()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 4000)
    return () => clearTimeout(timer)
  }, [setLoaded])

  if (error) {
    return (
      <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#060a12]">
        <div className="text-center px-6">
          <p className="text-[#FF9500] text-sm mb-2">The garden needs a moment</p>
          <p className="text-[#C9B99A] text-xs">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 text-xs text-[#FF9500] border border-[rgba(255,149,0,0.3)] rounded px-4 py-2"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="absolute inset-0">
      <Canvas
        shadows={quality.shadows}
        dpr={Math.min(quality.pixelRatio, 1.5)}
        camera={{ fov: 60, near: 0.1, far: 200, position: [0, 10, 30] }}
        gl={{
          antialias: quality.tier === 'high' || quality.tier === 'ultra',
          alpha: false,
          powerPreference: 'default',
        }}
        onError={(e) => setError(String(e))}
        style={{ touchAction: 'none' }}
      >
        <Suspense fallback={<CanvasFallback />}>
          <SceneContents />
        </Suspense>
      </Canvas>
    </div>
  )
}
