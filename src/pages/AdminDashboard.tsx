import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { trpc } from '@/providers/trpc'
import {
  LayoutDashboard, BookOpen, ShoppingCart, Users, Gavel,
  ScrollText, Settings, LogOut, Plus, Pencil, Trash2,
  Eye, EyeOff, Save, X, ChevronRight, BarChart3,
  Calendar, FileText, Megaphone, Crown
} from 'lucide-react'

const ADMIN_PASSWORD = 'AASOTU2025!'

// ─── Sidebar navigation items ───
const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'blog', label: 'Blog Manager', icon: BookOpen },
  { id: 'orders', label: 'Orders', icon: ShoppingCart },
  { id: 'petitions', label: 'Petition Signups', icon: ScrollText },
  { id: 'bookings', label: 'Consultations', icon: Calendar },
  { id: 'services', label: 'Services', icon: Megaphone },
  { id: 'forms', label: 'Legal Forms', icon: Gavel },
  { id: 'contacts', label: 'Contacts', icon: Users },
  { id: 'settings', label: 'Settings', icon: Settings },
]

// ─── Blog Manager Module ───
function BlogModule() {
  const [mode, setMode] = useState<'list' | 'create' | 'edit'>('list')
  const [editPost, setEditPost] = useState<any>(null)
  const [form, setForm] = useState({ title: '', slug: '', excerpt: '', content: '', coverImage: '', category: 'general', published: true })
  const utils = trpc.useUtils()
  const postsQuery = trpc.blog.list.useQuery()
  const createMut = trpc.blog.create.useMutation({ onSuccess: () => { utils.blog.list.invalidate(); setMode('list'); resetForm() } })
  const updateMut = trpc.blog.update.useMutation({ onSuccess: () => { utils.blog.list.invalidate(); setMode('list'); setEditPost(null); resetForm() } })
  const deleteMut = trpc.blog.delete.useMutation({ onSuccess: () => utils.blog.list.invalidate() })

  function resetForm() { setForm({ title: '', slug: '', excerpt: '', content: '', coverImage: '', category: 'general', published: true }) }

  function handleCreate() {
    if (!form.title || !form.content) return
    createMut.mutate({
      title: form.title,
      slug: form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
      excerpt: form.excerpt || form.content.slice(0, 200) + '...',
      content: form.content,
      coverImage: form.coverImage || undefined,
      category: form.category,
      published: form.published,
    })
  }

  function handleUpdate() {
    if (!editPost || !form.title || !form.content) return
    updateMut.mutate({
      id: editPost.id, title: form.title, slug: form.slug,
      excerpt: form.excerpt, content: form.content,
      coverImage: form.coverImage || undefined, published: form.published,
    })
  }

  function startEdit(post: any) {
    setEditPost(post)
    setForm({ title: post.title || '', slug: post.slug || '', excerpt: post.excerpt || '', content: post.content || '', coverImage: post.coverImage || '', published: post.published ?? true })
    setMode('edit')
  }

  const posts = postsQuery.data || []

  if (mode === 'create' || mode === 'edit') {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl text-[#F0EBE1]" style={{ fontFamily: 'Newsreader, serif' }}>{mode === 'create' ? 'Create New Post' : 'Edit Post'}</h3>
          <button onClick={() => { setMode('list'); setEditPost(null); resetForm() }} className="flex items-center gap-1 text-sm text-[#C9B99A] hover:text-[#FF9500]"><X size={14} /> Cancel</button>
        </div>
        <div className="space-y-4 max-w-[700px]">
          <div>
            <label className="block text-xs tracking-[0.15em] text-[#C9B99A]/60 uppercase mb-1">Title *</label>
            <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full h-11 bg-white/[0.03] border border-white/[0.08] text-[#F0EBE1] px-3 text-sm rounded focus:border-[#FF9500]/50 focus:outline-none" placeholder="Post title" />
          </div>
          <div>
            <label className="block text-xs tracking-[0.15em] text-[#C9B99A]/60 uppercase mb-1">Slug (URL)</label>
            <input type="text" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} className="w-full h-11 bg-white/[0.03] border border-white/[0.08] text-[#F0EBE1] px-3 text-sm rounded focus:border-[#FF9500]/50 focus:outline-none" placeholder="auto-generated-from-title" />
          </div>
          <div>
            <label className="block text-xs tracking-[0.15em] text-[#C9B99A]/60 uppercase mb-1">Category *</label>
            <input type="text" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full h-11 bg-white/[0.03] border border-white/[0.08] text-[#F0EBE1] px-3 text-sm rounded focus:border-[#FF9500]/50 focus:outline-none" placeholder="e.g. news, legal, opinion" />
          </div>
          <div>
            <label className="block text-xs tracking-[0.15em] text-[#C9B99A]/60 uppercase mb-1">Excerpt</label>
            <textarea rows={2} value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} className="w-full bg-white/[0.03] border border-white/[0.08] text-[#F0EBE1] px-3 py-2 text-sm rounded focus:border-[#FF9500]/50 focus:outline-none resize-none" placeholder="Short description..." />
          </div>
          <div>
            <label className="block text-xs tracking-[0.15em] text-[#C9B99A]/60 uppercase mb-1">Content *</label>
            <textarea rows={12} value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} className="w-full bg-white/[0.03] border border-white/[0.08] text-[#F0EBE1] px-3 py-2 text-sm rounded focus:border-[#FF9500]/50 focus:outline-none resize-none font-mono" placeholder="Write your post... Use **bold**, *italic*, # headings" />
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setForm({ ...form, published: !form.published })} className={`flex items-center gap-1.5 h-9 px-3 rounded text-sm ${form.published ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-[#FF9500]/10 text-[#FF9500] border border-[#FF9500]/30'}`}>
              {form.published ? <><Eye size={14} /> Published</> : <><EyeOff size={14} /> Draft</>}
            </button>
          </div>
          {createMut.error && <p className="text-red-400 text-sm">{createMut.error.message}</p>}
          {updateMut.error && <p className="text-red-400 text-sm">{updateMut.error.message}</p>}
          <div className="flex gap-3">
            <button onClick={mode === 'create' ? handleCreate : handleUpdate} disabled={!form.title || !form.content} className="flex items-center gap-2 h-10 px-6 bg-[#FF9500] text-[#0C1520] text-sm font-medium rounded hover:bg-[#CC6A00] disabled:opacity-50">
              <Save size={14} /> {mode === 'create' ? 'Publish Post' : 'Save Changes'}
            </button>
            <button onClick={() => { setMode('list'); setEditPost(null); resetForm() }} className="h-10 px-4 border border-[#FF9500] text-[#FF9500] text-sm rounded hover:bg-[#FF9500]/10"><X size={14} /> Cancel</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl text-[#F0EBE1]" style={{ fontFamily: 'Newsreader, serif' }}>Blog Posts ({posts.length})</h3>
        <button onClick={() => { resetForm(); setMode('create') }} className="flex items-center gap-2 h-9 px-4 bg-[#FF9500] text-[#0C1520] text-sm font-medium rounded hover:bg-[#CC6A00]"><Plus size={14} /> New Post</button>
      </div>
      {postsQuery.isLoading && <div className="flex justify-center py-10"><div className="w-6 h-6 border-2 border-[#FF9500] border-t-transparent rounded-full animate-spin" /></div>}
      {!postsQuery.isLoading && posts.length === 0 && (
        <div className="text-center py-12 bg-white/[0.02] border border-white/[0.06] rounded">
          <BookOpen size={40} className="text-[#C9B99A]/30 mx-auto mb-3" />
          <p className="text-[#C9B99A] mb-3">No posts yet.</p>
          <button onClick={() => { resetForm(); setMode('create') }} className="h-9 px-5 bg-[#FF9500] text-[#0C1520] text-sm rounded">Create First Post</button>
        </div>
      )}
      <div className="space-y-2">
        {posts.map((post: any) => (
          <div key={post.id} className="flex items-center gap-3 p-3 bg-white/[0.03] border border-white/[0.06] rounded hover:border-[#FF9500]/30">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[#F0EBE1] font-medium text-sm truncate">{post.title}</span>
                {post.published ? <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">PUBLISHED</span> : <span className="text-[10px] text-[#FF9500] bg-[#FF9500]/10 px-1.5 py-0.5 rounded">DRAFT</span>}
              </div>
              <p className="text-[11px] text-[#C9B99A]/50 truncate">/{post.slug}</p>
            </div>
            <div className="flex gap-1 shrink-0">
              <button onClick={() => startEdit(post)} className="p-1.5 text-[#C9B99A] hover:text-[#FF9500]" title="Edit"><Pencil size={14} /></button>
              <button onClick={() => { if (confirm('Delete this post?')) deleteMut.mutate({ id: post.id }) }} className="p-1.5 text-[#C9B99A] hover:text-red-400" title="Delete"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

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
  const { data: posts } = trpc.blog.list.useQuery()
  const { data: signers } = trpc.petition.list.useQuery()

  const stats = [
    { label: 'Blog Posts', value: posts?.length || 0, icon: BookOpen, color: 'text-[#FF9500]' },
    { label: 'Petition Signups', value: signerCount || 0, icon: ScrollText, color: 'text-emerald-400' },
    { label: 'Services', value: 6, icon: Megaphone, color: 'text-blue-400' },
    { label: 'Book Orders', value: 0, icon: ShoppingCart, color: 'text-purple-400' },
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
          <h4 className="text-sm text-[#F0EBE1] font-medium mb-3">Recent Blog Posts</h4>
          {posts && posts.length > 0 ? posts.slice(0, 5).map((p: any) => (
            <div key={p.id} className="flex items-center gap-2 py-2 border-b border-white/[0.04] last:border-0">
              <BookOpen size={14} className="text-[#FF9500]" />
              <span className="text-sm text-[#C9B99A] truncate">{p.title}</span>
              {p.published ? <span className="text-[10px] text-emerald-400 ml-auto">Live</span> : <span className="text-[10px] text-[#C9B99A]/40 ml-auto">Draft</span>}
            </div>
          )) : <p className="text-sm text-[#C9B99A]/50">No posts yet</p>}
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
      case 'blog': return <BlogModule />
      case 'orders': return <PlaceholderModule title="Orders" message="Stripe orders will appear here. Connect Stripe for live tracking." />
      case 'petitions': return <PetitionsModule />
      case 'bookings': return <PlaceholderModule title="Consultation Requests" message="Booking requests will appear here." />
      case 'services': return <PlaceholderModule title="Services" message="Service management coming soon." />
      case 'forms': return <PlaceholderModule title="Legal Forms" message="Form download tracking coming soon." />
      case 'contacts': return <PlaceholderModule title="Contacts" message="Contact submissions will appear here." />
      case 'settings': return <SettingsModule onLogout={handleLogout} />
      default: return <DashboardHome />
    }
  }

  return (
    <div className="min-h-screen bg-[#0C1520] flex">
      {/* Sidebar */}
      <aside className="w-60 bg-[#0C1520] border-r border-white/[0.06] flex flex-col shrink-0">
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
