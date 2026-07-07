import { Link } from 'react-router'
import { motion } from 'framer-motion'
import {
  BookOpen, Globe, TreePine, Mic, Landmark, Feather, Crown,
  ArrowLeft, ChevronRight, Target, Heart, Eye, Users, Sparkles,
  Scroll, FileText, Dna, MapPin, Award, Briefcase, Radio
} from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'

// ============================================
// ORIGIN STORY DATA
// ============================================
const ORIGIN_STEPS = [
  {
    year: '2019',
    title: 'The Question',
    text: 'Ronald Lee King asked a dangerous question: "Why don\'t we know our own history?" The search for answers led down a rabbit hole of buried treaties, hidden reclassification laws, and a systematic erasure of Indigenous Aboriginal Royal American identity that spans centuries.',
    icon: Eye,
  },
  {
    year: '2020–2022',
    title: 'The Research',
    text: 'Years of compiling tribal records across all 50 U.S. states, expanding into the Caribbean, documenting 275+ Indigenous nations. The Dawes Rolls, broken treaties, vital records — every document told the same story: we were here before anybody, and they tried to erase the proof.',
    icon: Scroll,
  },
  {
    year: '2023',
    title: 'The Company',
    text: 'AASOTU Media Group LLC was founded not in a boardroom, but in the trenches — while fighting a 1983 Civil Rights Action and an EEOC case. Built independently, funded by conviction, driven by a mission to tell the stories the mainstream media won\'t touch.',
    icon: Briefcase,
  },
  {
    year: '2024',
    title: 'The Platform',
    text: 'TheKingsTake.com launched as a living ecosystem — the book, the interactive heritage map, the Ancestor Root Registry, civic advocacy tools, and writing services. One platform. One mission. Multiple weapons in the fight for truth.',
    icon: Radio,
  },
  {
    year: '2025–2026',
    title: 'The Movement',
    text: 'The book is ready for pre-order. The map documents 75+ territories. The registry preserves bloodlines. The voice gets louder every day. This isn\'t just a company — it\'s a movement built from the ground up by one man who refused to be silenced.',
    icon: Crown,
  },
]

// ============================================
// SERVICES DATA
// ============================================
const SERVICES = [
  {
    icon: BookOpen,
    title: 'Independent Publishing',
    desc: 'Full-service book development from manuscript to market. ISBN registration, professional formatting, cover design, and distribution — every step handled in-house with the same care that built The African American State of the Union.',
    tags: ['Books', 'eBooks', 'ISBN', 'Distribution'],
  },
  {
    icon: Mic,
    title: 'Speechwriting & Oratory',
    desc: 'From courtroom arguments to commencement addresses. Words that move people, change minds, and shift power. Every speech is built on research, conviction, and the truth of your story.',
    tags: ['Speeches', 'Presentations', 'Legal Arguments'],
  },
  {
    icon: Feather,
    title: 'Content Creation & Ghostwriting',
    desc: 'Articles, essays, op-eds, social content, and full ghostwriting services. Your voice, amplified. Your story, told with the precision and passion it deserves.',
    tags: ['Articles', 'Essays', 'Social Content', 'Ghostwriting'],
  },
  {
    icon: Landmark,
    title: 'Civic Advocacy & Legal Education',
    desc: 'Resources for understanding civil rights, filing EEOC complaints, and navigating the legal system. Born from personal experience fighting a 1983 Civil Rights Action — this guidance is battle-tested.',
    tags: ['Civil Rights', 'EEOC', 'Legal Education'],
  },
  {
    icon: Globe,
    title: 'Heritage Research & Documentation',
    desc: 'Comprehensive Indigenous heritage research across the Americas. Tribal records, treaties, Dawes Rolls, vital records, and custom research reports for individuals, organizations, and institutions.',
    tags: ['Genealogy', 'Tribal Records', 'Research Reports'],
  },
  {
    icon: TreePine,
    title: 'Digital Legacy Preservation',
    desc: 'The Ancestor Root Registry technology adapted for families, communities, and institutions. Secure digital archives that honor bloodlines and preserve heritage for future generations.',
    tags: ['Family Archives', 'Community Records', 'Digital Preservation'],
  },
]

// ============================================
// PLATFORMS DATA
// ============================================
const PLATFORMS = [
  {
    name: 'TheKingsTake.com',
    desc: 'The flagship platform — book, heritage map, ancestry tools, civic advocacy, and writing services. Everything in one place.',
    link: '/',
    icon: Crown,
    color: '#FF9500',
  },
  {
    name: 'Indigenous Heritage Map',
    desc: 'Interactive satellite map documenting 275+ Indigenous nations across 75+ territories. Tribal data, laws, treaties, and vital records.',
    link: '/#heritage',
    icon: Globe,
    color: '#FF9500',
  },
  {
    name: 'Ancestor Root Registry',
    desc: 'A sacred digital archive for families to document their bloodline, store family trees, and preserve their heritage.',
    link: '/ancestor-root-registry',
    icon: TreePine,
    color: '#C9B99A',
  },
]

// ============================================
// MAIN PAGE
// ============================================
export default function AasotuBrandPage() {
  return (
    <main className="min-h-screen bg-[#0a0f1a]">
      {/* ======================================== */}
      {/* HERO */}
      {/* ======================================== */}
      <section className="relative min-h-[90vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/author-1.jpg"
            alt="Ronald Lee King — Founder, AASOTU Media Group LLC"
            className="w-full h-full object-cover object-top"
            style={{ filter: 'brightness(0.35)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-[#0a0f1a]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1a]/70 via-transparent to-[#0a0f1a]/50" />
        </div>

        <div className="relative z-10 w-full px-6 md:px-12 pb-16 md:pb-24 pt-32">
          <div className="max-w-7xl mx-auto">
            <Link to="/" className="inline-flex items-center gap-2 text-xs text-[#C9B99A] hover:text-[#FF9500] transition-colors mb-8">
              <ArrowLeft size={14} /> Back to Home
            </Link>

            <ScrollReveal>
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="text-[10px] uppercase tracking-[0.15em] text-[#FF9500] bg-[rgba(255,149,0,0.1)] border border-[rgba(255,149,0,0.2)] rounded-full px-4 py-1.5">
                  The People's Voice
                </span>
                <span className="text-[10px] uppercase tracking-[0.15em] text-[#C9B99A] bg-[rgba(27,40,56,0.6)] border border-[rgba(201,185,154,0.15)] rounded-full px-4 py-1.5">
                  Independent Media
                </span>
                <span className="text-[10px] uppercase tracking-[0.15em] text-[#C9B99A] bg-[rgba(27,40,56,0.6)] border border-[rgba(201,185,154,0.15)] rounded-full px-4 py-1.5">
                  Est. 2023
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h1 className="text-5xl md:text-7xl lg:text-[90px] text-[#F0EBE1] tracking-[-0.03em] leading-[1.05] mb-6 text-shadow-hero">
                AASOTU Media<br className="hidden md:block" /> Group LLC
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-xl md:text-2xl text-[#C9B99A] max-w-2xl leading-relaxed mb-4">
                Truth over narrative. History over erasure. Legacy over moment.
              </p>
              <p className="text-sm text-[#C9B99A]/60 max-w-xl leading-relaxed mb-8">
                An independent media company built from the ground up by Ronald Lee King — 
                author, researcher, advocate, and founder. We publish what the mainstream won't, 
                research what they buried, and build platforms that empower our people.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="flex flex-wrap gap-3">
                <Link to="/pre-order" className="inline-flex items-center gap-2 text-sm bg-[rgba(255,149,0,0.15)] text-[#FF9500] border border-[rgba(255,149,0,0.35)] rounded-lg px-6 py-3 hover:bg-[rgba(255,149,0,0.25)] transition-all">
                  <BookOpen size={15} /> Pre-Order the Book
                </Link>
                <a href="#services" className="inline-flex items-center gap-2 text-sm bg-[rgba(27,40,56,0.6)] text-[#C9B99A] border border-[rgba(201,185,154,0.15)] rounded-lg px-6 py-3 hover:border-[rgba(255,149,0,0.3)] hover:text-[#FF9500] transition-all">
                  <Sparkles size={15} /> Our Services
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ======================================== */}
      {/* QUOTE */}
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
              "I didn't set out to become the voice of a movement. I set out to write a book 
              that confronted the stereotypes we've been force-fed and charted a path toward 
              a new Industrial Revolution built by and for our people."
            </blockquote>
            <p className="text-sm text-[#FF9500] uppercase tracking-[0.12em]">— Ronald Lee King, Author & Founder</p>
          </ScrollReveal>
        </div>
      </section>

      {/* ======================================== */}
      {/* THE BOOK — FLAGSHIP PRODUCT */}
      {/* ======================================== */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-[rgba(27,40,56,0.3)]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="mb-4">
              <p className="text-xs uppercase tracking-[0.12em] text-[#FF9500] mb-3">Flagship Publication</p>
              <h2 className="text-4xl md:text-5xl text-[#F0EBE1] tracking-[-0.02em] leading-[1.1]">
                The African American<br className="hidden md:block" /> State of the Union
              </h2>
              <p className="text-lg text-[#FF9500]/70 italic mt-2">From the Loins of the Beast</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start mt-10">
            <ScrollReveal delay={0.1}>
              <div style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(255,149,0,0.15)' }}>
                <img src="/images/book-cover.jpg" alt="Book Cover" className="w-full h-auto rounded-lg" />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="space-y-5">
                <p className="text-base text-[#C9B99A] leading-relaxed">
                  <strong className="text-[#F0EBE1]">The African American State of the Union: From the Loins of the Beast</strong> is the 
                  cornerstone publication of AASOTU Media Group LLC. A groundbreaking investigation into the systematic 
                  erasure of Indigenous Aboriginal Royal American identity — exposing reclassification laws, hidden 
                  treaties, and the truth they never taught in school.
                </p>
                <p className="text-base text-[#C9B99A] leading-relaxed">
                  This book was written during one of the most challenging periods of the author's life: navigating 
                  a filed 1983 Civil Rights Action, an open EEOC case, and the loss of employment — all while building 
                  this platform and preparing this historic digital release.
                </p>
                <p className="text-base text-[#C9B99A] leading-relaxed">
                  Every dollar from pre-orders goes toward final production: ISBN registration, professional formatting, 
                  proofreading, and cover design. Your support directly fuels an independent Black author, father, and 
                  entrepreneur who is doing this entirely on his own.
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {['Digital Edition (PDF + ePub)', 'Early Access', 'Founding Reader Status', 'Full Refund Guarantee'].map(tag => (
                    <span key={tag} className="text-[10px] text-[#C9B99A]/60 bg-[rgba(201,185,154,0.06)] border border-[rgba(201,185,154,0.1)] rounded-full px-3 py-1.5">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 pt-4">
                  <Link to="/pre-order" className="inline-flex items-center gap-2 text-sm bg-[#FF9500] text-[#1B2838] rounded-lg px-6 py-3 hover:bg-[#CC6A00] transition-all font-medium">
                    <BookOpen size={15} /> Pre-Order Now — $19.99
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ======================================== */}
      {/* ORIGIN STORY */}
      {/* ======================================== */}
      <section className="py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="mb-12 md:mb-16">
              <p className="text-xs uppercase tracking-[0.12em] text-[#FF9500] mb-3">How It All Came About</p>
              <h2 className="text-4xl md:text-5xl text-[#F0EBE1] tracking-[-0.02em] leading-[1.1] mb-4">
                From One Question<br className="hidden md:block" /> to a Movement
              </h2>
              <p className="text-base text-[#C9B99A] max-w-xl leading-relaxed">
                AASOTU Media Group wasn't born in a venture capital pitch or a corporate incubator. 
                It was born from a man asking dangerous questions — and refusing to accept the silence that followed.
              </p>
            </div>
          </ScrollReveal>

          <div className="relative">
            <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-[rgba(255,149,0,0.15)]" />
            <div className="space-y-6 md:space-y-8">
              {ORIGIN_STEPS.map((step, index) => {
                const Icon = step.icon
                return (
                  <ScrollReveal key={index} delay={index * 0.08}>
                    <div className="relative pl-12 md:pl-20">
                      <div className="absolute left-2.5 md:left-6.5 w-4 h-4 rounded-full border-2 bg-[#FF9500] border-[#FF9500]" style={{ top: '4px' }} />
                      <div className="bg-[rgba(21,32,43,0.6)] rounded-xl border border-[rgba(255,149,0,0.08)] hover:border-[rgba(255,149,0,0.2)] transition-all p-5 md:p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-xs text-[#FF9500] font-mono-hud font-medium">{step.year}</span>
                          <Icon size={16} className="text-[#FF9500]/40" />
                        </div>
                        <h3 className="text-lg md:text-xl text-[#F0EBE1] font-medium mb-2">{step.title}</h3>
                        <p className="text-sm text-[#C9B99A] leading-relaxed">{step.text}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ======================================== */}
      {/* SERVICES */}
      {/* ======================================== */}
      <section id="services" className="py-16 md:py-24 px-6 md:px-12 bg-[rgba(27,40,56,0.3)]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="mb-12 md:mb-16">
              <p className="text-xs uppercase tracking-[0.12em] text-[#FF9500] mb-3">What We Provide</p>
              <h2 className="text-4xl md:text-5xl text-[#F0EBE1] tracking-[-0.02em] leading-[1.1] mb-4">
                Services Built<br className="hidden md:block" /> for Purpose
              </h2>
              <p className="text-base text-[#C9B99A] max-w-xl leading-relaxed">
                Every service we offer serves the same mission: amplifying voices, preserving truth, 
                and building lasting legacies. Here's how we work with our clients.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {SERVICES.map((service, index) => {
              const Icon = service.icon
              return (
                <ScrollReveal key={index} delay={index * 0.06}>
                  <div className="bg-[rgba(27,40,56,0.4)] rounded-xl border border-[rgba(255,149,0,0.08)] hover:border-[rgba(255,149,0,0.25)] p-5 md:p-6 transition-all h-full flex flex-col">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[rgba(255,149,0,0.08)] border border-[rgba(255,149,0,0.15)] mb-4">
                      <Icon size={18} className="text-[#FF9500]" />
                    </div>
                    <h3 className="text-lg text-[#F0EBE1] font-medium mb-2">{service.title}</h3>
                    <p className="text-sm text-[#C9B99A] leading-relaxed mb-4 flex-1">{service.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {service.tags.map(tag => (
                        <span key={tag} className="text-[10px] text-[#C9B99A]/50 bg-[rgba(201,185,154,0.05)] border border-[rgba(201,185,154,0.1)] rounded-full px-2 py-1">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ======================================== */}
      {/* PLATFORMS */}
      {/* ======================================== */}
      <section className="py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="mb-12">
              <p className="text-xs uppercase tracking-[0.12em] text-[#FF9500] mb-3">Our Platforms</p>
              <h2 className="text-4xl md:text-5xl text-[#F0EBE1] tracking-[-0.02em] leading-[1.1] mb-4">
                One Mission.<br className="hidden md:block" /> Multiple Weapons.
              </h2>
              <p className="text-base text-[#C9B99A] max-w-xl leading-relaxed">
                TheKingsTake.com isn't just a website — it's an ecosystem. Each platform serves a different 
                front in the same war: reclaiming our history, preserving our legacy, and empowering our people.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {PLATFORMS.map((platform, index) => {
              const Icon = platform.icon
              return (
                <ScrollReveal key={index} delay={index * 0.08}>
                  <Link
                    to={platform.link}
                    className="group block bg-[rgba(27,40,56,0.4)] rounded-xl border border-[rgba(255,149,0,0.08)] hover:border-[rgba(255,149,0,0.3)] p-5 md:p-6 transition-all h-full"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${platform.color}15`, border: `1px solid ${platform.color}25` }}>
                        <Icon size={18} style={{ color: platform.color }} />
                      </div>
                      <ChevronRight size={14} className="text-[#C9B99A]/30 group-hover:text-[#FF9500]/60 transition-colors" />
                    </div>
                    <h3 className="text-lg text-[#F0EBE1] font-medium mb-2 group-hover:text-[#FF9500] transition-colors">
                      {platform.name}
                    </h3>
                    <p className="text-sm text-[#C9B99A] leading-relaxed">{platform.desc}</p>
                  </Link>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ======================================== */}
      {/* STAPLE HOUSE / BRAND IDENTITY */}
      {/* ======================================== */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-[rgba(27,40,56,0.3)]">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="flex justify-center gap-1 mb-6">
                {[0, 1, 2, 0, 1, 2].map(i => (
                  <div key={i} className="w-[3px] h-[3px] rounded-full bg-[#FF9500]" />
                ))}
              </div>
              <p className="text-xs uppercase tracking-[0.12em] text-[#FF9500] mb-3">Staple House Title</p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#F0EBE1] tracking-[-0.02em] leading-[1.1] mb-4">
                #TheKingsTake
              </h2>
              <p className="text-lg text-[#C9B99A] max-w-2xl mx-auto leading-relaxed">
                More than a hashtag. More than a website. #TheKingsTake is our declaration — 
                that we will no longer accept the narrative written about us. We will write our own.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: Target, title: 'The Mission', text: 'To reveal the buried history of Indigenous Aboriginal Royal Americans, preserve that legacy through technology, and empower our communities with knowledge, tools, and platforms they control.' },
              { icon: Heart, title: 'The Values', text: 'Truth over narrative. History over erasure. Legacy over moment. Independence over dependence. Community over corporation. Every decision we make is filtered through these principles.' },
              { icon: Users, title: 'The Community', text: '12,000+ strong and growing. From genealogy researchers to civil rights advocates, from writers to historians — our community is a movement of people who refuse to let our story be forgotten.' },
              { icon: Award, title: 'The Standard', text: 'We don\'t just compete — we set the bar. 275+ Indigenous nations documented. 75+ territories mapped. One book that changes the conversation. Built by one man with one mission.' },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className="bg-[rgba(21,32,43,0.6)] rounded-xl border border-[rgba(255,149,0,0.08)] p-5 md:p-6 hover:border-[rgba(255,149,0,0.2)] transition-all">
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
      {/* HOW IT ALL CONNECTS */}
      {/* ======================================== */}
      <section className="py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-5xl mx-auto text-center">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-[0.12em] text-[#FF9500] mb-3">The Ecosystem</p>
            <h2 className="text-4xl md:text-5xl text-[#F0EBE1] tracking-[-0.02em] leading-[1.1] mb-6">
              How It All<br className="hidden md:block" /> Intertwines
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="bg-[rgba(27,40,56,0.4)] rounded-xl border border-[rgba(255,149,0,0.12)] p-6 md:p-8 max-w-3xl mx-auto">
              <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-6">
                {[
                  { label: 'The Book', icon: BookOpen, color: '#FF9500' },
                  { label: 'The Map', icon: Globe, color: '#FF9500' },
                  { label: 'The Registry', icon: TreePine, color: '#C9B99A' },
                  { label: 'The Voice', icon: Mic, color: '#FFB840' },
                  { label: 'The Fight', icon: Landmark, color: '#FFB840' },
                ].map((item, i) => {
                  const Icon = item.icon
                  return (
                    <div key={i} className="flex items-center gap-2 bg-[rgba(21,32,43,0.6)] rounded-full px-4 py-2 border border-[rgba(255,149,0,0.1)]">
                      <Icon size={14} style={{ color: item.color }} />
                      <span className="text-xs text-[#F0EBE1]">{item.label}</span>
                    </div>
                  )
                })}
              </div>
              <p className="text-sm text-[#C9B99A] leading-relaxed">
                The book exposes the truth. The map documents the evidence. The registry preserves the bloodlines. 
                The voice amplifies the message. The fight protects the rights. Each piece reinforces the others. 
                Remove one, and the whole structure weakens. Together, they form something unprecedented: 
                a self-sufficient ecosystem of truth, built by us, for us, controlled by us.
              </p>
              <p className="text-sm text-[#FF9500]/70 italic mt-4">
                AASOTU Media Group LLC is the engine. Ronald Lee King is the architect. 
                #TheKingsTake is the banner. And you — the community — are the force that makes it all move.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ======================================== */}
      {/* CTA */}
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
              The Work Continues.<br />
              <span className="text-[#FF9500]">The Voice Gets Louder.</span>
            </h2>
            <p className="text-base text-[#C9B99A] max-w-xl mx-auto leading-relaxed mb-8">
              This is just the beginning. Support independent Black media. 
              Pre-order the book. Explore the platforms. Join the movement.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/pre-order" className="inline-flex items-center gap-2 text-sm bg-[rgba(255,149,0,0.15)] text-[#FF9500] border border-[rgba(255,149,0,0.35)] rounded-lg px-8 py-3 hover:bg-[rgba(255,149,0,0.25)] transition-all">
                <BookOpen size={15} /> Pre-Order the Book
              </Link>
              <Link to="/writing-services" className="inline-flex items-center gap-2 text-sm bg-[rgba(27,40,56,0.6)] text-[#C9B99A] border border-[rgba(201,185,154,0.15)] rounded-lg px-8 py-3 hover:border-[rgba(255,149,0,0.3)] hover:text-[#FF9500] transition-all">
                <Feather size={15} /> Work With Us
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer brand bar */}
      <div className="border-t border-[rgba(255,149,0,0.08)] py-8 px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-[9px] uppercase tracking-[0.2em] text-[#FF9500]/40">#TheKingsTake</span>
          <span className="text-[#C9B99A]/20">|</span>
          <span className="text-[9px] uppercase tracking-wider text-[#C9B99A]/30">AASOTU Media Group LLC</span>
        </div>
        <p className="text-[10px] text-[#C9B99A]/20">
          The People's Voice. Truth Over Narrative. Built with purpose. Powered by truth.
        </p>
      </div>
    </main>
  )
}
