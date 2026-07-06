import { useState } from 'react'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import {
  BookOpen, Globe, Dna, Scroll, Landmark, Users, Mic, Feather,
  TreePine, Crown, ArrowLeft, ExternalLink, ChevronRight,
  MapPin, FileText, Award, Briefcase, Heart, Eye, Target
} from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'

// ============================================
// STORY ARC DATA
// ============================================
const STORY_ARC = [
  {
    year: '2019',
    title: 'The Awakening',
    description: 'After years of seeing the narrative controlled by others, Ronald Lee King began investigating the buried history of Indigenous Aboriginal Royal Americans — the nations, treaties, and reclassification laws that were systematically erased from public education.',
    icon: Eye,
    highlight: false,
  },
  {
    year: '2020–2022',
    title: 'Deep Research Phase',
    description: 'Spent years compiling tribal records, Dawes Rolls, treaties, and vital records across all 50 U.S. states. Expanded research into the Caribbean — Jamaica, Haiti, Cuba, Puerto Rico, Dominican Republic, Bahamas, and Trinidad & Tobago — documenting 275+ Indigenous nations.',
    icon: Scroll,
    highlight: false,
  },
  {
    year: '2023',
    title: 'AASOTU Media Group LLC Founded',
    description: 'Launched AASOTU Media Group LLC as an independent publishing and media company dedicated to telling the stories the mainstream won\'t touch. The mission: truth over narrative, history over erasure, legacy over moment.',
    icon: Briefcase,
    highlight: true,
  },
  {
    year: '2024',
    title: 'The Book & The Platform',
    description: 'Wrote "The African American State of the Union: From the Loins of the Beast" — a groundbreaking work exposing the systemic erasure of Indigenous identity. Simultaneously built TheKingsTake.com as a living platform combining the book, interactive heritage mapping, genealogy tools, and civic advocacy.',
    icon: BookOpen,
    highlight: true,
  },
  {
    year: '2025',
    title: 'The Fight & The Build',
    description: 'Fighting a 1983 Civil Rights Action and EEOC case while continuing to build. Launched the Ancestor Root Registry for genealogy preservation, expanded the Indigenous Heritage Map to 75+ territories across the Americas, and opened writing services to help others tell their stories.',
    icon: Target,
    highlight: true,
  },
  {
    year: '2026',
    title: 'The Launch',
    description: 'Book pre-orders go live. The Indigenous Heritage Map reaches full coverage with detailed tribal data, laws, treaties, and vital records for every territory. The Ancestor Realm and Sacred Gallery open. The voice gets louder.',
    icon: Crown,
    highlight: true,
  },
]

// ============================================
// PORTFOLIO ITEMS
// ============================================
const PORTFOLIO_ITEMS = [
  {
    title: 'The African American State of the Union',
    subtitle: 'From the Loins of the Beast',
    description: 'A groundbreaking investigation into the systematic erasure of Indigenous Aboriginal Royal American identity. Exposes reclassification laws, hidden treaties, and the truth they never taught in school.',
    tags: ['Book', 'Investigative Research', 'Pre-Order Now'],
    link: '/pre-order',
    icon: BookOpen,
    color: '#FF9500',
  },
  {
    title: 'Indigenous Heritage Map',
    subtitle: '75+ Territories, 275+ Nations',
    description: 'Interactive satellite map documenting Indigenous nations across all 50 U.S. states, Caribbean, Canada, Mexico, Central America, and South America. Includes tribal data, laws, treaties, and vital records.',
    tags: ['Interactive Map', 'Research Database', 'Genealogy'],
    link: '/#heritage',
    icon: Globe,
    color: '#FF9500',
  },
  {
    title: 'Ancestor Root Registry',
    subtitle: 'Plant Your Roots. Preserve Your Legacy.',
    description: 'A sacred digital archive for families to document their bloodline, store family trees, and preserve their heritage for future generations. Your ancestry, secured and honored.',
    tags: ['Genealogy Tool', 'Family Archive', 'Digital Preservation'],
    link: '/ancestor-root-registry',
    icon: TreePine,
    color: '#C9B99A',
  },
  {
    title: 'AASOTU Media Group LLC',
    subtitle: 'The People\'s Voice',
    description: 'Independent media company providing investigative journalism, publishing, speechwriting, book development, and content creation. Building platforms that amplify truth and empower communities.',
    tags: ['Media Company', 'Publishing', 'Writing Services'],
    link: '/#services',
    icon: Mic,
    color: '#C9B99A',
  },
  {
    title: 'Civic Advocacy & Legal Education',
    subtitle: 'Know Your Rights. Fight Back.',
    description: 'Resources for understanding civil rights, filing EEOC complaints, and navigating the legal system. Personal experience fighting a 1983 Civil Rights Action informs every piece of guidance shared.',
    tags: ['Civil Rights', 'Legal Education', 'Community Advocacy'],
    link: '/civics',
    icon: Landmark,
    color: '#FFB840',
  },
  {
    title: 'Writing Services',
    subtitle: 'Your Story, Masterfully Told',
    description: 'Professional writing services including speechwriting, book publishing, ghostwriting, legacy interviews, content writing, and AI-assisted creative. Every word carries weight.',
    tags: ['Speechwriting', 'Books', 'Content Creation'],
    link: '/writing-services',
    icon: Feather,
    color: '#FFB840',
  },
]

// ============================================
// ABOUT AUTHOR PAGE
// ============================================
export default function AboutAuthorPage() {
  const [activeArc, setActiveArc] = useState<number | null>(null)

  return (
    <main className="min-h-screen bg-[#0a0f1a]">
      {/* ======================================== */}
      {/* HERO SECTION */}
      {/* ======================================== */}
      <section className="relative min-h-[90vh] flex items-end overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/author-1.jpg"
            alt="Ronald Lee King — Author, Researcher, Founder"
            className="w-full h-full object-cover object-top"
            style={{ filter: 'brightness(0.4)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-[#0a0f1a]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1a]/80 via-transparent to-[#0a0f1a]/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full px-6 md:px-12 pb-16 md:pb-24 pt-32">
          <div className="max-w-7xl mx-auto">
            {/* Back link */}
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs text-[#C9B99A] hover:text-[#FF9500] transition-colors mb-8"
            >
              <ArrowLeft size={14} /> Back to Home
            </Link>

            <ScrollReveal>
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="text-[10px] uppercase tracking-[0.15em] text-[#FF9500] bg-[rgba(255,149,0,0.1)] border border-[rgba(255,149,0,0.2)] rounded-full px-4 py-1.5">
                  Author / Researcher / Founder
                </span>
                <span className="text-[10px] uppercase tracking-[0.15em] text-[#C9B99A] bg-[rgba(27,40,56,0.6)] border border-[rgba(201,185,154,0.15)] rounded-full px-4 py-1.5">
                  AASOTU Media Group LLC
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h1 className="text-5xl md:text-7xl lg:text-[90px] text-[#F0EBE1] tracking-[-0.03em] leading-[1.05] mb-6 text-shadow-hero">
                Ronald Lee King
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-xl md:text-2xl text-[#C9B99A] max-w-2xl leading-relaxed mb-4">
                I write untold stories. I publish unfiltered truth. I build lasting legacies.
                I empower my people.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="text-sm text-[#C9B99A]/60 max-w-xl leading-relaxed mb-8">
                Founder of AASOTU Media Group LLC. Author of "The African American State of the Union:
                From the Loins of the Beast." Building TheKingsTake.com as a platform for Indigenous
                heritage mapping, genealogy preservation, civic advocacy, and independent publishing.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/pre-order"
                  className="inline-flex items-center gap-2 text-sm bg-[rgba(255,149,0,0.15)] text-[#FF9500] border border-[rgba(255,149,0,0.35)] rounded-lg px-6 py-3 hover:bg-[rgba(255,149,0,0.25)] transition-all"
                >
                  <BookOpen size={15} /> Pre-Order the Book
                </Link>
                <a
                  href="/#heritage"
                  className="inline-flex items-center gap-2 text-sm bg-[rgba(27,40,56,0.6)] text-[#C9B99A] border border-[rgba(201,185,154,0.15)] rounded-lg px-6 py-3 hover:border-[rgba(255,149,0,0.3)] hover:text-[#FF9500] transition-all"
                >
                  <Globe size={15} /> Explore the Heritage Map
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ======================================== */}
      {/* QUOTE SECTION */}
      {/* ======================================== */}
      <section className="py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <div className="flex justify-center gap-1 mb-8">
              {[0, 1, 2, 0, 1, 2].map(i => (
                <div key={i} className="w-[3px] h-[3px] rounded-full bg-[#FF9500]" />
              ))}
            </div>
            <blockquote className="text-2xl md:text-3xl lg:text-4xl text-[#F0EBE1] leading-relaxed mb-6" style={{ fontStyle: 'italic' }}>
              "The truth was never lost. It was buried. And I'm here to dig it up —
              one document, one treaty, one bloodline at a time."
            </blockquote>
            <p className="text-sm text-[#FF9500] uppercase tracking-[0.12em]">— Ronald Lee King</p>
          </ScrollReveal>
        </div>
      </section>

      {/* ======================================== */}
      {/* THE STORY ARC */}
      {/* ======================================== */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-[rgba(27,40,56,0.3)]">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="mb-12 md:mb-16">
              <p className="text-xs uppercase tracking-[0.12em] text-[#FF9500] mb-3">The Journey</p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#F0EBE1] tracking-[-0.02em] leading-[1.1] mb-4">
                From Awakening<br className="hidden md:block" /> to Impact
              </h2>
              <p className="text-base text-[#C9B99A] max-w-xl leading-relaxed">
                Every great movement starts with one person asking the questions nobody else would.
                This is the story arc of how one voice became a platform, and how that platform
                is becoming a movement.
              </p>
            </div>
          </ScrollReveal>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-[rgba(255,149,0,0.15)]" />

            <div className="space-y-6 md:space-y-8">
              {STORY_ARC.map((arc, index) => {
                const Icon = arc.icon
                const isActive = activeArc === index
                return (
                  <ScrollReveal key={index} delay={index * 0.08}>
                    <motion.div
                      className={`relative pl-12 md:pl-20 cursor-pointer ${arc.highlight ? '' : ''}`}
                      onClick={() => setActiveArc(isActive ? null : index)}
                    >
                      {/* Timeline dot */}
                      <div
                        className={`absolute left-2.5 md:left-6.5 w-4 h-4 rounded-full border-2 transition-all ${
                          arc.highlight
                            ? 'bg-[#FF9500] border-[#FF9500]'
                            : 'bg-[#1B2838] border-[rgba(255,149,0,0.3)]'
                        }`}
                        style={{ top: '4px' }}
                      />

                      {/* Content card */}
                      <div className={`bg-[rgba(21,32,43,0.6)] rounded-xl border transition-all p-5 md:p-6 ${
                        isActive
                          ? 'border-[rgba(255,149,0,0.4)]'
                          : 'border-[rgba(255,149,0,0.08)] hover:border-[rgba(255,149,0,0.2)]'
                      }`}>
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-[#FF9500] font-mono-hud font-medium">{arc.year}</span>
                            {arc.highlight && (
                              <span className="text-[9px] uppercase tracking-[0.1em] text-[#FFB840] bg-[rgba(255,149,0,0.1)] border border-[rgba(255,149,0,0.15)] rounded-full px-2 py-0.5">
                                Milestone
                              </span>
                            )}
                          </div>
                          <Icon size={16} className="text-[#FF9500]/40 shrink-0" />
                        </div>
                        <h3 className="text-lg md:text-xl text-[#F0EBE1] font-medium mb-2">{arc.title}</h3>
                        <motion.div
                          initial={false}
                          animate={{ height: isActive ? 'auto' : '3.2em', opacity: isActive ? 1 : 0.7 }}
                          className="overflow-hidden"
                        >
                          <p className={`text-sm text-[#C9B99A] leading-relaxed ${!isActive ? 'line-clamp-2' : ''}`}>
                            {arc.description}
                          </p>
                        </motion.div>
                        {!isActive && (
                          <button className="text-[11px] text-[#FF9500]/60 hover:text-[#FF9500] mt-2 flex items-center gap-1 transition-colors">
                            Read more <ChevronRight size={10} />
                          </button>
                        )}
                      </div>
                    </motion.div>
                  </ScrollReveal>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ======================================== */}
      {/* PORTFOLIO GRID */}
      {/* ======================================== */}
      <section className="py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="mb-12 md:mb-16">
              <p className="text-xs uppercase tracking-[0.12em] text-[#FF9500] mb-3">What I'm Building</p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#F0EBE1] tracking-[-0.02em] leading-[1.1] mb-4">
                Portfolio &<br className="hidden md:block" /> Current Work
              </h2>
              <p className="text-base text-[#C9B99A] max-w-xl leading-relaxed">
                Every project serves the same mission: revealing truth, preserving heritage,
                and building platforms that empower. Here's what I'm building right now.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {PORTFOLIO_ITEMS.map((item, index) => {
              const Icon = item.icon
              return (
                <ScrollReveal key={index} delay={index * 0.06}>
                  <Link
                    to={item.link}
                    className="group block bg-[rgba(27,40,56,0.4)] rounded-xl border border-[rgba(255,149,0,0.08)] hover:border-[rgba(255,149,0,0.3)] p-5 md:p-6 transition-all h-full"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ background: `${item.color}15`, border: `1px solid ${item.color}25` }}
                      >
                        <Icon size={18} style={{ color: item.color }} />
                      </div>
                      <ExternalLink size={14} className="text-[#C9B99A]/30 group-hover:text-[#FF9500]/60 transition-colors" />
                    </div>

                    <h3 className="text-lg text-[#F0EBE1] font-medium mb-1 group-hover:text-[#FF9500] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#FF9500]/60 mb-3">{item.subtitle}</p>
                    <p className="text-sm text-[#C9B99A] leading-relaxed mb-4">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map(tag => (
                        <span
                          key={tag}
                          className="text-[10px] text-[#C9B99A]/60 bg-[rgba(201,185,154,0.06)] border border-[rgba(201,185,154,0.1)] rounded-full px-2.5 py-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ======================================== */}
      {/* BY THE NUMBERS */}
      {/* ======================================== */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-[rgba(27,40,56,0.3)]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {[
                { number: '275+', label: 'Indigenous Nations Documented', icon: Dna },
                { number: '75+', label: 'Territories Mapped', icon: MapPin },
                { number: '50', label: 'U.S. States Covered', icon: Landmark },
                { number: '1', label: 'Book — The Loins of the Beast', icon: BookOpen },
              ].map((stat, i) => {
                const Icon = stat.icon
                return (
                  <div key={i} className="text-center">
                    <Icon size={20} className="text-[#FF9500]/40 mx-auto mb-3" />
                    <p className="text-3xl md:text-4xl text-[#FF9500] font-medium mb-1">{stat.number}</p>
                    <p className="text-xs text-[#C9B99A]/60">{stat.label}</p>
                  </div>
                )
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ======================================== */}
      {/* WHAT DRIVES ME */}
      {/* ======================================== */}
      <section className="py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="mb-12">
              <p className="text-xs uppercase tracking-[0.12em] text-[#FF9500] mb-3">The Mission</p>
              <h2 className="text-4xl md:text-5xl text-[#F0EBE1] tracking-[-0.02em] leading-[1.1]">
                What Drives Me
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Heart,
                title: 'Truth Over Narrative',
                text: 'The history books lied. The records were hidden. The treaties were broken. I\'m here to set the record straight — with documents, with evidence, with the truth that can\'t be denied.',
              },
              {
                icon: Users,
                title: 'Empowerment Through Knowledge',
                text: 'When you know who you are, where you come from, and what was taken from you — you become unstoppable. Knowledge is the weapon they never expected us to find.',
              },
              {
                icon: TreePine,
                title: 'Legacy Preservation',
                text: 'Our ancestors\' stories are dying with each generation. The Ancestor Root Registry, the Sacred Gallery, the Heritage Map — these are tools to ensure no bloodline is ever forgotten.',
              },
              {
                icon: Award,
                title: 'Independent Media',
                text: 'AASOTU Media Group exists because the mainstream won\'t tell our stories. Independent publishing, investigative journalism, and content creation — built by us, for us.',
              },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className="bg-[rgba(27,40,56,0.4)] rounded-xl border border-[rgba(255,149,0,0.08)] p-5 md:p-6 hover:border-[rgba(255,149,0,0.2)] transition-all">
                    <Icon size={20} className="text-[#FF9500] mb-3" />
                    <h3 className="text-lg text-[#F0EBE1] font-medium mb-2">{item.title}</h3>
                    <p className="text-sm text-[#C9B99A] leading-relaxed">{item.text}</p>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ======================================== */}
      {/* CTA SECTION */}
      {/* ======================================== */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-[rgba(27,40,56,0.3)]">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <div className="flex justify-center gap-1 mb-6">
              {[0, 1, 2, 0, 1, 2].map(i => (
                <div key={i} className="w-[3px] h-[3px] rounded-full bg-[#FF9500]" />
              ))}
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-[#F0EBE1] tracking-[-0.02em] leading-[1.15] mb-4">
              The Work Continues.
              <br />
              <span className="text-[#FF9500]">The Voice Gets Louder.</span>
            </h2>
            <p className="text-base text-[#C9B99A] max-w-xl mx-auto leading-relaxed mb-8">
              This is just the beginning. The book drops soon. The map keeps growing.
              The platform keeps building. Join the movement.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/pre-order"
                className="inline-flex items-center gap-2 text-sm bg-[rgba(255,149,0,0.15)] text-[#FF9500] border border-[rgba(255,149,0,0.35)] rounded-lg px-8 py-3 hover:bg-[rgba(255,149,0,0.25)] transition-all"
              >
                <BookOpen size={15} /> Pre-Order the Book
              </Link>
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 text-sm bg-[rgba(27,40,56,0.6)] text-[#C9B99A] border border-[rgba(201,185,154,0.15)] rounded-lg px-8 py-3 hover:border-[rgba(255,149,0,0.3)] hover:text-[#FF9500] transition-all"
              >
                <Feather size={15} /> Work With Me
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  )
}
