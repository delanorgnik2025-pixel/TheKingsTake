import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, VolumeX, Play, Pause } from 'lucide-react'

const AUDIO_SRC = '/audio/ambient-heritage.mp3'

function FloatingAudioControl({ audioRef }: { audioRef: React.RefObject<HTMLAudioElement | null> }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.4)
  const [isMuted, setIsMuted] = useState(false)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    const onEnded = () => { audio.currentTime = 0; audio.play().catch(() => {}) }

    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('ended', onEnded)
    return () => {
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('ended', onEnded)
    }
  }, [audioRef])

  const togglePlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      audio.play().catch(() => {})
    } else {
      audio.pause()
    }
  }, [audioRef])

  const toggleMute = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.muted = !audio.muted
    setIsMuted(audio.muted)
  }, [audioRef])

  const handleVolume = useCallback((v: number) => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = v
    setVolume(v)
    if (v > 0 && audio.muted) { audio.muted = false; setIsMuted(false) }
  }, [audioRef])

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      className="fixed bottom-4 right-4 z-[60] flex items-center gap-2"
    >
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            className="flex items-center gap-2 overflow-hidden"
          >
            <button
              onClick={toggleMute}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-[#15202B]/90 backdrop-blur border border-[rgba(255,149,0,0.2)] text-[#C9B99A] hover:text-[#FF9500] hover:border-[rgba(255,149,0,0.4)] transition-all"
            >
              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={isMuted ? 0 : volume}
              onChange={(e) => handleVolume(parseFloat(e.target.value))}
              className="w-20 accent-[#FF9500] h-1"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => { togglePlay(); setExpanded(true) }}
        className={`flex items-center gap-2 rounded-full px-3 py-2 border transition-all backdrop-blur ${
          isPlaying
            ? 'bg-[rgba(255,149,0,0.15)] border-[rgba(255,149,0,0.4)] text-[#FF9500]'
            : 'bg-[#15202B]/90 border-[rgba(255,149,0,0.2)] text-[#C9B99A] hover:text-[#FF9500] hover:border-[rgba(255,149,0,0.4)]'
        }`}
      >
        {isPlaying ? <Pause size={14} /> : <Play size={14} />}
        <span className="text-[10px] uppercase tracking-wider hidden sm:inline">
          {isPlaying ? 'Pause' : 'Play'}
        </span>
        {isPlaying && (
          <span className="flex gap-0.5 items-end h-3">
            {[0, 1, 2].map(i => (
              <motion.span
                key={i}
                className="w-[2px] bg-[#FF9500] rounded-full"
                animate={{ height: [4, 12, 6, 10, 4] }}
                transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2, ease: 'easeInOut' }}
              />
            ))}
          </span>
        )}
      </button>
    </motion.div>
  )
}

export default function AudioExperience() {
  const audioRef = useRef<HTMLAudioElement>(null)

  return (
    <>
      <audio ref={audioRef} src={AUDIO_SRC} preload="auto" />
      <FloatingAudioControl audioRef={audioRef} />
    </>
  )
}
