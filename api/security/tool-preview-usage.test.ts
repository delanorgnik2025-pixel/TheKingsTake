import { describe, expect, it } from "vitest";
import { nextPreviewUsage } from "./tool-preview-usage";

describe("research preview usage", () => {
  it("counts active heartbeat time and caps long absences at ten seconds", () => {
    const now = new Date("2026-09-21T13:00:00Z");
    expect(nextPreviewUsage(0, null, now, "heartbeat")).toBe(0);
    expect(nextPreviewUsage(0, new Date("2026-09-21T12:59:50Z"), now, "heartbeat")).toBe(10);
    expect(nextPreviewUsage(10, new Date("2026-09-20T12:00:00Z"), now, "heartbeat")).toBe(20);
  });
  it("charges archive requests even without heartbeats and never renews the allowance", () => {
    const now = new Date("2026-09-21T13:00:00Z");
    expect(nextPreviewUsage(0, null, now, "request")).toBe(5);
    expect(nextPreviewUsage(299, null, now, "request")).toBe(300);
    expect(nextPreviewUsage(300, null, now, "heartbeat")).toBe(300);
  });
});
