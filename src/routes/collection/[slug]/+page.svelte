<script lang="ts">
	import type { PageData } from './$types'
	import type { Collection } from '$lib/generated/graphql'
	import VendureAsset from '$lib/saluna/VendureAsset.svelte'
	import ProductList from '$lib/saluna/ProductList.svelte'
	import MetaTags from '$lib/saluna/MetaTags.svelte'
	export let data: PageData
	$: collection = data.collection as Collection
	$: products = data.products
</script>
<MetaTags title={collection.name} description={collection.description} />
<section class="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
	<h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 my-4 sm:my-6">{collection.name}</h1>
	<section class="relative hidden sm:block sm:h-80 lg:h-96 w-full mb-8 sm:mb-16">
		<VendureAsset preview={collection.featuredAsset?.preview} preset="large" alt={collection.name} class="absolute object-cover w-full h-full rounded-md"/>
		<div class="absolute inset-0 bg-black/30 flex items-center justify-center rounded-md">
			<h1 class="text-3xl font-bold text-white">{collection.name}</h1>
		</div>
	</section>
	<ProductList {products} />
</section>
