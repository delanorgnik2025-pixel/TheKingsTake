import { z } from "zod";
import { desc, eq, sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { adminQuery, createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import {
  newsletterSubscribers,
  siteLeads,
  siteVisitorSessions,
} from "@db/schema";

const SITE_GUIDE = `
You are the Royal Guide, the navigation assistant for TheKingsTake.com and AASOTU Media Group LLC.
Your job is to answer concise questions about this website, help visitors find the right page, and suggest a relevant next step without sounding pushy.

Current pages:
- / — Home, main mission, featured content and services overview.
- /feed — #TheKingsTake community feed, livestreams, posts and invitation-only Royal Circle member access.
- /pre-order — Preorder Ronald Lee King's book, The African American State of the Union: From the Loins of the Beast.
- /about-author — Ronald Lee King's author story and background.
- /aasotu — AASOTU Media Group LLC mission and brand.
- /writing-services — writing, speechwriting, ghostwriting, editing and publishing support.
- /consultation — strategy and consultation booking.
- /work-with-us — partnerships, media work and collaboration inquiries.
- /contact — general contact.
- /civics — civic education.
- /deep-roots — history, ancestry and identity research.
- /land-report — land and historical research.
- /fba — Foundational Black American educational material.
- /petition — current community petition and action page.
- /privacy-policy — privacy and data-use information.

Rules:
- Never invent a service, price, policy, page, fact, order status or legal conclusion.
- Do not provide legal advice. Describe legal-document offerings only as document preparation/educational support by a non-attorney.
- Do not ask for sensitive data. If a visitor wants follow-up, invite them to voluntarily provide name and email through the lead form.
- Recommend at most one primary page and one secondary option. Include paths exactly as written.
- Keep responses under 120 words, warm, dignified, and useful.
`;

const recentRequests = new Map<string, { count: number; resetAt: number }>();
function checkAssistantRate(req: Request) {
  const key =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const entry = recentRequests.get(key);
  if (!entry || entry.resetAt < now) {
    recentRequests.set(key, { count: 1, resetAt: now + 10 * 60_000 });
    return;
  }
  if (entry.count >= 20)
    throw new Error(
      "Please wait a few minutes before asking another question."
    );
  entry.count += 1;
}

async function notifyOwner(subject: string, text: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.OWNER_NOTIFICATION_EMAIL;
  const from = process.env.NEWSLETTER_FROM_EMAIL;
  if (!apiKey || !to || !from)
    return { sent: false as const, reason: "Email variables are incomplete." };
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to: [to], subject, text }),
    });
    if (!response.ok) {
      console.error(
        `[engagement] Resend rejected a notification with status ${response.status}`
      );
      return {
        sent: false as const,
        reason: `Email provider returned status ${response.status}.`,
      };
    }
    return { sent: true as const };
  } catch (error) {
    console.error(
      "[engagement] Notification delivery failed",
      error instanceof Error ? error.message : "Unknown error"
    );
    return {
      sent: false as const,
      reason: "Could not reach the email provider.",
    };
  }
}

let lastVisitorAlertAt = 0;
let queuedVisitorCount = 0;

function safeReferrer(value?: string) {
  if (!value) return "Direct visit";
  try {
    return new URL(value).hostname || "Direct visit";
  } catch {
    return "Unknown referral source";
  }
}

async function notifyNewVisitor(path: string, referrer?: string) {
  if (process.env.VISITOR_ALERTS_ENABLED !== "true") return;

  queuedVisitorCount += 1;
  const configuredCooldown = Number(
    process.env.VISITOR_ALERT_COOLDOWN_SECONDS || "60"
  );
  const cooldownSeconds = Number.isFinite(configuredCooldown)
    ? Math.min(Math.max(configuredCooldown, 30), 3600)
    : 60;
  const now = Date.now();
  if (now - lastVisitorAlertAt < cooldownSeconds * 1000) return;

  const visitorCount = queuedVisitorCount;
  queuedVisitorCount = 0;
  lastVisitorAlertAt = now;
  const entryPath = path.split("?")[0].slice(0, 500) || "/";
  await notifyOwner(
    visitorCount === 1
      ? "New visitor on TheKingsTake.com"
      : `${visitorCount} new visitors on TheKingsTake.com`,
    `New browsing session${visitorCount === 1 ? "" : "s"}: ${visitorCount}\nEntry page: ${entryPath}\nSource: ${safeReferrer(referrer)}\n\nOpen the Audience & Leads dashboard for current activity.`
  );
}

export const engagementRouter = createRouter({
  trackVisit: publicQuery
    .input(
      z.object({
        sessionId: z.string().regex(/^[a-zA-Z0-9_-]{16,64}$/),
        path: z.string().min(1).max(500),
        referrer: z.string().max(1000).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const [existingSession] = await db
        .select({ id: siteVisitorSessions.id })
        .from(siteVisitorSessions)
        .where(eq(siteVisitorSessions.sessionId, input.sessionId))
        .limit(1);
      await db
        .insert(siteVisitorSessions)
        .values({
          sessionId: input.sessionId,
          lastPath: input.path,
          referrer: input.referrer || null,
        })
        .onDuplicateKeyUpdate({
          set: { lastPath: input.path, lastSeenAt: new Date() },
        });
      if (!existingSession) await notifyNewVisitor(input.path, input.referrer);
      return { success: true };
    }),

  subscribe: publicQuery
    .input(
      z.object({
        email: z.string().email().max(320),
        name: z.string().max(255).optional(),
        sourcePage: z.string().max(500).optional(),
        interests: z.array(z.string().max(100)).max(10).default([]),
        consent: z.literal(true),
      })
    )
    .mutation(async ({ input }) => {
      const email = input.email.trim().toLowerCase();
      await getDb()
        .insert(newsletterSubscribers)
        .values({
          email,
          name: input.name?.trim() || null,
          sourcePage: input.sourcePage || null,
          interests: JSON.stringify(input.interests),
          status: "subscribed",
          consentedAt: new Date(),
        })
        .onDuplicateKeyUpdate({
          set: {
            name: input.name?.trim() || null,
            status: "subscribed",
            consentedAt: new Date(),
          },
        });
      await notifyOwner(
        "New #TheKingsTake newsletter subscriber",
        `${input.name || "A visitor"} subscribed: ${email}`
      );
      return { success: true };
    }),

  captureLead: publicQuery
    .input(
      z.object({
        name: z.string().max(255).optional(),
        email: z.string().email().max(320),
        phone: z.string().max(50).optional(),
        interest: z.string().min(2).max(100),
        message: z.string().max(2000).optional(),
        sourcePage: z.string().max(500).optional(),
        consent: z.literal(true),
      })
    )
    .mutation(async ({ input }) => {
      await getDb()
        .insert(siteLeads)
        .values({
          name: input.name?.trim() || null,
          email: input.email.trim().toLowerCase(),
          phone: input.phone?.trim() || null,
          interest: input.interest,
          message: input.message?.trim() || null,
          sourcePage: input.sourcePage || null,
        });
      await notifyOwner(
        `New website lead: ${input.interest}`,
        `${input.name || "Visitor"}\n${input.email}\n${input.phone || "No phone"}\n${input.message || "No message"}`
      );
      return { success: true };
    }),

  askGuide: publicQuery
    .input(
      z.object({
        message: z.string().min(1).max(1000),
        currentPath: z.string().max(500),
      })
    )
    .mutation(async ({ input, ctx }) => {
      checkAssistantRate(ctx.req);
      const apiKey = process.env.OPENAI_API_KEY;
      if (!apiKey)
        return {
          answer:
            "I can help you find the feed, book preorder, writing services, consultations, history resources, or contact page. What would you like to do?",
        };
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            temperature: 0.3,
            max_tokens: 220,
            messages: [
              { role: "system", content: SITE_GUIDE },
              {
                role: "user",
                content: `Current page: ${input.currentPath}\nQuestion: ${input.message}`,
              },
            ],
          }),
        }
      );
      if (!response.ok)
        return {
          answer:
            "I can still guide you: visit /feed for the community, /pre-order for the book, /writing-services for writing help, or /contact for direct assistance.",
        };
      const data = (await response.json()) as {
        choices?: Array<{ message?: { content?: string } }>;
      };
      return {
        answer:
          data.choices?.[0]?.message?.content ||
          "How can I help you explore The King's Take?",
      };
    }),

  adminOverview: adminQuery.query(async () => {
    const db = getDb();
    const [active] = await db
      .select({ count: sql<number>`count(*)` })
      .from(siteVisitorSessions)
      .where(
        sql`${siteVisitorSessions.lastSeenAt} >= date_sub(now(), interval 5 minute)`
      );
    const subscribers = await db
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.status, "subscribed"))
      .orderBy(desc(newsletterSubscribers.createdAt))
      .limit(100);
    const leads = await db
      .select()
      .from(siteLeads)
      .orderBy(desc(siteLeads.createdAt))
      .limit(100);
    return {
      activeVisitors: Number(active?.count || 0),
      subscribers,
      leads,
      notificationsConfigured: Boolean(
        process.env.RESEND_API_KEY &&
        process.env.OWNER_NOTIFICATION_EMAIL &&
        process.env.NEWSLETTER_FROM_EMAIL
      ),
      visitorAlertsEnabled: process.env.VISITOR_ALERTS_ENABLED === "true",
    };
  }),

  adminTestNotification: adminQuery.mutation(async () => {
    const result = await notifyOwner(
      "TheKingsTake.com alert test",
      "Your professional website email connection is working. New visitor, subscriber, and lead alerts can now be delivered to this inbox."
    );
    if (!result.sent) {
      throw new TRPCError({
        code: "PRECONDITION_FAILED",
        message: result.reason || "The test alert could not be delivered.",
      });
    }
    return { success: true };
  }),
});
