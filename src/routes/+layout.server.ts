import type { LayoutServerLoad } from './$types'
import { getTopLevelCollections } from '$lib/vendure'

// const c = await getTopLevelCollections()
// console.log(c)

export const load: LayoutServerLoad = async function ({ locals }) {
   return {
      collections: await getTopLevelCollections(),
      // locals.user and locals.cart are set in hooks.server.js
      user: locals.user, 
      cart: locals.cart 
   }
}