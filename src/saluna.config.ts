import { dev } from '$app/environment'
import { 
	PUBLIC_SITE_NAME, 
	PUBLIC_SITE_DESCRIPTION,
	PUBLIC_SITE_LOGO,
	PUBLIC_SITE_IMAGE,
	PUBLIC_SITE_URL,
	PUBLIC_TWITTER_HANDLE,
	PUBLIC_TWITTER_SITE,
	PUBLIC_TWITTER_CARD_TYPE,
	PUBLIC_DEFAULT_CURRENCY,
	PUBLIC_REQUIRE_EMAIL_VERIFICATION,
	PUBLIC_TURNSTILE_SITE_KEY,
	PUBLIC_STRIPE_KEY,
	PUBLIC_LOCAL_PICKUP_CODE
} from "$env/static/public"
import {
	VENDURE_SHOPAPI_DEV_URL,
	VENDURE_SHOPAPI_PROD_URL,
	SECRET_TURNSTILE_KEY,
	CLOUDFLARE_ACCESS_ID,
	CLOUDFLARE_ACCESS_SECRET
} from "$env/static/private"

export const config: SalunaConfig = {
	site: {
		siteName: PUBLIC_SITE_NAME || 'Store Name',
		siteDescription: PUBLIC_SITE_DESCRIPTION || 'Store description',
		siteLogo: PUBLIC_SITE_LOGO || 'http://localhost:5173/logo.png',
		siteImage: PUBLIC_SITE_IMAGE || 'http://localhost:5173/logo.png',
		siteUrl: PUBLIC_SITE_URL || 'http://localhost:5173',
		twitter: {
			handle: PUBLIC_TWITTER_HANDLE || '',
			site: PUBLIC_TWITTER_SITE || '',
			cardType: PUBLIC_TWITTER_CARD_TYPE || 'summary_large_image'
		}
	},
	vendure: {
		shopApiUrl: (dev ? VENDURE_SHOPAPI_DEV_URL : VENDURE_SHOPAPI_PROD_URL) || 'http://localhost:3000/shop-api',
		shopApiHeaders: dev ? [] : [
			{
				key: 'CF-Access-Client-Id',
				value: CLOUDFLARE_ACCESS_ID
			},
			{
				key: 'CF-Access-Client-Secret',
				value: CLOUDFLARE_ACCESS_SECRET
			}
		],
		defaultCurrency: PUBLIC_DEFAULT_CURRENCY || 'USD',
		localPickupCode: PUBLIC_LOCAL_PICKUP_CODE,
		requireEmailVerification: PUBLIC_REQUIRE_EMAIL_VERIFICATION === 'true'
	},
	turnstile: {
		publicKey: PUBLIC_TURNSTILE_SITE_KEY || 'missing key',
		privateKey: SECRET_TURNSTILE_KEY || 'missing key'
	},
	stripe: {
		publicKey: PUBLIC_STRIPE_KEY || 'pk_test_12345'
	}
}

export interface SalunaConfig {
	site: {
		siteName: string,
		siteDescription: string,
		siteLogo: string,
		siteImage: string,
		siteUrl: string,
		twitter: {
			handle: string,
			site: string,
			cardType: string
		}
	},
	vendure: {
		shopApiUrl: string,
		shopApiHeaders: any[],
		defaultCurrency: string,
		localPickupCode: string,
		requireEmailVerification: boolean
	},
	turnstile: {
		publicKey: string,
		privateKey: string
	},
	stripe: {
		publicKey: string
	}
}

export default config