import type { ArchiveRecord } from '../archive';
export type PlaceSuggestion = { place: string; evidence: string };
// NARA reference-unit locations describe the repository, not the place depicted.
// Only title/description text supports a candidate here; candidates remain drafts.
export function supportedSuggestions(record: ArchiveRecord, input: unknown): PlaceSuggestion[] {
 const text = `${record.title}\n${record.description || ''}`.toLowerCase();
 if (!Array.isArray(input)) return [];
 return input.slice(0, 4).flatMap(item => {
  if (!item || typeof item !== 'object') return [];
  const {place,evidence} = item as Record<string,unknown>;
  if (typeof place !== 'string' || typeof evidence !== 'string' || place.length < 2 || place.length > 191 || evidence.length < 8 || evidence.length > 600) return [];
  if (!text.includes(evidence.toLowerCase()) || !evidence.toLowerCase().includes(place.toLowerCase())) return [];
  return [{place,evidence}];
 });
}
export function researchDay(now = new Date()) { return new Intl.DateTimeFormat('en-CA', {timeZone:'America/New_York',year:'numeric',month:'2-digit',day:'2-digit'}).format(now); }
