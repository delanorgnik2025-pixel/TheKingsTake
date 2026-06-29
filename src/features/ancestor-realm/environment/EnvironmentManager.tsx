import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import type { TimeOfDay, WeatherState } from '../types'

const TimePresets: Record<string, TimeOfDay> = {
  sunrise: { hour: 6, name: 'Sunrise', sunColor: '#FF8C42', sunIntensity: 1.5, ambientIntensity: 0.4, skyColor: '#FFECD2', fogColor: '#FFB347', fogDensity: 0.015 },
  noon: { hour: 12, name: 'Noon', sunColor: '#FFF5E0', sunIntensity: 2.5, ambientIntensity: 0.6, skyColor: '#87CEEB', fogColor: '#E0F0FF', fogDensity: 0.008 },
  sunset: { hour: 18, name: 'Sunset', sunColor: '#FF5E3A', sunIntensity: 1.8, ambientIntensity: 0.35, skyColor: '#FF9A76', fogColor: '#FF8C69', fogDensity: 0.02 },
  moonlight: { hour: 0, name: 'Moonlight', sunColor: '#A0B4D0', sunIntensity: 0.4, ambientIntensity: 0.15, skyColor: '#0B1426', fogColor: '#1A2744', fogDensity: 0.025 },
}

interface EnvContextType {
  timeOfDay: TimeOfDay
  weather: WeatherState
  setTime: (key: string) => void
  setWeather: (w: WeatherState) => void
  cycleTime: () => void
}

const EnvContext = createContext<EnvContextType | null>(null)
export const useEnvironment = () => {
  const ctx = useContext(EnvContext)
  if (!ctx) throw new Error('useEnvironment must be inside EnvironmentProvider')
  return ctx
}

const timeKeys = Object.keys(TimePresets)

export const EnvironmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [timeKey, setTimeKey] = useState('noon')
  const [weather, setWeather] = useState<WeatherState>({ type: 'clear', intensity: 0 })

  const timeOfDay = TimePresets[timeKey]

  const cycleTime = useCallback(() => {
    setTimeKey(prev => {
      const idx = timeKeys.indexOf(prev)
      return timeKeys[(idx + 1) % timeKeys.length]
    })
  }, [])

  const setTime = useCallback((key: string) => {
    if (TimePresets[key]) setTimeKey(key)
  }, [])

  const value = useMemo(() => ({ timeOfDay, weather, setTime, setWeather, cycleTime }), [timeOfDay, weather, cycleTime, setTime])

  return <EnvContext.Provider value={value}>{children}</EnvContext.Provider>
}
