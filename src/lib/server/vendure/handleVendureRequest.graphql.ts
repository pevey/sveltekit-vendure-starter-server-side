import type { RequestEvent } from '@sveltejs/kit'
import { getCustomer, getActiveOrder } from '.'

// this middleware function is called by src/hooks.server.ts or src/hooks.server.js
export const handleVendureRequest = async function(event:RequestEvent): Promise<RequestEvent> {
	event.locals.sid = event.cookies.get('sid') || ''
	event.locals.ssig = event.cookies.get('ssig') || ''
	if (!event.locals.sid && !event.locals.ssig) return event
	event.locals.user = await getCustomer(event.locals) 
	event.locals.cart = await getActiveOrder(event.locals, event.cookies)
	return event
}