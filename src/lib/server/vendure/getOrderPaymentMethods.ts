import { gql } from '$lib/generated'
import { query } from './'

export const getOrderPaymentMethods = async function() {
   const GetOrderPaymentMethods = gql(`
      query GetOrderPaymentMethods {
         eligiblePaymentMethods {
            id
            name
            code
            isEligible
         }
      }
   `)
   return await query({ document: GetOrderPaymentMethods })
      .then((response) => response?.json())
      .then((body) => body?.data?.eligiblePaymentMethods)
      .catch(() => { return null })
}