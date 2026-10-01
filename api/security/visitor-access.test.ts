import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createAdminToken, createMemberToken } from "./auth";
import { createVisitorSession } from "./visitor-session";
import { visitorAccessStatus } from "./visitor-access";
const request = (headers: Record<string, string> = {}) => new Request("https://thekingstake.com", { headers });
beforeEach(() => vi.stubEnv("APP_SECRET", "owner-entrance-test-secret-long-enough"));
afterEach(() => vi.unstubAllEnvs());
describe("owner entrance admission", () => {
  it("admits a verified owner without an email visitor session", async () => {
    expect(await visitorAccessStatus(request({ "x-admin-token": await createAdminToken() }))).toEqual({ admitted: true, owner: true });
  });
  it("does not grant admission for a missing or forged owner token", async () => {
    expect(await visitorAccessStatus(request())).toEqual({ admitted: false, owner: false });
    expect(await visitorAccessStatus(request({ "x-admin-token": "forged" }))).toEqual({ admitted: false, owner: false });
  });
  it("does not treat a member token as an owner token", async () => {
    expect(await visitorAccessStatus(request({ "x-admin-token": await createMemberToken(1, "test@example.com") }))).toEqual({ admitted: false, owner: false });
  });
  it("preserves normal visitor admission without owner privileges", async () => {
    expect(await visitorAccessStatus(request({ cookie: `tkt_visitor=${await createVisitorSession(1, "test-session")}` }))).toEqual({ admitted: true, owner: false });
  });
});
