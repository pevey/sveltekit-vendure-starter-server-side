<script lang="ts">
   import Rating from './Rating.svelte'
   import { Turnstile } from 'sveltekit-turnstile'
   import { PUBLIC_TURNSTILE_SITE_KEY } from '$env/static/public'
   import { superForm } from 'sveltekit-superforms/client'
   import { z } from 'zod'

   export let reviewForm
   export let product: any = null
   export let user: any = null
   export let reviews: any = []

   let addReview = false
   let processing = false

   const { form, errors, message, enhance }  
      = superForm(reviewForm, { 
         resetForm: true,
         validators: z.object({
            displayName: z.string().min(1).max(100),
            content: z.string().min(1).max(1000),
            rating: z.coerce.number().min(1).max(5).default(5)
         }), 
         defaultValidator: 'clear',
         onSubmit: () => {
            processing = true
         },
         onResult: ({ result }) => {
            processing = false
            if (result.status === 200) {
               addReview = false
            }
         }
      })
</script>

<div id="tab-panel-reviews" aria-labelledby="tab-reviews" role="tabpanel" tabindex="0">
   <h3 class="sr-only">Customer Reviews</h3>

   {#if $message}
   <div class="mt-4">
      {$message}
   </div>
   {/if}

   {#if addReview}
   <form method="POST" id="addReview" action="?/addReview" class="space-y-6 mb-4" use:enhance>
      <Turnstile theme="light" siteKey={PUBLIC_TURNSTILE_SITE_KEY} />
      <input type="hidden" name="productId" value={product.id} />
      <div class="flex flex-col sm:flex-row">
         <div class="sm:w-1/2">
            <label for="displayName" class="block text-sm font-medium text-gray-700">Display Name</label>
            <div class="mt-1">
               <input type="text" bind:value={$form.displayName} name="displayName" id="displayName" autocomplete="name" class="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md" />
               {#if $errors.displayName}<p class="mt-2 text-sm text-red-600">{$errors.displayName}</p>{/if}
            </div>
         </div>
         <div class="sm:w-1/2 sm:ml-4">
            <label for="rating" class="block text-sm font-medium text-gray-700">Rating</label>
            <div class="mt-1">
               <select bind:value={$form.rating} id="rating" name="rating" autocomplete="rating" class="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md">
                  <option value="5">5 stars</option>
                  <option value="4">4 stars</option>
                  <option value="3">3 stars</option>
                  <option value="2">2 stars</option>
                  <option value="1">1 star</option>
               </select>
            </div>
            {#if $errors.rating}<p class="mt-2 text-sm text-red-600">{$errors.rating}</p>{/if}
         </div>
      </div>
      <div>
         <label for="content" class="block text-sm font-medium text-gray-700">Review</label>
         <div class="mt-1">
            <textarea bind:value={$form.content} id="content" name="content" rows="4" class="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"></textarea>
            {#if $errors.content}<p class="mt-2 text-sm text-red-600">{$errors.content}</p>{/if}
         </div>
      </div>
      <div class="flex flex-wrap">
         <div class="w-1/2 pr-6">
            <button hidden={processing} on:click|preventDefault={() => { addReview = false }} type="button" class="mt-6 w-full items-center justify-center rounded-md border border-transparent bg-orange-500 px-5 py-3 text-base font-medium text-white hover:bg-orange-600">
               Cancel
            </button>
         </div>
         <div class="w-1/2">
            <button disabled={processing} type="submit" class="mt-6 w-full items-center justify-center rounded-md border border-transparent bg-lime-600 px-5 py-3 text-base font-medium text-white hover:bg-lime-700">
               {#if processing}
                  Processing...
               {:else}
                  Save
               {/if}
            </button>
         </div>
      </div>
   </form>

   {:else}
   <div class="mt-4">      
      {#if user}
      <button type="button" class="font-medium text-lime-600" on:click={() => addReview = true}>
         Add a review
      </button>
      {:else}
      <a href="/auth">
         Log in to leave a review
      </a>
      {/if}
   </div>
   
   {/if}

   {#each reviews as review}
   <div class="pt-4 text-sm text-gray-600">
      <h3 class="font-medium text-gray-900">{review.display_name}</h3>
      <p>{new Date(review.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
      <Rating rating={review.rating} />
      <div class="prose prose-sm mt-2 max-w-none text-gray-500">
         <p>{review.content}</p>
      </div>
   </div>
   {/each}

</div>