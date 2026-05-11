import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { storySubmissions } from "@db/schema";
import { getDb } from "./queries/connection";
import { desc } from "drizzle-orm";

export const storyRouter = createRouter({
  // Submit a story
  submit: publicQuery
    .input(
      z.object({
        name: z.string().min(1, "Name is required").max(255),
        email: z.string().email("Valid email required").max(320),
        phone: z.string().max(50).optional(),
        title: z.string().min(1, "Title is required").max(255),
        description: z.string().min(1, "Description is required").max(5000),
        serviceType: z.string().min(1, "Please select a service type"),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.insert(storySubmissions).values({
        name: input.name,
        email: input.email,
        phone: input.phone || null,
        title: input.title,
        description: input.description,
        serviceType: input.serviceType,
      });
      return { success: true, message: "Story submitted! We will contact you within 48 hours." };
    }),

  // List submissions (admin only)
  list: publicQuery.query(async () => {
    const db = getDb();
    return db
      .select()
      .from(storySubmissions)
      .orderBy(desc(storySubmissions.createdAt))
      .limit(100);
  }),
});
