import { gql } from '$lib/generated'
import { query } from './'

export const removeOrderCouponCode = async function(couponCode: string) {
   const RemoveOrderCouponCode = gql(`
      mutation RemoveOrderCouponCode($couponCode: String!) {
         removeCouponCode(couponCode: $couponCode) {
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
               description
            }
            priceWithTax
         }
      }
   `)
   return await query({ document: RemoveOrderCouponCode, variables: { couponCode } })
      .then((response) => response?.json())
      .then((body) => body?.data?.activeOrder)
      .catch(() => { return null })
}