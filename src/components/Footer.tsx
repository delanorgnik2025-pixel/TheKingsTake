import { Link } from 'react-router'
import { BookOpen, Mail, Globe, Shield } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.06]" style={{ background: '#050508' }}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-12">
        <div className="grid md:grid-cols-12 gap-8 mb-10">
          <div className="md:col-span-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded flex items-center justify-center border border-[#00ff41]/30 bg-[#00ff41]/5">
                <span className="text-[#00ff41] font-bold text-sm font-display">K</span>
              </div>
              <div>
                <span className="text-sm font-bold tracking-[0.12em] text-white font-display">THEKINGSTAKE</span>
                <span className="block text-[8px] tracking-[0.3em] uppercase font-mono-tech -mt-0.5" style={{ color: '#00ff41' }}>
                  // NEWS & INTELLIGENCE
                </span>
              </div>
            </div>
            <p className="text-[12px] text-white/40 leading-relaxed mb-4 max-w-xs">
              The digital infrastructure for the African American State of the Union. News, technology, genealogy, and justice.
            </p>
            <span className="text-[9px] text-white/20 font-mono-tech block">D-U-N-S: 14-313-0197</span>
          </div>
          <div className="md:col-span-2">
            <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/50 mb-4 font-mono-tech">PLATFORM</h4>
            <ul className="space-y-2">
              <li><Link to="/news" className="text-[12px] text-white/40 hover:text-[#00ff41] transition-colors font-tech">News Hub</Link></li>
              <li><Link to="/heritage" className="text-[12px] text-white/40 hover:text-[#00ff41] transition-colors font-tech">Heritage Map</Link></li>
              <li><Link to="/writing-services" className="text-[12px] text-white/40 hover:text-[#00ff41] transition-colors font-tech">Writing Services</Link></li>
              <li><Link to="/work-with-me" className="text-[12px] text-white/40 hover:text-[#00ff41] transition-colors font-tech">Justice & Petition</Link></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/50 mb-4 font-mono-tech">RESOURCES</h4>
            <ul className="space-y-2">
              <li><Link to="/ancestor-root-registry" className="text-[12px] text-white/40 hover:text-[#00ff41] transition-colors font-tech">Ancestor Registry</Link></li>
              <li><Link to="/pre-order" className="text-[12px] text-white/40 hover:text-[#d4a843] transition-colors font-tech">Pre-Order Book</Link></li>
              <li><Link to="/about-author" className="text-[12px] text-white/40 hover:text-[#00ff41] transition-colors font-tech">About the Author</Link></li>
              <li><Link to="/blog" className="text-[12px] text-white/40 hover:text-[#00ff41] transition-colors font-tech">Archive</Link></li>
            </ul>
          </div>
          <div className="md:col-span-4">
            <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/50 mb-4 font-mono-tech">CONNECT</h4>
            <p className="text-[12px] text-white/40 leading-relaxed mb-4">
              Built by AASOTU Media Group LLC — digital infrastructure for a new sovereign future.
            </p>
            <div className="flex gap-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded flex items-center justify-center border border-white/[0.08] text-white/30 hover:text-[#00ff41] hover:border-[#00ff41]/30 transition-all">
                <Globe size={14} />
              </a>
              <a href="mailto:contact@thekingstake.com" className="w-8 h-8 rounded flex items-center justify-center border border-white/[0.08] text-white/30 hover:text-[#00ff41] hover:border-[#00ff41]/30 transition-all">
                <Mail size={14} />
              </a>
            </div>
          </div>
        </div>
        <div className="pt-6 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[10px] text-white/20 font-mono-tech">© 2026 AASOTU MEDIA GROUP LLC. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/admin/login" className="text-[9px] text-white/15 hover:text-white/40 font-mono-tech transition-colors">Admin</Link>
            <span className="text-[9px] text-white/15 font-mono-tech">D-U-N-S: 14-313-0197</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
