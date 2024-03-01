import { SuperFetch } from 'sveltekit-superfetch'
import { print, type ASTNode } from 'graphql'
import { dev } from '$app/environment'
import {  
	VENDURE_SHOPAPI_DEV_URL,
	VENDURE_SHOPAPI_PROD_URL,
	// CLOUDFLARE_ACCESS_ID,
	// CLOUDFLARE_ACCESS_SECRET
} from '$env/static/private'

export const superFetch = new SuperFetch({
	retry: 3,
	timeout: 5000,
	ttl: 1000,
	logLevel: 'silent'
})

interface QueryOptions {
	document: ASTNode
	variables?: any
	locals?: App.Locals
	key?: string
	ttl?: number
	revalidate?: boolean
	logLevel?: 'verbose' | 'limited' | 'silent'
}

// sends the graphql query and returns the raw response
export const query = async function(options: QueryOptions): Promise<Response|null> {
	const { locals, document, variables, ...rest } = options

	const headers = new Headers({ 'Content-Type': 'application/json' })
	// if (CLOUDFLARE_ACCESS_ID && CLOUDFLARE_ACCESS_SECRET) {
	// 	headers.append('CF-Access-Client-Id', CLOUDFLARE_ACCESS_ID)
	// 	headers.append('CF-Access-Client-Secret', CLOUDFLARE_ACCESS_SECRET)
	// }
	if (locals && locals.sid && locals.ssig) {
		headers.append('Cookie', `session=${locals.sid}; session.sig=${locals.ssig}`)
	}

	return await superFetch.query({
		url: dev? VENDURE_SHOPAPI_DEV_URL : VENDURE_SHOPAPI_PROD_URL,
		method: 'POST',
		headers,
		body: JSON.stringify({
			query: print(document),
			variables
		}),
		...rest
	}).catch((e: Error) => {
		console.log(e)
		return null
	})
}

export { addCartLine } from './addCartLine.graphql'
export { addOrderCouponCode } from './addOrderCouponCode.graphql'
export { addOrderPayment } from './addOrderPayment.graphql'
export { createCustomerAddress } from './createCustomerAddress.graphql'
export { createStripePaymentIntent } from './createStripePaymentIntent.graphql'
export { getActiveOrder } from './getActiveOrder.graphql'
export { getCollection } from './getCollection.graphql'
export { getCollectionProducts } from './getCollectionProducts.graphql'
export { getCollections } from './getCollections.graphql'
export { getCustomer } from './getCustomer.graphql'
export { getCustomerAddresses } from './getCustomerAddresses.graphql'
// export { getCustomerOrders } from './getCustomerOrders.graphql'
export { getOrderByCode } from './getOrderByCode.graphql'
export { getOrderPaymentMethods } from './getOrderPaymentMethods.graphql'
export { getOrderShippingMethods } from './getOrderShippingMethods.graphql'
export { getProduct } from './getProduct.graphql'
export { getProducts } from './getProducts.graphql'
export { getTopLevelCollections } from './getTopLevelCollections.graphql'
export { handleVendureRequest } from './handleVendureRequest.graphql'
export { parseAuthCookie } from './parseAuthCookie.graphql'
export { parseAuthHeader } from './parseAuthHeader.graphql'
export { removeCartLine } from './removeCartLine.graphql'
export { removeOrderCouponCode } from './removeOrderCouponCode.graphql'
export { requestPasswordReset } from './requestPasswordReset.graphql'
export { resetPassword } from './resetPassword.graphql'
export { searchProducts } from './searchProducts.graphql'
export { setOrderCustomer } from './setOrderCustomer.graphql'
export { setOrderShippingAddress } from './setOrderShippingAddress.graphql'
export { setOrderShippingMethod } from './setOrderShippingMethod.graphql'
export { setOrderState } from './setOrderState.graphql'
export { signIn } from './signIn.graphql'
export { signOut } from './signOut.graphql'
export { signUp } from './signUp.graphql'
export { updateCartLine } from './updateCartLine.graphql'
export { verifyEmail } from './verifyEmail.graphql'
