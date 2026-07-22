// PAGE 10 — PERSON PROFILE
// Route: /ancestor-root-registry/person/:personId

import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import {
  ArrowLeft, Edit2, UserPlus, BookOpen, Search, TreePine,
  Heart, MapPin, Calendar, Circle, Sparkles
} from 'lucide-react'
import RegistryBackground from '@/components/RegistryBackground'
import { loadRegistryData, getPersonWithRelations, updatePerson } from '@/lib/registry-storage'
import type { RegistryData, PersonWithRelations } from '@/types/registry'

export default function RegistryPersonPage() {
  const { personId } = useParams<{ personId: string }>()
  const navigate = useNavigate()
  const [data, setData] = useState<RegistryData | null>(null)
  const [person, setPerson] = useState<PersonWithRelations | null>(null)
  const [editing, setEditing] = useState(false)
  const [editForm, setEditForm] = useState<Record<string, string>>({})

  useEffect(() => {
    const d = loadRegistryData()
    if (!d || !personId) {
      navigate('/ancestor-root-registry/people')
      return
    }
    setData(d)
    const p = getPersonWithRelations(d, personId)
    if (!p) {
      navigate('/ancestor-root-registry/people')
      return
    }
    setPerson(p)
  }, [personId, navigate])

  function handleSave() {
    if (!data || !person) return
    const updated = updatePerson(data, person.id, {
      fullName: editForm.fullName || person.fullName,
      preferredName: editForm.preferredName || person.preferredName,
      birthSurname: editForm.birthSurname || person.birthSurname,
      biography: editForm.biography || person.biography,
      birthDate: editForm.birthDate || person.birthDate,
      deathDate: editForm.deathDate || person.deathDate,
      birthPlace: editForm.birthPlace || person.birthPlace,
      primaryLocation: editForm.primaryLocation || person.primaryLocation,
    })
    setData(updated)
    const refreshed = getPersonWithRelations(updated, person.id)
    if (refreshed) setPerson(refreshed)
    setEditing(false)
  }

  function getStatusColor(status: string): string {
    switch (status) {
      case 'Documented': return '#4CAF50'
      case 'Family Testimony': return '#FF9500'
      case 'Research Lead': return '#2196F3'
      default: return '#9E9E9E'
    }
  }

  function getLifeSpan(p: PersonWithRelations): string {
    const birth = p.birthDate || '?'
    const death = p.isLiving === false && p.deathDate ? p.deathDate : p.isLiving ? '' : ''
    return death ? `${birth} — ${death}` : `${birth} — `
  }

  if (!person || !data) return null

  return (
    <RegistryBackground variant="subpage">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md border-b border-[rgba(201,185,154,0.08)]">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => navigate('/ancestor-root-registry/people')}
            className="flex items-center gap-2 text-xs text-[#C9B99A] hover:text-[#FF9500] transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} /> People
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setEditForm({ ...person }); setEditing(!editing) }}
              className="flex items-center gap-1 text-xs text-[#C9B99A] hover:text-[#FF9500] cursor-pointer"
            >
              <Edit2 size={12} /> {editing ? 'Cancel' : 'Edit'}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-start gap-4">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center shrink-0"
              style={{
                background: `${getStatusColor(person.recordStatus)}15`,
                border: `2px solid ${getStatusColor(person.recordStatus)}40`,
              }}
            >
              <span className="text-xl" style={{ color: getStatusColor(person.recordStatus) }}>
                {(person.preferredName || person.fullName).charAt(0)}
              </span>
            </div>
            <div className="flex-1">
              {editing ? (
                <div className="space-y-2">
                  <input
                    value={editForm.fullName || ''}
                    onChange={(e) => setEditForm((f) => ({ ...f, fullName: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-[rgba(40,25,12,0.5)] border border-[rgba(201,185,154,0.1)] text-[#F0EBE1] text-sm focus:outline-none focus:border-[rgba(255,149,0,0.3)]"
                    placeholder="Full name"
                  />
                  <input
                    value={editForm.preferredName || ''}
                    onChange={(e) => setEditForm((f) => ({ ...f, preferredName: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-[rgba(40,25,12,0.5)] border border-[rgba(201,185,154,0.1)] text-[#C9B99A] text-xs focus:outline-none focus:border-[rgba(255,149,0,0.3)]"
                    placeholder="Preferred name"
                  />
                </div>
              ) : (
                <>
                  <h1
                    className="text-2xl text-[#F0EBE1] font-medium"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {person.preferredName || person.fullName}
                  </h1>
                  {person.preferredName && person.preferredName !== person.fullName && (
                    <p className="text-xs text-[#C9B99A]/40">{person.fullName}</p>
                  )}
                </>
              )}
              <div className="flex items-center gap-2 mt-2">
                <span
                  className="text-[10px] px-2 py-0.5 rounded"
                  style={{ background: `${getStatusColor(person.recordStatus)}15`, color: getStatusColor(person.recordStatus) }}
                >
                  {person.recordStatus}
                </span>
                {person.isLiving === false && <span className="text-xs text-[#C9B99A]/30">&#8224;</span>}
                {person.isLiving === true && <span className="text-[10px] text-[#4CAF50]/50">Living</span>}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Vital Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="p-5 rounded-xl bg-[rgba(40,25,12,0.35)] border border-[rgba(201,185,154,0.06)] mb-6"
        >
          <h3 className="text-xs text-[#C9B99A]/40 uppercase tracking-wider mb-4">Vital Information</h3>

          {editing ? (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] text-[#C9B99A]/40">Birth Date</label>
                <input
                  value={editForm.birthDate || ''}
                  onChange={(e) => setEditForm((f) => ({ ...f, birthDate: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg bg-[rgba(40,25,12,0.5)] border border-[rgba(201,185,154,0.1)] text-[#F0EBE1] text-xs focus:outline-none focus:border-[rgba(255,149,0,0.3)]"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#C9B99A]/40">Death Date</label>
                <input
                  value={editForm.deathDate || ''}
                  onChange={(e) => setEditForm((f) => ({ ...f, deathDate: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg bg-[rgba(40,25,12,0.5)] border border-[rgba(201,185,154,0.1)] text-[#F0EBE1] text-xs focus:outline-none focus:border-[rgba(255,149,0,0.3)]"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#C9B99A]/40">Birth Place</label>
                <input
                  value={editForm.birthPlace || ''}
                  onChange={(e) => setEditForm((f) => ({ ...f, birthPlace: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg bg-[rgba(40,25,12,0.5)] border border-[rgba(201,185,154,0.1)] text-[#F0EBE1] text-xs focus:outline-none focus:border-[rgba(255,149,0,0.3)]"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#C9B99A]/40">Location</label>
                <input
                  value={editForm.primaryLocation || ''}
                  onChange={(e) => setEditForm((f) => ({ ...f, primaryLocation: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg bg-[rgba(40,25,12,0.5)] border border-[rgba(201,185,154,0.1)] text-[#F0EBE1] text-xs focus:outline-none focus:border-[rgba(255,149,0,0.3)]"
                />
              </div>
              <div className="col-span-2">
                <label className="text-[10px] text-[#C9B99A]/40">Biography</label>
                <textarea
                  value={editForm.biography || ''}
                  onChange={(e) => setEditForm((f) => ({ ...f, biography: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg bg-[rgba(40,25,12,0.5)] border border-[rgba(201,185,154,0.1)] text-[#F0EBE1] text-xs focus:outline-none focus:border-[rgba(255,149,0,0.3)] resize-none"
                />
              </div>
              <div className="col-span-2">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 rounded-lg text-sm font-medium cursor-pointer"
                  style={{ background: 'rgba(255,149,0,0.8)', color: '#0A0F1A' }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {person.birthDate && (
                <div className="flex items-center gap-2">
                  <Calendar size={13} className="text-[#C9B99A]/30" />
                  <span className="text-xs text-[#C9B99A]/50">Born:</span>
                  <span className="text-sm text-[#F0EBE1]">{person.birthDate}</span>
                </div>
              )}
              {person.isLiving === false && person.deathDate && (
                <div className="flex items-center gap-2">
                  <Calendar size={13} className="text-[#C9B99A]/30" />
                  <span className="text-xs text-[#C9B99A]/50">Died:</span>
                  <span className="text-sm text-[#F0EBE1]">{person.deathDate}</span>
                </div>
              )}
              {person.birthPlace && (
                <div className="flex items-center gap-2">
                  <MapPin size={13} className="text-[#C9B99A]/30" />
                  <span className="text-xs text-[#C9B99A]/50">Birthplace:</span>
                  <span className="text-sm text-[#F0EBE1]">{person.birthPlace}</span>
                </div>
              )}
              {person.primaryLocation && (
                <div className="flex items-center gap-2">
                  <MapPin size={13} className="text-[#C9B99A]/30" />
                  <span className="text-xs text-[#C9B99A]/50">Location:</span>
                  <span className="text-sm text-[#F0EBE1]">{person.primaryLocation}</span>
                </div>
              )}
              {person.gender && person.gender !== 'unknown' && (
                <div className="flex items-center gap-2">
                  <Circle size={13} className="text-[#C9B99A]/30" />
                  <span className="text-xs text-[#C9B99A]/50">Gender:</span>
                  <span className="text-sm text-[#F0EBE1]">{person.gender}</span>
                </div>
              )}
              {person.birthSurname && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#C9B99A]/50">Birth surname:</span>
                  <span className="text-sm text-[#F0EBE1]">{person.birthSurname}</span>
                </div>
              )}
              {person.biography && (
                <div className="col-span-full mt-2 pt-3 border-t border-[rgba(201,185,154,0.06)]">
                  <p className="text-xs text-[#C9B99A]/40 mb-1">Biography</p>
                  <p className="text-sm text-[#F0EBE1]/80 leading-relaxed">{person.biography}</p>
                </div>
              )}
            </div>
          )}
        </motion.div>

        {/* Relationships */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <h3 className="text-xs text-[#C9B99A]/40 uppercase tracking-wider mb-3">Relationships</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {person.parents.length > 0 && (
              <div className="p-4 rounded-xl bg-[rgba(40,25,12,0.25)] border border-[rgba(201,185,154,0.05)]">
                <p className="text-[10px] text-[#C9B99A]/30 uppercase tracking-wider mb-2">Parents</p>
                {person.parents.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => navigate(`/ancestor-root-registry/person/${p.id}`)}
                    className="block text-sm text-[#F0EBE1] hover:text-[#FF9500] transition-colors cursor-pointer mb-1"
                  >
                    {p.preferredName || p.fullName}
                  </button>
                ))}
              </div>
            )}
            {person.partners.length > 0 && (
              <div className="p-4 rounded-xl bg-[rgba(255,149,0,0.05)] border border-[rgba(255,149,0,0.08)]">
                <p className="text-[10px] text-[#FF9500]/40 uppercase tracking-wider mb-2">Partner</p>
                {person.partners.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => navigate(`/ancestor-root-registry/person/${p.id}`)}
                    className="block text-sm text-[#F0EBE1] hover:text-[#FF9500] transition-colors cursor-pointer mb-1"
                  >
                    {p.preferredName || p.fullName}
                  </button>
                ))}
              </div>
            )}
            {person.children.length > 0 && (
              <div className="p-4 rounded-xl bg-[rgba(40,25,12,0.25)] border border-[rgba(201,185,154,0.05)]">
                <p className="text-[10px] text-[#C9B99A]/30 uppercase tracking-wider mb-2">Children</p>
                {person.children.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => navigate(`/ancestor-root-registry/person/${p.id}`)}
                    className="block text-sm text-[#F0EBE1] hover:text-[#FF9500] transition-colors cursor-pointer mb-1"
                  >
                    {p.preferredName || p.fullName}
                  </button>
                ))}
              </div>
            )}
            {person.siblings.length > 0 && (
              <div className="p-4 rounded-xl bg-[rgba(40,25,12,0.25)] border border-[rgba(201,185,154,0.05)]">
                <p className="text-[10px] text-[#C9B99A]/30 uppercase tracking-wider mb-2">Siblings</p>
                {person.siblings.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => navigate(`/ancestor-root-registry/person/${p.id}`)}
                    className="block text-sm text-[#F0EBE1] hover:text-[#FF9500] transition-colors cursor-pointer mb-1"
                  >
                    {p.preferredName || p.fullName}
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-2"
        >
          <button
            onClick={() => navigate(`/ancestor-root-registry/stories?person=${person.id}`)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs border border-[rgba(201,185,154,0.1)] bg-[rgba(40,25,12,0.3)] text-[#C9B99A] hover:border-[rgba(255,149,0,0.2)] transition-all cursor-pointer"
          >
            <BookOpen size={12} /> Add Story
          </button>
          <button
            onClick={() => navigate(`/ancestor-root-registry/research?person=${person.id}`)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs border border-[rgba(201,185,154,0.1)] bg-[rgba(40,25,12,0.3)] text-[#C9B99A] hover:border-[rgba(255,149,0,0.2)] transition-all cursor-pointer"
          >
            <Search size={12} /> Add Research Note
          </button>
          <button
            onClick={() => navigate('/ancestor-root-registry/tree')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs border border-[rgba(201,185,154,0.1)] bg-[rgba(40,25,12,0.3)] text-[#C9B99A] hover:border-[rgba(255,149,0,0.2)] transition-all cursor-pointer"
          >
            <TreePine size={12} /> View in Tree
          </button>
        </motion.div>

        {/* Future placeholders */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-10 p-5 rounded-xl border border-[rgba(156,39,176,0.08)] bg-[rgba(156,39,176,0.02)]"
        >
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={14} className="text-[rgba(156,39,176,0.4)]" />
            <p className="text-xs text-[#F0EBE1]/50 font-medium">Future Connections</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {['Photos', 'Documents', 'Meshy 3D', 'Spline Scene'].map((label) => (
              <div key={label} className="p-3 rounded-lg bg-[rgba(40,25,12,0.2)] border border-[rgba(201,185,154,0.04)] text-center opacity-40">
                <p className="text-[10px] text-[#C9B99A]/30">{label}</p>
                <p className="text-[8px] text-[#C9B99A]/15">Coming soon</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </RegistryBackground>
  )
}
