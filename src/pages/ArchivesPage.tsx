import { Link, useSearchParams } from "react-router";
import { ArrowLeft, Database, Map } from "lucide-react";
import { PublicArchiveSearch } from "../sections/AncestryResearchSection";

export default function ArchivesPage() {
  const [params] = useSearchParams();
  const query = params.get("q")?.trim() || "";
  const state = params.get("state")?.trim() || undefined;

  return (
    <main className="min-h-screen bg-[#101b28] px-4 pb-24 pt-24 text-[#F0EBE1] sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-[#C9B99A] hover:text-[#FF9500]">
            <ArrowLeft size={15} /> Home
          </Link>
          <Link to="/#heritage" className="inline-flex items-center gap-2 rounded-full border border-[#FF9500]/30 px-4 py-2 text-xs text-[#FFB840]">
            <Map size={14} /> Explore the heritage map
          </Link>
        </div>
        <header className="mb-8 border-b border-[#FF9500]/20 pb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#FF9500]/20 bg-[#FF9500]/10 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-[#FFB840]">
            <Database size={12} /> Public Archive Research
          </div>
          <h1 className="max-w-3xl text-4xl leading-tight sm:text-5xl" style={{ fontFamily: "Newsreader, serif" }}>
            Search the records. Follow the evidence.
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#C9B99A] sm:text-base">
            Search National Archives and Library of Congress catalog records without leaving The King&apos;s Take. Digitized NARA records open in our document viewer when the archive supplies usable files.
          </p>
        </header>
        <PublicArchiveSearch key={`${query}|${state || ""}`} initialQuery={query} stateName={state} />
      </div>
    </main>
  );
}
