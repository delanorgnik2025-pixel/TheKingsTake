import { z } from 'zod';
export const courseEnrollmentSchema = z.object({
 email: z.string().trim().email().max(320).transform(v=>v.toLowerCase()),
 course: z.enum(['learn2file','buildyourcase','joininnercircle']),
 consent: z.literal(true),
 newsletterConsent: z.boolean().default(false),
 website: z.string().max(200).default(''),
});
