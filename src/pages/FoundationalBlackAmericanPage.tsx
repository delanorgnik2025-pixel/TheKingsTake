import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router'
import {
  Users, MapPin, Clock, BookOpen, Crown, ChevronRight,
  Landmark, Dna, ScrollText, Star, ArrowRight
} from 'lucide-react'

const MILESTONES = [
  {
    year: '1619',
    title: 'First Arrival',
    desc: 'Enslaved Africans brought to Point Comfort, Virginia — the beginning of the Foundational Black American lineage.',
    icon: MapPin
  },
  {
    year: '1863',
    title: 'Emancipation Proclamation',
    desc: 'President Lincoln declares enslaved people in Confederate states free — FBA ancestors begin the long walk toward self-determination.',
    icon: ScrollText
  },
  {
    year: '1865',
    title: 'Juneteenth & 13th Amendment',
    desc: 'Legal slavery abolished nationwide. The foundation of modern Black America is laid by those who survived the unimaginable.',
    icon: Landmark
  },
  {
    year: '1868',
    title: '14th Amendment',
    desc: 'Birthright citizenship granted — a constitutional anchor that FBA descendants continue to defend and claim.',
    icon: Crown
  },
  {
    year: '1870',
    title: '15th Amendment',
    desc: 'Voting rights extended regardless of race. The political voice of Foundational Black Americans enters the American system.',
    icon: Users
  },
  {
    year: '1954',
    title: 'Brown v. Board of Education',
    desc: 'The Supreme Court rules segregation unconstitutional — a victory born from FBA legal struggle and sacrifice.',
    icon: Landmark
  },
  {
    year: '1964',
    title: 'Civil Rights Act',
    desc: 'Landmark legislation prohibiting discrimination — the culmination of FBA-led organizing, protest, and moral courage.',
    icon: ScrollText
  },
  {
    year: '1965',
    title: 'Voting Rights Act',
    desc: 'Federal protection for Black voters secured after Selma — FBA blood spilled on American soil for the right to participate.',
    icon: Users
  },
  {
    year: '1968',
    title: 'Fair Housing Act',
    desc: 'The last of the Great Civil Rights Acts — addressing the economic and geographic exclusion of FBA communities.',
    icon: MapPin
  },
  {
    year: '2008',
    title: 'A New Era',
    desc: 'Barack Obama elected President — a descendant of the African diaspora, but the FBA struggle for specific recognition continues.',
    icon: Star
  },
  {
    year: '2020',
    title: 'The Reckoning',
    desc: 'Global uprising after George Floyd. The world finally sees what FBA communities have known for centuries.',
    icon: Users
  },
  {
    year: '2026',
    title: 'The Movement Grows',
    desc: 'Foundational Black American identity gains mainstream recognition. The push for federal ethnic classification intensifies.',
    icon: Dna
  }
]

export default function FoundationalBlackAmericanPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-[#0B0F17] text-[#F0EBE1]">
      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-16 px-6">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,149,0,0.15) 0%, transparent 70%)'
        }} />
        <div className="max-w-4xl mx-auto relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF9500]/10 border border-[#FF9500]/20 text-[#FF9500] text-sm mb-6">
              <Dna size={16} /> Our Lineage. Our Identity. Our Claim.
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight" style={{ fontFamily: 'Newsreader, serif' }}>
              Foundational <span className="text-[#FF9500]">Black American</span>
            </h1>
            <p className="text-lg md:text-xl text-[#C9B99A] max-w-2xl mx-auto leading-relaxed">
              We are the descendants of those brought to this land before 1865. 
              Our ancestors built this nation — brick by brick, field by field, 
              law by law. It is time we are recognized as the distinct ethnic group we are.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What is FBA */}
      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 md:p-10"
          >
            <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Newsreader, serif' }}>
              What Does "Foundational Black American" Mean?
            </h2>
            <div className="space-y-4 text-[#C9B99A] leading-relaxed">
              <p>
                <strong className="text-[#F0EBE1]">Foundational Black American (FBA)</strong> refers to the descendants 
                of enslaved Africans brought to the United States before 1865 — and the Indigenous peoples of this land 
                who were absorbed, displaced, or classified as "Black" through the one-drop rule and paper genocide.
              </p>
              <p>
                We are not simply "African American" in the broad sense. We are a <strong className="text-[#F0EBE1]">specific ethnic group</strong> with 
                a specific history, a specific lineage, and a specific claim to this land. Our ancestors were here before 
                the Confederacy, before the Union, before the Constitution itself.
              </p>
              <p>
                The term "African American" is an umbrella that includes recent immigrants from Africa, the Caribbean, 
                and elsewhere. <strong className="text-[#F0EBE1]">FBA is precise.</strong> It names those of us whose blood, 
                sweat, and tears are literally in the soil of this nation.
              </p>
            </div>

            <div className="mt-8 p-4 bg-[#FF9500]/5 border border-[#FF9500]/20 rounded-xl">
              <div className="flex items-start gap-3">
                <BookOpen size={20} className="text-[#FF9500] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-[#F0EBE1] font-medium mb-1">From the Book</p>
                  <p className="text-sm text-[#C9B99A]/80">
                    <em>The African American State of the Union</em> by Ronald Lee King explores this identity in depth — 
                    tracing the lineage from 1619 to today, and making the case for federal recognition. 
                    The title uses "African American" because that is the mainstream term, but the content 
                    speaks directly to the FBA experience.
                  </p>
                  <Link to="/pre-order" className="inline-flex items-center gap-1 text-sm text-[#FF9500] mt-2 hover:underline">
                    Pre-Order the Book <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-6 pb-20">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: 'Newsreader, serif' }}>
              The FBA <span className="text-[#FF9500]">Timeline</span>
            </h2>
            <p className="text-[#C9B99A]">
              400+ years of struggle, resilience, and building. Click each milestone to learn more.
            </p>
          </motion.div>

          <div className="space-y-3">
            {MILESTONES.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <button
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 text-left ${
                    openIdx === i
                      ? 'bg-[#FF9500]/10 border-[#FF9500]/30'
                      : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="w-10 h-10 rounded-lg bg-[#FF9500]/10 flex items-center justify-center shrink-0">
                    <m.icon size={18} className="text-[#FF9500]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-[#FF9500] tabular-nums">{m.year}</span>
                      <span className="font-medium text-[#F0EBE1]">{m.title}</span>
                    </div>
                    {openIdx === i && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="text-sm text-[#C9B99A]/80 mt-2 leading-relaxed"
                      >
                        {m.desc}
                      </motion.p>
                    )}
                  </div>
                  <ChevronRight
                    size={16}
                    className={`text-[#C9B99A]/40 shrink-0 transition-transform ${openIdx === i ? 'rotate-90' : ''}`}
                  />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'Newsreader, serif' }}>
            This Is Bigger Than a Label
          </h2>
          <p className="text-[#C9B99A] mb-8 max-w-xl mx-auto">
            Federal recognition of FBA as a distinct ethnic group is the first step toward 
            reparations, targeted programs, and the preservation of our unique culture. 
            Sign the petition. Spread the word. Stand on business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/petition"
              className="inline-flex items-center justify-center gap-2 h-12 px-8 bg-[#FF9500] text-[#182635] font-medium rounded hover:bg-[#CC6A00]"
            >
              <ScrollText size={18} /> Sign the Petition
            </Link>
            <Link
              to="/consultation"
              className="inline-flex items-center justify-center gap-2 h-12 px-8 border border-[#FF9500] text-[#FF9500] font-medium rounded hover:bg-[#FF9500]/10"
            >
              <Clock size={18} /> Book a Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
