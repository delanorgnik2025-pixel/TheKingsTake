import {describe,it,expect,vi} from 'vitest';
vi.mock('./router',()=>({appRouter:{}}));
vi.mock('./context',()=>({createContext:vi.fn()}));
vi.mock('@trpc/server/adapters/fetch',()=>({fetchRequestHandler:vi.fn(async()=>new Response('{"result":{}}',{headers:{'content-type':'application/json'}}))}));
import app from './boot';

describe('API transport cache protection',()=>{
 it('sets no-store on the actual adapter response rather than an unused context header',async()=>{
  const response=await app.request('/api/trpc/feed.access');
  expect(response.status).toBe(200);
  expect(response.headers.get('Cache-Control')).toBe('private, no-store');
 });
});
