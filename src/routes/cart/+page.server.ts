import type { PageServerLoad, Actions } from './$types'
import { addToCart } from '$lib/server/vendure'

export const actions: Actions = {

   add: async ({ request, locals, cookies }) => {
      const data = await request.formData()
      if (!data.get('variantId')) return { success: false }
      const variantId = data.get('variantId') as string
      const cart = await addToCart(locals, cookies, variantId, 1)
console.log(cart)
      if (cart) return { success: true, cart }
   },

   // remove: async({ request, locals }) => {
   //    const data = await request.formData()
   //    const itemId = data.get('itemId') as string
   //    const cart = await removeFromCart(locals, itemId)
   //    if (cart) return { success: true, cart }
   // },

   // update: async({ request, locals }) => {
   //    const data = await request.formData()
   //    const itemId = data.get('itemId') as string
   //    const quantity = parseInt(data.get('quantity') as string)
   //    if (quantity === 0) { 
   //       const cart = await removeFromCart(locals, itemId)
   //       if (cart) return { success: true, cart }
   //    } else if (quantity > 0 && quantity < 12) {
   //       const cart = await updateCart(locals, itemId, quantity)
   //       if (cart) return { success: true, cart }
   //    }
   // }
}