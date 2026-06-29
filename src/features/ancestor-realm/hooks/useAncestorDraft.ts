import { useState, useEffect, useCallback, useRef } from 'react'
import type { AncestorRealmDraft, AncestorTree } from '../types'

const STORAGE_KEY = 'thekingstake-ancestor-draft'

function loadDraft(): AncestorRealmDraft | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

function saveDraft(draft: AncestorRealmDraft) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft))
  } catch { /* storage full */ }
}

const defaultTree: AncestorTree = {
  root: { firstName: '', lastName: '', relation: 'Self' },
  father: { firstName: '', lastName: '', relation: 'Father' },
  mother: { firstName: '', lastName: '', relation: 'Mother' },
  paternalGrandfather: { firstName: '', lastName: '', relation: 'Paternal Grandfather' },
  paternalGrandmother: { firstName: '', lastName: '', relation: 'Paternal Grandmother' },
  maternalGrandfather: { firstName: '', lastName: '', relation: 'Maternal Grandfather' },
  maternalGrandmother: { firstName: '', lastName: '', relation: 'Maternal Grandmother' },
}

export function useAncestorDraft() {
  const [draft, setDraft] = useState<AncestorRealmDraft>(() => {
    const saved = loadDraft()
    return saved || { tree: defaultTree, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
  })

  const debounceRef = useRef<ReturnType<typeof setTimeout>>()

  const updateTree = useCallback((partial: Partial<AncestorTree>) => {
    setDraft(prev => {
      const next = {
        ...prev,
        tree: { ...prev.tree, ...partial },
        updatedAt: new Date().toISOString(),
      }
      if (debounceRef.current) clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(() => saveDraft(next), 500)
      return next
    })
  }, [])

  const updateProfile = useCallback((key: keyof AncestorTree, field: string, value: string) => {
    setDraft(prev => {
      const profile = prev.tree[key]
      if (!profile) return prev
      const next = {
        ...prev,
        tree: { ...prev.tree, [key]: { ...profile, [field]: value } },
        updatedAt: new Date().toISOString(),
      }
      if (debounceRef.current) clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(() => saveDraft(next), 500)
      return next
    })
  }, [])

  const clearDraft = useCallback(() => {
    const fresh = { tree: defaultTree, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
    setDraft(fresh)
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  useEffect(() => () => { if (debounceRef.current) clearTimeout(debounceRef.current) }, [])

  return { draft, updateTree, updateProfile, clearDraft }
}
