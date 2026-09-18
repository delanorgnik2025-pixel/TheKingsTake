import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import { CheckCircle, MailX } from "lucide-react";
import { trpc } from "@/providers/trpc";

export default function NewsletterUnsubscribePage() {
  const [params] = useSearchParams();
  const token = params.get("token") || "";
  const [done, setDone] = useState(false);
  const unsubscribe = trpc.engagement.unsubscribe.useMutation({ onSuccess: () => setDone(true) });
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#101b28] px-4 text-[#F0EBE1]">
      <div className="w-full max-w-lg rounded-2xl border border-[#FF9500]/25 bg-[#182635] p-8 text-center">
        {done ? <CheckCircle className="mx-auto mb-4 text-emerald-300" size={40}/> : <MailX className="mx-auto mb-4 text-[#FF9500]" size={40}/>} 
        <h1 className="text-3xl" style={{ fontFamily: "Newsreader, serif" }}>{done ? "You’re unsubscribed" : "Leave The King’s Dispatch"}</h1>
        <p className="mt-3 text-sm leading-relaxed text-[#C9B99A]">{done ? "You will no longer receive newsletter editions at this address." : "This stops newsletter messages. It does not affect Royal Circle membership or messages you directly requested."}</p>
        {!done && <button onClick={() => unsubscribe.mutate({ token })} disabled={token.length < 20 || unsubscribe.isPending} className="mt-6 rounded bg-[#FF9500] px-5 py-3 text-sm font-semibold text-[#182635] disabled:opacity-40">{unsubscribe.isPending ? "Updating…" : "Confirm unsubscribe"}</button>}
        {unsubscribe.error && <p className="mt-3 text-sm text-red-300">{unsubscribe.error.message}</p>}
        <Link to="/" className="mt-6 block text-sm text-[#FFB840]">Return to The King&apos;s Take</Link>
      </div>
    </main>
  );
}
