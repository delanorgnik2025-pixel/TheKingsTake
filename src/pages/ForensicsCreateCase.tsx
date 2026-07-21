import { useState } from 'react'
import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import {
  Microscope, ArrowLeft, Sparkles, ShieldAlert, Clock, FileText,
  AlertTriangle, ChevronRight, Loader2, CheckCircle, User, Search
} from 'lucide-react'
import { generateCaseFromPrompt } from '../data/forensics-ai'
import type { GeneratedCase } from '../data/forensics-ai'

export default function ForensicsCreateCase() {
  const navigate = useNavigate()
  const [prompt, setPrompt] = useState('')
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState<GeneratedCase | null>(null)
  const [savedCases, setSavedCases] = useState<GeneratedCase[]>(() => {
    const saved = localStorage.getItem('forensics-cases')
    return saved ? JSON.parse(saved) : []
  })

  const handleGenerate = async () => {
    if (!prompt.trim() || prompt.length < 20) return
    setGenerating(true)
    // Simulate AI processing delay
    await new Promise(r => setTimeout(r, 2000))
    const caseData = generateCaseFromPrompt(prompt)
    setGenerated(caseData)
    setGenerating(false)
  }

  const handleStartInvestigation = () => {
    if (!generated) return
    const caseId = Date.now().toString(36)
    const caseWithId = { ...generated, id: caseId, originalPrompt: prompt }
    const updated = [caseWithId, ...savedCases]
    setSavedCases(updated)
    localStorage.setItem('forensics-cases', JSON.stringify(updated))
    navigate(`/forensics-lab/investigate/${caseId}`)
  }

  const examplePrompts = [
    'I was pulled over by police, asked to step out of my vehicle, and then an officer used excessive force during the arrest. There were witnesses but the police report says there were none.',
    'At my workplace, I was consistently given worse assignments than my white coworkers despite having better performance reviews. When I complained to HR, I was retaliated against and eventually fired.',
    'Someone broke into my apartment while I was at work. The landlord had cameras in the hallway but claims the footage was "accidentally deleted." My neighbor says they saw someone suspicious.',
    'I filed an EEOC complaint against my employer for discrimination. Since filing, my manager has been writing me up for things other employees do without consequences. I need to know what evidence to gather.',
  ]

  return (
    <div className="min-h-screen bg-[#05080e]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0A0F1A]/95 backdrop-blur-md border-b border-[rgba(255,149,0,0.1)]">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => navigate('/forensics-lab')} className="text-xs text-[#C9B99A] hover:text-[#FF9500] transition-colors flex items-center gap-1">
            <ArrowLeft size={14} /> Case Board
          </button>
          <div className="flex items-center gap-2">
            <Microscope size={14} className="text-[#FF9500]" />
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#FF9500]/40">AI Forensics Lab</span>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[rgba(255,149,0,0.1)] border border-[rgba(255,149,0,0.2)] rounded-full px-4 py-1.5 mb-4">
            <Sparkles size={14} className="text-[#FF9500]" />
            <span className="text-[10px] uppercase tracking-[0.15em] text-[#FF9500] font-medium">AI-Powered Investigation</span>
          </div>
          <h1 className="text-3xl sm:text-4xl text-[#F0EBE1] font-medium leading-[1.1] mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Describe Your Situation.<br />Let AI Build the Case.
          </h1>
          <p className="text-sm text-[#C9B99A]/70 max-w-xl mx-auto">
            Type or paste a description of what happened — in your own words. The AI will analyze it, 
            identify key evidence you should pursue, suggest witnesses to contact, and guide your investigation.
          </p>
        </motion.div>

        {/* Disclaimer */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="bg-[rgba(255,149,0,0.05)] border border-[rgba(255,149,0,0.15)] rounded-lg p-4 mb-8 max-w-2xl mx-auto">
          <div className="flex items-start gap-3">
            <ShieldAlert size={18} className="text-[#FF9500] shrink-0 mt-0.5" />
            <div>
              <p className="text-[11px] text-[#C9B99A]/70 leading-relaxed">
                <strong className="text-[#F0EBE1]">Educational Tool:</strong> This is not a substitute for legal advice or certified forensic investigation. 
                It is designed to help you think systematically about evidence, organize your thoughts, and understand what a real investigation would look at. 
                <strong className="text-[#F0EBE1]"> Always consult an attorney for legal matters.</strong>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Input Area */}
        {!generated && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <div className="bg-[rgba(27,40,56,0.6)] border border-[rgba(255,149,0,0.15)] rounded-xl p-6 mb-6">
              <label className="text-sm text-[#F0EBE1] font-medium mb-2 block">
                Describe what happened
              </label>
              <p className="text-[11px] text-[#C9B99A]/50 mb-3">
                Include: what happened, where, when, who was involved, what was said, and what has happened since. 
                Be as detailed as possible — the AI uses your details to identify relevant evidence.
              </p>
              <textarea
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                placeholder="Example: I was at work on Tuesday when my supervisor called me into their office. They accused me of something I didn't do and refused to let me explain. When I tried to file a complaint with HR, they said there was 'no record' of the meeting even though I had emailed HR about it the same day..."
                rows={8}
                className="w-full bg-[rgba(21,32,43,0.6)] border border-[rgba(255,149,0,0.15)] rounded-lg px-4 py-3 text-sm text-[#F0EBE1] placeholder:text-[#C9B99A]/20 focus:outline-none focus:border-[rgba(255,149,0,0.4)] resize-none mb-4"
              />
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[#C9B99A]/40">{prompt.length} characters {prompt.length > 0 && prompt.length < 20 && '(minimum 20)'}</span>
                <button
                  onClick={handleGenerate}
                  disabled={generating || prompt.length < 20}
                  className="inline-flex items-center gap-2 rounded-full h-12 px-8 bg-[#FF9500] text-[#1B2838] hover:bg-[#CC6A00] transition-colors font-medium disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{ boxShadow: '0 4px 16px rgba(255,149,0,0.25)' }}
                >
                  {generating ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                  {generating ? 'Analyzing Your Case...' : 'Generate Investigation'}
                </button>
              </div>
            </div>

            {/* Example Prompts */}
            <div className="mb-8">
              <p className="text-[10px] uppercase tracking-wider text-[#C9B99A]/40 mb-3">Or start with an example:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {examplePrompts.map((example, i) => (
                  <button
                    key={i}
                    onClick={() => setPrompt(example)}
                    className="text-left bg-[rgba(27,40,56,0.4)] border border-[rgba(255,149,0,0.08)] rounded-lg p-4 hover:border-[rgba(255,149,0,0.25)] transition-all group"
                  >
                    <p className="text-[11px] text-[#C9B99A]/60 group-hover:text-[#C9B99A] line-clamp-3 leading-relaxed">{example}</p>
                    <span className="text-[9px] text-[#FF9500]/50 group-hover:text-[#FF9500] mt-2 inline-block">Use this example →</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Generated Case Preview */}
        {generated && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Success Banner */}
            <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-4 flex items-center gap-3">
              <CheckCircle size={20} className="text-green-400" />
              <div>
                <p className="text-sm text-green-400 font-medium">Case Generated</p>
                <p className="text-[11px] text-[#C9B99A]/60">AI has identified {generated.evidence.length} evidence types and {generated.people.length} key parties</p>
              </div>
            </div>

            {/* Case Summary */}
            <div className="bg-[rgba(27,40,56,0.6)] border border-[rgba(255,149,0,0.15)] rounded-xl p-6">
              <h3 className="text-base text-[#F0EBE1] font-medium mb-2">{generated.title}</h3>
              <div className="flex flex-wrap gap-3 mb-3 text-[10px] text-[#C9B99A]/50">
                <span className="flex items-center gap-1"><Clock size={10} /> {generated.timeOfIncident}</span>
                <span className="flex items-center gap-1"><FileText size={10} /> {generated.location}</span>
              </div>
              <p className="text-sm text-[#C9B99A]/80 leading-relaxed">{generated.summary}</p>
            </div>

            {/* Key People */}
            <div className="bg-[rgba(27,40,56,0.6)] border border-[rgba(255,149,0,0.15)] rounded-xl p-6">
              <h3 className="text-sm text-[#F0EBE1] font-medium mb-4 flex items-center gap-2">
                <User size={16} className="text-[#FF9500]" /> Key People Identified
              </h3>
              <div className="space-y-3">
                {generated.people.map((person, i) => (
                  <div key={i} className="bg-[rgba(21,32,43,0.5)] rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm text-[#F0EBE1] font-medium">{person.name}</p>
                      <span className="text-[9px] text-[#FF9500]/60 bg-[rgba(255,149,0,0.1)] rounded-full px-2 py-0.5">{person.role}</span>
                    </div>
                    <p className="text-[11px] text-[#C9B99A]/60 mb-2">{person.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {person.knows.map((k, j) => (
                        <span key={j} className="text-[9px] text-[#C9B99A]/40 bg-[#1B2838] rounded px-2 py-0.5">{k}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Critical Evidence */}
            <div className="bg-[rgba(27,40,56,0.6)] border border-[rgba(255,149,0,0.15)] rounded-xl p-6">
              <h3 className="text-sm text-[#F0EBE1] font-medium mb-4 flex items-center gap-2">
                <Search size={16} className="text-[#FF9500]" /> Evidence to Pursue
              </h3>
              <div className="space-y-3">
                {generated.evidence.map((ev, i) => (
                  <div key={i} className="bg-[rgba(21,32,43,0.5)] rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm text-[#F0EBE1] font-medium">{ev.name}</p>
                      <span className="text-[9px] text-[#C9B99A]/40">{ev.category}</span>
                    </div>
                    <p className="text-[11px] text-[#C9B99A]/60 mb-1">{ev.significance}</p>
                    <div className="flex items-start gap-1.5">
                      <AlertTriangle size={10} className="text-[#FF9500]/40 shrink-0 mt-0.5" />
                      <p className="text-[10px] text-[#FF9500]/50">{ev.howToPreserve}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Immediate Steps */}
            {generated.immediateSteps.length > 0 && (
              <div className="bg-gradient-to-br from-[rgba(255,149,0,0.08)] to-[rgba(27,40,56,0.4)] border border-[rgba(255,149,0,0.2)] rounded-xl p-6">
                <h3 className="text-sm text-[#F0EBE1] font-medium mb-3">Immediate Action Steps</h3>
                <div className="space-y-2">
                  {generated.immediateSteps.map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-[rgba(255,149,0,0.15)] border border-[rgba(255,149,0,0.3)] flex items-center justify-center text-[9px] text-[#FF9500] font-bold shrink-0 mt-0.5">{i + 1}</span>
                      <p className="text-xs text-[#C9B99A]/80">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Legal Context */}
            {generated.legalContext && (
              <div className="bg-[rgba(232,80,91,0.05)] border border-[rgba(232,80,91,0.15)] rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <AlertTriangle size={16} className="text-red-400/60 shrink-0 mt-0.5" />
                  <p className="text-xs text-[#C9B99A]/70 leading-relaxed">{generated.legalContext}</p>
                </div>
              </div>
            )}

            {/* Start Investigation Button */}
            <div className="text-center pt-4 pb-8">
              <button
                onClick={handleStartInvestigation}
                className="inline-flex items-center gap-2 rounded-full h-14 px-10 bg-[#FF9500] text-[#1B2838] hover:bg-[#CC6A00] transition-colors font-medium text-base"
                style={{ boxShadow: '0 4px 20px rgba(255,149,0,0.3)' }}
              >
                <Microscope size={20} /> Start Full Investigation <ChevronRight size={18} />
              </button>
              <p className="text-[10px] text-[#C9B99A]/40 mt-2">
                You can ask the AI advisor questions, explore the evidence, build a timeline, and get guided toward answers.
              </p>
            </div>
          </motion.div>
        )}

        {/* Previous Cases */}
        {savedCases.length > 0 && !generated && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-10 border-t border-[rgba(255,149,0,0.08)] pt-8">
            <h3 className="text-sm text-[#F0EBE1] font-medium mb-4">Your Previous Cases</h3>
            <div className="space-y-2">
              {savedCases.slice(0, 5).map((c: any, i) => (
                <button
                  key={i}
                  onClick={() => navigate(`/forensics-lab/investigate/${c.id}`)}
                  className="w-full text-left bg-[rgba(27,40,56,0.4)] border border-[rgba(255,149,0,0.08)] rounded-lg p-4 hover:border-[rgba(255,149,0,0.2)] transition-all"
                >
                  <p className="text-sm text-[#F0EBE1] truncate">{c.title}</p>
                  <p className="text-[10px] text-[#C9B99A]/40 mt-0.5">{c.location} • {c.evidence?.length || 0} evidence items</p>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
