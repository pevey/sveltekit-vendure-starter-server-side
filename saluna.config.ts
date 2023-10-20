import 'dotenv/config'

const IS_DEV = process.env.NODE_ENV === 'dev'

export const config: SalunaConfig = {
   public: {
      site: {
         siteName: process.env.PUBLIC_SITE_NAME || 'Store Name',
         siteDescription: process.env.PUBLIC_SITE_DESCRIPTION || 'Store description',
         siteLogo: process.env.PUBLIC_SITE_LOGO || 'http://localhost:5173/logo.png',
         siteImage: process.env.PUBLIC_SITE_IMAGE || 'http://localhost:5173/logo.png',
         siteUrl: process.env.PUBLIC_SITE_URL || 'http://localhost:5173',
         twitter: {
            handle: process.env.PUBLIC_TWITTER_HANDLE || '',
            site: process.env.PUBLIC_TWITTER_SITE || '',
            cardType: process.env.PUBLIC_TWITTER_CARD_TYPE || 'summary_large_image'
         }
      },
      vendure: {
         defaultCurrency: process.env.PUBLIC_DEFAULT_CURRENCY || 'USD',
         requireEmailVerification: process.env.VENDURE_REQUIRE_VERIFICATION === 'true'
      },
      turnstile: {
         publicKey: process.env.PUBLIC_TURNSTILE_SITE_KEY || 'missing key'
      },
      stripe: {
         publicKey: process.env.PUBLIC_STRIPE_KEY || 'pk_test_12345'
      }
   },
   private: {
      vendure: {
         shopApiUrl: (IS_DEV ? process.env.VENDURE_SHOPAPI_DEV_URL : process.env.VENDURE_SHOPAPI_PROD_URL) || 'http://localhost:3000/shop-api',
         shopApiHeaders: IS_DEV ? [] : [
            {
               key: 'CF-Access-Client-Id',
               value: process.env.CLOUDFLARE_ACCESS_ID
            },
            {
               key: 'CF-Access-Client-Secret',
               value: process.env.CLOUDFLARE_ACCESS_SECRET
            }
         ]
      },
      turnstile: {
         privateKey: process.env.SECRET_TURNSTILE_KEY || 'missing key'
      }
   } 
}

export interface SalunaConfig {
   public: {
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
         defaultCurrency: string,
         requireEmailVerification: boolean
      },
      turnstile: {
         publicKey: string 
      }
      stripe: {
         publicKey: string
      }
   }
   private: {
      vendure: {
         shopApiUrl: string,
         shopApiHeaders: any[],
      }
      turnstile: {
         privateKey: string
      }
   }
}

export default config