// ============================================
// ANCESTRY / RECEIPTS — TYPE DEFINITIONS
// ============================================

export interface TribalRollRecord {
  id: string
  title: string
  yearStart: number
  yearEnd?: number
  tribes: string[]
  purpose: string
  recordsIncluded: string
  whoShouldSearch: string
  relatedLaws: string[]
  relatedTreaties: string[]
  relatedStates: string[]
  sourceLinks: SourceLink[]
  cautionNote: string
  tags: string[]
  category: 'five-tribes' | 'eastern-cherokee' | 'federal-census' | 'other'
}

export interface LawPolicyRecord {
  id: string
  title: string
  year: number
  yearEnd?: number
  summary: string
  historicalImpact: string
  identityImpact: string
  relatedRecords: string[]
  relatedTribes: string[]
  relatedStates: string[]
  sourceLinks: SourceLink[]
  tags: string[]
  category: 'foundations' | 'treaty-removal' | 'race-citizenship' | 'enrollment-allotment' | 'education' | 'court-case'
}

export interface TreatyRecord {
  id: string
  title: string
  year: number
  parties: string[]
  summary: string
  historicalImpact: string
  relatedLaws: string[]
  relatedTribes: string[]
  relatedStates: string[]
  sourceLinks: SourceLink[]
  tags: string[]
}

export interface AncestrySourceLink {
  label: string
  url: string
  isOfficial: boolean
  description: string
}

export interface StateRecordMapEntry {
  state: string
  abbreviation: string
  nations: string[]
  alternativeNames: string[]
  relevantRolls: string[]
  relevantTreaties: string[]
  relevantLaws: string[]
  migrationPaths: MigrationPath[]
  vitalRecords: VitalRecordInfo
  archiveLinks: SourceLink[]
  genealogyLinks: SourceLink[]
}

export interface MigrationPath {
  from: string
  to: string
  note: string
}

export interface VitalRecordInfo {
  office: string
  address: string
  phone: string
  website: string
  birthCertProcess: string
  deathCertProcess: string
  indianAffairs?: string
}

export interface SourceLink {
  label: string
  url: string
}

export interface AlternativeTribalName {
  tribalName: string
  alternativeNames: string[]
  languageFamily?: string
  region?: string
}

export interface ResearchGuidancePoint {
  number: number
  title: string
  description: string
}

export type AncestryFilterCategory =
  | 'all'
  | 'rolls'
  | 'treaties'
  | 'laws'
  | 'census'
  | 'freedmen'
  | 'vital-records'
  | 'land-records'
  | 'migration'
  | 'court-cases'
  | 'boarding-schools'
  | 'racial-classification'
