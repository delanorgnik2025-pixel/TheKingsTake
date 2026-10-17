import { afterAll, describe, expect, it, vi } from 'vitest';
import { Hono } from 'hono';
import type { HttpBindings } from '@hono/node-server';
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
vi.mock('../queries/connection', () => ({ getDb: vi.fn() }));
import { serveStaticFiles } from './vite';

describe('Spirit and Symbol metadata',()=>{
 it('shares a public reading title and rejects unknown entries without a database lookup',async()=>{
  const app=new Hono<{Bindings:HttpBindings}>();serveStaticFiles(app,root);
  const response=await app.request('/spirit-and-symbol/necronomicon-fiction-and-myth');
  expect(response.status).toBe(200);const html=await response.text();
  expect(html).toContain('The Necronomicon and the art of making a myth');
  expect(html).toContain('https://thekingstake.com/spirit-and-symbol/necronomicon-fiction-and-myth');
  expect((await app.request('/spirit-and-symbol/unknown')).status).toBe(404);
 });
});

const root = mkdtempSync(path.join(tmpdir(), 'tkt-crawlers-'));
writeFileSync(path.join(root, 'index.html'), '<html><head><title>Generic</title></head><body>SPA fallback</body></html>');
for (const file of ['robots.txt', 'sitemap.xml']) writeFileSync(path.join(root, file), readFileSync(path.resolve('public', file)));
afterAll(() => rmSync(root, { recursive: true, force: true }));
describe('production crawler files', () => {
  const app = new Hono<{ Bindings: HttpBindings }>();
  serveStaticFiles(app, root);
  it('serves crawler rules as text instead of the SPA entrance', async () => {
    const response = await app.request('/robots.txt');
    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toContain('text/plain');
    expect(await response.text()).toContain('Sitemap: https://thekingstake.com/sitemap.xml');
  });
  it('serves the sitemap as XML with the book and studio routes', async () => {
    const response = await app.request('/sitemap.xml');
    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toContain('xml');
    const body = await response.text();
    expect(body).toContain('<loc>https://thekingstake.com/pre-order</loc>');
    expect(body).toContain('<loc>https://thekingstake.com/brand-studio</loc>');
    expect(body).not.toContain('SPA fallback');
  });
});

describe('public Nolan capture metadata', () => {
  it('serves the exact headline, description, canonical and approved image in raw HTML', async () => {
    const app = new Hono<{ Bindings: HttpBindings }>();
    serveStaticFiles(app, root);
    const response = await app.request('/investigations/nolan-wells/captured-report-pages?capture=11');
    expect(response.status).toBe(200);
    const html = await response.text();
    expect(html).toContain('Nolan Wells: Examine the Snapchat Messages and Timeline Yourself');
    expect(html).toContain('Explore the available Garrett Discovery report captures');
    expect(html).toContain('rel="canonical" href="https://thekingstake.com/investigations/nolan-wells/captured-report-pages"');
    expect(html).toContain('property="og:image" content="https://thekingstake.com/images/nolan-wells-phone-timeline-thekingstake.webp"');
    expect(html).not.toContain('og:image:height');
  });
});

 describe('free course metadata',()=>{
  it('serves the free introduction metadata without article or visitor lookup',async()=>{
   const app = new Hono<{ Bindings: HttpBindings }>(); serveStaticFiles(app,root);
   const r=await app.request('/learn/section-1983-introduction'); expect(r.status).toBe(200);
   const html=await r.text(); expect(html).toContain('Free Section 1983 Introduction');
   expect(html).toContain('href="https://thekingstake.com/learn/section-1983-introduction"');
   expect(html).toContain('No payment or access code required.');
  });
 });

 describe('course sharing and private Feed metadata',()=>{
  it('serves the actual course artwork, dimensions and Twitter metadata without JavaScript',async()=>{
   const app=new Hono<{Bindings:HttpBindings}>();serveStaticFiles(app,root);const r=await app.request('/learn2file');const html=await r.text();
   expect(html).toContain('https://thekingstake.com/images/learn2file-share-20261015.jpg');expect(html).toContain('property="og:image:width" content="1200"');expect(html).toContain('property="og:image:height" content="628"');expect(html).toContain('name="twitter:card" content="summary_large_image"');
  });
  it('returns only a generic subscriber invitation for a shared private-post URL',async()=>{
   const app=new Hono<{Bindings:HttpBindings}>();serveStaticFiles(app,root);const r=await app.request('/feed/post/72/any-person');const html=await r.text();
   expect(r.status).toBe(200);expect(html).toContain('Private Feed');expect(html).toContain('Subscriber Access');expect(html).not.toContain('Join any-person');expect(r.headers.get('cache-control')).toContain('no-store');
  });
 });

describe('course preview and membership destinations',()=>{
 it('gives both case-course links a distinct preview and one canonical URL',async()=>{
  const app=new Hono<{Bindings:HttpBindings}>();serveStaticFiles(app,root);
  for(const route of ['/case2court','/buildyourcase']){
   const response=await app.request(route);expect(response.status).toBe(200);
   const html=await response.text();expect(html).toContain('Case2Court: The Civil Rights Case Blueprint');
   expect(html).toContain('rel="canonical" href="https://thekingstake.com/case2court"');
   expect(html).toContain('Verified subscriber access required.');expect(html).not.toContain('learn2file-share-20261015.jpg');
  }
 });
 it('takes the legacy Inner Circle link to the Facebook subscription instead of another course waitlist',async()=>{
  const app=new Hono<{Bindings:HttpBindings}>();serveStaticFiles(app,root);
  const response=await app.request('/joininnercircle');expect(response.status).toBe(302);
  expect(response.headers.get('location')).toBe('https://www.facebook.com/TheKingsTake/subscribe/');
 });
});

 describe('subscriber classroom metadata',()=>{
 it('serves a public invitation without putting case-room content in the HTML',async()=>{
 const app=new Hono<{Bindings:HttpBindings}>();serveStaticFiles(app,root);const response=await app.request('/case2court/learn');const html=await response.text();
 expect(response.status).toBe(200);expect(html).toContain('Case2Court Classroom');expect(html).toContain('href="https://thekingstake.com/case2court/learn"');expect(html).not.toContain('Jordan Avery');
 });
 });
