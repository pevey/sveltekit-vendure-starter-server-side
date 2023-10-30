import type { RequestHandler } from './$types'
import { createCustomerAddress } from '$lib/server/vendure'
import { error, json } from '@sveltejs/kit'

export const POST: RequestHandler = async ({ request, locals }) => {
   const address = await request.json()
   if (!address) { throw error(400, 'bad format') }
   if (await createCustomerAddress(locals, address)) {
      return json({ success: true })
   } else {
      throw error(500, 'server error')
   }
}