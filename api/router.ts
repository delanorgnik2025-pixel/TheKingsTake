import { authRouter } from "./auth-router";
import { blogRouter } from "./blog-router";
import { serviceRouter } from "./service-router";
import { bookingRouter } from "./booking-router";
import { legalRouter } from "./legal-router";
import { stripeRouter } from "./stripe-router";
import { aiRouter } from "./ai-router";
import { voiceRouter } from "./voice-router";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  blog: blogRouter,
  service: serviceRouter,
  booking: bookingRouter,
  legal: legalRouter,
  stripe: stripeRouter,
  ai: aiRouter,
  voice: voiceRouter,
});

export type AppRouter = typeof appRouter;
