import type { Hono } from "hono";
import type { HttpBindings } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import fs from "fs";
import path from "path";

type App = Hono<{ Bindings: HttpBindings }>;

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
