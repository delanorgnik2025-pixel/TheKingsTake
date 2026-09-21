import { z } from "zod";
import { desc, eq, sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { nanoid } from "nanoid";
import { adminQuery, createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import {
  newsletterSubscribers,
  newsletterCampaigns,
  posts,
  siteLeads,
  siteVisitorSessions,
  visitorContacts,
  workApplications,
} from "@db/schema";
import { generateDailyNewsDraft, latestAutomatedCampaign } from "./newsletter-automation";
import { visitorFromRequest } from "./security/visitor-session";

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
- /archives — search National Archives and Library of Congress records.
- /archives/nara/[NAID] — on-site metadata and multi-object document viewer for a NARA record when digital objects are available.
- /land-report — land and historical research.
- /fba — Foundational Black American educational material.
- /petition — current community petition and action page.
- /privacy-policy — privacy and data-use information.

Rules:
- Never invent a service, price, policy, page, fact, order status or legal conclusion.
- Do not provide legal advice. Describe legal-document offerings only as document preparation/educational support by a non-attorney.
- Do not ask for sensitive data. If a visitor wants follow-up, invite them to voluntarily provide name and email through the lead form.
- Use the conversation history. Do not repeat a question the visitor already answered.
- Ask one useful clarifying question when it would materially improve the answer.
- For archive research, suggest useful combinations of name, place, approximate year, nation, record type, or military unit. Explain that one record alone does not establish ancestry.
- If a record has no online digital object, explain that its catalog description may still be useful and the official archive may be needed for access.
- Recommend at most one primary page and one secondary option. Include paths exactly as written.
- Sound conversational and responsive rather than scripted. Keep most responses under 180 words.
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

async function sendEmail(to: string, subject: string, text: string, html?: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.NEWSLETTER_FROM_EMAIL;
  if (!apiKey || !from) return { sent: false as const, reason: "Email variables are incomplete." };
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], subject, text, ...(html ? { html } : {}) }),
    });
    return response.ok
      ? { sent: true as const }
      : { sent: false as const, reason: `Email provider returned status ${response.status}.` };
  } catch {
    return { sent: false as const, reason: "Could not reach the email provider." };
  }
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;",
  })[character] || character);
}

function safeHttpUrl(value: string | null | undefined) {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : null;
  } catch {
    return null;
  }
}

function renderNewsletterCopy(content: string) {
  return content.split("\n").map(line => {
    const trimmed = line.trim();
    if (!trimmed) return `<div style="height:12px"></div>`;
    if (trimmed.startsWith("## ")) return `<h3 style="margin:22px 0 10px;color:#ffb840;font-size:20px">${escapeHtml(trimmed.slice(3))}</h3>`;
    const bullet = trimmed.match(/^- \[([^\]]+)\]\((https?:\/\/[^)]+)\)$/);
    if (bullet) return `<div style="margin:0 0 9px;color:#dfd5c2">• <a href="${escapeHtml(bullet[2])}" style="color:#ffb840">${escapeHtml(bullet[1])}</a></div>`;
    return `<p style="margin:0 0 13px;line-height:1.7;color:#dfd5c2">${escapeHtml(trimmed)}</p>`;
  }).join("");
}

function newsletterHtml(campaign: typeof newsletterCampaigns.$inferSelect, unsubscribeUrl: string, articleUrl?: string) {
  const imageUrl = safeHttpUrl(campaign.imageUrl);
  const imageSourceUrl = safeHttpUrl(campaign.imageSourceUrl);
  const image = imageUrl
    ? `<img src="${escapeHtml(imageUrl)}" alt="${escapeHtml(campaign.imageAlt || campaign.subject)}" style="display:block;width:100%;max-height:380px;object-fit:cover"><div style="padding:8px 20px;background:#101b28;color:#9f927d;font:10px Arial,sans-serif">Image: ${imageSourceUrl ? `<a href="${escapeHtml(imageSourceUrl)}" style="color:#c9b99a">${escapeHtml(campaign.imageCredit || "View credit")}</a>` : escapeHtml(campaign.imageCredit || "AASOTU Media Group LLC")}</div>`
    : "";
  const readMore = articleUrl ? `<p style="margin:25px 0 0"><a href="${escapeHtml(articleUrl)}" style="display:inline-block;padding:12px 18px;background:#ff9500;color:#101b28;text-decoration:none;font:bold 13px Arial,sans-serif">Read the full article</a></p>` : "";
  return `<!doctype html><html><body style="margin:0;background:#101b28;font-family:Georgia,serif"><div style="display:none;max-height:0;overflow:hidden">${escapeHtml(campaign.previewText || campaign.subject)}</div><div style="max-width:680px;margin:0 auto;padding:32px 20px"><div style="border:1px solid rgba(255,149,0,.3);background:#182635"><div style="padding:28px;border-bottom:1px solid rgba(255,149,0,.25);text-align:center"><div style="color:#ff9500;font:12px Arial,sans-serif;letter-spacing:3px;text-transform:uppercase">AASOTU Media Group LLC</div><h1 style="margin:12px 0 0;color:#f0ebe1;font-size:34px">The King’s Dispatch</h1><div style="margin-top:8px;color:#c9b99a;font:12px Arial,sans-serif">#TheKingsTake · The People’s Voice</div></div>${image}<div style="padding:30px"><h2 style="margin:0 0 22px;color:#ffb840;font-size:25px">${escapeHtml(campaign.subject)}</h2>${renderNewsletterCopy(campaign.content)}${readMore}</div><div style="padding:22px;text-align:center;border-top:1px solid rgba(255,255,255,.08);color:#9f927d;font:11px Arial,sans-serif">Sent by AASOTU Media Group LLC · <a href="${escapeHtml(unsubscribeUrl)}" style="color:#ffb840">Unsubscribe</a></div></div></div></body></html>`;
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

async function notifyNewVisitor(path: string, referrer?: string, email?: string) {
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
    `New browsing session${visitorCount === 1 ? "" : "s"}: ${visitorCount}\nLatest identified visitor: ${email || "Unknown"}\nEntry page: ${entryPath}\nSource: ${safeReferrer(referrer)}\n\nOpen Audience & Leads for all captured emails and interests.`
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
    .mutation(async ({ input, ctx }) => {
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
      if (!existingSession) {
        const visitor = await visitorFromRequest(ctx.req);
        const [person] = visitor ? await db.select({ email: visitorContacts.email }).from(visitorContacts).where(eq(visitorContacts.id, visitor.contactId)).limit(1) : [];
        await notifyNewVisitor(input.path, input.referrer, person?.email);
      }
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
      const unsubscribeToken = nanoid(40);
      await getDb()
        .insert(newsletterSubscribers)
        .values({
          email,
          name: input.name?.trim() || null,
          sourcePage: input.sourcePage || null,
          interests: JSON.stringify(input.interests),
          status: "subscribed",
          unsubscribeToken,
          consentedAt: new Date(),
        })
        .onDuplicateKeyUpdate({
          set: {
            name: input.name?.trim() || null,
            status: "subscribed",
            unsubscribeToken,
            consentedAt: new Date(),
          },
        });
      await notifyOwner(
        "New #TheKingsTake newsletter subscriber",
        `${input.name || "A visitor"} subscribed: ${email}`
      );
      return { success: true };
    }),

  unsubscribe: publicQuery
    .input(z.object({ token: z.string().min(20).max(64) }))
    .mutation(async ({ input }) => {
      await getDb().update(newsletterSubscribers).set({ status: "unsubscribed" }).where(eq(newsletterSubscribers.unsubscribeToken, input.token));
      return { success: true };
    }),

  submitWorkApplication: publicQuery
    .input(z.object({
      name: z.string().trim().min(2).max(255),
      email: z.string().email().max(320),
      role: z.string().trim().min(2).max(255),
      message: z.string().trim().min(20).max(4000),
    }))
    .mutation(async ({ input }) => {
      const email = input.email.trim().toLowerCase();
      const [result] = await getDb().insert(workApplications).values({ ...input, email });
      await Promise.allSettled([
        notifyOwner(`New Work With Us application: ${input.role}`, `${input.name}\n${email}\nRole: ${input.role}\n\n${input.message}\n\nOpen the admin panel to review and update this application.`),
        sendEmail(email, "We received your AASOTU application", `Hello ${input.name},\n\nThank you for applying for ${input.role}. Your application was received and will be reviewed.\n\nAASOTU Media Group LLC\n#TheKingsTake`),
      ]);
      return { success: true, id: Number(result.insertId) };
    }),

  adminApplications: adminQuery.query(async () =>
    getDb().select().from(workApplications).orderBy(desc(workApplications.createdAt)).limit(250)
  ),

  adminUpdateApplication: adminQuery
    .input(z.object({
      id: z.number().int().positive(),
      status: z.enum(["new", "reviewing", "contacted", "accepted", "declined"]),
      adminNotes: z.string().max(4000).optional(),
    }))
    .mutation(async ({ input }) => {
      await getDb().update(workApplications).set({ status: input.status, adminNotes: input.adminNotes?.trim() || null }).where(eq(workApplications.id, input.id));
      return { success: true };
    }),

  adminNewsletterCampaigns: adminQuery.query(async () =>
    getDb().select().from(newsletterCampaigns).orderBy(desc(newsletterCampaigns.createdAt)).limit(100)
  ),

  adminNewsletterAutomationStatus: adminQuery.query(async () => ({
    enabled: process.env.NEWSLETTER_AUTOMATION_ENABLED !== "false",
    researchConfigured: Boolean(process.env.OPENAI_API_KEY),
    emailConfigured: Boolean(process.env.RESEND_API_KEY && process.env.NEWSLETTER_FROM_EMAIL),
    dailyHourEastern: Number(process.env.NEWSLETTER_DAILY_HOUR_ET || "5"),
    latest: await latestAutomatedCampaign(),
  })),

  adminGenerateDailyNewsDraft: adminQuery.mutation(async () => {
    try {
      return await generateDailyNewsDraft();
    } catch (error) {
      throw new TRPCError({
        code: "PRECONDITION_FAILED",
        message: error instanceof Error ? error.message : "The daily draft could not be generated.",
      });
    }
  }),

  adminCreateNewsletterCampaign: adminQuery
    .input(z.object({
      subject: z.string().trim().min(3).max(255),
      previewText: z.string().trim().max(255).optional(),
      content: z.string().trim().min(30).max(30000),
      sourceUrls: z.array(z.string().url().max(1000)).max(20).default([]),
    }))
    .mutation(async ({ input }) => {
      const [result] = await getDb().insert(newsletterCampaigns).values({
        subject: input.subject,
        previewText: input.previewText || null,
        content: input.content,
        sourceUrls: JSON.stringify(input.sourceUrls),
      });
      return { success: true, id: Number(result.insertId) };
    }),

  adminUpdateNewsletterCampaign: adminQuery
    .input(z.object({
      id: z.number().int().positive(),
      subject: z.string().trim().min(3).max(255),
      previewText: z.string().trim().max(255).optional(),
      content: z.string().trim().min(30).max(60000),
      sourceUrls: z.array(z.string().url().max(1000)).min(2).max(20),
      articleTitle: z.string().trim().min(3).max(255).optional(),
      articleExcerpt: z.string().trim().max(3000).optional(),
      articleContent: z.string().trim().max(60000).optional(),
      imageUrl: z.string().url().max(3000).optional(),
      imageAlt: z.string().trim().max(500).optional(),
      imageCredit: z.string().trim().max(2000).optional(),
      imageSourceUrl: z.string().url().max(3000).optional(),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const [campaign] = await db.select().from(newsletterCampaigns).where(eq(newsletterCampaigns.id, input.id)).limit(1);
      if (!campaign) throw new TRPCError({ code: "NOT_FOUND", message: "Newsletter draft not found." });
      if (campaign.status === "sent") throw new TRPCError({ code: "CONFLICT", message: "A sent edition cannot be edited." });
      const { id, sourceUrls, ...fields } = input;
      await db.update(newsletterCampaigns).set({
        ...fields,
        previewText: fields.previewText || null,
        sourceUrls: JSON.stringify(sourceUrls),
        articleTitle: fields.articleTitle || null,
        articleExcerpt: fields.articleExcerpt || null,
        articleContent: fields.articleContent || null,
        imageUrl: fields.imageUrl || null,
        imageAlt: fields.imageAlt || null,
        imageCredit: fields.imageCredit || null,
        imageSourceUrl: fields.imageSourceUrl || null,
      }).where(eq(newsletterCampaigns.id, id));
      return { success: true };
    }),

  adminSendNewsletterCampaign: adminQuery
    .input(z.object({ id: z.number().int().positive(), confirm: z.literal(true) }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const [campaign] = await db.select().from(newsletterCampaigns).where(eq(newsletterCampaigns.id, input.id)).limit(1);
      if (!campaign) throw new TRPCError({ code: "NOT_FOUND", message: "Newsletter draft not found." });
      if (campaign.status === "sent") throw new TRPCError({ code: "CONFLICT", message: "This newsletter has already been sent." });
      let sourceUrls: string[] = [];
      try { sourceUrls = JSON.parse(campaign.sourceUrls || "[]"); } catch { sourceUrls = []; }
      if (campaign.automated && sourceUrls.length < 2)
        throw new TRPCError({ code: "PRECONDITION_FAILED", message: "Automated editions require at least two source links before approval." });
      const siteUrl = (process.env.PUBLIC_SITE_URL || "https://thekingstake.com").replace(/\/$/, "");
      let publishedPostId = campaign.publishedPostId;
      let articleUrl: string | undefined;
      if (campaign.automated) {
        if (!campaign.articleTitle || !campaign.articleSlug || !campaign.articleContent)
          throw new TRPCError({ code: "PRECONDITION_FAILED", message: "The website article is incomplete. Edit and save the draft before approval." });
        if (!publishedPostId) {
          const [postResult] = await db.insert(posts).values({
            title: campaign.articleTitle,
            slug: campaign.articleSlug,
            excerpt: campaign.articleExcerpt,
            content: campaign.articleContent,
            category: "DAILY NEWS",
            coverImage: campaign.imageUrl,
            published: true,
            featured: false,
          });
          publishedPostId = Number(postResult.insertId);
          await db.update(newsletterCampaigns).set({ publishedPostId, approvedAt: new Date() }).where(eq(newsletterCampaigns.id, input.id));
        }
        articleUrl = `${siteUrl}/blog/${campaign.articleSlug}`;
      }
      const subscribers = await db.select().from(newsletterSubscribers).where(eq(newsletterSubscribers.status, "subscribed")).limit(500);
      let sent = 0;
      for (const subscriber of subscribers) {
        const token = subscriber.unsubscribeToken || nanoid(40);
        if (!subscriber.unsubscribeToken)
          await db.update(newsletterSubscribers).set({ unsubscribeToken: token }).where(eq(newsletterSubscribers.id, subscriber.id));
        const unsubscribeUrl = `${siteUrl}/newsletter/unsubscribe?token=${encodeURIComponent(token)}`;
        const result = await sendEmail(
          subscriber.email,
          campaign.subject,
          `${campaign.content}${articleUrl ? `\n\nRead the full article: ${articleUrl}` : ""}\n\nUnsubscribe: ${unsubscribeUrl}`,
          newsletterHtml(campaign, unsubscribeUrl, articleUrl)
        );
        if (!result.sent) throw new TRPCError({ code: "BAD_GATEWAY", message: `Sending stopped after ${sent} deliveries: ${result.reason}` });
        sent += 1;
      }
      await db.update(newsletterCampaigns).set({ status: "sent", sentAt: new Date(), recipientCount: sent, approvedAt: campaign.approvedAt || new Date(), publishedPostId }).where(eq(newsletterCampaigns.id, input.id));
      return { success: true, sent, published: Boolean(publishedPostId), articleUrl };
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
        history: z
          .array(
            z.object({
              role: z.enum(["guide", "visitor"]),
              text: z.string().min(1).max(1200),
            })
          )
          .max(10)
          .default([]),
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
            model: process.env.OPENAI_CHAT_MODEL || "gpt-4o-mini",
            temperature: 0.55,
            max_tokens: 360,
            messages: [
              { role: "system", content: SITE_GUIDE },
              ...input.history.map(item => ({
                role: item.role === "guide" ? "assistant" : "user",
                content: item.text,
              })),
              {
                role: "user",
                content: `Current page: ${input.currentPath}\nVisitor's newest message: ${input.message}`,
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
