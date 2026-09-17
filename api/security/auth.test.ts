import { createHash } from "node:crypto";
import { SignJWT } from "jose";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  createAdminToken,
  createMemberToken,
  hashPassword,
  verifyAdminPassword,
  verifyAdminToken,
  verifyMemberToken,
  verifyPassword,
} from "./auth";
import { adminQuery, createRouter, memberQuery } from "../middleware";

const APP_SECRET = "test-secret-long-enough-for-authentication";

describe("authentication security", () => {
  beforeEach(() => {
    process.env.APP_SECRET = APP_SECRET;
    process.env.ADMIN_PASSWORD = "correct horse battery staple";
    delete process.env.RAILWAY_ENVIRONMENT;
    process.env.NODE_ENV = "test";
  });

  afterEach(() => {
    delete process.env.APP_SECRET;
    delete process.env.ADMIN_PASSWORD;
  });

  it("hashes new passwords with scrypt and verifies them", async () => {
    const stored = await hashPassword("member password");
    expect(stored).toMatch(/^scrypt\$/);
    await expect(verifyPassword("member password", stored)).resolves.toEqual({
      valid: true,
      needsRehash: false,
    });
    await expect(verifyPassword("wrong password", stored)).resolves.toMatchObject({ valid: false });
  });

  it("verifies the legacy hash format and marks it for upgrade", async () => {
    const salt = "0123456789abcdef";
    const legacy = `${salt}:${createHash("sha256").update("old password" + salt).digest("hex")}`;
    await expect(verifyPassword("old password", legacy)).resolves.toEqual({
      valid: true,
      needsRehash: true,
    });
  });

  it("creates typed member tokens and rejects a token for the wrong audience", async () => {
    const token = await createMemberToken(42, "member@example.com");
    await expect(verifyMemberToken(token)).resolves.toEqual({
      memberId: 42,
      email: "member@example.com",
    });
    const wrongAudience = await new SignJWT({ memberId: 42, email: "member@example.com", type: "member" })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuer("thekingstake.com")
      .setAudience("thekingstake-admin")
      .setExpirationTime("1h")
      .sign(new TextEncoder().encode(APP_SECRET));
    await expect(verifyMemberToken(wrongAudience)).resolves.toBeNull();
  });

  it("requires a signed admin token and rejects the former prefix token", async () => {
    const token = await createAdminToken();
    await expect(verifyAdminToken(token)).resolves.toBe(true);
    await expect(verifyAdminToken("admin_whatever")).resolves.toBe(false);
  });

  it("enforces token verification in admin middleware", async () => {
    const router = createRouter({ protected: adminQuery.query(() => "authorized") });
    const token = await createAdminToken();
    const validCaller = router.createCaller({
      req: new Request("https://thekingstake.com", { headers: { "x-admin-token": token } }),
      resHeaders: new Headers(),
    });
    await expect(validCaller.protected()).resolves.toBe("authorized");

    const forgedCaller = router.createCaller({
      req: new Request("https://thekingstake.com", { headers: { "x-admin-token": "admin_whatever" } }),
      resHeaders: new Headers(),
    });
    await expect(forgedCaller.protected()).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("rejects unauthenticated genealogy member procedures", async () => {
    const router = createRouter({ protected: memberQuery.query(() => "authorized") });
    const caller = router.createCaller({
      req: new Request("https://thekingstake.com"),
      resHeaders: new Headers(),
    });
    await expect(caller.protected()).rejects.toMatchObject({ code: "UNAUTHORIZED" });
  });

  it("rejects expired admin tokens", async () => {
    const expired = await new SignJWT({ type: "admin" })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuer("thekingstake.com")
      .setAudience("thekingstake-admin")
      .setIssuedAt(1)
      .setExpirationTime(2)
      .sign(new TextEncoder().encode(APP_SECRET));
    await expect(verifyAdminToken(expired)).resolves.toBe(false);
  });

  it("compares the configured admin password without a fallback", () => {
    expect(verifyAdminPassword("correct horse battery staple")).toBe(true);
    expect(verifyAdminPassword("wrong")).toBe(false);
    delete process.env.ADMIN_PASSWORD;
    expect(verifyAdminPassword("AASOTU2025!")).toBe(false);
  });

  it("refuses to use the development signing fallback on Railway", async () => {
    delete process.env.APP_SECRET;
    process.env.RAILWAY_ENVIRONMENT = "production";
    await expect(createAdminToken()).rejects.toThrow("APP_SECRET is required");
  });
});
