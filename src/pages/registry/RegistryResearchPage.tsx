// PAGE 12 — RESEARCH NOTES
// Route: /ancestor-root-registry/research

import { useEffect, useState, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { motion } from 'framer-motion'
import {
  ArrowLeft, Plus, X, Search, Filter, Trash2, Edit2, Save,
  CheckCircle2, Clock, HelpCircle, AlertTriangle
} from 'lucide-react'
import RegistryBackground from '@/components/RegistryBackground'
import { loadRegistryData, addResearchNote, updateResearchNote, removeResearchNote, generateId } from '@/lib/registry-storage'
import type { RegistryData, ResearchNote, ResearchStatus } from '@/types/registry'

const statuses: ResearchStatus[] = ['To Research', 'In Progress', 'Possible Match', 'Verified', 'Unable to Confirm']

const statusConfig: Record<ResearchStatus, { color: string; icon: typeof CheckCircle2 }> = {
  'To Research': { color: '#9E9E9E', icon: HelpCircle },
  'In Progress': { color: '#2196F3', icon: Clock },
  'Possible Match': { color: '#FF9500', icon: AlertTriangle },
  'Verified': { color: '#4CAF50', icon: CheckCircle2 },
  'Unable to Confirm': { color: '#f44336', icon: X },
}

export default function RegistryResearchPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const personFilter = searchParams.get('person')

  const [data, setData] = useState<RegistryData | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [form, setForm] = useState({
    title: '',
    note: '',
    status: 'To Research' as ResearchStatus,
    sourceCitation: '',
    nextAction: '',
    personId: '',
  })

  useEffect(() => {
    const d = loadRegistryData()
    if (!d) {
      navigate('/ancestor-root-registry/access')
      return
    }
    setData(d)
    if (personFilter) {
      setForm((f) => ({ ...f, personId: personFilter }))
    }
  }, [navigate, personFilter])

  const filteredNotes = useMemo(() => {
    if (!data) return []
    let notes = [...data.researchNotes]
    if (filterStatus !== 'all') {
      notes = notes.filter((n) => n.status === filterStatus)
    }
    if (personFilter) {
      notes = notes.filter((n) => n.personId === personFilter)
    }
    return notes.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }, [data, filterStatus, personFilter])

  function resetForm() {
    setForm({ title: '', note: '', status: 'To Research', sourceCitation: '', nextAction: '', personId: personFilter || '' })
    setEditingId(null)
    setShowForm(false)
  }

  function handleSubmit() {
    if (!data || !form.title.trim()) return

    if (editingId) {
      const updated = updateResearchNote(data, editingId, {
        title: form.title,
        note: form.note,
        status: form.status,
        sourceCitation: form.sourceCitation,
        nextAction: form.nextAction,
      })
      setData(updated)
    } else {
      const note: ResearchNote = {
        id: generateId(),
        registryId: data.registry.id,
        personId: form.personId || undefined,
        title: form.title,
        note: form.note,
        status: form.status,
        sourceCitation: form.sourceCitation,
        nextAction: form.nextAction,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      const updated = addResearchNote(data, note)
      setData(updated)
    }
    resetForm()
  }

  function handleEdit(note: ResearchNote) {
    setForm({
      title: note.title,
      note: note.note,
      status: note.status,
      sourceCitation: note.sourceCitation || '',
      nextAction: note.nextAction || '',
      personId: note.personId || '',
    })
    setEditingId(note.id)
    setShowForm(true)
  }

  function handleDelete(noteId: string) {
    if (!data) return
    if (!confirm('Delete this research note?')) return
    const updated = removeResearchNote(data, noteId)
    setData(updated)
  }

  if (!data) return null

  return (
    <RegistryBackground variant="subpage">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md border-b border-[rgba(201,185,154,0.08)]">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => navigate('/ancestor-root-registry/dashboard')}
            className="flex items-center gap-2 text-xs text-[#C9B99A] hover:text-[#FF9500] transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} /> Dashboard
          </button>
          <span className="text-sm text-[#F0EBE1]">Research</span>
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
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          <Filter size={12} className="text-[#C9B99A]/30" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-[rgba(40,25,12,0.4)] border border-[rgba(201,185,154,0.08)] text-xs text-[#C9B99A] focus:outline-none cursor-pointer"
          >
            <option value="all">All Statuses</option>
            {statuses.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <span className="text-[10px] text-[#C9B99A]/25 ml-auto">{filteredNotes.length} notes</span>
        </div>

        {/* Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-5 rounded-xl bg-[rgba(40,25,12,0.5)] border border-[rgba(33,150,243,0.15)]"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm text-[#F0EBE1] font-medium">{editingId ? 'Edit Note' : 'New Research Note'}</h3>
              <button onClick={resetForm} className="text-[#C9B99A]/40 hover:text-[#C9B99A] cursor-pointer"><X size={16} /></button>
            </div>

            <div className="space-y-3">
              <input
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="Research question or goal..."
                className="w-full px-3 py-2 rounded-lg bg-[rgba(40,25,12,0.6)] border border-[rgba(201,185,154,0.1)] text-[#F0EBE1] text-sm placeholder:text-[#C9B99A]/20 focus:outline-none focus:border-[rgba(33,150,243,0.3)]"
              />
              <textarea
                value={form.note}
                onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
                placeholder="Notes, findings, observations..."
                rows={3}
                className="w-full px-3 py-2 rounded-lg bg-[rgba(40,25,12,0.6)] border border-[rgba(201,185,154,0.1)] text-[#F0EBE1] text-sm placeholder:text-[#C9B99A]/20 focus:outline-none focus:border-[rgba(33,150,243,0.3)] resize-none"
              />
              <div className="grid grid-cols-3 gap-3">
                <select
                  value={form.status}
                  onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as ResearchStatus }))}
                  className="px-3 py-2 rounded-lg bg-[rgba(40,25,12,0.6)] border border-[rgba(201,185,154,0.1)] text-[#F0EBE1] text-xs focus:outline-none cursor-pointer"
                >
                  {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <input
                  value={form.sourceCitation}
                  onChange={(e) => setForm((f) => ({ ...f, sourceCitation: e.target.value }))}
                  placeholder="Source or citation"
                  className="px-3 py-2 rounded-lg bg-[rgba(40,25,12,0.6)] border border-[rgba(201,185,154,0.1)] text-[#F0EBE1] text-xs placeholder:text-[#C9B99A]/20 focus:outline-none focus:border-[rgba(33,150,243,0.3)]"
                />
                <input
                  value={form.nextAction}
                  onChange={(e) => setForm((f) => ({ ...f, nextAction: e.target.value }))}
                  placeholder="Next action"
                  className="px-3 py-2 rounded-lg bg-[rgba(40,25,12,0.6)] border border-[rgba(201,185,154,0.1)] text-[#F0EBE1] text-xs placeholder:text-[#C9B99A]/20 focus:outline-none focus:border-[rgba(33,150,243,0.3)]"
                />
              </div>
              <select
                value={form.personId}
                onChange={(e) => setForm((f) => ({ ...f, personId: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg bg-[rgba(40,25,12,0.6)] border border-[rgba(201,185,154,0.1)] text-[#F0EBE1] text-xs focus:outline-none cursor-pointer"
              >
                <option value="">Not linked to a specific person</option>
                {data.people.map((p) => (
                  <option key={p.id} value={p.id}>{p.preferredName || p.fullName}</option>
                ))}
              </select>
              <div className="flex justify-end gap-2">
                <button onClick={resetForm} className="px-4 py-2 rounded-lg text-xs text-[#C9B99A] border border-[rgba(201,185,154,0.1)] cursor-pointer">Cancel</button>
                <button
                  onClick={handleSubmit}
                  disabled={!form.title.trim()}
                  className="px-4 py-2 rounded-lg text-xs font-medium cursor-pointer disabled:opacity-30"
                  style={{ background: 'rgba(33,150,243,0.7)', color: '#fff' }}
                >
                  <Save size={12} className="inline mr-1" /> Save
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Research Notes List */}
        {filteredNotes.length === 0 ? (
          <div className="text-center py-16">
            <Search size={32} className="text-[#C9B99A]/15 mx-auto mb-3" />
            <p className="text-sm text-[#C9B99A]/30">No research notes yet.</p>
            <button onClick={() => setShowForm(true)} className="mt-3 text-xs text-[#2196F3] hover:text-[#64B5F6] cursor-pointer">
              Create your first research note
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredNotes.map((note, i) => {
              const cfg = statusConfig[note.status]
              const StatusIcon = cfg.icon
              return (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="p-5 rounded-xl bg-[rgba(40,25,12,0.3)] border border-[rgba(201,185,154,0.06)]"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <StatusIcon size={14} style={{ color: cfg.color }} />
                      <span className="text-[10px] px-2 py-0.5 rounded" style={{ background: `${cfg.color}15`, color: cfg.color }}>
                        {note.status}
                      </span>
                      {note.personId && (
                        <button
                          onClick={() => navigate(`/ancestor-root-registry/person/${note.personId}`)}
                          className="text-[10px] text-[#C9B99A]/40 hover:text-[#FF9500] cursor-pointer"
                        >
                          {data.people.find((p) => p.id === note.personId)?.preferredName || 'Unknown'}
                        </button>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => handleEdit(note)} className="p-1.5 rounded text-[#C9B99A]/30 hover:text-[#2196F3] cursor-pointer"><Edit2 size={12} /></button>
                      <button onClick={() => handleDelete(note.id)} className="p-1.5 rounded text-[#C9B99A]/30 hover:text-[#f44336] cursor-pointer"><Trash2 size={12} /></button>
                    </div>
                  </div>

                  <h4 className="text-sm text-[#F0EBE1] font-medium mb-2">{note.title}</h4>
                  {note.note && <p className="text-xs text-[#C9B99A]/50 mb-3 leading-relaxed">{note.note}</p>}

                  <div className="flex flex-wrap gap-2 text-[10px] text-[#C9B99A]/25">
                    {note.sourceCitation && <span>📚 {note.sourceCitation}</span>}
                    {note.nextAction && <span>➡️ {note.nextAction}</span>}
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </RegistryBackground>
  )
}
