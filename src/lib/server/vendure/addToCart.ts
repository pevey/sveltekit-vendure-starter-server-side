import type { Cookies } from '@sveltejs/kit'
import { print } from 'graphql'
import { gql } from '$lib/generated'
import { superFetch, parseAuthHeader, parseAuthCookie } from './'
import { 
   VENDURE_API_URL, 
   VENDURE_AUTH_TYPE, 
   CLOUDFLARE_ACCESS_ID, 
   CLOUDFLARE_ACCESS_SECRET 
} from '$env/static/private'

export const addToCart = async function(locals: any, cookies: Cookies, variantId: string, quantity: number) {
   const AddItemToOrder = gql(`
      mutation AddItemToOrder($variantId: ID!, $quantity: Int!) {
         addItemToOrder(productVariantId: $variantId, quantity: $quantity) {
            __typename
            ...UpdatedOrder
            ... on ErrorResult {
               errorCode
               message
            }
            ... on InsufficientStockError {
               quantityAvailable
               order {
                  ...UpdatedOrder
               }
            }
         }
      }
      fragment UpdatedOrder on Order {
         id
         code
         state
         totalQuantity
         totalWithTax
         currencyCode
         lines {
            id
            unitPriceWithTax
            quantity
            linePriceWithTax
            productVariant {
               id
               name
            }
         }
      }
   `)

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
         query: print(AddItemToOrder),
         variables: { variantId, quantity }
      })
   }).catch(() => { return null })
   if (!response) return null

   if (VENDURE_AUTH_TYPE === 'bearer') await parseAuthHeader(response.headers, locals, cookies)
   else await parseAuthCookie(response.headers.getSetCookie(), locals, cookies)

   return await response.json()
   .then((body) => body?.data?.addItemToOrder)
   .catch((e) => {
      console.log(e)
      return null
   })
}