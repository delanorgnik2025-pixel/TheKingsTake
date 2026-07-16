import { useState } from 'react'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import {
  ArrowLeft, Users, Send, CheckCircle, Sparkles, Globe,
  Video, Search, PenTool, Mic, BookOpen, Share2, MapPin,
  Clock, Star, AlertTriangle, Mail
} from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'

// ============================================
// WORK WITH US — Volunteer/Collaboration Page
// Roles people can apply for to help grow AASOTU
// ============================================

const ROLES = [
  {
    id: 'post-commander',
    title: 'Post Commander',
    tagline: 'Be Our Eyes & Ears on the Ground',
    icon: MapPin,
    description: 'Source stories, breaking news, and leads from your region. You are our frontline correspondent — finding the stories that matter and getting them to us fast.',
    responsibilities: [
      'Monitor local news and community events',
      'Source stories relevant to Indigenous/Aboriginal heritage',
      'Submit leads within 24-48 hours of discovery',
      'Verify basic facts before submission',
    ],
    requirements: [
      'Passionate about our mission',
      'Active in your local community',
      'Reliable communication (Facebook or email)',
      'No journalism experience required',
    ],
    exchange: [
      'Featured byline credit on published stories you source',
      'Platform visibility across all AASOTU channels',
      'Early access to new features and content',
      'First consideration when paid hiring begins',
    ],
    timeCommitment: '5-10 hours/week',
  },
  {
    id: 'video-editor',
    title: 'In-House Video Editor',
    tagline: 'Shape Our Visual Story',
    icon: Video,
    description: 'Find our kind of content and distribute it across platforms. Edit clips, create shorts, and help us build a multimedia presence that matches our message.',
    responsibilities: [
      'Edit video content for TikTok, Instagram Reels, YouTube Shorts',
      'Source and clip relevant news segments',
      'Create promotional clips for the book and platform',
      'Maintain consistent brand visual style',
    ],
    requirements: [
      'Basic video editing skills (CapCut, Premiere, etc.)',
      'Understanding of social media platforms',
      'Access to editing software',
      'Creative eye for compelling content',
    ],
    exchange: [
      'Portfolio building with co-branded content',
      'Co-credit on all video content you produce',
      'Access to exclusive footage and materials',
      'First consideration for paid video editor role',
    ],
    timeCommitment: '5-15 hours/week',
  },
  {
    id: 'community-researcher',
    title: 'Community Researcher',
    tagline: 'Uncover What They Buried',
    icon: Search,
    description: 'Dig into records, verify facts, and expand our heritage database. Research tribal records, treaties, Dawes Rolls, and historical documents.',
    responsibilities: [
      'Research Indigenous tribal records and treaties',
      'Verify historical facts and citations',
      'Expand territory and nation documentation',
      'Contribute to the heritage database',
    ],
    requirements: [
      'Interest in genealogy and historical research',
      'Attention to detail and accuracy',
      'Basic internet research skills',
      'Access to library or archive resources (preferred)',
    ],
    exchange: [
      'Research credit on published materials',
      'Early access to heritage tools and database',
      'Collaboration with our research network',
      'First consideration for paid researcher role',
    ],
    timeCommitment: '3-10 hours/week',
  },
  {
    id: 'content-curator',
    title: 'Content Curator & Distributor',
    tagline: 'Amplify the Voice',
    icon: Share2,
    description: 'Share and distribute our content across platforms. Help us reach new audiences by strategically sharing posts, engaging with comments, and building community.',
    responsibilities: [
      'Share AASOTU content across your networks',
      'Engage with comments and messages',
      'Help grow our Facebook and Instagram following',
      'Identify collaboration opportunities',
    ],
    requirements: [
      'Active on social media',
      'Good communication skills',
      'Passionate about our mission',
      'Community-minded and reliable',
    ],
    exchange: [
      'Official AASOTU Ambassador status',
      'Visibility across our platforms',
      'Exclusive content and updates',
      'First access to events and launches',
    ],
    timeCommitment: '2-5 hours/week',
  },
  {
    id: 'writing-contributor',
    title: 'Writing Contributor',
    tagline: 'Lend Your Voice to the Movement',
    icon: PenTool,
    description: 'Contribute articles, op-eds, and commentary pieces. Write about Indigenous heritage, civil rights, community issues, and topics aligned with our mission.',
    responsibilities: [
      'Submit 1-2 articles per month',
      'Write on assigned or proposed topics',
      'Follow editorial guidelines',
      'Incorporate feedback from editorial review',
    ],
    requirements: [
      'Strong writing skills',
      'Passion for storytelling and advocacy',
      'Ability to meet deadlines',
      'Writing samples to share',
    ],
    exchange: [
      'Published byline on TheKingsTake.com',
      'Portfolio building with published work',
      'Editorial mentorship and feedback',
      'First consideration for paid writing roles',
    ],
    timeCommitment: '3-8 hours/week',
  },
  {
    id: 'audio-producer',
    title: 'Audio & Podcast Producer',
    tagline: 'Give the Movement a Sound',
    icon: Mic,
    description: 'Help launch and produce the AASOTU podcast. Edit audio, book guests, write show notes, and build our audio presence.',
    responsibilities: [
      'Edit podcast episodes',
      'Book and coordinate guest interviews',
      'Write show notes and descriptions',
      'Distribute episodes to podcast platforms',
    ],
    requirements: [
      'Audio editing skills (Audacity, GarageBand, etc.)',
      'Interest in podcast production',
      'Good organizational skills',
      'Access to audio editing software',
    ],
    exchange: [
      'Co-producer credit on all episodes',
      'Access to high-profile guests and network',
      'Audio production portfolio building',
      'First consideration for paid producer role',
    ],
    timeCommitment: '5-10 hours/week',
  },
]

export default function WorkWithUsPage() {
  const [expandedRole, setExpandedRole] = useState<string | null>(null)
  const [application, setApplication] = useState({
    name: '',
    email: '',
    role: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!application.name || !application.email || !application.role) return
    setSending(true)
    await new Promise(r => setTimeout(r, 800))
    setSubmitted(true)
    setSending(false)
  }

  return (
    <div className="min-h-screen bg-[#05080e]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0A0F1A]/95 backdrop-blur-md border-b border-[rgba(255,149,0,0.1)]">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xs text-[#C9B99A] hover:text-[#FF9500] transition-colors">
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#FF9500]/40">#TheKingsTake</span>
            <span className="text-[#C9B99A]/20">|</span>
            <span className="text-[9px] uppercase tracking-wider text-[#C9B99A]/30">Work With Us</span>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Hero */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[rgba(255,149,0,0.1)] border border-[rgba(255,149,0,0.2)] rounded-full px-4 py-1.5 mb-6">
              <Users size={12} className="text-[#FF9500]" />
              <span className="text-[10px] uppercase tracking-[0.15em] text-[#FF9500] font-medium">Join the AASOTU Universe</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl text-[#F0EBE1] font-medium leading-[1.1] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Help Us Build<br />Something Historic
            </h1>
            <p className="text-base text-[#C9B99A]/70 max-w-2xl mx-auto">
              I'm not hiring yet — but I am building a universe of truth-tellers, researchers, creators, and advocates. 
              Join as a volunteer contributor and grow with us. The exchange: visibility, credit, experience, 
              and first consideration when paid roles open.
            </p>
          </div>
        </ScrollReveal>

        {/* Roles Grid */}
        <div className="space-y-4 mb-16">
          {ROLES.map((role, i) => {
            const Icon = role.icon
            const isExpanded = expandedRole === role.id
            return (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <button
                  onClick={() => setExpandedRole(isExpanded ? null : role.id)}
                  className="w-full flex items-center justify-between p-5 md:p-6 bg-[rgba(27,40,56,0.85)] backdrop-blur-lg rounded-xl border border-[rgba(255,149,0,0.2)] hover:border-[rgba(255,149,0,0.4)] transition-all duration-300 group text-left"
                  style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-[rgba(255,149,0,0.1)] border border-[rgba(255,149,0,0.15)]">
                      <Icon size={24} className="text-[#FF9500]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-base md:text-lg text-[#F0EBE1] font-medium group-hover:text-[#FF9500] transition-colors">{role.title}</h3>
                      <p className="text-xs text-[#C9B99A]/60 mt-0.5">{role.tagline}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-[#C9B99A]/40 bg-[rgba(21,32,43,0.6)] rounded-full px-3 py-1">
                      <Clock size={10} /> {role.timeCommitment}
                    </span>
                    {isExpanded ? (
                      <span className="text-xs text-[#FF9500]">Close</span>
                    ) : (
                      <span className="text-xs text-[#FF9500]">Details</span>
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="mt-3 p-5 md:p-6 bg-[rgba(27,40,56,0.6)] rounded-xl border border-[rgba(255,149,0,0.15)]"
                  >
                    <p className="text-sm text-[#C9B99A] leading-relaxed mb-5">{role.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-[#FF9500] mb-2">Responsibilities</p>
                        <ul className="space-y-1.5">
                          {role.responsibilities.map((r, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-[#C9B99A]/80">
                              <Star size={12} className="text-[#FF9500] shrink-0 mt-0.5" /> {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-[#FF9500] mb-2">Requirements</p>
                        <ul className="space-y-1.5">
                          {role.requirements.map((r, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-[#C9B99A]/80">
                              <Star size={12} className="text-[#FF9500] shrink-0 mt-0.5" /> {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-[#FF9500] mb-2">What You Get</p>
                        <ul className="space-y-1.5">
                          {role.exchange.map((r, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-[#C9B99A]/80">
                              <Sparkles size={12} className="text-[#FF9500] shrink-0 mt-0.5" /> {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-[rgba(255,149,0,0.08)] flex items-center justify-between">
                      <span className="text-[11px] text-[#C9B99A]/50">
                        <Clock size={12} className="inline mr-1" /> Time: {role.timeCommitment}
                      </span>
                      <button
                        onClick={() => {
                          setApplication({ ...application, role: role.title })
                          document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' })
                        }}
                        className="inline-flex items-center gap-2 text-sm bg-[#FF9500] text-[#0C1520] px-5 py-2 rounded-lg hover:bg-[#CC6A00] transition-colors font-medium"
                      >
                        Apply for This Role
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Application Form */}
        <ScrollReveal delay={0.1}>
          <div id="apply-form" className="bg-gradient-to-br from-[rgba(27,40,56,0.8)] to-[rgba(27,40,56,0.4)] border border-[rgba(255,149,0,0.2)] rounded-xl p-6 md:p-8 mb-16">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-[rgba(255,149,0,0.1)] border border-[rgba(255,149,0,0.2)] rounded-full px-4 py-1.5 mb-4">
                <Send size={12} className="text-[#FF9500]" />
                <span className="text-[10px] uppercase tracking-[0.15em] text-[#FF9500] font-medium">Apply Now</span>
              </div>
              <h2 className="text-2xl text-[#F0EBE1] font-medium" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Submit Your Application
              </h2>
              <p className="text-sm text-[#C9B99A]/60 mt-1 max-w-lg mx-auto">
                Fill out the form below and I'll review your application. I'll reach out via email to discuss next steps.
              </p>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <CheckCircle size={48} className="text-[#FF9500] mx-auto mb-4" />
                <h3 className="text-xl text-[#F0EBE1] font-medium mb-2">Application Submitted!</h3>
                <p className="text-sm text-[#C9B99A]/60 max-w-sm mx-auto">
                  Thank you for your interest in joining the AASOTU universe. I'll review your application and get back to you within 48 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleApply} className="max-w-2xl mx-auto space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#C9B99A]/50 mb-1.5 block">Your Name *</label>
                    <input
                      type="text"
                      value={application.name}
                      onChange={(e) => setApplication({ ...application, name: e.target.value })}
                      required
                      placeholder="Your full name"
                      className="w-full bg-[rgba(21,32,43,0.6)] border border-[rgba(255,149,0,0.15)] rounded-lg px-4 py-2.5 text-sm text-[#F0EBE1] placeholder:text-[#C9B99A]/25 focus:outline-none focus:border-[rgba(255,149,0,0.4)] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#C9B99A]/50 mb-1.5 block">Email Address *</label>
                    <input
                      type="email"
                      value={application.email}
                      onChange={(e) => setApplication({ ...application, email: e.target.value })}
                      required
                      placeholder="you@example.com"
                      className="w-full bg-[rgba(21,32,43,0.6)] border border-[rgba(255,149,0,0.15)] rounded-lg px-4 py-2.5 text-sm text-[#F0EBE1] placeholder:text-[#C9B99A]/25 focus:outline-none focus:border-[rgba(255,149,0,0.4)] transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#C9B99A]/50 mb-1.5 block">Role You're Applying For *</label>
                  <select
                    value={application.role}
                    onChange={(e) => setApplication({ ...application, role: e.target.value })}
                    required
                    className="w-full bg-[rgba(21,32,43,0.6)] border border-[rgba(255,149,0,0.15)] rounded-lg px-4 py-2.5 text-sm text-[#F0EBE1] focus:outline-none focus:border-[rgba(255,149,0,0.4)] transition-colors"
                  >
                    <option value="">Select a role...</option>
                    {ROLES.map((r) => (
                      <option key={r.id} value={r.title}>{r.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#C9B99A]/50 mb-1.5 block">Why Do You Want to Join? *</label>
                  <textarea
                    value={application.message}
                    onChange={(e) => setApplication({ ...application, message: e.target.value })}
                    required
                    rows={4}
                    placeholder="Tell me about yourself, why you're interested, and what you bring to the table..."
                    className="w-full bg-[rgba(21,32,43,0.6)] border border-[rgba(255,149,0,0.15)] rounded-lg px-4 py-2.5 text-sm text-[#F0EBE1] placeholder:text-[#C9B99A]/25 focus:outline-none focus:border-[rgba(255,149,0,0.4)] transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending || !application.name || !application.email || !application.role}
                  className="w-full flex items-center justify-center gap-2 rounded-full h-12 bg-[#FF9500] text-[#1B2838] hover:bg-[#CC6A00] transition-colors font-medium disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{ boxShadow: '0 4px 16px rgba(255,149,0,0.25)' }}
                >
                  <Send size={16} />
                  {sending ? 'Submitting...' : 'Submit Application'}
                </button>
              </form>
            )}
          </div>
        </ScrollReveal>

        {/* Contact CTA */}
        <ScrollReveal delay={0.1}>
          <div className="text-center py-8 border-t border-[rgba(255,149,0,0.08)]">
            <p className="text-sm text-[#C9B99A]/60 mb-4">
              Have questions about a role? Want to propose something not listed here?
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="mailto:aasotumediagroup@gmail.com?subject=Work With AASOTU - Question"
                className="inline-flex items-center gap-2 rounded-full h-12 px-6 bg-[rgba(255,149,0,0.1)] border border-[rgba(255,149,0,0.3)] text-[#FF9500] hover:bg-[rgba(255,149,0,0.2)] transition-colors"
              >
                <Mail size={16} /> Email Me Directly
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full h-12 px-6 border border-[rgba(255,149,0,0.4)] text-[#FF9500] hover:bg-[rgba(255,149,0,0.08)] transition-colors"
              >
                Go to Contact Page
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}
