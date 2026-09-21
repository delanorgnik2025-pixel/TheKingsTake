import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router";
import { trpc } from "@/providers/trpc";
import { useMember } from "@/providers/MemberProvider";

type Tool = "globe" | "archives";

export default function ResearchPreview({ tool, children }: { tool: Tool; children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [remaining, setRemaining] = useState<number | null>(null);
  const { member } = useMember();
  const status = trpc.visitor.toolPreview.useQuery({ tool }, { retry: false, refetchOnWindowFocus: true, staleTime: 0 });
  const useTool = trpc.visitor.useTool.useMutation({ onSuccess: result => setRemaining(result.remainingSeconds) });

  useEffect(() => { void status.refetch(); }, [member?.id]);
  useEffect(() => {
    if (status.data) setRemaining(status.data.remainingSeconds);
  }, [status.data]);
  useEffect(() => {
    if (!root.current) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting && !document.hidden), { threshold: 0.1 });
    observer.observe(root.current);
    const onVisibility = () => setVisible(!document.hidden && Boolean(root.current && root.current.getBoundingClientRect().bottom > 0 && root.current.getBoundingClientRect().top < innerHeight));
    document.addEventListener("visibilitychange", onVisibility);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", onVisibility); };
  }, []);
  useEffect(() => {
    if (!visible || !status.data || status.data.exempt || remaining === 0) return;
    useTool.mutate({ tool });
    const heartbeat = window.setInterval(() => useTool.mutate({ tool }), 10_000);
    const countdown = window.setInterval(() => setRemaining(value => value === null ? null : Math.max(0, value - 1)), 1_000);
    return () => { clearInterval(heartbeat); clearInterval(countdown); };
  }, [visible, status.data?.exempt, status.data?.exhausted, tool, remaining === 0]);

  const exhausted = !status.data?.exempt && (status.data?.exhausted || remaining === 0);
  const title = tool === "globe" ? "heritage globe" : "archive search";
  return <div ref={root} id={tool === "globe" ? "heritage" : undefined} className="min-w-0">
    {status.isLoading && <div className="px-6 py-24 text-center text-[#C9B99A]">Preparing your {title} preview…</div>}
    {status.error && <div className="mx-auto max-w-xl px-6 py-24 text-center text-[#F0EBE1]">Could not check your research preview. <button onClick={() => status.refetch()} className="text-[#FFB840] underline">Try again</button></div>}
    {status.data && !exhausted && <>
      {!status.data.exempt && <div className="sticky top-16 z-40 mx-auto flex max-w-7xl items-center justify-between gap-3 border border-[#FF9500]/30 bg-[#182635] px-4 py-2 text-xs text-[#F0EBE1]">
        <span>{title === "heritage globe" ? "Globe" : "Archives"} preview: {Math.ceil((remaining ?? 300) / 60)} min remaining</span>
        <Link to="/feed" className="text-[#FFB840] underline">Have an access code? Sign in</Link>
      </div>}
      {children}
    </>}
    {status.data && exhausted && <div className="mx-auto my-12 max-w-2xl rounded-xl border border-[#FF9500]/40 bg-[#182635] px-6 py-10 text-center text-[#F0EBE1]">
      <h2 className="text-2xl">Your {title} preview is complete</h2>
      <p className="mt-3 text-sm text-[#C9B99A]">Your five-minute preview for this tool is used up. It stays used when you leave and return. Redeem your member access code and sign in for continued access.</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <a href="https://www.facebook.com/thekingstake" target="_blank" rel="noopener noreferrer" className="rounded bg-[#FF9500] px-5 py-3 text-sm font-semibold text-[#182635]">Visit #TheKingsTake on Facebook</a>
        <Link to="/feed" className="rounded border border-[#FF9500]/50 px-5 py-3 text-sm text-[#FFB840]">Redeem code / member sign in</Link>
      </div>
      <p className="mt-4 text-xs text-[#C9B99A]">Facebook subscription alone does not unlock access; an issued member code is required.</p>
    </div>}
  </div>;
}
