import type { RequestHandler } from './$types'
import { setOrderState } from '$lib/server/vendure'
import { error, json } from '@sveltejs/kit'

export const POST: RequestHandler = async ({ request, locals }) => {
   const { state } = await request.json()
   if (!state) { throw error(400, 'bad format') }
   const result = await setOrderState(locals, state)
   if (result?.__typename === 'Order') {
      return json(result)
   } else {
      throw error(500, 'server error')
   }
}