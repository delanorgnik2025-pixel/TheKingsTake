import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import { analyticsConfigured, analyticsConsent, initializeAnalytics, marketingPages, setAnalyticsEnabled, trackMarketingEvent } from '@/lib/marketing-analytics';

export default function MarketingAnalytics() {
  const { pathname } = useLocation();
  const [consent, setConsent] = useState(analyticsConsent);
  const lastPage = useRef('');
  const allowedPage = marketingPages.has(pathname);
  useEffect(() => {
    const enabled = analyticsConfigured && allowedPage && consent === 'granted';
    setAnalyticsEnabled(enabled);
    if (enabled) {
      initializeAnalytics();
      if (lastPage.current !== pathname) {
        trackMarketingEvent('page_view');
        lastPage.current = pathname;
      }
    } else lastPage.current = '';
    return () => setAnalyticsEnabled(false);
  }, [pathname, consent, allowedPage]);
  if (!analyticsConfigured || !allowedPage) return null;
  const choose = (value: string) => { try { localStorage.setItem('tkt-analytics-consent', value); setConsent(value); } catch { setConsent('denied'); } };
  if (consent) return <button onClick={() => { try { localStorage.removeItem('tkt-analytics-consent'); setConsent(null); } catch { setConsent('denied'); } }} className="fixed bottom-2 left-2 z-[120] rounded bg-[#101b28] px-2 py-1 text-xs text-[#C9B99A]">Analytics preferences</button>;
  return <div className="fixed bottom-4 left-4 right-4 z-[120] mx-auto max-w-lg rounded-xl border border-white/20 bg-[#101b28] p-4 text-sm text-[#F0EBE1]" role="region" aria-label="Optional analytics">
    <p>Allow optional analytics cookies to help us improve our book and website services?</p>
    <div className="mt-3 flex gap-4"><button onClick={() => choose('granted')} className="rounded bg-[#FFB840] px-3 py-2 text-[#101b28]">Allow analytics</button><button onClick={() => choose('denied')}>Decline</button></div>
  </div>;
}
