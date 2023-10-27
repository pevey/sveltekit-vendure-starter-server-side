import { gql } from '$lib/generated'
import { query } from './'

export const removeOrderCouponCode = async function(locals: App.Locals, couponCode: string) {
   const RemoveOrderCouponCode = gql(`
      mutation RemoveOrderCouponCode($couponCode: String!) {
         removeCouponCode(couponCode: $couponCode) {
            ...ActiveOrder
         }
      }
   `)
   return await query({ document: RemoveOrderCouponCode, variables: { couponCode }, locals })
      .then((response) => response?.json())
      .then((body) => body?.data?.activeOrder)
      .catch(() => { return null })
}