import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { normalizeLibraryOfCongressResponse } from "./archive";
import { createRouter, publicQuery } from "./middleware";

const CACHE_TTL_MS = 10 * 60 * 1000;
const cache = new Map<string, { expiresAt: number; value: ReturnType<typeof normalizeLibraryOfCongressResponse> }>();

export const archiveRouter = createRouter({
  searchLibraryOfCongress: publicQuery
    .input(z.object({
      query: z.string().trim().min(2).max(120),
      page: z.number().int().min(1).max(100).default(1),
      pageSize: z.number().int().min(6).max(24).default(12),
    }))
    .query(async ({ input }) => {
      const cacheKey = `${input.query.toLowerCase()}|${input.page}|${input.pageSize}`;
      const cached = cache.get(cacheKey);
      if (cached && cached.expiresAt > Date.now()) return cached.value;

      const url = new URL("https://www.loc.gov/search/");
      url.searchParams.set("q", input.query);
      url.searchParams.set("fo", "json");
      url.searchParams.set("at", "results,pagination");
      url.searchParams.set("c", String(input.pageSize));
      url.searchParams.set("sp", String(input.page));

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15_000);
      try {
        const response = await fetch(url, {
          headers: { Accept: "application/json", "User-Agent": "TheKingsTake Archive Research/1.0" },
          signal: controller.signal,
        });
        if (!response.ok) throw new Error(`Library of Congress returned ${response.status}`);
        const normalized = normalizeLibraryOfCongressResponse(await response.json());
        if (cache.size >= 100) cache.delete(cache.keys().next().value || "");
        cache.set(cacheKey, { expiresAt: Date.now() + CACHE_TTL_MS, value: normalized });
        return normalized;
      } catch (error) {
        const message = error instanceof Error && error.name === "AbortError"
          ? "The Library of Congress search timed out. Please try again."
          : "The Library of Congress search is temporarily unavailable. Please try again.";
        throw new TRPCError({ code: "BAD_GATEWAY", message, cause: error });
      } finally {
        clearTimeout(timeout);
      }
    }),
});

