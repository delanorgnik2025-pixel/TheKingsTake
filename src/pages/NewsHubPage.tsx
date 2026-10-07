import { NolanRecordsCard } from '@/components/NolanRecordsCard';
import { Link, useSearchParams } from "react-router";
import { ArrowRight, ChevronDown, Radio, ShieldCheck, Cpu, Globe2, CloudLightning, Landmark, Leaf } from "lucide-react";
import { NEWS_IMAGES, newsImageForUrl } from "@contracts/news-images";
import { NEWS_BEATS } from "@contracts/news-beats";
import { NEWS_SECTIONS } from "@contracts/news-sections";
import { trpc } from "@/providers/trpc";

const sectionIcons = {
  "ai-tech": Cpu,
  "world-affairs": Globe2,
  "weather-safety": CloudLightning,
  "africa-sovereignty": Landmark,
  "science-earth": Leaf,
};

export default function NewsHubPage() {
  const [params] = useSearchParams();
  const selectedSection = NEWS_SECTIONS.find(section => section.id === params.get("section"));
  const { data: posts = [], isLoading } = trpc.blog.list.useQuery({ limit: 200 });
  const news = posts.filter(post => post.category === "DAILY NEWS" || post.category === "INVESTIGATIONS");
  const sectionPosts = (section: typeof NEWS_SECTIONS[number]) => news.filter(post => post.newsBeat && section.beats.includes(post.newsBeat as any));
  const visible = selectedSection ? sectionPosts(selectedSection) : news;
  const lead = selectedSection ? visible[0] : news.find(post => post.category === "INVESTIGATIONS") || news[0];

  return (
    <main className="min-h-screen bg-[#101b28] pb-24 pt-16 text-[#F0EBE1]">
      <header className="border-b border-[#FF9500]/20 bg-[#182635] px-6 py-14 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-5 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[#FF9500]"><Radio size={16}/> The People&apos;s Newsroom</div>
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-4xl">
              <h1 className="text-5xl leading-none md:text-7xl">The King&apos;s News Hub</h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#C9B99A]">Independent reporting, public records and current developments—organized by editorial section, not by the machinery behind the newsroom.</p>
            </div>
            <div className="rounded-2xl border border-emerald-300/15 bg-emerald-300/[0.05] px-4 py-3 text-xs leading-relaxed text-[#C9B99A]">
              <span className="font-bold uppercase tracking-[0.18em] text-emerald-300">Editorial standard</span><br/>Primary records first. Claims attributed. Uncertainty shown.
            </div>
          </div>
          <details className="group mt-7 max-w-3xl border-t border-white/10 pt-4 text-sm text-[#C9B99A]">
            <summary className="flex cursor-pointer list-none items-center gap-2 text-[#E8DFC9] marker:hidden">
              <ShieldCheck size={16} className="text-emerald-300" />
              <span>How we report</span>
              <ChevronDown size={15} className="transition-transform group-open:rotate-180" />
            </summary>
            <p className="mt-3 max-w-2xl leading-relaxed">We seek at least two independent sources where available, prioritize primary records, display image credits and require editorial approval before publication. Investigative reporting clearly separates documented facts, witness accounts, analysis and unresolved questions.</p>
          </details>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-12 md:px-12">
        <NolanRecordsCard />
        {isLoading ? <p className="text-[#C9B99A]">Loading the newsroom…</p> : lead ? (
          <article className="grid overflow-hidden rounded-3xl border border-[#FF9500]/20 bg-[#1b2a3a] shadow-[0_24px_80px_rgba(0,0,0,.18)] lg:grid-cols-[1.05fr_.95fr]">
            <div className="min-h-72 bg-gradient-to-br from-[#283d55] via-[#182635] to-[#0b121d] p-8 md:p-12">
              <p className="text-xs uppercase tracking-[0.18em] text-[#FF9500]">{selectedSection?.label || "Lead report"} · {lead.category}</p>
              <h2 className="mt-5 text-3xl leading-tight md:text-5xl">{lead.title}</h2>
              <p className="mt-5 max-w-2xl leading-relaxed text-[#C9B99A]">{lead.excerpt}</p>
              <Link to={`/blog/${lead.slug}`} className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#FF9500] px-6 py-3 text-sm font-bold text-[#101b28]">Read the full report <ArrowRight size={16}/></Link>
            </div>
            <div className="flex min-h-80 flex-col">
              <div className="flex-1 bg-cover bg-center" style={lead.coverImage ? { backgroundImage: `linear-gradient(rgba(16,27,40,.08),rgba(16,27,40,.35)),url(${lead.coverImage})` } : { background: "radial-gradient(circle at 70% 25%, rgba(255,149,0,.28), transparent 32%), linear-gradient(145deg,#25364b,#0e1722)" }} />
              {newsImageForUrl(lead.coverImage) && <p className="px-5 py-3 text-xs leading-relaxed text-[#C9B99A]">{newsImageForUrl(lead.coverImage)?.caption}</p>}
            </div>
          </article>
        ) : <div className="rounded-2xl border border-white/10 bg-[#182635] p-8 text-[#C9B99A]">The first sourced report is being prepared for publication.</div>}
      </section>

      <section className="mx-auto max-w-7xl px-6 py-6 md:px-12">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[#D99127]">Newsroom sections</p>
            <h2 className="mt-2 text-3xl md:text-4xl">Choose a desk with its own point of view.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#C9B99A]">The research system still tracks detailed beats behind the scenes. Readers see broader editorial sections that feel intentional, distinct and easier to navigate.</p>
          </div>
          <Link to="/investigations" className="text-sm text-[#FFB840] hover:text-[#FF9500]">View Investigations →</Link>
        </div>

        <div className="space-y-7">
          {NEWS_SECTIONS.map((section, index) => {
            const stories = sectionPosts(section);
            const first = stories[0];
            const Icon = sectionIcons[section.id];
            const active = selectedSection?.id === section.id;
            return (
              <section key={section.id} className={`overflow-hidden rounded-3xl border bg-[#182635] transition ${active ? "border-[#FF9500]/80" : "border-white/10"}`}>
                <div className="grid lg:grid-cols-[.82fr_1.18fr]">
                  <div className="border-b border-white/10 p-7 lg:border-b-0 lg:border-r lg:p-9">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#FF9500]/25 bg-[#FF9500]/[0.07]"><Icon size={21} className="text-[#FF9500]"/></div>
                      <div><p className="text-[10px] uppercase tracking-[0.2em] text-[#C9B99A]/65">{section.kicker}</p><h3 className="mt-1 text-2xl">{section.label}</h3></div>
                    </div>
                    <p className="mt-5 text-sm leading-relaxed text-[#C9B99A]">{section.detail}</p>
                    <Link to={`/news-hub?section=${section.id}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#FFB840]">Open this section <ArrowRight size={14}/></Link>
                    <p className="mt-4 text-[10px] uppercase tracking-[0.15em] text-[#C9B99A]/45">{stories.length} published stor{stories.length === 1 ? "y" : "ies"}</p>
                  </div>
                  <div className="p-5 md:p-7">
                    {first ? (
                      <div className="grid gap-5 md:grid-cols-[.95fr_1.05fr]">
                        <Link to={`/blog/${first.slug}`} className="group block overflow-hidden rounded-2xl border border-white/10 bg-[#101b28]">
                          {first.coverImage ? <img src={first.coverImage} alt="" className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-[1.02]" /> : <div className="aspect-[16/10] bg-gradient-to-br from-[#24364a] to-[#0c151f]"/>}
                          <div className="p-5"><p className="text-[10px] uppercase tracking-[0.15em] text-[#FF9500]">Latest in {section.label}</p><h4 className="mt-2 text-xl leading-snug">{first.title}</h4><p className="mt-3 line-clamp-2 text-sm leading-relaxed text-[#C9B99A]">{first.excerpt}</p></div>
                        </Link>
                        <div className="divide-y divide-white/10">
                          {stories.slice(1,4).map(story => (
                            <Link key={story.id} to={`/blog/${story.slug}`} className="group block py-4 first:pt-0 last:pb-0">
                              <p className="text-[9px] uppercase tracking-[0.14em] text-[#C9B99A]/50">{story.category}</p>
                              <h4 className="mt-1 text-lg leading-snug group-hover:text-[#FFB840]">{story.title}</h4>
                              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#C9B99A]">{story.excerpt}</p>
                            </Link>
                          ))}
                          {stories.length === 1 && <div className="rounded-2xl border border-dashed border-white/10 p-5 text-sm leading-relaxed text-[#C9B99A]/70">More reporting will populate this section as stories are approved. The section identity remains stable even while individual headlines change.</div>}
                        </div>
                      </div>
                    ) : <div className="rounded-2xl border border-dashed border-white/10 p-7 text-[#C9B99A]">Reporting for this section is awaiting editorial approval.</div>}
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </section>

      {selectedSection && (
        <section className="mx-auto mt-12 max-w-7xl border-t border-white/10 px-6 pt-10 md:px-12">
          <div className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-xs uppercase tracking-[0.18em] text-[#FF9500]">Section archive</p><h2 className="mt-2 text-3xl">{selectedSection.label}</h2></div><Link to="/news-hub" className="text-sm text-[#FFB840]">All newsroom sections →</Link></div>
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {visible.map(post => <article key={post.id} className="overflow-hidden rounded-2xl border border-white/10 bg-[#182635]">
              {post.coverImage && <Link to={`/blog/${post.slug}`} className="block overflow-hidden"><img src={post.coverImage} alt="" className="aspect-[16/9] w-full object-cover transition-transform duration-500 hover:scale-[1.025]" loading="lazy" /></Link>}
              <div className="p-6"><p className="text-[10px] uppercase tracking-[0.15em] text-[#FF9500]">{post.category}</p><h3 className="mt-3 text-xl leading-snug">{post.title}</h3><p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#C9B99A]">{post.excerpt}</p><Link to={`/blog/${post.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm text-[#FFB840]">Continue reading <ArrowRight size={14}/></Link></div>
            </article>)}
          </div>
        </section>
      )}
    </main>
  );
}
