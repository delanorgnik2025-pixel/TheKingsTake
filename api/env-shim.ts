// Runs before any other import in boot.ts (keep it first).
// OAuth portal variables are optional while password-based admin auth is used.
// APP_SECRET is deliberately excluded: it signs member/admin tokens and must
// be a real production secret rather than a generated or hardcoded fallback.
for (const name of ["APP_ID", "KIMI_AUTH_URL", "KIMI_OPEN_URL"] as const) {
  if (!process.env[name]) process.env[name] = `unused-${name.toLowerCase()}`;
}
export {};
