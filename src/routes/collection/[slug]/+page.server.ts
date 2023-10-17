import type { PageServerLoad } from './$types'
import { getCollection, getCollectionProducts } from '$lib/server/vendure'

export const load = (async function ({ params }) {
   return {
      collection: await getCollection(params.slug),
      products: await getCollectionProducts(params.slug)
   }
}) satisfies PageServerLoad
