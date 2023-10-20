import type { Cookies } from '@sveltejs/kit'
import { gql } from '$lib/generated'
import { query, parseAuthCookie } from '.'

export const addCartLine = async function(locals: any, cookies: Cookies, variantId: string, quantity: number) {
   const AddCartLine = gql(`
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
   const response = await query({ document: AddCartLine, variables: { variantId, quantity }, locals })
   if (!response) return null

   // Capture the credentials
   await parseAuthCookie(response.headers.getSetCookie(), locals, cookies)

   return await response.json()
      .then((body:any) => body?.data?.addItemToOrder)
      .catch((e: Error) => {
         console.log(e)
         return null
      })
}