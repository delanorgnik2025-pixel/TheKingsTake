import { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router'
import { trpc } from '@/providers/trpc'
import {
  LayoutDashboard, ShoppingCart, Users,
  ScrollText, Settings, LogOut, X, ChevronRight, BarChart3,
  Calendar, Megaphone, Crown, Radio
} from 'lucide-react'

const ADMIN_PASSWORD = 'AASOTU2025!'

// ─── Sidebar navigation items ───
const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'orders', label: 'Orders', icon: ShoppingCart },
  { id: 'petitions', label: 'Petition Signups', icon: ScrollText },
  { id: 'bookings', label: 'Consultations', icon: Calendar },
  { id: 'services', label: 'Services', icon: Megaphone },
  { id: 'contacts', label: 'Contacts', icon: Users },
  { id: 'settings', label: 'Settings', icon: Settings },
]

// ─── Petition Signups Module ───
function PetitionsModule() {
  const { data: signers, isLoading } = trpc.petition.list.useQuery()
  const { data: count } = trpc.petition.count.useQuery()

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl text-[#F0EBE1]" style={{ fontFamily: 'Newsreader, serif' }}>Petition Signups</h3>
        {count !== undefined && <span className="text-2xl text-[#FF9500] font-bold">{count.toLocaleString()}</span>}
      </div>
      {isLoading && <div className="flex justify-center py-10"><div className="w-6 h-6 border-2 border-[#FF9500] border-t-transparent rounded-full animate-spin" /></div>}
      {!isLoading && (!signers || signers.length === 0) && (
        <div className="text-center py-12 bg-white/[0.02] border border-white/[0.06] rounded">
          <ScrollText size={40} className="text-[#C9B99A]/30 mx-auto mb-3" />
          <p className="text-[#C9B99A]">No signups yet.</p>
        </div>
      )}
      <div className="space-y-2">
        {signers?.map((s: any) => (
          <div key={s.id} className="flex items-center gap-3 p-3 bg-white/[0.03] border border-white/[0.06] rounded">
            <div className="w-8 h-8 bg-[#FF9500]/10 rounded-full flex items-center justify-center text-[#FF9500] text-xs font-bold">{s.name?.[0]?.toUpperCase() || '?'}</div>
            <div className="flex-1 min-w-0">
              <p className="text-[#F0EBE1] text-sm font-medium">{s.name}</p>
              <p className="text-[11px] text-[#C9B99A]/50">{s.email} {s.city && `— ${s.city}${s.state ? ', ' + s.state : ''}`}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Dashboard Home Module ───
function DashboardHome() {
  const { data: signerCount } = trpc.petition.count.useQuery()
  const { data: signers } = trpc.petition.list.useQuery()

  const stats = [
    { label: 'Petition Signups', value: signerCount || 0, icon: ScrollText, color: 'text-emerald-400' },
    { label: 'Consultations', value: 0, icon: Calendar, color: 'text-blue-400' },
    { label: 'Services', value: 6, icon: Megaphone, color: 'text-purple-400' },
    { label: 'Book Orders', value: 0, icon: ShoppingCart, color: 'text-[#FF9500]' },
  ]

  return (
    <div>
      <h3 className="text-xl text-[#F0EBE1] mb-6" style={{ fontFamily: 'Newsreader, serif' }}>Dashboard Overview</h3>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-white/[0.03] border border-white/[0.06] p-4 rounded">
            <s.icon size={20} className={s.color + ' mb-2'} />
            <p className="text-2xl text-[#F0EBE1] font-bold">{s.value}</p>
            <p className="text-xs text-[#C9B99A]/60">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Recent activity */}
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="bg-white/[0.03] border border-white/[0.06] p-4 rounded">
          <h4 className="text-sm text-[#F0EBE1] font-medium mb-3">Recent Petition Signups</h4>
          {signers && signers.length > 0 ? signers.slice(0, 5).map((s: any) => (
            <div key={s.id} className="flex items-center gap-2 py-2 border-b border-white/[0.04] last:border-0">
              <div className="w-6 h-6 bg-[#FF9500]/10 rounded-full flex items-center justify-center text-[#FF9500] text-[10px] font-bold">{s.name?.[0]}</div>
              <span className="text-sm text-[#C9B99A]">{s.name}</span>
            </div>
          )) : <p className="text-sm text-[#C9B99A]/50">No signups yet</p>}
        </div>

        <div className="bg-white/[0.03] border border-white/[0.06] p-4 rounded">
          <h4 className="text-sm text-[#F0EBE1] font-medium mb-3">Quick Links</h4>
          <div className="space-y-2">
            <a href="/petition" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 py-2 border-b border-white/[0.04] last:border-0 text-sm text-[#C9B99A] hover:text-[#FF9500]">
              <ScrollText size={14} className="text-emerald-400" /> View Petition Page
            </a>
            <a href="/consultation" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 py-2 border-b border-white/[0.04] last:border-0 text-sm text-[#C9B99A] hover:text-[#FF9500]">
              <Calendar size={14} className="text-blue-400" /> View Consultation Page
            </a>
            <a href="/feed" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 py-2 border-b border-white/[0.04] last:border-0 text-sm text-[#C9B99A] hover:text-[#FF9500]">
              <Radio size={14} className="text-[#FF9500]" /> The Feed
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Placeholder Module ───
function PlaceholderModule({ title, message }: { title: string; message: string }) {
  return (
    <div>
      <h3 className="text-xl text-[#F0EBE1] mb-4" style={{ fontFamily: 'Newsreader, serif' }}>{title}</h3>
      <div className="bg-white/[0.03] border border-white/[0.06] p-8 rounded text-center">
        <BarChart3 size={40} className="text-[#C9B99A]/30 mx-auto mb-3" />
        <p className="text-[#C9B99A]">{message}</p>
      </div>
    </div>
  )
}

// ─── Settings Module ───
function SettingsModule({ onLogout }: { onLogout: () => void }) {
  return (
    <div>
      <h3 className="text-xl text-[#F0EBE1] mb-6" style={{ fontFamily: 'Newsreader, serif' }}>Settings</h3>
      <div className="bg-white/[0.03] border border-white/[0.06] p-4 rounded max-w-[400px]">
        <div className="flex items-center gap-3 mb-4">
          <Crown size={20} className="text-[#FF9500]" />
          <div>
            <p className="text-[#F0EBE1] font-medium">Super Admin</p>
            <p className="text-xs text-[#C9B99A]/60">Full access to all modules</p>
          </div>
        </div>
        <button onClick={onLogout} className="flex items-center gap-2 h-10 px-4 bg-red-500/10 text-red-400 border border-red-500/30 rounded text-sm hover:bg-red-500/20">
          <LogOut size={14} /> Sign Out
        </button>
      </div>
    </div>
  )
}

// ─── Main Dashboard ───
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const navigate = useNavigate()

  // Verify admin on mount
  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) navigate('/admin/login', { replace: true })
  }, [navigate])

  function handleLogout() {
    localStorage.removeItem('adminToken')
    window.location.href = '/admin/login'
  }

  function renderModule() {
    switch (activeTab) {
      case 'dashboard': return <DashboardHome />
      case 'orders': return <PlaceholderModule title="Orders" message="Stripe orders will appear here. Connect Stripe for live tracking." />
      case 'petitions': return <PetitionsModule />
      case 'bookings': return <PlaceholderModule title="Consultation Requests" message="Booking requests will appear here." />
      case 'services': return <PlaceholderModule title="Services" message="Service management coming soon." />
      case 'contacts': return <PlaceholderModule title="Contacts" message="Contact submissions will appear here." />
      case 'settings': return <SettingsModule onLogout={handleLogout} />
      default: return <DashboardHome />
    }
  }

  return (
    <div className="min-h-screen bg-[#182635] flex">
      {/* Sidebar */}
      <aside className="w-60 bg-[#182635] border-r border-white/[0.06] flex flex-col shrink-0">
        <div className="p-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <Crown size={20} className="text-[#FF9500]" />
            <span className="text-sm text-[#F0EBE1] font-medium" style={{ fontFamily: 'Newsreader, serif' }}>Admin Panel</span>
          </div>
        </div>

        <nav className="flex-1 p-2 space-y-0.5">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-2.5 h-9 px-3 rounded text-sm transition-colors ${activeTab === item.id ? 'bg-[#FF9500]/10 text-[#FF9500]' : 'text-[#C9B99A] hover:bg-white/[0.03] hover:text-[#F0EBE1]'}`}
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
          <button onClick={handleLogout} className="w-full flex items-center gap-2 h-9 px-3 text-sm text-[#C9B99A] hover:text-red-400 hover:bg-red-500/5 rounded transition-colors">
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-[900px] mx-auto px-6 py-8">
          {renderModule()}
        </div>
      </main>
    </div>
  )
}
