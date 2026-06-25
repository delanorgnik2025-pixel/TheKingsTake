import { z } from 'zod'
import { createRouter, publicQuery } from './middleware'

const PIXEL_ID = '1531431398593102'
const FB_API_VERSION = 'v18.0'

// Events we track
const TRACKED_EVENTS = ['PageView', 'Purchase', 'InitiateCheckout', 'Contact', 'Lead', 'ViewContent'] as const

const conversionInput = z.object({
  eventName: z.enum(TRACKED_EVENTS),
  eventTime: z.number().optional(),
  eventSourceUrl: z.string().optional(),
  clientIp: z.string().optional(),
  clientUserAgent: z.string().optional(),
  fbc: z.string().optional(), // Facebook click ID from URL
  fbp: z.string().optional(), // Facebook browser ID from cookie
  value: z.number().optional(),
  currency: z.string().optional(),
  contentName: z.string().optional(),
  contentType: z.string().optional(),
})

async function sendToFacebook(
  accessToken: string,
  eventData: z.infer<typeof conversionInput>
) {
  const url = `https://graph.facebook.com/${FB_API_VERSION}/${PIXEL_ID}/events`

  const payload = {
    data: [
      {
        event_name: eventData.eventName,
        event_time: eventData.eventTime ?? Math.floor(Date.now() / 1000),
        action_source: 'website',
        event_source_url: eventData.eventSourceUrl,
        user_data: {
          client_ip_address: eventData.clientIp,
          client_user_agent: eventData.clientUserAgent,
          ...(eventData.fbc ? { fbc: eventData.fbc } : {}),
          ...(eventData.fbp ? { fbp: eventData.fbp } : {}),
        },
        ...(eventData.value || eventData.currency
          ? {
              custom_data: {
                ...(eventData.value ? { value: eventData.value } : {}),
                ...(eventData.currency ? { currency: eventData.currency } : {}),
                ...(eventData.contentName ? { content_name: eventData.contentName } : {}),
                ...(eventData.contentType ? { content_type: eventData.contentType } : {}),
              },
            }
          : {}),
      },
    ],
    access_token: accessToken,
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  const json = await res.json()

  if (!res.ok) {
    throw new Error(`Facebook Conversions API error: ${JSON.stringify(json)}`)
  }

  return json
}

export const conversionsRouter = createRouter({
  sendEvent: publicQuery
    .input(conversionInput)
    .mutation(async ({ input }) => {
      const accessToken = process.env.META_CONVERSIONS_API_TOKEN

      if (!accessToken) {
        // If no token configured, silently skip — don't break the site
        console.warn('[Conversions API] META_CONVERSIONS_API_TOKEN not set, skipping event')
        return { success: false, reason: 'token_not_configured' }
      }

      try {
        const result = await sendToFacebook(accessToken, input)
        console.log(`[Conversions API] ${input.eventName} sent successfully`)
        return { success: true, result }
      } catch (err: any) {
        console.error('[Conversions API] Error:', err.message)
        // Fail silently — don't break user experience
        return { success: false, reason: err.message }
      }
    }),
})
