import { useState } from 'react'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Shield, Scale, Users, BookOpen, Phone, MapPin, AlertTriangle, Heart, Gavel, GraduationCap } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'
import MarqueeDivider from '../components/MarqueeDivider'

const RESOURCE_CATEGORIES = [
  {
    id: 'civil-rights',
    title: 'Civil Rights Organizations',
    icon: Shield,
    color: '#FF9500',
    resources: [
      { name: 'ACLU — American Civil Liberties Union', desc: 'Defending civil liberties and rights nationwide. Free legal help for constitutional violations.', url: 'https://www.aclu.org' },
      { name: 'NAACP Legal Defense Fund', desc: 'Fighting for racial justice through litigation, advocacy, and education.', url: 'https://www.naacpldf.org' },
      { name: 'Southern Poverty Law Center', desc: 'Monitoring hate groups and seeking justice for the most vulnerable.', url: 'https://www.splcenter.org' },
      { name: 'Color of Change', desc: 'Designing campaigns to end practices that unfairly hold Black people back.', url: 'https://colorofchange.org' },
      { name: 'Equal Justice Initiative', desc: 'Committed to ending mass incarceration and excessive punishment.', url: 'https://eji.org' },
      { name: 'The Bail Project', desc: 'National nonprofit providing free bail assistance and pretrial support.', url: 'https://bailproject.org' },
    ],
  },
  {
    id: 'legal-aid',
    title: 'Free Legal Aid & Representation',
    icon: Scale,
    color: '#FFB840',
    resources: [
      { name: 'Legal Services Corporation', desc: 'Nationwide network of free legal aid for low-income Americans.', url: 'https://www.lsc.gov' },
      { name: 'LawHelp.org', desc: 'Find free legal aid programs in your state. Directories by legal issue.', url: 'https://www.lawhelp.org' },
      { name: 'National Legal Aid & Defender Association', desc: 'Advancing justice for people living in poverty.', url: 'https://www.nlada.org' },
      { name: 'Pro Bono Net', desc: 'Connecting advocates with people in need of legal help.', url: 'https://www.probono.net' },
      { name: 'Pretrial Justice Institute', desc: 'Reforming pretrial systems to reduce unnecessary detention.', url: 'https://www.pretrial.org' },
      { name: 'Innocence Project', desc: 'Free legal services for wrongfully convicted individuals.', url: 'https://innocenceproject.org' },
    ],
  },
  {
    id: 'know-your-rights',
    title: 'Know Your Rights Resources',
    icon: BookOpen,
    color: '#C9B99A',
    resources: [
      { name: 'Flex Your Rights', desc: 'Educational resources on police encounters and constitutional rights.', url: 'https://www.flexyourrights.org' },
      { name: 'National Police Accountability Project', desc: 'Educational resources on police misconduct and accountability.', url: 'https://www.npap.org' },
      { name: 'Prison Policy Initiative', desc: 'Research and advocacy on mass incarceration and detention.', url: 'https://www.prisonpolicy.org' },
      { name: 'Justia — Free Legal Information', desc: 'Free case law, codes, regulations and legal information for consumers.', url: 'https://www.justia.com' },
      { name: 'CourtListener', desc: 'Free legal research platform with millions of court opinions.', url: 'https://www.courtlistener.com' },
      { name: 'Legal Information Institute (Cornell)', desc: 'Free access to laws and legal resources from Cornell Law.', url: 'https://www.law.cornell.edu' },
    ],
  },
  {
    id: 'community',
    title: 'Community Support & Advocacy',
    icon: Users,
    color: '#FF9500',
    resources: [
      { name: 'Black Lives Matter', desc: 'Global organization advocating for Black lives and combating racism.', url: 'https://blacklivesmatter.com' },
      { name: 'National Urban League', desc: 'Enabling African Americans to secure economic self-reliance.', url: 'https://nul.org' },
      { name: 'National Action Network', desc: 'Civil rights organization founded by Rev. Al Sharpton.', url: 'https://nationalactionnetwork.net' },
      { name: 'The Marshall Project', desc: 'Nonprofit journalism about criminal justice and mass incarceration.', url: 'https://www.themarshallproject.org' },
      { name: 'Vera Institute of Justice', desc: 'Research and innovation to transform justice systems.', url: 'https://www.vera.org' },
      { name: 'Reform Alliance', desc: 'Advocating for probation and parole reform nationwide.', url: 'https://reformalliance.com' },
    ],
  },
  {
    id: 'emergency',
    title: 'Emergency Legal Help Hotlines',
    icon: Phone,
    color: '#dc2626',
    resources: [
      { name: 'National Lawyers Guild', desc: 'Legal support for activists and protesters. Hotline for arrests.', url: 'https://www.nlg.org' },
      { name: 'Civil Rights Corps', desc: 'Challenging systemic injustice in American legal systems.', url: 'https://civilrightscorps.org' },
      { name: 'National Domestic Violence Hotline', desc: '24/7 support for domestic violence survivors. 1-800-799-7233', url: 'https://www.thehotline.org' },
      { name: 'Crisis Text Line', desc: 'Free 24/7 crisis support. Text HOME to 741741.', url: 'https://www.crisistextline.org' },
      { name: 'SAMHSA National Helpline', desc: 'Free, confidential, 24/7 treatment referral. 1-800-662-4357', url: 'https://www.samhsa.gov/find-help/national-helpline' },
      { name: 'FindLaw — Lawyer Directory', desc: 'Search for attorneys by location and practice area.', url: 'https://www.findlaw.com' },
    ],
  },
  {
    id: 'education',
    title: 'Legal Education & Self-Help',
    icon: GraduationCap,
    color: '#C9B99A',
    resources: [
      { name: 'American Bar Association — Free Legal Answers', desc: 'Pro bono legal advice for qualifying individuals.', url: 'https://www.abafreelegalanswers.org' },
      { name: 'Nolo — Legal Encyclopedia', desc: 'Plain-English legal information, articles, and forms.', url: 'https://www.nolo.com' },
      { name: 'Public Justice', desc: 'Using litigation to fight for social and economic justice.', url: 'https://www.publicjustice.net' },
      { name: 'Movement for Black Lives', desc: 'Coalition of groups fighting for Black liberation.', url: 'https://m4bl.org' },
      { name: 'Center for Constitutional Rights', desc: 'Advancing and protecting the rights guaranteed by the Constitution.', url: 'https://ccrjustice.org' },
      { name: 'National Consumer Law Center', desc: 'Expertise on consumer law for low-income people.', url: 'https://www.nclc.org' },
    ],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export default function CivicsPage() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('civil-rights');

  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center px-6 md:px-12 pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/bg-legal.jpg)' }} />
        <div className="absolute inset-0 bg-[#1B2838]/85" />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-[#C9B99A] hover:text-[#FF9500] transition-colors mb-8">
            <ArrowLeft size={16} /> Back to Home
          </Link>

          <ScrollReveal>
            <div className="flex items-center gap-3 mb-6">
              <Gavel size={28} className="text-[#FF9500]" strokeWidth={1.5} />
              <p className="text-xs uppercase tracking-[0.08em] text-[#C9B99A]">CIVICS & LEGAL RESOURCES</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <h1 className="text-4xl md:text-5xl lg:text-[64px] text-[#F0EBE1] tracking-[-0.02em] leading-[1.08] mb-6 text-shadow-hero">
              Know Your Rights.<br />Access Real Help.
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.25}>
            <p className="text-lg text-[#C9B99A] leading-relaxed max-w-2xl mb-6">
              This page connects you with established legal organizations, civil rights groups, and free resources — not forms, not advice, just real help from real professionals who fight for justice every day.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.35}>
            <div className="flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 text-xs text-[#FF9500] bg-[rgba(255,149,0,0.08)] border border-[rgba(255,149,0,0.2)] rounded px-3 py-1.5">
                <ExternalLink size={12} /> All links open external sites
              </div>
              <div className="inline-flex items-center gap-2 text-xs text-[#C9B99A] bg-[rgba(27,40,56,0.6)] border border-[rgba(201,185,154,0.15)] rounded px-3 py-1.5">
                <Shield size={12} /> Verified organizations
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <MarqueeDivider text="#TheKingsTake — Know Your Rights — Access Real Legal Help — Justice. Truth. Power." />

      {/* UPL Awareness Banner */}
      <section className="relative py-12 px-6 md:px-12 bg-[#0C1520]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="bg-[rgba(27,40,56,0.85)] backdrop-blur-lg rounded border border-[rgba(255,149,0,0.3)] p-6 md:p-8"
              style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.5)', borderLeft: '3px solid #FF9500' }}>
              <div className="flex items-start gap-4">
                <AlertTriangle size={24} className="text-[#FF9500] shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-lg text-[#F0EBE1] uppercase tracking-[0.04em] mb-3">Understanding UPL — Why These Resources Matter</h2>
                  <p className="text-sm text-[#C9B99A] leading-relaxed">
                    The Unauthorized Practice of Law (UPL) law was designed to protect people from unqualified legal advice — but it has created a devastating gap. Black families who cannot afford a private attorney are left with nowhere to turn. <strong className="text-[#F0EBE1]">The organizations on this page exist to fill that gap.</strong> They are licensed attorneys, civil rights lawyers, and legal aid professionals who provide real representation, real advice, and real help — often at no cost.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="relative py-16 md:py-24 px-6 md:px-12 bg-[#0C1520]">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-6">
            {RESOURCE_CATEGORIES.map((category, catIdx) => {
              const Icon = category.icon;
              const isExpanded = expandedCategory === category.id;
              return (
                <motion.div
                  key={category.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  variants={cardVariants}
                  transition={{ delay: catIdx * 0.1 }}
                >
                  {/* Category Header */}
                  <button
                    onClick={() => setExpandedCategory(isExpanded ? null : category.id)}
                    className="w-full flex items-center justify-between p-5 md:p-6 bg-[rgba(27,40,56,0.85)] backdrop-blur-lg rounded border border-[rgba(255,149,0,0.2)] hover:border-[rgba(255,149,0,0.4)] transition-all duration-300 group"
                    style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded flex items-center justify-center" style={{ backgroundColor: `${category.color}15` }}>
                        <Icon size={20} style={{ color: category.color }} strokeWidth={1.5} />
                      </div>
                      <div className="text-left">
                        <h3 className="text-lg text-[#F0EBE1] uppercase tracking-[0.04em]">{category.title}</h3>
                        <p className="text-xs text-[#C9B99A]/60">{category.resources.length} resources</p>
                      </div>
                    </div>
                    <div className={`text-[#FF9500] transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </button>

                  {/* Expanded Resources */}
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                      className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
                    >
                      {category.resources.map((resource, resIdx) => (
                        <motion.a
                          key={resIdx}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: resIdx * 0.05 }}
                          className="group block p-5 bg-[rgba(27,40,56,0.7)] rounded border border-[rgba(255,149,0,0.15)] hover:border-[rgba(255,149,0,0.5)] hover:-translate-y-0.5 transition-all duration-300"
                          style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="text-sm text-[#F0EBE1] font-medium leading-tight group-hover:text-[#FF9500] transition-colors">{resource.name}</h4>
                            <ExternalLink size={14} className="text-[#C9B99A]/40 group-hover:text-[#FF9500] shrink-0 ml-2 transition-colors" />
                          </div>
                          <p className="text-xs text-[#C9B99A]/70 leading-relaxed">{resource.desc}</p>
                        </motion.a>
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Disclaimer */}
          <ScrollReveal delay={0.3}>
            <div className="mt-12 p-6 bg-[rgba(220,38,38,0.05)] rounded border border-[rgba(220,38,38,0.15)]">
              <div className="flex items-start gap-3">
                <Heart size={18} className="text-red-400/60 shrink-0 mt-0.5" />
                <p className="text-xs text-[#C9B99A]/50 leading-relaxed">
                  <strong className="text-[#C9B99A]/70">Disclaimer:</strong> #TheKingsTake and AASOTU Media Group LLC are not affiliated with any of the organizations listed above. These are independent third-party resources provided for informational purposes. Always verify credentials and eligibility before engaging any legal service. This page does not constitute legal advice. If you are facing an emergency, call 911 or contact a licensed attorney immediately.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <MarqueeDivider text="#TheKingsTake — The People's Voice — AASOTU Media Group — Advocacy. Truth. Justice." />
    </main>
  );
}
