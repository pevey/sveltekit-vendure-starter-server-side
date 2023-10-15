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