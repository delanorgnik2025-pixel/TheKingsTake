import { Link } from 'react-router'
import { ArrowRight, BookOpen, Newspaper, MessagesSquare, Search, Star } from 'lucide-react'
const destinations = [
  {to:'/feed', title:'Join the conversation', detail:'The community feed', icon:MessagesSquare},
  {to:'/news-hub', title:'Follow the stories', detail:'News & investigations', icon:Newspaper},
  {to:'/archives', title:'Explore the records', detail:'Archives & heritage', icon:Search},
  {to:'/brand-studio', title:'Build your presence', detail:'Websites & branding', icon:Star},
]
export default function NoirHeroSection() {
 return <section aria-labelledby="landing-title" className="relative isolate overflow-hidden bg-[#0b1420] lg:min-h-[780px]">
  <picture className="block lg:absolute lg:inset-0">
   <source media="(min-width: 1024px)" srcSet="/images/landing-noir-desktop-v1.jpg"/>
   <img src="/images/landing-noir-mobile-v1.jpg" alt="Ronald Lee King seated at a research desk in a cinematic nighttime portrait" fetchPriority="high" className="h-[65svh] min-h-[440px] max-h-[740px] w-full object-cover object-[center_42%] lg:h-full lg:max-h-none lg:object-[center_center]"/>
  </picture>
  <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-[#0b1420]/95 via-[#0b1420]/30 to-transparent lg:block"/>
  <div className="relative mx-auto max-w-7xl px-5 pb-10 lg:px-10 lg:py-20">
   <div className="relative -mt-16 rounded-3xl border border-[#d9ac62]/20 bg-[#101c2b]/95 p-6 shadow-2xl lg:mt-0 lg:max-w-[470px] lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none">
    <p className="mb-4 text-xs tracking-[0.16em] uppercase text-[#e6b66b]">AASOTU Media Group LLC · Ronald Lee King</p>
    <h1 id="landing-title" className="text-4xl leading-[1.08] text-[#f5eee3] sm:text-5xl">Independent voice.<br/>A world to explore.</h1>
    <p className="mt-4 text-base leading-relaxed text-[#d4c8b6]">Welcome to #TheKingsTake. News, research, conversations and the work behind the words.</p>
    <Link to="/feed" className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#e6b66b] px-6 font-semibold text-[#101c2b] hover:bg-[#f1c986]">Enter the Feed <ArrowRight size={17}/></Link>
    <nav aria-label="Discover The King's Take" className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">
     {destinations.map(({to,title,detail,icon:Icon})=><Link key={to} to={to} className="flex min-h-16 items-center gap-3 rounded-2xl border border-white/10 bg-[#132235]/85 p-3 transition-colors hover:border-[#e6b66b]/60"><Icon size={19} className="shrink-0 text-[#e6b66b]"/><span><span className="block text-sm text-[#f5eee3]">{title}</span><span className="block text-xs text-[#c7bba9]">{detail}</span></span><ArrowRight size={14} className="ml-auto shrink-0 text-[#e6b66b]"/></Link>)}
    </nav>
    <Link to="/pre-order" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm text-[#e6b66b]"><BookOpen size={16}/> Discover my book <ArrowRight size={14}/></Link>
   </div>
  </div>
 </section>
}
