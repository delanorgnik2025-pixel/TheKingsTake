import {describe,it,expect,vi} from 'vitest';
import {hasSubscriberAccess} from '../../contracts/subscriber-access';
vi.mock('../queries/connection',()=>({getDb:vi.fn(()=>{throw new Error('Unauthorized database access');})}));
import {getDb} from '../queries/connection';
import {feedRouter} from '../feed-router';
import {memberRouter} from '../member-router';
const req=new Request('https://thekingstake.com/api/trpc',{headers:{cookie:'tkt_visitor=previous-entry'}});
const ctx={req,resHeaders:new Headers()};
describe('subscriber Feed boundary',()=>{
 it('requires a current independently verified entitlement rather than a self-report',()=>{
  const m={isActive:true,role:'member',facebookSubscribed:true};
  expect(hasSubscriberAccess(m)).toBe(false);
  expect(hasSubscriberAccess({...m,facebookVerifiedUntil:new Date(Date.now()+60000)})).toBe(true);
  expect(hasSubscriberAccess({...m,facebookVerifiedUntil:new Date(0)})).toBe(false);
  expect(hasSubscriberAccess({...m,facebookVerifiedUntil:'not a date'})).toBe(false);
  expect(hasSubscriberAccess({...m,isActive:false,facebookVerifiedUntil:new Date(Date.now()+60000)})).toBe(false);
 });
 it('allows only active administrator overrides',()=>{
  expect(hasSubscriberAccess({isActive:true,role:'admin'})).toBe(true);
  expect(hasSubscriberAccess({isActive:false,role:'admin'})).toBe(false);
  expect(hasSubscriberAccess({isActive:true,role:'moderator'})).toBe(false);
 });
 it('blocks anonymous post, comment and reaction data before a database lookup',async()=>{
  const feed=feedRouter.createCaller(ctx);const member=memberRouter.createCaller(ctx);
  await expect(feed.list({limit:10})).rejects.toMatchObject({code:'UNAUTHORIZED'});
  await expect(feed.getById({id:72})).rejects.toMatchObject({code:'UNAUTHORIZED'});
  await expect(member.listComments({postId:72})).rejects.toMatchObject({code:'UNAUTHORIZED'});
  await expect(member.createComment({postId:72,content:'test'})).rejects.toMatchObject({code:'UNAUTHORIZED'});
  expect(getDb).not.toHaveBeenCalled();
 });
 it('does not let an anonymous caller grant or renew subscriber access',async()=>{
  const member=memberRouter.createCaller(ctx);
  await expect(member.adminVerifyFacebookSubscriber({id:1,verified:true})).rejects.toMatchObject({code:'FORBIDDEN'});
  await expect(member.adminGenerateAccessCode({invitedEmail:'example@example.invalid',verifiedFacebookSubscriber:true,expiresInDays:30})).rejects.toMatchObject({code:'FORBIDDEN'});
 });
});
