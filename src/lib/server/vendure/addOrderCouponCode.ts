import { gql } from '$lib/generated'
import { query } from './'

export const addOrderCouponCode = async function(locals: App.Locals, couponCode: string) {
   const AddOrderCouponCode = gql(`
      mutation AddOrderCouponCode($couponCode: String!) {
         applyCouponCode(couponCode: $couponCode) {
            ...ActiveOrder
            ... on ErrorResult {
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
   return await query({ document: AddOrderCouponCode, variables: { couponCode }, locals })
      .then((response) => response?.json())
      .then((body) => body?.data?.activeOrder)
      .catch(() => { return null })
}