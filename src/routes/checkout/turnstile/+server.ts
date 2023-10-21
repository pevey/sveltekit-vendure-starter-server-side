import type { RequestHandler } from './$types'
import { validateToken } from 'sveltekit-turnstile'
import { error, json } from '@sveltejs/kit'
import { getCustomerAddresses, getOrderPaymentMethods, createStripePaymentIntent } from '$lib/server/vendure'

export const POST: RequestHandler = async ({ request, locals }) => {
   const data = await request.json()
   let token = data.token as string
	if (!await validateToken(token, locals.config.turnstile.privateKey)) {
      throw error(420, { message: 'Bot risk' })
   }

   // combine these in promise.all
   const addresses = locals.user? await getCustomerAddresses(locals) : []
   const contacts = getContacts(addresses)
   const paymentOptions = await getOrderPaymentMethods(locals)
   const paymentIntent = await createStripePaymentIntent(locals)

	return json({ contacts, paymentOptions, paymentIntent })
}

function getContacts(addresses: any[]) {
   console.log(addresses)
   let contacts = []
   for (let address of addresses) {
      contacts.push({
         name: address.first_name + ' ' + address.last_name,
         address: {
            line1: address.address_1,
            line2: address.address_2,
            city: address.city,
            state: address.province,
            postal_code: address.postal_code,
            country: address.country_code.toUpperCase(),
         }
      })
   }
   return contacts
}