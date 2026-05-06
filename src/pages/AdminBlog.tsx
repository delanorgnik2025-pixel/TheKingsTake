import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { trpc } from "@/providers/trpc";
import { Link, useNavigate } from "react-router";
import { useEffect } from "react";
import { ArrowLeft, Plus, Trash2, Edit3, Eye, X, Check } from "lucide-react";

export default function AdminBlog() {
  const { user, isLoading, isAdmin } = useAuth();
  const navigate = useNavigate();
  const utils = trpc.useUtils();

  const [showCreate, setShowCreate] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({
    title: "", slug: "", content: "", excerpt: "", category: "ADVOCACY",
    coverImage: "", featured: false, published: true,
  });

  const { data: posts, isLoading: postsLoading } = trpc.blog.list.useQuery({ limit: 100 });
  const createPost = trpc.blog.create.useMutation({ onSuccess: () => { utils.blog.list.invalidate(); setShowCreate(false); resetForm(); } });
  const updatePost = trpc.blog.update.useMutation({ onSuccess: () => { utils.blog.list.invalidate(); setEditingId(null); } });
  const deletePost = trpc.blog.delete.useMutation({ onSuccess: () => utils.blog.list.invalidate() });

  useEffect(() => { if (!isLoading && !user) navigate("/login"); }, [user, isLoading, navigate]);

  const resetForm = () => setForm({ title: "", slug: "", content: "", excerpt: "", category: "ADVOCACY", coverImage: "", featured: false, published: true });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.slug || !form.content) return;
    if (editingId) {
      updatePost.mutate({ id: editingId, ...form });
    } else {
      createPost.mutate(form);
    }
  };

  const startEdit = (post: NonNullable<typeof posts>[0]) => {
    setEditingId(post.id);
    setForm({
      title: post.title, slug: post.slug, content: post.content,
      excerpt: post.excerpt ?? "", category: post.category,
      coverImage: post.coverImage ?? "", featured: post.featured, published: post.published,
    });
    setShowCreate(true);
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-[#1B2838]"><div className="w-8 h-8 border-2 border-[#FF9500] border-t-transparent rounded-full animate-spin" /></div>;
  if (!isAdmin) return <div className="min-h-screen flex items-center justify-center bg-[#1B2838]"><div className="text-center"><h1 className="text-2xl text-[#F0EBE1]">Access Denied</h1><Link to="/" className="text-[#FF9500]">Home</Link></div></div>;

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 md:px-12 bg-[#1B2838]">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/admin" className="text-sm text-[#C9B99A] hover:text-[#FF9500]"><ArrowLeft size={18} /></Link>
            <h1 className="text-3xl text-[#F0EBE1]">Blog Manager</h1>
          </div>
          <button onClick={() => { resetForm(); setEditingId(null); setShowCreate(true); }} className="flex items-center gap-2 px-4 py-2 bg-[#FF9500] text-[#1B2838] rounded hover:bg-[#CC6A00] transition-colors text-sm font-medium">
            <Plus size={16} /> New Post
          </button>
        </div>

        {showCreate && (
          <div className="bg-[rgba(42,58,74,0.9)] rounded-lg border border-[rgba(255,149,0,0.3)] p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl text-[#F0EBE1]">{editingId ? "Edit Post" : "Create New Post"}</h2>
              <button onClick={() => { setShowCreate(false); setEditingId(null); }} className="text-[#C9B99A] hover:text-[#FF9500]"><X size={18} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Title *" required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="bg-[rgba(27,40,56,0.8)] border border-[rgba(255,149,0,0.2)] rounded px-4 py-2 text-[#F0EBE1] placeholder:text-[#C9B99A]/50 focus:border-[#FF9500] focus:outline-none" />
                <input type="text" placeholder="Slug (URL-friendly) *" required value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") })} className="bg-[rgba(27,40,56,0.8)] border border-[rgba(255,149,0,0.2)] rounded px-4 py-2 text-[#F0EBE1] placeholder:text-[#C9B99A]/50 focus:border-[#FF9500] focus:outline-none font-mono text-sm" />
              </div>
              <input type="text" placeholder="Excerpt (short summary)" value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} className="w-full bg-[rgba(27,40,56,0.8)] border border-[rgba(255,149,0,0.2)] rounded px-4 py-2 text-[#F0EBE1] placeholder:text-[#C9B99A]/50 focus:border-[#FF9500] focus:outline-none" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="bg-[rgba(27,40,56,0.8)] border border-[rgba(255,149,0,0.2)] rounded px-4 py-2 text-[#F0EBE1] focus:border-[#FF9500] focus:outline-none">
                  <option value="ADVOCACY">ADVOCACY</option>
                  <option value="LEGAL">LEGAL</option>
                  <option value="COMMUNITY">COMMUNITY</option>
                  <option value="VOICE">VOICE</option>
                  <option value="PROMOTION">PROMOTION</option>
                </select>
                <input type="text" placeholder="Cover image URL (e.g., /images/blog-post-1.jpg)" value={form.coverImage} onChange={e => setForm({ ...form, coverImage: e.target.value })} className="bg-[rgba(27,40,56,0.8)] border border-[rgba(255,149,0,0.2)] rounded px-4 py-2 text-[#F0EBE1] placeholder:text-[#C9B99A]/50 focus:border-[#FF9500] focus:outline-none" />
              </div>
              <textarea placeholder="Post content (use double line breaks for paragraphs) *" required value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} rows={12} className="w-full bg-[rgba(27,40,56,0.8)] border border-[rgba(255,149,0,0.2)] rounded px-4 py-2 text-[#F0EBE1] placeholder:text-[#C9B99A]/50 focus:border-[#FF9500] focus:outline-none font-mono text-sm" />
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 text-sm text-[#C9B99A] cursor-pointer">
                  <input type="checkbox" checked={form.published} onChange={e => setForm({ ...form, published: e.target.checked })} className="accent-[#FF9500]" />
                  Published
                </label>
                <label className="flex items-center gap-2 text-sm text-[#C9B99A] cursor-pointer">
                  <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} className="accent-[#FF9500]" />
                  Featured
                </label>
              </div>
              <button type="submit" disabled={createPost.isPending || updatePost.isPending} className="px-6 py-2 bg-[#FF9500] text-[#1B2838] rounded hover:bg-[#CC6A00] transition-colors disabled:opacity-50 font-medium">
                {editingId ? "Update Post" : "Publish Post"}
              </button>
            </form>
          </div>
        )}

        <div className="bg-[rgba(42,58,74,0.7)] rounded-lg border border-[rgba(255,149,0,0.2)] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[rgba(255,149,0,0.15)]">
                <th className="text-left text-xs uppercase tracking-[0.08em] text-[#FFB840] p-4">Title</th>
                <th className="text-left text-xs uppercase tracking-[0.08em] text-[#FFB840] p-4 hidden md:table-cell">Category</th>
                <th className="text-left text-xs uppercase tracking-[0.08em] text-[#FFB840] p-4 hidden md:table-cell">Status</th>
                <th className="text-left text-xs uppercase tracking-[0.08em] text-[#FFB840] p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {postsLoading && <tr><td colSpan={4} className="p-8 text-center text-[#C9B99A]">Loading...</td></tr>}
              {posts?.map(post => (
                <tr key={post.id} className="border-b border-[rgba(240,235,225,0.05)] hover:bg-[rgba(255,149,0,0.05)]">
                  <td className="p-4">
                    <p className="text-sm text-[#F0EBE1] font-medium">{post.title}</p>
                    <p className="text-xs text-dimded">/{post.slug}</p>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <span className="text-xs text-[#FF9500] uppercase">{post.category}</span>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <span className={`text-xs px-2 py-1 rounded ${post.published ? "bg-[rgba(0,255,0,0.1)] text-green-400" : "bg-[rgba(255,255,255,0.1)] text-[#C9B99A]"}`}>
                      {post.published ? "Live" : "Draft"}
                    </span>
                    {post.featured && <span className="ml-2 text-xs text-[#FFB840]">★</span>}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Link to={`/blog/${post.slug}`} target="_blank" className="p-2 text-[#C9B99A] hover:text-[#FF9500] transition-colors"><Eye size={14} /></Link>
                      <button onClick={() => startEdit(post)} className="p-2 text-[#C9B99A] hover:text-[#FF9500] transition-colors"><Edit3 size={14} /></button>
                      <button onClick={() => { if (confirm("Delete this post?")) deletePost.mutate({ id: post.id }); }} className="p-2 text-[#C9B99A] hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
