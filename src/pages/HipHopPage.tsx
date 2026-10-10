import { useState } from "react";
import { Link } from "react-router";
import { ArrowRight, AudioLines, Radio } from "lucide-react";
import { trpc } from "@/providers/trpc";
import CultureCityBackdrop from "@/components/CultureCityBackdrop";
import NewsMemberCTA from "@/components/NewsMemberCTA";

const filters = [{ id: "all", label: "All coverage" }, { id: "hip-hop", label: "Music & industry" }, { id: "creator-culture", label: "Black creators & Kick" }] as const;
const date = (value: Date | string) => new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "America/New_York" });
const desk = (beat: string | null) => beat === "creator-culture" ? "CREATOR CULTURE" : "HIP-HOP / INDUSTRY";

export default function HipHopPage() {
  const [filter, setFilter] = useState<string>("all");
  const music = trpc.blog.list.useQuery({ beat: "hip-hop", limit: 100 });
  const creators = trpc.blog.list.useQuery({ beat: "creator-culture", limit: 100 });
  const stories = [...(music.data ?? []), ...(creators.data ?? [])].sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const selected = stories.filter(story => filter === "all" || story.newsBeat === filter);
  const background = selected.filter(story => story.newsEdition === "2026-10-09-culture-launch");
  const [lead, ...rest] = selected.filter(story => story.newsEdition !== "2026-10-09-culture-launch");
  const loading = music.isLoading || creators.isLoading;
  const failed = music.isError || creators.isError;
  return <main className="relative isolate min-h-screen pb-20 pt-16 text-[#F0EBE1]">
    <CultureCityBackdrop />
    <header className="relative overflow-hidden border-b border-[#FFB840]/25 bg-[#09121d]/25">
      <div className="relative mx-auto grid max-w-7xl gap-8 px-6 py-12 md:px-12 md:py-16 lg:grid-cols-[1.3fr_.7fr] lg:items-end">
        <div><Link to="/news-hub" className="text-xs uppercase tracking-[.2em] text-[#C9B99A] hover:text-[#FFB840]">The King’s Take / Newsroom</Link>
          <p className="mb-5 mt-8 flex items-center gap-2 font-mono text-xs uppercase tracking-[.18em] text-[#FFB840]"><Radio size={15} /> Music. Streams. Culture.</p>
          <h1 className="text-5xl font-black uppercase leading-[.95] tracking-tight sm:text-6xl md:text-7xl">Hip-Hop <span className="text-[#FFB840]">&</span><br />Creator Culture</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#C9B99A]">The music, the moves and the people shaping entertainment. Hip-hop reporting, Black creators and the business behind the feed.</p>
        </div>
        <div className="border-l-2 border-[#FFB840] bg-[#09121d]/65 p-6 backdrop-blur-sm"><AudioLines className="mb-5 text-[#FFB840]" size={42} /><p className="font-mono text-xs uppercase tracking-[.18em] text-[#FFB840]">Inside the culture</p><p className="mt-3 text-2xl leading-tight">The city never sleeps.<br />Neither does the culture.</p><p className="mt-4 text-sm leading-relaxed text-[#C9B99A]">New voices. Big moves. Culture in motion. From the studio to the screen.</p><Link to="/feed" className="mt-5 inline-flex items-center gap-2 text-sm text-[#FFB840]">Join the conversation <ArrowRight size={15} /></Link></div>
      </div>
    </header>
    <div className="relative mx-auto max-w-7xl px-6 md:px-12">
      <nav aria-label="Coverage filters" className="flex flex-wrap gap-2 border-b border-white/10 py-6">{filters.map(item => <button key={item.id} onClick={() => setFilter(item.id)} aria-pressed={filter === item.id} className={`min-h-11 border px-4 py-2 font-mono text-xs uppercase tracking-wider transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FFB840] ${filter === item.id ? "border-[#FFB840] bg-[#FFB840] text-black" : "border-white/20 text-[#C9B99A] hover:border-[#FFB840]"}`}>{item.label}</button>)}</nav>
      {failed && <p role="alert" className="my-6 border border-[#FFB840]/40 p-4 text-[#C9B99A]">Some reports could not load. <button onClick={() => { void music.refetch(); void creators.refetch(); }} className="underline text-[#FFB840]">Try again</button></p>}
      {loading ? <p role="status" className="py-12 text-[#C9B99A]">Loading coverage…</p> : lead ? <section aria-label="Latest reporting" className={`grid gap-8 py-8 ${rest.length ? "lg:grid-cols-[1.4fr_.6fr]" : ""}`}>
        <article className="overflow-hidden border border-white/15 bg-[#14202E]"><Link to={`/blog/${lead.slug}`} className="group block">{lead.coverImage && <img src={lead.coverImage} alt="" className="aspect-[16/8] w-full object-cover" />}<div className="p-6 md:p-8"><div className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-wider"><span className="text-[#FFB840]">{desk(lead.newsBeat)}</span><time className="text-[#C9B99A]" dateTime={new Date(lead.createdAt).toISOString()}>{date(lead.createdAt)}</time></div><h2 className="mt-4 text-3xl leading-tight group-hover:text-[#FFB840] md:text-4xl">{lead.title}</h2><p className="mt-4 leading-relaxed text-[#C9B99A]">{lead.excerpt}</p><span className="mt-6 inline-flex items-center gap-2 text-sm text-[#FFB840]">Read the report <ArrowRight size={16} /></span></div></Link></article>
        {rest.length > 0 && <aside><h2 className="border-b border-[#FFB840]/40 pb-4 font-mono text-xs uppercase tracking-[.2em] text-[#FFB840]">The latest dispatches</h2>{rest.slice(0,4).map(story => <Link key={story.id} to={`/blog/${story.slug}`} className="block border-b border-white/15 py-6">{story.coverImage && <img src={story.coverImage} alt="" loading="lazy" className="mb-4 aspect-video w-full rounded-lg object-cover" />}<p className="font-mono text-[10px] uppercase tracking-wider text-[#C9B99A]">{desk(story.newsBeat)} / {date(story.createdAt)}</p><h3 className="mt-3 text-xl leading-snug hover:text-[#FFB840]">{story.title}</h3><p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#C9B99A]">{story.excerpt}</p></Link>)}{rest.length === 0 && <p className="py-6 text-sm text-[#C9B99A]">More sourced reports will appear here.</p>}</aside>}
      </section> : !failed && background.length === 0 && <p className="py-12 text-[#C9B99A]">No published reports in this coverage yet.</p>}
      {rest.length > 4 && <section aria-label="More coverage" className="grid gap-4 pb-8 md:grid-cols-2">{rest.slice(4).map(story => <Link key={story.id} to={`/blog/${story.slug}`} className="border border-white/15 bg-[#14202E] p-6"><p className="font-mono text-xs text-[#FFB840]">{date(story.createdAt)}</p><h2 className="mt-3 text-2xl">{story.title}</h2><p className="mt-3 text-sm text-[#C9B99A]">{story.excerpt}</p></Link>)}</section>}
      {background.length > 0 && <section aria-label="Background coverage" className="mb-10 border-t border-white/15 pt-8"><h2 className="font-mono text-xs uppercase tracking-[.2em] text-[#FFB840]">Background & archive</h2><div className="mt-5 grid gap-5 md:grid-cols-3">{background.map(story => <Link key={story.id} to={`/blog/${story.slug}`} className="overflow-hidden rounded-lg border border-white/15 bg-[#14202E]">{story.coverImage && <img src={story.coverImage} alt="" loading="lazy" className="aspect-video w-full object-cover" />}<div className="p-5"><p className="font-mono text-[10px] uppercase text-[#C9B99A]">Background / {desk(story.newsBeat)}</p><h3 className="mt-3 text-xl leading-snug text-[#F0EBE1]">{story.title}</h3></div></Link>)}</div></section>}
      <div className="border-t border-white/15 pt-8"><p className="font-mono text-xs uppercase tracking-[.18em] text-[#FFB840]">The conversation continues</p><p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#C9B99A]">Music, creators and the stories behind the headlines. Explore the reports, then bring your take to the community.</p><NewsMemberCTA /></div>
    </div>
  </main>;
}
