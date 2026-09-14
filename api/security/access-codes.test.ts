import { describe, expect, it } from "vitest";
import { generateAccessCode, hashAccessCode, normalizeAccessCode } from "./access-codes";

describe("one-time access codes", () => {
  it("normalizes harmless formatting differences", () => {
    expect(normalizeAccessCode(" abcd-1234 efgh ")).toBe("ABCD1234EFGH");
    expect(hashAccessCode("ABCD-1234-EFGH")).toBe(hashAccessCode("abcd1234efgh"));
  });

  it("generates display-friendly random codes", () => {
    const first = generateAccessCode();
    const second = generateAccessCode();
    expect(first).toMatch(/^[A-Z0-9_-]{4}-[A-Z0-9_-]{4}-[A-Z0-9_-]{4}$/);
    expect(second).not.toBe(first);
  });
});
