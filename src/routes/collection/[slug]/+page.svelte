<script lang="ts">
   import type { PageData } from './$types'
   import type { Collection } from '$lib/generated/graphql'
   import List from './List.svelte'
   export let data: PageData
   $: collection = data.collection as Collection
   $: products = data.products
</script>
<section class="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
   <h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">{collection.name}</h1>
   <img src={collection.featuredAsset?.preview} alt={collection.name} />
   <List {products} />
</section>
