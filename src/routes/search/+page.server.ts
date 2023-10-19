import type { PageServerLoad, Actions } from './$types'
import type { SearchResult } from '$lib/generated/graphql'
import { searchProducts } from '$lib/server/vendure'
import { fail } from '@sveltejs/kit'

export const load: PageServerLoad = async function ({ url }) {
   const q: string|null = url.searchParams?.get('q')
   const hits: SearchResult[]|null = q? await searchProducts({ term: q, take: 10, skip: 0, groupByProduct: true }) : null
   return { 
      hits
   }
}

export const actions: Actions = {
   search: async ({ request }) => {
      const data: FormData = await request.formData()
      const q = (data.get('q') as string).substring(0, 30)
      if (!q) { return fail(400, { q, missing: true }) }
      return { 
         success: true, 
         hits: await searchProducts({ term: q, take: 10, skip: 0, groupByProduct: true }) as SearchResult[]
      }
   }
}