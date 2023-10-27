<script lang="ts">
   import type { PageData } from './$types'
   import type { Customer, Order, ShippingMethodQuote, PaymentMethod, CreateCustomerInput, CreateAddressInput } from '$lib/generated/graphql'
   import type { StripeAddressElementOptions } from 'sveltekit-stripe'
   import { Payment, Address, stripeClient, stripeElements } from 'sveltekit-stripe'
   import { Turnstile } from 'sveltekit-turnstile'
   import { Truck, Warehouse } from 'lucide-svelte'
   import { enhance } from '$app/forms'
   import { writable } from 'svelte/store'
   import { setContext } from 'svelte'
   import { browser, dev } from '$app/environment'
   import { formatCurrency } from '$lib/saluna/utils'
   import CheckoutOrderSummary from '$lib/saluna/CheckoutOrderSummary.svelte'
   import SEO from '$lib/saluna/SEO.svelte'

   export let data: PageData
   const customer = writable<Customer>(data.user)
   const order = writable<Order>(data.cart)
   setContext('order', order)
   setContext('customer', customer)

   let token: string
   let clientSecret: string
   let addressElementOptions: StripeAddressElementOptions = { mode: 'shipping' }
   let contacts: any[]
   let address: any
   let emailAddress: string
   let firstName: string
   let lastName: string
   let shippingOptions: ShippingMethodQuote[]
   let selectedShippingOption: number
   let paymentOptions: PaymentMethod[]
   let delivery: 'ship'|'pickup' = 'ship'
   let processing = false
   let errorMessage: string|undefined
   
   $: { if (browser && shippingOptions) setShippingOption(selectedShippingOption) }

   const startCheckout = async (token: string) => {
      const result = await fetch('/checkout/turnstile', { 
         method: 'POST', 
         body: JSON.stringify({ token } )
      }).then(res => res.json()).catch(e => { if (dev) console.log(e) })
      if (!result) return
      clientSecret = result.paymentIntent
      paymentOptions = result.paymentOptions
      contacts = result.contacts
      addressElementOptions.contacts = contacts
   }

   const setCustomer = async (customer: CreateCustomerInput) => {
      return await fetch('/checkout/set-customer', { 
         method: 'POST', 
         body: JSON.stringify(customer)
      }).catch(e => { if (dev) console.log(e) })
   }

   const setAddress = async (address: CreateAddressInput) => {
      return await fetch('/checkout/set-address', { 
         method: 'POST', 
         body: JSON.stringify(address)
      }).catch(e => { if (dev) console.log(e) })
   }

   const getShippingOptions = async () => {
      return await fetch('/checkout/get-shipping-options')
         .then(res => res.json()).catch(e => { if (dev) console.log(e) })
   }

   const setShippingOption = async (id: number) => {
      $order = await fetch('/checkout/set-shipping-option', { 
         method: 'POST', 
         body: JSON.stringify({ id })
      }).then(res => res.json()).catch(e => { if (dev) console.log(e) })
   }
   
   const selectCheapestShippingOption = async () => {
      // set cheapest shipping option as default, but make sure it is not local pickup
      if (shippingOptions) {
         let index = 0
         if (data.localPickupCode) {
            let pickupIndex = +shippingOptions.findIndex(v => v.code === data.localPickupCode)
            if (pickupIndex === index) index += 1
         }
         if (index === shippingOptions.length) {
            errorMessage = 'There are no shipping options available.'
         } else {
            selectedShippingOption = +shippingOptions[index].id
         }
      }
   }
   
   const selectPickupOption = async () => {
      if (shippingOptions) {
         let pickupIndex = +shippingOptions.findIndex(v => v.code === data.localPickupCode)
         if (pickupIndex === -1) {
            errorMessage = 'Something went wrong while setting the shipping option to local pickup.'
         } else {
            selectedShippingOption = +shippingOptions[pickupIndex].id                    
         }
      }
   }

   const setOrderState = async (state: string) => {
      return await fetch('/checkout/set-order-state', { 
         method: 'POST', 
         body: JSON.stringify({ state })
      }).then(res => res.json()).catch(e => { if (dev) console.log(e) })
   }
</script>
<!-- <SEO title="Checkout" description="Checkout page for {data.siteName}"/> -->
<noscript>
   <p>Please enable javascript to complete checkout.</p>
   <p>We use a third party (<a href="https://stripe.com">Stripe</a>) to process credit card payments for enhanced security.  Making payments on this site using Stripe requires javascript.</p>
</noscript>
{#if (!$order?.lines)}
   <p>Your cart is empty.</p>
{:else if !token}
   <Turnstile theme="light" siteKey={data.turnstileKey} on:turnstile-callback={ async (e) => { 
      token = e.detail.token
      await startCheckout(token)
   }} />
{:else if clientSecret}
   <main class="lg:flex lg:min-h-full lg:flex-row-reverse lg:max-h-screen lg:overflow-hidden">
      <!-- Logo on sm screen -->
      <div class="px-4 py-6 sm:px-6 lg:hidden">
         <div class="mx-auto flex max-w-lg">
            <h1 class="sr-only">Checkout</h1>
            <a href="/"><img src="/logo.png" class="mx-auto h-14 w-auto" alt="{data.siteName}" /></a>
         </div>
      </div>
      <CheckoutOrderSummary currency={data.defaultCurrency} />
      <section aria-labelledby="payment-heading" class="flex-auto px-4 pb-16 pt-6 sm:pt-8 sm:px-6 lg:px-8 lg:pb-4 overflow-auto">
         <div class="mx-auto max-w-lg">
            <!-- Logo on lg screen -->
            <div class="hidden py-10 lg:flex">
               <h1 class="sr-only">Checkout</h1>
               <a href="/"><img src="/logo.png" alt="{data.siteName}" class="h-14 w-auto"></a>
            </div>
            <!-- Checkout Form -->
            <form class="grid gap-y-8" method="POST" use:enhance={ async ({ formData, cancel }) => {
               if (processing) cancel()
               processing = true
               // save guest customer
               if (!$customer) {
                  if (!emailAddress || !firstName || !lastName) {
                     errorMessage = 'Please complete all fields.'
                     processing = false
                     cancel()
                  }
                  await setCustomer({ emailAddress, firstName, lastName }).catch(e => {
                     errorMessage = 'Something went wrong.  Please contact us by phone or email for assistance.'
                     processing = false
                     cancel()
                  })
               }
               // transition to ArrangingPayment state
               if ($order.state !== 'ArrangingPayment') {
                  $order = await setOrderState('ArrangingPayment')
                  if ($order.state !== 'ArrangingPayment') {
                     errorMessage = 'Something went wrong while transitioning to ArrangingPayment state.'
                     processing = false
                     cancel()
                  }
               }
               // submit to Stripe for validation and wallet collection
               let stripeResponse = await $stripeElements?.submit()
               if (stripeResponse && !stripeResponse.error) {
                  // save payment method
                  // await fetch('/checkout/set-payment-method', { 
                  //    method: 'POST', 
                  //    body: JSON.stringify({ paymentMethodId: stripeResponse.paymentMethod.id })
                  // }).catch(e => { if (dev) console.log(e) })
                  // confirm payment intent
                  stripeResponse = await $stripeClient?.confirmPayment({ 
                     elements: $stripeElements, 
                     clientSecret, 
                     confirmParams: { return_url: `http://localhost:5173/checkout/success/${$order.code}` }
                  })
               }
               return async () => {
                  // if we get here instead of being redirected, there was a payment error
                  errorMessage = stripeResponse?.error?.message
                  processing = false
               }
            }}>
               {#if errorMessage}
                  <p class="text-red-600 text-lg font-semibold">{errorMessage}</p>
               {/if}
               <section id="email">
                  <div class="flex flex-auto justify-between items-center">
                     <h3 class="text-xl font-medium text-gray-900" id="payment-heading">Email</h3>
                     <span>Have an account? Sign in</span>
                  </div>
                  {#if $customer}
                     <div>{$customer.emailAddress}</div>
                     <div class="text-sm mt-1">Sign in as a different customer</div>
                  {:else}
                     <input name="emailAddress" bind:value={emailAddress} type="text" class="input mt-2">
                     <div class="mt-2 flex items-center">
                        <input name="offers" id="offers" type="checkbox" class="checkbox"> 
                        Send me emails with news and offers
                     </div>
                  {/if}
               </section>
               <section id="address">
                  <h3 class="mb-3 text-xl font-medium text-gray-900" id="payment-heading">Address</h3>
                  <Address publicKey={data.stripeKey} {addressElementOptions} {clientSecret}
                     on:complete={async (e) => {
                        firstName = e.detail.firstName
                        lastName = e.detail.lastName
                        if (address !== e.detail.address) {
                           address = e.detail.address
                           await setAddress({
                              fullName: `${firstName} ${lastName}`,
                              streetLine1: address.line1,
                              streetLine2: address.line2,
                              city: address.city,
                              province: address.state,
                              postalCode: address.postal_code,
                              countryCode: address.country
                           })
                           shippingOptions = await getShippingOptions()
                           if (!shippingOptions) {
                              errorMessage = 'Something went wrong while getting shipping options.'
                           } else {
                              if (delivery === 'ship') {
                                 await selectCheapestShippingOption()
                              } else if (delivery === 'pickup') {
                                 await selectPickupOption()
                              }
                           }
                        }
                     }}
                  />
               </section>
               {#if data.localPickupCode}
                  <section id="delivery">
                     <h3 class="mb-3 text-xl font-medium text-gray-900" id="payment-heading">Delivery</h3>
                     <div role="radiogroup" class="rounded-md overflow-hidden border">
                        <label class={
                           (delivery === 'ship')
                           ? "w-full flex items-center p-4 rounded-t-md border-2 border-violet-600" 
                           : "w-full flex items-center p-4"
                        }>
                           <input 
                              type="radio" 
                              name="delivery" 
                              value="ship" 
                              class="focus:ring-0 text-violet-600"
                              checked={delivery === 'ship'} 
                              on:change={ async () => { 
                                 delivery = 'ship'
                                 await selectCheapestShippingOption()
                              }} 
                           />
                           <span class="ml-3">Ship</span>
                           <Truck class="ml-auto" />
                        </label>
                        <label class={
                           (delivery === 'pickup')
                           ? "w-full flex items-center p-4 rounded-b-md border-2 border-violet-500" 
                           : "w-full flex items-center p-4"
                        }>
                           <input 
                              type="radio" 
                              name="delivery" 
                              value="pickup" 
                              class="focus:ring-0 text-violet-600"
                              checked={delivery === 'pickup'} 
                              on:change={ async () => { 
                                 delivery = 'pickup' 
                                 await selectPickupOption()
                              }} 
                           />
                           <span class="ml-3">Pick Up</span>
                           <Warehouse class="ml-auto" />
                        </label>
                     </div>
                  </section>
               {/if}
               <!-- Shipping Method -->
               {#if delivery === 'ship' && shippingOptions}
               <section id="shipping-method">
                  <h3 class="mb-3 text-xl font-medium text-gray-900" id="payment-heading">Shipping Method</h3>
                  <select bind:value={selectedShippingOption} required class="block w-full rounded-md border-gray-200 focus:border-2 focus:border-violet-600 text-gray-600 py-3">
                     {#each shippingOptions as shippingOption}
                        <option value={parseInt(shippingOption.id)}>{shippingOption.name} {formatCurrency(shippingOption.price, data.defaultCurrency)}</option>
                     {:else}
                        No shipping options available
                     {/each}
                  </select>
               </section>
               {/if}
               <!-- Payment -->
               <section id="payment">
                  <h3 class="mb-3 text-xl font-medium text-gray-900" id="payment-heading">Payment</h3>
                  <Payment publicKey={data.stripeKey} {clientSecret} />
               </section>
               <!-- Submission -->         
               <button disabled={processing} type="submit" class="w-full items-center justify-center rounded-md border border-transparent bg-lime-600 px-5 py-3 text-base font-medium text-white hover:bg-lime-700">
                  {#if processing} Processing...{:else} Complete Your Order {/if}
               </button>
               <p class="flex justify-center pb-4 text-sm font-medium text-gray-500">
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