export type ArchiveRecord = {
  id: string;
  title: string;
  date: string | null;
  description: string | null;
  format: string[];
  subjects: string[];
  locations: string[];
  imageUrl: string | null;
  recordUrl: string;
  rights: string | null;
  hasDigitalImage: boolean;
  repository: "Library of Congress";
};

type UnknownRecord = Record<string, unknown>;

function asRecord(value: unknown): UnknownRecord {
  return value && typeof value === "object" ? value as UnknownRecord : {};
}

function asText(value: unknown): string | null {
  if (typeof value === "string" && value.trim()) return value.trim();
  if (Array.isArray(value)) {
    const text = value.find((item) => typeof item === "string" && item.trim());
    return typeof text === "string" ? text.trim() : null;
  }
  return null;
}

function asTexts(value: unknown): string[] {
  if (typeof value === "string" && value.trim()) return [value.trim()];
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string" && !!item.trim()).map((item) => item.trim());
}

function safeLocUrl(value: unknown, image = false): string | null {
  const text = asText(value);
  if (!text) return null;
  try {
    const url = new URL(text);
    const allowedImageHosts = ["loc.gov", "www.loc.gov", "tile.loc.gov", "cdn.loc.gov"];
    const allowedHosts = image ? allowedImageHosts : ["loc.gov", "www.loc.gov"];
    if (url.protocol !== "https:" || !allowedHosts.includes(url.hostname)) return null;
    return url.toString();
  } catch {
    return null;
  }
}

export function normalizeLibraryOfCongressResponse(payload: unknown) {
  const root = asRecord(payload);
  const rawResults = Array.isArray(root.results) ? root.results : [];
  const pagination = asRecord(root.pagination);

  const results = rawResults.map((raw, index): ArchiveRecord | null => {
    const item = asRecord(raw);
    const nestedItem = asRecord(item.item);
    const recordUrl = safeLocUrl(item.id) || safeLocUrl(item.url);
    const title = asText(item.title);
    if (!recordUrl || !title) return null;

    const images = asTexts(item.image_url);
    const imageUrl = images.map((url) => safeLocUrl(url, true)).find(Boolean) || null;
    const rights = asText(item.rights)
      || asText(nestedItem.rights_advisory)
      || asText(nestedItem.reproduction_number);

    return {
      id: asText(item.id) || `${recordUrl}-${index}`,
      title,
      date: asText(item.date),
      description: asText(item.description),
      format: asTexts(item.format).slice(0, 6),
      subjects: asTexts(item.subject).slice(0, 12),
      locations: asTexts(item.location).slice(0, 8),
      imageUrl,
      recordUrl,
      rights,
      hasDigitalImage: Boolean(imageUrl),
      repository: "Library of Congress",
    };
  }).filter((record): record is ArchiveRecord => record !== null);

  return {
    results,
    pagination: {
      current: Number(pagination.current) || 1,
      total: Number(pagination.total) || results.length,
      next: safeLocUrl(pagination.next),
      previous: safeLocUrl(pagination.previous),
    },
  };
}

