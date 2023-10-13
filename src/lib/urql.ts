import { Client, cacheExchange, fetchExchange } from '@urql/svelte'

export default new Client({
  url: 'http://localhost:3000/shop-api',
  exchanges: [cacheExchange, fetchExchange],
})