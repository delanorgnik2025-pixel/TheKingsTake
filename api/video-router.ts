import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { videos } from "../db/schema";
import { eq, desc } from "drizzle-orm";

export const videoRouter = createRouter({
  // Public: list all published videos
  list: publicQuery.query(async () => {
    return getDb()
      .select()
      .from(videos)
      .where(eq(videos.published, true))
      .orderBy(desc(videos.createdAt));
  }),

  // Public: get featured video
  featured: publicQuery.query(async () => {
    const results = await getDb()
      .select()
      .from(videos)
      .where(eq(videos.isFeatured, true))
      .limit(1);
    return results[0] ?? null;
  }),

  // Public: get single video by ID
  getById: publicQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const results = await getDb()
        .select()
        .from(videos)
        .where(eq(videos.id, input.id))
        .limit(1);
      return results[0] ?? null;
    }),

  // Admin: list all videos (including unpublished)
  adminList: adminQuery.query(async () => {
    return getDb()
      .select()
      .from(videos)
      .orderBy(desc(videos.createdAt));
  }),

  // Admin: create video
  create: adminQuery
    .input(
      z.object({
        title: z.string().min(1),
        description: z.string().optional(),
        youtubeId: z.string().optional(),
        thumbnail: z.string().optional(),
        duration: z.string().optional(),
        category: z.string().default("talk"),
        isLive: z.boolean().default(false),
        isFeatured: z.boolean().default(false),
        published: z.boolean().default(true),
      })
    )
    .mutation(async ({ input }) => {
      const result = await getDb().insert(videos).values(input);
      return { success: true, id: Number(result[0].insertId) };
    }),

  // Admin: update video
  update: adminQuery
    .input(
      z.object({
        id: z.number(),
        title: z.string().min(1).optional(),
        description: z.string().optional(),
        youtubeId: z.string().optional(),
        thumbnail: z.string().optional(),
        duration: z.string().optional(),
        category: z.string().optional(),
        isLive: z.boolean().optional(),
        isFeatured: z.boolean().optional(),
        published: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      await getDb().update(videos).set(data).where(eq(videos.id, id));
      return { success: true };
    }),

  // Admin: delete video
  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await getDb().delete(videos).where(eq(videos.id, input.id));
      return { success: true };
    }),
});
