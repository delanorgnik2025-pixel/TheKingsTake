export const PREVIEW_SECONDS = 300;

export function nextPreviewUsage(used: number, lastMeterAt: Date | null, now: Date, action: "heartbeat" | "request") {
  if (used >= PREVIEW_SECONDS) return PREVIEW_SECONDS;
  const elapsed = lastMeterAt ? Math.max(0, Math.floor((now.getTime() - lastMeterAt.getTime()) / 1000)) : 0;
  const charge = action === "request" ? 5 : Math.min(10, elapsed);
  return Math.min(PREVIEW_SECONDS, used + charge);
}
