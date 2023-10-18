<script lang="ts">
   import type { Order } from '$lib/generated/graphql'
   import { X, ShoppingCart } from 'lucide-svelte'
   import { createDialog } from '@melt-ui/svelte'
   import { fade, fly } from 'svelte/transition'
   import { enhance } from '$app/forms'
   import { invalidateAll } from '$app/navigation'
   import { formatPrice } from '$lib/utils'
   import CartLine from './CartLine.svelte'
   import VendureAsset from '$lib/components/VendureAsset.svelte'

   export let cart: Order
   export let count: number

   $: cart = cart
   $: lines = cart?.lines || []
   $: total = cart?.subTotal

   const { 
      elements: { trigger, portalled, overlay, content, title, close },
      states: { open, } 
   } = createDialog( { preventScroll: true } )

   const updateQuantity = async function(e: any) {
      const form = e.target.closest('form')
      console.log(form)
      // const formData = new FormData(form)
      // const result = await fetch(form.action, {
      //    method: 'POST',
      //    body: formData
      // }).then(res => res.json())
      // if (result.type === 'success') invalidateAll()
   }

</script>
{#if $open}
   <button {...$close} use:close class="flex relative mx-2 p-2 items-center justify-center hover:bg-stone-200 rounded-md">
      <span class="sr-only">Close cart</span>
      <ShoppingCart class="text-gray-800 h-10 w-10" />
      {#if count > 0}
         <span class="z-50 absolute top-3 right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-lime-600 rounded-full">
            {count}
         </span>
      {/if}
   </button>
{:else}
   <button {...$trigger} use:trigger class="flex p-2 relative mx-2 items-center justify-center hover:bg-stone-200 rounded-md">
      <span class="sr-only">View cart</span>
      <ShoppingCart class="text-gray-800 h-10 w-10" />
      {#if count > 0}
         <span class="z-50 absolute top-3 right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-lime-600 rounded-full">
            {count}
         </span>
      {/if}
   </button>
{/if}
<div use:portalled>
   {#if $open}
      <div {...$overlay} use:overlay class="fixed inset-0 z-20 bg-black/50" transition:fade={{ duration: 150 }} />
      <div {...$content} use:content class="overflow-auto fixed right-0 top-0 z-50 w-full h-full pb-0 mb-0 sm:w-4/5 md:w-2/3 lg:w-2/3 xl:w-1/2 bg-white p-[25px] shadow-lg focus:outline-none" transition:fly={{ x: '100%', duration: 300, opacity: 1, }}>
         <button {...$close} use:close>
            <X class="text-gray-800 h-10 w-10" />
         </button>
         <div class="px-8 sm:px-12">
            <h2 {...$title} use:title class="mb-6 text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
               Shopping Cart
            </h2>
            <ul role="list" class="divide-y divide-gray-200 border-t border-gray-200">
               {#each lines as line}
                  <CartLine {line} />
               {:else}
                  <div class="my-6">
                     Cart is empty
                  </div>
               {/each}
            </ul>
            <section aria-labelledby="summary-heading" class="border-t border-gray-200 bg-white sticky bottom-0 py-6">
               {#if lines.length > 0}
               <h2 id="summary-heading" class="sr-only">Order summary</h2>
               <div>
                     <dl class="space-y-4">
                        <div class="flex items-center justify-between">
                           <dt class="ml-2 text-base font-medium text-gray-900">Subtotal</dt>
                           <dd class="ml-4 mr-2 text-base font-medium text-gray-900">{formatPrice(total)}</dd>
                        </div>
                     </dl>
                     <p class="ml-2 mt-1 text-sm text-gray-500">Shipping and taxes will be calculated at checkout.</p>
               </div>
               <form action="/checkout">
                  <button use:close type="submit" class="my-4 w-full items-center justify-center rounded-md border border-transparent bg-lime-600 px-5 py-3 text-base font-medium text-white hover:bg-lime-700">Checkout</button>
               </form>
               {/if}
               <button {...$close} use:close class="w-full text-center font-medium text-gray-800 hover:text-gray-500">
                  &larr; Continue Shopping
               </button>
            </section>
         </div>         
      </div>
   {/if}
</div>
