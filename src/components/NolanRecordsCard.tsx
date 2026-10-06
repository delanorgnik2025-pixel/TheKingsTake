import { Link } from 'react-router';
import { NOLAN_RECORDS_PATH, NOLAN_RECORDS_TITLE, NOLAN_RECORDS_DESCRIPTION, NOLAN_RECORDS_IMAGE } from '../../contracts/nolan-records';
export function NolanRecordsCard() {
  return <aside className="my-8 overflow-hidden rounded-2xl border border-[#FFB840]/40 bg-[#182635] text-[#F0EBE1]"><Link to={NOLAN_RECORDS_PATH} className="grid gap-5 sm:grid-cols-[240px_1fr]"><img src={NOLAN_RECORDS_IMAGE} alt="Branded editorial image for the Nolan Wells investigation; not case evidence" loading="lazy" className="h-full max-h-64 w-full object-cover"/><div className="p-6"><p className="text-xs uppercase tracking-widest text-[#FFB840]">Examine the records · Captured report pages</p><h2 className="mt-3 text-2xl">{NOLAN_RECORDS_TITLE}</h2><p className="mt-3 text-sm leading-relaxed text-[#C9B99A]">{NOLAN_RECORDS_DESCRIPTION}</p><p className="mt-4 font-semibold text-[#FFB840]">Open the page viewer →</p></div></Link></aside>;
}
