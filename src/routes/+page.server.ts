import type { PageServerLoad } from './$types'
import request from 'graphql-request'
import { gql } from '$lib/gql'

const GET_PRODUCTS = gql(`
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

// const products = request('http://localhost:3000/shop-api', GET_PRODUCTS, {
//    options: { take: 3 },
// }).then((data) => data.products.items)

export const load = (async () => {
   return {
      products: request('http://localhost:3000/shop-api', GET_PRODUCTS, {
            options: { take: 3 },
         }).then((data) => data.products.items)
   }
}) satisfies PageServerLoad