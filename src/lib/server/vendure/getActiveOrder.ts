import type { Cookies } from '@sveltejs/kit'
import { gql } from '$lib/generated'
import { query } from '.'

export const getActiveOrder = async function(locals: App.Locals, cookies: Cookies) {
   const GetActiveOrder = gql(`
      query GetActiveOrder {
         activeOrder {
            ...ActiveOrder
         }
      }
      fragment ActiveOrder on Order {
         __typename
         id
         code
         couponCodes
         state
         currencyCode
         totalQuantity
         subTotal
         shipping
         total
         totalWithTax
         taxSummary {
            description
            taxRate
            taxBase
            taxTotal
         }
         discounts {
            description
            amountWithTax
         }
         lines {
            id
            unitPrice
            unitPriceWithTax
            quantity
            linePrice
            linePriceWithTax
            productVariant {
               id
               name
               sku
               product {
                  slug
               }
            }
            featuredAsset {
               id
               preview
            }
         }
         shippingLines {
            shippingMethod {
               name
               description
            }
            priceWithTax
         }
      }
   `)
   return await query({ document: GetActiveOrder, locals })
      .then((response) => response?.json())
      .then((body) => body?.data?.activeOrder)
      .catch(() => { return null })
}