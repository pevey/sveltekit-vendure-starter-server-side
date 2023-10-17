import type { Cookies, RequestEvent } from '@sveltejs/kit'
import { SuperFetch } from 'sveltekit-superfetch'
import { print, type ASTNode } from 'graphql'
import type { ProductListOptions } from '$lib/generated/graphql'
import { gql } from '$lib/generated'
import { VENDURE_API_URL } from '$env/static/private'

const superFetch = new SuperFetch({
   retry: 3,
   timeout: 5000,
   ttl: 1000,
   // logLevel: 'silent'
})

interface QueryOptions {
   document: ASTNode
   variables?: any
   cookies?: Cookies
   locals?: App.Locals
}

const query = async function(options: QueryOptions) {
   const { cookies, locals, document, variables } = options
   return await superFetch.query({
      url: VENDURE_API_URL,
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         // 'X-Vendure-Auth-Token': locals.authToken,
      },
      body: JSON.stringify({
         query: print(document),
         variables,
      })
   }).catch((e: Error) => {
      // console.log(e)
      return null
   })
}

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
   return await query({ document: GetTopLevelCollections })
   .then((response) => response?.json())
   .then((body) => body?.data?.collections?.items)
   .catch(() => { return null })
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
   return await query({ document: GetCollections })
   .then((response) => response?.json())
   .then((body) => body?.data?.collections?.items)
   .catch(() => { return null })
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
   return await query({ document: GetCollection, variables: { slug } })
   .then((response) => response?.json())
   .then((body) => body?.data?.collection)
   .catch(() => { return null })
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
   return await query({ document: GetCollectionProducts , variables: { slug } })
   .then((response) => response?.json())
   .then((body) => body?.data?.search?.items)
   .catch(() => { return null })
}

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

export const addToCart = async function(locals: any, cookies: any, variantId: string, quantity: number) {
   const AddItemToOrder = gql(`
      mutation AddItemToOrder($variantId: ID!, $quantity: Int!) {
         addItemToOrder(productVariantId: $variantId, quantity: $quantity) {
            __typename
            ...UpdatedOrder
            ... on ErrorResult {
               errorCode
               message
            }
            ... on InsufficientStockError {
               quantityAvailable
               order {
                  ...UpdatedOrder
               }
            }
         }
      }
      fragment UpdatedOrder on Order {
         id
         code
         state
         totalQuantity
         totalWithTax
         currencyCode
         lines {
            id
            unitPriceWithTax
            quantity
            linePriceWithTax
            productVariant {
               id
               name
            }
         }
      }
   `)
   const response = await fetch(VENDURE_API_URL, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         // 'X-Vendure-Auth-Token': locals.authToken,
      },
      body: JSON.stringify({
         query: print(AddItemToOrder),
         variables: {
            variantId,
            quantity,
         },
      }),
   })
   const cookieList = response.headers.getSetCookie()
   console.log(cookieList)
   console.log(response.headers)
   console.log(response.headers.get('vendure-auth-token'))
   return response.json()
   // return request(VENDURE_API_URL, AddItemToOrder, {
   //    variantId,
   //    quantity,
   // }).then((data) => data.addItemToOrder)
}