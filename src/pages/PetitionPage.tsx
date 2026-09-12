import { useState } from 'react'
import { motion } from 'framer-motion'
import { trpc } from '@/providers/trpc'
import { ScrollText, Users, MapPin, Mail, User, MessageSquare, ChevronRight, Flame, CheckCircle } from 'lucide-react'

export default function PetitionPage() {
  const [form, setForm] = useState({ name: '', email: '', city: '', state: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const utils = trpc.useUtils()

  const { data: count } = trpc.petition.count.useQuery()
  const { data: signers } = trpc.petition.list.useQuery()
  const signMutation = trpc.petition.sign.useMutation({
    onSuccess: () => {
      utils.petition.count.invalidate()
      utils.petition.list.invalidate()
      setSubmitted(true)
      setForm({ name: '', email: '', city: '', state: '', message: '' })
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email) return
    signMutation.mutate(form)
  }

  return (
    <div className="min-h-screen bg-[#0B0F17] text-[#F0EBE1]">
      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-16 px-6">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,149,0,0.15) 0%, transparent 70%)'
        }} />
        <div className="max-w-4xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF9500]/10 border border-[#FF9500]/20 text-[#FF9500] text-sm mb-6">
              <Flame size={16} /> A Movement for Our People
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight" style={{ fontFamily: 'Newsreader, serif' }}>
              The Petition for <span className="text-[#FF9500]">Foundational Black American</span> Recognition
            </h1>
            <p className="text-lg md:text-xl text-[#C9B99A] max-w-2xl mx-auto leading-relaxed">
              We demand federal recognition of Foundational Black Americans as a distinct ethnic group 
              with our own lineage, history, and claim to this land. Sign your name and stand with us.
            </p>
          </motion.div>

          {/* Counter */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex flex-col items-center bg-white/[0.03] border border-white/[0.08] rounded-2xl px-12 py-8">
              <span className="text-5xl md:text-7xl font-bold text-[#FF9500] tabular-nums">
                {count?.toLocaleString() || '0'}
              </span>
              <span className="text-sm text-[#C9B99A]/60 mt-2 uppercase tracking-widest">Signatures Collected</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Left: Why This Matters */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Newsreader, serif' }}>
              Why This Petition Matters
            </h2>
            <div className="space-y-6">
              {[
                {
                  title: 'Distinct Lineage',
                  desc: 'Foundational Black Americans are descendants of those brought to this land before 1865. Our lineage is unique and should be recognized as such.'
                },
                {
                  title: 'Reparations Justice',
                  desc: 'Federal recognition is the first step toward meaningful reparations for centuries of forced labor, systemic oppression, and generational wealth theft.'
                },
                {
                  title: 'Cultural Preservation',
                  desc: 'Our culture, language, traditions, and history must be preserved and protected under federal ethnic classification — not diluted or erased.'
                },
                {
                  title: 'Economic Empowerment',
                  desc: 'Recognition opens pathways to targeted federal programs, business grants, and economic development designed specifically for our community.'
                }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#FF9500]/10 flex items-center justify-center shrink-0 mt-1">
                    <ChevronRight size={14} className="text-[#FF9500]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#F0EBE1] mb-1">{item.title}</h3>
                    <p className="text-sm text-[#C9B99A]/70 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Signers */}
            <div className="mt-10">
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Users size={18} className="text-[#FF9500]" /> Recent Signers
              </h3>
              <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                {signers && signers.length > 0 ? signers.slice(0, 20).map((s: any) => (
                  <div key={s.id} className="flex items-center gap-3 p-2.5 bg-white/[0.02] border border-white/[0.04] rounded">
                    <div className="w-7 h-7 rounded-full bg-[#FF9500]/10 flex items-center justify-center text-[#FF9500] text-xs font-bold">
                      {s.name?.[0]?.toUpperCase() || '?'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[#F0EBE1] truncate">{s.name}</p>
                      <p className="text-[11px] text-[#C9B99A]/40">
                        {s.city}{s.city && s.state ? ', ' : ''}{s.state}
                      </p>
                    </div>
                  </div>
                )) : (
                  <p className="text-sm text-[#C9B99A]/40 py-4 text-center">Be the first to sign</p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right: Sign Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 md:p-8 sticky top-24">
              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle size={48} className="text-emerald-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-[#F0EBE1] mb-2">Thank You for Signing!</h3>
                  <p className="text-[#C9B99A] mb-6">Your voice has been added to the movement.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="h-10 px-6 bg-[#FF9500] text-[#182635] text-sm font-medium rounded hover:bg-[#CC6A00]"
                  >
                    Sign Another Name
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold mb-1" style={{ fontFamily: 'Newsreader, serif' }}>
                    Add Your Signature
                  </h2>
                  <p className="text-sm text-[#C9B99A]/60 mb-6">
                    Join {count?.toLocaleString() || '0'} others demanding recognition.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs tracking-wider text-[#C9B99A]/50 uppercase mb-1.5">Full Name *</label>
                      <div className="relative">
                        <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C9B99A]/30" />
                        <input
                          type="text"
                          value={form.name}
                          onChange={e => setForm({ ...form, name: e.target.value })}
                          className="w-full h-11 bg-white/[0.03] border border-white/[0.08] text-[#F0EBE1] pl-10 pr-3 text-sm rounded focus:border-[#FF9500]/50 focus:outline-none"
                          placeholder="Your full name"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs tracking-wider text-[#C9B99A]/50 uppercase mb-1.5">Email *</label>
                      <div className="relative">
                        <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C9B99A]/30" />
                        <input
                          type="email"
                          value={form.email}
                          onChange={e => setForm({ ...form, email: e.target.value })}
                          className="w-full h-11 bg-white/[0.03] border border-white/[0.08] text-[#F0EBE1] pl-10 pr-3 text-sm rounded focus:border-[#FF9500]/50 focus:outline-none"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs tracking-wider text-[#C9B99A]/50 uppercase mb-1.5">City</label>
                        <div className="relative">
                          <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C9B99A]/30" />
                          <input
                            type="text"
                            value={form.city}
                            onChange={e => setForm({ ...form, city: e.target.value })}
                            className="w-full h-11 bg-white/[0.03] border border-white/[0.08] text-[#F0EBE1] pl-10 pr-3 text-sm rounded focus:border-[#FF9500]/50 focus:outline-none"
                            placeholder="City"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs tracking-wider text-[#C9B99A]/50 uppercase mb-1.5">State</label>
                        <input
                          type="text"
                          value={form.state}
                          onChange={e => setForm({ ...form, state: e.target.value })}
                          className="w-full h-11 bg-white/[0.03] border border-white/[0.08] text-[#F0EBE1] px-3 text-sm rounded focus:border-[#FF9500]/50 focus:outline-none"
                          placeholder="State"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs tracking-wider text-[#C9B99A]/50 uppercase mb-1.5">Why This Matters to You</label>
                      <div className="relative">
                        <MessageSquare size={16} className="absolute left-3 top-3 text-[#C9B99A]/30" />
                        <textarea
                          value={form.message}
                          onChange={e => setForm({ ...form, message: e.target.value })}
                          rows={3}
                          className="w-full bg-white/[0.03] border border-white/[0.08] text-[#F0EBE1] pl-10 pr-3 py-2.5 text-sm rounded focus:border-[#FF9500]/50 focus:outline-none resize-none"
                          placeholder="Share your story (optional)"
                        />
                      </div>
                    </div>

                    {signMutation.error && (
                      <p className="text-red-400 text-sm">{signMutation.error.message}</p>
                    )}

                    <button
                      type="submit"
                      disabled={signMutation.isPending || !form.name || !form.email}
                      className="w-full h-12 bg-[#FF9500] text-[#182635] font-medium rounded hover:bg-[#CC6A00] disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {signMutation.isPending ? (
                        <div className="w-5 h-5 border-2 border-[#182635] border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <><ScrollText size={18} /> Sign the Petition</>
                      )}
                    </button>

                    <p className="text-[11px] text-[#C9B99A]/40 text-center">
                      Your information is secure and will only be used for this petition.
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'Newsreader, serif' }}>
            Want to Do More?
          </h2>
          <p className="text-[#C9B99A] mb-8">
            Your signature is powerful. A consultation with Ronald Lee King is transformative.
            Book a one-on-one strategy session to advance your personal, business, or community goals.
          </p>
          <a
            href="/consultation"
            className="inline-flex items-center gap-2 h-12 px-8 bg-[#FF9500] text-[#182635] font-medium rounded hover:bg-[#CC6A00]"
          >
            Book a Consultation <ChevronRight size={18} />
          </a>
        </div>
      </section>
    </div>
  )
}
