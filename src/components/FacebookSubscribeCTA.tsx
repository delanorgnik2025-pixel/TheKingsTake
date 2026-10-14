import {FACEBOOK_SUBSCRIBE_URL} from '@contracts/community';
export default function FacebookSubscribeCTA(){
 return <section aria-label="Facebook subscription" className="rounded-2xl border border-[#FFB840]/30 bg-[#182635] p-5 text-[#F0EBE1] sm:p-6">
  <p className="text-xs uppercase tracking-widest text-[#FFB840]">Stay close to The King’s Take</p>
  <h2 className="mt-3 text-2xl">Subscribe on Facebook</h2>
  <p className="mt-3 max-w-2xl text-sm leading-7 text-[#C9B99A]">Continue following Ronald’s reporting and subscriber updates. View the current subscription price and benefits on Facebook.</p>
  <a href={FACEBOOK_SUBSCRIBE_URL} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block min-h-12 rounded-full bg-[#FFB840] px-6 py-3 font-semibold text-[#101b28]">Explore Facebook subscription →</a>
  <p className="mt-3 text-xs leading-6 text-[#C9B99A]">The free introduction stays free. Website member access requires a separately issued access code; upcoming paid courses are not unlocked by this link.</p>
 </section>;
}
