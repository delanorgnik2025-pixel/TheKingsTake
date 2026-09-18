import { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import MuxPlayer from "@mux/mux-player-react";
import {
  Crown,
  Heart,
  Link2,
  Image as ImageIcon,
  Video,
  Radio,
  Pin,
  PinOff,
  Trash2,
  Send,
  Copy,
  Check,
  Loader2,
  Square,
  ArrowLeft,
  ExternalLink,
  MessageCircle,
  User,
  LogIn,
  LogOut,
  Lock,
  Users,
  BookOpen,
  Star,
  Flame,
  Calendar,
  Landmark,
  Share2,
  X,
  Newspaper,
  ArrowRight,
} from "lucide-react";
import { trpc } from "@/providers/trpc";
import { useMember } from "@/providers/MemberProvider";
import MemberAuthModal from "@/components/MemberAuthModal";
import NewsTicker from "@/components/NewsTicker";
import TrendingRail from "@/components/TrendingRail";
import FeedBackdrop from "@/components/FeedBackdrop";

// ─── helpers ──────────────────────────────────────────────────────────────────
function timeAgo(date: Date | string): string {
  const d = new Date(date);
  const s = Math.floor((Date.now() - d.getTime()) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  if (s < 604800) return `${Math.floor(s / 86400)}d ago`;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function linkify(text: string) {
  const parts = text.split(/(https?:\/\/[^\s]+)/g);
  return parts.map((p, i) =>
    /^https?:\/\//.test(p) ? (
      <a
        key={i}
        href={p}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#FFB840] hover:underline break-all"
      >
        {p}
      </a>
    ) : (
      <span key={i}>{p}</span>
    )
  );
}

function embedUrl(url: string): string {
  const yt = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([\w-]{6,})/
  );
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`;
  const vm = url.match(/vimeo\.com\/(\d+)/);
  if (vm) return `https://player.vimeo.com/video/${vm[1]}`;
  return url;
}

function authorSlug(name: string): string {
  return (
    name
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "member"
  );
}

function postShareUrl(post: FeedPost): string {
  const author = post.memberName || "Ronald Lee King";
  return `${window.location.origin}/feed/post/${post.id}/${authorSlug(author)}`;
}

function postPreviewImage(post: FeedPost): string {
  if (post.imageUrl) return post.imageUrl;
  if (post.muxPlaybackId)
    return `https://image.mux.com/${post.muxPlaybackId}/thumbnail.jpg?time=0`;
  return `${window.location.origin}/images/og-image.jpg`;
}

function isAdminPermissionError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error || "");
  return /insufficient permissions|forbidden|unauthorized/i.test(message);
}

type FeedPost = {
  id: number;
  body: string;
  linkUrl: string | null;
  linkTitle: string | null;
  imageUrl: string | null;
  videoUrl: string | null;
  videoType: "upload" | "embed" | "mux" | null;
  muxPlaybackId: string | null;
  pinned: boolean;
  likesCount: number;
  createdAt: Date | string;
  memberId: number | null;
  memberName: string | null;
  memberAvatar: string | null;
};

type DispatchPost = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  createdAt: Date | string;
};

function dispatchDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function DispatchRail({
  posts,
  loading,
  mobile = false,
}: {
  posts: DispatchPost[];
  loading: boolean;
  mobile?: boolean;
}) {
  const latest = posts[0];

  if (loading) {
    return (
      <section className="overflow-hidden rounded-xl border border-[rgba(255,149,0,0.22)] bg-[#1A2A3D] p-4">
        <div className="h-4 w-36 animate-pulse rounded bg-[#C9B99A]/10" />
        <div className="mt-4 h-36 animate-pulse rounded-lg bg-[#0F1B29]" />
      </section>
    );
  }

  if (!latest) return null;

  if (mobile) {
    return (
      <section aria-labelledby="mobile-dispatch-title" className="lg:hidden">
        <div className="mb-3 flex items-end justify-between gap-4">
          <div>
            <p className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#FF9500]">
              <Newspaper size={12} /> Daily intelligence
            </p>
            <h2 id="mobile-dispatch-title" className="text-xl text-[#F0EBE1]" style={{ fontFamily: "Newsreader, serif" }}>
              The King&apos;s Dispatch
            </h2>
          </div>
          <a href="/#newsletter" className="shrink-0 text-[11px] font-semibold text-[#FFB840] hover:text-[#FF9500]">
            Get it by email
          </a>
        </div>
        <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {posts.map((post, index) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="group relative min-h-48 w-[82vw] max-w-[350px] shrink-0 snap-start overflow-hidden rounded-xl border border-[rgba(255,149,0,0.25)] bg-[#1A2A3D]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,149,0,0.22),transparent_55%)]" />
              {post.coverImage && (
                <img
                  src={post.coverImage}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-35 transition-transform duration-500 group-hover:scale-105"
                  onError={event => { event.currentTarget.style.display = "none"; }}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#101C2A] via-[#101C2A]/75 to-transparent" />
              <div className="relative flex min-h-48 flex-col justify-end p-4">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#FFB840]">
                  {index === 0 ? "Latest edition · " : "Edition · "}{dispatchDate(post.createdAt)}
                </p>
                <h3 className="line-clamp-2 text-xl leading-tight text-[#F0EBE1]" style={{ fontFamily: "Newsreader, serif" }}>
                  {post.title}
                </h3>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#FFB840]">
                  Read Dispatch <ArrowRight size={13} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="desktop-dispatch-title" className="overflow-hidden rounded-xl border border-[rgba(255,149,0,0.3)] bg-gradient-to-b from-[#25364B] to-[#172535] shadow-[0_18px_45px_rgba(0,0,0,0.16)]">
      <div className="border-b border-[rgba(255,149,0,0.16)] px-5 py-4">
        <p className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#FF9500]">
          <Newspaper size={12} /> Source-backed daily news
        </p>
        <h2 id="desktop-dispatch-title" className="text-xl text-[#F0EBE1]" style={{ fontFamily: "Newsreader, serif" }}>
          The King&apos;s Dispatch
        </h2>
      </div>

      <Link to={`/blog/${latest.slug}`} className="group block">
        <div className="relative aspect-[16/10] overflow-hidden bg-[#0F1B29]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,149,0,0.3),transparent_58%)]" />
          {latest.coverImage && (
            <img
              src={latest.coverImage}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-65 transition-transform duration-500 group-hover:scale-105"
              onError={event => { event.currentTarget.style.display = "none"; }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#101C2A] via-[#101C2A]/55 to-transparent" />
          <span className="absolute left-4 top-4 rounded-full border border-[#FF9500]/35 bg-[#101C2A]/90 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.15em] text-[#FFB840]">
            Latest edition
          </span>
        </div>
        <div className="p-5">
          <p className="mb-2 text-[10px] uppercase tracking-[0.14em] text-[#C9B99A]/70">{dispatchDate(latest.createdAt)}</p>
          <h3 className="text-xl leading-tight text-[#F0EBE1] transition-colors group-hover:text-[#FFB840]" style={{ fontFamily: "Newsreader, serif" }}>
            {latest.title}
          </h3>
          {latest.excerpt && <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-[#C9B99A]">{latest.excerpt}</p>}
          <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#FFB840]">
            Read full Dispatch <ArrowRight size={13} />
          </span>
        </div>
      </Link>

      {posts.length > 1 && (
        <div className="border-t border-[rgba(255,149,0,0.14)] px-5 py-2">
          {posts.slice(1, 4).map(post => (
            <Link key={post.id} to={`/blog/${post.slug}`} className="group block border-b border-white/[0.06] py-3 last:border-0">
              <p className="text-[9px] uppercase tracking-[0.12em] text-[#C9B99A]/55">{dispatchDate(post.createdAt)}</p>
              <p className="mt-1 line-clamp-2 text-sm leading-snug text-[#F0EBE1] transition-colors group-hover:text-[#FFB840]">{post.title}</p>
            </Link>
          ))}
        </div>
      )}

      <a href="/#newsletter" className="flex items-center justify-between border-t border-[rgba(255,149,0,0.16)] bg-[#FF9500]/[0.08] px-5 py-3 text-xs font-bold text-[#FFB840] hover:bg-[#FF9500]/[0.14]">
        Get the Dispatch by email <ArrowRight size={13} />
      </a>
    </section>
  );
}

// ─── page ─────────────────────────────────────────────────────────────────────
export default function FeedPage() {
  const { postId } = useParams<{ postId?: string }>();
  const sharedPostId = postId && /^\d+$/.test(postId) ? Number(postId) : null;
  const [adminToken, setAdminToken] = useState<string | null>(() =>
    typeof window !== "undefined" ? localStorage.getItem("adminToken") : null
  );
  const [adminSessionExpired, setAdminSessionExpired] = useState(false);
  const [offset, setOffset] = useState(0);
  const [allPosts, setAllPosts] = useState<FeedPost[]>([]);
  const [showAuth, setShowAuth] = useState(false);
  const PAGE = 10;
  const { member, logout } = useMember();

  const utils = trpc.useUtils();
  const adminSession = trpc.auth.adminSession.useQuery(undefined, {
    enabled: !!adminToken,
    retry: false,
  });
  const isAdmin = !!adminToken && adminSession.data?.valid === true;
  const storedAdminSessionRejected =
    !!adminToken && adminSession.data?.valid === false;
  const { data, isLoading } = trpc.feed.list.useQuery({ limit: PAGE, offset });
  const sharedPostQuery = trpc.feed.getById.useQuery(
    { id: sharedPostId || 1 },
    { enabled: sharedPostId !== null }
  );
  const liveStatus = trpc.live.status.useQuery(undefined, {
    refetchInterval: 15000,
  });
  const dispatches = trpc.blog.list.useQuery({
    category: "DAILY NEWS",
    limit: 5,
  });

  const expireAdminSession = () => {
    localStorage.removeItem("adminToken");
    setAdminToken(null);
    setAdminSessionExpired(true);
  };

  useEffect(() => {
    if (storedAdminSessionRejected) localStorage.removeItem("adminToken");
  }, [storedAdminSessionRejected]);

  useEffect(() => {
    if (data?.posts) {
      setAllPosts(prev => {
        const ids = new Set(prev.map(p => p.id));
        const fresh = (data.posts as unknown as FeedPost[]).filter(
          p => !ids.has(p.id)
        );
        return offset === 0
          ? (data.posts as unknown as FeedPost[])
          : [...prev, ...fresh];
      });
    }
  }, [data]);

  useEffect(() => {
    const sharedPost = sharedPostQuery.data?.post as
      FeedPost | null | undefined;
    if (!sharedPost) return;
    setAllPosts(prev => [
      sharedPost,
      ...prev.filter(post => post.id !== sharedPost.id),
    ]);
    const timer = window.setTimeout(() => {
      document
        .getElementById(`post-${sharedPost.id}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 250);
    return () => window.clearTimeout(timer);
  }, [sharedPostQuery.data]);

  const refresh = () => {
    setOffset(0);
    setAllPosts([]);
    utils.feed.list.invalidate();
  };

  return (
    <div className="min-h-screen bg-[#182635] relative">
      <FeedBackdrop />

      {/* Auth Modal */}
      <MemberAuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />

      <div className="relative z-10 pt-16">
        <NewsTicker />
      </div>

      {/* Header */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 pt-10 pb-8 text-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[#C9B99A] text-xs uppercase tracking-[0.2em] hover:text-[#FF9500] transition-colors mb-8"
        >
          <ArrowLeft size={14} /> Home
        </Link>
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <Crown className="text-[#FF9500]" size={40} />
            <div className="absolute inset-0 blur-xl bg-[rgba(255,149,0,0.45)] -z-10 rounded-full" />
          </div>
          <h1
            className="text-4xl sm:text-5xl text-[#F0EBE1]"
            style={{
              fontFamily: "Newsreader, serif",
              textShadow: "0 0 40px rgba(255,149,0,0.35)",
            }}
          >
            The Feed
          </h1>
          <p className="text-[#C9B99A] text-sm sm:text-base max-w-xl">
            Dispatches from{" "}
            <span className="text-[#FFB840] font-semibold">#TheKingsTake</span>{" "}
            — news, commentary, and live broadcasts. No algorithm in between.
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
        <div className="relative z-10 max-w-6xl mx-auto px-4 mb-6">
          <div
            className="rounded-lg overflow-hidden border border-[rgba(255,60,60,0.4)] bg-[#25364B]"
            style={{ boxShadow: "0 0 40px rgba(255,60,60,0.15)" }}
          >
            <div className="flex items-center gap-2 px-4 py-2.5 bg-[rgba(255,60,60,0.1)]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
              </span>
              <span className="text-red-400 text-xs font-bold uppercase tracking-[0.2em]">
                Live Now
              </span>
              <span className="text-[#F0EBE1] text-sm truncate">
                {liveStatus.data.title}
              </span>
            </div>
            <MuxPlayer
              playbackId={liveStatus.data.playbackId}
              streamType="live"
              autoPlay="muted"
              accentColor="#FF9500"
              style={{ width: "100%", aspectRatio: "16/9" }}
            />
          </div>
        </div>
      )}

      {/* Main content: Feed + Sidebar */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 pb-20 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        {/* Left column: Composer + Feed */}
        <div className="space-y-5">
          <DispatchRail
            posts={(dispatches.data || []) as DispatchPost[]}
            loading={dispatches.isLoading}
            mobile
          />
          {/* Member bar */}
          <div className="rounded-lg border border-[rgba(255,149,0,0.18)] bg-[#25364B]/80 backdrop-blur-sm p-3 flex items-center justify-between">
            {member || isAdmin ? (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[rgba(255,149,0,0.15)] border border-[rgba(255,149,0,0.4)] flex items-center justify-center">
                  {member?.avatar ? (
                    <img
                      src={member.avatar}
                      alt=""
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : isAdmin ? (
                    <Crown size={16} className="text-[#FF9500]" />
                  ) : (
                    <User size={16} className="text-[#FF9500]" />
                  )}
                </div>
                <div>
                  <p className="text-[#F0EBE1] text-sm font-medium">
                    {member?.name || "Ronald Lee King"}
                  </p>
                  <p className="text-[#C9B99A] text-[10px] uppercase tracking-wider">
                    {member ? "Royal Member" : "Administrator"}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#182635] border border-[rgba(255,149,0,0.2)] flex items-center justify-center">
                  <Lock size={16} className="text-[#C9B99A]/50" />
                </div>
                <div>
                  <p className="text-[#F0EBE1] text-sm font-medium">Guest</p>
                  <p className="text-[#C9B99A] text-[10px]">
                    Sign in to post & comment
                  </p>
                </div>
              </div>
            )}
            {member ? (
              <button
                onClick={logout}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#C9B99A] hover:text-red-400 border border-[rgba(255,149,0,0.15)] rounded hover:border-red-400/30 transition-colors"
              >
                <LogOut size={13} /> Sign Out
              </button>
            ) : isAdmin ? (
              <Link
                to="/admin/dashboard"
                className="flex items-center gap-1.5 rounded border border-[rgba(255,149,0,0.25)] px-3 py-1.5 text-xs text-[#FFB840] hover:border-[#FF9500]"
              >
                <Crown size={13} /> Admin Active
              </Link>
            ) : (
              <button
                onClick={() => setShowAuth(true)}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-[#FF9500] text-[#182635] text-xs font-bold rounded hover:bg-[#CC6A00] transition-colors"
              >
                <LogIn size={13} /> Join / Log In
              </button>
            )}
          </div>

          {(adminSessionExpired || storedAdminSessionRejected) && (
            <div className="rounded-lg border border-[#FF9500]/40 bg-[#FF9500]/10 p-4 text-sm text-[#F0EBE1]">
              <p className="font-medium">Your admin session expired.</p>
              <p className="mt-1 text-xs text-[#C9B99A]">
                Log in again once, then you can upload photos and videos
                directly from this device.
              </p>
              <Link
                to="/admin/login?returnTo=/feed"
                className="mt-3 inline-flex items-center gap-2 rounded bg-[#FF9500] px-4 py-2 text-xs font-bold text-[#182635] hover:bg-[#FFB840]"
              >
                <LogIn size={14} /> Admin Login
              </Link>
            </div>
          )}

          {/* Admin composer */}
          {isAdmin && (
            <div className="space-y-4">
              <FeedComposer
                onPosted={refresh}
                onAdminSessionExpired={expireAdminSession}
              />
              <GoLivePanel onAdminSessionExpired={expireAdminSession} />
            </div>
          )}

          {/* Member composer */}
          {member && <MemberComposer onPosted={refresh} />}

          {/* Timeline */}
          {isLoading && offset === 0 && (
            <div className="text-center py-16 text-[#C9B99A]">
              <Loader2 className="animate-spin inline-block mr-2" size={18} />
              Loading the feed…
            </div>
          )}
          {!isLoading && allPosts.length === 0 && (
            <div className="text-center py-16 border border-dashed border-[rgba(255,149,0,0.25)] rounded-lg">
              <Crown className="mx-auto text-[#FF9500] mb-3" size={32} />
              <p
                className="text-[#F0EBE1] text-lg"
                style={{ fontFamily: "Newsreader, serif" }}
              >
                The feed opens soon.
              </p>
              <p className="text-[#C9B99A] text-sm mt-1">
                The first dispatch is being prepared. Check back shortly.
              </p>
            </div>
          )}
          {allPosts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              isAdmin={isAdmin}
              onChanged={refresh}
            />
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

        {/* Right column: Sidebar */}
        <aside className="hidden lg:block space-y-5">
          <DispatchRail
            posts={(dispatches.data || []) as DispatchPost[]}
            loading={dispatches.isLoading}
          />
          {/* Subscribe CTA */}
          <div className="rounded-xl border border-[rgba(255,149,0,0.25)] bg-gradient-to-b from-[#25364B] to-[#1A2A3D] p-5">
            <div className="flex items-center gap-2 mb-3">
              <Crown size={20} className="text-[#FF9500]" />
              <h3 className="text-[#F0EBE1] font-bold text-sm">
                Join the Royal Circle
              </h3>
            </div>
            <p className="text-[#C9B99A] text-xs leading-relaxed mb-4">
              Membership is invitation-only. Approved subscribers can post on
              the feed, comment, like, and access exclusive educational content.
            </p>
            <div className="space-y-2 mb-4">
              {[
                { icon: MessageCircle, text: "Post to the community feed" },
                { icon: Heart, text: "Like and comment on posts" },
                { icon: BookOpen, text: "Exclusive educational series" },
                { icon: Calendar, text: "Live Q&A session access" },
                { icon: Landmark, text: "FBA research & history docs" },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2 text-xs text-[#C9B99A]"
                >
                  <Icon size={12} className="text-[#FF9500] shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowAuth(true)}
              className="w-full py-2.5 bg-[#FF9500] text-[#182635] text-xs font-bold rounded-lg hover:bg-[#CC6A00] transition-colors"
            >
              Enter Member Access Code
            </button>
            <a
              href="https://www.facebook.com/thekingstake"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 mt-2 text-[10px] text-[#C9B99A]/60 hover:text-[#FF9500] transition-colors"
            >
              <ExternalLink size={10} /> Also subscribe on Facebook
            </a>
          </div>

          {/* Quick Links */}
          <div className="rounded-xl border border-[rgba(255,149,0,0.15)] bg-[#25364B]/60 p-5">
            <h3 className="text-[#F0EBE1] font-bold text-sm mb-3 flex items-center gap-2">
              <Flame size={16} className="text-[#FF9500]" /> Take Action
            </h3>
            <div className="space-y-2">
              <Link
                to="/petition"
                className="flex items-center gap-2 p-2.5 rounded-lg bg-[#182635] border border-[rgba(255,149,0,0.1)] hover:border-[#FF9500]/30 transition-colors group"
              >
                <Landmark size={14} className="text-[#FF9500]" />
                <span className="text-xs text-[#C9B99A] group-hover:text-[#F0EBE1] transition-colors">
                  Sign the FBA Petition
                </span>
              </Link>
              <Link
                to="/consultation"
                className="flex items-center gap-2 p-2.5 rounded-lg bg-[#182635] border border-[rgba(255,149,0,0.1)] hover:border-[#FF9500]/30 transition-colors group"
              >
                <Calendar size={14} className="text-[#FF9500]" />
                <span className="text-xs text-[#C9B99A] group-hover:text-[#F0EBE1] transition-colors">
                  Book a Consultation
                </span>
              </Link>
              <Link
                to="/fba"
                className="flex items-center gap-2 p-2.5 rounded-lg bg-[#182635] border border-[rgba(255,149,0,0.1)] hover:border-[#FF9500]/30 transition-colors group"
              >
                <Star size={14} className="text-[#FF9500]" />
                <span className="text-xs text-[#C9B99A] group-hover:text-[#F0EBE1] transition-colors">
                  Foundational Black American
                </span>
              </Link>
            </div>
          </div>

          {/* Members Online */}
          <div className="rounded-xl border border-[rgba(255,149,0,0.15)] bg-[#25364B]/60 p-5">
            <h3 className="text-[#F0EBE1] font-bold text-sm mb-3 flex items-center gap-2">
              <Users size={16} className="text-[#FF9500]" /> Community
            </h3>
            <p className="text-[#C9B99A] text-xs leading-relaxed">
              Connect with others reclaiming our history. Share your lineage,
              ask questions, and build together.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

// ─── member composer ──────────────────────────────────────────────────────────
function MemberComposer({ onPosted }: { onPosted: () => void }) {
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [uploadPct, setUploadPct] = useState<number | null>(null);
  const [status, setStatus] = useState("");
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const createMutation = trpc.member.createFeedPost.useMutation();
  const imageSignature = trpc.member.createImageUploadSignature.useMutation();
  const videoUpload = trpc.member.createVideoUpload.useMutation();
  const confirmVideo = trpc.member.confirmVideoUpload.useMutation();
  const previewFile = imageFile || videoFile;
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    if (!previewFile) {
      setPreviewUrl("");
      return;
    }
    const url = URL.createObjectURL(previewFile);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [previewFile]);

  const reset = () => {
    setBody("");
    setImageFile(null);
    setVideoFile(null);
    setUploadPct(null);
    setStatus("");
    if (imageInputRef.current) imageInputRef.current.value = "";
    if (videoInputRef.current) videoInputRef.current.value = "";
  };

  const finishVideoPost = async (uploadId: string, text: string) => {
    for (let attempt = 0; attempt < 20; attempt++) {
      setStatus(
        attempt ? `Processing video… (${attempt + 1})` : "Processing video…"
      );
      const result = await confirmVideo.mutateAsync({ uploadId, body: text });
      if (result.ready) {
        reset();
        onPosted();
        return;
      }
      await new Promise(resolve => setTimeout(resolve, 4000));
    }
    throw new Error(
      "The video is still processing. Please try posting again shortly."
    );
  };

  const submit = async () => {
    const text = body.trim();
    if (!text && !imageFile && !videoFile) return;
    setLoading(true);
    setStatus("");
    try {
      if (videoFile) {
        setStatus("Preparing video…");
        const { uploadId, uploadUrl } = await videoUpload.mutateAsync({
          corsOrigin: window.location.origin,
        });
        await new Promise<void>((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open("PUT", uploadUrl);
          xhr.setRequestHeader(
            "Content-Type",
            videoFile.type || "application/octet-stream"
          );
          xhr.upload.onprogress = e =>
            e.lengthComputable &&
            setUploadPct(Math.round((e.loaded / e.total) * 100));
          xhr.onload = () =>
            xhr.status >= 200 && xhr.status < 300
              ? resolve()
              : reject(new Error(`Upload failed (${xhr.status})`));
          xhr.onerror = () =>
            reject(new Error("Video upload failed — check your connection."));
          xhr.send(videoFile);
        });
        await finishVideoPost(uploadId, text);
        return;
      }

      let uploadedImageUrl = "";
      if (imageFile) {
        setStatus("Uploading image…");
        const signed = await imageSignature.mutateAsync();
        const form = new FormData();
        form.append("file", imageFile);
        form.append("api_key", signed.apiKey);
        form.append("timestamp", String(signed.timestamp));
        form.append("folder", signed.folder);
        form.append("signature", signed.signature);
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${signed.cloudName}/image/upload`,
          { method: "POST", body: form }
        );
        if (!response.ok) throw new Error("Image upload failed");
        const uploaded = (await response.json()) as { secure_url: string };
        uploadedImageUrl = uploaded.secure_url;
      }
      await createMutation.mutateAsync({
        body: text,
        imageUrl: uploadedImageUrl || "",
      });
      reset();
      onPosted();
    } catch (err: any) {
      alert(err?.message || "Could not post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg border border-[rgba(255,149,0,0.2)] bg-[#25364B]/80 backdrop-blur-sm p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-full bg-[rgba(255,149,0,0.15)] border border-[rgba(255,149,0,0.4)] flex items-center justify-center">
          <Crown size={16} className="text-[#FF9500]" />
        </div>
        <div>
          <p className="text-[#F0EBE1] text-sm font-medium">
            Share with the Community
          </p>
          <p className="text-[#C9B99A] text-[10px] uppercase tracking-wider">
            Post text, photos, or videos
          </p>
        </div>
      </div>

      <textarea
        value={body}
        onChange={e => setBody(e.target.value)}
        onPaste={e => {
          const file = Array.from(e.clipboardData.items)
            .find(item => item.type.startsWith("image/"))
            ?.getAsFile();
          if (!file) return;
          e.preventDefault();
          if (file.size > 10 * 1024 * 1024) {
            alert("Images must be 10 MB or smaller");
            return;
          }
          setImageFile(file);
          setVideoFile(null);
        }}
        placeholder="What's on your mind, Royal?"
        rows={2}
        className="w-full bg-[#182635] border border-[rgba(255,149,0,0.15)] rounded px-3 py-2.5 text-[#F0EBE1] text-sm placeholder-[#C9B99A]/40 focus:outline-none focus:border-[#FF9500] resize-y"
      />

      <input
        ref={imageInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={e => {
          const file = e.target.files?.[0] || null;
          if (file && file.size > 10 * 1024 * 1024) {
            alert("Images must be 10 MB or smaller");
            e.target.value = "";
            return;
          }
          setImageFile(file);
          setVideoFile(null);
        }}
      />
      <input
        ref={videoInputRef}
        type="file"
        accept="video/*"
        className="hidden"
        onChange={e => {
          const file = e.target.files?.[0] || null;
          if (file && file.size > 500 * 1024 * 1024) {
            alert("Videos must be 500 MB or smaller");
            e.target.value = "";
            return;
          }
          setVideoFile(file);
          setImageFile(null);
        }}
      />
      {previewUrl && (
        <div className="relative mt-3 overflow-hidden rounded-lg border border-[rgba(255,149,0,0.2)] bg-black/30">
          {imageFile ? (
            <img
              src={previewUrl}
              alt="Selected upload preview"
              className="max-h-80 w-full object-contain"
            />
          ) : (
            <video src={previewUrl} controls className="max-h-80 w-full" />
          )}
          <button
            onClick={() => {
              setImageFile(null);
              setVideoFile(null);
            }}
            className="absolute right-2 top-2 rounded-full bg-black/70 p-1.5 text-white"
            title="Remove selected media"
          >
            <X size={14} />
          </button>
        </div>
      )}
      {uploadPct !== null && (
        <div className="mt-3">
          <div className="h-1.5 overflow-hidden rounded bg-[#182635]">
            <div
              className="h-full bg-[#FF9500]"
              style={{ width: `${uploadPct}%` }}
            />
          </div>
          <p className="mt-1 text-xs text-[#C9B99A]">Uploading… {uploadPct}%</p>
        </div>
      )}
      {status && <p className="mt-2 text-xs text-[#FFB840]">{status}</p>}

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-[rgba(240,235,225,0.06)]">
        <div className="flex gap-1">
          <button
            onClick={() => imageInputRef.current?.click()}
            className={`p-2 rounded transition-colors ${imageFile ? "text-[#FF9500] bg-[rgba(255,149,0,0.12)]" : "text-[#C9B99A] hover:text-[#FF9500]"}`}
            title="Choose a photo"
          >
            <ImageIcon size={17} />
          </button>
          <button
            onClick={() => videoInputRef.current?.click()}
            className={`p-2 rounded transition-colors ${videoFile ? "text-[#FF9500] bg-[rgba(255,149,0,0.12)]" : "text-[#C9B99A] hover:text-[#FF9500]"}`}
            title="Choose a video"
          >
            <Video size={17} />
          </button>
        </div>
        <button
          onClick={submit}
          disabled={loading || (!body.trim() && !imageFile && !videoFile)}
          className="flex items-center gap-2 px-4 py-2 bg-[#FF9500] text-[#182635] text-xs font-bold rounded hover:bg-[#CC6A00] transition-colors disabled:opacity-40"
        >
          {loading ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Send size={14} />
          )}{" "}
          Post
        </button>
      </div>
    </div>
  );
}

// ─── admin composer ───────────────────────────────────────────────────────────
function FeedComposer({
  onPosted,
  onAdminSessionExpired,
}: {
  onPosted: () => void;
  onAdminSessionExpired: () => void;
}) {
  const [body, setBody] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [linkTitle, setLinkTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoMode, setVideoMode] = useState<"none" | "embed" | "file">("none");
  const [embedVideoUrl, setEmbedVideoUrl] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [uploadPct, setUploadPct] = useState<number | null>(null);
  const [status, setStatus] = useState("");
  const [showExtras, setShowExtras] = useState<
    "none" | "link" | "image" | "video"
  >("none");
  const pendingRef = useRef<{ uploadId: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const createMutation = trpc.feed.create.useMutation();
  const imageSignature = trpc.feed.createImageUploadSignature.useMutation();
  const uploadUrlMutation = trpc.feed.createVideoUpload.useMutation();
  const confirmMutation = trpc.feed.confirmVideoUpload.useMutation();

  const busy =
    createMutation.isPending ||
    imageSignature.isPending ||
    uploadUrlMutation.isPending ||
    confirmMutation.isPending ||
    uploadPct !== null;

  const reset = () => {
    setBody("");
    setLinkUrl("");
    setLinkTitle("");
    setImageUrl("");
    setImageFile(null);
    setVideoMode("none");
    setEmbedVideoUrl("");
    setVideoFile(null);
    setUploadPct(null);
    setStatus("");
    setShowExtras("none");
    pendingRef.current = null;
    if (imageInputRef.current) imageInputRef.current.value = "";
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const finishMuxPost = async (uploadId: string, text: string) => {
    for (let attempt = 0; attempt < 15; attempt++) {
      setStatus(
        attempt === 0
          ? "Processing video…"
          : `Processing video… (${attempt + 1})`
      );
      const res = await confirmMutation.mutateAsync({ uploadId, body: text });
      if (res.ready) {
        setStatus("");
        reset();
        onPosted();
        return;
      }
      await new Promise(r => setTimeout(r, 4000));
    }
    setStatus(
      "Video is still processing on Mux. Your text is saved below — press Post again in a minute to finish publishing."
    );
    pendingRef.current = { uploadId };
    setUploadPct(null);
  };

  const submit = async () => {
    const text = body.trim();
    if (
      !text &&
      !imageFile &&
      !videoFile &&
      !linkUrl.trim() &&
      !embedVideoUrl.trim()
    )
      return;
    setStatus("");

    if (pendingRef.current && videoMode === "file") {
      await finishMuxPost(pendingRef.current.uploadId, text);
      return;
    }

    if (videoMode === "file" && videoFile) {
      try {
        setStatus("Preparing upload…");
        const { uploadId, uploadUrl } = await uploadUrlMutation.mutateAsync({
          corsOrigin: window.location.origin,
        });
        await new Promise<void>((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open("PUT", uploadUrl);
          xhr.setRequestHeader(
            "Content-Type",
            videoFile.type || "application/octet-stream"
          );
          xhr.upload.onprogress = e => {
            if (e.lengthComputable)
              setUploadPct(Math.round((e.loaded / e.total) * 100));
          };
          xhr.onload = () =>
            xhr.status >= 200 && xhr.status < 300
              ? resolve()
              : reject(new Error(`Upload failed (${xhr.status})`));
          xhr.onerror = () =>
            reject(new Error("Upload failed — network error"));
          xhr.send(videoFile);
        });
        pendingRef.current = { uploadId };
        await finishMuxPost(uploadId, text);
      } catch (err: any) {
        if (isAdminPermissionError(err)) {
          onAdminSessionExpired();
          return;
        }
        setStatus(err?.message || "Upload failed");
        setUploadPct(null);
      }
      return;
    }

    try {
      let uploadedImageUrl = "";
      if (imageFile) {
        setStatus("Uploading image…");
        const signed = await imageSignature.mutateAsync();
        const form = new FormData();
        form.append("file", imageFile);
        form.append("api_key", signed.apiKey);
        form.append("timestamp", String(signed.timestamp));
        form.append("folder", signed.folder);
        form.append("signature", signed.signature);
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${signed.cloudName}/image/upload`,
          { method: "POST", body: form }
        );
        if (!response.ok) throw new Error("Image upload failed");
        const uploaded = (await response.json()) as { secure_url: string };
        uploadedImageUrl = uploaded.secure_url;
      }
      await createMutation.mutateAsync({
        body: text,
        linkUrl: linkUrl.trim() || "",
        linkTitle: linkTitle.trim() || undefined,
        imageUrl: uploadedImageUrl || imageUrl.trim() || "",
        videoUrl: videoMode === "embed" ? embedVideoUrl.trim() : "",
        videoType: videoMode === "embed" ? "embed" : "upload",
      });
      reset();
      onPosted();
    } catch (err: any) {
      if (isAdminPermissionError(err)) {
        onAdminSessionExpired();
        return;
      }
      setStatus(err?.message || "Could not publish post");
    }
  };

  return (
    <div className="rounded-lg border border-[rgba(255,149,0,0.25)] bg-[#25364B] p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-[rgba(255,149,0,0.15)] border border-[rgba(255,149,0,0.4)] flex items-center justify-center">
          <Crown size={18} className="text-[#FF9500]" />
        </div>
        <div>
          <p className="text-[#F0EBE1] text-sm font-medium">Ronald Lee King</p>
          <p className="text-[#C9B99A] text-[11px] uppercase tracking-[0.15em]">
            Posting to #TheKingsTake
          </p>
        </div>
      </div>

      <textarea
        value={body}
        onChange={e => setBody(e.target.value)}
        onPaste={e => {
          const file = Array.from(e.clipboardData.items)
            .find(item => item.type.startsWith("image/"))
            ?.getAsFile();
          if (!file) return;
          e.preventDefault();
          if (file.size > 10 * 1024 * 1024) {
            alert("Images must be 10 MB or smaller");
            return;
          }
          setImageFile(file);
          setShowExtras("image");
        }}
        placeholder="What's the take today? Share news, a link, a video…"
        rows={3}
        className="w-full bg-[#182635] border border-[rgba(255,149,0,0.2)] rounded px-3 py-2.5 text-[#F0EBE1] text-sm placeholder-[#C9B99A]/40 focus:outline-none focus:border-[#FF9500] resize-y"
      />

      {showExtras === "link" && (
        <div className="mt-2 space-y-2">
          <input
            value={linkUrl}
            onChange={e => setLinkUrl(e.target.value)}
            placeholder="Link URL (https://…)"
            className="w-full bg-[#182635] border border-[rgba(255,149,0,0.2)] rounded px-3 py-2 text-[#F0EBE1] text-sm focus:outline-none focus:border-[#FF9500]"
          />
          <input
            value={linkTitle}
            onChange={e => setLinkTitle(e.target.value)}
            placeholder="Headline for this link (optional)"
            className="w-full bg-[#182635] border border-[rgba(255,149,0,0.2)] rounded px-3 py-2 text-[#F0EBE1] text-sm focus:outline-none focus:border-[#FF9500]"
          />
        </div>
      )}
      {showExtras === "image" && (
        <div className="mt-2">
          <input
            ref={imageInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={e => {
              const file = e.target.files?.[0] || null;
              if (file && file.size > 10 * 1024 * 1024) {
                alert("Images must be 10 MB or smaller");
                e.target.value = "";
                return;
              }
              setImageFile(file);
            }}
          />
          <button
            onClick={() => imageInputRef.current?.click()}
            className="w-full rounded border border-dashed border-[rgba(255,149,0,0.35)] py-2.5 text-sm text-[#C9B99A] transition-colors hover:border-[#FF9500] hover:text-[#FFB840]"
          >
            {imageFile
              ? `${imageFile.name} (${(imageFile.size / 1024 / 1024).toFixed(1)} MB)`
              : "Choose a photo from this device"}
          </button>
        </div>
      )}
      {showExtras === "video" && (
        <div className="mt-2 space-y-2">
          <div className="flex gap-2">
            <button
              onClick={() => setVideoMode("embed")}
              className={`flex-1 py-1.5 text-xs rounded border ${videoMode === "embed" ? "border-[#FF9500] text-[#FFB840] bg-[rgba(255,149,0,0.1)]" : "border-[rgba(255,149,0,0.2)] text-[#C9B99A]"}`}
            >
              YouTube / Vimeo link
            </button>
            <button
              onClick={() => setVideoMode("file")}
              className={`flex-1 py-1.5 text-xs rounded border ${videoMode === "file" ? "border-[#FF9500] text-[#FFB840] bg-[rgba(255,149,0,0.1)]" : "border-[rgba(255,149,0,0.2)] text-[#C9B99A]"}`}
            >
              Upload video file
            </button>
          </div>
          {videoMode === "embed" && (
            <input
              value={embedVideoUrl}
              onChange={e => setEmbedVideoUrl(e.target.value)}
              placeholder="Paste YouTube or Vimeo URL"
              className="w-full bg-[#182635] border border-[rgba(255,149,0,0.2)] rounded px-3 py-2 text-[#F0EBE1] text-sm focus:outline-none focus:border-[#FF9500]"
            />
          )}
          {videoMode === "file" && (
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                className="hidden"
                onChange={e => {
                  const file = e.target.files?.[0] || null;
                  if (file && file.size > 500 * 1024 * 1024) {
                    alert("Videos must be 500 MB or smaller");
                    e.target.value = "";
                    return;
                  }
                  setVideoFile(file);
                }}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-2.5 border border-dashed border-[rgba(255,149,0,0.35)] rounded text-[#C9B99A] text-sm hover:border-[#FF9500] hover:text-[#FFB840] transition-colors"
              >
                {videoFile
                  ? `${videoFile.name} (${(videoFile.size / 1024 / 1024).toFixed(1)} MB)`
                  : "Choose a video from this device"}
              </button>
            </div>
          )}
        </div>
      )}

      {uploadPct !== null && (
        <div className="mt-3">
          <div className="h-1.5 bg-[#182635] rounded overflow-hidden">
            <div
              className="h-full bg-[#FF9500] transition-all"
              style={{ width: `${uploadPct}%` }}
            />
          </div>
          <p className="text-[#C9B99A] text-xs mt-1">Uploading… {uploadPct}%</p>
        </div>
      )}
      {status && <p className="text-[#FFB840] text-xs mt-2">{status}</p>}

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-[rgba(240,235,225,0.08)]">
        <div className="flex gap-1">
          {(
            [
              ["link", Link2, "Add link"],
              ["image", ImageIcon, "Add image"],
              ["video", Video, "Add video"],
            ] as const
          ).map(([key, Icon, title]) => (
            <button
              key={key}
              title={title}
              onClick={() => setShowExtras(showExtras === key ? "none" : key)}
              className={`p-2 rounded transition-colors ${showExtras === key ? "text-[#FF9500] bg-[rgba(255,149,0,0.12)]" : "text-[#C9B99A] hover:text-[#FF9500]"}`}
            >
              <Icon size={17} />
            </button>
          ))}
        </div>
        <button
          onClick={submit}
          disabled={
            busy ||
            (!body.trim() &&
              !imageFile &&
              !videoFile &&
              !linkUrl.trim() &&
              !embedVideoUrl.trim())
          }
          className="flex items-center gap-2 px-5 py-2 bg-[#FF9500] text-[#182635] text-sm font-semibold rounded hover:bg-[#FFB840] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {busy ? (
            <Loader2 size={15} className="animate-spin" />
          ) : (
            <Send size={15} />
          )}{" "}
          Post
        </button>
      </div>
    </div>
  );
}

// ─── admin go-live panel ──────────────────────────────────────────────────────
function GoLivePanel({
  onAdminSessionExpired,
}: {
  onAdminSessionExpired: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [keys, setKeys] = useState<{
    rtmpUrl: string;
    streamKey: string;
  } | null>(null);
  const [copied, setCopied] = useState<"url" | "key" | null>(null);
  const [error, setError] = useState("");

  const goLive = trpc.live.goLive.useMutation();
  const endLive = trpc.live.endLive.useMutation();
  const utils = trpc.useUtils();

  const copy = (text: string, which: "url" | "key") => {
    navigator.clipboard.writeText(text);
    setCopied(which);
    setTimeout(() => setCopied(null), 1500);
  };

  const start = async () => {
    setError("");
    try {
      const res = await goLive.mutateAsync({
        title: title.trim() || "Live Broadcast",
      });
      setKeys({ rtmpUrl: res.rtmpUrl, streamKey: res.streamKey });
      utils.live.status.invalidate();
    } catch (err: any) {
      if (isAdminPermissionError(err)) {
        onAdminSessionExpired();
        return;
      }
      setError(err?.message || "Could not create live stream");
    }
  };

  const stop = async () => {
    try {
      await endLive.mutateAsync({});
      setKeys(null);
      setTitle("");
      utils.live.status.invalidate();
    } catch (err) {
      if (isAdminPermissionError(err)) {
        onAdminSessionExpired();
        return;
      }
      setError(
        err instanceof Error ? err.message : "Could not end live stream"
      );
    }
  };

  return (
    <div className="rounded-lg border border-[rgba(255,60,60,0.3)] bg-[#25364B] p-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between"
      >
        <span className="flex items-center gap-2 text-[#F0EBE1] text-sm font-medium">
          <Radio size={16} className="text-red-400" /> Go Live from your phone
        </span>
        <span className="text-[#C9B99A] text-xs uppercase tracking-[0.15em]">
          {open ? "Hide" : "Show"}
        </span>
      </button>

      {open && (
        <div className="mt-4 space-y-3">
          {!keys ? (
            <>
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Broadcast title (e.g. Evening Take)"
                className="w-full bg-[#182635] border border-[rgba(255,149,0,0.2)] rounded px-3 py-2 text-[#F0EBE1] text-sm focus:outline-none focus:border-[#FF9500]"
              />
              <button
                onClick={start}
                disabled={goLive.isPending}
                className="w-full py-2.5 bg-red-600 text-white text-sm font-semibold rounded hover:bg-red-500 transition-colors disabled:opacity-40 flex items-center justify-center gap-2"
              >
                {goLive.isPending ? (
                  <Loader2 size={15} className="animate-spin" />
                ) : (
                  <Radio size={15} />
                )}{" "}
                Create live stream
              </button>
              {error && <p className="text-red-400 text-xs">{error}</p>}
            </>
          ) : (
            <>
              <p className="text-[#C9B99A] text-xs leading-relaxed">
                On your phone, open a streaming app such as{" "}
                <span className="text-[#FFB840]">Larix Broadcaster</span> (free,
                iOS/Android) and add a new RTMP connection with these two
                values. Start streaming in the app and you are live on this
                page.
              </p>
              {(
                [
                  ["Server URL", keys.rtmpUrl, "url"],
                  ["Stream key", keys.streamKey, "key"],
                ] as const
              ).map(([label, value, which]) => (
                <div
                  key={which}
                  className="flex items-center gap-2 bg-[#182635] rounded px-3 py-2 border border-[rgba(255,149,0,0.2)]"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] uppercase tracking-[0.15em] text-[#C9B99A]">
                      {label}
                    </p>
                    <p className="text-[#F0EBE1] text-xs truncate font-mono">
                      {value}
                    </p>
                  </div>
                  <button
                    onClick={() => copy(value, which)}
                    className="text-[#FFB840] hover:text-[#FF9500] p-1"
                  >
                    {copied === which ? (
                      <Check size={15} />
                    ) : (
                      <Copy size={15} />
                    )}
                  </button>
                </div>
              ))}
              <button
                onClick={stop}
                disabled={endLive.isPending}
                className="w-full py-2.5 border border-red-500/50 text-red-400 text-sm font-semibold rounded hover:bg-red-500/10 transition-colors flex items-center justify-center gap-2"
              >
                <Square size={14} /> End broadcast
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

// ─── post card ────────────────────────────────────────────────────────────────
function PostCard({
  post,
  isAdmin,
  onChanged,
}: {
  post: FeedPost;
  isAdmin: boolean;
  onChanged: () => void;
}) {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [showAuth, setShowAuth] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const { member } = useMember();
  const canInteract = Boolean(member || isAdmin);

  const likeMutation = trpc.member.likePost.useMutation();
  const isLikedQuery = trpc.member.isLiked.useQuery(
    { postId: post.id },
    { enabled: canInteract }
  );
  const commentsQuery = trpc.member.listComments.useQuery(
    { postId: post.id },
    { enabled: showComments }
  );
  const createComment = trpc.member.createComment.useMutation();
  const deleteMutation = trpc.feed.delete.useMutation({ onSuccess: onChanged });
  const pinMutation = trpc.feed.togglePin.useMutation({ onSuccess: onChanged });
  const utils = trpc.useUtils();

  const handleLike = async () => {
    if (!canInteract) {
      setShowAuth(true);
      return;
    }
    await likeMutation.mutateAsync({ postId: post.id });
    utils.member.isLiked.invalidate({ postId: post.id });
    utils.feed.list.invalidate();
  };

  const handleShare = async () => {
    const author = post.memberName || "Ronald Lee King";
    const url = postShareUrl(post);
    const data = {
      title: `${author} on #TheKingsTake`,
      text: post.body.slice(0, 180),
      url,
    };
    if (navigator.share) {
      await navigator.share(data).catch(() => undefined);
      return;
    }
    setShowShare(true);
  };

  const copyShareLink = async () => {
    await navigator.clipboard.writeText(postShareUrl(post));
    setCopiedShare(true);
    window.setTimeout(() => setCopiedShare(false), 1800);
  };

  const handleComment = async () => {
    if (!canInteract) {
      setShowAuth(true);
      return;
    }
    if (!commentText.trim()) return;
    await createComment.mutateAsync({
      postId: post.id,
      content: commentText.trim(),
    });
    setCommentText("");
    utils.member.listComments.invalidate({ postId: post.id });
    utils.feed.list.invalidate();
  };

  return (
    <>
      <MemberAuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
      <AnimatePresence>
        {showShare && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowShare(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              onClick={event => event.stopPropagation()}
              className="w-full max-w-md overflow-hidden rounded-xl border border-[rgba(255,149,0,0.35)] bg-[#182635] shadow-2xl"
            >
              <div className="relative aspect-[1.91/1] bg-[#0f1924]">
                <img
                  src={postPreviewImage(post)}
                  alt="Post preview"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#101a26] to-transparent px-4 pb-3 pt-12">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#FFB840]">
                    #TheKingsTake
                  </p>
                </div>
                <button
                  onClick={() => setShowShare(false)}
                  className="absolute right-3 top-3 rounded-full bg-black/60 p-1.5 text-white hover:bg-black/80"
                  aria-label="Close share window"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="p-4">
                <h3
                  className="text-lg text-[#F0EBE1]"
                  style={{ fontFamily: "Newsreader, serif" }}
                >
                  {post.memberName || "Ronald Lee King"} on #TheKingsTake
                </h3>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#C9B99A]">
                  {post.body || "A community post from TheKingsTake.com"}
                </p>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postShareUrl(post))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-[#1877F2] px-3 py-2.5 text-center text-xs font-semibold text-white"
                  >
                    Facebook
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${post.memberName || "Ronald Lee King"} on #TheKingsTake`)}&url=${encodeURIComponent(postShareUrl(post))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-black px-3 py-2.5 text-center text-xs font-semibold text-white"
                  >
                    X / Twitter
                  </a>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`${post.memberName || "Ronald Lee King"} on #TheKingsTake ${postShareUrl(post)}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-[#25D366] px-3 py-2.5 text-center text-xs font-semibold text-[#102018]"
                  >
                    WhatsApp
                  </a>
                  <button
                    onClick={copyShareLink}
                    className="flex items-center justify-center gap-1.5 rounded-lg border border-[rgba(255,149,0,0.35)] px-3 py-2.5 text-xs font-semibold text-[#FFB840]"
                  >
                    {copiedShare ? <Check size={14} /> : <Copy size={14} />}{" "}
                    {copiedShare ? "Copied" : "Copy link"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.article
        id={`post-${post.id}`}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-lg border p-4 backdrop-blur-sm ${post.pinned ? "border-[rgba(255,149,0,0.5)] shadow-[0_0_30px_rgba(255,149,0,0.08)]" : "border-[rgba(255,149,0,0.18)]"}`}
        style={{
          background:
            "linear-gradient(165deg, rgba(37,54,75,0.88), rgba(24,38,53,0.92))",
        }}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[rgba(255,149,0,0.15)] border border-[rgba(255,149,0,0.4)] flex items-center justify-center shrink-0">
              <Crown size={18} className="text-[#FF9500]" />
            </div>
            <div>
              <p className="text-[#F0EBE1] text-sm font-medium">
                {post.memberName || "Ronald Lee King"}{" "}
                <span className="text-[#FF9500]">
                  · {post.memberId ? "Royal Member" : "#TheKingsTake"}
                </span>
              </p>
              <p className="text-[#C9B99A] text-[11px]">
                {timeAgo(post.createdAt)}
                {post.pinned && (
                  <span className="text-[#FFB840] ml-2">· Pinned</span>
                )}
              </p>
            </div>
          </div>
          {isAdmin && (
            <div className="flex gap-1 shrink-0">
              <button
                title={post.pinned ? "Unpin" : "Pin to top"}
                onClick={() => pinMutation.mutate({ id: post.id })}
                className="p-1.5 text-[#C9B99A] hover:text-[#FFB840] transition-colors"
              >
                {post.pinned ? <PinOff size={15} /> : <Pin size={15} />}
              </button>
              <button
                title="Delete post"
                onClick={() => {
                  if (confirm("Delete this post?"))
                    deleteMutation.mutate({ id: post.id });
                }}
                className="p-1.5 text-[#C9B99A] hover:text-red-400 transition-colors"
              >
                <Trash2 size={15} />
              </button>
            </div>
          )}
        </div>

        <p className="text-[#F0EBE1] text-[15px] leading-relaxed mt-3 whitespace-pre-wrap">
          {linkify(post.body)}
        </p>

        {post.linkUrl && (
          <a
            href={post.linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center gap-3 bg-[#182635] border border-[rgba(255,149,0,0.2)] rounded px-4 py-3 hover:border-[#FF9500] transition-colors group"
          >
            <ExternalLink size={16} className="text-[#FF9500] shrink-0" />
            <div className="min-w-0">
              <p className="text-[#F0EBE1] text-sm group-hover:text-[#FFB840] transition-colors truncate">
                {post.linkTitle || post.linkUrl}
              </p>
              <p className="text-[#C9B99A] text-xs truncate">
                {new URL(post.linkUrl).hostname}
              </p>
            </div>
          </a>
        )}

        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt=""
            className="mt-3 rounded w-full object-cover max-h-[480px] border border-[rgba(255,149,0,0.15)]"
            loading="lazy"
          />
        )}

        {post.muxPlaybackId && (
          <div className="mt-3 rounded overflow-hidden border border-[rgba(255,149,0,0.15)]">
            <MuxPlayer
              playbackId={post.muxPlaybackId}
              accentColor="#FF9500"
              style={{ width: "100%", aspectRatio: "16/9" }}
            />
          </div>
        )}
        {!post.muxPlaybackId && post.videoUrl && post.videoType === "embed" && (
          <div
            className="mt-3 rounded overflow-hidden border border-[rgba(255,149,0,0.15)]"
            style={{ aspectRatio: "16/9" }}
          >
            <iframe
              src={embedUrl(post.videoUrl)}
              className="w-full h-full"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
        )}
        {!post.muxPlaybackId &&
          post.videoUrl &&
          post.videoType === "upload" && (
            <video
              src={post.videoUrl}
              controls
              className="mt-3 rounded w-full border border-[rgba(255,149,0,0.15)]"
            />
          )}

        {/* Actions */}
        <div className="mt-3 pt-3 border-t border-[rgba(240,235,225,0.08)] flex items-center gap-4">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 text-sm transition-colors ${isLikedQuery.data?.liked ? "text-[#FF9500]" : "text-[#C9B99A] hover:text-[#FF9500]"}`}
          >
            <Heart
              size={16}
              fill={isLikedQuery.data?.liked ? "#FF9500" : "none"}
            />{" "}
            {post.likesCount > 0 ? post.likesCount : ""} Like
          </button>
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1.5 text-sm text-[#C9B99A] hover:text-[#FF9500] transition-colors"
          >
            <MessageCircle size={16} /> Comments
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-sm text-[#C9B99A] hover:text-[#FF9500] transition-colors"
          >
            <Share2 size={16} /> Share
          </button>
        </div>

        {/* Comments */}
        <AnimatePresence>
          {showComments && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-3 pt-3 border-t border-[rgba(240,235,225,0.06)] space-y-3">
                {/* Comment form */}
                {canInteract ? (
                  <div className="flex gap-2">
                    <input
                      value={commentText}
                      onChange={e => setCommentText(e.target.value)}
                      placeholder="Write a comment..."
                      onKeyDown={e => e.key === "Enter" && handleComment()}
                      className="flex-1 bg-[#182635] border border-[rgba(255,149,0,0.15)] rounded-lg px-3 py-2 text-sm text-[#F0EBE1] placeholder-[#C9B99A]/40 focus:outline-none focus:border-[#FF9500]"
                    />
                    <button
                      onClick={handleComment}
                      disabled={!commentText.trim() || createComment.isPending}
                      className="px-3 py-2 bg-[#FF9500] text-[#182635] text-xs font-bold rounded-lg hover:bg-[#CC6A00] transition-colors disabled:opacity-40"
                    >
                      <Send size={14} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowAuth(true)}
                    className="w-full py-2 text-xs text-[#C9B99A] border border-dashed border-[rgba(255,149,0,0.2)] rounded-lg hover:text-[#FF9500] hover:border-[#FF9500]/30 transition-colors"
                  >
                    Log in to comment
                  </button>
                )}

                {/* Comment list */}
                {commentsQuery.isLoading && (
                  <div className="text-center py-2">
                    <Loader2
                      size={14}
                      className="animate-spin inline text-[#C9B99A]"
                    />
                  </div>
                )}
                {commentsQuery.data?.map(comment => (
                  <div key={comment.id} className="flex gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[rgba(255,149,0,0.12)] border border-[rgba(255,149,0,0.3)] flex items-center justify-center shrink-0">
                      {comment.memberAvatar ? (
                        <img
                          src={comment.memberAvatar}
                          alt=""
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <User size={12} className="text-[#FF9500]" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[#F0EBE1] text-xs font-medium">
                          {comment.memberName || "Member"}
                        </span>
                        <span className="text-[#C9B99A]/50 text-[10px]">
                          {timeAgo(comment.createdAt)}
                        </span>
                      </div>
                      <p className="text-[#C9B99A] text-xs leading-relaxed mt-0.5">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.article>
    </>
  );
}
