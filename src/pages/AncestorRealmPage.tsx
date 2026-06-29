import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TreePine, Sparkles, MessageCircle, Upload, Crown } from 'lucide-react'
import { WorldProvider } from '../features/ancestor-realm/scene/WorldManager'
import LoadingScreen from '../features/ancestor-realm/scene/LoadingScreen'
import GardenScene from '../features/ancestor-realm/scene/GardenScene'
import GardenOverlay from '../features/ancestor-realm/scene/GardenOverlay'
import AudioAmbient from '../features/ancestor-realm/scene/AudioAmbient'
import { REALM_COPY } from '../features/ancestor-realm/constants/copy'

export default function AncestorRealmPage() {
  const [entered, setEntered] = useState(false)

  if (!entered) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center px-6 relative overflow-hidden">
        {/* Background particles */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#FF9500] rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center relative z-10 max-w-lg"
        >
          {/* Sacred geometry icon */}
          <div className="w-20 h-20 mx-auto mb-6 relative">
            <div className="absolute inset-0 border border-[rgba(255,149,0,0.2)] rotate-45" />
            <div className="absolute inset-2 border border-[rgba(255,149,0,0.3)] rotate-12" />
            <div className="absolute inset-0 flex items-center justify-center">
              <TreePine size={28} className="text-[#FF9500]" />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl text-[#F0EBE1] font-medium tracking-[-0.02em] mb-3">
            {REALM_COPY.heroTitle}
          </h1>
          <p className="text-base text-[#C9B99A] leading-relaxed mb-8">
            {REALM_COPY.heroSubtitle}
          </p>

          {/* Feature preview cards */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {[
              { icon: MessageCircle, label: 'Ancestor Chat', desc: 'Speak with elders' },
              { icon: Upload, label: 'Sacred Gallery', desc: 'Share memories' },
              { icon: Sparkles, label: 'Story Weaver', desc: 'AI narratives' },
              { icon: Crown, label: 'Ancestor Pass', desc: 'Unlock all realms' },
            ].map((feat) => (
              <div
                key={feat.label}
                className="bg-[rgba(27,40,56,0.5)] border border-[rgba(255,149,0,0.1)] rounded-lg p-3 text-left"
              >
                <feat.icon size={16} className="text-[#FF9500] mb-1.5" />
                <p className="text-xs text-[#F0EBE1] font-medium">{feat.label}</p>
                <p className="text-[10px] text-[#C9B99A]/60">{feat.desc}</p>
              </div>
            ))}
          </div>

          <motion.button
            onClick={() => setEntered(true)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="bg-[rgba(255,149,0,0.15)] border border-[rgba(255,149,0,0.3)] text-[#FF9500] rounded-lg px-8 py-3 text-sm font-medium tracking-wider uppercase hover:bg-[rgba(255,149,0,0.25)] transition-all"
          >
            {REALM_COPY.enterButton}
          </motion.button>

          <p className="text-[10px] text-[#C9B99A]/40 mt-4">
            A sacred space for those who came before
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <WorldProvider>
      <div className="fixed inset-0 bg-[#0a0f1a]">
        <LoadingScreen />
        <GardenScene />
        <GardenOverlay />
        <AudioAmbient />
      </div>
    </WorldProvider>
  )
}
