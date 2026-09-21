import { jwtVerify, SignJWT } from "jose";
import { parse } from "cookie";

const cookieName = "tkt_visitor";
function secret() {
  const value = process.env.APP_SECRET;
  if (!value && (process.env.NODE_ENV === "production" || process.env.RAILWAY_ENVIRONMENT)) {
    throw new Error("APP_SECRET is required for visitor access");
  }
  return new TextEncoder().encode(value || "development-only-thekingstake-visitor-secret");
}

export async function createVisitorSession(contactId: number, sessionId: string) {
  return new SignJWT({ contactId, sessionId, type: "visitor" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuer("thekingstake.com")
    .setAudience("thekingstake-visitor")
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(secret());
}

export async function visitorFromRequest(req: Request) {
  const token = parse(req.headers.get("cookie") || "")[cookieName];
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret(), {
      issuer: "thekingstake.com", audience: "thekingstake-visitor",
    });
    if (payload.type !== "visitor" || typeof payload.contactId !== "number" ||
      typeof payload.sessionId !== "string") return null;
    return { contactId: payload.contactId, sessionId: payload.sessionId };
  } catch { return null; }
}

export function visitorCookie(token: string, req: Request) {
  const secure = new URL(req.url).protocol === "https:" ? "; Secure" : "";
  return `${cookieName}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000${secure}`;
}
