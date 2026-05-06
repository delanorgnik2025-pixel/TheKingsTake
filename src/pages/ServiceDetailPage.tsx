import { trpc } from "@/providers/trpc";
import { Link, useParams } from "react-router";
import { useState } from "react";
import { ArrowLeft, Check, Clock, CreditCard, Sparkles } from "lucide-react";

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: service, isLoading } = trpc.service.bySlug.useQuery({ slug: slug ?? "" });
  const [showBooking, setShowBooking] = useState(false);
  const [bookingData, setBookingData] = useState({ name: "", email: "", phone: "", message: "" });
  const [booked, setBooked] = useState(false);

  const bookMutation = trpc.booking.create.useMutation({
    onSuccess: () => setBooked(true),
  });

  if (isLoading) {
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

  const features: string[] = service.features ? JSON.parse(service.features) : [];

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
