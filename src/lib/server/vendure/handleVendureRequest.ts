import type { RequestEvent } from '@sveltejs/kit'
import { getCustomer, getCart } from './'

export const handleVendureRequest = async function(event:RequestEvent): Promise<RequestEvent> {
   // this middleware function is called by src/hooks.server.ts or src/hooks.server.js

   event.locals.sid = event.cookies.get('sid') || ''
   event.locals.token = event.cookies.get('token') || '' // change this to local storage
   event.locals.ssig = event.cookies.get('ssig') || ''
   if (!event.locals.sid && !event.locals.token) return event

   event.locals.user = await getCustomer(event.locals) 
   event.locals.cart = await getCart(event.locals)
   
console.log(event.locals)
   return event
}