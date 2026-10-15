import {FACEBOOK_SUBSCRIBE_URL} from '@contracts/community';
export default function FacebookSubscribeCTA(){
 return <section aria-label="Facebook subscription" className="rounded-2xl border border-[#FFB840]/30 bg-[#182635] p-5 text-[#F0EBE1] sm:p-6">
  <p className="text-xs uppercase tracking-widest text-[#FFB840]">The King’s Take · Inner Circle</p>
  <h2 className="mt-3 text-2xl">One subscription. Your Inner Circle.</h2>
  <p className="mt-3 max-w-2xl text-sm leading-7 text-[#C9B99A]">Join through Facebook for the private community, conversations and daily reflections. Check the current price and benefits there, then request your website access code after subscription verification.</p>
  <a href={FACEBOOK_SUBSCRIBE_URL} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block min-h-12 rounded-full bg-[#FFB840] px-6 py-3 font-semibold text-[#101b28]">Join the Inner Circle on Facebook →</a>
  <p className="mt-3 text-xs leading-6 text-[#C9B99A]">Already subscribed? Use your website access code to enter the private Feed. Learn2File stays free. New subscriber courses will be announced as they become available.</p>
 <a href="/feed" className="mt-3 inline-flex min-h-11 items-center text-sm text-[#FFB840] underline">Open the subscriber entrance →</a>
 </section>;
}
