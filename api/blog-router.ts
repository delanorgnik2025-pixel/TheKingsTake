import { videoNewsSchema, storyUpdateSchema } from "@contracts/video-news";
import { z } from "zod";
import { createRouter, publicQuery, authedQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { posts, users } from "@db/schema";
import { and, eq, desc, sql } from "drizzle-orm";

export const blogRouter = createRouter({
  adminList: adminQuery.query(() => getDb().select().from(posts).orderBy(desc(posts.createdAt))),
  videoList: publicQuery.query(() => getDb().select().from(posts).where(and(eq(posts.published, true), sql`JSON_VALID(${posts.videoNews}) AND JSON_EXTRACT(${posts.videoNews}, '$.enabled') = true`)).orderBy(desc(posts.createdAt)).limit(200)),
  // Public: list published posts
  list: publicQuery
    .input(z.object({
      category: z.string().optional(),
      beat: z.string().optional(),
      limit: z.number().min(1).max(200).default(10),
    }).optional())
    .query(async ({ input }) => {
      const db = getDb();
      const limit = input?.limit ?? 10;
      if (input?.category || input?.beat) {
        return db.select().from(posts)
          .where(and(eq(posts.published, true), input.category ? eq(posts.category, input.category) : undefined, input.beat ? eq(posts.newsBeat, input.beat) : undefined))
          .orderBy(desc(posts.createdAt))
          .limit(limit);
      }
      return db.select().from(posts)
        .where(eq(posts.published, true))
        .orderBy(desc(posts.createdAt))
        .limit(limit);
    }),

  // Public: get single post by slug
  bySlug: publicQuery
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      const results = await db.select().from(posts)
        .where(and(eq(posts.slug, input.slug), eq(posts.published, true)))
        .limit(1);
      return results[0] ?? null;
    }),

  // Setup: promote current user to admin (one-time use)
  makeMeAdmin: authedQuery
    .mutation(async ({ ctx }) => {
      const db = getDb();
      const user = (ctx as any).user;
      if (!user) {
        throw new Error("You must be logged in. Sign in with Kimi first.");
      }
      await db.update(users).set({ role: "admin" }).where(eq(users.id, user.id));
      return { success: true, message: "You are now an admin! Refresh the page to access the admin panel." };
    }),

  newsroomDrafts: adminQuery.input(z.object({ edition: z.string().max(32) })).query(({ input }) =>
    getDb().select().from(posts).where(eq(posts.newsEdition, input.edition)).orderBy(posts.newsBeat)
  ),

  // Admin: create post
  create: adminQuery
    .input(z.object({
      title: z.string().min(3),
      slug: z.string().min(1),
      content: z.string().min(1),
      excerpt: z.string().optional(),
      category: z.string().min(1),
      coverImage: z.string().optional(),
      videoNews: videoNewsSchema.nullable().optional(),
      newsBeat: z.string().max(32).optional(),
      featured: z.boolean().default(false),
      published: z.boolean().default(true),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(posts).values({
        videoNews: input.videoNews ? JSON.stringify(input.videoNews) : null,
        newsBeat: input.newsBeat || null,
        title: input.title,
        slug: input.slug,
        content: input.content,
        excerpt: input.excerpt ?? null,
        category: input.category,
        coverImage: input.coverImage || "",
        featured: input.featured,
        published: input.published,
      }).$returningId();
      return { id: result[0].id, success: true };
    }),

  // Admin: update post
  update: adminQuery
    .input(z.object({
      id: z.number(),
      title: z.string().min(3).optional(),
      slug: z.string().min(1).optional(),
      content: z.string().min(1).optional(),
      excerpt: z.string().optional(),
      category: z.string().min(1).optional(),
      coverImage: z.string().optional(),
      videoNews: videoNewsSchema.nullable().optional(),
      newsBeat: z.string().max(32).optional(),
      featured: z.boolean().optional(),
      published: z.boolean().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const { id, ...data } = input;
      const updateData: Record<string, unknown> = {};
      if (data.videoNews !== undefined) updateData.videoNews = data.videoNews ? JSON.stringify(data.videoNews) : null;
      if (data.newsBeat !== undefined) updateData.newsBeat = data.newsBeat;
      if (data.title !== undefined) updateData.title = data.title;
      if (data.slug !== undefined) updateData.slug = data.slug;
      if (data.content !== undefined) updateData.content = data.content;
      if (data.excerpt !== undefined) updateData.excerpt = data.excerpt;
      if (data.category !== undefined) updateData.category = data.category;
      if (data.coverImage !== undefined) updateData.coverImage = data.coverImage;
      if (data.featured !== undefined) updateData.featured = data.featured;
      if (data.published !== undefined) updateData.published = data.published;

      await db.update(posts).set(updateData).where(eq(posts.id, id));
      return { success: true };
    }),

  appendUpdate: adminQuery.input(z.object({ id: z.number(), update: storyUpdateSchema })).mutation(async ({ input }) => {
    const db = getDb();
    await db.update(posts).set({ storyUpdates: sql`JSON_ARRAY_APPEND(COALESCE(${posts.storyUpdates}, JSON_ARRAY()), '$', CAST(${JSON.stringify(input.update)} AS JSON))` }).where(eq(posts.id, input.id));
    return { success: true };
  }),

  // Admin: delete post
  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(posts).where(eq(posts.id, input.id));
      return { success: true };
    }),
});
