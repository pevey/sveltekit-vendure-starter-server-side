import type { Cookies } from '@sveltejs/kit'
import type { RegisterCustomerInput } from '$lib/generated/graphql'
import { gql } from '$lib/generated'
import { query, parseAuthCookie } from './'
import { VENDURE_REQUIRE_VERIFICATION } from '$env/static/private'

export const signUp = async function(locals: any, cookies: Cookies, input: RegisterCustomerInput) {
   const SignUp = gql(`
      mutation Register($input: RegisterCustomerInput!) {
         registerCustomerAccount(input: $input) {
            ... on Success {
               success
            }
            ...on ErrorResult {
               errorCode
               message
            }
         }
      }
   `)
   const response = await query({ document: SignUp, variables: { input }, locals })
   if (!response) return null
console.log(response)

   if (!VENDURE_REQUIRE_VERIFICATION) {
      // Capture the credentials
      await parseAuthCookie(response.headers.getSetCookie(), locals, cookies)
   }

   return await response.json()
   .then((body:any) => body?.data?.registerCustomerAccount)
   .catch((e: Error) => {
      console.log(e)
      return null
   })
}