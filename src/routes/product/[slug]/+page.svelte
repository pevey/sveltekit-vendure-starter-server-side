<script lang="ts">
   import type { PageData } from './$types'
   import type { Customer, Product } from '$lib/generated/graphql'
   import { queryParam } from 'sveltekit-search-params'
   import { page } from '$app/stores'
   import { enhance } from '$app/forms'  
   import { invalidateAll } from '$app/navigation'
   import { PUBLIC_DEFAULT_CURRENCY } from '$env/static/public'
   import { formatCurrency } from '$lib/saluna/utils'
   import SEO from '$lib/saluna/SEO.svelte'
   import Rating from '$lib/saluna/Rating.svelte'
   import ProductReviews from '$lib/saluna/ProductReviews.svelte'
   import FAQ from '$lib/saluna/FAQ.svelte'
   import Gallery from '$lib/saluna/Gallery.svelte'
   import Highlights from '$lib/saluna/Highlights.svelte'
   export let data: PageData
   $: product = data.product as Product
   $: user = data.user as Customer
   let reviewForm = data.reviewForm
   // let reviews = product.reviews as any
   let reviews: any = []
   // let images = product.images as any
   let tab: string = 'reviews'
   let selectedVariantId: string = data?.product?.variants[0]?.id
</script>
<!-- <SEO title={product.name} description={product.description} image={product.assets[0]?.url} /> -->
<div class="max-w-screen-2xl mx-auto py-6 px-6 sm:px-12 md:px-14 lg:grid lg:grid-cols-2 lg:gap-x-6">
   <div class="lg:max-w-lg">
      <h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>
      <h2 id="information-heading" class="sr-only">Product information</h2>
      <!-- <Rating rating={product.rating} /> -->
      <p class="mt-6">{product.description}</p>
      {#if (product.variants.length > 1)}
         <div class="mt-6">
            {#each product.variants as variant}
               {#if (variant.id === selectedVariantId)}
                  <button type="button" class="uppercase whitespace-nowrap px-3 py-2 mr-2 mb-2 rounded-lg text-sm font-medium text-gray-700 border-4 border-lime-600 bg-white hover:bg-white">
                     {variant.name}
                  </button>
               {:else}
                  <button type="button" on:click={() => { selectedVariantId = variant.id }} class="uppercase whitespace-nowrap px-3 py-2 mr-2 mb-2 rounded-lg text-sm font-medium text-gray-700 border border-gray-400 bg-white hover:bg-stone-200">
                     {variant.name}
                  </button>
               {/if}
            {/each}
         </div>
      {/if}
      <!-- {#each product.options as option}
      <div class="mt-6">
         <h3 class="text-sm font-medium">{option.title}</h3>
         <div class="mt-4">
            <div class="flex flex-wrap">
            {#each option.filteredValues as value}
            {#if value === selectedOptions[option.id]}
            <button type="button" class="uppercase whitespace-nowrap px-3 py-2 mr-2 mb-2 rounded-lg text-sm font-medium text-gray-700 border-4 border-lime-600 bg-white hover:bg-white">
               {value}
            </button>
            {:else}
            <button type="button" on:click={(e) => { handleSelection(option, value) }} class="uppercase whitespace-nowrap px-3 py-2 mr-2 mb-2 rounded-lg text-sm font-medium text-gray-700 border border-gray-400 bg-white hover:bg-stone-200">
               {value}
            </button>
            {/if}
            {/each}
            </div>
         </div>
      </div>
      {/each} -->
      <div class="mt-6">
         <h3 class="text-sm font-medium">Price</h3>
         <div class="mt-1 flex items-baseline">
            <p class="text-xl font-semibold">{formatCurrency(product.variants[product.variants.findIndex(v => v.id === selectedVariantId)].price, PUBLIC_DEFAULT_CURRENCY)}</p>
            <p class="ml-1 text-sm font-medium text-gray-600">/ {product.variants[product.variants.findIndex(v => v.id === selectedVariantId)].name}</p>
         </div>
      </div> 
      <form action="/cart?/add" method="post" use:enhance={() => { return async ({ result }) => { if (result.type === 'success') { await invalidateAll() }}}}>
         <input type="hidden" name="variantId" value={selectedVariantId} />
         <button type="submit" class="mt-6 w-full items-center justify-center rounded-md border border-transparent bg-lime-600 px-5 py-3 text-base font-medium text-white hover:bg-lime-700">
            Add to Cart
         </button>
      </form>
   </div>
   <div class="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 items-start">
      <Gallery images={product.assets} />      
   </div>
   <div class="mb-4">
      <Highlights />
   </div>
   <!-- Tabs -->
   <div class="max-w-screen-lg lg:col-span-2">
      <div class="flex" aria-orientation="horizontal" role="tablist">
         <button type="button" on:click="{() => tab = 'reviews'}" class="{tab === 'reviews' ? 
            "whitespace-nowrap p-3 pr-4 mr-4 border-b-2 font-medium border-lime-600 text-gray-800" : 
            "whitespace-nowrap p-3 pr-4 mr-4 text-gray-500 hover:text-gray-700 border-b border-gray-300 hover:border-b-2 hover:border-gray-300"}">
            Customer Reviews
         </button>
         <button type="button" on:click="{() => tab = 'faq'}" class="{tab === 'faq' ? 
            "whitespace-nowrap p-3 px-4 mr-4 border-b-2 font-medium border-lime-600 text-gray-800" : 
            "whitespace-nowrap p-3 px-4 mr-4 text-gray-500 hover:text-gray-700 border-b border-gray-300 hover:border-b-2 hover:border-gray-300"}">
            FAQ
         </button>
      </div>
      {#if tab == 'reviews'}
         <ProductReviews bind:reviewForm={reviewForm} {product} {user} {reviews} />
      {:else if tab == 'faq'}
         <FAQ/>
      {/if}
   </div>
</div>