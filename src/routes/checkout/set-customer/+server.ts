import type { RequestHandler } from './$types'
import type { CreateCustomerInput } from '$lib/generated/graphql'
import { setOrderCustomer } from '$lib/server/vendure'
import { error, json } from '@sveltejs/kit'

export const POST: RequestHandler = async ({ request, locals }) => {
   const customer: CreateCustomerInput = await request.json().catch(e => null)
   if (!customer) { throw error(400, 'bad format') }
   if (await setOrderCustomer(locals, customer)) {
      return json({ success: true })
   } else {
      throw error(500, 'server error')
   }
}