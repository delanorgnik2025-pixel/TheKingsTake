import { createHash, randomBytes } from "node:crypto";

export function normalizeAccessCode(code: string) {
  return code.replace(/[^a-z0-9]/gi, "").toUpperCase();
}

export function hashAccessCode(code: string) {
  return createHash("sha256").update(normalizeAccessCode(code)).digest("hex");
}

export function generateAccessCode() {
  const raw = randomBytes(9).toString("base64url").toUpperCase();
  return `${raw.slice(0, 4)}-${raw.slice(4, 8)}-${raw.slice(8, 12)}`;
}
