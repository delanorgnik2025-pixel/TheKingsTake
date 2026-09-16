import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { feedPosts, members } from "@db/schema";
import { eq, desc, sql } from "drizzle-orm";
import { createDirectUpload, getUpload, getAsset, muxConfigured } from "./mux";
import { createHash } from "node:crypto";

export const feedRouter = createRouter({
  // Public: retrieve one post for permanent share links.
  getById: publicQuery
    .input(z.object({ id: z.number().int().positive() }))
    .query(async ({ input }) => {
      const db = getDb();
      const rows = await db
        .select({
          id: feedPosts.id, memberId: feedPosts.memberId, body: feedPosts.body,
          linkUrl: feedPosts.linkUrl, linkTitle: feedPosts.linkTitle, imageUrl: feedPosts.imageUrl,
          videoUrl: feedPosts.videoUrl, videoType: feedPosts.videoType, muxPlaybackId: feedPosts.muxPlaybackId,
          pinned: feedPosts.pinned, likesCount: feedPosts.likesCount, createdAt: feedPosts.createdAt,
          updatedAt: feedPosts.updatedAt, memberName: members.name, memberAvatar: members.avatar,
        })
        .from(feedPosts)
        .leftJoin(members, eq(members.id, feedPosts.memberId))
        .where(eq(feedPosts.id, input.id))
        .limit(1);
      return { post: rows[0] ?? null, muxConfigured: muxConfigured() };
    }),

  // Public: list feed posts — pinned first, then newest. Simple cursor paging.
  list: publicQuery
    .input(
      z.object({
        limit: z.number().min(1).max(50).default(20),
        offset: z.number().min(0).default(0),
      }).optional()
    )
    .query(async ({ input }) => {
      const db = getDb();
      const limit = input?.limit ?? 20;
      const offset = input?.offset ?? 0;
      const rows = await db
        .select({
          id: feedPosts.id, memberId: feedPosts.memberId, body: feedPosts.body,
          linkUrl: feedPosts.linkUrl, linkTitle: feedPosts.linkTitle, imageUrl: feedPosts.imageUrl,
          videoUrl: feedPosts.videoUrl, videoType: feedPosts.videoType, muxPlaybackId: feedPosts.muxPlaybackId,
          pinned: feedPosts.pinned, likesCount: feedPosts.likesCount, createdAt: feedPosts.createdAt,
          updatedAt: feedPosts.updatedAt, memberName: members.name, memberAvatar: members.avatar,
        })
        .from(feedPosts)
        .leftJoin(members, eq(members.id, feedPosts.memberId))
        .orderBy(desc(feedPosts.pinned), desc(feedPosts.createdAt))
        .limit(limit)
        .offset(offset);
      return { posts: rows, muxConfigured: muxConfigured() };
    }),

  // Public: like a post
  like: publicQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db
        .update(feedPosts)
        .set({ likesCount: sql`${feedPosts.likesCount} + 1` })
        .where(eq(feedPosts.id, input.id));
      return { success: true };
    }),

  // Admin: create a post (text / link / image / embed video / mux video)
  create: adminQuery
    .input(
      z.object({
        body: z.string().max(10000),
        linkUrl: z.string().url().optional().or(z.literal("")),
        linkTitle: z.string().max(500).optional(),
        imageUrl: z.string().url().optional().or(z.literal("")),
        videoUrl: z.string().url().optional().or(z.literal("")),
        videoType: z.enum(["upload", "embed", "mux"]).default("upload"),
        muxPlaybackId: z.string().optional(),
      }).refine((value) => value.body.trim() || value.linkUrl || value.imageUrl || value.videoUrl || value.muxPlaybackId, { message: "Add text or media." })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(feedPosts).values({
        body: input.body.trim(),
        linkUrl: input.linkUrl || null,
        linkTitle: input.linkTitle || null,
        imageUrl: input.imageUrl || null,
        videoUrl: input.videoUrl || null,
        videoType: input.videoType,
        muxPlaybackId: input.muxPlaybackId || null,
      });
      return { success: true, id: Number(result[0].insertId) };
    }),

  createImageUploadSignature: adminQuery.mutation(() => {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    if (!cloudName || !apiKey || !apiSecret) {
      throw new Error("Image uploads are not configured.");
    }
    const timestamp = Math.floor(Date.now() / 1000);
    const folder = "thekingstake/feed";
    const signature = createHash("sha1").update(`folder=${folder}&timestamp=${timestamp}${apiSecret}`).digest("hex");
    return { cloudName, apiKey, timestamp, folder, signature };
  }),

  // Admin: delete a post
  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(feedPosts).where(eq(feedPosts.id, input.id));
      return { success: true };
    }),

  // Admin: pin/unpin
  togglePin: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const rows = await db.select().from(feedPosts).where(eq(feedPosts.id, input.id)).limit(1);
      if (!rows[0]) throw new Error("Post not found");
      await db.update(feedPosts).set({ pinned: !rows[0].pinned }).where(eq(feedPosts.id, input.id));
      return { success: true, pinned: !rows[0].pinned };
    }),

  // Admin: ask Mux for a direct-upload URL. The browser PUTs the video file
  // straight to Mux with this URL, then calls confirmVideoUpload.
  createVideoUpload: adminQuery
    .input(z.object({ corsOrigin: z.string().default("*") }).optional())
    .mutation(async ({ input }) => {
      const upload = await createDirectUpload(input?.corsOrigin || "*");
      return { uploadId: upload.id, uploadUrl: upload.url };
    }),

  // Admin: after the browser finished PUT-ing the file, create the feed post
  // once Mux has produced an asset with a playback id.
  confirmVideoUpload: adminQuery
    .input(
      z.object({
        uploadId: z.string(),
        body: z.string().max(10000),
      })
    )
    .mutation(async ({ input }) => {
      const upload = await getUpload(input.uploadId);
      if (!upload.asset_id) {
        return { ready: false as const, message: "Mux is still processing the upload. Try again in a few seconds." };
      }
      const asset = await getAsset(upload.asset_id);
      const playbackId = asset.playback_ids?.[0]?.id;
      if (!playbackId) {
        return { ready: false as const, message: "Video asset exists but has no playback id yet. Try again shortly." };
      }
      const db = getDb();
      await db.insert(feedPosts).values({
        body: input.body,
        videoType: "mux",
        muxPlaybackId: playbackId,
        videoUrl: `https://stream.mux.com/${playbackId}.m3u8`,
      });
      return { ready: true as const, playbackId };
    }),
});
