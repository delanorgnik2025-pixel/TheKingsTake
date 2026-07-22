// PAGE 13 — SHARE
// Route: /ancestor-root-registry/share
// Privacy-safe share cards

import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import { ArrowLeft, Share2, Copy, Check, TreePine, Users, BookOpen } from 'lucide-react'
import RegistryBackground from '@/components/RegistryBackground'
import { loadRegistryData, getRegistrySummary } from '@/lib/registry-storage'
import type { RegistryData, RegistrySummary } from '@/types/registry'

export default function RegistrySharePage() {
  const navigate = useNavigate()
  const [data, setData] = useState<RegistryData | null>(null)
  const [summary, setSummary] = useState<RegistrySummary | null>(null)
  const [copied, setCopied] = useState(false)
  const [nativeShare, setNativeShare] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const d = loadRegistryData()
    if (!d) {
      navigate('/ancestor-root-registry/access')
      return
    }
    setData(d)
    setSummary(getRegistrySummary(d))
    setNativeShare(!!navigator.share)
  }, [navigate])

  const shareText = summary && data
    ? `The ${data.registry.primarySurname} Family Bloodline Has Been Planted on the Ancestor Root Registry. ${summary.peopleCount} ${summary.peopleCount === 1 ? 'Person' : 'People'} Preserved Across ${summary.generationCount} ${summary.generationCount === 1 ? 'Generation' : 'Generations'}. #TheKingsTake`
    : ''

  function handleCopy() {
    navigator.clipboard.writeText(shareText).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  function handleNativeShare() {
    if (navigator.share) {
      navigator.share({
        title: `${data?.registry.name} — Ancestor Root Registry`,
        text: shareText,
        url: 'https://thekingstake.com',
      }).catch(() => {})
    }
  }

  if (!data || !summary) return null

  return (
    <RegistryBackground variant="subpage">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md border-b border-[rgba(201,185,154,0.08)]">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => navigate('/ancestor-root-registry/dashboard')}
            className="flex items-center gap-2 text-xs text-[#C9B99A] hover:text-[#FF9500] transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} /> Dashboard
          </button>
          <span className="text-sm text-[#F0EBE1]">Share</span>
          <div className="w-12" />
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-8">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#FF9500]/60 mb-3">Privacy-Safe Sharing</p>
            <h1
              className="text-2xl md:text-3xl text-[#F0EBE1] font-medium mb-3"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Share Your Registry
            </h1>
            <p className="text-sm text-[#C9B99A]/50 max-w-md mx-auto">
              Share cards never include private details like birth dates, addresses, or personal notes.
              Only milestone summaries are shared.
            </p>
          </div>

          {/* Share Card */}
          <div className="mb-8 flex justify-center">
            <div
              ref={cardRef}
              className="w-full max-w-sm p-8 rounded-2xl border-2 text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(40,25,12,0.9), rgba(10,15,26,0.95))',
                borderColor: 'rgba(255,149,0,0.2)',
              }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-[rgba(255,149,0,0.1)] border border-[rgba(255,149,0,0.2)] flex items-center justify-center">
                  <TreePine size={28} className="text-[#FF9500]" strokeWidth={1.2} />
                </div>
              </div>

              <p className="text-[10px] uppercase tracking-[0.2em] text-[#C9B99A]/40 mb-2">
                Ancestor Root Registry
              </p>

              <h2
                className="text-xl text-[#F0EBE1] font-medium mb-2"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                The {data.registry.primarySurname} Family Bloodline Has Been Planted
              </h2>

              <div className="flex items-center justify-center gap-4 my-5">
                <div className="text-center">
                  <p className="text-2xl text-[#FF9500] font-medium">{summary.peopleCount}</p>
                  <p className="text-[9px] text-[#C9B99A]/40 uppercase tracking-wider">People</p>
                </div>
                <div className="w-px h-8 bg-[rgba(201,185,154,0.1)]" />
                <div className="text-center">
                  <p className="text-2xl text-[#FF9500] font-medium">{summary.generationCount}</p>
                  <p className="text-[9px] text-[#C9B99A]/40 uppercase tracking-wider">Generations</p>
                </div>
                <div className="w-px h-8 bg-[rgba(201,185,154,0.1)]" />
                <div className="text-center">
                  <p className="text-2xl text-[#FF9500] font-medium">{summary.storiesCount}</p>
                  <p className="text-[9px] text-[#C9B99A]/40 uppercase tracking-wider">Stories</p>
                </div>
              </div>

              <div className="pt-4 border-t border-[rgba(201,185,154,0.06)]">
                <p className="text-[9px] uppercase tracking-[0.15em] text-[#C9B99A]/30">
                  #TheKingsTake &middot; AASOTU Media Group LLC
                </p>
                <p className="text-[9px] text-[#C9B99A]/20 mt-1">thekingstake.com</p>
              </div>
            </div>
          </div>

          {/* Share text preview */}
          <div className="mb-6 p-4 rounded-xl bg-[rgba(40,25,12,0.3)] border border-[rgba(201,185,154,0.06)]">
            <p className="text-[10px] text-[#C9B99A]/30 uppercase tracking-wider mb-2">Share Text</p>
            <p className="text-sm text-[#F0EBE1]/70 leading-relaxed">{shareText}</p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={handleCopy}
              className="flex-1 p-4 rounded-xl border border-[rgba(201,185,154,0.1)] bg-[rgba(40,25,12,0.3)] text-[#C9B99A] hover:border-[rgba(255,149,0,0.2)] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {copied ? <Check size={16} className="text-[#4CAF50]" /> : <Copy size={16} />}
              {copied ? 'Copied!' : 'Copy Share Text'}
            </motion.button>

            {nativeShare && (
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleNativeShare}
                className="flex-1 p-4 rounded-xl border border-[rgba(255,149,0,0.15)] bg-[rgba(255,149,0,0.08)] text-[#FF9500] hover:border-[rgba(255,149,0,0.3)] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Share2 size={16} /> Share
              </motion.button>
            )}
          </div>

          {/* Privacy reminder */}
          <div className="mt-8 p-4 rounded-lg border border-[rgba(201,185,154,0.04)] bg-[rgba(40,25,12,0.15)]">
            <p className="text-[10px] text-[#C9B99A]/25 leading-relaxed text-center">
              Share cards intentionally do not include: full birth dates, private notes, addresses,
              access codes, living person details, unapproved stories, or source documents.
            </p>
          </div>
        </motion.div>
      </div>
    </RegistryBackground>
  )
}
