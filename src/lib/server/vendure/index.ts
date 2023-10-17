import { SuperFetch } from 'sveltekit-superfetch'
import { print, type ASTNode } from 'graphql'
import { 
   VENDURE_API_URL, 
   VENDURE_AUTH_TYPE, 
   CLOUDFLARE_ACCESS_ID, 
   CLOUDFLARE_ACCESS_SECRET 
} from '$env/static/private'

export const superFetch = new SuperFetch({
   retry: 3,
   timeout: 5000,
   ttl: 1000,
   logLevel: 'silent'
})

interface QueryOptions {
   document: ASTNode
   variables?: any
   locals?: App.Locals
   key?: string
   ttl?: number
   revalidate?: boolean
   logLevel?: 'verbose' | 'limited' | 'silent'
   rawResponse?: boolean
}

export const query = async function(options: QueryOptions) {
   const { locals, document, variables, rawResponse,...rest } = options

   const headers = new Headers({ 'Content-Type': 'application/json' })
   if (CLOUDFLARE_ACCESS_ID && CLOUDFLARE_ACCESS_SECRET) {
      headers.append('CF-Access-Client-Id', CLOUDFLARE_ACCESS_ID)
      headers.append('CF-Access-Client-Secret', CLOUDFLARE_ACCESS_SECRET)
   }
   if (VENDURE_AUTH_TYPE === 'bearer' && locals && locals.token) {
      headers.append('authorization', `Bearer ${locals.token}`)
   } else if (VENDURE_AUTH_TYPE === 'cookie' && locals && locals.sid && locals.ssig) {
      headers.append('Cookie', `sid=${locals.sid}; sidsig=${locals.ssig}`)
   }

   const response = await superFetch.query({
      url: VENDURE_API_URL,
      method: 'POST',
      headers,
      body: JSON.stringify({
         query: print(document),
         variables
      }),
      ...rest
   })

   if (rawResponse) return response

   else return await response?.json()
   .then((body) => body?.data)
   .catch((e: Error) => {
      console.log(e)
      return null
   })
}

export { addToCart } from './addToCart'
// export { getActiveOrder } from './getActiveOrder'
export { getCart } from './getCart'
export { getCollection } from './getCollection'
export { getCollectionProducts } from './getCollectionProducts'
export { getCollections } from './getCollections'
export { getCustomer } from './getCustomer'
export { getProduct } from './getProduct'
export { getProducts } from './getProducts'
export { getTopLevelCollections } from './getTopLevelCollections'
export { handleVendureRequest } from './handleVendureRequest'
export { parseAuthCookie } from './parseAuthCookie'
export { parseAuthHeader } from './parseAuthHeader'
// export { removeFromCart } from './removeFromCart'
// export { updateCart } from './updateCart'






