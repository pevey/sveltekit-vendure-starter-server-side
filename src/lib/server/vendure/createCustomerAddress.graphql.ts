import { gql } from '$lib/generated'
import type { CreateAddressInput } from '$lib/generated/graphql'
import { query } from '.'

export const createCustomerAddress = async function(locals: App.Locals, address: CreateAddressInput) {
	const CreateCustomerAddress = gql(`
		mutation CreateCustomerAddress($input: CreateAddressInput!) {
			createCustomerAddress(input: $input) {
				id
				fullName
				company
				streetLine1
				streetLine2
				city
				province
				postalCode
				country {
					id
					code
					name
				}
				phoneNumber
				defaultShippingAddress
				defaultBillingAddress
			}
		}
	`)
	return await query({ document: CreateCustomerAddress, locals })
		.then((response) => response?.json())
		.then((body) => body?.data?.createCustomerAddress)
		.catch(() => { return null })
}