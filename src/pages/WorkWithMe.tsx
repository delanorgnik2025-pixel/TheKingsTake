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

// VICTIMS OF STATE VIOLENCE — We say their names
const FALLEN_MARTYRS = [
  // Civil Rights Leaders Assassinated
  'Dr. Martin Luther King Jr. — Memphis, TN',
  'Malcolm X — New York, NY',
  'Fred Hampton — Chicago, IL',
  'Mark Clark — Chicago, IL',
  'Medgar Evers — Jackson, MS',
  // Police Shootings — Children
  'Tamir Rice, age 12 — Cleveland, OH',
  'Aiyana Stanley-Jones, age 7 — Detroit, MI',
  'Cameron Tillman, age 14 — Houma, LA',
  'Roysel Carrion, age 13 — Miami, FL',
  // Police Shootings — High Profile
  'George Floyd — Minneapolis, MN',
  'Breonna Taylor — Louisville, KY',
  'Michael Brown, age 18 — Ferguson, MO',
  'Eric Garner — Staten Island, NY',
  'Philando Castile — Falcon Heights, MN',
  'Freddie Gray — Baltimore, MD',
  'Sandra Bland — Waller County, TX',
  'Walter Scott — North Charleston, SC',
  'Laquan McDonald, age 17 — Chicago, IL',
  'Alton Sterling — Baton Rouge, LA',
  'Botham Jean — Dallas, TX',
  'Ahmaud Arbery — Brunswick, GA',
  'Daunte Wright — Brooklyn Center, MN',
  'Oscar Grant — Oakland, CA',
  'Sean Bell — New York, NY',
  'Atatiana Jefferson — Fort Worth, TX',
  'Stephon Clark — Sacramento, CA',
  'Terence Crutcher — Tulsa, OK',
  'Samuel DuBose — Cincinnati, OH',
  'Patrick K. Lloyd — Grand Rapids, MI',
  'Jordan Edwards, age 15 — Balch Springs, TX',
  // Say Her Name
  'Korryn Gaines — Randallstown, MD',
  'India Kager — College Park, MD',
  'Michelle Cusseaux — Phoenix, AZ',
  'Tanisha Anderson — Cleveland, OH',
  'Kayla Moore — Berkeley, CA',
  'Shelly Frey — Houston, TX',
  'Megan Hockaday — Oxnard, CA',
  'Mya Hall — Baltimore, MD',
  // Movement martyrs
  'Trayvon Martin, age 17 — Sanford, FL',
  'Emmett Till, age 14 — Money, MS',
]

// Corrupt system message — calls out judges, lawyers, PDs, prosecutors
const SYSTEM_MESSAGE = [
  'CORRUPT JUDGES dismiss our evidence before we speak — ',
  'LYING PROSECUTORS hide exculpatory evidence to protect convictions — ',
  'OVERWORKED PUBLIC DEFENDERS meet clients for 7 minutes before a plea deal — ',
  'WEAPONIZED UPL LAWS criminalize community advocates who try to help — ',
  'BIASED SENTENCING gives Black defendants 20% longer sentences for the same crime — ',
  'FIXED BAIL SYSTEM holds the poor in jail while the rich walk free — ',
  'PROSECUTORIAL MISCONDUCT ruins lives with zero accountability — ',
  'THE LEGAL PROFESSION protects its monopoly on justice — at our expense — ',
  'CASH BAIL is a poverty tax that destroys families before trial — ',
  'COURT APPOINTED ATTORNEYS with 500 cases cannot represent anyone — ',
]

// Marquee Ticker Component — honors martyrs + calls out corrupt system
function PetitionTicker() {
  const { data: signers } = trpc.petition.list.useQuery()

  // Build martyrs ticker line
  const martyrsLine = 'WE SAY THEIR NAMES \u2022 ' + FALLEN_MARTYRS.join(' \u2022 ') + ' \u2022 '

  // Build system corruption ticker line
  const systemLine = 'THE SYSTEM IS BROKEN \u2022 ' + SYSTEM_MESSAGE.join('') + ' '

  // Signers line (if any real signers exist)
  const realSigners = signers && signers.length > 0
    ? 'PETITION SIGNERS \u2022 ' + signers.map(s => s.name).join(' \u2022 ') + ' \u2022 '
    : ''

  return (
    <div className="w-full overflow-hidden">
      {/* Row 1: Martyrs — red tint for remembrance */}
      <div className="bg-red-950/30 border-y border-red-700/30 py-2 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          <span className="text-xs text-red-400 tracking-[0.08em] uppercase font-medium px-4">
            {martyrsLine}{martyrsLine}
          </span>
        </div>
      </div>
      {/* Row 2: Corrupt System — orange tint for urgency */}
      <div className="bg-[#FF9500]/10 border-b border-[#FF9500]/30 py-2 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee" style={{ animationDirection: 'reverse', animationDuration: '45s' }}>
          <span className="text-xs text-[#FF9500] tracking-[0.06em] uppercase font-medium px-4">
            {systemLine}{systemLine}
          </span>
        </div>
      </div>
      {/* Row 3: Petition signers (if any) */}
      {realSigners && (
        <div className="bg-emerald-950/20 border-b border-emerald-700/20 py-2 overflow-hidden">
          <div className="flex whitespace-nowrap animate-marquee" style={{ animationDuration: '35s' }}>
            <span className="text-xs text-emerald-400 tracking-[0.08em] uppercase font-medium px-4">
              {realSigners}{realSigners}
            </span>
          </div>
        </div>
      )}
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
            <p className="text-center text-[#C9B99A]/70 mb-10 max-w-[600px] mx-auto" style={{ fontFamily: 'Newsreader, serif' }}>
              AASOTU Media Group LLC is not just a company -- it is a movement built on the power of voice, narrative, and collective action. With nearly <strong className="text-[#FF9500]">14,000 followers</strong> on our platform, we have built a community that believes in justice, demands reform, and refuses to be silent. Here is how you become part of it:
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[{ icon: Share2, title: 'Share', desc: 'Every article, every blog post, every legal resource on this site was created to reach someone who needs it. When you share our content, you are not just clicking a button -- you are extending a lifeline to someone who may be sitting in a jail cell right now, someone who has been wronged by the system and does not know where to turn, someone who has a story burning inside them but no platform to tell it. Share our book updates. Share our legal resources. Share the petition. Your share could be the reason someone finds the courage to fight back.' }, { icon: MessageSquare, title: 'Engage', desc: 'Comment on our blog posts. Ask questions. Start conversations that matter. When you engage with our content, you are telling the algorithms -- and the world -- that this message matters. That justice matters. That Black voices matter. Every comment, every question, every discussion thread builds momentum. It tells platforms to push our content further. It tells policymakers that people are watching. It tells our community that they are not alone in this fight. Engagement is not passive -- it is power.' }, { icon: Megaphone, title: 'Amplify', desc: 'Repost, retweet, reshare -- but do not just share the link. Add your voice to it. Tell people why this matters to you. Tag friends, family, community leaders, and elected officials who need to see this. Use #TheKingsTake in every post so we can find your voice and amplify it back. We are building something larger than a website -- we are building a writers agency, a publishing house, a legal literacy movement, and a community of people who refuse to be silenced. When you amplify, you are not just sharing content -- you are building a movement.' }].map(item => (
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

        {/* JOIN THE MOVEMENT — POWERFUL CALL TO ACTION */}
        <section className="py-16 px-6 lg:px-12 border-t border-white/[0.06]">
          <div className="max-w-[800px] mx-auto">
            <div className="text-center mb-10">
              <Users className="w-8 h-8 text-[#FF9500] mx-auto mb-4" />
              <h2 className="text-3xl font-medium text-[#F0EBE1] mb-4" style={{ fontFamily: 'Newsreader, serif' }}>
                Join the Movement
              </h2>
              <p className="text-[#C9B99A]/70 max-w-[600px] mx-auto">
                This is not just a petition. This is a declaration. By adding your name, you join 
                nearly <strong className="text-[#FF9500]">14,000 followers</strong> and a growing army of people who refuse to accept 
                a justice system that was never designed to protect us. These are our demands:
              </p>
            </div>

            {/* DEMANDS LIST — THE ARGUMENTS */}
            <div className="mb-12 space-y-4">
              {[
                { icon: '1', title: 'Reform UPL Laws That Criminalize Community Advocates', desc: 'The Unauthorized Practice of Law (UPL) is used as a weapon against trained community advocates who help our people navigate courts. These laws protect lawyers\' monopoly -- not consumers. We demand UPL reform that allows certified non-attorney advocates to provide educational guidance to their communities without fear of criminal prosecution.' },
                { icon: '2', title: 'End Racial Sentencing Disparities', desc: 'Black defendants receive sentences 20% longer than white defendants for the same crimes. This is not justice -- it is systematic punishment based on skin color. We demand mandatory sentencing guidelines that eliminate racial bias and hold judges accountable for discriminatory sentences.' },
                { icon: '3', title: 'Fully Fund Public Defenders', desc: 'Public defenders handle 500-1,000 cases per year. They meet clients for 7 minutes before plea hearings. This is not representation -- it is a conveyor belt to incarceration. We demand that public defender offices receive funding equal to prosecutor offices, with caseload caps that allow real defense.' },
                { icon: '4', title: 'Hold Corrupt Judges and Prosecutors Accountable', desc: 'Prosecutors who hide exculpatory evidence, judges who dismiss valid claims before hearing them, and public defenders who fail their clients operate with near-total immunity. We demand an independent oversight body with the power to investigate, discipline, and remove officials who violate their oath.' },
                { icon: '5', title: 'Abolish Cash Bail', desc: 'Cash bail is a poverty tax that holds the poor in jail while the rich walk free. It destroys families, costs jobs, and forces innocent people to plead guilty just to go home. We demand the immediate replacement of cash bail with risk-based assessment tools that do not discriminate based on wealth.' },
                { icon: '6', title: 'Reparations for Systemic Legal Injustice', desc: 'The United States was built on 256 years of enslaved African labor. When slavery ended, no reparations were paid. Jim Crow, mass incarceration, and the modern legal system ensured Black families remained at the bottom. We demand reparations in the form of community legal centers, education funding, and direct investment in Black neighborhoods.' },
              ].map((demand, i) => (
                <div key={i} className="flex gap-4 p-5 bg-white/[0.03] border border-[#FF9500]/20 hover:border-[#FF9500]/40 transition-colors">
                  <div className="w-8 h-8 bg-[#FF9500] text-[#0C1520] flex items-center justify-center text-sm font-bold shrink-0 rounded-sm">
                    {demand.icon}
                  </div>
                  <div>
                    <h3 className="text-[#F0EBE1] font-medium mb-1" style={{ fontFamily: 'Newsreader, serif' }}>{demand.title}</h3>
                    <p className="text-sm text-[#C9B99A]/70 leading-relaxed">{demand.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mb-10">
              <p className="text-[#FF9500] font-medium mb-2" style={{ fontFamily: 'Newsreader, serif' }}>
                Your signature is your voice. Your voice is your power.
              </p>
              <p className="text-sm text-[#C9B99A]/60">
                Add your name below. Stand with us. Build what cannot be destroyed.
              </p>
            </div>

            <div className="max-w-[640px] mx-auto">

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
                <Link to="/services/speechwriting-narrative" className="inline-flex items-center gap-2 mt-4 text-[#FF9500] text-sm hover:underline">
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
