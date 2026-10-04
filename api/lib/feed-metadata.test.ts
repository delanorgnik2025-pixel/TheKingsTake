import { describe, expect, it } from "vitest";
import { feedMetadataHtml } from "./feed-metadata";

const template = '<head><title>Generic</title><meta property="og:image" content="generic.jpg" /><meta property="og:image:height" content="630" /><link rel="canonical" href="https://thekingstake.com/" /></head><body><script src="/assets/app.js"></script></body>';

describe("community feed social preview", () => {
  it("replaces the generic image and dimensions while preserving the application", () => {
    const html = feedMetadataHtml(template, "https://thekingstake.com/feed/post/23/ronald-lee-king", "Ronald Lee King");
    expect(html).toContain('content="https://thekingstake.com/images/feed-community-share-v1.jpg"');
    expect(html).toContain('property="og:image:height" content="628"');
    expect(html).not.toContain("generic.jpg");
    expect(html).toContain('name="twitter:card" content="summary_large_image"');
    expect(html).toContain('<script src="/assets/app.js"></script>');
    expect(html.match(/property="og:image"/g)).toHaveLength(1);
  });

  it("keeps the destination post and strips tracking without adopting an untrusted host", () => {
    const html = feedMetadataHtml(template, "http://internal-host/feed/post/23/author?tracking=1#comment");
    expect(html).toContain('rel="canonical" href="https://thekingstake.com/feed/post/23/author"');
    expect(html).not.toContain("internal-host");
    expect(html).not.toContain("tracking=1");
  });

  it("escapes author names and produces a community invitation", () => {
    const html = feedMetadataHtml(template, "https://thekingstake.com/feed", '<img src=x onerror="alert(1)">');
    expect(html).not.toContain('<img src=x');
    expect(html).toContain("&lt;img");
    expect(html).toContain("member access");
  });
});
