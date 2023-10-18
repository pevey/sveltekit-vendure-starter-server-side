import type { PageServerLoad, Actions } from './$types'
import { redirect } from '@sveltejs/kit'
import { message, superValidate } from 'sveltekit-superforms/server'
import { validateToken } from 'sveltekit-turnstile'
import { SECRET_TURNSTILE_KEY } from '$env/static/private'
import { signInReq, signUpReq, forgotReq, resetReq } from './validators'
import { signIn, signOut, signUp, resetPassword, requestPasswordReset } from '$lib/server/vendure'

export const load: PageServerLoad = async ({ locals, url }) => {
   // vendure token renamed to code so as to not conflict with cf token
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
      if (result && result.id) {
   		//throw redirect(302, `/${form.data.rurl}`) // make sure you don't throw inside a try/catch block!
         return { form }
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
      const success = await signUp(locals, cookies, {
         emailAddress: form.data.email.toLowerCase(),
         firstName: form.data.fname,
         lastName: form.data.lname,
         password: form.data.password,
      })
      // throw redirect(302, `/${form.data.rurl}`)
      if (success) return { form }
      else return message(form, 'Something went wrong', { status: 500 })
   },
   
   forgot: async ({ request }) => {
      const form = await superValidate(request, forgotReq, { id: 'forgot' })
      if (!form.valid) return message(form, 'Something went wrong', { status: 500}) // this shouldn't happen because of client-side validation
      if (!(await validateToken(form.data.token, SECRET_TURNSTILE_KEY))) return message(form, 'Bot defense', { status: 420 })
      const success = await requestPasswordReset(form.data.email)
      if (success) return { form }
      else return message(form, 'Something went wrong', { status: 500 })
   },
   
   reset: async ({ request }) => {
      const form = await superValidate(request, resetReq, { id: 'reset' })
      if (!form.valid) return message(form, 'Something went wrong', { status: 500}) // this shouldn't happen because of client-side validation
      if (!(await validateToken(form.data.token, SECRET_TURNSTILE_KEY))) return message(form, 'Bot defense', { status: 420 })
      const success = await resetPassword(form.data.code, form.data.password )
      if (success) return { form }
      else return message(form, 'Something went wrong', { status: 500 })
   },

   signout: async ({ locals, cookies }) => {
      signOut(locals, cookies)
		throw redirect(302, '/')
   }
}