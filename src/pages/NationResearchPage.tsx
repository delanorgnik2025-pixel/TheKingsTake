import { useParams, useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, BookOpen, ExternalLink, Calendar, MapPin, Users, Globe, ChevronRight, Scroll } from 'lucide-react'
import { getNationById, type IndigenousNation } from '../data/panIndigenousData'

export default function NationResearchPage() {
  const { nationId } = useParams<{ nationId: string }>()
  const navigate = useNavigate()
  const [nation, setNation] = useState<IndigenousNation | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (nationId) {
      const found = getNationById(nationId)
      if (found) {
        setNation(found)
        document.title = `${found.name} — Research Document | TheKingsTake`
      }
      setLoading(false)
    }
  }, [nationId])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#05080e] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#FF9500] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!nation) {
    return (
      <div className="min-h-screen bg-[#05080e] flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-lg text-[#F0EBE1] mb-2">Nation not found</p>
          <p className="text-sm text-[#C9B99A]/60 mb-6">The research document you are looking for does not exist.</p>
          <button
            onClick={() => navigate('/#heritage')}
            className="inline-flex items-center gap-2 text-sm text-[#FF9500] border border-[rgba(255,149,0,0.3)] rounded-lg px-4 py-2 hover:bg-[rgba(255,149,0,0.1)] transition-colors"
          >
            <ArrowLeft size={14} /> Return to Heritage Map
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#05080e]">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-[#0A0F1A]/95 backdrop-blur-md border-b border-[rgba(255,149,0,0.1)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-xs text-[#C9B99A] hover:text-[#FF9500] transition-colors"
          >
            <ArrowLeft size={14} />
            <span className="hidden sm:inline">Back</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-[9px] uppercase tracking-[0.15em] text-[#FF9500]">#TheKingsTake</span>
            <span className="text-[#C9B99A]/30">|</span>
            <span className="text-[9px] uppercase tracking-wider text-[#C9B99A]/50">Research Division</span>
          </div>
        </div>
      </header>

      {/* Hero / Document Header */}
      <section className="relative px-4 sm:px-6 pt-12 pb-10 max-w-4xl mx-auto">
        {/* Decorative top accent */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF9500]/30 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6 text-[10px] uppercase tracking-wider">
            <button
              onClick={() => navigate('/#heritage')}
              className="text-[#C9B99A]/40 hover:text-[#FF9500] transition-colors"
            >
              Heritage Map
            </button>
            <ChevronRight size={10} className="text-[#C9B99A]/20" />
            <span className="text-[#C9B99A]/40">{nation.country}</span>
            <ChevronRight size={10} className="text-[#C9B99A]/20" />
            <span className="text-[#FF9500]">Research Document</span>
          </div>

          {/* Document Title Block */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[9px] uppercase tracking-wider text-[#FF9500] bg-[rgba(255,149,0,0.08)] rounded-full px-2.5 py-1">
                {nation.country}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-[#C9B99A]/40 bg-[rgba(201,185,154,0.05)] rounded-full px-2.5 py-1">
                {nation.category}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-[#C9B99A]/30 flex items-center gap-1">
                <Calendar size={9} />
                {nation.researchDocument.lastUpdated}
              </span>
            </div>

            <h1
              className="text-3xl sm:text-4xl md:text-5xl text-[#F0EBE1] font-medium leading-[1.1] mb-3"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {nation.researchDocument.title}
            </h1>

            {nation.indigenousName && (
              <p className="text-lg sm:text-xl text-[#FF9500]/70 mb-2">
                {nation.indigenousName}
              </p>
            )}

            <p className="text-sm sm:text-base text-[#C9B99A]/70 max-w-2xl leading-relaxed">
              {nation.researchDocument.subtitle}
            </p>
          </div>

          {/* Key Facts Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
            <FactPill icon={<MapPin size={12} />} label="Location" value={nation.location.split('—')[0].trim()} />
            <FactPill icon={<Users size={12} />} label="Population" value={nation.population.split('—')[0].trim()} />
            <FactPill icon={<Globe size={12} />} label="Language" value={nation.language.split('(')[0].trim()} />
            <FactPill icon={<BookOpen size={12} />} label="Status" value={nation.status.split('—')[0].trim()} />
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[rgba(255,149,0,0.2)] to-transparent mb-10" />

          {/* Research Sections */}
          <div className="space-y-10">
            {nation.researchDocument.sections.map((section, index) => (
              <motion.article
                key={section.heading}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="relative"
              >
                <div className="flex items-start gap-3 mb-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[rgba(255,149,0,0.1)] border border-[rgba(255,149,0,0.15)] text-[10px] text-[#FF9500] font-bold shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <h2 className="text-lg sm:text-xl text-[#F0EBE1] font-medium leading-snug" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    {section.heading}
                  </h2>
                </div>
                <div className="pl-9">
                  <p className="text-sm sm:text-[15px] text-[#C9B99A]/80 leading-[1.75]">
                    {section.content}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[rgba(255,149,0,0.2)] to-transparent my-10" />

          {/* Sources */}
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Scroll size={14} className="text-[#FF9500]" />
              <h3 className="text-xs uppercase tracking-[0.15em] text-[#FF9500]">Sources & References</h3>
            </div>
            <div className="bg-[rgba(27,40,56,0.3)] border border-[rgba(255,149,0,0.08)] rounded-xl p-4 sm:p-5">
              <ul className="space-y-2.5">
                {nation.researchDocument.sources.map((source, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[12px] text-[#C9B99A]/60 leading-relaxed">
                    <span className="text-[#FF9500]/30 shrink-0 mt-0.5">[{i + 1}]</span>
                    <span>{source}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Resources Links */}
          {nation.resources.length > 0 && (
            <section className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                <ExternalLink size={14} className="text-[#FF9500]" />
                <h3 className="text-xs uppercase tracking-[0.15em] text-[#FF9500]">External Resources</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {nation.resources.map((url) => (
                  <a
                    key={url}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#FF9500]/70 hover:text-[#FF9500] border border-[rgba(255,149,0,0.15)] hover:border-[rgba(255,149,0,0.4)] rounded-lg px-3 py-2 transition-all"
                  >
                    <ExternalLink size={10} />
                    {new URL(url).hostname.replace('www.', '')}
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* Back Navigation */}
          <div className="flex items-center justify-center pt-6 pb-12">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-sm text-[#C9B99A] hover:text-[#FF9500] border border-[rgba(201,185,154,0.15)] hover:border-[rgba(255,149,0,0.3)] rounded-lg px-5 py-2.5 transition-all"
            >
              <ArrowLeft size={14} />
              Back to Heritage Map
            </button>
          </div>

          {/* Footer branding */}
          <div className="text-center pb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#FF9500]/40">#TheKingsTake</span>
              <span className="text-[#C9B99A]/20">|</span>
              <span className="text-[9px] uppercase tracking-wider text-[#C9B99A]/30">Indigenous Heritage Research</span>
            </div>
            <p className="text-[10px] text-[#C9B99A]/20">
              This document is compiled from historical records, academic sources, and Indigenous community accounts.
              Always verify with primary sources.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

function FactPill({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-[rgba(27,40,56,0.4)] border border-[rgba(255,149,0,0.08)] rounded-lg p-3">
      <div className="flex items-center gap-1.5 mb-1 text-[#FF9500]/50">
        {icon}
        <span className="text-[9px] uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-[11px] sm:text-xs text-[#F0EBE1]/80 leading-snug">{value}</p>
    </div>
  )
}
