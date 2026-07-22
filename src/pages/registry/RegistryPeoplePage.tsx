// PAGE 9 — PEOPLE DIRECTORY
// Route: /ancestor-root-registry/people

import { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import {
  ArrowLeft, Search, Filter, Grid3X3, List, User, TreePine,
  Plus, Edit, BookOpen, Search as SearchIcon
} from 'lucide-react'
import RegistryBackground from '@/components/RegistryBackground'
import { loadRegistryData } from '@/lib/registry-storage'
import type { RegistryData, Person } from '@/types/registry'

export default function RegistryPeoplePage() {
  const navigate = useNavigate()
  const [data, setData] = useState<RegistryData | null>(null)
  const [search, setSearch] = useState('')
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterLiving, setFilterLiving] = useState<string>('all')

  useEffect(() => {
    const d = loadRegistryData()
    if (!d) {
      navigate('/ancestor-root-registry/access')
      return
    }
    setData(d)
  }, [navigate])

  const filteredPeople = useMemo(() => {
    if (!data) return []
    let people = [...data.people]

    if (search.trim()) {
      const q = search.toLowerCase()
      people = people.filter(
        (p) =>
          p.fullName.toLowerCase().includes(q) ||
          p.preferredName?.toLowerCase().includes(q) ||
          p.birthSurname?.toLowerCase().includes(q) ||
          p.birthPlace?.toLowerCase().includes(q)
      )
    }

    if (filterStatus !== 'all') {
      people = people.filter((p) => p.recordStatus === filterStatus)
    }

    if (filterLiving !== 'all') {
      const living = filterLiving === 'living'
      people = people.filter((p) => p.isLiving === living)
    }

    return people
  }, [data, search, filterStatus, filterLiving])

  function getStatusColor(status: string): string {
    switch (status) {
      case 'Documented': return 'rgba(76,175,80,0.7)'
      case 'Family Testimony': return 'rgba(255,149,0,0.7)'
      case 'Research Lead': return 'rgba(33,150,243,0.7)'
      default: return 'rgba(158,158,158,0.5)'
    }
  }

  function getLifeSpan(p: Person): string {
    const birth = p.birthDate || '?'
    const death = p.isLiving === false && p.deathDate ? p.deathDate : p.isLiving ? '' : ''
    return death ? `${birth} — ${death}` : `${birth} — `
  }

  if (!data) return null

  return (
    <RegistryBackground variant="subpage">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md border-b border-[rgba(201,185,154,0.08)]">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => navigate('/ancestor-root-registry/dashboard')}
            className="flex items-center gap-2 text-xs text-[#C9B99A] hover:text-[#FF9500] transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} /> Dashboard
          </button>
          <span className="text-sm text-[#F0EBE1]">People</span>
          <button
            onClick={() => navigate('/ancestor-root-registry/build')}
            className="flex items-center gap-1 text-xs text-[#FF9500] hover:text-[#FFB840] cursor-pointer"
          >
            <Plus size={14} /> Add
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Search and filters */}
        <div className="mb-6 space-y-3">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C9B99A]/30" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, place..."
                className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-[rgba(40,25,12,0.5)] border border-[rgba(201,185,154,0.08)] text-[#F0EBE1] text-sm placeholder:text-[#C9B99A]/20 focus:outline-none focus:border-[rgba(255,149,0,0.3)] transition-colors"
              />
            </div>
            <div className="flex items-center border border-[rgba(201,185,154,0.08)] rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('card')}
                className="p-2.5 cursor-pointer"
                style={{ background: viewMode === 'card' ? 'rgba(255,149,0,0.1)' : 'transparent', color: viewMode === 'card' ? '#FF9500' : '#C9B99A/40' }}
              >
                <Grid3X3 size={14} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className="p-2.5 cursor-pointer"
                style={{ background: viewMode === 'list' ? 'rgba(255,149,0,0.1)' : 'transparent', color: viewMode === 'list' ? '#FF9500' : '#C9B99A/40' }}
              >
                <List size={14} />
              </button>
            </div>
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-[rgba(40,25,12,0.4)] border border-[rgba(201,185,154,0.08)] text-xs text-[#C9B99A] focus:outline-none cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="Documented">Documented</option>
              <option value="Family Testimony">Family Testimony</option>
              <option value="Research Lead">Research Lead</option>
              <option value="Unknown">Unknown</option>
            </select>
            <select
              value={filterLiving}
              onChange={(e) => setFilterLiving(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-[rgba(40,25,12,0.4)] border border-[rgba(201,185,154,0.08)] text-xs text-[#C9B99A] focus:outline-none cursor-pointer"
            >
              <option value="all">All</option>
              <option value="living">Living</option>
              <option value="deceased">Deceased</option>
            </select>
            {filteredPeople.length > 0 && (
              <span className="text-[10px] text-[#C9B99A]/30 self-center ml-auto">{filteredPeople.length} people</span>
            )}
          </div>
        </div>

        {/* Results */}
        {viewMode === 'card' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredPeople.map((person, i) => (
              <motion.div
                key={person.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                whileHover={{ y: -2 }}
                onClick={() => navigate(`/ancestor-root-registry/person/${person.id}`)}
                className="p-4 rounded-xl bg-[rgba(40,25,12,0.4)] border border-[rgba(201,185,154,0.06)] hover:border-[rgba(255,149,0,0.2)] transition-all cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: `${getStatusColor(person.recordStatus)}15`, border: `1.5px solid ${getStatusColor(person.recordStatus)}30` }}
                  >
                    <User size={16} style={{ color: getStatusColor(person.recordStatus) }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#F0EBE1] font-medium truncate">{person.preferredName || person.fullName}</p>
                    <p className="text-[11px] text-[#C9B99A]/40">{getLifeSpan(person)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className="text-[9px] px-1.5 py-0.5 rounded"
                        style={{ background: `${getStatusColor(person.recordStatus)}15`, color: getStatusColor(person.recordStatus) }}
                      >
                        {person.recordStatus}
                      </span>
                      {person.isLiving === false && <span className="text-[9px] text-[#C9B99A]/25">&#8224;</span>}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-1">
            {filteredPeople.map((person, i) => (
              <motion.div
                key={person.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.02 }}
                onClick={() => navigate(`/ancestor-root-registry/person/${person.id}`)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[rgba(40,25,12,0.2)] border border-transparent hover:border-[rgba(255,149,0,0.15)] hover:bg-[rgba(40,25,12,0.4)] transition-all cursor-pointer"
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: `${getStatusColor(person.recordStatus)}15` }}
                >
                  <User size={12} style={{ color: getStatusColor(person.recordStatus) }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#F0EBE1] truncate">{person.preferredName || person.fullName}</p>
                </div>
                <span className="text-[10px] text-[#C9B99A]/30">{getLifeSpan(person)}</span>
                <span
                  className="text-[8px] px-1.5 py-0.5 rounded shrink-0"
                  style={{ background: `${getStatusColor(person.recordStatus)}15`, color: getStatusColor(person.recordStatus) }}
                >
                  {person.recordStatus}
                </span>
              </motion.div>
            ))}
          </div>
        )}

        {filteredPeople.length === 0 && (
          <div className="text-center py-16">
            <User size={32} className="text-[#C9B99A]/15 mx-auto mb-3" />
            <p className="text-sm text-[#C9B99A]/30">No people match your filters.</p>
          </div>
        )}
      </div>
    </RegistryBackground>
  )
}
