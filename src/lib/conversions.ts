/**
 * Facebook Conversions API helper.
 * Sends server-side events through our backend to Facebook.
 * Falls back silently if tracking is unavailable.
 */

function getFacebookCookie(name: string): string | undefined {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match?.[2]
}

function getFbcFromUrl(): string | undefined {
  const params = new URLSearchParams(window.location.search)
  return params.get('fbclid') || undefined
}

export function trackConversion(
  eventName: 'PageView' | 'Purchase' | 'InitiateCheckout' | 'Contact' | 'Lead' | 'ViewContent',
  options?: {
    value?: number
    currency?: string
    contentName?: string
    contentType?: string
  }
) {
  // Use a simple fetch to call the tRPC endpoint directly
  const payload = {
    json: {
      eventName,
      eventTime: Math.floor(Date.now() / 1000),
      eventSourceUrl: window.location.href,
      clientUserAgent: navigator.userAgent,
      fbc: getFbcFromUrl(),
      fbp: getFacebookCookie('_fbp'),
      ...options,
    },
  }

  // Get IP asynchronously then send
  fetch('https://api.ipify.org?format=json')
    .then(r => r.json())
    .then(d => d.ip as string)
    .catch(() => undefined)
    .then(clientIp => {
      payload.json.clientIp = clientIp

      return fetch('/api/trpc/conversions.sendEvent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    })
    .then(r => r.json())
    .then(data => {
      if (data.result?.data?.success === false) {
        console.warn('[Conversions]', eventName, 'tracking skipped:', data.result.data.reason)
      } else {
        console.log('[Conversions]', eventName, 'sent')
      }
    })
    .catch(() => {
      // Silently fail — tracking should never break user experience
    })
}
