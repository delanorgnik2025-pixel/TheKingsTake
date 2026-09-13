import { motion } from 'framer-motion'
import { Link } from 'react-router'
import { Flame, Calendar, ChevronRight, Users, Clock } from 'lucide-react'
import { trpc } from '@/providers/trpc'

export default function ActionCTASection() {
  const { data: count } = trpc.petition.count.useQuery()

  return (
    <section className="relative py-20 px-6 overflow-hidden">
      {/* Rich layered background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F17] via-[#111827] to-[#0B0F17]" />
      <div className="absolute inset-0 opacity-[0.08]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF9500' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: 'radial-gradient(ellipse at 30% 50%, rgba(255,149,0,0.15) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(255,149,0,0.1) 0%, transparent 50%)'
      }} />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF9500]/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF9500]/20 to-transparent" />
      <div className="max-w-5xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: 'Newsreader, serif' }}>
            Take <span className="text-[#FF9500]">Action</span> Today
          </h2>
          <p className="text-[#C9B99A] max-w-xl mx-auto">
            Your voice matters. Your vision matters. Here are two ways to move forward right now.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Petition Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Link to="/petition" className="block group">
              <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 md:p-8 hover:border-[#FF9500]/30 transition-all duration-300 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#FF9500]/10 flex items-center justify-center">
                    <Flame size={24} className="text-[#FF9500]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#F0EBE1] group-hover:text-[#FF9500] transition-colors">Sign the Petition</h3>
                    <p className="text-sm text-[#C9B99A]/60">Demand federal FBA recognition</p>
                  </div>
                </div>
                <p className="text-[#C9B99A]/80 text-sm leading-relaxed mb-4">
                  Add your name to the growing movement demanding federal recognition of Foundational Black Americans 
                  as a distinct ethnic group with our own lineage, history, and claim to this land.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-[#C9B99A]/60">
                    <Users size={14} />
                    <span>{count?.toLocaleString() || '0'} signatures</span>
                  </div>
                  <span className="flex items-center gap-1 text-sm text-[#FF9500] font-medium">
                    Sign Now <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Consultation Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Link to="/consultation" className="block group">
              <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 md:p-8 hover:border-[#FF9500]/30 transition-all duration-300 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#FF9500]/10 flex items-center justify-center">
                    <Calendar size={24} className="text-[#FF9500]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#F0EBE1] group-hover:text-[#FF9500] transition-colors">Book a Consultation</h3>
                    <p className="text-sm text-[#C9B99A]/60">One-on-one with Ronald Lee King</p>
                  </div>
                </div>
                <p className="text-[#C9B99A]/80 text-sm leading-relaxed mb-4">
                  Strategy sessions for business, media, community organizing, and personal development. 
                  Get a clear roadmap from someone who has built brands, movements, and platforms from the ground up.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-[#C9B99A]/60">
                    <Clock size={14} />
                    <span>Starting at $100</span>
                  </div>
                  <span className="flex items-center gap-1 text-sm text-[#FF9500] font-medium">
                    Book Now <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
