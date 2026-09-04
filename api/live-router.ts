import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { liveStreams } from "@db/schema";
import { eq, desc } from "drizzle-orm";
import {
  createLiveStream,
  getLiveStream,
  disableLiveStream,
  muxConfigured,
  MUX_RTMP_URL,
} from "./mux";

export const liveRouter = createRouter({
  // Public: is there a live/current broadcast? Returns playback id for the player.
  status: publicQuery.query(async () => {
    const db = getDb();
    const rows = await db
      .select()
      .from(liveStreams)
      .orderBy(desc(liveStreams.createdAt))
      .limit(1);
    const current = rows[0];
    if (!current || current.status === "ended") {
      return { live: false as const, muxConfigured: muxConfigured() };
    }
    // Sync with Mux when possible so "active" reflects reality.
    let muxStatus: string | null = null;
    if (current.muxStreamId && muxConfigured()) {
      try {
        const s = await getLiveStream(current.muxStreamId);
        muxStatus = s.status;
        if (s.status === "active" && current.status !== "active") {
          await db
            .update(liveStreams)
            .set({ status: "active", startedAt: new Date() })
            .where(eq(liveStreams.id, current.id));
        }
        if (s.status === "idle" && current.status === "active") {
          await db
            .update(liveStreams)
            .set({ status: "ended", endedAt: new Date() })
            .where(eq(liveStreams.id, current.id));
          return { live: false as const, muxConfigured: muxConfigured() };
        }
      } catch {
        // Mux unreachable — fall back to DB status
      }
    }
    const isLive = muxStatus ? muxStatus === "active" : current.status === "active";
    return {
      live: isLive,
      muxConfigured: muxConfigured(),
      title: current.title,
      playbackId: current.muxPlaybackId,
      startedAt: current.startedAt,
    };
  }),

  // Admin: create a new live stream — returns RTMP URL + stream key for the phone app.
  goLive: adminQuery
    .input(z.object({ title: z.string().min(1).max(255) }))
    .mutation(async ({ input }) => {
      const stream = await createLiveStream();
      const playbackId = stream.playback_ids?.[0]?.id ?? null;
      const db = getDb();
      await db.insert(liveStreams).values({
        title: input.title,
        muxStreamId: stream.id,
        muxPlaybackId: playbackId,
        streamKey: stream.stream_key,
        status: "idle",
      });
      return {
        success: true,
        rtmpUrl: MUX_RTMP_URL,
        streamKey: stream.stream_key,
        playbackId,
      };
    }),

  // Admin: end the current broadcast.
  endLive: adminQuery
    .input(z.object({ id: z.number().optional() }).optional())
    .mutation(async ({ input }) => {
      const db = getDb();
      const rows = await db
        .select()
        .from(liveStreams)
        .orderBy(desc(liveStreams.createdAt))
        .limit(1);
      const current = rows[0];
      const targetId = input?.id ?? current?.id;
      if (!targetId) return { success: true };
      const target = current?.id === targetId ? current : null;
      if (target?.muxStreamId && muxConfigured()) {
        try {
          await disableLiveStream(target.muxStreamId);
        } catch {
          // ignore — still mark ended locally
        }
      }
      await db
        .update(liveStreams)
        .set({ status: "ended", endedAt: new Date() })
        .where(eq(liveStreams.id, targetId));
      return { success: true };
    }),

  // Admin: list recent broadcasts (history for the Go Live panel).
  history: adminQuery.query(async () => {
    const db = getDb();
    return db.select().from(liveStreams).orderBy(desc(liveStreams.createdAt)).limit(10);
  }),
});
