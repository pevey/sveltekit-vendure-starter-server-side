import { gql } from '$lib/generated'
import { query } from './'
import type { CreateCustomerInput } from '$lib/generated/graphql'

export const setOrderCustomer = async function(locals: App.Locals, input: CreateCustomerInput) {
   const SetOrderCustomer = gql(`
      mutation SetCustomerForOrder($input: CreateCustomerInput!) {
         setCustomerForOrder(input: $input) {
            ...on ErrorResult {
               errorCode
               message
            }
         }
      }
   `)
   return await query({ document: SetOrderCustomer, variables: { input }, locals })
   .then((response) => response?.json())
   .then((body) => body?.data?.setCustomerForOrder)
   .catch(() => { return null })
}