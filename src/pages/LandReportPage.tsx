import { useState } from 'react'
import { Link } from 'react-router'
import {
  Crown, MapPin, FileSearch, Archive, ArrowLeft, Loader2, Check, Shield, AlertTriangle,
} from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'
import { trpc } from '@/providers/trpc'

// ─── payment links (v1 — simple checkout, manual fulfillment) ────────────────
const PAYMENT_LINKS = {
  basic: 'https://buy.stripe.com/PLACEHOLDER_BASIC99',
  deep: 'https://buy.stripe.com/PLACEHOLDER_DEEP250',
}

const TIERS = [
  {
    key: 'basic' as const,
    name: 'Foundation Report',
    price: 99,
    tag: null,
    features: [
      'Indigenous history of your family\'s land of origin',
      'The nations connected to that territory',
      'Treaty & land-cession summary for the area',
      'Relevant tribal rolls & where to search them',
      'Cited sources for every finding',
      'PDF report delivered by email',
    ],
  },
  {
    key: 'deep' as const,
    name: 'Deep Roots Report',
    price: 250,
    tag: 'Most Thorough',
    features: [
      'Everything in the Foundation Report',
      'County-by-county record tracing across all states of origin',
      'Reclassification-law analysis (how identity was papered over)',
      'Cross-referenced census, Dawes, Guion Miller & Baker roll guidance',
      'Full primary-source document pack',
      'Follow-up Q&A letter from the researcher',
    ],
  },
]

export default function LandReportPage() {
  const [form, setForm] = useState({ name: '', email: '', surnames: '', origins: '', goals: '', tier: 'basic' as 'basic' | 'deep' })
  const [done, setDone] = useState(false)
  const [err, setErr] = useState('')
  const submit = trpc.booking.create.useMutation()
  const { data: serviceList } = trpc.service.list.useQuery(undefined, { staleTime: 60000 })

  const resolveServiceId = (tier: 'basic' | 'deep'): number | null => {
    const slug = tier === 'basic' ? 'ancestral-land-report-foundation' : 'ancestral-land-report-deep'
    const svc = (serviceList as any[] | undefined)?.find((s) => s.slug === slug)
    return svc?.id ?? null
  }

  const send = async () => {
    setErr('')
    if (!form.name.trim() || !form.email.trim() || !form.origins.trim()) {
      setErr('Please fill in your name, email, and at least the states/counties of family origin.')
      return
    }
    const serviceId = resolveServiceId(form.tier)
    if (!serviceId) {
      setErr('Service is still being set up — please try again in a few minutes or reach us through the Contact page.')
      return
    }
    const tierName = form.tier === 'basic' ? 'Foundation Report ($99)' : 'Deep Roots Report ($250)'
    try {
      await submit.mutateAsync({
        serviceId,
        name: form.name.trim(),
        email: form.email.trim(),
        message: [
          `SERVICE: Ancestral Land & History Report — ${tierName}`,
          `Family surnames: ${form.surnames || '(not provided)'}`,
          `States/counties of family origin: ${form.origins}`,
          `What they want to know: ${form.goals || '(not provided)'}`,
        ].join('\n'),
      })
      setDone(true)
    } catch (e: any) {
      setErr(e?.message || 'Could not submit — please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-[#182635]">
      <div className="fixed inset-0 pointer-events-none" style={{
        background:
          'radial-gradient(900px 500px at 15% -5%, rgba(255,149,0,0.09), transparent 60%),' +
          'radial-gradient(700px 500px at 90% 50%, rgba(60,110,180,0.08), transparent 60%)',
      }} />

      <div className="relative z-10 max-w-3xl mx-auto px-4 pt-24 pb-24">
        <Link to="/" className="inline-flex items-center gap-2 text-[#C9B99A] text-xs uppercase tracking-[0.2em] hover:text-[#FF9500] transition-colors mb-10">
          <ArrowLeft size={14} /> Home
        </Link>

        {/* Hero */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-[rgba(255,149,0,0.4)] bg-[rgba(255,149,0,0.1)] mb-5">
              <MapPin size={26} className="text-[#FF9500]" />
            </div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#FF9500] mb-3">Custom Research Service</p>
            <h1 className="text-4xl sm:text-5xl text-[#F0EBE1] mb-4" style={{ fontFamily: 'Newsreader, serif' }}>
              Ancestral Land &amp; History Report
            </h1>
            <p className="text-[#C9B99A] text-base max-w-xl mx-auto leading-relaxed">
              A research report on the Indigenous history of your family's land and the nations connected to it — treaties, rolls, cessions, and sources, documented and cited.
            </p>
          </div>
        </ScrollReveal>

        {/* Legal framing banner */}
        <ScrollReveal>
          <div className="rounded-lg border border-[rgba(255,184,64,0.3)] bg-[rgba(255,184,64,0.06)] p-4 mb-12 flex gap-3">
            <AlertTriangle size={16} className="text-[#FFB840] shrink-0 mt-0.5" />
            <p className="text-[#C9B99A] text-xs leading-relaxed">
              <span className="text-[#FFB840] font-semibold">Straight talk:</span> this is a historical and land research report.
              It documents the public record — it does not and cannot determine tribal enrollment or prove lineage.
              Only the nations themselves determine enrollment. What we deliver is the documented history of the land and its peoples, and where the record points your family next.
            </p>
          </div>
        </ScrollReveal>

        {/* Tiers */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {TIERS.map((t, i) => (
            <ScrollReveal key={t.key} delay={i * 0.08}>
              <div className={`relative rounded-xl p-6 h-full border ${t.tag ? 'border-2 border-[#FF9500]' : 'border-[rgba(255,149,0,0.25)]'}`}
                style={{ background: 'linear-gradient(165deg, rgba(37,54,75,0.9), rgba(24,38,53,0.95))' }}>
                {t.tag && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FF9500] text-[#182635] text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1 rounded-full">
                    {t.tag}
                  </span>
                )}
                <p className="text-[11px] uppercase tracking-[0.25em] text-[#C9B99A] mb-2">{t.name}</p>
                <p className="text-4xl text-[#FF9500] font-medium mb-4" style={{ fontFamily: 'Newsreader, serif' }}>${t.price}</p>
                <ul className="space-y-2 mb-6">
                  {t.features.map((f) => (
                    <li key={f} className="flex gap-2 text-[#C9B99A] text-sm leading-snug">
                      <Check size={14} className="text-[#FF9500] shrink-0 mt-0.5" /> {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => {
                    setForm({ ...form, tier: t.key })
                    document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="block w-full py-3 rounded-full border border-[#FF9500] text-[#FFB840] text-sm font-semibold hover:bg-[rgba(255,149,0,0.1)] transition-colors">
                  Start This Report — ${t.price}
                </button>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Order form */}
        <ScrollReveal>
          <div id="order-form" className="rounded-xl border border-[rgba(255,149,0,0.25)] p-6" style={{ background: 'linear-gradient(165deg, rgba(37,54,75,0.9), rgba(24,38,53,0.95))' }}>
            <div className="flex items-center gap-3 mb-5">
              <FileSearch size={20} className="text-[#FF9500]" />
              <h2 className="text-xl text-[#F0EBE1]" style={{ fontFamily: 'Newsreader, serif' }}>Request Your Report</h2>
            </div>

            {done ? (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[rgba(255,149,0,0.12)] border border-[rgba(255,149,0,0.4)] mb-4">
                  <Check size={24} className="text-[#FF9500]" />
                </div>
                <h3 className="text-[#F0EBE1] text-lg mb-2" style={{ fontFamily: 'Newsreader, serif' }}>Request received.</h3>
                <p className="text-[#C9B99A] text-sm mb-5 max-w-md mx-auto">
                  Last step — complete payment to put your report in the research queue. Your details are saved and matched by your email.
                </p>
                <a href={PAYMENT_LINKS[form.tier]} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#FF9500] text-[#182635] font-semibold text-sm hover:bg-[#FFB840] transition-colors">
                  Pay {form.tier === 'basic' ? '$99 — Foundation' : '$250 — Deep Roots'} via Stripe
                </a>
                <p className="text-[#C9B99A]/50 text-[11px] mt-3">Cash App & PayPal also accepted — include your email in the memo.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex gap-2 mb-1">
                  {([['basic', 'Foundation — $99'], ['deep', 'Deep Roots — $250']] as const).map(([k, label]) => (
                    <button key={k} onClick={() => setForm({ ...form, tier: k })}
                      className={`flex-1 py-2 rounded text-xs font-semibold uppercase tracking-[0.1em] border transition-colors ${form.tier === k ? 'border-[#FF9500] text-[#FFB840] bg-[rgba(255,149,0,0.1)]' : 'border-[rgba(255,149,0,0.2)] text-[#C9B99A]'}`}>
                      {label}
                    </button>
                  ))}
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name *"
                    className="w-full bg-[#182635] border border-[rgba(255,149,0,0.2)] rounded px-3 py-2.5 text-[#F0EBE1] text-sm focus:outline-none focus:border-[#FF9500]" />
                  <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email address *" type="email"
                    className="w-full bg-[#182635] border border-[rgba(255,149,0,0.2)] rounded px-3 py-2.5 text-[#F0EBE1] text-sm focus:outline-none focus:border-[#FF9500]" />
                </div>
                <input value={form.surnames} onChange={(e) => setForm({ ...form, surnames: e.target.value })} placeholder="Family surnames (e.g. King, Robinson, Artis)"
                  className="w-full bg-[#182635] border border-[rgba(255,149,0,0.2)] rounded px-3 py-2.5 text-[#F0EBE1] text-sm focus:outline-none focus:border-[#FF9500]" />
                <input value={form.origins} onChange={(e) => setForm({ ...form, origins: e.target.value })} placeholder="States / counties of family origin * (e.g. Mercer County NJ, Edgecombe County NC)"
                  className="w-full bg-[#182635] border border-[rgba(255,149,0,0.2)] rounded px-3 py-2.5 text-[#F0EBE1] text-sm focus:outline-none focus:border-[#FF9500]" />
                <textarea value={form.goals} onChange={(e) => setForm({ ...form, goals: e.target.value })} rows={4}
                  placeholder="What do you want to know? Family stories, names, land, anything that guides the research…"
                  className="w-full bg-[#182635] border border-[rgba(255,149,0,0.2)] rounded px-3 py-2.5 text-[#F0EBE1] text-sm focus:outline-none focus:border-[#FF9500] resize-y" />
                {err && <p className="text-red-400 text-xs">{err}</p>}
                <button onClick={send} disabled={submit.isPending}
                  className="w-full py-3 rounded-full bg-[#FF9500] text-[#182635] font-semibold text-sm hover:bg-[#FFB840] transition-colors disabled:opacity-40 flex items-center justify-center gap-2">
                  {submit.isPending ? <Loader2 size={15} className="animate-spin" /> : <FileSearch size={15} />}
                  Submit Request
                </button>
                <p className="flex items-center justify-center gap-1.5 text-[#C9B99A]/50 text-[11px]">
                  <Shield size={10} /> Your family details stay private — used only for your report.
                </p>
              </div>
            )}
          </div>
        </ScrollReveal>

        {/* Vault cross-sell */}
        <ScrollReveal>
          <div className="mt-12 rounded-xl border border-[rgba(255,149,0,0.15)] p-6 text-center" style={{ background: 'rgba(37,54,75,0.5)' }}>
            <Archive size={20} className="text-[#FF9500] mx-auto mb-3" />
            <p className="text-[#C9B99A] text-sm">
              Want to walk the record yourself first? The <Link to="/deep-roots" className="text-[#FFB840] hover:underline">Deep Roots Pass</Link> opens the Records Vault, timeline layer, and downloadable reports — $12/month.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}
