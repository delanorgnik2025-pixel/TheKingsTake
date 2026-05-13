import { trpc } from "@/providers/trpc";
import { Link, useParams } from "react-router";
import { useState, useMemo } from "react";
import { ArrowLeft, Check, Clock, CreditCard, Sparkles, AlertTriangle, ShoppingCart } from "lucide-react";

// Parse price string to cents for Stripe (e.g. "$150" → 15000, "$1,000+" → 100000)
function parsePriceToCents(priceStr: string): number | null {
  if (priceStr.toLowerCase().includes('custom')) return null;
  const match = priceStr.replace(/,/g, '').match(/\$([0-9]+)/);
  return match ? parseInt(match[1]) * 100 : null;
}

function ServiceCheckoutButton({ label, price, serviceName }: { label: string; price: string; serviceName: string }) {
  const checkout = trpc.stripe.createCheckout.useMutation({
    onSuccess: (data) => { if (data.url) window.location.href = data.url; },
    onError: (err) => alert('Checkout error: ' + err.message),
  });

  const handleBuy = () => {
    const amount = parsePriceToCents(price);
    if (!amount) { alert('Contact us for custom pricing'); return; }
    const successUrl = window.location.origin + '/?payment=success';
    const cancelUrl = window.location.origin + '/?payment=cancelled';
    checkout.mutate({
      price: amount,
      serviceName: `${serviceName} — ${label}`,
      successUrl,
      cancelUrl,
    });
  };

  return (
    <button
      onClick={handleBuy}
      disabled={checkout.isPending}
      className="inline-flex items-center gap-1 text-xs bg-[#FF9500] text-[#0C1520] px-3 py-1.5 rounded hover:bg-[#CC6A00] transition-colors disabled:opacity-50 font-medium shrink-0"
    >
      <ShoppingCart size={12} />
      {checkout.isPending ? '...' : 'Buy Now'}
    </button>
  );
}

// CHATGPT-UPDATED PRICING — Must match ServicesSection.tsx slugs exactly
const FALLBACK_SERVICES: Record<string, {
  id: number; name: string; slug: string; shortDescription: string;
  fullDescription: string; features: string; duration: string;
  priceDisplay: string; type: string;
  tiers?: { label: string; price: string; desc: string }[];
}> = {
  "speechwriting-narrative": {
    id: 1, slug: "speechwriting-narrative", name: "Speechwriting & Narrative Development",
    duration: "Per project", priceDisplay: "From $150", type: "one-time",
    shortDescription: "Speeches, scripts, and narrative content that moves audiences to action. From community commentary to documentary narration.",
    fullDescription: `Professional speechwriting and narrative development for leaders, advocates, and creators who need words that command attention and inspire action.\n\nRonald Lee King brings decades of experience in community organizing, legal advocacy, and storytelling to every project. Whether you are addressing a crowd of thousands or recording a podcast that needs to hit hard — the right words change everything.`,
    features: JSON.stringify(["Custom-crafted narrative development","Audience-tailored messaging","Unlimited revisions within scope","Delivery coaching available","Rush delivery options"]),
    tiers: [
      { label: "Basic Speech / Narrative", price: "$150", desc: "Short-form speeches, social media narratives, blog content" },
      { label: "Podcast & YouTube Scripts", price: "$200", desc: "Scripted episodes, show notes, content series" },
      { label: "Political / Community Commentary", price: "$350", desc: "Rally speeches, op-eds, movement messaging" },
      { label: "Documentary Narration", price: "$500", desc: "Full documentary scripts, long-form storytelling" },
      { label: "Premium Speech Package", price: "$1,000+", desc: "Multi-speech retainers, campaign messaging, ghostwriting" },
    ],
  },
  "website-development": {
    id: 2, slug: "website-development", name: "Website Development & Digital Presence",
    duration: "Per project", priceDisplay: "From $300", type: "one-time",
    shortDescription: "High-converting websites, digital branding, and online presence that commands attention. From starter sites to premium platforms.",
    fullDescription: `Your website is your digital headquarters. It should tell your story, convert visitors, and position you as the authority you are.\n\nFrom simple landing pages to complex multi-page ecosystems with AI integrations — every site is built with cinematic storytelling architecture and conversion-focused design.`,
    features: JSON.stringify(["Custom design & development","Mobile-responsive architecture","SEO foundations","Content management system","Analytics setup","Deployment & hosting guidance"]),
    tiers: [
      { label: "Starter Presence", price: "$300-$600", desc: "Landing page, responsive design, contact section, basic branding" },
      { label: "Professional Brand Site", price: "$800-$1,500", desc: "Multi-page website, blog, booking, SEO, custom copy" },
      { label: "Premium Platform", price: "$2,000+", desc: "AI integrations, memberships, dashboards, advanced systems" },
      { label: "Domain & Hosting Setup", price: "$100+", desc: "DNS configuration, SSL, email setup" },
      { label: "Maintenance Plan", price: "$50-$150/mo", desc: "Ongoing updates, security, content changes" },
    ],
  },
  "book-publishing": {
    id: 3, slug: "book-publishing", name: "Book & Publishing Support",
    duration: "Full package", priceDisplay: "From $499", type: "package",
    shortDescription: "From manuscript to published author. Launch consultations, publishing guidance, formatting, and distribution strategy.",
    fullDescription: `Every author needs a team behind them. From manuscript development to launch day — we guide you through the entire publishing journey.\n\nRonald Lee King wrote his first book from a jail cell with nothing but pen and paper. Today, he helps other authors turn their stories into published works that move people.`,
    features: JSON.stringify(["Manuscript evaluation & editing","Formatting & interior design","Cover guidance & creative direction","ISBN & publishing platform setup","Launch strategy & marketing plan"]),
    tiers: [
      { label: "Author Launch Consultation", price: "$499", desc: "1-on-1 strategy session, roadmap, publishing plan" },
      { label: "Publishing Support Package", price: "$750", desc: "Formatting, cover guidance, platform setup, distribution" },
      { label: "Premium Author Development", price: "$1,500+", desc: "Full-service: editing, design, launch, marketing, ongoing support" },
    ],
  },
  "legal-document-support": {
    id: 4, slug: "legal-document-support", name: "Legal Document Support",
    duration: "Per document", priceDisplay: "From $150", type: "one-time",
    shortDescription: "Educational document formatting and organizational support for pro se litigants. Informational purposes only — not legal advice.",
    fullDescription: `Legal document formatting, proofreading, and organizational support. This is educational assistance — not legal representation.\n\n**IMPORTANT LEGAL DISCLAIMER:** AASOTU Media Group LLC and #TheKingsTake provide educational and informational support only. We are not a law firm. We do not provide legal advice, legal representation, or legal document preparation services. The information we provide is for educational purposes to help you better understand and navigate systems. Always consult with a licensed attorney for legal advice specific to your situation.\n\nWe help you organize, format, and understand your documents. We do not draft motions, file court documents, or provide legal strategy.`,
    features: JSON.stringify(["Document formatting & organization","Proofreading & clarity review","Educational procedural guidance","Filing system setup","UPL-compliant support only"]),
    tiers: [
      { label: "Formatting & Proofreading", price: "$150", desc: "Single document: formatting, proofreading, clarity review" },
      { label: "Filing Organization Package", price: "$350", desc: "Multiple documents: organization, indexing, procedural guidance" },
      { label: "Advanced Procedural Assistance", price: "Custom", desc: "Complex cases: custom pricing based on scope" },
    ],
  },
  "consulting-strategy": {
    id: 5, slug: "consulting-strategy", name: "Consulting & Strategy",
    duration: "Per hour", priceDisplay: "$150/hour", type: "one-time",
    shortDescription: "1-on-1 strategy sessions for content, branding, advocacy, legal literacy, and platform growth. $150/hour.",
    fullDescription: `Strategic consulting for content creators, advocates, community builders, and entrepreneurs who are building something that matters.\n\nEvery session is focused on actionable outcomes. You walk away with clarity, direction, and a plan you can execute immediately.`,
    features: JSON.stringify(["1-on-1 focused strategy sessions","Content & brand development","Advocacy & movement building","Platform growth planning","Ongoing retainer packages"]),
    tiers: [
      { label: "Single Strategy Session", price: "$150/hr", desc: "One focused hour: problem-solving, planning, direction" },
      { label: "Narrative Strategy Package", price: "$500", desc: "4-hour package: deep-dive strategy, brand positioning, content plan" },
      { label: "Ongoing Retainer", price: "Custom", desc: "Monthly strategy partnership: unlimited access, priority scheduling" },
    ],
  },
  "ai-assisted-creative": {
    id: 6, slug: "ai-assisted-creative", name: "AI-Assisted Creative Services",
    duration: "Per project", priceDisplay: "From $75", type: "one-time",
    shortDescription: "Human storytelling enhanced by modern AI tools. Research, drafting, optimization, and content strategy.",
    fullDescription: `AI-enhanced content creation that combines human storytelling craft with cutting-edge technology.\n\nThe tools are powerful. But the story is still yours. We use AI to amplify your voice — not replace it.`,
    features: JSON.stringify(["AI-enhanced research","Draft generation & editing","Content optimization","SEO & analytics integration","Human review & refinement"]),
    tiers: [
      { label: "AI-Assisted Content", price: "$75", desc: "Single piece: article, blog post, social media content" },
      { label: "AI + Human Enhanced Package", price: "$250", desc: "Multi-piece package: research, drafting, editing, optimization" },
      { label: "Enterprise Content System", price: "Custom", desc: "Ongoing AI-assisted content production at scale" },
    ],
  },
};

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: apiService, isLoading } = trpc.service.bySlug.useQuery({ slug: slug ?? "" });
  const [showBooking, setShowBooking] = useState(false);
  const [bookingData, setBookingData] = useState({ name: "", email: "", phone: "", message: "" });
  const [booked, setBooked] = useState(false);

  const bookMutation = trpc.booking.create.useMutation({
    onSuccess: () => setBooked(true),
  });

  const service = useMemo(() => {
    if (apiService) return apiService;
    if (slug && FALLBACK_SERVICES[slug]) return FALLBACK_SERVICES[slug];
    return null;
  }, [apiService, slug]);

  if (isLoading && !service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1B2838]">
        <div className="w-8 h-8 border-2 border-[#FF9500] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1B2838]">
        <div className="text-center">
          <h1 className="text-2xl text-[#F0EBE1] mb-2">Service not found</h1>
          <Link to="/" className="text-[#FF9500] hover:underline">Back Home</Link>
        </div>
      </div>
    );
  }

  const features: string[] = service.features ? (typeof service.features === 'string' ? JSON.parse(service.features) : service.features) : [];
  const tiers = (service as any).tiers ?? [];

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingData.name || !bookingData.email) return;
    bookMutation.mutate({
      serviceId: service.id,
      name: bookingData.name,
      email: bookingData.email,
      phone: bookingData.phone || undefined,
      message: bookingData.message || undefined,
    });
  };

  return (
    <div className="relative min-h-screen pt-24 pb-16 px-6 md:px-12 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url(/images/bg-services.jpg)" }} />
      <div className="absolute inset-0 bg-[#1B2838]/80" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-[#C9B99A] hover:text-[#FF9500] transition-colors mb-8">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <div className="bg-[rgba(27,40,56,0.9)] backdrop-blur-lg rounded-lg border border-[rgba(255,149,0,0.3)] p-8 md:p-12">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl text-[#F0EBE1] tracking-[-0.02em] text-shadow-hero mb-2">{service.name}</h1>
              <div className="flex items-center gap-4 text-sm text-[#C9B99A]">
                <span className="flex items-center gap-1"><Clock size={14} /> {service.duration}</span>
                <span className="flex items-center gap-1"><CreditCard size={14} /> {service.priceDisplay}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl text-[#FF9500] font-medium">{service.priceDisplay}</p>
            </div>
          </div>

          <div className="w-full h-[2px] bg-[#FF9500] mb-8" />

          {/* UPL Disclaimer for Legal Document Support */}
          {service.slug === "legal-document-support" && (
            <div className="mb-6 bg-[rgba(255,149,0,0.08)] border border-[rgba(255,149,0,0.3)] rounded p-4 flex gap-3">
              <AlertTriangle size={20} className="text-[#FF9500] shrink-0 mt-0.5" />
              <p className="text-sm text-[#C9B99A]">
                <strong className="text-[#FF9500]">Educational Support Only:</strong> AASOTU Media Group LLC provides informational and educational document support services only. We are not a law firm. We do not provide legal advice, legal representation, or legal document preparation services. Always consult with a licensed attorney for legal advice specific to your situation.
              </p>
            </div>
          )}

          <p className="text-lg text-[#C9B99A] leading-relaxed mb-8">{service.shortDescription}</p>

          {service.fullDescription && (
            <div className="text-[#C9B99A] leading-relaxed mb-8 whitespace-pre-line">{service.fullDescription}</div>
          )}

          {/* Tiered Pricing Breakdown */}
          {tiers.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg text-[#F0EBE1] uppercase tracking-[0.04em] mb-4">Pricing Options</h3>
              <div className="space-y-3">
                {tiers.map((tier: any, i: number) => (
                  <div key={i} className="flex items-start justify-between gap-4 p-4 bg-[rgba(42,58,74,0.5)] rounded border border-[rgba(255,149,0,0.15)] hover:border-[rgba(255,149,0,0.4)] transition-colors">
                    <div className="flex-1">
                      <p className="text-[#F0EBE1] font-medium">{tier.label}</p>
                      <p className="text-sm text-[#C9B99A]">{tier.desc}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <p className="text-[#FF9500] font-medium">{tier.price}</p>
                      <ServiceCheckoutButton label={tier.label} price={tier.price} serviceName={service.name} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Features */}
          {features.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg text-[#F0EBE1] uppercase tracking-[0.04em] mb-4">What You Get</h3>
              <ul className="space-y-3">
                {features.map((f: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-[#C9B99A]">
                    <Check size={18} className="text-[#FF9500] shrink-0 mt-0.5" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Payment Plan Info */}
          <div className="mb-8 p-4 bg-[rgba(42,58,74,0.4)] rounded border border-[rgba(255,149,0,0.15)]">
            <p className="text-sm text-[#C9B99A]">
              <strong className="text-[#FF9500]">Payment Plans Available:</strong> Large projects can be split into installments. Typical structure: 50% upfront, 50% before delivery. Contact us to discuss a payment plan that works for your budget.
            </p>
          </div>

          {/* Book Button */}
          {!showBooking && !booked && (
            <button onClick={() => setShowBooking(true)} className="inline-flex items-center justify-center rounded-full h-14 px-12 text-base bg-[#FF9500] text-[#1B2838] hover:bg-[#CC6A00] transition-colors font-['Newsreader'] tracking-[0.02em]" style={{ boxShadow: "0 4px 16px rgba(255,149,0,0.25)" }}>
              <Sparkles size={18} className="mr-2" /> Book This Service
            </button>
          )}

          {/* Booking Form */}
          {showBooking && !booked && (
            <form onSubmit={handleBook} className="mt-8 p-6 bg-[rgba(42,58,74,0.7)] rounded-lg border border-[rgba(255,149,0,0.2)]">
              <h3 className="text-xl text-[#F0EBE1] mb-4">Book Your Session</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input type="text" placeholder="Your Name *" required value={bookingData.name} onChange={e => setBookingData({ ...bookingData, name: e.target.value })} className="bg-[rgba(27,40,56,0.8)] border border-[rgba(255,149,0,0.2)] rounded px-4 py-3 text-[#F0EBE1] placeholder:text-[#C9B99A]/50 focus:border-[#FF9500] focus:outline-none" />
                <input type="email" placeholder="Email Address *" required value={bookingData.email} onChange={e => setBookingData({ ...bookingData, email: e.target.value })} className="bg-[rgba(27,40,56,0.8)] border border-[rgba(255,149,0,0.2)] rounded px-4 py-3 text-[#F0EBE1] placeholder:text-[#C9B99A]/50 focus:border-[#FF9500] focus:outline-none" />
                <input type="tel" placeholder="Phone (optional)" value={bookingData.phone} onChange={e => setBookingData({ ...bookingData, phone: e.target.value })} className="bg-[rgba(27,40,56,0.8)] border border-[rgba(255,149,0,0.2)] rounded px-4 py-3 text-[#F0EBE1] placeholder:text-[#C9B99A]/50 focus:border-[#FF9500] focus:outline-none" />
                <input type="text" placeholder="What do you need help with?" value={bookingData.message} onChange={e => setBookingData({ ...bookingData, message: e.target.value })} className="bg-[rgba(27,40,56,0.8)] border border-[rgba(255,149,0,0.2)] rounded px-4 py-3 text-[#F0EBE1] placeholder:text-[#C9B99A]/50 focus:border-[#FF9500] focus:outline-none md:col-span-2" />
              </div>
              <button type="submit" disabled={bookMutation.isPending} className="inline-flex items-center justify-center rounded-full h-12 px-8 bg-[#FF9500] text-[#1B2838] hover:bg-[#CC6A00] transition-colors disabled:opacity-50 font-['Newsreader']">
                {bookMutation.isPending ? "Submitting..." : "Submit Booking Request"}
              </button>
              <p className="text-xs text-[#C9B99A]/60 mt-3">You will be contacted within 24 hours to schedule your session and discuss payment options.</p>
            </form>
          )}

          {booked && (
            <div className="mt-8 p-6 bg-[rgba(42,58,74,0.7)] rounded-lg border border-[rgba(255,149,0,0.3)] text-center">
              <Check size={32} className="text-[#FF9500] mx-auto mb-2" />
              <h3 className="text-xl text-[#F0EBE1] mb-1">Booking Submitted!</h3>
              <p className="text-sm text-[#C9B99A]">We will contact you within 24 hours to schedule your session.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
