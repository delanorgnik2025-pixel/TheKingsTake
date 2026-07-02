export default function RootRegistryStep1() {
  return (
    <div className="min-h-screen bg-[#05080e] flex items-center justify-center px-6">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(255,149,0,0.04) 0%, transparent 60%)' }} />
      <div className="relative z-10 text-center">
        <p className="text-[10px] uppercase tracking-[0.25em] text-[#FF9500] mb-3">Step 1</p>
        <h1 className="text-2xl text-[#F0EBE1] mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
          Your Name
        </h1>
        <p className="text-sm text-[#C9B99A]/50">The registry form will appear here.</p>
      </div>
    </div>
  )
}
