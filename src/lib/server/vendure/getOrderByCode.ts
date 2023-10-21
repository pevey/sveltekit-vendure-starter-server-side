import { gql } from '$lib/generated'
import { query } from '.'

export const getOrderByCode = async function(locals: App.Locals, code: string) {
   const GetOrderByCode = gql(`
      query GetOrderByCode($code: String!) {
         orderByCode(code: $code) {
            id
            state
            lines {
               id
               quantity
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
         }
      }
   `)
   return await query({ document: GetOrderByCode, variables: { code }, locals })
      .then((response) => response?.json())
      .then((body) => body?.data?.activeOrder)
      .catch(() => { return null })
}