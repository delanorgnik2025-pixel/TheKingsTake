import { afterEach, describe, expect, it, vi } from 'vitest';
const { values, insert } = vi.hoisted(() => { const values = vi.fn().mockResolvedValue(undefined); return { values, insert: vi.fn(() => ({ values })) }; });
vi.mock('./queries/connection', () => ({ getDb: () => ({ insert }) }));
import { brandStudioRouter } from './brand-studio-router';
import { studioInquirySchema } from '../contracts/brand-studio';
const input = { name: 'Studio Test', email: 'Studio@example.com', business: 'Example Books', package: 'Author Launch' as const, budget: 'Need guidance' as const, timeline: '1–3 months' as const, message: 'I need an author website with purchase links.', consent: true as const, companyWebsite: '' };
const caller = (ip: string) => brandStudioRouter.createCaller({ req: new Request('https://thekingstake.com/api/trpc/brandStudio.inquire', { headers: { 'x-forwarded-for': ip } }), resHeaders: new Headers() });
afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); vi.clearAllMocks(); });
describe('public Brand Studio inquiries', () => {
  it('saves an inquiry without a visitor session and keeps package qualification data', async () => {
    vi.stubEnv('RESEND_API_KEY', '');
    await expect(caller('test-save').inquire(input)).resolves.toEqual({ success: true });
    expect(values).toHaveBeenCalledWith(expect.objectContaining({ email: 'studio@example.com', sourcePage: '/brand-studio', interest: 'Brand Studio · Author Launch', message: expect.stringContaining('Budget: Need guidance') }));
  });
  it('does not claim success if persistence fails', async () => {
    values.mockRejectedValueOnce(new Error('Database unavailable'));
    await expect(caller('test-failure').inquire(input)).rejects.toThrow();
  });
  it('retains a saved lead when the email notification fails', async () => {
    vi.stubEnv('RESEND_API_KEY', 'test-only'); vi.stubEnv('OWNER_NOTIFICATION_EMAIL', 'owner@example.com'); vi.stubEnv('NEWSLETTER_FROM_EMAIL', 'from@example.com');
    const fetch = vi.fn().mockRejectedValue(new Error('Provider unavailable')); vi.stubGlobal('fetch', fetch);
    await expect(caller('test-notification').inquire(input)).resolves.toEqual({ success: true });
    expect(values).toHaveBeenCalled(); expect(fetch).toHaveBeenCalledTimes(1);
  });
  it('rejects missing consent, invalid email, and unsafe website addresses', () => {
    for (const change of [{ consent: false }, { email: 'bad' }, { website: 'javascript:alert(1)' }]) expect(studioInquirySchema.safeParse({ ...input, ...change }).success).toBe(false);
  });
  it('blocks honeypot submissions before saving', async () => {
    await expect(caller('test-honeypot').inquire({ ...input, companyWebsite: 'spam' })).rejects.toMatchObject({ code: 'BAD_REQUEST' });
    expect(insert).not.toHaveBeenCalled();
  });
  it('limits repeated inquiries without restricting other visitors', async () => {
    vi.stubEnv('RESEND_API_KEY', '');
    for (let i=0; i<5; i++) await caller('test-limit').inquire(input);
    await expect(caller('test-limit').inquire(input)).rejects.toMatchObject({ code: 'TOO_MANY_REQUESTS' });
    await expect(caller('test-independent').inquire(input)).resolves.toEqual({ success: true });
  });
});
