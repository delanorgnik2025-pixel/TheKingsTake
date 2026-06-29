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
    text: "I finally see through the stereotypes they feed us. This book changed how I view our place in America.",
    author: "Book Club Member",
    location: "Chicago, IL"
  },
  {
    text: "From the Loins of the Beast dismantles every lie we've been told about who we are and what we can become. Required reading.",
    author: "Community Advocate",
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
                <div className="p-1" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(255,149,0,0.15)' }}>
                  <img 
                    src="/images/book-cover.jpg" 
                    alt="The African American State of the Union: From the Loins of the Beast"
                    className="w-full h-auto object-cover rounded-lg"
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
                  "I didn't set out to become the voice of a movement. I set out to write a book that confronted the stereotypes we've been force-fed, challenged the lies about our place in this country, and charted a path toward a new Industrial Revolution built by and for Black people in America."
                </p>
                <p className="text-sm text-[#FF9500] mt-3">— Ronald Lee King</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="space-y-4 text-[#C9B99A] leading-relaxed mb-8">
                <p>
                  <strong className="text-[#F0EBE1]">The African American State of the Union: From the Loins of the Beast</strong> is more than a book — it is an unfiltered, high-octane call to action.
                </p>
                <p>
                  Written in the fires of the pandemic and landing at a moment when the world feels on the brink of another, this is a raw, no-holds-barred diagnostic of the modern Black experience in America. There are no chapters here. No breaks. No pauses to catch your breath. It is a straight read-through designed to deliver hard truths with absolutely no chaser.
                </p>
                <p>
                  This unbiased manifesto challenges both the upcoming generation and the elders to wake up, analyze the global landscape, and seize the unprecedented opportunities of a rising collective consciousness. It tackles the massive, systemic forces holding communities back — from the devastating psychological conditioning that institutionalizes men inside county jails and state prisons, to the structural realities of modern police departments.
                </p>
                <p>
                  But diagnosis is nothing without a cure. The book lays out a bold blueprint for an economic and industrial revolution, issuing a fierce rallying cry for African Americans to <span className="text-[#FF9500]">own the means of production</span>, build self-sustaining enterprises, and permanently sever dependence on systems designed only for survival. Featuring direct, uncompromising messages for Black women, white people, and the world at large, this book demands that you stop watching history happen — and finally step into the arena to change it.
                </p>
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
