/** Resolve stored feed links without letting one malformed post crash the feed. */
export function resolveFeedLink(value: string | null, origin: string): { href: string; hostname: string } | null {
  if (!value?.trim()) return null;
  const input = value.trim();
  if (!/^https?:\/\//i.test(input) && !/^\/(?!\/)/.test(input)) return null;
  try {
    const url = new URL(input, origin);
    if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) return null;
    return { href: url.href, hostname: url.hostname };
  } catch {
    return null;
  }
}
