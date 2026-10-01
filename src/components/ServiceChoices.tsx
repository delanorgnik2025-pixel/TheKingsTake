import { Link } from 'react-router';
import { Mic, BookOpen, Users, Feather, Type, MessageSquare, ArrowUpRight, type LucideIcon } from 'lucide-react';
import { servicePositioning } from '../../contracts/service-positioning';
const icons: Record<string, LucideIcon> = { Mic, BookOpen, Users, Feather, Type, MessageSquare };
export default function ServiceChoices() {
  return <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{servicePositioning.map((service, index) => {
    const Icon = icons[service.icon];
    return <article key={service.slug} className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#152331]/95 shadow-xl">
      <div className="flex items-center justify-between border-b border-white/10 p-6" style={{ background: `linear-gradient(125deg, ${service.color}22, transparent)` }}><div><p className="text-xs uppercase tracking-[0.15em]" style={{color:service.color}}>{service.label}</p><span className="mt-2 block text-xs text-[#C9B99A]">0{index + 1} / Creative services</span></div><Icon size={34} style={{color:service.color}} strokeWidth={1.4}/></div>
      <div className="flex flex-1 flex-col p-6"><h3 className="text-3xl leading-tight text-[#F0EBE1]">{service.title}</h3><p className="mt-3 text-lg" style={{color:service.color}}>{service.price}</p><dl className="mt-6 space-y-5 text-sm leading-relaxed"><div><dt className="mb-1 text-xs uppercase tracking-wider text-[#F0EBE1]">Best fit</dt><dd className="text-[#C9B99A]">{service.bestFor}</dd></div><div><dt className="mb-1 text-xs uppercase tracking-wider text-[#F0EBE1]">What you get</dt><dd className="text-[#C9B99A]">{service.outcome}</dd></div><div className="border-t border-white/10 pt-4"><dt className="mb-1 text-xs uppercase tracking-wider" style={{color:service.color}}>Consider before choosing</dt><dd className="text-[#C9B99A]">{service.boundary}</dd></div></dl><Link to={`/writing-services#${service.anchor}`} className="mt-7 inline-flex items-center gap-2 self-start rounded-full border px-4 py-2 text-sm hover:bg-white/5" style={{borderColor:`${service.color}70`,color:service.color}}>Explore {service.title} <ArrowUpRight size={15}/></Link></div>
    </article>;
  })}</div>;
}
