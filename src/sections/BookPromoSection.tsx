import { motion } from 'framer-motion'
import { BookOpen, Star, Quote, ArrowRight } from 'lucide-react'
import { trpc } from '@/providers/trpc'
import ScrollReveal from '../components/ScrollReveal'

// Stripe Price ID for the book
const BOOK_PRICE_ID = 'price_1TUuET5rzCiGdPFNiXG2ZEi6'

const testimonials = [
  {
    text: "Ronald Lee King pulls no punches. This book is the wake-up call our community has been waiting for.",
    author: "Community Reader",
    location: "Atlanta, GA"
  },
  {
    text: "I finally understand why the system is designed the way it is. Knowledge is the first weapon.",
    author: "Book Club Member",
    location: "Chicago, IL"
  },
  {
    text: "From the Loins of the Beast breaks down the UPL law and the exploitation loop in plain English. Required reading.",
    author: "Legal Advocate",
    location: "Houston, TX"
  }
]

function BookCheckoutButton() {
  const checkout = trpc.stripe.createCheckoutByPriceId.useMutation({
    onSuccess: (data) => {
      if (data.url) {
        window.location.href = data.url
      } else if (data.testMode) {
        alert('Test mode: ' + data.message)
      }
    },
    onError: (err) => {
      alert('Checkout error: ' + err.message)
    },
  })

  const handleCheckout = () => {
    const successUrl = window.location.origin + '/?payment=success'
    const cancelUrl = window.location.origin + '/?payment=cancelled'
    checkout.mutate({
      priceId: BOOK_PRICE_ID,
      successUrl,
      cancelUrl,
    })
  }

  return (
    <button 
      onClick={handleCheckout}
      disabled={checkout.isPending}
      className="w-full flex items-center justify-center gap-2 rounded-full h-12 bg-[#FF9500] text-[#1B2838] hover:bg-[#CC6A00] transition-colors font-['Newsreader'] tracking-[0.02em] font-medium disabled:opacity-50"
      style={{ boxShadow: '0 4px 16px rgba(255,149,0,0.25)' }}
    >
      <BookOpen size={18} />
      {checkout.isPending ? 'Loading...' : 'Order Now — $19.99'}
    </button>
  )
}

export default function BookPromoSection() {
  return (
    <section id="book" className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/bg-about.jpg)' }} />
      <div className="absolute inset-0 bg-[#1B2838]/85" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.08em] text-[#C9B99A] mb-12">THE BOOK</p>
        </ScrollReveal>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          
          {/* Book Cover + Details */}
          <div className="lg:w-[40%] flex-shrink-0">
            <ScrollReveal delay={0.15}>
              <div className="relative mb-8">
                <div className="rounded-lg overflow-hidden" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(255,149,0,0.15)' }}>
                  <img 
                    src="/images/book-cover.jpg" 
                    alt="The African American State of the Union: From the Loins of the Beast"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <div className="bg-[rgba(27,40,56,0.85)] backdrop-blur-lg rounded border border-[rgba(255,149,0,0.2)] p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl text-[#FF9500] font-medium">$19.99</span>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(i => <Star key={i} size={14} className="text-[#FF9500] fill-[#FF9500]" />)}
                  </div>
                </div>
                <p className="text-xs text-[#C9B99A] mb-2">Digital Edition — Available Now</p>
                <p className="text-[10px] text-[#C9B99A]/60 mb-4">Paperback ($24.99) &amp; Signed Edition ($49.99) coming soon</p>
                <BookCheckoutButton />
              </div>
            </ScrollReveal>
          </div>

          {/* Book Description */}
          <div className="lg:w-[60%]">
            <ScrollReveal delay={0.2}>
              <h2 className="text-4xl md:text-5xl text-[#F0EBE1] tracking-[-0.02em] leading-[1.08] mb-6 text-shadow-hero">
                The Truth They Don't Want You to Read
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="bg-[rgba(27,40,56,0.8)] backdrop-blur-lg rounded border-l-2 border-[#FF9500] p-6 mb-8">
                <Quote size={20} className="text-[#FF9500] mb-3" />
                <p className="text-lg text-[#F0EBE1] italic leading-relaxed">
                  "I didn't set out to become the voice of a movement. I set out to write a book that told the truth about what I saw happening in our communities — the legal traps, the systemic exploitation, the ways the system is designed to keep us struggling while others profit."
                </p>
                <p className="text-sm text-[#FF9500] mt-3">— Ronald Lee King</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="space-y-4 text-[#C9B99A] leading-relaxed mb-8">
                <p>
                  <strong className="text-[#F0EBE1]">The African American State of the Union: From the Loins of the Beast</strong> is not just a book — it's a weapon. A blueprint. A survival guide for navigating a legal system that was never designed to protect us.
                </p>
                <p>
                  Inside these pages, you'll find the unfiltered truth about the <span className="text-[#FF9500]">Unauthorized Practice of Law (UPL)</span> loophole that keeps Black families from accessing affordable legal help. You'll understand how public defenders operate in a system that profits from your struggle. And you'll learn what motions, forms, and tools you need to fight back.
                </p>
                <p>
                  This is the foundation of #TheKingsTake. The book that started the movement. The starting point for every community member who refuses to walk into a courtroom defenseless.
                </p>
              </div>
            </ScrollReveal>

            {/* What's Inside */}
            <ScrollReveal delay={0.5}>
              <h3 className="text-lg text-[#F0EBE1] uppercase tracking-[0.04em] mb-4">What's Inside</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                {[
                  "The UPL Law Explained",
                  "How Public Defenders Profit",
                  "The Exploitation Loop",
                  "5 Critical Motions to Know",
                  "How to Write Your Own Motions",
                  "Building Community Networks",
                  "Understanding Your Rights",
                  "The Path to Justice"
                ].map((item, i) => (
                  <motion.div 
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.05 }}
                    className="flex items-center gap-3 text-sm text-[#C9B99A]"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FF9500] shrink-0" />
                    {item}
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>

            {/* Testimonials */}
            <ScrollReveal delay={0.55}>
              <h3 className="text-lg text-[#F0EBE1] uppercase tracking-[0.04em] mb-4">What Readers Say</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {testimonials.map((t, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="bg-[rgba(42,58,74,0.6)] rounded border border-[rgba(255,149,0,0.15)] p-4"
                  >
                    <Quote size={14} className="text-[#FF9500] mb-2" />
                    <p className="text-xs text-[#C9B99A] italic mb-3 leading-relaxed">"{t.text}"</p>
                    <p className="text-xs text-[#F0EBE1]">{t.author}</p>
                    <p className="text-[10px] text-dimded">{t.location}</p>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
