import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router";
import { trpc } from "@/providers/trpc";
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  ScrollText,
  Settings,
  LogOut,
  X,
  ChevronRight,
  BarChart3,
  Calendar,
  Megaphone,
  Crown,
  Radio,
  KeyRound,
  Copy,
  Mail,
} from "lucide-react";

// ─── Sidebar navigation items ───
const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "orders", label: "Orders", icon: ShoppingCart },
  { id: "petitions", label: "Petition Signups", icon: ScrollText },
  { id: "bookings", label: "Consultations", icon: Calendar },
  { id: "services", label: "Services", icon: Megaphone },
  { id: "contacts", label: "Contacts", icon: Users },
  { id: "access-codes", label: "Member Access Codes", icon: KeyRound },
  { id: "audience", label: "Audience & Leads", icon: Mail },
  { id: "settings", label: "Settings", icon: Settings },
];

// ─── Petition Signups Module ───
function PetitionsModule() {
  const { data: signers, isLoading } = trpc.petition.list.useQuery();
  const { data: count } = trpc.petition.count.useQuery();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3
          className="text-xl text-[#F0EBE1]"
          style={{ fontFamily: "Newsreader, serif" }}
        >
          Petition Signups
        </h3>
        {count !== undefined && (
          <span className="text-2xl text-[#FF9500] font-bold">
            {count.toLocaleString()}
          </span>
        )}
      </div>
      {isLoading && (
        <div className="flex justify-center py-10">
          <div className="w-6 h-6 border-2 border-[#FF9500] border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      {!isLoading && (!signers || signers.length === 0) && (
        <div className="text-center py-12 bg-white/[0.02] border border-white/[0.06] rounded">
          <ScrollText size={40} className="text-[#C9B99A]/30 mx-auto mb-3" />
          <p className="text-[#C9B99A]">No signups yet.</p>
        </div>
      )}
      <div className="space-y-2">
        {signers?.map((s: any) => (
          <div
            key={s.id}
            className="flex items-center gap-3 p-3 bg-white/[0.03] border border-white/[0.06] rounded"
          >
            <div className="w-8 h-8 bg-[#FF9500]/10 rounded-full flex items-center justify-center text-[#FF9500] text-xs font-bold">
              {s.name?.[0]?.toUpperCase() || "?"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[#F0EBE1] text-sm font-medium">{s.name}</p>
              <p className="text-[11px] text-[#C9B99A]/50">
                {s.email}{" "}
                {s.city && `— ${s.city}${s.state ? ", " + s.state : ""}`}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Dashboard Home Module ───
function DashboardHome() {
  const { data: signerCount } = trpc.petition.count.useQuery();
  const { data: signers } = trpc.petition.list.useQuery();

  const stats = [
    {
      label: "Petition Signups",
      value: signerCount || 0,
      icon: ScrollText,
      color: "text-emerald-400",
    },
    {
      label: "Consultations",
      value: 0,
      icon: Calendar,
      color: "text-blue-400",
    },
    { label: "Services", value: 6, icon: Megaphone, color: "text-purple-400" },
    {
      label: "Book Orders",
      value: 0,
      icon: ShoppingCart,
      color: "text-[#FF9500]",
    },
  ];

  return (
    <div>
      <h3
        className="text-xl text-[#F0EBE1] mb-6"
        style={{ fontFamily: "Newsreader, serif" }}
      >
        Dashboard Overview
      </h3>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {stats.map(s => (
          <div
            key={s.label}
            className="bg-white/[0.03] border border-white/[0.06] p-4 rounded"
          >
            <s.icon size={20} className={s.color + " mb-2"} />
            <p className="text-2xl text-[#F0EBE1] font-bold">{s.value}</p>
            <p className="text-xs text-[#C9B99A]/60">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Recent activity */}
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="bg-white/[0.03] border border-white/[0.06] p-4 rounded">
          <h4 className="text-sm text-[#F0EBE1] font-medium mb-3">
            Recent Petition Signups
          </h4>
          {signers && signers.length > 0 ? (
            signers.slice(0, 5).map((s: any) => (
              <div
                key={s.id}
                className="flex items-center gap-2 py-2 border-b border-white/[0.04] last:border-0"
              >
                <div className="w-6 h-6 bg-[#FF9500]/10 rounded-full flex items-center justify-center text-[#FF9500] text-[10px] font-bold">
                  {s.name?.[0]}
                </div>
                <span className="text-sm text-[#C9B99A]">{s.name}</span>
              </div>
            ))
          ) : (
            <p className="text-sm text-[#C9B99A]/50">No signups yet</p>
          )}
        </div>

        <div className="bg-white/[0.03] border border-white/[0.06] p-4 rounded">
          <h4 className="text-sm text-[#F0EBE1] font-medium mb-3">
            Quick Links
          </h4>
          <div className="space-y-2">
            <a
              href="/petition"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 py-2 border-b border-white/[0.04] last:border-0 text-sm text-[#C9B99A] hover:text-[#FF9500]"
            >
              <ScrollText size={14} className="text-emerald-400" /> View
              Petition Page
            </a>
            <a
              href="/consultation"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 py-2 border-b border-white/[0.04] last:border-0 text-sm text-[#C9B99A] hover:text-[#FF9500]"
            >
              <Calendar size={14} className="text-blue-400" /> View Consultation
              Page
            </a>
            <a
              href="/feed"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 py-2 border-b border-white/[0.04] last:border-0 text-sm text-[#C9B99A] hover:text-[#FF9500]"
            >
              <Radio size={14} className="text-[#FF9500]" /> The Feed
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Placeholder Module ───
function PlaceholderModule({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <div>
      <h3
        className="text-xl text-[#F0EBE1] mb-4"
        style={{ fontFamily: "Newsreader, serif" }}
      >
        {title}
      </h3>
      <div className="bg-white/[0.03] border border-white/[0.06] p-8 rounded text-center">
        <BarChart3 size={40} className="text-[#C9B99A]/30 mx-auto mb-3" />
        <p className="text-[#C9B99A]">{message}</p>
      </div>
    </div>
  );
}

// ─── Settings Module ───
function SettingsModule({ onLogout }: { onLogout: () => void }) {
  return (
    <div>
      <h3
        className="text-xl text-[#F0EBE1] mb-6"
        style={{ fontFamily: "Newsreader, serif" }}
      >
        Settings
      </h3>
      <div className="bg-white/[0.03] border border-white/[0.06] p-4 rounded max-w-[400px]">
        <div className="flex items-center gap-3 mb-4">
          <Crown size={20} className="text-[#FF9500]" />
          <div>
            <p className="text-[#F0EBE1] font-medium">Super Admin</p>
            <p className="text-xs text-[#C9B99A]/60">
              Full access to all modules
            </p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 h-10 px-4 bg-red-500/10 text-red-400 border border-red-500/30 rounded text-sm hover:bg-red-500/20"
        >
          <LogOut size={14} /> Sign Out
        </button>
      </div>
    </div>
  );
}

function AccessCodesModule() {
  const [label, setLabel] = useState("");
  const [email, setEmail] = useState("");
  const [newCode, setNewCode] = useState("");
  const utils = trpc.useUtils();
  const codes = trpc.member.adminListAccessCodes.useQuery();
  const members = trpc.member.adminListMembers.useQuery();
  const generate = trpc.member.adminGenerateAccessCode.useMutation({
    onSuccess: data => {
      setNewCode(data.code);
      setLabel("");
      setEmail("");
      utils.member.adminListAccessCodes.invalidate();
    },
  });
  const revoke = trpc.member.adminRevokeAccessCode.useMutation({
    onSuccess: () => utils.member.adminListAccessCodes.invalidate(),
  });
  const setMemberActive = trpc.member.adminSetMemberActive.useMutation({
    onSuccess: () => utils.member.adminListMembers.invalidate(),
  });

  return (
    <div>
      <h3
        className="text-xl text-[#F0EBE1] mb-2"
        style={{ fontFamily: "Newsreader, serif" }}
      >
        Exclusive Member Access
      </h3>
      <p className="text-sm text-[#C9B99A]/70 mb-6">
        Generate a one-time code for an approved Facebook subscriber. The full
        code is shown only once.
      </p>
      <div className="grid sm:grid-cols-2 gap-3 mb-4">
        <input
          value={label}
          onChange={e => setLabel(e.target.value)}
          placeholder="Subscriber name or note"
          className="bg-white/[0.03] border border-white/[0.08] rounded px-3 py-2 text-[#F0EBE1]"
        />
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Optional locked email"
          type="email"
          className="bg-white/[0.03] border border-white/[0.08] rounded px-3 py-2 text-[#F0EBE1]"
        />
      </div>
      <button
        onClick={() =>
          generate.mutate({
            label: label || undefined,
            invitedEmail: email,
            expiresInDays: 30,
          })
        }
        disabled={generate.isPending}
        className="bg-[#FF9500] text-[#182635] font-bold rounded px-4 py-2 disabled:opacity-50"
      >
        Generate One-Time Code
      </button>
      {newCode && (
        <div className="mt-4 p-4 border border-[#FF9500]/40 bg-[#FF9500]/10 rounded flex items-center justify-between">
          <div>
            <p className="text-xs text-[#C9B99A] mb-1">
              Copy now—this full code will not be shown again.
            </p>
            <code className="text-xl tracking-widest text-[#F0EBE1]">
              {newCode}
            </code>
          </div>
          <button
            onClick={() => navigator.clipboard.writeText(newCode)}
            className="text-[#FF9500] p-2"
            title="Copy code"
          >
            <Copy size={18} />
          </button>
        </div>
      )}
      <div className="mt-6 space-y-2">
        {codes.data?.map(code => {
          const status = code.usedAt
            ? "Redeemed"
            : code.revokedAt
              ? "Revoked"
              : code.expiresAt && new Date(code.expiresAt) < new Date()
                ? "Expired"
                : "Available";
          return (
            <div
              key={code.id}
              className="p-3 bg-white/[0.03] border border-white/[0.06] rounded flex items-center gap-3"
            >
              <code className="text-[#FFB840]">{code.codePreview}</code>
              <div className="flex-1">
                <p className="text-sm text-[#F0EBE1]">
                  {code.label || code.invitedEmail || "Unassigned invitation"}
                </p>
                <p className="text-xs text-[#C9B99A]/50">{status}</p>
              </div>
              {status === "Available" && (
                <button
                  onClick={() => revoke.mutate({ id: code.id })}
                  className="text-xs text-red-400"
                >
                  Revoke
                </button>
              )}
            </div>
          );
        })}
      </div>
      <h4
        className="text-lg text-[#F0EBE1] mt-8 mb-3"
        style={{ fontFamily: "Newsreader, serif" }}
      >
        Members
      </h4>
      <div className="space-y-2">
        {members.data?.map(member => (
          <div
            key={member.id}
            className="p-3 bg-white/[0.03] border border-white/[0.06] rounded flex items-center gap-3"
          >
            <div className="flex-1">
              <p className="text-sm text-[#F0EBE1]">{member.name}</p>
              <p className="text-xs text-[#C9B99A]/50">
                {member.email} · {member.isActive ? "Active" : "Disabled"}
              </p>
            </div>
            <button
              onClick={() =>
                setMemberActive.mutate({
                  id: member.id,
                  isActive: !member.isActive,
                })
              }
              className={
                member.isActive
                  ? "text-xs text-red-400"
                  : "text-xs text-green-400"
              }
            >
              {member.isActive ? "Disable" : "Reactivate"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function AudienceModule() {
  const [testResult, setTestResult] = useState<{
    ok: boolean;
    message: string;
  } | null>(null);
  const { data, isLoading } = trpc.engagement.adminOverview.useQuery(
    undefined,
    { refetchInterval: 30_000 }
  );
  const testNotification = trpc.engagement.adminTestNotification.useMutation({
    onSuccess: () =>
      setTestResult({
        ok: true,
        message: "Test alert sent. Check the inbox on your phone.",
      }),
    onError: error => setTestResult({ ok: false, message: error.message }),
  });
  if (isLoading)
    return <p className="text-[#C9B99A]">Loading audience activity…</p>;
  return (
    <div>
      <h3
        className="text-xl text-[#F0EBE1] mb-2"
        style={{ fontFamily: "Newsreader, serif" }}
      >
        Audience & Leads
      </h3>
      <p className="text-sm text-[#C9B99A]/70 mb-6">
        Anonymous visitors are counted without exposing their identity. Contact
        information appears only after voluntary submission.
      </p>
      <div className="mb-6 rounded border border-white/10 bg-white/[0.02] p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-[#F0EBE1]">
              Owner email alerts
            </p>
            <div className="mt-2 flex flex-wrap gap-2 text-xs">
              <span
                className={`rounded-full px-2.5 py-1 ${data?.notificationsConfigured ? "bg-emerald-400/10 text-emerald-300" : "bg-red-400/10 text-red-300"}`}
              >
                Email connection{" "}
                {data?.notificationsConfigured ? "configured" : "incomplete"}
              </span>
              <span
                className={`rounded-full px-2.5 py-1 ${data?.visitorAlertsEnabled ? "bg-emerald-400/10 text-emerald-300" : "bg-amber-400/10 text-amber-300"}`}
              >
                Visitor alerts{" "}
                {data?.visitorAlertsEnabled ? "enabled" : "disabled"}
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              setTestResult(null);
              testNotification.mutate();
            }}
            disabled={
              testNotification.isPending || !data?.notificationsConfigured
            }
            className="rounded bg-[#FF9500] px-4 py-2 text-sm font-semibold text-[#182635] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {testNotification.isPending ? "Sending…" : "Send test alert"}
          </button>
        </div>
        {testResult && (
          <p
            className={`mt-3 text-xs ${testResult.ok ? "text-emerald-300" : "text-red-300"}`}
          >
            {testResult.message}
          </p>
        )}
        <p className="mt-3 text-[11px] leading-relaxed text-[#C9B99A]/60">
          A fresh incognito session counts as a new visitor. Repeat page views
          from the same session do not send repeated alerts, and alerts are
          grouped during the cooldown window.
        </p>
      </div>
      <div className="grid sm:grid-cols-3 gap-3 mb-8">
        <div className="rounded border border-white/10 p-4">
          <p className="text-2xl text-[#FF9500]">{data?.activeVisitors || 0}</p>
          <p className="text-xs text-[#C9B99A]">Active in last 5 minutes</p>
        </div>
        <div className="rounded border border-white/10 p-4">
          <p className="text-2xl text-[#FF9500]">
            {data?.subscribers.length || 0}
          </p>
          <p className="text-xs text-[#C9B99A]">Recent subscribers</p>
        </div>
        <div className="rounded border border-white/10 p-4">
          <p className="text-2xl text-[#FF9500]">{data?.leads.length || 0}</p>
          <p className="text-xs text-[#C9B99A]">Recent leads</p>
        </div>
      </div>
      <h4 className="text-[#F0EBE1] mb-3">Lead requests</h4>
      <div className="space-y-2 mb-8">
        {data?.leads.map(lead => (
          <div key={lead.id} className="rounded border border-white/10 p-3">
            <p className="text-sm text-[#F0EBE1]">
              {lead.name || "Visitor"} · {lead.interest}
            </p>
            <a href={`mailto:${lead.email}`} className="text-xs text-[#FFB840]">
              {lead.email}
            </a>
            {lead.message && (
              <p className="mt-1 text-xs text-[#C9B99A]">{lead.message}</p>
            )}
          </div>
        ))}
      </div>
      <h4 className="text-[#F0EBE1] mb-3">Newsletter subscribers</h4>
      <div className="space-y-2">
        {data?.subscribers.map(subscriber => (
          <div
            key={subscriber.id}
            className="rounded border border-white/10 p-3 text-sm text-[#C9B99A]"
          >
            {subscriber.name || "Subscriber"} · {subscriber.email}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Dashboard ───
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  // Verify admin on mount
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) navigate("/admin/login", { replace: true });
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  }

  function renderModule() {
    switch (activeTab) {
      case "dashboard":
        return <DashboardHome />;
      case "orders":
        return (
          <PlaceholderModule
            title="Orders"
            message="Stripe orders will appear here. Connect Stripe for live tracking."
          />
        );
      case "petitions":
        return <PetitionsModule />;
      case "bookings":
        return (
          <PlaceholderModule
            title="Consultation Requests"
            message="Booking requests will appear here."
          />
        );
      case "services":
        return (
          <PlaceholderModule
            title="Services"
            message="Service management coming soon."
          />
        );
      case "contacts":
        return (
          <PlaceholderModule
            title="Contacts"
            message="Contact submissions will appear here."
          />
        );
      case "access-codes":
        return <AccessCodesModule />;
      case "audience":
        return <AudienceModule />;
      case "settings":
        return <SettingsModule onLogout={handleLogout} />;
      default:
        return <DashboardHome />;
    }
  }

  return (
    <div className="min-h-screen bg-[#182635] flex">
      {/* Sidebar */}
      <aside className="w-60 bg-[#182635] border-r border-white/[0.06] flex flex-col shrink-0">
        <div className="p-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <Crown size={20} className="text-[#FF9500]" />
            <span
              className="text-sm text-[#F0EBE1] font-medium"
              style={{ fontFamily: "Newsreader, serif" }}
            >
              Admin Panel
            </span>
          </div>
        </div>

        <nav className="flex-1 p-2 space-y-0.5">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-2.5 h-9 px-3 rounded text-sm transition-colors ${activeTab === item.id ? "bg-[#FF9500]/10 text-[#FF9500]" : "text-[#C9B99A] hover:bg-white/[0.03] hover:text-[#F0EBE1]"}`}
            >
              <item.icon size={16} />
              <span className="truncate">{item.label}</span>
            </button>
          ))}
          <Link
            to="/feed"
            className="w-full flex items-center gap-2.5 h-9 px-3 rounded text-sm transition-colors text-[#FFB840] hover:bg-[#FF9500]/10 hover:text-[#FF9500]"
          >
            <Radio size={16} />
            <span className="truncate">The Feed — Post &amp; Go Live</span>
          </Link>
        </nav>

        <div className="p-3 border-t border-white/[0.06]">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 h-9 px-3 text-sm text-[#C9B99A] hover:text-red-400 hover:bg-red-500/5 rounded transition-colors"
          >
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-[900px] mx-auto px-6 py-8">{renderModule()}</div>
      </main>
    </div>
  );
}
