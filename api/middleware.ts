import { ErrorMessages } from "@contracts/constants";
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import type { TrpcContext } from "./context";
import { verifyAdminToken } from "./security/auth";
import { getActiveMemberFromRequest } from "./security/member-session";
import type { User } from "@db/schema";

const t = initTRPC.context<TrpcContext>().create({
  transformer: superjson,
});

export const createRouter = t.router;
export const publicQuery = t.procedure;

const requireAuth = t.middleware(async (opts) => {
  const { ctx, next } = opts;

  if (!ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: ErrorMessages.unauthenticated,
    });
  }

  return next({ ctx: { ...ctx, user: ctx.user } });
});

const requireMember = t.middleware(async ({ ctx, next }) => {
  const member = await getActiveMemberFromRequest(ctx.req);
  if (!member) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Members only. Please log in." });
  }
  return next({ ctx: { ...ctx, member } });
});

function requireRole(role: string) {
  return t.middleware(async (opts) => {
    const { ctx, next } = opts;

    // Check if user has the role in database (OAuth login)
    if (ctx.user && ctx.user.role === role) {
      return next({ ctx: { ...ctx, user: ctx.user } });
    }

    // Check if admin token is provided in header (password login)
    const adminToken = ctx.req.headers.get("x-admin-token");
    if (adminToken && await verifyAdminToken(adminToken)) {
      const now = new Date();
      const adminUser: User = {
        id: 0,
        unionId: "password-admin",
        name: "Admin",
        email: "admin@aasotu.com",
        avatar: null,
        role: "admin",
        createdAt: now,
        updatedAt: now,
        lastSignInAt: now,
      };
      return next({ ctx: { ...ctx, user: adminUser } });
    }

    throw new TRPCError({
      code: "FORBIDDEN",
      message: ErrorMessages.insufficientRole,
    });
  });
}

export const authedQuery = t.procedure.use(requireAuth);
export const memberQuery = publicQuery.use(requireMember);
// Admin query: checks OAuth admin OR password token. Does NOT require OAuth first.
export const adminQuery = publicQuery.use(requireRole("admin"));
