// PAGE 7 — REGISTRY DASHBOARD
// Route: /ancestor-root-registry/dashboard
// Central hub for the registry

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import {
  TreePine, Users, BookOpen, Search, Share2, Folder, Image, Lock,
  UserPlus, Plus, FileDown, Trash2, ArrowRight, Sparkles, AlertTriangle,
  Clock, FileText, HelpCircle
} from 'lucide-react'
import { loadRegistryData, getRegistrySummary, deleteRegistry, downloadRegistryBackup } from '@/lib/registry-storage'
import type { RegistryData, RegistrySummary } from '@/types/registry'
import ScrollReveal from '@/components/ScrollReveal'

const sections = [
  { key: 'tree', label: 'Family Tree', icon: TreePine, desc: 'Visualize your bloodline', color: '#FF9500', route: '/ancestor-root-registry/tree' },
  { key: 'people', label: 'People', icon: Users, desc: 'All family members', color: '#C9B99A', route: '/ancestor-root-registry/people' },
  { key: 'stories', label: 'Stories', icon: BookOpen, desc: 'Family narratives', color: '#4CAF50', route: '/ancestor-root-registry/stories' },
  { key: 'research', label: 'Research', icon: Search, desc: 'Track your findings', color: '#2196F3', route: '/ancestor-root-registry/research' },
  { key: 'documents', label: 'Documents', icon: Folder, desc: 'Coming in secure release', color: '#9E9E9E', route: '', comingSoon: true },
  { key: 'photos', label: 'Photos', icon: Image, desc: 'Coming in secure release', color: '#9E9E9E', route: '', comingSoon: true },
  { key: 'access', label: 'Family Access', icon: Lock, desc: 'Coming in full platform', color: '#9E9E9E', route: '', comingSoon: true },
  { key: 'share', label: 'Share', icon: Share2, desc: 'Privacy-safe share cards', color: '#FF9500', route: '/ancestor-root-registry/share' },
]

export default function RegistryDashboardPage() {
  const navigate = useNavigate()
  const [data, setData] = useState<RegistryData | null>(null)
  const [summary, setSummary] = useState<RegistrySummary | null>(null)
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  useEffect(() => {
    load()
  }, [])

  function load() {
    const d = loadRegistryData()
    if (!d) {
      navigate('/ancestor-root-registry/access')
      return
    }
    setData(d)
    setSummary(getRegistrySummary(d))
  }

  function handleReset() {
    deleteRegistry()
    setShowResetConfirm(false)
    navigate('/ancestor-root-registry')
  }

  function handleExport() {
    if (data) downloadRegistryBackup(data)
  }

  if (!data || !summary) return null

  return (
    <div className="min-h-screen bg-[#05080e]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0A0F1A]/95 backdrop-blur-md border-b border-[rgba(201,185,154,0.08)]">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => navigate('/ancestor-root-registry')}
            className="flex items-center gap-2 text-xs text-[#C9B99A] hover:text-[#FF9500] transition-colors cursor-pointer"
          >
            <TreePine size={14} /> Registry Home
          </button>
          <div className="flex items-center gap-2">
            <span className="text-[9px] uppercase tracking-[0.15em] px-2 py-0.5 rounded bg-[rgba(255,149,0,0.1)] text-[#FF9500]/60">
              {data.registry.primarySurname}
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Registry Header */}
        <ScrollReveal>
          <div className="mb-10">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1
                  className="text-2xl md:text-3xl text-[#F0EBE1] font-medium mb-1"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {data.registry.name}
                </h1>
                {data.registry.familyMotto && (
                  <p className="text-sm text-[#C9B99A]/50 italic">&ldquo;{data.registry.familyMotto}&rdquo;</p>
                )}
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-[#C9B99A]/30">
                <Clock size={10} />
                Updated {new Date(data.registry.updatedAt).toLocaleDateString()}
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full h-1.5 bg-[rgba(201,185,154,0.08)] rounded-full overflow-hidden mb-2">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(100, (summary.peopleCount / 10) * 100)}%`,
                  background: 'linear-gradient(90deg, rgba(255,149,0,0.6), rgba(201,185,154,0.4))',
                }}
              />
            </div>
            <p className="text-[10px] text-[#C9B99A]/30">{summary.peopleCount} people &middot; {summary.generationCount} generations</p>
          </div>
        </ScrollReveal>

        {/* Quick Stats */}
        <ScrollReveal delay={0.05}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
            {[
              { label: 'People', value: summary.peopleCount, icon: Users, color: '#FF9500' },
              { label: 'Stories', value: summary.storiesCount, icon: BookOpen, color: '#4CAF50' },
              { label: 'Research', value: summary.researchNotesCount, icon: Search, color: '#2196F3' },
              { label: 'Documented', value: summary.documentedCount, icon: FileText, color: '#C9B99A' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -2 }}
                className="p-4 rounded-xl bg-[rgba(27,40,56,0.4)] border border-[rgba(201,185,154,0.06)]"
              >
                <div className="flex items-center gap-2 mb-2">
                  <stat.icon size={14} style={{ color: stat.color }} strokeWidth={1.5} />
                  <span className="text-[10px] uppercase tracking-wider text-[#C9B99A]/40">{stat.label}</span>
                </div>
                <p className="text-2xl text-[#F0EBE1] font-medium">{stat.value}</p>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        {/* Quick Actions */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap gap-2 mb-10">
            {[
              { label: 'Add Person', icon: UserPlus, action: () => navigate('/ancestor-root-registry/build') },
              { label: 'Add Story', icon: Plus, action: () => navigate('/ancestor-root-registry/stories') },
              { label: 'Add Research', icon: Search, action: () => navigate('/ancestor-root-registry/research') },
              { label: 'View Tree', icon: TreePine, action: () => navigate('/ancestor-root-registry/tree') },
              { label: 'Export', icon: FileDown, action: handleExport },
            ].map((action, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={action.action}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs border border-[rgba(201,185,154,0.1)] bg-[rgba(27,40,56,0.3)] text-[#C9B99A] hover:border-[rgba(255,149,0,0.2)] hover:text-[#F0EBE1] transition-all cursor-pointer"
              >
                <action.icon size={12} /> {action.label}
              </motion.button>
            ))}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowResetConfirm(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs border border-[rgba(244,67,54,0.15)] bg-[rgba(244,67,54,0.05)] text-[#C9B99A]/50 hover:text-[#f44336] hover:border-[rgba(244,67,54,0.3)] transition-all cursor-pointer"
            >
              <Trash2 size={12} /> Reset
            </motion.button>
          </div>
        </ScrollReveal>

        {/* Main Sections Grid */}
        <ScrollReveal delay={0.15}>
          <h2 className="text-sm text-[#C9B99A]/40 uppercase tracking-wider mb-4">Registry Sections</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
            {sections.map((section, i) => (
              <motion.button
                key={section.key}
                whileHover={!section.comingSoon ? { y: -3 } : {}}
                whileTap={!section.comingSoon ? { scale: 0.98 } : {}}
                onClick={() => !section.comingSoon && section.route && navigate(section.route)}
                disabled={section.comingSoon}
                className="p-5 rounded-xl border text-left transition-all cursor-pointer disabled:cursor-default"
                style={{
                  borderColor: section.comingSoon ? 'rgba(201,185,154,0.04)' : 'rgba(201,185,154,0.08)',
                  background: section.comingSoon ? 'rgba(27,40,56,0.15)' : 'rgba(27,40,56,0.35)',
                  opacity: section.comingSoon ? 0.5 : 1,
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <section.icon size={20} style={{ color: section.color }} strokeWidth={1.5} />
                  {section.comingSoon && (
                    <span className="text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-[rgba(201,185,154,0.08)] text-[#C9B99A]/30">
                      Soon
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#F0EBE1] font-medium mb-1">{section.label}</p>
                <p className="text-[11px] text-[#C9B99A]/40">{section.desc}</p>
              </motion.button>
            ))}
          </div>
        </ScrollReveal>

        {/* Future Ancestral Realm teaser */}
        <ScrollReveal delay={0.2}>
          <div className="p-6 rounded-xl border border-[rgba(156,39,176,0.1)] bg-[rgba(156,39,176,0.03)] mb-10">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={16} className="text-[rgba(156,39,176,0.5)]" />
              <p className="text-sm text-[#F0EBE1]/70 font-medium">Future Ancestral Realm</p>
            </div>
            <p className="text-xs text-[#C9B99A]/40 leading-relaxed mb-3">
              Your Registry records will eventually power 3D ancestor representations, family museums,
              interactive timelines, and immersive Ancestral Realm environments.
            </p>
            <p className="text-[10px] text-[#C9B99A]/25">Meshy, Spline, and the Ancestral Realm will visualize Registry data.</p>
          </div>
        </ScrollReveal>

        {/* Storage notice */}
        <div className="p-4 rounded-lg border border-[rgba(255,149,0,0.08)] bg-[rgba(255,149,0,0.02)] flex items-start gap-3">
          <AlertTriangle size={14} className="text-[#FF9500]/40 shrink-0 mt-0.5" />
          <p className="text-[10px] text-[#C9B99A]/35 leading-relaxed">
            Phase 1 registry information is stored temporarily in this browser. Secure accounts, cloud storage,
            family invitations and protected document storage are planned for the full platform release.
          </p>
        </div>
      </div>

      {/* Reset confirmation modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0A0F1A] border border-[rgba(244,67,54,0.2)] rounded-xl p-6 max-w-sm w-full"
          >
            <Trash2 size={24} className="text-[#f44336] mb-3" />
            <p className="text-base text-[#F0EBE1] font-medium mb-2">Reset Registry?</p>
            <p className="text-sm text-[#C9B99A]/50 mb-6">
              This will permanently delete all people, stories, and research notes from this browser.
              Make sure you have exported a backup if you want to keep your data.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2.5 rounded-lg text-sm text-[#C9B99A] border border-[rgba(201,185,154,0.1)] hover:bg-[rgba(201,185,154,0.05)] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="flex-1 py-2.5 rounded-lg text-sm text-white bg-[#f44336] hover:bg-[#d32f2f] transition-colors cursor-pointer"
              >
                Reset Everything
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
