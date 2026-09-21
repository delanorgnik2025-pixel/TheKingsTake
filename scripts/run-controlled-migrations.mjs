import { readFile } from "node:fs/promises";
import mysql from "mysql2/promise";

const migrations = [
  ["20260914_member_community_stabilization", "db/manual/20260914_member_community_stabilization.sql"],
  ["20260915_exclusive_member_access", "db/manual/20260915_exclusive_member_access.sql"],
  ["20260916_audience_engagement", "db/manual/20260916_audience_engagement.sql"],
  ["20260918_archive_communications", "db/manual/20260918_archive_communications.sql"],
  ["20260918_daily_news_automation", "db/manual/20260918_daily_news_automation.sql"],
  ["20260921_visitor_gate_chat", "db/manual/20260921_visitor_gate_chat.sql"],
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
} finally {
  await connection.end();
}
