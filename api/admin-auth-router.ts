import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";

// Admin password — stored in environment variable for security
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "AASOTU2025!";

export const adminAuthRouter = createRouter({
  adminLogin: publicQuery
    .input(z.object({
      password: z.string(),
    }))
    .mutation(async ({ input }) => {
      if (input.password !== ADMIN_PASSWORD) {
        throw new Error("Invalid admin password");
      }
      // Create a simple token (in production, use JWT)
      const token = "admin_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2);
      return { success: true, token };
    }),
});
