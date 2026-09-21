import "./env-shim";
import { Hono } from "hono";
import { bodyLimit } from "hono/body-limit";
import type { HttpBindings } from "@hono/node-server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "./router";
import { createContext } from "./context";
import { env } from "./lib/env";
import { createOAuthCallbackHandler } from "./kimi/auth";
import { Paths } from "@contracts/constants";
import { startDailyNewsAutomation } from "./newsletter-automation";
import { visitorFromRequest } from "./security/visitor-session";
import { verifyAdminToken } from "./security/auth";

const app = new Hono<{ Bindings: HttpBindings }>();

app.use(bodyLimit({ maxSize: 50 * 1024 * 1024 }));

// OAuth login — redirects to Kimi auth page
app.get("/api/auth/login", (c) => {
  const appId = env.appId;
  const host = c.req.header("host") || "thekingstake.com";
  const protocol = host.includes("localhost") ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;
  const redirectUri = `${baseUrl}${Paths.oauthCallback}`;
  const state = btoa(redirectUri);
  const authUrl = new URL(`${env.kimiAuthUrl}/api/oauth/authorize`);
  authUrl.searchParams.set("client_id", appId);
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("scope", "profile");
  authUrl.searchParams.set("state", state);
  return c.redirect(authUrl.toString(), 302);
});

app.get(Paths.oauthCallback, createOAuthCallbackHandler());
app.use("/api/trpc/*", async (c) => {
  const operations = decodeURIComponent(c.req.path.replace(/^\/api\/trpc\//, "")).split(",");
  const unauthenticated = new Set(["visitor.status", "visitor.enter", "engagement.unsubscribe", "ping"]);
  if (!operations.every(operation => unauthenticated.has(operation) || operation.startsWith("auth.") || operation.startsWith("stripe.webhook"))) {
    const adminToken = c.req.header("x-admin-token");
    const isAdmin = adminToken ? await verifyAdminToken(adminToken) : false;
    if (!isAdmin && !(await visitorFromRequest(c.req.raw))) {
      return c.json({ error: "Complete visitor entry to access the website." }, 401);
    }
  }
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: c.req.raw,
    router: appRouter,
    createContext,
  });
});
// Health check endpoint — safe, no secrets
app.get("/api/health", async (c) => {
  let dbStatus = "unknown";
  try {
    const { getDb } = await import("./queries/connection");
    await getDb().execute("SELECT 1");
    dbStatus = "connected";
  } catch {
    dbStatus = "disconnected";
  }
  return c.json({
    status: "ok",
    server: "hono",
    database: dbStatus,
    timestamp: new Date().toISOString(),
  });
});

app.all("/api/*", (c) => c.json({ error: "Not Found" }, 404));

export default app;

if (env.isProduction) {
  const { serve } = await import("@hono/node-server");
  const { serveStaticFiles } = await import("./lib/vite");
  serveStaticFiles(app);

  const port = parseInt(process.env.PORT || "3000");
  serve({ fetch: app.fetch, port }, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
  startDailyNewsAutomation();
}
