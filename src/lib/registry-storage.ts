// ============================================================
// ANCESTOR ROOT REGISTRY — Centralized Storage Service
// Phase 1: localStorage persistence
// Future: Hono + tRPC + Drizzle + MySQL migration ready
// ============================================================

import type {
  Registry,
  RegistryData,
  Person,
  Relationship,
  Story,
  ResearchNote,
  RegistryExport,
  BuilderProgress,
  BuilderStep,
} from '@/types/registry'

const STORAGE_KEY = 'thekingstake.ancestorRegistry.v1'
const SAVE_STATE_KEY = 'thekingstake.ancestorRegistry.saveState'

// ============================================================
// SAVE STATE INDICATOR
// ============================================================

type SaveState = 'idle' | 'saving' | 'saved' | 'error'

let saveStateListeners: ((state: SaveState) => void)[] = []

export function onSaveStateChange(listener: (state: SaveState) => void) {
  saveStateListeners.push(listener)
  return () => {
    saveStateListeners = saveStateListeners.filter((l) => l !== listener)
  }
}

function setSaveState(state: SaveState) {
  saveStateListeners.forEach((l) => l(state))
}

// ============================================================
// CRUD OPERATIONS
// ============================================================

export function createRegistryData(registry: Registry, rootPerson: Person): RegistryData {
  rootPerson.registryId = registry.id
  rootPerson.relationshipToCreator = 'Self'

  const data: RegistryData = {
    registry,
    people: [rootPerson],
    relationships: [],
    stories: [],
    researchNotes: [],
    mediaPlaceholders: [],
    future3DAssets: [],
  }

  saveRegistryData(data)
  initBuilderProgress()
  return data
}

export function saveRegistryData(data: RegistryData): void {
  try {
    setSaveState('saving')
    data.registry.updatedAt = new Date().toISOString()
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    setSaveState('saved')
    // Reset to idle after a moment
    setTimeout(() => setSaveState('idle'), 2000)
  } catch (err) {
    console.error('Failed to save registry:', err)
    setSaveState('error')
  }
}

export function loadRegistryData(): RegistryData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    // Basic validation
    if (!parsed.registry || !parsed.people || !Array.isArray(parsed.people)) {
      console.warn('Invalid registry data found')
      return null
    }
    return parsed as RegistryData
  } catch (err) {
    console.error('Failed to load registry:', err)
    return null
  }
}

export function hasRegistry(): boolean {
  return loadRegistryData() !== null
}

export function deleteRegistry(): void {
  localStorage.removeItem(STORAGE_KEY)
  localStorage.removeItem(SAVE_STATE_KEY)
  setSaveState('idle')
}

// ============================================================
// PERSON OPERATIONS
// ============================================================

export function addPerson(data: RegistryData, person: Person): RegistryData {
  person.registryId = data.registry.id
  data.people.push(person)
  saveRegistryData(data)
  return data
}

export function updatePerson(data: RegistryData, personId: string, updates: Partial<Person>): RegistryData {
  const idx = data.people.findIndex((p) => p.id === personId)
  if (idx >= 0) {
    data.people[idx] = { ...data.people[idx], ...updates, updatedAt: new Date().toISOString() }
    saveRegistryData(data)
  }
  return data
}

export function removePerson(data: RegistryData, personId: string): RegistryData {
  // Remove person
  data.people = data.people.filter((p) => p.id !== personId)
  // Remove related relationships
  data.relationships = data.relationships.filter(
    (r) => r.personAId !== personId && r.personBId !== personId
  )
  // Remove related stories references
  data.stories = data.stories.map((s) => ({
    ...s,
    personIds: s.personIds.filter((id) => id !== personId),
  }))
  // Remove related research notes
  data.researchNotes = data.researchNotes.filter((r) => r.personId !== personId)
  saveRegistryData(data)
  return data
}

export function getPerson(data: RegistryData, personId: string): Person | undefined {
  return data.people.find((p) => p.id === personId)
}

export function getPersonWithRelations(data: RegistryData, personId: string) {
  const person = data.people.find((p) => p.id === personId)
  if (!person) return null

  const parents = data.relationships
    .filter((r) => r.personBId === personId && (r.relationshipType === 'parent' || r.relationshipType === 'step-parent'))
    .map((r) => data.people.find((p) => p.id === r.personAId)!)
    .filter(Boolean)

  const children = data.relationships
    .filter((r) => r.personAId === personId && (r.relationshipType === 'parent' || r.relationshipType === 'step-parent'))
    .map((r) => data.people.find((p) => p.id === r.personBId)!)
    .filter(Boolean)

  const partners = data.relationships
    .filter(
      (r) =>
        (r.personAId === personId || r.personBId === personId) &&
        (r.relationshipType === 'partner' || r.relationshipType === 'spouse')
    )
    .map((r) => data.people.find((p) => p.id === (r.personAId === personId ? r.personBId : r.personAId))!)
    .filter(Boolean)

  const siblings = data.relationships
    .filter((r) => r.personBId === personId && r.relationshipType === 'sibling')
    .map((r) => data.people.find((p) => p.id === r.personAId)!)
    .filter(Boolean)

  return { ...person, parents, children, partners, siblings }
}

// ============================================================
// RELATIONSHIP OPERATIONS
// ============================================================

export function addRelationship(
  data: RegistryData,
  personAId: string,
  personBId: string,
  relationshipType: Relationship['relationshipType'],
  notes?: string
): RegistryData {
  const rel: Relationship = {
    id: generateId(),
    registryId: data.registry.id,
    personAId,
    personBId,
    relationshipType,
    direction: relationshipType === 'partner' || relationshipType === 'spouse' ? 'mutual' : 'a-to-b',
    notes,
    createdAt: new Date().toISOString(),
  }
  data.relationships.push(rel)

  // Add reciprocal sibling relationship
  if (relationshipType === 'sibling') {
    const reciprocal: Relationship = {
      ...rel,
      id: generateId(),
      personAId: personBId,
      personBId: personAId,
    }
    data.relationships.push(reciprocal)
  }

  saveRegistryData(data)
  return data
}

// ============================================================
// STORY OPERATIONS
// ============================================================

export function addStory(data: RegistryData, story: Story): RegistryData {
  story.registryId = data.registry.id
  data.stories.push(story)
  saveRegistryData(data)
  return data
}

export function updateStory(data: RegistryData, storyId: string, updates: Partial<Story>): RegistryData {
  const idx = data.stories.findIndex((s) => s.id === storyId)
  if (idx >= 0) {
    data.stories[idx] = { ...data.stories[idx], ...updates, updatedAt: new Date().toISOString() }
    saveRegistryData(data)
  }
  return data
}

export function removeStory(data: RegistryData, storyId: string): RegistryData {
  data.stories = data.stories.filter((s) => s.id !== storyId)
  saveRegistryData(data)
  return data
}

// ============================================================
// RESEARCH NOTE OPERATIONS
// ============================================================

export function addResearchNote(data: RegistryData, note: ResearchNote): RegistryData {
  note.registryId = data.registry.id
  data.researchNotes.push(note)
  saveRegistryData(data)
  return data
}

export function updateResearchNote(
  data: RegistryData,
  noteId: string,
  updates: Partial<ResearchNote>
): RegistryData {
  const idx = data.researchNotes.findIndex((n) => n.id === noteId)
  if (idx >= 0) {
    data.researchNotes[idx] = {
      ...data.researchNotes[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    }
    saveRegistryData(data)
  }
  return data
}

export function removeResearchNote(data: RegistryData, noteId: string): RegistryData {
  data.researchNotes = data.researchNotes.filter((n) => n.id !== noteId)
  saveRegistryData(data)
  return data
}

// ============================================================
// STATS & SUMMARY
// ============================================================

export function getRegistrySummary(data: RegistryData) {
  const peopleCount = data.people.length
  const storiesCount = data.stories.length
  const researchNotesCount = data.researchNotes.length
  const documentedCount = data.people.filter((p) => p.recordStatus === 'Documented').length
  const unresolvedCount = data.researchNotes.filter(
    (r) => r.status === 'To Research' || r.status === 'In Progress'
  ).length

  // Calculate generation count
  const generationSet = new Set<number>()
  data.people.forEach((p) => {
    const gen = getGeneration(data, p.id)
    generationSet.add(gen)
  })

  return {
    peopleCount,
    generationCount: generationSet.size,
    storiesCount,
    researchNotesCount,
    documentedCount,
    unresolvedCount,
    lastUpdated: data.registry.updatedAt,
  }
}

function getGeneration(data: RegistryData, personId: string): number {
  // Simple generation calculation: 0 = root, negative = ancestors, positive = descendants
  const relationships = data.relationships
  let generation = 0
  const visited = new Set<string>()

  function traverseUp(pid: string): number {
    if (visited.has(pid)) return 0
    visited.add(pid)
    const parentRels = relationships.filter(
      (r) => r.personBId === pid && (r.relationshipType === 'parent' || r.relationshipType === 'step-parent')
    )
    if (parentRels.length === 0) return 0
    let maxParentGen = 0
    for (const rel of parentRels) {
      const parentGen = traverseUp(rel.personAId) - 1
      maxParentGen = Math.min(maxParentGen, parentGen)
    }
    return maxParentGen
  }

  generation = traverseUp(personId)
  return generation
}

// ============================================================
// EXPORT / IMPORT
// ============================================================

export function exportRegistry(data: RegistryData): string {
  const exportData: RegistryExport = {
    exportVersion: '1.0',
    exportedAt: new Date().toISOString(),
    data,
  }
  return JSON.stringify(exportData, null, 2)
}

export function downloadRegistryBackup(data: RegistryData): void {
  const json = exportRegistry(data)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${data.registry.primarySurname}-registry-backup-${new Date().toISOString().split('T')[0]}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export function importRegistryBackup(jsonString: string): RegistryData | null {
  try {
    const parsed = JSON.parse(jsonString)
    // Validate structure
    if (!parsed.exportVersion || !parsed.data || !parsed.data.registry || !parsed.data.people) {
      throw new Error('Invalid backup file format')
    }
    // Sanitize — prevent script injection
    const sanitized = JSON.parse(JSON.stringify(parsed.data))
    saveRegistryData(sanitized)
    return sanitized
  } catch (err) {
    console.error('Import failed:', err)
    return null
  }
}

// ============================================================
// BUILDER PROGRESS
// ============================================================

export function initBuilderProgress(): void {
  const progress: BuilderProgress = {
    currentStep: 'root-person',
    completedSteps: [],
    skippedSteps: [],
  }
  localStorage.setItem(SAVE_STATE_KEY, JSON.stringify(progress))
}

export function loadBuilderProgress(): BuilderProgress | null {
  try {
    const raw = localStorage.getItem(SAVE_STATE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as BuilderProgress
  } catch {
    return null
  }
}

export function updateBuilderProgress(progress: BuilderProgress): void {
  localStorage.setItem(SAVE_STATE_KEY, JSON.stringify(progress))
}

// ============================================================
// UTILITIES
// ============================================================

export function generateId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 9)}`
}

export function getFamilyNameForDisplay(person: Person): string {
  return person.preferredName || person.fullName
}

export function getLifeDates(person: Person): string {
  const birth = person.birthDate ? formatPartialDate(person.birthDate) : '?'
  const death = person.isLiving === false && person.deathDate ? formatPartialDate(person.deathDate) : ''
  return death ? `${birth} — ${death}` : `${birth} — `
}

function formatPartialDate(dateStr: string): string {
  // Handle partial dates like "1950" or "1950-03"
  if (dateStr.length === 4) return dateStr
  if (dateStr.length === 7) {
    const [year, month] = dateStr.split('-')
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return `${monthNames[parseInt(month) - 1]} ${year}`
  }
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return dateStr
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

export function getRootPerson(data: RegistryData): Person | undefined {
  return data.people.find((p) => p.id === data.registry.creatorPersonId)
}

export function getParentRelationships(data: RegistryData, personId: string): Relationship[] {
  return data.relationships.filter(
    (r) => r.personBId === personId && (r.relationshipType === 'parent' || r.relationshipType === 'step-parent')
  )
}

export function getChildrenRelationships(data: RegistryData, personId: string): Relationship[] {
  return data.relationships.filter(
    (r) => r.personAId === personId && (r.relationshipType === 'parent' || r.relationshipType === 'step-parent')
  )
}

export function getSiblings(data: RegistryData, personId: string): Person[] {
  const myParents = getParentRelationships(data, personId).map((r) => r.personAId)
  if (myParents.length === 0) return []
  const siblingIds = new Set<string>()
  myParents.forEach((parentId) => {
    getChildrenRelationships(data, parentId).forEach((r) => {
      if (r.personBId !== personId) siblingIds.add(r.personBId)
    })
  })
  return data.people.filter((p) => siblingIds.has(p.id))
}
