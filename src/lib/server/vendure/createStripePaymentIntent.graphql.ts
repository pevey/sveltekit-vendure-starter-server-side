import { gql } from '$lib/generated'
import { query } from '.'

export const createStripePaymentIntent = async function(locals: App.Locals) {
	const CreateStripePaymentIntent = gql(`
		mutation CreateStripePaymentIntent {
			createStripePaymentIntent
		}
	`)
	return await query({ document: CreateStripePaymentIntent, locals })
		.then((response) => response?.json())
		.then((body) => body?.data?.createStripePaymentIntent)
		.catch(() => { return null })
}