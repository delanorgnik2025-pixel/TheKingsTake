import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { legalForms } from "@db/schema";
import { eq, desc } from "drizzle-orm";

export const legalRouter = createRouter({
  // Public: list all active forms
  list: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(legalForms).where(eq(legalForms.isActive, true)).orderBy(desc(legalForms.createdAt));
  }),

  // Public: get single form by slug
  bySlug: publicQuery
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      const results = await db.select().from(legalForms).where(eq(legalForms.slug, input.slug)).limit(1);
      return results[0] ?? null;
    }),

  // Public: track download
  trackDownload: publicQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const form = await db.select().from(legalForms).where(eq(legalForms.id, input.id)).limit(1);
      if (form[0]) {
        await db.update(legalForms).set({
          downloadCount: (form[0].downloadCount ?? 0) + 1,
        }).where(eq(legalForms.id, input.id));
      }
      return { success: true };
    }),

  // Admin: create form
  create: adminQuery
    .input(z.object({
      title: z.string().min(1),
      slug: z.string().min(1),
      description: z.string().min(1),
      category: z.string().min(1),
      fileUrl: z.string().optional(),
      fileSize: z.string().optional(),
      content: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(legalForms).values({
        title: input.title,
        slug: input.slug,
        description: input.description,
        category: input.category,
        fileUrl: input.fileUrl ?? null,
        fileSize: input.fileSize ?? null,
        content: input.content ?? null,
      }).$returningId();
      return { id: result[0].id, success: true };
    }),

  // Admin: update form
  update: adminQuery
    .input(z.object({
      id: z.number(),
      title: z.string().min(1).optional(),
      description: z.string().min(1).optional(),
      category: z.string().min(1).optional(),
      fileUrl: z.string().optional(),
      fileSize: z.string().optional(),
      content: z.string().optional(),
      isActive: z.boolean().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const { id, ...data } = input;
      const updateData: Record<string, unknown> = {};
      if (data.title !== undefined) updateData.title = data.title;
      if (data.description !== undefined) updateData.description = data.description;
      if (data.category !== undefined) updateData.category = data.category;
      if (data.fileUrl !== undefined) updateData.fileUrl = data.fileUrl;
      if (data.fileSize !== undefined) updateData.fileSize = data.fileSize;
      if (data.content !== undefined) updateData.content = data.content;
      if (data.isActive !== undefined) updateData.isActive = data.isActive;

      await db.update(legalForms).set(updateData).where(eq(legalForms.id, id));
      return { success: true };
    }),

  // Admin: delete form
  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(legalForms).where(eq(legalForms.id, input.id));
      return { success: true };
    }),
});
