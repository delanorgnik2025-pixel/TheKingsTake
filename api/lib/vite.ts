import { NOLAN_RECORDS_PATH, NOLAN_RECORDS_TITLE, NOLAN_RECORDS_DESCRIPTION, NOLAN_RECORDS_IMAGE } from '../../contracts/nolan-records';
import type { Context, Hono } from "hono";
import type { HttpBindings } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import fs from "fs";
import path from "path";
import { and, eq } from "drizzle-orm";
import { feedPosts, members, posts } from "@db/schema";
import { getDb } from "../queries/connection";

import { articleMetadataHtml } from "./article-metadata";
import { feedMetadataHtml } from "./feed-metadata";

type App = Hono<{ Bindings: HttpBindings }>;

function escapeAttribute(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function replaceMeta(html: string, attribute: "name" | "property", key: string, value: string): string {
  const escaped = escapeAttribute(value);
  const pattern = new RegExp(`<meta\\s+${attribute}="${key}"\\s+content="[^"]*"\\s*\\/?\\s*>`, "i");
  const tag = `<meta ${attribute}="${key}" content="${escaped}" />`;
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace("</head>", `    ${tag}\n  </head>`);
}

export function serveStaticFiles(app: App, buildRoot?: string) {
  // In production, compiled server lives at dist/api/lib/vite.js
  // so import.meta.dirname = dist/api/lib/
  // We need ../../dist/public to reach dist/public
  const distPath = buildRoot || path.resolve(import.meta.dirname, "../../dist/public");
  const staticRoot = path.relative(process.cwd(), distPath) || ".";

  // Existing saved article/image URLs also resolve to the confirmed original cover.
  app.get("/images/book-cover.jpg", c => c.redirect("/images/book-cover-author-confirmed-v2.jpg", 302));

  app.get("/images/book-cover-confirmed-v1.png", c => c.redirect("/images/book-cover-author-confirmed-v2.jpg", 302));

  // Serve static files — only for actual files, not for SPA routes
  app.use("/assets/*", serveStatic({ root: staticRoot }));
  app.use("/images/*", serveStatic({ root: staticRoot }));
  app.use("/favicon.ico", serveStatic({ root: staticRoot }));
  app.use("/site.webmanifest", serveStatic({ root: staticRoot }));
  app.use("/robots.txt", serveStatic({ root: staticRoot }));
  app.use("/sitemap.xml", serveStatic({ root: staticRoot }));

  const sharedPostHandler = async (c: Context<{ Bindings: HttpBindings }>) => {
    const postId = Number(c.req.param("id"));
    if (!Number.isInteger(postId) || postId < 1) return c.notFound();
    const indexPath = path.resolve(distPath, "index.html");
    if (!fs.existsSync(indexPath)) return c.json({ error: "Frontend build not found" }, 500);

    try {
      const rows = await getDb()
        .select({
          id: feedPosts.id,
          body: feedPosts.body,
          imageUrl: feedPosts.imageUrl,
          muxPlaybackId: feedPosts.muxPlaybackId,
          memberName: members.name,
        })
        .from(feedPosts)
        .leftJoin(members, eq(members.id, feedPosts.memberId))
        .where(eq(feedPosts.id, postId))
        .limit(1);
      if (!rows[0]) return c.notFound();
      c.header("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
      return c.html(feedMetadataHtml(fs.readFileSync(indexPath, "utf-8"), c.req.url, rows[0].memberName || "Ronald Lee King"));
    } catch (error) {
      console.error("Could not render shared feed post metadata", error);
      return c.html(fs.readFileSync(indexPath, "utf-8"));
    }
  };

  app.get("/feed", c => {
    const indexPath = path.resolve(distPath, "index.html");
    if (!fs.existsSync(indexPath)) return c.json({ error: "Frontend build not found" }, 500);
    c.header("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
    return c.html(feedMetadataHtml(fs.readFileSync(indexPath, "utf-8"), c.req.url));
  });
  app.get("/feed/post/:id", sharedPostHandler);
  app.get("/feed/post/:id/:slug", sharedPostHandler);

  // Public metadata contains only published articles. Crawlers receive it even
  // when the visitor entrance form is still shown by the client application.
  app.get("/blog/:slug", async c => {
    const indexPath = path.resolve(distPath, "index.html");
    if (!fs.existsSync(indexPath)) return c.json({ error: "Frontend build not found" }, 500);
    try {
      const [post] = await getDb().select().from(posts).where(and(eq(posts.slug, c.req.param("slug")), eq(posts.published, true))).limit(1);
      if (!post) return c.html(fs.readFileSync(indexPath, "utf-8"), 404);
      c.header("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
      return c.html(articleMetadataHtml(fs.readFileSync(indexPath, "utf-8"), post));
    } catch (error) {
      console.error("Article metadata lookup failed");
      return c.html(fs.readFileSync(indexPath, "utf-8"), 503);
    }
  });

  app.get("/brand-studio", c => {
    const indexPath = path.resolve(distPath, "index.html");
    if (!fs.existsSync(indexPath)) return c.json({ error: "Frontend build not found" }, 500);
    const title = "Brand Studio | Websites & Branding by Ronald Lee King";
    const description = "Author websites, business websites, brand identity and writing from AASOTU Media Group LLC. Explore packages and request a project quote.";
    let html = fs.readFileSync(indexPath, "utf-8").replace(/<title>[^<]*<\/title>/i, `<title>${title}</title>`);
    for (const [attribute, key, value] of [
      ["name", "description", description], ["property", "og:title", title],
      ["property", "og:description", description], ["property", "og:url", "https://thekingstake.com/brand-studio"],
      ["name", "twitter:title", title], ["name", "twitter:description", description],
    ] as const) html = replaceMeta(html, attribute, key, value);
    html = html.replace(/<link[^>]+rel="canonical"[^>]*>/gi, "").replace("</head>", '<link rel="canonical" href="https://thekingstake.com/brand-studio" /></head>');
    return c.html(html);
  });

  app.get("/news-hub/hip-hop", c => c.redirect("/hip-hop", 301));
  app.get("/hip-hop", c => {
    const indexPath = path.resolve(distPath, "index.html");
    if (!fs.existsSync(indexPath)) return c.json({ error: "Frontend build not found" }, 500);
    const title = "Hip-Hop & Creator Culture | The King's Take";
    const description = "Hip-hop news, Black creators, Kick coverage and music industry reports from AASOTU Media Group LLC / #TheKingsTake.";
    let html = fs.readFileSync(indexPath, "utf-8").replace(/<title>[^<]*<\/title>/i, `<title>${escapeAttribute(title)}</title>`);
    for (const [attribute, key, value] of [
      ["name", "description", description], ["property", "og:title", title],
      ["property", "og:description", description], ["property", "og:url", "https://thekingstake.com/hip-hop"],
      ["property", "og:image", "https://thekingstake.com/images/culture-music-desk.svg"],
      ["name", "twitter:title", title], ["name", "twitter:description", description],
    ] as const) html = replaceMeta(html, attribute, key, value);
    html = html.replace(/<link[^>]+rel="canonical"[^>]*>/gi, "").replace("</head>", '<link rel="canonical" href="https://thekingstake.com/hip-hop" /></head>');
    return c.html(html);
  });

  app.get(NOLAN_RECORDS_PATH, c => {
    const indexPath = path.resolve(distPath, "index.html");
    if (!fs.existsSync(indexPath)) return c.json({ error: "Frontend build not found" }, 500);
    let html = fs.readFileSync(indexPath, "utf-8").replace(/<title>[^<]*<\/title>/i, `<title>${escapeAttribute(NOLAN_RECORDS_TITLE)} | The King’s Take</title>`);
    const canonical = `https://thekingstake.com${NOLAN_RECORDS_PATH}`;
    for (const [attribute, key, value] of [
      ["name", "description", NOLAN_RECORDS_DESCRIPTION], ["property", "og:title", NOLAN_RECORDS_TITLE],
      ["property", "og:description", NOLAN_RECORDS_DESCRIPTION], ["property", "og:url", canonical],
      ["property", "og:type", "article"], ["property", "og:image", `https://thekingstake.com${NOLAN_RECORDS_IMAGE}`],
      ["property", "og:image:alt", "Branded Nolan Wells investigation image; editorial illustration, not case evidence"],
      ["name", "twitter:card", "summary_large_image"], ["name", "twitter:title", NOLAN_RECORDS_TITLE],
      ["name", "twitter:description", NOLAN_RECORDS_DESCRIPTION], ["name", "twitter:image", `https://thekingstake.com${NOLAN_RECORDS_IMAGE}`],
    ] as const) html = replaceMeta(html, attribute, key, value);
    html = html.replace(/<meta\s+property="og:image:(width|height)"[^>]*>/gi, "");
    html = html.replace(/<link[^>]+rel="canonical"[^>]*>/gi, "").replace("</head>", `<link rel="canonical" href="${canonical}" /></head>`);
    c.header("Cache-Control", "public, max-age=60");
    return c.html(html);
  });

  // SPA fallback: for ALL non-API browser requests, return index.html
  // This must come AFTER static file routes but BEFORE API 404 handler
  app.get("*", (c) => {
    // Don't interfere with API routes
    if (c.req.path.startsWith("/api/")) return c.json({ error: "Not Found" }, 404);
    // Return index.html for React Router to handle
    const indexPath = path.resolve(distPath, "index.html");
    if (!fs.existsSync(indexPath)) {
      return c.json({ error: "Frontend build not found" }, 500);
    }
    return c.html(fs.readFileSync(indexPath, "utf-8"));
  });
}
