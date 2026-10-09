import { Link, Navigate, useParams } from "react-router";
import { ArrowLeft, ArrowRight, CloudLightning, Cpu, Globe2, Landmark, Leaf, Scale, Mic2 } from "lucide-react";
import { NEWS_SECTIONS } from "@contracts/news-sections";
import { trpc } from "@/providers/trpc";

const icons = {
  "hip-hop": Mic2,
  "crime-justice": Scale,
  "ai-tech": Cpu,
  "world-affairs": Globe2,
  "weather-safety": CloudLightning,
  "africa-sovereignty": Landmark,
  "science-earth": Leaf,
};

export default function NewsSectionPage() {
  const { sectionId } = useParams<{ sectionId: string }>();
  const section = NEWS_SECTIONS.find(item => item.id === sectionId);
  const { data: posts = [], isLoading } = trpc.blog.list.useQuery({ limit: 200 });
  if (sectionId === "hip-hop") return <Navigate to="/hip-hop" replace />;
  if (!section) return <Navigate to="/news-hub" replace />;

  const stories = posts
    .filter(post => post.category === "DAILY NEWS" && post.newsBeat && section.beats.includes(post.newsBeat as any))
    .sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const lead = stories[0];
  const secondary = stories.slice(1,5);
  const archive = stories.slice(5);
  const Icon = icons[section.id];

  return (
    <main className="min-h-screen bg-[#101b28] pb-24 pt-16 text-[#F0EBE1]">
      <header className="border-b border-white/10 bg-[#182635] px-6 py-12 md:px-12">
        <div className="mx-auto max-w-7xl">
          <Link to="/news-hub" className="inline-flex items-center gap-2 text-sm text-[#C9B99A] hover:text-[#FFB840]"><ArrowLeft size={15}/> News Hub</Link>
          <div className="mt-8 flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#FF9500]/25 bg-[#FF9500]/[0.07]"><Icon className="text-[#FF9500]" size={22}/></div>
            <div><p className="text-[10px] uppercase tracking-[0.22em] text-[#C9B99A]/60">{section.kicker}</p><h1 className="mt-1 text-4xl md:text-6xl">{section.label}</h1><p className="mt-4 max-w-3xl text-lg leading-relaxed text-[#C9B99A]">{section.detail}</p></div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10 md:px-12">
        {isLoading ? <p className="text-[#C9B99A]">Loading section…</p> : lead ? (
          <div className="grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
            <Link to={`/blog/${lead.slug}`} className="group overflow-hidden rounded-3xl border border-[#FF9500]/20 bg-[#182635]">
              {lead.coverImage && <img src={lead.coverImage} alt="" className="aspect-[16/8] w-full object-cover transition duration-500 group-hover:scale-[1.01]" />}
              <div className="p-7 md:p-9"><p className="text-[10px] uppercase tracking-[0.2em] text-[#FF9500]">Section lead</p><h2 className="mt-3 text-3xl leading-tight md:text-4xl">{lead.title}</h2><p className="mt-4 max-w-3xl text-[#C9B99A]">{lead.excerpt}</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#FFB840]">Read full report <ArrowRight size={14}/></span></div>
            </Link>
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#182635]">
              <div className="border-b border-white/10 px-6 py-4"><p className="text-[10px] uppercase tracking-[0.2em] text-[#C9B99A]/60">Also in {section.label}</p></div>
              <div className="divide-y divide-white/10">
                {secondary.map(story => <Link key={story.id} to={`/blog/${story.slug}`} className="block p-6 hover:bg-white/[0.02]"><h3 className="text-xl leading-snug">{story.title}</h3><p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#C9B99A]">{story.excerpt}</p></Link>)}
                {secondary.length === 0 && <p className="p-6 text-sm text-[#C9B99A]">More approved stories will appear here.</p>}
              </div>
            </div>
          </div>
        ) : <div className="rounded-3xl border border-dashed border-white/10 p-8 text-[#C9B99A]">This section is waiting on its first approved story.</div>}
      </section>

      {archive.length > 0 && <section className="mx-auto max-w-7xl px-6 py-4 md:px-12"><div className="mb-5 flex items-end justify-between"><div><p className="text-[10px] uppercase tracking-[0.2em] text-[#FF9500]">More reporting</p><h2 className="mt-2 text-2xl">From the archive</h2></div></div><div className="overflow-hidden rounded-3xl border border-white/10 bg-[#182635]">{archive.map((story,index)=><Link key={story.id} to={`/blog/${story.slug}`} className="grid gap-4 border-b border-white/10 p-6 last:border-b-0 md:grid-cols-[90px_1fr_auto] md:items-center"><span className="text-xs text-[#C9B99A]/45">{String(index+1).padStart(2,"0")}</span><div><h3 className="text-lg">{story.title}</h3><p className="mt-1 line-clamp-1 text-sm text-[#C9B99A]">{story.excerpt}</p></div><span className="text-sm text-[#FFB840]">Read →</span></Link>)}</div></section>}
    </main>
  );
}
