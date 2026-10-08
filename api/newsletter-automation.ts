import { NEWS_IMAGES } from "../contracts/news-images";
import { and, desc, eq } from "drizzle-orm";
import { newsletterCampaigns, posts } from "../db/schema";
import { getDb } from "./queries/connection";
import { easternDailyKey, easternHour, selectIndependentSources, type NewsSource as Source } from "./newsletter-automation-utils";

import { NEWS_BEATS, type NewsBeatId } from "../contracts/news-beats";

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

export async function researchCurrentNews(apiKey: string, focus: string) {
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    signal: AbortSignal.timeout(90000),
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: process.env.NEWSLETTER_RESEARCH_MODEL || "gpt-4.1-mini",
      tools: [{ type: "web_search", search_context_size: "low" }],
      tool_choice: "required",
      max_output_tokens: 1800,
      input: `Today is ${easternDailyKey()}. Research current developments from the last 48 hours for TheKingsTake.com readers. Research this coverage beat ONLY: ${focus} Choose one consequential verified story. If no new development is confirmed, explicitly produce a dated background/context brief using the most recent reliable evidence rather than inventing breaking news. Verify the lead with at least two independent credible sources, prioritizing public agencies, primary documents, established newsrooms, and subject-matter institutions. Avoid rumors, clickbait, celebrity gossip, and unsupported claims. Return a concise factual brief with dates, why each item matters, uncertainty, and citations. This is a draft for human approval; do not invent the publisher's personal opinion.`,
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

export async function writeDraft(apiKey: string, research: string, sources: Source[]): Promise<EditorialDraft> {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    signal: AbortSignal.timeout(90000),
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: process.env.OPENAI_CHAT_MODEL || "gpt-4o-mini",
      temperature: 0.35,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `You are the careful editorial desk for The King's Take, published by AASOTU Media Group LLC. Write a clear, original, serious daily news analysis for a general audience. Separate verified fact from interpretation. Do not fabricate quotes, numbers, links, or Ronald Lee King's personal views. Do not make legal conclusions. Use only the supplied research. The article should be 350-600 words, or shorter if the verified evidence is limited with concise Markdown headings. The newsletter should be 60-100 words and invite readers to read the full article. Return strict JSON with exactly these string keys: subject, previewText, articleTitle, articleExcerpt, articleContent, newsletterContent, imageSearchTerm. Do not put source lists in the copy; the application appends the verified sources. imageSearchTerm must describe a factual newsworthy subject suitable for a Wikimedia Commons photo, not an abstract illustration. When house artwork is used, an original gritty urban editorial-poster or cinematic satirical video-game aesthetic is allowed, but do not use third-party game titles, logos, branded characters, trademark-heavy packaging, or imagery that could imply sponsorship or endorsement. For sourced photography, prefer neutral documentary images of people, places, institutions, public infrastructure or events.`,
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

export async function findCommonsImage(searchTerm: string, beat: NewsBeatId): Promise<ImageSelection> {
  const photo = NEWS_IMAGES[beat];
  const fallback: ImageSelection = { url: photo.url, alt: photo.alt, credit: `${photo.caption} ${photo.credit}`, sourceUrl: photo.sourceUrl };
  try {
    const params = new URLSearchParams({
      action: "query",
      format: "json",
      origin: "*",
      generator: "search",
      gsrsearch: `${searchTerm} filetype:bitmap -artificial -illustration -drawing -diagram -logo -poster -game -videogame -trademark`,
      gsrnamespace: "6",
      gsrlimit: "8",
      prop: "imageinfo",
      iiprop: "url|extmetadata",
      iiurlwidth: "1400",
    });
    const response = await fetch(`https://commons.wikimedia.org/w/api.php?${params}`, {
      signal: AbortSignal.timeout(12000),
      headers: { "User-Agent": "TheKingsTake/1.0 (https://thekingstake.com/contact)" },
    });
    if (!response.ok) return fallback;
    const data = (await response.json()) as {
      query?: { pages?: Record<string, { title?: string; imageinfo?: Array<{ thumburl?: string; url?: string; descriptionurl?: string; extmetadata?: Record<string, { value?: string }> }> }> };
    };
    for (const page of Object.values(data.query?.pages || {})) {
      const info = page.imageinfo?.[0];
      if (!info) continue;
      const url = info?.thumburl || info?.url;
      if (!url?.startsWith("https://upload.wikimedia.org/")) continue;
      const metadata = info.extmetadata || {};
      const description = stripHtml(metadata.ImageDescription?.value || "");
      if (/AI.generated|AI generated|artificial intelligence|illustration|drawing|diagram|rendering|computer.generated|video game|videogame|game cover|poster|logo|trademark|promotional artwork/i.test(`${page.title} ${description}`)) continue;
      const license = stripHtml(metadata.LicenseShortName?.value || "Wikimedia Commons license");
      if (!/^(CC BY|CC0|Public domain)/i.test(license)) continue;
      const artist = stripHtml(metadata.Artist?.value || metadata.Credit?.value || "Wikimedia Commons contributor");
      return {
        url,
        alt: stripHtml(metadata.ImageDescription?.value || page.title?.replace(/^File:/, "") || searchTerm).slice(0, 500),
        credit: `Context image: ${description.slice(0, 300)}. ${artist} · ${license}`.slice(0, 1000),
        sourceUrl: info.descriptionurl || null,
      };
    }
  } catch (error) {
    console.error("[daily-news] Wikimedia image search failed", error instanceof Error ? error.message : error);
  }
  return fallback;
}

async function notifyDraftReady(campaignId: number, subject: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.OWNER_NOTIFICATION_EMAIL;
  const from = process.env.NEWSLETTER_FROM_EMAIL;
  if (!apiKey || !to || !from) return;
  const siteUrl = (process.env.PUBLIC_SITE_URL || "https://thekingstake.com").replace(/\/$/, "");
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    signal: AbortSignal.timeout(90000),
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      subject: "Daily news draft ready for your approval",
      text: `The King's Dispatch draft “${subject}” is ready. Nothing has been published or sent.\n\nReview campaign #${campaignId} in your Dispatch approval desk: ${siteUrl}/admin/dashboard?section=newsletter`,
    }),
  }).catch(error => console.error("[daily-news] Draft-ready email failed", error));
}

export async function generateDailyNewsDraft() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is required for daily news research.");
  const db = getDb();
  const dailyKey = `${easternDailyKey()}-newsroom`;
  const [existing] = await db.select().from(newsletterCampaigns).where(eq(newsletterCampaigns.dailyKey, dailyKey)).limit(1);
  if (existing) return { created: false as const, campaign: existing };
  for (const beat of NEWS_BEATS) {
    const [saved] = await db.select({ id: posts.id }).from(posts).where(and(eq(posts.newsEdition, dailyKey), eq(posts.newsBeat, beat.id))).limit(1);
    if (saved) continue;
    const research = await researchCurrentNews(apiKey, beat.focus);
    const editorial = await writeDraft(apiKey, research.text, research.sources);
    const image = await findCommonsImage(editorial.imageSearchTerm, beat.id);
    const sourceSection = `\n\n## Sources\n${research.sources.map(source => `- [${source.title}](${source.url})`).join("\n")}`;
    const imageCredit = image.sourceUrl ? `${image.credit} — ${image.sourceUrl}` : image.credit;
    await db.insert(posts).values({
      title: editorial.articleTitle.slice(0, 255),
      slug: slugify(editorial.articleTitle, `${dailyKey.slice(0, 10)}-${beat.id}`),
      excerpt: editorial.articleExcerpt,
      content: `${editorial.articleContent}${sourceSection}\n\n_Image: ${imageCredit}_`,
      category: "DAILY NEWS", newsBeat: beat.id, newsEdition: dailyKey,
      coverImage: image.url.slice(0, 500), published: false, featured: false,
    });
    console.log(`[daily-news] Prepared ${beat.id} for editorial review`);
  }
  const articles = await db.select().from(posts).where(eq(posts.newsEdition, dailyKey)).orderBy(posts.newsBeat);
  if (articles.length !== NEWS_BEATS.length) throw new Error("Some coverage beats are still being researched; completed drafts are saved for the next attempt.");
  const lead = articles.find(article => article.newsBeat === "ai-policy") || articles.find(article => article.newsBeat === "environment") || articles[0];
  const digest = articles.map(article => `## ${NEWS_BEATS.find(beat => beat.id === article.newsBeat)?.label}\n${article.title}\n\n${article.excerpt}\n\n[Read the full report](https://thekingstake.com/blog/${article.slug})`).join("\n\n");
  const sources = [...new Set(articles.flatMap(article => [...article.content.matchAll(/\]\((https?:[^)]+)\)/g)].map(match => match[1])))];
  const [result] = await db.insert(newsletterCampaigns).values({
    subject: `The King's Dispatch · ${easternDailyKey()} · Nine research beats`,
    previewText: "Crime and justice, AI, weather, world affairs, Africa, science and policy — today's sourced reporting.",
    content: digest, sourceUrls: JSON.stringify(sources), automated: true, dailyKey,
    researchSummary: "Nine individually sourced research briefs. Review the full newsroom bundle before approving this single digest.",
    imageUrl: lead.coverImage, imageAlt: lead.title, imageCredit: "See the image credit in the linked article.",
    articleTitle: lead.title, articleSlug: lead.slug, articleExcerpt: lead.excerpt, articleContent: lead.content,
  });
  const id = Number(result.insertId);
  const [campaign] = await db.select().from(newsletterCampaigns).where(eq(newsletterCampaigns.id, id)).limit(1);
  await notifyDraftReady(id, campaign.subject);
  return { created: true as const, campaign };
}

let generationInProgress = false;
let lastGenerationError: string | null = null;
export function newsroomGenerationStatus() { return { generating: generationInProgress, lastGenerationError }; }

export async function runScheduledGeneration(manual = false) {
  if (generationInProgress || (!manual && easternHour() < Number(process.env.NEWSLETTER_DAILY_HOUR_ET || "5"))) return;
  generationInProgress = true;
  lastGenerationError = null;
  try {
    const result = await generateDailyNewsDraft();
    if (result.created) console.log(`[daily-news] Created approval draft for ${easternDailyKey()}`);
  } catch (error) {
    lastGenerationError = "Daily research could not finish. Completed article drafts are saved; the next run will resume. Check the research connection or try again shortly.";
    console.error("[daily-news] Generation skipped or failed", error instanceof Error ? error.message : error);
  } finally {
    generationInProgress = false;
  }
}

export function queueDailyNewsGeneration() {
  if (generationInProgress) return { queued: true as const, created: false as const };
  void runScheduledGeneration(true);
  return { queued: true as const, created: false as const };
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
  setTimeout(() => runScheduledGeneration(), 30_000).unref();
  setInterval(() => runScheduledGeneration(), 15 * 60_000).unref();
  console.log(`[daily-news] Approval-draft automation enabled for ${process.env.NEWSLETTER_DAILY_HOUR_ET || "5"}:00 AM Eastern.`);
}

export async function latestAutomatedCampaign() {
  const [campaign] = await getDb().select().from(newsletterCampaigns).where(eq(newsletterCampaigns.automated, true)).orderBy(desc(newsletterCampaigns.createdAt)).limit(1);
  return campaign || null;
}
