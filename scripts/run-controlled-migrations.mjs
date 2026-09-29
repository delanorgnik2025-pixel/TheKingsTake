import { readFile } from "node:fs/promises";
import mysql from "mysql2/promise";

const migrations = [
  ["20260914_member_community_stabilization", "db/manual/20260914_member_community_stabilization.sql"],
  ["20260915_exclusive_member_access", "db/manual/20260915_exclusive_member_access.sql"],
  ["20260916_audience_engagement", "db/manual/20260916_audience_engagement.sql"],
  ["20260918_archive_communications", "db/manual/20260918_archive_communications.sql"],
  ["20260918_daily_news_automation", "db/manual/20260918_daily_news_automation.sql"],
  ["20260921_visitor_gate_chat", "db/manual/20260921_visitor_gate_chat.sql"],
  ["20260921_research_preview", "db/manual/20260921_research_preview.sql"],
  ["20260923_timed_dispatch_delivery", "db/manual/20260923_timed_dispatch_delivery.sql"],
  ["20260927_dispatch_article_compatibility", "db/manual/20260927_dispatch_article_compatibility.sql"],
  ["20260927_nolan_wells_investigation", "db/manual/20260927_nolan_wells_investigation.sql"],
  ["20260928_nolan_wells_source_update", "db/manual/20260928_nolan_wells_source_update.sql"],
  ["20260928_nolan_wells_visual_archive", "db/manual/20260928_nolan_wells_visual_archive.sql"],
  ["20260929_newsroom_beats", "db/manual/20260929_newsroom_beats.sql"],
  ["20260929_newsroom_opening_briefs", "db/manual/20260929_newsroom_opening_briefs.sql"],
];

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("DATABASE_URL is required for controlled migrations.");

const connection = await mysql.createConnection({ uri: databaseUrl, multipleStatements: true });

try {
  await connection.query(`
    CREATE TABLE IF NOT EXISTS controlled_migrations (
      name varchar(191) PRIMARY KEY,
      applied_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  for (const [name, path] of migrations) {
    const [rows] = await connection.execute("SELECT name FROM controlled_migrations WHERE name = ? LIMIT 1", [name]);
    if (Array.isArray(rows) && rows.length > 0) {
      console.log(`[migration] already applied: ${name}`);
      continue;
    }

    console.log(`[migration] applying: ${name}`);
    const sql = await readFile(new URL(`../${path}`, import.meta.url), "utf8");
    await connection.query(sql);
    await connection.execute("INSERT INTO controlled_migrations (name) VALUES (?)", [name]);
    console.log(`[migration] completed: ${name}`);
  }

  // Exercise the exact database contract used during Dispatch approval. The
  // synthetic row is rolled back, and deployment stops if production cannot
  // accept it, preventing another opaque failure in the admin interface.
  await connection.beginTransaction();
  const verificationSlug = `dispatch-deployment-verification-${Date.now()}`;
  try {
    await connection.execute(
      `INSERT INTO posts
        (title, slug, excerpt, content, category, coverImage, published, featured)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        "Dispatch deployment verification",
        verificationSlug,
        "Synthetic deployment check",
        "This temporary row verifies the Dispatch publication schema.",
        "SYSTEM CHECK",
        null,
        false,
        false,
      ],
    );
    await connection.rollback();
    await connection.execute("DELETE FROM posts WHERE slug = ?", [verificationSlug]);
    console.log("[migration] verified: Dispatch article insert contract");
  } catch (error) {
    await connection.rollback();
    await connection.execute("DELETE FROM posts WHERE slug = ?", [verificationSlug]);
    const code = error && typeof error === "object" && "code" in error ? String(error.code) : "unknown";
    throw new Error(`Dispatch article insert contract failed (${code}).`);
  }
} finally {
  await connection.end();
}
