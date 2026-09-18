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
  repository: "Library of Congress" | "National Archives";
};

type UnknownRecord = Record<string, unknown>;

function asRecord(value: unknown): UnknownRecord {
  return value && typeof value === "object" ? (value as UnknownRecord) : {};
}

function asText(value: unknown): string | null {
  if (typeof value === "string" && value.trim()) return value.trim();
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  if (Array.isArray(value)) {
    const text = value.find(item => typeof item === "string" && item.trim());
    return typeof text === "string" ? text.trim() : null;
  }
  return null;
}

function asTexts(value: unknown): string[] {
  if (typeof value === "string" && value.trim()) return [value.trim()];
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === "string" && !!item.trim())
    .map(item => item.trim());
}

function firstObject(value: unknown): UnknownRecord {
  if (Array.isArray(value)) return asRecord(value[0]);
  return asRecord(value);
}

function nestedText(value: unknown, ...keys: string[]): string | null {
  let current: unknown = value;
  for (const key of keys) current = asRecord(current)[key];
  return asText(current);
}

function naraDate(record: UnknownRecord) {
  const start =
    nestedText(record.inclusiveStartDate, "logicalDate") ||
    asText(asRecord(record.inclusiveStartDate).year);
  const end =
    nestedText(record.inclusiveEndDate, "logicalDate") ||
    asText(asRecord(record.inclusiveEndDate).year);
  if (start && end && start !== end) return `${start} – ${end}`;
  return start || end;
}

function naraDescription(record: UnknownRecord) {
  const candidates = [
    record.scopeAndContentNote,
    record.generalNote,
    record.arrangement,
    record.functionAndUse,
  ];
  for (const candidate of candidates) {
    const text =
      asText(candidate) ||
      nestedText(candidate, "note") ||
      nestedText(candidate, "description");
    if (text) return text;
  }
  return null;
}

function safeNaraImageUrl(value: unknown): string | null {
  const text = asText(value);
  if (!text) return null;
  try {
    const url = new URL(text);
    const allowedHosts = ["catalog.archives.gov", "s3.amazonaws.com"];
    if (
      !allowedHosts.some(
        host =>
          url.hostname.toLowerCase() === host ||
          url.hostname.toLowerCase().endsWith(`.${host}`)
      )
    )
      return null;
    if (url.protocol === "http:") url.protocol = "https:";
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

function safeLocUrl(value: unknown, image = false): string | null {
  const text = asText(value);
  if (!text) return null;
  try {
    const url = new URL(text);
    const allowedImageHosts = [
      "loc.gov",
      "www.loc.gov",
      "tile.loc.gov",
      "cdn.loc.gov",
    ];
    const allowedHosts = image ? allowedImageHosts : ["loc.gov", "www.loc.gov"];
    if (!allowedHosts.includes(url.hostname.toLowerCase())) return null;
    if (url.protocol === "http:") url.protocol = "https:";
    if (url.protocol !== "https:") return null;
    return url.toString();
  } catch {
    return null;
  }
}

export function normalizeLibraryOfCongressResponse(payload: unknown) {
  const root = asRecord(payload);
  const rawResults = Array.isArray(root.results) ? root.results : [];
  const pagination = asRecord(root.pagination);

  const results = rawResults
    .map((raw, index): ArchiveRecord | null => {
      const item = asRecord(raw);
      const nestedItem = asRecord(item.item);
      const recordUrl = safeLocUrl(item.id) || safeLocUrl(item.url);
      const title = asText(item.title);
      if (!recordUrl || !title) return null;

      const images = asTexts(item.image_url);
      const imageUrl =
        images.map(url => safeLocUrl(url, true)).find(Boolean) || null;
      const rights =
        asText(item.rights) ||
        asText(nestedItem.rights_advisory) ||
        asText(nestedItem.reproduction_number);

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
    })
    .filter((record): record is ArchiveRecord => record !== null);

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

export function normalizeNationalArchivesResponse(payload: unknown) {
  const root = asRecord(payload);
  const body = asRecord(root.body);
  const hitsContainer = asRecord(body.hits);
  const rawHits = Array.isArray(hitsContainer.hits) ? hitsContainer.hits : [];
  const totalValue = asRecord(hitsContainer.total).value;

  const results = rawHits
    .map((raw): ArchiveRecord | null => {
      const hit = asRecord(raw);
      const source = asRecord(hit._source);
      const record = asRecord(source.record);
      const naId = record.naId;
      const id =
        typeof naId === "number" || typeof naId === "string"
          ? String(naId)
          : null;
      const title = asText(record.title);
      if (!id || !title) return null;

      const digitalObjects = Array.isArray(record.digitalObjects)
        ? record.digitalObjects.map(asRecord)
        : [];
      const imageObject = digitalObjects.find(object => {
        const type = asText(object.objectType)?.toLowerCase() || "";
        return (
          type.includes("image") ||
          /\.(jpe?g|png|gif|tiff?)$/i.test(asText(object.objectUrl) || "")
        );
      });
      const imageUrl = imageObject
        ? safeNaraImageUrl(imageObject.objectUrl)
        : null;
      const ancestors = Array.isArray(record.ancestors)
        ? record.ancestors.map(asRecord)
        : [];
      const subjectValues = [
        ...asTexts(record.generalRecordsTypes),
        ...asTexts(record.specificRecordsTypes),
        ...ancestors
          .map(ancestor => asText(ancestor.title))
          .filter((value): value is string => Boolean(value)),
      ];
      const occurrence = firstObject(record.physicalOccurrences);
      const referenceUnit = firstObject(occurrence.referenceUnits);
      const restriction =
        nestedText(record.useRestriction, "status") ||
        nestedText(record.accessRestriction, "status");

      return {
        id: `nara-${id}`,
        title,
        date: naraDate(record),
        description: naraDescription(record),
        format: [
          asText(record.levelOfDescription),
          ...asTexts(record.generalRecordsTypes),
        ]
          .filter((value): value is string => Boolean(value))
          .slice(0, 6),
        subjects: [...new Set(subjectValues)].slice(0, 12),
        locations: [
          asText(referenceUnit.name),
          asText(referenceUnit.city),
          asText(referenceUnit.state),
        ]
          .filter((value): value is string => Boolean(value))
          .slice(0, 8),
        imageUrl,
        recordUrl: `https://catalog.archives.gov/id/${encodeURIComponent(id)}`,
        rights: restriction
          ? `${restriction}. Review the original catalog record for complete access and use restrictions.`
          : null,
        hasDigitalImage: Boolean(imageUrl),
        repository: "National Archives",
      };
    })
    .filter((record): record is ArchiveRecord => record !== null);

  const total =
    typeof totalValue === "number"
      ? totalValue
      : Number(totalValue) || results.length;
  return {
    results,
    pagination: {
      current: 1,
      total,
      next: null as string | null,
      previous: null as string | null,
    },
  };
}
