import type { PageServerLoad, Actions } from './$types'
import { redirect } from '@sveltejs/kit'
import { message, superValidate } from 'sveltekit-superforms/server'
import { validateToken } from 'sveltekit-turnstile'
import { SECRET_TURNSTILE_KEY } from '$env/static/private'
import { signInReq, signUpReq, forgotReq, resetReq } from '$lib/saluna/validators'
import { signIn, signOut, signUp, resetPassword, requestPasswordReset } from '$lib/server/vendure'

export const load: PageServerLoad = async ({ locals, url }) => {

	// vendure token renamed to 'code' because of turnstile token
	const code = url.searchParams.get('token') || '' 
	const rurl = url.searchParams.get('rurl') || ''

	if (locals.user) throw redirect(302, `/${rurl}`)

	const signInForm = await superValidate(signInReq, { id: 'signIn' })
	const signUpForm = await superValidate(signUpReq, { id: 'signUp' })
	const forgotForm = await superValidate(forgotReq, { id: 'forgot' })
	const resetForm = await superValidate(resetReq, { id: 'reset' })

	return {
		code,
		rurl,
		signUpForm,
		signInForm,
		forgotForm,
		resetForm
	}
}

export const actions: Actions = {

	signIn: async ({ request, locals, cookies }) => {
		const form = await superValidate(request, signInReq, { id: 'signIn' })
		if (!form.valid) return message(form, 'Something went wrong', { status: 500}) // this shouldn't happen because of client-side validation
		if (!(await validateToken(form.data.token, SECRET_TURNSTILE_KEY))) return message(form, 'Bot defense', { status: 420 })
		const result = await signIn(locals, cookies, form.data.email.toLowerCase(), form.data.password)
		if (!result) {
			return message(form, 'The service is unavailable.', { status: 424 })
		} else if (result && result.id) {
			return message(form, 'success') // the form will redirect to rurl
		} else if (result && result.errorCode === 'NOT_VERIFIED_ERROR') {
			return message(form, 'Please verify your email address before signing in.', { status: 401 })
		} else {
			return message(form, 'A user with that email address was not found or the password was not valid.', { status: 401 })
		}
	},

	signUp: async ({ request, locals, cookies }) => {
		const form = await superValidate(request, signUpReq, { id: 'signUp' })
		if (!form.valid) return message(form, 'Something went wrong', { status: 500}) // this shouldn't happen because of client-side validation
		if (!(await validateToken(form.data.token, SECRET_TURNSTILE_KEY))) return message(form, 'Bot defense', { status: 420 })
		const result = await signUp(locals, cookies, {
			emailAddress: form.data.email.toLowerCase(),
			firstName: form.data.fname,
			lastName: form.data.lname,
			password: form.data.password,
		})
		if (!result) {
			return message(form, 'The service is unavailable.', { status: 424 })
		} else if (result && result.success) {
			return message(form, `Your account has been created. An email has been sent to ${form.data.email}.  To continue, please click the link in the email to verify your address.`)
		} else {
			return message(form, 'Something went wrong', { status: 500 })
		}
	},
	
	forgot: async ({ request }) => {
		const form = await superValidate(request, forgotReq, { id: 'forgot' })
		if (!form.valid) return message(form, 'Something went wrong', { status: 500}) // this shouldn't happen because of client-side validation
		if (!(await validateToken(form.data.token, SECRET_TURNSTILE_KEY))) return message(form, 'Bot defense', { status: 420 })
		const result = await requestPasswordReset(form.data.email)
		if (!result) {
			return message(form, 'The service is unavailable.', { status: 424 })
		} else if (result && result.success) {
			// return { form }
			return message(form, 'If an account with that email exists, a reset code has been sent to your email address.')
		} else {
			return message(form, 'Something went wrong', { status: 500 })
		}
	},
	
	reset: async ({ request }) => {
		const form = await superValidate(request, resetReq, { id: 'reset' })
		if (!form.valid) return message(form, 'Something went wrong', { status: 500}) // this shouldn't happen because of client-side validation
		if (!(await validateToken(form.data.token, SECRET_TURNSTILE_KEY))) return message(form, 'Bot defense', { status: 420 })
		const result = await resetPassword(form.data.code, form.data.password )
		if (!result) {
			return message(form, 'The service is unavailable.', { status: 424 })
		} else if (result && result.id) {
			return message(form, 'Your password has been reset. Please sign in.')
		} else {
			return message(form, 'Something went wrong', { status: 500 })
		}
	},

	signOut: async ({ locals, cookies}) => {
		await signOut(locals, cookies)
		throw redirect(302, '/auth')
	}
}