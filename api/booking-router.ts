import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { bookings } from "@db/schema";
import { eq, desc } from "drizzle-orm";

export const bookingRouter = createRouter({
  // Public: create a booking
  create: publicQuery
    .input(z.object({
      serviceId: z.number(),
      name: z.string().min(1),
      email: z.string().email(),
      phone: z.string().optional(),
      message: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(bookings).values({
        serviceId: input.serviceId,
        name: input.name,
        email: input.email,
        phone: input.phone ?? null,
        message: input.message ?? null,
      }).$returningId();
      return { id: result[0].id, success: true };
    }),

  // Admin: list all bookings
  list: adminQuery.query(async () => {
    const db = getDb();
    return db.select().from(bookings).orderBy(desc(bookings.createdAt));
  }),

  // Admin: update booking status
  updateStatus: adminQuery
    .input(z.object({
      id: z.number(),
      status: z.enum(["pending", "confirmed", "completed", "cancelled"]),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.update(bookings).set({ status: input.status }).where(eq(bookings.id, input.id));
      return { success: true };
    }),
});
