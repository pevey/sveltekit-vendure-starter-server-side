<script lang="ts">
   import { X, Menu } from 'lucide-svelte'
   import { createDialog } from '@melt-ui/svelte'
   import { fade, fly } from 'svelte/transition'
   export let user: {}
   const { 
      elements: { trigger, portalled, overlay, content, close },
      states: { open, } 
   } = createDialog( { preventScroll: false } )
</script>
{#if $open}
   <button {...$close} use:close class="flex p-2 ml-2 items-center justify-center hover:bg-stone-200 rounded-md">
      <Menu class="text-gray-800 h-10 w-10" />
   </button>
{:else}
   <button {...$trigger} use:trigger class="flex p-2 mx-2 items-center justify-center hover:bg-stone-200 rounded-md">
      <Menu class="text-gray-800 h-10 w-10" />
   </button>
{/if}
<div use:portalled>
   {#if $open}
      <div {...$overlay} use:overlay class="fixed inset-0 z-20 bg-black/50" transition:fade={{ duration: 150 }} />
      <div {...$content} use:content class="overflow-auto fixed left-0 top-0 z-50 h-screen w-full max-w-[350px] bg-white p-[25px] shadow-lg focus:outline-none" transition:fly={{ x: '-100%', duration: 300, opacity: 1, }}>
         <div class="flex flex-col justify-between h-full">
            <div>
               <div class="flex items-center mb-6">
                  <a class="mr-auto text-2xl font-medium leading-none" href="/">
                     <img class="h-16" src="/logo.svg" alt="" width="auto">
                  </a>
                  <button {...$close} use:close>
                     <X class="text-gray-800 h-10 w-10" />
                  </button>
               </div>
               <div class="flex flex-col">
                  <a href="/about" use:close class="py-2 px-3 mr-2 rounded-md font-medium text-lg hover:bg-stone-200">About Us</a>
                  <a href="/blends" use:close class="py-2 px-3 mr-2 rounded-md font-medium text-lg hover:bg-stone-200">Blends</a>
                  <a href="/single-origin" use:close class="py-2 px-3 mr-2 rounded-md font-medium text-lg hover:bg-stone-200">Single Origin</a>
                  <a href="/flavored" use:close class="py-2 px-3 mr-2 rounded-md font-medium text-lg hover:bg-stone-200">Flavored</a>
                  <a href="/wholesale" use:close class="py-2 px-3 mr-2 rounded-md font-medium text-lg hover:bg-stone-200">Wholesale</a>
                  {#if user}
                     <a href="/account" use:close class="py-2 px-3 mr-2 mt-12 rounded-md font-medium text-lg hover:bg-stone-200">Your Profile</a>
                     <form action="/auth?/logout" method="POST">
                        <button type="submit" class="py-2 px-3 mr-2 rounded-md font-medium text-lg hover:bg-stone-200">Sign Out</button>
                     </form>
                  {:else}
                     <a href="/auth" use:close class="py-2 px-3 mr-2 mt-12 rounded-md font-medium text-lg hover:bg-stone-200">Sign In</a>
                  {/if}
               </div>
            </div>
            <div class="flex flex-col">
               1618 Marshall St, Ste. C<br>
               Shreveport, LA 71101
            </div>

         </div>
      </div>
   {/if}
</div>
