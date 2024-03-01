import type { Actions } from './$types'
import { setOrderState } from '$lib/server/vendure'
import { fail } from '@sveltejs/kit'

export const actions: Actions = {
	default: async ({ locals }) => {
		// if we get here, there was an error with the payment
		// set state back to 'AddingItems'
		if (await setOrderState(locals, 'AddingItems')) {
			return { success: true }
		} else {
			fail(400, { success: false })
		}
	}
}