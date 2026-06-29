import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { useWorld } from './WorldManager'
import CinematicCamera from './CinematicCamera'
import PostProcessingStack from './PostProcessingStack'
import CinematicLighting from '../lighting/CinematicLighting'
import SacredTree from '../world/SacredTree'
import AncientBaobab from '../world/AncientBaobab'
import HeroBaobab from '../world/HeroBaobab'
import AfricanGround from '../environment/AfricanGround'
import SacredWater from '../environment/SacredWater'
import ImprovedWater from '../environment/ImprovedWater'
import AnimatedGrass from '../environment/AnimatedGrass'
import TerrainDetail from '../environment/TerrainDetail'
import SacredRiver from '../environment/SacredRiver'
import StonePathway from '../environment/StonePathway'
import HDRSky from '../environment/HDRSky'
import { EnvironmentProvider } from '../environment/EnvironmentManager'
import Fireflies from '../effects/Fireflies'
import FloatingPollen from '../effects/FloatingPollen'
import SunlightShafts from '../effects/SunlightShafts'
import GroundFog from '../effects/GroundFog'
import CirclingBirds from '../effects/CirclingBirds'
import VolumetricGodRays from '../effects/VolumetricGodRays'
import AnimatedClouds from '../effects/AnimatedClouds'
import Butterflies from '../effects/Butterflies'
import FallingLeaves from '../effects/FallingLeaves'
import SacredRoots from '../effects/SacredRoots'
import Waterfall from '../effects/Waterfall'
import Dragonflies from '../effects/Dragonflies'
import RainSystem from '../effects/RainSystem'

function SceneContents() {
  const { quality } = useWorld()

  return (
    <>
      <HDRSky />
      <CinematicCamera />
      <CinematicLighting />
      <PostProcessingStack />

      {/* Ground */}
      <AfricanGround />
      <AnimatedGrass />
      <TerrainDetail />

      {/* Water */}
      <SacredWater />
      <ImprovedWater />
      <SacredRiver />
      <StonePathway />
      <Waterfall />

      {/* Trees */}
      <SacredTree />
      <HeroBaobab />

      {/* Effects */}
      <Fireflies />
      <FloatingPollen />
      <SunlightShafts />
      <VolumetricGodRays />
      <GroundFog />
      <CirclingBirds />
      <AnimatedClouds />
      <Butterflies />
      <FallingLeaves />
      <SacredRoots />
      <Dragonflies />

      {/* Rain only on higher quality */}
      {quality.tier !== 'low' && <RainSystem />}
    </>
  )
}

export default function GardenScene() {
  const { quality, setLoaded } = useWorld()

  return (
    <EnvironmentProvider>
      <div className="absolute inset-0">
        <Canvas
          shadows={quality.shadows}
          dpr={quality.pixelRatio}
          camera={{ fov: 60, near: 0.1, far: 500, position: [0, 15, 40] }}
          gl={{ antialias: quality.tier !== 'low', alpha: false, powerPreference: 'high-performance' }}
          onCreated={() => setTimeout(() => setLoaded(true), 2000)}
        >
          <Suspense fallback={null}>
            <SceneContents />
          </Suspense>
        </Canvas>
      </div>
    </EnvironmentProvider>
  )
}
