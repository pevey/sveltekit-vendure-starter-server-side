<script lang="ts">
   export let code: string
</script>
<main class="lg:flex lg:min-h-full lg:flex-row-reverse lg:max-h-screen lg:overflow-hidden">
   <section class="flex-auto px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pb-4 lg:pt-0">
      <div class="mx-auto max-w-lg">
         <p>Thank you for your order!</p>
         <p>Your order number is <a class="font-bold text-lime-600" href={`/account/order/${code}`}>{code}</a></p>
         <p class="mt-6"><a href="/">&larr; Continue Shopping</a></p>
      </div>
   </section>
</main>