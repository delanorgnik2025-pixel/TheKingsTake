import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WorldProvider } from '../features/ancestor-realm/scene/WorldManager'
import LoadingScreen from '../features/ancestor-realm/scene/LoadingScreen'
import GardenScene from '../features/ancestor-realm/scene/GardenScene'
import GardenOverlay from '../features/ancestor-realm/scene/GardenOverlay'
import RealmEntryPortal from '../features/ancestor-realm/components/RealmEntryPortal'

/* ─── The 3D Garden (wrapped in WorldProvider) ─── */
function GardenExperience() {
  return (
    <WorldProvider>
      <div className="fixed inset-0 bg-[#060a12]">
        <LoadingScreen />
        <GardenScene />
        <GardenOverlay />
      </div>
    </WorldProvider>
  )
}

/* ─── Main Page ─── */
export default function AncestorRealmPage() {
  const [entered, setEntered] = useState(false)

  return (
    <AnimatePresence mode="wait">
      {!entered ? (
        <motion.div
          key="portal"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <RealmEntryPortal onEnter={() => setEntered(true)} />
        </motion.div>
      ) : (
        <motion.div
          key="garden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <GardenExperience />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
