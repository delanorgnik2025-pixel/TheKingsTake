import { motion } from 'framer-motion'
import ScrollReveal from '../components/ScrollReveal'
import CTAButton from '../components/CTAButton'

const credentials = [
  { label: 'Author', text: 'The African American State of the Union' },
  { label: 'Founder', text: 'AASOTU Media Group LLC' },
  { label: 'Advocate', text: 'Community Justice & Legal Empowerment' },
  { label: 'Voice', text: '12,000+ Followers on Facebook' },
]

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden">
      {/* GTA-style background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/bg-about.jpg)' }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#1B2838]/75" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.08em] text-[#C9B99A] mb-12">
            THE MISSION
          </p>
        </ScrollReveal>

        <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-center">
          {/* Text content */}
          <div className="md:w-[55%]">
            <ScrollReveal delay={0.15}>
              <h2 className="text-4xl md:text-5xl lg:text-[56px] text-[#F0EBE1] tracking-[-0.02em] leading-[1.08] mb-6 text-shadow-hero">
                From the Loins of the Beast
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <p className="text-base text-[#C9B99A] leading-relaxed max-w-[520px] mb-8">
                I am Ronald Lee King, author of <em>The African American State of the Union: From the Loins of the Beast</em> and founder of AASOTU Media Group LLC. I am the People's voice — advocating for Black communities exploited by a system that keeps legal help out of reach. Through #TheKingsTake, I fight to expose the truth, empower our people with knowledge, and build networks that serve the community first.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.35}>
              <div className="space-y-3 mb-8">
                {credentials.map((cred, i) => (
                  <motion.div
                    key={cred.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FF9500] shrink-0" />
                    <p className="text-sm text-[#F0EBE1]">
                      <span className="font-medium">{cred.label}</span>
                      {' — '}
                      <span className="text-[#C9B99A]">{cred.text}</span>
                    </p>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.5}>
              <CTAButton onClick={() => {
                const el = document.getElementById('services')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}>
                Explore My Services
              </CTAButton>
            </ScrollReveal>
          </div>

          {/* Portrait image */}
          <div className="md:w-[45%]">
            <ScrollReveal delay={0.2} distance={40}>
              <div className="rounded-lg overflow-hidden"
                style={{
                  boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 30px rgba(255,149,0,0.15)',
                }}>
                <img
                  src="/images/about-portrait.jpg"
                  alt="Ronald Lee King — The People's Voice"
                  className="w-full h-auto object-cover aspect-[3/4] md:aspect-[3/4] hover:scale-105 transition-transform duration-600"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
