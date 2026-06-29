import { motion } from 'framer-motion'
import { TreePine, RotateCcw, ChevronDown } from 'lucide-react'
import type { GenealogyProfile } from './GenealogyOnboarding'
import { TREE_TEMPLATES } from '../data/familyTreeTemplates'

interface Props {
  profile: GenealogyProfile
  onReset: () => void
}

export default function TreeArtDisplay({ profile, onReset }: Props) {
  const tree = TREE_TEMPLATES.find(t => t.id === profile.selectedTreeId) || TREE_TEMPLATES[0]

  return (
    <div className="relative">
      {/* Tree Art Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-2xl overflow-hidden border border-[rgba(255,149,0,0.2)] shadow-2xl"
      >
        {/* Tree Image */}
        <div className="relative">
          <img
            src={tree.image}
            alt={tree.name}
            className="w-full max-h-[70vh] object-cover object-top"
          />

          {/* Name Overlay - Root Person */}
          <div className="absolute bottom-[18%] left-1/2 -translate-x-1/2 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-[rgba(10,15,26,0.7)] backdrop-blur-sm border border-[rgba(255,149,0,0.3)] rounded-xl px-6 py-3"
              style={{ boxShadow: `0 0 20px ${tree.accentColor}30` }}
            >
              <p className="text-xs text-[#FF9500] uppercase tracking-[0.15em] mb-0.5">{profile.rootPerson.tribalAffiliation || 'Ancestral Lineage'}</p>
              <p className="text-lg md:text-xl text-[#F0EBE1] font-medium tracking-wide">
                {profile.rootPerson.firstName} {profile.rootPerson.lastName}
              </p>
              <p className="text-[10px] text-[#C9B99A]/60 mt-1">
                {profile.rootPerson.birthPlace}{profile.rootPerson.birthState ? `, ${profile.rootPerson.birthState}` : ''}
              </p>
            </motion.div>
          </div>

          {/* Tree Name Badge */}
          <div className="absolute top-3 right-3">
            <div className="bg-[rgba(10,15,26,0.7)] backdrop-blur-sm border border-[rgba(255,149,0,0.15)] rounded-lg px-3 py-1.5 flex items-center gap-1.5">
              <TreePine size={11} style={{ color: tree.accentColor }} />
              <span className="text-[10px] text-[#F0EBE1]">{tree.name}</span>
            </div>
          </div>

          {/* Gradient fade at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0f1a] to-transparent" />
        </div>

        {/* Info Bar */}
        <div className="bg-[#0a0f1a] px-4 py-3 flex flex-wrap items-center justify-between gap-2 border-t border-[rgba(255,149,0,0.1)]">
          <div className="flex items-center gap-4 text-[10px] text-[#C9B99A]/60">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tree.accentColor }} />
              {tree.mood}
            </span>
            <span>Spirits: {tree.spirits}</span>
          </div>
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-[10px] text-[#C9B99A]/40 hover:text-[#FF9500] transition-colors"
          >
            <RotateCcw size={10} /> Start Fresh
          </button>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="flex justify-center mt-3">
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-[#C9B99A]/30"
        >
          <ChevronDown size={16} />
        </motion.div>
      </div>
    </div>
  )
}
