import { parseVideo, videoSource, safeAsset } from "@contracts/video-news";
const SITE = "https://thekingstake.com";
export function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
export function articleMetadataHtml(template: string, post: { title: string; slug: string; excerpt: string | null; content: string; coverImage: string | null; category?: string | null; videoNews?: string | null; createdAt: Date; updatedAt: Date }) {
  const title = `${post.title} | The King's Take`;
  const description = (post.excerpt || post.content.replace(/[#*_`]/g, "")).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim().slice(0, 220);
  const canonical = `${SITE}/blog/${encodeURIComponent(post.slug)}`;
  const organizationByline = /AASOTU Media Group LLC \| #TheKingsTake/i.test(post.content);
  const authorName = organizationByline ? "AASOTU Media Group LLC" : "Ronald Lee King";
  let image = `${SITE}/images/og-image.jpg`;
  try { const url = new URL(post.coverImage || image, SITE); if (["https:", "http:"].includes(url.protocol)) image = url.toString(); } catch { /* Keep the branded fallback. */ }
  let html = template.replace(/<title>[^<]*<\/title>/i, () => `<title>${escapeHtml(title)}</title>`);
  const meta = (kind: "property" | "name", key: string, value: string) => {
    const tag = `<meta ${kind}="${key}" content="${escapeHtml(value)}" />`;
    const pattern = new RegExp(`<meta\\s+${kind}="${key}"\\s+content="[^"]*"\\s*\\/?\\s*>`, "i");
    html = pattern.test(html) ? html.replace(pattern, () => tag) : html.replace("</head>", () => `${tag}\n</head>`);
  };
  meta("name", "description", description);
  for (const [key, value] of Object.entries({ "og:title": title, "og:description": description, "og:type": "article", "og:url": canonical, "og:image": image, "og:image:alt": post.title, "article:published_time": post.createdAt.toISOString(), "article:modified_time": post.updatedAt.toISOString(), "article:author": authorName })) meta("property", key, value);
  for (const [key, value] of Object.entries({ "twitter:card": "summary_large_image", "twitter:title": title, "twitter:description": description, "twitter:image": image, "twitter:image:alt": post.title })) meta("name", key, value);
  // Existing images do not necessarily have the site's generic 1200x630 dimensions.
  html = html.replace(/<meta\s+property="og:image:(width|height)"[^>]*>/gi, "");
  html = html.replace(/<link[^>]+rel="canonical"[^>]*>/gi, "").replace("</head>", `<link rel="canonical" href="${escapeHtml(canonical)}" />\n</head>`);
  const video = parseVideo(post.videoNews);
  const structured = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    ...(video ? { video: { "@type": "VideoObject", name: video.title, description: video.description || description, thumbnailUrl: video.poster ? new URL(safeAsset(video.poster)!, SITE).href : image, uploadDate: video.publicationDate, ...(video.duration ? { duration: video.duration } : {}), ...(video.transcript ? { transcript: video.transcript } : {}), ...(video.provider === "direct" ? { contentUrl: videoSource(video.provider, video.url) } : { embedUrl: videoSource(video.provider, video.url) }) } } : {}),
    headline: post.title,
    description,
    image: [image],
    datePublished: post.createdAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    articleSection: post.category || "News",
    mainEntityOfPage: canonical,
    author: organizationByline
      ? { "@type": "Organization", name: "AASOTU Media Group LLC", url: SITE }
      : { "@type": "Person", name: "Ronald Lee King", url: `${SITE}/about-author` },
    publisher: { "@type": "Organization", name: "AASOTU Media Group LLC", url: SITE },
  };
  html = html.replace("</head>", `<script type="application/ld+json">${JSON.stringify(structured).replace(/</g, "\\u003c")}</script>\n</head>`);
  return html;
}
