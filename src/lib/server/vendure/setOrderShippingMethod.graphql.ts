import { gql } from '$lib/generated'
import { query } from '.'

export const setOrderShippingMethod = async function(locals: App.Locals, id: number) {
	const SetOrderShippingMethod = gql(`
		mutation SetOrderShippingMethod($id: [ID!]!) {
			setOrderShippingMethod(shippingMethodId: $id) {
				...ActiveOrder
				...on ErrorResult {
					errorCode
					message
				}
			}
		}
	`)
	return await query({ document: SetOrderShippingMethod, variables: { id }, locals })
		.then((response) => response?.json())
		.then((body) => body?.data?.setOrderShippingMethod)
		.catch(() => { return null })
}