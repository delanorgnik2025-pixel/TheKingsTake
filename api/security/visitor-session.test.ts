import { describe, expect, it } from "vitest";
import { createVisitorSession, visitorCookie, visitorFromRequest } from "./visitor-session";

describe("visitor access cookie", () => {
  it("accepts only a signed, unexpired visitor cookie", async () => {
    const token = await createVisitorSession(42, "0123456789abcdef");
    const req = new Request("https://thekingstake.com/", { headers: { cookie: visitorCookie(token, new Request("https://thekingstake.com/")).split(";")[0] } });
    expect(await visitorFromRequest(req)).toEqual({ contactId: 42, sessionId: "0123456789abcdef" });
    expect(await visitorFromRequest(new Request("https://thekingstake.com/"))).toBeNull();
    expect(await visitorFromRequest(new Request("https://thekingstake.com/", { headers: { cookie: "tkt_visitor=fake" } }))).toBeNull();
    expect(visitorCookie(token, req)).toContain("HttpOnly; SameSite=Lax; Max-Age=2592000; Secure");
  });
});
