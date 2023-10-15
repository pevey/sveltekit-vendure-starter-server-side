import type { LayoutServerLoad } from './$types'
import { getTopLevelCollections } from '$lib/vendure'

export const load: LayoutServerLoad = async function ({ locals }) {
   return {
      collections: await getTopLevelCollections(),
      // locals.user and locals.cart are set in hooks.server.js
      user: locals.user, 
      cart: locals.cart 
   }
}