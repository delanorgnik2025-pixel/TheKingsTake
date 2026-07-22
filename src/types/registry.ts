// ============================================================
// ANCESTOR ROOT REGISTRY — TypeScript Data Types
// Phase 1: Frontend prototype with localStorage persistence
// Future migration target: Hono + tRPC + Drizzle + MySQL
// ============================================================

export type Gender = 'male' | 'female' | 'non-binary' | 'unknown' | 'prefer-not-to-say'

export type RecordStatus = 'Family Testimony' | 'Documented' | 'Research Lead' | 'Unknown'

export type PrivacyMode = 'Private' | 'Family Only' | 'Public Preview'

export type RelationshipType =
  | 'parent'
  | 'child'
  | 'sibling'
  | 'partner'
  | 'spouse'
  | 'grandparent'
  | 'grandchild'
  | 'aunt-uncle'
  | 'niece-nephew'
  | 'cousin'
  | 'in-law'
  | 'step-parent'
  | 'step-child'
  | 'half-sibling'
  | 'other'

export type StoryType =
  | 'Oral History'
  | 'Biography'
  | 'Family Tradition'
  | 'Migration Story'
  | 'Military Story'
  | 'Work and Occupation'
  | 'Community History'
  | 'Recipe or Cultural Practice'
  | 'Memorial'
  | 'Research Narrative'
  | 'Other'

export type ResearchStatus =
  | 'To Research'
  | 'In Progress'
  | 'Possible Match'
  | 'Verified'
  | 'Unable to Confirm'

// ============================================================
// CORE PERSON
// ============================================================

export interface Person {
  id: string
  registryId: string
  fullName: string
  preferredName?: string
  birthSurname?: string
  gender: Gender
  isLiving: boolean | null
  birthDate?: string // ISO date or partial like "1950" or "1950-03"
  deathDate?: string
  birthPlace?: string
  deathPlace?: string
  primaryLocation?: string
  biography?: string
  recordStatus: RecordStatus
  // Relationship tracking (simplified for Phase 1)
  relationshipToCreator?: string
  // Timestamps
  createdAt: string
  updatedAt: string
}

// ============================================================
// RELATIONSHIP
// ============================================================

export interface Relationship {
  id: string
  registryId: string
  personAId: string
  personBId: string
  relationshipType: RelationshipType
  direction: 'a-to-b' | 'mutual'
  notes?: string
  createdAt: string
}

// ============================================================
// STORY
// ============================================================

export interface Story {
  id: string
  registryId: string
  personIds: string[]
  title: string
  body: string
  storyType: StoryType
  location?: string
  approximateDate?: string
  recordStatus: RecordStatus
  sourceNote?: string
  privacyIntention?: PrivacyMode
  createdAt: string
  updatedAt: string
}

// ============================================================
// RESEARCH NOTE
// ============================================================

export interface ResearchNote {
  id: string
  registryId: string
  personId?: string
  title: string
  note: string
  status: ResearchStatus
  sourceCitation?: string
  nextAction?: string
  createdAt: string
  updatedAt: string
}

// ============================================================
// MEDIA PLACEHOLDER (Phase 1 — no real uploads)
// ============================================================

export interface MediaPlaceholder {
  id: string
  registryId: string
  personId?: string
  mediaType: 'photo' | 'document' | 'audio' | 'video'
  title: string
  description?: string
  localPreviewUrl?: string // base64 only for tiny previews
  futureStorageStatus: 'local-preview' | 'pending-upload' | 'uploaded'
  createdAt: string
}

// ============================================================
// FUTURE 3D ASSET PLACEHOLDER
// ============================================================

export interface Future3DAsset {
  id: string
  registryId: string
  personId?: string
  assetType: 'ancestor-model' | 'heirloom' | 'memorial' | 'historical-home' | 'other'
  meshyAssetUrl?: string
  splineSceneUrl?: string
  thumbnailUrl?: string
  verificationStatus: 'pending' | 'approved' | 'rejected'
  visibility: 'private' | 'family' | 'public'
  createdAt: string
}

// ============================================================
// REGISTRY (top-level container)
// ============================================================

export interface Registry {
  id: string
  name: string
  primarySurname: string
  creatorPersonId: string
  familyMotto?: string
  originLocation?: string
  description?: string
  privacyMode: PrivacyMode
  createdAt: string
  updatedAt: string
  version: number
}

// ============================================================
// COMPLETE REGISTRY DATA (stored in localStorage)
// ============================================================

export interface RegistryData {
  registry: Registry
  people: Person[]
  relationships: Relationship[]
  stories: Story[]
  researchNotes: ResearchNote[]
  mediaPlaceholders: MediaPlaceholder[]
  future3DAssets: Future3DAsset[]
}

// ============================================================
// VIEW MODELS (derived data for UI)
// ============================================================

export interface PersonWithRelations extends Person {
  parents: Person[]
  children: Person[]
  partners: Person[]
  siblings: Person[]
}

export interface TreeNode {
  person: Person
  x: number
  y: number
  generation: number
  parents: TreeNode[]
  children: TreeNode[]
  partners: TreeNode[]
}

export interface GenerationStats {
  generation: number
  count: number
}

export interface RegistrySummary {
  peopleCount: number
  generationCount: number
  storiesCount: number
  researchNotesCount: number
  documentedCount: number
  unresolvedCount: number
  lastUpdated: string
}

// ============================================================
// EXPORT / IMPORT
// ============================================================

export interface RegistryExport {
  exportVersion: string
  exportedAt: string
  data: RegistryData
}

// ============================================================
// GUIDED BUILDER STEP TRACKING
// ============================================================

export type BuilderStep =
  | 'root-person'
  | 'mother'
  | 'father'
  | 'maternal-grandmother'
  | 'maternal-grandfather'
  | 'paternal-grandmother'
  | 'paternal-grandfather'
  | 'partner'
  | 'children'
  | 'siblings'
  | 'additional'
  | 'complete'

export interface BuilderProgress {
  currentStep: BuilderStep
  completedSteps: BuilderStep[]
  skippedSteps: BuilderStep[]
}
