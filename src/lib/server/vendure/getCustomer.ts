import { gql } from '$lib/generated'
import { query } from './'

export const getCustomer = async function(locals: App.Locals) {
   const GetCustomer = gql(`
      query GetCustomer {
         activeCustomer {
            id
            title
            firstName
            lastName
            emailAddress
         }
      }
   `)
   return await query({ document: GetCustomer, locals })
   .then((data) => data?.activeCustomer)
   .catch(() => { return null })
}