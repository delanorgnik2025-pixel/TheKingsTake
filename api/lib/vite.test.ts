import { afterAll, describe, expect, it, vi } from 'vitest';
import { Hono } from 'hono';
import type { HttpBindings } from '@hono/node-server';
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
vi.mock('../queries/connection', () => ({ getDb: vi.fn() }));
import { serveStaticFiles } from './vite';

const root = mkdtempSync(path.join(tmpdir(), 'tkt-crawlers-'));
writeFileSync(path.join(root, 'index.html'), '<html><body>SPA fallback</body></html>');
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
