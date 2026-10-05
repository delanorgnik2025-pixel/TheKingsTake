import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('optional marketing measurement', () => {
  const gtag = vi.fn();
  beforeEach(() => {
    vi.resetModules();
    vi.stubEnv('VITE_GA4_ENABLED', 'true');
    vi.stubEnv('VITE_GA4_MEASUREMENT_ID', 'G-TEST123');
    vi.stubGlobal('window', { location: { origin: 'https://thekingstake.com', pathname: '/brand-studio', search: '?email=private&token=secret' }, gtag });
    vi.stubGlobal('localStorage', { getItem: () => 'granted' });
  });
  afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); gtag.mockClear(); });
  it('does not send events after refusal or on private routes', async () => {
    const { trackMarketingEvent } = await import('./marketing-analytics');
    vi.stubGlobal('localStorage', { getItem: () => 'denied' });
    trackMarketingEvent('generate_lead');
    vi.stubGlobal('localStorage', { getItem: () => 'granted' });
    window.location.pathname = '/admin/dashboard';
    trackMarketingEvent('page_view');
    expect(gtag).not.toHaveBeenCalled();
  });
  it('omits URL parameters and does not turn a checkout start into a purchase', async () => {
    const { trackMarketingEvent } = await import('./marketing-analytics');
    trackMarketingEvent('begin_checkout');
    expect(gtag).toHaveBeenCalledWith('event', 'begin_checkout', expect.objectContaining({ page_location: 'https://thekingstake.com/brand-studio' }));
    expect(JSON.stringify(gtag.mock.calls)).not.toContain('secret');
  });
  it('does not break customer actions when browser storage is blocked', async () => {
    vi.stubGlobal('localStorage', { getItem: () => { throw new Error('blocked'); } });
    const { analyticsConsent, trackMarketingEvent } = await import('./marketing-analytics');
    expect(analyticsConsent()).toBe('denied');
    expect(() => trackMarketingEvent('begin_checkout')).not.toThrow();
    expect(gtag).not.toHaveBeenCalled();
  });
});
