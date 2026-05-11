import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { petitionSigners } from "@db/schema";
import { getDb } from "./queries/connection";
import { desc } from "drizzle-orm";

export const petitionRouter = createRouter({
  // Sign the petition
  sign: publicQuery
    .input(
      z.object({
        name: z.string().min(1, "Name is required").max(255),
        email: z.string().email("Valid email required").max(320),
        city: z.string().max(100).optional(),
        state: z.string().max(50).optional(),
        message: z.string().max(2000).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.insert(petitionSigners).values({
        name: input.name,
        email: input.email,
        city: input.city || null,
        state: input.state || null,
        message: input.message || null,
      });
      return { success: true, message: "Thank you for signing the petition!" };
    }),

  // List all signers (for the ticker)
  list: publicQuery.query(async () => {
    const db = getDb();
    const signers = await db
      .select()
      .from(petitionSigners)
      .orderBy(desc(petitionSigners.createdAt))
      .limit(1000);
    return signers;
  }),

  // Get total count
  count: publicQuery.query(async () => {
    const db = getDb();
    const signers = await db.select().from(petitionSigners);
    return signers.length;
  }),
});
