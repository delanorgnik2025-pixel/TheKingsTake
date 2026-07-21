// ============================================
// FORENSICS CASES DATA
// All cases are fictional and for educational purposes only.
// ============================================

export interface ForensicsCase {
  id: string
  title: string
  tagline: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  estimatedTime: string
  evidenceCount: number
  labStations: string[]
  summary: string
  learningObjectives: string[]
  locked?: boolean
}

export const CASES: ForensicsCase[] = [
  {
    id: 'beach-homicide',
    title: 'The Beach Homicide',
    tagline: 'Fictional Training Case #001',
    difficulty: 'Beginner',
    estimatedTime: '25-35 min',
    evidenceCount: 8,
    labStations: ['Fingerprint / Impression', 'Autopsy / Postmortem', 'Digital Forensics'],
    summary:
      'A deceased adult is discovered near a remote shoreline after a gathering. The trainee must examine the scene, distinguish physical evidence from assumptions, review witness statements, identify timeline inconsistencies, and submit a supported case theory.',
    learningObjectives: [
      'Distinguish physical evidence from assumption',
      'Document a crime scene systematically',
      'Correlate witness statements with physical findings',
      'Build a timeline from multiple sources',
      'Separate fact from inference',
    ],
  },
  {
    id: 'warehouse-incident',
    title: 'The Warehouse Incident',
    tagline: 'Fictional Training Case #002',
    difficulty: 'Intermediate',
    estimatedTime: '35-45 min',
    evidenceCount: 10,
    labStations: ['Fingerprint / Impression', 'Ballistics', 'Toxicology'],
    summary: 'A security guard is found unconscious in a warehouse after an apparent break-in.',
    learningObjectives: ['Analyze forced entry evidence', 'Interpret toxicology reports'],
    locked: true,
  },
  {
    id: 'apartment-fire',
    title: 'The Apartment Fire',
    tagline: 'Fictional Training Case #003',
    difficulty: 'Intermediate',
    estimatedTime: '30-40 min',
    evidenceCount: 9,
    labStations: ['Trace Evidence', 'Toxicology', 'Digital Forensics'],
    summary: 'A fire in an apartment building reveals suspicious accelerant patterns.',
    learningObjectives: ['Identify arson indicators', 'Analyze fire patterns'],
    locked: true,
  },
  {
    id: 'cold-case-review',
    title: 'The Cold Case Review',
    tagline: 'Fictional Training Case #004',
    difficulty: 'Advanced',
    estimatedTime: '45-60 min',
    evidenceCount: 12,
    labStations: ['DNA Analysis', 'Fingerprint / Impression', 'Digital Forensics'],
    summary: 'A 20-year-old unsolved case is reopened with new DNA technology.',
    learningObjectives: ['Evaluate degraded evidence', 'Assess new technology applicability'],
    locked: true,
  },
]
