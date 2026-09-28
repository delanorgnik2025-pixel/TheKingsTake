import { Link } from "react-router";
import { ArrowRight, CloudLightning, FileSearch, Globe2, Landmark, Radio, ShieldCheck } from "lucide-react";
import { trpc } from "@/providers/trpc";

const beats = [
  { id: "weather", label: "Breaking Weather", detail: "Major U.S. storms, flooding, emergencies and official alerts.", icon: CloudLightning },
  { id: "us-conflicts", label: "U.S. Conflicts", detail: "American military action, war-powers decisions and foreign-policy consequences.", icon: ShieldCheck },
  { id: "gaza-israel", label: "Gaza & Israel", detail: "Civilian impact, diplomacy, military developments and primary-source statements.", icon: Landmark },
  { id: "ukraine", label: "Ukraine", detail: "Battlefield, diplomatic, humanitarian and U.S. policy developments.", icon: Globe2 },
  { id: "sahel", label: "Burkina Faso & the Sahel", detail: "Ibrahim Traoré, regional alliances, governance and competing claims about sovereignty.", icon: Radio },
  { id: "africa", label: "Africa & Decolonization", detail: "Movements challenging colonial institutions, foreign control and extractive systems.", icon: FileSearch },
] as const;

export default function NewsHubPage() {
  const { data: posts = [], isLoading } = trpc.blog.list.useQuery({ limit: 50 });
  const news = posts.filter(post => post.category === "DAILY NEWS" || post.category === "INVESTIGATIONS");
  const lead = news[0];

  return (
    <main className="min-h-screen bg-[#101b28] pb-24 pt-16 text-[#F0EBE1]">
      <header className="border-b border-[#FF9500]/20 bg-[#182635] px-6 py-14 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-5 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[#FF9500]"><Radio size={16}/> The People&apos;s Newsroom</div>
          <div className="grid gap-8 lg:grid-cols-[1.25fr_.75fr] lg:items-end">
            <div><h1 className="text-5xl leading-none md:text-7xl">The King&apos;s News Hub</h1><p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#C9B99A]">Breaking news, public records and global developments—reported with visible sourcing, clear uncertainty and a distinction between documented fact and analysis.</p></div>
            <div className="rounded-xl border border-emerald-300/20 bg-emerald-300/[0.06] p-5 text-sm leading-relaxed text-[#C9B99A]"><strong className="text-emerald-200">Editorial standard:</strong> at least two independent sources where available, primary records prioritized, image credits displayed, and no automated publication without approval.</div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-12 md:px-12">
        {isLoading ? <p className="text-[#C9B99A]">Loading the newsroom…</p> : lead ? (
          <article className="grid overflow-hidden rounded-2xl border border-[#FF9500]/25 bg-[#1b2a3a] lg:grid-cols-[1.1fr_.9fr]">
            <div className="min-h-72 bg-gradient-to-br from-[#283d55] via-[#182635] to-[#0b121d] p-8 md:p-12"><p className="text-xs uppercase tracking-[0.18em] text-[#FF9500]">Lead report · {lead.category}</p><h2 className="mt-5 text-3xl leading-tight md:text-5xl">{lead.title}</h2><p className="mt-5 leading-relaxed text-[#C9B99A]">{lead.excerpt}</p><Link to={`/blog/${lead.slug}`} className="mt-8 inline-flex items-center gap-2 rounded bg-[#FF9500] px-5 py-3 text-sm font-bold text-[#101b28]">Read the full report <ArrowRight size={16}/></Link></div>
            <div className="min-h-72 bg-cover bg-center" style={lead.coverImage ? { backgroundImage: `linear-gradient(rgba(16,27,40,.18),rgba(16,27,40,.55)),url(${lead.coverImage})` } : { background: "radial-gradient(circle at 70% 25%, rgba(255,149,0,.28), transparent 32%), linear-gradient(145deg,#25364b,#0e1722)" }} />
          </article>
        ) : <div className="rounded-xl border border-white/10 bg-[#182635] p-8 text-[#C9B99A]">The first sourced report is being prepared for publication.</div>}
      </section>

      <section className="mx-auto max-w-7xl px-6 py-6 md:px-12">
        <div className="mb-7 flex items-end justify-between gap-4"><div><p className="text-xs uppercase tracking-[0.18em] text-[#FF9500]">Daily coverage desk</p><h2 className="mt-2 text-3xl">Six continuing news beats</h2></div><Link to="/investigations" className="hidden text-sm text-[#FFB840] hover:text-[#FF9500] sm:inline">View Investigations →</Link></div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {beats.map(beat => <article id={beat.id} key={beat.id} className="scroll-mt-24 rounded-xl border border-white/10 bg-[#182635] p-6"><beat.icon className="text-[#FF9500]" size={23}/><h3 className="mt-5 text-xl">{beat.label}</h3><p className="mt-3 text-sm leading-relaxed text-[#C9B99A]">{beat.detail}</p><p className="mt-5 text-[10px] uppercase tracking-[0.16em] text-[#C9B99A]/50">Daily sourced article · approval required</p></article>)}
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-7xl border-t border-white/10 px-6 pt-10 md:px-12">
        <h2 className="text-3xl">Latest published reporting</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {news.map(post => <article key={post.id} className="rounded-xl border border-white/10 bg-[#182635] p-6"><p className="text-[10px] uppercase tracking-[0.15em] text-[#FF9500]">{post.category}</p><h3 className="mt-3 text-xl leading-snug">{post.title}</h3><p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#C9B99A]">{post.excerpt}</p><Link to={`/blog/${post.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm text-[#FFB840]">Continue reading <ArrowRight size={14}/></Link></article>)}
        </div>
      </section>
    </main>
  );
}
