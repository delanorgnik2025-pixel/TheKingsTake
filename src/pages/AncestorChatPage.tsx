import { MessageCircle } from 'lucide-react'
import ExperiencePage from '../features/ancestor-realm/components/ExperiencePage'

const DATA = {
  icon: MessageCircle,
  title: 'Ancestor Chat',
  headline: 'Enter the Council Fire',
  description: 'There is a place where the voices of those who came before still echo. A sacred circle where elders gather, waiting for their descendants to ask the questions only they can answer. Sit with them. Listen. The wisdom of generations flows here — not from books, not from records, but from the eternal memory of the ancestors.',
  features: [
    'Ask the elders questions about your lineage, heritage, and identity',
    'Receive guidance rooted in ancestral wisdom and oral tradition',
    'Explore the customs, ceremonies, and knowledge of your people',
    'Reconnect with the spiritual practices that were nearly erased',
    'Hear the stories that never made it into written history',
  ],
  closing: 'The fire is lit. The elders are waiting. All you must do is ask.',
}

export default function AncestorChatPage() {
  return <ExperiencePage data={DATA} />
}
