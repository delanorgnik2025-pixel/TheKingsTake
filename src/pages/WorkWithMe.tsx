import { useState } from 'react'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { ArrowLeft, Send, CheckCircle, Users, BookOpen, MessageSquare, Heart, Share2, Megaphone } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'

interface FormData {
  name: string
  email: string
  city: string
  state: string
  message: string
}

interface StoryFormData {
  name: string
  email: string
  phone: string
  title: string
  description: string
  serviceType: string
}

const SERVICE_OPTIONS = [
  'magazine-style story',
  'photo-supported feature',
  'light script/dialogue story',
  'full manuscript',
  '1-on-1 consultation'
]

export default function WorkWithMe() {
  const [joinForm, setJoinForm] = useState<FormData>({ name: '', email: '', city: '', state: '', message: '' })
  const [storyForm, setStoryForm] = useState<StoryFormData>({ name: '', email: '', phone: '', title: '', description: '', serviceType: '' })
  const [joinSuccess, setJoinSuccess] = useState(false)
  const [storySuccess, setStorySuccess] = useState(false)

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setJoinSuccess(true)
    setTimeout(() => {
      setJoinSuccess(false)
      setJoinForm({ name: '', email: '', city: '', state: '', message: '' })
    }, 4000)
  }

  const handleStorySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStorySuccess(true)
    setTimeout(() => {
      setStorySuccess(false)
      setStoryForm({ name: '', email: '', phone: '', title: '', description: '', serviceType: '' })
    }, 4000)
  }

  return (
    <div className="min-h-screen bg-[#0C1520]">
      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-[0.25]"
        style={{ backgroundImage: 'url(/images/bg-hero.jpg)' }}
      />
      <div className="fixed inset-0 bg-gradient-to-b from-[#0C1520]/95 via-[#0C1520]/90 to-[#0C1520]/95" />

      <div className="relative z-10">
        {/* Header */}
        <div className="border-b border-white/[0.06]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-6 flex items-center gap-4">
            <Link to="/" className="text-[#C9B99A] hover:text-[#FF9500] transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <span className="text-xs tracking-[0.2em] text-[#FF9500] uppercase">#TheKingsTake</span>
          </div>
        </div>

        {/* HERO */}
        <section className="relative py-20 px-6 lg:px-12">
          <div className="max-w-[800px] mx-auto text-center">
            <ScrollReveal>
              <div className="mono text-[10px] tracking-[0.3em] text-[#FF9500] uppercase mb-4">
                Join the Movement
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="text-4xl lg:text-5xl font-medium tracking-tight leading-[1.1] mb-6" style={{ fontFamily: 'Newsreader, serif' }}>
                <span className="text-[#F0EBE1]">Every Share.</span>
                <br />
                <span className="text-[#FF9500]">Every Voice.</span>
                <br />
                <span className="text-[#F0EBE1]">Every Movement.</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-[#C9B99A]/80 text-lg leading-relaxed max-w-[640px] mx-auto" style={{ fontFamily: 'Newsreader, serif' }}>
                #TheKingsTake is not just a platform — it is a movement. When you share our stories, 
                comment on our posts, save our content, and repost our message, you are building something 
                bigger than any one person. You are building a community that cannot be ignored.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* MOVEMENT STATS */}
        <section className="py-12 px-6 lg:px-12 border-y border-white/[0.06]">
          <div className="max-w-[1000px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Share2, label: 'Shares', value: 'Building' },
              { icon: Heart, label: 'Saves', value: 'Growing' },
              { icon: MessageSquare, label: 'Comments', value: 'Moving' },
              { icon: Users, label: 'Community', value: 'Rising' },
            ].map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.1}>
                <div className="text-center">
                  <stat.icon className="w-6 h-6 text-[#FF9500] mx-auto mb-3" />
                  <div className="text-2xl font-medium text-[#F0EBE1] mb-1" style={{ fontFamily: 'Newsreader, serif' }}>{stat.value}</div>
                  <div className="text-xs tracking-[0.15em] text-[#C9B99A]/60 uppercase">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* HOW TO HELP */}
        <section className="py-20 px-6 lg:px-12">
          <div className="max-w-[800px] mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl font-medium text-[#F0EBE1] mb-12 text-center" style={{ fontFamily: 'Newsreader, serif' }}>
                How You Can Help Build <span className="text-[#FF9500]">#TheKingsTake</span>
              </h2>
            </ScrollReveal>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Share2, title: 'Share', desc: 'Share our articles, book updates, and legal resources on your social media. Every share reaches someone who needs this information.' },
                { icon: MessageSquare, title: 'Engage', desc: 'Comment on blog posts. Ask questions. Start conversations. Your engagement tells platforms this content matters.' },
                { icon: Megaphone, title: 'Amplify', desc: 'Repost, retweet, reshare. Tag people who need to see this. Use #TheKingsTake so we can find and amplify your voice too.' },
              ].map((item, i) => (
                <ScrollReveal key={item.title} delay={i * 0.15}>
                  <div className="bg-white/[0.03] border border-white/[0.08] p-6">
                    <div className="w-10 h-10 border border-[#FF9500]/30 flex items-center justify-center mb-4">
                      <item.icon size={20} className="text-[#FF9500]" />
                    </div>
                    <h3 className="text-lg font-medium text-[#F0EBE1] mb-3" style={{ fontFamily: 'Newsreader, serif' }}>{item.title}</h3>
                    <p className="text-sm text-[#C9B99A]/70 leading-relaxed">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* JOIN THE MOVEMENT FORM */}
        <section className="py-20 px-6 lg:px-12 border-t border-white/[0.06]">
          <div className="max-w-[640px] mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12">
                <Users className="w-8 h-8 text-[#FF9500] mx-auto mb-4" />
                <h2 className="text-3xl font-medium text-[#F0EBE1] mb-4" style={{ fontFamily: 'Newsreader, serif' }}>
                  Join the Movement
                </h2>
                <p className="text-[#C9B99A]/70">
                  Add your name to the growing list of people committed to legal education, 
                  community justice, and the empowerment of our people.
                </p>
              </div>
            </ScrollReveal>

            {joinSuccess ? (
              <ScrollReveal>
                <div className="bg-[#FF9500]/10 border border-[#FF9500]/30 p-8 text-center">
                  <CheckCircle className="w-12 h-12 text-[#FF9500] mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-[#F0EBE1] mb-2" style={{ fontFamily: 'Newsreader, serif' }}>Welcome to the Movement</h3>
                  <p className="text-[#C9B99A]/70">Your voice matters. Your support matters. Together, we build what cannot be destroyed.</p>
                </div>
              </ScrollReveal>
            ) : (
              <ScrollReveal>
                <form onSubmit={handleJoinSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs tracking-[0.15em] text-[#C9B99A]/60 uppercase mb-2">Name</label>
                      <input
                        type="text" required value={joinForm.name}
                        onChange={e => setJoinForm({ ...joinForm, name: e.target.value })}
                        className="w-full h-12 bg-white/[0.03] border border-white/[0.08] text-[#F0EBE1] px-4 text-sm focus:border-[#FF9500]/50 focus:outline-none transition-colors"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs tracking-[0.15em] text-[#C9B99A]/60 uppercase mb-2">Email</label>
                      <input
                        type="email" required value={joinForm.email}
                        onChange={e => setJoinForm({ ...joinForm, email: e.target.value })}
                        className="w-full h-12 bg-white/[0.03] border border-white/[0.08] text-[#F0EBE1] px-4 text-sm focus:border-[#FF9500]/50 focus:outline-none transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs tracking-[0.15em] text-[#C9B99A]/60 uppercase mb-2">City</label>
                      <input
                        type="text" value={joinForm.city}
                        onChange={e => setJoinForm({ ...joinForm, city: e.target.value })}
                        className="w-full h-12 bg-white/[0.03] border border-white/[0.08] text-[#F0EBE1] px-4 text-sm focus:border-[#FF9500]/50 focus:outline-none transition-colors"
                        placeholder="Your city"
                      />
                    </div>
                    <div>
                      <label className="block text-xs tracking-[0.15em] text-[#C9B99A]/60 uppercase mb-2">State</label>
                      <input
                        type="text" value={joinForm.state}
                        onChange={e => setJoinForm({ ...joinForm, state: e.target.value })}
                        className="w-full h-12 bg-white/[0.03] border border-white/[0.08] text-[#F0EBE1] px-4 text-sm focus:border-[#FF9500]/50 focus:outline-none transition-colors"
                        placeholder="Your state"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs tracking-[0.15em] text-[#C9B99A]/60 uppercase mb-2">Message of Support</label>
                    <textarea
                      rows={4} value={joinForm.message}
                      onChange={e => setJoinForm({ ...joinForm, message: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/[0.08] text-[#F0EBE1] px-4 py-3 text-sm focus:border-[#FF9500]/50 focus:outline-none transition-colors resize-none"
                      placeholder="Why are you joining the movement? What does justice mean to you?"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full h-12 bg-[#FF9500] text-[#0C1520] font-medium text-sm tracking-[0.05em] uppercase hover:bg-[#FF9500]/90 transition-colors flex items-center justify-center gap-2"
                  >
                    <Send size={16} />
                    Join the Movement
                  </button>
                </form>
              </ScrollReveal>
            )}
          </div>
        </section>

        {/* SUBMIT YOUR STORY FORM */}
        <section className="py-20 px-6 lg:px-12 border-t border-white/[0.06]">
          <div className="max-w-[640px] mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12">
                <BookOpen className="w-8 h-8 text-[#FF9500] mx-auto mb-4" />
                <h2 className="text-3xl font-medium text-[#F0EBE1] mb-4" style={{ fontFamily: 'Newsreader, serif' }}>
                  Submit Your Story
                </h2>
                <p className="text-[#C9B99A]/70">
                  Have a story that needs to be told? A perspective the world needs to hear? 
                  We want to help you tell it. Submit your story idea and we will be in touch.
                </p>
              </div>
            </ScrollReveal>

            {storySuccess ? (
              <ScrollReveal>
                <div className="bg-[#FF9500]/10 border border-[#FF9500]/30 p-8 text-center">
                  <CheckCircle className="w-12 h-12 text-[#FF9500] mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-[#F0EBE1] mb-2" style={{ fontFamily: 'Newsreader, serif' }}>Story Received</h3>
                  <p className="text-[#C9B99A]/70">Thank you for trusting us with your story. Someone from our team will contact you within 48 hours.</p>
                </div>
              </ScrollReveal>
            ) : (
              <ScrollReveal>
                <form onSubmit={handleStorySubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs tracking-[0.15em] text-[#C9B99A]/60 uppercase mb-2">Name *</label>
                      <input
                        type="text" required value={storyForm.name}
                        onChange={e => setStoryForm({ ...storyForm, name: e.target.value })}
                        className="w-full h-12 bg-white/[0.03] border border-white/[0.08] text-[#F0EBE1] px-4 text-sm focus:border-[#FF9500]/50 focus:outline-none transition-colors"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs tracking-[0.15em] text-[#C9B99A]/60 uppercase mb-2">Email *</label>
                      <input
                        type="email" required value={storyForm.email}
                        onChange={e => setStoryForm({ ...storyForm, email: e.target.value })}
                        className="w-full h-12 bg-white/[0.03] border border-white/[0.08] text-[#F0EBE1] px-4 text-sm focus:border-[#FF9500]/50 focus:outline-none transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs tracking-[0.15em] text-[#C9B99A]/60 uppercase mb-2">Phone (Optional)</label>
                    <input
                      type="tel" value={storyForm.phone}
                      onChange={e => setStoryForm({ ...storyForm, phone: e.target.value })}
                      className="w-full h-12 bg-white/[0.03] border border-white/[0.08] text-[#F0EBE1] px-4 text-sm focus:border-[#FF9500]/50 focus:outline-none transition-colors"
                      placeholder="(555) 555-5555"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-[0.15em] text-[#C9B99A]/60 uppercase mb-2">Story Title / Idea *</label>
                    <input
                      type="text" required value={storyForm.title}
                      onChange={e => setStoryForm({ ...storyForm, title: e.target.value })}
                      className="w-full h-12 bg-white/[0.03] border border-white/[0.08] text-[#F0EBE1] px-4 text-sm focus:border-[#FF9500]/50 focus:outline-none transition-colors"
                      placeholder="What is your story about?"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-[0.15em] text-[#C9B99A]/60 uppercase mb-2">Short Description *</label>
                    <textarea
                      rows={4} required value={storyForm.description}
                      onChange={e => setStoryForm({ ...storyForm, description: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/[0.08] text-[#F0EBE1] px-4 py-3 text-sm focus:border-[#FF9500]/50 focus:outline-none transition-colors resize-none"
                      placeholder="Tell us about your story in a few sentences..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-[0.15em] text-[#C9B99A]/60 uppercase mb-2">Service Interest *</label>
                    <select
                      required value={storyForm.serviceType}
                      onChange={e => setStoryForm({ ...storyForm, serviceType: e.target.value })}
                      className="w-full h-12 bg-white/[0.03] border border-white/[0.08] text-[#F0EBE1] px-4 text-sm focus:border-[#FF9500]/50 focus:outline-none transition-colors appearance-none"
                    >
                      <option value="" className="bg-[#0C1520]">Select a service type...</option>
                      {SERVICE_OPTIONS.map(opt => (
                        <option key={opt} value={opt} className="bg-[#0C1520]">{opt}</option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full h-12 bg-[#FF9500] text-[#0C1520] font-medium text-sm tracking-[0.05em] uppercase hover:bg-[#FF9500]/90 transition-colors flex items-center justify-center gap-2"
                  >
                    <Send size={16} />
                    Submit Your Story
                  </button>
                </form>
              </ScrollReveal>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 lg:px-12 border-t border-white/[0.06]">
          <div className="max-w-[640px] mx-auto text-center">
            <ScrollReveal>
              <h2 className="text-2xl font-medium text-[#F0EBE1] mb-6" style={{ fontFamily: 'Newsreader, serif' }}>
                Ready to go deeper?
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center gap-2 h-12 px-8 border border-[#FF9500] text-[#FF9500] text-sm tracking-[0.05em] uppercase hover:bg-[#FF9500]/10 transition-colors"
                >
                  <ArrowLeft size={16} />
                  Back to Home
                </Link>
                <Link
                  to="/blog"
                  className="inline-flex items-center justify-center gap-2 h-12 px-8 bg-[#FF9500] text-[#0C1520] text-sm tracking-[0.05em] uppercase hover:bg-[#FF9500]/90 transition-colors"
                >
                  Read the Blog
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </div>
  )
}
