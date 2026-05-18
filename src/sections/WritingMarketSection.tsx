import { motion } from 'framer-motion'
import {
  PenTool, TrendingUp, DollarSign, Users, Globe, BookOpen,
  ArrowRight, Sparkles, Feather, MessageSquare, Megaphone, Check
} from 'lucide-react'
import { Link } from 'react-router'
import ScrollReveal from '../components/ScrollReveal'

const marketStats = [
  {
    icon: DollarSign,
    value: "$72.3B",
    label: "Content Marketing Industry",
    sub: "Global market size in 2025",
    growth: "+16.4% annually"
  },
  {
    icon: Users,
    value: "73%",
    label: "Companies Investing More",
    sub: "in content marketing YoY",
    growth: "Demand surging"
  },
  {
    icon: Globe,
    value: "600M+",
    label: "Blogs Active Worldwide",
    sub: "Need fresh content daily",
    growth: "Content never sleeps"
  },
  {
    icon: TrendingUp,
    value: "$67/hr",
    label: "Avg. Freelance Writer Rate",
    sub: "Top earners make $150-250/hr",
    growth: "Rates climbing"
  },
  {
    icon: BookOpen,
    value: "4.3M",
    label: "Books Self-Published Yearly",
    sub: "Indie authors are winning",
    growth: "Independence rising"
  },
  {
    icon: PenTool,
    value: "91%",
    label: "B2B Buyers Want Authentic",
    sub: "Human-written storytelling",
    growth: "Your voice matters"
  },
];

const writingServices = [
  {
    icon: Feather,
    title: "Ghostwriting",
    price: "From $1,500",
    desc: "Your name. My words. Books, articles, and speeches that sound exactly like you.",
    link: "/services/ghostwriting",
  },
  {
    icon: PenTool,
    title: "Speechwriting",
    price: "From $150",
    desc: "Speeches that move crowds. From community rallies to documentary narration.",
    link: "/services/speechwriting-narrative",
  },
  {
    icon: BookOpen,
    title: "Book & Publishing",
    price: "From $499",
    desc: "From manuscript to published author. Your story deserves a bookshelf.",
    link: "/services/book-publishing",
  },
  {
    icon: MessageSquare,
    title: "Content Writing",
    price: "From $75",
    desc: "Website copy, blog posts, marketing content — words that convert.",
    link: "/services/content-writing",
  },
  {
    icon: Megaphone,
    title: "Consulting & Strategy",
    price: "$100/hr",
    desc: "1-on-1 creative strategy for storytellers, advocates, and builders.",
    link: "/services/consulting-strategy",
  },
  {
    icon: Sparkles,
    title: "Legacy Interview",
    price: "From $500",
    desc: "Your story captured and preserved for generations. 50/50 split payment.",
    link: "/services/legacy-interview",
  },
];

const whyNow = [
  "The content economy is booming — businesses need writers more than ever",
  "AI can't replace human storytelling — it needs human direction",
  "Self-publishing has removed the gatekeepers — your story can reach millions",
  "Speechwriting pays $150-$1,000+ per project with repeat clients",
  "Ghostwriting books pays $5,000-$50,000+ per manuscript",
  "Remote writing work means your talent isn't limited by geography",
];

export default function WritingMarketSection() {
  return (
    <section id="writing-market" className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/bg-services.jpg)' }} />
      <div className="absolute inset-0 bg-[#1B2838]/90" />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Header */}
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp size={20} className="text-[#FF9500]" />
            <p className="text-xs uppercase tracking-[0.08em] text-[#C9B99A]">THE WRITING MARKET</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <h2 className="text-4xl md:text-5xl lg:text-[56px] text-[#F0EBE1] tracking-[-0.02em] leading-[1.08] mb-4 text-shadow-hero">
            The Writing Economy Is Exploding
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <p className="text-lg text-[#C9B99A] max-w-3xl mb-4 leading-relaxed">
            Writers are in unprecedented demand. Companies, creators, movements, and brands — they all need someone who can turn a thought into a message that moves people. That is exactly what I do. And exactly what I can teach you to do.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <Link
            to="/writing-services"
            className="inline-flex items-center gap-2 text-sm text-[#FF9500] hover:underline mb-12"
          >
            Explore All Writing Services <ArrowRight size={14} />
          </Link>
        </ScrollReveal>

        {/* Market Stats Grid */}
        <ScrollReveal delay={0.35}>
          <h3 className="text-lg text-[#F0EBE1] uppercase tracking-[0.04em] mb-6">By The Numbers</h3>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
          {marketStats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35 + i * 0.08, duration: 0.5 }}
                className="bg-[rgba(27,40,56,0.7)] backdrop-blur-lg rounded border border-[rgba(255,149,0,0.15)] p-5 hover:border-[rgba(255,149,0,0.4)] transition-all group"
              >
                <Icon size={22} className="text-[#FF9500] mb-3 group-hover:text-[#FFB840] transition-colors" strokeWidth={1.5} />
                <p className="text-2xl md:text-3xl text-[#FF9500] font-medium mb-1">{stat.value}</p>
                <p className="text-sm text-[#F0EBE1] uppercase tracking-[0.03em] mb-1">{stat.label}</p>
                <p className="text-xs text-[#C9B99A]/60 mb-2">{stat.sub}</p>
                <div className="inline-flex items-center gap-1 text-[10px] text-[#FFB840] bg-[rgba(255,149,0,0.08)] rounded px-2 py-0.5">
                  <TrendingUp size={10} /> {stat.growth}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Why Writing, Why Now */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Left — Why Now */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-[rgba(27,40,56,0.75)] backdrop-blur-lg rounded border border-[rgba(255,149,0,0.2)] p-6 md:p-8"
            style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.4)' }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1">
                {[0, 1, 2].map(i => <div key={i} className="w-[3px] h-[3px] rounded-full bg-[#FF9500]" />)}
              </div>
              <p className="text-xs uppercase tracking-[0.08em] text-[#FF9500]">Why Writing? Why Now?</p>
            </div>
            <h3 className="text-2xl text-[#F0EBE1] tracking-[-0.01em] mb-4">
              There Has Never Been a Better Time to Be a Writer
            </h3>
            <ul className="space-y-3">
              {whyNow.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check size={16} className="text-[#FF9500] shrink-0 mt-0.5" />
                  <span className="text-sm text-[#C9B99A] leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right — The Upsell */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-[rgba(255,149,0,0.08)] backdrop-blur-lg rounded border border-[rgba(255,149,0,0.3)] p-6 md:p-8"
            style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.4)', borderLeft: '3px solid #FF9500' }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1">
                {[0, 1, 2].map(i => <div key={i} className="w-[3px] h-[3px] rounded-full bg-[#FFB840]" />)}
              </div>
              <p className="text-xs uppercase tracking-[0.08em] text-[#FFB840]">Work With Ronald Lee King</p>
            </div>
            <h3 className="text-2xl text-[#F0EBE1] tracking-[-0.01em] mb-4">
              Let Me Write For You — Or Teach You How
            </h3>
            <p className="text-sm text-[#C9B99A] leading-relaxed mb-4">
              I built a 12,000+ person movement with words. I wrote a book that started a conversation. I craft speeches that make people stand up. Whether you need someone to write for you — or you want to learn the craft yourself — I am your resource.
            </p>
            <p className="text-sm text-[#C9B99A] leading-relaxed mb-6">
              Writing is not a hobby anymore. It is a career, a business, and a weapon for change. The people who master it will own the narrative. Let me help you be one of them.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/writing-services"
                className="inline-flex items-center justify-center gap-2 rounded-full h-12 px-8 text-sm bg-[#FF9500] text-[#1B2838] hover:bg-[#CC6A00] transition-colors font-['Newsreader'] tracking-[0.02em] font-medium"
              >
                <Sparkles size={16} /> Hire Me to Write
              </Link>
              <Link
                to="/services/consulting-strategy"
                className="inline-flex items-center justify-center gap-2 rounded-full h-12 px-8 text-sm border border-[#FF9500] text-[#FF9500] hover:bg-[rgba(255,149,0,0.1)] transition-colors font-['Newsreader'] tracking-[0.02em]"
              >
                Learn the Craft — $100/hr
              </Link>
            </div>
            <p className="text-[10px] text-[#C9B99A]/40 mt-3">
              Consulting provides creative strategy and educational guidance — NOT legal advice.
            </p>
          </motion.div>
        </div>

        {/* Writing Services Quick Grid */}
        <ScrollReveal delay={0.4}>
          <h3 className="text-lg text-[#F0EBE1] uppercase tracking-[0.04em] mb-8">Writing Services Available Now</h3>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {writingServices.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.08, duration: 0.5 }}
                className="bg-[rgba(27,40,56,0.7)] backdrop-blur-lg rounded border border-[rgba(255,149,0,0.15)] p-5 hover:border-[rgba(255,149,0,0.4)] hover:-translate-y-0.5 transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <Icon size={24} className="text-[#FF9500]" strokeWidth={1.5} />
                  <span className="text-sm text-[#FF9500] font-medium">{service.price}</span>
                </div>
                <h4 className="text-sm text-[#F0EBE1] uppercase tracking-[0.03em] mb-2">{service.title}</h4>
                <p className="text-xs text-[#C9B99A] leading-relaxed mb-4">{service.desc}</p>
                <Link
                  to={service.link}
                  className="inline-flex items-center gap-1 text-xs text-[#FF9500] uppercase tracking-[0.04em] hover:underline"
                >
                  Learn More <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <ScrollReveal delay={0.5}>
          <div className="mt-12 text-center">
            <p className="text-base text-[#F0EBE1] mb-4">
              The writing market is not waiting. Neither should you.
            </p>
            <Link
              to="/writing-services"
              className="inline-flex items-center justify-center gap-2 rounded-full h-14 px-10 text-base bg-[#FF9500] text-[#1B2838] hover:bg-[#CC6A00] transition-colors font-['Newsreader'] tracking-[0.02em] font-medium"
              style={{ boxShadow: "0 4px 16px rgba(255,149,0,0.25)" }}
            >
              <PenTool size={18} className="mr-1" /> Explore All Writing Services
            </Link>
            <p className="text-[11px] text-[#FF9500]/70 mt-3">
              Payment plans available — or 4 interest-free payments with Klarna
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
