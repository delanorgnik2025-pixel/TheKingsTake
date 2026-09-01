import { Link } from 'react-router'
import { useState } from 'react'
import { BookOpen, Monitor, Share2, Rocket, Cpu, Satellite, Radio, ArrowRight, Terminal, Crosshair, Crown } from 'lucide-react'
import MatrixRain from '@/components/MatrixRain'
import ParticleSwarm from '@/components/ParticleSwarm'

const LIVE_FEED = [
  { time: '23:42:18', text: 'Federal Reserve announces new small business lending program targeting underserved communities', tag: 'ECON' },
  { time: '23:38:55', text: 'Historic Black church in Atlanta receives $2M grant for community development center', tag: 'DEV' },
  { time: '23:35:12', text: 'New legislation proposes tax incentives for companies with 40%+ Black board representation', tag: 'POL' },
  { time: '23:31:47', text: 'Dawes Roll digitization project reaches 75% completion, opening new genealogy access', tag: 'GEN' },
  { time: '23:28:33', text: 'SpaceX HBCU partnership expands to 12 universities for satellite engineering', tag: 'SPC' },
]

const ARTICLES = [
  { category: 'ECONOMICS', date: '2026.08.24', title: 'The New Black Wall Street: Digital Infrastructure Rebuilding Economic Power', excerpt: 'From fintech to crypto, Black entrepreneurs are leveraging technology to create wealth outside traditional systems. The blueprint for the new industrial revolution.', image: '/images/template/economics-thumb.jpg', readTime: '08m', live: true },
  { category: 'HISTORY', date: '2026.08.22', title: 'Uncovering the Lost Ledgers: What the Dawes Commission Missed', excerpt: 'New archival research reveals systemic gaps in the 1896–1914 enrollment process. Thousands of qualified applicants were excluded through bureaucratic manipulation.', image: '/images/template/history-thumb.jpg', readTime: '12m', live: false },
  { category: 'TECHNOLOGY', date: '2026.08.20', title: 'Drone Swarms and the Future of Black-Owned Agriculture', excerpt: 'Autonomous aerial systems are revolutionizing farming in the South. How Black landowners are leveraging robotics to reclaim and scale agricultural production.', image: '/images/template/community-thumb.jpg', readTime: '06m', live: true },
]

const TRENDING = ['BLACK WEALTH GAP', 'POLICE REFORM', 'REPARATIONS', 'GENEALOGY', 'BLACK BANKS', 'UPL REFORM', 'DRONE TECH', 'SPACE RACE']

const TRENDING_STORIES = [
  { rank: '001', title: 'How to Build Business Credit With a 540 Score', reads: '2.4K' },
  { rank: '002', title: 'The Complete Guide to NET-30 Accounts for Black-Owned LLCs', reads: '1.8K' },
  { rank: '003', title: 'Understanding the Dawes Rolls: A Research Manual', reads: '1.5K' },
  { rank: '004', title: 'Kiva Crowdfunding: Raising Capital at 0% Interest', reads: '1.2K' },
]

const COURSES = [
  { icon: BookOpen, title: 'Book Publishing Masterclass', desc: 'From manuscript to market. ISBN, copyright, IngramSpark, KDP, and marketing strategy.', price: '$149', modules: '06 MODULES' },
  { icon: Monitor, title: 'Website Building Intensive', desc: 'React, Stripe, SEO, and deployment. Build your own platform without depending on third parties.', price: '$199', modules: '08 MODULES' },
  { icon: Share2, title: 'Facebook Monetization', desc: 'Turn 35K followers into revenue. Ads, subscriptions, Pixel tracking, and content strategy.', price: '$099', modules: '04 MODULES' },
]

const TECH_FEATURES = [
  { icon: Rocket, title: 'The Space Race Is Ours', desc: 'Satellite technology, orbital infrastructure, and how Black engineers are entering the new frontier.', stat: '12 HBCUs partnered' },
  { icon: Cpu, title: 'AI & Automation', desc: 'Machine learning, neural networks, and autonomous systems built by us, for us.', stat: '400% growth' },
  { icon: Satellite, title: 'Drone Infrastructure', desc: 'Agricultural monitoring, delivery systems, and surveillance technology for community protection.', stat: '$2.1B market' },
  { icon: Radio, title: 'Communications Grid', desc: 'Mesh networks, encrypted channels, and decentralized information systems.', stat: 'Offline capable' },
]

export default function HomePage() {
  const [email, setEmail] = useState('')

  return (
    <main className="min-h-screen relative" style={{ background: '#050508' }}>
      <MatrixRain opacity={0.08} speed={0.5} />
      <ParticleSwarm count={50} />

      {/* HERO SECTION */}
      <section className="relative z-10 pt-[120px] pb-16 lg:pt-[140px] lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(0,255,65,0.04) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(0,196,250,0.03) 0%, transparent 50%)' }} />
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-7">
                <Crown size={26} className="text-[#d4a843] shrink-0" />
                <span className="text-2xl md:text-4xl font-bold tracking-[0.2em] text-[#d4a843] font-display whitespace-nowrap" style={{ textShadow: '0 0 24px rgba(212,168,67,0.35)' }}>
                  #THEKINGSTAKE
                </span>
                <span className="hidden md:block h-px flex-1 bg-gradient-to-r from-[#d4a843]/60 to-transparent" />
              </div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-0.5 text-[#050508] text-[9px] font-bold tracking-[0.2em] uppercase rounded font-mono-tech" style={{ background: '#00ff41' }}>
                  FEATURED_RELEASE
                </span>
                <span className="text-[10px] tracking-[0.15em] uppercase text-[#d4a843] font-mono-tech flex items-center gap-1.5">
                  <Crosshair size={10} /> THE_BOOK
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-[1.1] mb-5 font-display tracking-wide">
                THE AFRICAN AMERICAN<br />
                <span className="text-[#00ff41] text-shadow-glow" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  STATE OF THE UNION
                </span>
              </h1>
              <div className="flex items-center gap-2 mb-5">
                <Terminal size={14} className="text-[#00ff41]" />
                <span className="text-[11px] text-[#00ff41]/60 font-mono-tech tracking-wider">
                  FROM THE LOINS OF THE BEAST // v1.0.0
                </span>
              </div>
              <p className="text-base md:text-lg text-white/60 max-w-lg leading-relaxed mb-7 font-light">
                A blueprint for Black economic industrial revolution. From incarceration to incorporation — the digital infrastructure for a new sovereign future.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/pre-order" className="inline-flex items-center gap-2 px-6 h-11 rounded text-[#050508] text-[11px] font-bold tracking-[0.1em] uppercase hover:brightness-110 transition-all font-tech border border-[#00ff41]/30" style={{ background: 'linear-gradient(135deg,#00ff41 0%,#00c4fa 50%,#00ff41 100%)' }}>
                  <BookOpen size={14} /> ORDER_HARDCOVER — $26.99
                </Link>
                <Link to="/about-author" className="inline-flex items-center gap-2 px-6 h-11 border border-white/15 text-white text-[11px] font-medium tracking-[0.05em] uppercase rounded hover:bg-white/[0.05] hover:border-[#00ff41]/30 transition-all font-tech">
                  READ_BIOGRAPHY
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="bg-[#0a0a12]/80 border border-[#00ff41]/15 rounded-lg p-5 backdrop-blur-md" style={{ boxShadow: '0 0 30px rgba(0,255,65,0.05), inset 0 0 30px rgba(0,255,65,0.02)' }}>
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-white/[0.06]">
                  <Radio size={12} className="text-[#ff3b30]" />
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#ff3b30] font-mono-tech font-bold">LIVE_FEED</span>
                  <span className="text-[10px] text-white/30 ml-auto font-mono-tech">EST // UTC-5</span>
                </div>
                <div className="space-y-2">
                  {LIVE_FEED.map((item, i) => (
                    <div key={i} className="flex gap-3 items-start p-2.5 bg-white/[0.02] rounded hover:bg-white/[0.04] transition-colors cursor-pointer group border border-transparent hover:border-[#00ff41]/10">
                      <span className="text-[9px] font-mono-tech text-[#00ff41]/50 mt-0.5 shrink-0 w-[50px]">{item.time}</span>
                      <span className="text-[9px] font-mono-tech px-1.5 py-0.5 rounded bg-[#00c4fa]/10 text-[#00c4fa] shrink-0 h-fit">{item.tag}</span>
                      <p className="text-[12px] text-white/70 leading-snug group-hover:text-white transition-colors">{item.text}</p>
                    </div>
                  ))}
                </div>
                <Link to="/news" className="mt-3 text-[11px] text-[#00ff41] hover:text-[#00c4fa] transition-colors font-mono-tech flex items-center gap-1">
                  VIEW_ALL_HEADLINES &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRENDING TOPICS */}
      <section className="relative z-10 border-y border-white/[0.06]" style={{ background: 'linear-gradient(90deg, rgba(0,255,65,0.02), rgba(0,196,250,0.02), rgba(0,255,65,0.02))' }}>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-4">
          <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
            <span className="text-[9px] tracking-[0.25em] uppercase text-[#00ff41]/40 font-mono-tech shrink-0 flex items-center gap-1.5">
              <Crosshair size={9} /> TRENDING
            </span>
            {TRENDING.map((topic) => (
              <span key={topic} className="shrink-0 px-3 py-1.5 bg-white/[0.03] border border-white/[0.08] rounded text-[10px] text-white/60 hover:border-[#00ff41]/30 hover:text-[#00ff41] transition-all cursor-pointer font-mono-tech tracking-wider">
                {topic}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-10 py-12">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* NEWS FEED */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-[#00ff41]" />
                <h2 className="text-lg font-bold text-white font-display tracking-wider">LATEST_INTELLIGENCE</h2>
              </div>
              <span className="text-[10px] text-white/30 font-mono-tech">// CURATED</span>
            </div>
            <div className="space-y-5">
              {ARTICLES.map((article, i) => (
                <article key={i} className="group cursor-pointer">
                  <div className="grid md:grid-cols-5 gap-5 bg-[#0a0a12]/60 border border-white/[0.06] rounded-lg overflow-hidden hover:border-[#00ff41]/20 transition-all" style={{ boxShadow: 'inset 0 0 20px rgba(0,255,65,0.01)' }}>
                    <div className="md:col-span-2 h-44 md:h-auto overflow-hidden relative">
                      <img src={article.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={article.title} />
                      <div className="absolute top-2 left-2">
                        <span className="text-[9px] font-mono-tech px-1.5 py-0.5 bg-[#00ff41]/10 border border-[#00ff41]/20 text-[#00ff41] rounded">{article.category}</span>
                      </div>
                    </div>
                    <div className="md:col-span-3 p-5">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[10px] text-white/30 font-mono-tech">{article.date}</span>
                        {article.live && <span className="text-[9px] text-[#ff3b30] font-mono-tech flex items-center gap-1"><span className="w-1 h-1 bg-[#ff3b30] rounded-full live-dot" /> LIVE</span>}
                      </div>
                      <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#00ff41] transition-colors font-tech leading-snug tracking-wide">{article.title}</h3>
                      <p className="text-[12px] text-white/50 leading-relaxed mb-3">{article.excerpt}</p>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-white/25 font-mono-tech">{article.readTime}</span>
                        <span className="text-[10px] text-[#00ff41]/40 font-mono-tech group-hover:text-[#00ff41] transition-colors">READ_FULL &rarr;</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-6 text-center">
              <button className="px-6 h-10 border border-white/10 text-white/50 text-[11px] font-mono-tech tracking-[0.1em] uppercase rounded hover:bg-white/[0.03] hover:text-white hover:border-[#00ff41]/20 transition-all">
                LOAD_MORE_INTELLIGENCE
              </button>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="lg:col-span-4 space-y-6">
            {/* BOOK PROMO */}
            <div className="rounded-lg overflow-hidden border border-[#d4a843]/20" style={{ background: 'linear-gradient(to bottom right, #0a0a12, #11111a)' }}>
              <div className="relative">
                <img src="/images/template/book-editorial.jpg" className="w-full h-40 object-cover" alt="Book" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0a0a12, transparent)' }} />
                <div className="absolute top-2 left-2">
                  <span className="px-2 py-0.5 text-[#050508] text-[8px] font-bold tracking-[0.15em] uppercase rounded font-mono-tech bg-[#d4a843]">NOW_AVAILABLE</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-bold text-white mb-1 font-tech tracking-wide">THE AFRICAN AMERICAN STATE OF THE UNION</h3>
                <p className="text-[11px] text-white/40 leading-relaxed mb-3">The definitive blueprint for Black economic industrial revolution.</p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-[#d4a843] font-display">$26.99</span>
                  <span className="text-[10px] text-white/25 line-through font-mono-tech">$34.99</span>
                </div>
                <Link to="/pre-order" className="block w-full text-center h-9 rounded text-[#050508] text-[11px] font-bold tracking-[0.08em] uppercase hover:brightness-110 transition-all font-tech leading-9" style={{ background: 'linear-gradient(135deg,#d4a843 0%,#f0c96a 50%,#d4a843 100%)' }}>
                  ORDER_NOW
                </Link>
              </div>
            </div>

            {/* NEWSLETTER */}
            <div className="bg-[#0a0a12]/80 border border-white/[0.06] rounded-lg p-5" style={{ boxShadow: 'inset 0 0 20px rgba(0,196,250,0.02)' }}>
              <div className="flex items-center gap-2 mb-3">
                <Radio size={12} className="text-[#00c4fa]" />
                <h3 className="text-xs font-bold text-white tracking-wider font-tech">BRIEFING_SUBSCRIPTION</h3>
              </div>
              <p className="text-[11px] text-white/40 mb-3 leading-relaxed">Daily intelligence on Black economics, technology, and justice. Encrypted delivery.</p>
              <div className="space-y-2">
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="enter@email.com" className="w-full h-9 bg-white/[0.03] border border-white/[0.08] rounded px-3 text-[12px] text-white placeholder:text-white/20 focus:outline-none focus:border-[#00ff41]/30 font-mono-tech" />
                <button className="w-full h-9 text-[#050508] text-[11px] font-bold tracking-[0.08em] uppercase rounded hover:brightness-110 transition-all font-tech" style={{ background: '#00ff41' }}>SUBSCRIBE</button>
              </div>
              <p className="text-[9px] text-white/20 mt-2 font-mono-tech">12,400+ SUBSCRIBERS // END-TO-END ENCRYPTED</p>
            </div>

            {/* TRENDING MINI */}
            <div className="bg-[#0a0a12]/60 border border-white/[0.06] rounded-lg p-5">
              <div className="flex items-center gap-2 mb-3">
                <Crosshair size={12} className="text-[#d4a843]" />
                <h3 className="text-xs font-bold text-white tracking-wider font-tech">TRENDING_NOW</h3>
              </div>
              <div className="space-y-3">
                {TRENDING_STORIES.map((story, i) => (
                  <div key={i}>
                    {i > 0 && <div className="h-px bg-white/[0.04] mb-3" />}
                    <div className="flex items-start gap-2">
                      <span className="text-[9px] font-mono-tech text-[#d4a843]/50 w-6 shrink-0">{story.rank}</span>
                      <div>
                        <h4 className="text-[12px] font-medium text-white/70 hover:text-[#d4a843] transition-colors leading-snug cursor-pointer font-tech">{story.title}</h4>
                        <span className="text-[9px] text-white/20 mt-0.5 block font-mono-tech">{story.reads} READS</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* REGISTRY TEASER */}
            <div className="relative overflow-hidden rounded-lg border border-[#d4a843]/10">
              <img src="/images/template/history-thumb.jpg" className="w-full h-32 object-cover opacity-20" alt="Registry" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #050508, rgba(5,5,8,0.9), transparent)' }} />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-xs font-bold text-white mb-1 font-tech tracking-wide">ANCESTOR_ROOT_REGISTRY</h3>
                <p className="text-[10px] text-white/40 mb-2 leading-relaxed">Trace lineage. Record history. Claim legacy.</p>
                <Link to="/ancestor-root-registry" className="text-[10px] text-[#d4a843] hover:text-[#f0c96a] font-mono-tech transition-colors flex items-center gap-1">
                  BEGIN_RESEARCH &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TECH / SCIENCE SECTION */}
      <section className="relative z-10 border-y border-white/[0.06]" style={{ background: '#08080f' }}>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-14">
          <div className="flex items-center gap-2 mb-8">
            <Rocket size={16} className="text-[#00ff41]" />
            <h2 className="text-xl font-bold text-white font-display tracking-wider">OPERATION_TECH // THE FUTURE</h2>
            <span className="text-[10px] text-white/20 ml-auto font-mono-tech">PRESERVE // SCALE // DOMINATE</span>
          </div>
          <p className="text-sm text-white/50 max-w-2xl mb-8 leading-relaxed">
            Robotics. Drones. Satellite networks. Artificial intelligence. The next industrial revolution is technological — and we are building the infrastructure to own it.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {TECH_FEATURES.map((feat, i) => (
              <div key={i} className="bg-[#0a0a12]/80 border border-white/[0.06] rounded-lg p-5 hover:border-[#00ff41]/15 transition-all group" style={{ boxShadow: 'inset 0 0 20px rgba(0,255,65,0.01)' }}>
                <div className="w-9 h-9 rounded flex items-center justify-center mb-3 group-hover:bg-[#00ff41]/10 transition-colors border border-[#00ff41]/10">
                  <feat.icon size={16} className="text-[#00ff41]" />
                </div>
                <h3 className="text-sm font-bold text-white mb-1 font-tech tracking-wide">{feat.title}</h3>
                <p className="text-[11px] text-white/40 leading-relaxed mb-3">{feat.desc}</p>
                <span className="text-[9px] font-mono-tech text-[#00c4fa]">{feat.stat}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COURSES STRIP */}
      <section className="relative z-10 border-y border-white/[0.06]" style={{ background: '#0a0a12' }}>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-14">
          <div className="flex items-center gap-2 mb-8">
            <Cpu size={16} className="text-[#00c4fa]" />
            <h2 className="text-xl font-bold text-white font-display tracking-wider">LEARN // BUILD // SCALE</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {COURSES.map((course, i) => (
              <div key={i} className="bg-[#0a0a12]/80 border border-white/[0.06] rounded-lg p-5 hover:border-[#00ff41]/15 transition-all group cursor-pointer" style={{ boxShadow: 'inset 0 0 20px rgba(0,255,65,0.01)' }}>
                <div className="w-9 h-9 rounded flex items-center justify-center mb-3 group-hover:bg-[#00ff41]/10 transition-colors border border-[#00ff41]/10">
                  <course.icon size={16} className="text-[#00ff41]" />
                </div>
                <h3 className="text-sm font-bold text-white mb-1 font-tech tracking-wide">{course.title}</h3>
                <p className="text-[11px] text-white/40 leading-relaxed mb-3">{course.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono-tech text-[#00ff41]">{course.price}</span>
                  <span className="text-[9px] font-mono-tech text-white/20">{course.modules}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AUTHOR SECTION */}
      <section className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-10 py-14">
        <div className="grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00ff41]/20 via-[#00c4fa]/20 to-[#d4a843]/20 rounded-lg blur opacity-40 group-hover:opacity-60 transition-opacity" />
              <img src="/images/ronald-professional.jpg" className="relative w-full rounded-lg border border-white/[0.08]" alt="Ronald Lee King" />
              <div className="absolute -bottom-3 -right-3 px-3 py-1.5 rounded text-[10px] font-bold tracking-[0.1em] uppercase text-[#050508] font-mono-tech" style={{ background: 'linear-gradient(135deg,#00ff41,#00c4fa)' }}>
                FOUNDER & AUTHOR
              </div>
            </div>
          </div>
          <div className="md:col-span-8">
            <div className="flex items-center gap-2 mb-3">
              <Satellite size={12} className="text-[#d4a843]" />
              <span className="text-[9px] tracking-[0.25em] uppercase text-[#d4a843] font-mono-tech">ABOUT_THE_FOUNDER</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 font-display tracking-wide">RONALD LEE KING</h2>
            <div className="flex items-center gap-2 mb-4">
              <Terminal size={12} className="text-[#00ff41]" />
              <span className="text-[10px] text-[#00ff41]/50 font-mono-tech">AASOTU MEDIA GROUP LLC // D-U-N-S: 14-313-0197</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-4">
              Founder of AASOTU Media Group LLC and author of <em className="text-[#d4a843]">The African American State of the Union</em>. Built from the inside out — from incarceration to incorporation. King is building the digital infrastructure for a Black economic industrial revolution.
            </p>
            <p className="text-sm text-white/60 leading-relaxed mb-6">
              With 35,000 followers and a mission rooted in biblical economics, genealogical research, and community organizing, THEKINGSTAKE is the information hub for those ready to build what cannot be destroyed.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/about-author" className="inline-flex items-center gap-2 px-5 h-9 border border-[#00ff41]/20 text-[#00ff41] text-[11px] font-medium tracking-[0.08em] uppercase rounded hover:bg-[#00ff41]/10 transition-all font-tech">
                FULL_BIOGRAPHY
              </Link>
              <Link to="/writing-services" className="inline-flex items-center gap-2 px-5 h-9 bg-white/[0.03] border border-white/[0.08] text-white text-[11px] font-medium tracking-[0.08em] uppercase rounded hover:bg-white/[0.06] hover:border-[#00ff41]/20 transition-all font-tech">
                WRITING_SERVICES
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
