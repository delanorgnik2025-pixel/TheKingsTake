import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createRouter, publicQuery } from "./middleware";
import { createAdminToken, verifyAdminPassword } from "./security/auth";

export const adminAuthRouter = createRouter({
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
});
