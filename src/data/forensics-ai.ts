// ============================================
// FORENSICS AI ENGINE
// Simulates AI responses for scene generation and investigation guidance.
// In production, replace with real LLM API calls.
// ============================================

export interface GeneratedCase {
  title: string
  location: string
  timeOfIncident: string
  summary: string
  people: GeneratedPerson[]
  evidence: GeneratedEvidence[]
  timeline: GeneratedTimelineEvent[]
  suggestedQuestions: string[]
  legalContext?: string
  immediateSteps: string[]
}

export interface GeneratedPerson {
  name: string
  role: string
  description: string
  knows: string[] // what this person might know
}

export interface GeneratedEvidence {
  name: string
  category: string
  likelyLocation: string
  significance: string
  howToPreserve: string
}

export interface GeneratedTimelineEvent {
  time: string
  event: string
  source: string
  certainty: 'confirmed' | 'estimated' | 'unverified'
}

// ============================================
// AI SCENE GENERATOR — Parses user prompt, creates case
// ============================================
export function generateCaseFromPrompt(prompt: string): GeneratedCase {
  const lower = prompt.toLowerCase()

  // Extract keywords
  const hasPolice = lower.includes('police') || lower.includes('arrest') || lower.includes('officer') || lower.includes('cop')
  const hasTraffic = lower.includes('traffic') || lower.includes('driving') || lower.includes('car') || lower.includes('vehicle')
  const hasWorkplace = lower.includes('work') || lower.includes('job') || lower.includes('employer') || lower.includes('fired') || lower.includes('hr')
  const hasViolence = lower.includes('assault') || lower.includes('attack') || lower.includes('hit') || lower.includes('hurt') || lower.includes('injury')
  const hasProperty = lower.includes('stole') || lower.includes('theft') || lower.includes('broke') || lower.includes('damage') || lower.includes('property')
  const hasLegal = lower.includes('lawyer') || lower.includes('court') || lower.includes('lawsuit') || lower.includes('sue') || lower.includes('rights')
  const hasWitness = lower.includes('witness') || lower.includes('saw') || lower.includes('people') || lower.includes('someone')
  const hasDocumentation = lower.includes('record') || lower.includes('video') || lower.includes('photo') || lower.includes('camera') || lower.includes('document')
  const hasDrugs = lower.includes('drug') || lower.includes('alcohol') || lower.includes('intoxicated') || lower.includes('substance')
  const hasDiscrimination = lower.includes('discriminat') || lower.includes('race') || lower.includes('racist') || lower.includes('profile') || lower.includes('bias')

  // Detect location type
  let locationType = 'unknown location'
  if (lower.includes('street') || lower.includes('road') || lower.includes('highway')) locationType = 'street/public area'
  if (lower.includes('home') || lower.includes('house') || lower.includes('apartment')) locationType = 'residential location'
  if (lower.includes('work') || lower.includes('office') || lower.includes('building')) locationType = 'workplace'
  if (lower.includes('store') || lower.includes('shop') || lower.includes('restaurant')) locationType = 'commercial establishment'
  if (lower.includes('park') || lower.includes('beach') || lower.includes('outside')) locationType = 'outdoor public area'
  if (lower.includes('hospital') || lower.includes('medical') || lower.includes('clinic')) locationType = 'medical facility'
  if (lower.includes('school') || lower.includes('campus') || lower.includes('university')) locationType = 'educational facility'
  if (lower.includes('police') || lower.includes('station') || lower.includes('jail')) locationType = 'law enforcement facility'

  // Generate people
  const people: GeneratedPerson[] = []

  if (hasPolice) {
    people.push({
      name: 'Officer(s) Involved',
      role: 'Law Enforcement',
      description: 'The officer(s) who responded to or were involved in the incident.',
      knows: ['Official report narrative', 'Body cam/dash cam footage', 'Dispatch records', 'Chain of custody for evidence', 'Witnesses they interviewed']
    })
  }

  if (hasWitness) {
    people.push({
      name: 'Witness(es)',
      role: 'Observer(s)',
      description: 'People who saw or heard some part of the incident.',
      knows: ['Visual observations', 'Audio/heard conversations', 'Timeline of what they observed', 'Description of individuals involved', 'Environmental conditions']
    })
  }

  people.push({
    name: 'You (the Reporter)',
    role: 'Primary Party',
    description: 'Your role and perspective in this incident.',
    knows: ['Your first-hand experience', 'Your documentation', 'Your communications about the incident', 'Physical/emotional effects on you', 'Subsequent actions you took']
  })

  // Generate evidence based on incident type
  const evidence: GeneratedEvidence[] = []

  if (hasDocumentation || true) {
    evidence.push({
      name: 'Video/Photo Evidence',
      category: 'Digital Evidence',
      likelyLocation: 'Security cameras, phones, dash cams, body cams nearby',
      significance: 'Often the strongest evidence — shows what actually happened vs. what was reported',
      howToPreserve: 'Request immediately before deletion (most systems overwrite after 30-90 days). Save your own recordings to cloud. Write down camera locations NOW.'
    })
  }

  if (hasPolice) {
    evidence.push({
      name: 'Police Report',
      category: 'Official Document',
      likelyLocation: 'Police department records division',
      significance: 'Official narrative — but may contain errors, omissions, or bias. Compare against your own account.',
      howToPreserve: 'Request a copy immediately under FOIA/your state public records law. Note discrepancies between report and your experience.'
    })

    evidence.push({
      name: 'Body Cam / Dash Cam Footage',
      category: 'Digital Evidence',
      likelyLocation: 'Police department evidence/IT division',
      significance: 'Can confirm or contradict officer statements and reports.',
      howToPreserve: 'Submit written request ASAP. These are often "lost" or overwritten. Some states require release within 72 hours of request.'
    })
  }

  if (hasDiscrimination || hasWorkplace) {
    evidence.push({
      name: 'Emails / Text Messages / Communications',
      category: 'Digital Evidence',
      likelyLocation: 'Your phone, email accounts, workplace systems',
      significance: 'Can show patterns, intent, and timeline of discriminatory actions.',
      howToPreserve: 'Screenshot and back up everything. Export emails. Do NOT delete anything, even if embarrassing. Dates matter.'
    })
  }

  if (hasWorkplace) {
    evidence.push({
      name: 'Personnel Records',
      category: 'Official Document',
      likelyLocation: 'HR department, your personal copies',
      significance: 'Employment history, performance reviews, disciplinary records — shows pattern.',
      howToPreserve: 'Request your complete personnel file in writing. Keep copies of all reviews, write-ups, and communications.'
    })
  }

  if (hasViolence) {
    evidence.push({
      name: 'Medical Records / Photos of Injuries',
      category: 'Physical Evidence',
      likelyLocation: 'Hospital, urgent care, your own photos',
      significance: 'Documents extent of injuries and timestamps treatment.',
      howToPreserve: 'Seek medical attention immediately. Photograph injuries daily (time-stamped). Request complete medical records.'
    })
  }

  // Always add these
  evidence.push({
    name: '911 Call / Dispatch Records',
    category: 'Audio Evidence',
    likelyLocation: 'Police dispatch, emergency services',
    significance: 'Shows who called, what was reported, and when officers were dispatched.',
    howToPreserve: 'Request under public records law. Note call time vs. arrival time.'
  })

  evidence.push({
    name: 'Communication Records',
    category: 'Digital Evidence',
    likelyLocation: 'Phone carrier, social media, messaging apps',
    significance: 'Your calls, texts, and social media posts around the time of the incident.',
    howToPreserve: 'Screenshot everything. Request call/text logs from carrier. Export social media data.'
  })

  // Generate timeline from keywords
  const timeline: GeneratedTimelineEvent[] = [
    { time: 'Before incident', event: 'Events leading up to the situation', source: 'Your account', certainty: 'estimated' },
    { time: 'Time of incident', event: 'The situation occurred', source: 'Your report', certainty: 'confirmed' },
    { time: 'Immediately after', event: 'First responses, calls made, people present', source: 'Multiple', certainty: 'estimated' },
  ]

  if (hasPolice) {
    timeline.push({ time: 'Police arrival', event: 'Officers arrived on scene', source: 'Dispatch records', certainty: 'unverified' })
    timeline.push({ time: 'After police left', event: 'Follow-up actions, citations issued, arrest processed', source: 'Police report', certainty: 'unverified' })
  }

  // Suggested questions
  const suggestedQuestions = [
    'What evidence should I look for first?',
    'How do I preserve the evidence I have?',
    'What does the timeline tell me?',
    'Are there inconsistencies in the official account?',
    'What are my legal rights in this situation?',
    'What should my next steps be?',
  ]

  if (hasPolice) {
    suggestedQuestions.push('How do I get body cam footage?')
    suggestedQuestions.push('What if the police report is wrong?')
  }
  if (hasDiscrimination) {
    suggestedQuestions.push('How do I prove discrimination?')
    suggestedQuestions.push('What documentation do I need?')
  }
  if (hasWorkplace) {
    suggestedQuestions.push('What are my employment rights?')
    suggestedQuestions.push('How do I file a complaint?')
  }

  // Immediate steps
  const immediateSteps: string[] = []

  immediateSteps.push('Document everything NOW — memory fades, evidence disappears')

  if (hasDocumentation) {
    immediateSteps.push('Request video footage immediately (before it is overwritten)')
  }
  if (hasPolice) {
    immediateSteps.push('Request police report and body cam footage under FOIA')
    immediateSteps.push('Write your own detailed account while memory is fresh — time-stamp it')
  }
  if (hasDiscrimination || hasWorkplace) {
    immediateSteps.push('Preserve all emails, texts, and communications — screenshot everything')
    immediateSteps.push('Contact EEOC or relevant agency within filing deadlines')
  }
  if (hasViolence) {
    immediateSteps.push('Seek medical attention and photograph all injuries')
  }
  if (hasLegal) {
    immediateSteps.push('Consult with an attorney who specializes in your type of case')
  }

  immediateSteps.push('Identify and contact witnesses while events are fresh')
  immediateSteps.push('Create a timeline of events with dates, times, and who was present')

  // Legal context
  let legalContext = ''
  if (hasDiscrimination && hasWorkplace) {
    legalContext = 'Workplace discrimination cases are typically filed with the EEOC within 180 days (300 days depending on state). You must file with EEOC before suing in federal court. Document everything — patterns matter more than single incidents.'
  } else if (hasPolice && hasDiscrimination) {
    legalContext = 'Civil rights actions involving law enforcement can be filed under 42 U.S.C. § 1983. These cases have strict filing deadlines (varies by state). Preserve all evidence immediately — police departments have incentive to "lose" footage.'
  } else if (hasPolice) {
    legalContext = 'Police misconduct cases require quick action. File a complaint with the department internal affairs division, request all footage, and consult an attorney. Statute of limitations varies — do not delay.'
  } else if (hasWorkplace) {
    legalContext = 'Employment disputes often require exhausting administrative remedies before court action. Document the hostile environment, preserve communications, and consult an employment attorney.'
  } else if (hasProperty) {
    legalContext = 'Property damage claims should be documented with photos, repair estimates, and police reports if applicable. File an insurance claim promptly and keep all receipts.'
  }

  return {
    title: extractTitle(prompt),
    location: locationType,
    timeOfIncident: 'As reported in your account',
    summary: `Based on your description, this appears to be an incident at a ${locationType} involving ${hasPolice ? 'law enforcement' : ''}${hasPolice && hasDiscrimination ? ' and potential civil rights concerns' : hasDiscrimination ? 'potential discrimination' : ''}${hasViolence ? ' with physical altercation' : ''}${hasWorkplace ? ' in a workplace context' : ''}. The AI has identified ${evidence.length} categories of evidence you should pursue and ${people.length} key parties.`,
    people,
    evidence,
    timeline,
    suggestedQuestions: suggestedQuestions.slice(0, 6),
    legalContext: legalContext || undefined,
    immediateSteps: immediateSteps.slice(0, 8),
  }
}

function extractTitle(prompt: string): string {
  // Try to extract a title from the first sentence or key words
  const sentences = prompt.split(/[.!?]/).filter(s => s.trim().length > 0)
  const first = sentences[0]?.trim() || 'Untitled Case'
  if (first.length < 60) return first
  return first.substring(0, 57) + '...'
}

// ============================================
// AI INVESTIGATION ADVISOR — Answers user questions
// ============================================
export interface AIResponse {
  text: string
  suggestedTools?: string[]
  suggestedEvidence?: string[]
  nextSteps?: string[]
  warnings?: string[]
}

export function askAIAdvisor(question: string, caseData: GeneratedCase): AIResponse {
  const lower = question.toLowerCase()

  // Evidence questions
  if (lower.includes('evidence') || lower.includes('proof') || lower.includes('prove')) {
    return {
      text: `Based on your case at ${caseData.location}, here's what you should prioritize:\n\n${caseData.evidence.slice(0, 3).map((e, i) => `${i + 1}. **${e.name}** — ${e.significance}\n   Where to find it: ${e.likelyLocation}`).join('\n\n')}\n\n**Priority principle:** Digital evidence (video, audio, digital communications) is often the strongest because it is harder to dispute than witness testimony. Request it immediately before it is overwritten or deleted.`,
      suggestedTools: ['evidence-board', 'timeline'],
      suggestedEvidence: caseData.evidence.slice(0, 3).map(e => e.name),
      nextSteps: ['Request video footage immediately', 'Document your own account with timestamps', 'Identify and contact witnesses'],
    }
  }

  // Timeline questions
  if (lower.includes('timeline') || lower.includes('when') || lower.includes('time') || lower.includes('order')) {
    return {
      text: `Timeline analysis is critical. Here's what we know and what gaps exist:\n\n${caseData.timeline.map(t => `- **${t.time}**: ${t.event} (${t.certainty === 'confirmed' ? 'Confirmed' : t.certainty === 'estimated' ? 'Estimated' : 'Unverified'})`).join('\n')}\n\n**Key question:** Are there gaps in the timeline? Missing time periods where you don't know what happened? Those gaps are where evidence may have been overlooked or where the official narrative may not match reality.`,
      suggestedTools: ['timeline-builder'],
      nextSteps: ['Fill in timeline gaps with witness accounts', 'Request dispatch records for exact times', 'Check phone location data for timestamps'],
    }
  }

  // Police/rights questions
  if (lower.includes('police') || lower.includes('rights') || lower.includes('wrongful') || lower.includes('arrest') || lower.includes('cop')) {
    return {
      text: `**Your rights in this situation:**\n\n1. **Right to record** — You can legally record police in public spaces in all 50 states\n2. **Right to remain silent** — Do not answer questions without an attorney present\n3. **Right to an attorney** — Request one immediately if detained\n4. **Right to a copy of the report** — File a FOIA/public records request\n5. **Right to file a complaint** — Internal affairs, civilian review board, or EEOC\n\n${caseData.legalContext || 'Consult an attorney who specializes in civil rights or criminal defense — many offer free consultations.'}`,
      suggestedTools: ['evidence-board', 'digital-forensics'],
      warnings: ['Do NOT sign anything without reading it fully', 'Do NOT consent to searches without a warrant', 'Record all interactions with law enforcement if legally permissible'],
      nextSteps: ['File FOIA request for all records', 'Contact civil rights attorney', 'File complaint with internal affairs'],
    }
  }

  // Discrimination questions
  if (lower.includes('discriminat') || lower.includes('race') || lower.includes('bias') || lower.includes('profile')) {
    return {
      text: `**Proving discrimination requires showing a pattern or disparate treatment.**\n\nKey evidence to gather:\n1. **Comparative treatment** — How were others in similar situations treated differently?\n2. **Documentation of remarks** — Any racially charged comments, even "jokes"\n3. **Pattern evidence** — Is this an isolated incident or part of a pattern?\n4. **Statistical evidence** — Workplace demographics, hiring/firing patterns\n5. **Your performance record** — If you were treated worse despite equal/better performance\n\n**EEOC filing deadline: 180 days from the incident (300 days in some states). Do not miss this window.**`,
      suggestedTools: ['evidence-board', 'digital-forensics'],
      suggestedEvidence: ['Emails / Text Messages', 'Personnel Records'],
      warnings: ['EEOC deadline is strict — 180/300 days', 'Document everything before confronting the employer'],
      nextSteps: ['File EEOC charge immediately', 'Preserve all communications', 'Document comparative treatment of coworkers'],
    }
  }

  // What should I do / next steps
  if (lower.includes('what should') || lower.includes('next step') || lower.includes('do now') || lower.includes('what do')) {
    return {
      text: `**Immediate Action Plan:**\n\n${caseData.immediateSteps.map((step, i) => `${i + 1}. ${step}`).join('\n')}\n\n**Remember:** Evidence degrades, memories fade, and deadlines pass. The most important action is to start documenting NOW — even imperfect documentation is better than none.`,
      suggestedTools: ['evidence-board', 'timeline-builder'],
      nextSteps: caseData.immediateSteps.slice(0, 5),
    }
  }

  // Video/footage questions
  if (lower.includes('video') || lower.includes('footage') || lower.includes('camera') || lower.includes('recording')) {
    return {
      text: `**Video evidence is your strongest ally — but it disappears quickly.**\n\nMost security systems overwrite footage after 30-90 days. Some body cam policies require release within 72 hours of request.\n\n**How to request:**\n1. **Businesses:** Ask management in writing (email creates a paper trail)\n2. **Police body cam:** Submit formal public records request — cite your state's FOIA law\n3. **Traffic cameras:** Contact your city's transportation department\n4. **Private residences:** Ask the resident — they are not required to share but often will\n5. **Your own recordings:** Back up immediately to cloud + physical drive\n\n**If they refuse or claim footage is "lost":** Document the refusal. This can be used in court to suggest spoliation of evidence (intentional destruction).`,
      suggestedTools: ['digital-forensics'],
      warnings: ['Footage gets overwritten — act within 30 days', 'Get refusals in writing', 'Back up your own recordings immediately'],
      nextSteps: ['Submit written video requests TODAY', 'Check for additional cameras you may have missed', 'Ask witnesses if they recorded anything'],
    }
  }

  // Witness questions
  if (lower.includes('witness') || lower.includes('someone saw') || lower.includes('people')) {
    return {
      text: `**Witnesses are critical but unreliable.** Studies show eyewitness testimony is wrong 50-75% of the time. However, witnesses who recorded video, took photos, or made contemporaneous notes are highly valuable.\n\n**How to handle witnesses:**\n1. **Contact them ASAP** — Memory degrades within hours\n2. **Ask open questions** — "What did you see?" not "Did you see X?"\n3. **Record their account** — Ask permission to record, or have them write it down\n4. **Get contact info** — You may need them to testify later\n5. **Check for recordings** — Did anyone take video or photos?\n\n**Red flag:** If the official report lists "no witnesses" but you know people were present, this is a significant discrepancy to document.`,
      suggestedTools: ['timeline-builder', 'evidence-board'],
      nextSteps: ['Contact all potential witnesses today', 'Ask each witness if they have recordings', 'Document any discrepancies in official witness statements'],
    }
  }

  // General fallback
  return {
    text: `That's an important question. Based on your case at ${caseData.location}, here's what I can tell you:\n\nYour situation involves ${caseData.evidence.length} categories of evidence you should explore. The most important thing right now is to **preserve evidence before it disappears** and **document your account while memory is fresh**.\n\n${caseData.legalContext ? `**Legal context:** ${caseData.legalContext}` : ''}\n\nWhat specific aspect would you like to investigate next? I can help you with the timeline, evidence preservation, understanding your rights, or analyzing what the official record says vs. what you experienced.`,
    suggestedTools: ['evidence-board', 'timeline-builder'],
    nextSteps: ['Document your account now', 'Identify and preserve evidence', 'Consult an attorney about your specific situation'],
  }
}

// Quick response for chat
export function getQuickReply(type: string, caseData: GeneratedCase): string {
  switch (type) {
    case 'evidence-first':
      return `Start with **video evidence** — it is the hardest to dispute and easiest to lose. Check: security cameras, body cams, dash cams, and phones. Request within 30 days before overwrite. Then document your own written account with timestamps.`
    case 'timeline':
      return `Create a minute-by-minute timeline. Start with: What time did it begin? Who arrived when? What was said? Gaps in the timeline are where the official narrative often breaks down. Use phone records, receipts, and location data to anchor times.`
    case 'rights':
      return `Key rights: (1) Right to remain silent — do not answer questions without an attorney, (2) Right to record police in public, (3) Right to a copy of the report, (4) Right to file complaints. Never sign anything you have not read fully.`
    case 'preserve':
      return `Preserve evidence NOW: Screenshot all texts/emails. Request video before overwrite. Photograph injuries daily. Write your account with timestamps. Back up everything to cloud + physical storage. Evidence degrades — memory fades.`
    case 'attorney':
      return `Consult an attorney who specializes in your specific type of case. Many civil rights and employment attorneys offer free consultations. Bring: your written account, all documentation, timeline, and witness contact info. Do not wait for evidence to be "perfect."`
    default:
      return `I'm here to help you investigate. Ask me about evidence, timelines, your rights, or what steps to take next. You can also visit the Evidence Board, Timeline Builder, or Lab Stations to dig deeper into specific aspects of your case.`
  }
}
