import React, { createContext, useContext, useState, useEffect, useMemo } from 'react'
import type { GPUQuality } from '../types'

const WorldContext = createContext<{
  quality: GPUQuality
  progress: number
  setProgress: (p: number) => void
  loaded: boolean
  setLoaded: (v: boolean) => void
} | null>(null)

export const useWorld = () => {
  const ctx = useContext(WorldContext)
  if (!ctx) throw new Error('useWorld must be inside WorldProvider')
  return ctx
}

function detectGPU(): GPUQuality {
  const canvas = document.createElement('canvas')
  const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
  if (!gl) return { tier: 'low', pixelRatio: 1, shadows: false, postProcessing: false, particleCount: 50, grassCount: 500, treeDetail: 'low' }

  const debugInfo = gl.getExtension('webgl_debug_renderer_info')
  const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : ''
  const isMobile = /Mobi|Android/i.test(navigator.userAgent)
  const dpr = Math.min(window.devicePixelRatio, 2)

  const highEnd = /Apple GPU|Apple M|NVIDIA|RTX|Radeon RX|Intel.*Iris/i.test(renderer)
  const midRange = /Intel|Adreno 6|Mali-G7/i.test(renderer)

  if (highEnd && !isMobile) return { tier: 'ultra', pixelRatio: dpr, shadows: true, postProcessing: true, particleCount: 300, grassCount: 5000, treeDetail: 'high' }
  if (highEnd || midRange) return { tier: 'high', pixelRatio: Math.min(dpr, 1.5), shadows: true, postProcessing: true, particleCount: 200, grassCount: 3000, treeDetail: 'high' }
  if (midRange || isMobile) return { tier: 'medium', pixelRatio: 1, shadows: false, postProcessing: true, particleCount: 100, grassCount: 1500, treeDetail: 'medium' }
  return { tier: 'low', pixelRatio: 1, shadows: false, postProcessing: false, particleCount: 50, grassCount: 500, treeDetail: 'low' }
}

export const WorldProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [quality] = useState(detectGPU)
  const [progress, setProgress] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const value = useMemo(() => ({ quality, progress, setProgress, loaded, setLoaded }), [quality, progress, loaded])
  return <WorldContext.Provider value={value}>{children}</WorldContext.Provider>
}
