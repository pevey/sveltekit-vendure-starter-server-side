<script lang="ts">
   import { createTooltip } from '@melt-ui/svelte'
   const { 
      elements: { trigger, content, arrow },
      states: { open }
   } = createTooltip({
      positioning: {
         placement: 'bottom-start',
      },
      openDelay: 100,
      closeOnPointerDown: true,
   })
   $: $open = $open
</script>
<button type="button" {...$trigger} use:trigger aria-label="Coffee Menu" class="py-2 px-3 mr-2 rounded-md font-medium text-lg lg:hover:bg-stone-200">Coffee</button>
<a href="/wholesale" class="py-2 px-3 mr-2 rounded-md font-medium text-lg lg:hover:bg-stone-200">Wholesale</a>
<a href="/about" class="py-2 px-3 mr-2 rounded-md font-medium text-lg lg:hover:bg-stone-200">About Us</a>
{#if $open}
   <div {...$content} use:content class="menu">
      <div {...$arrow} use:arrow />
      <button type="button" on:click="{(e) => { $open = false } }" class="item">
         <a href="/blends">Blends</a>
      </button>
      <button type="button" on:click="{(e) => { $open = false } }" class="item">
         <a href="/single-origin">Single Origin</a>
      </button>
      <button type="button" on:click="{(e) => { $open = false } }" class="item">
         <a href="/flavored">Flavored</a>
      </button>
   </div>
{/if}
<style lang="postcss">
   .menu {
     @apply z-10 flex flex-col shadow-lg;
     @apply rounded-lg bg-white p-1 shadow-neutral-900/30;
     @apply ring-0 !important;
   }
   .item {
     @apply relative h-6 min-h-[24px] select-none rounded-md px-8 py-6;
     @apply z-20 text-gray-900 outline-none;
     @apply hover:bg-stone-200 hover:data-[highlighted]:text-purple-900;
     @apply flex items-center leading-none;
     @apply ring-0 !important;
   }
</style>