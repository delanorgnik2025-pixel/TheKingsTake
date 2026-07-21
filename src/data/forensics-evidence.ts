// ============================================
// BEACH HOMICIDE EVIDENCE DATA
// All evidence is fictional and for educational purposes only.
// ============================================

export interface EvidenceItem {
  id: string
  number: number
  name: string
  category: string
  sceneDescription: string
  initialObservation: string
  x: number // percentage position in scene (0-100)
  y: number
  labTest: string
  labResult: string
  isFact: boolean
  educationalNote: string
}

export interface WitnessStatement {
  id: string
  witnessName: string
  relationship: string
  statement: string
  inconsistencies: string[]
  reliability: 'High' | 'Medium' | 'Low'
}

export interface TimelineEvent {
  id: string
  time: string
  description: string
  source: string
  category: 'Witness' | 'Physical' | 'Digital' | 'Medical'
  correctOrder: number
}

export interface AutopsyFinding {
  id: string
  category: 'Observed Fact' | 'Medical Interpretation' | 'Unresolved Question'
  finding: string
  details: string
}

export interface FingerprintSample {
  id: string
  label: string
  pattern: string
  characteristics: string[]
  isMatch: boolean
}

// Beach Homicide Evidence
export const BEACH_HOMICIDE_EVIDENCE: EvidenceItem[] = [
  {
    id: 'footprints',
    number: 1,
    name: 'Footwear Impressions',
    category: 'Impression Evidence',
    sceneDescription: 'Partial footwear impressions in damp sand leading toward the waterline.',
    initialObservation: 'Partial footwear impression approximately 28 cm long. Tread pattern visible. Direction: toward shoreline.',
    x: 35,
    y: 72,
    labTest: 'Impression Comparison',
    labResult: 'Pattern consistent with athletic shoe size 11. Distinctive wear pattern on right heel.',
    isFact: true,
    educationalNote: 'Footwear impressions can indicate direction of travel, approximate shoe size, and sometimes manufacturer.',
  },
  {
    id: 'phone',
    number: 2,
    name: 'Mobile Phone',
    category: 'Digital Evidence',
    sceneDescription: 'A smartphone partially buried in sand near the body.',
    initialObservation: 'Smartphone with cracked screen. Battery depleted. Sand in charging port. Last position suggests it was dropped.',
    x: 52,
    y: 65,
    labTest: 'Digital Forensics',
    labResult: 'Last call logged at 11:47 PM. GPS last active at 11:52 PM near this location. Two unread messages from "Unknown."',
    isFact: true,
    educationalNote: 'Digital devices can provide precise timestamps and location data that corroborate or contradict witness statements.',
  },
  {
    id: 'watch',
    number: 3,
    name: 'Wristwatch',
    category: 'Physical Evidence',
    sceneDescription: 'A damaged wristwatch on the wrist of the deceased.',
    initialObservation: 'Analog wristwatch. Crystal cracked. Hands stopped at approximately 12:15 AM. Strap intact.',
    x: 55,
    y: 58,
    labTest: 'Mechanical Analysis',
    labResult: 'Impact damage consistent with fall. Time stoppage likely occurred at moment of significant force. Water-resistant seal failed.',
    isFact: true,
    educationalNote: 'A stopped watch may indicate time of impact, but can also stop due to other trauma or battery failure.',
  },
  {
    id: 'beverage',
    number: 4,
    name: 'Beverage Container',
    category: 'Trace Evidence',
    sceneDescription: 'An empty aluminum beverage can near the body.',
    initialObservation: 'Empty aluminum can. Label partially obscured by sand. Lip print visible on rim. Dents suggest it was crushed and discarded.',
    x: 68,
    y: 70,
    labTest: 'Trace & DNA Analysis',
    labResult: 'Residual beverage: malt liquor, 8.2% ABV. Latent prints: two partials, one smudged. DNA: victim + one unknown contributor on rim.',
    isFact: true,
    educationalNote: 'Beverage containers can yield DNA, fingerprints, and toxicological information about consumption.',
  },
  {
    id: 'fabric',
    number: 5,
    name: 'Fabric Fragment',
    category: 'Trace Evidence',
    sceneDescription: 'A torn piece of dark fabric caught on a nearby bush.',
    initialObservation: 'Dark navy fabric, synthetic blend, approximately 8x12 cm. Thread count suggests outerwear material. Torn edge, not cut.',
    x: 78,
    y: 45,
    labTest: 'Fiber Analysis',
    labResult: 'Polyester-cotton blend. Dye analysis consistent with commercially available jacket material. Microscopic tears suggest forceful contact with vegetation.',
    isFact: true,
    educationalNote: 'Fabric transfers can indicate physical contact, struggle, or passage through an area.',
  },
  {
    id: 'tire',
    number: 6,
    name: 'Vehicle Tire Impression',
    category: 'Impression Evidence',
    sceneDescription: 'Tire tracks in the sand near the access road.',
    initialObservation: 'Single tire track, approximately 22 cm width. Tread pattern: all-season radial. Depth suggests recent passage on damp sand.',
    x: 15,
    y: 80,
    labTest: 'Tread Comparison',
    labResult: 'Tread pattern consistent with mid-size sedan tires. Wear pattern indicates front-wheel-drive vehicle. Depth measurement: approximately 2.3 cm.',
    isFact: true,
    educationalNote: 'Tire impressions can identify vehicle type, tread wear, and direction of travel.',
  },
  {
    id: 'personal',
    number: 7,
    name: "Victim's Wallet",
    category: 'Physical Evidence',
    sceneDescription: "A leather wallet in the victim's back pocket.",
    initialObservation: 'Leather bifold wallet. Contains: $47 cash, driver\'s license, debit card, business card for "Shoreline Services." No signs of forced entry.',
    x: 48,
    y: 62,
    labTest: 'Document Analysis',
    labResult: 'All documents intact. No financial transactions after 10:30 PM. Business card: legitimate marine services company, local address.',
    isFact: true,
    educationalNote: 'Personal items can establish identity, rule out robbery as motive, and provide investigative leads.',
  },
  {
    id: 'drag',
    number: 8,
    name: 'Drag Marks',
    category: 'Pattern Evidence',
    sceneDescription: 'Linear disturbances in the sand between the waterline and the body.',
    initialObservation: 'Parallel linear depressions in sand, approximately 60 cm apart, extending from high-tide line to body position. Depth: 1-2 cm.',
    x: 42,
    y: 78,
    labTest: 'Pattern Analysis',
    labResult: 'Pattern consistent with passive dragging across damp sand. Width suggests shoulders of adult male. No active resistance pattern (no clawing or disruption).',
    isFact: true,
    educationalNote: 'Drag marks can indicate whether a body was moved post-mortem and the approximate size of the mover.',
  },
]

export const BEACH_HOMICIDE_WITNESSES: WitnessStatement[] = [
  {
    id: 'witness-a',
    witnessName: 'Witness A (Anonymous)',
    relationship: 'Beachgoer, present at gathering',
    statement:
      'I saw the victim around 11:30 PM near the fire pit. He seemed fine, talking with a group. I left around midnight with my friends. I didn\'t see anything unusual.',
    inconsistencies: ['Claimed to leave at midnight but phone GPS shows departure at 12:22 AM'],
    reliability: 'Medium',
  },
  {
    id: 'witness-b',
    witnessName: 'Witness B (Anonymous)',
    relationship: 'Friend of victim',
    statement:
      'We were all drinking and having a good time. I saw him walk toward the water around 11:45 PM. He said he was going to "clear his head." That\'s the last time I saw him.',
    inconsistencies: ['Could not explain why victim would walk toward water alone'],
    reliability: 'Medium',
  },
  {
    id: 'witness-c',
    witnessName: 'Witness C (Anonymous)',
    relationship: 'Stranger, walking dog',
    statement:
      'I was walking my dog at about 12:30 AM near the beach access. I heard voices — maybe an argument — but I couldn\'t make out words. I saw a vehicle leave the parking area quickly.',
    inconsistencies: ['Could not identify vehicle type, color, or number of occupants'],
    reliability: 'High',
  },
]

export const BEACH_HOMICIDE_TIMELINE: TimelineEvent[] = [
  { id: 't1', time: '9:00 PM', description: 'Victim arrives at beach gathering with friends', source: 'Witness B', category: 'Witness', correctOrder: 1 },
  { id: 't2', time: '10:15 PM', description: 'Witness A reports victim drinking alcohol at fire pit', source: 'Witness A', category: 'Witness', correctOrder: 2 },
  { id: 't3', time: '11:30 PM', description: 'Victim last seen at fire pit, appears normal', source: 'Multiple witnesses', category: 'Witness', correctOrder: 3 },
  { id: 't4', time: '11:42 PM', description: 'Phone call from victim to known contact (45 seconds)', source: 'Phone records', category: 'Digital', correctOrder: 4 },
  { id: 't5', time: '11:47 PM', description: 'Last outgoing call from victim\'s phone', source: 'Phone records', category: 'Digital', correctOrder: 5 },
  { id: 't6', time: '11:52 PM', description: 'GPS shows victim\'s phone stationary at current location', source: 'GPS data', category: 'Digital', correctOrder: 6 },
  { id: 't7', time: '12:05 AM', description: 'Tire impressions suggest vehicle departure', source: 'Physical evidence', category: 'Physical', correctOrder: 7 },
  { id: 't8', time: '12:15 AM (approx)', description: 'Wristwatch stops — possible impact time', source: 'Physical evidence', category: 'Physical', correctOrder: 8 },
  { id: 't9', time: '12:30 AM', description: 'Witness C hears voices and sees vehicle leave', source: 'Witness C', category: 'Witness', correctOrder: 9 },
  { id: 't10', time: '6:45 AM', description: 'Body discovered by morning jogger', source: 'Police report', category: 'Witness', correctOrder: 10 },
]

export const BEACH_HOMICIDE_AUTOPSY: AutopsyFinding[] = [
  { id: 'a1', category: 'Observed Fact', finding: 'Lividity fixed on posterior surface', details: 'Blood pooling on back side indicates body was not moved after death for at least 4-6 hours.' },
  { id: 'a2', category: 'Observed Fact', finding: 'Subdural hematoma, right parietal region', details: 'Blunt force trauma to right side of head. Skull fracture present.' },
  { id: 'a3', category: 'Observed Fact', finding: 'Water in lungs and sinuses', details: 'Drowning component cannot be ruled out. Water is consistent with ocean sample.' },
  { id: 'a4', category: 'Observed Fact', finding: 'Bilateral contusions on upper arms', details: 'Bruising pattern suggests hands gripped both arms forcefully.' },
  { id: 'a5', category: 'Medical Interpretation', finding: 'Time of death: between 12:00 AM and 1:30 AM', details: 'Based on body temperature, rigor mortis stage, and stomach contents. Not a precise determination.' },
  { id: 'a6', category: 'Medical Interpretation', finding: 'Primary cause: blunt force trauma', details: 'Subdural hematoma sufficient to cause unconsciousness. Drowning may be secondary.' },
  { id: 'a7', category: 'Unresolved Question', finding: 'Order of injuries unclear', details: 'Cannot determine whether head trauma occurred before, during, or after water entry.' },
  { id: 'a8', category: 'Unresolved Question', finding: 'Arm contusions: restraint or assistance?', details: 'Bilateral arm bruising could indicate either restraint OR someone trying to help the victim.' },
]

export const BEACH_HOMICIDE_FINGERPRINTS: FingerprintSample[] = [
  { id: 'f1', label: 'Recovered from Beverage Can', pattern: 'Loop (ulnar), 12 visible ridge characteristics', characteristics: ['Ulnar loop', 'Delta at 3 o\'clock', 'Ridge count: 14', 'Tented arch near core', 'Two ridge endings', 'One bifurcation'], isMatch: false },
  { id: 'f2', label: 'Sample A - Witness B', pattern: 'Whorl (double loop), 15 visible ridge characteristics', characteristics: ['Double loop whorl', 'Two deltas', 'Ridge count: 22', 'Central pocket'], isMatch: false },
  { id: 'f3', label: 'Sample B - Beachgoer John D.', pattern: 'Loop (ulnar), 10 visible ridge characteristics', characteristics: ['Ulnar loop', 'Delta at 2 o\'clock', 'Ridge count: 11', 'Simple recurving ridges'], isMatch: true },
  { id: 'f4', label: 'Sample C - Unknown Contributor', pattern: 'Arch (plain), 8 visible ridge characteristics', characteristics: ['Plain arch', 'No delta', 'Ridges enter one side, exit other', 'Slightly wavy pattern'], isMatch: false },
]

export const BEACH_HOMICIDE_SOLUTION = {
  probableSequence: 'Victim consumed alcohol, became separated from group, was struck on the head (possibly during an altercation or fall), and subsequently entered or was moved into the water. The exact circumstances of the head trauma remain undetermined.',
  strongestEvidence: ['Wristwatch stopped at ~12:15 AM', 'Phone GPS stationary at 11:52 PM', 'Subdural hematoma consistent with blunt force'],
  weakestEvidence: ['Witness accounts vary in timing', 'No weapon recovered', 'Arm bruising interpretation is ambiguous'],
  unresolvedQuestions: ['Exact sequence of injuries', 'Whether water entry was before or after head trauma', 'Identity of unknown DNA contributor'],
  nextSteps: ['Interview all witnesses under formal conditions', 'Submit unknown DNA to CODIS', 'Analyze tidal patterns for body movement', 'Search for discarded weapon or striking surface'],
}
