import {
  createHash,
  randomBytes,
  scrypt as nodeScrypt,
  timingSafeEqual,
} from "node:crypto";
import { jwtVerify, SignJWT } from "jose";

const SCRYPT_KEY_LENGTH = 64;
const SCRYPT_COST = 16_384;
const SCRYPT_BLOCK_SIZE = 8;
const SCRYPT_PARALLELIZATION = 1;
const TOKEN_ISSUER = "thekingstake.com";

function scrypt(
  password: string,
  salt: string,
  keyLength: number,
  options: { N: number; r: number; p: number },
) {
  return new Promise<Buffer>((resolve, reject) => {
    nodeScrypt(password, salt, keyLength, options, (error, derivedKey) => {
      if (error) reject(error);
      else resolve(derivedKey);
    });
  });
}

export type PasswordVerification = {
  valid: boolean;
  needsRehash: boolean;
};

function isProductionRuntime() {
  return process.env.NODE_ENV === "production" || Boolean(process.env.RAILWAY_ENVIRONMENT);
}

function signingKey() {
  const secret = process.env.APP_SECRET;
  if (secret) return new TextEncoder().encode(secret);
  if (isProductionRuntime()) {
    throw new Error("APP_SECRET is required for authentication in production");
  }
  return new TextEncoder().encode("development-only-thekingstake-auth-secret");
}

function equalHex(left: string, right: string) {
  if (!/^[0-9a-f]+$/i.test(left) || !/^[0-9a-f]+$/i.test(right)) return false;
  const leftBytes = Buffer.from(left, "hex");
  const rightBytes = Buffer.from(right, "hex");
  return leftBytes.length === rightBytes.length && timingSafeEqual(leftBytes, rightBytes);
}

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = await scrypt(password, salt, SCRYPT_KEY_LENGTH, {
    N: SCRYPT_COST,
    r: SCRYPT_BLOCK_SIZE,
    p: SCRYPT_PARALLELIZATION,
  });
  return `scrypt$${SCRYPT_COST}$${SCRYPT_BLOCK_SIZE}$${SCRYPT_PARALLELIZATION}$${salt}$${derivedKey.toString("hex")}`;
}

export async function verifyPassword(
  password: string,
  storedHash: string,
): Promise<PasswordVerification> {
  const parts = storedHash.split("$");
  if (parts[0] === "scrypt" && parts.length === 6) {
    const [, costText, blockSizeText, parallelizationText, salt, expected] = parts;
    const cost = Number(costText);
    const blockSize = Number(blockSizeText);
    const parallelization = Number(parallelizationText);
    if (![cost, blockSize, parallelization].every(Number.isSafeInteger)) {
      return { valid: false, needsRehash: false };
    }
    try {
      const computed = await scrypt(password, salt, SCRYPT_KEY_LENGTH, {
        N: cost,
        r: blockSize,
        p: parallelization,
      });
      return {
        valid: equalHex(computed.toString("hex"), expected),
        needsRehash:
          cost !== SCRYPT_COST ||
          blockSize !== SCRYPT_BLOCK_SIZE ||
          parallelization !== SCRYPT_PARALLELIZATION,
      };
    } catch {
      return { valid: false, needsRehash: false };
    }
  }

  // Legacy format: <hex salt>:sha256(password + salt)
  const [salt, expected, ...extra] = storedHash.split(":");
  if (!salt || !expected || extra.length > 0) return { valid: false, needsRehash: false };
  const computed = createHash("sha256").update(password + salt).digest("hex");
  return { valid: equalHex(computed, expected), needsRehash: equalHex(computed, expected) };
}

export function verifyAdminPassword(candidate: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const candidateDigest = createHash("sha256").update(candidate).digest();
  const expectedDigest = createHash("sha256").update(expected).digest();
  return timingSafeEqual(candidateDigest, expectedDigest);
}

export async function createMemberToken(memberId: number, email: string) {
  return new SignJWT({ memberId, email, type: "member" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuer(TOKEN_ISSUER)
    .setAudience("thekingstake-member")
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(signingKey());
}

export async function verifyMemberToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, signingKey(), {
      algorithms: ["HS256"],
      issuer: TOKEN_ISSUER,
      audience: "thekingstake-member",
      clockTolerance: 60,
    });
    if (
      payload.type !== "member" ||
      typeof payload.memberId !== "number" ||
      typeof payload.email !== "string"
    ) return null;
    return { memberId: payload.memberId, email: payload.email };
  } catch {
    return null;
  }
}

export async function createAdminToken() {
  return new SignJWT({ type: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuer(TOKEN_ISSUER)
    .setAudience("thekingstake-admin")
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(signingKey());
}

export async function verifyAdminToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, signingKey(), {
      algorithms: ["HS256"],
      issuer: TOKEN_ISSUER,
      audience: "thekingstake-admin",
      clockTolerance: 30,
    });
    return payload.type === "admin";
  } catch {
    return false;
  }
}
