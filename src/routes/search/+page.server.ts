import type { PageServerLoad, Actions } from './$types'
// import medusa from '$lib/server/medusa'
import { searchProducts } from '$lib/server/vendure'
import { fail } from '@sveltejs/kit'

export const load: PageServerLoad = async function ({ url }) {
   const q = url.searchParams?.get('q')
   // let hits = q? await medusa.getSearchResults(q) : null
   const hits = q? [{id: '1', title: 'test'}] : null

   return { 
      hits
   }
}

export const actions: Actions = {
   search: async ({ request }) => {
      const data = await request.formData()
      const q = data.get('q') as string
      if (!q) { return fail(400, { q, missing: true }) }
      // const hits = await medusa.getSearchResults(q)
console.log('search', q)
const hits = [{id: '1', title: 'test'}]

      return { 
         success: true, 
         hits 
      }
   }
}