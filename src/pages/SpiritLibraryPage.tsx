import {Link,useParams} from 'react-router';
import {SPIRIT_LIBRARY,spiritEntry} from '@contracts/spirit-library';
import {ArrowLeft,ArrowRight,Sparkles} from 'lucide-react';
export default function SpiritLibraryPage(){
 const {entrySlug}=useParams();const entry=spiritEntry(entrySlug);
 return <main className="relative isolate min-h-screen overflow-hidden bg-[#0d1523] px-6 pb-24 pt-28 text-[#F0EBE1] md:px-12">
  <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[850px] bg-cover bg-center opacity-50" style={{backgroundImage:'linear-gradient(180deg,transparent,#0d1523),url(/images/cosmic-bg.jpg)'}}/>
  <div className="mx-auto max-w-6xl">
   <Link to={entry?'/spirit-and-symbol':'/news-hub'} className="inline-flex items-center gap-2 text-sm text-[#C9B99A]"><ArrowLeft size={16}/>{entry?'Spirit & Symbol':'News Hub'}</Link>
   {entrySlug&&!entry?<section className="py-16"><h1 className="text-4xl">Reading not found</h1><Link to="/spirit-and-symbol" className="mt-6 inline-block text-[#FFB840]">Explore the library →</Link></section>:entry?<article className="mx-auto mt-12 max-w-3xl">
    <p className="text-xs uppercase tracking-[.2em] text-[#FFB840]">{entry.label}</p><h1 className="mt-5 text-4xl leading-tight md:text-6xl">{entry.title}</h1><p className="my-8 border-l-2 border-[#FFB840] pl-5 text-xl leading-relaxed text-[#C9B99A]">{entry.intro}</p>
    <p className="mb-8 text-xs text-[#C9B99A]">AASOTU Media Group LLC / #TheKingsTake · Cultural reading · October 15, 2026</p>
    <div className="rounded-2xl border border-[#FFB840]/20 bg-[#14202e]/95 p-6 md:p-9">{entry.paragraphs.map(text=><p key={text} className="mb-6 text-lg leading-relaxed last:mb-0">{text}</p>)}</div>
    <h2 className="mb-4 mt-10 text-2xl">Read the sources</h2><ul className="space-y-4">{entry.sources.map(source=><li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer" className="text-[#FFB840] underline underline-offset-4">{source.title} ↗</a></li>)}</ul>
   </article>:<>
    <header className="max-w-4xl py-14"><p className="flex items-center gap-2 text-xs uppercase tracking-[.24em] text-[#FFB840]"><Sparkles size={16}/> The King’s Take · Beyond the surface</p><h1 className="mt-6 text-5xl md:text-7xl">Spirit & Symbol</h1><p className="mt-6 max-w-2xl text-xl leading-relaxed text-[#E2D4B9]">Ancestral knowledge. Hidden books. The stories inside the symbols.</p><p className="mt-5 max-w-2xl leading-relaxed text-[#C9B99A]">Explore living traditions, historical manuscripts and the imagination that connects them. Each reading names its tradition and its sources. Belief, interpretation and fiction have their own place here.</p></header>
    <div className="grid gap-5 md:grid-cols-2">{SPIRIT_LIBRARY.map(item=><Link key={item.slug} to={`/spirit-and-symbol/${item.slug}`} className="group rounded-2xl border border-[#C49746]/30 bg-[#14202e]/95 p-7 transition hover:border-[#FFB840]"><span aria-hidden="true" className="text-4xl text-[#FFB840]">{item.symbol}</span><p className="mt-6 text-[10px] uppercase tracking-[.15em] text-[#C9B99A]">{item.label}</p><h2 className="mt-3 text-2xl">{item.title}</h2><p className="mt-4 leading-relaxed text-[#C9B99A]">{item.intro}</p><span className="mt-6 inline-flex items-center gap-2 text-sm text-[#FFB840]">Open the reading <ArrowRight size={15}/></span></Link>)}</div>
   </>}
   <section className="mx-auto mt-14 max-w-4xl rounded-2xl border border-[#FFB840]/30 bg-[#14202e] p-7"><p className="text-xs uppercase tracking-[.18em] text-[#FFB840]">The King’s Almanac · Subscriber Feed</p><h2 className="mt-3 text-3xl">A daily moment to reflect.</h2><p className="mt-4 leading-relaxed text-[#C9B99A]">Daily zodiac reflections for all twelve signs, plus a rotating reading from this library. Original entertainment and journal prompts, not personalized predictions or computed planetary transits. Find each dated edition inside the private Feed.</p><Link to="/feed" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#FFB840] px-6 py-3 font-semibold text-[#101b28]">Enter the subscriber Feed <ArrowRight size={16}/></Link></section>
  </div>
 </main>;
}
