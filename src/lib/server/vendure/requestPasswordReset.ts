import { gql } from '$lib/generated'
import { query } from '.'

export const requestPasswordReset = async function(email: string) {
   const RequestPasswordReset = gql(`
      mutation RequestPasswordReset($emailAddress: String!) {
         requestPasswordReset(emailAddress: $emailAddress) {
            ... on Success {
               success
            }
            ... on ErrorResult {
               errorCode
               message
            }
         }
      }
   `)
   return await query({ document: RequestPasswordReset, variables: { emailAddress: email } })
   .then((response) => response?.json())
   .then((body) => body?.data?.requestPasswordReset)
   .catch((e: Error) => {
      console.log(e)
      return null
   })
}