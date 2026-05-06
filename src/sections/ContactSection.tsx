import { Facebook, Instagram, Youtube, Twitter, ArrowRight } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'
import CTAButton from '../components/CTAButton'

const socialLinks = [
  { icon: Facebook, label: 'Facebook', followers: '12,000+ Followers', href: 'https://www.facebook.com/thekingstake' },
  { icon: Instagram, label: 'Instagram', followers: 'Coming Soon', href: '#' },
  { icon: Youtube, label: 'YouTube', followers: 'Coming Soon', href: '#' },
  { icon: Twitter, label: 'Twitter/X', followers: 'Coming Soon', href: '#' },
]

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden">
      {/* GTA-style background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/bg-contact.jpg)' }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#1B2838]/75" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.08em] text-[#C9B99A] mb-12">
            CONNECT
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <h2 className="text-4xl md:text-5xl lg:text-[56px] text-[#F0EBE1] tracking-[-0.02em] leading-[1.08] mb-4 text-shadow-hero">
            Let's Build Something Powerful Together.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <p className="text-base text-[#C9B99A] max-w-[600px] mb-12">
            Whether you need a website that commands attention, writing that moves people, or you want to join the fight for justice — I'm here. Let's connect and make it happen.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Contact Info Panel */}
          <ScrollReveal delay={0.35} direction="left" distance={30}>
            <div
              className="bg-[rgba(27,40,56,0.85)] backdrop-blur-lg rounded border border-[rgba(255,149,0,0.3)] p-6"
              style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
            >
              <div className="flex gap-1 mb-3">
                {[0, 1, 2].map(i => (
                  <div key={i} className="w-[3px] h-[3px] rounded-full bg-[#FFB840]" />
                ))}
              </div>
              <p className="text-xs uppercase tracking-[0.08em] text-[#FFB840] mb-6">
                CONTACT INFO
              </p>
              <div className="space-y-4 font-mono-hud text-sm">
                <div>
                  <span className="text-[#FF9500] text-xs uppercase">EMAIL:</span>
                  <p className="text-[#F0EBE1] mt-1">thekingstake@email.com</p>
                </div>
                <div>
                  <span className="text-[#FF9500] text-xs uppercase">PHONE:</span>
                  <p className="text-[#C9B99A] mt-1">Available upon request</p>
                </div>
                <div>
                  <span className="text-[#FF9500] text-xs uppercase">COMPANY:</span>
                  <p className="text-[#C9B99A] mt-1">AASOTU Media Group LLC</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Social Media Panel */}
          <ScrollReveal delay={0.35} direction="right" distance={30}>
            <div
              className="bg-[rgba(27,40,56,0.85)] backdrop-blur-lg rounded border border-[rgba(255,149,0,0.3)] p-6"
              style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
            >
              <div className="flex gap-1 mb-3">
                {[0, 1, 2].map(i => (
                  <div key={i} className="w-[3px] h-[3px] rounded-full bg-[#FFB840]" />
                ))}
              </div>
              <p className="text-xs uppercase tracking-[0.08em] text-[#FFB840] mb-6">
                FOLLOW THE MOVEMENT
              </p>
              <div className="space-y-4">
                {socialLinks.map(social => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 group cursor-pointer"
                    >
                      <Icon size={18} className="text-[#C9B99A] group-hover:text-[#FF9500] transition-colors" />
                      <div>
                        <p className="text-base text-[#F0EBE1] group-hover:text-[#FF9500] transition-colors">
                          {social.label}
                        </p>
                        <p className="text-xs text-[#C9B99A]">{social.followers}</p>
                      </div>
                      <ArrowRight size={14} className="text-[#FF9500] ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  )
                })}
              </div>
              <div className="mt-6 pt-4 border-t border-[rgba(240,235,225,0.08)]">
                <a
                  href="https://www.facebook.com/thekingstake"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono-hud text-xs text-[#FF9500] hover:underline cursor-pointer"
                >
                  www.facebook.com/thekingstake
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Primary CTA */}
        <ScrollReveal delay={0.5} className="flex justify-center mt-12">
          <CTAButton
            size="large"
            onClick={() => window.location.href = 'mailto:thekingstake@email.com'}
          >
            GET IN TOUCH
          </CTAButton>
        </ScrollReveal>
      </div>
    </section>
  )
}
