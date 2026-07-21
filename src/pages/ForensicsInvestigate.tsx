import { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Microscope, Send, User, Bot, Clock, Search, Fingerprint, HeartPulse,
  Smartphone, FileText, Award, ArrowLeft, Sparkles, ChevronRight,
  AlertTriangle, CheckCircle, Package, MapPin, ShieldAlert, Lightbulb
} from 'lucide-react'
import { askAIAdvisor, getQuickReply } from '../data/forensics-ai'
import type { GeneratedCase, AIResponse } from '../data/forensics-ai'

interface ChatMessage {
  id: string
  role: 'user' | 'ai'
  text: string
  suggestedTools?: string[]
  nextSteps?: string[]
  warnings?: string[]
}

export default function ForensicsInvestigate() {
  const { caseId } = useParams()
  const navigate = useNavigate()
  const chatEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Load case from localStorage
  const [caseData, setCaseData] = useState<GeneratedCase | null>(() => {
    const saved = localStorage.getItem('forensics-cases')
    if (!saved) return null
    const cases = JSON.parse(saved)
    return cases.find((c: any) => c.id === caseId) || null
  })

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (!caseData) return []
    return [{
      id: 'welcome',
      role: 'ai',
      text: `**Case Analysis Complete.**\n\nI've analyzed your situation at **${caseData.location}**. Here's what I found:\n\n• **${caseData.evidence.length} evidence categories** to pursue\n• **${caseData.people.length} key parties** identified\n• **${caseData.timeline.length} timeline events** mapped\n\n**Your immediate priority:** ${caseData.immediateSteps[0]}\n\nAsk me anything about your case. I can help you:\n- Understand what evidence matters most\n- Figure out how to preserve evidence\n- Analyze the timeline for gaps\n- Know your rights\n- Determine next steps\n\nWhat would you like to investigate first?`,
      suggestedTools: ['evidence', 'timeline'],
    }]
  })

  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [activePanel, setActivePanel] = useState<'chat' | 'evidence' | 'timeline' | 'conclusion'>('chat')
  const [timelineOrder, setTimelineOrder] = useState<string[]>(() =>
    caseData ? [...caseData.timeline].sort(() => Math.random() - 0.5).map(t => t.time) : []
  )
  const [conclusion, setConclusion] = useState('')
  const [showDisclaimer, setShowDisclaimer] = useState(true)

  // Scroll to bottom on new messages
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const sendMessage = async (text: string) => {
    if (!text.trim() || !caseData) return

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    // Simulate AI thinking
    await new Promise(r => setTimeout(r, 1000 + Math.random() * 1000))

    const response = askAIAdvisor(text, caseData)
    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'ai',
      text: response.text,
      suggestedTools: response.suggestedTools,
      nextSteps: response.nextSteps,
      warnings: response.warnings,
    }
    setMessages(prev => [...prev, aiMsg])
    setIsTyping(false)
  }

  const handleQuickReply = (type: string) => {
    if (!caseData) return
    const reply = getQuickReply(type, caseData)
    const aiMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'ai',
      text: reply,
      suggestedTools: ['evidence', 'timeline'],
    }
    setMessages(prev => [...prev, aiMsg])
  }

  if (!caseData) {
    return (
      <div className="min-h-screen bg-[#05080e] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#C9B99A]/50 mb-4">Case not found. Create a new investigation.</p>
          <button onClick={() => navigate('/forensics-lab/create')} className="rounded-full h-12 px-8 bg-[#FF9500] text-[#1B2838] hover:bg-[#CC6A00] transition-colors font-medium">
            Create New Case
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#05080e] flex flex-col h-screen overflow-hidden">
      {/* Disclaimer */}
      <AnimatePresence>
        {showDisclaimer && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-[#0C1520] border border-[rgba(255,149,0,0.3)] rounded-xl p-6 max-w-lg w-full">
              <div className="flex items-center gap-3 mb-4">
                <ShieldAlert size={24} className="text-[#FF9500]" />
                <h2 className="text-lg text-[#F0EBE1] font-medium">Educational Tool Only</h2>
              </div>
              <div className="space-y-3 text-sm text-[#C9B99A]/70 mb-6">
                <p><strong className="text-[#F0EBE1]">{caseData.title}</strong> is a fictional forensic training analysis based on your description.</p>
                <p>This is <strong className="text-[#F0EBE1]">not</strong> legal advice. It is designed to help you think systematically about evidence and organize your thoughts.</p>
                <p>Always consult a qualified attorney for legal matters.</p>
              </div>
              <button onClick={() => setShowDisclaimer(false)} className="w-full h-12 bg-[#FF9500] text-[#1B2838] rounded-full font-medium hover:bg-[#CC6A00] transition-colors">
                I Understand
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="shrink-0 bg-[#0A0F1A]/95 backdrop-blur-md border-b border-[rgba(255,149,0,0.1)] px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/forensics-lab')} className="text-xs text-[#C9B99A] hover:text-[#FF9500] transition-colors">
              <ArrowLeft size={14} />
            </button>
            <div>
              <p className="text-xs text-[#FF9500] font-medium truncate max-w-[200px] sm:max-w-md">{caseData.title}</p>
              <p className="text-[9px] text-[#C9B99A]/40">{caseData.location} • AI Investigation</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {['chat', 'evidence', 'timeline', 'conclusion'].map(panel => (
              <button
                key={panel}
                onClick={() => setActivePanel(panel as any)}
                className={`px-3 py-1.5 rounded-lg text-[10px] transition-colors ${
                  activePanel === panel ? 'bg-[rgba(255,149,0,0.15)] text-[#FF9500]' : 'text-[#C9B99A]/40 hover:text-[#C9B99A]'
                }`}
              >
                {panel === 'chat' && 'Advisor'}
                {panel === 'evidence' && 'Evidence'}
                {panel === 'timeline' && 'Timeline'}
                {panel === 'conclusion' && 'Conclusion'}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden max-w-7xl mx-auto w-full">
        {/* AI CHAT PANEL */}
        <div className={`flex flex-col ${activePanel === 'chat' ? 'flex-1' : 'hidden lg:flex w-[45%]'} border-r border-[rgba(255,149,0,0.08)]`}>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(msg => (
              <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === 'user' ? 'bg-[#C9B99A]/20' : 'bg-[rgba(255,149,0,0.15)]'
                }`}>
                  {msg.role === 'user' ? <User size={14} className="text-[#C9B99A]" /> : <Bot size={14} className="text-[#FF9500]" />}
                </div>
                <div className={`max-w-[85%] rounded-xl px-4 py-3 ${
                  msg.role === 'user'
                    ? 'bg-[rgba(255,149,0,0.1)] border border-[rgba(255,149,0,0.15)]'
                    : 'bg-[rgba(27,40,56,0.6)] border border-[rgba(255,149,0,0.08)]'
                }`}>
                  <div className="text-sm text-[#F0EBE1] whitespace-pre-wrap leading-relaxed" dangerouslySetInnerHTML={{
                    __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#FF9500]">$1</strong>').replace(/\n/g, '<br/>')
                  }} />

                  {/* Warnings */}
                  {msg.warnings && msg.warnings.length > 0 && (
                    <div className="mt-3 space-y-1.5">
                      {msg.warnings.map((w, i) => (
                        <div key={i} className="flex items-start gap-1.5 bg-red-500/5 border border-red-500/15 rounded-lg p-2">
                          <AlertTriangle size={12} className="text-red-400/60 shrink-0 mt-0.5" />
                          <p className="text-[10px] text-red-400/70">{w}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Next Steps */}
                  {msg.nextSteps && msg.nextSteps.length > 0 && (
                    <div className="mt-3">
                      <p className="text-[10px] text-[#FF9500]/60 uppercase tracking-wider mb-1.5">Suggested Next Steps</p>
                      <div className="space-y-1">
                        {msg.nextSteps.slice(0, 3).map((step, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="text-[10px] text-[#FF9500] font-bold shrink-0">{i + 1}.</span>
                            <p className="text-[11px] text-[#C9B99A]/70">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-[rgba(255,149,0,0.15)] flex items-center justify-center">
                  <Bot size={14} className="text-[#FF9500]" />
                </div>
                <div className="bg-[rgba(27,40,56,0.6)] border border-[rgba(255,149,0,0.08)] rounded-xl px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#FF9500]/40 animate-pulse" />
                    <span className="w-2 h-2 rounded-full bg-[#FF9500]/40 animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <span className="w-2 h-2 rounded-full bg-[#FF9500]/40 animate-pulse" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </div>
            )}

            {/* Quick Reply Buttons */}
            {!isTyping && messages.length > 0 && messages[messages.length - 1].role === 'ai' && (
              <div className="flex flex-wrap gap-2 pl-10">
                {[
                  { label: 'What evidence first?', type: 'evidence-first' },
                  { label: 'Build timeline', type: 'timeline' },
                  { label: 'Know my rights', type: 'rights' },
                  { label: 'Preserve evidence', type: 'preserve' },
                  { label: 'Find an attorney', type: 'attorney' },
                ].map(q => (
                  <button
                    key={q.type}
                    onClick={() => handleQuickReply(q.type)}
                    className="text-[10px] px-3 py-1.5 rounded-full bg-[rgba(255,149,0,0.08)] border border-[rgba(255,149,0,0.15)] text-[#FF9500]/70 hover:bg-[rgba(255,149,0,0.15)] hover:text-[#FF9500] transition-colors"
                  >
                    {q.label}
                  </button>
                ))}
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="shrink-0 p-4 border-t border-[rgba(255,149,0,0.08)]">
            <div className="flex items-center gap-2 bg-[rgba(27,40,56,0.6)] border border-[rgba(255,149,0,0.15)] rounded-full px-4 py-2">
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
                placeholder="Ask about evidence, rights, timeline, next steps..."
                className="flex-1 bg-transparent text-sm text-[#F0EBE1] placeholder:text-[#C9B99A]/25 focus:outline-none"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isTyping}
                className="w-8 h-8 rounded-full bg-[#FF9500] text-[#1B2838] flex items-center justify-center hover:bg-[#CC6A00] transition-colors disabled:opacity-30"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* EVIDENCE PANEL */}
        <div className={`${activePanel === 'evidence' ? 'flex-1' : 'hidden'} lg:${activePanel === 'chat' ? 'flex w-[55%]' : 'hidden'} overflow-y-auto p-4`}>
          <div className="max-w-lg mx-auto">
            <h3 className="text-base text-[#F0EBE1] font-medium mb-4 flex items-center gap-2">
              <Package size={16} className="text-[#FF9500]" /> Evidence to Pursue
            </h3>
            <div className="space-y-3">
              {caseData.evidence.map((ev, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-[rgba(27,40,56,0.6)] border border-[rgba(255,149,0,0.1)] rounded-xl p-4 hover:border-[rgba(255,149,0,0.25)] transition-all"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-sm text-[#F0EBE1] font-medium">{ev.name}</p>
                    <span className="text-[9px] text-[#C9B99A]/40 bg-[#1B2838] rounded-full px-2 py-0.5">{ev.category}</span>
                  </div>
                  <p className="text-[11px] text-[#C9B99A]/60 mb-2">{ev.significance}</p>
                  <div className="bg-[rgba(255,149,0,0.05)] border border-[rgba(255,149,0,0.1)] rounded-lg p-2.5">
                    <p className="text-[10px] text-[#FF9500]/60 flex items-start gap-1.5">
                      <Lightbulb size={10} className="shrink-0 mt-0.5" />
                      {ev.howToPreserve}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* People */}
            <h3 className="text-base text-[#F0EBE1] font-medium mt-8 mb-4 flex items-center gap-2">
              <User size={16} className="text-[#FF9500]" /> Key People
            </h3>
            <div className="space-y-2">
              {caseData.people.map((person, i) => (
                <div key={i} className="bg-[rgba(27,40,56,0.4)] border border-[rgba(255,149,0,0.08)] rounded-lg p-3">
                  <p className="text-sm text-[#F0EBE1]">{person.name}</p>
                  <p className="text-[10px] text-[#FF9500]/50">{person.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TIMELINE PANEL */}
        <div className={`${activePanel === 'timeline' ? 'flex-1' : 'hidden'} overflow-y-auto p-4`}>
          <div className="max-w-lg mx-auto">
            <h3 className="text-base text-[#F0EBE1] font-medium mb-4 flex items-center gap-2">
              <Clock size={16} className="text-[#FF9500]" /> Timeline Builder
            </h3>
            <p className="text-xs text-[#C9B99A]/50 mb-4">
              Arrange events in the order you believe they occurred. This helps identify gaps and contradictions.
            </p>
            <div className="space-y-2 mb-6">
              {caseData.timeline.map((event, i) => (
                <div key={i} className="bg-[rgba(27,40,56,0.6)] border border-[rgba(255,149,0,0.1)] rounded-lg p-3 flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${
                    event.certainty === 'confirmed' ? 'bg-green-400' :
                    event.certainty === 'estimated' ? 'bg-yellow-400' : 'bg-[#C9B99A]/30'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm text-[#F0EBE1]">{event.event}</p>
                    <div className="flex items-center gap-2 text-[10px] text-[#C9B99A]/40">
                      <span>{event.time}</span>
                      <span>•</span>
                      <span className={`${
                        event.certainty === 'confirmed' ? 'text-green-400/60' :
                        event.certainty === 'estimated' ? 'text-yellow-400/60' : 'text-[#C9B99A]/30'
                      }`}>{event.certainty}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                const aiMsg: ChatMessage = {
                  id: Date.now().toString(),
                  role: 'ai',
                  text: `**Timeline Analysis:**\n\nI've mapped ${caseData.timeline.length} events. Look for:\n\n1. **Gaps** — Missing time periods where evidence may have been overlooked\n2. **Inconsistencies** — Events that contradict witness statements or physical evidence\n3. **Anchor points** — Events you can prove with documents, receipts, or recordings\n\nUse your phone records, receipts, and any documented communications to anchor specific times. The more anchor points you have, the stronger your timeline.`,
                  nextSteps: ['Request dispatch records for exact times', 'Check phone location data', 'Review receipts for timestamped transactions'],
                }
                setMessages(prev => [...prev, aiMsg])
                setActivePanel('chat')
              }}
              className="w-full flex items-center justify-center gap-2 rounded-full h-10 bg-[rgba(255,149,0,0.1)] border border-[rgba(255,149,0,0.2)] text-[#FF9500] hover:bg-[rgba(255,149,0,0.2)] transition-colors text-sm"
            >
              <Sparkles size={14} /> Ask AI to Analyze Timeline
            </button>
          </div>
        </div>

        {/* CONCLUSION PANEL */}
        <div className={`${activePanel === 'conclusion' ? 'flex-1' : 'hidden'} overflow-y-auto p-4`}>
          <div className="max-w-lg mx-auto">
            <h3 className="text-base text-[#F0EBE1] font-medium mb-4 flex items-center gap-2">
              <Award size={16} className="text-[#FF9500]" /> Build Your Conclusion
            </h3>
            <p className="text-xs text-[#C9B99A]/50 mb-4">
              Based on your investigation, what do you believe happened? Be specific about what evidence supports each claim.
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="text-sm text-[#F0EBE1] mb-1.5 block">What happened?</label>
                <textarea
                  value={conclusion}
                  onChange={e => setConclusion(e.target.value)}
                  placeholder="Based on the evidence, I believe..."
                  rows={4}
                  className="w-full bg-[rgba(21,32,43,0.6)] border border-[rgba(255,149,0,0.15)] rounded-lg px-4 py-2.5 text-sm text-[#F0EBE1] placeholder:text-[#C9B99A]/25 focus:outline-none focus:border-[rgba(255,149,0,0.4)] resize-none"
                />
              </div>

              <div className="bg-[rgba(255,149,0,0.05)] border border-[rgba(255,149,0,0.1)] rounded-lg p-4">
                <p className="text-[10px] text-[#FF9500]/60 uppercase tracking-wider mb-2">AI Guidance</p>
                <p className="text-xs text-[#C9B99A]/70 leading-relaxed">
                  A strong conclusion distinguishes between: (1) <strong className="text-[#F0EBE1]">Facts you can prove</strong> with evidence, 
                  (2) <strong className="text-[#F0EBE1]">Reasonable inferences</strong> supported by facts, and 
                  (3) <strong className="text-[#F0EBE1]">What remains unknown</strong>. The most credible investigators are honest about uncertainty.
                </p>
              </div>

              {caseData.immediateSteps.length > 0 && (
                <div>
                  <p className="text-[10px] text-[#FF9500]/60 uppercase tracking-wider mb-2">Your Action Plan</p>
                  <div className="space-y-2">
                    {caseData.immediateSteps.map((step, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle size={12} className="text-[#FF9500]/40 shrink-0 mt-0.5" />
                        <p className="text-xs text-[#C9B99A]/70">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {caseData.legalContext && (
                <div className="bg-[rgba(232,80,91,0.05)] border border-[rgba(232,80,91,0.15)] rounded-lg p-3">
                  <p className="text-xs text-[#C9B99A]/70 flex items-start gap-2">
                    <AlertTriangle size={12} className="text-red-400/60 shrink-0 mt-0.5" />
                    {caseData.legalContext}
                  </p>
                </div>
              )}
            </div>

            <div className="bg-gradient-to-br from-[rgba(255,149,0,0.08)] to-[rgba(27,40,56,0.4)] border border-[rgba(255,149,0,0.2)] rounded-xl p-6 text-center">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#FF9500]/60 mb-1">#TheKingsTake</p>
              <p className="text-sm text-[#F0EBE1] font-medium mb-1">Forensic Investigation Complete</p>
              <p className="text-xs text-[#C9B99A]/50">{caseData.title}</p>
              <p className="text-xs text-[#C9B99A]/40 mt-1">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
