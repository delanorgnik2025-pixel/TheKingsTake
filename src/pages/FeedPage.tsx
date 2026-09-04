import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import MuxPlayer from '@mux/mux-player-react'
import {
  Crown, Heart, Link2, Image as ImageIcon, Video, Radio, Pin, PinOff, Trash2,
  Send, Copy, Check, Loader2, Square, ArrowLeft, ExternalLink, RefreshCw,
} from 'lucide-react'
import { trpc } from '@/providers/trpc'
import NewsTicker from '@/components/NewsTicker'
import TrendingRail from '@/components/TrendingRail'
import FeedBackdrop from '@/components/FeedBackdrop'

// ─── helpers ──────────────────────────────────────────────────────────────────
function timeAgo(date: Date | string): string {
  const d = new Date(date)
  const s = Math.floor((Date.now() - d.getTime()) / 1000)
  if (s < 60) return 'just now'
  if (s < 3600) return `${Math.floor(s / 60)}m ago`
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`
  if (s < 604800) return `${Math.floor(s / 86400)}d ago`
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function linkify(text: string) {
  const parts = text.split(/(https?:\/\/[^\s]+)/g)
  return parts.map((p, i) =>
    /^https?:\/\//.test(p) ? (
      <a key={i} href={p} target="_blank" rel="noopener noreferrer" className="text-[#FFB840] hover:underline break-all">{p}</a>
    ) : (
      <span key={i}>{p}</span>
    )
  )
}

function embedUrl(url: string): string {
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([\w-]{6,})/)
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`
  const vm = url.match(/vimeo\.com\/(\d+)/)
  if (vm) return `https://player.vimeo.com/video/${vm[1]}`
  return url
}

type FeedPost = {
  id: number
  body: string
  linkUrl: string | null
  linkTitle: string | null
  imageUrl: string | null
  videoUrl: string | null
  videoType: 'upload' | 'embed' | 'mux' | null
  muxPlaybackId: string | null
  pinned: boolean
  likesCount: number
  createdAt: Date | string
}

// ─── page ─────────────────────────────────────────────────────────────────────
export default function FeedPage() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [offset, setOffset] = useState(0)
  const [allPosts, setAllPosts] = useState<FeedPost[]>([])
  const PAGE = 10

  useEffect(() => {
    setIsAdmin(!!localStorage.getItem('adminToken'))
  }, [])

  const utils = trpc.useUtils()
  const { data, isLoading } = trpc.feed.list.useQuery({ limit: PAGE, offset })
  const liveStatus = trpc.live.status.useQuery(undefined, { refetchInterval: 15000 })

  useEffect(() => {
    if (data?.posts) {
      setAllPosts((prev) => {
        const ids = new Set(prev.map((p) => p.id))
        const fresh = (data.posts as unknown as FeedPost[]).filter((p) => !ids.has(p.id))
        return offset === 0 ? (data.posts as unknown as FeedPost[]) : [...prev, ...fresh]
      })
    }
  }, [data])

  const refresh = () => {
    setOffset(0)
    setAllPosts([])
    utils.feed.list.invalidate()
  }

  return (
    <div className="min-h-screen bg-[#182635] relative">
      <FeedBackdrop />

      <div className="relative z-10 pt-16">
        <NewsTicker />
      </div>

      {/* Header */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 pt-10 pb-8 text-center">
        <Link to="/" className="inline-flex items-center gap-2 text-[#C9B99A] text-xs uppercase tracking-[0.2em] hover:text-[#FF9500] transition-colors mb-8">
          <ArrowLeft size={14} /> Home
        </Link>
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <Crown className="text-[#FF9500]" size={40} />
            <div className="absolute inset-0 blur-xl bg-[rgba(255,149,0,0.45)] -z-10 rounded-full" />
          </div>
          <h1
            className="text-4xl sm:text-5xl text-[#F0EBE1]"
            style={{ fontFamily: 'Newsreader, serif', textShadow: '0 0 40px rgba(255,149,0,0.35)' }}
          >
            The Feed
          </h1>
          <p className="text-[#C9B99A] text-sm sm:text-base max-w-xl">
            Dispatches from <span className="text-[#FFB840] font-semibold">#TheKingsTake</span> — news, commentary, and live broadcasts. No algorithm in between.
          </p>
          <div className="h-px w-40 mt-2 bg-gradient-to-r from-transparent via-[#FF9500] to-transparent" />
        </div>
      </div>

      {/* Trending rail */}
      <div className="relative z-10">
        <TrendingRail />
      </div>

      {/* Live broadcast */}
      {liveStatus.data?.live && liveStatus.data.playbackId && (
        <div className="relative z-10 max-w-2xl mx-auto px-4 mb-6">
          <div className="rounded-lg overflow-hidden border border-[rgba(255,60,60,0.4)] bg-[#25364B]" style={{ boxShadow: '0 0 40px rgba(255,60,60,0.15)' }}>
            <div className="flex items-center gap-2 px-4 py-2.5 bg-[rgba(255,60,60,0.1)]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
              </span>
              <span className="text-red-400 text-xs font-bold uppercase tracking-[0.2em]">Live Now</span>
              <span className="text-[#F0EBE1] text-sm truncate">{liveStatus.data.title}</span>
            </div>
            <MuxPlayer
              playbackId={liveStatus.data.playbackId}
              streamType="live"
              autoPlay="muted"
              accentColor="#FF9500"
              style={{ width: '100%', aspectRatio: '16/9' }}
            />
          </div>
        </div>
      )}

      {/* Admin composer + go live */}
      {isAdmin && (
        <div className="relative z-10 max-w-2xl mx-auto px-4 mb-6 space-y-4">
          <FeedComposer onPosted={refresh} />
          <GoLivePanel />
        </div>
      )}

      {/* Timeline */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 pb-20 space-y-5">
        {isLoading && offset === 0 && (
          <div className="text-center py-16 text-[#C9B99A]"><Loader2 className="animate-spin inline-block mr-2" size={18} />Loading the feed…</div>
        )}
        {!isLoading && allPosts.length === 0 && (
          <div className="text-center py-16 border border-dashed border-[rgba(255,149,0,0.25)] rounded-lg">
            <Crown className="mx-auto text-[#FF9500] mb-3" size={32} />
            <p className="text-[#F0EBE1] text-lg" style={{ fontFamily: 'Newsreader, serif' }}>The feed opens soon.</p>
            <p className="text-[#C9B99A] text-sm mt-1">The first dispatch is being prepared. Check back shortly.</p>
          </div>
        )}
        {allPosts.map((post) => (
          <PostCard key={post.id} post={post} isAdmin={isAdmin} onChanged={refresh} />
        ))}
        {allPosts.length > 0 && allPosts.length % PAGE === 0 && (
          <button
            onClick={() => setOffset(allPosts.length)}
            className="w-full py-3 rounded border border-[rgba(255,149,0,0.3)] text-[#FFB840] text-sm uppercase tracking-[0.15em] hover:bg-[rgba(255,149,0,0.08)] transition-colors"
          >
            Load older posts
          </button>
        )}
      </div>
    </div>
  )
}

// ─── admin composer ───────────────────────────────────────────────────────────
function FeedComposer({ onPosted }: { onPosted: () => void }) {
  const [body, setBody] = useState('')
  const [linkUrl, setLinkUrl] = useState('')
  const [linkTitle, setLinkTitle] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [videoMode, setVideoMode] = useState<'none' | 'embed' | 'file'>('none')
  const [embedVideoUrl, setEmbedVideoUrl] = useState('')
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [uploadPct, setUploadPct] = useState<number | null>(null)
  const [status, setStatus] = useState('')
  const [showExtras, setShowExtras] = useState<'none' | 'link' | 'image' | 'video'>('none')
  const pendingRef = useRef<{ uploadId: string } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const createMutation = trpc.feed.create.useMutation()
  const uploadUrlMutation = trpc.feed.createVideoUpload.useMutation()
  const confirmMutation = trpc.feed.confirmVideoUpload.useMutation()

  const busy = createMutation.isPending || uploadUrlMutation.isPending || confirmMutation.isPending || uploadPct !== null

  const reset = () => {
    setBody(''); setLinkUrl(''); setLinkTitle(''); setImageUrl('')
    setVideoMode('none'); setEmbedVideoUrl(''); setVideoFile(null)
    setUploadPct(null); setStatus(''); setShowExtras('none')
    pendingRef.current = null
  }

  const finishMuxPost = async (uploadId: string, text: string) => {
    for (let attempt = 0; attempt < 15; attempt++) {
      setStatus(attempt === 0 ? 'Processing video…' : `Processing video… (${attempt + 1})`)
      const res = await confirmMutation.mutateAsync({ uploadId, body: text })
      if (res.ready) {
        setStatus('')
        reset()
        onPosted()
        return
      }
      await new Promise((r) => setTimeout(r, 4000))
    }
    setStatus('Video is still processing on Mux. Your text is saved below — press Post again in a minute to finish publishing.')
    pendingRef.current = { uploadId }
    setUploadPct(null)
  }

  const submit = async () => {
    const text = body.trim()
    if (!text) return
    setStatus('')

    // Retry path for a previously uploaded video
    if (pendingRef.current && videoMode === 'file') {
      await finishMuxPost(pendingRef.current.uploadId, text)
      return
    }

    if (videoMode === 'file' && videoFile) {
      try {
        setStatus('Preparing upload…')
        const { uploadId, uploadUrl } = await uploadUrlMutation.mutateAsync({ corsOrigin: '*' })
        await new Promise<void>((resolve, reject) => {
          const xhr = new XMLHttpRequest()
          xhr.open('PUT', uploadUrl)
          xhr.setRequestHeader('Content-Type', videoFile.type || 'application/octet-stream')
          xhr.upload.onprogress = (e) => {
            if (e.lengthComputable) setUploadPct(Math.round((e.loaded / e.total) * 100))
          }
          xhr.onload = () => (xhr.status >= 200 && xhr.status < 300 ? resolve() : reject(new Error(`Upload failed (${xhr.status})`)))
          xhr.onerror = () => reject(new Error('Upload failed — network error'))
          xhr.send(videoFile)
        })
        pendingRef.current = { uploadId }
        await finishMuxPost(uploadId, text)
      } catch (err: any) {
        setStatus(err?.message || 'Upload failed')
        setUploadPct(null)
      }
      return
    }

    try {
      await createMutation.mutateAsync({
        body: text,
        linkUrl: linkUrl.trim() || '',
        linkTitle: linkTitle.trim() || undefined,
        imageUrl: imageUrl.trim() || '',
        videoUrl: videoMode === 'embed' ? embedVideoUrl.trim() : '',
        videoType: videoMode === 'embed' ? 'embed' : 'upload',
      })
      reset()
      onPosted()
    } catch (err: any) {
      setStatus(err?.message || 'Could not publish post')
    }
  }

  return (
    <div className="rounded-lg border border-[rgba(255,149,0,0.25)] bg-[#25364B] p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-[rgba(255,149,0,0.15)] border border-[rgba(255,149,0,0.4)] flex items-center justify-center">
          <Crown size={18} className="text-[#FF9500]" />
        </div>
        <div>
          <p className="text-[#F0EBE1] text-sm font-medium">Ronald Lee King</p>
          <p className="text-[#C9B99A] text-[11px] uppercase tracking-[0.15em]">Posting to #TheKingsTake</p>
        </div>
      </div>

      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="What's the take today? Share news, a link, a video…"
        rows={3}
        className="w-full bg-[#182635] border border-[rgba(255,149,0,0.2)] rounded px-3 py-2.5 text-[#F0EBE1] text-sm placeholder-[#C9B99A]/40 focus:outline-none focus:border-[#FF9500] resize-y"
      />

      {showExtras === 'link' && (
        <div className="mt-2 space-y-2">
          <input value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} placeholder="Link URL (https://…)"
            className="w-full bg-[#182635] border border-[rgba(255,149,0,0.2)] rounded px-3 py-2 text-[#F0EBE1] text-sm focus:outline-none focus:border-[#FF9500]" />
          <input value={linkTitle} onChange={(e) => setLinkTitle(e.target.value)} placeholder="Headline for this link (optional)"
            className="w-full bg-[#182635] border border-[rgba(255,149,0,0.2)] rounded px-3 py-2 text-[#F0EBE1] text-sm focus:outline-none focus:border-[#FF9500]" />
        </div>
      )}
      {showExtras === 'image' && (
        <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Image URL (https://…)"
          className="mt-2 w-full bg-[#182635] border border-[rgba(255,149,0,0.2)] rounded px-3 py-2 text-[#F0EBE1] text-sm focus:outline-none focus:border-[#FF9500]" />
      )}
      {showExtras === 'video' && (
        <div className="mt-2 space-y-2">
          <div className="flex gap-2">
            <button onClick={() => setVideoMode('embed')} className={`flex-1 py-1.5 text-xs rounded border ${videoMode === 'embed' ? 'border-[#FF9500] text-[#FFB840] bg-[rgba(255,149,0,0.1)]' : 'border-[rgba(255,149,0,0.2)] text-[#C9B99A]'}`}>YouTube / Vimeo link</button>
            <button onClick={() => setVideoMode('file')} className={`flex-1 py-1.5 text-xs rounded border ${videoMode === 'file' ? 'border-[#FF9500] text-[#FFB840] bg-[rgba(255,149,0,0.1)]' : 'border-[rgba(255,149,0,0.2)] text-[#C9B99A]'}`}>Upload video file</button>
          </div>
          {videoMode === 'embed' && (
            <input value={embedVideoUrl} onChange={(e) => setEmbedVideoUrl(e.target.value)} placeholder="Paste YouTube or Vimeo URL"
              className="w-full bg-[#182635] border border-[rgba(255,149,0,0.2)] rounded px-3 py-2 text-[#F0EBE1] text-sm focus:outline-none focus:border-[#FF9500]" />
          )}
          {videoMode === 'file' && (
            <div>
              <input ref={fileInputRef} type="file" accept="video/*" className="hidden" onChange={(e) => setVideoFile(e.target.files?.[0] ?? null)} />
              <button onClick={() => fileInputRef.current?.click()} className="w-full py-2.5 border border-dashed border-[rgba(255,149,0,0.35)] rounded text-[#C9B99A] text-sm hover:border-[#FF9500] hover:text-[#FFB840] transition-colors">
                {videoFile ? `${videoFile.name} (${(videoFile.size / 1024 / 1024).toFixed(1)} MB)` : 'Choose a video from this device'}
              </button>
            </div>
          )}
        </div>
      )}

      {uploadPct !== null && (
        <div className="mt-3">
          <div className="h-1.5 bg-[#182635] rounded overflow-hidden">
            <div className="h-full bg-[#FF9500] transition-all" style={{ width: `${uploadPct}%` }} />
          </div>
          <p className="text-[#C9B99A] text-xs mt-1">Uploading… {uploadPct}%</p>
        </div>
      )}
      {status && <p className="text-[#FFB840] text-xs mt-2">{status}</p>}

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-[rgba(240,235,225,0.08)]">
        <div className="flex gap-1">
          {([
            ['link', Link2, 'Add link'],
            ['image', ImageIcon, 'Add image'],
            ['video', Video, 'Add video'],
          ] as const).map(([key, Icon, title]) => (
            <button key={key} title={title} onClick={() => setShowExtras(showExtras === key ? 'none' : key)}
              className={`p-2 rounded transition-colors ${showExtras === key ? 'text-[#FF9500] bg-[rgba(255,149,0,0.12)]' : 'text-[#C9B99A] hover:text-[#FF9500]'}`}>
              <Icon size={17} />
            </button>
          ))}
        </div>
        <button
          onClick={submit}
          disabled={busy || !body.trim()}
          className="flex items-center gap-2 px-5 py-2 bg-[#FF9500] text-[#182635] text-sm font-semibold rounded hover:bg-[#FFB840] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {busy ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />} Post
        </button>
      </div>
    </div>
  )
}

// ─── admin go-live panel ──────────────────────────────────────────────────────
function GoLivePanel() {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [keys, setKeys] = useState<{ rtmpUrl: string; streamKey: string } | null>(null)
  const [copied, setCopied] = useState<'url' | 'key' | null>(null)
  const [error, setError] = useState('')

  const goLive = trpc.live.goLive.useMutation()
  const endLive = trpc.live.endLive.useMutation()
  const utils = trpc.useUtils()

  const copy = (text: string, which: 'url' | 'key') => {
    navigator.clipboard.writeText(text)
    setCopied(which)
    setTimeout(() => setCopied(null), 1500)
  }

  const start = async () => {
    setError('')
    try {
      const res = await goLive.mutateAsync({ title: title.trim() || 'Live Broadcast' })
      setKeys({ rtmpUrl: res.rtmpUrl, streamKey: res.streamKey })
      utils.live.status.invalidate()
    } catch (err: any) {
      setError(err?.message || 'Could not create live stream')
    }
  }

  const stop = async () => {
    await endLive.mutateAsync({})
    setKeys(null)
    setTitle('')
    utils.live.status.invalidate()
  }

  return (
    <div className="rounded-lg border border-[rgba(255,60,60,0.3)] bg-[#25364B] p-4">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between">
        <span className="flex items-center gap-2 text-[#F0EBE1] text-sm font-medium">
          <Radio size={16} className="text-red-400" /> Go Live from your phone
        </span>
        <span className="text-[#C9B99A] text-xs uppercase tracking-[0.15em]">{open ? 'Hide' : 'Show'}</span>
      </button>

      {open && (
        <div className="mt-4 space-y-3">
          {!keys ? (
            <>
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Broadcast title (e.g. Evening Take)"
                className="w-full bg-[#182635] border border-[rgba(255,149,0,0.2)] rounded px-3 py-2 text-[#F0EBE1] text-sm focus:outline-none focus:border-[#FF9500]" />
              <button onClick={start} disabled={goLive.isPending}
                className="w-full py-2.5 bg-red-600 text-white text-sm font-semibold rounded hover:bg-red-500 transition-colors disabled:opacity-40 flex items-center justify-center gap-2">
                {goLive.isPending ? <Loader2 size={15} className="animate-spin" /> : <Radio size={15} />} Create live stream
              </button>
              {error && <p className="text-red-400 text-xs">{error}</p>}
            </>
          ) : (
            <>
              <p className="text-[#C9B99A] text-xs leading-relaxed">
                On your phone, open a streaming app such as <span className="text-[#FFB840]">Larix Broadcaster</span> (free, iOS/Android)
                and add a new RTMP connection with these two values. Start streaming in the app and you are live on this page.
              </p>
              {([['Server URL', keys.rtmpUrl, 'url'], ['Stream key', keys.streamKey, 'key']] as const).map(([label, value, which]) => (
                <div key={which} className="flex items-center gap-2 bg-[#182635] rounded px-3 py-2 border border-[rgba(255,149,0,0.2)]">
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] uppercase tracking-[0.15em] text-[#C9B99A]">{label}</p>
                    <p className="text-[#F0EBE1] text-xs truncate font-mono">{value}</p>
                  </div>
                  <button onClick={() => copy(value, which)} className="text-[#FFB840] hover:text-[#FF9500] p-1">
                    {copied === which ? <Check size={15} /> : <Copy size={15} />}
                  </button>
                </div>
              ))}
              <button onClick={stop} disabled={endLive.isPending}
                className="w-full py-2.5 border border-red-500/50 text-red-400 text-sm font-semibold rounded hover:bg-red-500/10 transition-colors flex items-center justify-center gap-2">
                <Square size={14} /> End broadcast
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}

// ─── post card ────────────────────────────────────────────────────────────────
function PostCard({ post, isAdmin, onChanged }: { post: FeedPost; isAdmin: boolean; onChanged: () => void }) {
  const [likes, setLikes] = useState(post.likesCount)
  const [liked, setLiked] = useState(false)
  const likeMutation = trpc.feed.like.useMutation()
  const deleteMutation = trpc.feed.delete.useMutation({ onSuccess: onChanged })
  const pinMutation = trpc.feed.togglePin.useMutation({ onSuccess: onChanged })

  const like = () => {
    if (liked) return
    setLiked(true)
    setLikes((n) => n + 1)
    likeMutation.mutate({ id: post.id })
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-lg border p-4 backdrop-blur-sm ${post.pinned ? 'border-[rgba(255,149,0,0.5)] shadow-[0_0_30px_rgba(255,149,0,0.08)]' : 'border-[rgba(255,149,0,0.18)]'}`}
      style={{ background: 'linear-gradient(165deg, rgba(37,54,75,0.88), rgba(24,38,53,0.92))' }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[rgba(255,149,0,0.15)] border border-[rgba(255,149,0,0.4)] flex items-center justify-center shrink-0">
            <Crown size={18} className="text-[#FF9500]" />
          </div>
          <div>
            <p className="text-[#F0EBE1] text-sm font-medium">Ronald Lee King <span className="text-[#FF9500]">· #TheKingsTake</span></p>
            <p className="text-[#C9B99A] text-[11px]">{timeAgo(post.createdAt)}{post.pinned && <span className="text-[#FFB840] ml-2">· Pinned</span>}</p>
          </div>
        </div>
        {isAdmin && (
          <div className="flex gap-1 shrink-0">
            <button title={post.pinned ? 'Unpin' : 'Pin to top'} onClick={() => pinMutation.mutate({ id: post.id })}
              className="p-1.5 text-[#C9B99A] hover:text-[#FFB840] transition-colors">
              {post.pinned ? <PinOff size={15} /> : <Pin size={15} />}
            </button>
            <button title="Delete post" onClick={() => { if (confirm('Delete this post?')) deleteMutation.mutate({ id: post.id }) }}
              className="p-1.5 text-[#C9B99A] hover:text-red-400 transition-colors">
              <Trash2 size={15} />
            </button>
          </div>
        )}
      </div>

      <p className="text-[#F0EBE1] text-[15px] leading-relaxed mt-3 whitespace-pre-wrap">{linkify(post.body)}</p>

      {post.linkUrl && (
        <a href={post.linkUrl} target="_blank" rel="noopener noreferrer"
          className="mt-3 flex items-center gap-3 bg-[#182635] border border-[rgba(255,149,0,0.2)] rounded px-4 py-3 hover:border-[#FF9500] transition-colors group">
          <ExternalLink size={16} className="text-[#FF9500] shrink-0" />
          <div className="min-w-0">
            <p className="text-[#F0EBE1] text-sm group-hover:text-[#FFB840] transition-colors truncate">{post.linkTitle || post.linkUrl}</p>
            <p className="text-[#C9B99A] text-xs truncate">{new URL(post.linkUrl).hostname}</p>
          </div>
        </a>
      )}

      {post.imageUrl && (
        <img src={post.imageUrl} alt="" className="mt-3 rounded w-full object-cover max-h-[480px] border border-[rgba(255,149,0,0.15)]" loading="lazy" />
      )}

      {post.muxPlaybackId && (
        <div className="mt-3 rounded overflow-hidden border border-[rgba(255,149,0,0.15)]">
          <MuxPlayer playbackId={post.muxPlaybackId} accentColor="#FF9500" style={{ width: '100%', aspectRatio: '16/9' }} />
        </div>
      )}
      {!post.muxPlaybackId && post.videoUrl && post.videoType === 'embed' && (
        <div className="mt-3 rounded overflow-hidden border border-[rgba(255,149,0,0.15)]" style={{ aspectRatio: '16/9' }}>
          <iframe src={embedUrl(post.videoUrl)} className="w-full h-full" allowFullScreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" />
        </div>
      )}
      {!post.muxPlaybackId && post.videoUrl && post.videoType === 'upload' && (
        <video src={post.videoUrl} controls className="mt-3 rounded w-full border border-[rgba(255,149,0,0.15)]" />
      )}

      <div className="mt-3 pt-3 border-t border-[rgba(240,235,225,0.08)]">
        <button onClick={like} className={`flex items-center gap-1.5 text-sm transition-colors ${liked ? 'text-[#FF9500]' : 'text-[#C9B99A] hover:text-[#FF9500]'}`}>
          <Heart size={16} fill={liked ? '#FF9500' : 'none'} /> {likes > 0 ? likes : ''} {liked || likes > 0 ? (likes === 1 ? 'Like' : 'Likes') : 'Like'}
        </button>
      </div>
    </motion.article>
  )
}
