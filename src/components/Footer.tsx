import { FormEvent, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { Facebook, Instagram } from 'lucide-react'
import { trpc } from '@/providers/trpc'

interface FooterProps {
  onNavClick: (id: string) => void
}

const socialLinks = [
  { icon: Facebook, href: 'https://www.facebook.com/thekingstake', label: 'Facebook' },
  { icon: Instagram, href: 'https://www.instagram.com/thekingstake/', label: 'Instagram' },
]

export default function Footer({ onNavClick }: FooterProps) {
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const subscribe = trpc.engagement.subscribe.useMutation()
  const submitNewsletter = async (event: FormEvent) => {
    event.preventDefault()
    await subscribe.mutateAsync({ email, sourcePage: location.pathname, interests: ['book', 'community', 'news'], consent: true })
    setSubscribed(true); setEmail('')
  }
  return (
    <footer className="bg-[#3A4E64] pt-20 pb-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Brand */}
        <div className="mb-10">
          <h3 className="text-2xl text-[#F0EBE1] mb-2">#TheKingsTake</h3>
          <p className="text-xs text-[#C9B99A]">The People's Voice | AASOTU Media Group LLC</p>
        </div>

        <div className="mb-10 max-w-xl rounded-xl border border-[#FF9500]/20 bg-[#182635]/40 p-5">
          <h4 className="mb-1 text-lg text-[#F0EBE1]">The King's Dispatch</h4>
          <p className="mb-3 text-xs leading-relaxed text-[#C9B99A]">Book updates, community strategy, major investigations, and selected releases from #TheKingsTake.</p>
          {subscribed ? <p className="text-sm text-emerald-300">You are on the list. Welcome.</p> : <form onSubmit={submitNewsletter} className="flex flex-col gap-2 sm:flex-row">
            <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email address" className="min-w-0 flex-1 rounded-lg bg-[#0f1b29] px-3 py-2 text-sm text-white outline-none"/>
            <button disabled={subscribe.isPending} className="rounded-lg bg-[#FF9500] px-4 py-2 text-sm font-bold text-[#182635]">Join the Newsletter</button>
          </form>}
          <p className="mt-2 text-[10px] text-[#C9B99A]/60">By joining, you consent to receive email updates. Unsubscribe links will be included in every newsletter.</p>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap gap-6 mb-10">
          <Link to="/" className="text-sm text-[#C9B99A] hover:text-[#FF9500] transition-colors duration-200">Home</Link>
          <Link to="/writing-services" className="text-sm text-[#C9B99A] hover:text-[#FF9500] transition-colors duration-200">Writing Services</Link>
          <Link to="/civics" className="text-sm text-[#C9B99A] hover:text-[#FF9500] transition-colors duration-200">Civics</Link>
          <a href="/#heritage" className="text-sm text-[#C9B99A] hover:text-[#FF9500] transition-colors duration-200">Heritage</a>
          <button onClick={() => onNavClick('services')} className="text-sm text-[#C9B99A] hover:text-[#FF9500] transition-colors duration-200 cursor-pointer">Services</button>
          <Link to="/feed" className="text-sm text-[#C9B99A] hover:text-[#FF9500] transition-colors duration-200">The Feed</Link>
          <button onClick={() => onNavClick('contact')} className="text-sm text-[#C9B99A] hover:text-[#FF9500] transition-colors duration-200 cursor-pointer">Contact</button>
          <Link to="/privacy-policy" className="text-sm text-[#C9B99A] hover:text-[#FF9500] transition-colors duration-200">Privacy Policy</Link>
        </div>

        {/* Social */}
        <div className="flex gap-4 mb-10">
          {socialLinks.map(social => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C9B99A] hover:text-[#FF9500] transition-colors duration-200"
              aria-label={social.label}
            >
              <social.icon size={20} />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-[rgba(240,235,225,0.08)]">
          <p className="text-xs text-[rgba(201,185,154,0.4)]">
            &copy; 2025 Ronald Lee King. All rights reserved.
          </p>
          <p className="text-xs text-[rgba(201,185,154,0.3)] mt-1">
            Built with purpose. Powered by truth.
          </p>
        </div>
      </div>
    </footer>
  )
}
