import { NolanRecordsCard } from '@/components/NolanRecordsCard';
import { Link } from "react-router";
import { ArrowRight, FileSearch, ShieldCheck } from "lucide-react";
import { trpc } from "@/providers/trpc";

export default function InvestigationsPage() {
  const { data: investigations = [], isLoading } = trpc.blog.list.useQuery({
    category: "INVESTIGATIONS",
    limit: 30,
  });

  return (
    <main className="relative isolate min-h-screen bg-[#14202E] px-6 pb-24 pt-28 text-[#F0EBE1] md:px-12">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[760px] bg-cover bg-center" style={{backgroundImage:"linear-gradient(180deg,rgba(16,27,40,.25),#14202E),url(/images/investigations-noir-20261015.webp)"}}/>
      <section className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-3xl">
          <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#FFB840]">
            <FileSearch size={16} /> The King's Take Investigations
          </div>
          <h1 className="mb-5 text-4xl leading-tight md:text-6xl">Documents, timelines and public-interest research</h1>
          <p className="text-lg leading-relaxed text-[#C9B99A]">
            Follow the records. Examine the timeline. Ask the questions that still need answers. Independent reporting, source documents and the details behind the headline.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-xs text-emerald-200">
            <ShieldCheck size={15} /> Source limitations and corrections are shown with every report
          </div>
        </div>

        <p className="text-xs text-[#C9B99A]">Background: original AI-assisted editorial artwork, not case evidence.</p>
        <NolanRecordsCard />
        {isLoading ? (
          <div className="rounded-xl border border-white/10 bg-[#1b2a3a] p-8 text-[#C9B99A]">Loading investigations…</div>
        ) : investigations.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-[#1b2a3a] p-8 text-[#C9B99A]">Explore the Nolan Wells document collection above. Further reports will appear here.</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {investigations.map((post) => (
              <article key={post.id} className="flex min-h-72 flex-col rounded-2xl border border-[#FF9500]/20 bg-[#1b2a3a] p-7 shadow-2xl shadow-black/10">
                {post.coverImage&&<img src={post.coverImage} alt="" loading="lazy" className="mb-5 aspect-video w-full rounded-lg object-cover"/>}
                <p className="mb-4 text-xs uppercase tracking-[0.16em] text-[#FF9500]">Research report</p>
                <h2 className="mb-4 text-2xl leading-snug text-[#F0EBE1]">{post.title}</h2>
                <p className="mb-7 flex-1 leading-relaxed text-[#C9B99A]">{post.excerpt}</p>
                <Link to={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-[#FFB840] hover:text-[#FF9500]">
                  Read the documented report <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
