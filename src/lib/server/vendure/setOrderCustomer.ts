import { gql } from '$lib/generated'
import { query } from './'
import type { CreateCustomerInput } from '$lib/generated/graphql'

export const setOrderCustomer = async function(input: CreateCustomerInput) {
   const SetOrderCustomer = gql(`
      mutation SetCustomerForOrder($input: CreateCustomerInput!) {
         setCustomerForOrder(input: $input) {
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
   return await query({ document: SetOrderCustomer, variables: { input } })
      .then((response) => response?.json())
      .then((body) => body?.data?.activeOrder)
      .catch(() => { return null })
}