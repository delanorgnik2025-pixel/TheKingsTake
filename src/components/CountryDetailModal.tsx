import { motion } from 'framer-motion'
import { useNavigate } from 'react-router'
import {
  X, MapPin, Users, BookOpen, Globe, ChevronRight,
  ExternalLink, Scroll, Dna
} from 'lucide-react'
import type { IndigenousNation } from '../data/panIndigenousData'

interface CountryDetailModalProps {
  country: string
  countryCode: string
  nations: IndigenousNation[]
  onClose: () => void
}

export default function CountryDetailModal({ country, nations, onClose }: CountryDetailModalProps) {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-xl border border-[rgba(255,149,0,0.25)] bg-[#15202B] shadow-2xl"
        style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,149,0,0.3) transparent' }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#15202B]/95 backdrop-blur-md border-b border-[rgba(255,149,0,0.15)] p-4 md:p-5 flex items-center justify-between"
          style={{ borderLeft: '4px solid #FF9500' }}>
          <div>
            <h3 className="text-xl md:text-2xl text-[#F0EBE1] font-medium" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {country}
            </h3>
            <p className="text-sm text-[#C9B99A] mt-0.5">{nations.length} Indigenous Nations Documented</p>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-[rgba(255,149,0,0.1)] border border-[rgba(255,149,0,0.2)] text-[#C9B99A] hover:text-[#FF9500] hover:bg-[rgba(255,149,0,0.2)] transition-all shrink-0 ml-3"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 md:p-5 space-y-4">
          {/* Overview */}
          <div className="bg-[rgba(27,40,56,0.5)] rounded-lg border border-[rgba(255,149,0,0.12)] p-4">
            <h4 className="text-xs text-[#FF9500] uppercase tracking-[0.04em] mb-2 flex items-center gap-2">
              <Globe size={14} /> About This Region
            </h4>
            <p className="text-sm text-[#C9B99A] leading-relaxed">
              The Indigenous nations of {country} represent a rich tapestry of original inhabitants,
              Maroon communities, and African heritage peoples. Each nation below has a comprehensive
              research document available. Tap any nation to explore its full history.
            </p>
          </div>

          {/* Nations List */}
          <div className="space-y-3">
            <h4 className="text-xs text-[#FF9500] uppercase tracking-[0.04em] flex items-center gap-2">
              <Dna size={14} /> Indigenous Nations — Tap for Full Research
            </h4>

            {nations.map((nation) => (
              <NationRow
                key={nation.id}
                nation={nation}
                onViewResearch={() => {
                  onClose()
                  navigate(`/research/${nation.id}`)
                }}
              />
            ))}
          </div>

          {/* Research CTA */}
          <div className="bg-[rgba(255,149,0,0.06)] rounded-lg border border-[rgba(255,149,0,0.15)] p-4">
            <div className="flex items-start gap-3">
              <Scroll size={16} className="text-[#FF9500] shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-[#F0EBE1] font-medium mb-1">Full Research Available</p>
                <p className="text-xs text-[#C9B99A]/70 leading-relaxed">
                  Every nation listed above has a comprehensive research document with
                  detailed history, sources, and references. Tap any nation to read its full story.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function NationRow({ nation, onViewResearch }: { nation: IndigenousNation; onViewResearch: () => void }) {
  return (
    <div className="bg-[rgba(27,40,56,0.5)] rounded-lg border border-[rgba(255,149,0,0.1)] overflow-hidden">
      {/* Main Row */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h5 className="text-sm text-[#F0EBE1] font-medium">{nation.name}</h5>
              {nation.indigenousName && (
                <span className="text-[10px] text-[#FF9500]/60 italic">{nation.indigenousName}</span>
              )}
            </div>
            {nation.alternateNames.length > 0 && (
              <p className="text-[10px] text-[#C9B99A]/40 mb-2">
                Also: {nation.alternateNames.join(', ')}
              </p>
            )}
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-[#C9B99A]/50">
              <span className="flex items-center gap-1">
                <MapPin size={9} className="text-[#FF9500]/30" />
                {nation.location.split('—')[0].trim()}
              </span>
              <span className="flex items-center gap-1">
                <Users size={9} className="text-[#FF9500]/30" />
                {nation.population.split('—')[0].trim()}
              </span>
              <span className="flex items-center gap-1">
                <BookOpen size={9} className="text-[#FF9500]/30" />
                {nation.languageFamily}
              </span>
            </div>
          </div>
          <button
            onClick={onViewResearch}
            className="shrink-0 flex items-center gap-1.5 text-[10px] text-[#FF9500] border border-[rgba(255,149,0,0.25)] rounded-lg px-3 py-1.5 hover:bg-[rgba(255,149,0,0.1)] transition-colors"
          >
            <Scroll size={10} />
            Research
          </button>
        </div>

        {/* Brief summary */}
        <p className="text-[11px] text-[#C9B99A]/60 mt-2 leading-relaxed line-clamp-2">
          {nation.history}
        </p>
      </div>

      {/* Bottom bar */}
      <div className="px-4 py-2.5 bg-[rgba(21,32,43,0.5)] border-t border-[rgba(255,149,0,0.06)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[9px] uppercase tracking-wider text-[#FF9500]/40 bg-[rgba(255,149,0,0.06)] rounded px-1.5 py-0.5">
            {nation.category}
          </span>
          <span className="text-[9px] uppercase tracking-wider text-[#C9B99A]/30 bg-[rgba(201,185,154,0.04)] rounded px-1.5 py-0.5">
            {nation.status.split('—')[0].trim()}
          </span>
        </div>
        <button
          onClick={onViewResearch}
          className="flex items-center gap-1 text-[10px] text-[#C9B99A]/40 hover:text-[#FF9500] transition-colors group"
        >
          Read Full Document
          <ChevronRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  )
}
