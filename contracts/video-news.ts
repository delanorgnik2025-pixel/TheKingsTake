import { z } from "zod";
export const emptyVideo = { enabled: false, provider: "youtube" as const, url: "", title: "", description: "", poster: "", aspectRatio: "16:9" as const, transcript: "", captions: "", duration: "", publicationDate: "" };
export function safeAsset(value: string) {
  if (value.startsWith("/" ) && !value.startsWith("//") && !value.includes("\\")) return value;
  try { const u = new URL(value); if (u.protocol === "https:" && !u.username && !u.password) return u.href; } catch { /* Invalid URL. */ }
  return null;
}
export function videoSource(provider: string, value: string) {
  try {
    const u = new URL(value, "https://thekingstake.com");
    if (u.protocol !== "https:" || u.username || u.password) return null;
    if (provider === "youtube") {
      if (!["youtube.com", "www.youtube.com", "youtu.be", "www.youtube-nocookie.com"].includes(u.hostname)) return null;
      const id = u.hostname === "youtu.be" ? u.pathname.slice(1) : u.pathname.startsWith("/embed/") ? u.pathname.slice(7) : u.searchParams.get("v");
      return id && /^[A-Za-z0-9_-]{11}$/.test(id) ? `https://www.youtube-nocookie.com/embed/${id}` : null;
    }
    if (provider === "vimeo") {
      if (!["vimeo.com", "www.vimeo.com", "player.vimeo.com"].includes(u.hostname)) return null;
      const id = u.pathname.match(/^\/(?:video\/)?(\d+)$/)?.[1];
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }
    if (provider === "direct" && ["thekingstake.com", "thekingstake-production.up.railway.app", "res.cloudinary.com"].includes(u.hostname) && /\.(mp4|webm)$/i.test(u.pathname)) return u.href;
  } catch { /* Never embed arbitrary HTML. */ }
  return null;
}
export const videoNewsSchema = z.object({
  enabled: z.boolean(), provider: z.enum(["youtube", "vimeo", "direct"]), url: z.string().max(2048),
  title: z.string().max(255), description: z.string().max(5000), poster: z.string().max(2048),
  aspectRatio: z.enum(["9:16", "16:9"]), transcript: z.string().max(50000), captions: z.string().max(2048),
  duration: z.string().regex(/^$|^PT(?=\d)(?:\d+H)?(?:\d+M)?(?:\d+S)$/), publicationDate: z.string().refine(v => !v || !Number.isNaN(Date.parse(v)), "Invalid publication date"),
}).superRefine((v, ctx) => {
  if (v.enabled && (!videoSource(v.provider, v.url) || !v.title.trim() || !v.publicationDate)) ctx.addIssue({ code: "custom", message: "Enabled video needs an approved URL, title and publication date" });
  for (const key of ["poster", "captions"] as const) if (v[key] && !safeAsset(v[key])) ctx.addIssue({ code: "custom", path: [key], message: "Use an HTTPS or local asset URL" });
});
export type VideoNews = z.infer<typeof videoNewsSchema>;
export const storyUpdateSchema = z.object({ date: z.string().refine(v => !Number.isNaN(Date.parse(v))), text: z.string().min(1).max(5000) });
export function parseVideo(value?: string | null): VideoNews | null {
  try { const result = videoNewsSchema.safeParse(JSON.parse(value || "null")); return result.success && result.data.enabled ? result.data : null; } catch { return null; }
}
export function parseUpdates(value?: string | null) {
  try { return z.array(storyUpdateSchema).parse(JSON.parse(value || "[]")); } catch { return []; }
}
