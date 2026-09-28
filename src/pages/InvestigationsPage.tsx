import { Link } from "react-router";
import { ArrowRight, FileSearch, ShieldCheck } from "lucide-react";
import { trpc } from "@/providers/trpc";

export default function InvestigationsPage() {
  const { data: investigations = [], isLoading } = trpc.blog.list.useQuery({
    category: "INVESTIGATIONS",
    limit: 30,
  });

  return (
    <main className="min-h-screen bg-[#14202E] px-6 pb-24 pt-28 text-[#F0EBE1] md:px-12">
      <section className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-3xl">
          <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#FFB840]">
            <FileSearch size={16} /> The King's Take Investigations
          </div>
          <h1 className="mb-5 text-4xl leading-tight md:text-6xl">Documents, timelines and public-interest research</h1>
          <p className="text-lg leading-relaxed text-[#C9B99A]">
            A separate home for evidence-led reporting. Each report distinguishes documented records,
            researcher-supplied context and unresolved questions so readers can inspect the basis for the work.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-xs text-emerald-200">
            <ShieldCheck size={15} /> Source limitations and corrections are shown with every report
          </div>
        </div>

        {isLoading ? (
          <div className="rounded-xl border border-white/10 bg-[#1b2a3a] p-8 text-[#C9B99A]">Loading investigations…</div>
        ) : investigations.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-[#1b2a3a] p-8 text-[#C9B99A]">The first investigation is being prepared.</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {investigations.map((post) => (
              <article key={post.id} className="flex min-h-72 flex-col rounded-2xl border border-[#FF9500]/20 bg-[#1b2a3a] p-7 shadow-2xl shadow-black/10">
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
