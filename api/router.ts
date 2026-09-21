import { authRouter } from "./auth-router";
import { blogRouter } from "./blog-router";
import { serviceRouter } from "./service-router";
import { bookingRouter } from "./booking-router";
import { legalRouter } from "./legal-router";
import { stripeRouter } from "./stripe-router";
import { aiRouter } from "./ai-router";
import { voiceRouter } from "./voice-router";
import { petitionRouter } from "./petition-router";
import { storyRouter } from "./story-router";
import { conversionsRouter } from "./conversions-router";
import { genealogyRouter } from "./routers/genealogy";
import { videoRouter } from "./video-router";
import { feedRouter } from "./feed-router";
import { liveRouter } from "./live-router";
import { memberRouter } from "./member-router";
import { engagementRouter } from "./engagement-router";
import { archiveRouter } from "./archive-router";
import { visitorRouter } from "./visitor-router";
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
  petition: petitionRouter,
  story: storyRouter,
  conversions: conversionsRouter,
  genealogy: genealogyRouter,
  video: videoRouter,
  feed: feedRouter,
  live: liveRouter,
  member: memberRouter,
  engagement: engagementRouter,
  archive: archiveRouter,
  visitor: visitorRouter,
});

export type AppRouter = typeof appRouter;
