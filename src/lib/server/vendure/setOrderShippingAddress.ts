import { gql } from '$lib/generated'
import { query } from './'
import type { CreateAddressInput } from '$lib/generated/graphql'

export const setOrderShippingAddress = async function(locals: App.Locals, input: CreateAddressInput) {
   const SetOrderShippingAddress = gql(`
      mutation SetOrderShippingAddress($input: CreateAddressInput!) {
            setOrderShippingAddress(input: $input) {
            ...on ErrorResult {
               errorCode
               message
            }
         }
      }
   `)
   const response = await query({ document: SetOrderShippingAddress, variables: { input }, locals })
      .catch(() => { return null })
   return response?.ok
}