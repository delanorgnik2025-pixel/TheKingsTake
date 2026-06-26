import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Scroll, AlertTriangle, BookOpen, ExternalLink, ChevronDown, ChevronUp, Landmark, FileText, Users, ArrowRight, Dna } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'
import { DAWES_TRIBES, RECONCILIATION_LAWS, ANCESTRY_KEY_POINTS, DAWES_RESOURCES } from '../data/dawesData'

// ============================================
// EXPANDABLE CARD COMPONENT
// ============================================
function ExpandableCard({ title, subtitle, children, icon: Icon, accent = false }: {
  title: string; subtitle?: string; children: React.ReactNode; icon: any; accent?: boolean
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`rounded-xl border transition-all ${accent ? 'border-[rgba(255,149,0,0.25)] bg-[rgba(255,149,0,0.05)]' : 'border-[rgba(255,149,0,0.12)] bg-[rgba(27,40,56,0.4)]'}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 md:p-5 text-left"
      >
        <div className="flex items-center gap-3">
          <Icon size={18} className={accent ? 'text-[#FF9500]' : 'text-[#C9B99A]'} />
          <div>
            <h4 className="text-sm md:text-base text-[#F0EBE1] font-medium">{title}</h4>
            {subtitle && <p className="text-xs text-[#C9B99A]/60 mt-0.5">{subtitle}</p>}
          </div>
        </div>
        {open ? <ChevronUp size={16} className="text-[#FF9500]" /> : <ChevronDown size={16} className="text-[#C9B99A]" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 md:px-5 pb-4 md:pb-5 border-t border-[rgba(255,149,0,0.1)] pt-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ============================================
// MAIN SECTION
// ============================================
export default function AncestryResearchSection() {
  return (
    <section id="ancestry" className="relative py-20 md:py-28 px-6 md:px-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20" style={{ backgroundImage: 'url(/images/cosmic-bg.jpg)' }} />
      <div className="absolute inset-0 bg-[#0a0f1a]/85" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-10 md:space-y-14">

        {/* Header */}
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex gap-1">
              {[0, 1, 2].map(i => <div key={i} className="w-[3px] h-[3px] rounded-full bg-[#FF9500]" />)}
            </div>
            <p className="text-xs uppercase tracking-[0.08em] text-[#FF9500]">Reclaim Your Heritage</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="text-4xl md:text-5xl lg:text-[64px] text-[#F0EBE1] tracking-[-0.02em] leading-[1.08] mb-4 text-shadow-hero">
            They Hid Our Identity<br className="hidden md:block" /> in the Records
          </h2>
          <p className="text-lg md:text-xl text-[#C9B99A] max-w-3xl leading-relaxed">
            For generations, our people were reclassified — "Indian" became "colored," "mulatto" became "negro," and our Indigenous identity was erased from official records. The Dawes Rolls and other tribal records are the proof they tried to bury. This is your pathway to finding what was hidden.
          </p>
        </ScrollReveal>

        {/* Truth Alert Banner */}
        <ScrollReveal delay={0.15}>
          <div className="bg-[rgba(255,149,0,0.08)] rounded-xl border border-[rgba(255,149,0,0.2)] p-4 md:p-5 flex items-start gap-4">
            <AlertTriangle size={22} className="text-[#FF9500] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm text-[#FF9500] font-medium mb-1">The Truth About Reclassification</h4>
              <p className="text-sm text-[#C9B99A] leading-relaxed">
                From 1662 through 1924, a series of laws systematically reclassified Indigenous peoples as "colored," "mulatto," and "negro." The Partus Sequitur Ventrem law (1662) began the process. The Racial Integrity Act of 1924 — enforced by Walter Plecker in Virginia — deliberately erased Indigenous identity by ordering all "Indians" to be recorded as "colored." This is why so many families have Indigenous oral history but find their ancestors classified as "Black" on census records. <strong className="text-[#F0EBE1]">It was not a change in who they were — it was a change in how they were classified.</strong>
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* 3-Step Quick Start */}
        <ScrollReveal delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { step: '1', title: 'Search the Dawes Rolls', desc: 'Enter your family surname in the Dawes database. Check both "by blood" and "freedmen" rolls — your ancestors may be on either.', icon: Search },
              { step: '2', title: 'Verify With Census Records', desc: 'Compare Dawes records with census records. Note when your family changed from "Indian" to "colored" — that\'s reclassification.', icon: FileText },
              { step: '3', title: 'Connect With Your Tribe', desc: 'Contact tribal enrollment offices with your documentation. Many state-recognized tribes actively help people reconnect.', icon: Users },
            ].map((item) => (
              <div key={item.step} className="bg-[rgba(27,40,56,0.5)] rounded-xl border border-[rgba(255,149,0,0.12)] p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[rgba(255,149,0,0.15)] border border-[rgba(255,149,0,0.25)] text-sm text-[#FF9500] font-bold">{item.step}</span>
                  <item.icon size={16} className="text-[#FF9500]" />
                </div>
                <h4 className="text-base text-[#F0EBE1] font-medium mb-2">{item.title}</h4>
                <p className="text-sm text-[#C9B99A]/80 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Expandable Content */}
        <div className="space-y-3">

          {/* 10 Key Points */}
          <ScrollReveal>
            <ExpandableCard
              title="10 Keys to Recovering Your Indigenous Ancestry"
              subtitle="Essential research steps for tracing your heritage"
              icon={BookOpen}
              accent
            >
              <div className="space-y-4">
                {ANCESTRY_KEY_POINTS.map((point) => (
                  <div key={point.number} className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[rgba(255,149,0,0.1)] border border-[rgba(255,149,0,0.2)] text-xs text-[#FF9500] font-bold shrink-0">{point.number}</span>
                    <div>
                      <h5 className="text-sm text-[#F0EBE1] font-medium">{point.title}</h5>
                      <p className="text-sm text-[#C9B99A]/80 leading-relaxed mt-1">{point.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ExpandableCard>
          </ScrollReveal>

          {/* Dawes Rolls Tribes */}
          <ScrollReveal>
            <ExpandableCard
              title="Tribes with Dawes Roll Records"
              subtitle="14 tribes enrolled — click to see search details"
              icon={Dna}
            >
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,149,0,0.3) transparent' }}>
                {DAWES_TRIBES.map((tribe) => (
                  <div key={tribe.name} className="bg-[rgba(21,32,43,0.5)] rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="text-sm text-[#F0EBE1] font-medium">{tribe.name}</h5>
                      <span className="text-[10px] text-[#FF9500] bg-[rgba(255,149,0,0.1)] rounded-full px-2 py-0.5">{tribe.rollYears}</span>
                    </div>
                    {tribe.alsoKnownAs.length > 0 && (
                      <p className="text-[11px] text-[#C9B99A]/60 mb-2">Also known as: {tribe.alsoKnownAs.join(', ')}</p>
                    )}
                    <p className="text-xs text-[#C9B99A]/80 mb-2">{tribe.enrollmentCount}</p>
                    <p className="text-xs text-[#C9B99A]/70 leading-relaxed mb-3">{tribe.notes}</p>
                    <a
                      href={tribe.searchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[#FF9500] border border-[rgba(255,149,0,0.3)] rounded-lg px-3 py-1.5 hover:bg-[rgba(255,149,0,0.1)] transition-colors"
                    >
                      <ExternalLink size={10} /> Search {tribe.name} Rolls
                    </a>
                  </div>
                ))}
              </div>
            </ExpandableCard>
          </ScrollReveal>

          {/* Reclassification Laws */}
          <ScrollReveal>
            <ExpandableCard
              title="The Laws That Erased Our Identity"
              subtitle="How Indigenous peoples were reclassified from 1662 to 1924"
              icon={Landmark}
              accent
            >
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,149,0,0.3) transparent' }}>
                {RECONCILIATION_LAWS.map((law, i) => (
                  <div key={i} className="border-l-2 border-[rgba(255,149,0,0.3)] pl-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-[#FF9500] font-bold">{law.year}</span>
                      <span className="text-sm text-[#F0EBE1] font-medium">{law.name}</span>
                    </div>
                    <p className="text-sm text-[#C9B99A]/80 leading-relaxed mb-2">{law.desc}</p>
                    <div className="bg-[rgba(255,149,0,0.05)] rounded-lg p-3 border border-[rgba(255,149,0,0.1)]">
                      <p className="text-xs text-[#FF9500]/80 uppercase mb-1">Impact on Our People</p>
                      <p className="text-sm text-[#C9B99A] leading-relaxed">{law.impact}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ExpandableCard>
          </ScrollReveal>

          {/* Search Resources */}
          <ScrollReveal>
            <ExpandableCard
              title="Official Research Databases"
              subtitle="Links to Dawes Rolls, census records, and tribal resources"
              icon={Search}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {DAWES_RESOURCES.map((res) => (
                  <a
                    key={res.name}
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-[rgba(21,32,43,0.5)] rounded-lg p-4 border border-[rgba(255,149,0,0.1)] hover:border-[rgba(255,149,0,0.3)] transition-all"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <ExternalLink size={12} className="text-[#FF9500]" />
                      <h5 className="text-sm text-[#F0EBE1] font-medium group-hover:text-[#FF9500] transition-colors">{res.name}</h5>
                    </div>
                    <p className="text-xs text-[#C9B99A]/70">{res.desc}</p>
                  </a>
                ))}
              </div>
            </ExpandableCard>
          </ScrollReveal>

          {/* How to Use the Map for Research */}
          <ScrollReveal>
            <ExpandableCard
              title="Using the Soul Tribe Map for Ancestry Research"
              subtitle="Connect state research with tribal records"
              icon={Scroll}
              accent
            >
              <div className="space-y-4">
                <p className="text-sm text-[#C9B99A] leading-relaxed">
                  The Indigenous Soul Tribe Map above documents 225+ nations across all 50 states. Use it as your starting point to identify which tribes historically occupied the regions where your ancestors lived. Here's how to connect the map with your research:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { title: 'Find Your State', desc: 'Click your ancestors\' state on the map. See which tribes were documented there.' },
                    { title: 'Study the Laws', desc: 'Each state shows laws like the Racial Integrity Act — see what was used to reclassify your people.' },
                    { title: 'Check Treaties', desc: 'Expand treaties to understand what agreements were broken and what rights were reserved.' },
                    { title: 'Get Vital Records', desc: 'Each state provides contact info for birth/death certificates — the first step in tracing lineage.' },
                    { title: 'Cross-Reference Dawes', desc: 'If your state had removal (Trail of Tears), search the Dawes Rolls for relocated tribal members.' },
                    { title: 'Contact Tribal Offices', desc: 'Each tribe profile includes links to official websites and enrollment offices.' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 bg-[rgba(21,32,43,0.5)] rounded-lg p-4">
                      <ArrowRight size={14} className="text-[#FF9500] shrink-0 mt-1" />
                      <div>
                        <h5 className="text-sm text-[#F0EBE1] font-medium">{item.title}</h5>
                        <p className="text-xs text-[#C9B99A]/70 mt-1">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ExpandableCard>
          </ScrollReveal>
        </div>

        {/* Disclaimer */}
        <ScrollReveal>
          <div className="bg-[rgba(255,149,0,0.04)] rounded-xl border border-[rgba(255,149,0,0.12)] p-4 flex items-start gap-3">
            <AlertTriangle size={16} className="text-[#FF9500]/60 shrink-0 mt-0.5" />
            <p className="text-xs text-[#C9B99A]/60 leading-relaxed">
              <strong className="text-[#C9B99A]">Historical Research Disclaimer:</strong> The information presented here is for educational and genealogical research purposes. We are not affiliated with any tribal enrollment office. Enrollment decisions are made by sovereign tribal governments. This site presents historical facts about racial reclassification laws and their documented impact on Indigenous peoples. Always verify records through official sources.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
