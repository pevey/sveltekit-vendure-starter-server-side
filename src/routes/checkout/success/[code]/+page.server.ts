import type { PageServerLoad } from './$types'
import { getOrderByCode } from '$lib/server/vendure'

export const load: PageServerLoad = async function ({ locals, params }) {
   const code = params.code
   return {
      order: (code)? await getOrderByCode(locals, code) : null
   }
}