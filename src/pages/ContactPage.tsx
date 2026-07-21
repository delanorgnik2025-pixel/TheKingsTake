import { useState } from 'react'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import {
  ArrowLeft, Mail, MessageSquare, Facebook, Instagram,
  Send, CheckCircle, Sparkles, Users, Clock, Star,
  PenTool, BookOpen, Mic, Globe, Feather, AlertTriangle
} from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'

// ============================================
// CONTACT PAGE — Form + Info + Consultation + Work With Me
// ============================================

const CONSULTATION_FEATURES = [
  { icon: <PenTool size={16} />, title: 'Speechwriting & Narrative', desc: 'From $150 — Speeches that move crowds' },
  { icon: <BookOpen size={16} />, title: 'Book & Publishing Support', desc: 'From $499 — Manuscript to published author' },
  { icon: <Mic size={16} />, title: 'Legacy Interview', desc: 'From $500 — Your story preserved forever' },
  { icon: <Feather size={16} />, title: 'Ghostwriting', desc: 'From $1,500 — Your voice, my craft' },
  { icon: <Globe size={16} />, title: 'Website & Digital Presence', desc: 'From $300 — High-converting digital platforms' },
  { icon: <Star size={16} />, title: 'Creative Consulting', desc: '$100/hour — 1-on-1 strategy sessions' },
]

const VOLUNTEER_ROLES = [
  {
    title: 'Post Commander',
    desc: 'Source stories, news, and leads from your region. Be our eyes and ears on the ground.',
    exchange: 'Featured credit + platform visibility',
  },
  {
    title: 'In-House Video Editor',
    desc: 'Find and distribute content across platforms. Help us grow our multimedia presence.',
    exchange: 'Portfolio building + co-branded content',
  },
  {
    title: 'Community Researcher',
    desc: 'Dig into records, verify facts, and expand our heritage database.',
    exchange: 'Research credit + early access to tools',
  },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setSending(true)
    // Simulate send — form data will be handled via mailto or future backend
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
            <span className="text-[9px] uppercase tracking-wider text-[#C9B99A]/30">Contact</span>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Hero */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[rgba(255,149,0,0.1)] border border-[rgba(255,149,0,0.2)] rounded-full px-4 py-1.5 mb-6">
              <MessageSquare size={12} className="text-[#FF9500]" />
              <span className="text-[10px] uppercase tracking-[0.15em] text-[#FF9500] font-medium">Get In Touch</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl text-[#F0EBE1] font-medium leading-[1.1] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Let's Build Something<br />Powerful Together
            </h1>
            <p className="text-base text-[#C9B99A]/70 max-w-xl mx-auto">
              Whether you need writing services, want to collaborate, or just want to connect — I'm here. Every great movement starts with a conversation.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <ScrollReveal delay={0.1}>
              <div className="bg-[rgba(27,40,56,0.6)] border border-[rgba(255,149,0,0.15)] rounded-xl p-6 md:p-8">
                <h2 className="text-lg text-[#F0EBE1] font-medium mb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  Send a Message
                </h2>
                <p className="text-xs text-[#C9B99A]/50 mb-6">
                  Fill out the form below and I'll get back to you within 24-48 hours.
                </p>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <CheckCircle size={48} className="text-[#FF9500] mx-auto mb-4" />
                    <h3 className="text-xl text-[#F0EBE1] font-medium mb-2">Message Sent!</h3>
                    <p className="text-sm text-[#C9B99A]/60 max-w-sm mx-auto">
                      Thank you for reaching out. I'll review your message and respond within 24-48 hours.
                    </p>
                    <p className="text-xs text-[#C9B99A]/40 mt-4">
                      For faster response, message me directly on Facebook.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-[#C9B99A]/50 mb-1.5 block">Your Name *</label>
                        <input
                          type="text"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          required
                          placeholder="Your full name"
                          className="w-full bg-[rgba(21,32,43,0.6)] border border-[rgba(255,149,0,0.15)] rounded-lg px-4 py-2.5 text-sm text-[#F0EBE1] placeholder:text-[#C9B99A]/25 focus:outline-none focus:border-[rgba(255,149,0,0.4)] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-[#C9B99A]/50 mb-1.5 block">Email Address *</label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          required
                          placeholder="you@example.com"
                          className="w-full bg-[rgba(21,32,43,0.6)] border border-[rgba(255,149,0,0.15)] rounded-lg px-4 py-2.5 text-sm text-[#F0EBE1] placeholder:text-[#C9B99A]/25 focus:outline-none focus:border-[rgba(255,149,0,0.4)] transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-[#C9B99A]/50 mb-1.5 block">Subject</label>
                      <select
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full bg-[rgba(21,32,43,0.6)] border border-[rgba(255,149,0,0.15)] rounded-lg px-4 py-2.5 text-sm text-[#F0EBE1] focus:outline-none focus:border-[rgba(255,149,0,0.4)] transition-colors"
                      >
                        <option value="">Select a subject...</option>
                        <option value="writing-services">Writing Services</option>
                        <option value="consultation">Consultation Request</option>
                        <option value="book">Book Inquiry</option>
                        <option value="collaboration">Collaboration</option>
                        <option value="media">Media & Press</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-[#C9B99A]/50 mb-1.5 block">Your Message *</label>
                      <textarea
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        required
                        rows={5}
                        placeholder="Tell me about your project, needs, or how you'd like to collaborate..."
                        className="w-full bg-[rgba(21,32,43,0.6)] border border-[rgba(255,149,0,0.15)] rounded-lg px-4 py-2.5 text-sm text-[#F0EBE1] placeholder:text-[#C9B99A]/25 focus:outline-none focus:border-[rgba(255,149,0,0.4)] transition-colors resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={sending || !form.name || !form.email || !form.message}
                      className="w-full flex items-center justify-center gap-2 rounded-full h-12 bg-[#FF9500] text-[#1B2838] hover:bg-[#CC6A00] transition-colors font-medium disabled:opacity-30 disabled:cursor-not-allowed"
                      style={{ boxShadow: '0 4px 16px rgba(255,149,0,0.25)' }}
                    >
                      <Send size={16} />
                      {sending ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>

          {/* Contact Info Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            <ScrollReveal delay={0.2}>
              <div className="bg-[rgba(27,40,56,0.6)] border border-[rgba(255,149,0,0.15)] rounded-xl p-6">
                <div className="flex gap-1 mb-3">
                  {[0, 1, 2].map(i => <div key={i} className="w-[3px] h-[3px] rounded-full bg-[#FFB840]" />)}
                </div>
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#FFB840] mb-4">Contact Info</p>

                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#C9B99A]/50 mb-1">Email</p>
                    <a href="mailto:aasotumediagroup@gmail.com" className="text-sm text-[#F0EBE1] hover:text-[#FF9500] transition-colors">
                      aasotumediagroup@gmail.com
                    </a>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#C9B99A]/50 mb-1">Company</p>
                    <p className="text-sm text-[#F0EBE1]">AASOTU Media Group LLC</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#C9B99A]/50 mb-1">Response Time</p>
                    <p className="text-sm text-[#C9B99A]/70">Within 24-48 hours</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Social Links */}
            <ScrollReveal delay={0.3}>
              <div className="bg-[rgba(27,40,56,0.6)] border border-[rgba(255,149,0,0.15)] rounded-xl p-6">
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#FFB840] mb-4">Follow the Movement</p>
                <div className="space-y-3">
                  <a
                    href="https://www.facebook.com/thekingstake"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[rgba(255,149,0,0.1)] border border-[rgba(255,149,0,0.15)] flex items-center justify-center">
                      <Facebook size={18} className="text-[#FF9500]" />
                    </div>
                    <div>
                      <p className="text-sm text-[#F0EBE1] group-hover:text-[#FF9500] transition-colors">Facebook</p>
                      <p className="text-[10px] text-[#C9B99A]/50">12,000+ Followers</p>
                    </div>
                  </a>
                  <a
                    href="https://www.instagram.com/thekingstake/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[rgba(255,149,0,0.1)] border border-[rgba(255,149,0,0.15)] flex items-center justify-center">
                      <Instagram size={18} className="text-[#FF9500]" />
                    </div>
                    <div>
                      <p className="text-sm text-[#F0EBE1] group-hover:text-[#FF9500] transition-colors">Instagram</p>
                      <p className="text-[10px] text-[#C9B99A]/50">Follow Now</p>
                    </div>
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Consultation Upsell */}
        <ScrollReveal delay={0.1}>
          <div className="bg-gradient-to-br from-[rgba(27,40,56,0.8)] to-[rgba(27,40,56,0.4)] border border-[rgba(255,149,0,0.2)] rounded-xl p-6 md:p-8 mb-16">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <div className="inline-flex items-center gap-2 bg-[rgba(255,149,0,0.1)] border border-[rgba(255,149,0,0.2)] rounded-full px-3 py-1 mb-3">
                  <Clock size={10} className="text-[#FF9500]" />
                  <span className="text-[9px] uppercase tracking-[0.15em] text-[#FF9500]">Book a Consultation</span>
                </div>
                <h2 className="text-xl md:text-2xl text-[#F0EBE1] font-medium" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  1-on-1 Creative Strategy Session
                </h2>
                <p className="text-sm text-[#C9B99A]/60 mt-1 max-w-xl">
                  Not legal advice — creative strategy. Story development, platform building, content planning, and advocacy organization. For people building something that matters.
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-3xl text-[#FF9500] font-medium">$100<span className="text-sm text-[#C9B99A]/50">/hr</span></span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
              {CONSULTATION_FEATURES.map((f, i) => (
                <div key={i} className="flex items-start gap-3 bg-[rgba(21,32,43,0.5)] rounded-lg p-3">
                  <div className="text-[#FF9500] shrink-0 mt-0.5">{f.icon}</div>
                  <div>
                    <p className="text-sm text-[#F0EBE1] font-medium">{f.title}</p>
                    <p className="text-[11px] text-[#C9B99A]/50">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => alert('Consultation booking coming soon! To request a consultation now, email aasotumediagroup@gmail.com or message us on Facebook.')}
                className="inline-flex items-center justify-center gap-2 rounded-full h-12 px-8 bg-[#FF9500] text-[#1B2838] hover:bg-[#CC6A00] transition-colors font-medium cursor-pointer"
                style={{ boxShadow: '0 4px 16px rgba(255,149,0,0.25)' }}
              >
                <Sparkles size={16} /> Book a Consultation
              </button>
              <Link
                to="/writing-services"
                className="inline-flex items-center justify-center gap-2 rounded-full h-12 px-8 border border-[rgba(255,149,0,0.4)] text-[#FF9500] hover:bg-[rgba(255,149,0,0.08)] transition-colors"
              >
                View Writing Services
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {/* Work With Me / Volunteer Section */}
        <ScrollReveal delay={0.1}>
          <div className="mb-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-[rgba(255,149,0,0.1)] border border-[rgba(255,149,0,0.2)] rounded-full px-4 py-1.5 mb-4">
                <Users size={12} className="text-[#FF9500]" />
                <span className="text-[10px] uppercase tracking-[0.15em] text-[#FF9500] font-medium">Join the Movement</span>
              </div>
              <h2 className="text-2xl md:text-3xl text-[#F0EBE1] font-medium mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Work With Me
              </h2>
              <p className="text-sm text-[#C9B99A]/60 max-w-xl mx-auto">
                I'm not hiring yet — but I am building a universe. Join as a volunteer contributor and grow with us. Exchange: visibility, credit, and a front-row seat to something historic.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {VOLUNTEER_ROLES.map((role, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[rgba(27,40,56,0.6)] border border-[rgba(255,149,0,0.15)] rounded-xl p-5 hover:border-[rgba(255,149,0,0.3)] transition-all"
                >
                  <h3 className="text-base text-[#F0EBE1] font-medium mb-2">{role.title}</h3>
                  <p className="text-sm text-[#C9B99A]/70 mb-3">{role.desc}</p>
                  <p className="text-[11px] text-[#FF9500]/70">
                    <span className="text-[#C9B99A]/40">Exchange: </span>{role.exchange}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <Link
                to="/work-with-us"
                className="inline-flex items-center justify-center gap-2 rounded-full h-12 px-8 border border-[rgba(255,149,0,0.4)] text-[#FF9500] hover:bg-[rgba(255,149,0,0.08)] transition-colors"
              >
                <Users size={16} /> View All Opportunities
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {/* Note */}
        <ScrollReveal delay={0.1}>
          <div className="text-center py-8 border-t border-[rgba(255,149,0,0.08)]">
            <p className="text-[11px] text-[#C9B99A]/40">
              For urgent matters, message me directly on{' '}
              <a href="https://www.facebook.com/thekingstake" target="_blank" rel="noopener noreferrer" className="text-[#FF9500]/60 hover:text-[#FF9500] transition-colors">
                Facebook
              </a>
              . I check messages daily.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}
