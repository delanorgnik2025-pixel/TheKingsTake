import type { NewsBeatId } from "./news-beats";

export const NEWS_SECTIONS = [
  {
    id: "crime-justice",
    label: "Crime & Justice",
    kicker: "Cases, courts & accountability",
    detail: "Major criminal cases, court proceedings, policing, public safety and the evidence behind developing allegations.",
    beats: ["crime-justice"] as NewsBeatId[],
  },
  {
    id: "ai-tech",
    label: "AI & Technology",
    kicker: "Power, products & policy",
    detail: "Artificial intelligence, platform power, creator tools, automation, regulation and who bears the cost when technology goes wrong.",
    beats: ["ai-policy"] as NewsBeatId[],
  },
  {
    id: "world-affairs",
    label: "U.S. & World Affairs",
    kicker: "Conflict, diplomacy & consequence",
    detail: "U.S. military action, diplomacy, Gaza and Israel, Ukraine, war powers and the real-world consequences of foreign policy.",
    beats: ["us-conflicts", "gaza-israel", "ukraine"] as NewsBeatId[],
  },
  {
    id: "weather-safety",
    label: "Weather & Public Safety",
    kicker: "What is happening now",
    detail: "Major storms, flooding, emergencies, official alerts and the information people need before conditions change.",
    beats: ["weather"] as NewsBeatId[],
  },
  {
    id: "africa-sovereignty",
    label: "Africa & Sovereignty",
    kicker: "Power, resources & self-determination",
    detail: "The Sahel, African sovereignty, resource control, decolonization, governance and community movements.",
    beats: ["sahel", "africa"] as NewsBeatId[],
  },
  {
    id: "science-earth",
    label: "Science, Energy & Earth",
    kicker: "Research with real-world impact",
    detail: "Energy, climate, restoration, water, medicine and scientific developments that can materially change everyday life.",
    beats: ["environment"] as NewsBeatId[],
  },
] as const;

export type NewsSectionId = typeof NEWS_SECTIONS[number]["id"];
export function newsSection(id: string | null | undefined) {
  return NEWS_SECTIONS.find(section => section.id === id);
}
