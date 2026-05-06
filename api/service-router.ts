import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { services } from "@db/schema";
import { eq, asc } from "drizzle-orm";

export const serviceRouter = createRouter({
  list: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(services).where(eq(services.isActive, true)).orderBy(asc(services.order));
  }),

  bySlug: publicQuery
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      const results = await db.select().from(services).where(eq(services.slug, input.slug)).limit(1);
      return results[0] ?? null;
    }),

  // Admin CRUD
  create: adminQuery
    .input(z.object({
      name: z.string().min(1),
      slug: z.string().min(1),
      shortDescription: z.string().min(1),
      fullDescription: z.string().optional(),
      price: z.number().min(0),
      priceDisplay: z.string().optional(),
      duration: z.string().optional(),
      type: z.enum(["one_time", "subscription", "package"]),
      icon: z.string().optional(),
      features: z.string().optional(),
      order: z.number().default(0),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(services).values({
        name: input.name,
        slug: input.slug,
        shortDescription: input.shortDescription,
        fullDescription: input.fullDescription ?? null,
        price: input.price,
        priceDisplay: input.priceDisplay ?? null,
        duration: input.duration ?? null,
        type: input.type,
        icon: input.icon ?? null,
        features: input.features ?? null,
        order: input.order,
      }).$returningId();
      return { id: result[0].id, success: true };
    }),

  update: adminQuery
    .input(z.object({
      id: z.number(),
      name: z.string().min(1).optional(),
      shortDescription: z.string().min(1).optional(),
      fullDescription: z.string().optional(),
      price: z.number().min(0).optional(),
      priceDisplay: z.string().optional(),
      duration: z.string().optional(),
      isActive: z.boolean().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const { id, ...data } = input;
      const updateData: Record<string, unknown> = {};
      if (data.name !== undefined) updateData.name = data.name;
      if (data.shortDescription !== undefined) updateData.shortDescription = data.shortDescription;
      if (data.fullDescription !== undefined) updateData.fullDescription = data.fullDescription;
      if (data.price !== undefined) updateData.price = data.price;
      if (data.priceDisplay !== undefined) updateData.priceDisplay = data.priceDisplay;
      if (data.duration !== undefined) updateData.duration = data.duration;
      if (data.isActive !== undefined) updateData.isActive = data.isActive;

      await db.update(services).set(updateData).where(eq(services.id, id));
      return { success: true };
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(services).where(eq(services.id, input.id));
      return { success: true };
    }),
});
