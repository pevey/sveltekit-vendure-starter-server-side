<script lang="ts">
	import type { Writable } from 'svelte/store'
	import type { Order } from '$lib/generated/graphql'
	import { getContext } from 'svelte'
	import { formatCurrency } from '$lib/saluna/utils'
	import VendureAsset from '$lib/saluna/VendureAsset.svelte'

	export let currency: string
	const order: Writable<Order> = getContext('order')
	$: lines = $order?.lines || []
	let orderSummaryOpen = false

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
</script>
<section class="flex-col w-full lg:min-h-screen lg:max-w-md bg-gray-50 p-6 overflow-auto">
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
					<div class="flex flex-col justify-between space-y-4 my-auto">
						<div class="space-y-1 text-sm font-medium">
							<h3 class="text-gray-900">{line.productVariant.name}</h3>
							<p class="text-gray-900">facets</p>
							<p class="text-gray-500">Price: {formatCurrency(line.unitPrice, currency)}</p>
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
					<dd class="text-gray-900">{formatCurrency($order?.subTotal, currency)}</dd>
				</div>
				{#if $order.discounts.length > 0}
					{#each $order?.discounts as discount}
						<div class="flex justify-between">
							<dt class="flex">
								Discount
								<span class="ml-2 rounded-full bg-gray-200 px-2 py-0.5 text-xs tracking-wide text-gray-600">{discount.description}</span>
							</dt>
							<dd class="text-gray-900">{formatCurrency(discount.amountWithTax, currency)}</dd>
						</div>
					{/each}
				{/if}
				{#if $order.taxSummary.length > 0}
					{#each $order.taxSummary as tax}
						{#if tax.taxTotal > 0}
							<div class="flex justify-between">
								<dt>{tax.description}</dt>
								<dd class="text-gray-900">{formatCurrency(tax.taxTotal, currency)}</dd>
							</div>
						{/if}
					{/each}
				{/if}
				{#if $order.shippingLines.length > 0}
					{#each $order.shippingLines as shippingLine}
						<div class="flex justify-between">
							<dt>{shippingLine.shippingMethod.name}</dt>
							<dd class="text-gray-900">{formatCurrency(shippingLine.priceWithTax, currency)}</dd>
						</div>
					{/each}
				{/if}
			</dl>
			
			<p class="py-6 flex items-center justify-between border-t border-gray-200 text-sm font-medium text-gray-900">
				<span class="text-base">Total</span>
				<span class="text-base">{formatCurrency($order?.totalWithTax, currency)}</span>
			</p>

		</div>
	</div>
</section>