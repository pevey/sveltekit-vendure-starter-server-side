<script lang="ts">
   import type { Product, Collection } from '$lib/generated/graphql'
   import type { PageData } from './$types'
   import MetaTags from '$lib/saluna/MetaTags.svelte'
   // import Swipe from '$lib/saluna/Swipe.svelte'
   // import SwipeItem from '$lib/saluna/SwipeItem.svelte'
   // const swipeConfig = {
   //    autoplay: false,
   //    delay: 1000,
   //    showIndicators: true,
   //    transitionDuration: 250,
   //    defaultIndex: 0,
   // }
   export let data: PageData
   // let Swiper: any = null
   // let swipe_holder_height = 0
   //$: featuredCollection = data.collection as Collection
   $: featuredProducts = data.products as Product[] // temporarily, this is just the first 3 products found
</script>
<MetaTags />
<!-- <div class="w-screen h-[50vh]" style="height:{swipe_holder_height}px">
   <Swipe {...swipeConfig} allow_infinite_swipe={true} bind:this={Swiper}>
      {#each featuredProducts as product}
         <SwipeItem allow_dynamic_height={true} on:swipe_item_height_change={(e) => { swipe_holder_height = e.detail.height }}>
            <div class="max-w-screen-2xl mx-auto">
               <h2>{product.name}</h2>
               <p>{product.description}</p>
               <p>{product.slug}</p>
               <p><img src={product.featuredAsset?.preview} alt={product.name} /></p>
               <p>{product.id}</p>
            </div>
         </SwipeItem>
      {:else}
         No products found
      {/each}
   </Swipe>
   <div>
      <button type="button" on:click={() => Swiper.prevItem()}>Prev</button>
      <button type="button" on:click={() => Swiper.nextItem()}>Next</button>
   </div>
</div> -->