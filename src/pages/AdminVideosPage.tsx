import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { trpc } from '@/providers/trpc'
import {
  ArrowLeft, Plus, Trash2, Edit3, Video, Save, X,
  ChevronRight, Clock, Eye, Play, Star, Radio
} from 'lucide-react'

interface VideoForm {
  title: string
  description: string
  youtubeId: string
  thumbnail: string
  duration: string
  category: string
  isLive: boolean
  isFeatured: boolean
  published: boolean
}

const EMPTY_FORM: VideoForm = {
  title: '', description: '', youtubeId: '', thumbnail: '',
  duration: '', category: 'talk', isLive: false, isFeatured: false, published: true,
}

const CATEGORIES = ['talk', 'interview', 'documentary', 'legal', 'community', 'live']

export default function AdminVideosPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState<VideoForm>(EMPTY_FORM)

  // Fetch all videos (admin endpoint)
  const { data: videos = [], isLoading } = trpc.video.adminList.useQuery(undefined, {
    retry: false,
  })

  // Create mutation
  const createMutation = trpc.video.create.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [['video', 'adminList']] })
      queryClient.invalidateQueries({ queryKey: [['video', 'list']] })
      queryClient.invalidateQueries({ queryKey: [['video', 'featured']] })
      setForm(EMPTY_FORM)
      setShowForm(false)
    },
  })

  // Update mutation
  const updateMutation = trpc.video.update.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [['video', 'adminList']] })
      queryClient.invalidateQueries({ queryKey: [['video', 'list']] })
      queryClient.invalidateQueries({ queryKey: [['video', 'featured']] })
      setEditingId(null)
      setForm(EMPTY_FORM)
      setShowForm(false)
    },
  })

  // Delete mutation
  const deleteMutation = trpc.video.delete.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [['video', 'adminList']] })
      queryClient.invalidateQueries({ queryKey: [['video', 'list']] })
      queryClient.invalidateQueries({ queryKey: [['video', 'featured']] })
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title.trim()) return
    if (editingId) {
      updateMutation.mutate({ id: editingId, ...form })
    } else {
      createMutation.mutate(form)
    }
  }

  const startEdit = (video: any) => {
    setEditingId(video.id)
    setForm({
      title: video.title,
      description: video.description ?? '',
      youtubeId: video.youtubeId ?? '',
      thumbnail: video.thumbnail ?? '',
      duration: video.duration ?? '',
      category: video.category,
      isLive: video.isLive,
      isFeatured: video.isFeatured,
      published: video.published,
    })
    setShowForm(true)
  }

  const handleDelete = (id: number) => {
    if (confirm('Delete this video?')) {
      deleteMutation.mutate({ id })
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0f1a] px-6 md:px-12 py-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/admin/dashboard')} className="text-[#C9B99A] hover:text-[#FF9500] transition-colors">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl text-[#F0EBE1] font-medium flex items-center gap-2">
                <Video size={22} className="text-[#FF9500]" /> Video Manager
              </h1>
              <p className="text-xs text-[#C9B99A]/40 mt-1">Add, edit, and manage videos for the broadcast section</p>
            </div>
          </div>
          <button
            onClick={() => { setShowForm(true); setEditingId(null); setForm(EMPTY_FORM) }}
            className="flex items-center gap-2 text-sm bg-[rgba(255,149,0,0.15)] text-[#FF9500] border border-[rgba(255,149,0,0.3)] rounded-lg px-4 py-2 hover:bg-[rgba(255,149,0,0.25)] transition-all"
          >
            <Plus size={16} /> Add Video
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-[#15202B] border border-[rgba(255,149,0,0.2)] rounded-xl p-5 md:p-6 mb-8">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg text-[#F0EBE1] font-medium">
                {editingId ? 'Edit Video' : 'Add New Video'}
              </h3>
              <button onClick={() => setShowForm(false)} className="text-[#C9B99A] hover:text-[#FF9500]">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="text-[10px] uppercase tracking-wider text-[#FF9500] mb-1.5 block">Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  placeholder="Video title"
                  className="w-full bg-[rgba(27,40,56,0.6)] border border-[rgba(255,149,0,0.15)] rounded-lg px-3 py-2.5 text-sm text-[#F0EBE1] placeholder:text-[#C9B99A]/20 focus:border-[rgba(255,149,0,0.4)] focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#FF9500] mb-1.5 block">YouTube ID</label>
                <input
                  type="text"
                  value={form.youtubeId}
                  onChange={e => setForm(f => ({ ...f, youtubeId: e.target.value }))}
                  placeholder="e.g. dQw4w9WgXcQ"
                  className="w-full bg-[rgba(27,40,56,0.6)] border border-[rgba(255,149,0,0.15)] rounded-lg px-3 py-2.5 text-sm text-[#F0EBE1] placeholder:text-[#C9B99A]/20 focus:border-[rgba(255,149,0,0.4)] focus:outline-none transition-colors"
                />
                <p className="text-[9px] text-[#C9B99A]/20 mt-1">The part after youtube.com/watch?v=</p>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#FF9500] mb-1.5 block">Duration</label>
                <input
                  type="text"
                  value={form.duration}
                  onChange={e => setForm(f => ({ ...f, duration: e.target.value }))}
                  placeholder="e.g. 12:34"
                  className="w-full bg-[rgba(27,40,56,0.6)] border border-[rgba(255,149,0,0.15)] rounded-lg px-3 py-2.5 text-sm text-[#F0EBE1] placeholder:text-[#C9B99A]/20 focus:border-[rgba(255,149,0,0.4)] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#FF9500] mb-1.5 block">Category</label>
                <select
                  value={form.category}
                  onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                  className="w-full bg-[rgba(27,40,56,0.6)] border border-[rgba(255,149,0,0.15)] rounded-lg px-3 py-2.5 text-sm text-[#F0EBE1] focus:border-[rgba(255,149,0,0.4)] focus:outline-none transition-colors"
                >
                  {CATEGORIES.map(c => <option key={c} value={c} className="bg-[#15202B]">{c}</option>)}
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#FF9500] mb-1.5 block">Thumbnail URL</label>
                <input
                  type="text"
                  value={form.thumbnail}
                  onChange={e => setForm(f => ({ ...f, thumbnail: e.target.value }))}
                  placeholder="https://... or /images/..."
                  className="w-full bg-[rgba(27,40,56,0.6)] border border-[rgba(255,149,0,0.15)] rounded-lg px-3 py-2.5 text-sm text-[#F0EBE1] placeholder:text-[#C9B99A]/20 focus:border-[rgba(255,149,0,0.4)] focus:outline-none transition-colors"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-[10px] uppercase tracking-wider text-[#FF9500] mb-1.5 block">Description</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="Brief description of the video content"
                  rows={3}
                  className="w-full bg-[rgba(27,40,56,0.6)] border border-[rgba(255,149,0,0.15)] rounded-lg px-3 py-2.5 text-sm text-[#F0EBE1] placeholder:text-[#C9B99A]/20 focus:border-[rgba(255,149,0,0.4)] focus:outline-none transition-colors resize-none"
                />
              </div>

              <div className="md:col-span-2 flex flex-wrap gap-4">
                <label className="flex items-center gap-2 text-xs text-[#C9B99A] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isFeatured}
                    onChange={e => setForm(f => ({ ...f, isFeatured: e.target.checked }))}
                    className="accent-[#FF9500]"
                  />
                  <Star size={12} className="text-[#FF9500]" /> Featured (shows in main player)
                </label>
                <label className="flex items-center gap-2 text-xs text-[#C9B99A] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isLive}
                    onChange={e => setForm(f => ({ ...f, isLive: e.target.checked }))}
                    className="accent-[#FF9500]"
                  />
                  <Radio size={12} className="text-red-400" /> Live Stream
                </label>
                <label className="flex items-center gap-2 text-xs text-[#C9B99A] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.published}
                    onChange={e => setForm(f => ({ ...f, published: e.target.checked }))}
                    className="accent-[#FF9500]"
                  />
                  <Eye size={12} /> Published (visible to public)
                </label>
              </div>

              <div className="md:col-span-2 flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="flex items-center gap-2 text-sm bg-[#FF9500] text-[#1B2838] rounded-lg px-5 py-2.5 font-medium hover:bg-[#CC6A00] transition-all disabled:opacity-50"
                >
                  <Save size={14} />
                  {createMutation.isPending || updateMutation.isPending ? 'Saving...' : editingId ? 'Update Video' : 'Add Video'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-sm text-[#C9B99A] border border-[rgba(201,185,154,0.15)] rounded-lg px-5 py-2.5 hover:border-[rgba(255,149,0,0.3)] transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Video List */}
        {isLoading ? (
          <div className="text-center py-12 text-[#C9B99A]/40 text-sm">Loading videos...</div>
        ) : videos.length === 0 ? (
          <div className="text-center py-16 bg-[rgba(27,40,56,0.3)] rounded-xl border border-[rgba(255,149,0,0.08)] border-dashed">
            <Video size={40} className="text-[#FF9500]/20 mx-auto mb-4" />
            <p className="text-sm text-[#C9B99A]/40 mb-2">No videos yet</p>
            <p className="text-xs text-[#C9B99A]/25 mb-4">Click "Add Video" to create your first broadcast entry</p>
            <button
              onClick={() => { setShowForm(true); setEditingId(null); setForm(EMPTY_FORM) }}
              className="text-xs text-[#FF9500] border border-[rgba(255,149,0,0.3)] rounded-lg px-4 py-2 hover:bg-[rgba(255,149,0,0.1)] transition-all"
            >
              <Plus size={12} className="inline mr-1" /> Add Your First Video
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {videos.map((video) => (
              <div
                key={video.id}
                className="bg-[rgba(27,40,56,0.4)] border border-[rgba(255,149,0,0.08)] hover:border-[rgba(255,149,0,0.2)] rounded-xl p-4 flex items-start gap-4 transition-all"
              >
                {/* Thumbnail */}
                <div className="w-24 h-16 rounded-lg overflow-hidden shrink-0 bg-[#0A0F1A] relative">
                  {video.thumbnail ? (
                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Video size={16} className="text-[#C9B99A]/20" />
                    </div>
                  )}
                  {video.duration && (
                    <span className="absolute bottom-1 right-1 text-[8px] bg-black/60 text-white px-1 rounded">{video.duration}</span>
                  )}
                  {video.isLive && (
                    <span className="absolute top-1 left-1 text-[8px] bg-red-600 text-white px-1.5 rounded-full font-bold flex items-center gap-0.5">
                      <span className="w-1 h-1 rounded-full bg-white animate-pulse" /> LIVE
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm text-[#F0EBE1] font-medium truncate">{video.title}</h4>
                    {video.isFeatured && <Star size={10} className="text-[#FF9500] shrink-0" />}
                    {!video.published && <span className="text-[8px] bg-[rgba(201,185,154,0.1)] text-[#C9B99A]/50 rounded px-1.5 py-0.5 shrink-0">DRAFT</span>}
                  </div>
                  <p className="text-[10px] text-[#C9B99A]/30 line-clamp-1 mb-1">{video.description}</p>
                  <div className="flex items-center gap-2 text-[9px] text-[#C9B99A]/20">
                    <span className="bg-[rgba(255,149,0,0.08)] text-[#FF9500]/60 rounded px-1.5 py-0.5">{video.category}</span>
                    {video.youtubeId && <span className="flex items-center gap-0.5"><Play size={7} /> YouTube</span>}
                    <span>{new Date(video.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => startEdit(video)}
                    className="w-8 h-8 rounded-lg bg-[rgba(255,149,0,0.08)] border border-[rgba(255,149,0,0.15)] flex items-center justify-center text-[#C9B99A] hover:text-[#FF9500] hover:border-[rgba(255,149,0,0.4)] transition-all"
                    title="Edit"
                  >
                    <Edit3 size={13} />
                  </button>
                  <button
                    onClick={() => handleDelete(video.id)}
                    className="w-8 h-8 rounded-lg bg-[rgba(220,20,60,0.08)] border border-[rgba(220,20,60,0.15)] flex items-center justify-center text-[#C9B99A] hover:text-red-400 hover:border-red-400/40 transition-all"
                    title="Delete"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 bg-[rgba(0,206,209,0.03)] border border-[rgba(0,206,209,0.1)] rounded-xl p-4">
          <h4 className="text-xs text-[#00CED1] uppercase tracking-wider mb-2 flex items-center gap-2">
            <ChevronRight size={12} /> How to Add Videos
          </h4>
          <ol className="text-[11px] text-[#C9B99A]/50 space-y-1.5 list-decimal list-inside">
            <li>Upload your video to <strong className="text-[#C9B99A]">YouTube</strong> (set as Unlisted or Public)</li>
            <li>Copy the video ID from the URL (the part after <code className="text-[#FF9500]/60">v=</code>)</li>
            <li>Click <strong className="text-[#C9B99A]">"Add Video"</strong> above and paste the YouTube ID</li>
            <li>Fill in title, description, duration, and optional thumbnail</li>
            <li>Check <strong className="text-[#C9B99A]">"Featured"</strong> to make it appear in the main broadcast player</li>
            <li>Click <strong className="text-[#C9B99A]">"Add Video"</strong> — it appears on the site immediately</li>
          </ol>
          <p className="text-[10px] text-[#00CED1]/40 mt-3">
            Note: You must run the database migration on Railway before this page works. Check the deployment instructions.
          </p>
        </div>
      </div>
    </div>
  )
}
