import type { PageServerLoad } from './$types'
import { getProducts } from '$lib/vendure'

export const load = (async () => {
   return {
      products: await getProducts({ take: 3})
   }
}) satisfies PageServerLoad