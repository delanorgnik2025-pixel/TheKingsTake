import { EffectComposer, Bloom, DepthOfField, Vignette } from '@react-three/postprocessing'
import { useWorld } from './WorldManager'

export default function PostProcessingStack() {
  const { quality } = useWorld()
  if (!quality.postProcessing) return null

  return (
    <EffectComposer>
      <Bloom intensity={0.6} luminanceThreshold={0.4} luminanceSmoothing={0.8} mipmapBlur />
      <DepthOfField focusDistance={0.02} focalLength={0.05} bokehScale={3} />
      <Vignette eskil={false} offset={0.1} darkness={0.6} />
    </EffectComposer>
  )
}
