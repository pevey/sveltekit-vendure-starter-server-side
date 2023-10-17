import { gql } from '$lib/generated'
import { query } from './'

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
   .then((data) => data?.collections?.items)
   .catch(() => { return null })
}