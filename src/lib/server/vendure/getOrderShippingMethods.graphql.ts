import { gql } from '$lib/generated'
import { query } from '.'

export const getOrderShippingMethods = async function(locals: App.Locals) {
	const GetOrderShippingMethods = gql(`
		query GetOrderShippingMethods {
			eligibleShippingMethods {
				id
				code
				name
				price
				description
			}
		}
	`)
	return await query({ document: GetOrderShippingMethods, locals })
		.then((response) => response?.json())
		.then((body) => body?.data?.eligibleShippingMethods)
		.catch(() => { return null })
}