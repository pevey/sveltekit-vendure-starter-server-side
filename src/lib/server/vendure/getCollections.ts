import { gql } from '$lib/generated'
import { query } from './'

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