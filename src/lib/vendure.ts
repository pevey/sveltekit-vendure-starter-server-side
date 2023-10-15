import request from 'graphql-request'
import { gql } from '$lib/generated'
import type { ProductListOptions } from '$lib/generated/graphql'
import { VENDURE_API_URL } from '$env/static/private'

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
   return request(VENDURE_API_URL, GetProducts, {
      options,
   }).then((data) => data.products.items)
}

export const getTopLevelCollections = async function() {
   const GetTopLevelCollections = gql(`
      query GetTopLevelCollections {
         collections(options: { topLevelOnly: true }) {
            items {
               id
               slug
               name
               featuredAsset {
                  id
                  preview
               }
            }
         }
      }
   `)
   return request(VENDURE_API_URL, GetTopLevelCollections).then((data) => data.collections.items)
}

export const getCollections = async function() {
   const GetCollections = gql(`
      query GetCollections {
         collections {
            items {
               id
               slug
               name
               featuredAsset {
                  id
                  preview
               }
            }
         }
      }
   `)
   return request(VENDURE_API_URL, GetCollections).then((data) => data.collections.items)
}

export const getCollection = async function(slug: string) {
   if (!slug) return []
   const GetCollection = gql(`
      query GetCollection($slug: String!) {
         collection(slug: $slug) {
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
   `)
   return request(VENDURE_API_URL, GetCollection, {
      slug,
   }).then((data) => data.collection)
}

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
               priceWithTax {
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
   return request(VENDURE_API_URL, GetCollectionProducts, {
      slug,
   }).then((data) => data.search.items)
}
