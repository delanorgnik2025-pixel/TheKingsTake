import { Link } from 'react-router'
import { Microscope, ChevronRight, ShieldAlert } from 'lucide-react'
import HeroSection from '../sections/HeroSection'
import HeroPortraitSection from '../sections/HeroPortraitSection'
import HeritageSection from '../sections/HeritageSection'
import AncestryResearchSection from '../sections/AncestryResearchSection'
import AboutSection from '../sections/AboutSection'
import ServicesSection from '../sections/ServicesSection'
import WritingMarketSection from '../sections/WritingMarketSection'
import MarqueeDivider from '../components/MarqueeDivider'

import ContactSection from '../sections/ContactSection'
import AncestorRootRegistrySection from '../sections/AncestorRootRegistrySection'
import AncestorRealmTeaser from '../sections/AncestorRealmTeaser'

export default function HomePage() {
  return (
    <main>
      {/* 1. Ronald's Cosmic Portrait — Indigenous Aboriginal Royal American */}
      <HeroPortraitSection />

      {/* 2. Book Promo + Blog Feed + Video Box */}
      <MarqueeDivider text="#TheKingsTake — From the Loins of the Beast — The African American State of the Union — Pre-Order Now" />
      <HeroSection />

      {/* 3. Indigenous Soul Tribe Map — Cosmic aesthetic continues */}
      <MarqueeDivider text="#TheKingsTake — We Were Here Before Anybody — Discover Your Roots — 225+ Nations Documented — The Land Remembers" />
      <HeritageSection />

      {/* 4. Ancestor Root Registry — The Sacred Archive */}
      <MarqueeDivider text="#TheKingsTake — Plant Your Roots — Preserve Your Legacy — Ancestor Root Registry — Your Bloodline Awaits" />
      <AncestorRootRegistrySection />

      {/* 4.5 Forensics Lab Promo */}
      <MarqueeDivider text="#TheKingsTake — Learn Forensic Science by Doing It — Evidence Over Narrative — The Virtual Forensics Lab" />
      <section className="relative bg-[#05080e] py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(255,149,0,0.02)] to-transparent" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-[rgba(255,149,0,0.1)] border border-[rgba(255,149,0,0.2)] rounded-full px-4 py-1.5 mb-4">
                <Microscope size={14} className="text-[#FF9500]" />
                <span className="text-[10px] uppercase tracking-[0.15em] text-[#FF9500] font-medium">New — Virtual Forensics Lab</span>
              </div>
              <h2 className="text-3xl md:text-4xl text-[#F0EBE1] font-medium leading-[1.1] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Enter the Virtual<br />Forensics Lab
              </h2>
              <p className="text-sm text-[#C9B99A]/70 mb-4 leading-relaxed max-w-lg">
                Investigate fictional crime scenes, analyze evidence, and learn real forensic science. 
                Understand the difference between evidence and narrative — and why wrongful convictions 
                happen when that distinction is ignored.
              </p>
              <div className="flex items-center gap-2 text-[10px] text-[#C9B99A]/40 mb-6">
                <ShieldAlert size={12} />
                <span>Educational purposes only. All cases are fictional.</span>
              </div>
              <Link
                to="/forensics-lab"
                className="inline-flex items-center gap-2 rounded-full h-12 px-8 bg-[#FF9500] text-[#1B2838] hover:bg-[#CC6A00] transition-colors font-medium"
                style={{ boxShadow: '0 4px 16px rgba(255,149,0,0.25)' }}
              >
                <Microscope size={18} /> Start Investigating <ChevronRight size={16} />
              </Link>
            </div>
            <div className="flex-shrink-0 w-full md:w-80">
              <div className="bg-[rgba(27,40,56,0.6)] border border-[rgba(255,149,0,0.15)] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-[rgba(255,149,0,0.1)] border border-[rgba(255,149,0,0.2)] flex items-center justify-center">
                    <Microscope size={24} className="text-[#FF9500]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#F0EBE1] font-medium">The Beach Homicide</p>
                    <p className="text-[10px] text-[#C9B99A]/50">Case #001 — Beginner</p>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#C9B99A]/50">Evidence Items</span>
                    <span className="text-[#FF9500]">8</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#C9B99A]/50">Lab Stations</span>
                    <span className="text-[#FF9500]">3</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#C9B99A]/50">Est. Time</span>
                    <span className="text-[#FF9500]">25-35 min</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[9px] text-[#C9B99A]/40 bg-[rgba(27,40,56,0.6)] rounded-full px-2 py-0.5">Fingerprint</span>
                  <span className="text-[9px] text-[#C9B99A]/40 bg-[rgba(27,40,56,0.6)] rounded-full px-2 py-0.5">Autopsy</span>
                  <span className="text-[9px] text-[#C9B99A]/40 bg-[rgba(27,40,56,0.6)] rounded-full px-2 py-0.5">Digital</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Ancestor Realm Teaser — Enter the Sacred Garden */}
      <MarqueeDivider text="#TheKingsTake — Walk Among the Ancestors — Enter the Sacred Garden — Their Wisdom Lives On" />
      <AncestorRealmTeaser />

      {/* 5. Ancestry Research & Dawes Rolls — Reclaim Your Heritage */}
      <MarqueeDivider text="#TheKingsTake — They Hid Our Identity in the Records — Search the Dawes Rolls — Reclaim What Was Taken — Your Ancestors Are Waiting" />
      <AncestryResearchSection />

      {/* 6. GTA-Style Platform Sections */}
      <AboutSection />
      <ServicesSection />
      <WritingMarketSection />
      <MarqueeDivider text="#TheKingsTake — The People's Voice — AASOTU Media Group — Advocacy. Truth. Justice." />
      {/* Blog content now featured prominently after hero section */}
      <ContactSection />
    </main>
  )
}
