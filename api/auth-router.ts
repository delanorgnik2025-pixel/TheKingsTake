import * as cookie from "cookie";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { Session } from "@contracts/constants";
import { getSessionCookieOptions } from "./lib/cookies";
import { createRouter, publicQuery, authedQuery } from "./middleware";
import { createAdminToken, verifyAdminPassword, verifyAdminToken } from "./security/auth";

export const authRouter = createRouter({
  me: authedQuery.query((opts) => opts.ctx.user),
  logout: authedQuery.mutation(async ({ ctx }) => {
    const opts = getSessionCookieOptions(ctx.req.headers);
    ctx.resHeaders.append(
      "set-cookie",
      cookie.serialize(Session.cookieName, "", {
        httpOnly: opts.httpOnly,
        path: opts.path,
        sameSite: opts.sameSite?.toLowerCase() as "lax" | "none",
        secure: opts.secure,
        maxAge: 0,
      }),
    );
    return { success: true };
  }),
  // Admin password login (bypasses OAuth)
  adminLogin: publicQuery
    .input(z.object({
      password: z.string(),
    }))
    .mutation(async ({ input }) => {
      if (!verifyAdminPassword(input.password)) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid admin password" });
      }
      const token = await createAdminToken();
      return { success: true, token };
    }),
  adminSession: publicQuery.query(async ({ ctx }) => {
    const token = ctx.req.headers.get("x-admin-token");
    return { valid: Boolean(token && await verifyAdminToken(token)) };
  }),
});
