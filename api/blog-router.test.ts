import { describe, expect, it } from 'vitest';
import { blogRouter } from './blog-router';
const caller = blogRouter.createCaller({req: new Request('https://thekingstake.com/api/trpc'),resHeaders: new Headers()});
describe('article admin authorization', () => {
 it('rejects unauthenticated article/video writes and draft listing', async () => {
  await expect(caller.adminList()).rejects.toMatchObject({code:'FORBIDDEN'});
  await expect(caller.create({title:'Report',slug:'report',content:'Text',category:'DAILY NEWS'})).rejects.toMatchObject({code:'FORBIDDEN'});
  await expect(caller.update({id:1,published:true})).rejects.toMatchObject({code:'FORBIDDEN'});
  await expect(caller.appendUpdate({id:1,update:{date:'2026-10-09T14:30:00Z',text:'Verified update'}})).rejects.toMatchObject({code:'FORBIDDEN'});
 });
});
