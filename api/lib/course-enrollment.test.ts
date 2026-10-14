import {describe,it,expect} from 'vitest';
import {courseEnrollmentSchema} from '../../contracts/course-enrollment';
describe('course enrollment',()=>{
 it('requires consent and rejects invented courses',()=>{
 expect(courseEnrollmentSchema.safeParse({email:'a@example.com',course:'learn2file',consent:false}).success).toBe(false);
 expect(courseEnrollmentSchema.safeParse({email:'a@example.com',course:'paid-access',consent:true}).success).toBe(false);
 });
 it('normalizes email without assuming Dispatch consent',()=>{
 const p=courseEnrollmentSchema.parse({email:' A@EXAMPLE.COM ',course:'buildyourcase',consent:true});
 expect(p.email).toBe('a@example.com');expect(p.newsletterConsent).toBe(false);
 });
});
