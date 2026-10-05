import { z } from "zod";
import { sql } from "drizzle-orm";
import { adminQuery, createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
export const designRouter = createRouter({
  landing: publicQuery.query(async () => {
    const [rows] = await getDb().execute(sql`SELECT value FROM site_design_settings WHERE name = 'landing' LIMIT 1`);
    return { template: (rows as unknown as {value:string}[])[0]?.value === 'classic' ? 'classic' as const : 'noir' as const };
  }),
  setLanding: adminQuery.input(z.object({ template: z.enum(['classic', 'noir']) })).mutation(async ({input}) => {
    await getDb().execute(sql`INSERT INTO site_design_settings (name, value) VALUES ('landing', ${input.template}) ON DUPLICATE KEY UPDATE value = ${input.template}`);
    return { template: input.template };
  }),
});
