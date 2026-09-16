import type { Context, Hono } from "hono";
import type { HttpBindings } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import fs from "fs";
import path from "path";
import { eq } from "drizzle-orm";
import { feedPosts, members } from "@db/schema";
import { getDb } from "../queries/connection";

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

function renderSharedPostHtml(template: string, post: {
  id: number;
  body: string;
  imageUrl: string | null;
  muxPlaybackId: string | null;
  memberName: string | null;
}, requestUrl: string): string {
  const author = post.memberName || "Ronald Lee King";
  const title = `${author} on #TheKingsTake | TheKingsTake.com`;
  const description = (post.body || `View ${author}'s exclusive community post on TheKingsTake.com`)
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 220);
  const image = post.imageUrl
    || (post.muxPlaybackId ? `https://image.mux.com/${post.muxPlaybackId}/thumbnail.jpg?time=0` : null)
    || "https://thekingstake.com/images/og-image.jpg";
  const canonicalUrl = new URL(requestUrl);
  canonicalUrl.protocol = "https:";
  canonicalUrl.host = "thekingstake.com";
  canonicalUrl.search = "";
  canonicalUrl.hash = "";

  let html = template.replace(/<title>[^<]*<\/title>/i, `<title>${escapeAttribute(title)}</title>`);
  html = replaceMeta(html, "name", "description", description);
  html = replaceMeta(html, "property", "og:title", title);
  html = replaceMeta(html, "property", "og:description", description);
  html = replaceMeta(html, "property", "og:type", "article");
  html = replaceMeta(html, "property", "og:url", canonicalUrl.toString());
  html = replaceMeta(html, "property", "og:image", image);
  html = replaceMeta(html, "name", "twitter:title", title);
  html = replaceMeta(html, "name", "twitter:description", description);
  html = replaceMeta(html, "name", "twitter:image", image);
  return html;
}

export function serveStaticFiles(app: App) {
  // In production, compiled server lives at dist/api/lib/vite.js
  // so import.meta.dirname = dist/api/lib/
  // We need ../../dist/public to reach dist/public
  const distPath = path.resolve(import.meta.dirname, "../../dist/public");
  const staticRoot = path.relative(process.cwd(), distPath) || ".";

  // Serve static files — only for actual files, not for SPA routes
  app.use("/assets/*", serveStatic({ root: staticRoot }));
  app.use("/images/*", serveStatic({ root: staticRoot }));
  app.use("/favicon.ico", serveStatic({ root: staticRoot }));
  app.use("/site.webmanifest", serveStatic({ root: staticRoot }));

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
      return c.html(renderSharedPostHtml(fs.readFileSync(indexPath, "utf-8"), rows[0], c.req.url));
    } catch (error) {
      console.error("Could not render shared feed post metadata", error);
      return c.html(fs.readFileSync(indexPath, "utf-8"));
    }
  };

  app.get("/feed/post/:id", sharedPostHandler);
  app.get("/feed/post/:id/:slug", sharedPostHandler);

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
