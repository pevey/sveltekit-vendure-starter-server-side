<script lang="ts">
   import type { SearchResult } from '$lib/generated/graphql'
   import VendureAsset from '$lib/saluna/VendureAsset.svelte'
   export let product: SearchResult
</script>

<a href="/product/{product.slug}" class="group">
   <VendureAsset preview={product.productAsset?.preview} preset="medium" alt={product.productName} class="mx-auto object-cover h-80 w-80 object-center group-hover:opacity-75 overflow-hidden rounded-lg"/>
   <div class="flex">
      <div class="mx-auto">
         <h3 class="mt-4 text-lg font-bold text-gray-700">{product.productName}</h3>
         <!-- <p class="mt-1 text-lg font-medium text-gray-900">{product.price.value || product.price.min}</p> -->
      </div>
   </div>
</a>