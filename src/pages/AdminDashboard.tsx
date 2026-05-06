import { useAuth } from "@/hooks/useAuth";
import { trpc } from "@/providers/trpc";
import { Link, useNavigate } from "react-router";
import { useEffect } from "react";
import { FileText, BookOpen, Scale, Calendar, DollarSign, Users } from "lucide-react";

export default function AdminDashboard() {
  const { user, isLoading, isAdmin } = useAuth();
  const navigate = useNavigate();

  const { data: blogPosts } = trpc.blog.list.useQuery({ limit: 100 });
  const { data: servicesList } = trpc.service.list.useQuery();
  const { data: legalFormsList } = trpc.legal.list.useQuery();
  const { data: bookingsList } = trpc.booking.list.useQuery(undefined, { enabled: isAdmin });

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#1B2838]"><div className="w-8 h-8 border-2 border-[#FF9500] border-t-transparent rounded-full animate-spin" /></div>;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1B2838]">
        <div className="text-center">
          <h1 className="text-2xl text-[#F0EBE1] mb-2">Access Denied</h1>
          <p className="text-[#C9B99A] mb-4">Admin access required.</p>
          <Link to="/" className="text-[#FF9500] hover:underline">Back to Home</Link>
        </div>
      </div>
    );
  }

  const stats = [
    { label: "Blog Posts", value: blogPosts?.length ?? 0, icon: FileText, path: "/admin/blog" },
    { label: "Services", value: servicesList?.length ?? 0, icon: BookOpen, path: "/admin/services" },
    { label: "Legal Forms", value: legalFormsList?.length ?? 0, icon: Scale, path: "/admin/legal" },
    { label: "Bookings", value: bookingsList?.length ?? 0, icon: Calendar, path: "/admin/services" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 md:px-12 bg-[#1B2838]">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl text-[#F0EBE1] tracking-[-0.02em]">Admin Dashboard</h1>
            <p className="text-[#C9B99A]">Welcome back, {user?.name ?? "Admin"}</p>
          </div>
          <Link to="/" className="text-sm text-[#FF9500] hover:underline">View Site</Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map(stat => {
            const Icon = stat.icon;
            return (
              <Link
                key={stat.label}
                to={stat.path}
                className="bg-[rgba(42,58,74,0.7)] rounded-lg border border-[rgba(255,149,0,0.2)] p-6 hover:border-[rgba(255,149,0,0.5)] transition-all group"
              >
                <Icon size={20} className="text-[#FF9500] mb-2" />
                <p className="text-3xl text-[#F0EBE1] font-medium">{stat.value}</p>
                <p className="text-sm text-[#C9B99A] group-hover:text-[#FF9500] transition-colors">{stat.label}</p>
              </Link>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/admin/blog" className="bg-[rgba(42,58,74,0.7)] rounded-lg border border-[rgba(255,149,0,0.2)] p-8 hover:border-[rgba(255,149,0,0.5)] hover:-translate-y-1 transition-all">
            <FileText size={28} className="text-[#FF9500] mb-3" />
            <h3 className="text-lg text-[#F0EBE1] mb-1">Blog Manager</h3>
            <p className="text-sm text-[#C9B99A]">Create, edit, and manage blog posts</p>
          </Link>

          <Link to="/admin/services" className="bg-[rgba(42,58,74,0.7)] rounded-lg border border-[rgba(255,149,0,0.2)] p-8 hover:border-[rgba(255,149,0,0.5)] hover:-translate-y-1 transition-all">
            <DollarSign size={28} className="text-[#FF9500] mb-3" />
            <h3 className="text-lg text-[#F0EBE1] mb-1">Services & Bookings</h3>
            <p className="text-sm text-[#C9B99A]">Manage services and view booking requests</p>
          </Link>

          <Link to="/admin/legal" className="bg-[rgba(42,58,74,0.7)] rounded-lg border border-[rgba(255,149,0,0.2)] p-8 hover:border-[rgba(255,149,0,0.5)] hover:-translate-y-1 transition-all">
            <Scale size={28} className="text-[#FF9500] mb-3" />
            <h3 className="text-lg text-[#F0EBE1] mb-1">Legal Forms Manager</h3>
            <p className="text-sm text-[#C9B99A]">Upload forms, generate with AI, manage downloads</p>
          </Link>
        </div>

        {bookingsList && bookingsList.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl text-[#F0EBE1] mb-4">Recent Bookings</h2>
            <div className="bg-[rgba(42,58,74,0.7)] rounded-lg border border-[rgba(255,149,0,0.2)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[rgba(255,149,0,0.15)]">
                      <th className="text-left text-xs uppercase tracking-[0.08em] text-[#FFB840] p-4">Name</th>
                      <th className="text-left text-xs uppercase tracking-[0.08em] text-[#FFB840] p-4">Service</th>
                      <th className="text-left text-xs uppercase tracking-[0.08em] text-[#FFB840] p-4">Status</th>
                      <th className="text-left text-xs uppercase tracking-[0.08em] text-[#FFB840] p-4">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookingsList.slice(0, 5).map(booking => (
                      <tr key={booking.id} className="border-b border-[rgba(240,235,225,0.05)] hover:bg-[rgba(255,149,0,0.05)]">
                        <td className="p-4 text-sm text-[#F0EBE1]">{booking.name}</td>
                        <td className="p-4 text-sm text-[#C9B99A]">Service #{booking.serviceId}</td>
                        <td className="p-4">
                          <span className={`text-xs uppercase px-2 py-1 rounded ${
                            booking.status === "pending" ? "bg-[rgba(255,149,0,0.2)] text-[#FF9500]" :
                            booking.status === "confirmed" ? "bg-[rgba(0,255,0,0.1)] text-green-400" :
                            "bg-[rgba(255,255,255,0.1)] text-[#C9B99A]"
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="p-4 text-sm text-dimmed">
                          {booking.createdAt ? new Date(booking.createdAt).toLocaleDateString() : ""}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
