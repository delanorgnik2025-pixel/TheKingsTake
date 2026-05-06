import { Facebook, Instagram, Youtube, Twitter } from 'lucide-react'

interface FooterProps {
  onNavClick: (id: string) => void
}

const navLinks = [
  { label: 'About', id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Legal Hub', id: 'legal-hub' },
  { label: 'Blog', id: 'blog' },
  { label: 'Contact', id: 'contact' },
]

const socialLinks = [
  { icon: Facebook, href: 'https://www.facebook.com/thekingstake', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Twitter, href: '#', label: 'Twitter/X' },
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
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => onNavClick(link.id)}
              className="text-sm text-[#C9B99A] hover:text-[#FF9500] transition-colors duration-200 cursor-pointer"
            >
              {link.label}
            </button>
          ))}
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
