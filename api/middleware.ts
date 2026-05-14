import { ErrorMessages } from "@contracts/constants";
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import type { TrpcContext } from "./context";

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

function requireRole(role: string) {
  return t.middleware(async (opts) => {
    const { ctx, next } = opts;

    // Check if user has the role in database (OAuth login)
    if (ctx.user && ctx.user.role === role) {
      return next({ ctx: { ...ctx, user: ctx.user } });
    }

    // Check if admin token is provided in header (password login)
    const adminToken = (ctx.req as any)?.headers?.get?.("x-admin-token");
    if (adminToken && adminToken.startsWith("admin_")) {
      return next({ ctx: { ...ctx, user: { id: 0, name: "Admin", email: "admin@aasotu.com", role: "admin" } as any } });
    }

    throw new TRPCError({
      code: "FORBIDDEN",
      message: ErrorMessages.insufficientRole,
    });
  });
}

export const authedQuery = t.procedure.use(requireAuth);
export const adminQuery = authedQuery.use(requireRole("admin"));
