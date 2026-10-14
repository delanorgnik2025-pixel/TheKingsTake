import FacebookSubscribeCTA from '@/components/FacebookSubscribeCTA';
import { useState } from 'react';
import { Link } from 'react-router';
import { CIVIL_INTRO_LESSONS, CIVIL_INTRO_TITLE } from '@contracts/civil-rights-intro';

export default function CivilRightsIntroPage() {
 const [answer, setAnswer] = useState('');
 const [checked, setChecked] = useState(false);
 return <main className="min-h-screen bg-[#101b28] px-5 pb-20 pt-28 text-[#F0EBE1]">
  <div className="mx-auto max-w-3xl">
   <Link to="/" className="text-sm text-[#FFB840]">← The King’s Take</Link>
   <p className="mt-8 text-xs uppercase tracking-widest text-[#FFB840]">The King’s Dispatch · Free learning gift</p>
   <h1 className="mt-3 text-4xl sm:text-5xl">{CIVIL_INTRO_TITLE}</h1>
   <p className="mt-5 text-lg leading-relaxed text-[#C9B99A]">Understand what it covers, the difference between a proposed class action and a certified class, and how to organize facts. About 15–20 minutes. No payment, subscription or access code required.</p>
   <div className="my-7 rounded-2xl border border-[#FFB840]/30 bg-[#182635] p-6"><h2 className="text-xl">Learn from firsthand filing experience</h2><p className="mt-3 leading-relaxed text-[#C9B99A]">Ronald Lee King brings firsthand experience filing civil-rights actions to this educational introduction. The lessons pair that perspective with official sources. Personal experience is not an attorney qualification or proof of class certification.</p><p className="mt-3 text-sm leading-relaxed text-[#C9B99A]">General legal education, not advice about your case or legal representation. No result is promised. Published October 14, 2026.</p></div>
   <nav aria-label="Lesson navigation" className="grid gap-2 sm:grid-cols-2">{CIVIL_INTRO_LESSONS.map((l,i)=><a key={l.title} href={`#lesson-${i+1}`} className="rounded-lg border border-white/15 p-3 text-[#FFB840]">{l.title}</a>)}</nav>
   {CIVIL_INTRO_LESSONS.map((l,i)=><section key={l.title} id={`lesson-${i+1}`} className="scroll-mt-24 border-b border-white/10 py-9"><h2 className="text-2xl">{l.title}</h2>{l.paragraphs.map(p=><p key={p} className="mt-4 text-base leading-8 text-[#C9B99A]">{p}</p>)}</section>)}
   <section className="my-8 rounded-2xl border border-[#FFB840]/30 p-6"><h2 className="text-2xl">Check your understanding</h2><fieldset className="mt-4"><legend className="mb-3">Does filing a complaint labelled “class action” mean a class has been certified?</legend>{[['yes','Yes — filing alone certifies the class.'],['no','No — certification requires a separate court decision.']].map(([v,label])=><label key={v} className="my-3 flex items-start gap-3"><input type="radio" name="certification" value={v} checked={answer===v} onChange={()=>{setAnswer(v);setChecked(false);}} className="mt-1"/>{label}</label>)}</fieldset><button disabled={!answer} onClick={()=>setChecked(true)} className="mt-3 min-h-12 rounded-lg bg-[#FFB840] px-5 text-[#101b28] disabled:opacity-40">Check answer</button>{checked&&<p role="status" className="mt-4 leading-relaxed text-[#C9B99A]">{answer==='no'?'Correct.':'Review lesson 2.'} Filing requests relief; it does not certify a class or authorize a nonlawyer to represent others.</p>}</section>
   <section className="py-6"><h2 className="text-2xl">Official sources — free to everyone</h2><ul className="mt-4 space-y-3 text-[#FFB840]">
    <li><a href="https://www.govinfo.gov/content/pkg/USCODE-2024-title42/html/USCODE-2024-title42-chap21-subchapI-sec1983.htm">42 U.S.C. §1983</a></li>
    <li><a href="https://www.govinfo.gov/content/pkg/USCODE-2024-title28/html/USCODE-2024-title28-partV-chap111-sec1654.htm">28 U.S.C. §1654 — self-representation</a></li>
    <li><a href="https://www.uscourts.gov/forms-rules/forms/complaint-violation-civil-rights-non-prisoner">Pro Se 15 and the limits of court forms</a></li>
    <li><a href="https://www.uscourts.gov/forms-rules/current-rules-practice-procedure/federal-rules-civil-procedure">Federal Rules of Civil Procedure — including Rule 23</a></li>
    <li><a href="https://www.govinfo.gov/content/pkg/USCOURTS-flsd-1_25-cv-22276/pdf/USCOURTS-flsd-1_25-cv-22276-1.pdf">Federal court example addressing pro se class representation</a></li>
   </ul></section>
   <FacebookSubscribeCTA />
   <section className="mt-6 rounded-2xl bg-[#182635] p-6"><h2 className="text-2xl">You have the foundation</h2><Link to="/buildyourcase" className="mt-4 inline-block text-[#FFB840] underline">Build your case — join the next-course waitlist →</Link><br/><Link to="/pre-order" className="mt-4 inline-block text-[#FFB840] underline">Read Ronald’s story — explore the book →</Link><br/><Link to="/learn2file" className="mt-4 inline-block text-[#FFB840] underline">Sign up for free learning updates →</Link><p className="mt-3 leading-relaxed text-[#C9B99A]">The full Casefile course and subscriber learning space are in development. This introduction stays free. No payment is being collected here.</p><p className="mt-3 text-sm text-[#FFB840]">AASOTU Media Group LLC | #TheKingsTake</p></section>
  </div>
 </main>;
}
