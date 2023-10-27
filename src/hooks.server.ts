import type { Handle } from '@sveltejs/kit'
import { handleVendureRequest } from '$lib/server/vendure'
import { config } from './saluna.config'

export const handle: Handle = async ({ event, resolve }) => {

   // If path starts with /checkout/success, wait for 500 ms
   // This allows the order to be processed via the webhook before the page is rendered
   if (event.url.pathname.startsWith('/checkout/success')) {
      await new Promise(resolve => setTimeout(resolve, 500))
   }

   // STASH THE CONFIG IN LOCALS
   event.locals.config = config

   // VENDURE SESSION MIDDLEWARE  
   // Sets locals.user and locals.cart if a vendure session is found.
   // If you have a large app where only part of the app functions as a shop, you may want
   // to check the request path and only run this middleware if the path is /shop or similar.
   event = await handleVendureRequest(event)

   // Required for all paths
   const response = await resolve(event)

   // SECURITY HEADERS
   // CSP directives are set elsewhere in svelte.config.js and added automatically by SvelteKit.
   // CSRF mitigation in SvelteKit is handled by header-checking and is enabled by default. More secure token-based CSRF mitigation must be added manually.
   // Token-based CSRF mitigation for the most sensitive endpoints/form actions is handled by Cloudflare Turnstile.
   // The headers below provide additional security against XSS, clickjacking, MIME-type sniffing, and other attacks.
   response.headers.set('X-Frame-Options', 'DENY')
   response.headers.set('X-Content-Type-Options', 'nosniff')
   response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
   response.headers.set('Permissions-Policy', 'payment=(self "https://js.stripe.com/"), accelerometer=(), camera=(), display-capture=(), encrypted-media=(), fullscreen=(), gyroscope=(), hid=(), interest-cohort=(), magnetometer=(), microphone=(), midi=(), picture-in-picture=(), publickey-credentials-get=(), sync-xhr=(), usb=(), xr-spatial-tracking=(), geolocation=()')

   return response
}