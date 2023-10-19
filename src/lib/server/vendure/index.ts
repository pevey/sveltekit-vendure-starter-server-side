import { SuperFetch } from 'sveltekit-superfetch'
import { print, type ASTNode } from 'graphql'
import { VENDURE_API_URL, CLOUDFLARE_ACCESS_ID, CLOUDFLARE_ACCESS_SECRET } from '$env/static/private'

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
}

// sends the graphql query and returns the raw response
export const query = async function(options: QueryOptions): Promise<Response|null> {
   const { locals, document, variables, ...rest } = options

   const headers = new Headers({ 'Content-Type': 'application/json' })
   if (CLOUDFLARE_ACCESS_ID && CLOUDFLARE_ACCESS_SECRET) {
      headers.append('CF-Access-Client-Id', CLOUDFLARE_ACCESS_ID)
      headers.append('CF-Access-Client-Secret', CLOUDFLARE_ACCESS_SECRET)
   }
   if (locals && locals.sid && locals.ssig) {
      headers.append('Cookie', `session=${locals.sid}; session.sig=${locals.ssig}`)
   }

   return await superFetch.query({
      url: VENDURE_API_URL,
      method: 'POST',
      headers,
      body: JSON.stringify({
         query: print(document),
         variables
      }),
      ...rest
   }).catch((e: Error) => {
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
export { removeFromCart } from './removeFromCart'
export { requestPasswordReset } from './requestPasswordReset'
export { resetPassword } from './resetPassword'
export { searchProducts } from './searchProducts'
export { signIn } from './signIn'
export { signOut } from './signOut'
export { signUp } from './signUp'
export { updateCart } from './updateCart'
export { verifyEmail } from './verifyEmail'






