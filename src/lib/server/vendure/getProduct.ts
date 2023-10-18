import { gql } from '$lib/generated'
import { query } from './'

export const getProduct = async function(slug: string) {
   if (!slug) return []
   const GetProduct = gql(`
      query GetProduct($slug: String!) {
         product(slug: $slug) {
            id
            name
            description
            featuredAsset {
               id
               preview
            }
            assets {
               id
               preview
            }
            variants {
               id
               name
               sku
               stockLevel
               currencyCode
               price
               priceWithTax
               facetValues {
                  id
                  name
                  facet {
                     id
                     name
                  }
               }
               featuredAsset {
                  id
                  preview
               }
               assets {
                  id
                  preview
               }
            }
         }
      }
   `)
   return await query({ document: GetProduct , variables: { slug } })
   .then((response) => response?.json())
   .then((body) => body?.data?.product)
   .catch(() => { return null })   
}