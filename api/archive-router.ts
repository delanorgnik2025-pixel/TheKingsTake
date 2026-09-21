import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  normalizeLibraryOfCongressResponse,
  normalizeNationalArchivesDetail,
  normalizeNationalArchivesResponse,
} from "./archive";
import { createRouter, publicQuery } from "./middleware";
import { toolPreview } from "./security/tool-preview";

const CACHE_TTL_MS = 10 * 60 * 1000;
const cache = new Map<
  string,
  {
    expiresAt: number;
    value: ReturnType<typeof normalizeLibraryOfCongressResponse>;
  }
>();

function remember(
  key: string,
  value: ReturnType<typeof normalizeLibraryOfCongressResponse>
) {
  if (cache.size >= 100) cache.delete(cache.keys().next().value || "");
  cache.set(key, { expiresAt: Date.now() + CACHE_TTL_MS, value });
  return value;
}

export const archiveRouter = createRouter({
  getNationalArchivesRecord: publicQuery
    .input(z.object({ naId: z.string().regex(/^\d{1,20}$/) }))
    .query(async ({ ctx, input }) => {
      await toolPreview(ctx.req, "archives", "request");
      const apiKey = process.env.NARA_API_KEY;
      if (!apiKey)
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "National Archives access is being configured.",
        });
      const url = new URL("https://catalog.archives.gov/proxy/v3/records/search");
      url.searchParams.set("q", input.naId);
      url.searchParams.set("page", "1");
      url.searchParams.set("limit", "20");
      url.searchParams.set("includeExtractedText", "true");
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 35_000);
      try {
        const response = await fetch(url, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "User-Agent": "TheKingsTake Archive Research/1.0",
            "x-api-key": apiKey,
          },
          signal: controller.signal,
        });
        if (!response.ok)
          throw new Error(`National Archives returned ${response.status}`);
        const record = normalizeNationalArchivesDetail(await response.json(), input.naId);
        if (!record)
          throw new TRPCError({ code: "NOT_FOUND", message: "Archive record not found." });
        return record;
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        throw new TRPCError({
          code: "BAD_GATEWAY",
          message:
            error instanceof Error && error.name === "AbortError"
              ? "The National Archives request timed out. Please try again."
              : "This National Archives record is temporarily unavailable.",
          cause: error,
        });
      } finally {
        clearTimeout(timeout);
      }
    }),

  searchLibraryOfCongress: publicQuery
    .input(
      z.object({
        query: z.string().trim().min(2).max(120),
        page: z.number().int().min(1).max(100).default(1),
        pageSize: z.number().int().min(6).max(24).default(12),
      })
    )
    .query(async ({ ctx, input }) => {
      await toolPreview(ctx.req, "archives", "request");
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
      // Cold Library of Congress searches can legitimately take longer than 15 seconds.
      const timeout = setTimeout(() => controller.abort(), 35_000);
      try {
        const response = await fetch(url, {
          headers: {
            Accept: "application/json",
            "User-Agent": "TheKingsTake Archive Research/1.0",
          },
          signal: controller.signal,
        });
        if (!response.ok)
          throw new Error(`Library of Congress returned ${response.status}`);
        const normalized = normalizeLibraryOfCongressResponse(
          await response.json()
        );
        return remember(cacheKey, normalized);
      } catch (error) {
        const message =
          error instanceof Error && error.name === "AbortError"
            ? "The Library of Congress search timed out. Please try again."
            : "The Library of Congress search is temporarily unavailable. Please try again.";
        throw new TRPCError({ code: "BAD_GATEWAY", message, cause: error });
      } finally {
        clearTimeout(timeout);
      }
    }),

  searchNationalArchives: publicQuery
    .input(
      z.object({
        query: z.string().trim().min(2).max(120),
        page: z.number().int().min(1).max(100).default(1),
        pageSize: z.number().int().min(4).max(20).default(8),
        availableOnline: z.boolean().default(false),
      })
    )
    .query(async ({ ctx, input }) => {
      await toolPreview(ctx.req, "archives", "request");
      const apiKey = process.env.NARA_API_KEY;
      if (!apiKey)
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message:
            "National Archives search is being configured. Please try again soon.",
        });

      const cacheKey = `nara|${input.query.toLowerCase()}|${input.page}|${input.pageSize}|${input.availableOnline}`;
      const cached = cache.get(cacheKey);
      if (cached && cached.expiresAt > Date.now()) return cached.value;

      // The live Catalog interface currently uses this v3 search route. The key
      // remains server-only and is sent with every request as required by NARA.
      const url = new URL(
        "https://catalog.archives.gov/proxy/v3/records/search"
      );
      url.searchParams.set("q", input.query);
      url.searchParams.set("page", String(input.page));
      url.searchParams.set("limit", String(input.pageSize));
      url.searchParams.set("includeExtractedText", "false");
      url.searchParams.set("includeOtherExtractedText", "false");
      if (input.availableOnline)
        url.searchParams.set("availableOnline", "true");

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 35_000);
      try {
        const response = await fetch(url, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "User-Agent": "TheKingsTake Archive Research/1.0",
            "x-api-key": apiKey,
          },
          signal: controller.signal,
        });
        if (!response.ok)
          throw new Error(`National Archives returned ${response.status}`);
        const contentType = response.headers.get("content-type") || "";
        if (!contentType.includes("application/json"))
          throw new Error("National Archives returned an unexpected response");
        const normalized = normalizeNationalArchivesResponse(
          await response.json()
        );
        normalized.pagination.current = input.page;
        normalized.pagination.next =
          normalized.results.length === input.pageSize ? "next" : null;
        normalized.pagination.previous = input.page > 1 ? "previous" : null;
        return remember(cacheKey, normalized);
      } catch (error) {
        const message =
          error instanceof Error && error.name === "AbortError"
            ? "The National Archives search timed out. Please try again."
            : "The National Archives search is temporarily unavailable. Please try again.";
        throw new TRPCError({ code: "BAD_GATEWAY", message, cause: error });
      } finally {
        clearTimeout(timeout);
      }
    }),
});
