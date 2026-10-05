import { beforeEach, describe, expect, it, vi } from 'vitest';
const execute = vi.hoisted(() => vi.fn());
vi.mock('./queries/connection', () => ({ getDb: () => ({ execute }) }));
import { designRouter } from './design-router';
const context = { req: new Request('https://thekingstake.com/api/trpc'), resHeaders: new Headers() };
describe('homepage template controls', () => {
 beforeEach(() => execute.mockReset());
 it('loads the saved original template', async () => {
  execute.mockResolvedValue([[{value:'classic'}]]);
  expect(await designRouter.createCaller(context).landing()).toEqual({template:'classic'});
 });
 it('uses the new design for an unset setting', async () => {
  execute.mockResolvedValue([[]]);
  expect(await designRouter.createCaller(context).landing()).toEqual({template:'noir'});
 });
 it('persists an authenticated administrator selection', async () => {
  execute.mockResolvedValue([{}]);
  const admin = { ...context, user: {id:1,unionId:'owner',name:'Owner',email:'owner@example.com',avatar:null,role:'admin' as const,createdAt:new Date(),updatedAt:new Date(),lastSignInAt:new Date()} };
  await expect(designRouter.createCaller(admin).setLanding({template:'classic'})).resolves.toEqual({template:'classic'});
  expect(execute).toHaveBeenCalledOnce();
 });
 it('does not let an unauthenticated visitor change the global design', async () => {
  await expect(designRouter.createCaller(context).setLanding({template:'classic'})).rejects.toThrow();
  expect(execute).not.toHaveBeenCalled();
 });
});
