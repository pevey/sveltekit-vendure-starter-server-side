<script lang="ts">
   import type { Product, Collection } from '$lib/generated/graphql'
   import type { PageData } from './$types'
   export let data: PageData
   //$: featuredCollection = data.collection as Collection
   $: featuredProducts = data.products as Product[] // temporarily, this is just the first 3 products found
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

{#each featuredProducts as product}
   <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>{product.slug}</p>
      <p><img src={product.featuredAsset?.preview} /></p>
      <p>{product.id}</p>
   </div>
{:else}
    No products found
{/each}

