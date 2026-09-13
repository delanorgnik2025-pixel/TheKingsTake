import { z } from "zod";
import { eq, and, desc, sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { SignJWT, jwtVerify } from "jose";
import { createHash, randomBytes } from "crypto";
import { createRouter, publicQuery } from "./middleware";
import { db } from "../db";
import { members, feedComments, feedLikes, feedPosts } from "../db/schema";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || process.env.ADMIN_PASSWORD || "thekingstake-member-secret"
);

function hashPassword(password: string, salt?: string) {
  const s = salt || randomBytes(16).toString("hex");
  const hash = createHash("sha256").update(password + s).digest("hex");
  return { hash, salt: s };
}

function verifyPassword(password: string, salt: string, hash: string) {
  const { hash: computed } = hashPassword(password, salt);
  return computed === hash;
}

async function createMemberToken(memberId: number, email: string) {
  return new SignJWT({ memberId, email, type: "member" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("30d")
    .sign(JWT_SECRET);
}

export async function verifyMemberToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, { clockTolerance: 60 });
    if (payload.type !== "member") return null;
    return {
      memberId: payload.memberId as number,
      email: payload.email as string,
    };
  } catch {
    return null;
  }
}

// ── Helper: get member from request ─────────────────────────────
async function getMemberFromRequest(req: Request) {
  const token = req.headers.get("x-member-token");
  if (!token) return null;
  const payload = await verifyMemberToken(token);
  if (!payload) return null;
  const rows = await db.select().from(members).where(eq(members.id, payload.memberId)).limit(1);
  if (rows.length === 0 || !rows[0].isActive) return null;
  return rows[0];
}

export const memberRouter = createRouter({
  // ── Register ─────────────────────────────────────────────────
  register: publicQuery
    .input(
      z.object({
        name: z.string().min(2).max(100),
        email: z.string().email().max(320),
        password: z.string().min(6).max(100),
      })
    )
    .mutation(async ({ input }) => {
      const existing = await db
        .select()
        .from(members)
        .where(eq(members.email, input.email))
        .limit(1);

      if (existing.length > 0) {
        throw new TRPCError({ code: "CONFLICT", message: "Email already registered." });
      }

      const { hash, salt } = hashPassword(input.password);
      const passwordHash = `${salt}:${hash}`;

      const result = await db.insert(members).values({
        name: input.name,
        email: input.email,
        passwordHash,
      });

      const memberId = Number(result[0].insertId);
      const token = await createMemberToken(memberId, input.email);

      return {
        token,
        member: {
          id: memberId,
          name: input.name,
          email: input.email,
        },
      };
    }),

  // ── Login ────────────────────────────────────────────────────
  login: publicQuery
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      const rows = await db
        .select()
        .from(members)
        .where(eq(members.email, input.email))
        .limit(1);

      if (rows.length === 0) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid email or password." });
      }

      const member = rows[0];
      const [salt, hash] = member.passwordHash.split(":");

      if (!verifyPassword(input.password, salt, hash)) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid email or password." });
      }

      const token = await createMemberToken(member.id, member.email);

      return {
        token,
        member: {
          id: member.id,
          name: member.name,
          email: member.email,
          avatar: member.avatar,
          role: member.role,
        },
      };
    }),

  // ── Me ───────────────────────────────────────────────────────
  me: publicQuery.query(async ({ ctx }) => {
    const member = await getMemberFromRequest(ctx.req);
    if (!member) return null;
    return {
      id: member.id,
      name: member.name,
      email: member.email,
      avatar: member.avatar,
      role: member.role,
      facebookSubscribed: member.facebookSubscribed,
    };
  }),

  // ── Update Profile ───────────────────────────────────────────
  updateProfile: publicQuery
    .input(
      z.object({
        name: z.string().min(2).max(100).optional(),
        avatar: z.string().url().optional().nullable(),
        facebookSubscribed: z.boolean().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const member = await getMemberFromRequest(ctx.req);
      if (!member) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Not logged in." });
      }

      await db
        .update(members)
        .set({
          ...(input.name && { name: input.name }),
          ...(input.avatar !== undefined && { avatar: input.avatar }),
          ...(input.facebookSubscribed !== undefined && { facebookSubscribed: input.facebookSubscribed }),
          updatedAt: new Date(),
        })
        .where(eq(members.id, member.id));

      return { success: true };
    }),

  // ── Feed: Post as Member ─────────────────────────────────────
  createFeedPost: publicQuery
    .input(
      z.object({
        body: z.string().min(1).max(2000),
        imageUrl: z.string().url().optional().or(z.literal("")),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const member = await getMemberFromRequest(ctx.req);
      if (!member) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Members only. Please log in." });
      }

      const result = await db.insert(feedPosts).values({
        body: input.body,
        imageUrl: input.imageUrl || null,
      });

      return { success: true, id: Number(result[0].insertId) };
    }),

  // ── Feed: Comment ────────────────────────────────────────────
  createComment: publicQuery
    .input(
      z.object({
        postId: z.number(),
        content: z.string().min(1).max(1000),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const member = await getMemberFromRequest(ctx.req);
      if (!member) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Members only. Please log in." });
      }

      await db.insert(feedComments).values({
        postId: input.postId,
        memberId: member.id,
        content: input.content,
      });

      return { success: true };
    }),

  // ── Feed: List Comments ──────────────────────────────────────
  listComments: publicQuery
    .input(z.object({ postId: z.number() }))
    .query(async ({ input }) => {
      const rows = await db
        .select({
          id: feedComments.id,
          postId: feedComments.postId,
          memberId: feedComments.memberId,
          content: feedComments.content,
          createdAt: feedComments.createdAt,
          memberName: members.name,
          memberAvatar: members.avatar,
        })
        .from(feedComments)
        .leftJoin(members, eq(members.id, feedComments.memberId))
        .where(eq(feedComments.postId, input.postId))
        .orderBy(desc(feedComments.createdAt));

      return rows;
    }),

  // ── Feed: Like ───────────────────────────────────────────────
  likePost: publicQuery
    .input(z.object({ postId: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const member = await getMemberFromRequest(ctx.req);
      if (!member) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Members only. Please log in." });
      }

      const existing = await db
        .select()
        .from(feedLikes)
        .where(and(eq(feedLikes.postId, input.postId), eq(feedLikes.memberId, member.id)))
        .limit(1);

      if (existing.length > 0) {
        // Unlike
        await db
          .delete(feedLikes)
          .where(and(eq(feedLikes.postId, input.postId), eq(feedLikes.memberId, member.id)));
        await db
          .update(feedPosts)
          .set({ likesCount: sql`${feedPosts.likesCount} - 1` })
          .where(eq(feedPosts.id, input.postId));
        return { liked: false };
      } else {
        // Like
        await db.insert(feedLikes).values({
          postId: input.postId,
          memberId: member.id,
        });
        await db
          .update(feedPosts)
          .set({ likesCount: sql`${feedPosts.likesCount} + 1` })
          .where(eq(feedPosts.id, input.postId));
        return { liked: true };
      }
    }),

  // ── Feed: Check if liked ─────────────────────────────────────
  isLiked: publicQuery
    .input(z.object({ postId: z.number() }))
    .query(async ({ input, ctx }) => {
      const member = await getMemberFromRequest(ctx.req);
      if (!member) return { liked: false };

      const rows = await db
        .select()
        .from(feedLikes)
        .where(and(eq(feedLikes.postId, input.postId), eq(feedLikes.memberId, member.id)))
        .limit(1);

      return { liked: rows.length > 0 };
    }),
});
