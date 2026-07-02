import { useState } from 'react'
import { useNavigate } from 'react-router'

export default function AncestorRootRegistryPage() {
  const navigate = useNavigate()
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative w-full" style={{ height: 'calc(100dvh - 64px)' }}>
      {/* Background image — the artwork IS the interface */}
      <div className="absolute inset-0">
        <img
          src="/images/ancestor-root-registry-journey.jpg"
          alt="Ancestor Root Registry — Your Journey Begins Here"
          className={`w-full h-full object-cover object-center transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setLoaded(true)}
          loading="eager"
        />
        {!loaded && <div className="absolute inset-0 bg-[#05080e]" />}
      </div>

      {/* Invisible hotspot over the embedded CTA button */}
      <button
        onClick={() => navigate('/root-registry/step-1')}
        className="absolute z-10 cursor-pointer"
        style={{
          left: '56%',
          top: '78%',
          width: '37%',
          height: '9%',
          background: 'transparent',
          border: 'none',
          outline: 'none',
        }}
        aria-label="Your journey begins here"
      />

      {/* Mobile hotspot — slightly adjusted for narrower viewport */}
      <button
        onClick={() => navigate('/root-registry/step-1')}
        className="absolute z-10 cursor-pointer sm:hidden"
        style={{
          left: '10%',
          top: '76%',
          width: '80%',
          height: '12%',
          background: 'transparent',
          border: 'none',
          outline: 'none',
        }}
        aria-label="Your journey begins here"
      />
    </div>
  )
}
