export const marketingPages = new Set(['/', '/brand-studio', '/pre-order', '/about-author', '/services', '/writing-services', '/contact']);

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};
const analyticsWindow = () => window as AnalyticsWindow;
export const measurementId = import.meta.env.VITE_GA4_MEASUREMENT_ID?.trim() || '';
export const analyticsConfigured = import.meta.env.VITE_GA4_ENABLED === 'true' && /^G-[A-Z0-9]+$/.test(measurementId);

export function analyticsConsent() {
  try { return localStorage.getItem('tkt-analytics-consent'); } catch { return 'denied'; }
}

export function setAnalyticsEnabled(enabled: boolean) {
  Object.assign(window, { [`ga-disable-${measurementId}`]: !enabled });
}

export function initializeAnalytics() {
  const target = analyticsWindow();
  if (!analyticsConfigured || target.gtag) return;
  target.dataLayer = target.dataLayer || [];
  target.gtag = function () { target.dataLayer!.push(arguments); };
  target.gtag('js', new Date());
  target.gtag('config', measurementId, {
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    page_location: `${window.location.origin}${window.location.pathname}`,
    page_referrer: '',
  });
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
}

export function trackMarketingEvent(name: 'page_view' | 'generate_lead' | 'begin_checkout') {
  if (!analyticsConfigured || !marketingPages.has(window.location.pathname)) return;
  if (analyticsConsent() !== 'granted') return;
  try { analyticsWindow().gtag?.('event', name, {
    send_to: measurementId,
    page_location: `${window.location.origin}${window.location.pathname}`,
    page_referrer: '',
    page_title: "The King's Take",
  }); } catch { /* Optional tracking must never interrupt an inquiry or checkout. */ }
}
