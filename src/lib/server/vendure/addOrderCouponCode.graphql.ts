import { gql } from '$lib/generated'
import { query } from '.'

export const addOrderCouponCode = async function(locals: App.Locals, couponCode: string) {
	const AddOrderCouponCode = gql(`
		mutation AddOrderCouponCode($couponCode: String!) {
			applyCouponCode(couponCode: $couponCode) {
				...ActiveOrder
				... on ErrorResult {
					errorCode
					message
				}
			}
		}
	`)
	return await query({ document: AddOrderCouponCode, variables: { couponCode }, locals })
		.then((response) => response?.json())
		.then((body) => body?.data?.activeOrder)
		.catch(() => { return null })
}