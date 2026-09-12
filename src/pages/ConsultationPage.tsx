import { useState } from 'react'
import { motion } from 'framer-motion'
import { trpc } from '@/providers/trpc'
import {
  Calendar, Clock, User, Mail, Phone, MessageSquare,
  ChevronRight, CheckCircle, Crown, Star, Zap, Target
} from 'lucide-react'

const CONSULTATION_TYPES = [
  {
    id: 1,
    title: 'Strategy Session',
    duration: '30 minutes',
    price: '$100',
    description: 'One-on-one strategy call for business, media, or community organizing. Get clear direction on your next move.',
    features: ['Pre-session questionnaire', 'Recorded call option', 'Action plan summary', 'Email follow-up'],
    popular: false
  },
  {
    id: 2,
    title: 'Deep Dive Consultation',
    duration: '60 minutes',
    price: '$200',
    description: 'Comprehensive session for complex projects, brand development, campaign strategy, or organizational structuring.',
    features: ['In-depth pre-analysis', 'Recorded call', 'Written recommendations', '2-week follow-up access'],
    popular: true
  },
  {
    id: 3,
    title: 'Executive Advisory',
    duration: '90 minutes',
    price: '$500',
    description: 'Premium advisory for leaders, organizations, and entrepreneurs ready to scale their impact significantly.',
    features: ['Full brand audit', 'Strategic roadmap', 'Ongoing email support (30 days)', 'Priority scheduling'],
    popular: false
  }
]

export default function ConsultationPage() {
  const [selectedType, setSelectedType] = useState<number | null>(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const bookMutation = trpc.booking.create.useMutation({
    onSuccess: () => setSubmitted(true)
  })

  const selected = CONSULTATION_TYPES.find(c => c.id === selectedType)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedType || !form.name || !form.email) return
    bookMutation.mutate({
      serviceId: selectedType,
      name: form.name,
      email: form.email,
      phone: form.phone || undefined,
      message: form.message || undefined,
    })
  }

  return (
    <div className="min-h-screen bg-[#0B0F17] text-[#F0EBE1]">
      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-16 px-6">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,149,0,0.15) 0%, transparent 70%)'
        }} />
        <div className="max-w-4xl mx-auto relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF9500]/10 border border-[#FF9500]/20 text-[#FF9500] text-sm mb-6">
              <Crown size={16} /> Work Directly with Ronald Lee King
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight" style={{ fontFamily: 'Newsreader, serif' }}>
              Book Your <span className="text-[#FF9500]">Consultation</span>
            </h1>
            <p className="text-lg md:text-xl text-[#C9B99A] max-w-2xl mx-auto leading-relaxed">
              Whether you are building a brand, launching a campaign, organizing your community, 
              or seeking strategic clarity — a one-on-one session with Ronald Lee King will give you 
              the roadmap you need.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Consultation Types */}
      <section className="px-6 pb-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {CONSULTATION_TYPES.map((type, i) => (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                onClick={() => setSelectedType(type.id)}
                className={`relative cursor-pointer rounded-2xl p-6 border transition-all duration-300 ${
                  selectedType === type.id
                    ? 'bg-[#FF9500]/10 border-[#FF9500]/40 shadow-lg shadow-[#FF9500]/5'
                    : 'bg-white/[0.02] border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.04]'
                }`}
              >
                {type.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#FF9500] text-[#182635] text-[11px] font-bold rounded-full uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <div className="mb-4">
                  <h3 className="text-xl font-bold mb-1">{type.title}</h3>
                  <div className="flex items-center gap-2 text-[#C9B99A]/60 text-sm">
                    <Clock size={14} /> {type.duration}
                  </div>
                </div>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-[#FF9500]">{type.price}</span>
                </div>
                <p className="text-sm text-[#C9B99A]/70 mb-4 leading-relaxed">{type.description}</p>
                <ul className="space-y-2">
                  {type.features.map((feat, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-[#C9B99A]/80">
                      <CheckCircle size={14} className="text-emerald-400 shrink-0" /> {feat}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="px-6 pb-20">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 md:p-8"
          >
            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle size={48} className="text-emerald-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[#F0EBE1] mb-2">Request Received!</h3>
                <p className="text-[#C9B99A] mb-2">
                  Thank you for booking a {selected?.title}. We will contact you within 24 hours to confirm your session.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false)
                    setSelectedType(null)
                    setForm({ name: '', email: '', phone: '', message: '' })
                  }}
                  className="mt-4 h-10 px-6 bg-[#FF9500] text-[#182635] text-sm font-medium rounded hover:bg-[#CC6A00]"
                >
                  Book Another Session
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold mb-1" style={{ fontFamily: 'Newsreader, serif' }}>
                  {selected ? `Book: ${selected.title}` : 'Select a Consultation Above'}
                </h2>
                <p className="text-sm text-[#C9B99A]/60 mb-6">
                  {selected ? `${selected.duration} — ${selected.price}` : 'Choose the session that fits your needs'}
                </p>

                {selected && (
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

                    <div>
                      <label className="block text-xs tracking-wider text-[#C9B99A]/50 uppercase mb-1.5">Phone</label>
                      <div className="relative">
                        <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C9B99A]/30" />
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={e => setForm({ ...form, phone: e.target.value })}
                          className="w-full h-11 bg-white/[0.03] border border-white/[0.08] text-[#F0EBE1] pl-10 pr-3 text-sm rounded focus:border-[#FF9500]/50 focus:outline-none"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs tracking-wider text-[#C9B99A]/50 uppercase mb-1.5">What do you need help with?</label>
                      <div className="relative">
                        <MessageSquare size={16} className="absolute left-3 top-3 text-[#C9B99A]/30" />
                        <textarea
                          value={form.message}
                          onChange={e => setForm({ ...form, message: e.target.value })}
                          rows={4}
                          className="w-full bg-white/[0.03] border border-white/[0.08] text-[#F0EBE1] pl-10 pr-3 py-2.5 text-sm rounded focus:border-[#FF9500]/50 focus:outline-none resize-none"
                          placeholder="Describe your project, goals, or challenges..."
                        />
                      </div>
                    </div>

                    {bookMutation.error && (
                      <p className="text-red-400 text-sm">{bookMutation.error.message}</p>
                    )}

                    <button
                      type="submit"
                      disabled={bookMutation.isPending || !form.name || !form.email}
                      className="w-full h-12 bg-[#FF9500] text-[#182635] font-medium rounded hover:bg-[#CC6A00] disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {bookMutation.isPending ? (
                        <div className="w-5 h-5 border-2 border-[#182635] border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <><Calendar size={18} /> Request Booking — {selected.price}</>
                      )}
                    </button>

                    <p className="text-[11px] text-[#C9B99A]/40 text-center">
                      Payment will be processed after confirmation. You will receive an invoice via email.
                    </p>
                  </form>
                )}
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* Trust / Social Proof */}
      <section className="px-6 py-16 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <Zap size={28} className="text-[#FF9500] mx-auto mb-3" />
              <h3 className="font-medium text-[#F0EBE1] mb-1">Strategic Clarity</h3>
              <p className="text-sm text-[#C9B99A]/60">Cut through the noise. Get a clear action plan tailored to your goals.</p>
            </div>
            <div>
              <Target size={28} className="text-[#FF9500] mx-auto mb-3" />
              <h3 className="font-medium text-[#F0EBE1] mb-1">Proven Results</h3>
              <p className="text-sm text-[#C9B99A]/60">Years of experience in media, publishing, community organizing, and brand building.</p>
            </div>
            <div>
              <Star size={28} className="text-[#FF9500] mx-auto mb-3" />
              <h3 className="font-medium text-[#F0EBE1] mb-1">Dedicated Follow-Up</h3>
              <p className="text-sm text-[#C9B99A]/60">Every session includes written recommendations and follow-up support.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
