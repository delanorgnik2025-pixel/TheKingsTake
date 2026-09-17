import type { Member } from "../../db/schema";
import { verifyMemberToken } from "./auth";

export async function getActiveMemberFromRequest(req: Request): Promise<Member | null> {
  const token = req.headers.get("x-member-token");
  if (!token) return null;

  const payload = await verifyMemberToken(token);
  if (!payload) return null;

  const [{ eq }, { members }, { getDb }] = await Promise.all([
    import("drizzle-orm"),
    import("../../db/schema"),
    import("../queries/connection"),
  ]);
  const rows = await getDb().select().from(members).where(eq(members.id, payload.memberId)).limit(1);
  if (rows.length === 0 || !rows[0].isActive) return null;
  return rows[0];
}
