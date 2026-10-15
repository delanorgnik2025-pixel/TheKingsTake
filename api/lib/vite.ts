import {spiritEntry} from '../../contracts/spirit-library';
import { NOLAN_RECORDS_PATH, NOLAN_RECORDS_TITLE, NOLAN_RECORDS_DESCRIPTION, NOLAN_RECORDS_IMAGE } from '../../contracts/nolan-records';
import type { Context, Hono } from "hono";
import type { HttpBindings } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import fs from "fs";
import path from "path";
import { and, eq } from "drizzle-orm";
import { posts } from "@db/schema";
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

  const spiritMetadata = (c: Context<{ Bindings: HttpBindings }>) => {
    const file=path.resolve(distPath,'index.html');if(!fs.existsSync(file))return c.notFound();
    const slug=c.req.param('entrySlug');const entry=spiritEntry(slug);
    if(slug&&!entry)return c.notFound();
    const title=(entry?.title||'Spirit & Symbol')+" | The King's Take";
    const description=entry?.intro||'Living traditions, historical manuscripts, symbolism and daily zodiac reflections from AASOTU Media Group LLC.';
    let html=fs.readFileSync(file,'utf8').replace(/<title>[^<]*<\/title>/i,`<title>${escapeAttribute(title)}</title>`);
    const url='https://thekingstake.com/spirit-and-symbol'+(entry?'/'+entry.slug:'');
    for(const [kind,key,value] of [['property','og:title',title],['property','og:description',description],['property','og:url',url],['property','og:image','https://thekingstake.com/images/cosmic-bg.jpg'],['name','description',description],['name','twitter:title',title],['name','twitter:description',description],['name','twitter:image','https://thekingstake.com/images/cosmic-bg.jpg'],['name','twitter:card','summary_large_image']])html=replaceMeta(html,kind as 'name'|'property',key,value);
    html=html.replace(/<link[^>]+rel="canonical"[^>]*>/gi,'').replace('</head>',`<link rel="canonical" href="${url}" /></head>`);
    c.header('Cache-Control','public, max-age=300');return c.html(html);
  };
  app.get('/spirit-and-symbol',spiritMetadata);
  app.get('/spirit-and-symbol/:entrySlug',spiritMetadata);

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

    c.header("Cache-Control", "private, no-store");
    return c.html(feedMetadataHtml(fs.readFileSync(indexPath, "utf-8"), c.req.url));
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

  for (const route of ['/courses','/learn2file','/buildyourcase','/joininnercircle']) app.get(route,c=>{
    const file=path.resolve(distPath,'index.html'); if(!fs.existsSync(file)) return c.notFound();
    const title=route==='/learn2file'?"Learn2File: Your Filing Roadmap | The King's Take":"Civil-Rights Courses & Books | The King's Take";
    let html=fs.readFileSync(file,'utf-8').replace(/<title>[^<]*<\/title>/i,`<title>${escapeAttribute(title)}</title>`);
    html=replaceMeta(html,'property','og:title',title);
    html=replaceMeta(html,'property','og:description','Open the free guided JS 44 and IFP course, or explore upcoming courses and Ronald Lee King’s book.');
    html=replaceMeta(html,'property','og:url','https://thekingstake.com'+route);
    const courseImage='https://thekingstake.com/images/learn2file-share-20261015.jpg';
    for(const [kind,key,value] of [['property','og:image',courseImage],['property','og:image:secure_url',courseImage],['property','og:image:width','1200'],['property','og:image:height','628'],['property','og:image:type','image/jpeg'],['property','og:image:alt','Learn2File: nine free guided lessons and a final test from AASOTU Media Group LLC'],['name','twitter:card','summary_large_image'],['name','twitter:image',courseImage],['name','twitter:title',title],['name','twitter:description','Free JS 44, filing fee and IFP lessons, practice checkpoints and a final test.']])html=replaceMeta(html,kind as 'name'|'property',key,value);

    html=replaceMeta(html,'name','description','Free Section 1983 learning and upcoming courses from AASOTU Media Group LLC.');
    const canonical=`<link rel="canonical" href="https://thekingstake.com${route}" />`;
    html=/<link[^>]+rel="canonical"[^>]*>/i.test(html)?html.replace(/<link[^>]+rel="canonical"[^>]*>/i,canonical):html.replace('</head>',canonical+'</head>');
    c.header("Cache-Control","public, max-age=60");
    return c.html(html);
  });

  app.get("/learn/section-1983-introduction", c => {
    const indexPath = path.resolve(distPath, "index.html");
    if (!fs.existsSync(indexPath)) return c.json({ error: "Frontend build not found" }, 500);
    let html = fs.readFileSync(indexPath, "utf-8").replace(/<title>[^<]*<\/title>/i, "<title>Free Section 1983 Introduction | The King's Take</title>");
    for (const [kind, key, value] of [["property", "og:title", "Free Section 1983 Introduction | The King's Take"], ["property", "og:description", "Guided JS 44, filing-fee and IFP lessons with checkpoints and a final test. No payment or access code required."], ["property", "og:url", "https://thekingstake.com/learn/section-1983-introduction"], ["name", "description", "Free civil-rights education from AASOTU Media Group LLC / #TheKingsTake."]]) {
      const re = new RegExp(`<meta ${kind}="${key}"[^>]*>`, "i"); const tag = `<meta ${kind}="${key}" content="${escapeAttribute(value)}" />`;
      html = re.test(html) ? html.replace(re, tag) : html.replace("</head>", `${tag}</head>`);
    }
    html = html.replace(/<link[^>]+rel="canonical"[^>]*>/gi, "").replace("</head>", '<link rel="canonical" href="https://thekingstake.com/learn/section-1983-introduction" /></head>');
    return c.html(html);
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
      ["property", "og:image", "https://thekingstake.com/images/culture-city-mobile-v2.webp"],
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
