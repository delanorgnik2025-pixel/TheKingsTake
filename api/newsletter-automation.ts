import { desc, eq } from "drizzle-orm";
import { newsletterCampaigns } from "../db/schema";
import { getDb } from "./queries/connection";
import { easternDailyKey, easternHour, selectIndependentSources, type NewsSource as Source } from "./newsletter-automation-utils";

export { easternDailyKey, easternHour, selectIndependentSources } from "./newsletter-automation-utils";

type EditorialDraft = {
  subject: string;
  previewText: string;
  articleTitle: string;
  articleExcerpt: string;
  articleContent: string;
  newsletterContent: string;
  imageSearchTerm: string;
};

type ImageSelection = {
  url: string;
  alt: string;
  credit: string;
  sourceUrl: string | null;
};

const FALLBACK_IMAGE: ImageSelection = {
  url: "https://thekingstake.com/images/news-broadcast-bg.jpg",
  alt: "The King's Take daily news desk",
  credit: "AASOTU Media Group LLC",
  sourceUrl: null,
};

function extractResearch(response: unknown) {
  const data = response as {
    output?: Array<{
      type?: string;
      action?: { sources?: Array<{ url?: string; title?: string }> };
      content?: Array<{
        type?: string;
        text?: string;
        annotations?: Array<{ type?: string; url?: string; title?: string }>;
      }>;
    }>;
    output_text?: string;
  };
  const textParts: string[] = [];
  const sources: Source[] = [];
  for (const item of data.output || []) {
    for (const source of item.action?.sources || []) {
      if (source.url) sources.push({ url: source.url, title: source.title || "Source" });
    }
    for (const content of item.content || []) {
      if (content.text) textParts.push(content.text);
      for (const annotation of content.annotations || []) {
        if (annotation.url) sources.push({ url: annotation.url, title: annotation.title || "Source" });
      }
    }
  }
  return {
    text: textParts.join("\n\n").trim() || data.output_text?.trim() || "",
    sources: selectIndependentSources(sources),
  };
}

function stripHtml(value: string) {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function slugify(value: string, dailyKey: string) {
  const base = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 190);
  return `${base || "kings-daily-brief"}-${dailyKey}`;
}

async function researchCurrentNews(apiKey: string) {
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: process.env.NEWSLETTER_RESEARCH_MODEL || "gpt-4.1-mini",
      tools: [{ type: "web_search", search_context_size: "low" }],
      tool_choice: "required",
      max_output_tokens: 1800,
      input: `Today is ${new Date().toISOString().slice(0, 10)}. Research current developments from the last 48 hours for TheKingsTake.com readers. Choose one consequential lead story and two short developments involving civil rights, African American communities, economic justice, criminal-justice policy, government action, Black or Indigenous history, genealogy, archives, books, or media. Verify the lead with at least two independent credible sources, prioritizing public agencies, primary documents, established newsrooms, and subject-matter institutions. Avoid rumors, clickbait, celebrity gossip, and unsupported claims. Return a concise factual brief with dates, why each item matters, uncertainty, and citations. This is a draft for human approval; do not invent the publisher's personal opinion.`,
    }),
  });
  if (!response.ok) {
    const detail = await response.text();
    if (response.status === 429)
      throw new Error("OpenAI news research is temporarily rate-limited. Wait about one minute, then try again.");
    throw new Error(`OpenAI web research failed (${response.status}): ${detail.slice(0, 300)}`);
  }
  const extracted = extractResearch(await response.json());
  if (!extracted.text) throw new Error("The research service returned no usable brief.");
  return extracted;
}

async function writeDraft(apiKey: string, research: string, sources: Source[]): Promise<EditorialDraft> {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: process.env.OPENAI_CHAT_MODEL || "gpt-4o-mini",
      temperature: 0.35,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `You are the careful editorial desk for The King's Take, published by AASOTU Media Group LLC. Write a clear, original, serious daily news analysis for a general audience. Separate verified fact from interpretation. Do not fabricate quotes, numbers, links, or Ronald Lee King's personal views. Do not make legal conclusions. Use only the supplied research. The article should be 700-1,100 words with concise Markdown headings. The newsletter should be 350-600 words and invite readers to read the full article. Return strict JSON with exactly these string keys: subject, previewText, articleTitle, articleExcerpt, articleContent, newsletterContent, imageSearchTerm. Do not put source lists in the copy; the application appends the verified sources. imageSearchTerm must describe a factual newsworthy subject suitable for a Wikimedia Commons photo, not an abstract illustration.`,
        },
        {
          role: "user",
          content: `RESEARCH BRIEF\n${research}\n\nVERIFIED SOURCES\n${sources.map((source, index) => `${index + 1}. ${source.title}: ${source.url}`).join("\n")}`,
        },
      ],
    }),
  });
  if (!response.ok) throw new Error(`Editorial drafting failed (${response.status}).`);
  const data = (await response.json()) as { choices?: Array<{ message?: { content?: string } }> };
  const raw = data.choices?.[0]?.message?.content;
  if (!raw) throw new Error("The editorial service returned an empty draft.");
  const parsed = JSON.parse(raw) as Partial<EditorialDraft>;
  const required: Array<keyof EditorialDraft> = ["subject", "previewText", "articleTitle", "articleExcerpt", "articleContent", "newsletterContent", "imageSearchTerm"];
  for (const key of required) {
    if (typeof parsed[key] !== "string" || !parsed[key]?.trim()) throw new Error(`The generated draft is missing ${key}.`);
  }
  return parsed as EditorialDraft;
}

async function findCommonsImage(searchTerm: string): Promise<ImageSelection> {
  try {
    const params = new URLSearchParams({
      action: "query",
      format: "json",
      origin: "*",
      generator: "search",
      gsrsearch: `${searchTerm} filetype:bitmap`,
      gsrnamespace: "6",
      gsrlimit: "8",
      prop: "imageinfo",
      iiprop: "url|extmetadata",
      iiurlwidth: "1400",
    });
    const response = await fetch(`https://commons.wikimedia.org/w/api.php?${params}`, {
      headers: { "User-Agent": "TheKingsTake/1.0 (https://thekingstake.com/contact)" },
    });
    if (!response.ok) return FALLBACK_IMAGE;
    const data = (await response.json()) as {
      query?: { pages?: Record<string, { title?: string; imageinfo?: Array<{ thumburl?: string; url?: string; descriptionurl?: string; extmetadata?: Record<string, { value?: string }> }> }> };
    };
    for (const page of Object.values(data.query?.pages || {})) {
      const info = page.imageinfo?.[0];
      if (!info) continue;
      const url = info?.thumburl || info?.url;
      if (!url?.startsWith("https://upload.wikimedia.org/")) continue;
      const metadata = info.extmetadata || {};
      const license = stripHtml(metadata.LicenseShortName?.value || "Wikimedia Commons license");
      const artist = stripHtml(metadata.Artist?.value || metadata.Credit?.value || "Wikimedia Commons contributor");
      return {
        url,
        alt: stripHtml(metadata.ImageDescription?.value || page.title?.replace(/^File:/, "") || searchTerm).slice(0, 500),
        credit: `${artist} · ${license}`.slice(0, 1000),
        sourceUrl: info.descriptionurl || null,
      };
    }
  } catch (error) {
    console.error("[daily-news] Wikimedia image search failed", error instanceof Error ? error.message : error);
  }
  return FALLBACK_IMAGE;
}

async function notifyDraftReady(campaignId: number, subject: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.OWNER_NOTIFICATION_EMAIL;
  const from = process.env.NEWSLETTER_FROM_EMAIL;
  if (!apiKey || !to || !from) return;
  const siteUrl = (process.env.PUBLIC_SITE_URL || "https://thekingstake.com").replace(/\/$/, "");
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      subject: "Daily news draft ready for your approval",
      text: `The King's Dispatch draft “${subject}” is ready. Nothing has been published or sent.\n\nReview campaign #${campaignId} in your admin dashboard: ${siteUrl}/admin`,
    }),
  }).catch(error => console.error("[daily-news] Draft-ready email failed", error));
}

export async function generateDailyNewsDraft(options: { force?: boolean } = {}) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is required for daily news research.");
  const db = getDb();
  const dailyKey = easternDailyKey();
  const [existing] = await db.select().from(newsletterCampaigns).where(eq(newsletterCampaigns.dailyKey, dailyKey)).limit(1);
  if (existing && !options.force) return { created: false as const, campaign: existing };
  if (existing && options.force) throw new Error("Today's automated draft already exists. Edit it in the approval desk instead of overwriting it.");

  const research = await researchCurrentNews(apiKey);
  const editorial = await writeDraft(apiKey, research.text, research.sources);
  const image = await findCommonsImage(editorial.imageSearchTerm);
  const sourceSection = `\n\n## Sources\n${research.sources.map(source => `- [${source.title}](${source.url})`).join("\n")}`;
  const imageCredit = image.sourceUrl ? `${image.credit} — ${image.sourceUrl}` : image.credit;
  const [result] = await db.insert(newsletterCampaigns).values({
    subject: editorial.subject.slice(0, 255),
    previewText: editorial.previewText.slice(0, 255),
    content: `${editorial.newsletterContent}${sourceSection}`,
    sourceUrls: JSON.stringify(research.sources.map(source => source.url)),
    automated: true,
    dailyKey,
    researchSummary: research.text,
    imageUrl: image.url,
    imageAlt: image.alt,
    imageCredit,
    imageSourceUrl: image.sourceUrl,
    articleTitle: editorial.articleTitle.slice(0, 255),
    articleSlug: slugify(editorial.articleTitle, dailyKey),
    articleExcerpt: editorial.articleExcerpt,
    articleContent: `${editorial.articleContent}${sourceSection}\n\n_Image: ${imageCredit}_`,
  });
  const id = Number(result.insertId);
  const [campaign] = await db.select().from(newsletterCampaigns).where(eq(newsletterCampaigns.id, id)).limit(1);
  await notifyDraftReady(id, editorial.subject);
  return { created: true as const, campaign };
}

let generationInProgress = false;

async function runScheduledGeneration() {
  if (generationInProgress || easternHour() < Number(process.env.NEWSLETTER_DAILY_HOUR_ET || "5")) return;
  generationInProgress = true;
  try {
    const result = await generateDailyNewsDraft();
    if (result.created) console.log(`[daily-news] Created approval draft for ${easternDailyKey()}`);
  } catch (error) {
    console.error("[daily-news] Generation skipped or failed", error instanceof Error ? error.message : error);
  } finally {
    generationInProgress = false;
  }
}

export function startDailyNewsAutomation() {
  if (process.env.NEWSLETTER_AUTOMATION_ENABLED === "false") {
    console.log("[daily-news] Automation disabled by configuration.");
    return;
  }
  if (!process.env.OPENAI_API_KEY) {
    console.log("[daily-news] Automation waiting for OPENAI_API_KEY.");
    return;
  }
  setTimeout(runScheduledGeneration, 30_000).unref();
  setInterval(runScheduledGeneration, 15 * 60_000).unref();
  console.log(`[daily-news] Approval-draft automation enabled for ${process.env.NEWSLETTER_DAILY_HOUR_ET || "5"}:00 AM Eastern.`);
}

export async function latestAutomatedCampaign() {
  const [campaign] = await getDb().select().from(newsletterCampaigns).where(eq(newsletterCampaigns.automated, true)).orderBy(desc(newsletterCampaigns.createdAt)).limit(1);
  return campaign || null;
}
