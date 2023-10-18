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
   // console.log('here')

   // const response = await query({ document: GetCustomer, locals })
   // console.log(response)
   // const body = await response?.json()
   // console.log(body)

   return await query({ document: GetCustomer, locals })
   .then((response) => response?.json())
   .then((body) => body?.data?.activeCustomer)
   .catch(() => { return null })
}