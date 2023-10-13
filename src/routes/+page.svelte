<script lang="ts">
   import type { PageData } from './$types'
   export let data: PageData
   console.log(data.products)
   $: products = data.products
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

{#each products as product}
    <div>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>{product.slug}</p>
        <p><img src={product.featuredAsset?.preview} />{product.featuredAsset}</p>
         <p>{product.id}</p>
    </div>
{/each}

