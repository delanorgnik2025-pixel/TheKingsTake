const siteOrigin = "https://thekingstake.com";

function escapeAttribute(value: string) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Invite readers into the community without copying a member's post into metadata. */
export function feedMetadataHtml(template: string, requestUrl: string, author?: string) {
  const title = author ? `Join ${author} on The King's Take community feed` : "Your voice. Your community. | The King's Take";
  const description = "News, research and independent conversations. Visit the feed to read, join the community and participate with member access.";
  const canonical = new URL(new URL(requestUrl).pathname, siteOrigin).toString();
  const image = `${siteOrigin}/images/feed-community-share-v1.jpg`;
  let html = template.replace(/<title>[^<]*<\/title>/i, `<title>${escapeAttribute(title)}</title>`);
  const meta = (attribute: "name" | "property", key: string, value: string) => {
    const tag = `<meta ${attribute}="${key}" content="${escapeAttribute(value)}" />`;
    const pattern = new RegExp(`<meta\\s+${attribute}="${key}"\\s+content="[^"]*"\\s*\\/?\\s*>`, "gi");
    html = html.replace(pattern, "").replace("</head>", `${tag}\n</head>`);
  };
  meta("name", "description", description);
  for (const [key, value] of Object.entries({
    "og:title": title, "og:description": description, "og:type": "website",
    "og:url": canonical, "og:image": image, "og:image:secure_url": image,
    "og:image:width": "1200", "og:image:height": "628", "og:image:type": "image/jpeg",
    "og:image:alt": "The King's Take: Your voice. Your community. Join the feed.",
  })) meta("property", key, value);
  for (const [key, value] of Object.entries({ "twitter:card": "summary_large_image", "twitter:title": title, "twitter:description": description, "twitter:image": image })) meta("name", key, value);
  html = html.replace(/<link[^>]+rel="canonical"[^>]*>/gi, "").replace("</head>", `<link rel="canonical" href="${escapeAttribute(canonical)}" />\n</head>`);
  return html;
}
