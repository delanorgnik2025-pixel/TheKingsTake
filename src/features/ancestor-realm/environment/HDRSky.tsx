import { Environment, Sky } from '@react-three/drei'
import { useEnvironment } from './EnvironmentManager'

export default function HDRSky() {
  const { timeOfDay } = useEnvironment()

  if (timeOfDay.name === 'Moonlight') {
    return (
      <>
        <color attach="background" args={['#0B1426']} />
        <fog attach="fog" args={[timeOfDay.fogColor, 10, 80]} />
        <ambientLight intensity={timeOfDay.ambientIntensity} color="#3D5A80" />
      </>
    )
  }

  return (
    <>
      <Sky
        distance={450000}
        sunPosition={timeOfDay.hour < 12 ? [100, 50, -100] : [-100, 20, -100]}
        inclination={0.52}
        azimuth={0.25}
        rayleigh={timeOfDay.name === 'Sunset' ? 2 : 0.5}
        turbidity={timeOfDay.name === 'Sunset' ? 10 : 2}
      />
      <fog attach="fog" args={[timeOfDay.fogColor, 15, 90]} />
    </>
  )
}
