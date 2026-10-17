import {case2courtProcedures} from './education/case2court-router';
import { TRPCError } from '@trpc/server';
import { createRouter, publicQuery, adminQuery } from './middleware';
import { getDb } from './queries/connection';
import { courseEnrollments, newsletterSubscribers } from '../db/schema';
import { courseEnrollmentSchema } from '../contracts/course-enrollment';
import { nanoid } from 'nanoid';
import { desc } from 'drizzle-orm';
const attempts = new Map<string,{count:number;expires:number}>();
export const courseRouter = createRouter({
 ...case2courtProcedures,
 enroll: publicQuery.input(courseEnrollmentSchema).mutation(async ({input,ctx})=>{
  if(input.website) throw new TRPCError({code:'BAD_REQUEST',message:'Please leave the verification field empty.'});
  const now=Date.now(); for(const [k,v] of attempts) if(v.expires<=now) attempts.delete(k);
  const key=ctx.req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()||'unknown';
  const a=attempts.get(key)||{count:0,expires:now+15*60_000};
  if(a.count>=5) throw new TRPCError({code:'TOO_MANY_REQUESTS',message:'Please wait 15 minutes before trying again.'});
  a.count++;attempts.set(key,a);
  await getDb().insert(courseEnrollments).values({email:input.email,course:input.course,consentedAt:new Date()}).onDuplicateKeyUpdate({set:{consentedAt:new Date()}});
  if(input.newsletterConsent) await getDb().insert(newsletterSubscribers).values({email:input.email,sourcePage:'/'+input.course,interests:JSON.stringify(['civil-rights courses','book']),status:'subscribed',unsubscribeToken:nanoid(40),consentedAt:new Date()}).onDuplicateKeyUpdate({set:{status:'subscribed',consentedAt:new Date(),sourcePage:'/'+input.course,interests:JSON.stringify(['civil-rights courses','book'])}});
  return {success:true,kind:input.course==='learn2file'?'free-enrollment':'waitlist'};
 }),
 adminEnrollments: adminQuery.query(()=>getDb().select().from(courseEnrollments).orderBy(desc(courseEnrollments.consentedAt)).limit(100)),
});
