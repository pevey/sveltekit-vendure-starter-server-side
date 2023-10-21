<script lang="ts">
   import type { PageData } from './$types'
   import type { Customer, Order } from '$lib/generated/graphql'
   import { enhance } from '$app/forms'
   import { Turnstile } from 'sveltekit-turnstile'
   import { Payment, Address, stripeClient, stripeElements } from 'sveltekit-stripe'
   import VendureAsset from '$lib/saluna/VendureAsset.svelte'
   import { formatCurrency } from '$lib/saluna/utils'
   import SEO from '$lib/saluna/SEO.svelte'

   export let data: PageData
   $: user = data.user as Customer
   $: order = data.cart as Order
   $: lines = order?.lines || []
console.log(data.cart)
   let token: string
   let clientSecret: string
   let contacts: any[]
   let paymentOptions: any[]

   let addressContainer: any
   let addressOptions: any
   let orderSummaryOpen = false
   let success = false
   let processing = false
   let loading = true
   let errorMessage = ''

   const toggleOrderSummary = () => {
      let orderSummary = document.getElementById('order-summary') as HTMLElement
      if (orderSummaryOpen) {
         orderSummary.classList.add('hidden')
         orderSummaryOpen = false
      } else {
         orderSummary.classList.remove('hidden')
         orderSummaryOpen = true
      }
   }

   const startCheckout = async (token: string) => {
      try {
         let result = await fetch('/checkout/turnstile', { 
            method: 'POST', 
            body: JSON.stringify({ token } )
         }).then(res => res.json())
   console.log(result)
         clientSecret = result.paymentIntent
         paymentOptions = result.paymentOptions
         contacts = result.contacts
         addressOptions = { contacts }
         // shippingOptions = response.shippingOptions
         // for (let shippingOption of shippingOptions) {
         //    if (shippingOption.name === 'Free Shipping') {
         //       shippingOptionId = shippingOption.id
         //       cart = await saveShippingOption(shippingOptionId)
         //       break
         //    }
         // }
         // if (!shippingOptionId) {
         //    shippingOptionId = shippingOptions[0].id
         //    cart = await saveShippingOption(shippingOptionId)
         // }
         loading = false
      } catch (err) {
         console.log(err)
      }
   }

</script>

<!-- <SEO title="Checkout" description="Checkout page for {data.siteName}"/> -->

<noscript>
   <p>Please enable javascript to complete checkout.</p>
   <p>We use a third party (<a href="https://stripe.com">Stripe</a>) to process credit card payments for enhanced security.  Making payments on this site using Stripe requires javascript.</p>
</noscript>

{#if errorMessage}
   <p>{errorMessage}</p>

{:else if success}
   <main class="lg:flex lg:min-h-full lg:flex-row-reverse lg:max-h-screen lg:overflow-hidden">
      <section class="flex-auto px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pb-4 lg:pt-0">
         <div class="mx-auto max-w-lg">
            <!-- Logo on thank you screen -->
            <div class="py-10 lg:flex">
               <span class="sr-only">{data.siteName}</span>
               <a href="/"><img src="/logo.png" alt="{data.siteName}" class="h-14 w-auto"></a>
            </div>
            <p>Thank you for your order!</p>
            <p>Your order number is <a class="font-bold text-lime-600" href={`/account/order/${order.id}`}>{order.code}</a></p>
            <p class="mt-6"><a href="/">&larr; Continue Shopping</a></p>
         </div>
      </section>
   </main>

{:else if (!order?.lines)}
   <p>Your cart is empty.</p>

{:else if !token}
   <Turnstile theme="light" siteKey={data.turnstileKey} on:turnstile-callback={ async (e) => { 
      token = e.detail.token
      await startCheckout(token)
   }} />

{:else if !loading}
   <main class="lg:flex lg:min-h-full lg:flex-row-reverse lg:max-h-screen lg:overflow-hidden">
      <h1 class="sr-only">Checkout</h1>

      <!-- Logo on sm screen -->
      <div class="px-4 py-6 sm:px-6 lg:hidden">
         <div class="mx-auto flex max-w-lg">
            <span class="sr-only">{data.siteName}</span>
            <a href="/"><img src="/logo.png" class="mx-auto h-14 w-auto" alt="{data.siteName}" /></a>
         </div>
      </div>
      
      <!-- Order Summary -->
      <section class="w-full flex-col lg:max-w-md bg-gray-50 p-6 overflow-auto">
         <h2 id="summary-heading" class="sr-only">Order summary</h2>
         <div class="mx-auto max-w-lg">

            <!-- Mobile order summary toggle -->
            <div class="lg:hidden flex items-center justify-between">
               <h2 id="order-heading" class="text-lg font-medium text-gray-900">Your Order</h2>
               <button on:click={toggleOrderSummary} type="button" class="font-medium text-indigo-600 hover:text-indigo-500">
                  {#if orderSummaryOpen} Hide full summary {:else} Show full summary {/if}
               </button>
            </div>
      
            <div id="order-summary" class="hidden lg:block lg:max-h-screen">
               <ul role="list" class="flex-auto">
                  {#each lines as line}
                  <li class="flex space-x-6 py-6 border-b border-gray-200">
                     <VendureAsset preview={line.featuredAsset?.preview} alt={line.productVariant.name} preset="thumb" class="h-28 w-auto flex-none rounded-md bg-gray-200 object-cover object-center" />
                     <!-- <img src="{item.thumbnail}" alt="item.description" class="h-28 w-auto flex-none rounded-md bg-gray-200 object-cover object-center"> -->
                     <div class="flex flex-col justify-between space-y-4 my-auto">
                        <div class="space-y-1 text-sm font-medium">
                           <h3 class="text-gray-900">{line.productVariant.name}</h3>
                           <p class="text-gray-900">facets</p>
                           <p class="text-gray-500">Price: {formatCurrency(line.unitPrice, data.defaultCurrency)}</p>
                           <p class="text-gray-500">Quantity: {line.quantity}</p>
                        </div>
                     </div>
                  </li>
                  {/each}
               </ul>
               
               <form class="hidden mt-10">
                  <label for="discount-code-mobile" class="block text-sm font-medium text-gray-700">Discount code</label>
                  <div class="mt-1 flex space-x-4">
                     <input type="text" id="discount-code-mobile" name="discount-code-mobile" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                     <button type="submit" class="rounded-md bg-gray-200 px-4 text-sm font-medium text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">Apply</button>
                  </div>
               </form>
      
               <dl class="py-6 space-y-6 text-sm font-medium text-gray-500">
                  <div class="flex justify-between">
                     <dt>Subtotal</dt>
                     <dd class="text-gray-900">{formatCurrency(order?.subTotal, data.defaultCurrency)}</dd>
                  </div>
                  {#if order.discounts.length > 0}
                     {#each order?.discounts as discount}
                        <div class="flex justify-between">
                           <dt class="flex">
                              Discount
                              <span class="ml-2 rounded-full bg-gray-200 px-2 py-0.5 text-xs tracking-wide text-gray-600">{discount.description}</span>
                           </dt>
                           <dd class="text-gray-900">{formatCurrency(discount.amountWithTax, data.defaultCurrency)}</dd>
                        </div>
                     {/each}
                  {/if}
                  {#if order.taxSummary.length > 0}
                     {#each order.taxSummary as tax}
                        <div class="flex justify-between">
                           <dt>{tax.description}</dt>
                           <dd class="text-gray-900">{formatCurrency(tax.taxTotal, data.defaultCurrency)}</dd>
                        </div>
                     {/each}
                  {/if}
                  <!-- <div class="flex justify-between">
                     <dt>Taxes</dt>
                     <dd class="text-gray-900">{formatCurrency(order?.taxSummary[0]?.taxTotal, data.defaultCurrency)}</dd>
                  </div> -->
                  <div class="flex justify-between">
                     <dt>Shipping</dt>
                     <dd class="text-gray-900">shipping</dd>
                  </div>
               </dl>
               
               <p class="py-6 flex items-center justify-between border-t border-gray-200 text-sm font-medium text-gray-900">
                  <span class="text-base">Total</span>
                  <span class="text-base">{formatCurrency(order?.total, data.defaultCurrency)}</span>
               </p>

            </div>
         </div>
      </section>
   
      <!-- Checkout form -->
      <section aria-labelledby="payment-heading" class="flex-auto px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pb-4 lg:pt-0 overflow-auto">
         <div class="mx-auto max-w-lg">

            <!-- Logo on lg screen -->
            <div class="hidden py-10 lg:flex">
               <span class="sr-only">{data.siteName}</span>
               <a href="/"><img src="/logo.png" alt="{data.siteName}" class="h-14 w-auto"></a>
            </div>

            <form class="grid gap-y-8" method="POST" use:enhance={ async ({ cancel }) => {
               if (processing) cancel()
               processing = true
         
               // capture shipping address
               const {complete, value} = await addressContainer.getValue()
               // if (complete) {
               //    cart = await saveAddress(value)
               //    if (!cart) {
               //       errorMessage = 'Something went wrong while saving your address. Please call us at 318-226-2888.'
               //       console.log(errorMessage)
               //       processing = false
               //       cancel()
               //    }
               // }
      
               // capture final shipping method
               // order = await saveShippingOption(shippingOptionId)
               // if (!order) {
               //    errorMessage = 'Something went wrong while selecting the shipping option. Please call us at 318-226-2888.'
               //    console.log(errorMessage)
               //    processing = false
               //    cancel()
               // }
         
               // confirm payment
               const stripeResponse = await $stripeClient.confirmPayment({ elements: $stripeElements, redirect: 'if_required' })
               if (stripeResponse.error) {
                  errorMessage = stripeResponse.error.message
                  processing = false
                  cancel()
               } else {
                  return async ({ result }) => {
                     if (result.status === 200) {
                        success = true
                        order = result.data.order
                     } 
                  }
               }
            }}>

               <Address publicKey={data.stripeKey} {addressOptions} {clientSecret}
                  on:complete={async (e) => {
                     console.log(e.detail)
                     // cart = await saveAddress(e.detail.value)
                  }}
               />

               <!-- <select bind:value={shippingOptionId} on:change={async () => { cart = await saveShippingOption(shippingOptionId) } } name="shippingOptionId" required="required" class="block w-full rounded-md border-gray-200 shadow-sm focus:border-blue-300 focus:ring-blue-300 text-gray-600 py-3">
                  {#each shippingOptions as shippingOption}
                     <option value={shippingOption.id}>{shippingOption.name} {formatPrice(shippingOption.price_incl_tax)}</option>
                  {/each}
               </select> -->

               <Payment publicKey={data.stripeKey} {clientSecret} />			
         
               <button disabled={processing} type="submit" class="w-full items-center justify-center rounded-md border border-transparent bg-lime-600 px-5 py-3 text-base font-medium text-white hover:bg-lime-700">
                  {#if processing} Processing...{:else} Complete Your Order {/if}
               </button>
         
               <p class="flex justify-center text-sm font-medium text-gray-500">
                  <svg class="mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" viewBox="0 0 20 20" fill="currentColor">
                     <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
                  </svg>
                  Payments processed securely by Stripe
               </p>
            </form>

         </div>
      </section>
   </main>

{/if}