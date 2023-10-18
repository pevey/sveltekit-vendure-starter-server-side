import type { PageServerLoad } from './$types'
import { verifyEmail } from '$lib/server/vendure'

export const load: PageServerLoad = async ({ url, locals, cookies }) => {
   // vendure token renamed to code so as to not conflict with cf token if used
	const code = url.searchParams.get('token') || '' 
   const success = await verifyEmail(locals, cookies, code)
   return {
      success,
      code
   }
}