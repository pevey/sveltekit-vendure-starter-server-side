import type { Actions } from './$types'
import { addToCart, removeFromCart, updateCart } from '$lib/server/vendure'

export const actions: Actions = {
   add: async ({ request, locals, cookies }) => {
      const data = await request.formData()
      if (!data.get('variantId')) return { success: false }
      const variantId = data.get('variantId') as string
      const cart = await addToCart(locals, cookies, variantId, 1)
      if (cart) return { success: true, cart }
   },
   remove: async({ request, locals, cookies }) => {
      const data = await request.formData()
      const orderLineId = data.get('orderLineId') as string
      if (!orderLineId) return { success: false }
      const cart = await removeFromCart(locals, cookies, orderLineId)
      if (cart) return { success: true, cart }
   },
   update: async({ request, locals, cookies }) => {
      const data = await request.formData()
      const orderLineId = data.get('orderLineId') as string
      const quantity = parseInt(data.get('quantity') as string)
      if (!orderLineId || !quantity) return { success: false }
      if (quantity === 0) { 
         const cart = await removeFromCart(locals, cookies, orderLineId)
         if (cart) return { success: true, cart }
      } else if (quantity > 0 && quantity < 12) {
         const cart = await updateCart(locals, cookies, orderLineId, quantity)
         if (cart) return { success: true, cart }
      }
   }
}