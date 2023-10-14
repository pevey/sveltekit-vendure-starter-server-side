import request from 'graphql-request'
import { gql } from '$lib/gql'

export type VendureOptions = {
   url: string
}

class Vendure {
   private readonly options: VendureOptions

   constructor(options: VendureOptions) {
      this.options = options
   }

   async getProducts(): Promise<any> {
      const GetProducts = gql(`
         query GetProducts($options: ProductListOptions) {
            products(options: $options) {
               totalItems
               items {
                  id
                  name
                  slug
                  description
                  featuredAsset {
                     id
                     preview
                  }
               }
            }
         }
      `)
      return request('http://localhost:3000/shop-api', GetProducts, {
         options: { take: 3 },
      }).then((data) => data.products.items)
   }
}

export default new Vendure({url: 'http://localhost:3000/shop-api'})
