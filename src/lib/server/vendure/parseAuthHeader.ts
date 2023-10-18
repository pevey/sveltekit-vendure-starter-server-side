import type { Cookies } from '@sveltejs/kit'

export const parseAuthHeader = async function(headers: Headers, locals:App.Locals, cookies:Cookies) {
   // Parses the auth header returned in a response from Vendure
   if (!headers) return false
   try {
      let token = headers.get('vendure-auth-token')
      if (token) {
         locals.token = token
         cookies.set('token', token, {
            path: '/',
            maxAge: 1000 * 60 * 60 * 24 * 365,
            sameSite: 'strict',
            httpOnly: true,
            secure: true
         })
         return true
      }
   } catch (e) {
      console.log(e)
      return false
   }
}