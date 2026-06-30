import { Upload } from 'lucide-react'
import ExperiencePage from '../features/ancestor-realm/components/ExperiencePage'

const DATA = {
  icon: Upload,
  title: 'Sacred Gallery',
  headline: 'The Memory Keepers Hall',
  description: 'Every photograph holds a spirit. Every document carries the weight of truth. The Sacred Gallery is where you preserve what the world tried to forget — birth records, family portraits, tribal enrollment cards, handwritten letters, land deeds, and the precious artifacts that trace your bloodline back through time. Here, memories become immortal.',
  features: [
    'Upload and preserve family photographs, documents, and records',
    'Organize memories by ancestor, generation, or story',
    'Share discoveries with family members and the community',
    'Connect documents to specific ancestors in your family tree',
    'Build a permanent digital archive of your lineage',
  ],
  closing: 'What you preserve today becomes the foundation for those who come tomorrow.',
}

export default function SacredGalleryPage() {
  return <ExperiencePage data={DATA} />
}
