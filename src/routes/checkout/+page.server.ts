import type { PageServerLoad, Actions } from './$types'
import { fail, redirect } from '@sveltejs/kit'

export const load: PageServerLoad = async function ({ locals }) {
   //if (!locals.user) throw redirect(302, '/auth?rurl=checkout')
   if (!locals.cart) throw redirect(302, '/cart')
   return {
      defaultCurrency: locals.config.defaultCurrency,
      siteName: locals.config.site.siteName,
      turnstileKey: locals.config.turnstile.publicKey,
      stripeKey: locals.config.stripe.publicKey,
   }
}

export const actions: Actions = {
   default: async ({ locals, cookies }) => {
      //remove cookie first because customer has already paid for the cart
      cookies.set('cartid', '', {
         path: '/',
         maxAge: 0,
         sameSite: 'strict',
         httpOnly: true,
         secure: true
      })
      // locals.cartid = ''
      // const order = await medusa.completeCart(locals)
      // if (order) {
      //    return { success: true, order: order }
      // } else {
      //    return fail (400, { success: false })
      // }
   }
}