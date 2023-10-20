<script lang="ts">
   import { createEventDispatcher } from 'svelte'
   export let hit: any
   const dispatch = createEventDispatcher()
</script>

<button on:click={() => dispatch('click', `${hit.slug}`)} class="overflow-hidden text-left cursor-pointer hover:bg-stone-100 p-4">
   <h3 class="font-bold">{hit.productName}</h3>
   <p class="text-sm line-clamp-4">{hit.description}</p>
</button>