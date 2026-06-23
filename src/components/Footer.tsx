import { Link } from 'react-router'
import { Facebook, Instagram } from 'lucide-react'

interface FooterProps {
  onNavClick: (id: string) => void
}

const socialLinks = [
  { icon: Facebook, href: 'https://www.facebook.com/thekingstake', label: 'Facebook' },
  { icon: Instagram, href: 'https://www.instagram.com/thekingstake/', label: 'Instagram' },
]

export default function Footer({ onNavClick }: FooterProps) {
  return (
    <footer className="bg-[#2A3A4A] pt-20 pb-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Brand */}
        <div className="mb-10">
          <h3 className="text-2xl text-[#F0EBE1] mb-2">#TheKingsTake</h3>
          <p className="text-xs text-[#C9B99A]">The People's Voice | AASOTU Media Group LLC</p>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap gap-6 mb-10">
          <Link to="/" className="text-sm text-[#C9B99A] hover:text-[#FF9500] transition-colors duration-200">Home</Link>
          <Link to="/writing-services" className="text-sm text-[#C9B99A] hover:text-[#FF9500] transition-colors duration-200">Writing Services</Link>
          <Link to="/civics" className="text-sm text-[#C9B99A] hover:text-[#FF9500] transition-colors duration-200">Civics</Link>
          <a href="/#heritage" className="text-sm text-[#C9B99A] hover:text-[#FF9500] transition-colors duration-200">Heritage</a>
          <button onClick={() => onNavClick('services')} className="text-sm text-[#C9B99A] hover:text-[#FF9500] transition-colors duration-200 cursor-pointer">Services</button>
          <Link to="/blog" className="text-sm text-[#C9B99A] hover:text-[#FF9500] transition-colors duration-200">Blog</Link>
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
