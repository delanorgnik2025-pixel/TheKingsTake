export default function CultureCityBackdrop() {
  return <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#0b1018]">
    <img src="/images/culture-city-mobile-v2.webp" alt="" className="h-full w-full object-cover object-[center_65%] md:object-center" fetchPriority="high" />
    <div className="absolute inset-0 bg-gradient-to-b from-[#09121d]/25 via-[#09121d]/30 to-[#09121d]/65" />
  </div>;
}
