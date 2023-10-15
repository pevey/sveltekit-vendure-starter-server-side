<script lang="ts">
   import Star from './Star.svelte'
   export let rating
   //create dummy array of length 5 to display stars
   let stars = Array.from({length: 5}, (v, i) => i)
</script>
<div class="mt-2">
   <h3 class="sr-only">Rating</h3>
   <div class="flex items-center">
   {#each stars as star}
      {#if rating > star + 0.5}
         <Star filled='true' />
      {:else if rating > star}
         <Star filled='half' />
      {:else}
         <Star  />
      {/if}
   {/each}
   </div>
   <p class="sr-only">{rating} out of 5 stars</p>
</div>
