import type { PageServerLoad, Actions } from './$types'
// import medusa from '$lib/server/medusa'
import { searchProducts } from '$lib/server/vendure'
import { fail } from '@sveltejs/kit'

export const load: PageServerLoad = async function ({ url }) {
   const q = url.searchParams?.get('q')
   const hits = q? await searchProducts({ term: q, take: 10, skip: 0, groupByProduct: true }): null
   return { 
      hits
   }
}

export const actions: Actions = {
   search: async ({ request }) => {
      const data = await request.formData()
      const q = data.get('q') as string
      if (!q) { return fail(400, { q, missing: true }) }
      return { 
         success: true, 
         hits: await searchProducts({ term: q, take: 10, skip: 0, groupByProduct: true })
      }
   }
}