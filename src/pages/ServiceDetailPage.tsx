import { trpc } from "@/providers/trpc";
import { Link, useParams } from "react-router";
import { useState, useMemo } from "react";
import { ArrowLeft, Check, Clock, CreditCard, Sparkles } from "lucide-react";

// Static fallback services — render immediately even if API/database is empty
const FALLBACK_SERVICES: Record<string, {
  id: number; name: string; slug: string; shortDescription: string;
  fullDescription: string; features: string; duration: string;
  priceDisplay: string; type: string;
}> = {
  "1-on-1-consultation": {
    id: 101, slug: "1-on-1-consultation", name: "1-on-1 Consultation",
    duration: "60 min", priceDisplay: "$150", type: "one-time",
    shortDescription: "Private, focused session with Ronald Lee King to discuss your legal situation, story, or project. Get honest, actionable guidance from someone who's been through the system.",
    fullDescription: `This is a one-hour private consultation with Ronald Lee King — author, founder, and someone who has personally navigated the criminal justice system from arrest to appeal.\n\nWhether you're facing charges, helping a family member, or working on a creative project, this session gives you direct access to real experience and practical guidance.\n\nRonald does not give legal advice (he's not a lawyer). What he offers is something many lawyers can't: the perspective of someone who has actually lived through what you're going through.\n\nTopics we can cover:\n- Understanding court procedures and timelines\n- Navigating the public defender system\n- Preparing for hearings and trials\n- Building a support network\n- Documenting your case\n- Finding additional resources\n- Story development and publishing`,
    features: JSON.stringify(["60-minute private video session","Pre-session questionnaire","Written follow-up summary","Resource recommendations","Recording available upon request","Follow-up email support (7 days)"]),
  },
  "writing-ghostwriting": {
    id: 102, slug: "writing-ghostwriting", name: "Writing & Ghostwriting",
    duration: "Project-based", priceDisplay: "From $500", type: "one-time",
    shortDescription: "Professional writing services for your story, manuscript, or feature article. From concept to completion, we help you craft compelling narratives that resonate.",
    fullDescription: `Everyone has a story worth telling. The question is whether you have the time, skill, and platform to tell it well.\n\nOur writing and ghostwriting service helps you transform your ideas, experiences, and expertise into polished, publishable work. Whether it's a magazine feature, a blog post, a book chapter, or a full manuscript — we bring the craft. You bring the story.\n\nRonald Lee King has written extensively on legal advocacy, community organizing, and the Black experience in America. His work combines journalistic rigor with narrative power — the kind of writing that gets shared, remembered, and acted upon.`,
    features: JSON.stringify(["Initial story consultation","Outline and structure development","Professional drafting and editing","Up to 3 revision rounds","Final polished document","Publication guidance and referrals"]),
  },
  "courtroom-simulator": {
    id: 103, slug: "courtroom-simulator", name: "AI Courtroom Simulator",
    duration: "Session-based", priceDisplay: "From $15", type: "subscription",
    shortDescription: "Experience realistic courtroom scenarios before you face the real thing. Train with AI-powered judges, prosecutors, and witnesses to build confidence and preparation.",
    fullDescription: `The AI Courtroom Simulator is designed for people who have never been inside a courtroom — and for people who never want to be caught unprepared again.\n\nUsing advanced AI, the simulator creates realistic courtroom environments where you can practice procedures, test arguments, and experience the emotional pressure of a real hearing.\n\nThree tiers available:\n\n**BASIC ($15/session)** — Single scenario training with standard judge and prosecutor personalities. Perfect for first-time defendants who want to understand basic procedures.\n\n**ADVANCED ($29/session)** — Multiple scenario types, varied judge personalities (lenient, strict, by-the-book), objection handling, and detailed post-session feedback.\n\n**PROFESSIONAL ($49/session)** — Everything in Advanced plus expert witness cross-examination, jury presence simulation, closing argument practice, and a comprehensive preparation report.`,
    features: JSON.stringify(["Realistic AI-powered courtroom environment","Multiple judge and prosecutor personalities","Pre and post-session briefings","Objection practice and feedback","Detailed performance report","Available 24/7 — practice anytime"]),
  },
  "media-branding": {
    id: 104, slug: "media-branding", name: "Media & Branding",
    duration: "Project-based", priceDisplay: "From $300", type: "one-time",
    shortDescription: "Build your personal or organizational brand with professional media strategy, visual identity, and content planning. Stand out in a crowded space.",
    fullDescription: `In today's media landscape, attention is currency. Whether you're an advocate, author, artist, or entrepreneur — your brand determines whether people listen.\n\nOur media and branding service helps you define, develop, and deploy a brand identity that captures who you are and what you stand for.\n\nWe combine strategic thinking with visual design and content planning to create brands that are memorable, authentic, and effective.`,
    features: JSON.stringify(["Brand strategy consultation","Visual identity design (logo, colors, typography)","Social media strategy","Content calendar development","Brand guidelines document","30-day launch support"]),
  },
  "legal-research": {
    id: 105, slug: "legal-research", name: "Legal Research Assistance",
    duration: "Hourly", priceDisplay: "$75/hr", type: "one-time",
    shortDescription: "Professional legal research support for your case, appeal, or advocacy work. Find the statutes, precedents, and procedures you need to build your strongest position.",
    fullDescription: `Legal research is the foundation of every successful case. But finding the right statutes, cases, and procedures requires access to expensive databases and expertise most people don't have.\n\nOur legal research service provides professional-grade research to support your case, appeal, or advocacy work. We find the law that applies to your situation, the precedents that support your position, and the procedures you need to follow.\n\n**Important:** This is research assistance, not legal advice. We do not represent you or provide legal counsel. We equip you with information so you can work more effectively with your attorney or represent yourself more knowledgeably.`,
    features: JSON.stringify(["Case-specific legal research","Statute and regulation analysis","Case law and precedent research","Procedure and filing guidance","Organized research memo","Source citations and references"]),
  },
  "community-workshop": {
    id: 106, slug: "community-workshop", name: "Community Workshop",
    duration: "2-3 hours", priceDisplay: "$500", type: "one-time",
    shortDescription: "Bring Ronald Lee King to your community for an in-person workshop on legal rights, court preparation, and community organizing. Empower your group with knowledge and strategy.",
    fullDescription: `There's nothing more powerful than a room full of people who understand their rights and know how to use them.\n\nOur community workshops bring Ronald Lee King's expertise directly to your neighborhood, church, school, or organization. These interactive sessions combine education with empowerment — giving participants practical knowledge they can use immediately.\n\nWorkshop topics include:\n- Know Your Rights during police encounters\n- Navigating the court system\n- Understanding UPL and its impact\n- Building community legal networks\n- Writing and storytelling for change\n- Starting your own advocacy initiative\n\nEach workshop is tailored to your community's specific needs and concerns.`,
    features: JSON.stringify(["In-person community workshop (2-3 hours)","Customized content for your audience","Q&A session","Printed resource materials","Follow-up resource list","30-minute planning call beforehand"]),
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

  // Use API data if available, otherwise show static fallback immediately
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
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/images/bg-services.jpg)" }}
      />
      <div className="absolute inset-0 bg-[#1B2838]/80" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-[#C9B99A] hover:text-[#FF9500] transition-colors mb-8">
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <div className="bg-[rgba(27,40,56,0.9)] backdrop-blur-lg rounded-lg border border-[rgba(255,149,0,0.3)] p-8 md:p-12">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl text-[#F0EBE1] tracking-[-0.02em] text-shadow-hero mb-2">
                {service.name}
              </h1>
              <div className="flex items-center gap-4 text-sm text-[#C9B99A]">
                <span className="flex items-center gap-1"><Clock size={14} /> {service.duration}</span>
                <span className="flex items-center gap-1"><CreditCard size={14} /> {service.priceDisplay}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl text-[#FF9500] font-medium">{service.priceDisplay}</p>
              {service.type === "subscription" && <p className="text-xs text-[#C9B99A]">per month</p>}
            </div>
          </div>

          <div className="w-full h-[2px] bg-[#FF9500] mb-8" />

          <p className="text-lg text-[#C9B99A] leading-relaxed mb-8">{service.shortDescription}</p>

          {service.fullDescription && (
            <div
              className="text-[#C9B99A] leading-relaxed mb-8"
              dangerouslySetInnerHTML={{
                __html: service.fullDescription.replace(/\n/g, "<br />"),
              }}
            />
          )}

          {features.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg text-[#F0EBE1] uppercase tracking-[0.04em] mb-4">What You Get</h3>
              <ul className="space-y-3">
                {features.map((f: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-[#C9B99A]">
                    <Check size={18} className="text-[#FF9500] shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {!showBooking && !booked && (
            <button
              onClick={() => setShowBooking(true)}
              className="inline-flex items-center justify-center rounded-full h-14 px-12 text-base bg-[#FF9500] text-[#1B2838] hover:bg-[#CC6A00] transition-colors font-['Newsreader'] tracking-[0.02em]"
              style={{ boxShadow: "0 4px 16px rgba(255,149,0,0.25)" }}
            >
              <Sparkles size={18} className="mr-2" />
              Book This Service
            </button>
          )}

          {showBooking && !booked && (
            <form onSubmit={handleBook} className="mt-8 p-6 bg-[rgba(42,58,74,0.7)] rounded-lg border border-[rgba(255,149,0,0.2)]">
              <h3 className="text-xl text-[#F0EBE1] mb-4">Book Your Session</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Your Name *"
                  required
                  value={bookingData.name}
                  onChange={e => setBookingData({ ...bookingData, name: e.target.value })}
                  className="bg-[rgba(27,40,56,0.8)] border border-[rgba(255,149,0,0.2)] rounded px-4 py-3 text-[#F0EBE1] placeholder:text-[#C9B99A]/50 focus:border-[#FF9500] focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Email Address *"
                  required
                  value={bookingData.email}
                  onChange={e => setBookingData({ ...bookingData, email: e.target.value })}
                  className="bg-[rgba(27,40,56,0.8)] border border-[rgba(255,149,0,0.2)] rounded px-4 py-3 text-[#F0EBE1] placeholder:text-[#C9B99A]/50 focus:border-[#FF9500] focus:outline-none"
                />
                <input
                  type="tel"
                  placeholder="Phone (optional)"
                  value={bookingData.phone}
                  onChange={e => setBookingData({ ...bookingData, phone: e.target.value })}
                  className="bg-[rgba(27,40,56,0.8)] border border-[rgba(255,149,0,0.2)] rounded px-4 py-3 text-[#F0EBE1] placeholder:text-[#C9B99A]/50 focus:border-[#FF9500] focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="What do you need help with?"
                  value={bookingData.message}
                  onChange={e => setBookingData({ ...bookingData, message: e.target.value })}
                  className="bg-[rgba(27,40,56,0.8)] border border-[rgba(255,149,0,0.2)] rounded px-4 py-3 text-[#F0EBE1] placeholder:text-[#C9B99A]/50 focus:border-[#FF9500] focus:outline-none md:col-span-2"
                />
              </div>
              <button
                type="submit"
                disabled={bookMutation.isPending}
                className="inline-flex items-center justify-center rounded-full h-12 px-8 bg-[#FF9500] text-[#1B2838] hover:bg-[#CC6A00] transition-colors disabled:opacity-50 font-['Newsreader']"
              >
                {bookMutation.isPending ? "Submitting..." : "Submit Booking Request"}
              </button>
              <p className="text-xs text-[#C9B99A]/60 mt-3">
                You will be contacted within 24 hours to schedule your session and arrange payment.
              </p>
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
