// PAGE 11 — STORIES
// Route: /ancestor-root-registry/stories

import { useEffect, useState, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, Plus, X, BookOpen, Filter, Trash2, Edit2, Save
} from 'lucide-react'
import { loadRegistryData, addStory, updateStory, removeStory, generateId } from '@/lib/registry-storage'
import type { RegistryData, Story, StoryType } from '@/types/registry'

const storyTypes: StoryType[] = [
  'Oral History', 'Biography', 'Family Tradition', 'Migration Story',
  'Military Story', 'Work and Occupation', 'Community History',
  'Recipe or Cultural Practice', 'Memorial', 'Research Narrative', 'Other'
]

export default function RegistryStoriesPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const personFilter = searchParams.get('person')

  const [data, setData] = useState<RegistryData | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [filterType, setFilterType] = useState<string>('all')
  const [form, setForm] = useState({
    title: '',
    body: '',
    storyType: 'Oral History' as StoryType,
    location: '',
    approximateDate: '',
    sourceNote: '',
    personIds: [] as string[],
  })

  useEffect(() => {
    const d = loadRegistryData()
    if (!d) {
      navigate('/ancestor-root-registry/access')
      return
    }
    setData(d)
    if (personFilter) {
      setForm((f) => ({ ...f, personIds: [personFilter] }))
    }
  }, [navigate, personFilter])

  const filteredStories = useMemo(() => {
    if (!data) return []
    let stories = [...data.stories]
    if (filterType !== 'all') {
      stories = stories.filter((s) => s.storyType === filterType)
    }
    if (personFilter) {
      stories = stories.filter((s) => s.personIds.includes(personFilter))
    }
    return stories.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }, [data, filterType, personFilter])

  function resetForm() {
    setForm({ title: '', body: '', storyType: 'Oral History', location: '', approximateDate: '', sourceNote: '', personIds: personFilter ? [personFilter] : [] })
    setEditingId(null)
    setShowForm(false)
  }

  function handleSubmit() {
    if (!data || !form.title.trim() || !form.body.trim()) return

    if (editingId) {
      const updated = updateStory(data, editingId, {
        title: form.title,
        body: form.body,
        storyType: form.storyType,
        location: form.location,
        approximateDate: form.approximateDate,
        sourceNote: form.sourceNote,
      })
      setData(updated)
    } else {
      const story: Story = {
        id: generateId(),
        registryId: data.registry.id,
        personIds: form.personIds,
        title: form.title,
        body: form.body,
        storyType: form.storyType,
        location: form.location,
        approximateDate: form.approximateDate,
        recordStatus: 'Family Testimony',
        sourceNote: form.sourceNote,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      const updated = addStory(data, story)
      setData(updated)
    }
    resetForm()
  }

  function handleEdit(story: Story) {
    setForm({
      title: story.title,
      body: story.body,
      storyType: story.storyType,
      location: story.location || '',
      approximateDate: story.approximateDate || '',
      sourceNote: story.sourceNote || '',
      personIds: story.personIds,
    })
    setEditingId(story.id)
    setShowForm(true)
  }

  function handleDelete(storyId: string) {
    if (!data) return
    if (!confirm('Delete this story?')) return
    const updated = removeStory(data, storyId)
    setData(updated)
  }

  function togglePerson(personId: string) {
    setForm((f) => ({
      ...f,
      personIds: f.personIds.includes(personId)
        ? f.personIds.filter((id) => id !== personId)
        : [...f.personIds, personId],
    }))
  }

  if (!data) return null

  return (
    <div className="min-h-screen bg-[#05080e]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0A0F1A]/95 backdrop-blur-md border-b border-[rgba(201,185,154,0.08)]">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => navigate('/ancestor-root-registry/dashboard')}
            className="flex items-center gap-2 text-xs text-[#C9B99A] hover:text-[#FF9500] transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} /> Dashboard
          </button>
          <span className="text-sm text-[#F0EBE1]">Stories</span>
          <button
            onClick={() => { resetForm(); setShowForm(true) }}
            className="flex items-center gap-1 text-xs text-[#FF9500] hover:text-[#FFB840] cursor-pointer"
          >
            <Plus size={14} /> New
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="flex items-center gap-2 mb-6">
          <Filter size={12} className="text-[#C9B99A]/30" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-[rgba(27,40,56,0.4)] border border-[rgba(201,185,154,0.08)] text-xs text-[#C9B99A] focus:outline-none cursor-pointer"
          >
            <option value="all">All Types</option>
            {storyTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <span className="text-[10px] text-[#C9B99A]/25 ml-auto">{filteredStories.length} stories</span>
        </div>

        {/* Story Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 overflow-hidden"
            >
              <div className="p-5 rounded-xl bg-[rgba(27,40,56,0.5)] border border-[rgba(255,149,0,0.15)]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm text-[#F0EBE1] font-medium">
                    {editingId ? 'Edit Story' : 'New Story'}
                  </h3>
                  <button onClick={resetForm} className="text-[#C9B99A]/40 hover:text-[#C9B99A] cursor-pointer">
                    <X size={16} />
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] text-[#C9B99A]/40 mb-1 block">Title</label>
                    <input
                      value={form.title}
                      onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                      placeholder="Story title..."
                      className="w-full px-3 py-2 rounded-lg bg-[rgba(27,40,56,0.6)] border border-[rgba(201,185,154,0.1)] text-[#F0EBE1] text-sm placeholder:text-[#C9B99A]/20 focus:outline-none focus:border-[rgba(255,149,0,0.3)]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-[#C9B99A]/40 mb-1 block">Story</label>
                    <textarea
                      value={form.body}
                      onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
                      placeholder="Write the story..."
                      rows={5}
                      className="w-full px-3 py-2 rounded-lg bg-[rgba(27,40,56,0.6)] border border-[rgba(201,185,154,0.1)] text-[#F0EBE1] text-sm placeholder:text-[#C9B99A]/20 focus:outline-none focus:border-[rgba(255,149,0,0.3)] resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] text-[#C9B99A]/40 mb-1 block">Type</label>
                      <select
                        value={form.storyType}
                        onChange={(e) => setForm((f) => ({ ...f, storyType: e.target.value as StoryType }))}
                        className="w-full px-3 py-2 rounded-lg bg-[rgba(27,40,56,0.6)] border border-[rgba(201,185,154,0.1)] text-[#F0EBE1] text-xs focus:outline-none cursor-pointer"
                      >
                        {storyTypes.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] text-[#C9B99A]/40 mb-1 block">Approximate Date</label>
                      <input
                        value={form.approximateDate}
                        onChange={(e) => setForm((f) => ({ ...f, approximateDate: e.target.value }))}
                        placeholder="e.g., Summer 1965"
                        className="w-full px-3 py-2 rounded-lg bg-[rgba(27,40,56,0.6)] border border-[rgba(201,185,154,0.1)] text-[#F0EBE1] text-xs placeholder:text-[#C9B99A]/20 focus:outline-none focus:border-[rgba(255,149,0,0.3)]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] text-[#C9B99A]/40 mb-1 block">Location</label>
                      <input
                        value={form.location}
                        onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                        placeholder="Where did this take place?"
                        className="w-full px-3 py-2 rounded-lg bg-[rgba(27,40,56,0.6)] border border-[rgba(201,185,154,0.1)] text-[#F0EBE1] text-xs placeholder:text-[#C9B99A]/20 focus:outline-none focus:border-[rgba(255,149,0,0.3)]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-[#C9B99A]/40 mb-1 block">Source Note</label>
                      <input
                        value={form.sourceNote}
                        onChange={(e) => setForm((f) => ({ ...f, sourceNote: e.target.value }))}
                        placeholder="Who told this story?"
                        className="w-full px-3 py-2 rounded-lg bg-[rgba(27,40,56,0.6)] border border-[rgba(201,185,154,0.1)] text-[#F0EBE1] text-xs placeholder:text-[#C9B99A]/20 focus:outline-none focus:border-[rgba(255,149,0,0.3)]"
                      />
                    </div>
                  </div>

                  {/* Connected people */}
                  <div>
                    <label className="text-[10px] text-[#C9B99A]/40 mb-2 block">Connected People</label>
                    <div className="flex flex-wrap gap-2">
                      {data.people.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => togglePerson(p.id)}
                          className="px-2.5 py-1 rounded-lg text-[10px] border transition-all cursor-pointer"
                          style={{
                            borderColor: form.personIds.includes(p.id) ? 'rgba(255,149,0,0.4)' : 'rgba(201,185,154,0.08)',
                            background: form.personIds.includes(p.id) ? 'rgba(255,149,0,0.1)' : 'rgba(27,40,56,0.3)',
                            color: form.personIds.includes(p.id) ? '#F0EBE1' : '#C9B99A/50',
                          }}
                        >
                          {p.preferredName || p.fullName}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      onClick={resetForm}
                      className="px-4 py-2 rounded-lg text-xs text-[#C9B99A] border border-[rgba(201,185,154,0.1)] hover:bg-[rgba(201,185,154,0.05)] cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={!form.title.trim() || !form.body.trim()}
                      className="px-4 py-2 rounded-lg text-xs font-medium cursor-pointer disabled:opacity-30"
                      style={{ background: 'rgba(255,149,0,0.8)', color: '#0A0F1A' }}
                    >
                      <Save size={12} className="inline mr-1" /> Save Story
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stories List */}
        {filteredStories.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen size={32} className="text-[#C9B99A]/15 mx-auto mb-3" />
            <p className="text-sm text-[#C9B99A]/30">No stories yet.</p>
            <button onClick={() => setShowForm(true)} className="mt-3 text-xs text-[#FF9500] hover:text-[#FFB840] cursor-pointer">
              Write the first story
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredStories.map((story, i) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-5 rounded-xl bg-[rgba(27,40,56,0.3)] border border-[rgba(201,185,154,0.06)] hover:border-[rgba(201,185,154,0.1)] transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-[rgba(255,149,0,0.1)] text-[#FF9500]/60">
                        {story.storyType}
                      </span>
                      {story.recordStatus && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-[rgba(201,185,154,0.08)] text-[#C9B99A]/40">
                          {story.recordStatus}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base text-[#F0EBE1] font-medium">{story.title}</h3>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => handleEdit(story)} className="p-1.5 rounded text-[#C9B99A]/30 hover:text-[#FF9500] hover:bg-[rgba(255,149,0,0.08)] transition-all cursor-pointer">
                      <Edit2 size={12} />
                    </button>
                    <button onClick={() => handleDelete(story.id)} className="p-1.5 rounded text-[#C9B99A]/30 hover:text-[#f44336] hover:bg-[rgba(244,67,54,0.08)] transition-all cursor-pointer">
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>

                <p className="text-sm text-[#C9B99A]/60 leading-relaxed mb-3 whitespace-pre-wrap">{story.body}</p>

                <div className="flex flex-wrap items-center gap-3 text-[10px] text-[#C9B99A]/30">
                  {story.location && <span>📍 {story.location}</span>}
                  {story.approximateDate && <span>📅 {story.approximateDate}</span>}
                  {story.sourceNote && <span>📝 {story.sourceNote}</span>}
                  {story.personIds.length > 0 && (
                    <div className="flex gap-1">
                      {story.personIds.map((pid) => {
                        const p = data.people.find((pp) => pp.id === pid)
                        return p ? (
                          <button
                            key={pid}
                            onClick={() => navigate(`/ancestor-root-registry/person/${pid}`)}
                            className="text-[#FF9500]/40 hover:text-[#FF9500] cursor-pointer"
                          >
                            {p.preferredName || p.fullName}
                          </button>
                        ) : null
                      })}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
