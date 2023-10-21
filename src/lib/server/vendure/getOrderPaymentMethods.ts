import { gql } from '$lib/generated'
import { query } from './'

export const getOrderPaymentMethods = async function(locals: App.Locals) {
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
   return await query({ document: GetOrderPaymentMethods, locals })
      .then((response) => response?.json())
      .then((body) => body?.data?.eligiblePaymentMethods)
      .catch(() => { return null })
}