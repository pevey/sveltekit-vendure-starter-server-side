<script lang="ts">
	import '$src/app.pcss'
	import type { PageData } from './$types'
	import type { Collection, Customer, Order } from '$lib/generated/graphql'
	import { page } from '$app/stores'
	import NavBar from '$lib/saluna/NavBar.svelte'
	import Footer from '$lib/saluna/Footer.svelte'
	export let data: PageData
	const collections: Collection[] = data?.collections
	const nakedPaths = ['/auth', '/checkout', '/sitemap.xml']
	$: naked = nakedPaths.includes($page.url.pathname)
	$: user = data?.user as Customer
	$: cart = data?.cart as Order
	$: count = cart?.lines?.length as number || 0
</script>
{#if naked}
	<slot />
{:else}
	<NavBar {collections} bind:user={user} bind:cart={cart} bind:count={count} />
	<slot />
	<Footer />
{/if}