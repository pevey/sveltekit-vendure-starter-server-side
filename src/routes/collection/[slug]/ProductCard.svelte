<script lang="ts">
   import type { SearchResult } from '$lib/generated/graphql'
   export let product: SearchResult
</script>

<a href="/product/{product.slug}" class="group">
   <div class="overflow-hidden rounded-lg">
         <img alt={product.productName} src={product.productAsset?.preview} class="mx-auto object-cover h-80 w-80 object-center group-hover:opacity-75">
   </div>
   <div class="flex">
      <div class="mx-auto">
         <h3 class="mt-4 text-lg font-bold text-gray-700">{product.productName}</h3>
      </div>
      <p class="mt-1 text-lg font-medium text-gray-900"></p>
   </div>
</a>