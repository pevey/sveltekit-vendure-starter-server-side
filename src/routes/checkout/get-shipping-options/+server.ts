import type { RequestHandler } from './$types'
import { getOrderShippingMethods } from '$lib/server/vendure'
import { error, json } from '@sveltejs/kit'

export const GET: RequestHandler = async ({ request, locals }) => {
	const options = await getOrderShippingMethods(locals)
	if (options) {
		return json(options)
	} else { 
		throw error(500, 'server error')
	}
}