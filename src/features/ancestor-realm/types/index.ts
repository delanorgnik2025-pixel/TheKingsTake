import type { Vector3 } from 'three'

export interface AncestorProfile {
  firstName: string
  lastName: string
  relation: string
  birthYear?: string
  birthPlace?: string
  tribalAffiliation?: string
  stories?: string
}

export interface AncestorTree {
  root: AncestorProfile
  father?: AncestorProfile
  mother?: AncestorProfile
  paternalGrandfather?: AncestorProfile
  paternalGrandmother?: AncestorProfile
  maternalGrandfather?: AncestorProfile
  maternalGrandmother?: AncestorProfile
}

export interface AncestorRealmDraft {
  tree: AncestorTree
  createdAt: string
  updatedAt: string
}

export interface GPUQuality {
  tier: 'low' | 'medium' | 'high' | 'ultra'
  pixelRatio: number
  shadows: boolean
  postProcessing: boolean
  particleCount: number
  grassCount: number
  treeDetail: 'low' | 'medium' | 'high'
}

export interface ZoneConfig {
  id: string
  name: string
  position: Vector3
  radius: number
  description: string
}

export interface TimeOfDay {
  hour: number
  name: string
  sunColor: string
  sunIntensity: number
  ambientIntensity: number
  skyColor: string
  fogColor: string
  fogDensity: number
}

export interface WeatherState {
  type: 'clear' | 'rain' | 'mist' | 'sunset' | 'moonlight'
  intensity: number
}
