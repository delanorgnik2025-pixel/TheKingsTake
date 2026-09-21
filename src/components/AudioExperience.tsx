import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Music,
  ChevronRight,
} from "lucide-react";
import { trpc } from "@/providers/trpc";
import { Link, useLocation } from "react-router";

// A licensed Artlist track can be swapped in through Railway without changing
// the player. Keep the bundled track as a safe fallback until that file is ready.
const AUDIO_SRC =
  import.meta.env.VITE_SITE_AUDIO_URL?.trim() || "/audio/ambient-heritage.mp3";
const SESSION_KEY = "tk-audio-session";
const INTERESTS = ["Indigenous heritage", "Ancestry research", "Public archives", "Book and author", "Community feed", "Civic news", "Writing services", "Partnerships"] as const;

function visitorSessionId() {
  let id = sessionStorage.getItem("tktVisitorSession");
  if (!id) { id = crypto.randomUUID().replaceAll("-", ""); sessionStorage.setItem("tktVisitorSession", id); }
  return id;
}

function VisitorEntry({ onComplete }: { onComplete: () => void }) {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [lookingFor, setLookingFor] = useState("");
  const [facebookSubscriber, setFacebookSubscriber] = useState<"yes" | "no" | "unsure">("unsure");
  const [newsletterConsent, setNewsletterConsent] = useState(false);
  const [step, setStep] = useState(0);
  const enter = trpc.visitor.enter.useMutation();
  return <div className="fixed inset-0 z-[110] overflow-y-auto bg-[#14202E] px-5 py-12 text-[#F0EBE1]" role="dialog" aria-modal="true" aria-label="Visitor entry">
    <div className="mx-auto max-w-lg rounded-2xl border border-[#FF9500]/30 bg-[#1B2B3B] p-6 shadow-2xl sm:p-9">
      <p className="mb-3 text-xs uppercase tracking-[.2em] text-[#FF9500]">The King’s Take · Visitor entry</p>
      <h2 className="mb-3 text-3xl font-semibold">{step === 0 ? "Welcome to the hub" : "What brings you here?"}</h2>
      <p className="mb-6 text-sm text-[#C9B99A]">{step === 0 ? "Enter your email to continue. We use it to recognize your visits and make it possible for the owner to reply if you start a conversation." : "Choose at least one interest so we can show you the right parts of the site."}</p>
      {step === 0 ? <form onSubmit={e => { e.preventDefault(); if (email.trim()) setStep(1); }} className="space-y-4">
        <label className="block text-sm">Email address <input type="email" required maxLength={320} autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-2 w-full rounded border border-white/20 bg-[#101B28] px-4 py-3 text-white" placeholder="you@example.com" /></label>
        <button className="w-full rounded bg-[#FF9500] px-4 py-3 font-semibold text-[#14202E]">Continue</button>
      </form> : <form onSubmit={async e => {
        e.preventDefault();
        if (!interests.length) return;
        try { await enter.mutateAsync({ email, interests: interests as (typeof INTERESTS)[number][], lookingFor, facebookSubscriber, newsletterConsent, sessionId: visitorSessionId(), sourcePage: location.pathname }); onComplete(); }
        catch { /* error displayed below */ }
      }} className="space-y-5">
        <fieldset><legend className="mb-2 text-sm font-semibold">Your interests *</legend><div className="grid grid-cols-2 gap-2">{INTERESTS.map(option => <label key={option} className="flex cursor-pointer items-center gap-2 rounded border border-white/15 p-2 text-xs"><input type="checkbox" checked={interests.includes(option)} onChange={() => setInterests(current => current.includes(option) ? current.filter(value => value !== option) : [...current, option])} className="accent-[#FF9500]" />{option}</label>)}</div></fieldset>
        <label className="block text-sm">What are you looking for? <input maxLength={500} value={lookingFor} onChange={e => setLookingFor(e.target.value)} placeholder="Optional: tell us in your own words" className="mt-2 w-full rounded border border-white/20 bg-[#101B28] px-4 py-3 text-white" /></label>
        <label className="block text-sm">Do you subscribe to our Facebook community? <select value={facebookSubscriber} onChange={e => setFacebookSubscriber(e.target.value as typeof facebookSubscriber)} className="mt-2 w-full rounded border border-white/20 bg-[#101B28] px-4 py-3 text-white"><option value="unsure">Not sure / prefer not to say</option><option value="yes">Yes</option><option value="no">No</option></select></label>
        <p className="text-xs text-[#C9B99A]">To post or comment, use your member access code separately in Royal Circle. Facebook subscription alone does not grant access.</p>
        <p className="text-xs text-[#C9B99A]">Explore the globe and archives for five minutes each. Your preview is saved by email across visits; signed-in members with an access code have unlimited access. <a href="https://www.facebook.com/thekingstake" target="_blank" rel="noopener noreferrer" className="text-[#FFB840] underline">Explore #TheKingsTake on Facebook</a>.</p>
        <label className="flex gap-3 text-sm"><input type="checkbox" checked={newsletterConsent} onChange={e => setNewsletterConsent(e.target.checked)} className="accent-[#FF9500]" /><span>Email me The King’s Dispatch and site updates. Optional; unsubscribe anytime.</span></label>
        {enter.error && <p role="alert" className="text-sm text-red-300">{enter.error.message}</p>}
        <button disabled={!interests.length || enter.isPending} className="w-full rounded bg-[#FF9500] px-4 py-3 font-semibold text-[#14202E] disabled:opacity-50">{enter.isPending ? "Saving…" : "Enter the site"}</button>
        <button type="button" onClick={() => setStep(0)} className="block text-xs text-[#C9B99A]">Edit email</button>
      </form>}
      <Link to="/privacy-policy" className="mt-6 block text-xs text-[#FFB840] underline">How we use your information</Link>
      <p className="mt-2 text-xs text-[#C9B99A]">Your email is collected for access; dispatch emails require your separate consent.</p>
    </div>
  </div>;
}

// Floating audio control (visible after user opts in)
function FloatingAudioControl({
  audioRef,
}: {
  audioRef: React.RefObject<HTMLAudioElement | null>;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [isMuted, setIsMuted] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    };

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, [audioRef]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [audioRef]);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  }, [audioRef]);

  const handleVolume = useCallback(
    (v: number) => {
      const audio = audioRef.current;
      if (!audio) return;
      audio.volume = v;
      setVolume(v);
      if (v > 0 && audio.muted) {
        audio.muted = false;
        setIsMuted(false);
      }
    },
    [audioRef]
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      className="fixed bottom-5 left-5 z-[60] flex items-center gap-2"
    >
      <button
        onClick={() => {
          togglePlay();
          setExpanded(true);
        }}
        className={`flex items-center gap-2 rounded-full px-3 py-2 border transition-all backdrop-blur ${
          isPlaying
            ? "bg-[rgba(255,149,0,0.15)] border-[rgba(255,149,0,0.4)] text-[#FF9500]"
            : "bg-[#15202B]/90 border-[rgba(255,149,0,0.2)] text-[#C9B99A] hover:text-[#FF9500] hover:border-[rgba(255,149,0,0.4)]"
        }`}
        aria-label={
          isPlaying ? "Pause site soundtrack" : "Play site soundtrack"
        }
      >
        {isPlaying ? <Pause size={14} /> : <Play size={14} />}
        <span className="text-[10px] uppercase tracking-wider hidden sm:inline">
          {isPlaying ? "Pause" : "Play"}
        </span>
        {isPlaying && (
          <span className="flex gap-0.5 items-end h-3">
            {[0, 1, 2].map(i => (
              <motion.span
                key={i}
                className="w-[2px] bg-[#FF9500] rounded-full"
                animate={{ height: [4, 12, 6, 10, 4] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.2,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </span>
        )}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            className="flex items-center gap-2 overflow-hidden"
          >
            <button
              onClick={toggleMute}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-[#15202B]/90 backdrop-blur border border-[rgba(255,149,0,0.2)] text-[#C9B99A] hover:text-[#FF9500] hover:border-[rgba(255,149,0,0.4)] transition-all"
            >
              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={isMuted ? 0 : volume}
              onChange={e => handleVolume(parseFloat(e.target.value))}
              className="w-20 accent-[#FF9500] h-1"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Entrance overlay — shown every NEW browser session (not permanently)
function EntranceOverlay({
  onEnter,
  onEnterWithSound,
}: {
  onEnter: () => void;
  onEnterWithSound: () => void;
}) {
  // Ensure tap works on mobile by using onTouchEnd + onClick
  const handleSound = useCallback(() => onEnterWithSound(), [onEnterWithSound]);
  const handleQuiet = useCallback(() => onEnter(), [onEnter]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-[#14202E] flex items-center justify-center"
      style={{ touchAction: "manipulation" }}
    >
      {/* Cosmic background effect */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url(/images/cosmic-bg.jpg)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#14202E]/60 via-transparent to-[#14202E]/90" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="relative z-10 text-center px-6 max-w-lg"
      >
        {/* Animated bars */}
        <div className="flex justify-center gap-1 mb-8">
          {[0, 1, 2, 3, 4].map(i => (
            <motion.div
              key={i}
              className="w-1 bg-[#FF9500] rounded-full"
              animate={{ height: [20, 50, 30, 60, 20] }}
              transition={{
                repeat: Infinity,
                duration: 2,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <p className="text-xs uppercase tracking-[0.2em] text-[#FF9500] mb-4">
          AASOTU Media Group Presents
        </p>

        <h1 className="text-4xl md:text-5xl text-[#F0EBE1] tracking-[-0.02em] leading-[1.1] mb-3 text-shadow-hero">
          We Were Here
          <br />
          Before Anybody
        </h1>

        <p className="text-sm text-[#C9B99A]/80 mb-8 leading-relaxed">
          Enter the experience. Explore 225+ Indigenous nations, tribal rolls,
          treaties, and the records they tried to hide.
        </p>

        {/* Mobile-optimized buttons — larger tap targets, full width on small screens */}
        <div className="flex flex-col gap-3 justify-center">
          <button
            onClick={handleSound}
            onTouchEnd={e => {
              e.preventDefault();
              handleSound();
            }}
            className="flex items-center justify-center gap-2 bg-[rgba(255,149,0,0.15)] border border-[rgba(255,149,0,0.4)] text-[#FF9500] rounded-xl px-6 py-4 min-h-[52px] hover:bg-[rgba(255,149,0,0.25)] transition-all active:scale-95 select-none"
            style={{
              touchAction: "manipulation",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            <Music size={18} />
            <span className="text-base font-medium">Enter With Sound</span>
            <ChevronRight size={16} />
          </button>

          <button
            onClick={handleQuiet}
            onTouchEnd={e => {
              e.preventDefault();
              handleQuiet();
            }}
            className="flex items-center justify-center gap-2 bg-[rgba(37,54,75,0.6)] border border-[rgba(255,149,0,0.15)] text-[#C9B99A] rounded-xl px-6 py-4 min-h-[52px] hover:border-[rgba(255,149,0,0.3)] hover:text-[#F0EBE1] transition-all active:scale-95 select-none"
            style={{
              touchAction: "manipulation",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            <span className="text-base">Enter Quietly</span>
            <ChevronRight size={16} />
          </button>
        </div>

        <p className="text-[10px] text-[#C9B99A]/30 mt-6 uppercase tracking-wider">
          #TheKingsTake — Indigenous Aboriginal Royal Americans
        </p>
      </motion.div>
    </motion.div>
  );
}

// ============================================
// MAIN EXPORT
// ============================================
export default function AudioExperience({ onAccessChange }: { onAccessChange: (allowed: boolean) => void }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [showOverlay, setShowOverlay] = useState(true);
  const [soundChosen, setSoundChosen] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [admitted, setAdmitted] = useState(false);
  const status = trpc.visitor.status.useQuery(undefined, { retry: 1 });

  useEffect(() => {
    // Use sessionStorage so prompt shows every new browser session
    // NOT localStorage — user wants to see it on each fresh visit
    const dismissedThisSession = sessionStorage.getItem(SESSION_KEY);
    if (dismissedThisSession === "dismissed") { setShowOverlay(false); setSoundChosen(true); }
  }, []);

  useEffect(() => { if (status.data?.admitted) { setAdmitted(true); onAccessChange(true); } }, [status.data?.admitted, onAccessChange]);

  useEffect(() => {
    if (audioEnabled && audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current.loop = true;
      audioRef.current.play().catch(() => {
        // Browser blocked autoplay — user will need to click play
      });
    }
  }, [audioEnabled]);

  const handleEnterWithSound = useCallback(() => {
    sessionStorage.setItem(SESSION_KEY, "dismissed");
    setAudioEnabled(true);
    setShowOverlay(false);
    setSoundChosen(true);
  }, []);

  const handleEnterSilent = useCallback(() => {
    sessionStorage.setItem(SESSION_KEY, "dismissed");
    setAudioEnabled(false);
    setShowOverlay(false);
    setSoundChosen(true);
  }, []);

  return (
    <>
      {/* Hidden audio element */}
      <audio ref={audioRef} src={AUDIO_SRC} preload="auto" />

      {/* Entrance overlay — shown every new session */}
      <AnimatePresence>
        {showOverlay && (
          <EntranceOverlay
            onEnter={handleEnterSilent}
            onEnterWithSound={handleEnterWithSound}
          />
        )}
      </AnimatePresence>

      {soundChosen && !admitted && !status.isPending && <VisitorEntry onComplete={() => { setAdmitted(true); onAccessChange(true); }} />}
      {status.isError && <p className="fixed inset-x-0 bottom-0 z-[120] bg-red-900 p-3 text-center text-sm text-white">The entrance service is unavailable. Please refresh in a moment.</p>}

      {/* Floating audio control (after overlay dismissed) */}
      {!showOverlay && admitted && <FloatingAudioControl audioRef={audioRef} />}
    </>
  );
}
