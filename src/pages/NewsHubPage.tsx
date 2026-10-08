import { NolanRecordsCard } from '@/components/NolanRecordsCard';
import { Link } from "react-router";
import { ArrowRight, ChevronDown, Radio, ShieldCheck } from "lucide-react";
import { NEWS_SECTIONS } from "@contracts/news-sections";
import { trpc } from "@/providers/trpc";

export default function NewsHubPage() {
  const { data: posts = [], isLoading } = trpc.blog.list.useQuery({ limit: 200 });
  const news = posts
    .filter(post => post.category === "DAILY NEWS" || post.category === "INVESTIGATIONS")
    .sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const lead = news[0];
  const eyeGrabbers = news.slice(1,4);
  const recent = news.slice(4,10);

  return (
    <main className="min-h-screen bg-[#101b28] pb-24 pt-16 text-[#F0EBE1]">
      <header className="border-b border-[#FF9500]/20 bg-[#182635] px-6 py-12 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-5 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[#FF9500]"><Radio size={16}/> The People&apos;s Newsroom</div>
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div><h1 className="text-5xl leading-none md:text-7xl">The King&apos;s News Hub</h1><p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#C9B99A]">A daily front page for the stories that matter most now, with dedicated section pages for deeper coverage.</p></div>
            <div className="rounded-2xl border border-emerald-300/15 bg-emerald-300/[0.05] px-4 py-3 text-xs leading-relaxed text-[#C9B99A]"><span className="font-bold uppercase tracking-[0.18em] text-emerald-300">Editorial standard</span><br/>Primary records first. Claims attributed. Uncertainty shown.</div>
          </div>
          <details className="group mt-7 max-w-3xl border-t border-white/10 pt-4 text-sm text-[#C9B99A]"><summary className="flex cursor-pointer list-none items-center gap-2 text-[#E8DFC9] marker:hidden"><ShieldCheck size={16} className="text-emerald-300"/><span>How we report</span><ChevronDown size={15} className="transition-transform group-open:rotate-180"/></summary><p className="mt-3 max-w-2xl leading-relaxed">We seek at least two independent sources where available, prioritize primary records, display image credits and require editorial approval before publication.</p></details>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10 md:px-12">
        {isLoading ? <p className="text-[#C9B99A]">Loading today&apos;s front page…</p> : lead ? (
          <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
            <Link to={`/blog/${lead.slug}`} className="group overflow-hidden rounded-3xl border border-[#FF9500]/20 bg-[#182635]">
              {lead.coverImage && <img src={lead.coverImage} alt="" className="aspect-[16/8] w-full object-cover transition duration-500 group-hover:scale-[1.01]" />}
              <div className="p-7 md:p-9"><p className="text-[10px] uppercase tracking-[0.2em] text-[#FF9500]">Today&apos;s lead</p><h2 className="mt-3 text-3xl leading-tight md:text-5xl">{lead.title}</h2><p className="mt-4 max-w-3xl text-lg leading-relaxed text-[#C9B99A]">{lead.excerpt}</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#FFB840]">Read the full report <ArrowRight size={14}/></span></div>
            </Link>
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#182635]">
              <div className="border-b border-white/10 px-6 py-4"><p className="text-[10px] uppercase tracking-[0.2em] text-[#C9B99A]/60">Eye grabbers</p></div>
              <div className="divide-y divide-white/10">{eyeGrabbers.map(story=><Link key={story.id} to={`/blog/${story.slug}`} className="block p-6 hover:bg-white/[0.02]"><p className="text-[9px] uppercase tracking-[0.14em] text-[#FF9500]">{story.category}</p><h3 className="mt-2 text-xl leading-snug">{story.title}</h3><p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#C9B99A]">{story.excerpt}</p></Link>)}</div>
            </div>
          </div>
        ) : <div className="rounded-3xl border border-dashed border-white/10 p-8 text-[#C9B99A]">Today&apos;s front page is being prepared.</div>}
      </section>

      <section className="mx-auto max-w-7xl px-6 py-4 md:px-12">
        <div className="mb-6"><p className="text-xs uppercase tracking-[0.18em] text-[#D99127]">Sections</p><h2 className="mt-2 text-3xl">Go deeper by desk.</h2></div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {NEWS_SECTIONS.map(section => {
            const count=news.filter(post=>post.newsBeat && section.beats.includes(post.newsBeat as any)).length;
            return <Link key={section.id} to={`/news-hub/${section.id}`} className="rounded-3xl border border-white/10 bg-[#182635] p-6 transition hover:-translate-y-0.5 hover:border-[#FF9500]/45"><p className="text-[9px] uppercase tracking-[0.18em] text-[#C9B99A]/55">{section.kicker}</p><h3 className="mt-2 text-xl">{section.label}</h3><p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#C9B99A]">{section.detail}</p><div className="mt-5 flex items-center justify-between text-sm text-[#FFB840]"><span>{count} stories</span><ArrowRight size={14}/></div></Link>
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 md:px-12">
        <div className="grid gap-6 lg:grid-cols-[1fr_.75fr]">
          <div>
            <div className="mb-5 flex items-end justify-between"><div><p className="text-[10px] uppercase tracking-[0.2em] text-[#FF9500]">Latest reporting</p><h2 className="mt-2 text-2xl">Recent stories</h2></div></div>
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#182635]">{recent.map((story,index)=><Link key={story.id} to={`/blog/${story.slug}`} className="grid gap-4 border-b border-white/10 p-5 last:border-b-0 md:grid-cols-[70px_1fr_auto] md:items-center"><span className="text-xs text-[#C9B99A]/45">{String(index+1).padStart(2,"0")}</span><div><h3 className="text-lg">{story.title}</h3><p className="mt-1 line-clamp-1 text-sm text-[#C9B99A]">{story.excerpt}</p></div><span className="text-sm text-[#FFB840]">Read →</span></Link>)}</div>
          </div>
          <div>
            <p className="mb-5 text-[10px] uppercase tracking-[0.2em] text-[#FF9500]">Investigation spotlight</p>
            <NolanRecordsCard />
          </div>
        </div>
      </section>
    </main>
  );
}
