import type { ProductListOptions } from '$lib/generated/graphql'
import { gql } from '$lib/generated'
import { query } from './'

export const getProducts = async function(options?: ProductListOptions) {
   const GetProducts = gql(`
      query GetProducts($options: ProductListOptions) {
         products(options: $options) {
            totalItems
            items {
               id
               name
               slug
               description
               featuredAsset {
                  id
                  preview
               }
            }
         }
      }
   `)
   return await query({ document: GetProducts, variables: { options } })
      .then((response) => response?.json())
      .then((body) => body?.data?.products?.items)
      .catch(() => { return null })
}