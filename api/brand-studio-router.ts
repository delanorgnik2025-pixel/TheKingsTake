import {recordInquiryJourney} from "./visitor-journey";
import { TRPCError } from '@trpc/server';
import { createRouter, publicQuery } from './middleware';
import { getDb } from './queries/connection';
import { siteLeads } from '../db/schema';
import { studioInquirySchema, studioLeadValues } from '../contracts/brand-studio';
const attempts = new Map<string, { count: number; expires: number }>();
export const brandStudioRouter = createRouter({
  inquire: publicQuery.input(studioInquirySchema).mutation(async ({ input, ctx }) => {
    if (input.companyWebsite) throw new TRPCError({ code: 'BAD_REQUEST', message: 'Please leave the website verification field empty.' });
    const key = ctx.req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const now = Date.now();
    for (const [ip, entry] of attempts) if (entry.expires <= now) attempts.delete(ip);
    const entry = attempts.get(key) || { count: 0, expires: now + 15 * 60_000 };
    if (entry.count >= 5) throw new TRPCError({ code: 'TOO_MANY_REQUESTS', message: 'Please wait 15 minutes before sending another inquiry.' });
    entry.count++; attempts.set(key, entry);
    const values = studioLeadValues(input);
    try { await getDb().insert(siteLeads).values(values); }
    catch { throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'We could not save your inquiry. Please try again or email Ronald directly.' }); }
    await recordInquiryJourney(ctx.req);
    // The saved inquiry is authoritative even if the notification provider is unavailable.
    const apiKey = process.env.RESEND_API_KEY, to = process.env.OWNER_NOTIFICATION_EMAIL, from = process.env.NEWSLETTER_FROM_EMAIL;
    if (apiKey && to && from) {
      try {
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST', headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ from, to: [to], reply_to: values.email, subject: `Brand Studio inquiry: ${input.package}`, text: `${values.name}\n${values.email}\n${values.phone || 'No phone provided'}\n\n${values.message}\n\nReview: https://thekingstake.com/admin/dashboard?section=audience` }),
          signal: AbortSignal.timeout(10_000),
        });
        if (!response.ok) console.warn('[brand-studio] Inquiry saved; owner notification rejected:', response.status);
      } catch { console.warn('[brand-studio] Inquiry saved; owner notification unavailable.'); }
    }
    return { success: true };
  }),
});
