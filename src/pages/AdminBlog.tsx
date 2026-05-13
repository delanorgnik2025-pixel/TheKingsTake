import { useState } from 'react'
import { Link } from 'react-router'
import { trpc } from '@/providers/trpc'
import { ArrowLeft, Plus, Pencil, Trash2, Eye, EyeOff, BookOpen, Save, X, FileText } from 'lucide-react'

export default function AdminBlog() {
  const [mode, setMode] = useState<'list' | 'create' | 'edit'>('list')
  const [editPost, setEditPost] = useState<any>(null)
  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImage: '',
    published: true,
  })

  const utils = trpc.useUtils()
  const postsQuery = trpc.blog.list.useQuery()
  const createMutation = trpc.blog.create.useMutation({
    onSuccess: () => {
      utils.blog.list.invalidate()
      setMode('list')
      resetForm()
    },
  })
  const updateMutation = trpc.blog.update.useMutation({
    onSuccess: () => {
      utils.blog.list.invalidate()
      setMode('list')
      setEditPost(null)
      resetForm()
    },
  })
  const deleteMutation = trpc.blog.delete.useMutation({
    onSuccess: () => {
      utils.blog.list.invalidate()
    },
  })

  function resetForm() {
    setForm({ title: '', slug: '', excerpt: '', content: '', coverImage: '', published: true })
  }

  function handleCreate() {
    if (!form.title || !form.content) return
    createMutation.mutate({
      title: form.title,
      slug: form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
      excerpt: form.excerpt || form.content.slice(0, 200) + '...',
      content: form.content,
      coverImage: form.coverImage || undefined,
      published: form.published,
    })
  }

  function handleUpdate() {
    if (!editPost || !form.title || !form.content) return
    updateMutation.mutate({
      id: editPost.id,
      title: form.title,
      slug: form.slug,
      excerpt: form.excerpt,
      content: form.content,
      coverImage: form.coverImage || undefined,
      published: form.published,
    })
  }

  function startEdit(post: any) {
    setEditPost(post)
    setForm({
      title: post.title || '',
      slug: post.slug || '',
      excerpt: post.excerpt || '',
      content: post.content || '',
      coverImage: post.coverImage || '',
      published: post.published ?? true,
    })
    setMode('edit')
  }

  const posts = postsQuery.data || []

  return (
    <div className="min-h-screen bg-[#0C1520]">
      <div className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-[0.08]" style={{ backgroundImage: 'url(/images/bg-hero.jpg)' }} />
      <div className="fixed inset-0 bg-gradient-to-b from-[#0C1520]/98 via-[#0C1520]/95 to-[#0C1520]/98" />

      <div className="relative z-10">
        {/* Header */}
        <div className="border-b border-white/[0.06]">
          <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="text-[#C9B99A] hover:text-[#FF9500] transition-colors"><ArrowLeft size={20} /></Link>
              <BookOpen size={20} className="text-[#FF9500]" />
              <h1 className="text-lg text-[#F0EBE1] font-medium" style={{ fontFamily: 'Newsreader, serif' }}>Blog Admin</h1>
            </div>
            {mode === 'list' && (
              <button onClick={() => { resetForm(); setMode('create') }} className="flex items-center gap-2 h-9 px-4 bg-[#FF9500] text-[#0C1520] text-sm font-medium rounded hover:bg-[#CC6A00] transition-colors">
                <Plus size={16} /> New Post
              </button>
            )}
            {mode !== 'list' && (
              <button onClick={() => { setMode('list'); setEditPost(null); }} className="flex items-center gap-2 h-9 px-4 border border-[#FF9500] text-[#FF9500] text-sm rounded hover:bg-[#FF9500]/10 transition-colors">
                <X size={16} /> Cancel
              </button>
            )}
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 py-8">
          {/* LIST MODE */}
          {mode === 'list' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl text-[#F0EBE1]" style={{ fontFamily: 'Newsreader, serif' }}>All Posts ({posts.length})</h2>
              </div>

              {postsQuery.isLoading && (
                <div className="flex items-center justify-center py-20">
                  <div className="w-8 h-8 border-2 border-[#FF9500] border-t-transparent rounded-full animate-spin" />
                </div>
              )}

              {!postsQuery.isLoading && posts.length === 0 && (
                <div className="text-center py-20 bg-white/[0.02] border border-white/[0.06] rounded">
                  <FileText size={48} className="text-[#C9B99A]/30 mx-auto mb-4" />
                  <p className="text-[#C9B99A] mb-4">No blog posts yet.</p>
                  <button onClick={() => { resetForm(); setMode('create') }} className="h-10 px-6 bg-[#FF9500] text-[#0C1520] text-sm font-medium rounded hover:bg-[#CC6A00] transition-colors">
                    Create Your First Post
                  </button>
                </div>
              )}

              <div className="space-y-3">
                {posts.map((post: any) => (
                  <div key={post.id} className="flex items-center gap-4 p-4 bg-white/[0.03] border border-white/[0.06] rounded hover:border-[#FF9500]/30 transition-colors">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-[#F0EBE1] font-medium truncate">{post.title}</h3>
                        {post.published ? (
                          <span className="flex items-center gap-1 text-xs text-emerald-400"><Eye size={12} /> Published</span>
                        ) : (
                          <span className="flex items-center gap-1 text-xs text-[#C9B99A]/60"><EyeOff size={12} /> Draft</span>
                        )}
                      </div>
                      <p className="text-xs text-[#C9B99A]/60 truncate">/{post.slug} — {post.excerpt?.slice(0, 80)}...</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Link to={`/blog/${post.slug}`} target="_blank" className="p-2 text-[#C9B99A] hover:text-[#FF9500] transition-colors" title="View">
                        <Eye size={16} />
                      </Link>
                      <button onClick={() => startEdit(post)} className="p-2 text-[#C9B99A] hover:text-[#FF9500] transition-colors" title="Edit">
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => { if (confirm('Delete this post?')) deleteMutation.mutate({ id: post.id }) }} className="p-2 text-[#C9B99A] hover:text-red-400 transition-colors" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CREATE/EDIT MODE */}
          {(mode === 'create' || mode === 'edit') && (
            <div className="max-w-[800px]">
              <h2 className="text-2xl text-[#F0EBE1] mb-6" style={{ fontFamily: 'Newsreader, serif' }}>
                {mode === 'create' ? 'Create New Post' : 'Edit Post'}
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs tracking-[0.15em] text-[#C9B99A]/60 uppercase mb-2">Title *</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={e => setForm({ ...form, title: e.target.value })}
                    className="w-full h-12 bg-white/[0.03] border border-white/[0.08] text-[#F0EBE1] px-4 text-sm focus:border-[#FF9500]/50 focus:outline-none rounded"
                    placeholder="Post title"
                  />
                </div>

                <div>
                  <label className="block text-xs tracking-[0.15em] text-[#C9B99A]/60 uppercase mb-2">Slug (URL)</label>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={e => setForm({ ...form, slug: e.target.value })}
                    className="w-full h-12 bg-white/[0.03] border border-white/[0.08] text-[#F0EBE1] px-4 text-sm focus:border-[#FF9500]/50 focus:outline-none rounded"
                    placeholder="my-post-title"
                  />
                  <p className="text-[10px] text-[#C9B99A]/40 mt-1">Leave empty to auto-generate from title</p>
                </div>

                <div>
                  <label className="block text-xs tracking-[0.15em] text-[#C9B99A]/60 uppercase mb-2">Cover Image URL (optional)</label>
                  <input
                    type="text"
                    value={form.coverImage}
                    onChange={e => setForm({ ...form, coverImage: e.target.value })}
                    className="w-full h-12 bg-white/[0.03] border border-white/[0.08] text-[#F0EBE1] px-4 text-sm focus:border-[#FF9500]/50 focus:outline-none rounded"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <label className="block text-xs tracking-[0.15em] text-[#C9B99A]/60 uppercase mb-2">Excerpt</label>
                  <textarea
                    rows={2}
                    value={form.excerpt}
                    onChange={e => setForm({ ...form, excerpt: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/[0.08] text-[#F0EBE1] px-4 py-3 text-sm focus:border-[#FF9500]/50 focus:outline-none resize-none rounded"
                    placeholder="Short description for post previews"
                  />
                </div>

                <div>
                  <label className="block text-xs tracking-[0.15em] text-[#C9B99A]/60 uppercase mb-2">Content *</label>
                  <textarea
                    rows={16}
                    value={form.content}
                    onChange={e => setForm({ ...form, content: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/[0.08] text-[#F0EBE1] px-4 py-3 text-sm focus:border-[#FF9500]/50 focus:outline-none resize-none rounded font-mono"
                    placeholder="Write your post content here... Use **bold**, *italic*, # headings, etc."
                  />
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setForm({ ...form, published: !form.published })}
                    className={`flex items-center gap-2 h-10 px-4 rounded text-sm font-medium transition-colors ${form.published ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-[#FF9500]/10 text-[#FF9500] border border-[#FF9500]/30'}`}
                  >
                    {form.published ? <><Eye size={14} /> Published</> : <><EyeOff size={14} /> Draft</>}
                  </button>
                </div>

                {createMutation.error && (
                  <div className="bg-red-500/10 border border-red-500/30 p-3 text-red-400 text-sm rounded">
                    {createMutation.error.message}
                  </div>
                )}
                {updateMutation.error && (
                  <div className="bg-red-500/10 border border-red-500/30 p-3 text-red-400 text-sm rounded">
                    {updateMutation.error.message}
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  {mode === 'create' ? (
                    <button
                      onClick={handleCreate}
                      disabled={createMutation.isPending || !form.title || !form.content}
                      className="flex items-center gap-2 h-12 px-8 bg-[#FF9500] text-[#0C1520] font-medium rounded hover:bg-[#CC6A00] transition-colors disabled:opacity-50"
                    >
                      <Save size={16} />
                      {createMutation.isPending ? 'Publishing...' : 'Publish Post'}
                    </button>
                  ) : (
                    <button
                      onClick={handleUpdate}
                      disabled={updateMutation.isPending || !form.title || !form.content}
                      className="flex items-center gap-2 h-12 px-8 bg-[#FF9500] text-[#0C1520] font-medium rounded hover:bg-[#CC6A00] transition-colors disabled:opacity-50"
                    >
                      <Save size={16} />
                      {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
                    </button>
                  )}
                  <button
                    onClick={() => { setMode('list'); setEditPost(null); }}
                    className="flex items-center gap-2 h-12 px-6 border border-[#FF9500] text-[#FF9500] rounded hover:bg-[#FF9500]/10 transition-colors"
                  >
                    <X size={16} /> Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
