import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, VolumeX, Play, Pause, Music, ChevronRight } from 'lucide-react'

const AUDIO_SRC = '/audio/ambient-heritage.mp3'
const SESSION_KEY = 'tk-audio-session'

// Floating audio control (visible after user opts in)
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

// Entrance overlay — shown every NEW browser session (not permanently)
function EntranceOverlay({ onEnter, onEnterWithSound }: { onEnter: () => void; onEnterWithSound: () => void }) {
  // Ensure tap works on mobile by using onTouchEnd + onClick
  const handleSound = useCallback(() => onEnterWithSound(), [onEnterWithSound])
  const handleQuiet = useCallback(() => onEnter(), [onEnter])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="fixed inset-0 z-[100] bg-[#0a0f1a] flex items-center justify-center"
      style={{ touchAction: 'manipulation' }}
    >
      {/* Cosmic background effect */}
      <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: 'url(/images/cosmic-bg.jpg)' }} />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a]/60 via-transparent to-[#0a0f1a]/90" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="relative z-10 text-center px-6 max-w-lg"
      >
        {/* Animated bars */}
        <div className="flex justify-center gap-1 mb-8">
          {[0, 1, 2, 3, 4].map(i => (
            <motion.div
              key={i}
              className="w-1 bg-[#FF9500] rounded-full"
              animate={{ height: [20, 50, 30, 60, 20] }}
              transition={{ repeat: Infinity, duration: 2, delay: i * 0.15, ease: 'easeInOut' }}
            />
          ))}
        </div>

        <p className="text-xs uppercase tracking-[0.2em] text-[#FF9500] mb-4">AASOTU Media Group Presents</p>

        <h1 className="text-4xl md:text-5xl text-[#F0EBE1] tracking-[-0.02em] leading-[1.1] mb-3 text-shadow-hero">
          We Were Here<br />Before Anybody
        </h1>

        <p className="text-sm text-[#C9B99A]/80 mb-8 leading-relaxed">
          Enter the experience. Explore 225+ Indigenous nations, tribal rolls, treaties, and the records they tried to hide.
        </p>

        {/* Mobile-optimized buttons — larger tap targets, full width on small screens */}
        <div className="flex flex-col gap-3 justify-center">
          <button
            onClick={handleSound}
            onTouchEnd={(e) => { e.preventDefault(); handleSound() }}
            className="flex items-center justify-center gap-2 bg-[rgba(255,149,0,0.15)] border border-[rgba(255,149,0,0.4)] text-[#FF9500] rounded-xl px-6 py-4 min-h-[52px] hover:bg-[rgba(255,149,0,0.25)] transition-all active:scale-95 select-none"
            style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
          >
            <Music size={18} />
            <span className="text-base font-medium">Enter With Sound</span>
            <ChevronRight size={16} />
          </button>

          <button
            onClick={handleQuiet}
            onTouchEnd={(e) => { e.preventDefault(); handleQuiet() }}
            className="flex items-center justify-center gap-2 bg-[rgba(27,40,56,0.6)] border border-[rgba(255,149,0,0.15)] text-[#C9B99A] rounded-xl px-6 py-4 min-h-[52px] hover:border-[rgba(255,149,0,0.3)] hover:text-[#F0EBE1] transition-all active:scale-95 select-none"
            style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
          >
            <span className="text-base">Enter Quietly</span>
            <ChevronRight size={16} />
          </button>
        </div>

        <p className="text-[10px] text-[#C9B99A]/30 mt-6 uppercase tracking-wider">
          #TheKingsTake — Indigenous Aboriginal Royal Americans
        </p>
      </motion.div>
    </motion.div>
  )
}

// ============================================
// MAIN EXPORT
// ============================================
export default function AudioExperience() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [showOverlay, setShowOverlay] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(false)

  useEffect(() => {
    // Use sessionStorage so prompt shows every new browser session
    // NOT localStorage — user wants to see it on each fresh visit
    const dismissedThisSession = sessionStorage.getItem(SESSION_KEY)
    if (dismissedThisSession !== 'dismissed') {
      setShowOverlay(true)
    }
  }, [])

  useEffect(() => {
    if (audioEnabled && audioRef.current) {
      audioRef.current.volume = 0.4
      audioRef.current.loop = true
      audioRef.current.play().catch(() => {
        // Browser blocked autoplay — user will need to click play
      })
    }
  }, [audioEnabled])

  const handleEnterWithSound = useCallback(() => {
    sessionStorage.setItem(SESSION_KEY, 'dismissed')
    setAudioEnabled(true)
    setShowOverlay(false)
  }, [])

  const handleEnterSilent = useCallback(() => {
    sessionStorage.setItem(SESSION_KEY, 'dismissed')
    setAudioEnabled(false)
    setShowOverlay(false)
  }, [])

  return (
    <>
      {/* Hidden audio element */}
      <audio ref={audioRef} src={AUDIO_SRC} preload="auto" />

      {/* Entrance overlay — shown every new session */}
      <AnimatePresence>
        {showOverlay && (
          <EntranceOverlay onEnter={handleEnterSilent} onEnterWithSound={handleEnterWithSound} />
        )}
      </AnimatePresence>

      {/* Floating audio control (after overlay dismissed) */}
      {!showOverlay && <FloatingAudioControl audioRef={audioRef} />}
    </>
  )
}
