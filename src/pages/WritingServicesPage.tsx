import { useState } from 'react'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import {
  ArrowLeft, PenTool, Mic, BookOpen, FileText, MessageSquare,
  Feather, Type, Scroll, Quote, ArrowRight, Check, Sparkles,
  ChevronDown, ChevronUp, Users
} from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'
import MarqueeDivider from '../components/MarqueeDivider'

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
}

const WRITING_SERVICES = [
  {
    id: 1,
    slug: 'speechwriting-narrative',
    title: 'Speechwriting & Narrative Development',
    icon: Mic,
    price: 'From $150',
    description: 'Speeches that move crowds. Scripts that captivate. Narratives that change minds.',
    details: 'From community rallies to documentary narration, I craft words that command attention and inspire action. Every speech is built around your voice, your message, and your audience.',
    offerings: [
      'Community Commentary & Op-Eds ($150+)',
      'Political & Rally Speeches ($350+)',
      'Podcast & YouTube Scripts ($200+)',
      'Documentary Narration ($500+)',
      'Ghostwriting for Public Figures ($1,000+)',
      'Eulogies & Commemorative Speeches ($250+)',
    ],
    cta: 'Book Speechwriting',
  },
  {
    id: 2,
    slug: 'book-publishing',
    title: 'Book & Publishing Support',
    icon: BookOpen,
    price: 'From $499',
    description: 'From manuscript to published author. Turn your story into a book that moves people.',
    details: 'I wrote my first book from a jail cell with nothing but pen and paper. Today I help other authors turn their stories into published works. From concept to bookshelf — every step of the journey.',
    offerings: [
      'Author Launch Consultation ($499)',
      'Manuscript Development & Editing ($750+)',
      'Self-Publishing Guidance & Setup ($750)',
      'Cover Direction & Creative Design',
      'Launch Strategy & Distribution Plan',
      'Premium Full-Service Publishing ($1,500+)',
    ],
    cta: 'Start Your Book',
  },
  {
    id: 3,
    slug: 'legacy-interview',
    title: 'Legacy Interview & Story Preservation',
    icon: Scroll,
    price: 'From $500',
    description: 'Your story. Your voice. Your legacy. Captured and preserved for generations.',
    details: 'I sit down with you and capture your story — then transform it into a professional written piece. A 60-90 minute interview becomes a polished feature, book chapter, or documentary script.',
    offerings: [
      '60-90 Minute Professional Interview',
      'Written Feature Article ($500)',
      'Book Chapter ($750)',
      'Podcast Episode Script ($600)',
      'Documentary Narration Script ($1,000)',
      'Split Payment: 50% Deposit + 50% on Delivery',
    ],
    cta: 'Preserve Your Legacy',
  },
  {
    id: 4,
    slug: 'ghostwriting',
    title: 'Ghostwriting Services',
    icon: Feather,
    price: 'From $1,500',
    description: 'Your name. My words. Professional ghostwriting for leaders, creators, and visionaries.',
    details: 'When you have a message but not the time or craft to write it — I become your voice. Books, articles, speeches, and social content that sounds exactly like you, because it is built around you.',
    offerings: [
      'Articles & Blog Posts ($500+)',
      'Social Media Content Series ($750+)',
      'Op-Eds & Commentary ($1,000+)',
      'Book Ghostwriting ($5,000+)',
      'Speech Series & Campaign Messaging ($2,500+)',
      'Complete Voice & Brand Development',
    ],
    cta: 'Explore Ghostwriting',
  },
  {
    id: 5,
    slug: 'content-writing',
    title: 'Content Writing & Copywriting',
    icon: Type,
    price: 'From $75',
    description: 'Website copy, blog posts, marketing content — words that convert and connect.',
    details: 'Every piece of content is strategically crafted to engage your audience, communicate your value, and drive action. SEO-informed, brand-aligned, and built for results.',
    offerings: [
      'Blog Posts & Articles ($75+)',
      'Website Copy & Landing Pages ($300+)',
      'Email Sequences & Newsletters ($500+)',
      'Marketing & Sales Copy ($250+)',
      'Press Releases & Media Kits ($350+)',
      'Monthly Content Retainers ($500+/mo)',
    ],
    cta: 'Get Content Writing',
  },
  {
    id: 6,
    slug: 'consulting-strategy',
    title: 'Creative Consulting & Story Strategy',
    icon: MessageSquare,
    price: '$100/hour',
    description: '1-on-1 creative strategy for storytellers, advocates, and community builders.',
    details: 'Not legal advice — creative strategy. Story development, platform building, content planning, and advocacy organization. For people building something that matters.',
    offerings: [
      'Single Strategy Session ($100/hr)',
      '5-Session Strategy Package ($400)',
      'Platform & Brand Development',
      'Content Planning & Messaging Strategy',
      'Advocacy Organization Guidance',
      'Monthly Retainer (Custom)',
    ],
    cta: 'Book a Session',
  },
  {
    id: 7,
    slug: 'ai-assisted-creative',
    title: 'AI-Assisted Creative Services',
    icon: Sparkles,
    price: 'From $75',
    description: 'Human storytelling enhanced by modern AI. Research, drafting, optimization, strategy.',
    details: 'AI amplifies your voice — it does not replace it. I use cutting-edge tools to accelerate research, generate drafts, and optimize content — then apply human craft to make it powerful.',
    offerings: [
      'AI-Assisted Content Drafting ($75+)',
      'AI + Human Editing Package ($250+)',
      'Research & Fact-Checking ($150+)',
      'SEO Optimization & Analysis',
      'Content Strategy with AI Insights',
      'Enterprise Content Systems (Custom)',
    ],
    cta: 'Explore AI Services',
  },
];

const TESTIMONIALS = [
  {
    quote: "Ronald has a gift for taking scattered thoughts and turning them into something that moves people. My speech at the community forum had people standing up.",
    author: "Community Organizer",
    location: "Atlanta, GA",
  },
  {
    quote: "He helped me turn my life story into a book proposal that got picked up. The man knows how to craft a narrative.",
    author: "First-Time Author",
    location: "Chicago, IL",
  },
  {
    quote: "The Legacy Interview process was powerful. He asked questions no one ever asked me before. The final piece is something my grandchildren will read.",
    author: "Legacy Client",
    location: "Houston, TX",
  },
];

export default function WritingServicesPage() {
  const [expandedService, setExpandedService] = useState<number | null>(null);

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center px-6 md:px-12 pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/bg-services.jpg)' }} />
        <div className="absolute inset-0 bg-[#1B2838]/85" />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-[#C9B99A] hover:text-[#FF9500] transition-colors mb-8">
            <ArrowLeft size={16} /> Back to Home
          </Link>

          <ScrollReveal>
            <div className="flex items-center gap-3 mb-6">
              <PenTool size={28} className="text-[#FF9500]" strokeWidth={1.5} />
              <p className="text-xs uppercase tracking-[0.08em] text-[#C9B99A]">WRITING SERVICES</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <h1 className="text-4xl md:text-5xl lg:text-[64px] text-[#F0EBE1] tracking-[-0.02em] leading-[1.08] mb-6 text-shadow-hero">
              Your Vision.<br />My Words.
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.25}>
            <p className="text-lg text-[#C9B99A] leading-relaxed max-w-2xl mb-6">
              Boutique creative media services built with precision, power, and purpose. From speeches that move crowds to books that change lives — every project is crafted to amplify your voice.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.35}>
            <Link
              to="/writing-services"
              className="inline-flex items-center justify-center rounded-full h-14 px-10 text-base bg-[#FF9500] text-[#1B2838] hover:bg-[#CC6A00] transition-colors font-['Newsreader'] tracking-[0.02em]"
              style={{ boxShadow: "0 4px 16px rgba(255,149,0,0.25)" }}
            >
              <Sparkles size={18} className="mr-2" /> Explore All Services
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <MarqueeDivider text="#TheKingsTake — Your Vision. My Words. — Storytelling That Moves People — AASOTU Media Group" />

      {/* Services Accordion */}
      <section className="relative py-16 md:py-24 px-6 md:px-12 bg-[#0C1520]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="mb-12">
              <p className="text-xs uppercase tracking-[0.08em] text-[#C9B99A] mb-4">WHAT I OFFER</p>
              <h2 className="text-3xl md:text-4xl text-[#F0EBE1] tracking-[-0.02em] leading-[1.1] text-shadow-hero">
                Every Story Deserves<br />to Be Told Right
              </h2>
            </div>
          </ScrollReveal>

          <div className="space-y-4">
            {WRITING_SERVICES.map((service, i) => {
              const Icon = service.icon;
              const isExpanded = expandedService === service.id;
              return (
                <motion.div
                  key={service.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  variants={cardVariants}
                  transition={{ delay: i * 0.08 }}
                >
                  {/* Service Header */}
                  <button
                    onClick={() => setExpandedService(isExpanded ? null : service.id)}
                    className="w-full flex items-center justify-between p-5 md:p-6 bg-[rgba(27,40,56,0.85)] backdrop-blur-lg rounded border border-[rgba(255,149,0,0.2)] hover:border-[rgba(255,149,0,0.4)] transition-all duration-300 group text-left"
                    style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded flex items-center justify-center bg-[rgba(255,149,0,0.1)]">
                        <Icon size={24} className="text-[#FF9500]" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="text-base md:text-lg text-[#F0EBE1] uppercase tracking-[0.04em] group-hover:text-[#FF9500] transition-colors">{service.title}</h3>
                        <p className="text-xs text-[#C9B99A]/60 mt-0.5">{service.price}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className="hidden md:inline-flex items-center gap-1 text-xs text-[#FF9500] uppercase tracking-[0.04em]"
                      >
                        {isExpanded ? 'Close' : 'Expand'} <ArrowRight size={12} className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
                      </span>
                      {isExpanded ? (
                        <ChevronUp size={20} className="text-[#FF9500]" />
                      ) : (
                        <ChevronDown size={20} className="text-[#C9B99A]/60 group-hover:text-[#FF9500] transition-colors" />
                      )}
                    </div>
                  </button>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                      className="mt-3 p-5 md:p-6 bg-[rgba(27,40,56,0.6)] rounded border border-[rgba(255,149,0,0.15)]"
                    >
                      <p className="text-sm text-[#C9B99A] leading-relaxed mb-4">{service.details}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
                        {service.offerings.map((offering, offIdx) => (
                          <div key={offIdx} className="flex items-start gap-2">
                            <Check size={16} className="text-[#FF9500] shrink-0 mt-0.5" />
                            <span className="text-sm text-[#F0EBE1]">{offering}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-4">
                        <Link
                          to="/contact"
                          className="inline-flex items-center gap-2 text-sm bg-[#FF9500] text-[#0C1520] px-6 py-2.5 rounded hover:bg-[#CC6A00] transition-colors font-medium"
                        >
                          Request This Service <ArrowRight size={14} />
                        </Link>
                        <span className="text-xs text-[#FF9500]/70">Stripe checkout coming soon</span>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-16 md:py-24 px-6 md:px-12" style={{ backgroundColor: '#1B2838' }}>
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-[0.08em] text-[#C9B99A] mb-12">WHAT CLIENTS SAY</p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={cardVariants}
                transition={{ delay: 0.3 + i * 0.12 }}
                className="bg-[rgba(27,40,56,0.6)] rounded border border-[rgba(255,149,0,0.15)] p-6"
                style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
              >
                <Quote size={24} className="text-[#FF9500] mb-4" strokeWidth={1.5} />
                <p className="text-sm text-[#C9B99A] leading-relaxed mb-4 italic">"{t.quote}"</p>
                <div className="border-t border-[rgba(255,149,0,0.1)] pt-3">
                  <p className="text-xs text-[#F0EBE1]">{t.author}</p>
                  <p className="text-[10px] text-[#C9B99A]/50">{t.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 md:py-24 px-6 md:px-12 bg-[#0C1520]">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <FileText size={32} className="text-[#FF9500] mx-auto mb-6" strokeWidth={1.5} />
            <h2 className="text-3xl md:text-4xl text-[#F0EBE1] tracking-[-0.02em] leading-[1.1] mb-4 text-shadow-hero">
              Ready to Tell Your Story?
            </h2>
            <p className="text-base text-[#C9B99A] mb-8 max-w-xl mx-auto">
              Every great movement starts with a story. Every great leader needs a voice. Let me help you find yours.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-full h-14 px-10 text-base bg-[#FF9500] text-[#1B2838] hover:bg-[#CC6A00] transition-colors font-['Newsreader'] tracking-[0.02em]"
                style={{ boxShadow: "0 4px 16px rgba(255,149,0,0.25)" }}
              >
                <Sparkles size={18} className="mr-2" /> Get In Touch
              </Link>
              <Link
                to="/work-with-us"
                className="inline-flex items-center justify-center rounded-full h-14 px-10 text-base border border-[rgba(255,149,0,0.4)] text-[#FF9500] hover:bg-[rgba(255,149,0,0.08)] transition-colors font-['Newsreader'] tracking-[0.02em]"
              >
                <Users size={18} className="mr-2" /> Work With Me
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <MarqueeDivider text="#TheKingsTake — The People's Voice — AASOTU Media Group — Advocacy. Truth. Justice." />
    </main>
  );
}
