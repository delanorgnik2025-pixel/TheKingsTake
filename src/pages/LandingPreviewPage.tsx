import { useSearchParams } from 'react-router'
import BookCover from '../components/BookCover'
import NoirHeroSection from '../sections/NoirHeroSection'
export default function LandingPreviewPage() {
 const [params] = useSearchParams()
 if (params.get('mobile') === '1') return <main className="min-h-screen bg-[#0b1420] pt-20"><p className="mb-4 text-center text-sm text-[#e6b66b]">Mobile layout · 390 pixels</p><iframe title="Mobile landing page preview" src={params.get('book') === '1' ? '/admin/design-preview?book=1' : '/admin/design-preview'} width="390" height="844" className="mx-auto block max-w-full rounded-3xl border border-white/15"/></main>
 if (params.get('book') === '1') return <main className="min-h-screen bg-[#0b1420] px-6 pt-24 pb-12"><h1 className="mb-6 text-center text-2xl text-[#f5eee3]">Author-confirmed book cover</h1><div className="mx-auto max-w-md"><BookCover className="w-full h-auto rounded-lg"/></div></main>
 return <main className="pt-16"><NoirHeroSection/></main>
}
