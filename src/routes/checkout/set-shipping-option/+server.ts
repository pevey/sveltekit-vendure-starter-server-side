import type { RequestHandler } from './$types'
import { setOrderShippingMethod } from '$lib/server/vendure'
import { error, json } from '@sveltejs/kit'

export const POST: RequestHandler = async ({ request, locals }) => {
	const { id } = await request.json()
	if (!id) { throw error(400, 'bad format') }
	const result = await setOrderShippingMethod(locals, id)
	if (result?.__typename === 'Order') {
		return json(result)
	} else {
		throw error(500, 'server error')
	}
}