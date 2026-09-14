import { z } from "zod";
import { eq, and, desc, sql } from "drizzle-orm";
import { createHash } from "node:crypto";
import { TRPCError } from "@trpc/server";
import { adminQuery, createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { members, memberAccessCodes, feedComments, feedLikes, feedPosts } from "@db/schema";
import { createMemberToken, hashPassword, verifyMemberToken, verifyPassword } from "./security/auth";
import { generateAccessCode, hashAccessCode } from "./security/access-codes";

// ── Helper: get member from request ─────────────────────────────
async function getMemberFromRequest(req: Request) {
  const token = req.headers.get("x-member-token");
  if (!token) return null;
  const payload = await verifyMemberToken(token);
  if (!payload) return null;
  const rows = await getDb().select().from(members).where(eq(members.id, payload.memberId)).limit(1);
  if (rows.length === 0 || !rows[0].isActive) return null;
  return rows[0];
}

export const memberRouter = createRouter({
  validateAccessCode: publicQuery
    .input(z.object({ code: z.string().min(8).max(32) }))
    .mutation(async ({ input }) => {
      const [invite] = await getDb().select({
        id: memberAccessCodes.id,
        invitedEmail: memberAccessCodes.invitedEmail,
        expiresAt: memberAccessCodes.expiresAt,
        usedAt: memberAccessCodes.usedAt,
        revokedAt: memberAccessCodes.revokedAt,
      }).from(memberAccessCodes)
        .where(eq(memberAccessCodes.codeHash, hashAccessCode(input.code)))
        .limit(1);
      const valid = Boolean(invite && !invite.usedAt && !invite.revokedAt && (!invite.expiresAt || invite.expiresAt > new Date()));
      if (!valid) throw new TRPCError({ code: "UNAUTHORIZED", message: "This access code is invalid, expired, or already used." });
      return { valid: true, invitedEmail: invite?.invitedEmail ?? null };
    }),

  // ── Register ─────────────────────────────────────────────────
  register: publicQuery
    .input(
      z.object({
        name: z.string().min(2).max(100),
        email: z.string().email().max(320),
        password: z.string().min(6).max(100),
        accessCode: z.string().min(8).max(32),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const email = input.email.trim().toLowerCase();
      const memberId = await db.transaction(async (tx) => {
        const [invite] = await tx.select().from(memberAccessCodes)
          .where(eq(memberAccessCodes.codeHash, hashAccessCode(input.accessCode)))
          .limit(1).for("update");
        if (!invite || invite.usedAt || invite.revokedAt || (invite.expiresAt && invite.expiresAt <= new Date())) {
          throw new TRPCError({ code: "UNAUTHORIZED", message: "This access code is invalid, expired, or already used." });
        }
        if (invite.invitedEmail && invite.invitedEmail.toLowerCase() !== email) {
          throw new TRPCError({ code: "FORBIDDEN", message: "This code was issued for a different email address." });
        }
        const existing = await tx.select({ id: members.id }).from(members).where(eq(members.email, email)).limit(1);
        if (existing[0]) throw new TRPCError({ code: "CONFLICT", message: "Email already registered." });
        const result = await tx.insert(members).values({
          name: input.name.trim(), email, passwordHash: await hashPassword(input.password), facebookSubscribed: true,
        });
        const id = Number(result[0].insertId);
        await tx.update(memberAccessCodes).set({ usedAt: new Date(), usedByMemberId: id }).where(eq(memberAccessCodes.id, invite.id));
        return id;
      });
      const token = await createMemberToken(memberId, email);

      return {
        token,
        member: {
          id: memberId,
          name: input.name.trim(),
          email,
          avatar: null,
          role: "member" as const,
          facebookSubscribed: true,
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
      const db = getDb();
      const rows = await db
        .select()
        .from(members)
        .where(eq(members.email, input.email.trim().toLowerCase()))
        .limit(1);

      if (rows.length === 0) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid email or password." });
      }

      const member = rows[0];
      const password = await verifyPassword(input.password, member.passwordHash);
      if (!password.valid || !member.isActive) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid email or password." });
      }

      if (password.needsRehash) {
        await db.update(members)
          .set({ passwordHash: await hashPassword(input.password), updatedAt: new Date() })
          .where(eq(members.id, member.id));
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
          facebookSubscribed: member.facebookSubscribed,
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

      await getDb()
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
  createImageUploadSignature: publicQuery.mutation(async ({ ctx }) => {
    const member = await getMemberFromRequest(ctx.req);
    if (!member) throw new TRPCError({ code: "UNAUTHORIZED", message: "Members only." });
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    if (!cloudName || !apiKey || !apiSecret) {
      throw new TRPCError({ code: "PRECONDITION_FAILED", message: "Image uploads are not configured." });
    }
    const timestamp = Math.floor(Date.now() / 1000);
    const folder = "thekingstake/member-feed";
    const signature = createHash("sha1").update(`folder=${folder}&timestamp=${timestamp}${apiSecret}`).digest("hex");
    return { cloudName, apiKey, timestamp, folder, signature };
  }),

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

      const result = await getDb().insert(feedPosts).values({
        memberId: member.id,
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

      await getDb().insert(feedComments).values({
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
      const rows = await getDb()
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

      return getDb().transaction(async (tx) => {
        // Lock the post so concurrent toggles serialize before checking the like row.
        const post = await tx.select({ id: feedPosts.id })
          .from(feedPosts)
          .where(eq(feedPosts.id, input.postId))
          .limit(1)
          .for("update");
        if (!post[0]) throw new TRPCError({ code: "NOT_FOUND", message: "Post not found." });

        const existing = await tx.select({ id: feedLikes.id })
          .from(feedLikes)
          .where(and(eq(feedLikes.postId, input.postId), eq(feedLikes.memberId, member.id)))
          .limit(1);

        if (existing[0]) {
          await tx.delete(feedLikes).where(eq(feedLikes.id, existing[0].id));
          await tx.update(feedPosts)
            .set({ likesCount: sql`greatest(${feedPosts.likesCount} - 1, 0)` })
            .where(eq(feedPosts.id, input.postId));
          return { liked: false };
        }

        await tx.insert(feedLikes).values({ postId: input.postId, memberId: member.id });
        await tx.update(feedPosts)
          .set({ likesCount: sql`${feedPosts.likesCount} + 1` })
          .where(eq(feedPosts.id, input.postId));
        return { liked: true };
      });
    }),

  // ── Feed: Check if liked ─────────────────────────────────────
  isLiked: publicQuery
    .input(z.object({ postId: z.number() }))
    .query(async ({ input, ctx }) => {
      const member = await getMemberFromRequest(ctx.req);
      if (!member) return { liked: false };

      const rows = await getDb()
        .select()
        .from(feedLikes)
        .where(and(eq(feedLikes.postId, input.postId), eq(feedLikes.memberId, member.id)))
        .limit(1);

      return { liked: rows.length > 0 };
    }),

  adminGenerateAccessCode: adminQuery
    .input(z.object({
      label: z.string().max(255).optional(),
      invitedEmail: z.string().email().optional().or(z.literal("")),
      expiresInDays: z.number().int().min(1).max(365).default(30),
    }))
    .mutation(async ({ input }) => {
      const code = generateAccessCode();
      const expiresAt = new Date(Date.now() + input.expiresInDays * 86_400_000);
      await getDb().insert(memberAccessCodes).values({
        codeHash: hashAccessCode(code),
        codePreview: `••••-${code.slice(-4)}`,
        label: input.label?.trim() || null,
        invitedEmail: input.invitedEmail?.trim().toLowerCase() || null,
        expiresAt,
      });
      return { code, expiresAt };
    }),

  adminListAccessCodes: adminQuery.query(async () => {
    return getDb().select({
      id: memberAccessCodes.id,
      codePreview: memberAccessCodes.codePreview,
      label: memberAccessCodes.label,
      invitedEmail: memberAccessCodes.invitedEmail,
      expiresAt: memberAccessCodes.expiresAt,
      usedAt: memberAccessCodes.usedAt,
      revokedAt: memberAccessCodes.revokedAt,
      createdAt: memberAccessCodes.createdAt,
      usedByMemberId: memberAccessCodes.usedByMemberId,
    }).from(memberAccessCodes).orderBy(desc(memberAccessCodes.createdAt));
  }),

  adminRevokeAccessCode: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await getDb().update(memberAccessCodes).set({ revokedAt: new Date() })
        .where(and(eq(memberAccessCodes.id, input.id), sql`${memberAccessCodes.usedAt} is null`));
      return { success: true };
    }),

  adminListMembers: adminQuery.query(async () => {
    return getDb().select({
      id: members.id, name: members.name, email: members.email,
      facebookSubscribed: members.facebookSubscribed, isActive: members.isActive,
      role: members.role, createdAt: members.createdAt,
    }).from(members).orderBy(desc(members.createdAt));
  }),

  adminSetMemberActive: adminQuery
    .input(z.object({ id: z.number().int().positive(), isActive: z.boolean() }))
    .mutation(async ({ input }) => {
      await getDb().update(members).set({ isActive: input.isActive }).where(eq(members.id, input.id));
      return { success: true };
    }),
});
