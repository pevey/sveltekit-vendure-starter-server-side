<script lang="ts">
   import type { PageData } from './$types'
   import type { Collection } from '$lib/generated/graphql'
   import VendureAsset from '$lib/saluna/VendureAsset.svelte'
   import ProductList from '$lib/saluna/ProductList.svelte'
   export let data: PageData
   $: collection = data.collection as Collection
   $: products = data.products
console.log(data.products)
</script>
<section class="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
   <h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">{collection.name}</h1>
   <VendureAsset preview={collection.featuredAsset?.preview} preset="large" alt={collection.name} class="w-full rounded-md"/>
   <ProductList {products} />
</section>
