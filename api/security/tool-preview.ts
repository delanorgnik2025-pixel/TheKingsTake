import { and, eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { visitorToolUsage } from "../../db/schema";
import { getDb } from "../queries/connection";
import { getActiveMemberFromRequest } from "./member-session";
import { verifyAdminToken } from "./auth";
import { visitorFromRequest } from "./visitor-session";
import { nextPreviewUsage, PREVIEW_SECONDS } from "./tool-preview-usage";

export type ResearchTool = "globe" | "archives";

async function identity(req: Request) {
  const adminToken = req.headers.get("x-admin-token");
  if (adminToken && await verifyAdminToken(adminToken)) return { exempt: true as const };
  if (await getActiveMemberFromRequest(req)) return { exempt: true as const };
  const visitor = await visitorFromRequest(req);
  if (!visitor) throw new TRPCError({ code: "UNAUTHORIZED", message: "Enter your email to explore." });
  return { exempt: false as const, contactId: visitor.contactId };
}

export async function toolPreview(req: Request, tool: ResearchTool, action: "status" | "heartbeat" | "request" = "status") {
  const person = await identity(req);
  if (person.exempt) return { exempt: true, remainingSeconds: null, exhausted: false };
  const db = getDb();
  const key = and(eq(visitorToolUsage.contactId, person.contactId), eq(visitorToolUsage.tool, tool));
  if (action === "status") {
    const [row] = await db.select().from(visitorToolUsage).where(key).limit(1);
    const remainingSeconds = Math.max(0, PREVIEW_SECONDS - (row?.usedSeconds || 0));
    return { exempt: false, remainingSeconds, exhausted: remainingSeconds === 0 };
  }
  return db.transaction(async tx => {
    await tx.insert(visitorToolUsage).values({ contactId: person.contactId, tool })
      .onDuplicateKeyUpdate({ set: { tool } });
    const [row] = await tx.select().from(visitorToolUsage).where(key).limit(1).for("update");
    if (!row) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Could not load preview usage." });
    if (row.usedSeconds >= PREVIEW_SECONDS) {
      if (action === "request") throw new TRPCError({ code: "FORBIDDEN", message: "Your archive preview has ended. Sign in with your member access code to continue." });
      return { exempt: false, remainingSeconds: 0, exhausted: true };
    }
    const now = new Date();
    // A heartbeat counts at most ten seconds. Time away from the tool is not billed.
    const usedSeconds = nextPreviewUsage(row.usedSeconds, row.lastMeterAt, now, action);
    await tx.update(visitorToolUsage).set({ usedSeconds, lastMeterAt: now }).where(key);
    const remainingSeconds = PREVIEW_SECONDS - usedSeconds;
    return { exempt: false, remainingSeconds, exhausted: remainingSeconds === 0 };
  });
}
