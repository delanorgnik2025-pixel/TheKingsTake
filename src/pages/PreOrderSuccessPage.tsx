import { motion } from 'framer-motion'
import { ArrowLeft,BookOpen,CheckCircle,Clock,Mail,Share2 } from 'lucide-react'
import { useNavigate } from 'react-router'
import ScrollReveal from '../components/ScrollReveal'

export default function PreOrderSuccessPage() {
  const navigate = useNavigate()

  const handleShare = () => {
    const text = "I just pre-ordered 'The African American State of the Union: From the Loins of the Beast' by Ronald Lee King. This is history in the making. #TheKingsTake"
    if (navigator.share) {
      navigator.share({ title: 'TheKingsTake Book Pre-Order', text, url: 'https://thekingstake.com/pre-order' })
    } else {
      navigator.clipboard.writeText(text + ' https://thekingstake.com/pre-order')
      alert('Copied to clipboard!')
    }
  }

  return (
    <div className="min-h-screen bg-[#05080e] flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <ScrollReveal>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', duration: 0.5 }}
            className="w-20 h-20 rounded-full bg-[rgba(255,149,0,0.1)] border-2 border-[#FF9500] flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-[#FF9500]" />
          </motion.div>

          <h1 className="text-2xl sm:text-3xl text-[#F0EBE1] font-medium mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Thank You for Your Support
          </h1>

          <p className="text-sm text-[#C9B99A]/70 mb-2">
            If you completed checkout, check your Stripe receipt to confirm your hardcover pre-order. This page alone does not verify payment.
          </p>

          <p className="text-xs text-[#C9B99A]/50 mb-8">
            AASOTU Media Group LLC thanks you for your support during this historic independent release.
          </p>

          {/* What's Next */}
          <div className="bg-[rgba(37,54,75,0.4)] border border-[rgba(255,149,0,0.1)] rounded-xl p-5 text-left mb-8">
            <p className="text-[10px] uppercase tracking-[0.12em] text-[#FF9500] mb-4">What Happens Next</p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail size={14} className="text-[#FF9500] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-[#F0EBE1]">Order Confirmation Email</p>
                  <p className="text-[11px] text-[#C9B99A]/50">Your Stripe receipt confirms a completed payment. Contact us if you need help locating it.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={14} className="text-[#FF9500] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-[#F0EBE1]">Production Updates</p>
                  <p className="text-[11px] text-[#C9B99A]/50">Final editing and proof approval are in progress. Join the newsletter for book updates.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <BookOpen size={14} className="text-[#FF9500] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-[#F0EBE1]">Hardcover Delivery</p>
                  <p className="text-[11px] text-[#C9B99A]/50">Publication and shipping dates will be confirmed after the final proof is approved.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Share */}
          <button onClick={handleShare}
            className="w-full flex items-center justify-center gap-2 rounded-full h-11 border border-[rgba(255,149,0,0.2)] text-[#FF9500] hover:bg-[rgba(255,149,0,0.08)] transition-colors text-sm font-medium mb-3">
            <Share2 size={16} />
            Share With Your Network
          </button>

          <button onClick={() => navigate('/')}
            className="w-full flex items-center justify-center gap-2 rounded-full h-11 text-[#C9B99A]/60 hover:text-[#F0EBE1] transition-colors text-sm">
            <ArrowLeft size={14} />
            Return to Homepage
          </button>

          <p className="text-[9px] text-[#C9B99A]/20 mt-6">
            Need help? Contact support at thekingstake.com/contact
          </p>
        </ScrollReveal>
      </div>
    </div>
  )
}
