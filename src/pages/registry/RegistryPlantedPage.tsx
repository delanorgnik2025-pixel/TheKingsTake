// PAGE 6 — PLANTED COMPLETION
// Route: /ancestor-root-registry/planted

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import { TreePine, Users, Calendar, ArrowRight, UserPlus, BookOpen, Share2, AlertTriangle } from 'lucide-react'
import { loadRegistryData, getRegistrySummary } from '@/lib/registry-storage'
import type { RegistryData, RegistrySummary } from '@/types/registry'

export default function RegistryPlantedPage() {
  const navigate = useNavigate()
  const [data, setData] = useState<RegistryData | null>(null)
  const [summary, setSummary] = useState<RegistrySummary | null>(null)

  useEffect(() => {
    const d = loadRegistryData()
    if (!d) {
      navigate('/ancestor-root-registry/access')
      return
    }
    setData(d)
    setSummary(getRegistrySummary(d))
  }, [navigate])

  if (!data || !summary) return null

  return (
    <div className="min-h-screen bg-[#05080e]">
      <div className="max-w-2xl mx-auto px-4 py-16 md:py-24 text-center">
        {/* Animated tree growth visual */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="relative inline-flex items-center justify-center w-28 h-28">
            {/* Pulsing rings */}
            <motion.div
              className="absolute inset-0 rounded-full border border-[rgba(255,149,0,0.15)]"
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-2 rounded-full border border-[rgba(201,185,154,0.1)]"
              animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0, 0.2] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            />
            {/* Tree icon */}
            <div className="relative w-20 h-20 rounded-full bg-[rgba(255,149,0,0.1)] border border-[rgba(255,149,0,0.2)] flex items-center justify-center">
              <TreePine size={36} className="text-[#FF9500]" strokeWidth={1.2} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#FF9500]/60 mb-3">
            Your Bloodline Has Been Planted
          </p>

          <h1
            className="text-3xl md:text-4xl text-[#F0EBE1] font-medium mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {data.registry.name}
          </h1>

          {data.registry.familyMotto && (
            <p className="text-sm text-[#C9B99A]/60 italic mb-6">&ldquo;{data.registry.familyMotto}&rdquo;</p>
          )}

          {/* Stats */}
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="flex items-center gap-2">
              <Users size={14} className="text-[#C9B99A]/50" />
              <span className="text-sm text-[#F0EBE1]">{summary.peopleCount}</span>
              <span className="text-xs text-[#C9B99A]/40">people</span>
            </div>
            <div className="w-px h-4 bg-[rgba(201,185,154,0.15)]" />
            <div className="flex items-center gap-2">
              <TreePine size={14} className="text-[#C9B99A]/50" />
              <span className="text-sm text-[#F0EBE1]">{summary.generationCount}</span>
              <span className="text-xs text-[#C9B99A]/40">generations</span>
            </div>
            <div className="w-px h-4 bg-[rgba(201,185,154,0.15)]" />
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-[#C9B99A]/50" />
              <span className="text-xs text-[#C9B99A]/40">
                {new Date(data.registry.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="space-y-3 max-w-sm mx-auto mb-10"
        >
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => navigate('/ancestor-root-registry/dashboard')}
            className="w-full p-4 rounded-xl flex items-center justify-center gap-2 text-sm font-medium cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, rgba(255,149,0,0.9), rgba(255,149,0,0.7))',
              color: '#0A0F1A',
            }}
          >
            Enter My Registry <ArrowRight size={16} />
          </motion.button>

          <div className="grid grid-cols-3 gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/ancestor-root-registry/build')}
              className="p-3 rounded-xl border border-[rgba(201,185,154,0.1)] bg-[rgba(27,40,56,0.3)] text-[#C9B99A] hover:border-[rgba(255,149,0,0.2)] transition-all cursor-pointer flex flex-col items-center gap-1"
            >
              <UserPlus size={16} />
              <span className="text-[10px]">Add Relative</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/ancestor-root-registry/stories')}
              className="p-3 rounded-xl border border-[rgba(201,185,154,0.1)] bg-[rgba(27,40,56,0.3)] text-[#C9B99A] hover:border-[rgba(255,149,0,0.2)] transition-all cursor-pointer flex flex-col items-center gap-1"
            >
              <BookOpen size={16} />
              <span className="text-[10px]">Add Story</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/ancestor-root-registry/share')}
              className="p-3 rounded-xl border border-[rgba(201,185,154,0.1)] bg-[rgba(27,40,56,0.3)] text-[#C9B99A] hover:border-[rgba(255,149,0,0.2)] transition-all cursor-pointer flex flex-col items-center gap-1"
            >
              <Share2 size={16} />
              <span className="text-[10px]">Share</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Temporary storage warning */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="p-4 rounded-lg border border-[rgba(255,149,0,0.1)] bg-[rgba(255,149,0,0.02)] flex items-start gap-2 max-w-md mx-auto"
        >
          <AlertTriangle size={14} className="text-[#FF9500]/40 shrink-0 mt-0.5" />
          <p className="text-[10px] text-[#C9B99A]/40 leading-relaxed text-left">
            Phase 1 registry information is stored temporarily in this browser. Secure accounts,
            cloud storage, family invitations and protected document storage are planned for the
            full platform release.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
