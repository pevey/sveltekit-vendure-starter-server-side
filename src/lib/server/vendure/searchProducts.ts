import type { SearchInput } from '$lib/generated/graphql'
import { gql } from '$lib/generated'
import { query } from './'

export const searchProducts = async function(input: SearchInput) {
   const SearchProducts = gql(`
      query SearchProducts($input: SearchInput!) {
         search(input: $input) {
            totalItems
            items {
               productName
               slug
               description
               productAsset {
                  id
                  preview
               }
               price {
                  ... on SinglePrice {
                     value
                  }
                  ... on PriceRange {
                     min
                     max
                  }
               }
               currencyCode
            }
         }
      }
   `)
   return await query({ document: SearchProducts, variables: { input } })
      .then((response) => response?.json())
      .then((body) => body?.data?.search?.items)
      .catch(() => { return null })
}