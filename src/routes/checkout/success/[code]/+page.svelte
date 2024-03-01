<script lang="ts">
	import CheckoutSuccess from '$lib/components/CheckoutSuccess.svelte'
	export let data: any
</script>
{#if data.code}
	<CheckoutSuccess code={data.code} />
{:else}
	<p>Order not found</p>
{/if}