import type { Cookies } from '@sveltejs/kit'
import { print } from 'graphql'
import { gql } from '$lib/generated'
import { query, parseAuthHeader, parseAuthCookie } from './'
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
   const response = await query({ document: AddItemToOrder, variables: { variantId, quantity }, locals, rawResponse: true })
   if (!response) return null

   // Capture the credentials if new session is initiated for non-logged-in user when adding to cart
   if (VENDURE_AUTH_TYPE === 'bearer') await parseAuthHeader(response.headers, locals, cookies)
   else await parseAuthCookie(response.headers.getSetCookie(), locals, cookies)

   return await response.json()
   .then((body:any) => body?.data?.addItemToOrder)
   .catch((e: Error) => {
      console.log(e)
      return null
   })
}