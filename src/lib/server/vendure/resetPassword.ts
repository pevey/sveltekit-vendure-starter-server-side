import { gql } from '$lib/generated'
import { query } from './'

export const resetPassword = async function(token: string, password: string) {
   const ResetPassword = gql(`
      mutation ResetPassword($token: String! $password: String!) {
         resetPassword(token: $token password: $password) {
            ...on CurrentUser {
               id
               identifier
            }
            ... on ErrorResult {
               errorCode
               message
            }
         }
      }
   `)
   return await query({ document: ResetPassword, variables: { token, password } })
      .then((response) => response?.json())
      .then((body) => body?.data?.resetPassword)
      .catch((e: Error) => {
         console.log(e)
         return null
      })
}