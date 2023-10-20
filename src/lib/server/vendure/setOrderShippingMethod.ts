import { gql } from '$lib/generated'
import { query } from './'

export const setOrderShippingMethod = async function(id: number) {
   const SetOrderShippingMethod = gql(`
      mutation SetOrderShippingMethod($id: [ID!]!) {
         setOrderShippingMethod(shippingMethodId: $id) {
            ...ActiveOrder
            ...on ErrorResult {
               errorCode
               message
            }
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
               description
            }
            priceWithTax
         }
      }
   `)
   return await query({ document: SetOrderShippingMethod, variables: { id } })
      .then((response) => response?.json())
      .then((body) => body?.data?.activeOrder)
      .catch(() => { return null })
}