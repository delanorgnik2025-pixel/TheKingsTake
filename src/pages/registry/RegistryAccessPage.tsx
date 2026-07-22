// PAGE 3 — CREATE OR OPEN REGISTRY
// Route: /ancestor-root-registry/access

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import { ArrowLeft, Plus, FolderOpen, KeyRound, TreePine, AlertTriangle } from 'lucide-react'
import { hasRegistry } from '@/lib/registry-storage'
import ScrollReveal from '@/components/ScrollReveal'

export default function RegistryAccessPage() {
  const navigate = useNavigate()
  const [existing, setExisting] = useState(false)

  useEffect(() => {
    setExisting(hasRegistry())
  }, [])

  return (
    <div className="min-h-screen bg-[#05080e]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0A0F1A]/95 backdrop-blur-md border-b border-[rgba(201,185,154,0.08)]">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => navigate('/ancestor-root-registry/why')}
            className="flex items-center gap-2 text-xs text-[#C9B99A] hover:text-[#FF9500] transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} /> Back
          </button>
          <span className="text-[9px] uppercase tracking-[0.2em] text-[#C9B99A]/30">Ancestor Root Registry</span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-16 md:py-24">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#FF9500]/60 mb-4">Begin</p>
            <h1
              className="text-3xl md:text-4xl text-[#F0EBE1] font-medium mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Create or Open Registry
            </h1>
            <p className="text-sm text-[#C9B99A]/50">
              Start a new family archive or continue one already begun on this device.
            </p>
          </div>
        </ScrollReveal>

        {/* Options */}
        <div className="space-y-4">
          {/* Create New */}
          <ScrollReveal delay={0.1}>
            <motion.button
              whileHover={{ scale: 1.01, y: -2 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => navigate('/ancestor-root-registry/create')}
              className="w-full p-6 rounded-xl border border-[rgba(255,149,0,0.2)] bg-[rgba(255,149,0,0.05)] hover:border-[rgba(255,149,0,0.4)] hover:bg-[rgba(255,149,0,0.08)] transition-all duration-300 text-left cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[rgba(255,149,0,0.15)] flex items-center justify-center shrink-0">
                  <Plus size={22} className="text-[#FF9500]" />
                </div>
                <div>
                  <p className="text-base text-[#F0EBE1] font-medium mb-1">Create New Registry</p>
                  <p className="text-xs text-[#C9B99A]/50">Start a fresh family bloodline archive</p>
                </div>
              </div>
            </motion.button>
          </ScrollReveal>

          {/* Continue Existing */}
          {existing && (
            <ScrollReveal delay={0.15}>
              <motion.button
                whileHover={{ scale: 1.01, y: -2 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => navigate('/ancestor-root-registry/dashboard')}
                className="w-full p-6 rounded-xl border border-[rgba(76,175,80,0.2)] bg-[rgba(76,175,80,0.05)] hover:border-[rgba(76,175,80,0.4)] hover:bg-[rgba(76,175,80,0.08)] transition-all duration-300 text-left cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[rgba(76,175,80,0.15)] flex items-center justify-center shrink-0">
                    <FolderOpen size={22} className="text-[#4CAF50]" />
                  </div>
                  <div>
                    <p className="text-base text-[#F0EBE1] font-medium mb-1">Continue My Registry</p>
                    <p className="text-xs text-[#C9B99A]/50">Resume working on your existing archive</p>
                  </div>
                </div>
              </motion.button>
            </ScrollReveal>
          )}

          {/* Access Key — Coming Soon */}
          <ScrollReveal delay={0.2}>
            <div className="w-full p-6 rounded-xl border border-[rgba(201,185,154,0.08)] bg-[rgba(27,40,56,0.2)] opacity-60">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[rgba(201,185,154,0.08)] flex items-center justify-center shrink-0">
                  <KeyRound size={22} className="text-[#C9B99A]/40" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-base text-[#C9B99A]/50 font-medium">Enter Family Access Key</p>
                    <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-[rgba(201,185,154,0.1)] text-[#C9B99A]/50">Coming Soon</span>
                  </div>
                  <p className="text-xs text-[#C9B99A]/30">Access shared family Registries across devices</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* localStorage notice */}
        <ScrollReveal delay={0.25}>
          <div className="mt-8 p-4 rounded-lg border border-[rgba(255,149,0,0.1)] bg-[rgba(255,149,0,0.02)] flex items-start gap-3">
            <AlertTriangle size={16} className="text-[#FF9500]/50 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-[#C9B99A]/60 leading-relaxed">
                <strong className="text-[#F0EBE1]/70">Temporary Storage:</strong> Phase 1 registry information is stored
                temporarily in this browser. It cannot be opened on another device. Secure accounts, cloud storage,
                family invitations, and protected document storage are planned for the full platform release.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Back to landing */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/ancestor-root-registry')}
            className="text-xs text-[#C9B99A]/40 hover:text-[#C9B99A]/70 transition-colors cursor-pointer"
          >
            <TreePine size={12} className="inline mr-1" /> Back to Registry Home
          </button>
        </div>
      </div>
    </div>
  )
}
