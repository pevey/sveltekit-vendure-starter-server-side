import { gql } from '$lib/generated'
import { query } from '.'
import type { PaymentInput } from '$lib/generated/graphql'

export const addOrderPayment = async function(input: PaymentInput) {
   const AddOrderPayment = gql(`
      mutation AddOrderPayment($input: PaymentInput!) {
         addPaymentToOrder(input: $input) {
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
   return await query({ document: AddOrderPayment, variables: { input } })
      .then((response) => response?.json())
      .then((body) => body?.data?.activeOrder)
      .catch(() => { return null })
}