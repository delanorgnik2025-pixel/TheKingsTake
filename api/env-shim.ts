// Runs before any other import in boot.ts (keep it first).
// The site authenticates admins via password login (x-admin-token), not Kimi
// OAuth, so the OAuth portal variables are not required to serve the site.
// Pre-populate harmless placeholders so api/lib/env.ts doesn't crash the
// server in production when they are absent. DATABASE_URL stays genuinely
// required. To enable Kimi OAuth later, set the real values in Railway.
for (const name of ["APP_ID", "APP_SECRET", "KIMI_AUTH_URL", "KIMI_OPEN_URL"] as const) {
  if (!process.env[name]) process.env[name] = `unused-${name.toLowerCase()}`;
}
export {};
