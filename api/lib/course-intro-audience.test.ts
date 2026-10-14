import { describe, expect, it } from 'vitest';
import { isCourseIntroRecipient } from './course-intro-audience';
describe('course invitation audience',()=>{
 const opted = {email:'reader@example.com',status:'subscribed',consentedAt:new Date()};
 it('requires an active consented Dispatch subscription',()=>{expect(isCourseIntroRecipient(opted)).toBe(true);expect(isCourseIntroRecipient({...opted,status:'unsubscribed'})).toBe(false);expect(isCourseIntroRecipient({...opted,consentedAt:null})).toBe(false);});
 it('excludes test addresses and configured owner accounts',()=>{expect(isCourseIntroRecipient({...opted,email:'qa@example.invalid'})).toBe(false);expect(isCourseIntroRecipient(opted,['READER@example.com'])).toBe(false);});
});
