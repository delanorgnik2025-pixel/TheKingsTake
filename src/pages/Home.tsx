import { Link } from 'react-router'
import { trpc } from '../providers/trpc'
import ClassicHome from './ClassicHome'
import NoirHeroSection from '../sections/NoirHeroSection'
import HeroSection from '../sections/HeroSection'
import FeedSection from '../sections/FeedSection'
import NewsTicker from '../components/NewsTicker'
import HeritageSection from '../sections/HeritageSection'
import ResearchPreview from '../components/ResearchPreview'
import AncestryResearchSection from '../sections/AncestryResearchSection'
import AboutSection from '../sections/AboutSection'
import ServicesSection from '../sections/ServicesSection'
import WritingMarketSection from '../sections/WritingMarketSection'
import ContactSection from '../sections/ContactSection'
export default function HomePage() {
 const design = trpc.design.landing.useQuery(undefined, { staleTime: 0, retry: 1 })
 if (design.isLoading) return <main className="min-h-screen bg-[#0b1420]" aria-busy="true"/>
 if (design.data?.template === 'classic') return <ClassicHome/>
 return <main className="bg-[#0b1420]">
  <NewsTicker/><NoirHeroSection/><FeedSection/>
  <section className="mx-auto max-w-6xl px-5 py-10"><div className="flex flex-col gap-5 rounded-3xl border border-[#e6b66b]/20 bg-[#142235] p-6 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xs uppercase tracking-widest text-[#e6b66b]">Community initiative</p><h2 className="mt-2 text-2xl text-[#f5eee3]">Know the mission. Choose to take part.</h2><p className="mt-2 max-w-xl text-sm text-[#d4c8b6]">Read the purpose behind the Foundational Black American petition and decide whether to add your voice.</p></div><Link to="/petition" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full border border-[#e6b66b]/50 px-6 text-[#e6b66b]">Explore the petition</Link></div></section>
  <HeroSection/><ResearchPreview tool="globe"><HeritageSection/></ResearchPreview><AncestryResearchSection/><AboutSection/><ServicesSection/><WritingMarketSection/><ContactSection/>
 </main>
}
