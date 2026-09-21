import { z } from "zod";
import { and, desc, eq, sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { nanoid } from "nanoid";
import { adminQuery, createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { newsletterSubscribers, siteVisitorSessions, visitorContacts, visitorMessages } from "@db/schema";
import { createVisitorSession, visitorCookie, visitorFromRequest } from "./security/visitor-session";

const interestOptions = ["Indigenous heritage", "Ancestry research", "Public archives", "Book and author", "Community feed", "Civic news", "Writing services", "Partnerships"] as const;
const messageLimit = new Map<string, { count: number; until: number }>();
function throttle(key: string) {
  const now = Date.now();
  const current = messageLimit.get(key);
  if (!current || current.until < now) { messageLimit.set(key, { count: 1, until: now + 60_000 }); return; }
  if (++current.count > 8) throw new TRPCError({ code: "TOO_MANY_REQUESTS", message: "Please wait a minute before sending more messages." });
}
async function contact(req: Request) {
  const visitor = await visitorFromRequest(req);
  if (!visitor) throw new TRPCError({ code: "UNAUTHORIZED", message: "Complete visitor entry first." });
  const [row] = await getDb().select().from(visitorContacts).where(eq(visitorContacts.id, visitor.contactId)).limit(1);
  if (!row) throw new TRPCError({ code: "UNAUTHORIZED", message: "Visitor entry expired." });
  return { visitor, row };
}

export const visitorRouter = createRouter({
  status: publicQuery.query(async ({ ctx }) => ({ admitted: Boolean(await visitorFromRequest(ctx.req)) })),
  enter: publicQuery.input(z.object({
    email: z.email().max(320),
    sessionId: z.string().regex(/^[a-zA-Z0-9_-]{16,64}$/),
    interests: z.array(z.enum(interestOptions)).min(1).max(8),
    lookingFor: z.string().trim().max(500).optional(),
    facebookSubscriber: z.enum(["yes", "no", "unsure"]),
    newsletterConsent: z.boolean(),
    sourcePage: z.string().max(500),
  })).mutation(async ({ ctx, input }) => {
    throttle(`entry:${ctx.req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown"}`);
    const db = getDb();
    const email = input.email.trim().toLowerCase();
    const [existing] = await db.select().from(visitorContacts).where(eq(visitorContacts.email, email)).limit(1);
    // A previous unsubscribe is never reversed by merely entering the site.
    const [previousSubscriber] = await db.select().from(newsletterSubscribers).where(eq(newsletterSubscribers.email, email)).limit(1);
    const newsletterConsent = Boolean(input.newsletterConsent && previousSubscriber?.status !== "unsubscribed");
    await db.insert(visitorContacts).values({
      email, lastSessionId: input.sessionId, interests: JSON.stringify(input.interests), lookingFor: input.lookingFor || null,
      facebookSubscriber: input.facebookSubscriber, newsletterConsent,
    }).onDuplicateKeyUpdate({ set: {
      lastSessionId: input.sessionId, interests: JSON.stringify(input.interests), lookingFor: input.lookingFor || null,
      facebookSubscriber: input.facebookSubscriber, newsletterConsent: newsletterConsent || Boolean(existing?.newsletterConsent),
      lastSeenAt: new Date(),
    } });
    const [saved] = await db.select().from(visitorContacts).where(eq(visitorContacts.email, email)).limit(1);
    if (!saved) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Could not save visitor information." });
    await db.insert(siteVisitorSessions).values({ sessionId: input.sessionId, lastPath: input.sourcePage })
      .onDuplicateKeyUpdate({ set: { lastPath: input.sourcePage, lastSeenAt: new Date() } });
    if (newsletterConsent) {
      await db.insert(newsletterSubscribers).values({
        email, interests: JSON.stringify(input.interests), sourcePage: input.sourcePage,
        status: "subscribed", unsubscribeToken: nanoid(40), consentedAt: new Date(),
      }).onDuplicateKeyUpdate({ set: {
        interests: JSON.stringify(input.interests), status: "subscribed", consentedAt: new Date(),
      } });
    }
    const token = await createVisitorSession(saved.id, input.sessionId);
    ctx.resHeaders.append("Set-Cookie", visitorCookie(token, ctx.req));
    return { admitted: true, newsletterSubscribed: newsletterConsent };
  }),
  myMessages: publicQuery.query(async ({ ctx }) => {
    const { visitor } = await contact(ctx.req);
    return getDb().select().from(visitorMessages).where(eq(visitorMessages.contactId, visitor.contactId))
      .orderBy(desc(visitorMessages.id)).limit(100).then(rows => rows.reverse());
  }),
  sendMessage: publicQuery.input(z.object({ body: z.string().trim().min(1).max(2000) })).mutation(async ({ ctx, input }) => {
    const { visitor } = await contact(ctx.req);
    throttle(`chat:${visitor.contactId}`);
    await getDb().insert(visitorMessages).values({ contactId: visitor.contactId, sessionId: visitor.sessionId, sender: "visitor", body: input.body });
    return { sent: true };
  }),
  adminContacts: adminQuery.query(async () => {
    const db = getDb();
    const [count] = await db.select({ total: sql<number>`count(*)` }).from(visitorContacts);
    const contacts = await db.select().from(visitorContacts).orderBy(desc(visitorContacts.lastSeenAt)).limit(250);
    return { total: Number(count?.total || 0), contacts };
  }),
  adminExportContacts: adminQuery.query(async () => getDb().select().from(visitorContacts).orderBy(desc(visitorContacts.lastSeenAt)).limit(10_000)),
  adminConversations: adminQuery.query(async () => {
    const db = getDb();
    const messages = await db.select({
      id: visitorMessages.id, contactId: visitorMessages.contactId, sessionId: visitorMessages.sessionId,
      sender: visitorMessages.sender, body: visitorMessages.body, createdAt: visitorMessages.createdAt,
      email: visitorContacts.email,
    }).from(visitorMessages).innerJoin(visitorContacts, eq(visitorContacts.id, visitorMessages.contactId))
      .orderBy(desc(visitorMessages.id)).limit(300);
    return messages.reverse();
  }),
  adminReply: adminQuery.input(z.object({ contactId: z.number().int().positive(), sessionId: z.string().regex(/^[a-zA-Z0-9_-]{16,64}$/), body: z.string().trim().min(1).max(2000) }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const [thread] = await db.select({ id: visitorMessages.id }).from(visitorMessages).where(and(eq(visitorMessages.contactId, input.contactId), eq(visitorMessages.sessionId, input.sessionId))).limit(1);
      if (!thread) throw new TRPCError({ code: "NOT_FOUND", message: "Conversation not found." });
      await db.insert(visitorMessages).values({ ...input, sender: "owner" });
      return { sent: true };
    }),
  adminStartChat: adminQuery.input(z.object({ contactId: z.number().int().positive(), body: z.string().trim().min(1).max(2000) }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const [recipient] = await db.select().from(visitorContacts).where(eq(visitorContacts.id, input.contactId)).limit(1);
      if (!recipient) throw new TRPCError({ code: "NOT_FOUND", message: "Visitor not found." });
      await db.insert(visitorMessages).values({ contactId: input.contactId, sessionId: recipient.lastSessionId, sender: "owner", body: input.body });
      return { sent: true };
    }),
});
