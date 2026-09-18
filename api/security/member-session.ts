import type { Member } from "../../db/schema";
import { randomUUID } from "node:crypto";
import { hashPassword, verifyAdminToken, verifyMemberToken } from "./auth";

export async function getActiveMemberFromRequest(
  req: Request
): Promise<Member | null> {
  const token = req.headers.get("x-member-token");
  if (!token) return null;

  const payload = await verifyMemberToken(token);
  if (!payload) return null;

  const [{ eq }, { members }, { getDb }] = await Promise.all([
    import("drizzle-orm"),
    import("../../db/schema"),
    import("../queries/connection"),
  ]);
  const rows = await getDb()
    .select()
    .from(members)
    .where(eq(members.id, payload.memberId))
    .limit(1);
  if (rows.length === 0 || !rows[0].isActive) return null;
  return rows[0];
}

/**
 * Feed reactions use a member row for attribution. A valid administrator is
 * therefore resolved to one private owner member row instead of being forced
 * through the public invitation/login flow.
 */
export async function getFeedActorFromRequest(
  req: Request
): Promise<Member | null> {
  const adminToken = req.headers.get("x-admin-token");
  if (!adminToken || !(await verifyAdminToken(adminToken))) {
    return getActiveMemberFromRequest(req);
  }

  const [{ eq }, { members }, { getDb }] = await Promise.all([
    import("drizzle-orm"),
    import("../../db/schema"),
    import("../queries/connection"),
  ]);
  const db = getDb();
  const email = (
    process.env.OWNER_MEMBER_EMAIL ||
    process.env.OWNER_NOTIFICATION_EMAIL ||
    "admin@thekingstake.com"
  )
    .trim()
    .toLowerCase();
  const name = (process.env.OWNER_DISPLAY_NAME || "Ronald Lee King").trim();
  const existing = await db
    .select()
    .from(members)
    .where(eq(members.email, email))
    .limit(1);
  if (existing[0]) {
    if (
      existing[0].role !== "admin" ||
      !existing[0].isActive ||
      existing[0].name !== name
    ) {
      await db
        .update(members)
        .set({ role: "admin", isActive: true, name, updatedAt: new Date() })
        .where(eq(members.id, existing[0].id));
      return {
        ...existing[0],
        role: "admin",
        isActive: true,
        name,
        updatedAt: new Date(),
      };
    }
    return existing[0];
  }

  try {
    const result = await db.insert(members).values({
      email,
      name,
      passwordHash: await hashPassword(`admin-session-only-${randomUUID()}`),
      facebookSubscribed: true,
      isActive: true,
      role: "admin",
    });
    const created = await db
      .select()
      .from(members)
      .where(eq(members.id, Number(result[0].insertId)))
      .limit(1);
    return created[0] || null;
  } catch {
    // A simultaneous first reaction may have created the owner row first.
    const raced = await db
      .select()
      .from(members)
      .where(eq(members.email, email))
      .limit(1);
    return raced[0] || null;
  }
}
