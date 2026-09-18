export type NewsSource = { url: string; title: string };

export function easternDailyKey(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const value = (type: string) => parts.find(part => part.type === type)?.value || "";
  return `${value("year")}-${value("month")}-${value("day")}`;
}

export function easternHour(date = new Date()) {
  return Number(new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    hour: "2-digit",
    hourCycle: "h23",
  }).format(date));
}

function cleanUrl(raw: string) {
  try {
    const url = new URL(raw);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    url.hash = "";
    return url.toString();
  } catch {
    return null;
  }
}

export function selectIndependentSources(sources: NewsSource[], minimum = 2) {
  const seenUrls = new Set<string>();
  const seenHosts = new Set<string>();
  const selected: NewsSource[] = [];
  for (const source of sources) {
    const url = cleanUrl(source.url);
    if (!url || seenUrls.has(url)) continue;
    const host = new URL(url).hostname.replace(/^www\./, "");
    if (host.endsWith("openai.com") || host.includes("google.com")) continue;
    if (seenHosts.has(host)) continue;
    seenUrls.add(url);
    seenHosts.add(host);
    selected.push({ url, title: source.title?.trim() || host });
  }
  if (selected.length < minimum) {
    throw new Error(`Daily news research found only ${selected.length} independent source${selected.length === 1 ? "" : "s"}; at least ${minimum} are required.`);
  }
  return selected.slice(0, 8);
}
