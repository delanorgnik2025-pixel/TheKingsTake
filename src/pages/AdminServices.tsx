import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { trpc } from "@/providers/trpc";
import { Link, useNavigate } from "react-router";
import { useEffect } from "react";
import { ArrowLeft, Check, X, Clock, Mail, Phone, MessageSquare } from "lucide-react";

export default function AdminServices() {
  const { user, isLoading, isAdmin } = useAuth();
  const navigate = useNavigate();
  const utils = trpc.useUtils();

  const { data: bookings, isLoading: bookingsLoading } = trpc.booking.list.useQuery(undefined, { enabled: isAdmin });
  const { data: servicesList } = trpc.service.list.useQuery();
  const updateStatus = trpc.booking.updateStatus.useMutation({ onSuccess: () => utils.booking.list.invalidate() });

  useEffect(() => { if (!isLoading && !user) navigate("/login"); }, [user, isLoading, navigate]);

  const getServiceName = (serviceId: number) => {
    const svc = servicesList?.find(s => s.id === serviceId);
    return svc?.name ?? `Service #${serviceId}`;
  };

  const statusColors: Record<string, string> = {
    pending: "bg-[rgba(255,149,0,0.2)] text-[#FF9500]",
    confirmed: "bg-[rgba(0,255,0,0.1)] text-green-400",
    completed: "bg-[rgba(100,149,237,0.2)] text-blue-400",
    cancelled: "bg-[rgba(255,0,0,0.1)] text-red-400",
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-[#1B2838]"><div className="w-8 h-8 border-2 border-[#FF9500] border-t-transparent rounded-full animate-spin" /></div>;
  if (!isAdmin) return <div className="min-h-screen flex items-center justify-center bg-[#1B2838]"><div className="text-center"><h1 className="text-2xl text-[#F0EBE1]">Access Denied</h1><Link to="/" className="text-[#FF9500]">Home</Link></div></div>;

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 md:px-12 bg-[#1B2838]">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/admin" className="text-sm text-[#C9B99A] hover:text-[#FF9500]"><ArrowLeft size={18} /></Link>
          <h1 className="text-3xl text-[#F0EBE1]">Services & Bookings</h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {servicesList?.map(svc => (
            <div key={svc.id} className="bg-[rgba(42,58,74,0.7)] rounded-lg border border-[rgba(255,149,0,0.2)] p-4">
              <p className="text-xs text-[#FFB840] uppercase">{svc.name}</p>
              <p className="text-2xl text-[#F0EBE1] font-medium">{svc.priceDisplay}</p>
              <p className="text-xs text-[#C9B99A]">{svc.type}</p>
            </div>
          ))}
        </div>

        <h2 className="text-xl text-[#F0EBE1] mb-4">Booking Requests</h2>
        {bookingsLoading && <p className="text-[#C9B99A]">Loading bookings...</p>}
        {!bookingsLoading && bookings?.length === 0 && (
          <div className="text-center py-12 bg-[rgba(42,58,74,0.5)] rounded-lg border border-[rgba(255,149,0,0.1)]">
            <MessageSquare size={32} className="text-[#C9B99A] mx-auto mb-2" />
            <p className="text-[#C9B99A]">No bookings yet. They will appear here when clients submit requests.</p>
          </div>
        )}
        {bookings && bookings.length > 0 && (
          <div className="space-y-3">
            {bookings.map(booking => (
              <div key={booking.id} className="bg-[rgba(42,58,74,0.7)] rounded-lg border border-[rgba(255,149,0,0.15)] p-5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-[#F0EBE1] font-medium">{booking.name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded uppercase ${statusColors[booking.status]}`}>
                        {booking.status}
                      </span>
                      {booking.amountPaid && (
                        <span className="text-xs text-green-400">${(booking.amountPaid / 100).toFixed(2)}</span>
                      )}
                    </div>
                    <p className="text-sm text-[#FF9500] mb-1">{getServiceName(booking.serviceId)}</p>
                    <div className="flex items-center gap-4 text-xs text-[#C9B99A]">
                      <span className="flex items-center gap-1"><Mail size={12} /> {booking.email}</span>
                      {booking.phone && <span className="flex items-center gap-1"><Phone size={12} /> {booking.phone}</span>}
                    </div>
                    {booking.message && <p className="text-xs text-[#C9B99A] mt-2 italic">"{booking.message}"</p>}
                  </div>
                  <div className="flex items-center gap-2">
                    {booking.status === "pending" && (
                      <>
                        <button onClick={() => updateStatus.mutate({ id: booking.id, status: "confirmed" })} className="flex items-center gap-1 px-3 py-1.5 bg-green-600/20 text-green-400 rounded text-xs hover:bg-green-600/30 transition-colors">
                          <Check size={12} /> Confirm
                        </button>
                        <button onClick={() => updateStatus.mutate({ id: booking.id, status: "cancelled" })} className="flex items-center gap-1 px-3 py-1.5 bg-red-600/20 text-red-400 rounded text-xs hover:bg-red-600/30 transition-colors">
                          <X size={12} /> Cancel
                        </button>
                      </>
                    )}
                    {booking.status === "confirmed" && (
                      <button onClick={() => updateStatus.mutate({ id: booking.id, status: "completed" })} className="flex items-center gap-1 px-3 py-1.5 bg-blue-600/20 text-blue-400 rounded text-xs hover:bg-blue-600/30 transition-colors">
                        <Check size={12} /> Complete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
