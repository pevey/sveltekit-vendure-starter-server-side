import type { Cookies } from '@sveltejs/kit'
import { gql } from '$lib/generated'
import { query } from './'

export const signOut = async function(locals: any, cookies: Cookies) {
   const SignOut = gql(`
      mutation LogOut {
         logout {
            success
         }
      }
   `)
   const success = await query({ document: SignOut, locals })
   .then((response) => response?.json())
   .then((body) => body?.data?.logout)
   .catch((e: Error) => {
      console.log(e)
      return null
   })
   cookies.set('sid', '', { path: '/', maxAge: 0 })
   cookies.set('ssig', '', { path: '/', maxAge: 0 })
   locals.sid = ''
   locals.ssig = ''
   return success
}