export {}

// Here we declare the members of the process.env object, so that we
// can use them in our application code in a type-safe manner.
declare global {
    namespace NodeJS {
        interface ProcessEnv {
			NODE_ENV: string
			ORIGIN: string
			VENDURE_SHOPAPI_DEV_URL: string
			VENDURE_SHOPAPI_PROD_URL: string
			PUBLIC_REQUIRE_EMAIL_VERIFICATION: boolean
			PUBLIC_DEFAULT_CURRENCY: string
			PUBLIC_LOCAL_PICKUP_CODE: string
			PUBLIC_SITE_NAME: string
			PUBLIC_SITE_DESCRIPTION: string
			PUBLIC_SITE_LOGO: string
			PUBLIC_SITE_IMAGE: string
			PUBLIC_SITE_URL: string
			PUBLIC_TWITTER_HANDLE: string
			PUBLIC_TWITTER_SITE: string
			PUBLIC_TWITTER_CARD_TYPE: string
			PUBLIC_STRIPE_KEY: string
			PUBLIC_TURNSTILE_SITE_KEY: string
			SECRET_TURNSTILE_KEY: string
			CLOUDFLARE_ACCESS_ID: string
			CLOUDFLARE_ACCESS_SECRET: string
        }
    }
}
