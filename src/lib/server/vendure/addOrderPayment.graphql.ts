import { gql } from '$lib/generated'
import { query } from '.'
import type { PaymentInput } from '$lib/generated/graphql'

export const addOrderPayment = async function(locals: App.Locals, input: PaymentInput) {
	const AddOrderPayment = gql(`
		mutation AddOrderPayment($input: PaymentInput!) {
			addPaymentToOrder(input: $input) {
				...ActiveOrder
				...on ErrorResult {
					errorCode
					message
				}
			}
		}
	`)
	return await query({ document: AddOrderPayment, variables: { input }, locals })
		.then((response) => response?.json())
		.then((body) => body?.data?.addPaymentToOrder)
		.catch(() => { return null })
}