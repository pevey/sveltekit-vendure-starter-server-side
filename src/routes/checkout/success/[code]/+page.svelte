<script lang="ts">
   export let data: any
   const order = data.order
   import CheckoutSuccess from '$lib/saluna/CheckoutSuccess.svelte'
</script>
{#if order}
   <CheckoutSuccess {order} />
{:else}
   <p>Order not found</p>
{/if}