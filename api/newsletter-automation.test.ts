import { describe, expect, it } from "vitest";
import { easternDailyKey, easternHour, selectIndependentSources } from "./newsletter-automation-utils";

describe("daily newsletter automation", () => {
  it("uses an Eastern date key across the UTC boundary", () => {
    expect(easternDailyKey(new Date("2026-09-18T02:00:00Z"))).toBe("2026-09-17");
    expect(easternHour(new Date("2026-09-18T09:00:00Z"))).toBe(5);
  });

  it("requires at least two independent source domains", () => {
    expect(() => selectIndependentSources([
      { title: "First", url: "https://example.com/a" },
      { title: "Duplicate publisher", url: "https://www.example.com/b" },
    ])).toThrow(/at least 2/);

    expect(selectIndependentSources([
      { title: "Agency", url: "https://agency.gov/report" },
      { title: "Newsroom", url: "https://news.example/story" },
    ])).toHaveLength(2);
  });

  it("rejects non-web and search-provider citations", () => {
    expect(() => selectIndependentSources([
      { title: "Unsafe", url: "javascript:alert(1)" },
      { title: "Tool", url: "https://openai.com/internal" },
    ])).toThrow(/only 0 independent sources/);
  });
});
