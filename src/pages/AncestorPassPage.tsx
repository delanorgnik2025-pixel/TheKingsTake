import { Crown } from 'lucide-react'
import ExperiencePage from '../features/ancestor-realm/components/ExperiencePage'

const DATA = {
  icon: Crown,
  title: 'Ancestor Pass',
  headline: 'The Full Garden Awaits',
  description: 'Beyond the entrance lies the complete realm — every chamber, every path, every hidden corner of the ancestral garden. The Ancestor Pass unlocks the full experience: deeper access to your lineage, expanded family tree capabilities, priority access to new features, and the ability to walk the entire sacred ground without limitation. Your lineage deserves the complete journey.',
  features: [
    'Unlimited ancestors in your family constellation',
    'Full access to all realm chambers and experiences',
    'Priority access to new features and realms as they open',
    'Shareable family tree links to connect with relatives',
    'Cloud-synced research across all your devices',
    'Export your family tree as keepsake artifacts',
  ],
  closing: 'Your roots run deeper than you know. Walk the full path.',
}

export default function AncestorPassPage() {
  return <ExperiencePage data={DATA} />
}
