import { motion } from 'framer-motion'
import {
  ClipboardList, Search, Microscope, Fingerprint, HeartPulse,
  Smartphone, Clock, BookOpen, Award, Lock, CheckCircle, MapPin
} from 'lucide-react'

export interface MapLocation {
  id: string
  label: string
  icon: React.ElementType
  status: 'locked' | 'available' | 'in-progress' | 'complete'
  progress?: string
}

interface InvestigationMapProps {
  locations: MapLocation[]
  currentLocation: string
  onNavigate: (id: string) => void
}

export default function InvestigationMap({ locations, currentLocation, onNavigate }: InvestigationMapProps) {
  return (
    <div className="bg-[rgba(12,21,32,0.95)] border-r border-[rgba(255,149,0,0.1)] h-full">
      <div className="p-4 border-b border-[rgba(255,149,0,0.1)]">
        <p className="text-[10px] uppercase tracking-[0.2em] text-[#FF9500]/60">Investigation Map</p>
        <p className="text-[10px] text-[#C9B99A]/40 mt-0.5">The Beach Homicide — Case #001</p>
      </div>
      <div className="p-3 space-y-1">
        {locations.map((loc, i) => {
          const Icon = loc.icon
          const isCurrent = loc.id === currentLocation
          const isLocked = loc.status === 'locked'
          const isComplete = loc.status === 'complete'

          return (
            <motion.button
              key={loc.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => !isLocked && onNavigate(loc.id)}
              disabled={isLocked}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left transition-all ${
                isCurrent
                  ? 'bg-[rgba(255,149,0,0.15)] border border-[rgba(255,149,0,0.3)]'
                  : isLocked
                    ? 'opacity-30 cursor-not-allowed'
                    : isComplete
                      ? 'hover:bg-[rgba(255,149,0,0.05)]'
                      : 'hover:bg-[rgba(255,149,0,0.08)]'
              }`}
            >
              <div className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 ${
                isComplete ? 'bg-green-500/10 text-green-400' :
                isCurrent ? 'bg-[rgba(255,149,0,0.2)] text-[#FF9500]' :
                isLocked ? 'bg-[#1B2838] text-[#C9B99A]/20' :
                'bg-[rgba(255,149,0,0.08)] text-[#C9B99A]/50'
              }`}>
                {isLocked ? <Lock size={12} /> : isComplete ? <CheckCircle size={12} /> : <Icon size={12} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-[11px] font-medium truncate ${
                  isCurrent ? 'text-[#FF9500]' : isLocked ? 'text-[#C9B99A]/30' : 'text-[#C9B99A]/70'
                }`}>{loc.label}</p>
                {loc.progress && (
                  <p className="text-[9px] text-[#C9B99A]/40">{loc.progress}</p>
                )}
              </div>
              {isCurrent && <MapPin size={12} className="text-[#FF9500] shrink-0" />}
            </motion.button>
          )
        })}
      </div>

      {/* Progress Summary */}
      <div className="p-4 border-t border-[rgba(255,149,0,0.1)] mt-auto">
        <div className="flex items-center justify-between text-[10px] mb-1">
          <span className="text-[#C9B99A]/40">Overall Progress</span>
          <span className="text-[#FF9500]">{locations.filter(l => l.status === 'complete').length}/{locations.length}</span>
        </div>
        <div className="w-full h-1 bg-[#1B2838] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#FF9500] rounded-full transition-all duration-500"
            style={{ width: `${(locations.filter(l => l.status === 'complete').length / locations.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}
