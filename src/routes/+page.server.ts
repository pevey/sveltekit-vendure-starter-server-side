import type { PageServerLoad } from './$types'
import vendure from '$lib/server/vendure'

export const load = (async () => {
   return {
      products: await vendure.getProducts()
   }
}) satisfies PageServerLoad