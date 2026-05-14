import * as cookie from "cookie";
import { z } from "zod";
import { Session } from "@contracts/constants";
import { getSessionCookieOptions } from "./lib/cookies";
import { createRouter, publicQuery, authedQuery } from "./middleware";

// Admin password — use environment variable or default
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "AASOTU2025!";

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
      if (input.password !== ADMIN_PASSWORD) {
        throw new Error("Invalid admin password");
      }
      const token = "admin_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2);
      return { success: true, token };
    }),
});
