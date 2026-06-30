import { Sparkles } from 'lucide-react'
import ExperiencePage from '../features/ancestor-realm/components/ExperiencePage'

const DATA = {
  icon: Sparkles,
  title: 'Story Keeper',
  headline: 'The Oral Tradition Vault',
  description: 'Before there were written records, there were voices. Before there were archives, there were elders who spoke the names of the dead into the ears of the living. The Story Keeper honors the mouths that carried your name across time — transforming spoken memories into living narratives that breathe, speak, and resonate with the power of truth passed down through generations.',
  features: [
    'Record and preserve oral family stories and testimonies',
    'Transform spoken memories into written living narratives',
    'Honor the elders who kept your lineage alive through storytelling',
    'Weave together fragmented family histories into cohesive tales',
    'Ensure no story is lost to the silence of time',
  ],
  closing: 'The voice of the ancestor becomes the story of the child. Pass it on.',
}

export default function StoryKeeperPage() {
  return <ExperiencePage data={DATA} />
}
