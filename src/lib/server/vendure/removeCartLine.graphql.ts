import type { Cookies } from '@sveltejs/kit'
import { gql } from '$lib/generated'
import { query, parseAuthCookie } from '.'

export const removeCartLine = async function(locals: App.Locals, cookies: Cookies, orderLineId: string) {
	const RemoveCartLine = gql(`
		mutation RemoveItemFromOrder($orderLineId: ID!) {
			removeOrderLine(orderLineId: $orderLineId) {
				...ActiveOrder
				... on ErrorResult {
					errorCode
					message
				}
			}
		}
	`)
	const response = await query({ document: RemoveCartLine, variables: { orderLineId }, locals })
	if (!response) return null

	// Capture the credentials
	await parseAuthCookie(response.headers.getSetCookie(), locals, cookies)

	return await response.json()
		.then((body:any) => body?.data?.removeOrderLine)
		.catch((e: Error) => {
			console.log(e)
			return null
		})
}