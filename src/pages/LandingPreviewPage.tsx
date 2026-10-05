import { useSearchParams } from 'react-router'
import NoirHeroSection from '../sections/NoirHeroSection'
export default function LandingPreviewPage() {
 const [params] = useSearchParams()
 if (params.get('mobile') === '1') return <main className="min-h-screen bg-[#0b1420] pt-20"><p className="mb-4 text-center text-sm text-[#e6b66b]">Mobile layout · 390 pixels</p><iframe title="Mobile landing page preview" src="/admin/design-preview" width="390" height="844" className="mx-auto block max-w-full rounded-3xl border border-white/15"/></main>
 return <main className="pt-16"><NoirHeroSection/></main>
}
