import { useState, useRef, useEffect } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

export default function AudioAmbient() {
  const [muted, setMuted] = useState(false)
  const [volume, setVolume] = useState(0.3)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Placeholder: would load ambient nature sounds
    // For now, just show the UI
    return () => { audioRef.current?.pause() }
  }, [])

  return (
    <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2 bg-[rgba(10,15,26,0.7)] backdrop-blur-sm border border-[rgba(255,149,0,0.15)] rounded-lg px-3 py-2">
      <button onClick={() => setMuted(!muted)} className="text-[#C9B99A] hover:text-[#FF9500] transition-colors">
        {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.05"
        value={volume}
        onChange={(e) => setVolume(parseFloat(e.target.value))}
        className="w-20 accent-[#FF9500]"
      />
      <span className="text-[10px] text-[#C9B99A] w-8">{Math.round(volume * 100)}%</span>
    </div>
  )
}
