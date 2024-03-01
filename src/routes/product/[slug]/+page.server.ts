import type { PageServerLoad, Actions } from './$types'
import { validateToken } from 'sveltekit-turnstile'
import { message, superValidate } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'
import { getProduct } from '$lib/server/vendure'
import { addReviewReq } from '$lib/validators'
import { SECRET_TURNSTILE_KEY } from '$env/static/private'

export const load = (async function ({ params }) {
	return {
		product: await getProduct(params.slug),
		reviewForm: await superValidate(zod(addReviewReq), { id: 'review' })
	}
}) satisfies PageServerLoad

export const actions: Actions = {
	addReview: async ({ request, locals }) => {
		const form = await superValidate(request, zod(addReviewReq), { id: 'review' })
		if (!locals.user) return message(form, 'You must be signed in to add a review', { status: 401 })
		if (!form.valid) return message(form, 'Something went wrong', { status: 500 })
		if (!(await validateToken(form.data.token, SECRET_TURNSTILE_KEY))) return message(form, 'Something went wrong', { status: 400 })
		const review = {
			product_id: form.data.productId,
			display_name: form.data.displayName,
			content: form.data.content,
			rating: form.data.rating
		}
		// const success = await medusa.addReview(locals, review)
const success = true
		if (success) return message(form, 'Thank you for your review.')
		else return message(form, 'Something went wrong', { status: 500 })
	}
}