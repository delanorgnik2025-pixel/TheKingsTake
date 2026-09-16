import { FormEvent, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { Bot, MessageCircle, Send, X } from 'lucide-react'
import { trpc } from '@/providers/trpc'

type Message = { role: 'guide' | 'visitor'; text: string }

function getSessionId() {
  const key = 'tktVisitorSession'
  let value = sessionStorage.getItem(key)
  if (!value) {
    value = crypto.randomUUID().replaceAll('-', '')
    sessionStorage.setItem(key, value)
  }
  return value
}

export default function VisitorAssistant() {
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([{ role: 'guide', text: "Welcome to The King's Take. I can help you find the book, community, history resources, or the right service. What brings you here today?" }])
  const [showLead, setShowLead] = useState(false)
  const [lead, setLead] = useState({ name: '', email: '', interest: 'General information', message: '' })
  const [leadSent, setLeadSent] = useState(false)
  const track = trpc.engagement.trackVisit.useMutation()
  const ask = trpc.engagement.askGuide.useMutation()
  const captureLead = trpc.engagement.captureLead.useMutation()

  useEffect(() => {
    if (location.pathname.startsWith('/admin')) return
    const sendHeartbeat = () => track.mutate({ sessionId: getSessionId(), path: location.pathname, referrer: document.referrer || undefined })
    sendHeartbeat()
    const timer = window.setInterval(sendHeartbeat, 60_000)
    return () => window.clearInterval(timer)
  }, [location.pathname])

  if (location.pathname.startsWith('/admin')) return null

  const send = async (event?: FormEvent, preset?: string) => {
    event?.preventDefault()
    const text = (preset || input).trim()
    if (!text || ask.isPending) return
    setMessages(current => [...current, { role: 'visitor', text }])
    setInput('')
    const result = await ask.mutateAsync({ message: text, currentPath: location.pathname }).catch(() => ({ answer: 'I can help you find the feed, book, services, or contact page. Please choose an option below.' }))
    setMessages(current => [...current, { role: 'guide', text: result.answer }])
  }

  const submitLead = async (event: FormEvent) => {
    event.preventDefault()
    await captureLead.mutateAsync({ ...lead, sourcePage: location.pathname, consent: true })
    setLeadSent(true)
  }

  return (
    <>
      {open && <div className="fixed bottom-24 right-4 z-[90] flex h-[min(620px,75vh)] w-[min(390px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-[#FF9500]/30 bg-[#182635] shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 bg-[#25364B] p-4">
          <div className="flex items-center gap-2"><Bot className="text-[#FF9500]" size={20}/><div><p className="text-sm font-semibold text-[#F0EBE1]">The Royal Guide</p><p className="text-[10px] text-[#C9B99A]">Website navigation & assistance</p></div></div>
          <button onClick={() => setOpen(false)} className="text-[#C9B99A]" aria-label="Close assistant"><X size={18}/></button>
        </div>
        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {messages.map((message, index) => <div key={index} className={`max-w-[88%] rounded-xl px-3 py-2 text-sm leading-relaxed ${message.role === 'guide' ? 'bg-white/[0.06] text-[#F0EBE1]' : 'ml-auto bg-[#FF9500] text-[#182635]'}`}>{message.text}</div>)}
          {ask.isPending && <div className="text-xs text-[#C9B99A]">The Royal Guide is responding…</div>}
          <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
            <Link to="/pre-order" className="rounded border border-[#FF9500]/30 p-2 text-center text-[#FFB840]">The Book</Link>
            <Link to="/feed" className="rounded border border-[#FF9500]/30 p-2 text-center text-[#FFB840]">Royal Circle</Link>
            <Link to="/writing-services" className="rounded border border-[#FF9500]/30 p-2 text-center text-[#FFB840]">Writing Help</Link>
            <button onClick={() => setShowLead(true)} className="rounded border border-[#FF9500]/30 p-2 text-[#FFB840]">Contact Me</button>
          </div>
          {showLead && <form onSubmit={submitLead} className="space-y-2 rounded-xl border border-white/10 p-3">
            {leadSent ? <p className="text-sm text-emerald-300">Thank you. Your request was received.</p> : <>
              <p className="text-xs text-[#C9B99A]">Leave your information only if you would like a personal response.</p>
              <input required value={lead.name} onChange={e => setLead({ ...lead, name: e.target.value })} placeholder="Name" className="w-full rounded bg-[#0f1b29] px-3 py-2 text-sm text-white"/>
              <input required type="email" value={lead.email} onChange={e => setLead({ ...lead, email: e.target.value })} placeholder="Email" className="w-full rounded bg-[#0f1b29] px-3 py-2 text-sm text-white"/>
              <select value={lead.interest} onChange={e => setLead({ ...lead, interest: e.target.value })} className="w-full rounded bg-[#0f1b29] px-3 py-2 text-sm text-white">
                <option>General information</option><option>Book preorder</option><option>Writing services</option><option>Consultation</option><option>Media partnership</option><option>Royal Circle membership</option>
              </select>
              <textarea value={lead.message} onChange={e => setLead({ ...lead, message: e.target.value })} placeholder="How can we help?" className="w-full rounded bg-[#0f1b29] px-3 py-2 text-sm text-white"/>
              <p className="text-[10px] text-[#C9B99A]">Submitting authorizes AASOTU Media Group LLC to respond to this request. It does not subscribe you to marketing emails.</p>
              <button disabled={captureLead.isPending} className="w-full rounded bg-[#FF9500] py-2 text-sm font-bold text-[#182635]">Send Request</button>
            </>}
          </form>}
        </div>
        <form onSubmit={send} className="flex gap-2 border-t border-white/10 p-3">
          <input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask where to find something…" className="min-w-0 flex-1 rounded-lg bg-[#0f1b29] px-3 py-2 text-sm text-white outline-none"/>
          <button disabled={!input.trim() || ask.isPending} className="rounded-lg bg-[#FF9500] p-2 text-[#182635] disabled:opacity-40" aria-label="Send"><Send size={18}/></button>
        </form>
      </div>}
      <button onClick={() => setOpen(value => !value)} className="fixed bottom-5 right-5 z-[90] flex h-14 w-14 items-center justify-center rounded-full bg-[#FF9500] text-[#182635] shadow-xl" aria-label="Open website assistant">
        {open ? <X/> : <MessageCircle/>}
      </button>
    </>
  )
}
