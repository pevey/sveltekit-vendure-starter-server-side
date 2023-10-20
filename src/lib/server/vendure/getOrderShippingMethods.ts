import { gql } from '$lib/generated'
import { query } from './'

export const getOrderShippingMethods = async function() {
   const GetOrderShippingMethods = gql(`
      query GetOrderShippingMethods {
         eligibleShippingMethods {
            id
            price
            description
         }
      }
   `)
   return await query({ document: GetOrderShippingMethods })
      .then((response) => response?.json())
      .then((body) => body?.data?.eligibleShippingMethods)
      .catch(() => { return null })
}