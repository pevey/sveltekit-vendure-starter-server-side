import type { RequestHandler } from './$types'
import { json } from '@sveltejs/kit'
import { getCustomerAddresses, getOrderPaymentMethods } from '$lib/server/vendure'

export const POST: RequestHandler = async ({ locals }) => {
   const promises = Promise.all([
      getCustomerAddresses(locals),
      getOrderPaymentMethods(locals),
   ])
	const [addresses, paymentOptions] = await promises
   const contacts = getContacts(addresses)
	return json({ contacts, paymentOptions })
}

function getContacts(addresses: any[] = []) {
   let contacts = []
   for (let address of addresses) {
      contacts.push({
         name: address.fullName,
         address: {
            line1: address.streeLine1,
            line2: address.streetLine2,
            city: address.city,
            state: address.province,
            postal_code: address.postalCode,
            country: address.country.toUpperCase(),
         }
      })
   }
   return contacts
}