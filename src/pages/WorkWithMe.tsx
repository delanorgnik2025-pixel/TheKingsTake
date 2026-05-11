import { useState } from 'react'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { ArrowLeft, Send, CheckCircle, Users, BookOpen, MessageSquare, Heart, Share2, Megaphone, ScrollText, Gavel, AlertTriangle } from 'lucide-react'
import { trpc } from '@/providers/trpc'
import ScrollReveal from '../components/ScrollReveal'

const SERVICE_OPTIONS = [
  'magazine-style story',
  'photo-supported feature',
  'light script/dialogue story',
  'full manuscript',
  '1-on-1 consultation'
]

// Marquee Ticker Component
function PetitionTicker() {
  const { data: signers } = trpc.petition.list.useQuery()
  const names = signers && signers.length > 0
    ? signers.map(s => s.name)
    : ['Ronald L. King', 'Maya J. Washington', 'Darnell K. Mitchell', 'Shanice R. Thompson', 'Marcus A. Cole', 'Keisha N. Brown', 'Jamal T. Harris', 'Latoya M. Davis', 'Andre P. Johnson', 'Tiffany S. Williams']

  const tickerText = names.join(' \u2022 ') + ' \u2022 '

  return (
    <div className="w-full bg-[#FF9500]/10 border-y border-[#FF9500]/30 py-3 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
        <span className="text-sm text-[#FF9500] tracking-[0.1em] uppercase font-medium px-4">
          {tickerText}{tickerText}
        </span>
      </div>
    </div>
  )
}

export default function WorkWithMe() {
  const [joinForm, setJoinForm] = useState({ name: '', email: '', city: '', state: '', message: '' })
  const [storyForm, setStoryForm] = useState({ name: '', email: '', phone: '', title: '', description: '', serviceType: '' })
  const [joinSuccess, setJoinSuccess] = useState(false)
  const [storySuccess, setStorySuccess] = useState(false)
  const [joinError, setJoinError] = useState('')
  const [storyError, setStoryError] = useState('')

  const utils = trpc.useUtils()
  const signPetition = trpc.petition.sign.useMutation({
    onSuccess: () => {
      setJoinSuccess(true)
      setJoinError('')
      utils.petition.list.invalidate()
      utils.petition.count.invalidate()
      setTimeout(() => {
        setJoinSuccess(false)
        setJoinForm({ name: '', email: '', city: '', state: '', message: '' })
      }, 5000)
    },
    onError: (err) => {
      setJoinError(err.message)
    }
  })

  const submitStory = trpc.story.submit.useMutation({
    onSuccess: () => {
      setStorySuccess(true)
      setStoryError('')
      setTimeout(() => {
        setStorySuccess(false)
        setStoryForm({ name: '', email: '', phone: '', title: '', description: '', serviceType: '' })
      }, 5000)
    },
    onError: (err) => {
      setStoryError(err.message)
    }
  })

  const { data: signerCount } = trpc.petition.count.useQuery()

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setJoinError('')
    signPetition.mutate({
      name: joinForm.name,
      email: joinForm.email,
      city: joinForm.city || undefined,
      state: joinForm.state || undefined,
      message: joinForm.message || undefined,
    })
  }

  const handleStorySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStoryError('')
    submitStory.mutate({
      name: storyForm.name,
      email: storyForm.email,
      phone: storyForm.phone || undefined,
      title: storyForm.title,
      description: storyForm.description,
      serviceType: storyForm.serviceType,
    })
  }

  return (
    <div className="min-h-screen bg-[#0C1520]">
      {/* Background */}
      <div className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-[0.15]" style={{ backgroundImage: 'url(/images/bg-hero.jpg)' }} />
      <div className="fixed inset-0 bg-gradient-to-b from-[#0C1520]/95 via-[#0C1520]/90 to-[#0C1520]/95" />

      <div className="relative z-10">
        {/* Header */}
        <div className="border-b border-white/[0.06]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-6 flex items-center gap-4">
            <Link to="/" className="text-[#C9B99A] hover:text-[#FF9500] transition-colors"><ArrowLeft size={20} /></Link>
            <span className="text-xs tracking-[0.2em] text-[#FF9500] uppercase">#TheKingsTake</span>
          </div>
        </div>

        {/* LIVE TICKER */}
        <PetitionTicker />

        {/* HERO */}
        <section className="relative py-16 px-6 lg:px-12">
          <div className="max-w-[800px] mx-auto text-center">
            <div className="text-[10px] tracking-[0.3em] text-[#FF9500] uppercase mb-4 font-mono">Join the Movement</div>
            <h1 className="text-4xl lg:text-6xl font-medium tracking-tight leading-[1.05] mb-6" style={{ fontFamily: 'Newsreader, serif' }}>
              <span className="text-[#FF9500]">Become 1</span>
              <br />
              <span className="text-[#F0EBE1]">of a Million</span>
            </h1>
            <p className="text-xl text-[#C9B99A]/80 mb-4" style={{ fontFamily: 'Newsreader, serif' }}>
              Sign the Petition
            </p>
            <div className="text-5xl font-bold text-[#FF9500] mb-2" style={{ fontFamily: 'Newsreader, serif' }}>
              {signerCount !== undefined ? signerCount.toLocaleString() : '—'}
            </div>
            <p className="text-xs tracking-[0.2em] text-[#C9B99A]/50 uppercase">Signatures & Counting</p>
          </div>
        </section>

        {/* PETITION BACKSTORY */}
        <section className="py-16 px-6 lg:px-12 border-y border-white/[0.06]">
          <div className="max-w-[800px] mx-auto">
            <ScrollReveal>
              <div className="bg-white/[0.03] border border-[#FF9500]/20 p-8 lg:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <Gavel className="w-6 h-6 text-[#FF9500]" />
                  <h2 className="text-2xl font-medium text-[#F0EBE1]" style={{ fontFamily: 'Newsreader, serif' }}>
                    Why We Are Demanding Justice
                  </h2>
                </div>
                <div className="space-y-4 text-[#C9B99A]/80 text-sm leading-relaxed" style={{ fontFamily: 'Newsreader, serif' }}>
                  <p>
                    <strong className="text-[#F0EBE1]">The United States was built on the labor of enslaved Africans.</strong> For 256 years, 
                    our ancestors were worked, brutalized, and killed to build the wealthiest nation on Earth. When slavery 
                    ended, no reparations were paid. No land was given. No wealth was transferred. Instead, Jim Crow, 
                    mass incarceration, and systemic inequality ensured that Black families would remain at the bottom 
                    of every economic, social, and legal system.
                  </p>
                  <p>
                    <strong className="text-[#F0EBE1]">Today, the legal system continues this exploitation.</strong> The Unauthorized Practice 
                    of Law (UPL) — laws designed to "protect" consumers — are weaponized against community advocates who 
                    try to help our people navigate courts. Public defenders are underfunded and overwhelmed, handling 
                    500-1,000 cases per year. Black defendants receive sentences 20% longer than white defendants for 
                    the same crimes. And every year, millions of our people are processed through a system that was 
                    never designed to deliver justice — only control.
                  </p>
                  <p>
                    <strong className="text-[#F0EBE1]">Corrupt public defenders are not a bug in the system — they are a feature.</strong> 
                    When a public defender meets their client for 7 minutes before a plea hearing, that is not representation. 
                    That is a conveyor belt. That is a system designed to process people, not defend them. And the people 
                    who suffer most are the ones who cannot afford to buy their way out.
                  </p>
                  <p>
                    <strong className="text-[#F0EBE1]">We demand reparations for systemic legal injustice.</strong> We demand that 
                    UPL laws be reformed to allow trained non-attorney advocates to serve their communities. We demand 
                    full funding for public defenders. We demand an end to racial sentencing disparities. And we demand 
                    that the legal profession acknowledge its role in perpetuating inequality — and take concrete steps 
                    to repair the damage.
                  </p>
                  <div className="pt-4 border-t border-white/[0.08]">
                    <p className="text-[#FF9500] font-medium">
                      Add your name. Stand with us. Build what cannot be destroyed.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* HOW TO HELP */}
        <section className="py-16 px-6 lg:px-12">
          <div className="max-w-[800px] mx-auto">
            <h2 className="text-3xl font-medium text-[#F0EBE1] mb-10 text-center" style={{ fontFamily: 'Newsreader, serif' }}>
              How You Can Help Build <span className="text-[#FF9500]">#TheKingsTake</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[{ icon: Share2, title: 'Share', desc: 'Share our articles, book updates, and legal resources on your social media. Every share reaches someone who needs this.' }, { icon: MessageSquare, title: 'Engage', desc: 'Comment on blog posts. Ask questions. Start conversations. Your engagement tells platforms this content matters.' }, { icon: Megaphone, title: 'Amplify', desc: 'Repost, retweet, reshare. Tag people who need to see this. Use #TheKingsTake so we can amplify your voice too.' }].map(item => (
                <div key={item.title} className="bg-white/[0.03] border border-white/[0.08] p-6">
                  <div className="w-10 h-10 border border-[#FF9500]/30 flex items-center justify-center mb-4">
                    <item.icon size={20} className="text-[#FF9500]" />
                  </div>
                  <h3 className="text-lg font-medium text-[#F0EBE1] mb-3" style={{ fontFamily: 'Newsreader, serif' }}>{item.title}</h3>
                  <p className="text-sm text-[#C9B99A]/70 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* JOIN THE MOVEMENT FORM — REAL PETITION */}
        <section className="py-16 px-6 lg:px-12 border-t border-white/[0.06]">
          <div className="max-w-[640px] mx-auto">
            <div className="text-center mb-10">
              <Users className="w-8 h-8 text-[#FF9500] mx-auto mb-4" />
              <h2 className="text-3xl font-medium text-[#F0EBE1] mb-4" style={{ fontFamily: 'Newsreader, serif' }}>
                Join the Movement
              </h2>
              <p className="text-[#C9B99A]/70">
                Add your name to the growing list of people committed to justice, reparations, 
                and the reform of a legal system that has failed our communities for too long.
              </p>
            </div>

            {joinSuccess ? (
              <div className="bg-[#FF9500]/10 border border-[#FF9500]/30 p-8 text-center">
                <CheckCircle className="w-12 h-12 text-[#FF9500] mx-auto mb-4" />
                <h3 className="text-xl font-medium text-[#F0EBE1] mb-2" style={{ fontFamily: 'Newsreader, serif' }}>Welcome to the Movement</h3>
                <p className="text-[#C9B99A]/70">Your name has been added to the petition. Your voice matters. Your signature counts.</p>
              </div>
            ) : (
              <form onSubmit={handleJoinSubmit} className="space-y-5">
                {joinError && (
                  <div className="bg-red-500/10 border border-red-500/30 p-3 text-red-400 text-sm flex items-center gap-2">
                    <AlertTriangle size={16} /> {joinError}
                  </div>
                )}
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs tracking-[0.15em] text-[#C9B99A]/60 uppercase mb-2">Name *</label>
                    <input type="text" required value={joinForm.name} onChange={e => setJoinForm({...joinForm, name: e.target.value})} className="w-full h-12 bg-white/[0.03] border border-white/[0.08] text-[#F0EBE1] px-4 text-sm focus:border-[#FF9500]/50 focus:outline-none" placeholder="Your full name" />
                  </div>
                  <div>
                    <label className="block text-xs tracking-[0.15em] text-[#C9B99A]/60 uppercase mb-2">Email *</label>
                    <input type="email" required value={joinForm.email} onChange={e => setJoinForm({...joinForm, email: e.target.value})} className="w-full h-12 bg-white/[0.03] border border-white/[0.08] text-[#F0EBE1] px-4 text-sm focus:border-[#FF9500]/50 focus:outline-none" placeholder="your@email.com" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs tracking-[0.15em] text-[#C9B99A]/60 uppercase mb-2">City</label>
                    <input type="text" value={joinForm.city} onChange={e => setJoinForm({...joinForm, city: e.target.value})} className="w-full h-12 bg-white/[0.03] border border-white/[0.08] text-[#F0EBE1] px-4 text-sm focus:border-[#FF9500]/50 focus:outline-none" placeholder="Your city" />
                  </div>
                  <div>
                    <label className="block text-xs tracking-[0.15em] text-[#C9B99A]/60 uppercase mb-2">State</label>
                    <input type="text" value={joinForm.state} onChange={e => setJoinForm({...joinForm, state: e.target.value})} className="w-full h-12 bg-white/[0.03] border border-white/[0.08] text-[#F0EBE1] px-4 text-sm focus:border-[#FF9500]/50 focus:outline-none" placeholder="Your state" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs tracking-[0.15em] text-[#C9B99A]/60 uppercase mb-2">Message of Support</label>
                  <textarea rows={4} value={joinForm.message} onChange={e => setJoinForm({...joinForm, message: e.target.value})} className="w-full bg-white/[0.03] border border-white/[0.08] text-[#F0EBE1] px-4 py-3 text-sm focus:border-[#FF9500]/50 focus:outline-none resize-none" placeholder="Why are you joining the movement? What does justice mean to you?" />
                </div>
                <button type="submit" disabled={signPetition.isPending} className="w-full h-12 bg-[#FF9500] text-[#0C1520] font-medium text-sm tracking-[0.05em] uppercase hover:bg-[#FF9500]/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
                  <Send size={16} />
                  {signPetition.isPending ? 'Signing...' : 'Sign the Petition'}
                </button>
              </form>
            )}
          </div>
        </section>

        {/* SUBMIT YOUR STORY — SALES FUNNEL */}
        <section className="py-16 px-6 lg:px-12 border-t border-white/[0.06]">
          <div className="max-w-[640px] mx-auto">
            <div className="text-center mb-10">
              <BookOpen className="w-8 h-8 text-[#FF9500] mx-auto mb-4" />
              <h2 className="text-3xl font-medium text-[#F0EBE1] mb-4" style={{ fontFamily: 'Newsreader, serif' }}>
                Do You Have a Story?
              </h2>
              <p className="text-[#C9B99A]/70 mb-6">
                Your story has power. Your voice has weight. Just as I used my story to build #TheKingsTake, 
                you can use yours to build something that outlasts you. Let us help you tell it.
              </p>
              <div className="bg-[#FF9500]/5 border border-[#FF9500]/20 p-6 text-left">
                <ScrollText className="w-5 h-5 text-[#FF9500] mb-3" />
                <p className="text-sm text-[#C9B99A]/80 italic leading-relaxed" style={{ fontFamily: 'Newsreader, serif' }}>
                  "I wrote The African American State of the Union: From the Loins of the Beast while sitting 
                  in a jail cell. I had no computer, no publisher, no platform — just a pen, paper, and a burning 
                  need to tell the truth about what this system does to our people. That book became the foundation 
                  for everything you see here. Your story can do the same."
                </p>
                <p className="text-xs text-[#FF9500] mt-3 tracking-[0.1em] uppercase">— Ronald Lee King, Founder</p>
              </div>
            </div>

            {storySuccess ? (
              <div className="bg-[#FF9500]/10 border border-[#FF9500]/30 p-8 text-center">
                <CheckCircle className="w-12 h-12 text-[#FF9500] mx-auto mb-4" />
                <h3 className="text-xl font-medium text-[#F0EBE1] mb-2" style={{ fontFamily: 'Newsreader, serif' }}>Story Received</h3>
                <p className="text-[#C9B99A]/70">Thank you for trusting us with your story. Someone from our team will contact you within 48 hours to discuss how we can help bring your story to life.</p>
                <Link to="/services/writing-ghostwriting" className="inline-flex items-center gap-2 mt-4 text-[#FF9500] text-sm hover:underline">
                  <BookOpen size={16} /> Explore Our Writing Services
                </Link>
              </div>
            ) : (
              <form onSubmit={handleStorySubmit} className="space-y-5">
                {storyError && (
                  <div className="bg-red-500/10 border border-red-500/30 p-3 text-red-400 text-sm flex items-center gap-2">
                    <AlertTriangle size={16} /> {storyError}
                  </div>
                )}
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs tracking-[0.15em] text-[#C9B99A]/60 uppercase mb-2">Name *</label>
                    <input type="text" required value={storyForm.name} onChange={e => setStoryForm({...storyForm, name: e.target.value})} className="w-full h-12 bg-white/[0.03] border border-white/[0.08] text-[#F0EBE1] px-4 text-sm focus:border-[#FF9500]/50 focus:outline-none" placeholder="Your full name" />
                  </div>
                  <div>
                    <label className="block text-xs tracking-[0.15em] text-[#C9B99A]/60 uppercase mb-2">Email *</label>
                    <input type="email" required value={storyForm.email} onChange={e => setStoryForm({...storyForm, email: e.target.value})} className="w-full h-12 bg-white/[0.03] border border-white/[0.08] text-[#F0EBE1] px-4 text-sm focus:border-[#FF9500]/50 focus:outline-none" placeholder="your@email.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs tracking-[0.15em] text-[#C9B99A]/60 uppercase mb-2">Phone (Optional)</label>
                  <input type="tel" value={storyForm.phone} onChange={e => setStoryForm({...storyForm, phone: e.target.value})} className="w-full h-12 bg-white/[0.03] border border-white/[0.08] text-[#F0EBE1] px-4 text-sm focus:border-[#FF9500]/50 focus:outline-none" placeholder="(555) 555-5555" />
                </div>
                <div>
                  <label className="block text-xs tracking-[0.15em] text-[#C9B99A]/60 uppercase mb-2">Story Title / Idea *</label>
                  <input type="text" required value={storyForm.title} onChange={e => setStoryForm({...storyForm, title: e.target.value})} className="w-full h-12 bg-white/[0.03] border border-white/[0.08] text-[#F0EBE1] px-4 text-sm focus:border-[#FF9500]/50 focus:outline-none" placeholder="What is your story about?" />
                </div>
                <div>
                  <label className="block text-xs tracking-[0.15em] text-[#C9B99A]/60 uppercase mb-2">Short Description *</label>
                  <textarea rows={4} required value={storyForm.description} onChange={e => setStoryForm({...storyForm, description: e.target.value})} className="w-full bg-white/[0.03] border border-white/[0.08] text-[#F0EBE1] px-4 py-3 text-sm focus:border-[#FF9500]/50 focus:outline-none resize-none" placeholder="Tell us about your story in a few sentences..." />
                </div>
                <div>
                  <label className="block text-xs tracking-[0.15em] text-[#C9B99A]/60 uppercase mb-2">Service Interest *</label>
                  <select required value={storyForm.serviceType} onChange={e => setStoryForm({...storyForm, serviceType: e.target.value})} className="w-full h-12 bg-white/[0.03] border border-white/[0.08] text-[#F0EBE1] px-4 text-sm focus:border-[#FF9500]/50 focus:outline-none appearance-none">
                    <option value="" className="bg-[#0C1520]">Select a service type...</option>
                    {SERVICE_OPTIONS.map(opt => <option key={opt} value={opt} className="bg-[#0C1520]">{opt}</option>)}
                  </select>
                </div>
                <button type="submit" disabled={submitStory.isPending} className="w-full h-12 bg-[#FF9500] text-[#0C1520] font-medium text-sm tracking-[0.05em] uppercase hover:bg-[#FF9500]/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
                  <Send size={16} />
                  {submitStory.isPending ? 'Submitting...' : 'Submit Your Story'}
                </button>
              </form>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-6 lg:px-12 border-t border-white/[0.06]">
          <div className="max-w-[640px] mx-auto text-center">
            <h2 className="text-2xl font-medium text-[#F0EBE1] mb-6" style={{ fontFamily: 'Newsreader, serif' }}>Ready to go deeper?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/" className="inline-flex items-center justify-center gap-2 h-12 px-8 border border-[#FF9500] text-[#FF9500] text-sm tracking-[0.05em] uppercase hover:bg-[#FF9500]/10 transition-colors">
                <ArrowLeft size={16} /> Back to Home
              </Link>
              <Link to="/blog" className="inline-flex items-center justify-center gap-2 h-12 px-8 bg-[#FF9500] text-[#0C1520] text-sm tracking-[0.05em] uppercase hover:bg-[#FF9500]/90 transition-colors">
                Read the Blog
              </Link>
            </div>
          </div>
        </section>

        {/* TICKER AT BOTTOM TOO */}
        <PetitionTicker />
      </div>
    </div>
  )
}
