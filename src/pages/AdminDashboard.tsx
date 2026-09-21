import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { trpc } from "@/providers/trpc";
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  ScrollText,
  Settings,
  LogOut,
  BarChart3,
  Calendar,
  Megaphone,
  Crown,
  Radio,
  KeyRound,
  Copy,
  Mail,
  BriefcaseBusiness,
  Newspaper,
  Send,
  Menu,
  X,
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
  { id: "applications", label: "Work Applications", icon: BriefcaseBusiness },
  { id: "newsletter", label: "The King's Dispatch", icon: Newspaper },
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
  const utils = trpc.useUtils();
  const [replyThread, setReplyThread] = useState<string | null>(null);
  const [replyBody, setReplyBody] = useState("");
  const { data: visitorData } = trpc.visitor.adminContacts.useQuery(undefined, { refetchInterval: 30_000 });
  const { data: conversations, refetch: refetchConversations } = trpc.visitor.adminConversations.useQuery(undefined, { refetchInterval: 5_000 });
  const reply = trpc.visitor.adminReply.useMutation({ onSuccess: () => { setReplyBody(""); refetchConversations(); } });
  const startChat = trpc.visitor.adminStartChat.useMutation({ onSuccess: () => { setReplyBody(""); refetchConversations(); } });
  const threads = Array.from(new Map((conversations || []).map(message => [message.contactId, message])).values()).reverse();
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
        New visitors enter an email and interests before using the site. Emails are self-reported; only visitors who opt into dispatches are on the newsletter list. Earlier anonymous visits cannot be identified retroactively.
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
      <div className="mb-3 flex items-center justify-between gap-2"><h4 className="text-[#F0EBE1]">Identified visitors ({visitorData?.total || 0})</h4><button onClick={async () => {
        const records = await utils.visitor.adminExportContacts.fetch();
        const rows = [["email", "interests", "looking_for", "facebook_subscriber", "newsletter_consent", "first_seen", "last_seen"], ...records.map(v => [v.email, v.interests, v.lookingFor || "", v.facebookSubscriber, String(v.newsletterConsent), String(v.firstSeenAt), String(v.lastSeenAt)])];
        const csv = rows.map(row => row.map(cell => { const value = String(cell); return `"${(/^[\s]*[=+\-@]/.test(value) ? "'" : "") + value.replaceAll('"', '""')}"`; }).join(",")).join("\r\n");
        const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
        const link = document.createElement("a"); link.href = url; link.download = "thekingstake-visitors.csv"; link.click(); URL.revokeObjectURL(url);
      }} className="rounded border border-[#FF9500]/50 px-3 py-1 text-xs text-[#FFB840]">Export CSV</button></div>
      <div className="space-y-2 mb-8 max-h-[400px] overflow-y-auto">
        {!visitorData?.contacts.length && <p className="text-sm text-[#C9B99A]">No visitor entries yet.</p>}
        {visitorData?.contacts.map(visitor => <div key={visitor.id} className="min-w-0 rounded border border-white/10 p-3 text-sm break-words">
          <a href={`mailto:${visitor.email}`} className="break-all text-[#FFB840]">{visitor.email}</a>
          <p className="text-xs text-[#C9B99A]">Interests: {(() => { try { return (JSON.parse(visitor.interests) as string[]).join(', '); } catch { return visitor.interests; } })()} · Facebook: {visitor.facebookSubscriber} · Dispatch: {visitor.newsletterConsent ? 'opted in' : 'not subscribed'}</p>
          {visitor.lookingFor && <p className="text-xs text-[#C9B99A]">Looking for: {visitor.lookingFor}</p>}
          <p className="text-[10px] text-[#C9B99A]/70">Last seen: {new Date(visitor.lastSeenAt).toLocaleString()}</p>
          <button onClick={() => setReplyThread(`start:${visitor.id}`)} className="mt-2 text-xs text-[#FFB840]">Start chat</button>
          {replyThread === `start:${visitor.id}` && <form onSubmit={event => { event.preventDefault(); startChat.mutate({ contactId: visitor.id, body: replyBody }); }} className="mt-2 flex gap-2"><input value={replyBody} onChange={event => setReplyBody(event.target.value)} maxLength={2000} className="min-w-0 flex-1 rounded bg-[#101B28] p-2 text-white" placeholder="Send a message while they are here" /><button disabled={!replyBody.trim() || startChat.isPending} className="rounded bg-[#FF9500] px-3 text-[#101B28] disabled:opacity-50">Send</button></form>}
        </div>)}
      </div>
      <h4 className="text-[#F0EBE1] mb-3">Live chat inbox ({threads.length})</h4>
      <div className="space-y-3 mb-8">
        {!threads.length && <p className="text-sm text-[#C9B99A]">No visitor messages yet.</p>}
        {threads.map(thread => {
          const key = String(thread.contactId);
          return <div key={key} className="min-w-0 rounded border border-white/10 p-3 text-sm break-words">
            <button onClick={() => setReplyThread(replyThread === key ? null : key)} className="max-w-full break-all text-left text-[#FFB840]">{thread.email} · {thread.body.slice(0, 80)} {replyThread === key ? '▲' : '▼'}</button>
            {replyThread === key && <div className="mt-3 space-y-2">
              {conversations?.filter(message => message.contactId === thread.contactId).map(message => <p key={message.id} className="rounded bg-white/5 p-2 text-[#C9B99A]"><b>{message.sender === 'owner' ? 'You' : 'Visitor'}:</b> {message.body}</p>)}
              <form onSubmit={event => { event.preventDefault(); reply.mutate({ contactId: thread.contactId, sessionId: thread.sessionId, body: replyBody }); }} className="flex gap-2"><input value={replyBody} onChange={event => setReplyBody(event.target.value)} maxLength={2000} className="min-w-0 flex-1 rounded bg-[#101B28] p-2 text-white" placeholder="Write your reply" /><button disabled={!replyBody.trim() || reply.isPending} className="rounded bg-[#FF9500] px-3 text-[#101B28] disabled:opacity-50">Send</button></form>
              {reply.error && <p className="text-red-300">{reply.error.message}</p>}
            </div>}
          </div>;
        })}
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

function ApplicationsModule() {
  const utils = trpc.useUtils();
  const { data, isLoading } = trpc.engagement.adminApplications.useQuery();
  const update = trpc.engagement.adminUpdateApplication.useMutation({
    onSuccess: () => utils.engagement.adminApplications.invalidate(),
  });
  if (isLoading) return <p className="text-[#C9B99A]">Loading applications…</p>;
  return (
    <div>
      <h3 className="mb-2 text-xl text-[#F0EBE1]" style={{ fontFamily: "Newsreader, serif" }}>Work With Us Applications</h3>
      <p className="mb-6 text-sm text-[#C9B99A]/70">Every application submitted through the public page is stored here and also triggers an owner email alert.</p>
      <div className="space-y-3">
        {!data?.length && <div className="rounded border border-white/10 p-8 text-center text-[#C9B99A]">No applications yet.</div>}
        {data?.map(application => (
          <article key={application.id} className="rounded border border-white/10 bg-white/[0.02] p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h4 className="text-[#F0EBE1]">{application.name} · <span className="text-[#FFB840]">{application.role}</span></h4>
                <a href={`mailto:${application.email}?subject=${encodeURIComponent(`Your AASOTU ${application.role} application`)}`} className="text-xs text-[#FF9500]">{application.email}</a>
                <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-[#C9B99A]">{application.message}</p>
              </div>
              <select
                value={application.status}
                onChange={event => update.mutate({ id: application.id, status: event.target.value as "new" | "reviewing" | "contacted" | "accepted" | "declined", adminNotes: application.adminNotes || undefined })}
                className="rounded border border-[#FF9500]/25 bg-[#101b28] px-3 py-2 text-xs text-[#F0EBE1]"
              >
                <option value="new">New</option><option value="reviewing">Reviewing</option><option value="contacted">Contacted</option><option value="accepted">Accepted</option><option value="declined">Declined</option>
              </select>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

type NewsletterCampaign = {
  id: number;
  subject: string;
  previewText: string | null;
  content: string;
  sourceUrls: string | null;
  automated: boolean;
  dailyKey: string | null;
  imageUrl: string | null;
  imageAlt: string | null;
  imageCredit: string | null;
  imageSourceUrl: string | null;
  articleTitle: string | null;
  articleExcerpt: string | null;
  articleContent: string | null;
  status: "draft" | "scheduled" | "sent";
};

function campaignSources(value: string | null) {
  try { return (JSON.parse(value || "[]") as string[]).filter(Boolean); } catch { return []; }
}

function AutomatedCampaignEditor({ campaign, onSaved }: { campaign: NewsletterCampaign; onSaved: () => Promise<void> }) {
  const [editing, setEditing] = useState(false);
  const [notice, setNotice] = useState("");
  const [form, setForm] = useState({
    subject: campaign.subject,
    previewText: campaign.previewText || "",
    content: campaign.content,
    sources: campaignSources(campaign.sourceUrls).join("\n"),
    articleTitle: campaign.articleTitle || "",
    articleExcerpt: campaign.articleExcerpt || "",
    articleContent: campaign.articleContent || "",
    imageUrl: campaign.imageUrl || "",
    imageAlt: campaign.imageAlt || "",
    imageCredit: campaign.imageCredit || "",
    imageSourceUrl: campaign.imageSourceUrl || "",
  });
  const update = trpc.engagement.adminUpdateNewsletterCampaign.useMutation({
    onSuccess: async () => { setNotice("Draft changes saved."); setEditing(false); await onSaved(); },
    onError: error => setNotice(error.message),
  });
  const set = (key: keyof typeof form, value: string) => setForm(current => ({ ...current, [key]: value }));
  const save = () => update.mutate({
    id: campaign.id,
    subject: form.subject,
    previewText: form.previewText || undefined,
    content: form.content,
    sourceUrls: form.sources.split(/\s+/).map(value => value.trim()).filter(Boolean),
    articleTitle: form.articleTitle || undefined,
    articleExcerpt: form.articleExcerpt || undefined,
    articleContent: form.articleContent || undefined,
    imageUrl: form.imageUrl || undefined,
    imageAlt: form.imageAlt || undefined,
    imageCredit: form.imageCredit || undefined,
    imageSourceUrl: form.imageSourceUrl || undefined,
  });
  if (!editing) return (
    <div className="mt-4">
      <div className="grid gap-4 lg:grid-cols-[220px_1fr]">
        {campaign.imageUrl && <div><img src={campaign.imageUrl} alt={campaign.imageAlt || campaign.subject} className="h-36 w-full rounded border border-white/10 object-cover" /><p className="mt-1 line-clamp-2 text-[10px] text-[#C9B99A]/60">{campaign.imageCredit}</p></div>}
        <div>
          {campaign.articleTitle && <p className="text-base text-[#F0EBE1]">Website article: {campaign.articleTitle}</p>}
          <p className="mt-2 line-clamp-4 whitespace-pre-wrap text-xs leading-relaxed text-[#C9B99A]">{campaign.content}</p>
          <div className="mt-3 flex flex-wrap gap-2">{campaignSources(campaign.sourceUrls).map((url, index) => <a key={url} href={url} target="_blank" rel="noreferrer" className="rounded-full border border-[#FF9500]/30 px-2.5 py-1 text-[10px] text-[#FFB840]">Source {index + 1}</a>)}</div>
        </div>
      </div>
      {campaign.status !== "sent" && <button onClick={() => setEditing(true)} className="mt-4 rounded border border-white/15 px-3 py-2 text-xs text-[#F0EBE1]">Review or edit complete draft</button>}
      {notice && <p className="mt-2 text-xs text-[#FFB840]">{notice}</p>}
    </div>
  );
  const inputClass = "w-full rounded border border-white/10 bg-[#101b28] px-3 py-2 text-sm text-white";
  return (
    <div className="mt-4 space-y-3 rounded border border-[#FF9500]/20 bg-[#101b28]/60 p-4">
      <p className="text-xs uppercase tracking-[0.12em] text-[#FFB840]">Email edition</p>
      <input className={inputClass} value={form.subject} onChange={event => set("subject", event.target.value)} placeholder="Email subject" />
      <input className={inputClass} value={form.previewText} onChange={event => set("previewText", event.target.value)} placeholder="Inbox preview" />
      <textarea className={inputClass} rows={10} value={form.content} onChange={event => set("content", event.target.value)} />
      <p className="pt-2 text-xs uppercase tracking-[0.12em] text-[#FFB840]">Website article</p>
      <input className={inputClass} value={form.articleTitle} onChange={event => set("articleTitle", event.target.value)} placeholder="Article title" />
      <textarea className={inputClass} rows={3} value={form.articleExcerpt} onChange={event => set("articleExcerpt", event.target.value)} placeholder="Article excerpt" />
      <textarea className={inputClass} rows={16} value={form.articleContent} onChange={event => set("articleContent", event.target.value)} placeholder="Full article" />
      <p className="pt-2 text-xs uppercase tracking-[0.12em] text-[#FFB840]">Image and verification</p>
      <input className={inputClass} value={form.imageUrl} onChange={event => set("imageUrl", event.target.value)} placeholder="Image URL" />
      <input className={inputClass} value={form.imageAlt} onChange={event => set("imageAlt", event.target.value)} placeholder="Image description" />
      <input className={inputClass} value={form.imageCredit} onChange={event => set("imageCredit", event.target.value)} placeholder="Image credit and license" />
      <input className={inputClass} value={form.imageSourceUrl} onChange={event => set("imageSourceUrl", event.target.value)} placeholder="Image credit link" />
      <textarea className={inputClass} rows={4} value={form.sources} onChange={event => set("sources", event.target.value)} placeholder="At least two source URLs — one per line" />
      <div className="flex gap-2"><button onClick={save} disabled={update.isPending} className="rounded bg-[#FF9500] px-4 py-2 text-xs font-semibold text-[#182635] disabled:opacity-40">{update.isPending ? "Saving…" : "Save reviewed draft"}</button><button onClick={() => setEditing(false)} className="rounded border border-white/15 px-4 py-2 text-xs text-[#C9B99A]">Cancel</button></div>
      {notice && <p className="text-xs text-[#FFB840]">{notice}</p>}
    </div>
  );
}

function NewsletterModule() {
  const utils = trpc.useUtils();
  const { data } = trpc.engagement.adminNewsletterCampaigns.useQuery();
  const { data: automation } = trpc.engagement.adminNewsletterAutomationStatus.useQuery(undefined, { refetchInterval: 60_000 });
  const [draft, setDraft] = useState({ subject: "", previewText: "", content: "", sources: "" });
  const [notice, setNotice] = useState("");
  const refresh = async () => { await Promise.all([utils.engagement.adminNewsletterCampaigns.invalidate(), utils.engagement.adminNewsletterAutomationStatus.invalidate()]); };
  const generate = trpc.engagement.adminGenerateDailyNewsDraft.useMutation({
    onSuccess: async result => { setNotice(result.created ? "Today's researched draft is ready below. Review it before approval." : "Today's automated draft already exists below."); await refresh(); },
    onError: error => setNotice(error.message),
  });
  const create = trpc.engagement.adminCreateNewsletterCampaign.useMutation({
    onSuccess: async () => { setDraft({ subject: "", previewText: "", content: "", sources: "" }); setNotice("Manual draft saved. Review it below before sending."); await refresh(); },
  });
  const send = trpc.engagement.adminSendNewsletterCampaign.useMutation({
    onSuccess: async result => { setNotice(`${result.published ? "Article published and newsletter" : "Newsletter"} delivered to ${result.sent} subscriber${result.sent === 1 ? "" : "s"}.`); await refresh(); },
    onError: error => setNotice(error.message),
  });
  const save = () => create.mutate({ subject: draft.subject, previewText: draft.previewText || undefined, content: draft.content, sourceUrls: draft.sources.split(/\s+/).map(value => value.trim()).filter(Boolean) });
  return (
    <div>
      <h3 className="mb-2 text-xl text-[#F0EBE1]" style={{ fontFamily: "Newsreader, serif" }}>The King&apos;s Dispatch</h3>
      <p className="mb-6 text-sm leading-relaxed text-[#C9B99A]/70">The system researches current stories, verifies at least two independent sources, prepares a licensed image, writes the website article and email edition, then stops for your approval.</p>
      <section className="mb-8 rounded border border-[#FF9500]/30 bg-[#FF9500]/[0.04] p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div><p className="text-base text-[#F0EBE1]">Daily approval workflow</p><p className="mt-1 text-xs leading-relaxed text-[#C9B99A]">Runs at {automation?.dailyHourEastern ?? 5}:00 AM Eastern. Research and drafting are automatic. Nothing publishes or emails subscribers until you approve it.</p><div className="mt-3 flex flex-wrap gap-2 text-[10px]"><span className={`rounded-full px-2.5 py-1 ${automation?.enabled ? "bg-emerald-400/10 text-emerald-300" : "bg-red-400/10 text-red-300"}`}>Schedule {automation?.enabled ? "on" : "off"}</span><span className={`rounded-full px-2.5 py-1 ${automation?.researchConfigured ? "bg-emerald-400/10 text-emerald-300" : "bg-red-400/10 text-red-300"}`}>News research {automation?.researchConfigured ? "ready" : "needs API key"}</span><span className={`rounded-full px-2.5 py-1 ${automation?.emailConfigured ? "bg-emerald-400/10 text-emerald-300" : "bg-amber-400/10 text-amber-300"}`}>Delivery {automation?.emailConfigured ? "ready" : "not configured"}</span></div></div>
          <button onClick={() => { setNotice("Researching today's news and building the edition. This may take about a minute…"); generate.mutate(); }} disabled={generate.isPending || !automation?.researchConfigured} className="shrink-0 rounded bg-[#FF9500] px-4 py-3 text-sm font-semibold text-[#182635] disabled:opacity-40">{generate.isPending ? "Researching & writing…" : "Build today's draft now"}</button>
        </div>
        {notice && <p className="mt-4 text-xs text-[#FFB840]">{notice}</p>}
      </section>
      <details className="mb-8 rounded border border-white/10 bg-white/[0.02] p-4"><summary className="cursor-pointer text-sm text-[#C9B99A]">Create a manual edition instead</summary><div className="mt-4 space-y-3"><input value={draft.subject} onChange={event => setDraft({ ...draft, subject: event.target.value })} placeholder="Newsletter subject" className="w-full rounded bg-[#101b28] px-3 py-2 text-sm text-white" /><input value={draft.previewText} onChange={event => setDraft({ ...draft, previewText: event.target.value })} placeholder="Inbox preview text (optional)" className="w-full rounded bg-[#101b28] px-3 py-2 text-sm text-white" /><textarea value={draft.content} onChange={event => setDraft({ ...draft, content: event.target.value })} rows={10} placeholder="Write the edition here." className="w-full rounded bg-[#101b28] px-3 py-2 text-sm leading-relaxed text-white" /><textarea value={draft.sources} onChange={event => setDraft({ ...draft, sources: event.target.value })} rows={3} placeholder="Source URLs — one per line" className="w-full rounded bg-[#101b28] px-3 py-2 text-xs text-white" /><button onClick={save} disabled={create.isPending || draft.subject.trim().length < 3 || draft.content.trim().length < 30} className="rounded border border-[#FF9500]/40 px-4 py-2 text-sm text-[#FFB840] disabled:opacity-40">{create.isPending ? "Saving…" : "Save manual draft"}</button></div></details>
      <h4 className="mb-3 text-[#F0EBE1]">Approval desk and send history</h4>
      <div className="space-y-4">{!data?.length && <p className="rounded border border-white/10 p-6 text-center text-sm text-[#C9B99A]">No editions created yet. Build today&apos;s first draft above.</p>}{data?.map(campaign => <article key={campaign.id} className={`rounded border p-4 ${campaign.status === "draft" ? "border-[#FF9500]/30" : "border-white/10"}`}><div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><div className="flex flex-wrap items-center gap-2"><p className="text-sm text-[#F0EBE1]">{campaign.subject}</p>{campaign.automated && <span className="rounded-full bg-[#FF9500]/10 px-2 py-0.5 text-[9px] uppercase tracking-wider text-[#FFB840]">Automated daily draft</span>}</div><p className="mt-1 text-[11px] uppercase tracking-wider text-[#C9B99A]/60">{campaign.status}{campaign.dailyKey ? ` · ${campaign.dailyKey}` : ""}{campaign.status === "sent" ? ` · ${campaign.recipientCount} delivered` : ""}</p></div>{campaign.status !== "sent" && <button onClick={() => { const action = campaign.automated ? "Publish the website article and send this edition to every subscribed reader now?" : `Send “${campaign.subject}” to every subscribed reader now?`; if (window.confirm(action)) send.mutate({ id: campaign.id, confirm: true }); }} disabled={send.isPending} className="inline-flex items-center justify-center gap-2 rounded border border-[#FF9500]/40 px-3 py-2 text-xs text-[#FFB840] disabled:opacity-40"><Send size={13}/> {campaign.automated ? "Approve, publish & send" : "Approve & send"}</button>}</div>{campaign.automated ? <AutomatedCampaignEditor campaign={campaign} onSaved={refresh} /> : <p className="mt-3 line-clamp-3 whitespace-pre-wrap text-xs leading-relaxed text-[#C9B99A]">{campaign.content}</p>}</article>)}</div>
    </div>
  );
}

// ─── Main Dashboard ───
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [menuOpen, setMenuOpen] = useState(false);
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

  function selectTab(tab: string) {
    setActiveTab(tab);
    setMenuOpen(false);
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
      case "applications":
        return <ApplicationsModule />;
      case "newsletter":
        return <NewsletterModule />;
      case "settings":
        return <SettingsModule onLogout={handleLogout} />;
      default:
        return <DashboardHome />;
    }
  }

  return (
    <div className="min-h-screen bg-[#182635] flex flex-col md:flex-row min-w-0 pt-16">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3 md:hidden">
        <span className="flex items-center gap-2 text-sm font-medium text-[#F0EBE1]">
          <Crown size={18} className="text-[#FF9500]" />
          {NAV_ITEMS.find(item => item.id === activeTab)?.label || "Admin Panel"}
        </span>
        <button
          type="button"
          onClick={() => setMenuOpen(open => !open)}
          aria-label={menuOpen ? "Close admin sections" : "Open admin sections"}
          aria-expanded={menuOpen}
          aria-controls="admin-navigation"
          className="flex items-center gap-2 rounded border border-[#FF9500]/50 px-3 py-2 text-sm text-[#FFB840]"
        >
          <span>Admin sections</span>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {/* Sidebar */}
      <aside id="admin-navigation" className={`${menuOpen ? "flex" : "hidden"} w-full bg-[#182635] border-b border-white/[0.06] flex-col shrink-0 md:flex md:w-60 md:border-b-0 md:border-r`}>
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
              onClick={() => selectTab(item.id)}
              className={`w-full flex items-center gap-2.5 h-9 px-3 rounded text-sm transition-colors ${activeTab === item.id ? "bg-[#FF9500]/10 text-[#FF9500]" : "text-[#C9B99A] hover:bg-white/[0.03] hover:text-[#F0EBE1]"}`}
            >
              <item.icon size={16} />
              <span className="truncate">{item.label}</span>
            </button>
          ))}
          <Link
            to="/feed"
            onClick={() => setMenuOpen(false)}
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
      <main className="min-w-0 flex-1 overflow-x-hidden">
        <div className="max-w-[900px] mx-auto min-w-0 px-4 py-6 sm:px-6 sm:py-8">{renderModule()}</div>
      </main>
    </div>
  );
}
