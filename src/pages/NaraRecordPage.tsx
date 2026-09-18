import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, ChevronLeft, ChevronRight, ExternalLink, FileText, Loader2 } from "lucide-react";
import { trpc } from "@/providers/trpc";

type ViewerImageProps = {
  title: string;
  url: string;
  thumbnailUrl: string | null;
  recordUrl: string;
};

function ViewerImage({ title, url, thumbnailUrl, recordUrl }: ViewerImageProps) {
  const [source, setSource] = useState(url);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    setSource(url);
    setUnavailable(false);
  }, [url]);

  if (unavailable) {
    return (
      <div className="flex min-h-[55vh] max-w-xl flex-col items-center justify-center px-6 text-center">
        <FileText size={38} className="mb-4 text-[#C9B99A]/35" />
        <h2 className="text-xl">Preview unavailable</h2>
        <p className="mt-2 text-sm leading-relaxed text-[#C9B99A]">
          NARA lists this digital object, but its file format or archive link cannot be displayed in this browser. This is an archive-side limitation, not a problem with your search.
        </p>
        <a href={recordUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-lg border border-[#FF9500]/35 px-4 py-2 text-sm text-[#FFB840]">
          Check the official NARA record <ExternalLink size={14}/>
        </a>
      </div>
    );
  }

  return (
    <img
      src={source}
      alt={title}
      className="max-h-[76vh] max-w-full object-contain"
      onError={() => {
        if (thumbnailUrl && source !== thumbnailUrl) {
          setSource(thumbnailUrl);
          return;
        }
        setUnavailable(true);
      }}
    />
  );
}

export default function NaraRecordPage() {
  const { naId = "" } = useParams();
  const [pageIndex, setPageIndex] = useState(0);
  const query = trpc.archive.getNationalArchivesRecord.useQuery(
    { naId },
    { enabled: /^\d{1,20}$/.test(naId), retry: false }
  );
  const viewable = useMemo(
    () => query.data?.digitalObjects.filter(object => object.mediaType === "image" || object.mediaType === "pdf") || [],
    [query.data]
  );
  const current = viewable[pageIndex];

  return (
    <main className="min-h-screen bg-[#0b1420] px-4 pb-24 pt-24 text-[#F0EBE1] sm:px-6">
      <div className="mx-auto max-w-7xl">
        <Link to="/archives" className="mb-6 inline-flex items-center gap-2 text-sm text-[#C9B99A] hover:text-[#FF9500]">
          <ArrowLeft size={15} /> Back to archive search
        </Link>
        {query.isLoading && <div className="flex min-h-[50vh] items-center justify-center"><Loader2 className="animate-spin text-[#FF9500]" /></div>}
        {query.error && (
          <div className="rounded-xl border border-red-400/25 bg-red-400/10 p-6">
            <p className="text-red-100">{query.error.message}</p>
            <a href={`https://catalog.archives.gov/id/${naId}`} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm text-[#FFB840]">Open the official NARA record <ExternalLink size={14}/></a>
          </div>
        )}
        {query.data && (
          <>
            <header className="mb-6 grid gap-4 border-b border-[#FF9500]/20 pb-6 lg:grid-cols-[1fr_auto]">
              <div>
                <p className="mb-2 text-[10px] uppercase tracking-[0.16em] text-[#FF9500]">National Archives · NAID {query.data.naId}</p>
                <h1 className="text-3xl leading-tight sm:text-4xl" style={{ fontFamily: "Newsreader, serif" }}>{query.data.title}</h1>
                {query.data.date && <p className="mt-2 text-sm text-[#C9B99A]">{query.data.date}</p>}
              </div>
              <a href={query.data.recordUrl} target="_blank" rel="noreferrer" className="inline-flex h-fit items-center justify-center gap-2 rounded-lg border border-[#FF9500]/35 px-4 py-2 text-sm text-[#FFB840]">View original at NARA <ExternalLink size={14}/></a>
            </header>
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
              <section className="overflow-hidden rounded-xl border border-white/10 bg-black/25">
                {current ? (
                  <>
                    <div className="flex min-h-[60vh] items-center justify-center overflow-auto bg-black/40 p-3">
                      {current.mediaType === "pdf" ? (
                        <iframe title={current.title} src={current.url} className="h-[72vh] w-full rounded bg-white" />
                      ) : (
                        <ViewerImage title={current.title} url={current.url} thumbnailUrl={current.thumbnailUrl} recordUrl={query.data.recordUrl} />
                      )}
                    </div>
                    <div className="flex items-center justify-between gap-3 border-t border-white/10 p-3">
                      <button onClick={() => setPageIndex(index => Math.max(0, index - 1))} disabled={pageIndex === 0} className="inline-flex items-center gap-1 rounded border border-white/10 px-3 py-2 text-xs disabled:opacity-30"><ChevronLeft size={14}/> Previous</button>
                      <p className="text-center text-xs text-[#C9B99A]">{current.title}<br/>Object {pageIndex + 1} of {viewable.length}</p>
                      <button onClick={() => setPageIndex(index => Math.min(viewable.length - 1, index + 1))} disabled={pageIndex >= viewable.length - 1} className="inline-flex items-center gap-1 rounded border border-white/10 px-3 py-2 text-xs disabled:opacity-30">Next <ChevronRight size={14}/></button>
                    </div>
                  </>
                ) : (
                  <div className="flex min-h-[55vh] flex-col items-center justify-center p-8 text-center">
                    <FileText size={38} className="mb-4 text-[#C9B99A]/35" />
                    <h2 className="text-xl">Catalog description only</h2>
                    <p className="mt-2 max-w-lg text-sm leading-relaxed text-[#C9B99A]">NARA did not provide a viewable image or PDF for this catalog entry. The metadata remains available here; use the official record for access instructions or additional holdings.</p>
                  </div>
                )}
              </section>
              <aside className="space-y-4 rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <h2 className="text-lg text-[#FFB840]">Record details</h2>
                {query.data.description && <p className="text-sm leading-relaxed text-[#C9B99A]">{query.data.description}</p>}
                {query.data.creators.length > 0 && <div><p className="text-[10px] uppercase tracking-wider text-[#FF9500]">Creators</p><p className="mt-1 text-sm text-[#C9B99A]">{query.data.creators.join(" · ")}</p></div>}
                {query.data.locations.length > 0 && <div><p className="text-[10px] uppercase tracking-wider text-[#FF9500]">Location / holding unit</p><p className="mt-1 text-sm text-[#C9B99A]">{query.data.locations.join(" · ")}</p></div>}
                {query.data.rights && <div className="rounded-lg border border-amber-300/20 bg-amber-300/5 p-3 text-xs leading-relaxed text-amber-100">{query.data.rights}</div>}
                <p className="border-t border-white/10 pt-4 text-[11px] leading-relaxed text-[#C9B99A]/60">This viewer reproduces the digital objects supplied through the National Archives catalog. Object order and availability are controlled by NARA.</p>
              </aside>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
