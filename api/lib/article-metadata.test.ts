import { describe, expect, it } from "vitest";
import { articleMetadataHtml } from "./article-metadata";
describe("article link previews", () => {
  const post = { title: 'Evidence <verified> & "context"', slug: "a-report", excerpt: "Clear summary", content: "Text", coverImage: "/images/report.webp", createdAt: new Date("2026-09-29T12:00:00Z"), updatedAt: new Date("2026-09-29T12:00:00Z") };
  const template = '<head><title>Generic</title><meta property="og:image" content="generic.jpg" /><meta property="og:image:width" content="1200" /></head>';
  it("renders the article image and canonical in raw HTML for crawlers", () => {
    const html = articleMetadataHtml(template, post);
    expect(html).toContain('content="https://thekingstake.com/images/report.webp"');
    expect(html).toContain('href="https://thekingstake.com/blog/a-report"');
    expect(html).toContain('content="article"');
    expect(html).not.toContain('og:image:width');
    expect(html).toContain('&lt;verified&gt; &amp; &quot;context&quot;');
  });
  it("rejects executable image URL schemes", () => {
    expect(articleMetadataHtml(template, { ...post, coverImage: "javascript:alert(1)" })).toContain('content="https://thekingstake.com/images/og-image.jpg"');
  });
});
