import { gql } from '$lib/generated'
import { query } from './'

export const getCollectionProducts = async function(slug: string) {
   if (!slug) return []
   const GetCollectionProducts = gql(`
      query GetCollectionProducts($slug: String!, $skip: Int, $take: Int) {
         search(
         input: {
            collectionSlug: $slug,
            groupByProduct: true,
            skip: $skip,
            take: $take }
         ) {
            totalItems
            items {
               productName
               slug
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
   return await query({ document: GetCollectionProducts , variables: { slug } })
      .then((response) => response?.json())
      .then((body) => body?.data?.search?.items)
      .catch(() => { return null })
}