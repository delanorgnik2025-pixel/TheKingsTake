import { useState } from "react";
import { parseVideo, safeAsset, videoSource } from "@contracts/video-news";
export default function VideoNewsPlayer({ value }: { value?: string | null }) {
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const video = parseVideo(value);
  if (!video) return null;
  const src = videoSource(video.provider, video.url)!;
  return <section className="my-8 rounded-2xl border border-[#FFB840]/25 bg-[#101b28] p-4 text-[#F0EBE1]">
    <h2 className="mb-3 text-xl">{video.title}</h2>
    <div className="mx-auto w-full overflow-hidden rounded-xl bg-black" style={{ aspectRatio: video.aspectRatio === "9:16" ? "9 / 16" : "16 / 9", maxWidth: video.aspectRatio === "9:16" ? 380 : undefined }}>
      {!playing ? <button type="button" onClick={() => setPlaying(true)} className="relative flex h-full w-full items-center justify-center" aria-label={`Play ${video.title}`}>{video.poster && <img src={safeAsset(video.poster)!} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-60" />}<span className="relative rounded-full bg-[#FFB840] px-6 py-3 font-bold text-[#101b28]">▶ Watch report</span></button> : video.provider === "direct" ? <video className="h-full w-full" src={src} poster={video.poster ? safeAsset(video.poster)! : undefined} onError={() => setFailed(true)} controls playsInline preload="metadata">{video.captions && <track kind="captions" src={safeAsset(video.captions)!} srcLang="en" label="English" default />}Your browser cannot play this video.</video> : <iframe className="h-full w-full border-0" src={src} title={video.title} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allow="fullscreen; encrypted-media; picture-in-picture" allowFullScreen />}
    </div>
    {failed && <p role="alert" className="mt-3 text-sm text-[#FFB840]">Video is unavailable. The full report remains available below.</p>}
    {video.description && <p className="mt-3 text-sm text-[#C9B99A]">{video.description}</p>}
    {video.transcript && <details className="mt-3"><summary className="cursor-pointer">Read transcript</summary><p className="mt-3 whitespace-pre-wrap text-sm">{video.transcript}</p></details>}
    <a className="mt-4 block text-sm font-bold text-[#FFB840]" href="#full-report">THE STORY DOESN’T END WITH THE REEL — READ THE FULL REPORT.</a>
  </section>;
}
