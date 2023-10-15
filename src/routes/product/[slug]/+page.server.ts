import type { PageServerLoad } from './$types'
import { getProduct } from '$lib/vendure'
export const load = (async function ({ params }) {
   return {
      product: await getProduct(params.slug)
   }
}) satisfies PageServerLoad