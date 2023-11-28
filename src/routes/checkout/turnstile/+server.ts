import type { RequestHandler } from './$types'
import { validateToken } from 'sveltekit-turnstile'
import { error, json } from '@sveltejs/kit'
import { createStripePaymentIntent } from '$lib/server/vendure'

export const POST: RequestHandler = async ({ request, locals }) => {
	const data = await request.json()
	let token = data.token as string
	if (!await validateToken(token, locals.config.turnstile.privateKey)) {
		throw error(420, { message: 'Bot risk' })
	}
	const clientSecret = await createStripePaymentIntent(locals)
	return json({ clientSecret })
}