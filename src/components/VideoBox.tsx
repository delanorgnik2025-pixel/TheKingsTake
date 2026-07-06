import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Video, Mic, ExternalLink, Calendar, Clock, Users, ChevronRight } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

interface VideoItem {
  id: string
  title: string
  description?: string
  youtubeId?: string
  videoUrl?: string
  thumbnail?: string
  duration?: string
  date?: string
  isLive?: boolean
  views?: string
}

// Default videos — Ronald can update these
const DEFAULT_VIDEOS: VideoItem[] = [
  {
    id: 'featured',
    title: 'Featured Talk: The State of Our Union',
    description: 'Ronald Lee King breaks down what "From the Loins of the Beast" really means for our community.',
    youtubeId: '', // Add YouTube ID when available
    thumbnail: '/images/book-cover.jpg',
    duration: '12:34',
    date: 'Coming Soon',
    isLive: false,
  },
  {
    id: 'talk-1',
    title: 'Know Your Rights: Police Encounters',
    description: 'What to say, what not to say, and how to protect yourself.',
    youtubeId: '',
    thumbnail: '/images/blog-post-2.jpg',
    duration: '18:45',
    date: 'Coming Soon',
    isLive: false,
  },
  {
    id: 'talk-2',
    title: 'Building the AASOTU Movement',
    description: 'How we turn knowledge into power and community into protection.',
    youtubeId: '',
    thumbnail: '/images/blog-post-3.jpg',
    duration: '24:12',
    date: 'Coming Soon',
    isLive: false,
  },
]

interface Props {
  videos?: VideoItem[]
  title?: string
  subtitle?: string
}

export default function VideoBox({ videos = DEFAULT_VIDEOS, title, subtitle }: Props) {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null)

  const featured = videos[0]
  const playlist = videos.slice(1)

  const sectionTitle = title ?? "Talks & Live Streams"
  const sectionSubtitle = subtitle ?? "Featured conversations, live events, and community talks."

  return (
    <section id="video-box" className="relative py-16 md:py-24 px-6 md:px-12 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <ScrollReveal>
            <p className="text-[10px] uppercase tracking-[0.12em] text-[#FF9500] mb-2">
              <Video size={10} className="inline mr-1.5" />
              Watch & Listen
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-2xl md:text-3xl text-[#F0EBE1] font-medium leading-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {sectionTitle}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="text-sm text-[#C9B99A]/60 mt-1">{sectionSubtitle}</p>
          </ScrollReveal>
        </div>

        {/* Featured Video + Playlist */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main Player */}
          <div className="lg:col-span-2">
            <ScrollReveal delay={0.1}>
              <div className="relative bg-[#0A0F1A] rounded-xl border border-[rgba(255,149,0,0.12)] overflow-hidden aspect-video">
                {activeVideo?.youtubeId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1`}
                    title={activeVideo.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  /* Placeholder when no video is playing */
                  <div className="w-full h-full flex flex-col items-center justify-center relative">
                    <img
                      src={activeVideo?.thumbnail ?? featured.thumbnail}
                      alt={activeVideo?.title ?? featured.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1A] via-[#0A0F1A]/50 to-transparent" />
                    <div className="relative z-10 text-center px-6">
                      {featured.isLive && (
                        <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-red-400 bg-red-400/10 border border-red-400/20 rounded-full px-3 py-1 mb-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                          Live Now
                        </span>
                      )}
                      <button
                        onClick={() => {
                          if (featured.youtubeId) setActiveVideo(featured)
                        }}
                        className="w-16 h-16 rounded-full bg-[rgba(255,149,0,0.9)] hover:bg-[#FF9500] flex items-center justify-center mx-auto mb-4 transition-all hover:scale-110"
                        style={{ boxShadow: '0 0 30px rgba(255,149,0,0.3)' }}
                      >
                        <Play size={28} className="text-[#1B2838] ml-1" />
                      </button>
                      <h3 className="text-lg text-[#F0EBE1] font-medium mb-1">
                        {activeVideo?.title ?? featured.title}
                      </h3>
                      <p className="text-xs text-[#C9B99A]/50 max-w-sm mx-auto">
                        {activeVideo?.description ?? featured.description}
                      </p>
                      {!featured.youtubeId && (
                        <p className="text-[10px] text-[#FF9500]/60 mt-3 bg-[rgba(255,149,0,0.08)] rounded-full px-3 py-1 inline-block">
                          <Mic size={9} className="inline mr-1" />
                          Live streams coming soon — follow for updates
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </ScrollReveal>

            {/* Featured info bar */}
            <div className="flex items-center justify-between mt-3 px-1">
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-[#C9B99A]/40 flex items-center gap-1">
                  <Clock size={9} /> {featured.duration}
                </span>
                <span className="text-[10px] text-[#C9B99A]/40 flex items-center gap-1">
                  <Calendar size={9} /> {featured.date}
                </span>
                {featured.views && (
                  <span className="text-[10px] text-[#C9B99A]/40 flex items-center gap-1">
                    <Users size={9} /> {featured.views}
                  </span>
                )}
              </div>
              {featured.youtubeId && (
                <a
                  href={`https://youtube.com/watch?v=${featured.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-[#FF9500]/60 hover:text-[#FF9500] flex items-center gap-1 transition-colors"
                >
                  <ExternalLink size={9} /> Open on YouTube
                </a>
              )}
            </div>
          </div>

          {/* Playlist Sidebar */}
          <div className="lg:col-span-1">
            <ScrollReveal delay={0.2}>
              <div className="bg-[rgba(27,40,56,0.3)] border border-[rgba(255,149,0,0.08)] rounded-xl overflow-hidden h-full max-h-[360px] overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,149,0,0.3) transparent' }}>
                <div className="p-3 border-b border-[rgba(255,149,0,0.06)]">
                  <p className="text-[10px] uppercase tracking-wider text-[#C9B99A]/40">More Videos</p>
                </div>
                {playlist.map((video, i) => (
                  <button
                    key={video.id}
                    onClick={() => setActiveVideo(video)}
                    className={`w-full flex items-start gap-3 p-3 text-left border-b border-[rgba(255,149,0,0.04)] last:border-b-0 hover:bg-[rgba(255,149,0,0.05)] transition-colors ${
                      activeVideo?.id === video.id ? 'bg-[rgba(255,149,0,0.08)]' : ''
                    }`}
                  >
                    <div className="w-16 h-10 rounded overflow-hidden shrink-0 relative bg-[#0A0F1A]">
                      <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <Play size={10} className="text-white/80" />
                      </div>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] text-[#F0EBE1] leading-snug line-clamp-2">{video.title}</p>
                      <p className="text-[9px] text-[#C9B99A]/30 mt-0.5 flex items-center gap-1">
                        <Clock size={7} /> {video.duration}
                      </p>
                    </div>
                  </button>
                ))}

                {/* Coming soon hint */}
                <div className="p-3 border-t border-[rgba(255,149,0,0.06)]">
                  <p className="text-[9px] text-[#C9B99A]/30 text-center">
                    More talks and live streams coming soon
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
