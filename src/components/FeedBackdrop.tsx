// Ambient animated backdrop for The Feed — layered radial glows, drifting
// nebula fields, and a rising ember particle field. Pure CSS/JSX, zero assets.
export default function FeedBackdrop() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#182635]">
      {/* deep-space gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(1200px 600px at 15% -5%, rgba(255,149,0,0.10), transparent 60%),' +
            'radial-gradient(900px 500px at 85% 10%, rgba(60,110,180,0.12), transparent 60%),' +
            'radial-gradient(1000px 700px at 50% 110%, rgba(255,60,60,0.06), transparent 65%)',
        }}
      />
      {/* slow drifting nebula blobs */}
      <div className="feed-nebula feed-nebula-a" />
      <div className="feed-nebula feed-nebula-b" />
      {/* starfield / ember particles */}
      <div className="feed-stars" />
      <div className="feed-stars feed-stars-2" />
      {/* faint vertical scan sheen */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(180deg, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 4px)',
        }}
      />
      <style>{`
        .feed-nebula {
          position: absolute;
          border-radius: 9999px;
          filter: blur(90px);
          opacity: 0.35;
        }
        .feed-nebula-a {
          width: 55vw; height: 55vw; left: -18vw; top: -12vw;
          background: radial-gradient(circle, rgba(255,149,0,0.28), transparent 65%);
          animation: feedDriftA 46s ease-in-out infinite alternate;
        }
        .feed-nebula-b {
          width: 48vw; height: 48vw; right: -16vw; top: 30vh;
          background: radial-gradient(circle, rgba(70,120,200,0.30), transparent 65%);
          animation: feedDriftB 58s ease-in-out infinite alternate;
        }
        @keyframes feedDriftA {
          0%   { transform: translate(0,0) scale(1); }
          100% { transform: translate(9vw, 7vh) scale(1.15); }
        }
        @keyframes feedDriftB {
          0%   { transform: translate(0,0) scale(1.1); }
          100% { transform: translate(-8vw, -6vh) scale(0.95); }
        }
        .feed-stars {
          position: absolute; inset: -50% 0 0 0;
          background-image:
            radial-gradient(1px 1px at 20% 30%, rgba(255,220,160,0.9) 50%, transparent 51%),
            radial-gradient(1px 1px at 65% 15%, rgba(255,255,255,0.7) 50%, transparent 51%),
            radial-gradient(1.5px 1.5px at 80% 55%, rgba(255,184,64,0.8) 50%, transparent 51%),
            radial-gradient(1px 1px at 40% 70%, rgba(255,255,255,0.5) 50%, transparent 51%),
            radial-gradient(1px 1px at 10% 85%, rgba(255,220,160,0.6) 50%, transparent 51%),
            radial-gradient(1.5px 1.5px at 90% 90%, rgba(255,255,255,0.7) 50%, transparent 51%),
            radial-gradient(1px 1px at 50% 45%, rgba(255,184,64,0.5) 50%, transparent 51%);
          background-size: 640px 640px;
          animation: feedRise 120s linear infinite;
        }
        .feed-stars-2 {
          animation-duration: 190s;
          background-size: 480px 480px;
          opacity: 0.5;
          transform: scale(1.4);
        }
        @keyframes feedRise {
          from { transform: translateY(0); }
          to   { transform: translateY(-50%); }
        }
      `}</style>
    </div>
  )
}
