import type { PageServerLoad } from './$types'
import { getProducts } from '$lib/server/vendure'

export const load = (async () => {
   return {
      products: await getProducts({ take: 3})
   }
}) satisfies PageServerLoad